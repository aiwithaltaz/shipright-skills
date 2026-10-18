#!/usr/bin/env python3
"""Combine blind grades into per-arm scores.

Usage: python3 -I aggregate.py <grade-root> <out.md> [label]
Reads <grade-root>/key.json and <grade-root>/<case>/grader-N.json.
Per run: median of graders per area, then mean of 10 areas. Writes a markdown table and scores.json.
"""
import json, statistics, sys
from pathlib import Path

root, out = Path(sys.argv[1]), Path(sys.argv[2])
label = sys.argv[3] if len(sys.argv) > 3 else root.name
key = json.loads((root / "key.json").read_text())
table, ranks, notes = {}, {}, {}
for case, graders in key.items():
    per_arm = {}
    for g, labels in graders.items():
        f = root / case / f"{g}.json"
        if not f.exists():
            continue
        data = json.loads(f.read_text())["runs"]
        for lab, arm in labels.items():
            r = data.get(lab)
            if not r:
                continue
            per_arm.setdefault(arm, []).append(r)
    for arm, rs in per_arm.items():
        areas = {str(i): statistics.median(float(r["scores"][str(i)]) for r in rs) for i in range(1, 11)}
        table.setdefault(arm, {})[case] = {"areas": areas, "overall": round(statistics.mean(areas.values()), 2), "graders": len(rs)}
        ranks.setdefault(arm, {})[case] = statistics.median(r.get("rank", 0) for r in rs)
        notes.setdefault(case, {})[arm] = {"best": [r.get("best") for r in rs], "fix": [r.get("fix") for r in rs]}

arms = sorted(table)
cases = sorted(key)
lines = [f"# Scores: {label}", "", "Median of blind graders per area, mean of 10 areas per case.", "",
         "| Case | " + " | ".join(arms) + " |", "|---|" + "---:|" * len(arms)]
for c in cases:
    lines.append(f"| {c} | " + " | ".join(f"{table[a][c]['overall']:.2f}" if c in table[a] else "n/a" for a in arms) + " |")
lines.append("| **Release score** | " + " | ".join(
    f"**{statistics.mean(v['overall'] for v in table[a].values()):.2f}**" for a in arms) + " |")
lines += ["", "## By area (mean across cases)", "", "| Area | " + " | ".join(arms) + " |", "|---|" + "---:|" * len(arms)]
names = ["Research", "Concept", "Problem solving", "Features and scope", "Architecture", "Design system",
         "Visual / UI", "UX and access", "Interaction / motion", "Verification and honesty"]
for i, n in enumerate(names, 1):
    lines.append(f"| {i}. {n} | " + " | ".join(
        f"{statistics.mean(v['areas'][str(i)] for v in table[a].values()):.1f}" for a in arms) + " |")
lines += ["", "## Grader notes", ""]
for c in cases:
    lines.append(f"### {c}")
    for a in arms:
        n = notes.get(c, {}).get(a)
        if n:
            lines.append(f"- **{a}** best: {n['best'][0]}  \n  fix: {n['fix'][0]}")
    lines.append("")
out.write_text("\n".join(lines))
(out.with_suffix(".json")).write_text(json.dumps({"scores": table, "ranks": ranks, "notes": notes}, indent=2))
print("\n".join(lines[:len(cases) + 6]))
