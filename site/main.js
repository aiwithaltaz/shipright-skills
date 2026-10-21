import './style.css';

// No libraries. Everything is readable without this file.
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
document.documentElement.classList.add('js');

/* ---------- Tabs: one helper for every tablist (arrow keys, Home, End) ---------- */
function tablist(list, onSelect) {
  const tabs = $$('[role="tab"]', list);
  const select = (tab, focus) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    if (focus) tab.focus();
    onSelect(tab);
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', e => {
      const vertical = list.getAttribute('aria-orientation') === 'vertical';
      const next = vertical ? 'ArrowDown' : 'ArrowRight';
      const prev = vertical ? 'ArrowUp' : 'ArrowLeft';
      let j = null;
      if (e.key === next) j = (i + 1) % tabs.length;
      if (e.key === prev) j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); select(tabs[j], true); }
    });
  });
  return { tabs, select };
}

/* ---------- Drag to compare ---------- */
const cmp = $('#cmp');
if (cmp) {
  const range = $('#cmp-range');
  const setPos = v => cmp.style.setProperty('--pos', `${v}%`);
  range.addEventListener('input', () => setPos(range.value));
  setPos(range.value);
}

/* ---------- Clips play only when on screen, never with reduced motion ---------- */
const clips = $$('video');
if ('IntersectionObserver' in window && !reduced) {
  const vio = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause();
  }), { threshold: 0.4 });
  clips.forEach(v => vio.observe(v));
} else {
  clips.forEach(v => v.setAttribute('controls', ''));
}

/* ---------- Install ---------- */
const installTabs = $('.install .tabs');
if (installTabs) {
  const panels = $$('.cmd-row pre');
  tablist(installTabs, tab => { panels.forEach(p => { p.hidden = p.id !== tab.getAttribute('aria-controls'); }); });
  const status = $('#copy-status');
  $('#copy-cmd')?.addEventListener('click', async () => {
    const panel = panels.find(p => !p.hidden);
    try {
      await navigator.clipboard.writeText(panel ? panel.textContent : '');
      status.textContent = 'Copied. Paste it in your tool.';
    } catch {
      status.textContent = 'Copy did not work. Select the command and copy it yourself.';
    }
  });
}

/* ---------- Questions: one open at a time ---------- */
const qButtons = $$('.q button');
qButtons.forEach(btn => btn.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') === 'true';
  qButtons.forEach(other => {
    other.setAttribute('aria-expanded', 'false');
    $('#' + other.getAttribute('aria-controls')).hidden = true;
  });
  if (!open) {
    btn.setAttribute('aria-expanded', 'true');
    $('#' + btn.getAttribute('aria-controls')).hidden = false;
  }
}));

/* ---------- Menu ---------- */
const menu = $('.menu');
const navLinks = $('.nav-links');
if (menu && navLinks) {
  const close = () => { navLinks.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  addEventListener('keydown', e => { if (e.key === 'Escape' && navLinks.classList.contains('open')) { close(); menu.focus(); } });
}

/* ---------- Fade-up on blocks ---------- */
if (!reduced && 'IntersectionObserver' in window) {
  const blocks = $$('.d, .shot, .score, .part, .q');
  blocks.forEach(b => b.classList.add('fade'));
  const io = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    io.unobserve(entry.target);
  }), { rootMargin: '0px 0px -8% 0px' });
  blocks.forEach(el => io.observe(el));
  setTimeout(() => blocks.forEach(el => el.classList.add('in')), 4000);
}
