"""Fetch public sources listed in knowledge/sources/seed.tsv. Respects robots.txt. No logins.
Raw text goes to knowledge/.cache/raw/ (gitignored). The URL list, dates and status go to sources.json."""
import json, re, sys, hashlib, datetime, urllib.robotparser, urllib.request, urllib.parse
from pathlib import Path
from html.parser import HTMLParser
K = Path(__file__).resolve().parents[1]
RAW = K / '.cache/raw'; RAW.mkdir(parents=True, exist_ok=True)
UA = 'ShipRightKnowledgeBot/1.4 (+https://github.com/aiwithaltaz/shipright-skills)'
class Text(HTMLParser):
    skip = {'script', 'style', 'nav', 'footer', 'header', 'svg', 'noscript', 'form'}
    def __init__(s): super().__init__(); s.out = []; s.depth = 0; s.title = ''; s.in_t = False
    def handle_starttag(s, t, a):
        if t in s.skip: s.depth += 1
        if t == 'title': s.in_t = True
        if t in ('p', 'li', 'h1', 'h2', 'h3', 'h4', 'br', 'tr', 'div'): s.out.append('\n')
    def handle_endtag(s, t):
        if t in s.skip and s.depth: s.depth -= 1
        if t == 'title': s.in_t = False
    def handle_data(s, d):
        if s.in_t: s.title += d
        elif not s.depth: s.out.append(d)
robots = {}
def allowed(url):
    p = urllib.parse.urlparse(url); base = f'{p.scheme}://{p.netloc}'
    if base not in robots:
        rp = urllib.robotparser.RobotFileParser()
        try:
            req = urllib.request.Request(base + '/robots.txt', headers={'User-Agent': UA})
            rp.parse(urllib.request.urlopen(req, timeout=15).read().decode('utf-8', 'ignore').splitlines())
        except Exception: rp.parse([])
        robots[base] = rp
    return robots[base].can_fetch(UA, url)
rows = []
for line in (K / 'sources/seed.tsv').read_text().splitlines():
    if not line.strip(): continue
    cat, url = line.split('\t'); sid = hashlib.sha1(url.encode()).hexdigest()[:10]
    row = {'id': sid, 'category': cat, 'url': url, 'fetched': datetime.date.today().isoformat()}
    if not allowed(url): row['status'] = 'robots-disallowed'; rows.append(row); continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA})
        body = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'ignore')
        if url.endswith('.md'): text, title = body, url.rsplit('/', 1)[-1]
        else:
            p = Text(); p.feed(body); text = re.sub(r'\n\s*\n+', '\n\n', re.sub(r'[ \t]+', ' ', ''.join(p.out))).strip(); title = p.title.strip()
        row.update(status='ok' if len(text) > 800 else 'too-short', title=title[:160], chars=len(text))
        (RAW / f'{sid}.txt').write_text(text)
    except Exception as e: row['status'] = f'error: {str(e)[:80]}'
    rows.append(row); print(row['status'], url, file=sys.stderr)
(K / 'sources/sources.json').write_text(json.dumps(rows, indent=1))
