// Section screenshots at 390 and 1280 for before/after reviews.
// Usage: node site/scripts/shots.mjs <dist-folder> <out-folder> [page.html ...]
// Serves the folder, scrolls to each [data-act] section, and saves one viewport shot per section.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep, basename } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = resolve(process.argv[2] || 'site/dist');
const out = resolve(process.argv[3] || 'site/evidence/shots');
const pages = process.argv.slice(4).length ? process.argv.slice(4) : ['index.html'];
mkdirSync(out, { recursive: true });

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = createServer((req, res) => {
  const p = decodeURIComponent((req.url || '/').split('?')[0]);
  const file = resolve(root, '.' + (p === '/' ? '/index.html' : p));
  if (!(file + sep).startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const port = server.address().port;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });

for (const pageName of pages) {
  for (const width of [1280, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: width > 500 ? 800 : 844 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:${port}/${pageName}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const acts = await page.$$eval('[data-act]', els => els.map(e => ({ id: e.id || e.dataset.act, y: e.getBoundingClientRect().top + window.scrollY })));
    for (const act of acts) {
      await page.evaluate(y => window.scrollTo(0, Math.max(0, y - 64)), act.y);
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${out}/${width}-${basename(pageName, '.html')}-${act.id}.png` });
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${out}/${width}-${basename(pageName, '.html')}-full.png`, fullPage: true });
    if (errors.length) console.log(width, pageName, 'console errors:', errors);
    await ctx.close();
  }
}
await browser.close();
server.close();
console.log('saved to', out);
