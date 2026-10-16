#!/usr/bin/env python3
"""Create clean run folders for one eval phase.

Usage: python3 -I prepare.py <repo> <work> <phase> [arms...]
Creates <work>/<phase>/pack (installed-skill snapshot), <work>/vendor and
<work>/<phase>/<case>/<arm>/ with case attachments copied in.
"""
import json, shutil, subprocess, sys
from pathlib import Path

repo, work, phase = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3]
arms = sys.argv[4:] or ["haiku-sr", "sonnet-sr", "opus-plain"]
cases = json.loads((repo / "evals/v2/cases.json").read_text())["cases"]
root = work / phase
root.mkdir(parents=True, exist_ok=True)

# Installed-skill snapshot: exactly what `npx skills add` copies (the skill folder).
pack = root / "pack"
if pack.exists():
    shutil.rmtree(pack)
shutil.copytree(repo / "skills/shipright", pack / "shipright")
(root / "pack-commit.txt").write_text(
    subprocess.run(["git", "-C", str(repo), "rev-parse", "HEAD"], capture_output=True, text=True).stdout)

vendor = work / "vendor"
if not vendor.exists():
    shutil.copytree(repo / "evals/v1/vendor", vendor, ignore=shutil.ignore_patterns("README.md"))

for case in cases:
    for arm in arms:
        d = root / case["id"] / arm
        d.mkdir(parents=True, exist_ok=True)
        for a in case.get("attachments", []):
            shutil.copy(repo / "evals/v2/cases" / a, d / a)
print(f"prepared {len(cases)} cases x {len(arms)} arms in {root}")
