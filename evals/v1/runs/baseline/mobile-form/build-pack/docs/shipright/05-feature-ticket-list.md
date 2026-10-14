# 05 - Feature tickets

**Project path:** `docs/shipright/05-feature-ticket-list.md`
**Version/date:** v0.1, 2026-10-13. **Sources and approval:** 01-prd.md decisions D-01 to D-06 and D-18.

Build in this order. Give Cursor one ticket at a time with PRODUCT.md, DESIGN.md, build-rules.md and the matching screen in 04-frontend-spec.md.
P0 means required for Phase 1.

## Ordered tickets

| ID | Change | Phase / job / screen | Depends on | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| T1 | Expo project setup, Supabase client, env vars | 1 / all | Supabase project (you) | Builder | To do |
| T2 | Database tables and row level security | 1 / J3 to J5 | T1 | Builder | To do |
| T3 | Design system components | 1 / all screens | T1 | Builder | To do |
| T4 | Booking draft store on the phone | 1 / J2 | T1 | Builder | To do |
| T5 | S1 Welcome and launch routing | 1 / J1, J6 | T3, T4 | Builder | To do |
| T6 | S2 Booking details | 1 / J2 | T3, T4 | Builder | To do |
| T7 | S3 Create account | 1 / J3 | T2, T3 | Builder | To do |
| T8 | S4 Log in | 1 / J6 | T2, T3 | Builder | To do |
| T9 | S5 Review and send | 1 / J4 | T2, T4, T7 | Builder | To do |
| T10 | S6 Request status | 1 / J5 | T2, T9 | Builder | To do |
| T11 | S4R Reset password | 1 / J7 (P1) | T8 | Builder | To do |
| T12 | End-to-end and access checks | 1 / all | T5 to T11 | Builder and you | To do |

## Ticket detail

**T1 Project setup (P0)**
- Bounded change: `npx create-expo-app` with TypeScript and Expo Router. Add `@supabase/supabase-js`, `expo-secure-store`, `@react-native-async-storage/async-storage`, `@react-native-community/datetimepicker`, `lucide-react-native` and `react-native-svg`. Read `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` from `.env`.
- Preserve / do not add: no analytics, payments, push or maps SDKs. Never ship the service role key.
- Acceptance checks: app starts on iPhone and Android simulators; Supabase client uses the secure store adapter.
- Open dependency: you create the Supabase project.

**T2 Database (P0)**
- Bounded change: create `profiles`, `booking_requests`, both enums and the policies exactly as in 02-technical-architecture.md.
- Preserve / do not add: no update or delete policies for customers. No extra statuses.
- Acceptance checks: user A cannot read user B's requests; insert with status `confirmed` is refused; two inserts with the same client request ID create one row.
- Verification evidence needed: SQL tests with two test accounts.

**T3 Components (P0)**
- Bounded change: TopAppBar, TextField, DatePickerField, RadioGroup, Button (primary, text), Alert, StatusMessage, BottomActionBar using only DESIGN.md values.
- Preserve / do not add: no other colors, shadows or icon sets.
- Acceptance checks: each state listed in DESIGN.md Components renders; focus ring visible; radio exposes checked state; text scales to 200% without clipping.

**T4 Draft store (P0)**
- Bounded change: `useBookingDraft` hook storing `{ streetAddress, unit, city, postalCode, preferredDate, arrivalPreference, clientRequestId }` under `booking_draft_v1`. Create `clientRequestId` when the draft is created.
- Preserve / do not add: never store name, email or password in the draft. No clear control in UI.
- Acceptance checks: values survive app restart; storage failure does not crash and shows the S2 storage message; draft clears only after a confirmed server row.

**T5 S1 Welcome (P0)**
- Acceptance checks: no draft shows "Book a cleaning"; draft shows "Continue your booking" and the saved message; Log in opens S4; launch rule from 04 works for signed in users.

**T6 S2 Booking details (P0)**
- Bounded change: build exactly the S2 element table in 04. Match `index.html` for layout.
- Preserve / do not add: no price, home size, cleaning type, map, address search or notes field.
- Acceptance checks: every row of the S2 state table; focus moves to first invalid field; error count in StatusMessage is real; date earlier than tomorrow is refused; Back keeps the draft; Continue goes to S3 when signed out and S5 when signed in.

**T7 S3 Create account (P0)**
- Acceptance checks: every row of the S3 state table, including confirmation required and email already used; Back keeps the S2 draft; password not stored on the phone; terms and privacy links shown only from your supplied URLs (D-15).

**T8 S4 Log in (P0)**
- Acceptance checks: wrong details message does not reveal which field; after log in, draft goes to S5, otherwise S6.

**T9 S5 Review and send (P0)**
- Acceptance checks: Change returns to S2 with values; Send disables during sending; dropped network then Check again never makes two rows; Sent clears the draft and shows S6; no price line.

**T10 S6 Request status (P0)**
- Acceptance checks: loading, error with Try again, empty with Book a cleaning, one and several requests; status words plus icon; "Request sent" shown once after sending; Log out ends the session and returns to S1.
- Open dependency: change or cancel route (D-12). Until supplied, F1 for sent requests fails.

**T11 S4R Reset password (P1)**
- Acceptance checks: the same message whether or not the email has an account; the reset link opens the app and lets the person set a new password.
- Open dependency: deep link scheme and Supabase redirect URL set in the project.

**T12 Checks (P0)**
- Acceptance checks: full path S1 to S6 on one iPhone and one Android device; VoiceOver and TalkBack can complete S2; row level security checked with two accounts; all items in 04 "Exact acceptance checks" re-scored with evidence.

## Critique follow-up

| Finding | Severity | Ticket / acceptance change | Evidence closing it |
| --- | --- | --- | --- |
| No change or cancel route after sending (D-12) | Major on S6, F1 | T10 shows the route once supplied | Your decision, then S6 test |
| No price before sending (D-10) | Major, launch risk | S5 gains a price line once decided | Your decision |

A ticket does not turn Fail into Pass. Check the changed artifact before closing the finding.
