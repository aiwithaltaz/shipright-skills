# 02 - Technical architecture

**Project path:** `docs/shipright/02-technical-architecture.md`
**Version/date:** v0.1, 2026-10-13. **Sources and approval:** D-04 (Expo with Supabase), approved by owner delegation. Library versions: use current stable releases at project setup and record them here.

## Systems and stack

| Component | Responsibility | Chosen technology | Source / owner |
| --- | --- | --- | --- |
| Mobile app | All Phase 1 screens, iPhone and Android | Expo (React Native), TypeScript, Expo Router | D-04 |
| Auth | Email and password sign-up, log in, password reset | Supabase Auth (`@supabase/supabase-js`) | D-03, D-04 |
| Database | Profiles and booking requests | Supabase Postgres with row level security | D-04 |
| Session storage on phone | Keep the signed-in session | `expo-secure-store` adapter for Supabase auth storage | Proposed (assistant) |
| Draft storage on phone | Keep booking details until sent | `@react-native-async-storage/async-storage`, key `booking_draft_v1` | D-02 |
| Icons | Line icons | `lucide-react-native` | DESIGN.md, D-05 |
| Business confirmation | Mark requests Confirmed | Unknown (D-16). Until decided, staff can only change status in the Supabase dashboard | Owner |

No payments, push notifications, maps, address lookup or analytics SDK in Phase 1.

## Data and integrations

### Tables

```sql
-- profiles: one row per customer
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 1 and 120),
  created_at timestamptz not null default now()
);

create type public.arrival_preference as enum ('morning', 'afternoon', 'any');
create type public.booking_status as enum ('requested', 'confirmed');
-- Other outcomes (declined, rescheduled) are Unknown (D-16). Do not add them until decided.

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users(id) on delete cascade,
  client_request_id uuid not null,
  street_address text not null check (char_length(street_address) between 1 and 200),
  unit text check (char_length(unit) <= 60),
  city text not null check (char_length(city) between 1 and 100),
  postal_code text not null check (char_length(postal_code) between 2 and 12),
  preferred_date date not null,
  arrival_preference public.arrival_preference not null,
  status public.booking_status not null default 'requested',
  created_at timestamptz not null default now(),
  unique (customer_id, client_request_id)
);
```

### Row level security

```sql
alter table public.profiles enable row level security;
alter table public.booking_requests enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile insert" on public.profiles for insert with check (auth.uid() = id);

create policy "own requests read" on public.booking_requests for select using (auth.uid() = customer_id);
create policy "own requests insert" on public.booking_requests for insert
  with check (auth.uid() = customer_id and status = 'requested');
-- No update or delete policy for customers in Phase 1 (cancel and change are D-12).
```

The earliest date rule (D-18) is checked in the app only until decided. If you approve a rule, also add a database check.

| Object / system | Read/write direction | Fields | Access boundary | Failure behavior |
| --- | --- | --- | --- | --- |
| Booking draft | App writes and reads on phone | Address fields, date, arrival preference, client request ID | This phone only | If storage fails, the form still works for this session; no claim that it was kept |
| Profile | App inserts after sign-up, reads on S6 | full_name | Own row | Show an error on S3, keep the form values |
| Booking request | App inserts on S5, reads on S6 | All listed | Own rows; insert only with status requested | See send flow below |

### Send flow (S5)

1. Create `client_request_id` (UUID) when the draft is created, and keep it in the draft.
2. On "Send request", disable the button and show "Sending your request".
3. Insert the row. Unique `(customer_id, client_request_id)` stops duplicates.
4. Success: clear the draft, go to S6.
5. Duplicate key error: the request already exists. Treat as success, read it, go to S6.
6. Network lost or no answer: do not clear the draft. Show "We could not confirm your request was sent." with "Check again". Check again selects by `client_request_id`. Found: go to S6. Not found: allow sending again with the same ID.

### Sign-up flow (S3)

1. `supabase.auth.signUp({ email, password })`.
2. If a session comes back: insert the profile, go to S5.
3. If no session (email confirmation is on, D-07): show the "Confirm your email" state. Keep the draft and the entered name on the phone. After confirming, the person logs in on S4; insert the profile if missing, then go to S5.
4. If the email already has an account: show the error with "Log in instead".

## Constraints

- iPhone and Android phones, portrait. Tablets and landscape: not designed in Phase 1.
- Needs a network to sign up, log in and send. Booking details can be entered offline and are kept on the phone.
- Supabase anon key in the app is public by design; security relies on row level security. Never put the service role key in the app.

## Dependencies and open decisions

| Unknown / decision | Blocks what | Owner | Next evidence |
| --- | --- | --- | --- |
| D-07 Email confirmation on or off | Which S3 state people usually see | You | Choose the Supabase Auth setting |
| D-13 Service area | An "area not served" check on S2 | You | List of served postal codes or areas |
| D-16 Confirmation process | How status becomes Confirmed | You | Who confirms and with what tool |
| Supabase project, region and email sender | Running the app | You | Create the project and add the URL and anon key to `.env` |
