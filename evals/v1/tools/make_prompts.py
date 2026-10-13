#!/usr/bin/env python3
"""Render the frozen run prompt for each case. Usage: make_prompts.py <arm> <pack_dir> <trial_dir> <out_dir>"""
import json, sys
from pathlib import Path
here = Path(__file__).resolve().parents[1]
arm, pack, trial, out = sys.argv[1:5]
cases = json.loads((here / 'cases.json').read_text())
template = (here / 'README.md').read_text().split('```text\n')[1].split('```')[0]
Path(out).mkdir(parents=True, exist_ok=True)
for case in cases['cases']:
    run = f"{trial}/runs/{arm}/{case['id']}"
    Path(run).mkdir(parents=True, exist_ok=True)
    text = (template.replace('{PACK}', pack).replace('{OUT}', run).replace('{USER_MESSAGE}', case['user_message'])
            .replace('{SCRIPTED_ANSWER}', cases['scripted_answer']).replace('{HARNESS_NOTE}', cases['harness_note']))
    Path(out, f"{arm}-{case['id']}.txt").write_text(text)
    print(Path(out, f"{arm}-{case['id']}.txt"))
