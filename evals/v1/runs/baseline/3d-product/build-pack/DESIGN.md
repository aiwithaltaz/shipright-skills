---
version: "0.1"
name: "Model 01 working system"
description: "Delegated stand-in system for the phase 1 speaker home page. Replace when the owner supplies the brand."
colors:
  bg: "#0e0f11"
  surface: "#17191c"
  line: "#2a2d31"
  text: "#f2f1ee"
  text-muted: "#a3a6ab"
  accent: "#c9a86a"
  accent-hover: "#d6b77c"
  on-accent: "#15120c"
  focus: "#c9a86a"
  placeholder-border: "#60646b"
typography:
  display: { family: "Instrument Serif", weight: 400 }
  body: { family: "Inter", weights: [400, 500, 600] }
  sizes: { xs: "13px", sm: "14px", md: "16px", lg: "20px", h2: "clamp(36px, 5vw, 56px)", h1: "clamp(56px, 9vw, 112px)" }
  line-height: { body: 1.6, h2: 1.05, h1: 0.95 }
rounded:
  sm: "8px"
  md: "16px"
  pill: "999px"
spacing:
  scale: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px", "96px", "128px"]
  container: "1200px"
  gutter: "clamp(16px, 4vw, 48px)"
components:
  - skip-link
  - prototype-note
  - site-header
  - button-primary
  - button-secondary
  - text-link
  - viewer-3d
  - spec-list
  - placeholder-token
  - status-message
  - site-footer
---

# Design system

## Overview

Screen: H-01 Home (one page). Mode: **Establish**, under delegated choice Q3 (2026-10-13). There is no existing brand to preserve.
This is a stand-in system. It is not the owner's brand. Replace colors, fonts and the name when the brand arrives (D3).
Direction: a quiet dark page that lets the 3D speaker be the brightest, most detailed thing on screen.

## System source and reuse

Canonical source: this file. Prototype implementation: `index.html` (visual reference only).
No component library. Use native HTML elements. three.js renders only the viewer canvas.

## Colors

| Role | Value | Use | Measured contrast |
| --- | --- | --- | --- |
| bg | #0e0f11 | Page background | |
| surface | #17191c | Status message background | |
| line | #2a2d31 | Dividers, viewer border, secondary button border | Decorative only |
| text | #f2f1ee | Headings, body, values | About 17:1 on bg |
| text-muted | #a3a6ab | Labels, help text, nav links | About 7.9:1 on bg |
| accent | #c9a86a | Primary button fill, focus ring, model accent band | About 8.5:1 on bg (focus ring and button boundary) |
| on-accent | #15120c | Text on primary button | About 8.3:1 on accent (9.7:1 on hover) |
| placeholder-border | #60646b | Dashed border around unconfirmed values | About 3.2:1 on bg |

Contrast values are calculated from the hex pairs, not measured in a browser. Re-measure after the brand swap.
The viewer background is a soft radial fade from #23262b to #101113, inside the viewer only.

## Typography

| Role | Family | Size | Weight | Line height |
| --- | --- | --- | --- | --- |
| h1 product name | Instrument Serif | 56 to 112 px (clamp) | 400 | 0.95 |
| h2 section | Instrument Serif | 36 to 56 px (clamp) | 400 | 1.05 |
| Lede, spec value, price | Inter | 20 px (16 px under 860 px for lede) | 400 | 1.5 to 1.6 |
| Body | Inter | 16 px | 400 | 1.6 |
| Labels, help, buttons | Inter | 14 px | 400 or 500 | 1.6 |
| Eyebrow, prototype note | Inter | 13 px, eyebrow uppercase, 0.14em tracking | 400 | 1.6 |

Fallbacks: Georgia for display, system-ui for body.

## Layout

- Container 1200 px max, gutter 16 to 48 px.
- Hero and sections use a 5:7 two-column grid on wide screens: text left, content right. Under 860 px they stack to one column in DOM order.
- Hero reading order: eyebrow, name, one line, "See the specs" link, then the viewer and its controls.
- Viewer height: 420 to 720 px (74vh) on wide screens; 340 to 520 px (58vh) on narrow screens, so the page can always be scrolled outside it.
- Sections are separated by a top border and 96 px padding (64 px narrow). No cards.
- Spec rows: label and value side by side on wide screens, stacked under 860 px. Values wrap.

## Elevation & Depth

No shadows on page UI. Borders only. The only depth is inside the 3D scene (lighting and a soft contact shadow under the speaker).

## Shapes

Buttons: pill (999 px). Viewer: 16 px. Placeholder tokens and status message: 8 px.

## Components

| Component | HTML | States |
| --- | --- | --- |
| Skip link | `a` to `#viewer` | Hidden until focused |
| Prototype note | `div role="note"` | Remove at launch (T10) |
| Site header | `header` + `nav aria-label="Main"` | Default |
| Primary button | `a` or `button`, accent fill | Default, hover, focus |
| Secondary button | `button`, transparent with line border | Default, hover, focus |
| Text link | `a`, underlined | Default, hover, focus |
| 3D viewer | `div tabindex="0" role="group" aria-roledescription="3D viewer"` with `canvas` | Loading, ready, unavailable, focus |
| Spec list | `dl` with rows | Value confirmed, value placeholder |
| Placeholder token | `span` with dashed border | Only while a fact is unconfirmed |
| Status message | `p role="status"` | Empty, message |
| Site footer | `footer` | Default |

## Icons

- **Icon set:** None in phase 1. No icons are needed.
- **Icon exceptions:** None.
- **Style / stroke / sizes / spacing:** Not applicable until an icon set is approved.
- **Icon-only allowed:** close, search, menu, more, back. None are used now.
- **Never icon-only:** destructive and uncommon actions. Turn and reset buttons have text.
- **Emoji:** Not used.
- **Status:** text + color, never color alone.

## Placement

- **Primary action side:** left, at the start of the content column, under the content it acts on. In the header, Buy sits at the right end of the nav.
- **Button order:** one filled button per area. The viewer controls are all secondary: Turn left, Turn right, Reset view.
- **Form actions:** Not applicable. No forms.
- **Dialog actions:** Not applicable. No dialogs.
- **Destructive actions:** None.
- **Search and filters:** None.
- **Toasts and status messages:** inline, directly under the control that caused them. No toasts.
- **Empty states:** Not applicable.
- **Navigation:** top bar, same on every width: wordmark left; "Specs" link and "Buy" button right.
- **Profile/account:** None.
- **Selection, focus, notifications:** focus ring only. No selection or notifications.
- **Mobile primary action:** the Buy section's full-width button, low on the page, plus Buy in the header.
- **Sticky elements:** None.

## Do's and Don'ts

- Do keep the filled accent style for the main action in each area, not for decoration.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glass effects or extra accent colors that are not listed here.
- Don't use sample names, logos or numbers that look real in shipped UI.
- Don't add icons from outside the icon set above, or icons on every heading.
- Don't add scroll-triggered reveals, parallax or auto-rotation loops.
- Don't let the viewer capture page scroll or zoom.

## Motion

| Motion | Purpose | Trigger | Timing | Interruption | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Button color change | Hover feedback | Pointer hover | 140 ms ease-out, color only | Instant | Same (no movement) |
| Turn and tilt | Show the new angle | Turn buttons, arrow keys | 420 ms ease-out cubic | A new request replaces the running one; dragging cancels it | Jump to the angle |
| Reset view | Return to the front three-quarter view | Reset button, Home key | 650 ms ease-out cubic | Same as turn | Jump |
| Drag inertia | Feel of a real object | Drag release | Damping factor 0.08 | Next drag | Kept: it follows the visitor's own movement |
| Settle turn (D6, **Proposed**) | Show the model can rotate | First render | 1.6 s, 40 degrees | Any drag or button | Off |
| Loading bar | Show 3D is loading | While loading | 1.2 s loop | Ends on ready | Static bar |

## Imagery and density

No photos or logos exist. The only product image is the 3D model. Phase 1 uses a code-built stand-in (D5), labeled on the page.
Fallback image: a simple front drawing (SVG) inside the viewer when 3D cannot run, with alt text "Front drawing of the speaker".
Density: low. One idea per section.

## Accessibility

Specified: AA contrast pairs above; 44 px minimum targets for buttons and nav links; visible focus ring (2 px accent, 3 to 4 px offset); keyboard rotation; non-drag button alternative; reduced-motion behavior; status messages with `role="status"`.
Verified: nothing yet. Rendered contrast, keyboard order and screen reader output need checks on the built page.

## Screen notes

H-01: the header has a filled Buy button and the Buy section has a filled "Buy on our store" button. They are in different areas and do different things (jump to section, open store).

## Reference properties

None supplied.

## ShipRight status

| Token or rule | Value / proposal / gap | Evidence status | Decision status | Source / owner |
| --- | --- | --- | --- | --- |
| All colors, fonts, sizes, radius, spacing | As above | Not observed: new stand-in | Approved (delegated) for phase 1 | Q3, 2026-10-13 |
| Product name | "Model 01" working name | Unknown real name | Approved as placeholder | Q3; owner supplies real name |
| Brand logo | None | Unknown | Unresolved | Owner |
| Settle turn on load | 1.6 s, 40 degrees | Not verified | Proposed (D6) | Assistant |
| Icon set | None | Not applicable | Approved (none needed) | Q2 scope |
