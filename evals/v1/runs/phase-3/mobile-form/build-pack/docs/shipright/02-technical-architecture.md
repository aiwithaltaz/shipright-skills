# 02 - Technical architecture

**Project path:** `docs/shipright/02-technical-architecture.md`
**Version/date:** 0.1, 2026-10-13. **Status:** Proposed (delegated, D4). Change it before T2; after that, changes cost more.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| App | Expo (React Native), current stable SDK, TypeScript | One codebase for iOS and Android; Cursor handles it well | The audience is mainly on desktop: build a responsive web app first |
| Navigation | Expo Router, one stack, no tab bar | File routes; only one task in this release | Three or more top-level areas appear |
| Auth and data | Supabase: Auth (email one-time code), Postgres, row-level security | Auth, data and access rules in one place | Strict data residency the region list cannot meet |
| Builds | EAS Build | Store builds without a local Xcode setup | Never needed until store release |
| Icons | lucide-react-native with react-native-svg | One line set, one stroke | Owner supplies an icon set |
| Server state | TanStack Query | Loading, error and retry states without custom code | Never needed for this size |

No payment, email or analytics service in this release. Cost: Supabase and EAS have free plans that fit development. Publishing to the App Store and Google Play needs paid developer accounts. The owner signs up; the coding tool never does.

## Routes

| Route | Screen |
| --- | --- |
| `app/index.tsx` | Gate: sends the user to the first unfinished step (D13). No UI beyond a loading state |
| `app/sign-in.tsx` | S1 Sign in (email step, code step) |
| `app/(book)/details.tsx` | S2 Your details |
| `app/(book)/home.tsx` | S3 Your home |
| `app/(book)/time.tsx` | S4 Choose a time |
| `app/(book)/review.tsx` | S5 Review and book |
| `app/booking.tsx` | S6 Your booking |
| `app/design.tsx` | T1 design preview, only when `__DEV__` is true |

Gate order: no session → S1; no profile → S2; no home → S3; no confirmed booking → S4; else S6. Routes in `(book)` redirect to the gate when an earlier step is missing.

## Data model

Only objects from PRD section 4. No tables for later ideas.

| Table | Fields |
| --- | --- |
| `profiles` | `id` uuid PK = `auth.users.id`; `first_name`, `last_name`, `phone` text not null; `created_at` |
| `homes` | `id` uuid PK; `user_id` uuid unique → profiles; `address_line1`, `city`, `postcode` text not null; `address_line2` text null; `bedrooms` smallint 0 to 5 (0 = studio, 5 = 5 or more); `bathrooms` smallint 1 to 4 (4 = 4 or more); `notes` text null, max 500 chars; `created_at`, `updated_at` |
| `service_areas` | `postcode_prefix` text PK. Owner fills (U7) |
| `slots` | `id` uuid PK; `starts_at` timestamptz; `capacity` smallint > 0; `booked_count` smallint default 0, check `booked_count <= capacity`. Owner fills (U8) |
| `bookings` | `id` uuid PK; `user_id` → profiles; `home_id` → homes; `slot_id` → slots; `status` text check in ('confirmed'); `request_id` uuid unique; `created_at`. Partial unique index on `user_id` where status = 'confirmed' (D10) |

Postcodes are stored trimmed and upper-cased with spaces removed before matching.

## Server functions (Postgres, `security definer`, `search_path` set)

- `in_service_area(p_postcode text) returns boolean`: true when the normalized postcode starts with any `postcode_prefix`.
- `book_slot(p_slot_id uuid, p_request_id uuid) returns bookings`:
  1. If a booking with `p_request_id` exists for `auth.uid()`, return it (safe retry).
  2. Require a profile and a home for `auth.uid()`, and `in_service_area(home.postcode)`.
  3. Raise `already_booked` if the user has a confirmed booking.
  4. Lock the slot row (`for update`). Raise `slot_full` if `starts_at <= now()` or `booked_count >= capacity`.
  5. Insert the booking, add 1 to `booked_count`, return the booking.

## Access rules (row-level security on every table)

| Table | Customer can |
| --- | --- |
| `profiles`, `homes` | Select, insert, update only rows where the id or `user_id` = `auth.uid()` |
| `slots` | Select rows with `starts_at > now()` and `booked_count < capacity` |
| `bookings` | Select own rows. No insert, update or delete policy: booking only through `book_slot` |
| `service_areas` | Nothing directly. Use `in_service_area` |

The owner works in the Supabase dashboard. Hiding a button is never an access rule.

## Environment variables

`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` (publishable key, safe in the app), `EXPO_PUBLIC_BUSINESS_TIME_ZONE` (IANA name, Unknown until U6). The service role key never goes in the app, tickets or the repo.

## Constraints and budgets

- Phones only: iOS and Android, widths 360 to 430 points. Text scales with the system setting.
- Proposed budget: every tap shows a visible response at once; any wait over 1 second shows a labeled loading state.
- Times show in the business time zone with the zone name when it differs from the phone's.
- Personal data: name, phone, address and notes. Do not log them or put them in analytics or URLs.

## Risks

| Risk | Effect | Owner | Next step |
| --- | --- | --- | --- |
| Supabase's built-in email sender has low limits and its default template sends a link, not a code | Sign-in fails under real use | Owner | Edit the email template to show `{{ .Token }}` (T3). Set up custom SMTP before release |
| No staff app (D7) | Owner edits slots in the dashboard | Owner | Confirm this works for you |
| Unknown cleaning length (U9) | Slots cannot overlap correctly per cleaner | Owner | Supply durations |
