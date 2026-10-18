(function () {
  "use strict";

  /* ---------------- Data (one sample week) ---------------- */
  var DAYS = [
    { short: "Mon", long: "Monday",    date: "Oct 19", wx: "sun",    temp: 64, rain: 0 },
    { short: "Tue", long: "Tuesday",   date: "Oct 20", wx: "partly", temp: 66, rain: 10, today: true },
    { short: "Wed", long: "Wednesday", date: "Oct 21", wx: "cloud",  temp: 61, rain: 20 },
    { short: "Thu", long: "Thursday",  date: "Oct 22", wx: "rain",   temp: 52, rain: 80, inches: 0.6 },
    { short: "Fri", long: "Friday",    date: "Oct 23", wx: "partly", temp: 58, rain: 10 },
    { short: "Sat", long: "Saturday",  date: "Oct 24", wx: "sun",    temp: 60, rain: 0 }
  ];
  var TODAY = 1;
  var RAIN_THRESHOLD = 60;

  var CREWS = [
    { id: "c1", name: "Crew 1", lead: "Marco Díaz",     people: 3, truck: "var(--truck-green)", truckName: "green truck", hours: 8 },
    { id: "c2", name: "Crew 2", lead: "Dana Whitfield", people: 3, truck: "var(--truck-blue)",  truckName: "blue truck",  hours: 8 },
    { id: "c3", name: "Crew 3", lead: "Tomás Reyes",    people: 2, truck: "var(--truck-tan)",   truckName: "tan truck",   hours: 8 }
  ];
  var UNASSIGNED = "none";

  var SERVICES = {
    mow:    { name: "Weekly mow",   hours: 1,   price: 55 },
    bimow:  { name: "Biweekly mow", hours: 1,   price: 60 },
    leaves: { name: "Leaf cleanup",        hours: 3,   price: 240 },
    aerate: { name: "Aerate & overseed",   hours: 2,   price: 180 },
    hedge:  { name: "Hedge trim",          hours: 2,   price: 140 },
    mulch:  { name: "Bed mulch",           hours: 4,   price: 340 },
    comm:   { name: "Commercial mow",      hours: 3,   price: 260 }
  };

  // Commercial accounts get one invoice at month end.
  var MONTHLY = ["Fairbanks HOA", "Maple Court Apartments", "Holloway Dental", "Briar Glen Townhomes", "Cedar Ridge Church", "Oakmont Office Park"];

  var STREETS = ["Pecan Hollow Dr", "Creekside Ln", "Elm Bend Rd", "Willow Run", "Bluebonnet Ct", "Ridgeview Pl", "Post Oak Trl", "Cedar Gap Rd", "Meadowlark Way", "Stone Mill Dr"];
  var NOTES = ["Gate code 4417. Dog in back yard, friendly.", "Bag clippings, owner composts.", "Skip the side bed, new plantings.", "Park on the street, steep drive.", "", "", "Side gate sticks, lift to open.", ""];

  var rows = [
    // crew, day, customer, service key, overrides {hours, price, status, skip}
    ["c1", 0, "Hollis", "mow", { status: "done" }],
    ["c1", 0, "Brennan", "mow", { price: 50, status: "done" }],
    ["c1", 0, "Fairbanks HOA", "comm", { status: "done" }],
    ["c1", 0, "Patel", "leaves", { hours: 2.5, price: 220, status: "done" }],
    ["c1", 1, "Nguyen", "mow", { status: "done" }],
    ["c1", 1, "Greer", "mow", { price: 65, status: "done" }],
    ["c1", 1, "Kowalski", "hedge", {}],
    ["c1", 1, "Cedar Ridge Church", "comm", { hours: 2.5, price: 210 }],
    ["c1", 2, "Adeyemi", "aerate", {}],
    ["c1", 2, "Lindqvist", "mow", {}],
    ["c1", 2, "Morales", "mow", { price: 45 }],
    ["c1", 2, "Sato", "leaves", { price: 260 }],
    ["c1", 3, "Okafor", "mow", {}],
    ["c1", 3, "Whitcomb", "mow", { price: 65 }],
    ["c1", 3, "Delgado", "mulch", {}],
    ["c1", 4, "Bauer", "mow", {}],
    ["c1", 4, "Rinaldi", "mow", {}],
    ["c1", 4, "Chen", "leaves", { price: 260 }],

    ["c2", 0, "Maple Court Apartments", "comm", { hours: 3.5, price: 380, status: "done" }],
    ["c2", 0, "Vance", "mow", { status: "done" }],
    ["c2", 0, "Abbott", "mow", { status: "skipped", skip: "Locked gate" }],
    ["c2", 0, "Holloway Dental", "comm", { hours: 1.5, price: 150, status: "done" }],
    ["c2", 1, "Pruitt", "mow", { status: "done" }],
    ["c2", 1, "Ellison", "bimow", {}],
    ["c2", 1, "Foster", "leaves", {}],
    ["c2", 1, "Quinn", "mow", {}],
    ["c2", 2, "Marsh", "mow", {}],
    ["c2", 2, "Iverson", "hedge", { price: 160 }],
    ["c2", 2, "Tran", "aerate", {}],
    ["c2", 2, "Yates", "mow", {}],
    ["c2", 2, "Sterling", "leaves", {}],
    ["c2", 3, "Kline", "mow", {}],
    ["c2", 3, "Dube", "mow", { price: 50 }],
    ["c2", 3, "Strand", "leaves", {}],
    ["c2", 4, "Park", "mow", {}],
    ["c2", 4, "Lowell", "mow", {}],
    ["c2", 4, "Hart", "mulch", { price: 360 }],
    ["c2", 5, "Ruiz", "leaves", { price: 260 }],

    ["c3", 0, "Callahan", "mow", { status: "done" }],
    ["c3", 0, "Moreau", "mow", { price: 60, status: "done" }],
    ["c3", 0, "Briar Glen Townhomes", "comm", { hours: 4, price: 420, status: "done" }],
    ["c3", 1, "Sutton", "aerate", {}],
    ["c3", 1, "Novak", "mow", {}],
    ["c3", 1, "Price", "mow", {}],
    ["c3", 1, "Ward", "hedge", { hours: 2.5, price: 180 }],
    ["c3", 2, "Gill", "leaves", {}],
    ["c3", 2, "Hale", "mow", {}],
    ["c3", 2, "Ames", "mow", {}],
    ["c3", 2, "Byrne", "mow", {}],
    ["c3", 3, "Lam", "mow", {}],
    ["c3", 3, "Ferris", "mow", {}],
    ["c3", 3, "Oakmont Office Park", "comm", { price: 310 }],
    ["c3", 4, "Pike", "mow", {}],
    ["c3", 4, "Dorsey", "mow", {}],
    ["c3", 4, "Kessler", "mulch", { price: 350 }],
    ["c3", 5, "Weston", "hedge", { price: 150 }],

    [UNASSIGNED, 2, "Hayes", "leaves", { isNew: true }],
    [UNASSIGNED, 4, "Morrow", "mulch", { isNew: true }],
    [UNASSIGNED, 5, "Quill", "aerate", { isNew: true }]
  ];

  // Done last week, not invoiced yet (not on this week's board).
  var lastWeek = [
    ["Rinaldi", "mow", "Fri Oct 16", 55],
    ["Bauer", "mow", "Fri Oct 16", 55],
    ["Ruiz", "hedge", "Sat Oct 17", 150]
  ];

  var overdue = [
    { name: "Holloway Dental", amt: 420, days: 32 },
    { name: "Pruitt", amt: 220, days: 18 },
    { name: "Abbott", amt: 300, days: 9 }
  ];

  var visits = [];
  var seq = 0;
  function makeVisit(crew, day, customer, key, o) {
    o = o || {};
    var s = SERVICES[key];
    seq++;
    return {
      id: "v" + seq,
      crew: crew,
      day: day,
      customer: customer,
      service: s.name,
      hours: o.hours != null ? o.hours : s.hours,
      price: o.price != null ? o.price : s.price,
      status: o.status || "scheduled",
      skip: o.skip || "",
      invoiced: false,
      isNew: !!o.isNew,
      address: o.address || (100 + ((seq * 137) % 2800)) + " " + STREETS[seq % STREETS.length],
      note: NOTES[seq % NOTES.length],
      week: o.week || 0,
      dateLabel: o.dateLabel || ""
    };
  }
  rows.forEach(function (r) { visits.push(makeVisit(r[0], r[1], r[2], r[3], r[4])); });
  lastWeek.forEach(function (r) {
    visits.push(makeVisit("c1", -1, r[0], r[1], { price: r[3], status: "done", week: -1, dateLabel: r[2] }));
  });

  var rainMoved = false;
  var sentCount = 0, sentTotal = 0;
  var remindersSent = false;
  var selDay = TODAY;
  var unchecked = {}; // customers unchecked in invoice list

  /* ---------------- Helpers ---------------- */
  var $ = function (id) { return document.getElementById(id); };
  function money(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
  function hrs(n) { return (Math.round(n * 10) / 10).toString().replace(/\.0$/, "") + "h"; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function crewById(id) { for (var i = 0; i < CREWS.length; i++) if (CREWS[i].id === id) return CREWS[i]; return null; }
  function isMonthly(name) { return MONTHLY.indexOf(name) !== -1; }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : (many || one + "s")); }
  function onBoard(v) { return v.week === 0 && v.status !== "canceled"; }
  function cellVisits(crew, day) { return visits.filter(function (v) { return onBoard(v) && v.crew === crew && v.day === day; }); }
  function load(crew, day) {
    return cellVisits(crew, day).reduce(function (a, v) { return a + (v.status === "skipped" ? 0 : v.hours); }, 0);
  }
  function wxIcon(d) { return '<svg aria-hidden="true" class="' + (d.wx === "sun" ? "sun" : "") + '"><use href="#i-' + d.wx + '"/></svg>'; }
  function isRainDay(i) { return DAYS[i].rain >= RAIN_THRESHOLD && !rainMoved; }
  function wxText(d) { return d.rain >= RAIN_THRESHOLD ? d.rain + "% rain" : d.temp + "°"; }

  var justMoved = {};

  /* ---------------- Board ---------------- */
  function renderBoard() {
    var b = $("board");
    var html = '<div class="corner' + offCls(-1) + '" aria-hidden="true"></div>';

    DAYS.forEach(function (d, i) {
      var rain = isRainDay(i);
      var cls = "dayhead" + (d.today ? " is-today" : "") + (rain ? " is-rain" : "") + offCls(i);
      html += '<div class="' + cls + '" data-day="' + i + '">';
      html += '<div class="dayhead-top"><span><span class="dayname">' + d.short + '</span> <span class="daydate">' + d.date.split(" ")[1] + '</span></span>' +
        (d.today ? '<span class="today-pill">Today</span>' : "") + "</div>";
      html += '<div class="wx">' + wxIcon(d) + (d.rain >= RAIN_THRESHOLD
        ? "<span>" + d.rain + "% rain, " + d.inches + " in</span>"
        : '<span class="wx-temp">' + d.temp + "°</span><span>" + (d.rain ? d.rain + "% rain" : "Dry") + "</span>") + "</div>";
      if (rain) {
        var n = visits.filter(function (v) { return onBoard(v) && v.day === i && v.status === "scheduled"; }).length;
        if (n) html += '<button type="button" class="rain-move" id="rainMove">Move ' + plural(n, "visit") + " to the next open day</button>";
      } else if (d.rain >= RAIN_THRESHOLD && rainMoved) {
        html += '<div class="rain-cleared">Visits moved out for rain</div>';
      }
      html += "</div>";
    });

    var rowsList = CREWS.concat([{ id: UNASSIGNED, name: "Unassigned", lead: "New visits land here" }]);
    rowsList.forEach(function (c) {
      var un = c.id === UNASSIGNED;
      var weekHrs = 0, weekN = 0;
      DAYS.forEach(function (_, i) { weekHrs += load(c.id, i); weekN += cellVisits(c.id, i).length; });
      html += '<div class="crewhead' + (un ? " is-unassigned" : "") + '" style="--truck:' + (c.truck || "") + '">' +
        '<div class="crewname">' + esc(c.name) + "</div>" +
        '<div class="crewlead">' + esc(c.lead) + "</div>" +
        '<div class="crewmeta num">' + (un ? plural(weekN, "visit") + " to place" : c.people + " people, " + c.truckName + "<br>" + hrs(weekHrs) + " booked this week") + "</div>" +
        "</div>";

      DAYS.forEach(function (d, i) {
        var list = cellVisits(c.id, i);
        var cls = "cell" + (un ? " row-unassigned" : "") + (isRainDay(i) ? " is-rain" : "") + offCls(i);
        var label = (un ? "Unassigned" : c.name) + ", " + d.long;
        html += '<div class="' + cls + '" data-crew="' + c.id + '" data-day="' + i + '" aria-label="' + esc(label) + '">';
        list.forEach(function (v) { html += cardHtml(v); });
        if (!un) {
          var l = load(c.id, i), cap = c.hours;
          var over = l > cap;
          var pct = Math.min(100, (l / cap) * 100);
          html += '<div class="load num' + (over ? " is-over" : "") + (l === 0 ? " is-empty" : "") + '" title="' + hrs(l) + " of " + cap + 'h crew day">' +
            '<div class="load-bar"><div class="load-fill" style="width:' + pct + '%"></div></div>' +
            "<span>" + (Math.round(l * 10) / 10) + " / " + cap + "h" + (over ? " over" : "") + "</span></div>";
        }
        html += "</div>";
      });
    });

    b.innerHTML = html;
    justMoved = {};
    var rm = $("rainMove");
    if (rm) rm.addEventListener("click", moveRainDay);
    renderTabs();
    renderSummary();
  }

  function offCls(i) { return (i === -1 || i === selDay) ? "" : " off"; }

  function cardHtml(v) {
    var cls = "visit";
    var icon = "";
    if (v.status === "done") { cls += " is-done"; icon = '<svg aria-hidden="true"><use href="#i-check"/></svg>'; }
    if (v.status === "skipped") { cls += " is-skipped"; icon = '<svg aria-hidden="true"><use href="#i-flag"/></svg>'; }
    if (justMoved[v.id]) cls += " just-moved";
    var drag = v.status === "scheduled" ? ' draggable="true"' : "";
    var state = v.status === "done" ? "Done. " : v.status === "skipped" ? "Skipped. " : "";
    return '<div role="button" tabindex="0" class="' + cls + '" data-id="' + v.id + '"' + drag +
      ' aria-label="' + esc(state + v.customer + ", " + v.service + ", " + hrs(v.hours) + ", " + money(v.price) + ". Open visit") + '">' +
      '<div class="v-cust">' + icon + "<span>" + esc(v.customer) + "</span></div>" +
      '<div class="v-svc">' + esc(v.service) + "</div>" +
      (v.status === "skipped" ? '<div class="v-skip">Skipped: ' + esc(v.skip) + "</div>" :
        '<div class="v-foot"><span>' + hrs(v.hours) + (v.isNew ? ' <span class="v-new">New</span>' : "") + "</span><span>" + money(v.price) + "</span></div>") +
      "</div>";
  }

  function renderTabs() {
    var t = $("dayTabs");
    t.innerHTML = DAYS.map(function (d, i) {
      return '<button type="button" role="tab" class="daytab' + (isRainDay(i) ? " is-rain" : "") + '" aria-selected="' + (i === selDay) + '" data-day="' + i + '">' +
        "<span>" + d.short + '</span><span class="daytab-n">' + d.date.split(" ")[1] + "</span>" + wxIcon(d) + "</button>";
    }).join("");
  }

  function renderSummary() {
    var board = visits.filter(onBoard);
    var n = board.length;
    var total = board.reduce(function (a, v) { return a + (v.status === "skipped" ? 0 : v.price); }, 0);
    var overCells = 0;
    CREWS.forEach(function (c) { DAYS.forEach(function (_, i) { if (load(c.id, i) > c.hours) overCells++; }); });
    var un = board.filter(function (v) { return v.crew === UNASSIGNED; }).length;
    var parts = ["<strong class='num'>" + n + "</strong> visits worth <strong class='num'>" + money(total) + "</strong>"];
    if (overCells) parts.push('<span class="warn">' + plural(overCells, "crew day") + " over capacity</span>");
    else parts.push("every crew day fits");
    if (un) parts.push(plural(un, "visit") + " still to place");
    if (!rainMoved) parts.push('<span class="warn">rain Thursday</span>');
    $("weekSummary").innerHTML = parts.join(", ") + ".";
  }

  /* ---------------- Moving visits ---------------- */
  var undoState = null;
  function snapshot() { return visits.map(function (v) { return { id: v.id, crew: v.crew, day: v.day }; }); }
  function restore(snap) {
    var m = {}; snap.forEach(function (s) { m[s.id] = s; });
    visits.forEach(function (v) { if (m[v.id]) { v.crew = m[v.id].crew; v.day = m[v.id].day; justMoved[v.id] = true; } });
  }

  function moveVisit(id, crew, day) {
    var v = visits.filter(function (x) { return x.id === id; })[0];
    if (!v || (v.crew === crew && v.day === day)) return;
    var snap = snapshot();
    var wasRainDay = isRainDay(day);
    v.crew = crew; v.day = day;
    justMoved[v.id] = true;
    renderBoard();
    var who = crew === UNASSIGNED ? "Unassigned" : crewById(crew).name;
    toast("Moved " + v.customer + " to " + who + ", " + DAYS[day].long + (wasRainDay ? " (rain forecast)" : "") + ".", function () { restore(snap); renderBoard(); });
  }

  function moveRainDay() {
    var rainDay = 3;
    var snap = snapshot();
    var toMove = visits.filter(function (v) { return onBoard(v) && v.day === rainDay && v.status === "scheduled"; });
    var counts = {};
    toMove.forEach(function (v) {
      var target = -1;
      for (var d = rainDay + 1; d < DAYS.length; d++) {
        if (DAYS[d].rain >= RAIN_THRESHOLD) continue;
        var cap = v.crew === UNASSIGNED ? Infinity : crewById(v.crew).hours;
        if (load(v.crew, d) + v.hours <= cap) { target = d; break; }
      }
      if (target === -1) target = rainDay + 1; // nothing fits: next day, shows as over capacity
      v.day = target;
      justMoved[v.id] = true;
      counts[target] = (counts[target] || 0) + 1;
    });
    rainMoved = true;
    renderBoard();
    var parts = Object.keys(counts).sort().map(function (d) { return counts[d] + " to " + DAYS[d].long; });
    toast("Moved " + plural(toMove.length, "visit") + " out of Thursday: " + parts.join(", ") + ". Crews stay the same.", function () {
      restore(snap); rainMoved = false; renderBoard();
    });
  }

  /* Drag and drop */
  var dragId = null;
  $("board").addEventListener("dragstart", function (e) {
    var card = e.target.closest && e.target.closest(".visit");
    if (!card) return;
    dragId = card.dataset.id;
    card.classList.add("is-dragging");
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", dragId); } catch (err) {}
  });
  $("board").addEventListener("dragend", function (e) {
    var card = e.target.closest && e.target.closest(".visit");
    if (card) card.classList.remove("is-dragging");
    clearDrop();
    dragId = null;
  });
  $("board").addEventListener("dragover", function (e) {
    if (!dragId) return;
    var cell = e.target.closest(".cell");
    if (!cell) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!cell.classList.contains("is-over-drop")) { clearDrop(); cell.classList.add("is-over-drop"); }
  });
  $("board").addEventListener("dragleave", function (e) {
    var cell = e.target.closest(".cell");
    if (cell && !cell.contains(e.relatedTarget)) cell.classList.remove("is-over-drop");
  });
  $("board").addEventListener("drop", function (e) {
    var cell = e.target.closest(".cell");
    if (!cell || !dragId) return;
    e.preventDefault();
    clearDrop();
    moveVisit(dragId, cell.dataset.crew, Number(cell.dataset.day));
    dragId = null;
  });
  function clearDrop() {
    var o = document.querySelectorAll(".is-over-drop");
    for (var i = 0; i < o.length; i++) o[i].classList.remove("is-over-drop");
  }

  /* Click a card: open the visit sheet */
  $("board").addEventListener("click", function (e) {
    var card = e.target.closest(".visit");
    if (card) openVisit(card.dataset.id);
  });

  $("board").addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest(".visit");
    if (!card) return;
    e.preventDefault();
    openVisit(card.dataset.id);
  });

  $("dayTabs").addEventListener("click", function (e) {
    var t = e.target.closest(".daytab");
    if (!t) return;
    selDay = Number(t.dataset.day);
    renderBoard();
    var sel = document.querySelector('.daytab[aria-selected="true"]');
    if (sel) sel.focus();
  });

  /* ---------------- Visit sheet ---------------- */
  var openId = null;
  function openVisit(id) {
    var v = visits.filter(function (x) { return x.id === id; })[0];
    if (!v) return;
    openId = id;
    var crew = crewById(v.crew);
    $("vdTitle").textContent = v.customer;
    $("vdService").textContent = v.service;
    $("vdFacts").innerHTML =
      "<dt>When</dt><dd>" + DAYS[v.day].long + ", " + DAYS[v.day].date + (isRainDay(v.day) ? ' <span style="color:var(--flag-dk);font-weight:700">(80% rain)</span>' : "") + "</dd>" +
      "<dt>Crew</dt><dd>" + (crew ? crew.name + ", " + crew.lead : "Not assigned yet") + "</dd>" +
      "<dt>Address</dt><dd>" + esc(v.address) + "</dd>" +
      "<dt>Time</dt><dd class='num'>" + hrs(v.hours) + " on site</dd>" +
      "<dt>Price</dt><dd class='num'>" + money(v.price) + (isMonthly(v.customer) ? ", billed monthly" : ", billed per visit") + "</dd>" +
      (v.note ? "<dt>Crew note</dt><dd>" + esc(v.note) + "</dd>" : "");

    var st = $("vdStatus");
    st.className = "sheet-status";
    st.textContent = "";
    if (v.status === "done") { st.classList.add("done"); st.textContent = v.invoiced ? "Done and invoiced." : "Done. Waiting in Ready to invoice."; }
    if (v.status === "skipped") { st.classList.add("skipped"); st.textContent = "Skipped: " + v.skip + "."; }

    var movable = v.status === "scheduled";
    $("vdMove").hidden = !movable;
    if (movable) {
      $("vdCrew").innerHTML = CREWS.map(function (c) {
        return '<option value="' + c.id + '"' + (c.id === v.crew ? " selected" : "") + ">" + c.name + " (" + c.lead.split(" ")[0] + ")</option>";
      }).join("") + '<option value="' + UNASSIGNED + '"' + (v.crew === UNASSIGNED ? " selected" : "") + ">Unassigned</option>";
      $("vdDay").innerHTML = DAYS.map(function (d, i) {
        return '<option value="' + i + '"' + (i === v.day ? " selected" : "") + ">" + d.long + " " + d.date.split(" ")[1] + (d.rain >= RAIN_THRESHOLD ? " (rain)" : "") + "</option>";
      }).join("");
    }

    var a = $("vdActions");
    a.innerHTML = "";
    if (v.status === "scheduled") {
      a.innerHTML = '<button type="button" class="btn btn-primary" id="vdDone">Mark done</button>' +
        '<button type="button" class="btn btn-secondary" id="vdSkip">Mark skipped</button>';
      $("vdDone").onclick = function () { setStatus(v, "done"); };
      $("vdSkip").onclick = function () {
        a.innerHTML = '<p style="margin:0;font-size:13px;font-weight:700;color:var(--ink-2);width:100%">Why was it skipped?</p><div class="skip-reasons">' +
          ["Customer canceled", "Locked gate", "Too wet", "Ran out of time"].map(function (r) { return '<button type="button" data-r="' + r + '">' + r + "</button>"; }).join("") + "</div>";
        a.querySelector(".skip-reasons").onclick = function (e) {
          var b = e.target.closest("button"); if (!b) return;
          v.skip = b.dataset.r; setStatus(v, "skipped");
        };
      };
    } else if (!v.invoiced) {
      a.innerHTML = '<button type="button" class="btn btn-secondary" id="vdReopen">Back to scheduled</button>';
      $("vdReopen").onclick = function () { v.skip = ""; setStatus(v, "scheduled"); };
    }
    $("visitDialog").showModal();
  }

  function setStatus(v, status) {
    var prev = { status: v.status, skip: v.skip };
    v.status = status;
    $("visitDialog").close();
    justMoved[v.id] = true;
    if (status === "done" && !isMonthly(v.customer)) freshCustomer = v.customer;
    renderBoard(); renderPanel();
    var msg = status === "done" ? v.customer + " marked done" + (isMonthly(v.customer) ? ". Held for the month-end invoice." : " and added to Ready to invoice.")
      : status === "skipped" ? v.customer + " marked skipped: " + v.skip.toLowerCase() + "."
      : v.customer + " is back on the schedule.";
    toast(msg, function () { v.status = prev.status; v.skip = prev.skip; renderBoard(); renderPanel(); });
  }

  $("vdMoveBtn").addEventListener("click", function () {
    var id = openId;
    $("visitDialog").close();
    moveVisit(id, $("vdCrew").value, Number($("vdDay").value));
  });

  /* ---------------- Add visit ---------------- */
  $("adService").innerHTML = Object.keys(SERVICES).map(function (k) {
    return '<option value="' + k + '">' + SERVICES[k].name + " (" + hrs(SERVICES[k].hours) + ", " + money(SERVICES[k].price) + ")</option>";
  }).join("");
  $("adDay").innerHTML = DAYS.map(function (d, i) {
    return '<option value="' + i + '"' + (i === 2 ? " selected" : "") + ">" + d.long + " " + d.date.split(" ")[1] + "</option>";
  }).join("");
  $("addVisitBtn").addEventListener("click", function () {
    $("addForm").reset();
    $("addDialog").returnValue = "";
    $("adDay").value = String(Math.max(TODAY + 1, selDay));
    $("addDialog").showModal();
  });
  $("addDialog").addEventListener("close", function () {
    if ($("addDialog").returnValue !== "add") return;
    var name = $("adCustomer").value.trim();
    if (!name) return;
    var v = makeVisit(UNASSIGNED, Number($("adDay").value), name, $("adService").value, { isNew: true, address: $("adAddress").value.trim() || undefined });
    v.note = "";
    visits.push(v);
    justMoved[v.id] = true;
    selDay = v.day;
    renderBoard();
    toast("Added " + name + " to Unassigned on " + DAYS[v.day].long + ". Drag it onto a crew.", function () {
      visits = visits.filter(function (x) { return x.id !== v.id; }); renderBoard();
    });
  });

  /* ---------------- Invoice panel ---------------- */
  var freshCustomer = null;
  function readyVisits() { return visits.filter(function (v) { return v.status === "done" && !v.invoiced; }); }

  function renderPanel() {
    var ready = readyVisits();
    var perVisit = ready.filter(function (v) { return !isMonthly(v.customer); });
    var monthly = ready.filter(function (v) { return isMonthly(v.customer); });

    var groups = {};
    var order = [];
    perVisit.forEach(function (v) {
      if (!groups[v.customer]) { groups[v.customer] = []; order.push(v.customer); }
      groups[v.customer].push(v);
    });

    var list = $("invList");
    if (!order.length) {
      list.innerHTML = '<div class="empty"><strong>All caught up.</strong>Visits your crews mark done show up here, ready to send.</div>';
    } else {
      list.innerHTML = order.map(function (name) {
        var g = groups[name];
        var sum = g.reduce(function (a, v) { return a + v.price; }, 0);
        var detail = g.map(function (v) { return v.service + ", " + (v.week === -1 ? v.dateLabel : DAYS[v.day].short + " " + DAYS[v.day].date); }).join("; ");
        var id = "inv-" + name.replace(/\W/g, "");
        return '<label class="inv-row' + (name === freshCustomer ? " is-fresh" : "") + '" data-cust="' + esc(name) + '" for="' + id + '">' +
          '<input type="checkbox" id="' + id + '"' + (unchecked[name] ? "" : " checked") + ' data-cust="' + esc(name) + '">' +
          '<span><span class="inv-name">' + esc(name) + '</span><br><span class="inv-detail">' + esc(detail) + "</span></span>" +
          '<span class="inv-amt">' + money(sum) + "</span></label>";
      }).join("");
    }
    freshCustomer = null;

    var selected = order.filter(function (n) { return !unchecked[n]; });
    var selTotal = selected.reduce(function (a, n) { return a + groups[n].reduce(function (b, v) { return b + v.price; }, 0); }, 0);
    var allTotal = perVisit.reduce(function (a, v) { return a + v.price; }, 0);

    $("invSub").innerHTML = order.length
      ? "<strong class='num'>" + plural(perVisit.length, "finished visit") + "</strong> for " + plural(order.length, "customer") + ", <strong class='num'>" + money(allTotal) + "</strong>"
      : "Nothing waiting.";

    var foot = "";
    if (order.length) {
      foot += '<button type="button" class="btn btn-primary" id="sendBtn"' + (selected.length ? "" : " disabled") + ">" +
        (selected.length ? "Send " + plural(selected.length, "invoice") + ", " + money(selTotal) : "Select invoices to send") + "</button>";
    }
    if (sentCount) foot += '<p class="sent-note num">Sent this week: ' + plural(sentCount, "invoice") + ", " + money(sentTotal) + ". Customers can pay by card or bank transfer.</p>";
    $("invFoot").innerHTML = foot;
    var sb = $("sendBtn");
    if (sb) sb.addEventListener("click", function () { sendInvoices(selected, groups); });

    var mTotal = monthly.reduce(function (a, v) { return a + v.price; }, 0);
    var mCust = monthly.map(function (v) { return v.customer; }).filter(function (n, i, arr) { return arr.indexOf(n) === i; });
    $("held").innerHTML = '<h3 id="heldTitle">Held for month-end</h3>' +
      (monthly.length
        ? '<p class="num">' + plural(monthly.length, "visit") + ", " + money(mTotal) + ", for " + esc(mCust.join(", ")) + ". These go out as one invoice per customer on Oct 31.</p>"
        : "<p>No monthly-billed visits finished yet.</p>");
  }

  $("invList").addEventListener("change", function (e) {
    var c = e.target.dataset && e.target.dataset.cust;
    if (!c) return;
    if (e.target.checked) delete unchecked[c]; else unchecked[c] = true;
    renderPanel();
  });

  function sendInvoices(names, groups) {
    var rowsEls = document.querySelectorAll(".inv-row");
    var total = 0;
    names.forEach(function (n) { groups[n].forEach(function (v) { total += v.price; }); });
    for (var i = 0; i < rowsEls.length; i++) {
      if (names.indexOf(rowsEls[i].dataset.cust) !== -1) rowsEls[i].classList.add("is-leaving");
    }
    var count = names.length;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(function () {
      var touched = [];
      names.forEach(function (n) { groups[n].forEach(function (v) { v.invoiced = true; touched.push(v); }); });
      sentCount += count; sentTotal += total;
      renderPanel();
      toast("Sent " + plural(count, "invoice") + ", " + money(total) + ".", function () {
        touched.forEach(function (v) { v.invoiced = false; });
        sentCount -= count; sentTotal -= total;
        renderPanel();
      });
    }, reduce ? 0 : 340);
  }

  /* Overdue */
  function renderOverdue() {
    var t = overdue.reduce(function (a, o) { return a + o.amt; }, 0);
    $("overdueTotal").textContent = money(t);
    $("overdueList").innerHTML = overdue.map(function (o) {
      return "<li><span>" + esc(o.name) + ' <span class="od-days">' + o.days + ' days late</span></span><span class="od-amt">' + money(o.amt) + "</span></li>";
    }).join("");
  }
  $("remindBtn").addEventListener("click", function () {
    if (remindersSent) return;
    remindersSent = true;
    $("remindBtn").textContent = "Reminders sent today";
    $("remindBtn").disabled = true;
    toast("Sent 3 payment reminders with pay links.");
  });

  /* Prototype-only nav */
  var stubs = document.querySelectorAll("[data-stub]");
  for (var s = 0; s < stubs.length; s++) {
    stubs[s].addEventListener("click", function (e) {
      e.preventDefault();
      toast(this.dataset.stub + " isn't in this prototype. The week board is the main screen.");
    });
  }
  var active = document.querySelector(".rail-link.is-active");
  if (active) active.addEventListener("click", function (e) { e.preventDefault(); });

  /* ---------------- Toast ---------------- */
  var toastTimer = null, undoFn = null;
  function toast(msg, undo) {
    var t = $("toast");
    $("toastMsg").textContent = msg;
    undoFn = undo || null;
    $("toastUndo").hidden = !undo;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; undoFn = null; }, undo ? 7000 : 4000);
  }
  $("toastUndo").addEventListener("click", function () {
    if (undoFn) { var f = undoFn; undoFn = null; f(); }
    $("toast").hidden = true;
  });

  /* ---------------- Go ---------------- */
  renderBoard();
  renderPanel();
  renderOverdue();
})();
