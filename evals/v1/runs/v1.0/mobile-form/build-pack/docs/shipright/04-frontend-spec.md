# 04 - Frontend specification

**Version/date:** 0.1, 2026-10-13. **Sources and approval:** `01-prd.md` (D1 to D9, delegated). Tokens and components: `DESIGN.md`, `src/design/tokens.ts`.

## Current phase and allowed screens

**Current phase:** Release 1, first booking. **Excluded:** see `01-prd.md` section 4. No price, payment, business name or legal line renders until the owner supplies it (U1 to U5).

| Screen ID | Job | Route | Step text |
| --- | --- | --- | --- |
| S1 Start | Start or resume a booking | `/` | none |
| S2 Your home | Say where and how big | `/book/home` | Step 1 of 4 |
| S3 Choose a time | Pick a day and arrival window | `/book/time` | Step 2 of 4 |
| S4 Your details | Give contact details, request a code | `/book/details` | Step 3 of 4 |
| S5 Check your email | Enter the code | `/book/verify` | Step 3 of 4 (booking mode) |
| S6 Review and book | Confirm and book | `/book/review` | Step 4 of 4 |
| S7 Your booking | See what is booked | `/booking/[id]` | none |
| S8 Sign in | Return to a booking | `/sign-in` | none |

Times in examples are 24-hour; the app formats them with the device locale (U8). Every step screen uses the same Header (Back icon plus "Back", step text right, title) and the same bottom bar with one full-width primary. Back never loses entered values: the draft store keeps them.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Start

**Layout:** title "Book a home cleaning". Body: "Tell us about your home, pick a day and an arrival time, then confirm." Bottom bar: "Book a cleaning" (to S2). Under the body: text button "Already booked? Sign in" (to S8).
**Draft state:** when a draft exists, a sunken block under the body reads "You have an unfinished booking" with the known parts ("2 bedrooms, Wed 14 Oct"). Primary becomes "Continue booking" (to the first incomplete step). Text button "Start over" opens a dialog: "Start over? This clears the home and time you entered on this phone. Nothing has been booked." Actions: "Start over" (danger text), "Keep booking".
**Signed in:** with an upcoming booking, redirect to S7. Without one, show S1 as above.
**Do not add:** hero image, prices, ratings, testimonials, feature list.
**Checks:** fresh install shows "Book a cleaning"; a draft shows "Continue booking"; "Start over" clears only the local draft.

## S2 Your home

**Layout, top to bottom:** Header (Back to S1). Title "Your home". Fields: "Street address" (`address-line1`), "Apartment, unit or floor (optional)" (`address-line2`), "City" (`address-level2`), "Postcode" (`postal-code`, default keyboard). Stepper "Bedrooms": Studio, 1 to 6, default 1. Stepper "Bathrooms": 1 to 5, default 1. Textarea "How should the cleaner get in? (optional)", placeholder "Example: key with the concierge", 500 characters. Bottom bar "Continue".
**Validation:** on leaving a field and on Continue. "Enter your street address." "Enter your city." "Enter your postcode." Focus moves to the first error.
**Continue:** button shows "Checking postcode..." and is disabled. Served: go to S3. Not served: error under Postcode, "We do not clean in this area yet. Check the postcode or try another address." Network failure: Alert under title, "We could not check your postcode. Check your connection and try again." All fields kept.
**Checks:** autofill fills address fields on iOS and Android; the textarea stays visible above the keyboard and bottom bar.

## S3 Choose a time

**Layout:** Header (Back to S2). Title "Choose a time". Muted draft line: "2 bedrooms, 1 bathroom, 24 Elm Street".
Day group, legend "Day": row with week label "Wed 14 to Tue 20 Oct" and two icon buttons "Previous week", "Next week" (disabled at the 28-day limits). Seven day chips in one row, equal widths, 64 tall: weekday over date number. Selected: accent fill, white text, check icon. No open window: sunken fill, muted text, "Full", not selectable. Changing the day clears the time choice. The first day with an open window is selected on load.
Time group, legend "Arrival time", help "The cleaner arrives during this window.": one 56-tall radio row per window, "8:00 to 10:00". Selected: 2px accent border, tint fill, check icon. Full rows: muted, "Full", not selectable.
Bottom bar: summary line "Wed 14 Oct, arrives 10:00 to 12:00" once chosen; else "Pick an arrival time to continue." Primary "Continue" (to S4, or S6 when signed in with a profile). Before a choice, a tap focuses the time group.
**States:** loading: sunken skeleton chips and rows, polite "Loading times". Error: Alert "Times did not load. Check your connection and try again." with "Try again". Day full: "Wed 14 Oct is fully booked. Pick another day." No windows in 28 days: "No open times in the next 4 weeks. Check again later." Earlier choice now full: "Your earlier time, 10:00 to 12:00, is now full. Pick another." with the selection cleared.
**Checks:** at 360 wide all seven chips fit without sideways scroll; selection is announced as "selected".

## S4 Your details

**Layout:** Header (Back to S3). Title "Your details". Fields: "First name" (`given-name`), "Last name" (`family-name`), "Email" (`email`, email keyboard, no auto-capitalize), "Mobile phone" (`tel`, phone keyboard), help "The cleaner calls this number if they cannot get in." Muted note: "We email you a 6-digit code to create your account. No password needed." Bottom bar "Send code".
**Errors:** "Enter your first name." "Enter an email like name@example.com." "Enter a phone number." Rate limit: Alert "Too many codes requested. Wait a minute, then try again." Busy: "Sending code...".
**Checks:** paste works in every field; values survive Back and return.

## S5 Check your email

**Layout:** Header (Back to S4 or S8). Title "Check your email". Body "We sent a 6-digit code to sam@example.com." Field "Code" (`oneTimeCode`, number pad, 6 digits). Text buttons: "Resend code" (shows "Resend in 42 s" for 60 seconds after a send), "Change email" (Back). Muted: "Not there? Check your spam folder." Bottom bar: "Continue" in booking mode, "Sign in" in sign-in mode. Busy: "Checking code...".
**Errors:** "That code is not right. Check the email and try again." "This code has expired. Tap Resend code." Profile save failure: Alert "Signed in, but your details did not save. Try again." with "Try again".
**After success:** booking mode saves the profile, replaces S4 and S5 in the stack, opens S6. Sign-in mode opens S7 with an upcoming booking, else S1.

## S6 Review and book

**Layout:** Header (Back to S3). Title "Review and book". Summary list, each row with an "Edit" text button: "When" "Wed 14 Oct, arrives 10:00 to 12:00" (S3); "Home" "2 bedrooms, 1 bathroom" plus address and entry notes (S2); "Your details" name, email, phone (S4; a changed email needs a new code). Price, payment and legal rows render only from owner-supplied content (U1, U2, U5). Bottom bar "Book cleaning".
**States:** busy: "Booking..." disabled, polite announcement. Slot taken: Alert "That time was just taken. Your home and details are saved." Primary becomes "Choose another time" (S3). Network or unknown result: Alert "We could not confirm your booking. Check your connection and try again." Primary "Try again" resends the same request ID. Already booked: "You already have a cleaning booked." Primary "View booking".
**Checks:** a double tap creates one booking; the airplane-mode retry creates one booking.

## S7 Your booking

**Layout:** no Back (root of the signed-in app). Title "Your cleaning is booked" right after booking, "Your cleaning" on later visits. Status tag "Booked" (success, check icon). Rows: date, arrival window, address, home size, entry notes. Line "To change or cancel, call {phone} or email {email}." from config, hidden when empty (U4). Text button "Sign out".
**States:** loading skeleton; error Alert "Your booking did not load." with "Try again"; cancelled tag "Cancelled" (muted, x icon) with primary "Book a cleaning"; not your booking: "This booking is not on your account." with "Go to start".

## S8 Sign in

Header (Back to S1). Title "Sign in". Body "Enter the email you booked with. We email you a 6-digit code." Field "Email". Bottom bar "Send code" to S5 in sign-in mode. Same errors as S4.

## Accessibility, all screens

Visible labels; accessible names match them. Errors announced politely and linked to fields. Radio semantics for chips and rows. Targets 48. Text at 200% wraps without clipping; the bottom bar grows and content scrolls. Focus stays visible above the bottom bar and keyboard.

## Handoff limits

All behavior here is specified, not verified. Prices, payment, legal text, contact details and data access stay with the owner (PRD section 8).
