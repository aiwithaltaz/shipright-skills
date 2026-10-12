"""Verify exact stored evidence, not UX quality, interoperability or client behavior."""
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
EV=Path(__file__).resolve().parent
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
m=json.loads((EV/'source-manifest.json').read_text())
for rel,h in m['historical_files_sha256'].items():assert digest(ROOT/rel)==h,rel
for rel,h in m['updated_guidance_sha256'].items():assert digest(ROOT/rel)==h,rel
for rel,h in m['evaluation_files_sha256'].items():assert digest(EV/rel)==h,rel
outputs=[json.loads(s) for s in (EV/'outputs.jsonl').read_text().splitlines()]
hashes=json.loads((EV/'output-manifest.json').read_text())
assert len(outputs)==18
assert len({(x['version'],x['id']) for x in outputs})==18
for x in outputs:
    h=hashes[x['version']+'/'+x['id']]
    assert hashlib.sha256(x['response'].encode()).hexdigest()==h['response_sha256']
    if x['id']=='V01':
        assert hashlib.sha256(x['html'].encode()).hexdigest()==h['html_sha256']
        name='before.html' if x['version']=='baseline' else 'after.html'
        assert digest(ROOT/'tests/fixtures/phase-6-design-tokens'/name)==h['html_sha256']
for rel,h in json.loads((EV/'visual-manifest.json').read_text()).items():assert digest(ROOT/rel)==h,rel
for name in ('baseline-checks.json','pretrial-checks.json'):
    assert all(r['exit_code']==0 for r in json.loads((EV/name).read_text())),name
mapping=json.loads((EV/'blind-mapping.json').read_text())
summary=json.loads((EV/'scores.json').read_text());totals={'baseline':0,'updated':0}
for c in summary['cases']:
    sums={'p':[],'q':[]}
    for file in ('blind-scores-g1.json','blind-scores-g2.json'):
        grade=next(x for x in json.loads((EV/file).read_text())['cases'] if x['id']==c['id'])
        for label,r in grade['responses'].items():sums[mapping[c['id']][label]].append(sum(r['scores']))
    assert sum(sums['p'])/2==c['baseline_mean']
    assert sum(sums['q'])/2==c['updated_mean']
    if c['id'].startswith('T'):
        totals['baseline']+=c['baseline_mean'];totals['updated']+=c['updated_mean']
assert totals['baseline']==summary['baseline_total'] and totals['updated']==summary['updated_total']
print(f"PASS: {len(m['historical_files_sha256'])} prior records; frozen guidance/criteria; 18 raw outputs; exact HTML/screenshots; original-grade arithmetic. Evidence integrity only.")
