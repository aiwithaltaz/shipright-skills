# 02 - Technical architecture

**Version/date:** 0.1, 13 Oct 2026
**Sources and approval:** PRD decisions D4 to D8. Stack is Proposed. T1 builds with it; switching now is cheap.

## Stack

| Part | Choice (current stable versions) | Why | Switch when |
| --- | --- | --- | --- |
| App | Next.js App Router, TypeScript | Cursor knows it well; server components load data without an API layer | Never needed for this scope |
| UI | Tailwind CSS mapped to `design/tokens.css`, shadcn/ui on Radix | Accessible Dialog, Select, Checkbox; tokens stay the source | You bring your own component library |
| Data and auth | Supabase: Postgres, Auth (email magic link), row-level security | Database, sign-in and access rules in one place | Strict data residency or an existing database |
| Table | Plain HTML table with server-side order | Under 200 projects fits one page | Over 200 rows or column sorting is requested: add TanStack Table and pagination |
| Charts | None | No decision needs a chart in this release | A report is approved |
| Hosting | Vercel | Zero-config Next.js deploys | Your company already hosts elsewhere |
| Tests | Vitest for status logic, Playwright for the list at 1280 and 390 | Status rules decide what the owner sees first | Never drop |

Cost: Supabase has a free plan with limits. Vercel's free Hobby plan is for non-commercial use; an agency will likely need a paid plan. Check current terms. Nothing is signed up, bought or deployed without your OK (Q5).

## Data model

All tables have `id uuid primary key default gen_random_uuid()`, `created_at timestamptz default now()`, and `workspace_id` except `workspaces`.

| Table | Fields |
| --- | --- |
| workspaces | name text not null, currency char(3) not null, created_by uuid references auth.users |
| workspace_members | workspace_id, user_id uuid references auth.users, unique (workspace_id, user_id) |
| clients | name text not null, unique (workspace_id, lower(name)) |
| projects | client_id, name text not null, lead_name text null, budget_amount numeric(12,2) not null check (>= 0), due_date date not null, status text check in ('active','completed') default 'active', completed_at timestamptz null, updated_at timestamptz |
| deadlines | project_id on delete cascade, title text not null, due_date date not null, done_at timestamptz null |
| costs | project_id on delete cascade, description text not null, amount numeric(12,2) not null check (> 0), spent_on date not null, created_by uuid |

View `project_overview` (`security_invoker = true`, so row-level security applies): project fields, client name, `budget_used` (sum of costs), `next_deadline_date`, `next_deadline_title` (earliest open deadline or the project due date).
Status words are computed in one place, `lib/project-status.ts`, from `next_deadline_date`, `budget_used`, `budget_amount`, status and today's date. Thresholds live there as constants (D6).
"Today" is the viewer's local date. Pass the browser time zone in a cookie set on sign-in; default to UTC if missing.
Money: store numeric, format with `Intl.NumberFormat` and the workspace currency. Never use floats for sums in the client.

No tables for time tracking, invoices, roles or invitations.

## Routes

| Route | Screen | Access |
| --- | --- | --- |
| /sign-in | S0 Sign in | Public |
| /auth/callback | Magic link return | Public, then redirect |
| /setup | S0 Set up workspace | Signed in, no workspace yet |
| / | Redirects to /projects | Signed in |
| /projects | S1 Projects (`?view=active|completed|all`, default active) | Member |
| /projects/new | S3 Project form | Member |
| /projects/[id] | S2 Project detail | Member |
| /projects/[id]/edit | S3 Project form | Member |
| /design | Token and component preview | Development only |

Middleware sends signed-out visitors to /sign-in and returns them to the requested page after sign-in.
A missing or foreign project id shows "Project not found" with a link back to Projects. Never reveal whether the id exists in another workspace.

## Access rules

D8 is Unresolved. Build default, the most restrictive: one member per workspace, the creator.
- Helper `is_member(ws uuid)`: true when `auth.uid()` has a `workspace_members` row for `ws`.
- Every table: select, insert, update and delete only when `is_member(workspace_id)`.
- `workspaces` insert: any signed-in user, then a trigger adds the creator to `workspace_members`.
- Server actions also check membership. Hidden buttons are never access control.
- Deadlines and costs must belong to a project in the same workspace (check in the insert policy).
Inviting teammates and roles wait for Q1 (T11).

## Server actions

`createProject`, `updateProject`, `setProjectStatus`, `addDeadline`, `updateDeadline`, `toggleDeadlineDone`, `removeDeadline`, `addCost`, `updateCost`, `removeCost`. Each validates with zod, returns `{ ok: true }` or `{ ok: false, fieldErrors, message }`, then revalidates `/projects` and the project path.

## Environment variables

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (older projects call it the anon key). No service role key in this app. Never put keys in tickets or client code beyond these public ones.

## Performance budgets

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile on real pages. /projects is one query to the view. No client-side data fetching on first load.

## Analytics and email

None. Supabase sends the sign-in email with its built-in mailer; a custom sender needs your OK.

## Risks

| Risk | Effect | Mitigation |
| --- | --- | --- |
| Wrong "today" across time zones | A project shows Late a day early | Time zone cookie; tests at day edges |
| Access left open by a missing policy | Budgets visible to other workspaces | T2 test: second user sees zero rows |
| Mixed currency later | Wrong sums | One currency per workspace until decided |
