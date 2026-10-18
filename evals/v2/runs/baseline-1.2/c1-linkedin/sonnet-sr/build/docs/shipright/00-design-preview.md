# Design preview: three directions

Status: **Proposed, awaiting owner approval.** No human was available to choose, so one is picked below with a reason. A visual specimen is in [design-preview.html](design-preview.html). The job: a person reviews and approves a week of posts quickly, every day, without noise.

| | A. Calm ledger | B. Plain paper | C. Timetable |
| --- | --- | --- | --- |
| Idea | Starter A, light, dense, text-first | Document feel, high contrast, a printed reading page | Time is the spine: a grid of days and hours |
| Type | Sans, 14 body, 600 for names, tabular times | Serif headings (Georgia stack), sans body 15, tabular times | Sans plus monospace for time cells, 13 body |
| Color | bg #F7F8FA, surface white, accent deep teal #0B6B5E | White, ink #111, accent burgundy #8A1C3B, underlines on links | Light gray, black rules, accent orange #B4410A |
| Spacing | Row 40, 8 px base, groups 16 to 32 | Roomy, row 56, reading column 66 characters | Tight, row 28, fixed hour columns |
| Shape | 6 px controls, 1 px borders | Square corners, 2 px rules | Square, heavy black rules |
| Motion | 120 ms hover, 240 ms drawer, reduced-motion safe | None except focus | None |
| Strength | Fast scanning of many rows, familiar | Best for writing and reading one post | Best for seeing gaps in the week |
| Weakness | Looks like many work tools | Fewer rows per screen, slower to scan | Weak on long post text, harder on a phone |

## Pick: A. Calm ledger

Reason: the daily task is scanning a week of posts and approving them, so row density and clear status matter more than a distinctive skin. It also reflows to a phone with the least change (rows become two-line items). B suits the editor but wastes space on the list. C shows gaps in the week well, but the product's job is approval, not calendar planning, and wide grids fit badly at 390 px.

What to carry over from the others, as separate small decisions: B's reading width for the editor text area (about 66 characters), and C's fixed-width time column so times line up. Neither changes the system.

Avoid, as listed in the starter notes: cream background with serif and terracotta, near-black with one acid accent, purple to pink gradients, identical rounded cards. None are used.

Ticket T1 builds the chosen system as a `/design` page for a quick OK before any screen.
