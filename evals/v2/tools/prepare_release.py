#!/usr/bin/env python3
"""Prepare the 1.3 release run folders outside the repo.

Usage: python3 evals/v2/tools/prepare_release.py [work_dir]
Default work dir: /home/claude/v2runs

Creates <work>/release-1.3/pack (a snapshot of skills/shipright), <work>/vendor,
and <work>/release-1.3/<case>/<arm>/ for the 8 frozen cases plus 2 hidden cases.
Arms: sonnet-sr, haiku-sr, opus-plain.
Does not launch a model and does not write a score.
"""
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REPO = ROOT.parent
WORK = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('/home/claude/v2runs')
PHASE = 'release-1.3'
ARMS = ['sonnet-sr', 'haiku-sr', 'opus-plain']

cases = json.loads((REPO / 'evals/v2/cases.json').read_text())['cases']
hidden = json.loads((REPO / 'evals/v2/hidden-cases.json').read_text())['cases']
root = WORK / PHASE
root.mkdir(parents=True, exist_ok=True)

pack = root / 'pack'
if pack.exists():
    shutil.rmtree(pack)
shutil.copytree(REPO / 'skills/shipright', pack / 'shipright', ignore=shutil.ignore_patterns('__pycache__', '*.pyc'))
commit = subprocess.run(['git', '-C', str(REPO), 'rev-parse', 'HEAD'], capture_output=True, text=True)
(root / 'pack-commit.txt').write_text(commit.stdout.strip() or 'no-git working tree, ShipRight 1.3 draft\n')

vendor = WORK / 'vendor'
if not vendor.exists():
    shutil.copytree(REPO / 'evals/v1/vendor', vendor, ignore=shutil.ignore_patterns('README.md'))

def seed(case):
    for arm in ARMS:
        dest = root / case['id'] / arm
        dest.mkdir(parents=True, exist_ok=True)
        for name in case.get('attachments', []):
            src = REPO / 'evals/v2/cases' / name
            if not src.exists():
                src = REPO / 'evals/v2/cases' / case['id'] / name
            if src.is_dir():
                shutil.copytree(src, dest / name, dirs_exist_ok=True)
            elif src.is_file():
                shutil.copy(src, dest / name)

for case in cases + hidden:
    seed(case)
print(f'prepared {len(cases) + len(hidden)} cases x {len(ARMS)} arms in {root}')
