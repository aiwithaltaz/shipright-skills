# Build rules

**Version/date:** 0.1, 13 Oct 2026. Before any change, read this file, DESIGN.md, the ticket and its screen spec.

## Current phase

Release 1, internal tracking. Screens S0 to S3 plus `/design`. Exclusions: 01-prd.md section 4.

- Every visible element traces to 04-frontend-spec.md. No extra tabs, counters, chips, cards, navigation, placeholders, hidden routes or tables.
- Use only `design/tokens.css` tokens and `components/ui` components. No raw hex or px.
- Never hardcode a currency symbol. Format amounts with `lib/money.ts` using `NEXT_PUBLIC_CURRENCY`.
- Seed data is marked "Sample" and runs only in development.
- One ticket at a time. Stop and report.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Native controls, visible labels, correct input types and autocomplete.
- Field errors sit by the field (`aria-describedby`). Keep valid input after a failed save. No double submit. A disabled button says why.
- Logical keyboard order; focus ring always visible, never under the bottom bar.
- Dialogs: focus moves in and stays, Escape closes, focus returns to the trigger.
- Status uses `role="status"` without moving focus. Actionable errors stay until fixed.
- Selection, focus and errors never rely on color alone.
- Contrast 4.5:1 text, 3:1 large text and control borders. Targets 24 px minimum, 44 px on phone.
- No sideways scroll at 390 px; reflow at 320 px. Respect reduced motion.
- No emails, tokens or private records in URLs, analytics or logs.

## Data and access

- Queries run on the server with the user's session. Row-level security stays on. Hiding a button is never access control.
- `SUPABASE_SERVICE_ROLE_KEY` is server only.
- Add no members besides the owner until D-04 is decided (T9).

## Consequences

Remove deadline deletes that deadline only, after a confirm dialog. Mark completed is reversible. Cancel discards unsaved edits only, with a warning if fields changed. Nothing else deletes data.

## Needs approval before build

- D-04: who can see budgets, edit projects and add members. Blocks T9 only.
- D-08: currency code. Until set, the preview and seed use USD as sample formatting.

## Verification

Check each ticket at 1280 and 390 wide with 0, 1 and many rows and long names. Report what you did not check. Nothing is deployed or paid for without the owner's OK.
