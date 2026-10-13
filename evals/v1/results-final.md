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

Pending: one fresh 3D run with the fixed pack, graded blind against the same frozen baseline.

## Measured (current checker, both arms)

| Case | Reply words, baseline to v1.0 | Build pack words | check-ui FAIL |
| --- | --- | --- | --- |
| SaaS dashboard | 605 to 300 | 10,176 to 7,777 | 0 to 0 |
| Mobile form flow | 840 to 315 | 10,394 to 8,150 | 0 to 0 |
| Marketing site | 653 to 321 | 9,379 to 7,209 | 0 to 2 (hidden content) |
| 3D product site | 801 to 282 | 7,972 to 7,559 | 0 to 3 (hidden content, overflow) |

## Limits

One run per case. Graders and builders are the same model family, and graders vary by about one point per case. The trial prompt forbids running the checker, so the look-and-fix loop that would have caught the hidden content was not exercised (D16). The v1.0 documents name build-pack, which a grader could notice. Synthetic prompts are not user research.
