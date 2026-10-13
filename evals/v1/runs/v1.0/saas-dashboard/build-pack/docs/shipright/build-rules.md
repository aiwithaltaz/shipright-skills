# Build rules

**Version/date:** 0.1, 13 Oct 2026. Read this file, `DESIGN.md`, the ticket and its spec section before any change.

## Current phase

Release 1: screens S0 to S3 in `docs/shipright/04-frontend-spec.md`. The PRD's "Not in this release" list is out: no placeholders, hidden routes or tables for it.
Every visible element needs a source in the spec. No invented data; seed data stays local.

## Code rules

- Only tokens from `design/tokens.css` via the Tailwind theme. No raw hex or px values.
- Only the shadcn/ui components listed in DESIGN.md.
- Status words come only from `lib/project-status.ts`.
- Money uses the workspace currency and `Intl.NumberFormat`, with tabular figures.
- Data access runs on the server under row-level security. Hiding a button is never access control.
- Keys live in environment variables, never in code.
- One ticket at a time. Report changed files, decisions and checks, then stop.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Interaction and accessibility

- Native controls and headings, visible labels, correct input types and autocomplete. Paste works.
- Field errors sit under the field, tied with `aria-describedby`. Keep valid input after a failure.
- Block duplicate submits: disable and show "Saving...". Explain any disabled action. Warn before losing unsaved edits.
- Logical keyboard order and a visible focus ring. Sticky bars never cover focus.
- Dialogs trap focus, close on Escape and return focus to the trigger.
- Status uses `role="status"` without stealing focus. Errors needing action stay as an Alert.
- Contrast 4.5:1 for text, 3:1 for UI boundaries. Targets 24 by 24 minimum, 44 on phone.
- No sideways page scroll at 390 px or 200% text. Status is text, icon and color together. Respect reduced motion.
- No emails, tokens or private records in URLs, analytics or logs.

## Consequences

Removing a deadline or cost: a confirm Modal names the item, then deletes that one row. No undo is promised. Mark complete is reversible. No project delete in this release.

## Needs approval before build

Teammate access (PRD Q1) blocks T11. Project delete (Q2) is not built. The look (D3) needs an OK on /design after T1.
Report what you did not verify. Never deploy, sign up or spend money without the owner's OK.
