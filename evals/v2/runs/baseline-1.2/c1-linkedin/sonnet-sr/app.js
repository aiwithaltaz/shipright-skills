(function () {
  'use strict';

  /* ---------- sample data (all of it is sample data) ---------- */
  var NOW = { date: '2026-10-16', time: '10:15' };
  var LIMIT = 3000;
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var SEED = [
    { id: 'p1', status: 'published', date: '2026-10-13', time: '09:00', body: 'I rewrote my weekly review as three questions.\n\nWhat moved forward? What stalled? What do I drop? It takes ten minutes and replaced a two-page template I never finished.' },
    { id: 'p2', status: 'published', date: '2026-10-15', time: '09:00', body: 'A small rule for meetings: no agenda, no meeting.\n\nIf the organizer cannot write three lines about what needs deciding, the meeting is really a message.' },
    { id: 'p3', status: 'published', date: '2026-10-16', time: '09:00', body: 'Notes from a slow Friday.\n\nThe best work this week happened in the two hours I kept free of calendar invites. I am protecting those hours next week.' },
    { id: 'p4', status: 'scheduled', date: '2026-10-19', time: '09:00', body: 'Why I answer the hardest email first.\n\nBy 11am the easy replies feel urgent and the hard one has quietly moved to tomorrow. Doing it first costs fifteen minutes and clears the rest of the morning.' },
    { id: 'p5', status: 'draft', date: '2026-10-20', time: '09:00', body: 'What a good handoff note contains.\n\n1. What is done and where it lives.\n2. What is half done and why it stopped.\n3. The one decision still waiting on someone.\n\nIf a note lacks the third item, the next person will find it the hard way.' },
    { id: 'p6', status: 'scheduled', date: '2026-10-21', time: '12:30', body: 'A checklist for the first week in a new role.\n\nMeet the people who will rely on your work. Read the last three decisions the team made and why. Ask what "good" looks like in ninety days. Write the answers down.' },
    { id: 'p7', status: 'draft', date: '2026-10-23', time: '09:00', body: 'The best feedback I got this year was one sentence long.' },
    { id: 'p8', status: 'draft', date: '', time: '', body: 'Idea: what I would tell myself before running a small team remotely.' }
  ];
  var FAILED = { id: 'pf', status: 'failed', date: '2026-10-16', time: '09:00', reason: 'LinkedIn did not accept this post. Nothing was posted.', body: 'Three small habits that keep my inbox under control.\n\nI check it twice a day, I unsubscribe the same minute I get annoyed, and I never reply from my phone to anything that needs thinking.' };

  var posts = [];
  var view = 'populated';
  var filter = 'upcoming';
  var selectedId = null;
  var uid = 100;
  var lastTrigger = null;
  var savedAt = '';

  function $(id) { return document.getElementById(id); }
  var els = {
    list: $('list'), banner: $('banner'), notice: $('notice'), sub: $('subline'),
    nUp: $('nUp'), nPub: $('nPub'), editor: $('editor'), edEmpty: $('edEmpty'), edForm: $('edForm'),
    edTitle: $('edTitle'), edBadge: $('edBadge'), edAlert: $('edAlert'), body: $('body'), count: $('count'),
    date: $('date'), time: $('time'), tz: $('tzLine'), whenErr: $('whenErr'), del: $('delBtn'), sec: $('secBtn'),
    pri: $('priBtn'), why: $('why'), saved: $('savedLine'), close: $('edClose'), closeLabel: $('edCloseLabel'),
    chip: $('connChip'), live: $('live'), dlg: $('delDialog'), bottom: $('bottomBar')
  };

  var mqPhone = window.matchMedia('(max-width: 899px)');

  function reset() {
    posts = SEED.map(function (p) { return Object.assign({}, p); });
    if (view === 'empty' || view === 'loading') posts = [];
    if (view === 'failed') posts.push(Object.assign({}, FAILED));
  }

  /* ---------- formatting ---------- */
  function dateParts(s) { var a = s.split('-'); return new Date(Date.UTC(+a[0], +a[1] - 1, +a[2])); }
  function dayLabel(s) { var d = dateParts(s); return DAYS[d.getUTCDay()] + ' ' + d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()]; }
  function timeLabel(t) {
    if (!t) return 'No time';
    var a = t.split(':'), h = +a[0], m = a[1], ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    return h + ':' + m + ' ' + ap;
  }
  function whenLabel(p) { return dayLabel(p.date) + ', ' + timeLabel(p.time); }
  function addDays(s, n) { var d = dateParts(s); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
  function isWeekend(s) { var g = dateParts(s).getUTCDay(); return g === 0 || g === 6; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function byTime(a, b) { return (a.date + a.time).localeCompare(b.date + b.time); }

  var ICONS = {
    draft: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5"/></svg>',
    scheduled: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.2 1.4"/></svg>',
    published: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8"/></svg>',
    failed: '<svg class="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>'
  };
  var NAMES = { draft: 'Draft', scheduled: 'Scheduled', published: 'Published', failed: 'Failed' };
  function badge(status) { return '<span class="badge b-' + status + '">' + ICONS[status] + NAMES[status] + '</span>'; }

  function parts(body) {
    var t = (body || '').trim();
    if (!t) return ['', ''];
    var lines = t.split('\n').filter(function (l) { return l.trim(); });
    return [lines[0], lines.slice(1).join(' ')];
  }

  /* ---------- list ---------- */
  function counts() {
    var pub = posts.filter(function (p) { return p.status === 'published'; }).length;
    return { up: posts.length - pub, pub: pub };
  }

  function rowHtml(p) {
    var pr = parts(p.body);
    var title = pr[0] ? esc(pr[0]) : '<span class="empty-body">Empty draft</span>';
    var sel = p.id === selectedId ? ' aria-current="true"' : '';
    var label = (p.date ? dayLabel(p.date) + ', ' : '') + (p.time ? timeLabel(p.time) + ', ' : '') + NAMES[p.status] + ', ' + (pr[0] || 'Empty draft');
    return '<li><button type="button" class="row" data-id="' + p.id + '"' + sel + ' aria-label="' + esc(label) + '">' +
      '<span class="time">' + (p.time ? timeLabel(p.time) : 'No time') + '</span>' +
      '<span class="txt"><span class="t1">' + title + '</span><span class="t2">' + esc(pr[1]) + '</span></span>' +
      badge(p.status) + '</button></li>';
  }

  function dayBlock(heading, extra, inner) {
    return '<section class="day"><h3 class="day-h"><span>' + heading + '</span>' + (extra ? '<span class="today">' + extra + '</span>' : '') + '</h3><ul>' + inner + '</ul></section>';
  }

  function renderList() {
    var c = counts();
    els.nUp.textContent = '(' + c.up + ')';
    els.nPub.textContent = '(' + c.pub + ')';
    document.querySelectorAll('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === filter)); });

    if (view === 'loading') {
      els.list.setAttribute('aria-busy', 'true');
      var s = '';
      for (var i = 0; i < 6; i++) s += '<div class="skel"><i></i><i></i><i></i></div>';
      els.list.innerHTML = '<div role="status" class="sr-only">Loading your posts</div>' + s;
      return;
    }
    els.list.removeAttribute('aria-busy');

    if (!posts.length) {
      els.list.innerHTML = '<div class="empty"><h2>No posts yet</h2><p>Write your first post to start your queue.</p><button type="button" class="btn btn-secondary" data-action="new">New post</button></div>';
      return;
    }

    var html = '';
    if (filter === 'upcoming') {
      var up = posts.filter(function (p) { return p.status !== 'published'; }).sort(byTime);
      var dated = up.filter(function (p) { return p.date; });
      var undated = up.filter(function (p) { return !p.date; });
      var end = addDays(NOW.date, 6);
      dated.forEach(function (p) { if (p.date > end) end = p.date; });
      for (var d = NOW.date; d <= end; d = addDays(d, 1)) {
        var day = dated.filter(function (p) { return p.date === d; });
        if (!day.length && isWeekend(d)) continue;
        var inner = day.length ? day.map(rowHtml).join('') :
          '<li class="none"><span>Nothing planned</span><button type="button" class="btn btn-text" data-action="new" data-date="' + d + '">Add post</button></li>';
        html += dayBlock(dayLabel(d), d === NOW.date ? 'Today' : '', inner);
      }
      if (undated.length) html += dayBlock('No time set', '', undated.map(rowHtml).join(''));
    } else {
      var pubs = posts.filter(function (p) { return p.status === 'published'; }).sort(function (a, b) { return byTime(b, a); });
      if (!pubs.length) {
        html = '<div class="empty"><h2>Nothing published yet</h2><p>Posts appear here after they go out at their scheduled time.</p></div>';
      } else {
        var seen = {};
        pubs.forEach(function (p) { (seen[p.date] = seen[p.date] || []).push(p); });
        Object.keys(seen).sort().reverse().forEach(function (d) { html += dayBlock(dayLabel(d), '', seen[d].map(rowHtml).join('')); });
      }
    }
    els.list.innerHTML = html;
  }

  /* ---------- banner, header, chip ---------- */
  function renderChrome() {
    var failed = posts.filter(function (p) { return p.status === 'failed'; });
    var b = '';
    if (view === 'expired') {
      b = '<div class="alert alert-danger" role="alert"><p><strong>LinkedIn connection expired.</strong> Posts due while you are disconnected will not publish.</p><button type="button" class="btn btn-primary" data-action="settings">Reconnect LinkedIn</button></div>';
    } else if (failed.length) {
      b = '<div class="alert alert-danger" role="alert"><p><strong>' + failed.length + ' post did not publish.</strong> It was due ' + whenLabel(failed[0]) + '. Open it to retry or edit.</p><button type="button" class="btn btn-secondary" data-action="open-failed" data-id="' + failed[0].id + '">Open post</button></div>';
    }
    els.banner.innerHTML = b;
    els.chip.className = 'conn' + (view === 'expired' ? ' bad' : '');
    els.chip.textContent = view === 'expired' ? 'LinkedIn: reconnect needed' : 'LinkedIn: connected';
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { tz = ''; }
    els.sub.textContent = 'Today is ' + dayLabel(NOW.date) + (tz ? '. Times are in ' + tz.replace(/_/g, ' ') + '.' : '.');
    els.tz.textContent = tz ? 'Time zone: ' + tz.replace(/_/g, ' ') + '.' : '';
  }

  /* ---------- editor ---------- */
  function current() { return posts.filter(function (p) { return p.id === selectedId; })[0]; }

  function problems(p) {
    var out = {};
    var text = els.body.value.trim();
    if (!text) out.text = 'Add text';
    if (els.body.value.length > LIMIT) out.over = true;
    if (!els.date.value || !els.time.value) out.when = 'Add a date and a time';
    else if ((els.date.value + els.time.value) <= (NOW.date + NOW.time)) out.past = true;
    if (view === 'expired') out.conn = true;
    return out;
  }

  function renderCount() {
    var n = els.body.value.length;
    els.count.textContent = n.toLocaleString('en-US') + ' / ' + LIMIT.toLocaleString('en-US');
    var over = n > LIMIT;
    els.count.classList.toggle('over', over);
    if (over) els.count.textContent += '. Over by ' + (n - LIMIT).toLocaleString('en-US');
  }

  function renderEditor(focusTitle) {
    var p = current();
    if (!p || view === 'loading') {
      els.edForm.hidden = true; els.edEmpty.hidden = false;
      els.editor.classList.remove('open');
      setInert();
      return;
    }
    els.edEmpty.hidden = true; els.edForm.hidden = false;
    var st = p.status;
    els.edTitle.textContent = st === 'published' ? 'Published post' : (st === 'scheduled' ? 'Scheduled post' : (st === 'failed' ? 'Post did not publish' : 'Edit post'));
    els.edBadge.innerHTML = badge(st);
    els.closeLabel.textContent = mqPhone.matches ? 'Back to queue' : 'Close';

    var readonly = st === 'published' || st === 'scheduled';
    els.body.value = p.body; els.body.readOnly = readonly;
    els.date.value = p.date; els.time.value = p.time;
    els.date.readOnly = readonly; els.time.readOnly = readonly;
    els.date.disabled = false; els.time.disabled = false;
    els.whenErr.hidden = true; els.whenErr.textContent = '';
    els.date.removeAttribute('aria-invalid'); els.time.removeAttribute('aria-invalid');
    els.body.removeAttribute('aria-invalid');
    renderCount();

    var al = '';
    if (st === 'failed') al = '<div class="alert alert-danger alert-in" role="alert"><p><strong>' + esc(p.reason || 'Not posted.') + '</strong> Check LinkedIn before retrying if you are unsure. Retry sends it once.</p></div>';
    if (st === 'scheduled') al = '<div class="alert alert-info alert-in"><p>Approved. It will publish ' + whenLabel(p) + '. To change it, move it back to draft first.</p></div>';
    if (st === 'published') al = '<div class="alert alert-info alert-in"><p>Published ' + whenLabel(p) + '. Published posts are read only here.</p></div>';
    els.edAlert.innerHTML = al;

    els.del.hidden = !(st === 'draft' || st === 'failed');
    els.del.textContent = st === 'failed' ? 'Delete post' : 'Delete draft';

    els.sec.hidden = false; els.pri.hidden = false;
    if (st === 'draft') { els.sec.hidden = true; els.pri.textContent = 'Approve and schedule'; }
    if (st === 'scheduled') { els.sec.hidden = true; els.pri.textContent = 'Move back to draft'; els.pri.className = 'btn btn-secondary'; }
    else els.pri.className = 'btn btn-primary';
    if (st === 'failed') { els.sec.textContent = 'Move back to draft'; els.pri.textContent = 'Retry now'; }
    if (st === 'published') { els.sec.hidden = true; els.pri.hidden = true; }
    els.saved.textContent = savedAt && st === 'draft' ? savedAt : ''; els.saved.className = 'saved ok';
    updateActionState();

    if (mqPhone.matches) {
      els.editor.classList.add('open');
      setInert();
    } else setInert();
    if (focusTitle) { setTimeout(function () { els.edTitle.focus(); }, mqPhone.matches ? 260 : 0); }
  }

  function updateActionState() {
    var p = current(); if (!p) return;
    var pr = problems(p), why = '';
    if (p.status === 'draft' || p.status === 'failed') {
      if (p.status === 'draft') {
        if (pr.conn) why = 'Reconnect LinkedIn to approve this post.';
        else if (pr.over) why = 'The post is over the 3,000 character limit. Shorten it to approve.';
        else if (pr.text && pr.when) why = 'Add text, a date and a time to approve.';
        else if (pr.text) why = 'Add text to approve.';
        else if (pr.when) why = 'Add a date and a time to approve.';
        else if (pr.past) why = 'Pick a time later than now to approve.';
        els.pri.disabled = !!why;
      } else {
        els.pri.disabled = !!pr.conn || !!pr.over || !!pr.text;
        why = pr.conn ? 'Reconnect LinkedIn to retry.' : '';
      }
    } else els.pri.disabled = false;
    els.why.textContent = why;
    els.pri.setAttribute('aria-describedby', 'why');
    els.body.toggleAttribute('aria-invalid', false);
    if (pr.over && p.status !== 'published' && p.status !== 'scheduled') els.body.setAttribute('aria-invalid', 'true'); else els.body.removeAttribute('aria-invalid');
    if (pr.past && p.status === 'draft' && els.date.value && els.time.value) {
      els.whenErr.hidden = false; els.whenErr.textContent = 'This time has already passed.';
      els.date.setAttribute('aria-invalid', 'true'); els.time.setAttribute('aria-invalid', 'true');
    } else {
      els.whenErr.hidden = true; els.whenErr.textContent = '';
      els.date.removeAttribute('aria-invalid'); els.time.removeAttribute('aria-invalid');
    }
  }

  function setInert() {
    if (mqPhone.matches && !els.editor.classList.contains('open')) els.editor.setAttribute('inert', ''); else els.editor.removeAttribute('inert');
  }

  function announce(msg) { els.live.textContent = ''; setTimeout(function () { els.live.textContent = msg; }, 30); }

  /* ---------- actions ---------- */
  function select(id, trigger, focusTitle) {
    selectedId = id; savedAt = '';
    if (trigger) lastTrigger = trigger;
    renderList(); renderEditor(focusTitle);
  }

  function closeEditor() {
    selectedId = null;
    els.editor.classList.remove('open');
    renderList(); renderEditor(false);
    setInert();
    var t = lastTrigger;
    if (t && document.body.contains(t)) t.focus();
    else { var f = els.list.querySelector('.row'); if (f) f.focus(); }
  }

  function newPost(date) {
    uid++;
    var p = { id: 'n' + uid, status: 'draft', date: date || '', time: date ? '09:00' : '', body: '' };
    posts.push(p);
    filter = 'upcoming';
    lastTrigger = document.activeElement;
    selectedId = p.id; savedAt = '';
    renderList(); renderEditor(false);
    renderChrome();
    setTimeout(function () { els.body.focus(); }, mqPhone.matches ? 260 : 0);
    announce('New draft opened.');
  }

  function saveFields() {
    var p = current(); if (!p || p.status === 'published' || p.status === 'scheduled') return;
    p.body = els.body.value; p.date = els.date.value; p.time = els.time.value;
    savedAt = 'Draft saved in this preview.';
    els.saved.textContent = p.status === 'draft' ? savedAt : '';
    els.saved.className = 'saved ok';
    renderCount();
    updateActionState();
    renderListSoon();
  }
  var listTimer = null;
  function renderListSoon() {
    clearTimeout(listTimer);
    listTimer = setTimeout(renderList, 250);
  }

  function approve() {
    var p = current(); if (!p) return;
    saveFields();
    if (Object.keys(problems(p)).length) { updateActionState(); return; }
    p.status = 'scheduled';
    renderList(); renderEditor(false); renderChrome();
    els.pri.focus();
    announce('Post scheduled for ' + whenLabel(p) + '.');
  }
  function backToDraft() {
    var p = current(); if (!p) return;
    p.status = 'draft'; delete p.reason;
    renderList(); renderEditor(false); renderChrome();
    els.body.focus();
    els.saved.textContent = 'Moved back to draft. It will not publish until you approve it again.'; els.saved.className = 'saved ok';
    announce('Post moved back to draft. It will not publish.');
  }
  function retry() {
    var p = current(); if (!p) return;
    saveFields();
    els.pri.disabled = true; els.pri.textContent = 'Sending...';
    announce('Sending to LinkedIn.');
    setTimeout(function () {
      p.status = 'published'; p.time = NOW.time; delete p.reason;
      renderList(); renderEditor(false); renderChrome();
      announce('Post published.');
    }, 900);
  }
  function openDelete() {
    var p = current(); if (!p) return;
    $('delTitle').textContent = 'Delete this ' + (p.status === 'failed' ? 'post' : 'draft') + '?';
    $('delText').textContent = p.status === 'failed'
      ? 'It will be removed from your queue. It was not posted to LinkedIn. This cannot be undone.'
      : 'It will be removed from your queue and was never posted to LinkedIn. This cannot be undone.';
    $('delConfirm').textContent = p.status === 'failed' ? 'Delete post' : 'Delete draft';
    els.dlg.showModal();
  }
  function confirmDelete() {
    var p = current(); if (!p) return;
    posts = posts.filter(function (x) { return x.id !== p.id; });
    els.dlg.close();
    selectedId = null; els.editor.classList.remove('open');
    renderList(); renderEditor(false); renderChrome(); setInert();
    var f = els.list.querySelector('.row') || $('newPost'); if (f && f.offsetParent) f.focus(); else $('newPostPhone').focus();
    announce('Draft deleted.');
  }
  function showNotice(msg) {
    els.notice.hidden = false;
    els.notice.innerHTML = '<p>' + esc(msg) + '</p><button type="button" class="btn btn-text" id="noticeX">Dismiss</button>';
    $('noticeX').addEventListener('click', function () { els.notice.hidden = true; });
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('button, [data-action]'); if (!t) return;
    if (t.classList.contains('row')) { select(t.dataset.id, t, true); return; }
    var a = t.dataset.action;
    if (a === 'new') newPost(t.dataset.date);
    else if (a === 'settings') showNotice('Settings and Connect LinkedIn are specified in the frontend spec and are not built in this preview.');
    else if (a === 'open-failed') select(t.dataset.id, t, true);
    else if (t.dataset.filter) { filter = t.dataset.filter; renderList(); }
  });
  $('newPost').addEventListener('click', function () { newPost(); });
  $('newPostPhone').addEventListener('click', function () { newPost(); });
  els.close.addEventListener('click', closeEditor);
  els.body.addEventListener('input', saveFields);
  els.date.addEventListener('input', saveFields);
  els.time.addEventListener('input', saveFields);
  els.pri.addEventListener('click', function () {
    var p = current(); if (!p) return;
    if (p.status === 'draft') approve(); else if (p.status === 'scheduled') backToDraft(); else if (p.status === 'failed') retry();
  });
  els.sec.addEventListener('click', function () { backToDraft(); });
  els.del.addEventListener('click', openDelete);
  $('delCancel').addEventListener('click', function () { els.dlg.close(); els.del.focus(); });
  $('delConfirm').addEventListener('click', confirmDelete);
  els.edForm.addEventListener('submit', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mqPhone.matches && els.editor.classList.contains('open') && !els.dlg.open) closeEditor();
  });
  $('viewState').addEventListener('change', function (e) {
    view = e.target.value; filter = 'upcoming'; selectedId = null; savedAt = '';
    els.notice.hidden = true;
    reset(); renderChrome(); renderList(); renderEditor(false);
    if (view === 'populated' && !mqPhone.matches) select('p5', null, false);
  });
  mqPhone.addEventListener('change', function () { renderEditor(false); });
  els.bottom.hidden = false;

  /* ---------- start ---------- */
  reset(); renderChrome(); renderList();
  if (!mqPhone.matches) select('p5', null, false); else { renderEditor(false); }
})();
