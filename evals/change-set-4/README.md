# Change set 4 - baseline trials (designed, not run yet)

**Status:** Designed for v0.5.0-draft (the merged pack). **No trial has been run.** Do not quote results from this folder until `results.md` has real outputs.

## Why a baseline

Earlier change sets ran one trial per case with no comparison. That shows ShipRight's behavior, not whether it helps. This change set compares three arms on the same cases:

| Arm | Setup | What it tells us |
| --- | --- | --- |
| A | No skill | What the model does by default |
| B | A short "be careful" prompt, no skill | What a simple instruction already fixes |
| C | ShipRight installed | What ShipRight adds |
| D (optional) | ShipRight + one visual-craft pack | Whether "use them together" holds |

**The honest gain is C vs B**, not C vs A. A skill pack that only beats "no instructions" is not worth installing.

## How to run

1. Fresh session per run, same model in every arm. Record model name and date (CT).
2. Give the agent only the task from [inputs.json](inputs.json) and the arm setup. Never give it the criteria below.
3. Three runs per arm if budget allows. Report pass rate per case, not the best run.
4. Save every output as `output-<case>-<arm>-<run>.md`.
5. Score each output against the criteria below. Write `results.md`.
6. Log every arm A and arm B excuse or failure in `../failure-modes.md` (date, model, case, what went wrong, rule that should catch it).

## Reviewer criteria (keep away from the agent)

| Case | Arm C passes only if all hold |
| --- | --- |
| S4-01 | Names Door A and depth New product. At most 5 decision cards, each with examples, a pick, You decide / Let me decide. Lists premises. Offers Small / Full / Different. Stops before screens. Invents no features, metrics, prices or users. Has a progress line and an "In plain words" line |
| S4-02 | Refuses tokens before screen jobs. Asks what the dashboard is for. Treats "like Linear" as a pattern reference, not a brand copy. Any sketch is labeled Proposed, not Ready |
| S4-03 | Asks before writing files. Writes docs in order with stops. Stack UNKNOWN if not given. Roles in 03 match screens in 04. Every P0 ticket traces to a screen and state. Launch items appear as tickets. No placeholders in finished sections. 2-5 risks. PRODUCT.md consistent with 01 |
| S4-04 | Door B, read-only. Observed tokens with sources, Unknown where unseen. Keeps purple. Does not rename nav labels, URLs or form fields. Top 3 problems, keep list, patch or rethink. Changes proposed as tickets, not code |
| S4-05 | Unsourced proof is Fail (integrity). Gradient and cards explained as tells, not automatic Fails. Each copy line quoted with a pattern name. Rewrites pass the portability test. Count block filled |
| S4-06 | Applies worst-case content (long name, RTL, emoji, 0 / 1 / 1,284). Covers loading, empty vs filtered empty, error, permission denied. Checks paste, input types, 16px mobile inputs, inline errors, focus first error |
| S4-07 | build-rules.md has rules, DESIGN.md tokens, state table, interaction floor, motion rules. Screenshots desktop + 390px. Judges before reading tool output. At most 2 fix passes. Without a browser: "Partial check" and keyboard Not verified |
| S4-08 | Polite, fast. Runs the 20 items. HTTPS, secrets, sitemap, alt text, speed are Not verified from screenshots. No legal text. Cookie consent Needs decision. Verdict is not Ready. Gives the 3 most important checks for the hour |

**Across all cases:** average sentence 20 words or fewer; no em dashes in ShipRight output; no tool result claimed without a real tool call; question count fits the depth.

## Target before calling v0.5 shareable

Arm C passes at least 7 of 8 cases in 3 of 3 runs, and beats arm B clearly on S4-01, S4-03, S4-05 and S4-08.

Source checks: `python3 evals/check_sources.py`.
