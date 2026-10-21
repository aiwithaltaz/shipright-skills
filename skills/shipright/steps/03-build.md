# Step 3: Build

Read `PRODUCT.md` and `DESIGN.md`. Build every screen to the level of the references. Short, specific copy. Real charts with axes and values when the data needs them.

## Build checks (broken things only)
Open every screen at 1280 and 390 and fix:

- console errors, raw None, null, undefined or NaN
- content cut off or overflowing its box; tables become stacked rows at 390
- on the phone, the core item (a service, product, habit, record) shows on the first screen
- every label, price and total updates right after any change of choice
- phone numbers, money and dates are formatted, and inputs format as you type
- no typos or double punctuation; rows and carousels start aligned
- pop-ups and toasts do not cover content after you move on
- photos look real, or use illustration; no fake-looking AI faces

Do not add other checks. Optional tools: `node <skill>/scripts/check-ui.mjs <page.html>`, `crawl.mjs`, `check-tokens.mjs`, `run-tests.mjs`.

Next: [Step 4](04-look-and-fix.md).
