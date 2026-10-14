# 04 - Frontend specification

**Project path:** `docs/shipright/04-frontend-spec.md`
**Version/date:** v0.1, 2026-10-13. **Sources and approval:** owner request; D-01 to D-06 and D-18 approved by owner delegation; DESIGN.md v0.1.

## Current phase and allowed screens

**Current phase:** 1. Sign up and send the first cleaning request.
**Excluded / later notes only:** payment, prices, instant booking, cancel or change in app, repeat bookings, ratings, reviews, chat, push notifications, promo codes, referral, social sign-in, staff app, home size fields (D-17). No disabled placeholders or hidden routes for these.

| Screen ID | Job | Actor | Phase | Source |
| --- | --- | --- | --- | --- |
| S1 Welcome | Start a booking or log in | Visitor | 1 | Request, D-02 |
| S2 Booking details | Say where and when | Visitor or customer | 1 | Request, D-01, D-06 |
| S3 Create account | Create an account | Visitor | 1 | Request, D-02, D-03 |
| S4 Log in | Return to an account | Customer | 1 | D-03, return visits (F1) |
| S4R Reset password | Recover access | Customer | 1 | D-03 |
| S5 Review and send | Check and send the request | Customer | 1 | D-01, D-02 |
| S6 Request status | See requests and status | Customer | 1 | D-01 |

Routes (Expo Router): `/` S1, `/book` S2, `/sign-up` S3, `/log-in` S4, `/reset-password` S4R, `/review` S5, `/requests` S6. No other routes.

## Navigation

| Label | Approved destination | Actor / phase | Active treatment |
| --- | --- | --- | --- |
| Back (top left) | Previous screen in the stack | All, 1 | Not applicable |

Stack navigation only. No tab bar. Launch rule: signed in with at least one request opens S6; signed in with a draft opens S5; otherwise S1.
Profile/account home: S6 (name and Log out). Nowhere else.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

Words used everywhere (F2): "booking request" for the object, "Send request" for the action, "Waiting for confirmation" and "Confirmed" for status, "Back" for leaving a screen.

## Per-screen specification

### S2 Booking details (key screen)

**Screen ID / job / source:** S2. The person says where and when they want the cleaning. Request, D-01, D-02, D-06, D-18.
**Keep/remove/change/add:** Add, new screen.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Back | Leave without losing details | F1 | TopAppBar left, `chevron-left` icon plus "Back" |
| "Step 1 of 3" | Know how much is left | F3 | TopAppBar right, caption, text-muted |
| Title "Book a home cleaning" | Name the task | Request | title type |
| Intro "Tell us where and when. You create your account next, and nothing is sent until you review it." | Explain order and that nothing is sent yet | D-02, F1 | body, text-muted |
| Heading "Where" | Group the address | Request | heading type |
| Street address | Address for the cleaner | Request | TextField, `autoComplete="street-address"`, `textContentType="streetAddressLine1"` |
| Apartment, unit or floor (optional) | Find the home | Request | TextField, `textContentType="streetAddressLine2"` |
| City | Address | Request | TextField, `textContentType="addressCity"` |
| Postal code | Address; later service area check (D-13) | Request | TextField, `autoComplete="postal-code"`, `textContentType="postalCode"`; beside City at 360+ width |
| Heading "When" | Group timing | Request | heading type |
| Date | Preferred day | D-01, D-18 | DatePickerField, label "Date", hint "Your preferred day. We confirm it after you send your request." Minimum tomorrow |
| Arrival time | Preferred part of day | D-06 | RadioGroup, legend "Arrival time", options Morning, Afternoon, Any time as full-width rows; hint "We confirm the exact time with your booking." |
| Status message "Not sent. Your details stay on this phone." | Know nothing is sent and work is kept | F1, F3, D-02 | BottomActionBar StatusMessage |
| Continue | Next step | D-02 | BottomActionBar, Button primary, full width |

**Structure and reading order:** TopAppBar, title, intro, Where group, When group, BottomActionBar. DOM, visual and screen reader order match.
**Sizing and alignment:** gutter 20; labels, fields and headings share the left edge. Fields full width except City and Postal code (City grows 1.5, Postal code 1, gap 12). Stack them below 360 width or at large text sizes.
**Actions:** Continue validates all fields. Valid and signed out: save draft, go to S3. Valid and signed in: save draft, go to S5. Back: save draft, go to S1.
**Exit and saved work:** every change saves the draft to the phone (`booking_draft_v1`). Back and closing the app keep it. S1 then shows "Continue your booking".

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Pristine (no draft) | Empty fields, no errors, no option selected | None | Fill in, Back | Screenshot |
| Restored draft | Fields filled from the draft | Read draft | Continue, edit, Back | Device test: close and reopen app |
| Editing | Typed values; no errors while typing | Draft saved on change | Continue | Device test |
| Continue with gaps | Error under each invalid field with `circle-alert` icon; StatusMessage "Check the 3 fields with errors." (real count); focus moves to first invalid field | No navigation | Fix fields | Device and screen reader test |
| Field fixed | That field's error clears on change | Draft saved | Continue | Device test |
| Draft storage fails | Same form; StatusMessage "Your details could not be kept on this phone. You can still continue." | Nothing stored | Continue | Simulated storage error |
| Date in the past or today | "Choose a date from tomorrow." | Not valid | Pick again | Unit test |

Error messages: Street address "Enter your street address." City "Enter your city." Postal code "Enter your postal code." Date "Choose a date." Arrival time "Choose an arrival time." Postal code format checks wait for the country (Unknown).

**Responsive behavior:** content scrolls; BottomActionBar sticky with safe area padding. When the keyboard opens, the bar sits above it and the focused field scrolls above the bar. At 200% text, City and Postal code stack and the bar text wraps.
**Difficult content:** long street names wrap in the field (multiline off, horizontal scroll inside the input is acceptable on device; full value visible on S5). Accents and non-Latin text accepted. No emoji filtering.
**Accessibility:** visible labels equal accessible names; "(optional)" in the label; errors linked by `accessibilityHint` or described-by equivalent and announced; RadioGroup with radio roles and checked state; targets 44+; focus ring visible; StatusMessage is a polite live region.

### S1 Welcome

**Screen ID / job / source:** S1. Start a booking or log in. Request, D-02.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Title "Book a home cleaning" | Name the task | Request | title |
| Text "Send a cleaning request in a few steps. You can check here when it is confirmed." | Set expectations | D-01 | body |
| Book a cleaning / Continue your booking (when a draft exists) | Start or resume | D-02 | BottomActionBar, Button primary |
| Log in | Return to an account | D-03 | Button text, above the primary in the bar |

States: no draft; draft exists (primary label changes, StatusMessage "Your booking details are saved on this phone."). No app name or logo until supplied.

### S3 Create account

**Screen ID / job / source:** S3. Create an account just before review. D-02, D-03, D-07, D-15.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Back, "Step 2 of 3" | Exit, progress | F1, F3 | TopAppBar |
| Title "Create your account" | Name the task | D-03 | title |
| Intro "You need an account to send your request and check its status." | Why now | D-02 | body, text-muted |
| Full name | Who the booking is for | D-03 | TextField, `autoComplete="name"` |
| Email | Sign-in and contact | D-03 | TextField, `keyboardType="email-address"`, `autoComplete="email"`, no autocapitalize |
| Password, hint "At least 8 characters." | Sign-in | D-03 | TextField, `secureTextEntry`, `textContentType="newPassword"`, text button "Show" or "Hide" |
| Terms and privacy links | Legal | D-15 | Owner-supplied wording and URLs only. Not written by us. Blocks public release until supplied |
| I already have an account | Switch to log in | D-03 | Button text |
| StatusMessage "Not sent yet." | Status | F3 | BottomActionBar |
| Create account | Commit | D-03 | Button primary |

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Submitting | Button busy "Creating your account"; fields read only | signUp call | Wait | Device test |
| Success with session | Goes to S5 | Profile inserted | S5 | Integration test |
| Confirmation required (D-07 on) | Title "Confirm your email", text "We sent a link to {email}. Open it, then log in to send your request. Your booking details stay on this phone." Primary "Log in" | No session | S4 | Integration test with setting on |
| Email already used | Field error "An account already uses this email." Text button "Log in instead" | None | S4 with email prefilled | Integration test |
| Password too short | Field error "Use at least 8 characters." | None | Fix | Unit test |
| Network error | StatusMessage "We could not create your account. Check your connection and try again." Values kept | None | Create account again | Simulated offline |

Back returns to S2 with the draft intact. The password is never stored in the draft.

### S4 Log in and S4R Reset password

S4 elements: Back; title "Log in"; Email; Password (`textContentType="password"`, Show/Hide); text button "Forgot password?" to S4R; primary "Log in". After log in: draft exists → S5; else → S6.
S4 states: submitting "Logging in"; wrong details "Email or password is not right." (do not say which); network error with values kept; email not confirmed "Confirm your email first. We sent the link to {email}."
S4R elements: Back; title "Reset your password"; Email; primary "Send reset link". After send: "If an account uses this email, we sent a reset link." Opening the link in the app shows "Set a new password" with Password field and primary "Save password", then goes to S5 or S6 by the same rule.

### S5 Review and send

**Screen ID / job / source:** S5. Check details and send. D-01, D-02, D-10.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Back, "Step 3 of 3" | Exit, progress | F1, F3 | TopAppBar |
| Title "Review your request" | Name the task | D-01 | title |
| Where: address lines, text button "Change" | Check address | D-01 | heading, body, Button text to S2 |
| When: date (for example "Thursday 15 October") and arrival time, text button "Change" | Check timing | D-01 | heading, body, Button text to S2 |
| Sending as: name and email | Know which account | D-03 | support text |
| Text "We confirm the exact time after you send. You can check the status in the app." | Set expectations | D-01 | body, text-muted |
| StatusMessage "Not sent yet." | Status | F3 | BottomActionBar |
| Send request | Commit | D-01 | Button primary |

No price line until D-10 is decided. No "Change" for account in Phase 1.

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Sending | Button busy "Sending your request"; Change and Back disabled with StatusMessage "Sending. Please keep the app open." | Insert with client request ID | Wait | Device test |
| Sent | Goes to S6 with "Request sent" | Row created; draft cleared | S6 | Integration test |
| Already sent (duplicate ID) | Same as Sent | Existing row read | S6 | Integration test |
| Result unknown (network lost) | Alert "We could not confirm your request was sent. Your details are still on this phone." Primary becomes "Check again" | Draft kept | Check again finds row → S6; not found → "Send request" returns | Simulated drop after insert |
| Session expired | "Log in again to send your request. Your details are kept." | Draft kept | S4, then back to S5 | Integration test |

### S6 Request status

**Screen ID / job / source:** S6. See the request and whether it is confirmed. D-01, D-12, D-16.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Title "Your cleaning request" | Name the object | D-01 | title |
| "Request sent" confirmation, once, after arriving from S5 | Result | F3 | StatusMessage area, `check-circle` icon |
| Status: `clock` icon plus "Waiting for confirmation", or `check-circle` plus "Confirmed" | Status | D-01 | Text + icon + color |
| Address, date, arrival time, "Sent on {date}" | Details | D-01 | body |
| Change or cancel route | Recovery after sending | D-12 | Only the route you supply. Until then this row is missing and F1 is not met |
| Name and Log out | Account | D-03 | Bottom of content, Button text "Log out" |

States: loading "Loading your requests" with spinner; load error "We could not load your requests. Check your connection." with "Try again"; empty (signed in, no request) "You have no cleaning requests yet." with primary "Book a cleaning"; one request; several requests (newest first, same layout repeated). Status refreshes on screen focus and pull to refresh. No push notifications.

## Design system

**Mode:** Establish, approved by delegation (D-05).
**Source:** `DESIGN.md` at the project root. Components live in `src/components/`.
Use only values from DESIGN.md. Unknown brand values stay Unknown.

## Exact acceptance checks

| Feedback/source | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| Request: sign up | A new person creates an account with email and password on S3 | Not verified | Specified. Test in the built app |
| Request: book first cleaning | A signed-up person sends one request with address, date and arrival time, and sees it on S6 as "Waiting for confirmation" | Not verified | Specified. Test in the built app |
| D-02 | Details entered before sign-up survive Back, app close and sign-up | Not verified | Device test |
| F3 / duplicates | Losing the network after Send never creates two requests | Not verified | Simulated test |
| Request: key screen at phone size | `index.html` shows S2 at 390 by 844 | Not verified | File written. We did not render or screenshot it |
| Exclusions | No price, payment, rating, chat, tab bar or brand name appears | Pass for the S2 prototype source | Checked by reading `index.html`. Check each built screen |

## Handoff limits

Decisions reserved for you: D-10 price, D-11 payment, D-12 cancel or change route, D-13 service area, D-14 arrival hours, D-15 terms and privacy, D-16 confirmation process, D-17 home size fields, D-07 email confirmation setting.
Nothing here has been built or run. Keyboard, screen reader, storage and network behavior are Not verified.
