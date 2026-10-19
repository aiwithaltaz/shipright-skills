# Stage 5: Architecture

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 05 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Make it buildable. Open [architecture.md](../templates/architecture.md).
Required headings: Stack, Data model, Access, Integrations, Secrets, Costs, Phases.

The website stack is decided only in this file. Do not pick a second default from a table.

- Premium public site, with a product on stage: Vite, plus Three.js or React Three Fiber, plus GSAP and Lenis. The tested scene is `blocks/product-3d.html`. The tested scroll story is `blocks/scroll-story.html`. Do not invent a second 3D stack inside a stand-in block.
- Calm content site, or a site with no product object: Astro.
- An existing codebase or a named tool wins over both. Say the switch point.

App stacks stay in [stack-choices.md](../modes/build-pack/references/stack-choices.md): reason, switch point, and fit the user's coding tool. That file points back here for websites so the two do not compete.

## Also write

- Data model: every table, fields, types, relations, and the indexes that matter. No tables for later ideas.
- Access: who reads and changes which rows. Enforce it on the server. Hiding a button is not access control.
- Integrations: rate limits and what happens when they fail, from the risk register.
- Secrets: names only. Never values.
- Budgets: LCP under 2.5 s, INP under 200 ms, CLS under 0.1. For 3D, also a triangle and texture budget.
- Costs per month at 0, 100, and 1,000 users. Mark Assumed prices as Assumed.
- Build phases with weeks. Open decisions with an owner.

## Record

Copy the stack, data, access, secrets, and costs into ARCHITECTURE.md. Replace stale lines. Do not append a second stack.
Required headings in ARCHITECTURE.md: Stack, Data, Access, Integrations, Secrets, Costs.

## Screens and states

In ARCHITECTURE.md add `## Screens`: a table with Screen, Job, Primary action, Empty, Loading, Error. One primary action per screen. Loading names skeleton, spinner, progress or instant. Every error has a way out (retry, fix, back).
Add `## Project rules` with Stack, Folders and Banned lines before any build code.
Run `node <skill>/scripts/check-record.mjs <record> --base`.

## Gate

Stack has a reason and a switch point. Data model and access rules are specific. Secrets are names only. Costs are stated. Record updated.
