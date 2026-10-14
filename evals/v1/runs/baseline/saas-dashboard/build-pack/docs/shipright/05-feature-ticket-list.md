# 05 - Feature tickets

**Project path:** `docs/shipright/05-feature-ticket-list.md`

**Version/date:** v0.1, 2026-10-13. **Sources and approval:** PRD v0.1, frontend spec v0.1. Tickets cover Phase 1 only.

P0 means required for this release; P1 describes delivery priority, not defect severity.
**Start condition:** D7, D8 and D9 decided, and agency time zone known. Until then, T1 to T3 are blocked.

## Ordered tickets

| ID | Change | Phase / job / screen | Depends on | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| T1 | Project setup and design tokens | 1 / all | D8 | Builder | Blocked (D8) |
| T2 | Staff sign-in, sign-out, route guard | 1 / J1 / S0 | T1, D7 | Builder | Blocked |
| T3 | Database tables and access rules | 1 / J2-J5 | T1, D7 | Builder | Blocked |
| T4 | S1 Projects list with groups and states | 1 / J2 / S1 | T3, T5, D9 | Builder | To do |
| T5 | Health calculation function and tests | 1 / J2 | T1, time zone | Builder | To do |
| T6 | S2 Add project | 1 / J3 / S2 | T4 | Builder | To do |
| T7 | S2 Edit project, status, Completed view | 1 / J4, J5 / S1, S2 | T6 | Builder | To do |
| T8 | Unsaved changes, save failure, conflict | 1 / J3, J4 / S2 | T7 | Builder | To do |
| T9 | Responsive and accessibility pass | 1 / all | T4-T8 | Builder | To do |

## Ticket detail

**T1, P0, D8, D5**
- Bounded change: create the app with the approved stack. Put DESIGN.md colors, type, spacing and radius into Tailwind theme tokens. Add the component library and icon set.
- Preserve / do not add: no extra pages, no dark mode, no marketing page.
- Acceptance checks: tokens match DESIGN.md values exactly; `AGENCY_CURRENCY` and `AGENCY_TIME_ZONE` read from env and fail loudly at start if missing.
- Verification evidence needed: build runs; token file diff against DESIGN.md.

**T2, P0, J1**
- Bounded change: S0 as in the spec. Magic-link sign-in, public sign-up off. Every route except `/sign-in` redirects there when signed out, then returns to the page asked for. Account menu with Sign out.
- Preserve / do not add: no sign-up form, no password reset, no user management.
- Acceptance checks: S0 states in the spec; a not-invited email sees the same message as an invited one; Sign out goes to S0.
- Verification evidence needed: run through sign in, sign out, expired session.

**T3, P0, J2-J5**
- Bounded change: tables from 02-technical-architecture.md. Row-level security per 03-security-and-access.md. No delete policy.
- Preserve / do not add: no tables for tasks, time, invoices or reminders.
- Acceptance checks: signed-out requests get nothing; signed-in staff can select, insert and update; delete is refused; client name unique ignoring case.
- Verification evidence needed: SQL tests or scripted requests as a signed-out user and as staff.

**T4, P0, J2**
- Bounded change: S1 as specified: page header, segmented control with counts, status line, "Needs attention" and "On track" tables, columns, ordering, loading, load failure, empty states.
- Preserve / do not add: no summary cards, charts, activity feed, search, filters, sortable headers.
- Acceptance checks: every S1 state row in the spec; columns line up across both tables; money formatted with `AGENCY_CURRENCY`.
- Verification evidence needed: screenshots at 1280px and 375px with 0, 1 and 12 projects; long names.

**T5, P0, J2, D6**
- Bounded change: `getProjectHealth(project, today)` returning budget health, deadline health, needs attention, used %. Thresholds in one constant (90%, 7 days).
- Acceptance checks: unit tests: spent = budget is Near limit (100%), spent > budget is Over budget, 89.9% is On budget, due today is Due soon, due yesterday is Overdue, due in 7 days is Due soon, in 8 days is On schedule, completed has no deadline health. "Today" uses `AGENCY_TIME_ZONE`.
- Verification evidence needed: test run output.

**T6, P0, J3**
- Bounded change: S2 Add mode: fields, client combobox with "Add new client", validation messages from the spec, Saving state, success returns to S1 with status line.
- Acceptance checks: invalid submit shows each field message and focuses the first; double click on Save project sends one request; new client is created once.
- Verification evidence needed: runtime test.

**T7, P0, J4, J5**
- Bounded change: S2 Edit mode, focus on Spent so far, "Last updated" help text, Status radio group. S1 Completed view. Changing spent sets `spent_updated_at`.
- Acceptance checks: saving a changed spent updates "Spent updated [date]"; saving without changing spent keeps the old date; Completed moves the row to the Completed view; Active moves it back.
- Verification evidence needed: runtime test.

**T8, P0, J3, J4, F1, F3**
- Bounded change: unsaved prompt on Close, Cancel, Escape and scrim click; save failure Alert; conflict check with `updated_at`; signed-out-during-save Alert.
- Acceptance checks: values stay after every failure; Discard changes closes without saving; Keep editing returns focus to the form; two tabs editing one project: second save shows the conflict Alert.
- Verification evidence needed: runtime test with network failure simulated and two tabs.

**T9, P1, all**
- Bounded change: responsive rules and accessibility from the spec and build-rules.md.
- Acceptance checks: stacked rows under 760px with labels; bottom bar does not cover content or focus; drawer focus trap and return; 200% zoom and 320px reflow without horizontal scroll; keyboard-only run of J2 to J5.
- Verification evidence needed: keyboard run notes and screenshots. Not a compliance certificate.

## Critique follow-up

| Finding | Severity | Ticket / acceptance change | Evidence closing it |
| --- | --- | --- | --- |
| None yet | | | |

A ticket does not turn Fail into Pass. Check the changed artifact before closing the finding.
