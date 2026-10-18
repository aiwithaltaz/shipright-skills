#!/usr/bin/env node
// Run a test-plan.json with Playwright and write test-report.md.
// Usage: node <skill>/scripts/run-tests.mjs <test-plan.json> [--out dir]
// Each screen needs "file" or "url", "widths", and "actions".
// Also checks console errors, sideways scroll, a visible focus ring, reduced motion,
// and a Sample or Demo label when [data-sample] is present.
// Exit 0 when every step passes. Exit 1 on a failure. Exit 2 on bad usage or missing Playwright.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, dirname, extname, sep, basename } from 'node:path';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  const tries = ['playwright', 'playwright-core'];
  for (const name of tries) { try { return require(name); } catch {} }
  try { return createRequire(join(process.cwd(), 'package.json'))('playwright'); } catch {}
  console.error('run-tests: Playwright not found. Install it with: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}
const args = process.argv.slice(2);
const planPath = args.find((a, i) => !a.startsWith('--') && args[i - 1] !== '--out');
if (!planPath) {
  console.error('usage: node <skill>/scripts/run-tests.mjs <test-plan.json> [--out dir]');
  process.exit(2);
}
const flag = name => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const plan = JSON.parse(readFileSync(resolve(planPath), 'utf8'));
const screens = plan.screens || [];
const outDir = resolve(flag('--out') || join(dirname(resolve(planPath)), 'test-out'));
mkdirSync(outDir, { recursive: true });

function serve(dir) {
  return new Promise(ok => {
    const server = createServer((req, res) => {
      const file = resolve(dir, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!(file + sep).startsWith(dir + sep) || !existsSync(file) || !statSync(file).isFile()) {
        res.writeHead(404); return res.end();
      }
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };
      res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
      res.end(readFileSync(file));
    }).listen(0, '127.0.0.1', () => ok(server));
  });
}

const { chromium } = loadPlaywright();
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const results = [];
let server;
let serverRoot;
function note(name, step, pass, detail) {
  results.push({ name, step, pass, detail });
}
try {
  for (const screen of screens) {
    const file = screen.file ? resolve(dirname(resolve(planPath)), screen.file) : null;
    if (file) {
      const dir = dirname(file);
      if (!server || serverRoot !== dir) {
        if (server) server.close();
        server = await serve(dir);
        serverRoot = dir;
      }
    }
    const port = server ? server.address().port : 0;
    const url = screen.url || `http://127.0.0.1:${port}/${basename(file)}`;
    for (const width of screen.widths || [1280]) {
      const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 800 } });
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      const fit = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
      note(screen.name, `fit ${width}`, fit, fit ? 'no sideways scroll' : 'sideways scroll');
      note(screen.name, `console ${width}`, errors.length === 0, errors[0] || 'no console errors');
      for (const action of screen.actions || []) {
        if (action.type === 'click') await page.click(action.selector);
        if (action.type === 'type') {
          await page.fill(action.selector, action.text || '');
        }
        if (action.type === 'key') await page.keyboard.press(action.key);
        if (action.expectText) {
          const body = await page.locator('body').innerText();
          const ok = body.includes(action.expectText);
          note(screen.name, `${action.type} ${width}`, ok, ok ? action.expectText : `missing ${action.expectText}`);
        }
      }
      const sample = await page.locator('[data-sample]').count();
      if (sample) {
        const label = await page.locator('[data-sample]').first().innerText();
        const ok = /sample|demo/i.test(label);
        note(screen.name, `sample label ${width}`, ok, label.slice(0, 80));
      }
      await page.locator('button, a, input').first().focus();
      const focus = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return false;
        const s = getComputedStyle(el);
        return s.outlineStyle !== 'none' || s.boxShadow !== 'none';
      });
      note(screen.name, `focus ${width}`, focus, focus ? 'focus visible' : 'no focus ring');
      await page.close();
    }
    const quiet = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await quiet.emulateMedia({ reducedMotion: 'reduce' });
    await quiet.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const shown = await quiet.evaluate(() => {
      const el = document.querySelector('[data-keep-text]') || document.querySelector('h1');
      if (!el) return false;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && (el.innerText || '').trim().length > 0;
    });
    note(screen.name, 'reduced motion', shown, shown ? 'text visible' : 'text hidden');
    await quiet.close();
  }
} finally {
  await browser.close();
  if (server) server.close();
}
const failed = results.filter(r => !r.pass);
const lines = ['# Test report', '', 'Status: current', '', '## Steps', ''];
for (const row of results) lines.push(`- ${row.pass ? 'Pass' : 'Fail'}: ${row.name} / ${row.step}. ${row.detail}`);
lines.push('', '## Rounds', '', '- Round 1.', '', '## Limits', '', '- One browser, software rendering. Not a full accessibility audit.', '');
writeFileSync(join(outDir, 'test-report.md'), lines.join('\n'));
console.log(`run-tests: ${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  for (const row of failed) console.error(`FAIL ${row.name} / ${row.step}: ${row.detail}`);
  process.exit(1);
}
