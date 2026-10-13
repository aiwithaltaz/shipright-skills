#!/usr/bin/env python3
"""Build blind A/B folders for grading. Usage: blind.py <trial-name> <arm-x> <arm-y> <out-dir> [--seed N]

Copies each case's screenshots, reply, questions, build pack and checker report into <out>/<case>/A and B,
in a seeded random order. The arm mapping goes to <out>/../<trial-name>-mapping.json, outside the graders' folder.
Raw run folders are never modified.
"""
import json
import random
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
trial, arm_x, arm_y, out = sys.argv[1:5]
seed = int(sys.argv[sys.argv.index('--seed') + 1]) if '--seed' in sys.argv else 20261013
rng = random.Random(seed)
out = Path(out)
cases = json.loads((HERE / 'cases.json').read_text())['cases']
mapping = {'trial': trial, 'seed': seed, 'cases': {}}
for case in cases:
    cid = case['id']
    arms = [arm_x, arm_y]
    rng.shuffle(arms)
    mapping['cases'][cid] = {'A': arms[0], 'B': arms[1]}
    for label, arm in zip('AB', arms):
        src = HERE / 'runs' / arm / cid
        dst = out / cid / label
        dst.mkdir(parents=True, exist_ok=True)
        for name in ('desktop.png', 'phone.png', 'desktop-full.png', 'phone-full.png'):
            shutil.copy2(src / 'check-ui' / name, dst / name)
        shutil.copy2(src / 'check-ui' / 'report.json', dst / 'check-ui.json')
        for name in ('reply.md', 'questions.md'):
            if (src / name).exists():
                shutil.copy2(src / name, dst / name)
        if (src / 'build-pack').exists():
            shutil.copytree(src / 'build-pack', dst / 'build-pack', dirs_exist_ok=True)
    shutil.copy2(HERE / 'rubric.md', out / cid / 'rubric.md')
    (out / cid / 'request.txt').write_text(case['user_message'] + '\n')
(out.parent / f'{trial}-mapping.json').write_text(json.dumps(mapping, indent=1) + '\n')
print(f'blind folders in {out}; mapping saved outside it')
