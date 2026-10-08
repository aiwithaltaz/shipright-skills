#!/usr/bin/env python3
"""Write styled sample screens for the 0.6.2-draft before/after pairs.

CSS in this file uses normal braces. Do not turn these strings into f-strings.
A doubled brace is invalid CSS, and the browser will drop the whole rule.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'tests' / 'fixtures' / '0.6.2-draft'

FONT = """
@font-face { font-family: "Inter"; font-weight: 400; src: url("file:///usr/share/fonts/truetype/macos/Inter-Regular.ttf") format("truetype"); }
@font-face { font-family: "Inter"; font-weight: 500; src: url("file:///usr/share/fonts/truetype/macos/Inter-Medium.ttf") format("truetype"); }
@font-face { font-family: "Inter"; font-weight: 600; src: url("file:///usr/share/fonts/truetype/macos/Inter-SemiBold.ttf") format("truetype"); }
@font-face { font-family: "Inter"; font-weight: 700; src: url("file:///usr/share/fonts/truetype/macos/Inter-Bold.ttf") format("truetype"); }
* { box-sizing: border-box; }
html, body { margin: 0; width: 390px; height: 844px; overflow: hidden; }
body { font-family: Inter, "Noto Sans", sans-serif; color: #1c1917; }
button, input { font-family: inherit; }
"""

SLOP = """
.slop { width: 390px; height: 844px; background: #f6f4fb; }
.nav { height: 56px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; background: #fff; }
.logo { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; }
.ghost { height: 32px; padding: 0 12px; border: 0; border-radius: 999px; background: #f3e8ff; color: #6d28d9; font-size: 13px; font-weight: 600; }
.hero { margin: 12px 16px 0; padding: 28px 20px 26px; border-radius: 28px; background: linear-gradient(165deg, #4c1d95 0%, #7c3aed 46%, #db2777 100%); color: #fff; }
.eyebrow { margin: 0 0 10px; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.hero h1 { margin: 0 0 8px; font-size: 34px; line-height: 1.08; letter-spacing: -0.03em; font-weight: 700; }
.hero .sub { margin: 0 0 20px; font-size: 15px; line-height: 1.45; }
.ctas { display: flex; gap: 8px; }
.ctas button { flex: 1; height: 44px; border: 0; border-radius: 999px; font-size: 14px; font-weight: 600; }
.light { background: #fff; color: #5b21b6; }
.pink { background: #be185d; color: #fff; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: -20px 16px 0; position: relative; }
.stat { background: #fff; border-radius: 16px; padding: 12px 8px 10px; text-align: center; box-shadow: 0 12px 28px rgba(76, 29, 149, 0.14); }
.stat b { display: block; font-size: 18px; font-weight: 700; color: #6d28d9; letter-spacing: -0.03em; }
.stat span { font-size: 12px; color: #6b6280; }
.card { margin: 16px 16px 0; background: #fff; border-radius: 20px; padding: 16px; box-shadow: 0 8px 24px rgba(76, 29, 149, 0.06); }
.stars { margin: 0; color: #d97706; letter-spacing: 2px; font-size: 13px; }
.card p { margin: 8px 0 12px; font-size: 16px; line-height: 1.4; }
.who { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b6280; }
.avatar { width: 28px; height: 28px; border-radius: 50%; background: #ede9fe; color: #5b21b6; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; }
.row { display: flex; align-items: center; justify-content: space-between; padding: 11px 0; border-top: 1px solid #f3eef9; font-size: 15px; }
.row:first-of-type { border-top: 0; }
.row b { color: #6d28d9; font-size: 18px; letter-spacing: -0.03em; }
.badge { margin-left: 8px; background: #ede9fe; color: #5b21b6; border-radius: 999px; padding: 3px 8px; font-size: 12px; font-weight: 600; }
.news { margin: 16px 16px 0; background: #fff; border-radius: 20px; padding: 12px; display: flex; gap: 8px; box-shadow: 0 8px 24px rgba(76, 29, 149, 0.06); }
.news input { flex: 1; height: 44px; border: 0; border-radius: 12px; background: #f6f3ff; padding: 0 12px; font-size: 15px; color: #1c1917; }
.news button { height: 44px; border: 0; border-radius: 12px; background: #6d28d9; color: #fff; font-size: 14px; font-weight: 600; padding: 0 14px; }
.seen { margin: 18px 20px 0; font-size: 12px; color: #8b849c; letter-spacing: 0.04em; text-transform: uppercase; }
.seen strong { display: block; margin-top: 6px; font-size: 13px; letter-spacing: 0.12em; color: #6b6280; font-weight: 700; }
"""

CALM = """
.calm { width: 390px; height: 844px; background: #f3f1ec; display: flex; flex-direction: column; }
.top { height: 56px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; }
.back { border: 0; background: transparent; padding: 8px 0; color: #143d2e; font-size: 15px; font-weight: 600; }
.brand { font-size: 13px; font-weight: 600; color: #6b6560; }
.main { padding: 4px 20px 0; }
h1 { margin: 12px 0 8px; font-size: 32px; line-height: 1.12; letter-spacing: -0.03em; font-weight: 700; }
.lead { margin: 0 0 24px; font-size: 16px; line-height: 1.45; color: #4a453f; }
.lbl { display: block; margin: 0 0 8px; font-size: 13px; font-weight: 600; }
.choice { height: 52px; padding: 0 16px; border: 1px solid #e4ddd4; border-radius: 12px; background: #fff; display: flex; align-items: center; justify-content: space-between; font-size: 16px; }
.hint { margin: 8px 0 20px; font-size: 13px; line-height: 1.4; color: #6b6560; }
.chips { display: flex; gap: 8px; margin: 0 0 20px; }
.chip { flex: 1; height: 44px; border-radius: 12px; border: 1px solid #e4ddd4; background: #fff; font-size: 14px; font-weight: 500; color: #1c1917; }
.chip.on { background: #143d2e; border-color: #143d2e; color: #fff; font-weight: 600; }
.name { width: 100%; height: 48px; border: 1px solid #e4ddd4; border-radius: 12px; background: #fff; padding: 0 14px; font-size: 16px; }
.later { margin: 20px 0 0; font-size: 14px; line-height: 1.45; color: #6b6560; }
.phase { margin-top: 20px; background: #fff; border: 1px solid #e4ddd4; border-radius: 16px; padding: 16px; }
.phase strong { display: block; margin: 0 0 4px; font-size: 18px; letter-spacing: -0.02em; }
.phase p { margin: 0; font-size: 14px; line-height: 1.45; color: #4a453f; }
.dock { margin-top: auto; padding: 16px 20px 24px; }
.dock p { margin: 0 0 10px; font-size: 13px; line-height: 1.4; color: #6b6560; }
.primary { width: 100%; height: 52px; border: 0; border-radius: 14px; background: #143d2e; color: #fff; font-size: 16px; font-weight: 600; }
"""

FORM_SLOP = """
.formslop { width: 390px; height: 844px; background: #f6f4fb; display: flex; flex-direction: column; }
.banner { padding: 28px 20px 22px; background: linear-gradient(165deg, #4c1d95, #7c3aed 70%); color: #fff; }
.banner h1 { margin: 0 0 6px; font-size: 28px; letter-spacing: -0.03em; font-weight: 700; }
.banner p { margin: 0; font-size: 15px; line-height: 1.4; }
.metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: -16px 16px 0; position: relative; }
.metric { background: #fff; border-radius: 16px; padding: 12px 14px; box-shadow: 0 10px 24px rgba(76, 29, 149, 0.12); }
.metric b { display: block; font-size: 20px; color: #6d28d9; letter-spacing: -0.03em; }
.metric span { font-size: 12px; color: #6b6280; }
.sheet { margin: 16px 16px 0; background: #fff; border-radius: 20px; padding: 16px; box-shadow: 0 8px 24px rgba(76, 29, 149, 0.06); }
.sheet input { width: 100%; height: 48px; border: 0; border-radius: 12px; background: #f4f0ff; margin-bottom: 8px; padding: 0 14px; font-size: 16px; color: #1c1917; }
.held { display: flex; align-items: center; justify-content: space-between; padding: 4px 4px 12px; font-size: 15px; }
.icon { width: 40px; height: 40px; border: 0; border-radius: 12px; background: #f3e8ff; color: #6d28d9; }
.pair { display: flex; gap: 8px; }
.pair button { flex: 1; height: 48px; border: 0; border-radius: 14px; color: #fff; font-size: 15px; font-weight: 600; }
.tabs { margin-top: auto; height: 72px; background: #fff; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid #efeaf8; }
.tabs span { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; font-size: 11px; color: #8b849c; font-weight: 600; }
.tabs span.on { color: #6d28d9; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
"""

FORM_CALM = """
.formcalm { width: 390px; height: 844px; background: #f3f1ec; display: flex; flex-direction: column; }
.panel { margin: 8px 20px 0; background: #fff; border: 1px solid #e4ddd4; border-radius: 16px; padding: 16px; }
.field { margin-bottom: 16px; }
.field span { display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600; }
.value { height: 48px; border: 1px solid #e7e1d8; border-radius: 12px; background: #faf8f5; padding: 0 14px; display: flex; align-items: center; font-size: 16px; }
.draft { margin-top: 4px; padding: 14px; border-radius: 12px; background: #f6f3ee; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.draft p { margin: 0; font-size: 14px; line-height: 1.4; }
.draft strong { display: block; font-size: 13px; }
.textbtn { border: 0; background: transparent; color: #8f2d2d; font-size: 14px; font-weight: 600; padding: 8px 0; }
"""

REVIEW = """
.review { width: 390px; height: 844px; background: #f3f1ec; padding: 16px 16px 0; }
.review h1 { margin: 8px 4px 4px; font-size: 28px; letter-spacing: -0.03em; }
.kicker { margin: 0 4px 12px; font-size: 13px; color: #6b6560; }
.desk { background: #fff; border: 1px solid #e4ddd4; border-radius: 16px; overflow: hidden; margin-bottom: 12px; }
.deskhead { height: 44px; padding: 0 12px; display: flex; align-items: center; justify-content: space-between; background: linear-gradient(90deg, #5b21b6, #7c3aed); color: #fff; font-size: 14px; font-weight: 600; }
.sync { background: rgba(255,255,255,.2); border-radius: 999px; padding: 3px 8px; font-size: 12px; font-weight: 600; }
.line { display: grid; grid-template-columns: 1fr auto auto; gap: 8px; align-items: center; padding: 10px 12px; border-top: 1px solid #f1ece6; font-size: 14px; }
.line small { display: block; color: #6b6560; font-size: 12px; }
.trash { width: 32px; height: 32px; border: 0; border-radius: 8px; background: #f3e8ff; color: #6d28d9; }
.detail { padding: 12px; border-top: 1px solid #f1ece6; }
.detail p { margin: 4px 0 10px; font-size: 13px; color: #6b6560; }
.mini { display: flex; gap: 8px; }
.mini span { height: 32px; padding: 0 10px; border-radius: 8px; color: #fff; font-size: 12px; font-weight: 600; display: flex; align-items: center; }
.bubble { background: #fff; border-radius: 16px; padding: 14px; border: 1px solid #e4ddd4; }
.bubble h2 { margin: 0 0 8px; font-size: 16px; letter-spacing: -0.02em; }
.bubble p { margin: 0 0 8px; font-size: 14px; line-height: 1.45; color: #3f3833; }
.chips2 { display: flex; flex-wrap: wrap; gap: 6px; }
.chips2 span { background: #f3e8ff; color: #5b21b6; border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 600; }
.find { background: #fff; border: 1px solid #e4ddd4; border-radius: 14px; padding: 12px; margin-bottom: 8px; }
.find b { font-size: 14px; }
.find p { margin: 6px 0 0; font-size: 13px; line-height: 1.4; color: #3f3833; }
.tag { display: inline-block; margin-right: 6px; border-radius: 6px; padding: 2px 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.02em; }
.tag.b { background: #f8e6e6; color: #8f2d2d; }
.tag.m { background: #f8efd8; color: #7a5410; }
.kept { margin: 4px 4px 0; font-size: 13px; line-height: 1.45; color: #3f3833; }
"""

CHECK = """
.check { width: 390px; height: 844px; background: #f3f1ec; padding: 20px 16px 0; }
.check h1 { margin: 12px 4px 6px; font-size: 28px; letter-spacing: -0.03em; }
.sub { margin: 0 4px 14px; font-size: 14px; line-height: 1.4; color: #4a453f; }
.list { background: #fff; border: 1px solid #e4ddd4; border-radius: 16px; overflow: hidden; }
.item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; border-top: 1px solid #f1ece6; }
.item:first-child { border-top: 0; }
.item strong { display: block; font-size: 14px; font-weight: 600; }
.item span { display: block; margin-top: 2px; font-size: 12px; color: #6b6560; }
.pill { flex: 0 0 auto; background: #efeae3; color: #3f3833; border-radius: 999px; padding: 4px 8px; font-size: 11px; font-weight: 700; }
.more { margin: 12px 4px 0; font-size: 13px; line-height: 1.45; color: #6b6560; }
.opt { background: #fff; border: 1px solid #e4ddd4; border-radius: 14px; padding: 12px 14px; margin-bottom: 8px; }
.opt strong { display: block; font-size: 15px; margin-bottom: 2px; }
.opt span { font-size: 13px; line-height: 1.4; color: #6b6560; }
.foot { margin: 8px 4px 0; font-size: 13px; line-height: 1.45; color: #3f3833; }
"""

TRASH = '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M5.5 2h5l.5 1H14v1.5H2V3h3zm-1 3.5h1.4v7H4.5zm3.2 0h1.4v7H7.7zm3.2 0H12v7h-1.1z"/></svg>'

DESK = """
<div class="desk">
  <div class="deskhead"><span>Open orders</span><span class="sync">Synced</span></div>
  <div class="line"><span>1042<small>Sample row</small></span><span>Open</span><button class="trash" type="button">""" + TRASH + """</button></div>
  <div class="line"><span>1048<small>Sample row</small></span><span>Open</span><span></span></div>
  <div class="detail">
    <strong>Order 1042</strong>
    <p>Detail is open. There is no way back.</p>
    <div class="mini"><span style="background:#6d28d9">Mark packed</span><span style="background:#be185d">Export</span></div>
  </div>
</div>
"""


def wrap(title, css, body):
    html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>""" + title + """</title>
<style>
""" + FONT + css + """
</style>
</head>
<body>
""" + body + """
</body>
</html>
"""
    if '{{' in html or '}}' in html:
        raise SystemExit('CSS braces were doubled in ' + title)
    return html


PAGES = {
    'product-design': {
        'before': wrap('product-design before', SLOP, """
<div class="slop">
  <div class="nav"><div class="logo">North Studio</div><button class="ghost" type="button">Menu</button></div>
  <section class="hero">
    <p class="eyebrow">The new way to book</p>
    <h1>Book beauty, elevated</h1>
    <p class="sub">Trusted by thousands of happy clients.</p>
    <div class="ctas"><button class="light" type="button">Book now</button><button class="pink" type="button">Learn more</button></div>
  </section>
  <section class="stats">
    <article class="stat"><b>2,400</b><span>Clients</span></article>
    <article class="stat"><b>4.9</b><span>Rating</span></article>
    <article class="stat"><b>18</b><span>Stylists</span></article>
  </section>
  <section class="card">
    <p class="stars">★★★★★</p>
    <p>"Best salon in town. I come every week."</p>
    <div class="who"><div class="avatar">M</div><span>Maya L. · Client</span></div>
  </section>
  <section class="card">
    <div class="row"><span>Cut</span><b>$48</b></div>
    <div class="row"><span>Color <em class="badge">Popular</em></span><b>$72</b></div>
    <div class="row"><span>Wedding</span><b>$120</b></div>
  </section>
  <form class="news">
    <input placeholder="Email address" aria-label="Email address">
    <button type="button">Subscribe</button>
  </form>
  <p class="seen">As seen in<strong>Vogue · Gloss · Today</strong></p>
</div>
"""),
        'after': wrap('product-design after', CALM, """
<div class="calm">
  <div class="top"><button class="back" type="button">Back</button><div class="brand">North Studio</div></div>
  <div class="main">
    <h1>Book a visit</h1>
    <p class="lead">Choose a service and a time. This phase confirms the visit.</p>
    <label class="lbl">Service</label>
    <div class="choice"><span>Haircut</span></div>
    <p class="hint">Sample label. The shop has not named its list.</p>
    <label class="lbl">Day</label>
    <div class="chips">
      <button class="chip" type="button">Wed 8</button>
      <button class="chip on" type="button">Thu 9</button>
      <button class="chip" type="button">Fri 10</button>
    </div>
    <label class="lbl">Time</label>
    <div class="chips">
      <button class="chip" type="button">9:00</button>
      <button class="chip on" type="button">10:30</button>
      <button class="chip" type="button">14:00</button>
    </div>
    <label class="lbl" for="name">Name</label>
    <input class="name" id="name" type="text" placeholder="First and last name">
    <p class="later">Not on this screen: pay in the app, reminders, reviews, or staff profiles.</p>
    <div class="phase"><span class="lbl">This phase</span><strong>Confirm one visit</strong><p>The button below is the only action. Leaving does not book anything.</p></div>
  </div>
  <div class="dock">
    <p>Not saved yet. You can leave and nothing is booked.</p>
    <button class="primary" type="button">Confirm visit</button>
  </div>
</div>
"""),
    },
    'ui-ux-design': {
        'before': wrap('ui-ux before', FORM_SLOP, """
<div class="formslop">
  <div class="banner"><h1>Welcome back</h1><p>Your beauty journey starts here.</p></div>
  <section class="metrics">
    <article class="metric"><b>12</b><span>Today</span></article>
    <article class="metric"><b>4.9</b><span>Rating</span></article>
    <article class="metric"><b>8</b><span>Staff</span></article>
    <article class="metric"><b>$1.2k</b><span>Revenue</span></article>
  </section>
  <form class="sheet">
    <input placeholder="Service" value="Haircut">
    <input placeholder="When" value="Thu 9 Oct, 10:30">
    <input placeholder="Your name">
    <div class="held"><span>Fri 10:00 held</span><button class="icon" type="button">""" + TRASH + """</button></div>
    <div class="pair"><button type="button" style="background:#6d28d9">Confirm visit</button><button type="button" style="background:#be185d">Learn more</button></div>
  </form>
  <nav class="tabs">
    <span>Home</span><span class="on">Book</span><span>Rewards</span><span>You</span>
  </nav>
</div>
"""),
        'after': wrap('ui-ux after', CALM + FORM_CALM, """
<div class="formcalm calm">
  <div class="top"><button class="back" type="button">Back</button><div class="brand">North Studio</div></div>
  <div class="main">
    <h1>Book a visit</h1>
    <p class="lead">Haircut on Thu 9 Oct at 10:30. Confirm when the name is filled in.</p>
    <div class="panel">
      <div class="field"><span>Service</span><div class="value">Haircut</div></div>
      <div class="field"><span>When</span><div class="value">Thu 9 Oct, 10:30</div></div>
      <div class="field"><span>Name</span><input class="name" id="who" type="text" placeholder="First and last name"></div>
      <div class="draft">
        <p><strong>Draft</strong>Fri 10:00. Sample hold, not a customer.</p>
        <button class="textbtn" type="button">Remove draft</button>
      </div>
    </div>
    <div class="phase"><span class="lbl">Layout</span><strong>One next step</strong><p>Labels stay visible. Remove draft is a word, not an icon.</p></div>
  </div>
  <div class="dock">
    <p>Not saved yet. Back keeps this draft. Confirm books the visit.</p>
    <button class="primary" type="button">Confirm visit</button>
  </div>
</div>
"""),
    },
    'ux-critique': {
        'before': wrap('critique before', REVIEW, """
<div class="review">
  <h1>Review</h1>
  <p class="kicker">Order desk. Same screen on both sides.</p>
  """ + DESK + """
  <div class="bubble">
    <h2>Make it feel premium</h2>
    <p>A new color and a chart would help. The trash icon is a bit unclear, but personality matters more.</p>
    <div class="chips2"><span>Add a chart</span><span>Purple accent</span><span>Welcome line</span></div>
  </div>
  <div class="bubble" style="margin-top:12px">
    <h2>Suggested additions</h2>
    <p>A welcome line and a weekly chart, so the desk feels alive. Personality first.</p>
  </div>
</div>
"""),
        'after': wrap('critique after', REVIEW, """
<div class="review">
  <h1>Fix first</h1>
  <p class="kicker">Same desk. The review names the fix.</p>
  """ + DESK + """
  <article class="find"><span class="tag b">Blocker</span><b>No way back from the detail.</b><p>Add a text Back control. Retest: the list returns.</p></article>
  <article class="find"><span class="tag m">Major</span><b>Remove has no word.</b><p>Label it Remove, or drop it. Retest: the control has a visible name.</p></article>
  <article class="find"><span class="tag m">Major</span><b>Chip says Synced.</b><p>The packer cannot act on it. Remove the chip.</p></article>
  <p class="kept"><strong>Kept:</strong> the order list. <strong>Not added:</strong> a chart or a new color.</p>
</div>
"""),
    },
    'ship-check': {
        'before': wrap('ship before', CHECK, """
<div class="check">
  <h1>Launch check</h1>
  <p class="sub">No URL, build, or screenshot. The table was filled from the idea.</p>
  <div class="list">
    <div class="item"><div><strong>Privacy policy</strong><span>No page to open</span></div><em class="pill">Not verified</em></div>
    <div class="item"><div><strong>Terms</strong><span>No page to open</span></div><em class="pill">Not verified</em></div>
    <div class="item"><div><strong>HTTPS</strong><span>No host</span></div><em class="pill">Not verified</em></div>
    <div class="item"><div><strong>Form abuse</strong><span>No server</span></div><em class="pill">Not verified</em></div>
    <div class="item"><div><strong>Contrast and focus</strong><span>No build</span></div><em class="pill">Not verified</em></div>
    <div class="item"><div><strong>Forms</strong><span>Nothing to submit</span></div><em class="pill">Not verified</em></div>
    <div class="item"><div><strong>Performance</strong><span>Nothing measured</span></div><em class="pill">Not verified</em></div>
  </div>
  <p class="more">Rows 8 to 20 were filled the same way. Verdict, under the list: Not established. Statuses are Not verified, not Pass.</p>
</div>
"""),
        'after': wrap('ship after', CHECK, """
<div class="check">
  <h1>Not established</h1>
  <p class="sub">There is no site to check. The 20 rows stay unwritten.</p>
  <div class="opt"><strong>Q1. What should I check?</strong><span>Why it matters: an idea cannot pass a launch check.</span></div>
  <div class="opt"><strong>A. A public URL</strong><span>Example: the booking page a client will open.</span></div>
  <div class="opt"><strong>B. The project folder</strong><span>Example: the site source on this machine.</span></div>
  <div class="opt"><strong>C. Screenshots only</strong><span>Example: desktop and phone. These cannot prove HTTPS.</span></div>
  <p class="foot"><strong>Something else.</strong> Type your own.<br>My pick: No pick yet. You decide, or let me decide and I will wait.</p>
  <div class="list" style="margin-top:16px">
    <div class="item"><div><strong>Not written from the idea</strong><span>No privacy page, speed score, or Pass mark.</span></div></div>
    <div class="item"><div><strong>Next</strong><span>I stop until a URL, a folder, or screenshots arrive.</span></div></div>
  </div>
</div>
"""),
    },
}


def main():
    for skill, sides in PAGES.items():
        for side, html in sides.items():
            path = OUT / skill / (side + '.html')
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(html)
            print(path.relative_to(ROOT))


if __name__ == '__main__':
    main()
