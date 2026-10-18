# PR title

ShipRight 1.3: research to tested build (scores pending)

Do not use the plan's title, "ShipRight 1.3: research to tested build, beats Opus alone", until the win check is a real grade. That sentence is not true yet.

# PR body

## What this is

Draft 1.3. Not a release. The skill runs stages 0 to 10, keeps a record, and can write a case study and an opt-in pitch deck without inventing numbers. The site is rebuilt from that draft.

## Results table

| Check | Status |
| --- | --- |
| Sonnet + 1.3 beats Opus by 0.5 on every case | Pending. Runs are prepared, not started. |
| Release score 9.3 or more | Pending. No score in this PR. |
| c7 pain recall | Pending. No c7 1.3 run. |
| Haiku report | Pending. |
| Hidden cases h1 and h2 | Prompts prepared. Not started. |
| Variance on the two closest cases | Pending. The closest cases are unknown until grades exist. |
| Fix loop | Not started. No grader sentence to group. |

Baseline 1.2 screenshots exist for some arms. `evals/v2/results/baseline-1.2.md` says those arms are not graded. This PR does not turn them into a 1.3 result.

## Before and after

The site slider uses the owner's c6 screen and the baseline Sonnet shot of that case. The proof section uses c1, c2, and c3 baseline pairs. Captions say they are not grades. 1.3 section shots: `site/evidence/v1.3/`.

## What is not verified

- Any claim that 1.3 beats Opus.
- Taste. No fresh reviewer.
- Physical devices. The checks used software rendering.
- Deploy. `vercel.json` is unchanged. Nothing was published.

## How to review

1. Read `evals/v2/runs/release-1.3/RUN-GUIDE.md` and launch the Claude runs when you are ready. Do not invent a score before that.
2. Open `site/index.html` through the Vite build and look at 390 and 1280. Shots are already in `site/evidence/v1.3/`.
3. Open `site/case-study.html`. It is the c7 baseline only.
4. Say "merge it" only after the grades exist and you have looked at the screenshots.

Context before generate. Product before pixels.
