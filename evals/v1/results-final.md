# v1 final trial

Date: 2026-10-13. Same frozen protocol, cases and rubric as [README.md](README.md).
Arms: baseline (main 8233744, frozen run from Phase 1) and v1.0 (release candidate 9965c44). One fresh v1.0 run per case (decision D20: Altaz asked to save credits; the plan had said two).
Graders: four fresh agents, anonymous A/B folders, seeded random order (seed 20261014). Mapping opened after all grades existed. The root agent did not score.
Raw runs: [runs/v1.0](runs/v1.0/). Raw grades and mapping: [grades/final-trial](grades/final-trial/).

## Scores (0 to 3 per criterion, 30 per case)

| Case | Baseline | v1.0 | Better (grader) |
| --- | ---: | ---: | --- |
| SaaS dashboard | 24 | 29 | v1.0 |
| Mobile form flow | 24 | 29 | v1.0 |
| Marketing site | 22 | 28 | v1.0 |
| 3D product site | 23 | 19, **unshippable** | Baseline |
| **Total** | **93 / 120** | **105 / 120** | v1.0 in 3 of 4 |

| Criterion (sum of 4 cases, max 12) | Baseline | v1.0 | Change |
| --- | ---: | ---: | ---: |
| 1 Hierarchy | 10 | 11 | +1 |
| 2 Spacing and alignment | 9 | 9 | 0 |
| 3 Dense but calm | 8 | 10 | +2 |
| 4 No slop | 10 | 12 | +2 |
| 5 Type and color | 11 | 12 | +1 |
| 6 States and flows | 9 | 10 | +1 |
| 7 Mobile and access | 8 | 8 | 0 |
| 8 Motion and 3D fit | 12 | 10 | -2 |
| 9 Build pack completeness | 9 | 11 | +2 |
| 10 Ticket actionability | 7 | 12 | +5 |

The baseline's own scores differ slightly from the Phase 3 trial (93 vs 94) because a different grader scored the same frozen outputs. That is grader variance, not a change in the baseline.

## The 3D regression

The v1.0 3D page hid its Specs and Buy sections until a scroll animation ran, so they were invisible at load and in the full-page screenshot. It also scrolled 3px sideways at 390px and showed "Try again" and "Open 3D view" outside their states. The grader marked it unshippable.
Cause: the Phase 4 motion guidance allowed section entrances that started from opacity 0. The Phase 3 runs, made before that guidance, did not hide content.
This fails the pass bar ("hard-floor failures must not increase") for the release candidate as tested.

Fix (commit 462d445): entrances never start content invisible; fallback controls appear only in their state; check-ui gained a hidden-content FAIL. Re-measured with it, the v1.0 marketing and 3D pages fail hidden-content, and no baseline or Phase 3 page does.

## 3D re-check after the fix

One fresh 3D run with the fixed pack (462d445), graded blind by a new grader against the same frozen baseline output (seed 20261015). Raw: [runs/v1.0-fix](runs/v1.0-fix/), [grades/final-3d-recheck](grades/final-3d-recheck/).

| | Baseline | v1.0 after fix |
| --- | ---: | ---: |
| 3D product site | 23 | 26 |
| Unshippable | No | No |
| check-ui FAIL | 0 | 0 |

The grader preferred the fixed run: Buy in the hero, a fuller page and paste-ready tickets. Its top fix: mark the feature copy as sample until the owner confirms it.
With this re-check in place of the failed 3D run, the four cases total **112 / 120 for v1.0 against 93 / 120 for baseline**, four of four better, no unshippable runs.
## Marketing re-run after the fix

Requested by Altaz before merge. One fresh marketing run with the same fixed pack (462d445). Checked with check-ui only; not graded. Raw: [runs/v1.0-fix/marketing-site](runs/v1.0-fix/marketing-site/).

| Check | Final trial run | Re-run after fix |
| --- | --- | --- |
| hidden-content | FAIL (2) | **Pass** (0 at 1280 and 390) |
| overflow at 390px | Pass | **FAIL**, 158px |
| touch targets under 44px | WARN | WARN (7) |

The motion fix worked: no content is hidden at load. The re-run has a new, separate defect: its "How the beta works" section keeps a 12-column grid with 48px gaps on a phone, which needs 528px. After this, layout-and-hierarchy.md and the editorial starter system require multi-column grids to collapse to one column below 760px, with `minmax(0, 1fr)` tracks and `min-width: 0` on text flex children. The look-and-fix loop (run check-ui, fix every FAIL) would catch this overflow in normal use; the trial prompt forbids it (D16).

## Marketing re-run with the grid rule

Requested by Altaz after the previous re-run. One fresh marketing run from a pack copy of commit 3fa2470, which includes the grid-collapse rule. Same frozen prompt and harness. Checked with check-ui and by opening the full-page phone screenshot; not graded. Raw: [runs/v1.0-grid/marketing-site](runs/v1.0-grid/marketing-site/).

| Check | Final trial run | Re-run after motion fix | Re-run with grid rule |
| --- | --- | --- | --- |
| hidden-content, 1280 and 390 | FAIL (2) | Pass | **Pass** (0 and 0) |
| overflow, 1280 and 390 | Pass | FAIL at 390, 158px | **Pass** (0px and 0px) |
| page errors | 0 | 0 | 0 |
| touch targets under 44px | WARN | WARN (7) | WARN (1) |
| check-ui totals | 2 FAIL, 1 WARN | 1 FAIL, 1 WARN | **0 FAIL, 1 WARN** |

In the phone screenshot the four steps stack in one column and every section is visible. The one remaining warning is a single control under 44px.
This is one run. It shows the grid rule fixed this overflow in this case; it is not a score, and the run was not blind-graded. Its pack is 8,711 words; two documents run over their word budgets (the frontend spec by about double), so word-budget compliance is not yet reliable.

## Measured (current checker, both arms)

| Case | Reply words, baseline to v1.0 | Build pack words | check-ui FAIL |
| --- | --- | --- | --- |
| SaaS dashboard | 605 to 300 | 10,176 to 7,777 | 0 to 0 |
| Mobile form flow | 840 to 315 | 10,394 to 8,150 | 0 to 0 |
| Marketing site | 653 to 321 | 9,379 to 7,209 | 0 to 2 (hidden content) |
| 3D product site | 801 to 282 | 7,972 to 7,559 | 0 to 3 (hidden content, overflow) |
| 3D re-check after fix | 801 to 311 | 7,972 to 11,432 | 0 to 0 |

The re-check pack is longer because it added an HTML copy of the preview inside the pack; the Markdown documents alone are shorter. The pack contract does not ask for that file.

## Limits

One run per case. Graders and builders are the same model family, and graders vary by about one point per case. The trial prompt forbids running the checker, so the look-and-fix loop that would have caught the hidden content was not exercised (D16). The v1.0 documents name build-pack, which a grader could notice. Synthetic prompts are not user research.
