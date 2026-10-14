# 04 - Frontend specification

**Project path:** `docs/shipright/04-frontend-spec.md`
**Version/date:** 0.1, 2026-10-13. **Sources:** `01-prd.md` (J1, D1 to D13), `DESIGN.md`. All screens Proposed (delegated).

**Current phase:** sign up and first booking (J1). **Excluded:** everything in PRD section 3.

| ID | Screen | Route | Job |
| --- | --- | --- | --- |
| S1 | Sign in | `/sign-in` | Start an account or sign back in with an emailed code |
| S2 | Your details | `/details` | Give name and phone |
| S3 | Your home | `/home` | Give address and home size |
| S4 | Choose a time | `/time` | Pick one open time |
| S5 | Review and book | `/review` | Check everything and book |
| S6 | Your booking | `/booking` | See the confirmed booking |

Navigation: one stack, no tab bar. Account lives on S6 only. Steps S2 to S5 show "Step n of 4".

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Shared rules for S1 to S5

Layout top to bottom: top bar (Back left, step text right), title, one muted line, fields, bottom bar with one primary Button. Validate on leaving a field and on submit, never while typing. On submit with errors, show each message under its field and move focus to the first. The primary button is never disabled before submit; while working it shows a spinner and a verb ("Saving...") and ignores taps. Network failure: Alert above the bottom bar, values kept, the same button retries. Back never loses typed values in the session.

## S1 Sign in

**Email step.** Title "Enter your email". Line: "We'll send you a 6-digit code. If you're new, this creates your account." Text input "Email" (`keyboardType="email-address"`, `autoComplete="email"`, `textContentType="emailAddress"`, no auto-capitalize). Button "Send code", busy "Sending...". Legal line under the button with Terms and Privacy policy links: hidden until U4 is supplied.
**Code step.** Back returns to the email step with the email kept. Title "Check your email". Line: "We sent a code to {email}." Code input "Code", 6 digits, autofill from email where the platform offers it. Text button "Send a new code", available 60 seconds after the last send, showing "Send a new code in 0:42" until then. Text button "Use a different email". Button "Continue", busy "Checking...".
**Errors:** "Enter an email address, like name@example.com." / "That code isn't right. Check it or send a new code." / "That code has expired. Send a new code." / "Too many tries. Wait a minute, then try again." / "We couldn't send the code. Check your connection and try again."
**Success:** go to the gate (`/`), which opens the first unfinished step.

## S2 Your details (Step 1 of 4)

Top left: text button "Sign out" (no earlier step exists). If any field has typed text, a Modal asks "Sign out? What you typed here isn't saved." with "Keep editing" (text) and "Sign out" (primary).
Title "Your details". Line: "So the cleaner's team can reach you on the day."
Fields: "First name" (`given-name`), "Last name" (`family-name`), "Mobile phone" (`tel`, phone keyboard; format per U6, accept spaces and +).
Bottom bar: "Continue", busy "Saving...". Saves the profile, then S3.
Errors: "Enter your first name." / "Enter your last name." / "Enter a phone number we can call."

## S3 Your home (Step 2 of 4)

Back to S2. Title "Your home". Line: "Where should we come to clean?"
Group "Address" (section heading): "Street address" (`address-line1`), "Apartment, suite or floor (optional)" (`address-line2`), "City" (`address-level2`), "Postcode" (`postal-code`, characters auto-capitalized; label per U6).
Group "Home size": Radio button group "Bedrooms": Studio, 1, 2, 3, 4, 5+. Radio button group "Bathrooms": 1, 2, 3, 4+. Chips wrap to a second line at narrow widths.
Textarea "Notes for the cleaner (optional)", hint "Parking, pets, or how to get in.", placeholder "Example: Ring flat 4B. The cat stays in the bedroom.", 500 characters, counter shows from 400.
Bottom bar: muted line "Saved to your account when you continue." and "Continue", busy "Checking your area...". Calls `in_service_area`, then saves the home, then S4.
Errors: "Enter your street address." / "Enter your city." / "Enter your postcode." / "Choose how many bedrooms." / "Choose how many bathrooms." / Outside area, under Postcode: "We don't clean in {postcode} yet. Check the postcode is right." Nothing is saved; other fields are kept.
Returning user with a saved home: fields prefilled; Continue updates it.

## S4 Choose a time (Step 3 of 4)

Back to S3. Title "Choose a time". Line: "Open times for the next 14 days." Add "Times are in {zone}." only when the phone's zone differs.
Content: for each day with open times, a section heading "Tuesday 14 October" and a Radio button group of time chips ("10:00"). Days without times are left out. Selected chip: accent border, tint, check icon.
Bottom bar: "Continue". Without a choice, the message "Pick a time to continue." appears above the button.
Loading: skeletons for two day groups. Empty: "No open times in the next 14 days. Please check again later." with text button "Check again". Error: Alert "Times didn't load." with text button "Try again"; the title and Back stay usable.

## S5 Review and book (Step 4 of 4)

Back to S4 with the time still picked. Title "Review and book".
List rows, each with a "Change" text button that opens its step: "When" (full date and start time; end time only when U9 is known), "Where" (address lines), "Home" ("2 bedrooms, 1 bathroom", "Studio"), "Notes" (only if given), "Contact" (name, phone). Price and payment rows stay hidden until U1 and U2 are decided.
Bottom bar: "Book this cleaning", busy "Booking...". Calls `book_slot` with one request ID per visit to this screen.
Errors: `slot_full`: Alert "Someone just booked that time. Please choose another." with text button "Choose another time" (opens S4; details and home kept). Connection lost: Alert "We couldn't confirm your booking. Check your connection and try again. You won't be booked twice." `already_booked`: open S6.

## S6 Your booking

No Back; the flow is complete. Title "Your booking". Badge "Confirmed" with check icon. Rows: When, Where, Home.
Contact line: "To change or cancel, contact {owner contact}." Hidden until U3; until then this screen has no change route (open F1 gap).
Text button "Sign out" at the end of the content. Reopening the app lands here.

## Accessibility and widths (all screens)

Check at 360, 390 and 430 widths and at 200% text: nothing clipped, nothing scrolls sideways, the focused field stays above the keyboard and the bottom bar. Labels match accessible names. Radio groups expose role and checked state. Errors and Alerts are announced politely. Targets 48.

## Exact acceptance checks

| Source | Check | Status |
| --- | --- | --- |
| Request | A new user can sign up and book a first cleaning on a phone | Not verified (specification only) |
| Request | The key screen shown as one phone-size HTML file | Preview of S3 supplied; runtime not verified |
| U3 | S6 offers a way to change or cancel | Fail until the owner supplies a contact line |
