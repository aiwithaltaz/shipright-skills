# Baseline 1.2

Status: not graded.

This file does not contain scores. The missing Claude runs were not started in this session. Altaz runs Sonnet and Opus in Claude Code. Inventing a grade would be a false result.

## What already exists

Runs on disk under evals/v2/runs/baseline-1.2/:

| Case | opus-plain | sonnet-sr |
| --- | --- | --- |
| c1-linkedin | reply, build, shots | reply, build, shots |
| c2-agents-dashboard | reply, build, shots | reply, build, shots |
| c3-saas | reply, build, shots | reply, build, shots |
| c4-website | reply, build, shots | missing |
| c5-3d-product | missing | missing |
| c6-feedback-round | reply, build, shots | reply, build, shots |
| c7-ivc-app | missing | missing |
| c8-crew-app | missing | missing |

pack-commit.txt in that folder records c38f1d692770e1296642abb369a54ef872a649cb for the runs that exist. The plan asks for v1.2 at 9cb0e47 for the missing arms. The paste-ready prompts say 9cb0e47. Do not point those runs at the 1.3 working tree.

## What is still pending

- Paste prompts: evals/v2/runs/baseline-1.2/prompts/
- Run the seven missing arms (c4 Sonnet, c5 Opus, c5 Sonnet, c7 both, c8 both).
- Pain recall on both c7 runs, after those runs exist.
- Three blind graders per case, then aggregate.py.
- Fill this file with the real score table. Do not type scores before that.

No top-3 grader fixes are listed, because there are no grades.
