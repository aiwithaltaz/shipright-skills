// Screenshots of every section and every pinned frame at 390 and 1280.
// Serves site/dist. Writes site/evidence/v1.3.1/.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = resolve(import.meta.dirname, '../dist');
const out = resolve(import.meta.dirname, '../evidence/v1.3.1');
mkdirSync(out, { recursive: true });
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
};
const server = createServer((req, res) => {
  const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!(file + sep).startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404); return res.end();
  }
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const port = server.address().port;
const browser = await chromium.launch({
  executablePath: process.env.SHIPRIGHT_BROWSER,
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

async function settle(page, y) {
  await page.evaluate(target => {
    const lenis = window.__lenis;
    if (lenis && lenis.scrollTo) lenis.scrollTo(target, { immediate: true, force: true });
    window.scrollTo(0, target);
  }, y);
  await page.waitForTimeout(280);
}

async function shotSection(page, width, name, id) {
  const y = await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (!el) return 0;
    return Math.max(0, el.getBoundingClientRect().top + window.scrollY);
  }, `[data-act="${id}"], #${id}`);
  await settle(page, y);
  await page.screenshot({ path: resolve(out, `${width}-${name}-${id}.png`), timeout: 60000, animations: 'disabled' });
}

async function shotPin(page, width, name, id, count) {
  const range = await page.evaluate(sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const spacer = el.closest('.pin-spacer');
    if (!spacer) return { start: el.offsetTop, end: el.offsetTop };
    const start = spacer.offsetTop;
    return { start, end: start + spacer.offsetHeight - window.innerHeight };
  }, `#${id}`);
  if (!range) return;
  for (let i = 0; i < count; i += 1) {
    const progress = (i + 0.45) / count;
    const y = range.start + (range.end - range.start) * progress;
    await settle(page, y);
    await page.screenshot({ path: resolve(out, `${width}-${name}-${id}-${i}.png`), timeout: 60000, animations: 'disabled' });
  }
}

const pages = [
  { name: 'home', path: '/', sections: ['run', 'compare', 'process', 'proof', 'install', 'close'], pins: [{ id: 'run', count: 5 }, { id: 'process', count: 5 }] },
  { name: 'case', path: '/case-study.html', sections: ['problem', 'research', 'shots', 'results'], pins: [] },
];

const onlyWidth = process.argv[2] ? Number(process.argv[2]) : 0;
const onlyPage = process.argv[3] || '';
for (const width of [1280, 390]) {
  if (onlyWidth && width !== onlyWidth) continue;
  for (const item of pages) {
    if (onlyPage && item.name !== onlyPage) continue;
    const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 800 } });
    await page.goto(`http://127.0.0.1:${port}${item.path}`, { waitUntil: 'commit', timeout: 60000 });
    await page.waitForSelector('h1', { timeout: 20000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);
    for (const id of item.sections) await shotSection(page, width, item.name, id);
    for (const pin of item.pins) await shotPin(page, width, item.name, pin.id, pin.count);
    await page.close();
  }
}
await browser.close();
server.close();
console.log('shots written to ' + out);
