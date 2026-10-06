# Severity

| Level | Meaning | Required action |
| --- | --- | --- |
| Blocker | Core task fails, material harm is possible, or a stage-critical requirement fails. | Fix before claiming readiness for that stage. |
| Major | Substantial noncritical friction with a usable, understood workaround. | State impact and explicit disposition; the check remains Fail. |
| Polish | Small visual or copy issue without meaningful task failure. | Prioritize after important problems. |

Examples of Blockers: lost data without warning, inaccessible primary task, wrong access, fake consequential progress, or no recovery from a critical error.
Unknown evidence is Not verified, not automatically a Blocker. Critical missing evidence prevents readiness through Not established.
A required specification behavior that is absent is a Fail, even when its owner decision remains open.
Use Needs decision when all critical gaps arise only from reserved owner choices; do not call the user's pending choice a defect.

## Flow rules (must pass)

Use [flow-rules.md](../../_shared/flow-rules.md) for F1 exit, F2 consistency and F3 useful status.
A functional Flow rule failure is Blocker on a critical path or with data/money loss or a stuck user; otherwise Major.
Cosmetic icon/spacing drift can be Polish when meaning and behavior remain sound. Do not mislabel it as a functional failure.
An approved responsive/platform variation is not inconsistency.

Severity describes impact; P0/P1/P2 describe delivery order. Neither an owner nor a ticket makes a failure pass.
One finding should have one clear problem, correction and retest condition. Keep critical issues ahead of cosmetic counts.
