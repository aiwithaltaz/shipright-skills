# v1 trial after Phase 3

Date: 2026-10-13. Protocol, cases and rubric: [README.md](README.md), frozen before any v1.0 skill edits.
Arms: baseline (main 8233744, frozen in Phase 1) and phase-3 (branch commit 20f0a20). One fresh run per case per arm.
Graders: four fresh agents, one per case, saw anonymous A/B folders in seeded random order. The mapping was opened only after all four grade files existed. The root agent did not score.
Raw runs: [runs/baseline](runs/baseline/), [runs/phase-3](runs/phase-3/). Raw grades and mapping: [grades/phase-3-trial](grades/phase-3-trial/).

## Scores (0 to 3 per criterion, 30 per case)

| Case | Baseline | Phase 3 | Better (grader) |
| --- | ---: | ---: | --- |
| SaaS dashboard | 25 | 27 | Phase 3 |
| Mobile form flow | 25 | 28 | Phase 3 |
| Marketing site | 21 | 27 | Phase 3 |
| 3D product site | 23 | 25 | Phase 3 |
| **Total** | **94 / 120** | **107 / 120** | 4 of 4 |

| Criterion (sum of 4 cases, max 12) | Baseline | Phase 3 | Change |
| --- | ---: | ---: | ---: |
| 1 Hierarchy | 10 | 11 | +1 |
| 2 Spacing and alignment | 9 | 8 | -1 |
| 3 Dense but calm | 9 | 11 | +2 |
| 4 No slop | 9 | 11 | +2 |
| 5 Type and color | 11 | 12 | +1 |
| 6 States and flows | 9 | 9 | 0 |
| 7 Mobile and access | 9 | 9 | 0 |
| 8 Motion and 3D fit | 12 | 12 | 0 |
| 9 Build pack completeness | 9 | 12 | +3 |
| 10 Ticket actionability | 7 | 12 | +5 |

Hard floor: no run in either arm was marked unshippable.

## Measured

| Case | Reply words, baseline to Phase 3 | Build pack words | check-ui FAIL / WARN |
| --- | --- | --- | --- |
| SaaS dashboard | 605 to 305 | 10,176 to 7,108 | 0/1 to 0/1 |
| Mobile form flow | 840 to 293 | 10,394 to 7,248 | 0/0 to 0/0 |
| Marketing site | 653 to 300 | 9,379 to 7,851 | 0/1 to 0/1 |
| 3D product site | 801 to 341 | 7,972 to 6,590 | 0/3 to 0/1 |

Checker counts use the WCAG-aligned target rule (CONTEXT.md D19) for both arms. The first checker version had reported 2 FAIL for the baseline dashboard.

## Pass bar

Met. The new arm beats baseline on the Phase 2 and 3 targets (criteria 3, 4, 9, 10). No criterion drops by 1 or more on average (spacing drops 0.25 per case). Reply and pack length fell, not rose. Hard-floor failures did not increase.

## What graders still want fixed

- Preview pages showed failure text in the default view (baseline marketing: error boxes on load; Phase 3 3D: a visible "Try again").
- Spacing details: a budget meter without a fixed-width slot; a narrow desktop column kept under 760px; controls outside the container.
- The 3D hero used "[Speaker name]" and "[Price]" brackets: honest, but it reads unfinished. A labeled working name reads better.

## Limits

One run per case per arm. Graders and builders are the same model family. The trial prompt forbids running the checker, so the v1 look-and-fix loop was not exercised (D16). The phase-3 arm's documents name build-pack, which a grader could notice. Synthetic prompts are not user research. Screenshots and check-ui do not prove real usability or full accessibility.
