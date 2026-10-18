# Build rules

Standing rules for the coding tool. Tickets link here and do not repeat them. Pointer for the tool (`AGENTS.md`, `CLAUDE.md` or `.cursor/rules/shipright.mdc`): "Read docs/shipright/build-rules.md before any change."

## Stack and scope

- Stack as in `02-technical-architecture.md` (Next.js, TypeScript, Tailwind, shadcn/ui, Supabase, Resend). Use current stable versions. Do not add a service, library or table that a ticket does not name.
- Build only what the PRD's current release lists. Later ideas live in its "Not in this release" list, never as disabled buttons, hidden routes or tables.
- Sample data is labeled as sample data and never ships to production.

## Design

- Use tokens from `design/tokens.css` and names from `DESIGN.md`. No hardcoded colors, spacing or radii.
- One filled button per view. Primary action top right of the page, right side of dialogs. Delete is danger text on the left of a form footer.
- No icon-only buttons except close, search, menu, more and back. Every icon has one family and style.
- Amber means needs action. Red means failure or destructive. Green accent means primary or here. Every status has text and an icon.
- Copy is short and plain. No em dashes. Errors say what failed and the next step.

## Interaction floor

- Native controls, visible labels, associated errors, 16px field text on phones, correct `type` and `autocomplete`. Never block paste.
- Keyboard completes every task. Focus is visible. Dialogs trap focus, close on Escape and return focus to the trigger.
- Prevent double submit. Explain a disabled action. Keep valid input after an error. Warn before discarding entries.
- Status updates use a polite live region and never move focus. No fake progress, no "saved" or "sent" without a real result.
- Never put customer names, emails or tokens in URLs, analytics or logs.
- Do not install registries, call paid services, deploy or send email because a ticket is done.

## Access

Authorization lives in row-level security and in server routes. Hidden buttons are not access control. Secrets use the environment variable names in the architecture file and never reach front-end code.

## Flow rules

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Done means

Every ticket ends with its own checks, a 1280 and a 390 check, and a report of changed files, decisions made and how it was checked. A ticket never turns a failed check into a pass.
