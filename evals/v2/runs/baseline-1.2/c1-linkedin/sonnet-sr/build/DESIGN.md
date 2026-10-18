# DESIGN.md: Postdesk (working name)

Source: ShipRight starter A "Calm dense" (SaaS and work tools). Status of every value below: **Proposed (delegated)**, awaiting owner approval. No user design system or Figma file was supplied; if one arrives it replaces this file. Token values live in [design/tokens.css](design/tokens.css) and nowhere else. Contrast pairs were measured on 2026-10-16.

## Direction, one sentence

A quiet daily work tool where the week's posts are the page, text-first, one accent, no decoration.

## Foundations

| Foundation | Value |
| --- | --- |
| Color roles | bg, surface, sunken, text, muted, subtle, border, field-border, accent, accent-tint, success, warning, danger (each status has a tinted background). Accent is a deep teal chosen to avoid LinkedIn's own blue. |
| Contrast, measured | text on bg 16.7:1; muted on bg 6.5:1; subtle on surface 4.8:1; accent on white 6.4:1; success 4.8:1, warning 5.4:1, danger 4.8:1 on their tints; field border on white 3.4:1 |
| Type | System stack with Inter first if installed. Sizes 12, 13, 14, 16, 20, 24. Weights 400, 500, 600. Tabular figures wherever numbers or times are compared. |
| Space | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12, between groups 16 to 32. |
| Radius | 4 tags, 6 controls, 8 panels, 12 dialogs |
| Elevation | Borders at rest. One shadow, only on dialogs and menus. |
| Motion | 120 ms hover and press, 180 ms menus, 240 ms drawer and dialog. Reduced motion: no movement, opacity only. |
| Density | Row 40. Controls 36, 32 compact, 44 on touch. |
| Imagery | None. No logo is supplied, so the name is text. |

## Components

Button (filled primary, secondary outline, text), Text input, Textarea with character count, Date input, Time input, Segmented control, Table-like list of rows, Badge (status, always text plus shape), Alert, Dialog (native `dialog`), Drawer on phone, Skeleton rows, Empty state, Link.

Canonical names follow the pack vocabulary. Badge means status only, never decoration.

## Status badges

Text plus a distinct shape so color is never alone: Draft (hollow circle), Scheduled (clock), Published (check), Failed (cross). Draft is neutral gray, Scheduled is accent, Published is success, Failed is danger.

## Icons

One family, line style, 1.5px stroke, 16px. Proposed: inline SVG drawn to that spec in the build, no icon package. Icon-only controls: close, back, menu only, each with an accessible name. Delete, Reconnect and Disconnect always have text labels.

## Placement (decided once, used everywhere, F2)

- Page header: title left, one filled primary on the right ("New post").
- Forms and the editor: actions bottom, primary on the right, secondary to its left, text-style destructive action at the far left, apart.
- Dialogs: Cancel left, action right, action named with its object ("Delete draft").
- Status messages: Alert above the content it affects. Short confirmations are a single line near the changed row. Errors that need action stay until fixed.
- Navigation: top bar, same order on every screen: Queue, Settings. Current page uses `aria-current`. No notification dots.
- Account: one place only, the right end of the top bar.
- Phone: primary action sits in a bottom bar and never covers content or focus.
- Never two filled buttons side by side.
