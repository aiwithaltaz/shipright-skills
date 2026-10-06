# Layout and hierarchy

Start with the task and content, then choose a layout. Keep existing approved patterns unless the user requests a change.

## Decide before styling

Write a short structure from top to bottom. For each region, name its job and current-phase source.
Order content by the user's next decision: identify the task, enter or inspect information, then act.
A page title, short explanation, actions and results are possible parts, not a required template.
Give each action a scope: page, form, selected items or row. Make the current next action clear within its scope.
Several contextual actions can coexist. Do not force every page into one global button.

## Layout contract

| Property | Define |
| --- | --- |
| Reading order | DOM and visual order follow the task, including when columns stack. |
| Main/supporting regions | Main work gets usable width; supporting content earns its space. |
| Sizing | Use existing containers, grid and tokens. State what grows, wraps or scrolls. |
| Alignment | Share edges for labels, fields, headings and action groups. Avoid almost-aligned columns. |
| Density | Compare with realistic content; spacing within a group is smaller than between groups. |
| Responsive behavior | State which region moves first and why. Keep the primary task reachable. |
| Overflow | Long names/labels wrap or truncate with an accessible full value. Avoid hiding necessary data. |
| Sticky content | Use only when useful; reserve space so rows, errors and keyboard focus stay visible. |

## Component choice

Use a form for input, a list for scanning, a table for comparing fields and master-detail for repeated inspection.
Use a wizard only for real dependencies or length. Use monitoring widgets only for an approved monitoring job.
Prefer existing paired fields when their relationship helps; do not blindly convert every form to a single column.
On narrow screens, stack related fields in task order. Tables may scroll or transform when their meaning survives.
Avoid redundant card nesting, filler panels and large empty regions that push results away from their controls.

## Type and emphasis

Use system type tokens and meaningful headings. Establish clear title, body and supporting levels without arbitrary size quotas.
Use weight, spacing and alignment before more colors, outlines or shadows.
Keep important names, errors and actions readable. Supporting content can be quieter without becoming low contrast.
Do not infer exact fonts, sizes or colors from screenshots when the source is uncertain.

## Crops and full screens

Preserve the liked properties of a crop, such as button shape or spacing. Reconcile them with the full screen.
Explicit removals override controls visible in the reference. Do not copy incidental chips, counters or tabs.
For selected rows, use the approved selection treatment. Keep it clear and clean, without a heavy accent bar unless the design system says so.
Keep selection distinct from keyboard focus and validation.

Before handoff, inspect relevant desktop and narrow layouts with 0, 1 and many records and difficult content.
Without a rendered artifact, mark visual fit Not verified; a written spacing scale is not visual evidence.
