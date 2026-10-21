---
name: build-pack
description: "Use this when someone brings an idea for a website, SaaS app, mobile app or 3D site and wants what a coding tool needs to build it: a PRD, stack and architecture, a design system with tokens, screen specs, and ordered tickets written as paste-ready prompts. Also use to turn an approved product frame into a build pack. Part of ShipRight."
---

# Build pack

**Pack version:** 1.6.0
**Context before generate. Product before pixels.**

Give the builder exact prompts.
Screens: ui-ux-design. Reviews: ux-critique. Launch: ship-check.

## New project

A new project runs stages 1 to 10 from [SKILL.md](../../SKILL.md). Do not copy that flow into this file.
"Just build it", "skip the plan", and "build in one go" do not skip a stage. No step is skipped for a new project, even on request.
Show exactly three options that differ in story or layout, not in color. Stop for the user to choose or approve.
When no human is available, pick one with a written reason and mark it "Proposed, awaiting owner approval". Then still run the critique, the fix loop, and ship-check.
Existing-work corrections run only the affected stages.

## Premium routing

For a public website, launch page or immersive page, read [product-brief.md](../product-design/references/product-brief.md) instead of the three app intake cards and app flows.

For public website options and scenes, read [premium-web.md](../ui-ux-design/references/premium-web.md) instead of the app work sequence and document marketing references.

For a premium story, read [techniques.md](../ui-ux-design/references/techniques.md) as an index, then only the chosen recipes below.

For chosen pinned scroll scene, read [pinned-scroll-scene.md](../ui-ux-design/references/pinned-scroll-scene.md).

For chosen camera flight, read [camera-flight.md](../ui-ux-design/references/camera-flight.md).

For chosen object in front of text, read [object-in-front-of-text.md](../ui-ux-design/references/object-in-front-of-text.md).

For chosen block wipe, read [block-wipe.md](../ui-ux-design/references/block-wipe.md).

For chosen text scramble, read [text-scramble.md](../ui-ux-design/references/text-scramble.md).

For chosen hover invert, read [hover-invert.md](../ui-ux-design/references/hover-invert.md).

For chosen entry gate, read [entry-gate.md](../ui-ux-design/references/entry-gate.md).

For chosen cursor-reactive 3d, read [cursor-reactive-3d.md](../ui-ux-design/references/cursor-reactive-3d.md).

For chosen sound toggle, read [sound-toggle.md](../ui-ux-design/references/sound-toggle.md).

For chosen page transition, read [page-transition.md](../ui-ux-design/references/page-transition.md).

For a chosen premium page, read [act-prompts.md](references/act-prompts.md) instead of app ticket prompts and golden examples.

## INTAKE

Read [shared intake](../_shared/intake.md) and [the operating contract](../_shared/operating-contract.md) once.
Use 0-5 questions total before starting. For a vague app idea, the first reply is decision cards only, usually three:

1. Who it serves and the one job this release finishes.
2. What stays out of this release.
3. The look: the user's own design system or Figma file (it always wins), or a starter direction you recommend.

Do not ask about the stack unless the user named a constraint; recommend it. After answers or "you decide", build the whole pack in one pass. That pass is the build pack only. A new project then follows the stages in SKILL.md and stops at the three options before the product build.
Delegated picks are recorded as Proposed (delegated). Prices, legal text, access policy and payments are never delegated.

Shared rules live in the operating contract. Do not copy them into this mode.

## Sequence

Do the steps in order. Load each reference only when you reach its step.
For premium public web, replace steps 1-7 with research and story, three options, then an act prompt. Preserve the pack check and files. App steps below stay for apps and explicitly calm documents.

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

Reply under 300 words.

1. What the pack contains, as a file list.
2. Decisions made for the user, one line each, marked Proposed.
3. What only the user can confirm: real blockers such as prices, legal pages, access policy, brand assets.
4. The next step is exactly three options that differ in story or layout, not in color, then stop. Do not start the product build until the user chooses or approves one.

Do not restate the documents.

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
