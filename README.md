# ShipRight

**Version 0.6.1-draft**
**Context before generate. Product before pixels.**

ShipRight helps AI design and coding tools follow your product decisions before generating UI.
It connects the user job, current phase, flows, screen layout and verification evidence.
It does not guarantee perfect designs or replace user testing.

## Start

1. Unzip this pack and keep the entire `shipright-skills/` folder together.
2. Make that folder readable by your tool. Start with the matching skill path below.
3. Supply your task, current phase and existing screen/docs when available. The skill asks only material missing questions.

| Task | Entry file |
| --- | --- |
| Frame an idea or define a flow | [product-design](skills/product-design/SKILL.md) |
| Design a screen or apply exact visual feedback | [ui-ux-design](skills/ui-ux-design/SKILL.md) |
| Review an existing artifact | [ux-critique](skills/ux-critique/SKILL.md) |
| Check a launch or specific release item | [ship-check](skills/ship-check/SKILL.md) |

Example for a local coding tool:

> Read shipright-skills/skills/ui-ux-design/SKILL.md and its required references. Our current phase is registration. Apply this feedback exactly: [changes]. Preserve the existing design system. Keep later ideas out of the UI.

Use the actual unpacked path if different. Keep `_shared`, references, docs and personal-taste available at their original relative locations.
A single pasted SKILL.md is incomplete; its fallback rules do not reproduce the full pack.
Do not copy this pack's AGENTS.md into your app. It is for maintaining ShipRight itself.

## Tool setup

Claude Code, Cursor and Codex can read the local Markdown pack when it is available in their workspace.
For automatic skill discovery, use the current client's supported registration method and point it to the canonical skill files.
Avoid separate edited copies for each client. Symlink handling and sandbox access vary; confirm references resolve in your client.
For a design tool without local file access, provide the whole pack through its supported file/project context mechanism.
Claude Design ingestion and all native client installs have not been verified for this release. Manual file-based use is the portable route.

## What changes in 0.6

- Exact feedback becomes keep/remove/change/add instructions with acceptance checks.
- Current-phase scope controls every visible element. Later ideas stay in notes, not UI.
- Intake asks 0-5 questions total before starting; clear tasks need none.
- Existing identity and components are preserved. Brand values, data and features are never invented.
- Flow feedback uses the operator's language and hides routine system plumbing.
- Layout, selection, pending work and accessibility have concrete checks.
- Shorter skill entries load detailed references only when relevant.
- 0.6.1-draft restores concrete icon, placement and question-card rules, and moves the IVC corrections into the example.

## Requested outputs

A small fix gets a small response. A full project can use PRODUCT.md, DESIGN.md and the templates under docs/.
Other project documents normally live under docs/shipright/. Reuse existing equivalents.
A request to write authorizes the requested files. Read before updating and preserve unrelated content.
The pitch and full launch report are optional. Readiness never authorizes deployment, publication or payment.

## Evidence

Reviews distinguish specifications, visible designs and exercised implementation.
Checks use Pass, Fail, Not verified or Not applicable with a reason. A ticket does not resolve a failure.

Run source validation from the unpacked folder:

```bash
python3 evals/check_sources.py
python3 evals/check_sources.py --self-test
```

See [0.6 evaluation evidence](evals/v0.6/results.md). Source checks and controlled trials do not establish cross-model or client performance.
The [IVC example](examples/ivc-2026-registration/README.md) is historical and includes documented defects and evidence limits.
Do not use its prototype or training candidates as current approved implementation guidance.

## Optional preferences and map

[Altaz's profile](personal-taste/altaz.md) is active only when selected. It cannot change scope or override approved identity.
[skills.md](skills.md) routes tasks. [architecture.md](architecture.md) explains file ownership and loading.
[CHANGELOG.md](CHANGELOG.md) records the release. Names and original paths are retained.

MIT license for the pack. Example brand assets retain their existing ownership notices.
