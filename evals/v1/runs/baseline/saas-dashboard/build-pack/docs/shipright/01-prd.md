# 01 - Product requirements

**Project path:** `docs/shipright/01-prd.md`

**Version/date:** v0.1, 2026-10-13. **Sources and approval:** owner's request on 2026-10-13; intake questions Q1 to Q5 answered "You decide. Use your recommended picks for everything you asked." That delegation approves D1 to D5. Everything else marked Proposed or Unknown is not approved.

Proposed decisions are not build scope until approved. See section 11.

## 1. Problem and outcome

A small agency runs several client projects at once. The owner asked for a way to "track client projects, budgets and deadlines". No research or data was supplied.

Outcome: a staff member can open one screen and know, within a few seconds, which active projects are over budget, near their budget limit, overdue or due soon. They can update a project's numbers in under a minute.

## 2. Useful mechanism

- Current alternative: **Unknown**. Probably a spreadsheet, a project tool or memory. Not confirmed. Owner to confirm.
- Mechanism: projects that break a simple rule rise to the top under "Needs attention". The rules are spent against budget, and days left to the due date. Everything else sits under "On track".
- Evidence that this helps: none yet. Hypothesis H1: leads will keep "spent so far" current if updating it takes one form. Test: after 4 weeks of use, check how many active projects had spent updated in the last 14 days (the app stores the date, see section 6).

## 3. Users and constraints

| Actor | Job | Source |
| --- | --- | --- |
| Agency staff member (owner or project lead) | See which projects need attention; add and update projects. | D1 |

- Devices: desktop browser first. Phone browser must work for checking the list and quick updates. No native app.
- Team size: Unknown ("small agency"). Design assumes up to about 50 active projects without pagination.
- Clients do not sign in in Phase 1.

## 4. Current phase

**Phase:** 1, "Track projects".
**Approved now (D3):**
- J1 Sign in and sign out (staff only).
- J2 See active projects, needing attention first, with budget and deadline health.
- J3 Add a project.
- J4 Edit a project, including spent so far and due date.
- J5 Mark a project Completed or Active again; view completed projects.

**Explicitly excluded (D4):** client logins, time tracking and hours budgets, invoices, email or in-app reminders, links to accounting or calendar tools.
**Later notes only (no controls, routes or data models):** tasks, files, comments, charts, reports, search, filters, sortable columns, user management screens, deleting projects (D10), multiple currencies, budget history.

## 5. Success evidence

| Signal | Baseline | Target | Source / method |
| --- | --- | --- | --- |
| Active projects with spent updated in last 14 days | Unknown | Unknown, owner to set | Query on `spent_updated_at` |
| Owner says the list matches reality in a weekly review | Unknown | Unknown | Ask the owner after 4 weeks |

No metrics are invented. Targets are for the owner to set.

## 6. Objects and lifecycles

| Object | Independent states | Actor / owner |
| --- | --- | --- |
| Project | Status: Active, Completed (set by staff). Budget health: On budget, Near limit, Over budget (calculated). Deadline health: On schedule, Due soon, Overdue (calculated; only for Active). | Staff |
| Client | Exists. Name only. | Staff create one by typing a new name in the project form. |
| Staff member | Has a sign-in account. Can be lead on many projects. | Accounts are added outside the app in Phase 1 (D7, D8). |

Project fields: name (required, 1 to 120 characters), client (required, one), lead (required, one staff member), due date (required), budget (required, more than 0), spent so far (required, 0 or more, default 0), spent updated date (set by the system when spent changes), status (Active by default).

Relationships: a client has many projects. A staff member leads many projects. A project has exactly one client and one lead.

Calculation rules (D6, Proposed thresholds, kept in one constant):
- Budget used % = spent / budget x 100, rounded down to a whole number for display.
- Over budget: spent > budget. Near limit: used % >= 90 and not over. Otherwise On budget.
- Overdue: due date before today (agency's local date). Due soon: due date from today to 7 days ahead. Otherwise On schedule.
- Completed projects show no deadline health.
- Needs attention: Active, and budget health is not On budget or deadline health is not On schedule.
- Order inside "Needs attention": Over budget or Overdue first, then the rest; inside each, earliest due date first. "On track": earliest due date first. Completed: latest due date first.

## 7. Jobs and journey

| Job ID | User job | Phase | Priority | Screen / flow |
| --- | --- | --- | --- | --- |
| J1 | Sign in, sign out | 1 | P0 | S0, account menu on S1 |
| J2 | See what needs attention | 1 | P0 | S1 |
| J3 | Add a project | 1 | P0 | S1 > S2 (Add) |
| J4 | Update a project | 1 | P0 | S1 > S2 (Edit) |
| J5 | Complete or reopen a project; view completed | 1 | P1 | S2 status field; S1 Completed view |

Main journey: S0 sign in > S1 Projects (Active view) > read Needs attention > select a project name > S2 Edit project > change spent so far > Save project > back on S1, status line says "Project saved.", row moves group if its health changed.

| Starting state | Missing dependency | Permitted next action | Preserved work | Completion condition |
| --- | --- | --- | --- | --- |
| Not signed in, opens any page | Session | S0 Sign in, then return to the page asked for | None | Signed in |
| Session ends while S2 is open | Session | Save fails with "You were signed out. Sign in again, then save." | Form values stay on screen; not saved | Signed in again and saved |
| No projects yet | Projects | Add project | Not applicable | First project saved |
| Load of projects fails | Network or server | Try again | Not applicable | List shown |

## 8. Risks and unknowns

| Gap | Effect | Owner | Decision or evidence needed |
| --- | --- | --- | --- |
| Spent so far goes stale | List shows false "On budget" | Owner | Show "Spent updated [date]" under each budget (in scope). Watch H1. |
| Two people edit the same project | One person's change could overwrite the other's | Builder | Save checks the project's last update time; if it changed, show "Someone else changed this project. Reload it to see their changes." Values stay on screen. |
| Who may edit budgets (D7) | Access rules and server checks | Owner | Decide D7 |
| Currency (D9) | Money display | Owner | Decide D9 |
| Time zone for "today" | Overdue flips on the wrong day | Owner | Agency time zone, Unknown. Proposed: one agency time zone setting in config, not UI. |

## 9. Dependencies

Proposed stack and hosting (D8) in 02-technical-architecture.md. No integrations.

## 10. Feedback acceptance

| Source/date | Keep/remove/change/add | Element | Exact acceptance check |
| --- | --- | --- | --- |
| Owner request, 2026-10-13 | Add | Track projects, budgets, deadlines | S1 shows each active project's client, lead, budget used and due date. |
| Q3 pick, 2026-10-13 | Add | Attention first | Projects over budget, near limit, overdue or due soon appear under "Needs attention" above "On track". |
| Q3 pick, 2026-10-13 | Add | Update numbers and dates | A staff member can change spent so far and due date in S2 and see the list update after saving. |
| Q4 pick, 2026-10-13 | Remove | Excluded items | No control, route, table or column exists for time tracking, invoices, reminders, client logins or integrations. |

## 11. Decision log

| ID | Scope / decision | Status | Source/date | Replaces | Affected artifacts |
| --- | --- | --- | --- | --- | --- |
| D1 | Phase 1 users are agency staff only; every signed-in staff member sees all projects. | Approved (delegated) | Q1, 2026-10-13 | | PRODUCT, 03, 04 |
| D2 | Budget is a money amount; "spent so far" is typed in by staff. | Approved (delegated) | Q2, 2026-10-13 | | All |
| D3 | Phase job: one list with attention first; add, edit, complete projects. | Approved (delegated) | Q3, 2026-10-13 | | All |
| D4 | Exclusions as in section 4. | Approved (delegated) | Q4, 2026-10-13 | | All |
| D5 | Quiet visual system in DESIGN.md. | Approved (delegated) | Q5, 2026-10-13 | | DESIGN, 04 |
| D6 | Near limit at 90% used; Due soon within 7 days. | Proposed | Assistant, 2026-10-13 | | 04, 05 |
| D7 | Who may add, edit and complete projects. Proposed: every signed-in staff member may do all three. Staff accounts are added by the owner outside the app. | Unresolved (access policy is not covered by delegation) | Assistant proposal, 2026-10-13 | | 03, 05 |
| D8 | Stack: Next.js, TypeScript, Supabase (Postgres and Auth), Tailwind, shadcn/ui, Lucide; hosted on Vercel. | Proposed | Assistant, 2026-10-13 | | 02, 05, DESIGN |
| D9 | One currency for all projects. Which one is Unknown. | Unresolved | Owner | | 02, 04 |
| D10 | Deleting projects. Proposed: not in Phase 1; mark Completed instead. | Proposed | Assistant, 2026-10-13 | | 03, 05 |

Document completion is not implementation readiness. D7, D8 and D9 must be decided before ticket T1 starts.
