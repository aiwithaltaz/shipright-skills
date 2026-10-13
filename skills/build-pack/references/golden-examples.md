# Worked examples

Load only the example for the current product type, at the screens and tickets steps. These show the level of detail and density expected.
Subjects are illustrations with sample data. Do not copy their content, names or values into another product.

## SaaS: invoice tracker for freelancers (starter A)

Frame: freelancers with 5 to 30 clients. Job: see who owes what and chase late invoices. Today: a spreadsheet. This release: list, detail, mark paid. Out: payments, reminders, multi-user.

Screen S1, Invoices, 1280 wide:
- Top bar 56 tall: product name left, account menu right. No sidebar; two destinations fit in the bar.
- Page header: "Invoices" 20/600 left; "New invoice" filled button right. Below it, a Segmented control: Open (12), Paid, All.
- Table, full content width, row 40: Client and invoice number (14/500 over 13 muted), Issued, Due, Amount (right, tabular), Status badge (text plus dot: Overdue 6 days, Due in 3 days, Paid).
- Overdue rows sort first. No summary cards: the Open count lives in the control, the overdue total in one muted line under the header ("3 overdue, 4,250 total").
- Empty: "No open invoices. New invoice" in the table area. Error: inline Alert above the table with Try again; the last loaded rows stay.
- 390 wide: rows become two-line items (client and amount on line one, due and status on line two). The primary button moves to a bottom bar.

## Mobile: book a dentist visit (starter B)

Screen 2 of 3, "Choose a time":
- Top: back chevron with "Back" label, step text "Step 2 of 3" right. Title 28/700 "Choose a time".
- Date strip: seven day chips, 48 tall, today selected with accent fill and a check icon; disabled days in muted text with "Full".
- Slots: a two-column grid of 48-tall buttons with times; selected slot uses accent border plus check, not color alone.
- Summary line above the bar: "Check-up, Dr. Lee, Tue 14 May, 10:30" (sample data).
- Bottom bar: full-width "Continue" button, disabled until a slot is chosen, with helper text "Pick a time to continue."
- Slow network: slots show a skeleton of six buttons; failure shows "Times did not load. Try again" in place of the grid.

## Marketing: launch page for a note app (starter C)

Argument: (1) It captures a thought in two seconds: proof, a live demo field. (2) Notes link themselves: proof, an interface fragment. (3) It works offline: proof, plain terms. (4) Price: proof, the real plan table the owner supplied.
- Hero: headline "Write it down before it's gone." 64/700 desktop, 36 phone. One sentence. "Get the app" filled, "See how it links notes" text link. Right side: a real HTML fragment of the editor at 1:1, not a screenshot mock.
- Section 2 uses a wide fragment with three callouts; section 3 is a two-column text block; section 4 a plain table. No icon cards, no testimonials (none supplied), no logos.
- One signature move: the demo field types a sample note once on load; reduced motion shows it already typed.

## 3D: product page for a desk lamp (starter D)

- Hero: canvas 100% wide, 70vh desktop and 56vh phone, no frame. Left column over a calm area: name 72/600, one sentence, price only if supplied, "Buy" filled and "Specs" text link.
- Model: glTF under 2 MB with Draco, KTX2 textures under 1 MB total, pixel ratio capped at 2, render on demand when idle.
- Interaction: drag to rotate with damping; arrow keys rotate when the canvas is focused; a visible "Reset view" button. Caption under the canvas: "Drag or use arrow keys to turn."
- Loading: a still render of the lamp shows first; the canvas fades in when ready. No WebGL or reduced motion: the still image stays, with three angle buttons.
- Below: specs table, materials with close-up stills, FAQ, footer. Scroll motion: one pinned section that turns the lamp 90 degrees, skipped under reduced motion.

Tickets follow the anatomy in ticket-prompts.md: goal, read first, ordered build steps, tokens, states, do-not-add, done-when checks and the stop line.
