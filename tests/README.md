# Skill dry-runs

These checks compare written skill behavior. They are not a model benchmark and they do not prove a client install.

Say who scored the run, which pack version they read, and the date.
Do not edit an older report so the new score looks better.

## Prompts

Copy the raw prompts in [prompts.md](prompts.md).
Two ideas: a small-business booking app, and an internal order desk.
Run all four skills. Do not carry one skill's answer into the next skill.

## Rubric

Score each skill on each idea. Five checks, 0 to 2. Skill max is 20. Pack max is 80.

| Check | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Q. Questions | More than 5, or none when the idea is still vague | Right topic, missing examples or Let me decide | 0 when the task is already clear, otherwise 3 to 5 cards with an example and Let me decide |
| S. Stop | Full docs, flows, or a finished screen arrive before the frame | Questions and a large draft in the same reply | Cards only on a vague idea, then the real work. No extra stop after each file |
| D. Deliverable | Wrong artifact for that skill | Partial | Product frame and requested docs, a screen spec, a critique, or launch evidence |
| U. Invention | New features, people, metrics, quotes, or legal text | A few extras | Only the current job. Unknown stays Unknown |
| F. Format | No shape a later run can match | Some of the shape | Decision cards, four statuses, or a finding with location, severity, correction, and retest |

A clear fix may score 2 on Q with zero questions. That is correct.
Write the first reply you would actually send, then the score, then one sentence on the weak spot.

## Reports

### Phase 1 research

Run `python3 tests/test_phase1_research.py` after the normal source check and mutation self-test.
Cases and rubric live in evals/phase-1-ux-research/. Record raw responses before scoring.
Fresh agents receive only the applicable skill, raw task and relevant artifacts, not the rubric or expected answers.
Baseline/after reports identify the run, scorer and limits; do not overwrite older evidence.
Screenshots use `python3 tests/capture_phase1.py --browser /path/to/chrome`.
If no browser is available, explicitly use `--renderer weasyprint` with WeasyPrint,
Pillow and pdftoppm installed. Label its output print-rendered illustrations, not browser screenshots.
They illustrate authored research output, not observed user behavior or benchmark results.
The existing 0.6.2 capture scripts and historical fixtures remain unchanged.

Before editing skills, write `tests/reports/YYYY-MM-DD-baseline.md`.
After editing, write `tests/reports/YYYY-MM-DD-after.md` with the same rubric.
Keep both files.

## Before and after screenshots

Do this for visual instruction changes. Architecture-only context-budget maintenance uses nonvisual checks below; no screenshots, HTML fixtures or before/after images are required.

1. Pick one test idea.
2. Build the same screen twice, at phone width 390 by 844 or a normal desktop width. Once as the old skill would allow it. Once as the new skill would allow it.
3. Both sides need real layout, spacing, and a named font. The before side should look like polished generic UI: a gradient, invented stats, two competing buttons, unlabeled fields. The after side should show the task: clear hierarchy, labeled fields, one primary action.
4. If the skill's output is questions, a critique, or a check list, render that as a card or chat screen. Do not paste plain text.
5. Save the pages under `tests/fixtures/<version>/<skill>/before.html` and `after.html`.
6. Screenshot each. Save `examples/before-after/<version>/<skill>/before.png` and `after.png`.
7. Build `compare.png` in that same folder, before and after side by side, narrow enough that a README does not shrink the type away.
8. Open every PNG and look at it. If type fell back to the browser default, or spacing collapsed, the CSS did not apply. Fix it before you commit.
9. Link the pair, and the side-by-side image, from the CHANGELOG entry and from the README section `How it improved`.
10. Add a new version folder. Do not replace older screenshots.
11. Use sample labels. The after screen must not invent ratings, quotes, prices, customers, or legal pages.

Capture command, from the pack root:

```bash
sh tests/capture.sh 0.6.2
```

The script writes the HTML, screenshots it with headless Chrome, and builds the side-by-side images.
State in the after report that the screenshots illustrate the written rules. They are not a second model's output.

Save examples/before-after/ only after the PNG files exist. README links must resolve.

## Context-budget maintenance

Install and run all required checks from the pack root:

```bash
python3 -m pip install -r evals/requirements-context.txt
python3 evals/check_sources.py --self-test
python3 evals/check_context.py
python3 -m unittest discover -s tests -p 'test_*.py'
git diff --check
```

The standard-library source checker also runs link/orphan/loading-policy structure checks. The separate required token checker fails when its pinned dependency or encoding is unavailable. CI runs both and all regression tests. Word counts remain informational except for the retained entry concision check.

[Migration protocol](../evals/context-budget-migration/protocol.md) defines boundary checks and loading trials. Preserve old reports and failures unchanged. Structural checks verify explicit loading conditions, not their semantic relevance. Fresh loading smoke tests do not prove every agent/client follows them. Keep canonical ownership documented; do not add complex duplicate-content detection. No visual artifacts for this migration.

## Phase 2 synthesis

Run `python3 tests/test_phase2_synthesis.py` or normal unittest discovery after both required checkers. Preserve all Phase 1 protections; its old deferral test now rejects unsupported personas/findings under the new optional owner. [Protocol](../evals/phase-2-research-synthesis/protocol.md) and [rubric](../evals/phase-2-research-synthesis/rubric.md) were frozen before trials. Synthetic inputs are not performed research. Compare frozen main and Phase 2 using identical prompts, fresh isolated trials and blind grading; preserve outputs/failures and disclose limitations. No visual artifacts for this phase.

## Phase 3 information architecture

Run `python3 tests/test_phase3_ia.py` or unittest discovery with both required checkers. Protect optional/direct loading, sourced objects/relationships/routes/categories, actual capabilities, direct-entry/retrieval boundaries and honest unperformed studies. [Protocol](../evals/phase-3-information-architecture/protocol.md) and [rubric](../evals/phase-3-information-architecture/rubric.md) precede trials. Synthetic cases are not research or security validation. Keep historical evidence and known failures unchanged. No visual artifacts or Phase 4.

## Phase 4 journeys and service blueprints

Run `python3 tests/test_phase4_mapping.py` or unittest discovery with both required checkers. Protect optional/direct loading, one-map selection, evidence/state separation, no invented emotions/processes, real handoffs and isolated risks. [Protocol](../evals/phase-4-journeys-blueprints/protocol.md) and [rubric](../evals/phase-4-journeys-blueprints/rubric.md) were frozen before implementation/trials. Preserve exact replies, all grades, historical records and correction. Synthetic checks do not establish real service usability, accessibility, safety or runtime behavior. No visual artifacts or Phase 5.

## Phase 5 design systems

Run `python3 tests/test_phase5_design_systems.py` or unittest discovery with both required checkers and the mutation self-test. Preserve all earlier evidence and safeguards. The [protocol](../evals/phase-5-design-systems/protocol.md), [raw tasks and artifacts](../evals/phase-5-design-systems/inputs.json), and [rubric](../evals/phase-5-design-systems/rubric.md) are frozen before edits/trials. Test optional selection/foundations/governance, source-grounded reuse, authority, naming, scope, imagery/density, existing schema and icon exceptions.

For this phase, compare actual independently generated outputs from identical frozen tasks. Do not apply the illustrative Step 3 recipe above to create an artificially poor baseline. Save complete unchanged generated HTML, hashes, screenshot settings and exact responses. Render comparable desktop/narrow screens and inspect actual images. An authored illustration or print renderer must be labeled separately; never call it observed model output or browser behavior. Report preview navigation/focus/overflow observations separately from prose scores. These previews do not prove real usability or full accessibility. Do not tune the guidance or rubric after replies; preserve first grades and any separate factual adjudication. No merge or Phase 6/7.

## Phase 5.1 design system first

Run `python3 tests/test_phase5_amendment.py` with the same checkers. Keep the frozen Phase 5 trial files unchanged. The new phone-width pair under `examples/before-after/phase-5-1-amendment/ui-ux-design/` is an authored illustration of the written rules, not a second model and not the frozen Phase 5 captures. The IVC frames under `examples/ivc-2026-registration/figma-redesign/` record the observed desk layouts. Exact pixel values stay pending from Altaz.
