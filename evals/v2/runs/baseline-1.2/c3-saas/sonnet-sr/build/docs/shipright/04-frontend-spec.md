# Frontend spec

Tokens: `design/tokens.css`, names in `DESIGN.md`. Rules: `build-rules.md`. Phase source for every screen is the PRD (J1, J1b, J2, J2b). Sample data is labeled as sample.

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Schedule (main screen) `/schedule`

**Job:** see the week by crew and place jobs. **Add/change:** nothing beyond the PRD.
**Layout, 1280 wide:** top bar 56 (name, nav Schedule | Invoices, company name on the right: a link to S7 in the build, plain text in the preview). Page header: "Schedule" 20/600 left, "New job" filled right. Toolbar: Previous, Today, Next, week range "19 to 24 Oct 2026". One muted summary line. Board table: first column 176 (crew name over members), six day columns Mon to Sat. Optional first row "Needs a crew" only when a job has no crew. Cell: job items stacked by start time, then a load line.
**Job item (a button):** line 1 start time and duration, line 2 customer (wraps), line 3 services (muted). Done jobs add a status line: "Done, not invoiced" (amber, alert icon), "Done, invoice sent", "Done, paid" (check icon).
**Load line:** "6.5 of 8 h". Over: alert icon and "9.5 of 8 h, over by 1.5 h" in amber. Counts on-site time only.
**Summary line:** "27 jobs this week, 3 need a crew, 1 crew day over hours." and, when any, "5 finished jobs are not invoiced. Invoice them" linking to S2.
**Today** column header carries the text "Today" and an accent tint.
**States:** populated (default), empty week ("No jobs this week. New job"), loading (skeleton cells, "Loading schedule"), error (Alert "The schedule did not load." with Try again). 0, 1 and many jobs per cell.
**Responsive:** below 1000 wide the board becomes a day view: week header, six day chips (44 tall, date, job count, selected = accent fill plus check), then one section per crew with full-width job items. "New job" moves to a bottom bar. Reason: six columns need about 140 each.
**Accessibility:** real table, caption, column and row headers, job items are buttons with natural text. Focus order: toolbar, board by row. Day chips are a button group with `aria-pressed`. Summary and moves are announced in a polite status region.
**Copy:** buttons "New job", "Previous week", "Next week", "Today". Empty: "No jobs this week." Not "Welcome".
**Do not add:** drag and drop, filters, charts, customer list, map, summary cards, notification dots.
**Acceptance:** 1280 and 390 show no sideways scroll; Enter on a job opens S3; Escape returns focus to that job; a crew day over 8 h shows text, not only color.

## S2 Invoices `/invoices`

**Job:** J2, J2b. Header "Invoices". Segmented control: Ready to invoice (n), Sent (n), Paid (n). One muted line: "Outstanding 2,140.00 across 6 invoices, 2 overdue."
**Table:** Ready: Customer and address, Job date, Amount, action "Invoice this job". Sent: Invoice, Customer, Sent, Due (Due in 3 days or Overdue 6 days, text plus icon), Amount, action "Mark as paid". Paid: Invoice, Customer, Paid, Amount. Amounts right aligned, tabular. Customer opens S3.
**States:** empty per tab ("Nothing to invoice. Finished jobs appear here."), no unpaid ("No unpaid invoices."), loading, error with Try again. "Mark as paid" confirms with a toast and Undo.
**Phone:** rows become two-line items, action below. **Do not add:** export, reminders, charts, bulk actions.

## S3 Job panel (drawer, `Sheet`)

**Job:** see one job, move it, finish it, invoice it. Drawer right 420 wide, full screen sheet at phone width. Header: customer name (h2), "Close". Body: When, Where, Email, Services, Price. **Crew** select (changes at once, announced, shows that day's load). Status block: Scheduled with "Mark as done" (filled), or Done with "Mark as not done" (text; disabled with a reason when an invoice exists). Invoice block when done: not invoiced shows "Invoice this job" (filled); sent shows number, sent date, due, "Mark as paid"; paid shows paid date. Footer: "Edit job" (secondary). One filled button in the panel at a time.
**States:** unassigned (select shows "Needs a crew"), done, invoiced, over-hours note under Crew.
**A11y:** modal, focus moves in, Tab contained, Escape closes, focus returns to the job item. **Do not add:** notes thread, photos, time tracking.

## S4 Job form (modal)

**Job:** create or edit. Fields, all with visible labels: Customer name*, Customer email (help: "Needed to send an invoice"), Address*, Date*, Start time*, Duration* (0.5 h steps), Crew (default "Needs a crew"), Services*, Price. Footer: Delete job (left, danger text, only when editing and no invoice), Cancel, Save job.
**Validation:** on submit; error summary at top plus text under each field; focus goes to the first invalid field. Cancel with changes asks "Discard this job? Your entries will be lost." with Keep editing and Discard. Delete asks to confirm with the customer name and date.
**Copy errors:** "Enter the customer name." "Enter a valid email, like name@example.com." "Choose a date."

## S5 Send invoice (modal)

**Job:** J2. Title "Invoice this job". Fields: To*, Amount*, Due (7, 14, 30 days, shows the date). Read-only payment instructions from S7. Footer: Cancel, "Send invoice" (filled). While sending: button reads "Sending" and is disabled. Success: dialog closes, toast "Invoice INV-0043 sent to name@example.com." Failure: Alert in the dialog, entries kept, "Try again". Sent invoices cannot be unsent; the dialog says so.
**Preview build:** nothing is sent, and the toast says so.

## S6 Sign in `/sign-in` (not in the preview)

Email, password, "Sign in", link "Reset password". Error: "Email or password did not match. Try again." No sign-up marketing. Sign-up and company creation are ticket T2 decisions, Unknown, owner.

## S7 Company details `/settings` (not in the preview)

Company name, reply-to email, payment instructions (free text), workday hours (default 8), crews (name, members text). Saved state shown near the Save button. Reached from the company name in the top bar; its exit is the nav.
