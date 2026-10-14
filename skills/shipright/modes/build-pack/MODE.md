---
name: build-pack
description: "Use this when someone brings an idea for a website, SaaS app, mobile app or 3D site and wants what a coding tool needs to build it: a PRD, stack and architecture, a design system with tokens, screen specs, and ordered tickets written as paste-ready prompts. Also use to turn an approved product frame into a build pack. Part of ShipRight."
---

# Build pack

**Pack version:** 1.1.0
**Context before generate. Product before pixels.**

Idea in, build pack out. Work like a small senior agency: product, design and engineering decide together, then hand the builder small, exact prompts.
For a single screen or a correction, use ui-ux-design. For a review, use ux-critique. For launch evidence, use ship-check.

## Full flow for a new project

A new project always runs every step below, in order. "Just build it", "skip the plan", and a prompt that says to build in one go do not skip a step. Naming a mode does not skip a step.

1. **Build pack.** PRD, architecture, DESIGN.md, frontend spec, and tickets.
2. **Design preview.** Show 2-3 distinct visual directions (type, color, spacing, motion). Stop for the user to choose or approve.
3. **Build.**
4. **Critique.** Run ux-critique on the rendered result and `scripts/check-ui.mjs`. Fix what it finds. Loop until clean.
5. **Ship-check.**

Skip a step only when the user names that step and accepts the stated risk. Say which step is skipped and why it matters. Risk if skipped: no scope (build pack), an unapproved look (design preview), nothing to review (build), defects left in (critique), launch evidence unknown (ship-check).

When no human is available, still write the 2-3 directions, pick one with a written reason, and mark it "Proposed, awaiting owner approval". Then still run the critique, the fix loop, and ship-check. Shared intake still runs first. An explicit correction, review, or launch check on existing work is not a new project.

For a public website, launch page or immersive page, read [product-brief.md](../product-design/references/product-brief.md) instead of the three app intake cards and app flows.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once.
Use 0-5 questions total before starting. For a vague app idea, the first reply is decision cards only, usually three:

1. Who it serves and the one job this release finishes.
2. What stays out of this release.
3. The look: the user's own design system or Figma file (it always wins), or a starter direction you recommend.

Do not ask about the stack unless the user named a constraint; recommend it. After answers or "you decide", build the whole pack in one pass. That pass is the build pack only. A new project then follows Full flow and stops at the design preview before the product build.
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
5. **Design system.** Read [design-system.md](../ui-ux-design/references/design-system.md). The user's system or Figma wins. A new app starts from the matching starter in [starter-systems.md](../ui-ux-design/references/starter-systems.md), adapted to the subject, marked Proposed and shown first for a quick OK; ticket T1 builds it as a preview page before any screen.
6. **Screens.** Follow the [ui-ux-design](../ui-ux-design/MODE.md) work sequence for each screen: job, top-to-bottom layout, components, states, responsive behavior, accessibility, real copy. For accessibility and state criteria, read [state-coverage.md](../ui-ux-design/references/state-coverage.md). For phone screens, read [mobile.md](../ui-ux-design/references/mobile.md). For marketing pages, read [marketing-pages.md](../ui-ux-design/references/marketing-pages.md). For motion or 3D, read [motion.md](../ui-ux-design/references/motion.md).
7. **Tickets.** Read [ticket-prompts.md](references/ticket-prompts.md). For the expected level of detail, read the matching example in [golden-examples.md](references/golden-examples.md). Small, ordered, paste-ready prompts. Open choices get a Proposed default and a named place to change it, not a Blocked label.
8. **Check.** Read [pack-contract.md](references/pack-contract.md) for files, budgets and reconciliation. Run the Pack check below. If you produced an HTML preview and can run Node, run `node <pack>/scripts/check-ui.mjs <page> --root <site folder>`, fix every FAIL, and look at both screenshots before you reply.

When the user returns with built work, check it with [bounded-verification.md](../ux-critique/references/bounded-verification.md).
Work behind the scenes. Do not narrate each step.

## The reply

Keep the chat reply under 300 words. The documents carry the detail.

1. What the pack contains, as a file list.
2. Decisions made for the user, one line each, marked Proposed.
3. What only the user can confirm: real blockers such as prices, legal pages, access policy, brand assets.
4. The next step is the design preview: 2-3 directions, then stop. Do not start the product build until the user chooses or approves one.

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
