---
name: ui-ux-design
description: "Use this when designing or refining a screen, layout, component, state, design system or build handoff for a web app, mobile app or marketing page. Also use for exact visual feedback on an existing app. Preserve approved identity and current-phase scope. Part of ShipRight."
---

# UI/UX design

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Turn a clear screen job into a useful layout. For an unclear product job, ask or route to product-design.
For unresolved object organization, destinations or retrieval scope, use product-design before screens. Skip that detour for clear corrections or sufficient approved structure.
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
2. Design system first, before any screen or coding handoff. Record a small system: type scale, spacing scale, color roles, radius, elevation, motion, and a short component list. The user's own system or Figma file always wins. Existing app: extract the current system, mark it Observed, and reuse it. Do not replace it. New app: start from the matching starter in [starter-systems.md](references/starter-systems.md), adapt the accent and type to the subject, propose a small system, mark it Proposed, and get the user's OK before screens. Numbers are required for handoff, but they must come from the observed or approved system, never invented. A starter shown to the user and accepted, or delegated with "you decide", counts as approved.
3. Choose **Preserve** for an existing app. Use **Establish** only for a requested new system or approved overhaul.
4. Build a keep/remove/change/add record for feedback. Reconcile liked crops with the whole screen.
5. Trace every visible element to the current phase. Read "Default screens to leave out" in [anti-slop-rules.md](references/anti-slop-rules.md) before adding a region. Put later ideas in notes, not UI.
6. State the design direction in one useful sentence. Do not invent brand personality. For a phone screen read [mobile.md](references/mobile.md); for a marketing or launch page read [marketing-pages.md](references/marketing-pages.md).
7. Specify reading order, action priority, components, responsive behavior and relevant states. Map each control to a canonical name or an existing app component.
8. Check F1-F3, accessibility and exact feedback. Remove unsupported additions. If you render HTML, run the look-and-fix loop in [layout-and-hierarchy.md](references/layout-and-hierarchy.md): check-ui, then look at both screenshots, up to three rounds.
9. Deliver the requested design/specification or builder handoff. Keep implementation claims tied to observed evidence.

Dense but calm is the default for product screens: real information, clear hierarchy, nothing shouting. Use numbers only from the observed or approved system.
Use a [personal-taste profile](../../personal-taste/README.md) only when selected by the user or project.

## Design system first

Inspect and reuse the existing app system first. Missing documentation alone does not authorize replacement.
For a system choice, foundations, tokens, a supplied reference or naming and maintenance, read [design-system.md](references/design-system.md).
The user's own design system or Figma file always wins. A new app shows its Proposed system for a quick OK before screens are built.
Keep the work behind the scenes and show concise decisions, gaps and risks. A small correction needs no full system exercise.
Do not rebrand or replace the system without approval.

## Craft references

Load only those needed for this task:

| Task | Reference |
| --- | --- |
| Sections, reading order, grid, mobile priorities | [layout-and-hierarchy.md](references/layout-and-hierarchy.md) |
| Icons, profile home, selected rows, nav and action placement | [icons-and-placement.md](references/icons-and-placement.md) |
| Operator desk, pending work and task-focused status | [operator-workspaces.md](references/operator-workspaces.md) |
| Empty, loading, errors, pending work and difficult content | [state-coverage.md](references/state-coverage.md) |
| Naming controls or choosing between look-alike controls | [components.md](references/components.md) |
| Noise, invented elements and visual heuristics | [anti-slop-rules.md](references/anti-slop-rules.md) |
| Concrete review prompts for competing actions or unsupported widgets | [slop-tells.md](../ux-critique/references/slop-tells.md) |
| Severity of a concrete review finding | [severity-rubric.md](../ux-critique/references/severity-rubric.md) |
| Available implementation evidence | [bounded-verification.md](../ux-critique/references/bounded-verification.md) |
| Existing or requested animation | [motion.md](references/motion.md) |
| Labels, errors and operator language | [ui-copy.md](references/ui-copy.md) |
| Builder instructions and ticket prompts | [ticket-prompts.md](../build-pack/references/ticket-prompts.md) |
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
