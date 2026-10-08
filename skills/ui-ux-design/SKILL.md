---
name: ui-ux-design
description: "Use this when designing or refining an in-scope screen, layout, component, state, design system or build handoff. Also use for exact visual feedback on an existing app. Preserve approved identity and current-phase scope. Part of ShipRight."
---

# UI/UX design

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Turn a clear screen job into a useful layout. For an unclear product job, ask or route to product-design.
For a critique request, use ux-critique. Do not start a full audit before an explicit small correction.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once per task.
Use 0-5 questions total before starting. Current instructions and the current phase control scope.

**Core rules if `../_shared` is unreachable:** say the pack is incomplete. Honor exact feedback and current-phase scope.
Never invent facts, brand values, data or features. You decide delegates the named choice; Let me decide reserves it.
Silence is not approval. Use Pass, Fail, Not verified or justified Not applicable with evidence.
A ticket cannot turn Fail into Pass. A critical failure blocks readiness. Screenshots cannot prove runtime behavior.
Continue supported work; do not claim a full ShipRight check without its required references.

## Work sequence

1. Identify the screen job, current phase and exact requested changes. Read the existing screen and component sources.
2. Choose **Preserve** for an existing app. Use **Establish** only for a requested new system or approved overhaul.
3. Build a keep/remove/change/add record for feedback. Reconcile liked crops with the whole screen.
4. Trace every visible element to the current phase. Read "Default screens to leave out" in [anti-slop-rules.md](references/anti-slop-rules.md) before adding a region. Put later ideas in notes, not UI.
5. State the design direction in one useful sentence. Do not invent brand personality or tokens.
6. Specify reading order, action priority, components, responsive behavior and relevant states.
7. Check F1-F3, accessibility and exact feedback. Remove unsupported additions.
8. Deliver the requested design/specification or builder handoff. Keep implementation claims tied to observed evidence.

No mandatory numeric design dials. Describe density, motion and layout in words when they matter.
Use a [personal-taste profile](../../personal-taste/README.md) only when selected by the user or project.

## Craft references

Load only those needed for this task:

| Task | Reference |
| --- | --- |
| Sections, reading order, grid, mobile priorities | [layout-and-hierarchy.md](references/layout-and-hierarchy.md) |
| Icons, profile home, selected rows, nav and action placement | [icons-and-placement.md](references/icons-and-placement.md) |
| Operator desk, pending work and task-focused status | [operator-workspaces.md](references/operator-workspaces.md) |
| Empty, loading, errors, pending work and difficult content | [state-coverage.md](references/state-coverage.md) |
| Preserve/Establish, tokens and supplied references | [references-and-design-system.md](references/references-and-design-system.md) |
| Noise, invented elements and visual heuristics | [anti-slop-rules.md](references/anti-slop-rules.md) |
| Existing or requested animation | [motion.md](references/motion.md) |
| Labels, errors and operator language | [ui-copy.md](references/ui-copy.md) |
| Builder instructions | [build-handoff.md](references/build-handoff.md) |
| Requested files | [output-folder.md](../_shared/output-folder.md) |

## Flow rules (must pass)

Read [flow-rules.md](../_shared/flow-rules.md): **F1 exit route, F2 consistency, F3 useful system status**.
Apply them to affected screens and states, including small fixes. Do not turn system visibility into backend status panels.
Use current-phase requirements, not every feature visible in an old screenshot.

## Accessibility

Use native controls, visible labels and meaningful heading order. Keep keyboard focus visible and unobscured.
Use non-color cues for selection and errors. Announce relevant background work without stealing focus.
Read the measurable criteria in [state-coverage.md](references/state-coverage.md) before handoff.
A screenshot supports only visible judgments. Keyboard, dialog behavior and assistive-technology support need implementation evidence.

## Output

For a small fix: changes made/specified, affected verification, unresolved issues. No full gate or design-system rewrite.
For a screen handoff: job and phase; top-to-bottom structure; component/token sources; states and responsive rules;
accessibility; exact acceptance checks; unresolved proposals. Write requested project files once, then summarize.

## Pre-flight: 10 checks

Use at handoff or when readiness is requested. Each relevant row needs status, evidence and next action.
Name the review stage. Judge specification completeness separately from later runtime verification.
Missing required spec behavior is Fail; defined behavior may Pass at specification stage while its implementation remains untested.

| # | Gate | Criterion |
| --- | --- | --- |
| 1 | Screen context | Job, phase and source are explicit; feedback maps to acceptance checks. |
| 2 | Design direction | Preserved or approved direction fits the job; no invented brand values. |
| 3 | Hierarchy | The next task is clear; supporting content does not compete. |
| 4 | States | Applicable states, pending work and useful status have recovery (F3). |
| 5 | Integrity and consistency | No invented scope/data; sourced components, icons and patterns agree (F2). |
| 6 | Navigation | Approved destinations and safe exits preserve valid work (F1). |
| 7 | Accessibility | Semantics, keyboard/focus, contrast, reflow and non-color cues are specified or tested for this stage. |
| 8 | Motion | Existing/requested motion has purpose and reduced-motion behavior; otherwise Not applicable. |
| 9 | Content and density | Long/missing content and 0/1/many results have responsive rules; rendered fit needs visual evidence. |
| 10 | Handoff | Version, decisions, exact feedback coverage, exclusions and next stage are explicit. |

Use the shared readiness rule. A source check or a complete specification does not certify a running interface.
