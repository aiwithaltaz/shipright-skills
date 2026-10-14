# Layout and hierarchy

Start with the task and the content, then choose a layout. Keep existing approved patterns unless the user asks for a change.

## Decide before styling

Write the screen top to bottom. For each region, name its job and its current-phase source.
Order content by the user's next decision: what this is, what needs attention, then the action.
Give each action a scope: page, form, selection or row. One primary action per scope; one filled button per view.

## Dense but calm

The goal is a lot of useful information with nothing shouting.

- **Show the data, not containers.** Use a table or list for records, not a card per record. Cards are only for separate, comparable items.
- **Hierarchy by weight and position, not size.** Three text sizes carry most screens: title, body, meta. Bold for names and key figures; muted color for secondary facts.
- **Group with space, then lines.** Space inside a group is smaller than between groups. Use a 1px border or a tone step only where space alone fails.
- **Secondary facts sit next to their main item**, on a second line in muted text, not in a separate panel.
- **Status sits with the record** as a short text badge with an icon or shape, not as a separate summary widget.
- **No filler regions:** no welcome banner, no summary cards that repeat the table, no chart without a decision it supports, no activity feed without a job.
- **Tight, aligned edges.** Labels, fields, headings and action groups share left edges. Numbers align right with tabular figures.
- **Empty space is a choice, not a default.** Content columns stay near 60 to 75 characters for reading; data screens use the width.

## Layout contract

| Property | Define |
| --- | --- |
| Reading order | DOM and visual order follow the task, including when columns stack. |
| Main and supporting regions | Main work gets usable width; supporting content earns its space. |
| Sizing | Use the system's containers, grid and tokens. Say what grows, wraps or scrolls. |
| Alignment | Shared edges for labels, fields, headings and actions. No almost-aligned columns. |
| Density | Compare with realistic content: long names, 0, 1 and many rows. |
| Responsive behavior | Which region moves first and why. The primary task stays reachable. |
| Overflow | Long values wrap or truncate with an accessible full value. Never hide required data. |
| Sticky content | Only when useful; reserve space so rows, errors and focus stay visible. |

## Component choice

Form for input, list for scanning, table for comparing fields, master-detail for repeated inspection.
Use a wizard only for real dependencies or length. Use monitoring widgets only for an approved monitoring job.
On narrow screens, stack related fields in task order. Tables may scroll inside their container or become stacked rows when meaning survives.

## Type and emphasis

Use system type tokens and real headings. Weight, spacing and alignment come before more colors, outlines or shadows.
Keep names, errors and actions readable. Quiet supporting text still meets contrast.
Do not guess exact fonts, sizes or colors from a screenshot.

## Crops and full screens

Keep the liked properties of a crop, such as button shape or spacing, and reconcile them with the full screen.
Explicit removals override controls visible in a reference. Do not copy incidental chips, counters or tabs.
For selected rows, use the approved selection treatment. Keep it clear and clean, without a heavy accent bar unless the design system says so.
Keep selection distinct from keyboard focus and validation.

## Previews

- A preview opens in the normal, populated state. Loading, empty and error states appear behind a labeled state switcher or in a separate states section, never as failure text on first view.
- Values that compare across rows (meters, amounts, dates) get fixed-width slots so they line up.
- Below about 760px, side-by-side text columns stack full width; nothing keeps a narrow desktop column.
- Every multi-column grid collapses to one column below about 760px, or shrinks its gap to fit. A 12-column grid with 48px gaps needs 528px of gaps alone, wider than a phone. Grid tracks use `minmax(0, 1fr)`; flex children that hold text get `min-width: 0`.
- Controls stay inside the page container at every width.

## Look before handoff

Render the screen at 1280 and 390 wide with 0, 1 and many records and difficult content.
If you can run Node, run `node <pack>/scripts/check-ui.mjs <page> --root <site folder>`. Fix every FAIL; fix or defend in one sentence every WARN.
Then open both screenshots and fix the biggest visible problem, up to three rounds. A written spacing scale is not visual evidence.
