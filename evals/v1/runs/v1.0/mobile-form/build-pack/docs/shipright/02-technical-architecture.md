# 02 - Technical architecture

**Version/date:** 0.1, 2026-10-13. **Sources and approval:** `01-prd.md`. Stack is Proposed (D4); T1 builds with it. Change it here before T2 if you want another.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| App | Expo (React Native), Expo Router, TypeScript, current stable versions | One codebase for iOS and Android; Cursor knows it well | You only need a web page: build a Next.js web app instead |
| Forms | react-hook-form with zod | Field-level errors, few re-renders | Forms stay this short: plain state is enough |
| Draft state | zustand with persist to AsyncStorage | Keeps the booking draft across steps and app restarts (D8) | Drafts must sync across devices: store them in Supabase |
| Dates | date-fns plus `Intl.DateTimeFormat` | Week math; device-locale formatting | None expected |
| Icons | lucide-react-native | One line family, matches DESIGN.md | Brand supplies its own set |
| Back end | Supabase: Auth (email one-time code), Postgres, row-level security | Auth, data and access rules in one place; free plan fits a first release | Heavy scheduling logic: add a server function |
| Builds | EAS Build, Expo Go during development | Store builds without local Xcode setup | You already ship with Xcode or Android Studio |

No payments, email provider, analytics or push service in this release. The free Supabase and EAS plans are enough to build; store accounts cost money and are the owner's decision.

## Data model

Fields come from PRD objects only.

| Table | Fields | Notes |
| --- | --- | --- |
| `service_areas` | `postcode` text primary key, `active` bool | Owner fills in the dashboard (U7) |
| `slots` | `id` uuid, `starts_at` timestamptz, `ends_at` timestamptz, `capacity` int, `booked_count` int default 0 | One row per 2-hour arrival window (D6). Owner adds rows |
| `profiles` | `id` uuid = `auth.users.id`, `first_name`, `last_name`, `phone`, `created_at` | Email lives in `auth.users` |
| `bookings` | `id` uuid, `customer_id` uuid, `slot_id` uuid, `request_id` uuid unique, `address_line1`, `address_line2` nullable, `city`, `postcode`, `bedrooms` int 0 to 6, `bathrooms` int 1 to 5, `entry_notes` text nullable max 500, `status` text `booked` or `cancelled`, `created_at` | `bedrooms` 0 means studio |

View `open_slots`: `id`, `starts_at`, `ends_at`, `is_full` (`booked_count >= capacity`), only rows from tomorrow 00:00 to 28 days ahead in the business time zone (U8, Proposed: one fixed zone in `EXPO_PUBLIC_BUSINESS_TZ`).

Function `check_postcode(p text) returns boolean`: true when the normalized postcode is active.

Function `book_slot(request_id, slot_id, address fields, bedrooms, bathrooms, entry_notes) returns bookings`, `security definer`:
1. If a booking with this `request_id` exists for `auth.uid()`, return it (safe retry).
2. If the customer already has an upcoming `booked` booking, raise `has_upcoming_booking`.
3. Lock the slot row (`select ... for update`). If full or past, raise `slot_full`.
4. Insert the booking, increment `booked_count`, return the booking.

## Routes

| Route | Screen | Access |
| --- | --- | --- |
| `/` | S1 Start, or redirect to `/booking/[id]` when signed in with an upcoming booking | Anyone |
| `/book/home` | S2 Your home | Anyone |
| `/book/time` | S3 Choose a time | Anyone with a home in the draft |
| `/book/details` | S4 Your details | Anyone with a slot in the draft |
| `/book/verify` | S5 Enter code (booking and sign-in modes) | Code sent this session |
| `/book/review` | S6 Review and book | Signed in, complete draft |
| `/booking/[id]` | S7 Your booking | Signed in, own booking |
| `/sign-in` | S8 Sign in | Signed out |
| `/design` | Token preview from T1 | Development builds only |

A route guard sends a user without the needed draft step back to the first missing step. Guards are convenience, not access control.

## Access rules (row-level security)

| Table | Anonymous | Signed-in customer | Owner |
| --- | --- | --- | --- |
| `service_areas` | none; use `check_postcode` | none; use `check_postcode` | dashboard |
| `slots` | read `open_slots` only | read `open_slots` only | dashboard |
| `profiles` | none | read, insert, update own row | dashboard |
| `bookings` | none | read own rows; insert only through `book_slot`; no update or delete | dashboard |

Owner access through the dashboard is Proposed and Unresolved (U6). Who else may see customer data is the owner's decision.

## Auth

`supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })`, then `verifyOtp({ email, token, type: 'email' })`. Set the Supabase email template to send the 6-digit code, not a link. Sessions persist with AsyncStorage. After verify, upsert `profiles` from the draft. Default code expiry and rate limits are Supabase settings; keep defaults and show their errors in plain words.

## Environment variables

`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_BUSINESS_TZ`, `EXPO_PUBLIC_CONTACT_PHONE`, `EXPO_PUBLIC_CONTACT_EMAIL` (U4; S7 hides the line when empty). Never put the service role key in the app.

## Performance and limits

- Cold start to S1 under 3 s on a mid-range Android phone in a release build.
- S3 loads one week of slots per request; show a skeleton after 300 ms.
- Every screen works at 360 wide and with text size at 200%.

## Risks

- Overbooking: prevented only by `book_slot` locking. T6 tests two parallel calls.
- Time zones: slots are stored in UTC and shown in the business time zone. When the device time zone differs, S3 shows one line: "Times are local to the cleaning address."
- Email codes can land in spam. S5 says where to look and offers Resend.
