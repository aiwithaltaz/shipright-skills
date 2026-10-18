# Feature tickets

Each ticket is one prompt for the coding tool. Do them in order. Standing rules: `docs/shipright/build-rules.md`. Screens: `04-frontend-spec.md`. Reference for S1, S2, S3, S4 and S5: the preview page `index.html` (behavior and copy; rebuild with real data, do not copy its sample data).

**T1 Foundation. After: none.** Paste:
Goal: a running app with the look approved. Read first: build-rules.md, DESIGN.md, design/tokens.css, 02-technical-architecture.md. Build: 1) Next.js app with the stack named there. 2) Tokens wired into Tailwind. 3) Route `/design` showing type scale, colors, spacing, buttons (filled, secondary, text, danger text), fields with error state, Badge statuses, Alert, Toast, Skeleton. Do not add: any product screen. Done when: `/design` renders at 1280 and 390 with no sideways scroll, focus rings show on every control, contrast matches DESIGN.md. Stop: report files and wait for the owner's OK of the look.

**T2 Shell and sign-in.** Goal: signed-in users reach an empty Schedule. Read first: build-rules.md, 04 (S6), architecture (routes, access). Build: Supabase Auth email and password, `/sign-in` (S6), protected layout with the top bar, nav Schedule | Invoices, company name linking to `/settings`, 404 page with a link to `/schedule`. Company creation on first sign-in is an Unknown: stop and ask the owner. Done when: signed-out visits redirect to `/sign-in`; wrong password shows "Email or password did not match. Try again." Do not add: sign-up marketing, roles.

**T3 Data and access.** Goal: tables and row-level security. Read first: 02. Build: tables `companies, members, crews, jobs, invoices` as listed, RLS by company, invoice number function, a seed script with sample data marked as sample for local use only. Done when: a test user from company B cannot read or write company A rows (show the test). Do not add: other tables.

**T4 Schedule board, happy path (S1).** Goal: see a week by crew. Read first: 04 (S1), DESIGN.md. Build: `/schedule?week=`, board table, "Needs a crew" row, load line with over-hours text, summary line, Previous, Today, Next. Done when: 0, 1 and 12 jobs per cell render at 1280; Enter opens the job panel (T6); week in the URL survives reload. Do not add: drag and drop, filters.

**T5 Job form (S4).** Goal: add, edit, delete a job. Read first: build-rules.md, 04 (S4). Build: modal with fields, validation on submit, error summary, discard confirm, delete confirm (only without invoice). Done when: Cancel with entries asks first; first invalid field gets focus; saved job appears in its cell and gets focus.

**T6 Job panel (S3).** Goal: move and finish a job. Read first: build-rules.md, 04 (S3). Build: drawer, Crew select saving at once with an announced result, Mark as done, Mark as not done (blocked with a reason when invoiced). Done when: Escape returns focus to the job; moving to an over-hours crew shows the over-by text.

**T7 Schedule states and phone.** Goal: loading, empty, error and the day view. Read first: build-rules.md, 04 (S1 states, responsive). Build: skeleton cells, "No jobs this week.", Alert with Try again, day chips and crew sections below 1000 wide, bottom "New job" bar. Done when: no sideways scroll at 320, 390, 768, 1000; chips are 44 tall.

**T8 Send invoice (S5), needs owner decisions.** Goal: send an invoice email. Read first: 02 (integrations), 04 (S5). Unknown, owner: sender domain, invoice wording, tax. Build with sample wording marked Proposed. Insert invoice first, send email, then set `sent_at`; on failure keep entries and show Try again. Done when: double click sends once; a failed send shows an Alert and creates no "sent" invoice. Do not add: PDF, payment link, reminders.

**T9 Invoices (S2).** Goal: know who owes. Read first: build-rules.md, 04 (S2). Build: tabs Ready to invoice, Sent, Paid, outstanding line, Mark as paid with Undo. Done when: overdue is calculated from `due_on`; empty states per tab; two-line rows at 390.

**T10 Company details (S7).** Goal: the owner sets company facts. Read first: build-rules.md, 04 (S7). Build: company name, reply-to email, payment instructions, workday hours, crews. Saved state near the button. Done when: payment instructions appear in the S5 dialog; an invalid reply-to email shows an inline error. Do not add: logo upload, billing.

**T11 QA pass.** Keyboard on every screen, 320 to 1536 widths, contrast, 200% text size, reduced motion. Report Pass, Fail or Not verified per item.

**T12 Launch check.** Hand off to ship-check with a deployed URL. Do not deploy.

Stop line for every ticket: do not start the next ticket. Reply with changed files, decisions made and how you checked.
