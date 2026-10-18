# Tech stack and build plan

## Stack (chosen for a small team, low cost, and boring reliability)

| Layer | Choice | Why |
|---|---|---|
| App | **Next.js (App Router) + TypeScript** | One codebase for the office app, crew mobile web app, and customer invoice page. |
| Database + auth + file storage | **Supabase (Postgres)** | Row-level security for multi-tenancy, auth with magic links, storage for visit photos. |
| Hosting | **Vercel** | Zero-ops deploys, preview links for every change. |
| Payments from customers | **Stripe Connect (Standard or Express)** | Each landscaping company gets paid directly; card + ACH. |
| Billing for Groundcrew | **Stripe Billing** | Subscriptions and trials. |
| Email | **Postmark or Resend** | Invoice emails need good deliverability. |
| Texts (P1) | **Twilio** | Rain-move and "on the way" texts. Needs A2P 10DLC registration, which takes time; start it early. |
| Weather (P1) | **Open-Meteo** or **Tomorrow.io** | Daily precipitation probability by zip/lat-lng. Check commercial-use terms. |
| Accounting sync (P1) | **QuickBooks Online API** | Intuit app review takes weeks; apply in month 2. |
| Background jobs | **Supabase cron + edge functions** (or Inngest) | Generating recurring visits, reminders, overdue checks. |
| Errors / analytics | **Sentry + PostHog** | Know what breaks and which features get used. |

Rough running cost before revenue: under $100/month, plus per-use Twilio and Stripe fees.

## Build plan (about 12 weeks to first paying customers)

Assumes one full-time developer (or a founder building with AI coding tools) plus part-time design help. Each phase ends with something a real landscaper can try.

| Weeks | Phase | Ships | Done when |
|---|---|---|---|
| 0 to 2 | **Validate** | 10 to 15 interviews with owners; clickable week-board prototype (index.html) | At least 5 owners say they'd switch, and 3 agree to be pilot users. |
| 2 to 3 | **Foundation** | Auth, companies, users/roles, crews, customers, properties, CSV import | A pilot company is set up with real customers. |
| 4 to 6 | **Scheduling** | Service plans, visit generation, week board with drag/move, unassigned tray, crew load | Pilot owner plans a real week on the board. |
| 6 to 7 | **Crew app** | Today list, mark done/skipped, notes, photos | Crew leads use it for a full week. |
| 8 to 9 | **Invoicing** | Ready to invoice, batch create, email + Stripe pay link, statuses, overdue view | Pilot sends real invoices and gets paid through Groundcrew. |
| 10 | **Billing + setup** | Trial, subscription, setup checklist, empty states | A stranger can sign up and get to the board without help. |
| 11 to 12 | **Weather + polish** | Forecast on board, rain move with undo, reminders, bug fixing | 3 pilots paying; ready for public launch. |
| 13+ | **P1 list** | Customer texts, QuickBooks sync, route order, clock in/out | Driven by what pilots ask for most. |

## Seasonality warning

Landscaping is seasonal. Owners pick software in **late winter (Jan to March)** before the season starts, and have no time from April to October. If you start building in fall, aim to have pilots running in **February** so they're live for spring. Building through winter is fine; launching in July is not.

## Technical risks

| Risk | Mitigation |
|---|---|
| Crew leads in areas with bad signal | Cache Today's list on the phone; queue "done" taps and sync later (proper offline is P2). |
| Drag-and-drop on tablets is fiddly | Every card also has a "Move to..." menu. Test on an iPad early. |
| Recurring visit generation edge cases (holidays, plan edits, season ends) | Keep generation idempotent; never overwrite visits that were moved, done, or invoiced. |
| Double-invoicing | `invoice_id` on the visit is set in the same transaction that creates the invoice line. |
| SMS registration delays | Start Twilio A2P 10DLC registration in week 2. |
