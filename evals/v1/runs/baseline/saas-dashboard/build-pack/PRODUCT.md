# Product

**Version/date and approval sources:** v0.1, 2026-10-13. Source: the owner's request ("a dashboard for a small agency to track client projects, budgets and deadlines") and the owner's reply to intake: "You decide. Use your recommended picks." Decisions D1 to D5 are approved by that delegation. D6 to D10 are open. See docs/shipright/01-prd.md section 11.

**User and outcome:** Agency staff (owner and project leads) see at a glance which client projects are over budget or close to their deadline, and keep each project's numbers current.

**Current alternative and useful mechanism:** Current alternative is Unknown (likely a spreadsheet or memory; not confirmed). Mechanism: one list that sorts projects needing attention to the top, using two simple rules: money spent against budget, and days left to the due date.

**Current phase:** Phase 1, "Track projects".

**Approved now:**
- Staff sign in and out.
- See all active projects, with projects that need attention listed first.
- Add a project: name, client, lead, due date, budget, spent so far.
- Edit a project, including "spent so far" and the due date.
- Mark a project Completed (and back to Active). See completed projects in a separate view.

**Excluded / later notes only:** client logins, time tracking or hours budgets, invoices, email or in-app reminders, links to accounting or calendar tools, tasks, files, comments, charts, reports, search, filters, sortable columns, user management screens, deleting projects.

## Objects and journey

| Object | States | Notes |
| --- | --- | --- |
| Project | Active, Completed | Status is set by a person. Budget health and deadline health are calculated, not stored. |
| Client | Exists | Name only. Created when a project names a new client. |
| Staff member | Signed in, Signed out | Comes from sign-in accounts. Can be a project's lead. |

Calculated health (thresholds are Proposed, D6):
- Budget: **Over budget** when spent is more than budget. **Near limit** when spent is 90% of budget or more. Otherwise **On budget**.
- Deadline: **Overdue** when the due date has passed. **Due soon** when the due date is today or within the next 7 days. Otherwise **On schedule**.
- A project **needs attention** when either rule is not in its normal state.

Main path: sign in, open Projects, read "Needs attention", open a project, update spent so far or the due date, save, see the list update.

## Screens

| ID | Job | Current-phase source |
| --- | --- | --- |
| S0 Sign in | Let staff in; keep everyone else out. | D1 |
| S1 Projects | Show which active projects need attention; open one; switch to completed projects. | D3 |
| S2 Project form (drawer) | Add a project, or edit one and save. | D3 |

## Builder rules

Build only approved current-phase scope. Follow exact feedback; do not copy incidental reference features.
Never invent brand values, data, testimonials, metrics or users. Label sample data for requested prototypes/tests.
Visual values come from DESIGN.md or existing sourced components.
Use docs/shipright/04-frontend-spec.md for states and docs/shipright/build-rules.md for handoff instructions.

**Open decisions and owners (owner: agency owner):** D6 thresholds, D7 who may add, edit and complete projects, D8 tech stack, D9 currency, D10 deleting projects.
Details: docs/shipright/01-prd.md and docs/shipright/05-feature-ticket-list.md.
