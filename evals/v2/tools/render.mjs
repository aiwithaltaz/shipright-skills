// Render every run's index.html at 1280 and 390 and record measured facts.
// Usage: PW=/path/to/playwright/index.mjs node render.mjs <work>/<phase> <baseUrl-for-work-root> [caseFilter]
// Expects a static server whose root is <work>. Writes <run>/shots/*.png and <run>/render.json.
import fs from 'node:fs';
import path from 'node:path';
const { chromium } = await import(process.env.PW || 'playwright');
const [, , phaseDir, baseUrl, filter] = process.argv;
const workRoot = path.dirname(phaseDir);
const runs = [];
for (const c of fs.readdirSync(phaseDir)) {
  const cd = path.join(phaseDir, c);
  if (!fs.statSync(cd).isDirectory() || c === 'pack' || (filter && !c.includes(filter))) continue;
  for (const a of fs.readdirSync(cd)) if (fs.existsSync(path.join(cd, a))) runs.push(path.join(cd, a));
}
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
for (const run of runs) {
  const shots = path.join(run, 'shots');
  fs.mkdirSync(shots, { recursive: true });
  const facts = { index: fs.existsSync(path.join(run, 'index.html')), views: {} };
  if (!facts.index) { fs.writeFileSync(path.join(run, 'render.json'), JSON.stringify(facts, null, 2)); console.log('NO PAGE', run); continue; }
  const url = baseUrl.replace(/\/$/, '') + '/' + path.relative(workRoot, run).split(path.sep).join('/') + '/index.html';
  for (const [w, h, tag, frames] of [[1280, 800, 'desktop', 6], [390, 844, 'phone', 3]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const errors = [], failed = [];
    page.on('pageerror', e => errors.push(e.message.slice(0, 200)));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
    page.on('requestfailed', r => failed.push(r.url().slice(-120)));
    try { await page.goto(url, { waitUntil: 'load', timeout: 45000 }); } catch (e) { errors.push('load: ' + e.message.slice(0, 120)); }
    await page.waitForTimeout(5000);
    const H = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => 0);
    const n = Math.max(1, Math.min(frames, Math.ceil(H / h)));
    for (let i = 0; i < n; i++) {
      if (i > 0) { await page.mouse.wheel(0, Math.floor((H - h) / Math.max(1, n - 1))); await page.waitForTimeout(1800); }
      await page.screenshot({ path: path.join(shots, `${tag}-${i + 1}.png`) });
    }
    const m = await page.evaluate(() => ({
      overflowX: document.documentElement.scrollWidth > innerWidth + 1,
      brokenImages: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
      textLength: document.body ? document.body.innerText.length : 0,
    })).catch(() => ({}));
    facts.views[tag] = { height: H, frames: n, errors: [...new Set(errors)].slice(0, 10), failedRequests: failed.slice(0, 10), ...m };
    await page.close();
  }
  fs.writeFileSync(path.join(run, 'render.json'), JSON.stringify(facts, null, 2));
  console.log('ok', path.relative(phaseDir, run), JSON.stringify({ d: facts.views.desktop?.errors.length, ox: facts.views.phone?.overflowX }));
}
await browser.close();
