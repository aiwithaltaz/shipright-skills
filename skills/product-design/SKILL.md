---
name: product-design
description: "Use this when framing a rough product idea, checking research evidence, selecting research methods or preparing lightweight research plans, deciding an in-scope flow, defining states or consequences, reviewing decisions, or writing requested documents. Preserve current phase and approved scope. Part of ShipRight."
---

# Product design

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Connect outcome, mechanism, objects, journey and screen jobs.
Use ui-ux-design for visuals; ux-critique for reviews.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once.
Use 0-5 questions total before starting; honor scope.

**Core rules if `../_shared` is unreachable:** disclose the incomplete pack.
Honor feedback/scope; never invent facts, features or brand values.
You decide delegates the named choice; Let me decide reserves it. Silence is not approval.
Use Pass, Fail, Not verified or justified Not applicable with evidence.
Tickets cannot resolve Fail; critical failures block readiness. Screenshots cannot prove runtime.
Continue without claiming a full check.

## Choose the smallest mode

| Mode | Output |
| --- | --- |
| Frame product | Actor, outcome, alternative, mechanism, phase and exclusions |
| Research | Decision-relevant evidence or a lightweight plan |
| Shape flow | Entry, steps, cancel/failure and recovery |
| Spec states | Triggers, UI, effects and preserved work |
| Decision review | One grounded recommendation |
| Edge-case harden | Material prerequisites, return or failure paths |
| Doc set | Requested documents from the owned frame |

Do not invent market evidence or differentiation.

## Frame product

Read [decision-checklist.md](references/decision-checklist.md).
For a vague idea, follow shared intake's cards-only first reply and stop.
After answers/delegation, recommend the narrowest useful version.
Offer only material/requested alternatives. Unknown premises stay Unknown.
Derive necessary objects, lifecycles, journey and screen jobs from the agreed job; no fixed counts or filler screens.

## Research

Inspect supplied evidence first; skip research for clear corrections or sufficient current evidence.
When uncertainty changes a decision, use [research-methods.md](references/research-methods.md).
For claims, missing sources or provisional direction, use [research-evidence.md](references/research-evidence.md).
For requested/needed study preparation, use [research-planning.md](references/research-planning.md).
For source provenance or framework use, load [research-sources.md](references/research-sources.md).
Load only needed references, not every source.
Use [opportunity-research.md](references/opportunity-research.md) only for requested/agreed market scans.
No tools/participants: state the limit, keep facts Unknown and continue with testable hypotheses.
Show recommendation, assumptions, risks and next step; useful/requested detail only.
Do not claim performed sessions, validated demand or automatically alter approved scope.

## Flows and states

1. Name actor, job, phase, scope source and exclusions.
2. Map entry, steps, branches, success, cancel and recovery.
3. Read [states-and-flows.md](references/states-and-flows.md) for effects.
4. For staff/related records, read [operational-flows.md](references/operational-flows.md).
5. Check [Flow rules (must pass)](../_shared/flow-rules.md): F1 exit, F2 consistency, F3 useful status.
6. Source actions, effects and recovery. Pending human work differs from background jobs.

Do not add roles, filters, notifications or payments to satisfy checklists.
Resolve unclear clear/reset/remove scope and saved effects before destructive behavior.

## Doc set and handoff

Use [doc-set.md](references/doc-set.md) and [output-folder.md](../_shared/output-folder.md) for requested files.
No automatic document-by-document stops.
ui-ux-design owns DESIGN.md/frontend specs. Reconcile IDs, actors, scope, states and acceptance checks.
Carry job, paths, states, decisions, evidence limits and dependencies into handoff.
Missing artifact content stays Unknown.
Keep unresolved proposals under **Needs approval before build**.

## Decision gate: 8 checks

Use at handoff/requested readiness; narrow corrections need only affected checks.
Define criticality, then apply shared statuses, evidence and next action.

| # | Check | Criterion |
| --- | --- | --- |
| 1 | Context | Sources and unknown dependencies support this commitment. |
| 2 | Outcome | Actor, job and outcome are clear. |
| 3 | Scope and consistency | Current-phase steps have approval; names/patterns agree (F2). |
| 4 | Recovery | Failure/cancel define exit, effects and preserved input (F1). |
| 5 | States | Entry, return and background states have truthful feedback (F3). |
| 6 | Empty results | Empty/no-match differ where search/filtering exists. |
| 7 | Consequences | Actor, effect and confirm/undo rules are clear. |
| 8 | Decisions | Open choices have owner, source, status and disposition. |

Use Re-decide, Fix first, Needs decision, Not established or Ready for the named stage.
Readiness never authorizes external actions.
