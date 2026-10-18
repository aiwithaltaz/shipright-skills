# Stage 9: Test and critique

Prove it works, then look at it with fresh eyes. Open [test-plan.json](../templates/test-plan.json), [test-report.md](../templates/test-report.md), and [critique.md](../templates/critique.md).
Required headings in test-report.md: Steps, Rounds, Limits.
Required headings in critique.md: Removal, Patterns, Taste, Severity.

## Test

Run `node <skill>/scripts/check-ui.mjs` on the page and `node <skill>/scripts/run-tests.mjs <test-plan.json>`. The plan lists, per screen: url or file, widths 390 and 1280, actions, and expected text. Also run `node <skill>/scripts/consistency.mjs` on the page.
Always check: console errors, no sideways scroll at 320, 390, 768, and 1280, contrast, 44px targets on a phone, keyboard focus, reduced motion with text still visible, a visible Sample or Demo label, no dev controls, and no text that moves when it should stay still.
For an existing app: every Now pain has a passing test, plus before and after shots.
The builder does not give itself a Pass on taste. If a fresh reviewer is available, they fill critique.md. If not, taste stays **Not verified**.

## Taste questions

1. Does the first screen say what this is and what to do in 5 seconds?
2. Is there one moment a user would show a friend?
3. Does the main work screen state the situation with numbers?
4. Does each screen look different from the last?
5. Next to a strong reference at the same width, what does the reference do better? Fix the top item.

## Fix loop

Up to 3 rounds: test, fix, retest. Record each round. Update CHANGELOG.md.

## Gate

Scripted checks pass at 390 and 1280, or the gap is Not verified with a reason. Record updated. Run `node <skill>/scripts/check-record.mjs` on the record folder when you can.
