# Critique and fix loop

Artifact: `index.html` (static preview, sample data, Chromium only), tokens in `build/design/tokens.css`. Stage: visual artifact plus exercised paths in a headless browser. Next step: owner review of the look.
`scripts/check-ui.mjs` is not in this copy of the pack, so its checks were run by hand with a browser script and screenshots at 1280, 640, 390 and 320 wide. That is partial evidence. Nothing below claims a full check-ui pass.

## Measured

| Check | Result |
| --- | --- |
| Sideways scroll at 1280, 640, 390, 320 | Pass: none, list and drawer open |
| Text contrast, every rendered text node, list and drawer, three widths | Pass: no pair under 4.5:1 |
| Font families | Pass: one system stack, no web fonts, no CDN |
| Text under 12 px | Pass: none |
| Controls with a visible label | Pass: search and team have labels, radios have a legend |
| Targets under 24 by 24 px | Fail in round 1 (agent name buttons 20 px tall), Pass after fix |
| Reduced motion | Pass: drawer animation switches to a 1 ms fade, close is instant |
| Em dashes in copy and docs | Pass: none |
| Gradients, glow, uppercase micro labels, two filled buttons side by side | Pass: none |
| Console errors | Pass: none across every state |

## Exercised by keyboard and pointer

Tab order: view control, search, team, each agent name. Enter on a name opens the drawer with focus on Close; Tab stays inside; Escape closes; focus returns to the same name, or to the view control when that agent left the view. Browser Back closes the drawer. Approve, Decline with inline confirm and Cancel, Retry, Pause, Undo, Resume ran. Loading, empty, error, no matches and runs-failed states render.

## Findings and fixes

| # | Where | Evidence | Impact | Severity | Fix | Retest |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | S2 status line | Screenshot: check icon alone on its own line, text below | Reads as a broken message | Polish | Grid layout: icon, text, Undo, Dismiss | Fixed, re-screenshotted |
| 2 | S1 agent name | Measured 20 px tall | Below the 24 px target minimum | Major | Padding to 24 px, 28 on phones | Fixed, audit clean |
| 3 | S1 loading | Skeleton row showed hover tint and pointer | Implies a clickable row | Polish | No hover on skeleton rows | Fixed |
| 4 | S2 Request block | Current work shown twice | Duplicate fact | Polish | Hide the facts row when a block shows it | Fixed |
| 5 | S1 view control | Control grows about 2 px when the check icon moves to another option | Slight shift of the search field | Polish | Open: reserve space for the check | Not fixed, listed in the reply's checks |

## What works and stays

One list, no summary cards, no feed, no chart. Failed and Waiting for you sort to the top and carry text, icon and tint. One filled button per scope. Pause uses Undo. Decline confirms inline and names the consequence.

## Not verified

Screen reader announcements. Text zoom to 200 percent (only reflow to 640 and 320 wide was run). Forced colors. Browsers other than Chromium. Real data, real latency, access rules, persistence, performance. Pause, Resume and Decline behavior on a real platform (Unknown).
