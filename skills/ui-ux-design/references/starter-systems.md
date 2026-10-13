# Starter systems

Load for a new app with no design system or Figma file. The user's own system always wins.
Pick one starter by product type, mark it Proposed, and show it for a quick OK before screens. Change the accent and type to fit the subject; keep the structure.
Every pair below was measured: text 4.5:1 or better, field borders 3:1 or better. Recheck after any color change.

## Shared structure

- **Token layers:** primitive values, then semantic roles (`--color-text`, `--space-4`), then component tokens only when a component needs them (`--button-height`). Components use semantic tokens, never raw values.
- **Spacing scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12; between groups 16 to 32; between page sections 40 to 64 in apps.
- **Radius:** 4 small (tags), 6 controls, 8 panels and cards, 12 dialogs and sheets. Pick one per role and keep it.
- **Elevation:** borders separate things at rest. Shadows only on what floats: menus, popovers, dialogs, sheets. `0 8px 24px rgba(16,24,40,.12)`.
- **Motion:** 120 ms for press and hover, 180 ms for menus and popovers, 240 ms for sheets and dialogs. Ease-out `cubic-bezier(.23,1,.32,1)` to enter, ease-in-out for movement on screen. Reduced motion: opacity only.
- **Focus:** 2px outline in the accent color, 2px offset, on every interactive element.
- **Numbers:** `font-variant-numeric: tabular-nums` wherever numbers are compared.

## A. Calm dense: SaaS, dashboards, admin, internal tools

| Role | Value |
| --- | --- |
| Type | Inter (or Geist). 12 caption, 13 table and meta, 14 body and controls, 16 section title, 20 page title, 24 key figure. Weights 400, 500, 600. Line height 1.45 text, 1.25 headings. |
| Color | bg #F7F8FA, surface #FFFFFF, sunken #F1F2F4, text #16181D, muted #545B66, subtle #6B7280, border #E2E5EA, field border #848B96, accent #2E5BDB (white text on it). |
| Status | success #1B7A4B on #E7F5EE, warning #9A4F00 on #FDF0E1, danger #C1341F on #FCEBE7. Always with a text label. |
| Controls | Height 32 compact, 36 default, 44 on touch screens. Padding 12 horizontal. |
| Layout | Sidebar 232 to 248 wide, or a top bar for under five destinations. Content max 1280, gutter 24 desktop and 16 phone. Page header: title left, one primary action right. |
| Tables | Row height 40 (36 compact). Cell padding 12. Text left, numbers right, tabular. Sticky header. Row hover is a tint, not a shadow. |

## B. Mobile native: phone apps and phone-first flows

| Role | Value |
| --- | --- |
| Type | System font stack (`-apple-system, "SF Pro Text", Roboto, "Segoe UI", sans-serif`). 13 caption, 15 secondary, 17 body and fields, 20 section, 28 screen title. Field text never under 16 so browsers do not zoom. |
| Color | bg #FFFFFF, sunken #F3F4F6, text #121417, muted #5A616B, border #E3E6EA, field border #868D97, accent #0F7B5F (white text on it), danger #C1341F on #FCEBE7. |
| Controls | Touch targets 48, fields 48 to 52 tall, radius 10, primary button full width in a bottom bar. |
| Layout | Side padding 20. One column. Safe-area insets on top and bottom bars. Back at top left; the primary action at the bottom, within thumb reach. |

## C. Editorial marketing: product and launch sites

| Role | Value |
| --- | --- |
| Type | One family, or one display face plus one text face. Text 17 to 18 on desktop, 16 on phone, line length 60 to 72 characters. Display 48 to 72 desktop, 34 to 40 phone, tracking -0.02em, line height 1.05. Five sizes on a page at most. |
| Color | bg #FBFBFA, surface #FFFFFF, sunken #F1F1EE, text #141519, muted #55585F, border #E2E2DE, accent #1F4FD8, field tint #E9EEFB. One accent, used on the action and at most one other thing. |
| Layout | 12-column grid, max 1200, margins 24 desktop and 20 phone. Section spacing 80 to 112 desktop, 56 to 72 phone. Not more: empty bands read as unfinished. |
| Buttons | One filled primary per view, plus a text link. Height 44 to 48, radius 8 or fully square, decided once. |

## D. Immersive dark: 3D product and showcase sites

| Role | Value |
| --- | --- |
| Type | Text 16 to 18, display 56 to 88 desktop, 36 to 44 phone. One family plus an optional display face. |
| Color | bg #0D0E11, surface #16181D, raised #1E2127, text #F3F4F6, muted #A6ACB6, border #2A2E35, field border #6B7280, accent #E9C46A with dark text #15130D. |
| Layout | The 3D canvas runs edge to edge in its section, never inside a bordered card. Text sits beside or over it on a calm area, never over busy geometry. |
| 3D | Rules and budgets in motion.md. A static image fallback is always present. |

## Pick by subject, not habit

Change the accent to something from the subject (its brand, material or place) and recheck contrast.
Do not default to the same font every time. Good free pairs: Inter; Geist; Manrope; Instrument Sans with Instrument Serif for display; IBM Plex Sans; Source Serif 4 for long reading.
Avoid the current generated-look clusters unless the brand asks for them: cream background with a serif and terracotta accent; near-black with one acid-green accent; purple-to-pink gradients; identical rounded cards with soft gray shadows.
