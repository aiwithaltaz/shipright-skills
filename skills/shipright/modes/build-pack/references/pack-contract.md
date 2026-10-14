# Pack contract: files, budgets and reconciliation

Use after the frame is answered, delegated or supplied. A vague idea is not a frame.
A request to build or write the pack authorizes these files. Follow [output-folder.md](../../_shared/output-folder.md) for paths and existing files.
Write the whole set in one pass. Stop only for a true blocker: prices, legal text, access policy or payments.

## Files

| File (project-relative) | Holds | Budget |
| --- | --- | --- |
| `docs/shipright/01-prd.md` | Frame, users and jobs, release scope and exclusions, core flows as tables, success checks, simple roles, decision log, open questions | 1,200 words |
| `docs/shipright/02-technical-architecture.md` | Stack with reasons and switch points, data model, routes, access rules, integrations, environment variables, performance budgets, risks | 900 words |
| `DESIGN.md` plus a token file such as `design/tokens.css` | The design system: source, tokens, components and states, icons, placement, motion | 900 words plus tokens |
| `docs/shipright/04-frontend-spec.md` | One block per screen: job, layout order, components, states, responsive rules, accessibility, real copy | 250 words per screen |
| `docs/shipright/05-feature-ticket-list.md` | Ordered tickets as paste-ready prompts | 220 words per ticket, usually 6 to 14 |
| `docs/shipright/build-rules.md` | Standing rules for the coding tool, with the F1-F3 export block | 450 words |

Add a one-line pointer for the user's tool, such as `.cursor/rules/shipright.mdc`, `AGENTS.md` or `CLAUDE.md`: "Read docs/shipright/build-rules.md before any change."
Write these only when asked or clearly needed: `PRODUCT.md` (one-screen summary), `03-security-and-access.md` (several roles or sensitive data), `06-pitch-one-pager.md`, `ship-check.md`.
A typical 4 to 6 screen product stays near 5,000 words in total. A one-page site needs far less.

For premium web only, one six-act build prompt in the ticket file may use 550 to 1,700 words. App tickets retain the 220-word cap. The act list is single-page architecture; no filler sitemap.

## Write each fact once

State a rule in one file and link to it elsewhere. Build rules hold standing rules; tickets link to them instead of repeating them.
Fill facts from sources. Unknown facts get an owner, not a guess. Keep Proposed choices visibly separate from Approved ones.
No template comments, filler sections, fixed risk quotas or invented traction. Exported files must work without this pack.
Read existing project documents first. Update the affected sections and preserve unrelated content.

## Reconcile before delivery

- Screen IDs match the PRD jobs, the frontend spec and the tickets.
- Roles in access rules match the actors on screens. Hidden navigation is not an access rule.
- DESIGN.md, the token file and screen specs use the same token names and values.
- Routes in architecture match screens and tickets.
- Each ticket names its screen states or says why none apply.
- Exact user feedback appears as acceptance checks. Later ideas stay in the PRD's "Not in this release" list.
- The F1-F3 block in build-rules.md and the frontend spec matches the canonical export.
- Open questions in the PRD match the reply's "what only you can confirm" list.

A pack can be complete while decisions remain open. Readiness uses the shared contract, not a count of files.
