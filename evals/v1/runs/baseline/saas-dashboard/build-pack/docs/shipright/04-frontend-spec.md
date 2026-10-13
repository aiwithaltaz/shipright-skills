# 04 - Frontend specification

**Project path:** `docs/shipright/04-frontend-spec.md`

**Version/date:** v0.1, 2026-10-13. **Sources and approval:** PRD v0.1 (D1 to D5 approved by delegation), DESIGN.md v0.1. Preview of S1: `index.html` delivered with this pack (sample data, no saving).

## Current phase and allowed screens

**Current phase:** 1, "Track projects".
**Excluded / later notes only:** client logins, time tracking, invoices, reminders, integrations, tasks, files, comments, charts, summary cards, activity feed, search, filters, sortable columns, user management, delete.

| Screen ID | Job | Actor | Phase | Source |
| --- | --- | --- | --- | --- |
| S0 Sign in | Let invited staff in | Staff | 1 | J1, D1 |
| S1 Projects | See which active projects need attention; open one; switch to Completed | Staff | 1 | J2, J5 |
| S2 Project form (drawer over S1) | Add or edit a project and save | Staff | 1 | J3, J4, J5 |

## Navigation

| Label | Approved destination | Actor / phase | Active treatment |
| --- | --- | --- | --- |
| (Product label in top bar) | S1 Projects | Staff / 1 | Not a menu; one destination only |
| Account button (initials + name) | Dropdown menu: name, email, Sign out | Staff / 1 | Not applicable |

Profile/account home: the account button at the right end of the top bar. Nowhere else.
No nav menu, no notification dots. Routes: `/sign-in`, `/projects` (Active), `/projects?view=completed`. S2 is a drawer, not a route; a direct link to a project is a later note.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Per-screen specification

### S0 Sign in

**Screen ID / job / source:** S0, let invited staff in, J1.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Heading "Sign in" | Name the task | J1 | Heading, centered column 400px |
| Email field | Enter work email | J1, D8 | Label + Text input, type=email, autocomplete=email |
| Button "Email me a sign-in link" | Start sign-in | J1 | Primary button, full width of column |
| Status text after send | Say what happens next | F3 | "Check your email for a sign-in link. It works once." role=status |

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Empty email, submit | "Enter your email address." under the field | None | Fix field | Runtime test |
| Sending | Button text "Sending...", disabled | Request to auth provider | Wait | Runtime test |
| Sent | Status text above, field stays filled | Link emailed if the address is invited | "Use a different email" link resets the form | Runtime test |
| Not invited | Same "Check your email" text (do not reveal which emails exist) | No email sent | Ask the owner | Runtime test |
| Send fails | Alert "We could not send the link. Try again." | None | Try again | Runtime test |

### S1 Projects

**Screen ID / job / source:** S1, see which active projects need attention and open one, J2 and J5.
**Keep/remove/change/add:** see Exact acceptance checks.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Top bar: product label, account button | Identity and sign out | J1 | Header; account button right |
| Page title "Projects" | Name the page | J2 | h1, left of page header |
| "Add project" | Start J3 | J3 | Primary button, right of page header. Under 760px: in a bottom bar |
| Segmented control "Active (n)" / "Completed (n)" | Switch views | J5 | Under the title, left. Counts are real totals |
| Status line | Confirm a save | F3 | Under the page header, role=status |
| Group "Needs attention (n)" with table | See what to act on first | J2, D3 | h2 + Table |
| Group "On track (n)" with table | See the rest | J2 | h2 + Table, same columns and widths |
| Column "Project": name as link-style button, client name under it | Identify and open | J2, J4 | First column. Button accessible name "Edit [project name]" (visible name plus hidden "Edit ") |
| Column "Lead" | Know who to ask | J2 | Plain text |
| Column "Due": date, then relative text ("in 5 days", "Today", "3 days overdue") with Overdue / Due soon badge | Deadline health | J2, D6 | Date, then badge on the line below |
| Column "Budget": "[spent] of [budget]", budget bar, "[n]% used", badge for Near limit / Over budget, "Spent updated [date]" | Budget health and staleness | J2, D2, D6 | Right column, numbers right-aligned, tabular |

No summary cards, charts, activity feed, welcome line, search, filters or sync chip.

**Structure and reading order:** top bar > page header (title, Add project) > segmented control > status line > Needs attention table > On track table. DOM order matches.
**Sizing and alignment:** page max 1200px. Table width 100%. Column widths: Project 38%, Lead 16%, Due 20%, Budget 26%. Both tables share these widths so columns line up.
**Actions:** "Add project" opens S2 empty (page scope). Project name opens S2 with that project (row scope). Segmented control switches view (no data change). Sign out in account menu ends the session and goes to S0.
**Exit and saved work:** S1 holds no unsaved work. Leaving S1 loses nothing.

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Loading | 4 Skeleton rows in one table; header and Add project visible; counts hidden | Fetch projects | Wait | Runtime |
| Load fails | Alert in the table area: "Projects could not load. Check your connection, then try again." + "Try again" | None | Try again; account menu still works | Runtime |
| No projects at all | Empty state: "No projects yet." / "Add a project to track its budget and due date." + "Add project" button. Header button hidden so there is one action | None | Add project | Runtime + visual |
| Active, none need attention | "Needs attention (0)" heading with line "Nothing needs attention right now." then On track table | None | Open any project | Visual |
| Active, all need attention | On track heading with line "No projects are on track." | None | Open any project | Visual |
| Active, populated | Two groups as specified | None | Open a project | Visual (preview) |
| Completed view, empty | "No completed projects yet." / "Set a project's status to Completed when the work is done." No button | None | Switch back to Active | Visual |
| Completed view, populated | One table, columns as Active; Due column shows date and a "Completed" badge, no deadline health | None | Open to reopen | Visual |
| After save in S2 | Status line "Project saved: [name]." Row in its new group. If the status changed, the row leaves this view and the line adds "It is now under Completed." (or "Active."). The view does not switch | List reloaded from server | Continue; focus goes to the row's name, or to the other view's button if the row moved | Runtime |
| Signed out (session ended) | Redirect to S0, then back to /projects | None | Sign in | Runtime |

**Responsive behavior:** under 760px each table row becomes a stacked block: project name and client, then "Lead", "Due" and "Budget" with visible labels. Groups and order are unchanged. "Add project" moves to a fixed bottom bar (64px) and the page gets 80px bottom padding. Top bar stays; account button shows initials only with accessible name "Account: [name]".
**Difficult content:** long project and client names wrap (no truncation). Budget amounts up to 9,999,999.99 fit; larger wrap below. 0 projects, 1 project, about 50 projects tested. Lead missing (account removed): show "No lead" in muted text.
**Accessibility:** tables with `<caption>` (visually hidden, same as group heading) and `<th scope="col">`. Badges include text. Budget bar has `aria-hidden="true"` because the percent text beside it carries the value. Segmented control is a group of buttons with `aria-pressed`. Status line is `role="status"`. Skip link "Skip to projects" first in tab order.

### S2 Project form (drawer)

**Screen ID / job / source:** S2, add or edit a project, J3, J4, J5.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Title "Add project" or "Edit project" + Close (X) | Name the task, exit | J3, J4, F1 | Drawer header; Close icon-only with tooltip "Close" |
| Project name | Required | J3 | Text input, maxlength 120 |
| Client | Required; pick or add | J3 | Combobox. Typing a new name shows "Add new client: [name]" |
| Lead | Required | J3 | Select of staff full names |
| Due date | Required | J3, J4 | Date input |
| Budget ([currency]) | Required, more than 0 | D2 | Text input, inputmode=decimal |
| Spent so far ([currency]) | Required, 0 or more | D2 | Text input, inputmode=decimal. Help text in Edit: "Last updated [date]." |
| Status (Edit only) | Active or Completed | J5 | Radio button group, 2 options |
| Cancel, Save project | Leave or commit | J3, J4 | Drawer footer, right aligned: Cancel (secondary) then Save project (primary) |

**Structure and reading order:** header > Project name > Client > Lead > Due date > Budget and Spent so far side by side (stack under 400px) > Status > footer.
**Actions:** Save project validates, then saves (form scope). Cancel and Close both close; if the form has changes, they show the unsaved prompt first. Escape does the same as Close.
**Exit and saved work:** nothing is saved until "Save project" succeeds. Closing with changes shows an inline Alert at the footer: "You have unsaved changes." with "Keep editing" (secondary) and "Discard changes" (secondary, danger text). Focus moves to the Alert.

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| Open (Add) | Empty fields, Spent so far = 0, focus on Project name | None | Fill or Cancel | Runtime |
| Open (Edit) | Saved values, focus on Spent so far (most common update) | None | Edit or Cancel | Runtime |
| Invalid submit | Error under each bad field ("Enter a project name.", "Choose a client.", "Choose a lead.", "Enter a due date.", "Enter a budget greater than 0.", "Enter 0 or more."). Focus to first invalid field | None | Fix | Runtime |
| Saving | Button "Saving...", busy, cannot be pressed again; fields read-only | Request sent | Wait | Runtime |
| Saved | Drawer closes; focus returns to the row's project name (or "Add project"); S1 status line | Row saved | Continue | Runtime |
| Save fails | Alert at top of the form: "Changes not saved. Try again." Values kept | None saved | Save project again or Cancel | Runtime |
| Conflict | Alert: "Someone else changed this project. Reload it to see their changes." + "Reload project" (replaces form values after the unsaved prompt) | None saved | Reload or Cancel | Runtime |
| Signed out during save | Alert: "You were signed out. Sign in again, then save." Values kept on screen; they are not stored anywhere | None saved | Sign in in a new tab | Runtime |
| Unsaved prompt | As above | None | Keep editing / Discard changes | Runtime |

**Responsive behavior:** desktop: 440px right drawer with scrim. Under 640px: full screen, footer fixed at the bottom; the form scrolls above it with bottom padding so focused fields are never hidden.
**Accessibility:** drawer is a modal dialog with `aria-labelledby` the title. Focus moves in, Tab stays inside, Escape closes (with the unsaved prompt), focus returns to the trigger. Labels visible; errors linked by `aria-describedby`; `aria-invalid` on bad fields. Every field is required, so the form says "All fields are required." once under the title, and each input has `required`.

## Design system

**Mode:** Establish (approved by delegation, D5).
**Source:** `DESIGN.md` at the project root. Component library and icon set are Proposed with D8.

## Exact acceptance checks

| Feedback/source | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| Request: track projects, budgets, deadlines | Each active project row shows client, lead, due date with health, and spent of budget with % used | Pass (spec, preview) | Preview index.html; verify in build |
| D3: attention first | Over budget, Near limit, Overdue or Due soon projects are listed under "Needs attention" above "On track" | Pass (spec, preview) | Unit test getProjectHealth in T5 |
| D3: update numbers and dates | Spent so far and Due date editable in S2; list updates after save | Pass (spec); Not verified (runtime) | Build T7 |
| D3: complete projects | Status Completed moves a project to the Completed view; Active moves it back | Pass (spec); Not verified (runtime) | Build T7 |
| D4: exclusions | No control, route, table or column for time, invoices, reminders, client logins, integrations | Pass (spec, preview) | Recheck build |
| Anti-noise | No summary cards, charts, activity feed, welcome line, sync chip, search or filters | Pass (spec, preview) | Recheck build |
| F1 | S2 has Cancel, Close and Escape; unsaved changes prompt before loss | Pass (spec); Not verified (runtime) | Build T8 |
| F2 | Cancel left of Save project in every footer; one status line for confirmations | Pass (spec) | Recheck build |
| F3 | "Saving..." while saving; save failure stays visible; "Spent updated [date]" shown; no plumbing | Pass (spec); Not verified (runtime) | Build T8 |

## Handoff limits

Reserved for the owner: D6 thresholds (Proposed), D7 edit rights, D8 stack, D9 currency, agency time zone.
The preview proves layout and content only. Keyboard behavior, saving, access rules and screen reader output are Not verified until built.
Exported project paths are rooted at the app. This document requires no pack-local skills/ tree.
