# DESIGN.md: Agent Desk (working name)

Status of every value: **Proposed (delegated)**, awaiting owner approval. The user supplied no design system or Figma file; if one arrives it replaces this file, not merges with it. Token values live in [design/tokens.css](design/tokens.css) once. Names below match that file.
Source: ShipRight starter A (calm dense), accent changed from blue to teal to fit a monitoring product. Nothing here is Observed or Approved.

## Direction

Calm light. Quiet chrome so the status column is the loudest thing on the page. Choice rationale: [design-preview.md](docs/shipright/design-preview.md).

## Color roles

Page `--color-bg`, table and drawer `--color-surface`, quiet fills `--color-sunken`, text `--color-text`, secondary text `--color-muted`, borders `--color-border`, field borders `--color-field-border`, action `--color-accent`.
Status roles each have a text color and a tint: success, warning, danger. Paused and Idle use muted text on sunken.
Measured: body text on page 16.7:1, muted on surface 6.9:1, white on accent 6.3:1, field border on surface 3.4:1, status text on its tint 4.8:1 or better.

## Status chips

Always icon plus text label plus tint. Color is never the only cue.

| Status | Icon (stroke, 16 px) | Colors | Needs attention |
| --- | --- | --- | --- |
| Running | play triangle | success on success-bg | no |
| Waiting for you | hand raised or user-clock | warning on warning-bg | yes |
| Failed | triangle with exclamation | danger on danger-bg | yes |
| Paused | two bars | muted on sunken | no |
| Idle | empty circle | muted on sunken | no |

## Type

Family `--font-sans`, a system stack. No web fonts: it loads at once and works offline. Switch point: if the owner wants Inter or Geist, add the font file locally and change one token.
Sizes: 12 caption, 13 table meta and muted second lines, 14 body and controls, 16 section titles and drawer title, 20 page title. Weights 400, 500, 600. Names and counts use 600. Tabular numbers on every count and time.

## Space, layout, radius, elevation

Scale 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12, between groups 16 to 32.
Top bar 48. Content max 1280, gutter 24 (16 below 760). No sidebar: there is one destination.
Radius: 4 chips, 6 controls, 8 table container, 12 drawer corner on desktop.
Borders separate things at rest. `--shadow-float` only on the drawer.

## Components

| Name | Library name | Notes |
| --- | --- | --- |
| Top bar | Header | Product name left, prototype note right. No account box in release 1. |
| Status filter | Segmented control (radio group) | Needs attention, Running, All. Selected shows a check icon plus fill and semibold. Below 760 the check is dropped for width; fill and semibold stay (documented responsive difference, F2). |
| Search input | Search input | Visible label "Search agents". |
| Team filter | Select | Visible label "Team". |
| Agents table | Table | Row 40 minimum, sticky header, text left, times right. |
| Status chip | Badge | Real status only. |
| Agent panel | Drawer (shadcn Sheet on Radix Dialog) | Side task over the list. One at a time. |
| Request block | Callout | Holds the request and its actions. |
| Message | Alert (stays) and status line with Undo | See Placement. |
| Empty, loading | Empty state, Skeleton | Per state coverage. |

## Icons

One family: line icons, 16 px, 1.75 stroke, round caps, `currentColor`. Proposed, hand-drawn inline SVG in the preview; in the build use one library such as Lucide. No icon-only controls in release 1. Close is the icon plus the word Close.

## Placement (F2: decided once)

- Page actions: none in release 1. Search and filters sit above the table, left.
- Row actions: none. The agent name is the one control that opens the panel.
- Drawer: Close at top right. Request actions inside the Request block, primary filled on the **left**, secondary outline next to it. Agent-level action (Pause or Resume agent) in the drawer footer, outline, left. One filled button per scope.
- Inline confirm replaces the request actions in place: the confirming action (red filled) on the left, Cancel next to it. The primary side is left everywhere (F2).
- Status messages: every action happens in the drawer, so its result appears in one status line inside the drawer, directly under the header, with Undo where real undo exists and Dismiss. It stays until dismissed, the next action, or Close. Errors that need action stay in an Alert near the work until fixed. List-level results (match counts) use a polite live region under the filters.
- Selected nav: not applicable, no nav.
- Notification dots: none. No notifications in release 1.

## Motion

| Motion | Purpose | Duration and easing | Reduced motion |
| --- | --- | --- | --- |
| Drawer enter | orientation | `--motion-sheet`, `--ease-enter`, 24 px slide and fade | fade only, 1 frame |
| Drawer exit | orientation | 140 ms, fade | instant |
| Control hover and press | feedback | `--motion-press` | none |
| Skeleton shimmer | loading | none, a static tone | static |

Data in the table never animates. No numbers count up.

## Gaps

Brand name, logo, real font and any company palette: Unknown, owner: you.
