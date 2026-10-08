---
name: ux-critique
description: "Use this when reviewing a plan, specification, screenshot or running interface for task clarity, scope drift, flows, layout, states, accessibility or exact feedback compliance. Audit existing apps within the requested scope and distinguish visible from verified behavior. Part of ShipRight."
---

# UX critique

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Review a real artifact and report evidence-backed corrections. Do not invent users, interview quotes or predicted conversion gains.
With no artifact, ask for the smallest relevant input. A specification is reviewable without a running app.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once per task.
Use 0-5 questions total before starting. Current instructions and the current phase control scope.

**Core rules if `../_shared` is unreachable:** say the pack is incomplete. Honor exact feedback and current-phase scope.
Never invent facts, brand values, data or features. You decide delegates the named choice; Let me decide reserves it.
Silence is not approval. Use Pass, Fail, Not verified or justified Not applicable with evidence.
A ticket cannot turn Fail into Pass. A critical failure blocks readiness. Screenshots cannot prove runtime behavior.
Continue supported work; do not claim a full ShipRight check without its required references.

## Review sequence

1. Name scope, artifact/version, evidence stage and intended next step. Identify critical requirements before scoring.
2. Compare with current instructions, current-phase scope and approved decisions.
3. Check the user job, action hierarchy, exits, consistency, states, truthfulness and accessibility.
4. Keep actual defects separate from preferences and missing evidence. Explain the user impact of each finding.
5. Give a concrete correction and retest condition. Record what works and should stay.
6. Check exact feedback item by item; do not substitute a redesign for requested corrections.

Use [requirements-and-feedback.md](references/requirements-and-feedback.md) for stakeholder changes or multi-step flows.
Use [existing-app.md](references/existing-app.md) for existing products. A review is read-only; already authorized fixes need no repeated approval.
Use [bounded-verification.md](references/bounded-verification.md) for available runtime evidence.

## Flow rules (must pass)

Read [flow-rules.md](../_shared/flow-rules.md): **F1 exit route, F2 consistency, F3 useful system status**.
Inspect affected rules even for Quick fixes. Compare system messages with what the operator needs to know.
Selection is not focus, an error or unread work. Check icons and placement against the existing design system.

## Count it

Use counts only to support a relevant finding or full screen review.
[slop-tells.md](references/slop-tells.md) helps identify competing actions, duplicate identities and unsupported widgets.
Do not output ten empty counting rows for a label edit. Numerical quotas do not decide visual quality.

## Detect

When copy causes a problem, quote that line, name the issue and suggest a grounded correction.
Use [UI copy](../ui-ux-design/references/ui-copy.md). Do not guess whether AI wrote it.
Familiar labels such as Search and Cancel may be generic because they are clear.

## 4b. Plan review

Only when requested, use [plan-review.md](references/plan-review.md) to score Product, Design and Build.
A low score is not a reason for another intake round. Ask only a material unresolved decision within the shared limit.

## Findings and output

Use [severity-rubric.md](references/severity-rubric.md): Blocker for critical failure, Major for substantial noncritical friction, Polish for small craft issues.
Each finding needs location, evidence, impact, severity, correction and a retest condition.
Copy the shape of the worked finding in [slop-tells.md](references/slop-tells.md). Do not answer a review by restyling the screen or adding regions.
A missing requirement can be a specification Fail; an unavailable runtime check is Not verified.
A ticket or owner never resolves the failure. Never call a critical failure Major.

Lead with the verdict and next action. Keep narrow reviews short.
For a full review, add the highest-impact findings, what to preserve, evidence limits and the relevant audit rows.
Review the scope requested, even when it spans several screens. Do not impose one screen per session.

## Audit: 10 checks

Use at handoff or when readiness is requested. Use four statuses, evidence and next action per relevant row.

| # | Gate | Criterion |
| --- | --- | --- |
| 1 | Artifact | A real artifact and version are identified. |
| 2 | Context | Claims match current instructions and current-phase scope; unknowns stay explicit. |
| 3 | Job clarity | The artifact communicates its job; heuristics are not presented as user testing. |
| 4 | Hierarchy | Actions and content serve the task without unsupported UI. |
| 5 | States | Required entry, return, exit and status behavior is supported by stage-appropriate evidence (F1, F3). |
| 6 | Blockers | No critical defect remains; missing evidence cannot prove absence. |
| 7 | Craft | Layout, content, component patterns and placement support the task (F2). |
| 8 | Trust | Costs, permissions, consequences and data claims are honest. |
| 9 | Accessibility | Evidence covers relevant criteria for this stage, with runtime limits stated. |
| 10 | Correction | Exact feedback is covered; fixes and retest conditions are concrete. |

Use the shared readiness rule. For launch readiness, use [ship-check](../ship-check/SKILL.md).
Do not launch a full release audit for a focused spacing or copy request.
