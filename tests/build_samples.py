#!/usr/bin/env python3
"""Write the 0.6.2-draft before/after sample screens.

These pages illustrate the written rules. They are not a second model's output.
Ratings, quotes, and prices appear only on the "before" screens, and those pages say they are fake.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = '0.6.2-draft'
OUT = ROOT / 'tests' / 'fixtures' / VERSION

FONT = '"Segoe UI", system-ui, sans-serif'


def page(skill, side, version_label, note, body, bg='#f4f1eb'):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{skill} {side}</title>
<style>
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; width: 1280px; height: 800px; overflow: hidden; }}
  body {{
    font-family: {FONT};
    color: #1f1a17;
    background: {bg};
  }}
  button, input {{ font-family: inherit; }}
  .bar {{
    height: 36px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #1f1a17;
    color: #f4f1eb;
    font-size: 13px;
    letter-spacing: 0.01em;
  }}
  .bar span {{ color: #c8bfb4; }}
  .stage {{ height: 764px; overflow: hidden; }}
  .fine {{
    font-size: 12px;
    line-height: 1.4;
    color: #5e564e;
  }}
</style>
</head>
<body>
  <div class="bar">
    <strong>{skill}</strong>
    <span>{version_label}. {note}</span>
  </div>
  <div class="stage">
{body}
  </div>
</body>
</html>
'''


PRODUCT_BEFORE = '''
<style>
  .nav, .wrap {{ padding: 0 32px; }}
  .nav {{
    height: 56px; display: flex; align-items: center; justify-content: space-between;
    background: #fff;
  }}
  .logo {{ font-weight: 700; font-size: 16px; }}
  .nav-actions {{ display: flex; gap: 8px; }}
  .fill {{
    border: 0; border-radius: 8px; padding: 8px 14px; font-size: 14px; font-weight: 650; color: #fff;
  }}
  .p1 {{ background: #6d28d9; }}
  .p2 {{ background: #db2777; }}
  .hero {{
    margin: 16px 32px 0;
    height: 168px;
    border-radius: 16px;
    padding: 28px 32px;
    background: linear-gradient(100deg, #6d28d9, #db2777);
    color: #fff;
  }}
  .hero h1 {{ margin: 0 0 8px; font-size: 32px; line-height: 1.15; font-weight: 700; }}
  .hero p {{ margin: 0 0 16px; font-size: 16px; }}
  .stats, .quotes, .prices {{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding: 16px 32px 0; }}
  .card {{
    background: #fff; border-radius: 12px; padding: 12px 16px;
    box-shadow: 0 8px 24px rgba(76, 29, 149, 0.12);
  }}
  .stat b {{ display: block; font-size: 20px; color: #6d28d9; }}
  .stat span, .quote span, .price span {{ font-size: 13px; color: #6b6280; }}
  .quote p, .price strong {{ margin: 0 0 4px; font-size: 14px; }}
  .price b {{ font-size: 24px; color: #6d28d9; }}
  .foot {{ padding: 12px 32px 0; }}
</style>
<div class="nav">
  <div class="logo">North Studio</div>
  <div class="nav-actions">
    <button class="fill p1">Book now</button>
    <button class="fill p2">Explore</button>
  </div>
</div>
<div class="hero">
  <h1>Book beauty, elevated</h1>
  <p>The premium way to look your best. Trusted by thousands.</p>
  <button class="fill" style="background:#fff;color:#6d28d9">Book now</button>
  <button class="fill p2">Learn more</button>
</div>
<div class="stats">
  <div class="card stat"><b>2,400</b><span>Happy clients</span></div>
  <div class="card stat"><b>4.9</b><span>Average rating</span></div>
  <div class="card stat"><b>18</b><span>Stylists</span></div>
</div>
<div class="quotes">
  <div class="card quote"><p>"Best salon in town."</p><span>Maya, invented quote</span></div>
  <div class="card quote"><p>"I come back every week."</p><span>Jon, invented quote</span></div>
  <div class="card quote"><p>"Worth every penny."</p><span>Ava, invented quote</span></div>
</div>
<div class="prices">
  <div class="card price"><span>Cut</span><div><b>$48</b></div><strong>Invented price</strong></div>
  <div class="card price"><span>Color</span><div><b>$72</b></div><strong>Most popular</strong></div>
  <div class="card price"><span>Wedding</span><div><b>$120</b></div><strong>Invented price</strong></div>
</div>
<div class="foot fine">Illustration of a first screen drawn before anyone answered. Ratings, quotes, and prices are fake.</div>
'''


PRODUCT_AFTER = '''
<style>
  .app {{ padding: 32px 48px 0; max-width: 760px; }}
  .back {{
    border: 0; background: transparent; padding: 0; color: #1d4f3a; font-size: 14px; font-weight: 650;
  }}
  h1 {{ margin: 20px 0 8px; font-size: 32px; line-height: 1.15; }}
  .lead {{ margin: 0 0 20px; font-size: 16px; color: #3f3833; max-width: 520px; }}
  .panel {{
    background: #fffcf8; border: 1px solid #e3dcd2; border-radius: 12px; padding: 20px 24px 24px;
  }}
  .row {{ margin-bottom: 16px; }}
  .row label, .kicker {{ display: block; font-size: 14px; font-weight: 650; margin-bottom: 8px; }}
  .choice {{
    display: flex; justify-content: space-between; align-items: center;
    border: 1px solid #e3dcd2; border-radius: 8px; padding: 12px 16px; background: #fff;
  }}
  .choice small {{ color: #5e564e; font-size: 13px; }}
  .times {{ display: flex; gap: 8px; }}
  .time {{
    border: 1px solid #d9d0c4; background: #fff; border-radius: 8px; padding: 8px 16px; font-size: 14px;
  }}
  .time.on {{ border: 2px solid #1d4f3a; background: #e7f0eb; font-weight: 650; }}
  input[type="text"] {{
    width: 100%; height: 44px; border: 1px solid #d9d0c4; border-radius: 8px; padding: 0 12px; font-size: 16px;
  }}
  .status {{
    display: flex; justify-content: space-between; align-items: center; margin-top: 8px;
  }}
  .primary {{
    height: 44px; padding: 0 20px; border: 0; border-radius: 8px; background: #1d4f3a; color: #fff;
    font-size: 16px; font-weight: 650;
  }}
  .later {{ margin: 16px 0 0; font-size: 14px; color: #5e564e; }}
</style>
<div class="app">
  <button class="back">Back</button>
  <h1>Book a visit</h1>
  <p class="lead">Choose a service and a time. This phase confirms the visit. It does not take payment.</p>
  <div class="panel">
    <div class="row">
      <label>Service</label>
      <div class="choice"><span>Haircut</span><small>Sample label. The shop has not named its list.</small></div>
    </div>
    <div class="row">
      <div class="kicker">Day</div>
      <div class="times">
        <button class="time">Wed 8 Oct</button>
        <button class="time on">Thu 9 Oct</button>
        <button class="time">Fri 10 Oct</button>
      </div>
    </div>
    <div class="row">
      <div class="kicker">Time</div>
      <div class="times">
        <button class="time">9:00</button>
        <button class="time on">10:30</button>
        <button class="time">14:00</button>
      </div>
    </div>
    <div class="row">
      <label for="name">Name</label>
      <input id="name" type="text" placeholder="First and last name">
    </div>
    <div class="status">
      <span class="fine">Not saved yet. You can leave and nothing is booked.</span>
      <button class="primary">Confirm visit</button>
    </div>
  </div>
  <p class="later">Notes only, not on this screen: pay in the app, reminders, reviews, staff profiles.</p>
  <p class="fine">Illustration. No ratings, quotes, or prices, because none were supplied.</p>
</div>
'''


UI_BEFORE = '''
<style>
  .hero {{
    height: 92px; padding: 16px 32px; color: #fff;
    background: linear-gradient(90deg, #6d28d9, #7c3aed);
  }}
  .hero h1 {{ margin: 0; font-size: 24px; }}
  .hero p {{ margin: 4px 0 0; font-size: 14px; opacity: 0.9; }}
  .stats {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 16px 32px 0; }}
  .stat {{ background: #fff; border-radius: 12px; padding: 12px 16px; box-shadow: 0 6px 16px rgba(76,29,149,.12); }}
  .stat b {{ display: block; font-size: 20px; color: #6d28d9; }}
  .stat span {{ font-size: 12px; color: #6b6280; }}
  .form {{ margin: 16px 32px 0; background: #fff; border-radius: 16px; padding: 16px; }}
  input {{
    width: 100%; height: 44px; border: 0; border-radius: 8px; background: #f4f0ff; margin-bottom: 8px;
    padding: 0 12px; font-size: 16px;
  }}
  .held {{
    display: flex; align-items: center; justify-content: space-between; padding: 8px 4px 12px;
  }}
  .icon {{
    width: 36px; height: 36px; border: 0; border-radius: 8px; background: #f4f0ff; color: #6d28d9;
  }}
  .actions {{ display: flex; gap: 8px; }}
  .fill {{ flex: 1; height: 44px; border: 0; border-radius: 8px; color: #fff; font-size: 16px; font-weight: 650; }}
  .foot {{ padding: 12px 32px 0; }}
</style>
<div class="hero">
  <h1>Welcome back</h1>
  <p>Your beauty journey starts here.</p>
</div>
<div class="stats">
  <div class="stat"><b>12</b><span>Today</span></div>
  <div class="stat"><b>4.9</b><span>Rating</span></div>
  <div class="stat"><b>8</b><span>Staff</span></div>
  <div class="stat"><b>$1.2k</b><span>Revenue</span></div>
</div>
<div class="form">
  <input placeholder="Service" value="Haircut">
  <input placeholder="When" value="Thu 9 Oct, 10:30">
  <input placeholder="Your name">
  <div class="held">
    <span>Fri 10:00 held</span>
    <button class="icon" aria-label="">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M5.5 2h5l.5 1H14v1.5H2V3h3l.5-1zM4 6h1.5v7H4V6zm3.25 0h1.5v7h-1.5V6zM10.5 6H12v7h-1.5V6z"/></svg>
    </button>
  </div>
  <div class="actions">
    <button class="fill" style="background:#6d28d9">Confirm visit</button>
    <button class="fill" style="background:#db2777">Learn more</button>
  </div>
</div>
<div class="foot fine">Illustration. Same booking facts as the after screen, plus invented stats. Fields have no labels. There is no way back.</div>
'''


UI_AFTER = '''
<style>
  .app {{ padding: 28px 48px 0; max-width: 760px; }}
  .back {{ border: 0; background: transparent; padding: 0; color: #1d4f3a; font-size: 14px; font-weight: 650; }}
  h1 {{ margin: 16px 0 8px; font-size: 32px; line-height: 1.15; }}
  .lead {{ margin: 0 0 20px; font-size: 16px; }}
  .panel {{ background: #fffcf8; border: 1px solid #e3dcd2; border-radius: 12px; padding: 20px 24px; }}
  label {{ display: block; font-size: 14px; font-weight: 650; margin: 12px 0 8px; }}
  label:first-child {{ margin-top: 0; }}
  .value, input {{
    width: 100%; height: 44px; border: 1px solid #d9d0c4; border-radius: 8px; background: #fff;
    padding: 0 12px; font-size: 16px; display: flex; align-items: center;
  }}
  .held {{
    margin-top: 16px; padding: 12px 16px; border-radius: 8px; background: #f4f1eb;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }}
  .held p {{ margin: 0; font-size: 14px; }}
  .textbtn {{ border: 0; background: transparent; color: #8f2d2d; font-size: 14px; font-weight: 650; padding: 8px 0; }}
  .status {{ margin-top: 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }}
  .primary {{
    height: 44px; padding: 0 20px; border: 0; border-radius: 8px; background: #1d4f3a; color: #fff;
    font-size: 16px; font-weight: 650;
  }}
  .foot {{ margin: 12px 0 0; }}
</style>
<div class="app">
  <button class="back">Back</button>
  <h1>Book a visit</h1>
  <p class="lead">Haircut, Thu 9 Oct at 10:30. Confirm when the name is filled in.</p>
  <div class="panel">
    <label>Service</label>
    <div class="value">Haircut</div>
    <label>When</label>
    <div class="value">Thu 9 Oct, 10:30</div>
    <label for="who">Name</label>
    <input id="who" type="text" placeholder="First and last name">
    <div class="held">
      <p><strong>Draft</strong><br>Fri 10:00. Sample hold, not a customer.</p>
      <button class="textbtn">Remove draft</button>
    </div>
    <div class="status">
      <span class="fine">Not saved yet. Back keeps this draft. Confirm books the visit.</span>
      <button class="primary">Confirm visit</button>
    </div>
  </div>
  <p class="foot fine">Illustration. Same booking facts as the before screen. No stats, no second button, no icon-only remove.</p>
</div>
'''


DESK = '''
<div style="height:100%;background:#f7f5f2;padding:12px;font-size:13px;color:#1f1a17;">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
    <strong style="font-size:16px;">Open orders</strong>
    <span style="background:#ece7ff;color:#5b21b6;border-radius:99px;padding:4px 8px;">Synced</span>
  </div>
  <div style="background:#fff;border:1px solid #e4e0d8;border-radius:8px;overflow:hidden;">
    <div style="display:grid;grid-template-columns:1.2fr 1fr 40px;gap:8px;padding:8px 10px;color:#5e564e;font-size:12px;">
      <span>Order</span><span>Status</span><span></span>
    </div>
    <div style="display:grid;grid-template-columns:1.2fr 1fr 40px;gap:8px;padding:8px 10px;border-top:1px solid #eee;align-items:center;">
      <span>1042<br><span style="color:#5e564e">Sample row</span></span>
      <span>Open</span>
      <span style="width:28px;height:28px;border-radius:6px;background:#f3e8ff;color:#6d28d9;display:flex;align-items:center;justify-content:center;">
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M5.5 2h5l.5 1H14v1.5H2V3h3l.5-1zM4 6h1.5v7H4V6zm3.25 0h1.5v7h-1.5V6zM10.5 6H12v7h-1.5V6z"/></svg>
      </span>
    </div>
    <div style="display:grid;grid-template-columns:1.2fr 1fr 40px;gap:8px;padding:8px 10px;border-top:1px solid #eee;">
      <span>1048<br><span style="color:#5e564e">Sample row</span></span><span>Open</span><span></span>
    </div>
  </div>
  <div style="margin-top:8px;background:#fff;border:1px solid #e4e0d8;border-radius:8px;padding:10px;">
    <strong>Order 1042</strong>
    <p style="margin:4px 0 8px;color:#5e564e;">Detail opened from the row. No back control.</p>
    <div>
      <span style="background:#6d28d9;color:#fff;border-radius:6px;padding:6px 8px;">Mark packed</span>
    </div>
  </div>
</div>
'''


CRITIQUE_BEFORE = f'''
<style>
  .split {{ display: grid; grid-template-columns: 420px 1fr; height: 764px; }}
  .side {{ padding: 20px 24px; }}
  .copy h1 {{ margin: 0 0 8px; font-size: 28px; line-height: 1.2; }}
  .banner {{
    background: linear-gradient(90deg, #6d28d9, #db2777); color: #fff; border-radius: 12px;
    padding: 16px 20px; margin: 16px 0;
  }}
  .banner strong {{ display: block; font-size: 16px; margin-bottom: 4px; }}
  .copy p {{ font-size: 16px; line-height: 1.45; margin: 0 0 12px; }}
  .idea {{ background: #fff; border-radius: 12px; padding: 12px 16px; margin-bottom: 8px; font-size: 14px; }}
</style>
<div class="split">
  <div>{DESK}</div>
  <div class="side copy">
    <h1>Review</h1>
    <p class="fine">Order desk. No URL supplied.</p>
    <div class="banner"><strong>Make it more modern</strong>A new color and a chart would help it feel premium.</div>
    <div class="idea">Add a purple accent and a welcome line.</div>
    <div class="idea">Add a trend chart so the desk looks alive.</div>
    <div class="idea">The trash icon is a bit unclear, but personality matters more.</div>
    <p class="fine">Illustration of a vague review. It restyles the screen and adds regions. The desk on the left is the artifact, unchanged.</p>
  </div>
</div>
'''


CRITIQUE_AFTER = f'''
<style>
  .split {{ display: grid; grid-template-columns: 420px 1fr; height: 764px; }}
  .side {{ padding: 16px 24px 0; background: #f4f1eb; }}
  h1 {{ margin: 0 0 4px; font-size: 28px; line-height: 1.15; }}
  .verdict {{ margin: 0 0 12px; font-size: 16px; }}
  .finding {{
    background: #fffcf8; border: 1px solid #e3dcd2; border-radius: 8px; padding: 10px 12px; margin-bottom: 8px;
  }}
  .finding strong {{ font-size: 14px; }}
  .tag {{
    display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .02em;
    padding: 2px 6px; border-radius: 4px; margin-right: 6px;
  }}
  .b {{ background: #f8e6e6; color: #8f2d2d; }}
  .m {{ background: #f8efd8; color: #7a5410; }}
  .finding p {{ margin: 4px 0 0; font-size: 13px; line-height: 1.4; color: #3f3833; }}
  .keep {{ font-size: 14px; margin: 8px 0 0; }}
</style>
<div class="split">
  <div>{DESK}</div>
  <div class="side">
    <h1>Review</h1>
    <p class="verdict"><strong>Fix first.</strong> Three findings. The desk on the left is the artifact.</p>
    <div class="finding">
      <span class="tag b">Blocker</span><strong>Order detail. No way back.</strong>
      <p>Impact: the packer is stuck in the detail. Correction: add a text Back control. Retest: the list returns and the row stays selected.</p>
    </div>
    <div class="finding">
      <span class="tag m">Major</span><strong>Remove is a trash icon with no word.</strong>
      <p>Impact: the action is unclear. Correction: use the word Remove, or drop it if this phase does not delete orders. Retest: the control has a visible label.</p>
    </div>
    <div class="finding">
      <span class="tag m">Major</span><strong>Chip says Synced.</strong>
      <p>Impact: the packer cannot act on it. Correction: remove the chip. Retest: the list shows order status only.</p>
    </div>
    <p class="keep"><strong>Kept:</strong> the open-order list. <strong>Not added:</strong> a chart, a welcome line, or a new color.</p>
    <p class="fine">Illustration. Same artifact as the before screen. The review names the fix and does not restyle it.</p>
  </div>
</div>
'''


SHIP_BEFORE = '''
<style>
  .wrap {{ padding: 16px 28px 0; }}
  h1 {{ margin: 0; font-size: 28px; }}
  .sub {{ margin: 4px 0 12px; font-size: 14px; color: #5e564e; }}
  table {{ width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; font-size: 13px; }}
  th, td {{ text-align: left; padding: 6px 10px; border-bottom: 1px solid #eee; }}
  th {{ color: #5e564e; font-weight: 650; font-size: 12px; }}
  .pill {{ display: inline-block; background: #eeeae4; color: #3f3833; border-radius: 99px; padding: 2px 8px; font-size: 12px; }}
  .end {{ margin: 8px 0 0; font-size: 12px; color: #5e564e; }}
</style>
<div class="wrap">
  <h1>Launch check</h1>
  <p class="sub">North Studio booking. No URL, build, or screenshot. 20 rows filled from the idea.</p>
  <table>
    <thead><tr><th>#</th><th>Item</th><th>Status</th><th>Note</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>Privacy policy</td><td><span class="pill">Not verified</span></td><td>No page to open</td></tr>
      <tr><td>2</td><td>Terms</td><td><span class="pill">Not verified</span></td><td>No page to open</td></tr>
      <tr><td>3</td><td>Tracking consent</td><td><span class="pill">Not verified</span></td><td>No requests to inspect</td></tr>
      <tr><td>4</td><td>Frontend secrets</td><td><span class="pill">Not verified</span></td><td>No bundle</td></tr>
      <tr><td>5</td><td>HTTPS</td><td><span class="pill">Not verified</span></td><td>No host</td></tr>
      <tr><td>6</td><td>Public form abuse</td><td><span class="pill">Not verified</span></td><td>No server</td></tr>
      <tr><td>7</td><td>Page titles</td><td><span class="pill">Not verified</span></td><td>Nothing served</td></tr>
      <tr><td>8</td><td>Social preview</td><td><span class="pill">Not verified</span></td><td>No tags</td></tr>
      <tr><td>9</td><td>Favicon</td><td><span class="pill">Not verified</span></td><td>No approved icon</td></tr>
      <tr><td>10</td><td>Sitemap and robots</td><td><span class="pill">Not verified</span></td><td>No files</td></tr>
      <tr><td>11</td><td>Image alternatives</td><td><span class="pill">Not verified</span></td><td>No pages</td></tr>
      <tr><td>12</td><td>Contrast and focus</td><td><span class="pill">Not verified</span></td><td>No build</td></tr>
    </tbody>
  </table>
  <p class="end">Rows 13 to 20 continue the same way. Verdict, easy to miss: Not established. Illustration of a full table with nothing to inspect. Statuses are Not verified, not Pass.</p>
</div>
'''


SHIP_AFTER = '''
<style>
  .wrap {{ padding: 36px 48px 0; max-width: 760px; }}
  h1 {{ margin: 0 0 8px; font-size: 32px; line-height: 1.15; }}
  .lead {{ margin: 0 0 20px; font-size: 16px; max-width: 560px; }}
  .card {{
    background: #fffcf8; border: 1px solid #e3dcd2; border-radius: 12px; padding: 20px 24px;
  }}
  .why {{ margin: 0 0 12px; font-size: 14px; color: #3f3833; }}
  .opt {{
    border: 1px solid #e3dcd2; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; background: #fff;
  }}
  .opt strong {{ display: block; font-size: 16px; margin-bottom: 2px; }}
  .opt span {{ font-size: 14px; color: #5e564e; }}
  .pick {{ margin: 12px 0 0; font-size: 14px; }}
  .stop {{ margin: 16px 0 0; font-size: 14px; color: #5e564e; }}
</style>
<div class="wrap">
  <h1>Not established</h1>
  <p class="lead">There is no site to check yet. I will not fill the 20 launch rows from the idea.</p>
  <div class="card">
    <p class="why"><strong>Q1. What should I check?</strong><br>Why it matters: launch evidence needs a URL, a build, or screenshots. An idea cannot pass.</p>
    <div class="opt"><strong>A. A public URL</strong><span>Example: the booking page a client will open.</span></div>
    <div class="opt"><strong>B. The project folder</strong><span>Example: the site source on this machine.</span></div>
    <div class="opt"><strong>C. Screenshots only</strong><span>Example: desktop and phone of the booking page. These cannot prove HTTPS.</span></div>
    <p class="pick"><strong>Something else.</strong> Type your own.<br>My pick: No pick yet. You decide, or let me decide and I will wait.</p>
  </div>
  <p class="stop">No privacy page, no speed score, and no Pass marks were invented. Illustration.</p>
</div>
'''


def main():
    files = {
        'product-design': {
            'before': page('product-design', 'before', '0.6.1-draft output', 'Marketing site before any answer', PRODUCT_BEFORE, '#f7f4ff'),
            'after': page('product-design', 'after', '0.6.2-draft output', 'One booking task', PRODUCT_AFTER),
        },
        'ui-ux-design': {
            'before': page('ui-ux-design', 'before', '0.6.1-draft output', 'Same booking task, generic layout', UI_BEFORE, '#f6f3ff'),
            'after': page('ui-ux-design', 'after', '0.6.2-draft output', 'Same booking task, laid out for the job', UI_AFTER),
        },
        'ux-critique': {
            'before': page('ux-critique', 'before', '0.6.1-draft output', 'Vague review that adds a theme', CRITIQUE_BEFORE, '#f7f4ff'),
            'after': page('ux-critique', 'after', '0.6.2-draft output', 'Findings on the same desk', CRITIQUE_AFTER),
        },
        'ship-check': {
            'before': page('ship-check', 'before', '0.6.1-draft output', '20 rows and no site', SHIP_BEFORE),
            'after': page('ship-check', 'after', '0.6.2-draft output', 'One question, then stop', SHIP_AFTER),
        },
    }
    for skill, sides in files.items():
        for side, html in sides.items():
            path = OUT / skill / f'{side}.html'
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(html)
            print(path.relative_to(ROOT))


if __name__ == '__main__':
    main()
