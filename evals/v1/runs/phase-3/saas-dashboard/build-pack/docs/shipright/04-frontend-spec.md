# 04 - Frontend specification

**Version/date:** 0.1, 13 Oct 2026. **Sources:** 01-prd.md (J0 to J5), DESIGN.md, `design/tokens.css`. All Proposed (delegated) except D-04 and D-08, which are open.

## Current phase and screens

**Phase:** Release 1, internal tracking. **Excluded:** see 01-prd.md section 4.

| Screen | Job | Route |
| --- | --- | --- |
| S0 Sign in | J0 | `/sign-in` |
| S1 Projects | J1, J5 (Completed view) | `/projects` |
| S2 Project | J2, J3, J5 | `/projects/[id]` |
| S3 Project form | J4 | `/projects/new`, `/projects/[id]/edit` |

**Navigation:** top bar on every signed-in screen. Left: app label (`NEXT_PUBLIC_APP_NAME`), a link to `/projects`. Right: account menu with the member's name and "Sign out". No other destinations.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S0 Sign in

**Layout:** centered panel, max 360 wide. Heading "Sign in". Email input (`type=email`, `autocomplete=email`, visible label "Work email"). Primary "Email me a sign-in link".
**States:** sending ("Sending link", button disabled); sent ("Check your email. The link signs you in on this device." plus "Use a different email"); error ("The link was not sent. Try again."); not on team ("This email is not on the team list. Ask the agency owner to add you." plus Sign out).
**Accessibility:** status text in `role="status"`. Error tied to the field with `aria-describedby`.

## S1 Projects (main screen)

**Job:** see which active projects need attention, then open one.
**Layout, top to bottom:**
1. Top bar.
2. Page header: "Projects" (20/600) left; "New project" primary button right.
3. Row under it: Segmented control "Active (n)" and "Completed (n)". On the same row, right: one muted line built from data, such as "2 projects have late deadlines. 1 is over budget." Hidden when nothing needs attention, replaced by "Nothing late or over budget."
4. Table in a bordered surface: **Project** (name 14/500 link, client 13 muted below), **Lead**, **Next deadline** (title 14, then date and badge 13), **Budget used** (right aligned: "12,400 of 18,000" tabular, then meter and percent, with badge when 80% or more).
5. Order: attention sort in 02-technical-architecture.md.
**Badges:** Late "3 days late", Due soon "Due in 2 days", "Due today", Over budget "Over by 1,200", Warning "86% used". Each is text + Lucide icon + color.
**Completed view:** columns Project, Lead, Completed (date), Final spend ("17,200 of 18,000"). No badges.
**Actions:** project name link opens S2; the whole row is also clickable with the pointer. New project opens S3.
**States:** loading (8 skeleton rows; header and control stay usable); empty Active ("No active projects yet." plus New project); empty Completed ("No completed projects yet."); no open deadline ("No open deadlines" muted); error (Alert "Projects did not load." with Try again; earlier rows stay); not found does not apply.
**Responsive:** at 720 and below, each row becomes a stacked item: line 1 name and percent; line 2 client and lead; line 3 deadline badge and budget badge. "New project" moves to a bottom bar. No sideways scroll at 390.
**Accessibility:** real table on desktop with `<th scope="col">`. Segmented control buttons use `aria-pressed`. Focus visible on links and segments. Long names wrap to two lines, then truncate with the full name in `title` and on focus.
**Do not add:** charts, summary cards, search, filters, export, a welcome line, an activity feed.

## S2 Project

**Job:** check one project and update its spend and deadlines.
**Layout:** back link "Projects" (keeps the view). Header: project name (20/600), client and lead (13 muted), status badge if Completed; right: "Edit" secondary, then "Mark completed" text button. Section **Budget**: "Spent so far" figure (24/600), "of 18,000 budget", meter, remaining or "Over by", "Updated 3 Oct by Sam" muted; "Update spend" secondary opens an inline form (Amount input, "Save spend" primary, "Cancel" text). Section **Deadlines**: list sorted by date. Each row: checkbox "Done" with the title as label, date, badge, "Edit" and "Remove" text buttons. "Add deadline" opens an inline form (Title, Due date, "Add deadline" primary, Cancel).
**States:** loading skeleton; not found ("Project not found." link to Projects); save failures inline by their form with typed values kept; no deadlines ("No deadlines yet." plus Add deadline); Completed project shows "Reopen project" instead of Mark completed.
**Dialogs:** "Remove deadline 'First draft'? This cannot be undone." with Cancel and "Remove deadline". "Mark 'Brand refresh' completed? It moves to the Completed list. You can reopen it." with Cancel and "Mark completed".
**Responsive:** one column at 720 and below; form buttons full width.

## S3 Project form

**Fields:** Client (Combobox: pick an existing client or "Add client '[typed name]'"), Project name, Lead (Select of members, default current member), Budget (number input, `inputmode=decimal`, currency from settings). Deadlines are added on S2.
**Actions:** "Cancel" secondary, "Create project" or "Save changes" primary, right aligned. Cancel warns only if a field changed: "Discard changes?" with "Keep editing" and "Discard changes".
**Validation:** on submit, then inline per field ("Enter a project name.", "Budget must be 0 or more."). Duplicate submit prevented ("Saving").
**Success:** opens S2 with a toast "Project created" or "Changes saved".

## Acceptance checks

| Check | Status |
| --- | --- |
| S1 shows late projects first, with text badges, at 1280 and 390 | Not verified (spec only; preview in index.html) |
| Every form keeps typed values after a failed save | Not verified |
| Keyboard reaches every link, segment, button and dialog action with visible focus | Not verified |

## Handoff limits

D-04 (who sees budgets) and D-08 (currency) are open. Runtime behavior is untested until built.
