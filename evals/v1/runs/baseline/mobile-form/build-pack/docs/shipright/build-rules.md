# Build rules

**Project path:** `docs/shipright/build-rules.md`
**Version/date:** v0.1, 2026-10-13. **Sources and approval:** owner request and delegation (D-01 to D-06, D-18).

Project paths below are relative to the app root. Read PRODUCT.md, DESIGN.md, this file, the affected frontend specification and ticket.

## Current phase

**Phase and source:** Phase 1. Sign up and send the first home cleaning request. Owner request, 2026-10-13.
**Allowed changes and screens:** S1 Welcome, S2 Booking details, S3 Create account, S4 Log in, S4R Reset password, S5 Review and send, S6 Request status. Stack: Expo (React Native, TypeScript, Expo Router) with Supabase.
**Keep:** the order details first, account second, review third (D-02). Requests, not instant bookings (D-01).
**Remove/change/add:** add the screens above. Nothing to remove.
**Excluded / later notes only:** payment, prices, instant booking, cancel or change in app, repeat bookings, ratings, reviews, chat, push notifications, promo codes, referral, social sign-in, staff app, home size or cleaning type fields.

Every visible element needs a current-phase source. No extra features, filters, tabs, counters, chips or navigation.
No disabled placeholders, hidden routes or data models for later phases.
Do not invent brand values or data. Use labeled sample data only for a requested prototype or test.
Use existing sourced components. Proposed choices stay separate until approved or covered by explicit delegation.
Use DESIGN.md as the only source of colors, type, spacing, radius and icons. The app name is Unknown: do not invent one.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Use native semantics, visible labels, suitable input types and autocomplete. Keep paste usable.
- Provide logical keyboard order and visible focus. Sticky bars must not hide focused controls.
- Modal focus enters, stays within while open, and returns on dismissal. Provide a visible exit and Escape support.
- Explain field errors with associated text. Preserve valid input and prevent duplicate submission.
- Distinguish selection, focus and errors with non-color cues and correct control semantics.
- Announce relevant status without stealing focus. Hide routine system plumbing, not actionable failures.
- Measure text contrast at 4.5:1, or 3:1 for large text; relevant UI graphics/boundaries need 3:1, subject to applicable exceptions.
- Use at least 24 by 24 CSS pixel pointer targets or a justified WCAG exception. Prefer 44 by 44 for touch-heavy use.
- Check 200% text resizing and 320 CSS pixel reflow where applicable, plus supported product widths.
- Respect reduced motion and meaningful image alternatives. These checks are not complete compliance certification.
- Do not put sensitive phone/email searches, tokens or private records in URLs, analytics or logs by default.

App specifics: never log addresses, emails or tokens. Do not show Supabase, database or network error codes to the person; use the messages in 04.

## Consequences and pending work

For clear/reset/remove, define the object, scope, saved effects and recovery. Clearing selection is not deleting records.
Saved unfinished work is different from a running background job. Do not invent cancellation, undo, persistence or notifications.
The booking draft lives on the phone and is cleared only after the server confirms the request row. A booking request waiting for the business is human work: show "Waiting for confirmation", never a spinner.

## Screen brief

Use the per-screen blocks in `docs/shipright/04-frontend-spec.md`. S2 Booking details is the reference screen; `index.html` (delivered with this pack) shows its layout at phone width. Match its structure and copy, then build the other screens with the same components and placement.

Prompt to give Cursor for each ticket:

> Read PRODUCT.md, DESIGN.md, docs/shipright/build-rules.md, the screen block for {screen} in docs/shipright/04-frontend-spec.md and ticket {ID} in docs/shipright/05-feature-ticket-list.md. Build only that ticket. Use only DESIGN.md values and the listed components. Do not add anything from the excluded list. When done, list each acceptance check with Pass, Fail or Not verified and the evidence.

## Needs approval before build

These are open. Build without them; do not guess them.
- D-10 Price shown on S5. Default until decided: no price line.
- D-11 Payment. Not built.
- D-12 Change or cancel route on S6. Until supplied, S6 has no such row, and F1 for sent requests is not met.
- D-13 Service area check on S2.
- D-14 Arrival hours for Morning and Afternoon.
- D-15 Terms and privacy wording and URLs on S3. Required before public release.
- D-16 Who confirms requests and other outcomes.
- D-17 Home size or cleaning type fields on S2.
- D-07 Supabase email confirmation on or off. Build both S3 paths.

## Verification and limits

Check each requested change and excluded item. Check affected state, keyboard and responsive behavior with available evidence.
Use realistic difficult content appropriate to the task. Do not create a broad test project for a small fix.
A screenshot does not prove saving, permissions, keyboard behavior or release readiness.
Report unverified behavior. Readiness never authorizes deployment, publication, payment or live messages.
