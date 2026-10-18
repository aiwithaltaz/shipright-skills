// Screenshots of every section at 390 and 1280. Serves site/dist.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = resolve(import.meta.dirname, '../dist');
const out = resolve(import.meta.dirname, '../evidence/v1.3');
mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.glb': 'model/gltf-binary' };
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
const pages = [
  { name: 'home', path: '/', sections: ['run', 'compare', 'process', 'product', 'proof', 'install', 'close'] },
  { name: 'case', path: '/case-study.html', sections: ['problem', 'research', 'shots', 'results'] },
];
for (const width of [1280, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width < 500 ? 844 : 900 } });
  for (const item of pages) {
    await page.goto(`http://127.0.0.1:${port}${item.path}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    for (const id of item.sections) {
      const handle = page.locator(`[data-act="${id}"], #${id}`).first();
      await handle.evaluate(el => {
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, Math.max(0, y));
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: resolve(out, `${width}-${item.name}-${id}.png`) });
    }
  }
  await page.close();
}
await browser.close();
server.close();
console.log('shots written to ' + out);
