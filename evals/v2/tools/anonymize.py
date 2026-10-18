#!/usr/bin/env python3
"""Make blind grading folders: one per case per grader, runs under shuffled labels.

Usage: python3 -I anonymize.py <work>/<phase> <grade-root> [graders=3] [seed=0]
Copies reply.md, questions.md, other .md docs (any depth, flattened), shots/ and render.json.
Removes pack and tool names from text. Writes the label key to <grade-root>/key.json (never shown to graders).
"""
import json, random, re, shutil, sys
from pathlib import Path

phase, out = Path(sys.argv[1]), Path(sys.argv[2])
graders = int(sys.argv[3]) if len(sys.argv) > 3 else 3
rng = random.Random(int(sys.argv[4]) if len(sys.argv) > 4 else 0)
SCRUB = re.compile(r"ship\s*right|shipright|check-ui(\.mjs)?|build-pack|ux-critique|ui-ux-design|product-design|ship-check|"
                   r"haiku|sonnet|opus|claude", re.I)
key = {}
for case in sorted(p for p in phase.iterdir() if p.is_dir() and p.name != "pack"):
    arms = sorted(p.name for p in case.iterdir() if p.is_dir())
    for g in range(1, graders + 1):
        labels = ["X", "Y", "Z", "W"][: len(arms)]
        order = arms[:]
        rng.shuffle(order)
        gdir = out / case.name / f"grader-{g}"
        if gdir.exists():
            shutil.rmtree(gdir)
        for label, arm in zip(labels, order):
            src, dst = case / arm, gdir / label
            (dst / "docs").mkdir(parents=True)
            for md in src.rglob("*.md"):
                if "node_modules" in md.parts:
                    continue
                name = md.name if md.parent == src else "docs/" + "__".join(md.relative_to(src).parts)
                (dst / name).write_text(SCRUB.sub("[tool]", md.read_text(errors="ignore")))
            if (src / "shots").exists():
                shutil.copytree(src / "shots", dst / "shots")
            if (src / "render.json").exists():
                shutil.copy(src / "render.json", dst / "render.json")
            key.setdefault(case.name, {})[f"grader-{g}"] = dict(zip(labels, order))
out.mkdir(parents=True, exist_ok=True)
(out / "key.json").write_text(json.dumps(key, indent=2))
print("blind folders ready:", out)
