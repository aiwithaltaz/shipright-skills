# Stage 9: Test and critique

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 09 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Prove it works, then look at it with fresh eyes. Open [test-plan.json](../templates/test-plan.json), [test-report.md](../templates/test-report.md), and [critique.md](../templates/critique.md).
Required headings in test-report.md: Steps, Rounds, Limits.
Required headings in critique.md: Removal, Patterns, Taste, Severity.

## Test

Run `node <skill>/scripts/check-ui.mjs` on the page and `node <skill>/scripts/run-tests.mjs <test-plan.json>`. The plan lists, per screen: url or file, widths 390 and 1280, actions, and expected text. Also run `node <skill>/scripts/consistency.mjs` on the page.
Always check: console errors, no sideways scroll at 320, 390, 768, and 1280, contrast, 24px AA targets with their exceptions (44px is a larger touch goal), keyboard focus, reduced motion with text still visible, a visible Sample or Demo label, no dev controls, and no text that moves when it should stay still.
For an existing app: every Now pain has a passing test, plus before and after shots.
The builder does not give itself a Pass on taste. If a fresh reviewer is available, they fill critique.md. If not, taste stays **Not verified**. Self-critique is still required. Follow the canonical Design Excellence rubric reached through step 7: compare two or three captured references, fix and rescore to at least 8/10 with no blocker. Unavailable references stay Not verified. Keep the self score separate from independent taste.

## Premium craft rubric

Run `check-ui.mjs --profile premium` on a public page. A miss here is a Fail.

1. First screen shows the product. A headline is not the product. `[data-product-hero]` holds a visible image, canvas, svg, or video inside the first viewport. Web move W2.
2. Each act is a new composition. `[data-act]` blocks must not share a measured signature of tone, media, alignment, and scale. Web move W4.
3. The accent comes from the product. Set `--accent` and `data-accent-source` to the object or material. Use the accent. It must not match the body text color. Web move W3.
4. No empty cards. A rounded panel taller than 240px must not leave more than 140px empty under its content.

## Measured bug classes

These fail on the standard profile too. Look at every pinned frame, not only the first screen.

- `[hidden]` loses to `display`. Starter tokens and every block set `[hidden] { display: none !important; }`. The checker fails a hidden element that is still visible.
- The fallback poster stays up under a live canvas. Fail when `[data-poster]` is visible and the canvas is showing.
- Pinned scenes. The checker scrolls each pin and fails if visible content is clipped out of the viewport.
- Heading color words. A heading that says a thing "is black" on a black band (or white on white) fails `heading-color-word`.
- Pin length. A pin over 3 screens of scroll per `[data-step]`, or over 6 screens in total, fails `pin-length`.
- Before and after sliders. The two pictures share one box, or both use `object-fit`, and the frame has no empty band.
- Phone nav. At 390, in-flow nav links stay on one line.
- Stale claims. The page sets `meta[name=pack-version]` and `meta[name=release-state]` (`released` or `draft`). A run may also pass `--release-state` and `--pack-version`. When the state is released, the visible text and the description must not say draft, not released, the draft is, or not started.

## Taste questions

1. Does the first screen say what this is and what to do in 5 seconds?
2. Is there one moment a user would show a friend?
3. Does the main work screen state the situation with numbers?
4. Does each screen look different from the last?
5. Next to a strong reference at the same width, what does the reference do better? Fix the top item.

## Fix loop

Test, fix, recapture and retest. Record every round in CHANGELOG.md. A round cap cannot turn an unresolved defect into a Pass; report any external or budget blocker explicitly.

## Case study

When the record, the pain map, the test report, and the screenshots exist, fill `templates/case-study.md` and `templates/case-study.html` from those files only. Do not add a number that is not already written there. A pitch deck is opt-in: fill `templates/pitch-deck.md` only when the owner asks for a pitch, a deck, or investor material. Then run `check-record.mjs` on the record folder.

## Gate

Scripted checks pass at 390 and 1280, or the gap is Not verified with a reason. Record updated. Run `node <skill>/scripts/check-record.mjs` on the record folder when you can.
