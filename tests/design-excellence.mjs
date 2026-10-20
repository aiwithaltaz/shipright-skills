// Real-browser positive and negative cases for the measured craft signals.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { measureDesign, DESIGN_RULES } from '../skills/shipright/scripts/design-metrics.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const browser = await chromium.launch({ ...(process.env.SHIPRIGHT_BROWSER ? { executablePath: process.env.SHIPRIGHT_BROWSER } : {}) });
let passed = 0;
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const run = async (name, html, expected, absent = []) => {
    await page.setContent(`<!doctype html><html><head><style>body{font:14px/20px sans-serif;margin:16px}h1{font:600 24px/32px sans-serif}table{border-collapse:collapse}td,th{padding:4px}nav{width:200px}a{display:inline-block;padding:8px} [hidden]{display:none!important}</style></head><body>${html}</body></html>`);
    const design = await page.evaluate(measureDesign);
    const ids = DESIGN_RULES.filter(([, , test]) => test({ design })).map(([id]) => id);
    for (const id of expected) assert.ok(ids.includes(id), `${name}: missing ${id}: ${JSON.stringify(design)}`);
    for (const id of absent) assert.ok(!ids.includes(id), `${name}: unexpected ${id}: ${JSON.stringify(design)}`);
    passed++; console.log(`PASS ${name}`);
  };
  await run('actual word split', '<table style="width:40px;table-layout:fixed"><tr><td style="word-break:break-all">Alexanderson</td></tr></table>', ['mid-word-break', 'squeezed-columns']);
  await run('natural multiword wrapping', '<table style="width:160px;table-layout:fixed"><tr><td>Anna Lee from Customer Success</td></tr></table>', [], ['mid-word-break']);
  await run('intentional identifier wrapping', '<table style="width:40px;table-layout:fixed"><tr><td data-wrap="identifier" style="word-break:break-all">abcdefghijklm</td></tr></table>', [], ['mid-word-break']);
  await run('declared minimum width', '<table style="width:100px;table-layout:fixed"><tr><td data-min-width="180">Name</td></tr></table>', ['squeezed-columns']);
  await run('atomic value wraps', '<table style="width:90px;table-layout:fixed"><tr><td data-atomic>Not scheduled</td></tr></table>', ['squeezed-columns']);
  await run('serialized values', '<table><tr><td>None</td><td>null</td><td>undefined</td><td>NaN</td></tr></table>', ['raw-data-value']);
  await run('legitimate missing and false values', '<p>None of the records changed.</p><table><tr><td>0</td><td>false</td><td>Unassigned</td></tr></table><code>null</code><p hidden>undefined</p><span data-raw-value="intentional">None</span><button>None</button><label><input type="radio" name="filter">None</label>', [], ['raw-data-value']);
  await run('page-level exception cannot hide serialization', '<main data-raw-value="intentional"><p>null</p><p>undefined</p></main>', ['raw-data-value']);
  await run('required dashboard missing chart', '<main data-screen="dashboard"><h1>Dashboard</h1><p>Sample data</p></main>', ['dashboard-chart']);
  await run('empty chart marker rejected', '<main data-screen="dashboard"><h1>Dashboard</h1><div data-chart style="height:100px">No plot</div></main>', ['dashboard-chart']);
  await run('empty SVG shape rejected', '<main data-screen="dashboard"><h1>Dashboard</h1><svg data-chart width="200" height="80"><path d=""/></svg></main>', ['dashboard-chart']);
  await run('drawn chart candidate', '<main data-screen="dashboard"><h1>Dashboard</h1><figure data-chart><svg width="200" height="80" aria-label="Sample trend"><path d="M0 60L100 20L200 40"/></svg><figcaption>Sample trend</figcaption></figure></main>', [], ['dashboard-chart']);
  await run('flat trend is a valid chart candidate', '<main data-screen="dashboard"><h1>Dashboard</h1><svg data-chart width="200" height="80"><path d="M0 40L200 40" stroke="black"/></svg></main>', [], ['dashboard-chart']);
  const links = '<a href="#a">Overview</a><a href="#b">Contacts</a><a href="#c">Activity</a><a href="#d">Reports</a>';
  await run('clipped nav cannot use hint as bypass', `<p id="hint">Scroll for more</p><nav style="white-space:nowrap;overflow:hidden" data-scroll-hint="hint" aria-describedby="hint">${links}</nav>`, ['nav-scroll-hint']);
  await run('scrolling nav lacks hint', `<nav style="white-space:nowrap;overflow:auto">${links}</nav>`, ['nav-scroll-hint']);
  await run('visible linked scroll hint', `<p id="hint">Scroll for more</p><nav style="white-space:nowrap;overflow:auto" data-scroll-hint="hint" aria-describedby="hint">${links}</nav>`, [], ['nav-scroll-hint']);
  await run('hidden hint rejected', `<p id="hint" hidden>Scroll for more</p><nav style="white-space:nowrap;overflow:auto" data-scroll-hint="hint" aria-describedby="hint">${links}</nav>`, ['nav-scroll-hint']);
  await run('type has no contrast', '<main data-ui="app"><h1 style="font:400 14px/20px sans-serif">Contacts</h1><p>Review the records.</p></main>', ['weak-type-scale']);
  await run('weight creates hierarchy', '<main data-ui="app"><h1 style="font:700 14px/20px sans-serif">Contacts</h1><p>Review the records.</p></main>', [], ['weak-type-scale']);
  await run('worklist does not require decorative chart', '<main data-ui="app"><h1>Contacts</h1><p>Exact record lookup</p></main>', [], ['dashboard-chart']);
  console.log(`${passed} browser cases passed.`);
} finally { await browser.close(); }
