# Build rules

**Project path:** `docs/shipright/build-rules.md`
**Version/date:** 0.1, 2026-10-13.

Before any change, read this file, `DESIGN.md`, the affected screen in `04-frontend-spec.md` and the ticket. Do one ticket, report, stop.

## Current phase

**Phase:** sign up and first booking (PRD J1). **Screens:** S1 to S6 and the dev-only `/design` page.
**Excluded:** everything in `01-prd.md` section 3. No placeholders, hidden routes or tables for it.
Every visible element needs a source in the spec. No extra filters, counters, banners or marketing sections.
Never invent the business name, prices, contact details, legal text or real-looking data. Owner facts (U1 to U9) are config values; their UI hides when empty.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Code rules

- Screens in `app/`, shared UI in `components/ui/`, data calls in `lib/`. TypeScript strict.
- Styles use `design/tokens.ts` only. No raw colors or sizes in screens.
- Row-level security on every table. Booking only through `book_slot`. Never ship the service role key.

## Interaction and accessibility

- Visible labels above fields; placeholders show examples only. Correct `keyboardType`, `autoComplete`, `textContentType`. Paste works.
- Validate on blur and on submit. Errors sit under the field with icon and text; on submit, focus the first error.
- One primary button per screen, in the bottom bar. While working it shows a verb and spinner and ignores taps.
- The bottom bar and keyboard never hide the focused field. Status is announced politely without moving focus.
- Contrast 4.5:1 for text, 3:1 for field borders and icons. Targets 48. Selection adds a check icon.
- Text scales to 200% without clipping. Respect reduce motion.
- Never put name, phone, email, address or notes in logs, analytics or URLs.
- A picked time is not a booking. Only `book_slot` success shows "Confirmed".

## Needs approval before build

Owner facts U1 to U4: payment, prices, cancel policy and contact, terms and privacy.

## Verification and limits

Run lint and type checks per ticket. Check screens at 360, 390 and 430 widths. Screenshots do not prove saving or access rules. Report what was not checked. Nothing is published or paid for without the owner's OK.
