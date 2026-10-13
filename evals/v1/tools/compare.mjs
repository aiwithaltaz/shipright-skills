#!/usr/bin/env node
// Side-by-side image for the before/after gallery and blind grading.
// Usage: node evals/v1/tools/compare.mjs <left.png> <right.png> <out.png> [--labels "Left,Right"] [--width 1400]
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
let pw; for (const n of ['playwright', '/opt/node22/lib/node_modules/playwright']) { try { pw = require(n); break; } catch {} }
if (!pw) { console.error('compare: Playwright not found'); process.exit(2); }
const [left, right, out] = process.argv.slice(2, 5);
const opt = n => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : undefined; };
const labels = (opt('--labels') || 'Before,After').split(',');
const width = +(opt('--width') || 1400);
const img = p => `data:image/png;base64,${readFileSync(p).toString('base64')}`;
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#f2f3f5;font:600 18px/1.3 Inter,system-ui,sans-serif;color:#16181d}
.wrap{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:24px;width:${width}px;box-sizing:border-box;align-items:start}
figure{margin:0} figcaption{margin:0 0 10px} img{width:100%;display:block;border:1px solid #d5d8de;background:#fff}
</style><div class="wrap"><figure><figcaption>${esc(labels[0])}</figcaption><img src="${img(left)}"></figure>
<figure><figcaption>${esc(labels[1])}</figcaption><img src="${img(right)}"></figure></div>`;
const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 600 }, deviceScaleFactor: 1 });
await page.setContent(html); await page.waitForTimeout(300);
await page.locator('.wrap').screenshot({ path: out });
await browser.close();
console.log(`compare: wrote ${out}`);
