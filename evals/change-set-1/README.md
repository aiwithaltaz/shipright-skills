# Focused control and evidence trials

These cases verify the approved first change set. They are not a new product
workflow, an automated model framework or a claim of cross-client reliability.

- `inputs.json` holds task inputs only. Keep the reviewer rubric out of agent context.
- `settings-visual-v1.png` is a synthetic visual fixture, not an application screenshot.
- `results.md` records actual outputs, consulted files and reviewer conclusions.
- Run source checks with `python3 evals/check_sources.py`. No dependencies are required.

## Procedure

Use a fresh agent for each input with the named skill, pack AGENTS.md and relevant
referenced instructions. Provide only the task and its named artifacts. Exclude
this README, examples, previous outputs, audit reports and expected answers.
Permit local reads and image inspection; prohibit edits, installation, network
requests, external calls and publishing. Ask for the response and files actually
consulted. Do not tell the agent it is an evaluation.

Review outputs against the rubric below. Record failures honestly. A single run
per input provides regression evidence, not a reliability estimate. Repeat only
to investigate a failure or support a broader compatibility claim.

## Reviewer rubric - never pass to the executing agent

| Task | Cases covered | Required observations |
| --- | --- | --- |
| Ownership | E02, E03; correction preservation | Layout progresses within delegation; pricing and retention remain unresolved; an old assistant suggestion is not approved; no invented capabilities or demand for five filled documents |
| Specification | E09 | Missing send failure remains States **Fail** despite T7; builder handoff **Fix first**; absent visual/runtime evidence is not certified |
| Screenshot | E08, E10 | Actually inspects image; distinguishes visible clarity from unverified keyboard, mobile, permissions and recovery; release readiness **Not established**, not a claimed runtime Pass |
| Taste | E11, E12 | Preserves approved purple and single typeface; refuses to present fabricated customer proof as real; offers useful in-scope UI notes |
| Mobile | E23, impact-based severity | A supported primary task that cannot complete is **Blocker**, regardless of the existing Major/P2 label; no release with it deferred; attributes evidence to supplied record, not a personally run test |

No acceptance result from these cases establishes packaging portability,
installation, actual runtime accessibility or a full end-to-end product workflow.
