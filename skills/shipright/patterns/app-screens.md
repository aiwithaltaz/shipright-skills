# App screens

Open this for an app or a dashboard. Do not also open web-pages.md on the same pass.

Each rule: why, a good line, a bad line, and the check.

## A1. Situation headline

The H1 states the situation and the next decision, with real numbers.
Why: the user knows what to do in 3 seconds.
Good: "Week of October 19. 59 visits worth $8,385, 1 crew day over capacity, rain Thursday."
Bad: "Schedule".
Check: the H1, or the line under it, has a count and a consequence.

## A2. Decision on the item

Each row that needs attention carries the one action that fixes it.
Why: a status badge with no action makes the user hunt.
Good: "Invoice Matcher failure rate 18%, usually 2%" with Pause agent.
Bad: a red badge and no button.
Check: every row in a needs-attention list has one visible fixing action.

## A3. Compare to normal

A number is shown next to its usual value.
Why: 18% means nothing alone.
Good: "18%, usually 2%". "2.9x usual by this hour".
Bad: a raw count with no baseline.
Check: a metric that can vary has a usual, a budget, or a prior period beside it.

## A4. Work queue plus context rail

The main column is what to do now. The right column is what drives the next decision.
Why: one wide table hides the next action.
Good: a week board, plus "Ready to invoice: 12 visits, $930, Send 12 invoices".
Bad: one table, or a table plus an empty "Select a row" panel.
Check: there is a primary list and a rail with one next decision. On a phone the rail moves under the list, not off screen.

## A5. The product's real world

A domain fact that changes a decision is on the screen, not only in a doc.
Why: generic fields ignore the week the user actually has.
Good: weather on the day, a rain warning, a pace limit, spend versus budget.
Bad: the same form for every product.
Check: at least one on-screen fact comes from the research brief's domain world.

## A6. Domain-true sample data

Names, durations, prices, and failures look like the domain, and are labeled.
Why: thin rows do not test the layout. Unlabeled prices become fake facts.
Good: "Weekly mow, 1h, $55" and a "Demo data" tag next to the title.
Bad: Row 1, Row 2, or a menu of prices the owner never gave, with no label.
Check: a visible "Demo data" or "Sample" label sits near the title. Sample prices are not written as Verified.

## A7. Working name and position

The product has a real working name and one line that says what it is.
Why: "App" is not a position.
Good: "Groundcrew is a week board for small crews that moves a rain day in one step."
Bad: "Postdesk (working name)" with no position line.
Check: the title or the line under it names the product and the job.

## Also on every work screen

Removal test. Drop anything that repeats, has no job right now, is unconfirmed, is a later phase, is the wrong audience, or fights the main action.
No developer or preview control. A review switch belongs behind `?review=1`.
No empty side panel. Show the most useful item, or collapse the panel.
A work screen shows money, time, or risk when the job involves them.
