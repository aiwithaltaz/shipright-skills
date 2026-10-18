Done. I made the full plan and built the main screen. I've called it **Groundcrew** for now (that's a working name, so check the trademark and domain before you get attached to it).

## The idea in one line

A scheduling and invoicing app for small landscaping companies with 3 to 20 workers. You plan the week's crews on one board, move a rain day with one tap, and on Friday every finished visit becomes an invoice.

## Why there's room for this

- **General field-service apps** (Jobber, Service Autopilot, Housecall Pro) run about $49 to $199+/month. They're built around one technician going to one job. Crews and weather get bolted on afterwards.
- **Landscape-specific suites** (LMN, SingleOps, Aspire) start around $220 to $300/month and go well past $500. They're built for 30+ person companies that need estimating and job costing.
- **What's missing:** something crew-first and week-first, with invoicing built in, priced for a company where the office is one person or nobody at all.

## What's in the plan (`build/`)

| File | What it covers |
|---|---|
| `01-product-brief.md` | Who it's for, the 3 problems (rain, late invoices, overloaded crews), what sets it apart, 6-month goals |
| `02-mvp-scope.md` | Features ranked P0/P1/P2, what's deliberately left out, 7 core user stories |
| `03-screens-and-flows.md` | Screen map, the week board layout, 4 key flows, design direction |
| `04-data-model.md` | Tables for companies, crews, customers, service plans, visits, invoices and payments |
| `05-tech-and-build-plan.md` | Stack (Next.js + Supabase + Stripe), a 12-week build plan, technical risks |
| `06-pricing-and-launch.md` | Pricing ($39 / $79 / $149 per company), interview script, launch channels, metrics |

## The main screen (`index.html`)

This is the week board, and it's clickable. Things to try:

- **Thursday is a rain day.** Hit the pink "Move 9 visits" button. Each visit goes to the next day its crew has room for (6 land on Friday, 3 on Saturday), and you can undo it.
- **Crew 2 is over capacity on Wednesday** (9 of 8 hours). Drag a visit to another crew and watch the load bars update. You can also click any visit and use "Move to" instead of dragging.
- **Click a visit** to mark it done or skipped. Done visits go straight into **Ready to invoice**.
- **Send invoices** from the right-hand panel. Untick the ones you want to hold back. Commercial accounts are held for one invoice at month end.
- **On a phone** the board switches to one day at a time, with day tabs along the top.

It's plain HTML, CSS and JS with no libraries and no internet fonts. Serve the folder from any static server and open `index.html`. All the data is sample data and nothing is saved.

## Two things I'd flag

1. **Timing matters a lot here.** Landscapers choose software between January and March and have zero time for it from April to October. Pilots should be running by February.
2. **Before you build the real thing,** show this board to 10 to 15 owners (there's a script in `06-pricing-and-launch.md`). If rain days and late invoices don't come up on their own as real pain, we should rethink before writing code.

Want me to do the crew lead's phone screen next, or the customer's invoice and pay page?

Sources for competitor pricing (list prices, worth checking again before you quote them):
- [Lawn care & landscaping software pricing 2026 (Costbench)](https://costbench.com/software/lawn-care-software/)
- [Jobber pricing 2026 (Costbench)](https://costbench.com/software/lawn-care-software/jobber-lawn/)
- [LMN pricing 2026 (Costbench)](https://costbench.com/software/lawn-care-software/lmn-landscape/)
