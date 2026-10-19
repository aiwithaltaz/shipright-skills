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

/* ---------- Act 1. Replay of a real run ---------- */
const replay = $('#replay');
if (replay) {
  const stage = $('.stage');
  const beats = $$('.beat', replay);
  const goes = $$('[data-go]', replay);
  const pauseBtn = $('#replay-pause');
  let index = 0;
  let timer = null;
  let playing = false;
  let userTook = false;

  const show = i => {
    index = i;
    beats.forEach((b, k) => {
      const on = k === i;
      b.classList.toggle('on', on);
      b.setAttribute('aria-hidden', String(!on));
      if (on) b.removeAttribute('inert'); else b.setAttribute('inert', '');
    });
    goes.forEach(g => g.setAttribute('aria-pressed', String(Number(g.dataset.go) === i)));
    stage.classList.toggle('landed', i === beats.length - 1);
  };
  const durations = [2600, 4200, 3600, 3800, 0];
  const tick = () => {
    clearTimeout(timer);
    if (!playing || index >= beats.length - 1) { setPlaying(false); return; }
    timer = setTimeout(() => { show(index + 1); tick(); }, durations[index]);
  };
  const setPlaying = on => {
    playing = on;
    pauseBtn.dataset.state = on ? 'pause' : (index >= beats.length - 1 ? 'replay' : 'play');
    if (!on) clearTimeout(timer);
  };
  const play = fromStart => {
    if (fromStart) show(0);
    setPlaying(true);
    tick();
  };

  goes.forEach(g => g.addEventListener('click', () => { userTook = true; setPlaying(false); show(Number(g.dataset.go)); }));
  pauseBtn.addEventListener('click', () => {
    userTook = true;
    if (playing) setPlaying(false);
    else play(index >= beats.length - 1);
  });
  $('#watch')?.addEventListener('click', () => {
    userTook = true;
    replay.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    if (!reduced) play(true);
  });

  if (reduced) {
    beats.forEach(b => { b.classList.add('on'); b.removeAttribute('inert'); b.removeAttribute('aria-hidden'); });
  } else {
    show(0);
    setPlaying(false);
    // Play once when the window is in view. It does not loop.
    let started = false;
    new IntersectionObserver((entries, io) => {
      if (entries[0].isIntersecting && !started) { started = true; io.disconnect(); setTimeout(() => { if (!userTook) play(true); }, 600); }
    }, { threshold: 0.4 }).observe(replay);
  }
}

/* ---------- Act 3. Folder reader ---------- */
const tree = $('.tree');
if (tree) {
  tablist(tree, tab => {
    $$('.reader [role="tabpanel"]').forEach(p => { p.hidden = p.id !== tab.getAttribute('aria-controls'); });
  });
}

/* ---------- Act 4. Before and after ---------- */
const pairs = {
  'p-product': {
    before: ['/gallery/product-before.png', 'Product site built with ShipRight 0.6.2: dark speaker page, title low on the left, model in a framed box.'],
    after: ['/gallery/product-after.png', 'Product site built with ShipRight 1.0: Buy in the hero, the speaker larger, view buttons under the model.'],
    tags: ['Before · 0.6.2', 'After · 1.0'],
    caption: 'Same prompt, two pack versions. 1.0 put Buy in the hero, view buttons under the model, and a working name in place of placeholders.',
  },
  'p-dashboard': {
    before: ['/gallery/dashboard-before.png', 'Project tracker built with ShipRight 0.6.2: four projects that need attention, a budget bar on each.'],
    after: ['/gallery/dashboard-after.png', 'Project tracker built with ShipRight 1.0: nine projects in one table, each with its next deadline and budget used.'],
    tags: ['Before · 0.6.2', 'After · 1.0'],
    caption: 'Same prompt, two pack versions. 1.0 shows more projects, each with its next deadline and budget, in one calm table. Sample data.',
  },
  'p-feedback': {
    before: ['/proof/c6-before.png', 'The registration desk screen the owner sent, with three change requests.'],
    after: ['/proof/c6-sonnet.png', 'The desk screen rebuilt by Sonnet with ShipRight 1.2 in a feedback round.'],
    tags: ['Owner screen', 'Rebuild · 1.2'],
    caption: 'Case c6, a feedback round. The owner asked for three things: remove the dot on the selected nav item, keep Escalations and Desk help, and give the selected row a clean border.',
  },
  'p-ivc': {
    before: ['/gallery/ivc-before.png', 'IVC desk person form, earlier version: small fields, no section headings, a button named Save and next person.'],
    after: ['/gallery/ivc-after.png', 'IVC desk person form, Altaz’s Figma redesign: fields grouped under headings, status pills by the name, one named next button.'],
    tags: ['Before', 'Owner redesign'],
    caption: 'The human bar. This after is Altaz’s own Figma redesign, not ShipRight output. ShipRight 1.3 learned its Discover stage and layout moves from this round.',
  },
};
const cmp = $('#cmp');
if (cmp) {
  const range = $('#cmp-range');
  const setPos = v => cmp.style.setProperty('--pos', `${v}%`);
  range.addEventListener('input', () => setPos(range.value));
  setPos(range.value);
  const list = $('.pair-tabs');
  tablist(list, tab => {
    const p = pairs[tab.id];
    if (!p) return;
    const b = $('#cmp-before'); const a = $('#cmp-after');
    b.src = p.before[0]; b.alt = p.before[1];
    a.src = p.after[0]; a.alt = p.after[1];
    $('#tag-before').textContent = p.tags[0];
    $('#tag-after').textContent = p.tags[1];
    $('#cmp-caption').textContent = p.caption;
    cmp.setAttribute('aria-labelledby', tab.id);
    range.value = 50; setPos(50);
  });
}

/* ---------- Act 7. Install ---------- */
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

/* ---------- Act 8. Questions: one open at a time ---------- */
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

/* ---------- Page wipe into the case study ---------- */
$$('[data-transition]').forEach(link => {
  link.addEventListener('click', e => {
    if (reduced || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const wipe = $('.wipe');
    wipe.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' })
      .finished.then(() => { location.href = link.href; });
  });
});
addEventListener('pageshow', () => { const w = $('.wipe'); if (w) w.getAnimations().forEach(a => a.cancel()); });

/* ---------- Reveals: line masks on titles, fade-up on blocks ---------- */
if (!reduced && 'IntersectionObserver' in window) {
  const targets = [...$$('h1, h2').filter(h => h.querySelector('.mask'))];
  targets.forEach(t => t.classList.add('reveal'));
  const blocks = $$('.door, .stage-grid li, .pair, .changed, .q');
  blocks.forEach(b => b.classList.add('fade'));
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = el.classList.contains('fade') ? [...el.parentElement.children].filter(c => c.classList.contains('fade')) : [];
      const delay = Math.max(0, siblings.indexOf(el)) * 70;
      el.style.transitionDelay = `${Math.min(delay, 420)}ms`;
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  [...targets, ...blocks].forEach(el => io.observe(el));
  // Safety net: nothing stays hidden if an observer never fires.
  setTimeout(() => [...targets, ...blocks].forEach(el => el.classList.add('in')), 4000);
}
