/* Threadline — Today screen prototype (sample data, no network) */
(function () {
  "use strict";

  var USER = "Jordan";
  var START_STREAK = 12;
  var NOTE_CAP = 20;
  var NOTES_SENT_TODAY = 4;

  var TYPES = {
    follow:  { label: "Follow up", cls: "t-follow",  open: "Copy & open chat",    doneLabel: "Follow-up sent" },
    reply:   { label: "Reply",     cls: "t-reply",   open: "Copy & open chat",    doneLabel: "Reply sent" },
    engage:  { label: "Engage",    cls: "t-engage",  open: "Copy & open post",    doneLabel: "Comment posted" },
    connect: { label: "Connect",   cls: "t-connect", open: "Copy & open profile", doneLabel: "Invite sent" }
  };

  var actions = [
    {
      id: "a1", type: "reply", mins: 1, hue: 200,
      name: "Marcus Bell", initials: "MB", stage: "Call booked",
      role: "Founder · Northpine Studio",
      why: "Waiting on you · replied 26h ago",
      ctxLabel: "His last message · Yesterday",
      ctx: "Thursday works. Can you send over the case study beforehand so I can skim it?",
      draft: "Perfect, Thursday at 2pm CT it is. Here's the case study: [link]\n\nIf you only have 3 minutes, page 4 is the one worth reading. It's the before/after on onboarding time. See you then.",
      variants: {
        shorter: "Thursday 2pm CT works. Case study here: [link]. Page 4 is the good part. See you then!",
        warmer: "Great, looking forward to Thursday at 2pm CT! Here's the case study: [link]\n\nNo need to read the whole thing. Page 4 has the before/after on onboarding time, and I think it'll spark some good questions for our chat.",
        direct: "Confirmed: Thursday, 2pm CT. Case study: [link]. Read page 4 (onboarding before/after). I'll come with a rough plan for Northpine.",
        alt: ["Thursday at 2pm CT, locked in. Here's the case study: [link]\n\nPage 4 is the short version: onboarding went from 9 days to 2. Happy to dig into how that might map to Northpine."]
      }
    },
    {
      id: "a2", type: "follow", mins: 3, hue: 28,
      name: "Priya Raman", initials: "PR", stage: "Talking",
      role: "Head of Operations · Lattice Freight",
      why: "Asked you to circle back in October · 34 days ago",
      ctxLabel: "Her last message · Sep 12",
      ctx: "Love the idea. Let's circle back once Q3 planning wraps. Ping me in October?",
      draft: "Hi Priya, October as promised. Hope Q3 planning landed well.\n\nLast time you mentioned dispatch handoffs were eating your team's mornings. Is that still on the Q4 list? If so, I can walk you through what we did for a 40-truck fleet in 20 minutes. Would Tuesday or Wednesday work?",
      variants: {
        shorter: "Hi Priya, October as promised! Are dispatch handoffs still on the Q4 list? Happy to share what worked for a 40-truck fleet. 20 min Tue or Wed?",
        warmer: "Hi Priya, it's October, so here I am as promised. I hope Q3 planning wrapped without too much chaos.\n\nYou'd mentioned dispatch handoffs were eating up your team's mornings, and I've been thinking about it since. If it's still a priority, I'd love to show you what helped a 40-truck fleet. Any chance you have 20 minutes next week?",
        direct: "Hi Priya, checking in as you asked. Are dispatch handoffs a Q4 priority? If yes, let's do 20 minutes Tuesday or Wednesday and I'll show you the 40-truck fleet results. If not, just say so and I'll check back in Q1.",
        alt: ["Hi Priya, you asked me to ping you in October, so here I am.\n\nQuick question before anything else: did the dispatch handoff problem make it into Q4 planning? If it did, I have a 20-minute walkthrough that might save your team a few mornings a week."]
      }
    },
    {
      id: "a3", type: "engage", mins: 2, hue: 265,
      name: "Dana Okafor", initials: "DO", stage: "New",
      role: "VP Marketing · Fieldnote",
      why: "Posted 5h ago about attribution · on your target list",
      ctxLabel: "Her post · 5h ago",
      ctx: "Hot take: multi-touch attribution is mostly a comfort blanket. We changed our model three times last year and not one budget decision changed.",
      draft: "The \"comfort blanket\" line is going to stick with me. We saw the same thing: the model changed three times in a year, and budget decisions didn't move.\n\nWhat finally shifted it for your team? Self-reported attribution, or something else?",
      variants: {
        shorter: "\"Comfort blanket\" is exactly it. Same experience here. What finally moved budget decisions for your team?",
        warmer: "This is such a useful post, Dana. The \"comfort blanket\" framing is going to stick with me. We went through almost the exact same cycle. Curious what ended up actually changing how your team decides on budget?",
        direct: "Agree. Three model changes, zero budget changes is the real tell. Did you replace it with self-reported attribution, or drop the model entirely?",
        alt: ["Three model changes, zero budget changes might be the most honest attribution stat I've seen. Did your team end up leaning on self-reported \"how did you hear about us\" instead?"]
      }
    },
    {
      id: "a4", type: "follow", mins: 2, hue: 340,
      name: "Hannah Lee", initials: "HL", stage: "Talking",
      role: "COO · Brightwell Dental Group",
      why: "Proposal sent 8 days ago · no reply (2nd nudge)",
      ctxLabel: "Your last message · Oct 8",
      ctx: "Here's the proposal we discussed: 3 locations first, then the rest in Q1. Let me know what questions come up.",
      draft: "Hi Hannah, floating this back up in case it got buried under month-end.\n\nNo pressure either way. If the timing's off, a quick \"not now\" helps too, so I'm not nudging you at the wrong moment.",
      variants: {
        shorter: "Hi Hannah, bumping this in case it got buried. If the timing's off, a quick \"not now\" is totally fine!",
        warmer: "Hi Hannah, I hope month-end isn't too wild over there. Just floating the proposal back to the top of your inbox.\n\nIf now isn't the right time, no worries at all. A quick \"not now\" is helpful too, and I'll check back whenever suits you.",
        direct: "Hi Hannah, following up on the 3-location proposal. Is this a yes, a no, or a \"not this quarter\"? Any answer helps me plan.",
        alt: ["Hi Hannah, one small idea in case it helps: we could start with just one location for 30 days instead of three, which might be an easier yes internally. Want me to send a one-page version?"]
      }
    },
    {
      id: "a5", type: "connect", mins: 1, hue: 170, limit: 300,
      name: "Tomás Ferreira", initials: "TF", stage: "New",
      role: "Product Lead · Kinetic Health",
      why: "Met at the SaaS North meetup on Tuesday · you added him to People",
      ctxLabel: "Your note · Tue",
      ctx: "Sharp on onboarding. Thinks it's a product problem, not a CS problem. Has a team of 6 PMs.",
      draft: "Hi Tomás, good meeting you at SaaS North on Tuesday. Your point that onboarding is a product problem, not a CS problem, stuck with me. Would be great to stay connected.",
      variants: {
        shorter: "Hi Tomás, great meeting you at SaaS North Tuesday. Still thinking about your onboarding point. Let's stay connected!",
        warmer: "Hi Tomás! Really enjoyed our chat at SaaS North on Tuesday. Your take on onboarding being a product problem has been rattling around my head since. Would love to stay in touch.",
        direct: "Hi Tomás, we met at SaaS North Tuesday (onboarding = product problem). Connecting so we can keep that conversation going.",
        alt: ["Hi Tomás, we talked onboarding at SaaS North on Tuesday. I've been testing your \"it's a product problem\" idea against a few clients, and you might be right. Let's connect."]
      }
    },
    {
      id: "a6", type: "engage", mins: 2, hue: 95,
      name: "Sam Whitaker", initials: "SW", stage: "Talking",
      role: "Founder · Ledgerly",
      why: "Announced a seed round yesterday",
      ctxLabel: "His post · 1 day ago",
      ctx: "Some news: Ledgerly raised a $3.2M seed to build bookkeeping that small agencies don't dread. Hiring our first 4 engineers now.",
      draft: "Congrats Sam, this is well deserved. \"Bookkeeping small agencies don't dread\" is a sharp, clear mission.\n\nIf you're hiring 4 engineers, onboarding is about to matter a lot. Happy to share what we've seen work at that stage if it's ever useful.",
      variants: {
        shorter: "Huge congrats, Sam! Well deserved. Excited to watch Ledgerly grow.",
        warmer: "Huge congrats Sam, I've watched you build toward this for a while and it's great to see. \"Bookkeeping small agencies don't dread\" is exactly the kind of mission that hires well. Cheering you on!",
        direct: "Congrats Sam! With 4 engineering hires coming, happy to share our new-hire onboarding checklist. Just say the word.",
        alt: ["Congrats Sam! The \"don't dread\" framing is great. It names the real problem, not the category. Excited to see what the first 4 engineers ship."]
      }
    },
    {
      id: "a7", type: "reply", mins: 2, hue: 15,
      name: "Aisha Karim", initials: "AK", stage: "New",
      role: "Freelance brand designer",
      why: "Commented on your post \"Raise prices before you're ready\"",
      ctxLabel: "Her comment · 3h ago",
      ctx: "How did you handle pushback from existing clients when you raised prices? That's the part that scares me.",
      draft: "Great question, Aisha. I gave existing clients 60 days' notice and kept their old rate for one more project. Most stayed. The two who left were the ones I'd been undercharging the most.\n\nThe notice period did most of the work. It made the change feel fair rather than sudden.",
      variants: {
        shorter: "60 days' notice + one more project at the old rate. Most clients stayed, and the notice did the heavy lifting.",
        warmer: "Such a real fear, and I had it too! What helped was giving existing clients 60 days' notice and honoring their old rate for one more project. Most stayed, and the conversations were much kinder than I'd imagined.",
        direct: "60 days' notice, old rate honored for one final project, no apologizing. Most stayed. The ones who left were my least profitable clients.",
        alt: ["The scary part was mostly in my head. I sent a short note with 60 days' notice and a thank-you, and most clients just said \"makes sense.\" The notice period is the key."]
      }
    }
  ];

  // ---------- state ----------
  var state = {
    filter: "all",
    openId: null,
    status: {},   // id -> "queued" | "copied" | "done" | "removed"
    drafts: {},   // id -> current text
    altIdx: {}
  };
  actions.forEach(function (a) { state.status[a.id] = "queued"; state.drafts[a.id] = a.draft; state.altIdx[a.id] = 0; });
  state.openId = actions[0].id;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var queueEl = $("#queue");

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(id) { for (var i = 0; i < actions.length; i++) if (actions[i].id === id) return actions[i]; }
  function live() { return actions.filter(function (a) { return state.status[a.id] !== "removed"; }); }
  function isDone(a) { return state.status[a.id] === "done"; }

  // ---------- header ----------
  function renderHeader() {
    var now = new Date();
    var h = now.getHours();
    var greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    $("#greeting").textContent = greet + ", " + USER + ".";
    $("#dateLine").textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }

  function renderProgress() {
    var all = live();
    var done = all.filter(isDone).length;
    var left = all.filter(function (a) { return !isDone(a); });
    var mins = left.reduce(function (s, a) { return s + a.mins; }, 0);
    $("#progressCount").textContent = done + "/" + all.length;
    var C = 169.65;
    var pct = all.length ? done / all.length : 1;
    $("#ringFill").style.strokeDashoffset = String(C * (1 - pct));
    $("#navBadge").textContent = left.length ? String(left.length) : "";
    $("#summaryLine").textContent = left.length
      ? left.length + (left.length === 1 ? " action" : " actions") + " left · about " + mins + " min. Everything is drafted. You press send."
      : "All done for today. Nice work.";

    // filter counts
    var counts = { all: 0, follow: 0, reply: 0, engage: 0, connect: 0 };
    left.forEach(function (a) { counts.all++; counts[a.type]++; });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var n = counts[el.getAttribute("data-count")];
      el.textContent = n ? n : "";
    });

    // pace
    var notes = NOTES_SENT_TODAY + actions.filter(function (a) { return a.type === "connect" && isDone(a); }).length;
    $("#paceNotes").textContent = notes;
    $("#paceBar").style.width = Math.min(100, (notes / NOTE_CAP) * 100) + "%";

    // cleared
    var cleared = $("#cleared");
    var wasHidden = cleared.hidden;
    cleared.hidden = left.length > 0;
    var streak = $("#streakCount").parentElement;
    if (!left.length && wasHidden) {
      $("#streakCount").textContent = START_STREAK + 1;
      streak.classList.remove("bump"); void streak.offsetWidth; streak.classList.add("bump");
    } else if (left.length) {
      $("#streakCount").textContent = START_STREAK;
    }
  }

  // ---------- queue ----------
  var chevron = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
  var checkSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';
  var copySvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0013.5 4h-7A2.5 2.5 0 004 6.5v7A2.5 2.5 0 006.5 16H8"/></svg>';

  function cardHTML(a) {
    var t = TYPES[a.type];
    var st = state.status[a.id];

    if (st === "done") {
      return '<article class="card done ' + t.cls + '" data-id="' + a.id + '">' +
        '<div class="row">' +
          '<span class="done-check">' + checkSvg + '</span>' +
          '<span class="done-text"><strong>' + esc(a.name) + '</strong> · ' + esc(t.doneLabel) + '</span>' +
          '<button class="link" data-act="undo-done">Undo</button>' +
        '</div></article>';
    }

    var open = state.openId === a.id;
    var text = state.drafts[a.id];
    var countHTML = a.limit
      ? '<span class="count' + (text.length > a.limit ? " over" : "") + '" data-role="count">' + text.length + " / " + a.limit + "</span>"
      : '<span class="count" data-role="count">' + text.length + " chars</span>";

    return '<article class="card ' + t.cls + (open ? " is-open" : "") + (st === "copied" ? " copied" : "") + '" data-id="' + a.id + '">' +
      '<button class="row" data-act="toggle" aria-expanded="' + open + '" aria-controls="body-' + a.id + '">' +
        '<span class="type-dot" aria-hidden="true"></span>' +
        '<span class="avatar" style="--h:' + a.hue + '" aria-hidden="true">' + esc(a.initials) + '</span>' +
        '<span class="row-main">' +
          '<span class="row-name">' + esc(a.name) + ' <span class="tag">' + t.label + '</span></span>' +
          '<span class="row-why">' + esc(a.why) + '</span>' +
        '</span>' +
        '<span class="row-meta"><span class="mins">~' + a.mins + ' min</span>' + chevron + '</span>' +
      '</button>' +
      '<div class="body" id="body-' + a.id + '">' +
        '<p class="role">' + esc(a.role) + ' <span class="stage">' + esc(a.stage) + '</span></p>' +
        '<blockquote class="context"><span class="ctx-label">' + esc(a.ctxLabel) + '</span><q>' + esc(a.ctx) + '</q></blockquote>' +
        '<div class="draft-label"><span>Draft</span><span class="ai">Written in your voice</span></div>' +
        '<div class="draft-wrap"><textarea class="draft" data-role="draft" aria-label="Draft to ' + esc(a.name) + '" rows="5">' + esc(text) + '</textarea></div>' +
        '<div class="draft-foot">' +
          '<div class="chips">' +
            '<button class="chip" data-tone="shorter">Shorter</button>' +
            '<button class="chip" data-tone="warmer">Warmer</button>' +
            '<button class="chip" data-tone="direct">More direct</button>' +
            '<button class="chip" data-tone="regen">↻ Regenerate</button>' +
          '</div>' + countHTML +
        '</div>' +
        '<div class="actions">' +
          '<button class="btn btn-primary" data-act="copy">' + copySvg + t.open + '</button>' +
          '<button class="btn btn-outline' + (st === "copied" ? " attn" : "") + '" data-act="done"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>Mark sent</button>' +
          '<span class="spacer"></span>' +
          '<details class="snooze"><summary class="btn btn-ghost">Snooze</summary>' +
            '<div class="menu" role="menu">' +
              '<button role="menuitem" data-snooze="Tomorrow">Tomorrow</button>' +
              '<button role="menuitem" data-snooze="In 3 days">In 3 days</button>' +
              '<button role="menuitem" data-snooze="Next week">Next week</button>' +
            '</div></details>' +
          '<button class="btn btn-ghost" data-act="skip">Skip</button>' +
        '</div>' +
        '<div class="sent-hint">Copied. Sent it on LinkedIn? Hit <strong>Mark sent</strong> and we\'ll log it and set the next follow-up.</div>' +
      '</div>' +
    '</article>';
  }

  function renderQueue() {
    var list = live().filter(function (a) { return state.filter === "all" || a.type === state.filter; });
    // undone first, done after, preserving order
    list = list.filter(function (a) { return !isDone(a); }).concat(list.filter(isDone));
    queueEl.innerHTML = list.map(cardHTML).join("");
    if (!list.length && state.filter !== "all" && live().some(function (a) { return !isDone(a); })) {
      queueEl.innerHTML = '<p class="fineprint" style="padding:8px 4px">Nothing here right now. Check the other filters.</p>';
    }
    renderProgress();
  }

  function nextOpen(afterId) {
    var list = live().filter(function (a) { return !isDone(a) && (state.filter === "all" || a.type === state.filter); });
    var idx = -1;
    for (var i = 0; i < actions.length; i++) if (actions[i].id === afterId) idx = i;
    for (var j = 0; j < list.length; j++) if (actions.indexOf(list[j]) > idx) return list[j].id;
    return list.length ? list[0].id : null;
  }

  // ---------- toast ----------
  var toastTimer, undoFn = null;
  function toast(msg, undo) {
    var el = $("#toast");
    $("#toastMsg").textContent = msg;
    var u = $("#toastUndo");
    undoFn = undo || null;
    u.hidden = !undo;
    el.hidden = true; void el.offsetWidth; el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; undoFn = null; }, undo ? 5000 : 3600);
  }
  $("#toastUndo").addEventListener("click", function () {
    if (undoFn) undoFn();
    undoFn = null;
    $("#toast").hidden = true;
  });

  // ---------- clipboard ----------
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(fallback);
    }
    return Promise.resolve(fallback());
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  // ---------- actions ----------
  function removeWithAnim(id, msg, status) {
    var card = queueEl.querySelector('[data-id="' + id + '"]');
    var prevOpen = state.openId;
    var finish = function () {
      state.status[id] = status;
      if (state.openId === id) state.openId = nextOpen(id);
      renderQueue();
      toast(msg, function () {
        state.status[id] = "queued";
        state.openId = prevOpen;
        renderQueue();
      });
    };
    if (card && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      card.classList.add("leaving");
      setTimeout(finish, 220);
    } else finish();
  }

  queueEl.addEventListener("click", function (e) {
    var card = e.target.closest(".card");
    if (!card) return;
    var id = card.getAttribute("data-id");
    var a = byId(id);
    var btn = e.target.closest("button");
    if (!btn) return;
    var act = btn.getAttribute("data-act");
    var tone = btn.getAttribute("data-tone");
    var snooze = btn.getAttribute("data-snooze");

    if (act === "toggle") {
      state.openId = state.openId === id ? null : id;
      renderQueue();
      var opened = queueEl.querySelector('[data-id="' + id + '"].is-open');
      if (opened && opened.getBoundingClientRect().top < 0) opened.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }

    if (act === "copy") {
      copyText(state.drafts[id]).then(function () {
        state.status[id] = "copied";
        card.classList.add("copied");
        card.querySelector('[data-act="done"]').classList.add("attn");
        var where = a.type === "engage" ? "post" : a.type === "connect" ? "profile" : "conversation";
        toast("Draft copied. In the live app, " + a.name.split(" ")[0] + "'s " + where + " opens in a new tab. Paste and send.");
      });
      return;
    }

    if (act === "done") {
      var first = a.name.split(" ")[0];
      var next = a.type === "follow" ? " Next follow-up set for 7 days." : a.type === "connect" ? " Added to New." : "";
      state.status[id] = "done";
      state.openId = nextOpen(id);
      renderQueue();
      toast("Logged for " + first + ": " + TYPES[a.type].doneLabel.toLowerCase() + "." + next, function () {
        state.status[id] = "queued"; state.openId = id; renderQueue();
      });
      return;
    }

    if (act === "undo-done") {
      state.status[id] = "queued"; state.openId = id; renderQueue();
      return;
    }

    if (act === "skip") {
      removeWithAnim(id, "Skipped " + a.name.split(" ")[0] + " for today.", "removed");
      return;
    }

    if (snooze) {
      removeWithAnim(id, a.name.split(" ")[0] + " snoozed. Back " + snooze.toLowerCase() + ".", "removed");
      return;
    }

    if (tone) {
      var ta = card.querySelector('[data-role="draft"]');
      card.classList.add("rewriting");
      btn.disabled = true;
      setTimeout(function () {
        var text;
        if (tone === "regen") {
          var opts = [a.draft].concat(a.variants.alt);
          state.altIdx[id] = (state.altIdx[id] + 1) % opts.length;
          text = opts[state.altIdx[id]];
        } else {
          text = a.variants[tone];
        }
        state.drafts[id] = text;
        ta.value = text;
        updateCount(card, a, text);
        card.classList.remove("rewriting");
        btn.disabled = false;
      }, 650);
    }
  });

  function updateCount(card, a, text) {
    var c = card.querySelector('[data-role="count"]');
    if (!c) return;
    if (a.limit) {
      c.textContent = text.length + " / " + a.limit;
      c.classList.toggle("over", text.length > a.limit);
    } else c.textContent = text.length + " chars";
  }

  queueEl.addEventListener("input", function (e) {
    if (e.target.getAttribute("data-role") !== "draft") return;
    var card = e.target.closest(".card");
    var id = card.getAttribute("data-id");
    state.drafts[id] = e.target.value;
    updateCount(card, byId(id), e.target.value);
  });

  // close snooze menus on outside click
  document.addEventListener("click", function (e) {
    document.querySelectorAll("details.snooze[open]").forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute("open");
    });
  });

  // ---------- filters ----------
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".filter");
    if (!b) return;
    state.filter = b.getAttribute("data-filter");
    document.querySelectorAll(".filter").forEach(function (f) {
      var on = f === b;
      f.classList.toggle("is-active", on);
      f.setAttribute("aria-selected", on);
    });
    var first = live().filter(function (a) { return !isDone(a) && (state.filter === "all" || a.type === state.filter); })[0];
    state.openId = first ? first.id : null;
    renderQueue();
  });

  // ---------- "coming soon" buttons ----------
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-soon]");
    if (!b) return;
    toast(b.getAttribute("data-soon") + " is part of the full app. This prototype shows the Today screen.");
  });

  // ---------- right rail ----------
  function renderWeek() {
    var now = new Date();
    var dow = (now.getDay() + 6) % 7; // Mon = 0
    var monday = new Date(now); monday.setDate(now.getDate() - dow);
    var plan = [
      { title: "Why we stopped doing discovery calls", time: "8:30 AM" },
      null,
      { title: "Raise prices before you're ready", time: "9:00 AM" },
      { title: "3 onboarding mistakes I made twice", time: "8:30 AM" },
      { title: "What a 40-truck fleet taught me about ops", time: "12:15 PM" }
    ];
    var html = "";
    for (var i = 0; i < 5; i++) {
      var d = new Date(monday); d.setDate(monday.getDate() + i);
      var p = plan[i];
      var past = i < dow;
      var pill, title;
      if (p) {
        pill = past ? '<span class="pill published">Published</span>' : '<span class="pill scheduled">' + p.time + "</span>";
        title = '<span class="wk-title">' + esc(p.title) + "</span>";
      } else {
        pill = past ? '<span class="pill missed">No post</span>' : '<span class="pill open">Open</span>';
        title = '<span class="wk-title empty">' + (past ? "Rest day" : "Open slot") + "</span>";
      }
      html += '<li class="' + (i === dow ? "is-today" : "") + '">' +
        '<span class="wk-day">' + d.toLocaleDateString(undefined, { weekday: "short" }) + "<b>" + d.getDate() + "</b></span>" +
        title + pill + "</li>";
    }
    $("#week").innerHTML = html;
  }

  function renderPipe() {
    var stages = [
      { name: "New", n: 42, d: 6 },
      { name: "Talking", n: 11, d: 2 },
      { name: "Call booked", n: 3, d: 1 },
      { name: "Won", n: 2, d: 0 }
    ];
    var max = 42;
    $("#pipe").innerHTML = stages.map(function (s) {
      return "<li><span>" + s.name + (s.d ? '<span class="delta">+' + s.d + "</span>" : "") + "</span>" +
        '<span class="bar"><span style="width:' + Math.max(4, (s.n / max) * 100) + '%"></span></span>' +
        '<span class="num">' + s.n + "</span></li>";
    }).join("");
  }

  renderHeader();
  renderWeek();
  renderPipe();
  renderQueue();
})();
