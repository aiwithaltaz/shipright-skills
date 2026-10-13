# 01 - Product requirements

**Version/date:** 0.1, 13 Oct 2026
**Sources and approval:** the user's request ("a dashboard for a small agency to track client projects, budgets and deadlines"). The user delegated the frame, exclusions and look ("You decide"). Delegated picks are Proposed (delegated) in the decision log.

## 1. Frame

| | |
| --- | --- |
| **Who** | The owner and project leads of a small agency. Team size: Unknown. |
| **Job** | See which client projects are late or close to their budget, and keep each project's deadlines and spend up to date. |
| **What they do today** | Unknown. Hypothesis: a spreadsheet or a task tool that has no budget view. Owner: the user. |
| **This release finishes** | One list of active projects showing the next deadline and budget use, sorted so problems come first. Each project has deadlines and logged costs. |
| **What stays out** | See section 4. |

The useful mechanism: deadline and budget risk are worked out from data the agency already knows (dates, budget, costs) and shown in the same row, in words. Evidence that this helps: Unknown until the agency uses it.

## 2. Users and constraints

- One signed-in person per workspace in this release (decision D8). Inviting teammates waits for the access decision.
- "Project lead" is a name on the project, not an account.
- Devices: desktop first, usable on a phone at 390 px.
- One currency per workspace.

## 3. Objects and states

| Object | Key fields | Independent states | Owner |
| --- | --- | --- | --- |
| Workspace | name, currency | none | the person who created it |
| Client | name | none | workspace |
| Project | name, client, lead name, budget, due date | Lifecycle: Active, Completed. Deadline: on time, due soon, late. Budget: under, near, over. | workspace |
| Deadline | title, due date | Open, Done | project |
| Cost | description, amount, date | none | project |

Budget used = sum of the project's costs. Next deadline = the earliest open deadline, or the project due date if it comes first.
Status rules (Proposed, D6): **Late** when the next deadline is before today. **Due soon** when it is today or within 7 days. **Near budget** at 80% used or more. **Over budget** above 100%. Deadline status and budget status are separate facts and both show.
Completed projects show no deadline or budget warnings.

## 4. Current phase

**Phase:** Release 1, project tracking.
**Approved now (delegated):** sign in, set up a workspace, project list, project detail, add and edit a project, add, edit, tick off and remove deadlines, add, edit and remove costs, mark a project complete and reopen it.
**Not in this release:** time tracking, invoicing, client portal, teammates and roles (until D8 is decided), deleting a whole project (until Q2 is answered), reports and charts, email or in-app reminders, integrations, multiple currencies, file uploads, comments, search and filters beyond Active, Completed and All.
**Later notes only:** time tracking as the source of spend; a weekly email summary. No routes, tables or disabled buttons for these.

## 5. Jobs and flows

| Job ID | Job | Screen |
| --- | --- | --- |
| J1 | See which projects need attention | S1 Projects |
| J2 | Add or edit a project | S3 Project form |
| J3 | Keep deadlines current | S2 Project detail |
| J4 | Log spend against the budget | S2 Project detail |
| J5 | Close a finished project | S2 Project detail |
| J0 | Sign in and set up the workspace | S0 Sign in and setup |

**J1. See what needs attention**

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Opens /projects | Active projects, problems first, with a one-line count of late and over-budget projects | Reads projects with computed totals | Open a row | Nothing to save |
| No projects yet | "No projects yet" with New project | none | New project | none |
| Load fails | "Projects did not load." with Try again; earlier rows stay if any were shown | none | Try again | none |

**J2. Add or edit a project**

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| New project | Form: name, client, lead, budget, due date | none | Save project | Cancel returns to the list; unsaved typing triggers a leave warning |
| Save | Button shows "Saving..." and is disabled | Inserts or updates the row | Opens the project | Duplicate submit blocked |
| Field error | Inline error under the field | nothing saved | Fix and save | Values kept |
| Save fails | Alert at the form top: "Project not saved. Try again." | nothing saved | Save project again | Values kept |

**J3 and J4. Deadlines and costs** use the same pattern: Add opens a Modal; Save adds the row and shows it in the list; Remove asks for confirmation naming the item, then deletes that one row. Ticking a deadline Done is reversible with the same checkbox.

**J5. Complete a project:** "Mark complete" moves it to Completed. It stays readable and can be reopened. No data is removed.

## 6. Success checks

| Job | Observable check |
| --- | --- |
| J1 | The owner names every late or over-budget project from the list alone, without opening any project. |
| J2 | A new project with a budget and due date is added in under two minutes without help. |
| J3, J4 | After logging a cost, the list shows the new budget percentage on the next visit. |
| J5 | A completed project leaves the Active view and can be found under Completed. |

Baselines: Unknown. These are checks to run with the agency, not measured results.

## 7. Risks and unknowns

| Gap | Effect | Owner | Needed |
| --- | --- | --- | --- |
| Who can see and change budgets (Q1) | Blocks inviting teammates (T11) | User | Access decision |
| Whether a project can be deleted, and by whom (Q2) | Delete stays out | User | Decision |
| Agency name, brand colors, logo (Q3) | Starter look is used | User | Assets or OK of the starter |
| Currency (Q4) | Set at workspace setup | User | Pick at setup |
| Thresholds 80% and 7 days (D6) | May flag too much or too little | User | Try with real projects |

## 8. Decision log

| ID | Decision | Status | Source/date | Affected |
| --- | --- | --- | --- | --- |
| D1 | Frame in section 1 | Proposed (delegated) | User, 13 Oct 2026 | All |
| D2 | Exclusions in section 4 | Proposed (delegated) | User, 13 Oct 2026 | All |
| D3 | Look: calm dense starter, deep blue accent, IBM Plex Sans | Proposed (delegated) | User, 13 Oct 2026 | DESIGN.md, T1 |
| D4 | Stack: Next.js, Supabase, Vercel | Proposed | Assistant | 02, T1 |
| D5 | Budget is a money amount; spend is costs entered by hand | Proposed (delegated) | User, 13 Oct 2026 | 02, S2 |
| D6 | Status thresholds: 80% used, 7 days | Proposed (delegated) | User, 13 Oct 2026 | lib/project-status.ts |
| D7 | One currency per workspace, chosen at setup | Proposed (delegated) | User, 13 Oct 2026 | S0, 02 |
| D8 | Access: one member per workspace until the user decides | Unresolved; restrictive build default | Access policy is never delegated | 02, T11 |
| D9 | Removing a deadline or cost: confirm, then permanent | Proposed (delegated) | User, 13 Oct 2026 | S2, T7, T8 |

## 9. Open questions (only the user can answer)

- **Q1.** Who may see and change budgets once teammates join? Blocks T11.
- **Q2.** May a project be deleted? By whom? Until then, Mark complete is the only way to close one.
- **Q3.** Agency name, logo and brand colors, if any.
- **Q4.** Currency, picked at setup.
- **Q5.** Hosting plan. A business app may need a paid Vercel plan. Nothing is signed up or deployed without your OK.
