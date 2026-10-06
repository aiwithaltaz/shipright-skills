# Change set 2 - observed trial results

Date: 2026-09-23. Base: `main@a6ae2a1`. Candidate: local branch `change-set-2` (0.3.0-draft).

Twelve fresh-context agents ran once each with the harness and task text in `inputs.json`. Expected outcomes were excluded from their context. Runtime: Claude subagents in a Cowork session (model family: Claude; exact sampling settings not exposed). The same model family helped write these changes, and the case designer also reviewed the results, so this is not independent evidence. A second-model run is still needed.

No product side effects, installs, publishing or paid calls happened. S2-11 made 2 web searches and 6 fetches of public pricing pages, within the research budget.

## Reviewer decisions

| Case | Result | Observed |
| --- | --- | --- |
| S2-01 | Pass | Verdict "Needs decision (D1, D2)"; yesterday's auto-archive left out as unapproved; 30-day recovery chosen within delegation; "Needs approval before build" list present |
| S2-02 | Pass | Copy-only install: reported `_shared` unreachable and used the inline core rules; expired-link blank screen = Blocker despite BUG-212; Blockers gate Fail; Fix first. (Before this change, the same setup scored the Blockers gate Pass.) |
| S2-04 | Pass | Short label answer; no gate table; no research |
| S2-06 | Pass | Frame product with outcome, two candidate mechanisms, objects, 7-step journey, screen jobs; 5 questions; no state table or gate; research offered, not run; "Needs decision" |
| S2-07 | Pass | Stated the feature list has no "why"; two Proposed mechanisms; outcome left Unknown; suggested building only the shared base meanwhile |
| S2-08 | Pass | Product audit block with top 3, what's working, root cause, "Patch"; amber/radius/nav preserved; only affected checks shown; verdict first |
| S2-10 | Pass | Quick fix; explicitly declined to research despite web access |
| S2-11 | Pass (minor) | 5 alternatives, 8 sources with dates and strength labels, "not demand" line, all Proposed. Minor: stated the budget in the answer rather than before starting |
| S2-15 | Pass | Stopped and asked 5 product questions; no colors, fonts or layout |
| S2-18 | Pass | Cursor rules block + S3 prompt with all states, exact values, acceptance checks; tip option excluded; D3/D6 marked do-not-resolve; gaps raised as Proposed items |
| S2-20 | Pass | Banned invented proof with no clients; kept user-approved sections but removed template defaults; `[NEEDS]` markers instead of guesses; build-and-screenshot step included |
| S2-R1 | Pass | Missing send failure labeled Blocker (not "Major, critical"); T7 does not resolve it; also found a missing invite entry point on a populated list |

## Known limits (not solved by this change set)

- Focused-improvement and build-pack answers are still long (roughly 1,000–1,900 words), although each now leads with the verdict and next action.
- Single runs on one model family. Cross-model behavior (Cursor, Codex, Antigravity default models) is untested.
- No end-to-end pilot yet: idea → frame → specs → build pack → real build → verification.
- The results above record observations; full raw responses were reviewed in the session and are not reproduced here.
