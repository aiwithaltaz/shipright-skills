#!/usr/bin/env python3
"""Check canonical pack metadata, local references and stable check IDs.

Standard library only. This checks source integrity, not skill behavior or
installation compatibility. Run from any directory: python3 evals/check_sources.py
"""

import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors = []
references = set()
skills = {"product-design": 8, "ui-ux-design": 10, "ux-critique": 10}

for name, count in skills.items():
    path = ROOT / "skills" / name / "SKILL.md"
    source = path.read_text()
    frontmatter = re.match(r"\A---\n(.*?)\n---\n", source, re.S)
    if not frontmatter:
        errors.append(f"{name}: missing frontmatter")
        continue
    fields = dict(re.findall(r"^(name|description): (.+)$", frontmatter[1], re.M))
    if fields.get("name") != name:
        errors.append(f"{name}: frontmatter name does not match folder")
    try:
        description = json.loads(fields["description"])
        if not isinstance(description, str) or not 1 <= len(description) <= 1024:
            raise ValueError("expected a description of 1–1024 characters")
        if not description.startswith("Use this when"):
            raise ValueError("missing task trigger")
    except (KeyError, ValueError) as exc:
        errors.append(f"{name}: invalid description: {exc}")
    # The actual criterion table has numbered rows; exclude template fences.
    prose = re.sub(r"```.*?```", "", source, flags=re.S)
    ids = [int(n) for n in re.findall(r"^\| (\d+) \|", prose, re.M)]
    if ids != list(range(1, count + 1)):
        errors.append(f"{name}: expected stable IDs 1–{count}, got {ids}")
    for shared in ("intake.md", "operating-contract.md"):
        if f"(../_shared/{shared})" not in source:
            errors.append(f"{name}: missing shared reference to {shared}")

for path in sorted((ROOT / "skills").rglob("*.md")):
    source = path.read_text()
    targets = re.findall(r"\[[^\]]+\]\(([^)]+)\)", source)
    targets += re.findall(r"`((?:references/|(?:\.\./)+)[^`\s]+)`", source)
    for target in targets:
        if re.match(r"[a-z][a-z0-9+.-]*:|#", target, re.I):
            continue
        target = target.split("#", 1)[0]
        if not target or "*" in target:
            continue
        resolved = (path.parent / target).resolve()
        references.add((str(path.relative_to(ROOT)), target))
        if not resolved.is_relative_to(ROOT) or not resolved.exists():
            errors.append(f"{path.relative_to(ROOT)}: unresolved pack reference {target}")

# Change set 2: inline core rules, optional references, verdict vocabulary,
# and no stale publication status outside history files.
optional_refs = {
    "product-design": ["opportunity-research.md", "operational-flows.md", "doc-set.md"],
    "ui-ux-design": [
        "references-and-design-system.md",
        "build-handoff.md",
        "operator-workspaces.md",
        "ui-copy.md",
    ],
    "ux-critique": ["bounded-verification.md", "requirements-and-feedback.md", "plan-review.md"],
}
for name, refs in optional_refs.items():
    source = (ROOT / "skills" / name / "SKILL.md").read_text()
    if "Core rules if `../_shared` is unreachable" not in source:
        errors.append(f"{name}: missing inline core rules")
    for ref in refs:
        if f"references/{ref}" not in source:
            errors.append(f"{name}: SKILL.md does not point to references/{ref}")

contract = (ROOT / "skills" / "_shared" / "operating-contract.md").read_text()
for phrase in ("Needs decision", "Severity follows criticality", "## Output shape"):
    if phrase not in contract:
        errors.append(f"operating-contract.md: missing '{phrase}'")
if "## Depth" not in (ROOT / "skills" / "_shared" / "intake.md").read_text():
    errors.append("intake.md: missing depth selector")

stale = re.compile(r"unreleased|do not publish, do not commit|Lock context|mandatory context|locked docs", re.I)
for path in sorted(ROOT.rglob("*.md")):
    rel = path.relative_to(ROOT)
    if rel.parts[0] in ("evals", ".git") or rel.name == "CHANGELOG.md":
        continue
    for lineno, line in enumerate(path.read_text().splitlines(), 1):
        if stale.search(line):
            errors.append(f"{rel}:{lineno}: stale status or 'lock' wording")

if errors:
    print("FAIL\n" + "\n".join(errors))
    sys.exit(1)
optional_count = sum(len(refs) for refs in optional_refs.values())
print(f"PASS: 3 skill metadata records; stable 8/10/10 check IDs; "
      f"{len(references)} local references; shared intake/contract links; "
      f"inline core rules; {optional_count} optional references linked; no stale status wording.")
print("Canonical source check only; client installs and behavior need separate evidence.")
