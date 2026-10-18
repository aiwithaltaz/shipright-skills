# Build rules

Standing rules for the coding tool. Read this before any change. Tickets link here instead of repeating it.

## Read first

[01-prd.md](01-prd.md), [DESIGN.md](../../DESIGN.md), [04-frontend-spec.md](04-frontend-spec.md), [02-technical-architecture.md](02-technical-architecture.md).

## Scope rules

- Build only the ticket you were given. Later ideas are notes, not UI, disabled controls, hidden routes or data models.
- Never add: connection requests, messages, comments, likes, scraping, browser extensions, unofficial LinkedIn endpoints, multi-account, analytics, billing.
- Every post needs the owner's explicit approval before it can publish. No code path publishes a Draft.
- Never invent data, metrics, quotes, prices or legal text. Sample data is labeled sample data.
- Do not sign up for services, buy, deploy or publish. The owner does that.

## Design rules

- Use only tokens from `design/tokens.css`. No hardcoded colors or spacing.
- One filled button per view. Placement follows DESIGN.md Placement.
- Status is text plus shape plus color, never color alone. Badge means status only.
- Delete and Reconnect always carry a visible text label.
- Copy: short, direct, no em dashes, no hype.

## Interaction floor

- Native controls, visible labels, real headings, visible focus, logical tab order.
- Text 4.5:1, interface boundaries 3:1, targets at least 24 px (44 px on touch).
- Reflow to 320 px and 200% text without sideways scroll.
- Prevent duplicate submission. A disabled action says why. Keep typed values after a failure. Warn before losing unsaved work.
- Status updates use a polite live region and never move focus.
- Reduced motion: no movement, content stays the same.
- No tokens, secrets or private post text in URLs, logs or analytics.

## Flow rules (must pass)

- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.

## Security

Row-level security on every table. Tokens stay on the server and are encrypted. Environment variable names are in 02-technical-architecture.md; values never appear in code.

## Every ticket ends

Reply with changed files, any decision you made, and how you checked. Do not start the next ticket.
