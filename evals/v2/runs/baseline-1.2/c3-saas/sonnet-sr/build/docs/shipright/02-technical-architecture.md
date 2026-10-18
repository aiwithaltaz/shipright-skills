# Technical architecture

Everything here is Proposed (delegated) until the owner agrees. Each choice has a reason and a switch point. No service is added without a job in release 1.

## Stack

| Layer | Choice | Reason | Switch when |
| --- | --- | --- | --- |
| App | Next.js (App Router), TypeScript, current stable versions | One stack most AI coding tools know well. Server code and pages in one repo. | Heavy background jobs appear: add a worker. |
| UI | Tailwind CSS, shadcn/ui on Radix | Accessible Dialog, Select and Toast already exist. Tokens come from `design/tokens.css`. | The owner supplies their own design system: it wins. |
| Data and sign-in | Supabase: Postgres, Auth (email and password), row-level security | Database, sign-in and access rules in one place. | Strict data residency: another host. |
| Email | Resend, only for the invoice email | Deliverability without running mail servers. Needs a verified sender domain (open question 5). | Reminders or marketing mail: separate decision. |
| Hosting | Vercel | Matches Next.js. Free tiers cover development; a live company needs a paid plan. Cost Unknown, owner checks. | Cost or region limits. |
| Dates | `date-fns`, dates stored as plain dates (no time zone) for jobs | A job is on a calendar day at a local start time. Avoids shifted days. | Multi-region customers. |

Not added: analytics, payments, maps, queues, a separate API server, a state library.

## Data model

Only objects named in the PRD. Money is stored as integer cents. All rows carry `company_id`.

| Table | Fields |
| --- | --- |
| `companies` | id, name, reply_to_email, payment_instructions, workday_hours (default 8) |
| `members` | user_id, company_id (one company per user in release 1) |
| `crews` | id, company_id, name, members_text, sort_order |
| `jobs` | id, company_id, crew_id (nullable = needs a crew), job_date, start_time, duration_minutes, customer_name, customer_email (nullable), address, services, price_cents (nullable), status (`scheduled` or `done`) |
| `invoices` | id, company_id, job_id (unique), number, customer_name, customer_email, amount_cents, issued_on, due_on, sent_at, paid_at (nullable) |

Derived, never stored: crew day load (sum of duration), overdue (`paid_at` is null and `due_on` before today), ready to invoice (job is done with no invoice). Invoice number is sequential per company, shown as `INV-0001`, assigned in a database function so two sends cannot share a number. A job with an invoice cannot be deleted or reopened.

## Routes

| Route | Screen |
| --- | --- |
| `/sign-in` | S6 |
| `/schedule?week=YYYY-MM-DD` | S1, week starts Monday. Job panel and dialogs are overlays, not routes. |
| `/invoices?tab=ready\|sent\|paid` | S2 |
| `/settings` | S7 |
| `POST /api/invoices/send` | Creates the invoice and sends the email. Server only. |

Unknown routes return 404 with a link to `/schedule`.

## Access rules

Enforced in Postgres row-level security: a row is readable and writable only when `company_id` matches the signed-in user's membership. Hidden navigation is not access control. The send route re-checks membership and that the job is done and has no invoice. Search, counts and the "needs attention" line use the same policies.

## Integrations and environment variables

Resend is the only one. Names only, never values in code or tickets:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `RESEND_API_KEY` (server only), `EMAIL_FROM`.

Send is safe to repeat: the route inserts the invoice first under the unique `job_id`, sends the email, then sets `sent_at`. If the email step fails, the invoice stays "not sent" and the screen says so with Try again. If the result is unknown, S2 shows the invoice as "Sending, check status" until the server answers.

## Performance budgets

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile on real pages. A week holds a few dozen jobs: load a week at a time, no virtualization. Switch point: over about 10,000 rows on one screen.

## Risks

- Email deliverability and sender verification are outside the code. Owner task.
- Sales tax and invoice legal wording differ by place. Not handled, not written here.
- Time-zone drift if a company works across zones. Out of scope.
