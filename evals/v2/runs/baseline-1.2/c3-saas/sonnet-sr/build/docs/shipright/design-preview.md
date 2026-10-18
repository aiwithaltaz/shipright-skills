# Design preview: three directions for S1 Schedule

No owner was available to choose, and the owner said "you decide". Direction 1 is picked and marked **Proposed, awaiting owner approval**. Change it before ticket T1 and every later ticket follows the new tokens. Values below are Proposed. Contrast was measured for the pairs named.

The product is an app, so the directions are about the work surface (type, color, space, motion), not a marketing story.

## Direction 1: Field ledger (picked)

Calm dense business tool, starter A with a subject accent.
- **Type:** Inter in the build (system sans in the preview, because the preview loads no fonts). 13 to 14 body, 20 page title, tabular figures for hours and money. Weights 400, 500, 600.
- **Color:** light gray page, white board, deep field green accent `#1C6A45` (white text 6.57:1). Amber and red only for warnings and errors, always with text and an icon.
- **Space:** 4 px scale. Job items 8 px padding, board cells 8 px, 24 px page gutter.
- **Motion:** 120 ms hover tint, 240 ms drawer slide, nothing else. Reduced motion removes the slide.
- **Why it fits:** an owner scans 20 to 40 jobs at a time. Plain surfaces keep job text the loudest thing on the page. It reads as a tool, not a brand.
- **Risk:** green is the first color anyone picks for landscaping. Mitigation: it is used on one action and small selected states only.

## Direction 2: Dispatch board

Higher density, closer to a dispatcher's wall.
- **Type:** Geist, with Geist Mono for times and hours. 12 to 13 everywhere, 32 px rows.
- **Color:** slate surfaces, a dark ink top bar, slate-blue accent `#2F4F9E`. Crew rows get a faint tone step each.
- **Space:** 4 and 8 px, almost no padding. Two more jobs per screen than direction 1.
- **Motion:** none beyond focus.
- **Fits when:** the office has 4 or more crews and lives in this screen all day.
- **Rejected because:** most 3 to 20 worker companies have 1 to 4 crews and the owner also checks it from a phone. Small type hurts there, and a dark top bar adds weight with no job.

## Direction 3: Truck cab

Large, high contrast, phone first.
- **Type:** system font, 17 body, 28 titles, 48 px targets.
- **Color:** white, near-black text, a strong amber action `#F2B705` with dark text.
- **Space:** 20 px padding, one column on every screen, day list only.
- **Motion:** 240 ms sheet.
- **Fits when:** crew leads use it in the truck. Crew login is out of release 1 (D1).
- **Rejected because:** it gives up the week overview, which is the main reason to schedule on a board. Revisit when a crew day page exists (open question 3).

## Decision

Direction 1. Reason: it matches the job (compare crews across a week), keeps density without small type, and survives the phone via the day view. Status: **Proposed, awaiting owner approval.** The owner's own brand or Figma file would replace it.
