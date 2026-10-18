# Registration desk: round 2 change record

Mode: ui-ux-design, focused correction of an existing screen (not a new project, so no new build pack or design preview).
Intake: 0 questions. Every change in the message is explicit. Where the user said "A or B", one option is enough.
Source: registration-full.png (whole screen), crop-1 to crop-6 (liked properties), user message.

## Phase

Current phase: registration only. Check-in comes later.
Job of the screen: find a person, add them to a visit, finish what they still need (waiver, payment).
Allowed changes: the list below. Exclusions: anything check-in, printer, sync, counters, search-mode tabs, filters.

## Design system (Observed, sampled from registration-full.png, reused, not replaced)

- Colors: page #faf7f2, surface #ffffff, border #e4d9ce, accent #9b381e, selected nav #efe3d5, count chip #ead8c7, input fill #faf8f5, text #1f1916.
- Status tints: green #ecfdf5, amber #fef3c7, red #fee2e2, grey #f1e8df, blue #eef2f6, purple #faf5ff.
- Type: one sans family (Inter where installed, then system sans). Sizes as drawn: 30 title, 21 section heading, 17 body and nav, 15 meta, 14 tags.
- Shape: cards radius 14-16, controls radius 8, tags radius 5. One filled primary per scope.
- Icons: one line family, 1.6 stroke, recreated inline (the original icon library is Unknown).
- Unknown: exact font name, logo asset, original icon library. Logo is an approximation.

## Feedback record: source -> action -> element -> acceptance check

| # | Source | Action | Element | Acceptance check |
| --- | --- | --- | --- | --- |
| 1 | msg, crop 1 | Remove | Dot on selected nav item | No dot on Registration desk. Selected state is fill, bold, accent icon, aria-current. Count chip "2" on Registrations stays (crop 1 liked, not asked to remove). |
| 2 | msg, crop 2 | Keep | Escalations and Desk help top buttons | Same look as crop 2: outlined, icon plus label. |
| 3 | msg, crop 3 | Keep | Record donation | Same look as crop 3, stays in the page header. |
| 4 | msg, crop 4 | Remove | "Filter: All Attendees" | No filter control. No replacement control. Search Records and Clear remain. |
| 5 | msg, crop 5 | Add | In progress "View all" | Visible "View all" control that opens the full in-progress list with Close, Esc and backdrop exit. Nothing is cleared, hidden or deleted. |
| 6 | msg, crop 6 | Change | Selected row | Same 1px-style border on all four sides in the accent color, no thick left bar, checked checkbox as the non-color cue. |
| 7 | msg, crop 6 | Remove | "Query: Test" chip | No chip next to the results heading. |
| 8 | msg | Remove | "Synced to event sheet" | No sync text anywhere. |
| 9 | msg | Change | Profile | One profile box, bottom left of the sidebar. Top right box removed. |
| 10 | msg | Remove | Checked In and In Queue counters | Page header has title, subtitle, Record donation only. |
| 11 | msg | Remove | Name / Phone, Scan QR, Family ID tabs | Find a person has heading plus the four fields. No tabs. |
| 12 | msg | Remove | Printer and badge stock panel | Right column holds In progress only. |
| 13 | msg (phase rule) | Remove | Check-in items | Quick Check-In row button removed. "In Queue" status badge on Sami removed (same idea as the removed In Queue counter). |

## Reconciled with the whole screen (my decisions, flagged to the user)

- The results heading said "7 people found" and "Select All 7" but the screen shows 4 people. I did not invent 3 people. Heading now follows the real rows: "4 people found", "Select all 4".
- The sticky bar covered the last row in the screenshot. The bar is now in the page flow at the end and sticks to the bottom while scrolling, so no row stays hidden.
- Bar hint "Confirm attending party before proceeding to badge print" pointed at a step that is out of phase. Reworded to "Confirm the attending party before continuing."
- Phase unclear, kept and flagged: "Fast Track" button on Rahim's row, "Badge printed" tag on Aliyah's row.
- "View all" chosen over a "clear" control. Clearing could mean hide, abandon the draft or delete. That effect is Unknown, so no clear control was built.
- Placeholder text is a little darker than the screenshot to reach 4.5:1 contrast.
- Below 900px the sidebar becomes a top strip (brand, scrolling nav), and the profile moves to the page end. This is a responsive adaptation, not a new feature.

## Not built (notes for later phases)

- Check-in: Quick Check-In, queue, checked-in counts, scan QR, family ID lookup, printer and badge stock.
- A "clear in-progress item" action. Needs a decision on what clear does.
- Real sort options, real search on phone and email. The sample data has no phone or email.

## Verification (stage: implementation, rendered in headless Chromium)

See reply.md. check-ui.mjs is not in the supplied pack folder, so it was Not verified. Keyboard behavior was exercised with scripted tests only where noted.
