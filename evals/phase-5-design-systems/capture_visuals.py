#!/usr/bin/env python3
"""Capture unchanged generated fixtures. Requires an available Playwright Chromium.

This is evaluation tooling, not an installed skill dependency. Install Playwright
in an evaluation environment, then point SHIPRIGHT_CHROME at a browser if needed.
"""
import hashlib
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
EV = Path(__file__).resolve().parent
FIX = ROOT / 'tests/fixtures/phase-5-design-systems/ui-ux-design'
IMAGES = ROOT / 'examples/before-after/phase-5-design-systems/ui-ux-design'
IMAGES.mkdir(parents=True, exist_ok=True)


def surface(page):
    return page.evaluate('''() => ({
      title:document.title,
      text:document.body.innerText,
      width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
      font:getComputedStyle(document.body).fontFamily,
      active:document.activeElement?.outerHTML,
      activeVisible:document.activeElement?.getBoundingClientRect().height>0
    })''')


def fonts(page):
    session = page.context.new_cdp_session(page)
    session.send('DOM.enable')
    session.send('CSS.enable')
    root = session.send('DOM.getDocument')['root']['nodeId']
    node = session.send('DOM.querySelector', {'nodeId':root,'selector':'h1'})['nodeId']
    return session.send('CSS.getPlatformFontsForNode', {'nodeId':node})


rows = []
with sync_playwright() as p:
    kwargs = {'headless':True, 'args':['--no-sandbox']}
    if os.environ.get('SHIPRIGHT_CHROME'):
        kwargs['executable_path'] = os.environ['SHIPRIGHT_CHROME']
    browser = p.chromium.launch(**kwargs)
    version = browser.version
    for variant in ('before','after'):
        source = FIX / (variant + '.html')
        for mode,width,height in [('desktop',1280,900),('mobile',390,844)]:
            page = browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
            errors = []
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(source.resolve().as_uri())
            page.evaluate('document.fonts.ready')
            listing = surface(page)
            platform_fonts = fonts(page)
            target = IMAGES / f'{variant}-projects-{mode}.png'
            page.screenshot(path=str(target),full_page=True)
            # Exact text is supplied by the raw fixture task, not a generated class guess.
            page.get_by_text('Orchard notes',exact=True).first.click()
            page.wait_for_timeout(150)
            detail = surface(page)
            page.screenshot(path=str(IMAGES / f'{variant}-detail-{mode}.png'),full_page=True)
            page.get_by_text('Back to Projects',exact=True).first.click()
            page.wait_for_timeout(150)
            returned = surface(page)
            # Exercise the other supplied project with keyboard-only activation.
            page.keyboard.press('Tab')
            focused = page.evaluate('''() => ({tag:document.activeElement.tagName,
              text:document.activeElement.textContent.trim(),
              outlineStyle:getComputedStyle(document.activeElement).outlineStyle,
              outlineWidth:getComputedStyle(document.activeElement).outlineWidth,
              boxShadow:getComputedStyle(document.activeElement).boxShadow})''')
            page.keyboard.press('Enter')
            page.wait_for_timeout(150)
            keyboard_detail = surface(page)
            rows.append({'variant':variant,'viewport':[width,height],'browser':version,
              'html_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
              'listing':listing,'detail':detail,'returned':returned,
              'keyboard_focus':focused,'keyboard_detail':keyboard_detail,
              'platform_fonts':platform_fonts,'page_errors':errors,
              'checks':{'list_both_projects':all(x in listing['text'] for x in ['Orchard notes','Harbor review']),
                'detail_content':all(x in detail['text'] for x in ['Orchard notes','Review the supplied observation notes.','Sam']),
                'return_list':'Projects' in returned['text'] and 'Harbor review' in returned['text'],
                'keyboard_activation':'Review the supplied harbor notes.' in keyboard_detail['text'],
                'keyboard_visible_focus':focused['text']=='Harbor review' and focused['outlineStyle']!='none' and focused['outlineWidth']!='0px',
                'no_horizontal_overflow':all(x['scrollWidth']<=width for x in [listing,detail,returned,keyboard_detail]),
                'no_page_errors':not errors}})
            page.close()
    browser.close()
(EV/'visual-checks.json').write_text(json.dumps({'renderer':'Playwright Chromium','playwright_version':'1.51.0 during initial run','device_scale_factor':1,'rows':rows,'limits':'Generated synthetic previews only. Not full accessibility, usability, client installation or app verification.'},indent=2)+'\n')
print(json.dumps([{k:r[k] for k in ['variant','viewport','checks']} for r in rows],indent=2))
