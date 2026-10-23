# shipright-audit benchmark

Does `shipright-audit` find more real UX problems than a model alone, or than a smart prompt? This folder answers that with numbers anyone can rerun.

Method (same shape as Ponytail's benchmark): fixed apps with answer keys, 3 models, 3 arms, several runs each, blind grading, median reported.

## What is here

| Path | What it is |
|---|---|
| `cases.json` | The frozen cases and the exact user message for each |
| `cases/s1-pawsh-grooming/app` | Seeded app: a dog groomer's booking site. 20 planted pains, 5 planted Keeps |
| `cases/s2-harvest-volunteers/app` | Seeded app: a food bank's volunteer shift tool. 20 planted pains, 5 planted Keeps |
| `../v2/cases/c7-ivc-app/app` | Real app: the IVC registration desk, with the owner's real review (20 pains, 3 Keeps) |
| `skill/shipright-audit/` | The skill under test (candidate). It lives here until the sub-skill split is approved, because the repo's guards allow only `skills/shipright` as an installable skill |
| `answer-keys/` | One JSON key per case. **Never copy these into a run folder.** |
| `arms/run-prompt.md` | The exact run prompt and the 3 arms |
| `grader/grader-prompt.md` | The exact grader prompt |
| `tools/verify-seeds.mjs` | Proves every planted pain and Keep still exists in s1 and s2 |
| `tools/prepare.mjs` | Makes one folder per run with the app, the skill (skill arm only) and the prompt |
| `tools/blind.mjs` | Copies finished runs into a blind folder with random codes and tool names removed |
| `tools/score.mjs` | Turns grades into the results table for the README |

## The 3 arms

| Arm | What the model gets |
|---|---|
| `a-plain` | The user's message only |
| `b-careful` | The message plus a strong one-paragraph audit prompt (see `arms/run-prompt.md`) |
| `c-skill` | The message plus `shipright-audit` installed |

Arm b matters most. A skill that only beats "no prompt" is not worth installing.

## Metrics

| Metric | Meaning |
|---|---|
| Pain recall | (Found + 0.5 x Partly) / pains in the key. The headline number. |
| Precision | (Matched + extra real problems) / problems reported. Catches padding and invented problems. |
| Keep recall | Keeps named / Keeps in the key. |
| False keeps | Known pains the review called good. Should be 0. |
| Evidence | Share of reported problems that name a screen or element. |
| Severity match | Found pains rated within 1 level of the key's severity. |

Graders only label (Found, Partly, Missed, counts). `score.mjs` does all the math, so graders cannot inflate a score with bad arithmetic. A missing or unknown label counts as Missed.

## How to run

```bash
# 0. After any edit to a seeded app: prove the keys still match (must print "57 of 57 checks pass")
node evals/audit/tools/verify-seeds.mjs

# 1. Make the run folders (default: all cases, haiku/sonnet/opus, 3 arms, 3 runs = 81 runs)
node evals/audit/tools/prepare.mjs ~/audit-runs smoke-1 --runs 1        # start small: 27 runs
#    Then open ~/audit-runs/smoke-1/LAUNCH.md. One fresh session per row; paste PROMPT.md; use the model shown.
#    Opus runs use high effort. Each run writes reply.md (and any other files) into its own folder.

# 2. Blind them
node evals/audit/tools/blind.mjs ~/audit-runs/smoke-1 ~/audit-grades/smoke-1
#    Then one fresh grader per GRADE-PROMPT.md. Use a different model family from the runs when you can.

# 3. Score
node evals/audit/tools/score.mjs ~/audit-grades/smoke-1 --label smoke-1
#    Writes results/smoke-1.md and results/smoke-1.json
```

Requirements: Node 18 or later. `verify-seeds.mjs` also needs Playwright with Chromium.

## Rules

1. **Keys before runs.** All three keys were written before any run. Never edit a key after seeing results.
2. **Freeze per release.** Cases, messages, apps and keys stay fixed for a release. New cases go into the next version.
3. **Runs never see keys.** `prepare.mjs` copies only the app (and the skill for arm c).
4. **Blind grading.** Graders see random codes. `.map.json` stays away from them.
5. **Report losses.** `score.mjs` lists every case and model where the skill scored lower than another arm. Those lines go in the README too.

## Known bias (read before quoting numbers)

- **The seeded apps (s1, s2) were written by the same author as the skill**, after the skill. The planted pains are common real-world problems, but they likely lean toward what the skill checks. Expect the skill to look better on s1 and s2 than it really is.
- **c7 is the fairest case.** Its key is the owner's real review, written before this skill existed.
- **Next step for a fair headline:** add 2 hidden seeded cases written by someone who has not read the skill (for example a fresh model given only the case brief and the cause list). Keep them private until a release. A drop of more than 10 points in pain recall on hidden cases means the skill is tuned to its own tests.
- Until hidden cases exist, quote c7 as the headline and show s1 and s2 as supporting numbers.

## Results

None yet. Numbers are added only from real graded runs.
