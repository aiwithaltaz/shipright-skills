#!/usr/bin/env node
// ShipRight leak check (required before done). No browser needed.
// Scans visible text in .html files and quoted strings in .js files for planning words,
// notes to self and fused labels. Exit 1 if anything is found.
// Usage: node <skill>/scripts/check-leaks.mjs [project folder, default .] [--allow "word,word"] [--render]
// --render (needs Playwright): also opens every .html at 390 and 1280, clicks nothing, and scans the rendered
// text (innerText), which catches labels fused by layout, like "streak" + "Weekdays" = "streakWeekdays".
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const args = process.argv.slice(2);
const root = args.find(a => !a.startsWith('--')) || '.';
const ai = args.indexOf('--allow');
const allow = ai >= 0 ? (args[ai + 1] || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : [];

const PLAN = [
  /\bnot listed\b/i, /\bplaceholder\b/i, /\bTODO\b/, /\bTBD\b/, /\bFIXME\b/, /\blorem ipsum\b/i,
  /\b(per|see|from|in) (PRODUCT|DESIGN|BASELINE|LOOK-REPORT)(\.md)?\b/i, /\b(PRODUCT|DESIGN|BASELINE|LOOK-REPORT)\.md\b/,
  /\bnote to self\b/i, /\bfor the (judge|reviewer|hiring manager reading this)\b/i,
  /\b(mood|design principle|philosophy|ritual|art direction|style pack|craft bar|keep-what-works)\b/i,
  /\b(insert|add|replace) (real|actual|your) \w+/i, /\[(name|number|metric|link|company|tbd)[^\]]*\]/i,
  /\{\{.*?\}\}/, /\bundefined\b/, /\bNaN\b/, /\[object Object\]/,
];
// fused labels: camelCase words like streakWeekdays, or two Capitalized words joined
const FUSED = /\b[a-z]{3,}[A-Z][a-z]{2,}\w*\b/;
const render = args.includes('--render');

function walk(d, out = []) {
  for (const n of readdirSync(d)) {
    if (['node_modules', '.git', 'shots', 'dist', 'vendor'].includes(n)) continue;
    const p = join(d, n); const s = statSync(p);
    if (s.isDirectory()) walk(p, out); else if (['.html', '.htm', '.js', '.mjs', '.jsx', '.tsx'].includes(extname(n))) out.push(p);
  }
  return out;
}
function htmlText(src) {
  const attrs = [...src.matchAll(/\b(?:alt|title|aria-label|placeholder|value)\s*=\s*"([^"]*)"/gi)].map(m => m[1]);
  const body = src.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ');
  const scripts = [...src.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => jsText(m[1])).flat();
  return [...body.split('\n'), ...attrs, ...scripts];
}
function jsText(src) {
  const noComments = src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/.*$/gm, '$1');
  const out = [];
  for (const m of noComments.matchAll(/(["'`])((?:\\.|(?!\1)[^\\\n])*)\1/g)) {
    let s = m[2].replace(/\$\{[^}]*\}/g, ' ').replace(/<[^>]+>/g, ' ');
    // only strings that look like words a user reads (has a space or starts with a capital)
    if (/[a-z]/i.test(s) && (/\s/.test(s.trim()) || /^[A-Z][a-z]/.test(s))) out.push(s);
  }
  return out;
}
const hits = [];
const BRAND = /^(iPhone|iPad|iOS|macOS|eBay|iCloud|watchOS)$/;
function check(f, t, fused) {
  for (const r of PLAN) if (r.test(t)) { hits.push([f, 'planning', t]); break; }
  const fm = fused && t.match(FUSED);
  if (fm && !BRAND.test(fm[0])) hits.push([f, 'fused label', `${fm[0]} in "${t.slice(0, 80)}"`]);
}
for (const f of walk(root)) {
  const src = readFileSync(f, 'utf8');
  const lines = /\.html?$/.test(f) ? htmlText(src) : jsText(src);
  for (const raw of lines) {
    const t = raw.replace(/\s+/g, ' ').trim(); if (!t) continue;
    const low = t.toLowerCase(); if (allow.some(a => low.includes(a))) continue;
    check(f, t, /\.html?$/.test(f));
  }
}
if (render) {
  let chromium;
  const { createRequire } = await import('node:module'); const { existsSync } = await import('node:fs');
  const tries = [process.env.PLAYWRIGHT_PATH, 'playwright', 'playwright-core', '@playwright/test'].filter(Boolean);
  for (const t of tries) { try { const m = await import(existsSync(t) ? 'file://' + join(t, 'index.mjs') : t); chromium = m.chromium || m.default?.chromium; if (chromium) break; } catch {}
    try { const m = createRequire(join(process.cwd(), 'x.js'))(t); chromium = m.chromium; if (chromium) break; } catch {} }
  if (!chromium) { try { const { execSync } = await import('node:child_process'); const g = execSync('npm root -g', { encoding: 'utf8' }).trim(); chromium = createRequire(join(g, 'x.js'))('playwright').chromium; } catch {} }
  if (!chromium) console.log('WARN: --render needs Playwright (or PLAYWRIGHT_PATH). Static scan only; read the screenshots for fused labels.');
  let b;
  if (chromium) try { b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}); } catch {}
  if (chromium && !b) for (const c of ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']) { try { b = await chromium.launch({ executablePath: c }); break; } catch {} }
  if (chromium && !b) { console.log('WARN: no browser could start (set CHROME_PATH). Static scan only.'); }
  if (b) {
    for (const f of walk(root).filter(x => /\.html?$/.test(x))) for (const w of [390, 1280]) {
      const pg = await b.newPage({ viewport: { width: w, height: 844 } });
      await pg.goto('file://' + (f.startsWith('/') ? f : join(process.cwd(), f))); await pg.waitForTimeout(600);
      // read text as written, not as styled: uppercase CSS would turn names into caps and cause false hits or misses
      await pg.addStyleTag({ content: '*{text-transform:none!important}' });
      const txt = await pg.evaluate(() => document.body.innerText);
      for (const l of txt.split('\n')) { const t = l.trim(); if (t) check(`${f}@${w}`, t, true); }
      await pg.close();
    }
    await b.close();
  }
}
const seen = new Set(); for (let i = hits.length - 1; i >= 0; i--) { const k = hits[i][1] + hits[i][2]; if (seen.has(k)) hits.splice(i, 1); else seen.add(k); }
if (!hits.length) { console.log('LEAK CHECK PASS: no planning words or fused labels in visible text.'); process.exit(0); }
console.log(`LEAK CHECK FAIL: ${hits.length} hit(s). Remove or rewrite each, then run again.`);
for (const [f, k, t] of hits.slice(0, 60)) console.log(`- ${f} [${k}] ${t.slice(0, 120)}`);
console.log('False hit? Rerun with --allow "word" and say why in LOOK-REPORT.md.');
process.exit(1);
