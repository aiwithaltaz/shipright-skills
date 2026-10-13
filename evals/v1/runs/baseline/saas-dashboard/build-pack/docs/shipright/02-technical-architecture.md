# 02 - Technical architecture

**Project path:** `docs/shipright/02-technical-architecture.md`

**Version/date:** v0.1, 2026-10-13. **Sources and approval:** PRD v0.1. The stack below is **Proposed (D8)**. The owner did not name one. Confirm or replace it before ticket T1.

## Systems and stack

| Component | Responsibility | Chosen technology or Unknown | Source / owner |
| --- | --- | --- | --- |
| Web app | Pages S0 to S2, server actions | Next.js (App Router) + TypeScript. Proposed. | D8, owner |
| UI | Components and styling | Tailwind CSS with DESIGN.md tokens, shadcn/ui on Radix, Lucide icons. Proposed. | D8, D5 |
| Database | Projects, clients, staff profiles | Supabase Postgres. Proposed. | D8 |
| Sign-in | Staff accounts and sessions | Supabase Auth, email magic link. Public sign-up turned off. Proposed. | D7, D8 |
| Hosting | Run the app | Vercel. Proposed. | D8 |
| Integrations | None in Phase 1 | Not applicable | D4 |

Why this stack: one hosted database with built-in sign-in and row-level access rules, small cost at this size, and well known to Cursor. Any equivalent works if the owner prefers.

## Data and integrations

Proposed tables (Postgres). Only these. No tables for later-phase ideas.

```sql
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  created_at timestamptz not null default now()
);
create unique index clients_name_key on clients (lower(name));

-- One row per staff sign-in account (auth.users).
create table staff (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null
);

create type project_status as enum ('active', 'completed');

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  client_id uuid not null references clients(id),
  lead_id uuid not null references staff(id),
  due_date date not null,
  budget_amount numeric(12,2) not null check (budget_amount > 0),
  spent_amount numeric(12,2) not null default 0 check (spent_amount >= 0),
  spent_updated_at timestamptz not null default now(),
  status project_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references staff(id)
);
```

| Object / system | Read/write direction | Approved fields or Unknown | Access boundary | Failure behavior |
| --- | --- | --- | --- | --- |
| projects | Read all; insert; update | As above | Signed-in staff only (D1). Edit rights per D7. | Save fails: form stays filled, Alert "Changes not saved. Try again." |
| clients | Read all; insert by name | name | Signed-in staff only | Duplicate name (case-insensitive) reuses the existing client |
| staff | Read (for Lead select) | full_name, email | Signed-in staff only | If empty, Lead select says "No staff accounts yet" |

Health values (budget and deadline) are calculated in one shared function, `getProjectHealth(project, today)`, used by the list and tests. They are not stored.

Request flow for J4 (edit):
1. S2 opens with the project row, including `updated_at`.
2. Save sends the changed fields plus the `updated_at` that was loaded.
3. Server action checks the session, then updates `where id = $id and updated_at = $loaded`. If spent changed, it also sets `spent_updated_at = now()`. It sets `updated_at = now()` and `updated_by`.
4. Zero rows updated means someone else saved first. Return a conflict. The UI shows the conflict Alert and keeps the values.
5. Success returns the saved row. S1 refreshes the list and shows "Project saved."

No background jobs, queues or scheduled tasks in Phase 1.

## Constraints

- Desktop browsers (current Chrome, Edge, Safari, Firefox) and phone browsers. Reflow down to 320px.
- Up to about 50 active projects: load all in one request, no pagination.
- "Today" uses the agency time zone. Time zone is Unknown; set `AGENCY_TIME_ZONE` in env. Proposed default: none, the builder must ask.
- Currency is one agency-wide value (D9). Set `AGENCY_CURRENCY` (ISO code) in env. Format with `Intl.NumberFormat`.
- Money as `numeric`, never float. Send as strings or integer cents to the client.

## Dependencies and open decisions

| Unknown / decision | Blocks what | Owner | Next evidence |
| --- | --- | --- | --- |
| D8 stack and hosting | T1 and everything after | Owner | Owner says OK or names another stack |
| D7 edit rights | T3 access rules | Owner | Owner decision |
| D9 currency | T4 money display | Owner | ISO currency code |
| Agency time zone | T5 deadline health | Owner | IANA time zone, e.g. Europe/London |
| How staff accounts are created | T2 | Owner | Proposed: owner invites from the Supabase dashboard. No in-app user screens in Phase 1. |
