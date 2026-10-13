---
name: build-pack
description: "Use this when someone brings an idea for a website, SaaS app, mobile app or 3D site and wants what a coding tool needs to build it: a PRD, stack and architecture, a design system with tokens, screen specs, and ordered tickets written as paste-ready prompts. Also use to turn an approved product frame into a build pack. Part of ShipRight."
---

# Build pack

**Pack version:** 0.6.2
**Context before generate. Product before pixels.**

Idea in, build pack out. Work like a small senior agency: product, design and engineering decide together, then hand the builder small, exact prompts.
For a single screen or a correction, use ui-ux-design. For a review, use ux-critique. For launch evidence, use ship-check.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once.
Use 0-5 questions total before starting. For a vague idea, the first reply is decision cards only, usually three:

1. Who it serves and the one job this release finishes.
2. What stays out of this release.
3. The look: the user's own design system or Figma file (it always wins), or a starter direction you recommend.

Do not ask about the stack unless the user named a constraint; recommend it. After answers or "you decide", build the whole pack in one pass.
Delegated picks are recorded as Proposed (delegated). Prices, legal text, access policy and payments are never delegated.

**Core rules if `../_shared` is unreachable:** say the pack is incomplete. Honor exact feedback and current-phase scope.
Never invent facts, brand values, data or features. You decide delegates the named choice; Let me decide reserves it.
Silence is not approval. Use Pass, Fail, Not verified or justified Not applicable with evidence.
A ticket cannot turn Fail into Pass. Nothing ships, publishes or charges money without the user's OK.

## Sequence

Do the steps in order. Load each reference only when you reach its step.

1. **Frame.** Read [framing.md](../product-design/references/framing.md). Who, job, what they do today, this release, what stays out, one observable success check per job.
2. **Flows and states.** For each core job, read [flows-and-states.md](../product-design/references/flows-and-states.md). Entry, steps, exits, failure and return. Check [Flow rules (must pass)](../_shared/flow-rules.md).
3. **Structure, only when needed.** With several roles, record types or navigation areas, read [structure.md](../product-design/references/structure.md). Hidden navigation is never access control.
4. **Stack.** Read [stack-choices.md](references/stack-choices.md). Fit the user's coding tool. Give a reason and a switch point for each choice.
5. **Design system.** Read [design-system.md](../ui-ux-design/references/design-system.md). The user's system or Figma wins. A new app gets a small Proposed system, shown first for a quick OK; ticket T1 builds it as a preview page before any screen.
6. **Screens.** Follow the [ui-ux-design](../ui-ux-design/SKILL.md) work sequence for each screen: job, top-to-bottom layout, components, states, responsive behavior, accessibility, real copy. For accessibility and state criteria, read [state-coverage.md](../ui-ux-design/references/state-coverage.md).
7. **Tickets.** Read [ticket-prompts.md](references/ticket-prompts.md). Small, ordered, paste-ready prompts. Open choices get a Proposed default and a named place to change it, not a Blocked label.
8. **Check.** Read [pack-contract.md](references/pack-contract.md) for files, budgets and reconciliation. Run the Pack check below. If you produced an HTML preview and can run Node, run `node scripts/check-ui.mjs <page>` from the pack root and look at the screenshots before you reply.

When the user returns with built work, check it with [bounded-verification.md](../ux-critique/references/bounded-verification.md).
Work behind the scenes. Do not narrate each step.

## The reply

Keep the chat reply under 300 words. The documents carry the detail.

1. What the pack contains, as a file list.
2. Decisions made for the user, one line each, marked Proposed.
3. What only the user can confirm: real blockers such as prices, legal pages, access policy, brand assets.
4. The first step: "Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2."

No restated PRD, no long reasoning, no list of everything left out.

## Pack check: 10 checks

Run before replying. Fix any Fail you can; list the rest under the reply's step 3.

| # | Check | Criterion |
| --- | --- | --- |
| 1 | Frame | Who, job, release scope, exclusions and success checks are stated once. |
| 2 | No invention | No invented metrics, quotes, logos, prices, legal text, brand values or features. Open facts are Unknown with an owner. |
| 3 | Stack | Each choice has a reason, fits the user's tool and adds no unneeded service. |
| 4 | System | Tokens cover color, type, space, radius, elevation and motion, with a source: Observed, Approved or Proposed. |
| 5 | Screens | Each screen has a job, layout order, components, states, responsive rules, accessibility and real copy. |
| 6 | Flows | F1 exit, F2 consistency and F3 status hold for every core flow. |
| 7 | Tickets | Ordered and small. Each is a paste-ready prompt with read-first files, done-when checks and a stop line. |
| 8 | Consistency | Screen IDs, routes, roles, names and tokens match across files. |
| 9 | Size | Files stay within pack-contract budgets. Each rule is written once and linked elsewhere. |
| 10 | Approval | Proposed choices and real blockers are listed. Nothing ships, publishes or charges money without the user's OK. |

Use the shared readiness rule. A complete pack is ready for building, not proof the product works.
