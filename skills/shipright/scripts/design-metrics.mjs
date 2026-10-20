// Browser-side measurements. Thresholds are ShipRight review policies, not aesthetic standards.
// Keep this function self-contained so Playwright can serialize it into a page.
export function measureDesign({ appProfile = false } = {}) {
  const visible = el => {
    if (el.closest('[hidden],[inert],[aria-hidden="true"],script,style,template')) return false;
    const s = getComputedStyle(el), r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && s.display !== 'none' && s.visibility !== 'hidden' && +s.opacity > 0.05;
  };
  const label = el => (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
  const cells = [...document.querySelectorAll('td,th,[role="cell"],[role="gridcell"],[role="columnheader"],[data-column]')].filter(visible);
  const wordBreaks = [], squeezedColumns = [], rawValues = [], navOverflow = [];
  const lines = rects => new Set([...rects].filter(r => r.width > 0 && r.height > 0).map(r => Math.round(r.top / 2))).size;
  for (const cell of cells) {
    const brokenBefore = wordBreaks.length;
    const s = getComputedStyle(cell), rect = cell.getBoundingClientRect();
    const min = Number(cell.getAttribute('data-min-width'));
    const range = document.createRange(); range.selectNodeContents(cell);
    const atomic = cell.matches('[data-atomic],[data-kind="money"],[data-kind="date"],[data-kind="status"]');
    if ((min > 0 && rect.width + 1 < min) || (atomic && lines(range.getClientRects()) > 1) ||
        (cell.scrollWidth > cell.clientWidth + 2 && s.textOverflow !== 'ellipsis' && !/auto|scroll/.test(s.overflowX))) {
      squeezedColumns.push({ text: label(cell), width: Math.round(rect.width), min: min || null });
    }
    const walker = document.createTreeWalker(cell, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!visible(node.parentElement) || node.parentElement.closest('code,pre,kbd,[data-wrap="identifier"]')) continue;
      for (const match of node.textContent.matchAll(/[\p{Script=Latin}\p{N}]{4,}/gu)) {
        range.setStart(node, match.index); range.setEnd(node, match.index + match[0].length);
        if (lines(range.getClientRects()) > 1) wordBreaks.push({ word: match[0].slice(0, 40), cell: label(cell) });
      }
    }
    if (wordBreaks.length > brokenBefore && !squeezedColumns.some(x => x.text === label(cell))) {
      squeezedColumns.push({ text: label(cell), width: Math.round(rect.width), min: min || null });
    }
  }
  // Scan visible text nodes, not source code or attribute values. An isolated None in a
  // native choice is valid; a serialized value in a record or sentence is suspicious.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode, el = node.parentElement;
    if (!visible(el) || el.closest('code,pre,kbd,samp,option')) continue;
    const value = node.textContent.trim();
    const exception = el.closest('[data-raw-value="intentional"]');
    if (exception && !exception.matches('body,main,section,article,table') && /^(?:null|None|undefined|NaN)$/.test(exception.textContent.trim())) continue;
    const tokens = value.match(/\b(?:null|undefined|NaN|None)\b/g) || [];
    for (const token of tokens) {
      if (token === 'None' && value !== 'None' && !el.closest('td,[role="cell"],[role="gridcell"],[data-column]') && !/:\s*None\b/.test(value)) continue;
      if (token === 'None' && el.closest('button,[role="option"],[role="radio"]') && value === 'None') continue;
      if (token === 'None' && value === 'None') {
        const choice = el.closest('label');
        const input = choice && (choice.querySelector('input') || document.getElementById(choice.htmlFor));
        if (input && /^(radio|checkbox)$/.test(input.type)) continue;
      }
      rawValues.push({ token, text: value.slice(0, 80) });
    }
  }
  for (const nav of document.querySelectorAll('nav,[role="tablist"],[data-nav-scroll]')) {
    if (!visible(nav) || nav.scrollWidth <= nav.clientWidth + 2) continue;
    const style = getComputedStyle(nav), r = nav.getBoundingClientRect();
    const scrollable = /auto|scroll/.test(style.overflowX);
    const items = [...nav.querySelectorAll('a,button,[role="tab"]')].filter(visible);
    const clipped = items.some(el => { const b = el.getBoundingClientRect(); return b.left < r.left - 1 || b.right > r.right + 1; });
    if (!clipped) continue;
    const hintId = nav.getAttribute('data-scroll-hint');
    const hint = hintId ? document.getElementById(hintId) : null;
    const described = (nav.getAttribute('aria-describedby') || '').split(/\s+/).includes(hintId);
    const textHint = hint && visible(hint) && described && /scroll|swipe|more|next|previous/i.test(label(hint));
    const controls = [...document.querySelectorAll('button[aria-controls]')].filter(el => visible(el) &&
      nav.id && el.getAttribute('aria-controls').split(/\s+/).includes(nav.id) && /scroll|next|previous|more/i.test(el.getAttribute('aria-label') || label(el)));
    // A marker alone never counts. The associated hint/control must be visible and named.
    if (!scrollable || (!textHint && !controls.length)) navOverflow.push({ text: label(nav), scrollable });
  }
  const app = appProfile || !!document.querySelector('[data-ui="app"],[data-screen="dashboard"]');
  const dashboard = !!document.querySelector('[data-screen="dashboard"],[data-chart-required="true"]') ||
    (app && /\bdashboard\b/i.test(document.querySelector('h1')?.textContent || ''));
  const charts = [...document.querySelectorAll('[data-chart],figure[aria-label*="chart" i]')].filter(visible).filter(el => {
    const media = el.matches('svg,canvas,img') ? [el] : [...el.querySelectorAll('svg,canvas,img')];
    return media.some(m => {
      const r = m.getBoundingClientRect();
      if (!visible(m) || r.width < 80 || r.height < 40) return false;
      if (m.tagName.toLowerCase() === 'svg') return [...m.querySelectorAll('path,rect,line,polyline,polygon,circle')].some(shape => {
        const style = getComputedStyle(shape);
        if (style.display === 'none' || style.visibility === 'hidden' || +style.opacity <= 0.05) return false;
        const box = shape.getBBox(); return box.width > 0 || box.height > 0;
      });
      if (m.tagName.toLowerCase() === 'img') return m.complete && m.naturalWidth > 0;
      return m.width > 0 && m.height > 0;
    });
  });
  const heading = document.querySelector('main h1,h1');
  const body = [...document.querySelectorAll('main p,main td,main [role="cell"],main [role="gridcell"],main [data-type="body"]')].filter(visible);
  let weakType = null;
  if (app && heading && visible(heading) && body.length) {
    const sizes = body.map(el => parseFloat(getComputedStyle(el).fontSize)).sort((a, b) => a - b);
    const size = sizes[Math.floor(sizes.length / 2)];
    const weights = body.map(el => parseInt(getComputedStyle(el).fontWeight, 10) || 400).sort((a, b) => a - b);
    const h = getComputedStyle(heading), hs = parseFloat(h.fontSize), hw = parseInt(h.fontWeight, 10) || 400;
    if (hs < size * 1.2 && hw < weights[Math.floor(weights.length / 2)] + 150) weakType = { title: hs, body: size, weight: hw };
  }
  return { wordBreaks, squeezedColumns, rawValues, navOverflow, dashboard, chartCount: charts.length, weakType };
}

export const DESIGN_RULES = [
  ['mid-word-break', 'FAIL', m => m.design.wordBreaks.length, m => `words split inside cells: ${m.design.wordBreaks.slice(0, 3).map(x => x.word).join(', ')}`],
  ['squeezed-columns', 'FAIL', m => m.design.squeezedColumns.length, m => `${m.design.squeezedColumns.length} cells clip, wrap atomic values, or violate declared minimum widths`],
  ['raw-data-value', 'FAIL', m => m.design.rawValues.length, m => `unformatted values: ${m.design.rawValues.slice(0, 3).map(x => x.text).join(' | ')}`],
  ['dashboard-chart', 'FAIL', m => m.design.dashboard && !m.design.chartCount, () => 'dashboard has no visible chart candidate; verify its question, data and encoding in visual review'],
  ['nav-scroll-hint', 'FAIL', m => m.design.navOverflow.length, () => 'navigation clips destinations without scrolling and a visible linked hint or named scroll control'],
  ['weak-type-scale', 'WARN', m => !!m.design.weakType, m => `app title (${m.design.weakType.title}px) has little size or weight contrast against body (${m.design.weakType.body}px); review the hierarchy`],
];
