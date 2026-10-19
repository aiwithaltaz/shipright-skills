"""Curate drafts into the library. Keeps a card only if its quote is verbatim in the fetched text, it has a check,
and it is not a near duplicate. Writes knowledge/cards/library.json and knowledge/cards/rejected.json (reasons only)."""
import json, re, difflib, datetime
from pathlib import Path
K = Path(__file__).resolve().parents[1]
def norm(s):
    s = (s or '').replace('\u2014', ' - ').replace('\u2013', '-')
    s = re.sub(r'[\u201c\u201d]', '"', s); s = re.sub(r'[\u2018\u2019]', "'", s)
    return re.sub(r'\s+', ' ', s).strip().lower()
VAGUE = re.compile(r'\b(good|great|nice|beautiful|appropriate|properly|best practices?)\b.*$', re.I)
STAGES = {'00-discover','01-research','02-brainstorm','03-problem-solving','04-scope-and-pages','05-architecture','06-design-system','07-design-options','08-build','09-test-and-critique','10-ship-check'}
kept, rejected = [], []
def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')[:48]
for f in sorted((K / '.cache/drafts').glob('*.json')):
    d = json.loads(f.read_text()); raw = norm((K / f".cache/raw/{d['source']}.txt").read_text())
    for c in d['cards']:
        why = None; q = norm(c.get('source_quote'))
        if not all(c.get(k) for k in ('rule', 'why', 'do', 'dont', 'check', 'source_quote')): why = 'missing field'
        elif len(q.split()) < 6 or q not in raw: why = 'quote not verbatim in source'
        elif len(q.split()) > 40: why = 'quote too long'
        elif c.get('stage') not in STAGES: why = 'bad stage'
        elif len(c['rule'].split()) < 5 or (VAGUE.search(c['rule']) and not re.search(r'\d', c['rule'])): why = 'vague rule'
        elif any(difflib.SequenceMatcher(None, norm(c['rule']), norm(k['rule'])).ratio() > 0.72 for k in kept): why = 'duplicate'
        if why: rejected.append({'source': d['url'], 'rule': c.get('rule'), 'reason': why}); continue
        kept.append({'id': f"{c['stage'][:2]}-{slug(c.get('topic') or c['rule'])}", 'stage': c['stage'], 'topic': c.get('topic', ''), 'rule': c['rule'], 'why': c['why'],
            'do': c['do'], 'dont': c['dont'], 'example': c.get('example', ''), 'source_url': d['url'], 'source_quote': c['source_quote'].strip(),
            'check_kind': c.get('check_kind', 'rubric'), 'check': c['check'], 'tags': c.get('tags') or ['any'], 'category': d['category'],
            'date': datetime.date.today().isoformat()})
# Hand-written cards (Instagram notes, 1.3.1 holes, 18-step workflow gaps) live in manual.json and pass the same field checks.
for c in json.loads((K / 'cards/manual.json').read_text()):
    assert all(c.get(k) for k in ('id','stage','rule','why','do','dont','check','source_url','source_quote')), c.get('id')
    srcmap = {s['url']: s['id'] for s in json.loads((K / 'sources/sources.json').read_text())}
    if c['source_url'] in srcmap: hay = (K / f".cache/raw/{srcmap[c['source_url']]}.txt").read_text()
    elif 'instagram.com' in c['source_url']: hay = (K / 'sources/instagram-notes.md').read_text()
    else: hay = (K.parent / c['source_url']).read_text()
    assert norm(c['source_quote']) in norm(hay), 'manual quote not found: ' + c['id']
    kept.append(c)
def clean(v):
    if isinstance(v, str): return v.replace('\u2014', ' - ').replace('\u2013', '-')
    return [clean(x) for x in v] if isinstance(v, list) else v
kept = [{k: clean(v) for k, v in c.items()} for c in kept]
ids = {}
for c in kept:
    ids[c['id']] = ids.get(c['id'], 0) + 1
    if ids[c['id']] > 1: c['id'] += f"-{ids[c['id']]}"
(K.parent / 'skills/shipright/library/cards.json').write_text(json.dumps(kept, indent=1, ensure_ascii=False))
(K / 'cards/rejected.json').write_text(json.dumps(rejected, indent=1, ensure_ascii=False))
import collections
print(len(kept), 'kept', len(rejected), 'rejected', collections.Counter(r['reason'] for r in rejected))
print(collections.Counter(c['category'] for c in kept))
