# Build rules

**Version/date:** 0.1, 2026-10-13. Before any change, read this file, `DESIGN.md`, the ticket and its section of `docs/shipright/04-frontend-spec.md`.

## Current phase

**Phase:** Release 1. A new customer books a first home cleaning on their phone (S1 to S8).
**Excluded:** everything in `docs/shipright/01-prd.md` section 4.
Every visible element needs a source in the spec. No extra tabs, filters, counters, badges or navigation. No disabled placeholders, hidden routes or tables for later ideas.
Never invent a business name, price, payment term, contact detail, review or legal text. Owner-supplied values come from config; hide the line when empty.
Sample data lives only in `supabase/seed.sql` and is labeled as sample.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Code

- Expo Router, TypeScript strict. Screens in `app/`, shared parts in `src/components/ui/`, draft store in `src/state/draft.ts`, Supabase client in `src/lib/supabase.ts`.
- Styles use `src/design/tokens.ts` only. No raw colors, sizes or font families in components.
- Writes to `bookings` go only through the `book_slot` function. Never use the service role key in the app.
- Secrets live in `.env`, never committed. Names: see the architecture file.

## Interaction and accessibility

- Visible labels above fields; accessible name equals the label. Placeholders are examples only.
- Correct keyboard type and autofill on every field. Paste always works.
- Validate on leaving a field and on submit. Error text under the field; on submit, focus the first error.
- One primary in the bottom bar. While busy it is disabled and says so ("Booking..."), which prevents double submits. A disabled primary explains why.
- Keep entered values after any failure.
- The bottom bar and keyboard never cover the focused field.
- Targets at least 48 by 48. Text at 200% wraps without clipping.
- Selection, focus and errors use different cues; selection adds a check icon, never color alone.
- Announce status politely without moving focus.
- Reduced motion: fade only.
- Do not log or send email, phone or address to analytics or URLs.

## Verification and limits

Check each ticket's "Done when" list on iOS and Android at 360 and 430 wide. Report what you could not check.
Screenshots do not prove saving or permissions. Do not deploy, publish, submit to stores or call paid services.
