---
name: product-design
description: "Use this when framing a rough product idea, deciding an in-scope flow, defining states or action consequences, reviewing product decisions, or writing requested project documents. Preserve current phase and approved scope. Part of ShipRight."
---

# Product design

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Define what the product must do. Keep the owned outcome, useful mechanism, objects, journey and screen jobs connected.
For visual refinement use ui-ux-design; for reviewing an artifact use ux-critique.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once per task.
Use 0-5 questions total before starting. Current instructions and the current phase control scope.

**Core rules if `../_shared` is unreachable:** say the pack is incomplete. Honor exact feedback and current-phase scope.
Never invent facts, brand values, data or features. You decide delegates the named choice; Let me decide reserves it.
Silence is not approval. Use Pass, Fail, Not verified or justified Not applicable with evidence.
A ticket cannot turn Fail into Pass. A critical failure blocks readiness. Screenshots cannot prove runtime behavior.
Continue supported work; do not claim a full ShipRight check without its required references.

## Choose the smallest mode

| Mode | Output |
| --- | --- |
| Frame product | User, outcome, current alternative, useful mechanism, current phase and exclusions |
| Shape flow | Entry, steps, failure/cancel path and recovery |
| Spec states | Triggers, UI, effects, actions and preserved work |
| Decision review | One recommended interaction choice with reason |
| Edge-case harden | Material missing prerequisites, return visits or failures |
| Doc set | Only the requested documents, using the approved frame |

A useful mechanism explains why this product helps more than the current alternative. Do not invent market evidence or a differentiator.

## Frame product

Read [decision-checklist.md](references/decision-checklist.md). On a vague idea, follow the first-reply rule in shared intake and stop.
Do not derive objects, the journey, or screen jobs in that same reply.
Recommend one narrow first version only after the frame is answered or delegated.
Offer another approach only when it changes a real tradeoff or the user asks.
State uncertain premises as Unknown. Do not require a separate questionnaire or three invented approaches.
If the frame is supplied or delegated, proceed.

From the agreed job, identify only the objects actually needed, their lifecycles, the main journey and one job per screen.
No fixed object count. Do not add screens to make the frame feel complete.
Opportunity research is a separate early stage; use [opportunity-research.md](references/opportunity-research.md) only when requested or agreed.

## Flows and states

1. Name the actor, job, current phase, scope source and excluded work.
2. Map entry, necessary steps, branch decisions, success, cancel and recovery.
3. Read [states-and-flows.md](references/states-and-flows.md) for reachable states and effects.
4. For staff or related-record work, read [operational-flows.md](references/operational-flows.md).
5. Check **Flow rules (must pass)**: [F1 exit, F2 consistency, F3 useful system status](../_shared/flow-rules.md).
6. Give each action a source, effect and permitted recovery. Pending human work differs from a running background job.

Do not introduce roles, filters, notification services or payment behavior to satisfy a state checklist.
For unclear clear/reset/remove actions, resolve the object and saved effects before specifying destructive behavior.

## Doc set and handoff

Use [doc-set.md](references/doc-set.md) and [output-folder.md](../_shared/output-folder.md) when the user requests files.
Write the authorized set without automatic approval stops between documents. Keep unresolved facts and decisions explicit.
ui-ux-design owns DESIGN.md and the frontend specification. Cross-check IDs, actors, states, scope and acceptance checks.
For a flow handoff, include the job, paths, state table, decisions and remaining dependencies.
List Proposed items separately under **Needs approval before build**.

## Decision gate: 8 checks

Use at handoff or when readiness is requested. For a narrow correction, assess only affected checks.
Use the contract's statuses, evidence and next action. Define criticality before judging.

| # | Check | Criterion |
| --- | --- | --- |
| 1 | Context | Sources and unknown dependencies support this commitment. |
| 2 | Outcome | The actor, job and intended outcome are clear. |
| 3 | Scope and consistency | Current-phase steps have approval; names and patterns agree (F2). |
| 4 | Recovery | Failure/cancel paths define exit, effects and preserved input (F1). |
| 5 | States | Relevant entry, return and background work states have truthful feedback (F3). |
| 6 | Empty results | Empty and no-match states differ where search/filtering exists. |
| 7 | Consequences | Actor, effect and confirm/undo rules are clear for consequential actions. |
| 8 | Decisions | Open choices have owner, source, status and disposition. |

Use Re-decide, Fix first, Needs decision, Not established or Ready for the named next stage.
Readiness does not authorize external actions.
