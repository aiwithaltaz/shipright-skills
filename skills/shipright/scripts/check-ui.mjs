#!/usr/bin/env node
// ShipRight screen checker. Opens a page in real Chromium and measures rules that can be measured.
// Usage: node <skill>/scripts/check-ui.mjs <page.html | url> [--root dir] [--out dir] [--json] [--allow rule,rule] [--profile standard|premium|app] [--release-state released|draft] [--pack-version x.y.z]
// <skill> is the folder that holds SKILL.md. The repo wrapper scripts/check-ui.mjs calls this file.
// Local files are served over a throwaway local server rooted at --root (default: the current folder),
// so module scripts and relative assets load as they would on a real site.
// Needs Node 18+ and Playwright with Chromium (npm i -D playwright; npx playwright install chromium).
// FAIL means a measured rule broke. WARN means look again and defend it in one sentence, or fix it.
// It does not prove good design, full accessibility, or real-device behavior.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, join, basename, dirname, relative, extname, sep } from 'node:path';
import { createServer } from 'node:http';
import { measureDesign, DESIGN_RULES } from './design-metrics.mjs';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  const tries = ['playwright', 'playwright-core', '/opt/node22/lib/node_modules/playwright'];
  for (const name of tries) { try { return require(name); } catch {} }
  console.error('check-ui: Playwright not found. Install it with: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

const args = process.argv.slice(2);
const target = args.find((a, i) => !a.startsWith('--') && !['--out', '--allow', '--root', '--profile', '--browser', '--release-state', '--pack-version'].includes(args[i - 1]));
if (!target) { console.error('usage: node <skill>/scripts/check-ui.mjs <page.html|url> [--out dir] [--json] [--allow rule,rule]'); process.exit(2); }
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const profile = flag('--profile') || 'standard';
if (!['standard', 'premium', 'app'].includes(profile)) { console.error('unknown profile'); process.exit(2); }
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
function measure({ vp, premium, expectRelease, expectVersion }) {
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
    if (s.textTransform === 'uppercase' && parseFloat(s.letterSpacing) / size > 0.04 && size <= 14 && !(premium && el.closest('[data-product-fact]'))) eyebrows++;
  }
  // Text that is laid out but faded to nothing, usually a scroll reveal that has not run.
  const effOpacity = el => { let o = 1; for (let n = el; n && n !== document.documentElement; n = n.parentElement) o *= +getComputedStyle(n).opacity; return o; };
  const laidOut = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden'; };
  const hiddenText = [...document.querySelectorAll('body *')].filter(el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1)
    && laidOut(el) && !el.closest('svg,[aria-hidden="true"],dialog:not([open]),[hidden]') && effOpacity(el) < 0.1).length;
  const all = [...document.querySelectorAll('body *')].filter(vis);
  const gradients = all.filter(el => /gradient/.test(getComputedStyle(el).backgroundImage));
  const gradientText = gradients.filter(el => /text/.test(getComputedStyle(el).webkitBackgroundClip || getComputedStyle(el).backgroundClip));
  const glows = all.filter(el => {
    const s = getComputedStyle(el); const sh = s.boxShadow + ' ' + s.textShadow; if (sh.trim() === 'none none') return false;
    return [...sh.matchAll(/rgba?\(([^)]+)\)[^,]*?(-?\d+)px (-?\d+)px (\d+)px/g)].some(m => { const c = m[1].split(/[ ,/]+/).map(Number); const sat = Math.max(c[0], c[1], c[2]) - Math.min(c[0], c[1], c[2]); return +m[4] >= 20 && sat > 60; });
  });
  const interactive = all.filter(el => el.matches('a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=link],[tabindex]:not([tabindex="-1"])'));
  const inlineLink = el => el.tagName === 'A' && el.closest('p,li') && el.closest('p,li').textContent.trim().length > el.textContent.trim().length + 20;
  // A checkbox or radio also counts its associated label as target area.
  const box = el => {
    const r = el.getBoundingClientRect(); let x1 = r.left, y1 = r.top, x2 = r.right, y2 = r.bottom;
    if (el.matches('input[type=checkbox],input[type=radio]') && el.labels) for (const l of el.labels) {
      const q = l.getBoundingClientRect(); if (q.width && q.height) { x1 = Math.min(x1, q.left); y1 = Math.min(y1, q.top); x2 = Math.max(x2, q.right); y2 = Math.max(y2, q.bottom); }
    }
    return { x1, y1, x2, y2, w: x2 - x1, h: y2 - y1 };
  };
  const targets = interactive.filter(el => !inlineLink(el)).map(el => ({ el, ...box(el) }));
  // WCAG 2.5.8 spacing exception: an undersized target passes if a 24px circle on its center touches no other target.
  const spaced = t => {
    const cx = (t.x1 + t.x2) / 2, cy = (t.y1 + t.y2) / 2;
    return targets.every(o => {
      if (o === t || o.el.contains(t.el) || t.el.contains(o.el) || (o.el.labels && [...o.el.labels].includes(t.el))) return true;
      const dx = Math.max(o.x1 - cx, 0, cx - o.x2), dy = Math.max(o.y1 - cy, 0, cy - o.y2);
      return Math.hypot(dx, dy) >= 12;
    });
  };
  const small = targets.map(t => ({ ...t, ok24: (t.w >= 24 && t.h >= 24) || spaced(t) }));
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
  const heroVisible = [...document.querySelectorAll('[data-product-hero]')].some(el => {
    const b = el.getBoundingClientRect();
    const described = el.getAttribute('alt') || el.getAttribute('aria-label') || el.textContent.trim();
    const mediaReady = el.tagName !== 'IMG' || (el.complete && el.naturalWidth > 0);
    return vis(el) && effOpacity(el) > 0.1 && described && mediaReady && b.top < vp.height && b.bottom > 0 && b.left < vp.width && b.right > 0 && b.width >= 100 && b.height >= 100;
  });
  // Source declarations are review hooks, never proof of factual correctness.
  const proofClaims = [...document.querySelectorAll('[data-proof-claim]')];
  const unsupportedProof = proofClaims.filter(el => !el.getAttribute('data-proof-source')?.trim()).length;
  const suspiciousClaims = text.match(/(?:trusted by|rated \d|\d[\d,.]*\+? (?:customers|users|teams)|\d+(?:\.\d+)?% (?:faster|increase|improvement))/gi) || [];
  const undeclaredProof = suspiciousClaims.filter(claim => !proofClaims.some(el => el.textContent.includes(claim))).length;
  const hiddenIgnored = [...document.querySelectorAll('[hidden]')].filter(el => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 1 && r.height > 1 && s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05;
  }).length;
  const canvasOn = [...document.querySelectorAll('canvas')].some(c => vis(c) && c.width > 0 && c.height > 0);
  const posterOn = [...document.querySelectorAll('[data-poster]')].some(vis);
  const posterLeak = canvasOn && posterOn ? 1 : 0;
  const nav = document.querySelector('nav');
  let navWrapped = false;
  if (nav) {
    const items = [...nav.querySelectorAll('a,button')].filter(el => {
      if (el.hidden || el.closest('[hidden]')) return false;
      const s = getComputedStyle(el);
      if (s.display === 'none' || s.visibility === 'hidden' || s.position === 'fixed' || s.position === 'absolute') return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    if (items.length > 1) {
      const tops = items.map(el => el.getBoundingClientRect().top);
      navWrapped = Math.max(...tops) - Math.min(...tops) > 10;
    }
  }
  const sliderIssues = [];
  const sliderRoots = [...document.querySelectorAll('div,section,figure')].filter(el => el.querySelector('input[type=range]') && el.querySelectorAll('img').length >= 2);
  for (const frame of sliderRoots) {
    if (sliderRoots.some(other => other !== frame && frame.contains(other))) continue;
    const fr = frame.getBoundingClientRect();
    if (fr.width < 40 || fr.height < 40) continue;
    const imgs = [...frame.querySelectorAll('img')].slice(0, 2);
    const boxes = imgs.map(img => {
      const r = img.getBoundingClientRect();
      return { w: r.width, h: r.height, fit: getComputedStyle(img).objectFit };
    });
    if (boxes.some(b => b.h < 8 || b.w < 8)) { sliderIssues.push('missing picture'); continue; }
    const ar = boxes.map(b => b.w / b.h);
    const sameBox = Math.abs(ar[0] - ar[1]) < 0.05 && Math.abs(boxes[0].w - boxes[1].w) < 6 && Math.abs(boxes[0].h - boxes[1].h) < 6;
    const fitted = boxes.every(b => b.fit === 'cover' || b.fit === 'contain');
    if (!sameBox && !fitted) sliderIssues.push('pictures do not share a box or object-fit');
    const covers = boxes.some(b => b.h >= fr.height - 10 && b.w >= fr.width - 10);
    if (!covers) sliderIssues.push('empty band in the frame');
  }
  const metaRelease = (document.querySelector('meta[name="release-state"]')?.content || '').trim().toLowerCase();
  const metaVersion = (document.querySelector('meta[name="pack-version"]')?.content || '').trim();
  const release = String(expectRelease || metaRelease).toLowerCase();
  const version = String(expectVersion || metaVersion);
  const blob = `${document.querySelector('meta[name="description"]')?.content || ''}\n${text}`;
  const staleClaims = [];
  if (release === 'released') {
    if (/\bnot released\b/i.test(blob)) staleClaims.push('not released');
    if (/\bdraft\b/i.test(blob)) staleClaims.push('draft');
    if (/\bnot started\b/i.test(blob)) staleClaims.push('not started');
    if (/\bthe draft is\b/i.test(blob)) staleClaims.push('the draft is');
    const said = blob.match(/\bdraft\s+(\d+\.\d+(?:\.\d+)?)/i);
    if (version && said && said[1] !== version) staleClaims.push('draft version ' + said[1]);
  }
  function hexColor(c) {
    const m = String(c || '').trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (!m) return null;
    let h = m[1];
    if (h.length === 3) h = h.split('').map(ch => ch + ch).join('');
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  function sameish(a, b) {
    const A = parse(a) || hexColor(a);
    const B = parse(b) || hexColor(b);
    if (!A || !B) return false;
    return Math.abs(A.r - B.r) < 3 && Math.abs(A.g - B.g) < 3 && Math.abs(A.b - B.b) < 3;
  }
  function opaqueTone(el) {
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.85) return lum(c) > 0.55 ? 'light' : 'dark';
    }
    return 'light';
  }
  function mediaOf(el) {
    const big = node => {
      if (!node || node.hidden || node.closest('[hidden]')) return false;
      const s = getComputedStyle(node);
      if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.2) return false;
      const r = node.getBoundingClientRect();
      return r.width > 80 && r.height > 80;
    };
    if ([...el.querySelectorAll('canvas')].some(big)) return 'canvas';
    if ([...el.querySelectorAll('img')].some(big)) return 'photo';
    if ([...el.querySelectorAll('svg')].some(big)) return 'draw';
    return 'type';
  }
  const actSignatures = [...document.querySelectorAll('[data-act]')].filter(el => {
    const r = el.getBoundingClientRect();
    return r.height > 40 && getComputedStyle(el).display !== 'none';
  }).map(el => {
    const h = el.getBoundingClientRect().height;
    const scale = h < 220 ? 'bar' : h < vp.height * 0.92 ? 'band' : 'screen';
    const align = getComputedStyle(el).textAlign === 'center' ? 'center' : 'left';
    return `${opaqueTone(el)}|${mediaOf(el)}|${align}|${scale}`;
  });
  const craftDupes = [...new Set(actSignatures.filter((sig, i) => actSignatures.indexOf(sig) !== i))];
  function shownMedia(el) {
    if (!el || el.hidden || el.closest('[hidden]')) return false;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity <= 0.05) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 140 || r.height < 140) return false;
    if (el.tagName === 'IMG' && (!el.complete || el.naturalWidth === 0)) return false;
    const visibleH = Math.min(r.bottom, vp.height) - Math.max(r.top, 0);
    return visibleH > r.height * 0.7 && r.left < vp.width && r.right > 0;
  }
  const hero = document.querySelector('[data-product-hero]');
  const craftProduct = !!(hero && [...hero.querySelectorAll('img,canvas,svg,video')].some(shownMedia));
  const accentRaw = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const accentSource = (document.documentElement.getAttribute('data-accent-source') || document.body.getAttribute('data-accent-source') || '').trim();
  let craftAccent = '';
  if (premium) {
    if (!accentRaw) craftAccent = 'missing --accent';
    else if (accentSource.length < 8) craftAccent = 'accent has no product source';
    else if (sameish(accentRaw, getComputedStyle(document.body).color)) craftAccent = 'accent matches the text color';
    else if (![...document.querySelectorAll('body *')].some(el => {
      if (!vis(el)) return false;
      const s = getComputedStyle(el);
      return [s.color, s.backgroundColor, s.borderTopColor, s.borderColor].some(c => sameish(c, accentRaw));
    })) craftAccent = 'accent token is not used';
  }
  const craftEmpty = [...document.querySelectorAll('body *')].filter(el => {
    if (el.hasAttribute('data-act') || el.closest('nav,header,footer')) return false;
    if (el.matches('img,canvas,svg,video,input')) return false;
    if (el.hidden || el.closest('[hidden]')) return false;
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    if (r.height < 240 || r.width < 120) return false;
    const radius = Math.max(0, ...s.borderRadius.split(/\s+/).map(v => parseFloat(v) || 0));
    if (radius < 12) return false;
    const parent = el.parentElement ? parse(getComputedStyle(el.parentElement).backgroundColor) : null;
    const own = parse(s.backgroundColor);
    if (!own || own.a < 0.9) return false;
    if (parent && Math.abs(own.r - parent.r) < 6 && Math.abs(own.g - parent.g) < 6 && Math.abs(own.b - parent.b) < 6) return false;
    let contentBottom = r.top;
    for (const kid of el.querySelectorAll('*')) {
      if (kid.hidden || kid.closest('[hidden]')) continue;
      const ks = getComputedStyle(kid);
      if (ks.display === 'none' || ks.visibility === 'hidden' || +ks.opacity < 0.2) continue;
      const b = kid.getBoundingClientRect();
      if (b.width < 2 || b.height < 2) continue;
      contentBottom = Math.max(contentBottom, Math.min(b.bottom, r.bottom));
    }
    return r.bottom - contentBottom > 140;
  }).length;
  // 1.4: a heading that says a thing "is black" while it sits on black (or "is white" on white) describes a color the reader cannot see.
  const headingColorWords = [...document.querySelectorAll('h1,h2,h3')].filter(vis).flatMap(el => {
    const m = el.textContent.match(/\b(?:is|are|turns?|goes|stays|shown in|in)\s+(black|dark|white|light)\b/i);
    if (!m) return [];
    const bg = background(el); if (!bg) return [];
    const tone = lum(bg) > 0.4 ? 'light' : 'dark';
    const said = /black|dark/i.test(m[1]) ? 'dark' : 'light';
    return said === tone ? [`"${el.textContent.trim().slice(0, 40)}" on a ${tone} background`] : [];
  });
  return {
    headingColorWords,
    heroVisible, unsupportedProof, undeclaredProof,
    visibleWords: text.replace(/\s+/g, ' ').trim(),
    overflowX: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - vp.width,
    pageHeight: document.documentElement.scrollHeight,
    h1: document.querySelectorAll('h1').length,
    families: [...families.entries()].sort((a, b) => b[1] - a[1]),
    contrast, smallText, eyebrows,
    gradients: gradients.length, gradientText: gradientText.length, glows: glows.length,
    smallTargets: small.filter(t => !t.ok24).length,
    touchTargets: small.filter(t => t.w < 44 || t.h < 44).length,
    filledPairs, unlabeled, noAlt, namelessButtons, canvases,
    hiddenText,
    emDashes: (text.match(/\u2014/g) || []).length,
    animated: document.getAnimations().length > 0 || /@keyframes|transition:\s*(?!none)/.test(css) || /gsap|requestAnimationFrame|Lenis/.test(scripts),
    reducedMotionRule: /prefers-reduced-motion/.test(css + scripts),
    outlineNone: /outline:\s*(none|0)/.test(css) && !/focus-visible/.test(css),
    hiddenIgnored, posterLeak, navWrapped, sliderIssues, staleClaims,
    actSignatures, craftDupes, craftProduct, craftAccent, craftEmpty,
  };
}

const RULES = [
  ...DESIGN_RULES,
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
  ['hidden-content', 'FAIL', m => m.hiddenText, m => `${m.hiddenText} text elements are laid out but invisible at load (content hidden until a script or scroll runs)`],
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
  ['hidden-ignored', 'FAIL', m => m.hiddenIgnored, m => `${m.hiddenIgnored} [hidden] elements are still visible. display beat the hidden attribute`],
  ['poster-under-model', 'FAIL', m => m.posterLeak, () => 'fallback poster is visible while the canvas is showing'],
  ['pin-clip', 'FAIL', m => m.pinClipped && m.pinClipped.length, m => `pinned frame clips content out of the viewport: ${m.pinClipped.slice(0, 3).join(' | ')}`],
  ['slider-align', 'FAIL', m => m.sliderIssues && m.sliderIssues.length, m => `compare slider: ${m.sliderIssues.join('; ')}`],
  ['nav-wrap', 'FAIL', (m, vp) => vp.touch && m.navWrapped, () => 'phone nav wraps onto a second line at 390'],
  ['heading-color-word', 'FAIL', m => m.headingColorWords && m.headingColorWords.length, m => `heading names the color of its own background: ${m.headingColorWords.join(' | ')}`],
  ['pin-length', 'FAIL', m => m.pinLength && m.pinLength.length, m => `pinned scene is too long: ${m.pinLength.join(' | ')}. Keep 3 screens or less per step and 6 in total`],
  ['stale-claim', 'FAIL', m => m.staleClaims && m.staleClaims.length, m => `stale release claim: ${m.staleClaims.join(', ')}`],
];

async function scrollToY(page, y) {
  await page.evaluate(target => {
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') lenis.scrollTo(target, { immediate: true, force: true });
    window.scrollTo(0, target);
  }, y);
  await page.waitForTimeout(70);
}

async function pinClipsNow(page) {
  return page.evaluate(() => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const roots = new Set();
    document.querySelectorAll('.pin-spacer').forEach(spacer => {
      const fixed = [...spacer.children].find(el => getComputedStyle(el).position === 'fixed');
      if (fixed) roots.add(fixed);
    });
    document.querySelectorAll('[data-pin]').forEach(el => {
      if (getComputedStyle(el).position === 'fixed') roots.add(el);
    });
    const bad = [];
    for (const root of roots) {
      const nodes = [...root.querySelectorAll('h1,h2,h3,p,li,figcaption,img,canvas,button,a,pre')];
      for (const el of nodes) {
        if (el.hidden || el.closest('[hidden]') || el.closest('[aria-hidden="true"]')) continue;
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity < 0.05) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) continue;
        if (r.top < -12 || r.bottom > vh + 12 || r.left < -12 || r.right > vw + 12) {
          const label = (el.innerText || el.getAttribute('alt') || el.getAttribute('aria-label') || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 48);
          bad.push(label || el.tagName);
        }
      }
    }
    return [...new Set(bad)].slice(0, 8);
  });
}

async function walkPins(page) {
  const found = new Set(await pinClipsNow(page));
  const ranges = await page.evaluate(() => [...document.querySelectorAll('.pin-spacer')].map(el => ({
    top: el.getBoundingClientRect().top + window.scrollY,
    height: el.offsetHeight,
  })));
  const vh = page.viewportSize().height;
  for (const range of ranges) {
    const travel = Math.max(0, range.height - vh);
    for (let i = 0; i < 5; i++) {
      await scrollToY(page, range.top + (travel * i) / 4);
      for (const item of await pinClipsNow(page)) found.add(item);
    }
  }
  if (ranges.length) await scrollToY(page, 0);
  return [...found];
}

async function run() {
  const { chromium } = loadPlaywright();
  let server, url = target;
  if (!remote) {
    const rel = relative(root, resolve(target));
    if (rel.startsWith('..')) { console.error('check-ui: the page must be inside --root'); process.exit(2); }
    server = await serve();
    url = `http://127.0.0.1:${server.address().port}/${rel.split(sep).map(encodeURIComponent).join('/')}`;
  }
  const browser = await chromium.launch({ ...((flag('--browser') || process.env.SHIPRIGHT_BROWSER) ? { executablePath: resolve(flag('--browser') || process.env.SHIPRIGHT_BROWSER) } : {}), args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const report = { target, profile, checkedAt: new Date().toISOString(), viewports: {} };
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
    const m = await page.evaluate(measure, { vp, premium: profile === 'premium', expectRelease: flag('--release-state') || '', expectVersion: flag('--pack-version') || '' });
    m.design = await page.evaluate(measureDesign, { appProfile: profile === 'app' });
    m.errors = errors;
    m.pinClipped = await walkPins(page);
    m.pinLength = await page.evaluate(() => {
      const vh = window.innerHeight; const out = [];
      const pins = [...document.querySelectorAll('.pin-spacer')].map(sp => ({ el: sp.firstElementChild || sp, travel: sp.offsetHeight - vh }));
      document.querySelectorAll('[data-pin]').forEach(el => { if (!el.closest('.pin-spacer')) { const host = el.parentElement; if (host && host.offsetHeight > vh) pins.push({ el, travel: host.offsetHeight - vh }); } });
      for (const { el, travel } of pins) {
        if (travel <= 0) continue;
        const steps = Math.max(1, el.querySelectorAll('[data-step]').length || +el.getAttribute('data-steps') || 1);
        const screens = travel / vh; const per = screens / steps;
        if (screens > 6 || per > 3) out.push(`${screens.toFixed(1)} screens for ${steps} step${steps > 1 ? 's' : ''}`);
      }
      return out;
    });
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
    if (profile === 'premium') {
      const normalWords = await page.evaluate(() => [...document.querySelectorAll('[data-act]')].map(el => el.textContent.replace(/\s+/g, ' ').trim()));
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.reload({ waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(300);
      const reduced = await page.evaluate(measure, { vp, premium: true, expectRelease: flag('--release-state') || '', expectVersion: flag('--pack-version') || '' });
      const reducedWords = await page.evaluate(() => [...document.querySelectorAll('[data-act]')].map(el => el.textContent.replace(/\s+/g, ' ').trim()));
      m.reduced = { hiddenText: reduced.hiddenText, heroVisible: reduced.heroVisible, overflowX: reduced.overflowX,
        contentChanged: JSON.stringify(normalWords) !== JSON.stringify(reducedWords) };
      await page.screenshot({ path: join(outDir, `${vp.name}-reduced.png`) });
    }
    const results = [];
    for (const [id, level, test, say] of RULES) {
      if (allow.has(id)) continue;
      if (profile === 'premium' && id === 'hidden-content') continue;
      if (test(m, vp)) results.push({ id, level, message: say(m) });
    }
    if (profile === 'premium') {
      if (!m.heroVisible) results.push({ id: 'product-first-screen', level: 'FAIL', message: 'no visible described product representation on first screen; verify identity in taste critique' });
      if (m.unsupportedProof || m.undeclaredProof) results.push({ id: 'unsupported-proof', level: 'FAIL', message: 'proof claim lacks a source declaration; review truth against supplied facts' });
      if (!m.reduced.heroVisible || m.reduced.hiddenText || m.reduced.contentChanged || m.reduced.overflowX > 1)
        results.push({ id: 'premium-reduced-content', level: 'FAIL', message: 'reduced motion loses product or words, hides content, or overflows' });
      if (!m.craftProduct) results.push({ id: 'craft-product', level: 'FAIL', message: 'first screen does not show the product. Put an image, canvas, or drawing inside the hero' });
      if (m.craftDupes && m.craftDupes.length) results.push({ id: 'craft-composition', level: 'FAIL', message: `acts share a composition: ${m.craftDupes.join(', ')}` });
      if (m.craftAccent) results.push({ id: 'craft-accent', level: 'FAIL', message: m.craftAccent });
      if (m.craftEmpty) results.push({ id: 'craft-empty', level: 'FAIL', message: `${m.craftEmpty} rounded panels are mostly empty` });
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
