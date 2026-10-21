# Test report

Status: current

## Steps

- Pass: home / fit 390. no sideways scroll
- Pass: home / console 390. no console errors
- Pass: home / click 390. Who is it for, and what one job should version one finish?
- Pass: home / click 390. 05-feature-ticket-list.md
- Pass: home / click 390. Subscription price
- Pass: home / click 390. Phone form hid its Cancel and Save buttons below the scroll
- Pass: home / click 390. This after is Altaz
- Pass: home / click 390. remove the dot on the selected nav item
- Pass: home / click 390. npx skills add aiwithaltaz/shipright-skills -a cursor -y
- Pass: home / click 390. open source under the MIT license
- Pass: home / focus 390. focus visible
- Pass: home / fit 1280. no sideways scroll
- Pass: home / console 1280. no console errors
- Pass: home / click 1280. Who is it for, and what one job should version one finish?
- Pass: home / click 1280. 05-feature-ticket-list.md
- Pass: home / click 1280. Subscription price
- Pass: home / click 1280. Phone form hid its Cancel and Save buttons below the scroll
- Pass: home / click 1280. This after is Altaz
- Pass: home / click 1280. remove the dot on the selected nav item
- Pass: home / click 1280. npx skills add aiwithaltaz/shipright-skills -a cursor -y
- Pass: home / click 1280. open source under the MIT license
- Pass: home / focus 1280. focus visible
- Pass: home / reduced motion. text visible
- Pass: case / fit 390. no sideways scroll
- Pass: case / console 390. no console errors
- Pass: case / focus 390. focus visible
- Pass: case / fit 1280. no sideways scroll
- Pass: case / console 1280. no console errors
- Pass: case / focus 1280. focus visible
- Pass: case / reduced motion. text visible

## Rounds

- Round 1.

## Limits

- One browser, software rendering. Not a full accessibility audit.

## Salon A/B test (2026-10-20)

Same prompt in Grok Build, model Grok 4.7. Build A without ShipRight, build B2 with the reference-first pack. Graded by ShipRight Lab with RUBRIC.md, not blind.

- Craft, out of 40: without 28, with 31.
- Product thinking, out of 28: without 21, with 24.
- Brand colors in B2: #f3eee6, #8f4334, #234237.
- Today's install is ShipRight 1.4.0; the reference-first method is not in 1.4 yet.
- Live: https://shipright-test-salon-a.vercel.app and https://shipright-test-salon-b.vercel.app

## CRM A/B test (2026-10-20)

Sales CRM dashboard, same prompt in Grok Build, Grok 4.7. Without ShipRight vs with the reference-first pack (build Bref). Graded by ShipRight Lab with RUBRIC.md, not blind. One run each.

- Craft, out of 40: without 27, with 30.
- Product thinking, out of 28: without 19, with 22.
- Earlier packs in the same test: 1.4 craft 23, 1.5 craft 19, both lower than without. That is why the method changed.

## Habit A/B test (2026-10-21)

Habit tracker phone app, same prompt in Grok Build, Grok 4.7, one run each. A without ShipRight (Daymark). B with ShipRight 1.6.0 (Nock), which wrote PRODUCT.md and DESIGN.md. Graded by ShipRight Lab with RUBRIC.md, not blind.

- Craft, out of 40: without 28, with 29.
- Product thinking, out of 28: without 21, with 24.
- Live: https://shipright-test-habit-a.vercel.app and https://shipright-test-habit-b.vercel.app
- Quoted from B's files: 4 of 5 still open today; 4-week tally stick; 7 days in a row; type steps 13, 16, 18, 22, 28, 36; spacing 4, 8, 12, 16, 24, 32, 48; colors #E6EDF1, #F4F8F9, #143049, #9E2218, #C8962E.
- Earlier-method runs (salon, CRM) used the same reference-first steps before 1.6.0 was released.
