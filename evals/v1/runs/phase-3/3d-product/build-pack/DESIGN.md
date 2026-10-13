---
version: "0.1"
name: "Speaker product site"
description: "Design system for a one-page product site for a wireless speaker with a 3D viewer. All values are Proposed (delegated) until the owner OKs the /design preview."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

One dark showcase page. The 3D speaker is the main element; text sits beside it on a calm area.
Mode: Establish (new site, no brand supplied). Authority: owner said "you decide" on 2026-10-13 (decision D3).
Every value below is **Proposed (delegated)**. It moves into the YAML block above only after the owner OKs `/design` in ticket T1.
The build source is `design/tokens.css`. Token names here match that file.

## System source and reuse

Starter: "Immersive dark" (product and showcase sites). Changed: accent is brass, to echo a metal trim on the speaker; type is Instrument Sans.
Brand name, logo, colors and fonts of the real product: Unknown, owner to supply. A supplied brand replaces these values.

## Colors

| Role | Token | Value | Measured contrast |
| --- | --- | --- | --- |
| Page | `--color-bg` | #0D0E11 | |
| Band (buy section) | `--color-surface` | #16181D | |
| Raised (preview notice) | `--color-raised` | #1E2127 | |
| Text | `--color-text` | #F3F4F6 | 17.5:1 on bg, 16.1:1 on surface |
| Secondary text | `--color-muted` | #A6ACB6 | 8.5:1 on bg, 7.8:1 on surface |
| Divider | `--color-border` | #2A2E35 | decorative only |
| Control boundary | `--color-control-border` | #6B7280 | 4.0:1 on bg, 3.7:1 on surface |
| Accent (primary button, focus, placeholder mark) | `--color-accent` | #D9A75A | 8.9:1 on bg |
| Text on accent | `--color-on-accent` | #15130D | 8.5:1 on accent |
| Selected view button | `--color-selected-bg` / `--color-on-selected` | #F3F4F6 / #0D0E11 | 17.5:1 |

The accent is used only on the primary button, focus rings and the placeholder underline in previews.

## Typography

One family: Instrument Sans (Google Fonts), weights 400, 500, 600. Five sizes per width.

| Role | Desktop | Phone (under 860) | Weight / line height |
| --- | --- | --- | --- |
| Display (h1) | 64 | 40 | 600 / 1.05, tracking -0.02em |
| Section title (h2) | 28 | 24 | 600 / 1.2 |
| Body | 18 | 17 | 400 / 1.55 |
| UI (buttons, links, spec values) | 16 | 16 | 500 |
| Meta (caption, notes) | 14 | 14 | 400 |

Reading text stays within 62 characters per line.

## Layout

Container 1200 max, gutter 24 (20 under 860). Section spacing 96 desktop, 64 phone.
Hero: text column 460 max on the left; the 3D stage runs from the text column to the right edge of the window, no frame. Under 860: text first, then the stage at full width.
Space scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12; between groups 16 to 32.
No sticky header, so nothing covers focused controls.

## Elevation & Depth

Borders and tone steps only. No shadows in this release: nothing floats. `--shadow-float` is reserved for a future menu or dialog.

## Shapes

`--radius-control` 8 for buttons and view buttons. Sections and the stage have no radius and no frame.

## Components

| Component | Library equivalent | States |
| --- | --- | --- |
| Button, primary (filled accent, 48 tall) | native `<a>` or `<button>` | default, hover (text underline), focus, disabled with reason |
| Text link | native `<a>` | default, hover, focus, `aria-current` not used (one page) |
| Segmented view buttons | native `<button aria-pressed>` group | default, pressed (inverted fill plus weight 600), focus |
| Speaker viewer | React Three Fiber canvas in a focusable `role="application"` wrapper | loading, ready, unavailable, failed |
| Spec list | native `<dl>` | filled rows only |
| Status line | `<p role="status">` | empty, message |

One filled button per view. A text link is the only secondary action next to it.

## Icons

- **Icon set:** none used in this release. If one is needed later: Lucide, line, Proposed.
- **Icon-only allowed:** none in this release.
- **Never icon-only:** destructive and uncommon actions.
- **Emoji:** not used.
- **Status:** text, never color alone.

## Placement

- **Primary action side:** left, after the text it belongs to.
- **Button order:** primary then text link, never two filled buttons side by side.
- **Status messages:** directly under the control that caused them.
- **Navigation:** top bar, product name left, section links right. Same on every width.
- **Mobile primary action:** in the flow of the hero, above the 3D stage, so it is reachable without passing the viewer.
- **Sticky elements:** none.

## Do's and Don'ts

- Do keep the filled accent style for the main action in each view, not for decoration.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glows, glass panels or extra accent colors.
- Don't show a fact (name, price, spec) that the owner did not supply.

## Motion

| Move | Purpose | Timing | Reduced motion |
| --- | --- | --- | --- |
| Intro turn, once when the model is ready | Shows the speaker is 3D and can be turned | `--duration-intro`, ease-enter | Skipped; model starts at the rest view |
| View button jump | Shows the path between views | `--duration-view`, ease-move | Instant jump |
| Canvas fade in over the still image | Avoids a flash | `--duration-fade` | Instant swap |
| Drag damping | Feels physical | damping factor 0.08 | No damping |

All moves stop as soon as the visitor drags, presses a key or picks another view. No scroll reveals, no auto-rotate loop.

## Imagery and density

The only imagery is the speaker: the 3D model and one still front image. Both come from the owner. Until then a stand-in model and drawing are used and labeled in previews.

## Accessibility

Contrast measured above. Focus ring 2px accent, 2px offset. Targets 44 or more. Viewer keyboard and announcements are specified in docs/shipright/04-frontend-spec.md (S2). Verified: nothing yet at runtime.
