# Build rules

**Project path:** `docs/shipright/build-rules.md`

**Version/date:** v0.1, 2026-10-13. **Sources and approval:** PRD v0.1 (D1 to D5 approved by the owner's delegation), DESIGN.md v0.1, frontend spec v0.1.

Project paths below are relative to the app root. Read PRODUCT.md, DESIGN.md, this file, the affected frontend specification and ticket.

## Current phase

**Phase and source:** Phase 1, "Track projects" (D3).
**Allowed changes and screens:** S0 Sign in, S1 Projects, S2 Project form (drawer). Tickets T1 to T9.
**Keep:** one list as the dashboard; attention first; status as text + icon + color.
**Remove/change/add:** none yet (no feedback rounds).
**Excluded / later notes only:** client logins, time tracking, invoices, reminders, integrations, tasks, files, comments, charts, summary cards, activity feed, search, filters, sortable columns, user management, delete.

Every visible element needs a current-phase source. No extra features, filters, tabs, counters, chips or navigation.
No disabled placeholders, hidden routes or data models for later phases.
Do not invent brand values or data. Use labeled sample data only for a requested prototype or test.
Use existing sourced components. Proposed choices stay separate until approved or covered by explicit delegation.
Reuse the canonical project system first. Carry its source/version if known and approved exceptions from DESIGN.md or the actual system record. Do not rebrand or replace it without approval; preserve unrelated schema keys. A documentation change does not migrate or verify consumers.

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

## Consequences and pending work

For clear/reset/remove, define the object, scope, saved effects and recovery. Clearing selection is not deleting records.
Saved unfinished work is different from a running background job. Do not invent cancellation, undo, persistence or notifications.

Phase 1 specifics:
- "Discard changes" only drops typed values in the open drawer. It never changes saved data.
- Marking Completed is reversible by setting Active. There is no delete.
- Saving checks `updated_at` so one person cannot silently overwrite another's save.

## Screen brief

Use `docs/shipright/04-frontend-spec.md` as the full brief. Short version for each prompt:

```text
Screen ID and job: S1 Projects. See which active projects need attention; open one.
Current phase and source: Phase 1, D3.
Allowed elements: top bar (label, account menu), title, Add project, Active/Completed segmented control, status line,
  "Needs attention" table, "On track" table. Columns: Project (+client), Lead, Due (+health), Budget (spent of budget, bar, % used, health, spent updated date).
Components and tokens: DESIGN.md; shadcn Table, Button, Badge, ToggleGroup, Sheet, Alert, Skeleton (Proposed with D8).
Actions: Add project opens S2 Add. Project name opens S2 Edit. Segmented control switches view.
States: loading, load failure, no projects, no completed projects, 0 needing attention, all needing attention, populated.
Exit (F1): S2 Cancel/Close/Escape with unsaved prompt. Reused patterns (F2): Cancel then Save project, right aligned. Status (F3): status line under header; Saving...; visible failures.
Responsive: stacked rows under 760px; Add project in bottom bar; drawer full screen under 640px.
Do not add: cards, charts, feed, search, filters, sort, reminders, time, invoices.
```

## Needs approval before build

| ID | Proposal | Blocks |
| --- | --- | --- |
| D6 | Near limit at 90% used; Due soon within 7 days | Nothing; change the one constant if the owner disagrees |
| D7 | Every signed-in staff member may add, edit and complete any project; owner invites staff outside the app | T2, T3 |
| D8 | Next.js + TypeScript, Supabase Postgres and Auth (magic link), Tailwind, shadcn/ui, Lucide, Vercel | T1 and all later tickets |
| D9 | One agency currency; which one is Unknown | T4 |
| TZ | Agency time zone, Unknown | T5 |
| D10 | No delete in Phase 1; use Completed | Nothing unless the owner wants delete |

## Verification and limits

Check each requested change and excluded item. Check affected state, keyboard and responsive behavior with available evidence.
Use realistic difficult content appropriate to the task. Do not create a broad test project for a small fix.
A screenshot does not prove saving, permissions, keyboard behavior or release readiness.
Report unverified behavior. Readiness never authorizes deployment, publication, payment or live messages.
