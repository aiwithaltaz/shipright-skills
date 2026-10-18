# Technical architecture

Status: Proposed (delegated). Each choice has a reason and a switch point. Use the current stable version of everything.

## Stack

| Choice | Why | Switch when |
| --- | --- | --- |
| Next.js (App Router), TypeScript | One stack most AI coding tools handle well; server routes for the LinkedIn calls | Never needed for this scope |
| Tailwind CSS, with tokens from `design/tokens.css` | Tokens stay the source; utility classes read them | A team prefers CSS modules |
| shadcn/ui on Radix for Dialog, Select and Segmented control | Accessible dialog and focus handling | A component is missing: write a small one |
| Supabase: Postgres, row-level security | Posts and settings in one place, per-user access enforced in the database | Needs a worker-heavy queue: add a worker |
| LinkedIn sign-in (OAuth 2.0, official) as the only sign-in | The app needs a LinkedIn authorization anyway; one login, one consent | Email sign-in is requested later |
| Scheduled publishing: a cron job that runs every minute and publishes due, approved posts | Smallest thing that works. Vercel Cron or Supabase scheduled function | Under a minute accuracy, or many users: a real queue |
| Hosting: Vercel | Matches the stack. Cost on the default plan is Unknown. Owner decides. Never sign up or deploy for the owner. | Data residency needs |
| AI drafting (T8 only): one server route calling a model provider | Keeps keys off the browser | Owner declines AI drafting: skip T8 |

No analytics. No email service. No payments. No extra service without a job in this release.

## LinkedIn integration

- Use the official LinkedIn developer app with the member-authorized posting permission (member-level `w_member_social`) and the Posts API. Which LinkedIn products must be requested and approved is Unknown until checked at the LinkedIn Developer Portal by the owner.
- Token lifetime and refresh availability are Unknown. Design for expiry: when a token is missing or expired, the connection state is Expired and S1 shows the Reconnect alert.
- Publishing call is made once per post. Store the LinkedIn post id on success. On a network timeout where the result is unknown, mark the post "Check LinkedIn" and do not retry automatically.
- No scraping, no headless browser, no extension, no unofficial endpoints. This is a rule, not a preference.

## Data model (from PRD objects only)

- `profiles`: `user_id`, `linkedin_member_id`, `display_name`, `time_zone`
- `connections`: `user_id`, `status` (connected, expired, disconnected), `expires_at`, encrypted token reference
- `posts`: `id`, `user_id`, `body` (max 3,000), `status` (draft, scheduled, published, failed), `scheduled_at` (nullable), `published_at`, `linkedin_post_id`, `failure_reason`, `updated_at`

Row-level security: every table is readable and writable only where `user_id = auth.uid()`. Tokens are never sent to the browser.

## Routes

| Route | Screen |
| --- | --- |
| `/` | S0 when not connected, otherwise redirect to `/queue` |
| `/queue` | S1 with S2 beside it. `/queue?post=<id>` opens a post |
| `/settings` | S3 |
| `/api/linkedin/callback` | OAuth return |
| `/api/cron/publish` | Called by the scheduler only, with a secret header |

## Environment variable names (values never in code or tickets)

`LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `LINKEDIN_REDIRECT_URI`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TOKEN_ENCRYPTION_KEY`, `CRON_SECRET`, `AI_API_KEY` (T8 only).

## Performance budget

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile. Measure on the built `/queue` page. Queue is server-loaded, paginated by week.

## Risks

- LinkedIn may decline or limit the developer app, or change posting permissions. Mitigation: confirm access before T3.
- A user who signs up expecting outreach automation will not find it. Mitigation: say what the product does on S0.
- Publishing at a missed minute: the cron picks up due posts it missed once, then marks them Failed if more than 15 minutes late (Proposed). Owner to confirm.
