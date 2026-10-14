# 05 - Feature tickets

**Version/date:** 0.1, 13 Oct 2026. Paste one ticket at a time into Cursor. Each one ends with a stop line.
Standing rules live in `docs/shipright/build-rules.md`; tickets do not repeat them.

## Order

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and `/design` preview | Tokens | |
| T2 | Database, sign-in and shell | S0, top bar | T1 |
| T3 | Projects list: happy path | S1 | T2 |
| T4 | Projects list: states and phone layout | S1 | T3 |
| T5 | New and edit project form | S3 | T3 |
| T6 | Project page and spend update | S2 | T5 |
| T7 | Deadlines on the project page | S2 | T6 |
| T8 | Mark completed, reopen, Completed view | S2, S1 | T7 |
| T9 | Team access (**needs D-04**) | Access | T8 |
| T10 | QA pass | All | T8 |

## Tickets

```text
T1. Foundation and /design preview        Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The project runs locally and shows the proposed look on /design for the owner's OK.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/02-technical-architecture.md (Stack).
Build:
1. Create a Next.js App Router project with TypeScript, Tailwind CSS and shadcn/ui (current stable versions).
2. Import design/tokens.css in the root layout. Map Tailwind colors, spacing, radius and font size to the CSS variables.
3. Load IBM Plex Sans (400, 500, 600) with next/font.
4. Add lib/money.ts: formatMoney(cents) with Intl.NumberFormat and NEXT_PUBLIC_CURRENCY (default "USD", marked sample in a comment).
5. Page /design: type sizes, color roles with contrast notes, spacing scale, Button (primary, secondary, text, disabled, busy), Text input (default, invalid), Segmented control, every Badge from DESIGN.md, the budget meter in three states, a focus ring example.
6. Keep .cursor/rules/shipright.mdc from this pack in the project root (it points Cursor to build-rules.md).
Do not add: pages other than /design, a database, sign-in.
Done when:
- npm run dev serves /design with no console errors.
- No hex or px values outside design/tokens.css.
- Tab reaches every control on /design with a visible ring.
Stop: Do not start T2. Reply with changed files and a link to /design so the owner can approve the look.
---
```

```text
T2. Database, sign-in and shell           Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: The owner signs in with an email link and sees an empty, protected app shell.
Read first: build-rules.md, 02-technical-architecture.md (Data model, Access rules, Routes), 04-frontend-spec.md (S0, Navigation).
Build:
1. Supabase migration for members, clients, projects, deadlines exactly as in Data model. Enable row-level security on all four; allow read and write only when auth.uid() is in members.
2. Seed members with the owner's email only (from an env var in the seed script, not hardcoded).
3. S0 /sign-in with the states in the spec. Middleware redirects signed-out users to /sign-in.
4. Signed-in user not in members: the "not on the team list" message and Sign out.
5. Top bar: NEXT_PUBLIC_APP_NAME link to /projects left; account menu right with name and Sign out. / redirects to /projects (an empty page titled "Projects" for now).
Do not add: invite screens, roles, password sign-in.
Done when:
- Signed out, /projects redirects to /sign-in.
- A non-member email cannot read any row (test with a second account).
- Sign out returns to /sign-in.
Stop: Do not start T3. Reply with changed files, the migration name, and how you tested access.
---
```

```text
T3. Projects list: happy path              Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: The owner sees active projects with problems first and opens one.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (S1), 02-technical-architecture.md (Attention sort).
Build:
1. lib/attention.ts: next open deadline, days late or until due, budget percent, budget state, sort key. Thresholds as named constants DUE_SOON_DAYS = 7, BUDGET_WARNING = 0.8 (D-07). Unit tests for each sort rank.
2. /projects server-loads active projects with client, lead and open deadlines in one query.
3. Page header, Segmented control (Active only for now, with count), the muted attention line, and the table with the four columns and badges from the spec.
4. Project name links to /projects/[id]; row click does the same.
Do not add: search, filters, charts, summary cards, export.
Done when:
- Sample seed of 12 projects sorts as specified; unit tests pass.
- Amounts use formatMoney and tabular figures.
- Tab reaches each project link with visible focus.
Stop: Do not start T4. Reply with changed files, decisions and how you checked.
---
```

```text
T4. Projects list: states and phone layout   Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: S1 handles loading, empty, error, long data and phone width.
Read first: build-rules.md, 04-frontend-spec.md (S1 States, Responsive).
Build:
1. Loading: 8 skeleton rows; header and Segmented control stay usable.
2. Empty Active: "No active projects yet." with New project in the table area.
3. Load error: Alert "Projects did not load." with Try again; keep rows already shown.
4. Projects with no open deadline show "No open deadlines".
5. At 720 px and below: stacked items as in the spec, New project in a bottom bar, page padding reserved for it.
6. Long names wrap to two lines, then truncate with the full name in title and on focus.
Do not add: pagination, filters.
Done when:
- 0, 1 and 40 projects render at 1280 and 390 with no sideways scroll.
- Try again refetches and the Alert leaves on success.
- The last row and its focus ring are not hidden by the bottom bar.
Stop: Do not start T5. Reply with changed files and how you checked each state.
---
```

```text
T5. New and edit project form              Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A member adds a project, or edits one, without help.
Read first: build-rules.md, 04-frontend-spec.md (S3), 02-technical-architecture.md (Data model).
Build:
1. /projects/new and /projects/[id]/edit share one form: Client Combobox (pick or "Add client '[name]'"), Project name, Lead Select (default current member), Budget.
2. Server action with zod: messages "Enter a project name.", "Choose or add a client.", "Budget must be 0 or more." Budget converts to cents.
3. Buttons: Cancel (secondary) then "Create project" or "Save changes" (primary), right aligned. Busy label "Saving"; no double submit.
4. Cancel with changes asks "Discard changes?" (Keep editing, Discard changes).
5. Success opens /projects/[id] with toast "Project created" or "Changes saved". Failure: Alert "Project not saved. Try again." with values kept.
Do not add: deadlines here, project deletion, extra fields.
Done when:
- Errors appear by each field and are announced.
- Two clients with the same name in different case cannot be created.
- Works at 390 with buttons full width.
Stop: Do not start T6. Reply with changed files and how you checked.
---
```

```text
T6. Project page and spend update          Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: A lead opens a project and updates the spend so far.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (S2).
Build:
1. /projects/[id]: back link "Projects", header (name, client, lead, Edit), Budget section as specified, with "Updated [date] by [name]" or "Spend not entered yet".
2. "Update spend" opens an inline form: Amount, "Save spend", Cancel. Server action stores spent_cents, spent_updated_at, spent_updated_by.
3. Saving shows "Saving"; success updates the figures and announces "Spend updated" in role="status".
4. Failure: "Spend not saved. Try again." by the form, typed value kept.
5. Missing or not allowed id: "Project not found." with a link to Projects.
Do not add: spend history, charts, time entries.
Done when:
- Over budget shows "Over by" with the danger badge; 80% or more shows the warning badge.
- Keyboard: open form, save, and Cancel returns focus to "Update spend".
Stop: Do not start T7. Reply with changed files and how you checked.
---
```

```text
T7. Deadlines on the project page          Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: A lead adds, edits, completes and removes deadlines.
Read first: build-rules.md, 04-frontend-spec.md (S2 Deadlines, Dialogs).
Build:
1. Deadlines list sorted by date: Done checkbox labelled with the title, date, badge, "Edit" and "Remove" text buttons.
2. "Add deadline" inline form: Title, Due date (native date input), "Add deadline", Cancel. Edit reuses it.
3. Done toggles done_at; unticking reopens it.
4. Remove opens the confirm dialog from the spec; only that deadline is deleted.
5. Empty: "No deadlines yet." with Add deadline. Errors stay by the form with values kept.
Do not add: reminders, assignees, recurring deadlines.
Done when:
- S1's Next deadline and sort update after each change.
- Dialog: focus enters, Escape closes, focus returns to Remove.
Stop: Do not start T8. Reply with changed files and how you checked.
---
```

```text
T8. Mark completed, reopen, Completed view   Size: one sitting   After: T7
Paste this into your coding tool:
---
Goal: A lead closes a finished project and can find or reopen it later.
Read first: build-rules.md, 04-frontend-spec.md (S1 Completed view, S2 Dialogs).
Build:
1. S2 "Mark completed" with the confirm dialog; sets status and completed_at. Completed projects show a "Completed" badge and "Reopen project".
2. S1 Segmented control adds "Completed (n)" using ?view=completed. Columns: Project, Lead, Completed, Final spend.
3. Empty Completed: "No completed projects yet."
Do not add: archive, delete, bulk actions.
Done when:
- Back from S2 returns to the view the user came from.
- The segment state is announced with aria-pressed and the focus ring stays visible on it.
Stop: Do not start T9. Reply with changed files and how you checked.
---
```

```text
T9. Team access                             Size: one sitting   After: T8
Status: Needs decision D-04. Do not paste until the owner answers:
who can see budget figures, who can edit projects, and who adds members.
When answered, write RLS policies and tests for exactly that answer, plus the
simplest way to add members it allows. No invite UI unless the answer requires one.
```

```text
T10. QA pass                                Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: Every screen passes the build-rules checks before anyone else uses it.
Read first: build-rules.md, 04-frontend-spec.md (all), this file.
Build:
1. Walk S0 to S3 by keyboard only. Fix order, focus visibility and dialog focus.
2. Check 1280, 390 and 320 wide with 0, 1 and 40 projects and a 120-character project name.
3. Measure contrast of every text and badge pair against DESIGN.md.
4. Run lint, type check and unit tests.
Do not add: new features or restyling.
Done when:
- A list of each check with Pass, Fail or Not verified and the fix made.
Stop: Reply with the list. Launch readiness is a separate check.
---
```
