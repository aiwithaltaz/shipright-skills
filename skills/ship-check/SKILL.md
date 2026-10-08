---
name: ship-check
description: "Use this when checking launch readiness or specific release items such as HTTPS, metadata, forms, accessibility evidence, page speed or required policy links. Check 20 items for a full launch review; inspect only relevant items for a focused request. Read-only by default. Part of ShipRight."
---

# Ship check

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Report what launch evidence establishes. This is not a security audit, legal review or deployment step.
For a plan without a build, record future verification needs; do not claim launch readiness.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once per task.
Use 0-5 questions total before starting. Current instructions and the current phase control scope.

**Core rules if `../_shared` is unreachable:** say the pack is incomplete. Honor exact feedback and current-phase scope.
Never invent facts, brand values, data or features. You decide delegates the named choice; Let me decide reserves it.
Silence is not approval. Use Pass, Fail, Not verified or justified Not applicable with evidence.
A ticket cannot turn Fail into Pass. A critical failure blocks readiness. Screenshots cannot prove runtime behavior.
Continue supported work; do not claim a full ShipRight check without its required references.

## Scope and evidence

Inspect the supplied URL, code or screenshots first. Ask only for facts that change the check.
If the user does not supply a URL, a build, or a screenshot, ask one question for that artifact and stop.
Do not fill the 20 rows from the idea alone. Do not mark Pass because the product sounds ready.
Name the exact build/version, environment, date, supported users/devices and critical requirements.
Run all 20 items for a launch request. For one item, check that item and direct dependencies without expanding scope.
Read [launch-items.md](references/launch-items.md) for evidence requirements.

A review is read-only. Do not submit live forms, send messages, pay, delete or install services.
Use authorized synthetic test data for interactive checks. Never print secrets; identify their file and line only.
Use [bounded verification](../ux-critique/references/bounded-verification.md) when relevant.

**Deadline rule:** pressure to launch never turns an unknown into Pass. State the top gaps and what can be checked next.
Screenshots cannot prove HTTPS, keyboard operation, serving routes, performance, permissions or saving.
Source presence is not proof of deployed behavior. A tool result applies only to its recorded version and paths.
Policy applicability belongs to the owner or qualified reviewer. Do not invent legal requirements or write policy text.

## Launch gate: 20 items

Every item begins Not verified. Use exactly Pass, Fail, Not verified or Not applicable with a reason.
Put unresolved owner choices in Next action; Needs decision is a verdict, not an item status.

| # | Item | Evidence focus |
| --- | --- | --- |
| 1 | Privacy policy | Required page and links exist; no legal sufficiency claim. |
| 2 | Terms | Required page and links exist; applicability is recorded. |
| 3 | Tracking consent | Actual tracking behavior matches the approved consent policy. |
| 4 | Frontend secrets | Relevant source and served bundles inspected; no security certification. |
| 5 | HTTPS | Served URLs and redirects checked. |
| 6 | Public form abuse | Relevant server validation and abuse controls verified. |
| 7 | Page titles and descriptions | Actual served metadata fits public pages; titles also support orientation. |
| 8 | Social preview | Required tags and image resolve correctly. |
| 9 | Favicon/app icons | Approved assets appear where needed. |
| 10 | Sitemap and robots | Public indexing intent matches served files; private apps may be Not applicable. |
| 11 | Image alternatives | Meaningful images have alternatives; decorative images are ignored. |
| 12 | Contrast and focus | Relevant contrast measured; keyboard focus visible. |
| 13 | Responsive access | Supported sizes and zoom work; primary tasks remain reachable. |
| 14 | Not-found recovery | Unknown routes return the proper status and a usable exit. |
| 15 | Forms | Labels, validation, preserved input and safe submission work. |
| 16 | Links | Checked destinations resolve; scope is recorded. |
| 17 | Images | Appropriate dimensions, loading behavior and weight. |
| 18 | Performance | Relevant pages measured with method and limits stated. |
| 19 | Analytics | Only requested measurement, matching consent and product scope. |
| 20 | Primary task | The next action is clear for each context; no competing filler. |

## Verdict and output

Use the shared readiness rule, including Blockers outside the numbered list.
The 20 items do not replace core-flow, permission, data-integrity or accessibility verification required by the product.
Identify those critical requirements and their evidence separately. Never certify an app from metadata checks alone.

Lead with the verdict, then top fixes, the relevant table and evidence limits.
Use Needs decision (IDs) for owner-only critical gaps; otherwise unresolved critical evidence means Not established.
Ready for launch review requires all critical requirements satisfied and explicit disposition of other gaps.
Readiness never authorizes deploy, publish or payment.

Write [the report template](../../docs/ship-check.md) only when requested, following [output-folder.md](../_shared/output-folder.md).
If fixes are authorized, hand them to the coding tool and recheck affected items. Keep old dated evidence separate.
