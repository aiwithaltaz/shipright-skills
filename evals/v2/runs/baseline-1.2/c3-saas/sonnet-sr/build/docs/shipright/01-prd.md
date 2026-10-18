# PRD: crew scheduling and invoicing for small landscaping companies

Working name: Crewline (a placeholder, not a brand decision). Version 0.1, 16 Oct 2026. Status: Proposed, awaiting owner approval. The owner delegated every choice except prices, legal text, access policy and payments.

## Frame

- **Who:** the owner or office manager of a landscaping company with 3 to 20 workers, usually 1 to 4 crews.
- **Job:** put every job on a crew and a day without overloading anyone, then bill for finished jobs.
- **What they do today:** Unknown. Hypothesis H1: a whiteboard, a group chat, a spreadsheet or paper, plus invoices typed by hand. Source needed: 5 owner conversations, run by the founder. Other tools exist (a quick search shows Jobber, LMN and Yardbook among them); a comparison is not done and no claim is made about them.
- **This release finishes:** J1 schedule jobs onto crews by day. J2 send an invoice for a finished job and track whether it is paid.
- **Stays out:** see "Not in this release".

## Users and roles

One role in release 1: **Office** (owner or manager). Signs in, sees and changes everything in their own company. Crew leads and workers do not sign in. Unknown, owner: how a crew lead learns their day (H2: a read-only day page on a phone, no login; or a printed sheet). See open questions.

## Jobs and success checks

| ID | Job | Observable success check |
| --- | --- | --- |
| J1 | Schedule jobs onto crews by day | An owner with 15 jobs for next week puts each on a crew and day, and without help names every crew day that is over its hours. |
| J1b | Fix a changed plan | The owner moves a job to another crew or day in two actions or fewer, and sees the new load at once. |
| J2 | Invoice a finished job | From a finished job, the owner sends an invoice in three steps or fewer. |
| J2b | Know who owes | The owner lists unpaid invoices and sees which are overdue, without a spreadsheet. |

## Core flows

| Flow | Entry | Steps | Exit and return |
| --- | --- | --- | --- |
| F-J1 Add and place a job | New job (S1) | Fill customer, address, date, start, duration, services, optional crew and price. Save. | Cancel or Escape returns to S1 and warns if entries would be lost. Saved job appears in its cell, or in "Needs a crew". |
| F-J1b Move a job | Job in S1 or S2 opens S3 | Change Crew in S3. Date changes go through Edit job (S4). | Close returns to the same board position. Change is announced. |
| F-J2 Invoice | S3 of a finished job, or S2 "Ready to invoice" | Mark done, Invoice this job, check To, amount and due date, Send invoice. | Cancel keeps the job done and not invoiced. After send, S2 Sent shows it. A sent invoice cannot be unsent; leaving during send shows how to check the result. |
| F-J2b Get paid | S2 Sent | Mark as paid. | Undo in the confirmation. Paid moves to the Paid list. |

## Release scope

S1 Schedule (the main screen), S2 Invoices, S3 Job panel, S4 Job form (new and edit), S5 Send invoice, S6 Sign in, S7 Company details. Jobs have two statuses: Scheduled and Done. Invoices have two stored statuses: Sent and Paid. Overdue is calculated, not stored.

## Not in this release (notes, not UI)

Online card payments; recurring jobs (see risk R1); customer list and portal; quotes and estimates; route planning and maps; GPS and time clock; payroll; crew login or app; drag and drop; sales tax calculation; reminders for late invoices; reports; text messages.

## Decision log

| ID | Decision | Status | Where to change |
| --- | --- | --- | --- |
| D1 | One Office role, no crew logins | Proposed (delegated) | 03 access rules in architecture |
| D2 | Board is crews by weekdays Mon to Sat | Proposed (delegated) | DESIGN.md layout, S1 |
| D3 | Crew day capacity 8 h, on-site time only, editable per crew later | Proposed (delegated). Real hours Unknown, owner | S1 spec |
| D4 | Invoice due default 14 days, owner can pick 7, 14 or 30 | Proposed. Payment terms are the owner's business policy | S5 |
| D5 | Currency shown as $; locale Unknown | Proposed, owner to confirm market | tokens and format helper |
| D6 | Invoices are sent as an email, no PDF, no payment link | Proposed (delegated) | Architecture, integrations |
| D7 | Payment instructions are free text the owner writes in Company details | Proposed | S7 |
| D8 | Look: calm dense, field green accent | Proposed (delegated), see design-preview.md | DESIGN.md |

## Risks and hypotheses

- **R1:** no recurring jobs means weekly mowing is typed in again every week. This may break J1 for the main customer type. Test with owners before building more; first candidate for release 2.
- **R2:** capacity of 8 h per crew, without travel time, may be wrong. Treat the overload warning as a hint.
- **H3:** office staff schedule at a desk, owners also check from a phone. S1 therefore has a day view at phone width.

## Open questions (owner: founder)

1. Subscription price and plans. Unknown, owner. Not designed.
2. Invoice wording, tax lines and terms. Legal text is not written here. Unknown, owner.
3. How crew leads receive their day (H2).
4. Market and currency (D5).
5. Sender address for invoice email and domain verification.
6. Real workday hours and whether crews differ.
