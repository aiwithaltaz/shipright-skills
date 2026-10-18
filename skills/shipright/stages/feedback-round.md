# Feedback round

Use this when the owner sends exact changes, crops, or a marked screenshot. Do not run a full rediscovery. Then run stages 8 and 9 only for what changed.

Open [feedback-log.md](../templates/feedback-log.md).
Required headings: Rows.

## Steps

1. Parse the message into a numbered list, one item per change. Quote exact values (pixels, labels, colors).
2. Classify each item: clear change, needs a decision, my bug, or out of scope. If the owner names the wrong cause for a real problem, say so once, plainly, then do what they choose.
3. Ask the "needs a decision" items in one batch. Max 4. Recommended option first. A short preview of each. State an obvious default instead of asking.
4. Keep before images. Crops are the spec. A full screenshot is context only.
5. Build only what was agreed. What the owner likes is locked. Do not restyle the rest.
6. Test: one check per changed behavior, plus the checker on the page.
7. After images at 1280 and 390, plus a close-up of the change.
8. Report: what changed, what differs from the ask and why, tests, what still waits on the owner.
9. Log a row per item: feedback, decision, status, why. Update CHANGELOG.md and DECISIONS.md.
10. Ship only when the owner says to push. Then verify the live page has the change. Until then the work is Proposed.

## Record

Required headings in CHANGELOG.md: Entries.
A row names the pain or decision ID, the test result, and the screenshot path.

## Gate

Every asked change is done, refused with a reason, or waiting on a named decision. Liked parts are unchanged. Tests cover the changes. Record updated.
