---
version: "1.0.0"
name: "Model 01 site"
description: "Dark showroom system for a one-page speaker site with a 3D viewer. All values Proposed (delegated) until the owner OKs the /design preview from T1."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: Establish, for a new site. Authority: the owner delegated the look ("You decide"), decision D3 in `docs/shipright/01-prd.md`.
Source: ShipRight starter D (immersive dark), with the accent changed to a warm metal that matches the speaker's cap.
Direction in one sentence: a quiet dark room where the lit speaker is the brightest thing, and type stays calm beside it.
Every value lives in `design/tokens.css`. The YAML maps above stay empty until the owner approves the T1 preview; then copy the values in and mark them Approved.

## Colors (Proposed)

| Token | Value | Use | Measured contrast |
| --- | --- | --- | --- |
| `--color-bg` | #0D0E11 | Page | |
| `--color-surface` | #16181D | Buy band, detail art backgrounds | |
| `--color-raised` | #1E2127 | Pressed view button | |
| `--color-text` | #F3F4F6 | Headings, body | 17.5:1 on bg, 16.1:1 on surface |
| `--color-muted` | #A6ACB6 | Secondary notes, hints, "To confirm" | 8.5:1 on bg, 7.8:1 on surface |
| `--color-border` | #2A2E35 | Section and table rules (decorative) | |
| `--color-field-border` | #6B7280 | Outlined button borders | 4.0:1 on bg, 3.7:1 on surface |
| `--color-accent` | #D9B47A | The one filled button per view, focus ring | 9.9:1 on bg |
| `--color-accent-hover` | #E4C291 | Primary hover | |
| `--color-on-accent` | #17130C | Text on accent | 9.5:1 on accent, 11.0:1 on hover |
| `--color-error` | #FF9B8A | Viewer failure text, always with words | 9.5:1 on bg |

One accent. It appears on the primary Buy button and the focus ring only. The speaker's brass ring echoes it in the drawings and model.
Avoided on purpose: gradients on UI, glow, glass, a second accent.

## Typography (Proposed)

Family: Manrope (400, 500, 700). Five sizes per page.

| Token | Desktop | Phone (760 and under) | Use |
| --- | --- | --- | --- |
| `--text-display` | 84 (64 from 761 to 1100) | 44 | Product name, line height 1.02, tracking -0.02em |
| `--text-h2` | 40 | 28 | Section headings, line height 1.1 |
| `--text-lead` | 21 | 19 | Hero sentence, detail headings |
| `--text-body` | 17 | 16 | Body, buttons, table |
| `--text-meta` | 14 | 14 | Hints, status, sample note |

## Layout

- Container max 1200, margins 24 desktop and 20 phone. Section spacing 96 desktop, 64 phone.
- Spacing scale 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12, between groups 16 to 32.
- Hero: the 3D stage runs edge to edge with no frame; the model is centered on the right 58% of the container, text on the calm left. Order and phone behavior: S1 in `docs/shipright/04-frontend-spec.md`.
- Content columns stay near 60 to 75 characters.

## Elevation & Depth

Borders and tone steps separate things at rest. No shadows on the page in release 1. `--shadow-float` exists for menus and popovers only.

## Shapes

Radius 8 for buttons, 12 for detail art panels. No pill shapes.

## Components

| Component | Notes | States |
| --- | --- | --- |
| Primary button (filled link) | "Buy Model 01". One per view. 48 tall. | default, hover, focus, active |
| Secondary button (outlined) | Header Buy, view buttons, Reset view, Try again, Open 3D view. 44 tall. | default, hover, focus, pressed (`aria-pressed`) |
| Text link | "See the specifications", footer links | default, hover, focus |
| 3D stage | Canvas plus still image, see Motion | Still, Loading, Ready, Reduced, Unsupported, Error |
| Inline status | `role="status"` text beside the action it reports on | empty, message |
| Spec table | Native `<table>`, row headers, rules between rows | value, "To confirm" in muted |
| Detail figure | Image panel on surface, h3 and one sentence | default |


## Icons

- **Icon set:** none in release 1. Every control has a text label.
- **Emoji:** not used.
- **Status:** text plus color, never color alone.

## Placement

- **Primary action:** left in the hero action row, then a text link. In the buy band it sits right on desktop and full width on phones.
- **Button order:** filled primary first, then text link. Never two filled buttons side by side.
- **Buy:** the same label and the same destination everywhere (header, hero, buy band). F2.
- **Status messages:** directly under the action they report on. No toasts.
- **Viewer controls:** under the model, centered on it: hint, then Front, Side, Back, a divider, Reset view, then the status line.
- **Navigation:** top bar, not sticky. Details, Specs, Buy. On phones "Details" hides; the footer repeats it.
- **Sticky elements:** none.

## Do's and Don'ts

- Do keep the accent for the Buy button and the focus ring.
- Don't add gradients, glass, glow or blurred blobs to the UI. Shading inside product images is allowed.
- Don't put text over the model, or add eyebrow labels and pill badges.

## Motion

| Motion | Trigger | Purpose | Duration and easing | Interrupt | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Canvas fade-in | 3D ready | Continuity from still to 3D | 400 ms `--ease-out`, opacity | Not needed | Opacity only, kept |
| Signature turn: one full turn, settling at three-quarter view | 3D first ready | Show every side once | 2000 ms ease-out cubic | Any drag, key or button stops it where it is | Not played; 3D does not auto-load |
| View change and drag damping | View buttons, Reset view, drag release | Orientation | Damped, about 400 ms to settle | New input retargets from the current angle | Instant change |
| Button press | Press | Feedback | 120 ms `--ease-out`, scale .98 | | No scale |

Hover effects only under `(hover: hover) and (pointer: fine)`. No scroll animation, no smooth scroll, no loops.

## Imagery and density

Only the speaker: the 3D model and stills of it. No stock or lifestyle images. Placeholder drawings until T7.

## Accessibility

Rules live in `docs/shipright/build-rules.md`. Viewer specifics live in the S1 spec.

## ShipRight status

| Token or rule | Value | Evidence status | Decision status | Source |
| --- | --- | --- | --- | --- |
| Color, type, space, radius, motion | As above and in `design/tokens.css` | Contrast measured from hex values | Proposed (delegated) | Starter D, D3 |
| Accent | #D9B47A | Measured | Proposed (delegated) | Adapted to the speaker's metal cap |
| Brand name, logo, fonts | Unknown | | Unresolved | Owner |
