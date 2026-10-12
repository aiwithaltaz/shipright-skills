"""Render exact generated sample HTML; requires evaluation-only Playwright/Pillow."""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
EV=Path(__file__).resolve().parent
FIX=ROOT/'tests/fixtures/phase-6-design-tokens'
OUT=ROOT/'examples/before-after/phase-6-design-tokens'
OUT.mkdir(parents=True,exist_ok=True)
rows=[]

def capture_font(page):
    session=page.context.new_cdp_session(page)
    session.send('DOM.enable');session.send('CSS.enable')
    root=session.send('DOM.getDocument')['root']['nodeId']
    node=session.send('DOM.querySelector',{'nodeId':root,'selector':'h1'})['nodeId']
    return session.send('CSS.getPlatformFontsForNode',{'nodeId':node})

with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=['--no-sandbox'])
    for version in ['before','after']:
        source=FIX/(version+'.html')
        for width,height,label in [(1120,780,'desktop'),(390,844,'phone')]:
            page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
            errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(source.as_uri());page.wait_for_timeout(150);page.evaluate('document.fonts.ready')
            checks=page.evaluate('''() => {
                const b=document.body, first=document.querySelector('input');
                return {title:document.title, text:b.innerText, width:innerWidth,
                    scrollWidth:document.documentElement.scrollWidth, scrollHeight:document.documentElement.scrollHeight,
                    font:getComputedStyle(b).fontFamily, background:getComputedStyle(b).backgroundColor,
                    input:first?{font:getComputedStyle(first).fontSize,height:getComputedStyle(first).height,
                      radius:getComputedStyle(first).borderRadius,background:getComputedStyle(first).backgroundColor}:null,
                    fields:[...document.querySelectorAll('input')].map(i=>({id:i.id,labels:[...i.labels].map(l=>l.innerText)})),
                    variableNames:[...document.styleSheets].flatMap(s=>[...s.cssRules]).flatMap(r=>r.style?[...r.style].filter(x=>x.startsWith('--')):[])
                };
            }''')
            checks['platform_fonts']=capture_font(page)
            png=OUT/f'{version}-{label}.png'
            page.screenshot(path=str(png),full_page=True,animations='disabled')
            focused=[]
            for _ in range(16):
                page.keyboard.press('Tab')
                state=page.evaluate('''() => { const el=document.activeElement,s=getComputedStyle(el),r=el.getBoundingClientRect();return {tag:el.tagName,id:el.id,text:el.innerText||'',outline:s.outlineStyle,width:s.outlineWidth,boxShadow:s.boxShadow,visible:r.width>0&&r.height>0}; }''')
                if state['tag'] not in ['BODY','HTML']:
                    focused.append(state)
                if state['tag']=='INPUT':break
            checks['keyboard_focus']=focused
            checks['no_horizontal_overflow']=checks['scrollWidth']<=width
            checks['all_fields_labeled']=all(f['labels'] for f in checks['fields']) and len(checks['fields'])==3
            checks['focus_visible']=bool(focused) and all(s['visible'] and ((s['outline']!='none' and s['width']!='0px') or s['boxShadow']!='none') for s in focused)
            checks['sample_label']='Sample illustration. IVC scale pending from Altaz.' in checks['text']
            checks['page_errors']=errors
            rows.append({'version':version,'viewport':[width,height],'browser':browser.version,'checks':checks,
                         'html_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'screenshot':str(png.relative_to(ROOT))})
            page.close()
    browser.close()

font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
for label,name in [('desktop','compare.png'),('phone','compare-phone.png')]:
    a=Image.open(OUT/f'before-{label}.png').convert('RGB');b=Image.open(OUT/f'after-{label}.png').convert('RGB')
    w=a.width+b.width+48;h=max(a.height,b.height)+76
    canvas=Image.new('RGB',(w,h),'#ececec');d=ImageDraw.Draw(canvas)
    d.text((16,14),'Phase 5.1 baseline',font=font,fill='#222');d.text((a.width+32,14),'Phase 6',font=font,fill='#222')
    canvas.paste(a,(16,48));canvas.paste(b,(a.width+32,48));canvas.save(OUT/name)
(EV/'visual-checks.json').write_text(json.dumps(rows,indent=2)+'\n')
(EV/'visual-manifest.json').write_text(json.dumps({str(x.relative_to(ROOT)):hashlib.sha256(x.read_bytes()).hexdigest() for x in [*OUT.glob('*.png'),*FIX.glob('*.html')]},indent=2)+'\n')
print(json.dumps([{'version':r['version'],'viewport':r['viewport'],'overflow':r['checks']['no_horizontal_overflow'],'labels':r['checks']['all_fields_labeled'],'focus':r['checks']['focus_visible'],'sample':r['checks']['sample_label']} for r in rows]))
