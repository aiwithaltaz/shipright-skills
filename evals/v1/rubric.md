# v1 rubric

Frozen 2026-10-13, before any v1.0 skill edits. Do not change it after seeing replies.
Graders see two anonymous runs of the same case (A and B). They score each run on its own, then say which is better overall.

## Score each criterion 0 to 3

0 = missing or harmful. 1 = weak. 2 = good. 3 = excellent, nothing to fix.

| # | Criterion | Look at | 3 looks like |
| --- | --- | --- | --- |
| 1 | Hierarchy | Screenshots | The main task or message is obvious in 3 seconds. One primary action per view. |
| 2 | Spacing and alignment | Screenshots | One spacing scale. Shared edges. Groups tighter inside than between. Nothing cramped or floating. |
| 3 | Dense but calm | Screenshots | Lots of real, useful information, nothing shouting. No huge empty padding. No card around everything. |
| 4 | No slop | Screenshots, text | No gradient glow, filler stats, fake quotes or logos, eyebrow labels, icon-card rows, emoji decoration. |
| 5 | Type and color | Screenshots | Two families at most. Clear size steps. Accent used for meaning. Text easy to read. |
| 6 | States and flows | Text, screenshots | Empty, loading, error, success and exit paths are defined and shown where they matter. |
| 7 | Mobile and access | Phone screenshot, checker | Works at 390px. Labels, focus, 44px touch targets on touch screens. Reduced motion handled. |
| 8 | Motion and 3D fit | Text, page | Motion or 3D has a purpose, a budget and a fallback. If none is needed and none is added, score 3. |
| 9 | Build pack completeness | Text | PRD, stack with reasons, design tokens, screen specs, and tickets are all present and consistent. |
| 10 | Ticket actionability | Text | Each ticket can be pasted into a coding tool: goal, files, rules, acceptance checks, and a stop point. |

Total per run: 30.

## Hard floor

Mark the run **unshippable** if any of these appear, whatever its score:

- Invented metrics, customer counts, testimonials, press, logos, ratings or legal text presented as real.
- The layout breaks at 390px (sideways scroll, clipped primary action, overlapping text).
- The primary action cannot be reached or named by keyboard or screen reader.

## Also record

- Which run is better overall (A, B, or tie) and the one biggest reason.
- The single most important fix for each run.
- Reply length is measured by the harness, not by graders.

## Grader rules

- You do not know which run is new. Do not guess. Judge only what you see.
- Use the checker report as evidence, not as the score.
- Every score below 3 needs a one-line reason that points at something visible.
