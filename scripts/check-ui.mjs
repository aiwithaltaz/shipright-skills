#!/usr/bin/env node
// ShipRight screen checker. Opens a page in real Chromium and measures rules that can be measured.
// Usage: node scripts/check-ui.mjs <page.html | url> [--root dir] [--out dir] [--json] [--allow rule,rule]
// Local files are served over a throwaway local server rooted at --root (default: the current folder),
// so module scripts and relative assets load as they would on a real site.
// Needs Node 18+ and Playwright with Chromium (npm i -D playwright; npx playwright install chromium).
// FAIL means a measured rule broke. WARN means look again and defend it in one sentence, or fix it.
// It does not prove good design, full accessibility, or real-device behavior.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, join, basename, dirname, relative, extname, sep } from 'node:path';
import { createServer } from 'node:http';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  const tries = ['playwright', 'playwright-core', '/opt/node22/lib/node_modules/playwright'];
  for (const name of tries) { try { return require(name); } catch {} }
  console.error('check-ui: Playwright not found. Install it with: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const args = process.argv.slice(2);
const target = args.find((a, i) => !a.startsWith('--') && !['--out', '--allow', '--root'].includes(args[i - 1]));
if (!target) { console.error('usage: node scripts/check-ui.mjs <page.html|url> [--out dir] [--json] [--allow rule,rule]'); process.exit(2); }
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const allow = new Set((flag('--allow') || '').split(',').filter(Boolean));
const remote = /^https?:/.test(target);
const root = resolve(flag('--root') || '.');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.webm': 'video/webm' };
function serve() {
  return new Promise(ok => {
    const server = createServer((req, res) => {
      const file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!(file + sep).startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' }); res.end(readFileSync(file));
    }).listen(0, '127.0.0.1', () => ok(server));
  });
}
const outDir = resolve(flag('--out') || join(existsSync(target) ? dirname(resolve(target)) : '.', 'check-ui'));
mkdirSync(outDir, { recursive: true });

export const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800, touch: false },
  { name: 'phone', width: 390, height: 844, touch: true },
];

// Runs inside the page. Returns raw measurements; rules are judged in Node.
function measure(vp) {
  const vis = el => {
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05;
  };
  const parse = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const lum = ({ r, g, b }) => [r, g, b].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const blend = (top, under) => ({ r: top.r * top.a + under.r * (1 - top.a), g: top.g * top.a + under.g * (1 - top.a), b: top.b * top.a + under.b * (1 - top.a), a: 1 });
  function background(el) {
    const layers = [];
    for (let n = el; n; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage !== 'none' || n.tagName === 'CANVAS' || n.tagName === 'VIDEO' || n.tagName === 'IMG') return null; // over media: unknown
      const c = parse(s.backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 };
    for (const c of layers.reverse()) base = blend(c, base);
    return base;
  }
  const textEls = [...document.querySelectorAll('body *')].filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1) && vis(el) && !el.closest('svg,[aria-hidden="true"]'));
  const contrast = [];
  const families = new Map();
  let smallText = 0, eyebrows = 0;
  for (const el of textEls) {
    const s = getComputedStyle(el); const size = parseFloat(s.fontSize); const bold = +s.fontWeight >= 700;
    const fam = s.fontFamily.split(',')[0].trim().replace(/["']/g, '');
    if (!el.closest('pre,code,kbd,samp')) families.set(fam, (families.get(fam) || 0) + 1);
    const fg = parse(s.color); const bg = background(el);
    if (fg && bg) {
      const rt = ratio(blend(fg, bg), bg); const need = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;
      if (rt < need) contrast.push({ text: el.textContent.trim().slice(0, 40), ratio: +rt.toFixed(2), need });
    }
    if (size < 12 && !el.closest('sup,sub,small')) smallText++;
    if (s.textTransform === 'uppercase' && parseFloat(s.letterSpacing) / size > 0.04 && size <= 14) eyebrows++;
  }
  const all = [...document.querySelectorAll('body *')].filter(vis);
  const gradients = all.filter(el => /gradient/.test(getComputedStyle(el).backgroundImage));
  const gradientText = gradients.filter(el => /text/.test(getComputedStyle(el).webkitBackgroundClip || getComputedStyle(el).backgroundClip));
  const glows = all.filter(el => {
    const s = getComputedStyle(el); const sh = s.boxShadow + ' ' + s.textShadow; if (sh.trim() === 'none none') return false;
    return [...sh.matchAll(/rgba?\(([^)]+)\)[^,]*?(-?\d+)px (-?\d+)px (\d+)px/g)].some(m => { const c = m[1].split(/[ ,/]+/).map(Number); const sat = Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]); return +m[4] >= 20 && sat > 60; });
  });
  const interactive = all.filter(el => el.matches('a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=link],[tabindex]:not([tabindex="-1"])'));
  const inlineLink = el => el.tagName === 'A' && el.closest('p,li') && el.closest('p,li').textContent.trim().length > el.textContent.trim().length + 20;
  const small = interactive.filter(el => !inlineLink(el)).map(el => { const r = el.getBoundingClientRect(); return { el, w: r.width, h: r.height }; });
  const pageBg = background(document.body) || { r: 255, g: 255, b: 255 };
  const filled = interactive.filter(el => {
    if (!el.matches('button,a,[role=button],input[type=submit]')) return false;
    const r = el.getBoundingClientRect(); if (r.top > vp.height || r.bottom < 0) return false;
    const c = parse(getComputedStyle(el).backgroundColor); if (!c || c.a < 0.9) return false;
    return ratio(c, pageBg) > 1.8;
  }).map(el => el.getBoundingClientRect());
  let filledPairs = 0;
  for (let i = 0; i < filled.length; i++) for (let j = i + 1; j < filled.length; j++) {
    const a = filled[i], b = filled[j];
    if (Math.abs(a.top - b.top) < 8 && Math.min(Math.abs(a.right - b.left), Math.abs(b.right - a.left)) < 40) filledPairs++;
  }
  const unlabeled = [...document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]),select,textarea')].filter(el => vis(el) && !(el.labels && el.labels.length) && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')).length;
  const noAlt = [...document.querySelectorAll('img')].filter(el => !el.hasAttribute('alt')).length;
  const namelessButtons = [...document.querySelectorAll('button,[role=button]')].filter(el => vis(el) && !el.textContent.trim() && !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby') && !el.title).length;
  const canvases = [...document.querySelectorAll('canvas')].filter(vis).map(c => ({ w: c.width, h: c.height, labeled: !!(c.getAttribute('aria-label') || c.getAttribute('role') || c.getAttribute('aria-hidden')) }));
  const text = document.body.innerText;
  let css = '';
  for (const sheet of document.styleSheets) { try { css += [...sheet.cssRules].map(r => r.cssText).join('\n'); } catch {} }
  const scripts = [...document.scripts].map(s => s.textContent).join('\n');
  return {
    overflowX: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vp.width,
    pageHeight: document.documentElement.scrollHeight,
    h1: document.querySelectorAll('h1').length,
    families: [...families.entries()].sort((a, b) => b[1] - a[1]),
    contrast, smallText, eyebrows,
    gradients: gradients.length, gradientText: gradientText.length, glows: glows.length,
    smallTargets: small.filter(t => t.w < 24 || t.h < 24).length,
    touchTargets: small.filter(t => t.w < 44 || t.h < 44).length,
    filledPairs, unlabeled, noAlt, namelessButtons, canvases,
    emDashes: (text.match(/\u2014/g) || []).length,
    animated: document.getAnimations().length > 0 || /@keyframes|transition:\s*(?!none)/.test(css) || /gsap|requestAnimationFrame|Lenis/.test(scripts),
    reducedMotionRule: /prefers-reduced-motion/.test(css + scripts),
    outlineNone: /outline:\s*(none|0)/.test(css) && !/focus-visible/.test(css),
  };
}

const RULES = [
  ['overflow', 'FAIL', m => m.overflowX > 1, m => `page scrolls sideways by ${m.overflowX}px`],
  ['fonts-loaded', 'FAIL', m => m.fontsMissing.length, m => `font fell back: ${m.fontsMissing.join(', ')}`],
  ['contrast', 'FAIL', m => m.contrast.length, m => `${m.contrast.length} text runs below contrast, e.g. "${m.contrast[0].text}" ${m.contrast[0].ratio}:1 (need ${m.contrast[0].need})`],
  ['tiny-targets', 'FAIL', m => m.smallTargets, m => `${m.smallTargets} controls smaller than 24x24px`],
  ['touch-targets', 'WARN', (m, vp) => vp.touch && m.touchTargets, m => `${m.touchTargets} controls smaller than 44x44px on a touch screen`],
  ['unlabeled-fields', 'FAIL', m => m.unlabeled, m => `${m.unlabeled} form fields have no label`],
  ['image-alt', 'FAIL', m => m.noAlt, m => `${m.noAlt} images have no alt attribute`],
  ['nameless-buttons', 'FAIL', m => m.namelessButtons, m => `${m.namelessButtons} buttons have no accessible name`],
  ['focus-visible', 'FAIL', m => m.focusVisible === false, () => 'first Tab stop shows no visible focus'],
  ['page-errors', 'FAIL', m => m.errors.length, m => `script errors: ${m.errors.slice(0, 2).join(' | ')}`],
  ['em-dash', 'FAIL', m => m.emDashes, m => `${m.emDashes} em dashes in visible text`],
  ['reduced-motion', 'FAIL', m => m.animated && !m.reducedMotionRule, () => 'motion found with no prefers-reduced-motion handling'],
  ['gradient-text', 'FAIL', m => m.gradientText, m => `${m.gradientText} gradient text elements`],
  ['gradients', 'WARN', m => m.gradients, m => `${m.gradients} gradient backgrounds; keep only a scrim under text on media`],
  ['glows', 'WARN', m => m.glows, m => `${m.glows} colored glow shadows`],
  ['two-filled-buttons', 'WARN', m => m.filledPairs, m => `${m.filledPairs} pairs of filled buttons side by side on the first screen`],
  ['eyebrows', 'WARN', m => m.eyebrows > 2, m => `${m.eyebrows} tiny uppercase letter-spaced labels`],
  ['font-families', 'WARN', m => m.families.length > 2, m => `${m.families.length} text families: ${m.families.map(f => f[0]).join(', ')}`],
  ['small-text', 'WARN', m => m.smallText > 3, m => `${m.smallText} text runs under 12px`],
  ['one-h1', 'WARN', m => m.h1 !== 1, m => `${m.h1} h1 elements`],
  ['outline-none', 'WARN', m => m.outlineNone, () => 'outline removed without a focus-visible rule'],
  ['canvas-label', 'WARN', m => m.canvases.some(c => !c.labeled), () => 'canvas without aria-label, role or aria-hidden'],
];

async function run() {
  const { chromium } = loadPlaywright();
  let server, url = target;
  if (!remote) {
    const rel = relative(root, resolve(target));
    if (rel.startsWith('..')) { console.error('check-ui: the page must be inside --root'); process.exit(2); }
    server = await serve();
    url = `http://127.0.0.1:${server.address().port}/${rel.split(sep).map(encodeURIComponent).join('/')}`;
  }
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const report = { target, checkedAt: new Date().toISOString(), viewports: {} };
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, hasTouch: vp.touch, isMobile: vp.touch });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e.message || e)));
    page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(url.split('/').slice(0, 3).join('/'))) errors.push(`missing file ${r.url().split('/').pop()}`); });
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    const m = await page.evaluate(measure, vp);
    m.errors = errors;
    // A family is missing when text set in it measures the same as the generic fallbacks.
    m.fontsMissing = await page.evaluate(fams => {
      const ctx = document.createElement('canvas').getContext('2d'); const probe = 'Hamburgefonstiv 0123456789 WMwm';
      const width = font => { ctx.font = font; return ctx.measureText(probe).width; };
      return fams.map(f => f[0]).filter(f => !/^(system-ui|-apple-system|BlinkMacSystemFont|sans-serif|serif|monospace|ui-\w+|inherit)$/i.test(f))
        .filter(f => width(`16px "${f}", monospace`) === width('16px monospace') && width(`16px "${f}", serif`) === width('16px serif'));
    }, m.families);
    await page.screenshot({ path: join(outDir, `${vp.name}.png`) });
    await page.screenshot({ path: join(outDir, `${vp.name}-full.png`), fullPage: true });
    await page.keyboard.press('Tab');
    m.focusVisible = await page.evaluate(() => {
      const el = document.activeElement; if (!el || el === document.body) return null;
      const look = () => { const s = getComputedStyle(el); return [s.outlineStyle, s.outlineWidth, s.outlineColor, s.boxShadow, s.borderColor, s.backgroundColor, s.textDecorationLine].join('|'); };
      const focused = look(); const outline = getComputedStyle(el).outlineStyle !== 'none' && parseFloat(getComputedStyle(el).outlineWidth) > 0;
      el.blur(); return outline || focused !== look();
    });
    const results = [];
    for (const [id, level, test, say] of RULES) {
      if (allow.has(id)) continue;
      if (test(m, vp)) results.push({ id, level, message: say(m) });
    }
    report.viewports[vp.name] = { results, metrics: m };
    await ctx.close();
  }
  await browser.close();
  if (server) server.close();
  writeFileSync(join(outDir, 'report.json'), JSON.stringify(report, null, 1));
  const fails = Object.values(report.viewports).flatMap(v => v.results.filter(r => r.level === 'FAIL'));
  const warns = Object.values(report.viewports).flatMap(v => v.results.filter(r => r.level === 'WARN'));
  if (args.includes('--json')) console.log(JSON.stringify({ fails: fails.length, warns: warns.length, report }, null, 1));
  else {
    for (const [name, v] of Object.entries(report.viewports)) {
      console.log(`${name}: ${v.results.length ? '' : 'no findings'}`);
      for (const r of v.results) console.log(`  ${r.level} ${r.id}: ${r.message}`);
    }
    console.log(`check-ui ${basename(target)}: ${fails.length} FAIL, ${warns.length} WARN. Screenshots in ${outDir}`);
    console.log('Measured rules only. Look at the screenshots too; passing here does not prove good design or full accessibility.');
  }
  process.exit(fails.length ? 1 : 0);
}

run().catch(e => { console.error('check-ui error:', e.message); process.exit(2); });
