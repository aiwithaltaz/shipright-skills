# 02 - Technical architecture

**Version/date:** 0.1, 13 Oct 2026. **Status:** Proposed (delegated, D-05). Build T1 with it; changing it later is cheap at that point.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| App | Next.js (App Router), TypeScript, current stable versions | Cursor handles it well; server components load data without a separate API | You need a native phone app: add Expo later |
| Styling | Tailwind CSS mapped to `design/tokens.css` variables | Tokens stay the single source; utilities speed up screens | Never use raw hex or px in components |
| Components | shadcn/ui (on Radix) | Accessible Dialog, Dropdown menu, Popover; code lives in `components/ui` | A control it lacks: build from Radix, record it in DESIGN.md |
| Data and sign-in | Supabase: Postgres, Auth (email link), row-level security | Database, sign-in and access rules in one place | Strict data residency or heavy background jobs |
| Table | Plain HTML table, server-side sorting | Under about 200 rows; no extra library needed | Over 200 rows or user column sorting: add TanStack Table |
| Hosting | Vercel | Default host for Next.js | Owner prefers another host |
| Charts, email, analytics | None | Not in this release | A later release asks for them |

**Hosting cost.** Supabase has a free plan with limits; free projects can pause when idle. Vercel's free Hobby plan is for non-commercial use, so an agency likely needs a paid plan. Check current terms. Nothing is signed up, bought or deployed for you.

## Data model

Money is stored as whole minor units (cents) in `bigint`. Dates are `date`; timestamps are `timestamptz`.

| Table | Fields |
| --- | --- |
| `members` | `user_id uuid pk -> auth.users`, `email text unique`, `display_name text not null`, `created_at` |
| `clients` | `id uuid pk`, `name text not null unique (case-insensitive)`, `created_at` |
| `projects` | `id uuid pk`, `client_id -> clients not null`, `name text not null`, `lead_id -> members not null`, `budget_cents bigint not null check >= 0`, `spent_cents bigint not null default 0 check >= 0`, `spent_updated_at timestamptz`, `spent_updated_by -> members`, `status text check in ('active','completed') default 'active'`, `completed_at timestamptz`, `created_at`, `updated_at` |
| `deadlines` | `id uuid pk`, `project_id -> projects on delete cascade`, `title text not null`, `due_on date not null`, `done_at timestamptz`, `created_at` |

No tables for time tracking, invoices, files or client users.
Derived in `lib/attention.ts` (D-07): next open deadline, days late or until due, budget percent, budget state, and the attention sort order.

**Attention sort (S1 Active).** 1. Late deadline, most days late first. 2. Over budget. 3. Due soon, soonest first. 4. 80% or more used. 5. Everything else by next deadline, then projects with no open deadline, by name.

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/sign-in` | S0 | Public. Redirects to `/projects` when signed in |
| `/` | | Redirects to `/projects` |
| `/projects` | S1 | `?view=completed` shows the Completed view. Default is Active |
| `/projects/new` | S3 | |
| `/projects/[id]` | S2 | Missing or not allowed: "Project not found" with a link back to Projects |
| `/projects/[id]/edit` | S3 | |
| `/design` | Token preview from T1 | Remove or protect before launch |

Writes use Next.js server actions with input checks (zod). Each action returns a typed result with a user-facing error message.

## Access rules

- Every route except `/sign-in` requires a session (middleware). Server code checks again; hiding a button is never access control.
- Row-level security on every table: a user can read or write only if their `auth.uid()` is in `members`. No public access.
- Until D-04 is decided, `members` holds only the owner. Who else can be added, and whether budgets are visible to everyone, is **Unresolved (D-04)**. T9 implements the answer.
- Sign-in by email link (D-06). A signed-in email that is not in `members` sees "This email is not on the team list. Ask the agency owner to add you." and a Sign out button.

## Environment variables

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only, never in client code or tickets), `NEXT_PUBLIC_APP_NAME` (D-09), `NEXT_PUBLIC_CURRENCY` (ISO code, D-08, Unknown until the owner says).

## Performance

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile on `/projects`. One query per screen with joins; no client-side waterfalls.

## Risks

| Risk | Effect | Mitigation |
| --- | --- | --- |
| Spend figures go stale | Budget health is wrong | Show "Updated [date] by [name]" on S2 |
| Access decision delayed | Only the owner can use it | T9 stays separate; the rest builds now |
| Currency unknown | Wrong symbol | One setting; no hardcoded symbols |
