# MVP scope

The MVP has one job: **a small landscaping company can run a full week (schedule, reschedule for rain, mark work done, invoice, get paid) without the whiteboard or the spreadsheet.**

Priority key: **P0** = must ship for the first paying customer. **P1** = within 4 to 6 weeks after launch. **P2** = later, only if customers ask.

## 1. Week board (scheduling)

| Priority | Feature | Notes |
|---|---|---|
| P0 | Week board: crews as rows, Mon to Sat as columns | Home screen. See `03-screens-and-flows.md`. |
| P0 | Drag a visit to another crew or day | Plus a keyboard and tap alternative: "Move to..." menu. |
| P0 | Unassigned tray | New visits land here until placed on a crew. |
| P0 | Crew load per day in hours | Each visit has an estimated duration. Cell turns red when over the crew's day length. |
| P0 | Recurring visits | Weekly, every 2 weeks, monthly. Generated 8 weeks ahead. |
| P0 | One-off visits | Cleanups, mulch, installs. |
| P1 | Weather on the board | Daily forecast per service area. Flag days with 60%+ rain chance. |
| P1 | "Move rain day" action | Moves every visit on that day to the next day with room, keeps crew assignments, offers undo. |
| P1 | Route order within a day | Sort a crew's day by drive order (simple nearest-next first; real routing later). |
| P2 | Auto-suggest a crew for new visits | Based on area and load. |

## 2. Customers and properties

| Priority | Feature | Notes |
|---|---|---|
| P0 | Customer with one or more properties | Name, phone, email, billing address; property address, gate code, notes. |
| P0 | Service plan per property | e.g. "Weekly mow, $55/visit, April to November". |
| P0 | CSV import | Most will come from a spreadsheet or QuickBooks export. |
| P1 | Customer history | Past visits, invoices, notes, photos. |

## 3. Crew app (phone, crew lead)

| Priority | Feature | Notes |
|---|---|---|
| P0 | Today's stops in order, with address, notes, gate code | Tap the address to open maps. |
| P0 | Mark visit done | Optional note and up to 3 photos. |
| P0 | Mark visit skipped, with reason | "Customer canceled", "Locked gate", "Too wet". Skipped visits go back to the owner. |
| P1 | Simple crew clock in / clock out | Per crew per day, not per worker. Gives actual vs estimated hours. |
| P2 | Offline mode with sync | Needed for rural areas. Build after we see how often it matters. |

## 4. Invoicing and payments

| Priority | Feature | Notes |
|---|---|---|
| P0 | "Ready to invoice" list | Every done visit that hasn't been invoiced. |
| P0 | Create invoice from one or many visits | Group by customer automatically. |
| P0 | Billing modes per customer | Per visit, or one invoice per month with all visits listed. |
| P0 | Send invoice by email with a pay link | Card and ACH through Stripe. |
| P0 | Invoice statuses | Draft, Sent, Viewed, Paid, Overdue. |
| P1 | Automatic reminders | 3 days and 10 days after due date. |
| P1 | QuickBooks Online sync | Push invoices and payments. Many owners' accountants insist on it. |
| P2 | Customer card on file and autopay | For monthly maintenance customers. |

## 5. Notifications

| Priority | Feature | Notes |
|---|---|---|
| P1 | Text customers when a visit moves | "Rain moved your mow from Thursday to Friday." |
| P1 | "On the way" text from the crew app | One tap. |

## 6. Account and setup

| Priority | Feature | Notes |
|---|---|---|
| P0 | Sign up, create company, add crews and people | Owner, office, and crew lead roles. |
| P0 | Setup checklist | Add crews, import customers, connect Stripe, send a test invoice. |
| P0 | Billing for Groundcrew itself | Stripe Billing, 14-day trial without a card. |

## Explicitly out of the MVP

- Estimates and quotes (P1 candidate: simple quote that turns into a service plan)
- Job costing and profit per job
- Customer self-service portal
- Payroll, per-worker timesheets
- Multi-branch companies
- Native iOS/Android apps (the crew app is a mobile web app you add to the home screen)

## Core user stories (P0)

1. As an **owner**, I open the week board on Monday morning and see every crew's week with hours per day, so I know who has room.
2. As an **owner**, I drag a visit from an overloaded crew to one with room, and the crew lead's phone shows the change.
3. As an **office manager**, I add a new customer with a weekly mow plan, and their visits appear in the unassigned tray for the next 8 weeks.
4. As a **crew lead**, I open the app at 7am, see my stops in order, and mark each one done with a photo.
5. As an **office manager**, on Friday I open "Ready to invoice", check the list, and send all invoices in one action.
6. As a **customer** of the landscaping company, I get an email invoice and pay it by card or bank transfer without creating an account.
7. As an **owner**, I see which invoices are overdue and how much money is out.
