# Operational flows: entry, dependencies and return visits

Load for a staff-operated flow, a task spanning related people/objects, or a process with prerequisites and pending work. Use only the lenses that apply. Do not add registration, payments or family concepts to unrelated products.

## Before drawing a wizard

Work through the user's real starting conditions, not just the supplied happy path. Recommend a coherent solution within authorized scope; ask only about consequential rules that remain unknown. An existing detailed brief may already establish the product frame - do not require the user to approve the same outcome twice.

| Lens | Decision to make explicit |
|---|---|
| Find the right record | What if the primary identifier is missing, wrong, shared or stale? Use approved alternative identifiers and disambiguation. A match is not identity proof. |
| Start from either side | Can the user arrive with the child, guardian, invoice, account or other related object first? Add or link the missing counterpart in context when allowed. Shared attributes do not establish relationships. |
| Existing or new | What prevents a duplicate? Reuse an existing object and distinguish adding a relationship from creating another person or charge. |
| Prerequisites | Which facts or other people must be available? Show known blockers when they become relevant, before the user invests in dependent steps. |
| Resolve a blocker | Specify the next action: complete now, obtain a link, refresh a source, record an authorized verification, or return later. A badge alone is not recovery. |
| Return with pending work | What is already complete? Offer the outstanding action directly and preserve valid earlier work. Re-evaluate all dependencies before claiming completion. |
| Edit or leave | What can be changed, what remains saved, and which downstream evidence becomes invalid? Avoid both silent loss and silent reuse of invalid consent. |

Model independent states separately. Saved ≠ eligible ≠ signed ≠ paid ≠ complete. A person's participant role, relationship to someone else, age group, contact and permission to sign are different facts. Do not collapse them because it makes the form simpler.

## Verification and authority

When a prerequisite comes from an external record, separate:

- **Refresh:** read the source and show last-checked time, source and unchanged/error states. A stale source still being stale does not establish eligibility.
- **Attested exception:** only when allowed, record what evidence was seen, the signed-in verifier, time, place and applicable approver. A typed name must not substitute for the authenticated actor.
- **Unresolved:** preserve permitted work and show a recovery path. Do not advance through the gate merely because staff clicked a generic checkbox.

Keep corrections and exceptions in their authorized data store. Never infer permission to change a read-only source. Show only data allowed for the current actor, including during lookup and resumption.

## Cash-like flows, only when in scope

Distinguish amount due, amount tendered, amount allocated, change returned and any explicitly authorized additional purpose. Excess money does not imply consent to a donation, tip, credit or fee. Define the allocation before receipt and ensure amounts reconcile; in a cash sale, tendered = sale allocation + authorized addition + change.

Keep a transaction separate from the people/items it pays for. One group receipt must not multiply a donation across every member. Returning to pay must not duplicate an earlier payment. Non-sale money movements need a separately authorized route; do not force them through irrelevant eligibility or purchasing steps. Propose such a route when the user raises the case, rather than silently expanding scope.

## Small handoff artifact

For applicable flows, add a compact table: **starting situation → known state → missing dependency → next permitted action → preserved work → completion condition → evidence needed**. Test materially different starting points and one return visit. Use existing gate checks 3-5 and 7-8; this is not an extra gate or a mandate for exhaustive combinations.
