#!/usr/bin/env python3
"""Unblind and total grades. Usage: score.py <blind-dir> <mapping.json> <out.json>"""
import json
import sys
from pathlib import Path

blind, mapping_path, out = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
mapping = json.loads(mapping_path.read_text())
result = {'trial': mapping['trial'], 'cases': {}, 'arms': {}}
for case, labels in mapping['cases'].items():
    grades = json.loads((blind / case / 'grades.json').read_text())
    row = {}
    for label, arm in labels.items():
        g = grades[label]
        scores = {k: int(v) for k, v in g['scores'].items()}
        row[arm] = {'total': sum(scores.values()), 'scores': scores, 'unshippable': bool(g.get('unshippable')),
                    'unshippable_reason': g.get('unshippable_reason', ''), 'top_fix': g.get('top_fix', '')}
        arm_total = result['arms'].setdefault(arm, {'total': 0, 'by_criterion': {str(i): 0 for i in range(1, 11)},
                                                    'unshippable': 0, 'wins': 0})
        arm_total['total'] += row[arm]['total']
        arm_total['unshippable'] += row[arm]['unshippable']
        for k, v in scores.items():
            arm_total['by_criterion'][k] += v
    better = grades.get('better')
    row['better'] = labels.get(better, 'tie') if better in labels else 'tie'
    row['why'] = grades.get('why', '')
    if row['better'] in result['arms']:
        result['arms'][row['better']]['wins'] += 1
    result['cases'][case] = row
out.write_text(json.dumps(result, indent=1) + '\n')
for arm, t in result['arms'].items():
    print(arm, 'total', t['total'], 'of', 30 * len(mapping['cases']), 'wins', t['wins'], 'unshippable', t['unshippable'], t['by_criterion'])
for case, row in result['cases'].items():
    print(case, {a: row[a]['total'] for a in row if isinstance(row[a], dict)}, 'better:', row['better'])
