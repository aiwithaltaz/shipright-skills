/* Fleet — AI Agent Control Room · demo data, no network calls */
(() => {
'use strict';

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const rnd = mulberry32(20261016);
const R = (a, b) => a + (b - a) * rnd();
const RI = (a, b) => Math.floor(R(a, b + 1));
const pick = arr => arr[Math.floor(rnd() * arr.length)];
const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtInt = n => Math.round(n).toLocaleString('en-US');
const fmtCompact = n => n >= 10000 ? (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'k' : fmtInt(n);
const fmtUsd = n => n >= 1000 ? '$' + fmtInt(n) : n >= 100 ? '$' + Math.round(n) : '$' + n.toFixed(2);
const fmtPct = (n, d = 1) => (n * 100).toFixed(d) + '%';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- simulated clock (demo is pinned to 14:20 today) ---------------- */
const START = new Date(); START.setHours(14, 20, 0, 0);
const realStart = Date.now();
const now = () => new Date(START.getTime() + (Date.now() - realStart));
const NOW_H = 14, NOW_FRAC = 20 / 60;
const hhmm = d => d.toTimeString().slice(0, 5);
const hhmmss = d => d.toTimeString().slice(0, 8);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// share of a day's volume by hour (business-hours shaped)
const W = Array.from({ length: 24 }, (_, h) => 0.12 + Math.exp(-((h - 10.5) ** 2) / 14) + 0.8 * Math.exp(-((h - 15) ** 2) / 9));
const WSUM = sum(W);
const DONE_SHARE = (sum(W.slice(0, NOW_H)) + W[NOW_H] * NOW_FRAC) / WSUM; // typical share of the day done by now

/* ---------------- fleet definition ---------------- */
const DEPTS = [
  { id: 'support', name: 'Support', noun: 'ticket', tools: ['Helpdesk', 'Order lookup', 'Refunds API (≤ $200)', 'Email'], owners: ['Priya S.', 'Jonas W.'],
    agents: ['Ticket Triage', 'Refund Resolver', 'Order Status Bot', 'Warranty Checker', 'Churn Saver', 'Help Center Writer', 'Voice Callback Agent', 'Escalation Summarizer'] },
  { id: 'sales', name: 'Sales', noun: 'lead', tools: ['CRM', 'Web search', 'Enrichment API', 'Email', 'Calendar'], owners: ['Dana K.', 'Luis M.'],
    agents: ['Lead Enricher', 'Outbound Drafter', 'Meeting Prepper', 'CRM Hygiene', 'Quote Builder', 'Renewal Nudger', 'RFP Responder'] },
  { id: 'finance', name: 'Finance', noun: 'invoice', tools: ['ERP', 'Ledger', 'Bank feed (read-only)', 'Email'], owners: ['Grace L.', 'Omar H.'],
    agents: ['Invoice Matcher', 'Expense Auditor', 'Collections Agent', 'Month-End Reconciler', 'Vendor Onboarder', 'Forecast Assistant'] },
  { id: 'eng', name: 'Engineering', noun: 'PR', tools: ['Code repo', 'CI runner', 'Issue tracker', 'Logs'], owners: ['Marco D.', 'Aisha N.', 'Ben T.'],
    agents: ['PR Reviewer', 'Test Writer', 'Incident Scribe', 'Dependency Bumper', 'On-call Triage', 'Docs Sync', 'Flaky Test Hunter', 'Migration Helper'] },
  { id: 'marketing', name: 'Marketing', noun: 'draft', tools: ['CMS', 'Analytics', 'Ad platform (read-only)', 'Social scheduler'], owners: ['Chloe R.', 'Sam P.'],
    agents: ['Campaign Copywriter', 'SEO Auditor', 'Social Scheduler', 'Ad Spend Watcher', 'Webinar Recapper', 'Brand Checker'] },
  { id: 'people', name: 'People', noun: 'request', tools: ['HRIS', 'Calendar', 'Applicant tracker', 'Policy wiki'], owners: ['Nadia F.'],
    agents: ['Candidate Screener', 'Interview Scheduler', 'Onboarding Buddy', 'Policy Q&A', 'Benefits Helper'] },
  { id: 'legal', name: 'Legal', noun: 'contract', tools: ['Contract repo', 'E-signature', 'Clause library'], owners: ['Henry O.'],
    agents: ['Contract Redliner', 'NDA Fast-Track', 'Compliance Monitor', 'Privacy Request Handler'] },
  { id: 'ops', name: 'Operations', noun: 'order', tools: ['Warehouse system', 'Supplier portal', 'Shipping API', 'Email'], owners: ['Yuki T.', 'Rafael C.'],
    agents: ['Inventory Forecaster', 'Supplier Emailer', 'Shipping Exception Agent', 'Returns Router', 'Facilities Desk', 'Procurement Agent'] },
];
const deptById = Object.fromEntries(DEPTS.map(d => [d.id, d]));
const TIER = { L: { name: 'Large model', cpt: [0.09, 0.2] }, M: { name: 'Medium model', cpt: [0.025, 0.06] }, S: { name: 'Small model', cpt: [0.004, 0.012] } };
const AUTONOMY = { L1: 'L1 · Suggest', L2: 'L2 · Approve', L3: 'L3 · Autonomous' };
const AUTONOMY_HELP = { L1: 'Drafts only — a human sends', L2: 'Acts after a human approves risky steps', L3: 'Acts alone within caps — audited' };

const agents = [];
DEPTS.forEach(d => d.agents.forEach((name, i) => {
  const tier = pick(['L', 'M', 'M', 'S', 'S']);
  agents.push({
    id: 'ag' + (agents.length + 1), name, dept: d.id, owner: d.owners[i % d.owners.length], tier,
    autonomy: pick(['L1', 'L2', 'L3', 'L3', 'L3']), status: 'running',
    base: Math.round(R(80, 1400)), cpt: R(...TIER[tier].cpt), success: R(0.9, 0.985), escal: R(0.02, 0.07),
    cap: null, version: `v${RI(1, 4)}.${RI(0, 9)}`, deployed: RI(1, 30),
    tools: d.tools.slice(0, RI(2, d.tools.length)), avgSec: RI(4, 80), note: '',
  });
}));
const byName = n => agents.find(a => a.name === n);
const set = (n, o) => Object.assign(byName(n), o);

set('Ticket Triage', { base: 2600, tier: 'S', cpt: 0.006, autonomy: 'L3', escal: 0.21 });
set('Order Status Bot', { base: 1900, tier: 'S', cpt: 0.005, autonomy: 'L3' });
set('Refund Resolver', { base: 720, tier: 'M', cpt: 0.04, autonomy: 'L2' });
set('Invoice Matcher', { base: 820, tier: 'M', cpt: 0.035, autonomy: 'L3', status: 'error', success: 0.79, note: 'ERP API returning 503 since 13:42' });
set('Lead Enricher', { base: 560, tier: 'L', cpt: 0.16, autonomy: 'L3' });
set('Contract Redliner', { base: 140, tier: 'L', cpt: 0.19, autonomy: 'L2', status: 'waiting' });
set('NDA Fast-Track', { base: 90, tier: 'M', cpt: 0.05, autonomy: 'L2', status: 'waiting' });
set('Quote Builder', { autonomy: 'L2', status: 'waiting' });
set('Collections Agent', { autonomy: 'L2', status: 'waiting' });
set('Dependency Bumper', { status: 'paused', note: 'Paused by Marco D. · 2 days ago · noisy PRs' });
set('Ad Spend Watcher', { status: 'paused', note: 'Paused by Chloe R. · 09:12 today · budget review' });
set('Month-End Reconciler', { status: 'idle', base: 20, note: 'Runs in the last 3 days of the month' });
set('Webinar Recapper', { status: 'idle', base: 30 });
set('Forecast Assistant', { status: 'idle', base: 40 });
set('Docs Sync', { status: 'idle', base: 300, note: 'Last run 11:40 · scheduled hourly' });

// time series per agent
agents.forEach(a => {
  a.prevHourly = W.map(w => a.base * w / WSUM * R(0.85, 1.08));
  a.hourly = W.map((w, h) => {
    if (h > NOW_H) return null;
    let v = a.base * w / WSUM * R(0.88, 1.12);
    if (h === NOW_H) v *= NOW_FRAC;
    return v;
  });
  if (a.name === 'Dependency Bumper') a.hourly = a.hourly.map(v => v === null ? null : 0);
  if (a.name === 'Ad Spend Watcher') a.hourly = a.hourly.map((v, h) => v === null ? null : h >= 9 ? 0 : v);
  if (a.name === 'Docs Sync') a.hourly = a.hourly.map((v, h) => v === null ? null : h >= 12 ? 0 : v);
  if (a.name === 'Lead Enricher') a.hourly = a.hourly.map((v, h) => v === null ? null : h >= 11 ? v * 5.2 : v);
  if (a.status === 'idle' && a.name !== 'Docs Sync') a.hourly = a.hourly.map((v, h) => v === null ? null : h >= 13 ? 0 : v);
  a.hourly = a.hourly.map(v => v === null ? null : Math.round(v));
  a.tasksToday = sum(a.hourly);
  a.costToday = a.tasksToday * a.cpt;
  // last-24h sparkline: yesterday's later hours then today's
  a.spark = Array.from({ length: 24 }, (_, k) => {
    const h = (NOW_H + 1 + k) % 24;
    return k >= 24 - (NOW_H + 1) ? a.hourly[h] / (h === NOW_H ? NOW_FRAC : 1) : a.base * W[h] / WSUM * R(0.85, 1.1);
  });
  // 60 days of daily volume (index 59 = today)
  a.days = Array.from({ length: 60 }, (_, i) => {
    const d = new Date(START); d.setDate(d.getDate() - (59 - i));
    const wk = [0, 6].includes(d.getDay()) ? 0.42 : 1;
    return Math.round(a.base * wk * (0.82 + i * 0.003) * R(0.9, 1.1));
  });
  if (a.name === 'Dependency Bumper') { a.days[58] = Math.round(a.days[58] * 0.3); }
  a.days[59] = a.tasksToday;
});
const lead = byName('Lead Enricher');
lead.expectedByNow = lead.base * lead.cpt * DONE_SHARE;

// department budgets (daily), derived from normal run-rate with headroom
DEPTS.forEach(d => {
  const normal = sum(agents.filter(a => a.dept === d.id).map(a => a.base * a.cpt));
  d.budget = Math.round(normal * R(1.12, 1.3) / 10) * 10;
});

/* ---------------- approvals (human-in-the-loop) ---------------- */
const mins = m => new Date(START.getTime() - m * 60000);
let approvals = [
  { id: 'ap1', agent: 'Contract Redliner', text: 'Accept indemnity clause change — Globex MSA', at: mins(52) },
  { id: 'ap2', agent: 'Contract Redliner', text: 'Send redlines to counterparty — Initech DPA', at: mins(41) },
  { id: 'ap3', agent: 'NDA Fast-Track', text: 'Countersign mutual NDA — Hooli', at: mins(38) },
  { id: 'ap4', agent: 'Contract Redliner', text: 'Approve fallback liability cap at 2× fees — Umbrella SOW', at: mins(34) },
  { id: 'ap5', agent: 'Collections Agent', text: 'Offer 3-month payment plan — Acme Retail ($18,400)', at: mins(27) },
  { id: 'ap6', agent: 'Quote Builder', text: 'Send quote with 22% discount — Vandelay Industries', at: mins(18) },
  { id: 'ap7', agent: 'Contract Redliner', text: 'Close negotiation round — Stark Logistics MSA', at: mins(12) },
  { id: 'ap8', agent: 'Refund Resolver', text: 'Refund $480 on order #88412 (above $200 limit)', at: mins(9) },
  { id: 'ap9', agent: 'NDA Fast-Track', text: 'Accept non-standard 24-month term — Pied Piper', at: mins(6) },
];
const ageMin = ap => Math.floor((now() - ap.at) / 60000);
const pendingFor = a => approvals.filter(p => p.agent === a.name);
function syncWaiting() {
  agents.forEach(a => {
    if (a.status === 'paused' || a.status === 'error' || a.status === 'idle') return;
    a.status = pendingFor(a).length ? 'waiting' : 'running';
  });
}

/* ---------------- alerts (attention queue) ---------------- */
const dismissed = new Set();
const ALERTS = [
  { id: 'inv', sev: 'critical', agent: 'Invoice Matcher',
    title: () => 'failure rate 18% — usually 2%',
    detail: () => 'Since 13:42 · 61 of 340 runs failed · ERP API returning 503',
    actions: ['pause', 'view'], resolved: a => a.status === 'paused' },
  { id: 'lead', sev: 'serious', agent: 'Lead Enricher',
    title: a => `spent ${fmtUsd(a.costToday)} today — ${(a.costToday / a.expectedByNow).toFixed(1)}× usual by this hour`,
    detail: () => 'Run volume ×5 since 11:00 · likely retry loop on Enrichment API · no daily cap set',
    actions: ['cap', 'pause', 'view'], resolved: a => a.status === 'paused' || a.cap != null },
  { id: 'appr', sev: 'warning',
    title: () => { const n = approvals.filter(p => ageMin(p) >= 30).length; return `${n} approval${n === 1 ? '' : 's'} waiting more than 30 min`; },
    detail: () => { const o = approvals.slice().sort((x, y) => x.at - y.at)[0]; return `${approvals.length} pending in total · oldest ${ageMin(o)} min · ${o.agent} (${deptById[byName(o.agent).dept].name})`; },
    actions: ['review'], resolved: () => !approvals.some(p => ageMin(p) >= 30) },
  { id: 'triage', sev: 'warning', agent: 'Ticket Triage',
    title: () => 'hand-off rate 21% — usually 9%',
    detail: () => 'Mostly “billing dispute” tickets since 11:00 — a new kind of request it wasn’t built for?',
    actions: ['view', 'dismiss'], resolved: () => false },
  { id: 'docs', sev: 'warning', agent: 'Docs Sync',
    title: () => 'silent for 2 h 40 min during working hours',
    detail: () => 'Last run 11:40 · no errors logged · scheduled hourly',
    actions: ['view', 'dismiss'], resolved: a => a.status === 'paused' },
];
const SEV_ORDER = { critical: 0, serious: 1, warning: 2 };
const openAlerts = () => ALERTS.filter(al => {
  if (dismissed.has(al.id)) return false;
  const a = al.agent ? byName(al.agent) : null;
  if (state.dept !== 'all' && a && a.dept !== state.dept) return false;
  if (state.dept !== 'all' && !a && !approvals.some(p => byName(p.agent).dept === state.dept)) return false;
  return !al.resolved(a);
});
const alertedAgentNames = () => new Set(openAlerts().filter(al => al.agent).map(al => al.agent));

/* ---------------- icons ---------------- */
const ICON = {
  critical: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.2 1.5h5.6l3.7 3.7v5.6l-3.7 3.7H5.2l-3.7-3.7V5.2z" fill="var(--crit)"/><path d="M8 4.5v4.2" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="11.1" r="1" fill="#fff"/></svg>',
  serious: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6 15 14H1z" fill="var(--serious)" stroke="var(--serious)" stroke-linejoin="round"/><path d="M8 6v3.8" stroke="#1a1a19" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11.8" r=".95" fill="#1a1a19"/></svg>',
  warning: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.6" fill="var(--warn)"/><path d="M8 4.6v4" stroke="#1a1a19" stroke-width="1.7" stroke-linecap="round"/><circle cx="8" cy="11" r=".95" fill="#1a1a19"/></svg>',
};
const STATUS = {
  error: { label: 'Failing', order: 0, icon: '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1.3 13 12.3H1z" fill="var(--crit)"/><path d="M7 5v3.3" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><circle cx="7" cy="10.2" r=".8" fill="#fff"/></svg>' },
  waiting: { label: 'Waiting on human', order: 1, icon: '<svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="var(--warn)"/><path d="M7 3.8V7l2 1.4" stroke="#1a1a19" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>' },
  running: { label: 'Running', order: 2, icon: '<svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="var(--good)"/></svg>' },
  idle: { label: 'Idle', order: 3, icon: '<svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="4" fill="none" stroke="var(--idle)" stroke-width="1.6"/></svg>' },
  paused: { label: 'Paused', order: 4, icon: '<svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="6" fill="var(--idle)"/><path d="M5.5 4.5v5M8.5 4.5v5" stroke="var(--surface)" stroke-width="1.5" stroke-linecap="round"/></svg>' },
};
const statusHtml = a => `<span class="status">${STATUS[a.status].icon}${STATUS[a.status].label}</span>`;

/* ---------------- state ---------------- */
const state = { range: 'today', dept: 'all', chip: 'all', q: '', sort: { key: 'attention', dir: 1 }, feedPaused: false, drawer: null };
const inDept = a => state.dept === 'all' || a.dept === state.dept;

/* ---------------- tooltip ---------------- */
const tip = $('#tooltip');
function showTip(html, x, y) {
  tip.innerHTML = html; tip.classList.add('show');
  const r = tip.getBoundingClientRect();
  let left = x + 14, top = y + 14;
  if (left + r.width > window.innerWidth - 8) left = x - r.width - 14;
  if (top + r.height > window.innerHeight - 8) top = y - r.height - 14;
  tip.style.left = Math.max(8, left) + 'px'; tip.style.top = Math.max(8, top) + 'px';
}
const hideTip = () => tip.classList.remove('show');

/* ---------------- toast with undo ---------------- */
let toastTimer, undoFn;
function toast(text, undo) {
  $('#toast-text').textContent = text;
  undoFn = undo || null;
  $('#toast-undo').style.display = undo ? '' : 'none';
  $('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 6000);
}
$('#toast-undo').addEventListener('click', () => { if (undoFn) undoFn(); undoFn = null; $('#toast').classList.remove('show'); renderAll(); });

/* ---------------- actions ---------------- */
function pauseAgent(a) {
  const prev = a.status, prevNote = a.note;
  a.status = 'paused'; a.note = `Paused by you · ${hhmm(now())}`;
  toast(`Paused ${a.name}. New runs are blocked.`, () => { a.status = prev; a.note = prevNote; });
  renderAll();
}
function resumeAgent(a) {
  a.status = 'running'; a.note = ''; syncWaiting();
  toast(`Resumed ${a.name}.`, () => { a.status = 'paused'; });
  renderAll();
}
function setCap(a, v) {
  const prev = a.cap; a.cap = v;
  const stop = a.costToday >= v ? ' Already over — it stops for the rest of today.' : '';
  toast(`Capped ${a.name} at ${fmtUsd(v)}/day.${stop}`, () => { a.cap = prev; });
  renderAll();
}
function decide(ap, approved) {
  const idx = approvals.indexOf(ap);
  approvals.splice(idx, 1); syncWaiting();
  toast(`${approved ? 'Approved' : 'Rejected'}: ${ap.text}`, () => { approvals.splice(idx, 0, ap); syncWaiting(); if (state.drawer?.type === 'approvals') openApprovals(); });
  renderAll();
  if (state.drawer?.type === 'approvals') openApprovals();
}

/* ---------------- attention ---------------- */
function renderAttention() {
  const list = openAlerts().sort((x, y) => SEV_ORDER[x.sev] - SEV_ORDER[y.sev]);
  const crit = list.filter(x => x.sev === 'critical').length;
  $('#attn-meta').textContent = list.length ? `${list.length} open${crit ? ` · ${crit} critical` : ''}` : '';
  const ul = $('#attn-list');
  if (!list.length) { ul.innerHTML = '<li class="all-clear"><strong>All clear</strong>No agent needs you right now.</li>'; return; }
  ul.innerHTML = list.map(al => {
    const a = al.agent ? byName(al.agent) : null;
    const sevLabel = al.sev[0].toUpperCase() + al.sev.slice(1);
    const title = a
      ? `<button class="agent-link" data-view="${a.id}">${esc(a.name)}</button> <span class="dept-tag">(${deptById[a.dept].name})</span> ${esc(al.title(a))}`
      : esc(al.title().replace(/^./, c => c.toUpperCase()));
    const btns = al.actions.map(k => ({
      pause: `<button class="btn primary" data-act="pause" data-id="${a?.id}">Pause agent</button>`,
      cap: `<button class="btn" data-act="cap" data-id="${a?.id}">Cap at $150/day</button>`,
      view: `<button class="btn ghost" data-view="${a?.id}">View</button>`,
      review: '<button class="btn primary" data-act="review">Review approvals</button>',
      dismiss: `<button class="btn ghost" data-act="dismiss" data-alert="${al.id}">Dismiss</button>`,
    })[k]).join('');
    return `<li class="attn sev-${al.sev}" data-alert-row="${al.id}">
      <span class="sev">${ICON[al.sev]}${sevLabel}</span>
      <div><div class="attn-title">${title}</div><div class="attn-detail">${esc(al.detail(a))}</div></div>
      <div class="attn-actions">${btns}</div></li>`;
  }).join('');
}
$('#attn-list').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.view) return openAgent(agents.find(a => a.id === b.dataset.view));
  const row = b.closest('.attn');
  const a = agents.find(x => x.id === b.dataset.id);
  const go = fn => { if (reduceMotion) return fn(); row.classList.add('leaving'); setTimeout(fn, 220); };
  switch (b.dataset.act) {
    case 'pause': go(() => pauseAgent(a)); break;
    case 'cap': go(() => setCap(a, 150)); break;
    case 'review': openApprovals(); break;
    case 'dismiss': { const id = b.dataset.alert; go(() => { dismissed.add(id); toast('Alert dismissed for today.', () => dismissed.delete(id)); renderAll(); }); break; }
  }
});

/* ---------------- range aggregates ---------------- */
function rangeData() {
  const fleet = agents.filter(inDept);
  if (state.range === 'today') {
    const cur = W.map((_, h) => h < NOW_H ? sum(fleet.map(a => a.hourly[h])) : null);
    const prev = W.map((_, h) => sum(fleet.map(a => a.prevHourly[h])));
    const labels = W.map((_, h) => String(h).padStart(2, '0') + ':00');
    const tasks = sum(fleet.map(a => a.tasksToday));
    const prevTasks = sum(fleet.map(a => sum(a.prevHourly.slice(0, NOW_H)) + a.prevHourly[NOW_H] * NOW_FRAC));
    return { cur, prev, labels, tickEvery: 3, tasks, prevTasks, days: 1, unit: 'hour',
      curName: 'Today', prevName: 'Same day last week', costOf: a => a.costToday, tasksOf: a => a.tasksToday };
  }
  const n = state.range === '7d' ? 7 : 30;
  const curIdx = Array.from({ length: n }, (_, i) => 60 - n + i);
  const off = n === 7 ? 7 : 28; // compare weekday-aligned (4 weeks back for 30 d)
  const full = curIdx.map(i => sum(fleet.map(a => a.days[i])));
  const cur = full.map((v, k) => k === n - 1 ? null : v); // today is still in progress
  const prev = curIdx.map(i => sum(fleet.map(a => a.days[i - off] || 0)));
  const labels = curIdx.map(i => { const d = new Date(START); d.setDate(d.getDate() - (59 - i)); return n === 7 ? `${DOW[d.getDay()]} ${d.getDate()}` : `${MONTHS[d.getMonth()]} ${d.getDate()}`; });
  const tasksOf = a => sum(curIdx.map(i => a.days[i]));
  const costOf = a => a.costToday + sum(curIdx.slice(0, -1).map(i => a.days[i])) * a.cpt;
  return { cur, prev, labels, tickEvery: n === 7 ? 1 : 5, tasks: sum(full), prevTasks: sum(prev.slice(0, -1)) + prev[n - 1] * DONE_SHARE,
    days: n, unit: 'day', curName: `Last ${n} days`, prevName: n === 7 ? 'Previous 7 days' : 'Same days, 4 weeks earlier', costOf, tasksOf };
}

/* ---------------- KPIs ---------------- */
function deltaHtml(cur, prev, goodWhenUp = true, neutral = false) {
  if (!prev) return '';
  const d = (cur - prev) / prev;
  const cls = neutral ? '' : (d >= 0) === goodWhenUp ? 'good' : 'bad';
  return `<span class="delta ${cls}">${d >= 0 ? '▲' : '▼'} ${Math.abs(d * 100).toFixed(1)}%</span>`;
}
function renderKpis() {
  const rd = rangeData();
  const fleet = agents.filter(inDept);
  const active = fleet.filter(a => ['running', 'waiting', 'error'].includes(a.status)).length;
  const paused = fleet.filter(a => a.status === 'paused').length;
  const idle = fleet.filter(a => a.status === 'idle').length;
  const tasks = rd.tasks;
  const succ = sum(fleet.map(a => rd.tasksOf(a) * a.success)) / (tasks || 1);
  const prevSucc = succ + (state.range === 'today' ? 0.012 : 0.004);
  const spend = sum(fleet.map(rd.costOf));
  const depts = state.dept === 'all' ? DEPTS : [deptById[state.dept]];
  const dailyBudget = sum(depts.map(d => d.budget));
  const budget = dailyBudget * rd.days;
  const pace = dailyBudget * (rd.days - 1 + DONE_SHARE);
  const overPace = spend / pace - 1;
  const pend = approvals.filter(p => inDept(byName(p.agent)));
  const old = pend.filter(p => ageMin(p) >= 30).length;
  const vsLabel = state.range === 'today' ? 'vs same time last week' : 'vs previous period';

  $('#kpis').innerHTML = `
    <div class="card kpi"><div class="kpi-label">Agents active now</div>
      <div class="kpi-value num">${active}<small> / ${fleet.length}</small></div>
      <div class="kpi-foot">${paused} paused · ${idle} idle</div></div>
    <div class="card kpi"><div class="kpi-label">Tasks completed</div>
      <div class="kpi-value num">${fmtCompact(tasks)}</div>
      <div class="kpi-foot">${deltaHtml(tasks, rd.prevTasks)} ${vsLabel}</div></div>
    <div class="card kpi"><div class="kpi-label">First-pass success</div>
      <div class="kpi-value num">${fmtPct(succ)}</div>
      <div class="kpi-foot"><span class="delta ${succ >= prevSucc ? 'good' : 'bad'}">${succ >= prevSucc ? '▲' : '▼'} ${Math.abs((succ - prevSucc) * 100).toFixed(1)} pts</span> ${vsLabel}</div></div>
    <div class="card kpi"><div class="kpi-label">Spend</div>
      <div class="kpi-value num">${fmtUsd(spend)}<small> / ${fmtUsd(budget)}</small></div>
      <div class="meter" role="img" aria-label="Spend ${fmtUsd(spend)} of ${fmtUsd(budget)} budget"><span style="width:${Math.min(100, spend / budget * 100)}%"></span><i style="left:${Math.min(100, pace / budget * 100)}%"></i></div>
      <div class="kpi-foot">${overPace > 0.03 ? `<span class="delta bad">${Math.round(overPace * 100)}% over pace</span>` : overPace < -0.03 ? `<span class="delta good">${Math.round(-overPace * 100)}% under pace</span>` : 'On pace'} for the budget</div></div>
    <button class="card kpi clickable" type="button" data-open-approvals><div class="kpi-label">Waiting on a human</div>
      <div class="kpi-value num">${pend.length}<small> approvals</small></div>
      <div class="kpi-foot">${old ? `<span class="delta bad">${old} waiting &gt; 30 min</span> · review →` : 'None older than 30 min'}</div></button>`;
  const nav = $('#nav-approvals'); nav.textContent = approvals.length; nav.classList.toggle('hot', approvals.length > 0);
}

/* ---------------- tasks line chart ---------------- */
function niceMax(v) {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v)); const f = v / p;
  const s = f <= 1 ? 1 : f <= 1.5 ? 1.5 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 3 ? 3 : f <= 4 ? 4 : f <= 5 ? 5 : f <= 6 ? 6 : f <= 8 ? 8 : 10;
  return s * p;
}
function drawTasks() {
  const rd = rangeData();
  const el = $('#tasks-chart');
  $('#tasks-title').textContent = `Tasks completed per ${rd.unit}`;
  $('#lg-cur').textContent = rd.curName; $('#lg-prev').textContent = rd.prevName;
  const w = Math.max(280, el.clientWidth - 16), h = 248;
  const m = { l: 44, r: 78, t: 14, b: 26 };
  const n = rd.labels.length;
  const vals = rd.cur.filter(v => v != null).concat(rd.prev);
  const max = niceMax(Math.max(...vals) * 1.05);
  const X = i => m.l + i * (w - m.l - m.r) / (n - 1);
  const Y = v => m.t + (h - m.t - m.b) * (1 - v / max);
  const path = arr => arr.map((v, i) => v == null ? null : `${X(i).toFixed(1)},${Y(v).toFixed(1)}`).filter(Boolean).join(' L');
  let g = '';
  for (let k = 0; k <= 4; k++) {
    const v = max * k / 4, y = Y(v);
    g += `<line class="${k ? 'gridline' : 'baseline'}" x1="${m.l}" x2="${w - m.r + 8}" y1="${y}" y2="${y}"/>`;
    g += `<text class="axis-text" x="${m.l - 8}" y="${y + 4}" text-anchor="end">${fmtCompact(v)}</text>`;
  }
  rd.labels.forEach((lab, i) => {
    if (i % rd.tickEvery !== 0 && i !== n - 1) return;
    if (i === n - 1 && i % rd.tickEvery !== 0 && n > 8) return;
    g += `<text class="axis-text" x="${X(i)}" y="${h - 6}" text-anchor="middle">${state.range === 'today' ? lab.slice(0, 2) : lab}</text>`;
  });
  const lastCur = rd.cur.reduce((acc, v, i) => v != null ? i : acc, 0);
  const prevEnd = n - 1;
  let yc = Y(rd.cur[lastCur]), yp = Y(rd.prev[prevEnd]);
  const curLabelX = X(lastCur) + 8, prevLabelX = X(prevEnd) + 8;
  if (Math.abs(curLabelX - prevLabelX) < 60 && Math.abs(yc - yp) < 14) { if (yc < yp) { yc -= 7; yp += 7; } else { yc += 7; yp -= 7; } }
  const curShort = state.range === 'today' ? 'Today' : 'This period';
  const prevShort = state.range === 'today' ? 'Last week' : 'Previous';
  const nowNote = '';
  el.innerHTML = `<svg viewBox="0 0 ${w} ${h}" height="${h}" role="img" aria-label="${rd.curName}: ${fmtInt(rd.tasks)} tasks; compared with ${rd.prevName.toLowerCase()}">
    ${g}
    <path d="M${path(rd.prev)}" fill="none" style="stroke:var(--s-prev)" stroke-width="2" stroke-dasharray="5 4" stroke-linejoin="round"/>
    <path d="M${path(rd.cur)}" fill="none" style="stroke:var(--s1)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${X(lastCur)}" cy="${Y(rd.cur[lastCur])}" r="4.5" style="fill:var(--s1);stroke:var(--surface)" stroke-width="2"/>
    <text class="dlabel" x="${curLabelX}" y="${state.range === 'today' ? yc - 8 : yc + 4}">${curShort}</text>
    <text class="dlabel" x="${prevLabelX}" y="${yp + 4}" style="fill:var(--muted)">${prevShort}</text>
    ${nowNote}
    <g id="xhair" style="display:none"><line y1="${m.t}" y2="${h - m.b}" style="stroke:var(--axis)" stroke-width="1"/><circle r="4" class="c1" style="fill:var(--s1);stroke:var(--surface)" stroke-width="2"/><circle r="4" class="c2" style="fill:var(--s-prev);stroke:var(--surface)" stroke-width="2"/></g>
    <rect x="${m.l}" y="${m.t}" width="${w - m.l - m.r}" height="${h - m.t - m.b}" fill="transparent" id="hit"/>
  </svg>`;
  const svg = el.querySelector('svg'), xh = $('#xhair', el);
  const hit = $('#hit', el);
  const move = e => {
    const r = svg.getBoundingClientRect();
    const sx = (e.clientX - r.left) * (w / r.width);
    const i = Math.max(0, Math.min(n - 1, Math.round((sx - m.l) / ((w - m.l - m.r) / (n - 1)))));
    xh.style.display = '';
    xh.querySelector('line').setAttribute('x1', X(i)); xh.querySelector('line').setAttribute('x2', X(i));
    const c1 = xh.querySelector('.c1'), c2 = xh.querySelector('.c2');
    if (rd.cur[i] != null) { c1.style.display = ''; c1.setAttribute('cx', X(i)); c1.setAttribute('cy', Y(rd.cur[i])); } else c1.style.display = 'none';
    c2.setAttribute('cx', X(i)); c2.setAttribute('cy', Y(rd.prev[i]));
    const curTxt = rd.cur[i] != null ? fmtInt(rd.cur[i]) : ((state.range === 'today' ? i === NOW_H : i === n - 1) ? 'in progress' : '—');
    showTip(`<div class="tt-title">${rd.labels[i]}${state.range === 'today' ? '–' + String(i + 1).padStart(2, '0') + ':00' : ''}</div>
      <div class="tt-row"><span><i class="sw"></i>${rd.curName}</span><b>${curTxt}</b></div>
      <div class="tt-row"><span><i class="sw prev"></i>${rd.prevName}</span><b>${fmtInt(rd.prev[i])}</b></div>`, e.clientX, e.clientY);
  };
  hit.addEventListener('pointermove', move);
  hit.addEventListener('pointerleave', () => { xh.style.display = 'none'; hideTip(); });
}

/* ---------------- spend by department ---------------- */
function renderSpend() {
  const rd = rangeData();
  const rows = DEPTS.map(d => {
    const list = agents.filter(a => a.dept === d.id);
    const spend = sum(list.map(rd.costOf));
    const pace = d.budget * (rd.days - 1 + DONE_SHARE);
    const top = list.slice().sort((x, y) => rd.costOf(y) - rd.costOf(x))[0];
    return { d, spend, pace, top, topCost: rd.costOf(top) };
  }).sort((x, y) => y.spend - x.spend);
  const max = Math.max(...rows.map(r => Math.max(r.spend, r.pace))) * 1.04;
  const total = sum(rows.map(r => r.spend));
  $('#spend-meta').textContent = `${fmtUsd(total)} ${state.range === 'today' ? 'today' : 'this period'}`;
  $('#spend-list').innerHTML = rows.map(r => {
    const over = r.spend > r.pace * 1.05;
    const dim = state.dept !== 'all' && state.dept !== r.d.id;
    return `<li class="spend-row" style="${dim ? 'opacity:.35' : ''}" data-dept="${r.d.id}">
      <span class="dname">${r.d.name}</span>
      <div class="track"><div class="bar" style="width:${r.spend / max * 100}%"></div><div class="pace" style="left:${r.pace / max * 100}%"></div><div class="hit"></div></div>
      <span class="sval">${fmtUsd(r.spend)}${over ? `<span class="flag">▲ ${Math.round((r.spend / r.pace - 1) * 100)}% over pace</span>` : ''}</span></li>`;
  }).join('');
  $$('#spend-list .spend-row').forEach((li, i) => {
    const r = rows[i];
    li.addEventListener('pointermove', e => showTip(`<div class="tt-title">${r.d.name}</div>
      <div class="tt-row"><span>Spent</span><b>${fmtUsd(r.spend)}</b></div>
      <div class="tt-row"><span>Budget pace</span><b>${fmtUsd(r.pace)}</b></div>
      <div class="tt-row"><span>Daily budget</span><b>${fmtUsd(r.d.budget)}</b></div>
      <div class="tt-row"><span>Top: ${esc(r.top.name)}</span><b>${fmtUsd(r.topCost)}</b></div>`, e.clientX, e.clientY));
    li.addEventListener('pointerleave', hideTip);
  });
}

/* ---------------- fleet table ---------------- */
const COLS = [
  { key: 'name', label: 'Agent' },
  { key: 'attention', label: 'Status' },
  { key: 'autonomy', label: 'Autonomy' },
  { key: 'tasks', label: 'Tasks today', r: true },
  { key: 'success', label: 'Success', r: true },
  { key: 'cost', label: 'Cost today', r: true },
  { key: 'trend', label: 'Trend · 24 h', nosort: true },
  { key: 'owner', label: 'Owner' },
];
const CHIPS = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'attention', label: 'Needs attention', test: (a, al) => al.has(a.name) || a.status === 'waiting' || a.status === 'error' },
  { id: 'running', label: 'Running', test: a => a.status === 'running' || a.status === 'waiting' || a.status === 'error' },
  { id: 'idle', label: 'Idle', test: a => a.status === 'idle' },
  { id: 'paused', label: 'Paused', test: a => a.status === 'paused' },
];
function sparkSvg(vals) {
  const w = 84, h = 22, max = Math.max(...vals, 1);
  const pts = vals.map((v, i) => `${(i * w / (vals.length - 1)).toFixed(1)},${(h - 2 - (v / max) * (h - 4)).toFixed(1)}`).join(' ');
  return `<svg class="spark" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><polyline points="${pts}" fill="none" style="stroke:var(--s1)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}
function renderTable() {
  const al = alertedAgentNames();
  const base = agents.filter(inDept);
  $('#status-chips').innerHTML = CHIPS.map(c => `<button class="chip" type="button" data-chip="${c.id}" aria-pressed="${state.chip === c.id}">${c.label} <b>${base.filter(a => c.test(a, al)).length}</b></button>`).join('');
  const q = state.q.trim().toLowerCase();
  const chip = CHIPS.find(c => c.id === state.chip);
  let rows = base.filter(a => chip.test(a, al) && (!q || a.name.toLowerCase().includes(q) || a.owner.toLowerCase().includes(q) || deptById[a.dept].name.toLowerCase().includes(q)));
  const { key, dir } = state.sort;
  const val = a => ({
    name: a.name, owner: a.owner, autonomy: a.autonomy, tasks: a.tasksToday, success: a.success, cost: a.costToday,
    attention: (al.has(a.name) ? 0 : 10) + STATUS[a.status].order,
  })[key];
  rows.sort((x, y) => { const vx = val(x), vy = val(y); return (vx < vy ? -1 : vx > vy ? 1 : x.name.localeCompare(y.name)) * dir; });
  $('#thead-row').innerHTML = COLS.map(c => {
    const sorted = state.sort.key === c.key;
    const aria = sorted ? ` aria-sort="${dir === 1 ? 'ascending' : 'descending'}"` : '';
    const arrow = sorted ? (dir === 1 ? '↑' : '↓') : '';
    return `<th class="${c.r ? 'r' : ''}"${aria} scope="col">${c.nosort ? c.label : `<button type="button" data-sort="${c.key}">${c.label}<span aria-hidden="true">${arrow}</span></button>`}</th>`;
  }).join('');
  $('#tbody').innerHTML = rows.length ? rows.map(a => `<tr data-id="${a.id}" tabindex="0">
      <td class="agent-cell"><b>${esc(a.name)}</b><span>${deptById[a.dept].name}${al.has(a.name) ? ' · <strong style="color:var(--ink)">alert open</strong>' : ''}</span></td>
      <td>${statusHtml(a)}</td>
      <td><span class="auto" title="${AUTONOMY_HELP[a.autonomy]}">${a.autonomy}</span></td>
      <td class="r">${fmtInt(a.tasksToday)}</td>
      <td class="r">${a.tasksToday ? fmtPct(a.success) : '—'}</td>
      <td class="r">${fmtUsd(a.costToday)}${a.cap != null ? `<div style="font-size:11px;color:var(--muted)">cap ${fmtUsd(a.cap)}</div>` : ''}</td>
      <td>${sparkSvg(a.spark)}</td>
      <td class="owner">${esc(a.owner)}</td></tr>`).join('')
    : `<tr><td colspan="${COLS.length}" class="empty">No agents match these filters.</td></tr>`;
  $('#table-count').textContent = `Showing ${rows.length} of ${base.length} agents`;
}
$('#status-chips').addEventListener('click', e => { const b = e.target.closest('[data-chip]'); if (!b) return; state.chip = b.dataset.chip; renderTable(); });
$('#thead-row').addEventListener('click', e => {
  const b = e.target.closest('[data-sort]'); if (!b) return;
  const k = b.dataset.sort;
  state.sort = state.sort.key === k ? { key: k, dir: -state.sort.dir } : { key: k, dir: ['tasks', 'success', 'cost'].includes(k) ? -1 : 1 };
  renderTable();
});
$('#search').addEventListener('input', e => { state.q = e.target.value; renderTable(); });
$('#tbody').addEventListener('click', e => { const tr = e.target.closest('tr[data-id]'); if (tr) openAgent(agents.find(a => a.id === tr.dataset.id)); });
$('#tbody').addEventListener('keydown', e => { if (e.key !== 'Enter' && e.key !== ' ') return; const tr = e.target.closest('tr[data-id]'); if (tr) { e.preventDefault(); openAgent(agents.find(a => a.id === tr.dataset.id)); } });

/* ---------------- drawer ---------------- */
let lastFocus = null;
function openDrawer(title, sub, body, ctx) {
  if (!state.drawer) lastFocus = document.activeElement;
  state.drawer = ctx;
  $('#drawer-title').textContent = title;
  $('#drawer-sub').innerHTML = sub;
  $('#drawer-body').innerHTML = body;
  $('#drawer').classList.add('open'); $('#scrim').classList.add('open');
  $('#drawer-close').focus({ preventScroll: true });
}
function closeDrawer() {
  $('#drawer').classList.remove('open'); $('#scrim').classList.remove('open');
  state.drawer = null; if (lastFocus) lastFocus.focus({ preventScroll: true });
}
$('#drawer-close').addEventListener('click', closeDrawer);
$('#scrim').addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.drawer) closeDrawer(); });

function runsFor(a) {
  const r = mulberry32(a.id.length * 997 + a.name.length * 31 + a.base);
  const d = deptById[a.dept];
  const out = [];
  let t = now().getTime() - r() * 120000;
  if (a.status === 'paused' || a.status === 'idle') t -= (a.name === 'Docs Sync' ? 160 : 300) * 60000;
  for (let i = 0; i < 6; i++) {
    let outcome = 'Succeeded';
    if (a.status === 'error' && i < 4 && r() < 0.7) outcome = 'Failed — ERP API 503 · retried 3×';
    else if (pendingFor(a)[i]) outcome = 'Waiting for approval';
    else if (r() < a.escal) outcome = 'Handed off to a human';
    const cost = a.cpt * (0.6 + r() * 0.8);
    out.push({ id: `#${String(Math.floor(r() * 90000) + 10000)}`, what: `${d.noun[0].toUpperCase() + d.noun.slice(1)} ${String(Math.floor(r() * 9000) + 1000)}`, outcome, at: new Date(t), cost, secs: Math.round(a.avgSec * (0.5 + r())) });
    t -= (a.name === 'Lead Enricher' ? 8 : 40 + r() * 400) * 1000;
  }
  return out;
}
function openAgent(a) {
  if (!a) return;
  const d = deptById[a.dept];
  const pend = pendingFor(a);
  const alert = openAlerts().find(al => al.agent === a.name);
  const body = `
    <div>${statusHtml(a)}${a.note ? `<div class="attn-detail" style="margin-top:4px">${esc(a.note)}</div>` : ''}</div>
    ${alert ? `<div class="attn sev-${alert.sev}" style="margin-top:12px;border:1px solid var(--border);grid-template-columns:1fr"><div><span class="sev">${ICON[alert.sev]}${alert.sev[0].toUpperCase() + alert.sev.slice(1)}</span><div class="attn-title" style="margin-top:4px">${esc(alert.title(a).replace(/^./, c => c.toUpperCase()))}</div><div class="attn-detail">${esc(alert.detail(a))}</div></div></div>` : ''}
    <div class="drawer-actions">
      ${a.status === 'paused' ? '<button class="btn primary" data-d="resume">Resume agent</button>' : '<button class="btn primary" data-d="pause">Pause agent</button>'}
      ${pend.length ? `<button class="btn" data-d="approvals">Review ${pend.length} approval${pend.length > 1 ? 's' : ''}</button>` : ''}
      <button class="btn ghost" type="button" title="Opens the raw run log (not in this prototype)">Open run log ↗</button>
    </div>
    <dl class="stat-grid">
      <div><dt>Tasks today</dt><dd>${fmtInt(a.tasksToday)}</dd></div>
      <div><dt>First-pass success</dt><dd>${a.tasksToday ? fmtPct(a.success) : '—'}</dd></div>
      <div><dt>Hand-off rate</dt><dd>${fmtPct(a.escal)}</dd></div>
      <div><dt>Cost today</dt><dd>${fmtUsd(a.costToday)}</dd></div>
      <div><dt>Cost per task</dt><dd>$${a.cpt.toFixed(3)}</dd></div>
      <div><dt>Avg. run time</dt><dd>${a.avgSec}s</dd></div>
    </dl>
    <div class="section-title">Tasks per hour · last 24 h</div>
    <div style="color:var(--s1)">${sparkSvg(a.spark).replace('width="84" height="22" viewBox="0 0 84 22"', 'width="100%" height="48" viewBox="0 0 84 22" preserveAspectRatio="none"')}</div>
    <div class="section-title">Daily spend cap</div>
    <form class="cap-form" id="cap-form"><label class="sr-only" for="cap-input">Daily cap in dollars</label>
      <span>$</span><input id="cap-input" type="number" min="1" step="1" placeholder="No cap" value="${a.cap ?? ''}">
      <button class="btn" type="submit">${a.cap != null ? 'Update cap' : 'Set cap'}</button>
      <span class="attn-detail">Typical: ${fmtUsd(a.base * a.cpt)}/day</span></form>
    <div class="section-title">Recent runs</div>
    <ul class="runs">${runsFor(a).map(r => `<li><div><b>${r.what}</b> <span class="rmeta">${r.id}</span><div class="rmeta">${esc(r.outcome)}</div></div><div class="rmeta" style="text-align:right">${hhmm(r.at)}<br>${fmtUsd(r.cost)} · ${r.secs}s</div></li>`).join('')}</ul>
    <div class="section-title">Setup</div>
    <dl class="stat-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">
      <div><dt>Autonomy</dt><dd style="font-size:13px">${AUTONOMY[a.autonomy]}</dd><div class="attn-detail">${AUTONOMY_HELP[a.autonomy]}</div></div>
      <div><dt>Model tier</dt><dd style="font-size:13px">${TIER[a.tier].name}</dd><div class="attn-detail">${a.version} · deployed ${a.deployed} d ago</div></div>
    </dl>
    <div class="section-title">Tools it can use</div>
    <div class="tool-chips">${a.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>`;
  openDrawer(a.name, `${d.name} · owned by ${esc(a.owner)}`, body, { type: 'agent', id: a.id });
  const db = $('#drawer-body');
  db.onclick = e => {
    const b = e.target.closest('[data-d]'); if (!b) return;
    if (b.dataset.d === 'pause') { pauseAgent(a); openAgent(a); }
    if (b.dataset.d === 'resume') { resumeAgent(a); openAgent(a); }
    if (b.dataset.d === 'approvals') openApprovals(a.name);
  };
  $('#cap-form').onsubmit = e => {
    e.preventDefault();
    const v = parseFloat($('#cap-input').value);
    if (!v || v <= 0) { const prev = a.cap; a.cap = null; toast(`Removed the cap on ${a.name}.`, () => { a.cap = prev; }); renderAll(); }
    else setCap(a, Math.round(v));
    openAgent(a);
  };
}
function openApprovals(only) {
  const list = approvals.filter(p => (!only || p.agent === only)).sort((x, y) => x.at - y.at);
  const body = list.length ? list.map(p => {
    const a = byName(p.agent), age = ageMin(p);
    return `<div class="approval"><div class="ap-top"><span>${esc(p.agent)} · ${deptById[a.dept].name}</span><span class="${age >= 30 ? 'old' : ''}">${age >= 30 ? '⏱ ' : ''}waiting ${age} min</span></div>
      <p>${esc(p.text)}</p><div class="ap-actions"><button class="btn primary" data-ap="${p.id}" data-ok="1">Approve</button><button class="btn danger" data-ap="${p.id}" data-ok="0">Reject</button><button class="btn ghost" data-view="${a.id}">View agent</button></div></div>`;
  }).join('') : '<div class="all-clear"><strong>Inbox zero</strong>No steps are waiting on a human.</div>';
  openDrawer(only ? `Approvals · ${only}` : 'Approvals', `${list.length} step${list.length === 1 ? '' : 's'} waiting on a human · oldest first`, body, { type: 'approvals', only });
  $('#drawer-body').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.view) return openAgent(agents.find(a => a.id === b.dataset.view));
    const ap = approvals.find(p => p.id === b.dataset.ap); if (!ap) return;
    decide(ap, b.dataset.ok === '1');
    if (only) openApprovals(only);
  };
}
document.addEventListener('click', e => { if (e.target.closest('[data-open-approvals]')) openApprovals(); });

/* ---------------- live activity feed ---------------- */
const feedEl = $('#feed');
const COLORS = { done: 'var(--good)', handoff: 'var(--warn)', fail: 'var(--crit)', info: 'var(--idle)' };
function makeEvent(at) {
  const pool = agents.filter(a => ['running', 'waiting', 'error'].includes(a.status) && inDept(a));
  if (!pool.length) return null;
  const weights = pool.map(a => Math.sqrt(a.base) * (a.name === 'Lead Enricher' ? 3 : 1));
  let x = rnd() * sum(weights), a = pool[0];
  for (let i = 0; i < pool.length; i++) { x -= weights[i]; if (x <= 0) { a = pool[i]; break; } }
  const d = deptById[a.dept], noun = d.noun, num = Math.floor(R(10000, 99999));
  const cost = a.cpt * R(0.6, 1.4), secs = Math.round(a.avgSec * R(0.5, 1.5));
  let kind = 'done', text;
  if (a.status === 'error' && rnd() < 0.55) { kind = 'fail'; text = `<b>${esc(a.name)}</b> failed on ${noun} #${num} — ERP API 503`; }
  else if (rnd() < a.escal) { kind = 'handoff'; text = `<b>${esc(a.name)}</b> handed ${noun} #${num} to a human`; }
  else text = `<b>${esc(a.name)}</b> finished ${noun} #${num}`;
  return { kind, text, meta: `${fmtUsd(cost)} · ${secs}s`, at, a, cost };
}
function pushEvent(ev, animate) {
  if (!ev) return;
  const li = document.createElement('li');
  if (animate && !reduceMotion) li.className = 'new';
  li.innerHTML = `<span class="ev-dot" style="background:${COLORS[ev.kind]}" aria-hidden="true"></span><div class="ev-text">${ev.text} <span class="ev-meta">· ${ev.meta}</span></div><time>${hhmmss(ev.at)}</time>`;
  feedEl.prepend(li);
  while (feedEl.children.length > 40) feedEl.lastElementChild.remove();
}
function seedFeed() {
  feedEl.innerHTML = '';
  for (let i = 14; i >= 0; i--) pushEvent(makeEvent(new Date(now().getTime() - i * R(5000, 14000))), false);
}
$('#feed-toggle').addEventListener('click', e => {
  state.feedPaused = !state.feedPaused;
  e.currentTarget.textContent = state.feedPaused ? 'Resume' : 'Pause';
  e.currentTarget.setAttribute('aria-pressed', state.feedPaused);
});

let lastUpdate = Date.now(), tick = 0;
setInterval(() => {
  if (document.hidden) return;
  if (!state.feedPaused) {
    const ev = makeEvent(now());
    if (ev) {
      pushEvent(ev, true);
      ev.a.tasksToday += 1; ev.a.costToday += ev.cost; ev.a.days[59] = ev.a.tasksToday;
    }
    lastUpdate = Date.now();
    renderKpis();
    if (++tick % 6 === 0) { renderTable(); renderSpend(); renderAttention(); }
  }
}, 2400);
setInterval(() => {
  const s = Math.round((Date.now() - lastUpdate) / 1000);
  $('#updated').textContent = state.feedPaused ? 'live updates paused' : s < 3 ? 'updated just now' : `updated ${s}s ago`;
}, 1000);

/* ---------------- top controls ---------------- */
const deptSel = $('#dept');
DEPTS.forEach(d => deptSel.insertAdjacentHTML('beforeend', `<option value="${d.id}">${d.name}</option>`));
deptSel.addEventListener('change', () => { state.dept = deptSel.value; renderAll(); seedFeed(); });
$('#range').addEventListener('click', e => {
  const b = e.target.closest('[data-range]'); if (!b) return;
  state.range = b.dataset.range;
  $$('#range button').forEach(x => x.setAttribute('aria-pressed', x === b));
  renderKpis(); drawTasks(); renderSpend();
});
$('#theme-btn').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('fleet-theme', next); } catch (e) {}
});
$('#menu-btn').addEventListener('click', e => {
  const open = $('#sidebar').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', open);
});
document.addEventListener('click', e => {
  if (window.innerWidth > 900) return;
  if (!e.target.closest('#sidebar') && !e.target.closest('#menu-btn')) { $('#sidebar').classList.remove('open'); $('#menu-btn').setAttribute('aria-expanded', 'false'); }
});
let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(drawTasks, 120); });

/* ---------------- render ---------------- */
function renderAll() {
  syncWaiting();
  const fleet = agents.filter(inDept);
  $('#fleet-summary').textContent = state.dept === 'all'
    ? `${agents.length} agents across ${DEPTS.length} departments`
    : `${deptById[state.dept].name} · ${fleet.length} agents`;
  $('#nav-agents').textContent = agents.length;
  renderAttention(); renderKpis(); drawTasks(); renderSpend(); renderTable();
}
renderAll();
seedFeed();
})();
