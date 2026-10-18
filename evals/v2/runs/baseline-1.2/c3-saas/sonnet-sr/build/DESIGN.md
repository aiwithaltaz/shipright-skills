# DESIGN.md

Source: Proposed (delegated, "you decide"). Starter A (calm dense) adapted to landscaping: accent changed to field green, type changed to Inter. No owner design system or Figma file was supplied; if one arrives it wins. Awaiting owner approval. Token values live in `design/tokens.css` and use the names below.

## Tokens (see design/tokens.css)

| Group | Names and values |
| --- | --- |
| Color | `--color-bg` #F7F8FA, `--color-surface` #FFFFFF, `--color-sunken` #F1F2F4, `--color-text` #16181D, `--color-muted` #545B66, `--color-subtle` #6B7280 (bg and surface only), `--color-border` #E2E5EA, `--color-field-border` #848B96, `--color-accent` #1C6A45, `--color-accent-tint` #E6F1EB, `--color-warning` #9A4F00 on `--color-warning-bg` #FDF0E1, `--color-danger` #C1341F on `--color-danger-bg` #FCEBE7 |
| Type | Inter (system sans in the preview). `--text-caption` 12, `--text-meta` 13, `--text-body` 14, `--text-section` 16, `--text-page` 20, `--text-figure` 24. Weights 400, 500, 600. Line height 1.45 text, 1.25 headings. Tabular figures on hours, dates and money. |
| Space | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 as `--space-1` to `--space-16`. Inside a group 4 to 12, between groups 16 to 32. |
| Radius | `--radius-sm` 4 tags, `--radius-md` 6 controls and job items, `--radius-lg` 8 board and panels, `--radius-xl` 12 dialogs and the drawer. |
| Elevation | Borders at rest. `--shadow-float` only on the drawer, dialogs and toast. |
| Motion | `--motion-fast` 120, `--motion-menu` 180, `--motion-sheet` 240, `--ease-out`. Reduced motion: no slide, opacity only. |
| Controls | `--control-h-compact` 32, `--control-h` 36, `--control-h-touch` 44 (phone width and day chips). |

Contrast measured: text on bg 16.7:1, muted on surface 6.85:1, subtle on surface 4.83:1, accent on white 6.57:1, warning on its tint 5.36:1, danger on its tint 4.81:1, field border on white 3.43:1. `--color-subtle` fails on sunken (4.32:1), so it is not used there.

## Components (shadcn name = canonical name)

Button (filled, secondary, text, danger text), Segmented control (S2 tabs), Select, Text input, Textarea, Date input, Table (board and invoices), Modal = Dialog, Drawer = Sheet (S3), Alert (load failure, form error summary), Toast (one place), Badge (real status only: Done, Not invoiced, Sent, Overdue, Paid), Skeleton, Empty state.

## States

Hover is a tint. Focus is a 2 px accent outline with 2 px offset on every interactive element, also on selected items. Selected is a tint plus a check or text, never color alone. Status always has text and an icon.

## Icons

One family, line style, 1.5 px stroke, 16 px: chevron-left, chevron-right, plus, check, alert, x. Proposed: Lucide in the build. Icon-only allowed only for close, search, menu, more and back. Every control here carries a visible text label.

## Placement (decided once, F2)

- Page primary action: top right of the page header, one filled button per view ("New job"). On phone width it moves to a bottom bar.
- Dialogs and forms: Cancel then the filled action, both on the right. Delete sits left, as danger text.
- Row and job actions never depend on hover.
- Toast: bottom center, above the phone bottom bar. Errors that need action stay as an Alert in context.
- Navigation: top bar, Schedule then Invoices, same on every screen. Company name sits on the right. One account home only.
- Warning (amber) means "needs your action". Danger (red) means failure or destructive. Accent green means "here" or "primary".

## Motion

Drawer slides in 240 ms. Hover tint 120 ms. No other motion. `prefers-reduced-motion` removes the slide.
