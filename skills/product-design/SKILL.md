---
name: product-design
description: "Use this when framing a product idea, judging research evidence or supplied research, organizing objects, navigation and access, mapping a journey or service, or defining flows, states and consequences. For a full idea-to-build pack with PRD, stack, design system and ticket prompts, use build-pack. Preserve current phase and approved scope. Part of ShipRight."
---

# Product design

**Pack version:** 1.0.0
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
| Research | Decision-relevant evidence, a lightweight plan, or findings from supplied records |
| Organize product | Sourced objects, labels, destinations and access boundaries |
| Map experience/service | One sourced map and decisions |
| Shape flow and states | Entry, steps, cancel, failure, recovery and state effects |
| Build pack | Use [build-pack](../build-pack/SKILL.md) for the full PRD-to-tickets set |

Do not invent market evidence or differentiation. Load only needed references.

## Frame product

Read [framing.md](references/framing.md).
For a vague idea, follow shared intake's cards-only first reply and stop.
After answers or delegation, recommend the narrowest useful version. Unknown premises stay Unknown.
Derive objects, lifecycles, journey and screen jobs from the agreed job; no fixed counts or filler screens.

## Research and synthesis

Inspect supplied evidence first; skip research for clear corrections or sufficient current evidence.
When evidence, a method, a study plan or supplied records change a decision, read [research.md](references/research.md).
Skip synthesis for clear corrections or planning-only work; missing evidence yields hypotheses, not findings.
Keep raw records, interpretations and approval separate; retain every supplied accessibility or safety issue even without a repeated pattern.

## Structure and maps

For authorized objects, labels, routes, search, filters or role-based destinations, read [structure.md](references/structure.md).
Skip IA for clear corrections or sufficient existing structure.
When a journey, task flow, system process or service blueprint would resolve a decision, read [journeys.md](references/journeys.md).
Skip mapping for clear corrections or a sufficient existing map. Choose one map, not every map.

## Flows and states

1. Name actor, job, phase, scope source and exclusions.
2. Map entry, steps, branches, success, cancel and recovery.
3. For states, effects, consequences and related records, read [flows-and-states.md](references/flows-and-states.md).
4. Check [Flow rules (must pass)](../_shared/flow-rules.md): F1 exit, F2 consistency, F3 useful status.

Do not add roles, filters, notifications or payments to satisfy checklists.

## Documents and handoff

For requested documents, follow [pack-contract.md](../build-pack/references/pack-contract.md) and [output-folder.md](../_shared/output-folder.md).
ui-ux-design owns DESIGN.md and screen specs. Missing artifact content stays Unknown.
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
