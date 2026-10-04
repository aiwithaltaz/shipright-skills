# Doc set mode - reference

**Status: Public draft.** Used by `product-design` when the user asks for the docs.
**Pack:** ShipRight.

Doc set drafts the five templates in order. It does not approve them. The user approves each doc before the next one starts.

## When to use

Use this when the user asks to write the docs, a PRD, a spec pack, or "write my docs".

Do not start a doc set during Frame product, a quick fix, or a visual task. Do not write a doc the user did not ask for.

## Order and stops

Draft one doc at a time, in this order:

1. `docs/01-prd.md` (PRD)
2. `docs/02-technical-architecture.md` (Technical architecture)
3. `docs/03-security-and-access.md` (Security and access)
4. `docs/04-frontend-spec.md` (Frontend spec)
5. `docs/05-feature-ticket-list.md` (Ticket list)

Progress line example:

`ShipRight · Product design · New product · Step 1 of 5: PRD`

Stop at the end of each doc. Do not start the next doc in the same message. End with `Paused - doc N of 5: <name>. Waiting for your yes.`

## Read before you write

On an existing project, read the repo, the README, and any current docs first. Do not ask for a fact that is already written.

If docs already exist:

- List what is Approved, what is Proposed, and what is missing.
- Continue from the first gap.
- Do not overwrite a section marked Approved.
- To change an Approved section, show the old line and the new line. Wait for a yes.

A section the user has not approved stays **Proposed**.

## Fill only what is known

- Use the approved frame, the decision log, and files you actually read.
- For an unknown fact, write `UNKNOWN - owner: <who>`. Use a role that exists in the project. If no role exists yet, write `UNKNOWN - owner: you`.
- Stack, APIs, field names, and hosts stay `UNKNOWN - owner: engineering` unless the user or doc 02 already states them. Do not pick a framework, a database, or a host.
- Do not invent users, prices, metrics, roles, or legal text.
- Unknown metrics stay `UNKNOWN`. Do not write a fake number.
- Write 2 to 5 real risks. Each risk names who is affected and how. Do not pad the list.

## Status, version, changelog

Start each filled section with **Approved**, **Proposed**, or **Unknown**.

Set the version in the doc header. Add one changelog line: the date and what this draft changed.

## Self-review before you show the doc

Fix the doc first. Then show a short list of what you checked.

- A finished section has no `<!-- write here -->` left. A gap uses the UNKNOWN line, not the HTML comment.
- No TBD, TODO, or lorem stands in for a decision.
- The doc does not contradict the decision log.
- Screen IDs in doc 04 match the screen jobs and the tickets in doc 05. Check this on doc 04 and again on doc 05.
- Roles in doc 03 match the actors on screens in doc 04. Check this on doc 03 and again on doc 04.
- Every P0 ticket in doc 05 names one screen job and at least one state (empty, loading, error, success, or permission denied). If a state does not apply, say why.
- Prose follows [ui-copy.md](../../ui-ux-design/references/ui-copy.md): no banned filler, no portable headline, no "Not X. It is Y." reveal, no em dash.
- Placeholders are gone from sections you call finished.

If a check fails, fix it or mark the section Unknown. Do not show a finished section that still has a template comment.

## Approval stop

End the message with:

- What is Proposed, and needs a yes
- What is Unknown, and who owns it
- One decision card, only if something blocks the next doc

Then wait.

**You decide** covers only that card. **Let me decide** means you wait. Silence is not approval.

## Optional exports

Offer these only after the source doc exists. Write them only if the user says yes.

- `PRODUCT.md` from doc 01, after the outcome and the system are Approved or clearly Proposed.
- `DESIGN.md` from doc 04 sections 4 and 5, after tokens exist as Approved, Proposed, or Observed.

Follow [docs/06-design-md.md](../../../docs/06-design-md.md). The export must match the source doc.

- A Proposed token stays Proposed.
- An Unknown token is omitted from the YAML. List it under Unknown.
- Do not invent a hex value, a font name, or a user.

## Done for this pass

A doc is done for this pass when the status line is filled, finished sections have no template comment, the self-review passed, and you have stopped for a yes.

Writing a doc does not make it Approved. A finished doc set does not authorize build, deploy, or payment.

## Cross-doc map

| Doc | Must agree with |
| --- | --- |
| 01 outcome, system, objects, decisions | Later docs cite these. They do not replace them. |
| 02 stack and integrations | 03 auth method. UNKNOWN if it was not chosen. |
| 03 roles | 04 screens those roles see, and 05 permission checks. |
| 04 screen IDs and jobs | 01 journey, and 05 tickets. |
| 05 P0 tickets | One screen job plus one state. |

---

*Public draft - product-design/references/doc-set.md - ShipRight*
