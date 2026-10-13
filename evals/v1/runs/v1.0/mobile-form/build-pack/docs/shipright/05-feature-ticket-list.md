# 05 - Feature tickets

**Version/date:** 0.1, 2026-10-13. **Sources and approval:** `01-prd.md`, `04-frontend-spec.md`. Paste one ticket at a time into Cursor. Each one ends with a report and stops.

## Order

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | Tokens, base components | none |
| T2 | Shell, routes and draft store | All routes, S1 | T1 |
| T3 | Database and access rules | Tables, functions, RLS | T2 |
| T4 | Your home | S2 | T3 |
| T5 | Choose a time | S3 | T4 |
| T6 | Sign up with an email code | S4, S5 | T5 |
| T7 | Review, book and see the booking | S6, S7 | T6 |
| T8 | Return visits and sign in | S1 states, S7, S8 | T7 |
| T9 | QA pass | All | T8 |
| T10 | Price, payment and legal lines | S6, S7 | Blocked: U1, U2, U5 |

Before release, run a launch check (store listing, privacy policy, account deletion U9). Not a build ticket.

## Tickets

```text
T1. Foundation and /design preview          Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The owner sees the proposed look on a phone and approves or changes it before any screen is built.
Read first: docs/shipright/build-rules.md, DESIGN.md, src/design/tokens.ts.
Build:
1. Create an Expo app with Expo Router and TypeScript strict. Keep src/design/tokens.ts as given.
2. Add .cursor/rules/shipright.mdc if missing: "Read docs/shipright/build-rules.md before any change."
3. In src/components/ui/ build: Button (primary, text), TextInput, Textarea, Stepper, Header (Back icon plus "Back", step text, title), BottomBar (safe area, top border), Alert (error), Skeleton, StatusTag. Use lucide-react-native icons.
4. Route /design (development builds only) showing: type sizes, every color role with its name, spacing scale, buttons in default, pressed, disabled-with-reason and "Booking..." states, a field in default, focus and error, a Stepper, a selected and a full day chip, a selected and a full time row.
Do not add: any booking screen, Supabase, fonts, a UI kit, a theme switcher.
Done when:
- /design renders on iOS and Android with no hardcoded values outside tokens.ts.
- Every interactive item is at least 48 tall.
- The error field shows text and an icon, not only red.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked. Ask the owner to approve the look.
---
```

```text
T2. Shell, routes and draft store            Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: The app opens on S1 and every step route exists with its header, so the flow can be walked with Back.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (screen table, S1), docs/shipright/02-technical-architecture.md (Routes).
Build:
1. Routes from the Routes table as stubs with the shared Header, step text and BottomBar.
2. src/state/draft.ts: zustand store persisted with AsyncStorage. Fields: home, slot, details, requestId (uuid made when the draft starts). clear() empties it.
3. src/lib/supabase.ts with session persistence. Read env names from the architecture file.
4. S1 Start exactly as specified, including the unfinished-booking block and the "Start over" dialog.
5. Route guards: a step without its prerequisite redirects to the first missing step.
Do not add: tabs, an account screen, onboarding slides.
Done when:
- Fresh install shows "Book a cleaning"; a draft shows "Continue booking".
- "Start over" asks first, then clears only the local draft.
- Back from each stub returns to the previous step.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T3. Database and access rules                Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: Slots, postcodes, profiles and bookings exist with row-level security, and overbooking is impossible.
Read first: docs/shipright/02-technical-architecture.md (Data model, Access rules, Auth).
Build:
1. supabase/migrations: tables service_areas, slots, profiles, bookings with the listed fields and constraints.
2. View open_slots, functions check_postcode and book_slot as described, including request_id retry and the row lock.
3. RLS policies exactly as the Access rules table. No update or delete for customers.
4. supabase/seed.sql with sample postcodes and 28 days of sample slots, commented "SAMPLE DATA, replace before launch".
5. A SQL test: two concurrent book_slot calls on a slot with capacity 1 produce one booking and one slot_full error.
Do not add: admin tables, prices, payments, cleaner records.
Done when:
- Anonymous key can read open_slots and call check_postcode, and nothing else.
- A customer cannot read another customer's booking.
- The concurrency test passes; a repeated request_id returns the same booking.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T4. Your home (S2)                           Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A customer enters their address and home size, and learns at once if the area is not served.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S2).
Build:
1. /book/home with the fields, autofill names, Steppers and copy from S2.
2. Validation on blur and on Continue; focus the first error.
3. Continue calls check_postcode with "Checking postcode..." then goes to /book/time.
4. Save every value to the draft as it changes.
States: postcode not served (field error), network failure (Alert), busy.
Do not add: maps, address lookup services, pets or extras fields, prices.
Done when:
- Not-served postcode shows the exact error text and keeps all fields.
- With the keyboard open at 360 wide, the textarea and its label stay above the bottom bar.
- Leaving and reopening the app restores the values.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T5. Choose a time (S3)                       Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: A customer picks a day and a 2-hour arrival window from real open slots.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S3).
Build:
1. /book/time: draft line, week label with Previous week and Next week, seven equal day chips, arrival time radio rows, bottom bar summary and Continue.
2. Load open_slots one week at a time; group by day in EXPO_PUBLIC_BUSINESS_TZ; format with Intl and the device locale.
3. Select the first day with an open window on load. Continue goes to /book/details, or /book/review when signed in with a profile.
States: loading skeleton, load error with Try again, day full, no windows in 28 days, earlier choice now full. Copy exactly as S3.
Do not add: a calendar month view, cleaner choice, "spots left" counts, prices.
Done when:
- At 360 wide the seven chips fit with no sideways scroll; Dynamic Type at 200% wraps labels.
- VoiceOver reads "Wed 14 Oct, selected" and "8:00 to 10:00, Full, dimmed".
- Continue before choosing a time keeps the hint visible and focuses the time group.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T6. Sign up with an email code (S4, S5)      Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: A new customer creates an account with a 6-digit email code and no password.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S4, S5), docs/shipright/02-technical-architecture.md (Auth).
Build:
1. /book/details: fields, autofill and copy from S4. "Send code" calls signInWithOtp.
2. /book/verify: code field with oneTimeCode autofill, Resend with a 60-second wait, Change email.
3. On success, upsert profiles from the draft, replace S4 and S5 in the stack, open /book/review.
4. Note in the README: set the Supabase email template to send {{ .Token }}.
States: sending, checking, wrong code, expired code, rate limit, profile save failure. Copy exactly as specified.
Do not add: passwords, social sign-in, phone verification, marketing consent boxes.
Done when:
- Wrong code shows the error and keeps the field.
- Back from S6 goes to S3, not to the code screen.
- An email that already has an account signs in without error.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T7. Review, book and see the booking (S6, S7)  Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The customer reviews everything, books once, and sees the booking.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S6, S7).
Build:
1. /book/review: summary rows with Edit links to S3, S2, S4. A changed email sends a new code.
2. "Book cleaning" calls book_slot with the draft requestId. Busy text "Booking...".
3. On success clear the draft and replace the stack with /booking/[id], title "Your cleaning is booked".
4. /booking/[id]: status tag, rows, contact line from EXPO_PUBLIC_CONTACT_PHONE and EXPO_PUBLIC_CONTACT_EMAIL, hidden when both are empty.
States: slot taken, network or unknown result (Try again with the same requestId), already booked, loading, load error.
Do not add: price, payment, cancel or reschedule buttons, share or calendar buttons.
Done when:
- Double tap on "Book cleaning" creates one row.
- Airplane mode during booking, then Try again, creates one row.
- A taken slot keeps home and details and leads to S3.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T8. Return visits and sign in (S1, S7, S8)   Size: one sitting   After: T7
Paste this into your coding tool:
---
Goal: A returning customer always finds their booking, and can sign in again on a new phone.
Read first: docs/shipright/04-frontend-spec.md (S1, S5, S7, S8), docs/shipright/01-prd.md (Return visits).
Build:
1. On launch: signed in with an upcoming booking opens /booking/[id] titled "Your cleaning".
2. /sign-in sends a code and reuses /book/verify in sign-in mode.
3. S7 "Sign out" returns to S1. Cancelled booking shows the Cancelled tag and "Book a cleaning".
4. Not-your-booking state with "Go to start".
Do not add: a booking history list, profile editing, account settings.
Done when:
- Kill and reopen the app after booking: S7 shows.
- Sign out, sign in with the same email: S7 shows.
- Setting status to cancelled in the dashboard shows the Cancelled state.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T9. QA pass                                  Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: The whole flow works by touch, screen reader and large text on both platforms.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md.
Build:
1. Walk S1 to S7 on iOS and Android at 360 and 430 wide.
2. Repeat with VoiceOver, TalkBack and text size at 200%.
3. Grep for raw hex values, font sizes and em dashes outside tokens.ts. Fix them.
4. Compare every screen's copy with the spec; fix drift.
Do not add: new features or screens. List bigger problems instead of fixing them.
Done when:
- A written checklist per screen with Pass, Fail or Not verified, and the reason.
- No clipped text or hidden focused field at 200% text.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T10. Price, payment and legal lines          Size: one sitting   After: T9   Blocked: U1, U2, U5
Paste this into your coding tool only after the owner supplies prices, payment wording and policy links:
---
Goal: The customer sees the price, how they pay and the policy links before booking.
Read first: docs/shipright/01-prd.md (U1, U2, U5), docs/shipright/04-frontend-spec.md (S6).
Build:
1. Add the owner's price rule and wording exactly as supplied. Show the price row on S6 and S7.
2. Add the owner's payment sentence on S6 and the policy links under the summary.
Do not add: card payment, discounts, tips or any text the owner did not supply.
Done when:
- Every new line matches the owner's text word for word.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```
