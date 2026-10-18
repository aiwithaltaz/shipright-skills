#!/usr/bin/env node
// Playwright checks for every block in skills/shipright/blocks.
// Renders at 390 and 1280, no console errors, no sideways scroll.
// Reduced motion keeps [data-keep-text] visible. The main interaction sets [data-test=out].
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, dirname, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  for (const name of ['playwright', 'playwright-core']) {
    try { return require(name); } catch {}
  }
  console.error('blocks: Playwright not found. Install it with: npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../skills/shipright/blocks');
const shots = join(root, 'shots');
mkdirSync(shots, { recursive: true });
const files = readdirSync(root).filter(name => name.endsWith('.html')).sort();
function serve(dir) {
  return new Promise(ok => {
    const server = createServer((req, res) => {
      const file = resolve(dir, '.' + decodeURIComponent(new URL(req.url, 'http://x').pathname));
      if (!(file + sep).startsWith(dir + sep) || !existsSync(file) || !statSync(file).isFile()) {
        res.writeHead(404); return res.end();
      }
      const types = {
        '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
        '.woff2': 'font/woff2', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.svg': 'image/svg+xml',
      };
      res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
      res.end(readFileSync(file));
    }).listen(0, '127.0.0.1', () => ok(server));
  });
}
const { chromium } = loadPlaywright();
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const server = await serve(root);
const port = server.address().port;
const fails = [];
try {
  for (const name of files) {
    const url = `http://127.0.0.1:${port}/${name}`;
    for (const vp of [{ tag: 'desktop', width: 1280, height: 800 }, { tag: 'phone', width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (await page.locator('body[data-ready]').count()) {
        await page.waitForFunction(() => document.body.dataset.ready === '1', { timeout: 25000 });
      } else {
        await page.waitForTimeout(50);
      }
      const fit = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
      if (!fit) fails.push(`${name} ${vp.tag}: sideways scroll`);
      if (errors.length) fails.push(`${name} ${vp.tag}: ${errors[0]}`);
      if (vp.tag === 'desktop' && await page.locator('html[data-webgl]').count()) {
        let blank = true;
        let varied = 0;
        for (let i = 0; i < 12 && blank; i += 1) {
          const sample = await page.evaluate(() => {
            const c = document.querySelector('canvas');
            if (!c || c.hidden || c.width < 10 || c.height < 10) return 0;
            const probe = document.createElement('canvas');
            const w = Math.min(c.width, 160);
            const h = Math.min(c.height, 90);
            probe.width = w;
            probe.height = h;
            const g = probe.getContext('2d', { willReadFrequently: true });
            g.drawImage(c, 0, 0, w, h);
            const data = g.getImageData(0, 0, w, h).data;
            const r0 = data[0];
            const g0 = data[1];
            const b0 = data[2];
            let count = 0;
            for (let p = 0; p < data.length; p += 16) {
              if (Math.abs(data[p] - r0) + Math.abs(data[p + 1] - g0) + Math.abs(data[p + 2] - b0) > 18) count += 1;
            }
            return count;
          });
          varied = sample;
          blank = sample < 12;
          if (blank) await page.waitForTimeout(150);
        }
        if (blank) fails.push(`${name}: canvas is blank (${varied})`);
      }
      await page.screenshot({ path: join(shots, `${name.replace('.html', '')}-${vp.tag}.png`) });
      if (vp.tag === 'desktop') {
        const mode = await page.locator('html').getAttribute('data-interaction');
        const expect = await page.locator('html').getAttribute('data-expect');
        const run = page.locator('[data-test="run"]');
        if (mode === 'key') {
          await run.focus();
          await page.keyboard.press('ArrowDown');
          await page.keyboard.press('Enter');
        } else {
          await run.click();
        }
        const got = (await page.locator('[data-test="out"]').innerText()).trim();
        if (got !== expect) fails.push(`${name}: interaction wanted ${expect}, got ${got}`);
      }
      await page.close();
    }
    const quiet = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const quietErrors = [];
    quiet.on('pageerror', err => quietErrors.push(err.message));
    quiet.on('console', msg => { if (msg.type() === 'error') quietErrors.push(msg.text()); });
    await quiet.emulateMedia({ reducedMotion: 'reduce' });
    await quiet.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const shown = await quiet.evaluate(() => {
      const el = document.querySelector('[data-keep-text]');
      if (!el) return false;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden' && (el.innerText || '').trim().length > 8;
    });
    if (!shown) fails.push(`${name}: reduced motion hid the required text`);
    const webgl = await quiet.locator('html[data-webgl]').count();
    if (webgl) {
      const poster = await quiet.evaluate(() => {
        const el = document.querySelector('[data-poster]');
        if (!el) return false;
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return r.height > 40 && s.display !== 'none' && s.visibility !== 'hidden';
      });
      if (!poster) fails.push(`${name}: reduced motion poster missing`);
    }
    if (quietErrors.length) fails.push(`${name} reduced: ${quietErrors[0]}`);
    await quiet.close();
  }
} finally {
  await browser.close();
  server.close();
}
writeFileSync(join(shots, 'index.txt'), files.join('\n') + '\n');
if (fails.length) {
  console.error('blocks: fail');
  for (const line of fails) console.error(line);
  process.exit(1);
}
console.log(`blocks: pass ${files.length}`);
