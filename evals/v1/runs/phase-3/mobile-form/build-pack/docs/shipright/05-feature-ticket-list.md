# 05 - Feature tickets

**Project path:** `docs/shipright/05-feature-ticket-list.md`
**Version/date:** 0.1, 2026-10-13. **Sources:** `01-prd.md`, `04-frontend-spec.md`.

Paste one ticket at a time into Cursor. It finishes, reports and stops. Standing rules live in `docs/shipright/build-rules.md`; tickets do not repeat them.

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | Tokens, base components | None |
| T2 | Database, access rules, booking function | Supabase | T1 |
| T3 | Sign in with email code and the gate | S1, `/` | T2 |
| T4 | Your details | S2 | T3 |
| T5 | Your home | S3 | T4 |
| T6 | Choose a time | S4 | T5 |
| T7 | Review and book | S5 | T6 |
| T8 | Your booking and return visits | S6, gate | T7 |
| T9 | Owner facts | S1, S5, S6 | T8; blocked by U1 to U5 for its own parts |
| T10 | QA pass | All | T9 |
| T11 | Launch check | Release | T10, when you plan to publish |

```text
T1. Foundation and /design preview      Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The project runs on a phone simulator and shows the proposed look on one preview page.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.ts, docs/shipright/02-technical-architecture.md (Stack).
Build:
1. Create an Expo app with Expo Router and TypeScript strict. Keep design/tokens.ts as given.
2. Add lucide-react-native and react-native-svg.
3. Build components/ui: Button (primary, text; busy state), TextField (label, hint, error, multiline), ChoiceGroup (radio chips with check icon), CodeField, Alert (danger, success), Badge, StepText, Skeleton. Specs in DESIGN.md Components.
4. Route app/design.tsx, available only when __DEV__: type scale, colors with names, spacing, every component in default, focused, selected, error and busy states.
Do not add: screens, auth, data, a tab bar, a logo or an app name.
Done when:
- /design renders at 360, 390 and 430 widths with no sideways scroll.
- No raw color or size values outside design/tokens.ts.
- Lint and type check pass.
Stop: Do not start T2. Reply with changed files and a screenshot of /design. The owner OKs the look before T2.
---
```

```text
T2. Database, access rules, booking function      Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: The data model exists with row-level security, and a booking can only be made safely through one function.
Read first: docs/shipright/build-rules.md, docs/shipright/02-technical-architecture.md (Data model, Server functions, Access rules).
Build:
1. supabase/migrations: tables profiles, homes, service_areas, slots, bookings exactly as specified, with checks and indexes.
2. Enable RLS on every table with the listed policies only.
3. Functions in_service_area and book_slot, security definer, search_path set, errors slot_full and already_booked.
4. lib/supabase.ts client using EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY. Add .env.example with names only.
5. A SQL test script: two parallel book_slot calls on a slot with capacity 1 give one booking; repeating a request_id returns the same booking.
Do not add: payment, price or staff tables; seed data that looks real.
Done when:
- The test script passes on a local Supabase.
- A signed-in user cannot read another user's profile, home or booking.
Stop: Do not start T3. Reply with changed files and test output.
---
```

```text
T3. Sign in with email code and the gate      Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A person enters an email, types the 6-digit code and lands on their first unfinished step.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (Shared rules, S1), 02-technical-architecture.md (Routes).
Build:
1. app/sign-in.tsx with the email step and code step, copy exactly as in S1. Use signInWithOtp and verifyOtp (type "email").
2. Resend countdown of 60 seconds. "Use a different email" returns to the email step.
3. app/index.tsx gate in the order listed in Routes. Session persists across app restarts.
4. Note in the reply: the owner must change the Supabase email template to show {{ .Token }}.
States: sending, checking, wrong code, expired code, too many tries, no connection.
Do not add: passwords, social sign-in, a welcome or marketing screen. Leave the legal line hidden (T9).
Done when:
- New and returning emails both reach the gate.
- Each S1 error message appears under the field and is announced.
Stop: Do not start T4. Reply with changed files, decisions and how you checked.
---
```

```text
T4. Your details      Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A new user saves their name and phone, then moves to Your home.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (Shared rules, S2).
Build:
1. app/(book)/details.tsx with fields, copy and Step 1 of 4 as in S2. Upsert profiles on Continue.
2. "Sign out" top left; the Modal appears only when a field has typed text.
States: saving, field errors, save failed (values kept, Continue retries).
Do not add: email editing, profile photo, account settings.
Done when:
- Autofill fills name and phone on iOS and Android.
- Submitting empty fields shows three messages and focuses First name.
Stop: Do not start T5. Reply with changed files, decisions and how you checked.
---
```

```text
T5. Your home      Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: The user gives an address in the service area and the home size, and it is saved.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (Shared rules, S3).
Build:
1. app/(book)/home.tsx, Step 2 of 4, fields, groups and copy as in S3.
2. Continue: call in_service_area, then upsert homes, then open /time. Busy label "Checking your area...".
3. Prefill from a saved home.
States: field errors, outside area (message under Postcode, nothing saved), save failed.
Do not add: map, address lookup service, more than one home, extra home questions.
Done when:
- An outside-area postcode shows the S3 message and keeps all other values.
- Back to S2 and forward again keeps typed values.
- The focused Notes field stays above the keyboard and bottom bar at 360 wide.
Stop: Do not start T6. Reply with changed files, decisions and how you checked.
---
```

```text
T6. Choose a time      Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: The user sees open times for the next 14 days and picks one.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (Shared rules, S4).
Build:
1. app/(book)/time.tsx, Step 3 of 4. Query open slots for 14 days, group by day in EXPO_PUBLIC_BUSINESS_TIME_ZONE.
2. Each day is a ChoiceGroup of time chips. Keep the picked slot in a booking-draft store (memory only).
States: loading skeleton, empty with "Check again", load error with "Try again", Continue without a choice.
Do not add: calendar month view, filters, cleaner choice, prices.
Done when:
- 0, 1 and 30 open times render at 360 and 430 with no sideways scroll.
- The selected chip shows a check icon and reads as selected to a screen reader.
Stop: Do not start T7. Reply with changed files, decisions and how you checked.
---
```

```text
T7. Review and book      Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The user checks the summary and books the picked time exactly once.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (Shared rules, S5).
Build:
1. app/(book)/review.tsx, Step 4 of 4, rows and copy as in S5. Each Change button has an accessible name such as "Change time".
2. Create one request ID per visit; call book_slot; on success replace the stack with /booking.
States: booking, slot_full, connection lost, already_booked.
Do not add: price, payment, promo code, tip, terms checkbox.
Done when:
- A double tap creates one booking.
- slot_full shows the Alert and "Choose another time" opens S4 with the home kept.
- Turning off the network mid-booking and pressing Try again creates no second booking.
Stop: Do not start T8. Reply with changed files, decisions and how you checked.
---
```

```text
T8. Your booking and return visits      Size: one sitting   After: T7
Paste this into your coding tool:
---
Goal: The user sees their confirmed booking, and reopening the app always lands on the right step.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (S6), 02-technical-architecture.md (Routes).
Build:
1. app/booking.tsx as in S6, with the Confirmed badge and Sign out. No Back.
2. Gate and (book) routes redirect to the first unfinished step.
States: loading, load error with Try again.
Do not add: cancel or reschedule buttons, "Book another", ratings.
Done when:
- Killing and reopening the app at each step lands on that step or S6.
- Sign out returns to S1.
Stop: Do not start T9. Reply with changed files, decisions and how you checked.
---
```

```text
T9. Owner facts      Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: Owner-supplied facts appear where the spec places them, and stay hidden when empty.
Read first: build-rules.md, 01-prd.md (Risks and unknowns U1 to U6), 04-frontend-spec.md (S1, S5, S6).
Build:
1. config/business.ts with appName, contactLine, termsUrl, privacyUrl, postcodeLabel. Empty by default.
2. Show the S1 legal line and the S6 contact line only when filled. Set app.json name from appName.
Blocked parts: price and payment rows on S5 wait for U1 and U2. Do not build them.
Do not add: invented names, contact details, legal wording or prices.
Done when:
- With empty config, no empty rows or broken links appear.
- With filled config, the lines show with working links.
Stop: Do not start T10. Reply with changed files and what is still blocked.
---
```

```text
T10. QA pass      Size: one sitting   After: T9
Paste this into your coding tool:
---
Goal: The whole flow works by touch, screen reader and large text.
Read first: build-rules.md (Interaction and accessibility), 04-frontend-spec.md.
Build:
1. Walk S1 to S6 at 360, 390 and 430 widths and at 200% text. Fix clipping and keyboard overlap.
2. Walk it with VoiceOver and TalkBack: labels, order, radio state, error and Alert announcements.
3. Check contrast of any color not in DESIGN.md (there should be none).
Do not add: new features or restyling.
Done when:
- A written list of each check with Pass, Fail or Not verified and the device used.
Stop: Reply with the list and changed files.
---
```

T11. Launch check: when you plan to publish, run a ship check against the built app. Store accounts, privacy policy, account deletion rules, custom email sending (02 Risks) and U1 to U4 need your decisions first. Nothing is submitted or published without your OK.
