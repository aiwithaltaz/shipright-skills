# Tickets as paste-ready prompts

Each ticket is one prompt the user pastes into their coding tool. The tool should finish it in one sitting and stop.
Every screen and element needs a current-phase source. Later ideas stay in notes, not tickets, hidden routes or data models.

## Order

1. **T1 Foundation:** project setup, token file, base styles, a `/design` preview page showing type, color, spacing, buttons, fields and states. Stop for the user's quick OK of the look.
2. **Shell:** layout, navigation, routes, sign-in if in scope.
3. **Core job, happy path:** the main flow end to end with real data access.
4. **States:** loading, empty, error, permission, no matches, saved unfinished work, as the spec requires.
5. **Secondary jobs**, one per ticket.
6. **Motion and 3D**, only if the spec includes them, with reduced-motion and fallback.
7. **QA pass:** keyboard, 390px width, contrast, check-ui or the project's own checks.
8. **Launch check:** hand off to ship-check when the user plans to release.

Vertical slices beat layers. A ticket touches one screen or one capability.
Never mark a ticket Blocked for a reversible choice. Use the Proposed default and name where to change it.
Only prices, legal text, access policy and payments block, and only their own ticket.

## Prompt anatomy

```text
T3. Projects list: happy path              Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: An agency lead sees every active project with due date and budget use, and opens one.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S1).
Build:
1. Route /projects. Server-load active projects (fields in 02-technical-architecture.md).
2. Table: Project and client, Lead, Due, Budget used. Numbers use tabular figures.
3. Row click and Enter open /projects/[id].
Use only tokens from design/tokens.css and existing components in components/ui.
Do not add: filters, charts, export, or any screen not named above.
Done when:
- 0, 1 and 40 projects render without overflow at 390px and 1280px.
- Keyboard: Tab reaches each row link; focus is visible.
- No hardcoded colors or spacing values.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

Rules for every prompt:

- Name the files to read and the files or routes to create or change.
- Steps are ordered and testable. Copy is written out, never "Lorem ipsum" or "Click here".
- Name states and edge cases that apply. Name what not to add.
- "Done when" checks are observable: a route, a keyboard path, a width, a value, a test.
- End with the stop line. One ticket, one report.

## Screen brief, inside the frontend spec

`Screen ID and job | Phase source | Keep / remove / change / add | Layout top to bottom | Components and tokens | Actions and effects | States | Exit (F1), patterns (F2), status (F3) | Responsive order and wrapping | Accessibility | Copy | Do not add | Acceptance checks | Open decisions`

## Interaction floor, in build rules

Use the accessibility criteria in [state-coverage.md](../../ui-ux-design/references/state-coverage.md).
Keep paste usable, input types and autocomplete correct, labels visible and errors tied to their fields.
Prevent duplicate submission. Explain a disabled action. Preserve valid values and warn before losing unsaved work.
Never put sensitive phone/email searches, tokens or private records in URLs, analytics or logs by default.
Keep keyboard focus clear of sticky bars. Status updates do not steal focus.
Do not install registries, call paid services or publish because the pack is ready.

## Return loop

Check each built result against its ticket's checks and the phase boundary.
For implementation checks, use [bounded-verification.md](../../ux-critique/references/bounded-verification.md).
Fix authorized deviations from approved requirements. New scope still needs a decision.
Report what was not verified. Do not call a result production-ready from screenshots.
