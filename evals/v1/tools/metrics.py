#!/usr/bin/env python3
"""Measure a frozen arm: words in reply and build pack, files, checker counts. Usage: metrics.py <arm>"""
import hashlib, json, sys
from pathlib import Path
base = Path(__file__).resolve().parents[1] / 'runs' / sys.argv[1]
out = {}
for case in sorted(p for p in base.iterdir() if p.is_dir()):
    words = lambda ps: sum(len(p.read_text(errors='ignore').split()) for p in ps)
    pack = [p for p in (case / 'build-pack').rglob('*') if p.is_file()] if (case / 'build-pack').exists() else []
    rep = json.loads((case / 'check-ui/report.json').read_text())
    res = [r for v in rep['viewports'].values() for r in v['results']]
    out[case.name] = {
        'reply_words': words([case / 'reply.md']) if (case / 'reply.md').exists() else 0,
        'questions_words': words([case / 'questions.md']) if (case / 'questions.md').exists() else 0,
        'build_pack_words': words(pack), 'build_pack_files': sorted(str(p.relative_to(case)) for p in pack),
        'html_bytes': (case / 'index.html').stat().st_size,
        'check_ui_fail': sum(r['level'] == 'FAIL' for r in res), 'check_ui_warn': sum(r['level'] == 'WARN' for r in res),
        'check_ui_findings': sorted({f"{r['level']} {r['id']}" for r in res}),
        'sha256': {str(p.relative_to(case)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(case.rglob('*')) if p.is_file() and 'check-ui' not in p.parts},
    }
(base / 'metrics.json').write_text(json.dumps(out, indent=1) + '\n')
for k, v in out.items():
    print(k, 'reply', v['reply_words'], 'pack', v['build_pack_words'], 'files', len(v['build_pack_files']), 'FAIL', v['check_ui_fail'], 'WARN', v['check_ui_warn'])
