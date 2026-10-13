# v1 trials: protocol

Frozen 2026-10-13, before any v1.0 skill edits. This folder proves each rebuild phase with real output.

## What is compared

| Arm | Pack |
| --- | --- |
| baseline | main at 8233744 (0.6.2 plus Phase 5.1). Run once in Phase 1 and frozen. |
| phase-N | The rebuild branch at the end of phase N. |

Four fixed cases in [cases.json](cases.json): SaaS dashboard, mobile form flow, marketing website, 3D product website.
Scoring uses [rubric.md](rubric.md), written before any skill edit.

## Pack copy given to a run

`git archive <commit>` of the arm, without `evals/`, `tests/`, `docs/rebuild/` and `.github/`.
Run agents never see the rubric, other runs, or expected answers.

## Run prompt (exact template)

```text
You are an AI coding assistant helping a user. A design skill pack called ShipRight is installed at
{PACK}. Start by reading {PACK}/README.md and follow the pack's own instructions for this request.
Only read files inside {PACK} and your output folder.

The user's message:
"""{USER_MESSAGE}"""

Rules for this session:
- If the pack tells you to ask the user questions before starting, write those questions to
  {OUT}/questions.md exactly as you would send them. Then continue as if the user replied:
  "{SCRIPTED_ANSWER}"
- Write your final reply to the user in {OUT}/reply.md, as you would send it in chat.
- Write any project documents you produce under {OUT}/build-pack/.
- Write the screen the user asked to see as {OUT}/index.html.
- {HARNESS_NOTE}
- Do not run the page through any checker. Do not read anything outside {PACK} and {OUT}.
When done, answer with one line: the list of files you wrote.
```

`{OUT}` is `trial/runs/<arm>/<case>/` in a scratch folder whose `trial/vendor/` holds [vendor](vendor/README.md), so `../../../vendor/` resolves. Finished runs are copied unchanged to `runs/<arm>/<case>/`.

## Measurements

- `node scripts/check-ui.mjs runs/<arm>/<case>/index.html --root evals/v1` gives screenshots at 1280x800 and 390x844 and FAIL/WARN counts.
- Words in reply.md and build-pack/ are counted by the harness.
- `node evals/v1/tools/compare.mjs` builds side-by-side images.

## Grading

Fresh grader agents get, for one case: the user message, the rubric, run A and run B (screenshots, reply, build pack, checker report), with arm names removed and A/B order randomized.
They never see pack text, phase names or which run is new. The root agent does not score. Raw grades are kept unchanged.

## Pass bar per phase

The new arm beats baseline on that phase's target criteria. No criterion drops by 1 or more on average across cases.
Reply plus build-pack length does not grow more than 15% unless criterion 9 rises. Hard-floor failures must not increase.
If a phase misses the bar: fix it or cut it, and record why in docs/rebuild/CONTEXT.md.

## Limits

One run per case per arm per phase (two in the final run). Graders are the same model family as the builders.
Synthetic prompts are not user research. Screenshots and the checker do not prove real usability or full accessibility.
