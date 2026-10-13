# 05 - Feature tickets

**Version/date:** 0.1, 13 Oct 2026. Paste one ticket at a time into Cursor. Each one ends with a stop line.
Standing rules live in `docs/shipright/build-rules.md`; tickets do not repeat them.

## Order

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | Tokens, base styles | none |
| T2 | Database and access rules | Schema, row-level security | T1 |
| T3 | Sign in and workspace setup | S0 | T2 |
| T4 | Shell and projects list | S1 happy path | T3 |
| T5 | Projects list states | S1 states | T4 |
| T6 | Add and edit a project | S3 | T4 |
| T7 | Project detail and deadlines | S2 | T6 |
| T8 | Costs and budget | S2 | T7 |
| T9 | Mark complete and reopen | S2, S1 | T8 |
| T10 | QA pass | All | T9 |
| T11 | Invite teammates | Access | **Waits for Q1** |
| T12 | Launch check | Release | T10 |

## Tickets

```text
T1. Foundation and /design preview          Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The project runs locally and a /design page shows the proposed look for approval.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/02-technical-architecture.md (Stack).
Build:
1. Create a Next.js App Router project with TypeScript, Tailwind CSS and shadcn/ui. Add Lucide icons.
2. Import design/tokens.css in app/globals.css. Map Tailwind theme colors, spacing, radius, font sizes and shadow to the CSS variables. Load IBM Plex Sans 400, 500, 600 with next/font.
3. Add the shadcn components named in DESIGN.md Components and restyle them with tokens only.
4. Build /design (development only): color roles with hex and contrast notes, type scale, spacing scale, buttons in all states (including busy "Saving..."), inputs with label, helper and error, Segmented control, status badges (2 days late, Due today, In 3 days, 92%, $1,350 over, Completed), a budget meter at 40%, 85% and 110%, one Modal, one Alert, a skeleton row.
5. Add .cursor/rules/shipright.mdc pointing to docs/shipright/build-rules.md.
Do not add: app screens, auth, database code.
Done when:
- npm run dev serves /design with no console errors.
- Tab moves through every control on /design with a visible focus ring.
- No raw hex or px values outside tokens.css.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked. Ask me to approve the look.
---
```

```text
T2. Database and access rules               Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: Data for workspaces, clients, projects, deadlines and costs exists, and each workspace sees only its own rows.
Read first: docs/shipright/build-rules.md, docs/shipright/02-technical-architecture.md (Data model, Access rules).
Build:
1. Supabase migration with the six tables exactly as listed, indexes on workspace_id and project_id.
2. Function is_member(ws uuid) and policies for select, insert, update and delete on every table. Trigger adding the creator to workspace_members.
3. View project_overview with security_invoker = true.
4. lib/supabase/server.ts and client.ts using NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Add .env.example with those names only.
5. lib/project-status.ts: getDeadlineStatus and getBudgetStatus with constants NEAR_BUDGET = 0.8 and DUE_SOON_DAYS = 7. Vitest tests: late yesterday, due today, due in 7 and 8 days, 79%, 80%, 100%, 101%, completed project.
6. supabase/seed.sql with clearly fake local data (names start with "Sample").
Do not add: tables for time, invoices, roles or invites.
Done when:
- Tests pass.
- With two test users, user B selects zero rows of user A's workspace in every table and the view.
- Inserting a cost for another workspace's project fails.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T3. Sign in and workspace setup            Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A person signs in by email link and creates their workspace once.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S0), 02-technical-architecture.md (Routes).
Build:
1. /sign-in with the copy in S0. Supabase magic link. Button busy state "Sending...".
2. /auth/callback exchanges the code, sets a time zone cookie from the browser, then redirects to the page the person first asked for, or /projects.
3. Middleware: signed-out visitors go to /sign-in; signed-in people without a workspace go to /setup; people with one never see /setup.
4. /setup form: Agency name, Currency Combobox. "Create workspace" inserts the workspace and opens /projects.
States: invalid email, link not sent, setup save failure with values kept.
Do not add: passwords, social sign-in, invites, profile page.
Done when:
- A new email reaches /projects after setup; a second sign-in skips /setup.
- Opening /projects signed out returns there after sign-in.
- Keyboard alone completes both forms.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T4. Shell and projects list                 Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: The owner sees every active project with its next deadline and budget use, problems first, and opens one.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (Navigation, S1).
Build:
1. Top bar layout for signed-in routes: workspace name link left, account menu right (email, Sign out).
2. /projects server-loads project_overview for the view in ?view (active default). Counts for the Segmented control.
3. Header: "Projects", the count line, "New project" linking to /projects/new.
4. Table columns, badges, meter and sort order exactly as in S1, using lib/project-status.ts.
5. Under 900 px the list items from S1; under 760 px the bottom bar.
6. Row click and Enter on the name link open /projects/[id] (a placeholder page is fine until T7).
Do not add: search, filters, column sorting, summary cards, charts, export.
Done when:
- Seed data shows a late project and an over-budget project first, each with both facts in words.
- 1, 13 and 40 projects render at 1280 and 390 with no page-level sideways scroll.
- Tab reaches each row link with visible focus.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T5. Projects list states                    Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: The list is honest while loading, when empty and when loading fails.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S1 States).
Build:
1. loading.tsx: header, Segmented control and five skeleton rows.
2. Empty workspace: the S1 empty copy and a secondary "New project" button in the table area.
3. Empty view: "No completed projects yet." with no button.
4. error.tsx: Alert "Projects did not load. Check your connection and try again." with "Try again" calling reset().
5. Completed rows: "Completed" badge, no warnings.
Do not add: onboarding tours, sample projects in production, retry counters.
Done when:
- Each state renders at 1280 and 390 (simulate the error by throwing in development).
- The error Alert is announced and Try again is reachable by keyboard.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T6. Add and edit a project                  Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: The owner adds a project with client, lead, budget and due date, and edits it later.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S3), 02-technical-architecture.md (Server actions).
Build:
1. /projects/new and /projects/[id]/edit share one form component with the fields and copy in S3.
2. Client Combobox lists workspace clients; typing a new name offers "Add client: [name]" and creates it on save.
3. Server actions createProject and updateProject with zod validation and field errors.
4. Busy state, failure Alert with values kept, unsaved-changes warning on leave.
5. Save opens /projects/[id]; Cancel returns to where the person came from.
Do not add: budget templates, tags, attachments, project delete.
Done when:
- Double-clicking Save creates one project.
- Each required field shows its error text, and the first invalid field gets focus.
- An edit shows on the list after save.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T7. Project detail and deadlines            Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The owner sees one project and keeps its deadlines current.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S2).
Build:
1. /projects/[id]: back link, header with badges, "Edit project". Not found Alert for missing or foreign ids.
2. Deadlines section: list, Checkbox to mark done or undo, empty state copy.
3. Add/edit deadline Modal (Title, Due date). Remove deadline with the confirm Modal.
4. Server actions addDeadline, updateDeadline, toggleDeadlineDone, removeDeadline. Revalidate the list.
5. Budget section shell with heading only; T8 fills it.
Do not add: comments, assignees, reminders, files.
Done when:
- Ticking the next deadline done changes the S1 next deadline.
- Escape closes each Modal and focus returns to its trigger.
- A foreign project id shows "Project not found." with no data.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T8. Costs and budget                        Size: one sitting   After: T7
Paste this into your coding tool:
---
Goal: The owner logs spend and sees what is left of the budget.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/04-frontend-spec.md (S2 Budget).
Build:
1. Budget figures: Budget, Used, Remaining or "Over by", and the meter.
2. Costs table: Date, Description, Amount right aligned, "Edit" per row, empty copy.
3. Add/edit cost Modal: Description, Amount (greater than 0), Date defaulting to today. Remove cost with the confirm Modal copy from S2.
4. Server actions addCost, updateCost, removeCost.
Do not add: categories, receipts, hours, invoices, currency conversion.
Done when:
- Adding $1,200 to a $10,000 budget with $8,000 used shows 92%, "Near budget", and the same on S1.
- A failed save keeps the Modal open with values and the Alert.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T9. Mark complete and reopen                Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: A finished project leaves the Active view without losing data.
Read first: docs/shipright/build-rules.md, docs/shipright/04-frontend-spec.md (S2, S1).
Build:
1. "Mark complete" sets status completed and completed_at; "Reopen" reverses it.
2. Toast "Project marked complete." or "Project reopened."
3. Completed projects appear under Completed and All with the Completed badge.
Do not add: archive, delete, bulk complete.
Done when:
- Completing moves the project from Active to Completed, and Reopen moves it back with its deadlines and costs intact.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T10. QA pass                                Size: one sitting   After: T9
Paste this into your coding tool:
---
Goal: The release works by keyboard, on a phone and with difficult content.
Read first: docs/shipright/build-rules.md (Interaction and accessibility), docs/shipright/04-frontend-spec.md (all Acceptance lines).
Build:
1. Playwright tests: S1 at 1280 and 390 with 0, 1 and 40 projects; a 90-character project name; a $1,250,000 budget.
2. Keyboard path: sign in, add project, add deadline, add cost, complete.
3. Check contrast of any changed token pairs; check 200% zoom on S1 and S3.
4. Fix what fails. List anything you could not check.
Do not add: features or visual changes not needed to fix a failure.
Done when:
- Tests pass and every spec Acceptance line is checked or listed as not verified.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T11. Invite teammates                       Size: one sitting   After: Q1 answered
Waits for your access decision. Do not paste until PRD Q1 is answered:
who can see budgets, who can edit or remove costs, and who can invite.
This ticket will then add workspace roles, an invite flow and matching policies.
```

```text
T12. Launch check                           Size: one sitting   After: T10
Paste this into your coding tool:
---
Goal: Know what is left before real agency data goes in.
Read first: docs/shipright/build-rules.md, docs/shipright/01-prd.md (Open questions).
Build:
1. List: hosting plan chosen by the owner, environment variables set in the host, Supabase backups on, row-level security test from T2 re-run against the hosted database, sign-in email tested.
2. Mark each item Pass, Fail or Not verified with how you checked.
Do not add: deploys, sign-ups or paid plans. Those need the owner's OK.
Done when:
- The list exists with a status for every item.
Stop: Reply with the list and stop.
---
```
