# 04 - Frontend specification

**Version/date:** 0.1, 13 Oct 2026
**Sources and approval:** PRD jobs J0 to J5, decisions D1 to D9. Design values from `DESIGN.md` and `design/tokens.css` (Proposed, delegated).

## Screens

| Screen | Job | Route |
| --- | --- | --- |
| S0 | Sign in, then set up the workspace once | /sign-in, /setup |
| S1 | See which projects need attention (J1) | /projects |
| S2 | Keep one project's deadlines and costs current; complete it (J3, J4, J5) | /projects/[id] |
| S3 | Add or edit a project (J2) | /projects/new, /projects/[id]/edit |

**Navigation:** top bar on every signed-in screen. Left: workspace name, links to /projects. Right: account menu (email, Sign out). No other destinations. Profile home: the account menu only.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Projects (main screen)

**Layout, top to bottom (1280):**
1. Top bar, 56.
2. Page header: "Projects" (title) left; "New project" primary button right. Under the title, one muted line from data: "2 late, 1 over budget, 2 due this week". If none: "Nothing late or over budget." Hidden while loading, on error and with no projects.
3. Segmented control: "Active 9", "Completed 4", "All 13". Writes `?view=`.
4. Table in a panel. Columns: **Project** (name 14/500, client 13 muted below), **Lead** (or "No lead" muted), **Next deadline** (date "Thu 15 Oct" with deadline title muted below; status badge right of the date: "2 days late", "Due today", "Due tomorrow", "In 3 days"; no badge beyond 7 days), **Budget used** (meter 120 wide, "92%" right of it, then a badge "Near budget" or "$1,350 over"; below in muted text: "$22,080 of $24,000"), then a chevron. Date, %, and meter sit in fixed-width slots so rows line up.
Sort: late first, then over budget, then due soon, then near budget, then by next deadline date. Not user-sortable.

**Actions:** row click or Enter on the project name link opens S2. New project opens S3.

**States:**
| State | User sees |
| --- | --- |
| Loading | Header and control, five skeleton rows |
| Empty (no projects) | In the table area: "No projects yet. Add a project to track its deadlines and budget." Secondary button "New project" |
| Empty view | "No completed projects yet." No button |
| Error | Alert above the table: "Projects did not load. Check your connection and try again." Button "Try again". Rows already shown stay |
| Completed rows | Badge "Completed" with check; no deadline or budget warnings |

**Narrow (under 900):** the table becomes a list. Each item: line 1 name and budget %; line 2 client and lead; line 3 status badges; line 4 next deadline date and title; line 5 meter with "$21,300 of $24,000". **Phone (under 760):** "New project" moves to a fixed bottom bar, 44 tall; the list gets bottom padding so the last row and focus stay visible.

**Accessibility:** real `<table>` with `<th scope="col">`; the project name is the row's link. Badges are text, icons `aria-hidden`. Meter `aria-hidden`; the % text carries the value. Segmented control buttons use `aria-pressed`.

**Do not add:** search, filters, column sorting, summary cards, charts, export, bulk actions.

**Acceptance:** 0, 1 and 40 projects render at 1280 and 390 without page-level sideways scroll. A late and over-budget project shows both badges in words. Tab reaches every row link with visible focus.

## S2 Project detail

**Layout:** back link "Projects" (top left, returns to the list keeping `?view`). Header: project name (title), client, lead, due date; status badges as in S1; right: "Edit project" secondary, "Mark complete" secondary (or "Reopen" when completed). Two columns over 1024, stacked below with Deadlines first.
- **Deadlines** section: heading with "Add deadline" ghost button. List sorted by date: Checkbox (done), title, date, badge; "Edit" text button per row. Done rows show "Done" in muted text.
- **Budget** section: three figures: Budget, Used, Remaining (or "Over by"). Meter full width. Costs table: Date, Description, Amount (right). "Add cost" ghost button. "Edit" per row.

**Dialogs (Modal):** Add/edit deadline (Title, Due date). Add/edit cost (Description, Amount, Date defaulting to today). Edit dialogs hold "Remove deadline" / "Remove cost" as a danger text button on the left. Remove opens a confirm Modal: "Remove the cost 'Illustrator invoice, $1,200'? This cannot be undone." Buttons: Cancel, "Remove cost".

**States:** loading skeleton per section; "No deadlines yet. Add the dates that matter for this project." / "No costs logged yet." with the section's add button; save failure keeps the dialog open with an Alert "Cost not saved. Try again." and values kept; not found: Alert "Project not found." with link "Back to projects". Mark complete shows toast "Project marked complete." with the list updated.

**Phone:** one column; header actions wrap under the title; dialogs become full-height sheets with actions in a bottom bar.

**Do not add:** comments, files, activity history, time entries, project delete.

**Acceptance:** after adding a cost, Used, Remaining, meter and the S1 row match. Escape closes a dialog and returns focus to its trigger.

## S3 Project form

**Layout:** back link "Projects" or "Back to project". Title "New project" or "Edit project". One column, 560 max.
Fields: Project name (required); Client (Combobox, required; "Add client: Northwind" when new); Project lead (optional text); Budget (number, required, currency label from workspace, e.g. "Budget (USD)"); Due date (Date input, required).
Actions at the end, right: "Cancel" secondary, "Save project" primary. Phone: bottom bar.

**States:** pristine; inline errors on blur after first edit and on submit ("Enter a project name", "Enter a budget of 0 or more", "Pick a due date"); submitting ("Saving...", disabled); save failure Alert at top with values kept; leaving with unsaved edits asks "Leave without saving? Your changes to this project will be lost." Keep editing / Leave.

**Accessibility:** labels above fields, errors tied with `aria-describedby`, focus the first invalid field on submit.

**Acceptance:** double-clicking Save creates one project. Cancel with no edits leaves without a prompt.

## S0 Sign in and setup

**/sign-in:** title "Sign in", Email field (`type=email`, `autocomplete=email`), primary "Email me a sign-in link". After submit: "Check your email. We sent a link to [their email]." with a text button "Use a different email". Errors: "Enter a valid email." / "Link not sent. Try again." The button shows "Sending..." while busy.
**/setup (first sign-in only):** title "Set up your workspace". Agency name (required). Currency (Combobox of ISO 4217 codes such as USD, EUR, GBP; required; no default; helper "Used for every budget. You cannot change it later in this version."). Primary "Create workspace" opens /projects in its empty state.
**Layout and access:** one centered column, 400 max; full width on phone with 16 px inputs. Labels above fields, errors tied to them, focus on the first invalid field. No top bar before setup ends.
**Acceptance:** a signed-in user with a workspace never sees /setup.

## Handoff limits

All design values are Proposed until the /design page is approved. Access (Q1) and project delete (Q2) are open. Nothing here is verified in a running build yet.
