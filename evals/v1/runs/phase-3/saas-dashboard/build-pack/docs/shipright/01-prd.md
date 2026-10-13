# 01 - Product requirements

**Version/date:** 0.1, 13 Oct 2026. **Sources and approval:** the owner's request ("a dashboard for a small agency to track client projects, budgets and deadlines"), and "You decide" on the three intake questions. Delegated picks are **Proposed (delegated)**. Access policy is not delegated and stays open (D-04).

## 1. Frame

| | |
| --- | --- |
| Who | The agency's own team: the owner and project leads. Team size Unknown (owner to confirm). |
| Job | See which client projects have a late or close deadline or are running out of budget, then open one and update it. |
| Today | Unknown. Likely a spreadsheet or memory. Owner to confirm. |
| This release | One list of projects sorted by what needs attention, a project page with budget and deadlines, and forms to add and edit them. |
| Stays out | See section 4. |

**Useful mechanism.** One shared place where each project's next deadline and budget use sit side by side, sorted so problems come first. The lead types in the spend so far, so there is nothing to connect. This is a Hypothesis: it helps only if leads keep the spend figure current. Test: after four weeks, are spend figures updated at least weekly?

## 2. Users and constraints

- Actor: **Team member** (signed in). No other roles in this release. Who may see budgets is open (D-04).
- Devices: desktop first (a weekly review at a desk). Phone use must work for a quick check at 390 px.
- One agency, one currency. Currency is Unknown (D-08).

## 3. Objects and states

| Object | Key fields | Independent states | Owner |
| --- | --- | --- | --- |
| Client | Name | Has active projects, or not | Team |
| Project | Client, name, lead, budget, spent so far, spend updated at and by | Active / Completed | Lead |
| Deadline | Project, title, due date | Open / Done. An open deadline is Late (past due), Due soon (within 7 days) or Upcoming | Lead |
| Member | Email, display name | Allowed to sign in, or not | Owner |

Budget health is derived, not stored: Under 80% used, 80% or more used, Over budget. Thresholds are D-07.
A Project's **next deadline** is its earliest open deadline.

## 4. Current phase

**Phase:** Release 1, internal tracking.
**Approved now (Proposed, delegated):** J1 to J5 below.
**Not in this release:** time tracking, invoicing, payments, client logins or portal, reports and charts, email or push reminders, file uploads, comments, project deletion, multiple currencies, resource scheduling, an invite screen.
**Later notes only:** if typing spend gets tedious, consider time tracking. If clients ask for status, consider a read-only client view. None of these get routes, tables, placeholders or disabled buttons.

## 5. Jobs and screens

| Job ID | Job | Priority | Screen |
| --- | --- | --- | --- |
| J1 | See active projects, problems first, and open one | P0 | S1 Projects |
| J2 | Update a project's spend so far | P0 | S2 Project |
| J3 | Add, edit, complete and remove deadlines | P0 | S2 Project |
| J4 | Add a project, or edit its details | P0 | S3 Project form |
| J5 | Mark a project completed, or reopen it | P1 | S2 Project, S1 Completed view |
| J0 | Sign in and sign out | P0 | S0 Sign in |

## 6. Core flows

**J1. Review projects**

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Opens the app | S1, Active view | Loads active projects, sorted by attention | Open a project | Nothing to save |
| A project has a late deadline | "3 days late" with a danger badge in the Next deadline cell | Row sorts to the top | Open it | Back to S1 keeps the view |
| Load fails | Alert "Projects did not load." with Try again | Nothing changes | Try again | Rows already shown stay |

**J2. Update spend**

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Selects "Update spend" on S2 | A small form with "Spent so far", prefilled | None yet | Save spend, or Cancel | Cancel keeps the old figure |
| Saves | Button shows "Saving", then the new figure and "Updated today by [name]" | Stores amount, time and member | Back to projects | Saved |
| Save fails | Inline error "Spend not saved. Try again." | Old figure stays | Try again | Typed value stays in the field |

**J3. Deadlines**: add (title, due date), edit, mark done (undo by marking open again), remove (confirm dialog "Remove deadline 'First draft'? This cannot be undone."). Failure keeps typed values and shows the error by the form.

**J4. Add or edit a project**: S3 form. Cancel returns to where the user came from without saving, and warns if fields were changed. Success opens S2 for that project with "Project created" or "Changes saved" near the title.

**J5. Complete or reopen**: "Mark completed" on S2, with a confirm dialog naming the project. It leaves the Active view and appears under Completed. "Reopen project" reverses it. Nothing is deleted.

## 7. Success checks

| Signal | Baseline | Target | Method |
| --- | --- | --- | --- |
| The owner can name every late project in under a minute from opening the app | Unknown | Yes, in a first-week walkthrough | Owner observed using S1 |
| A lead updates spend without help | Unknown | Yes | Owner observed, first week |
| Spend figures stay current | Unknown | Each active project updated in the last 7 days | "Updated" dates on S2 after four weeks |

No other metrics are claimed.

## 8. Risks and unknowns

| Gap | Effect | Owner | Needed |
| --- | --- | --- | --- |
| Who can see budget figures and edit projects (D-04) | Decides who besides the owner can be added | Agency owner | A decision |
| Currency (D-08) | Formatting of every amount | Agency owner | A currency code |
| Team size and current tool | Confirms desktop-first and the list size | Agency owner | A short answer |
| Agency name and brand colors | Top bar label and accent | Agency owner | Optional. Neutral defaults until supplied |

## 9. Dependencies

Supabase (database and sign-in) and Vercel (hosting), both Proposed in 02-technical-architecture.md. No other services.

## 10. Feedback acceptance

None yet. Add exact feedback here as keep / remove / change / add with a check.

## 11. Decision log

| ID | Decision | Status | Source/date | Affected |
| --- | --- | --- | --- | --- |
| D-01 | Users are the agency team. Job J1 to J5 | Proposed (delegated) | Intake Q1, 13 Oct 2026 | All |
| D-02 | Scope and exclusions in section 4. Spend is typed in by the lead | Proposed (delegated) | Intake Q2 | 02, 04, 05 |
| D-03 | Look: calm dense work-tool system, neutral blue accent until brand colors are supplied | Proposed (delegated) | Intake Q3 | DESIGN.md, tokens |
| D-04 | Who can see budgets, edit projects and add members | **Unresolved. Only the owner can decide** | Access policy is not delegated | 02 access rules, T9 |
| D-05 | Stack: Next.js, Supabase, Vercel | Proposed (delegated) | Intake | 02, T1 |
| D-06 | Sign-in by email link, invited members only | Proposed (delegated) | Intake | T2 |
| D-07 | Due soon = within 7 days. Budget warning at 80% used. Set in `lib/attention.ts` | Proposed (delegated) | Intake | S1, S2 |
| D-08 | Currency | Unknown | Owner | All amounts |
| D-09 | Top bar label "Client projects" until the agency name is supplied. Set in `NEXT_PUBLIC_APP_NAME` | Proposed (delegated) | Intake | Shell |

## Open questions (only the owner can answer)

1. D-04: Should every team member see budget figures and edit any project, or only leads? Who adds new members?
2. D-08: Which currency?
3. Optional: agency name and brand colors.
