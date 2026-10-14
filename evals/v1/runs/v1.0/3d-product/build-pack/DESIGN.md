---
version: "1.0.0"
name: "Model 01 site (working name)"
description: "Dark showroom system for a one-page speaker site with a 3D viewer. All values Proposed (delegated); they live in design/tokens.css and the tables below until the owner approves them."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: Establish, new site. Source: ShipRight starter D (immersive dark), with a brass accent taken from the speaker's trim and Manrope as the one family.
Status: **Proposed (delegated)**, owner said "you decide" on 2026-10-13. T1 shows it on `/design` for a quick OK.
Direction: a quiet dark stage where the lit speaker is the brightest thing on the page and the Buy button is the only accent.
No brand values are known. When the owner supplies a brand system or Figma file, it replaces this one.

## Colors

Values in `design/tokens.css`. Contrast measured against `--color-bg` unless noted.

| Role | Token | Value | Use | Contrast |
| --- | --- | --- | --- | --- |
| Page | `--color-bg` | #0D0E11 | Page and 3D stage | |
| Surface | `--color-surface` | #16181D | Buy section band | |
| Raised | `--color-raised` | #1E2127 | Preview note, view control track | |
| Border | `--color-border` | #2A2E35 | Dividers, spec rows | |
| Field border | `--color-field-border` | #6B7280 | Control outlines | 4.0:1 |
| Text | `--color-text` | #F3F4F6 | All body text | 17.8:1 |
| Muted | `--color-muted` | #A6ACB6 | Secondary facts, "To confirm" | 8.3:1; 6.9:1 on raised |
| Accent | `--color-accent` | #DDB878 | Primary button fill, focus ring, pressed view | 10.3:1 |
| On accent | `--color-on-accent` | #15130D | Text on the primary button | 9.9:1 on accent |
| Danger | `--color-danger` | #F2A193 | Viewer load failure text | 9.1:1 |

The accent is used on the primary button, the focus ring and the pressed view button. Nowhere else.

## Typography

One family: Manrope (Google Fonts, self-hosted by `next/font`). Weights 400, 500, 600, 700.

| Role | Desktop | Phone | Weight | Line height |
| --- | --- | --- | --- | --- |
| Display (h1) | 80 | 44 | 600 | 1.02, tracking -0.02em |
| Section title (h2) | 36 | 28 | 600 | 1.1 |
| Lead | 20 | 18 | 400 | 1.5 |
| Body | 17 | 16 | 400 | 1.55 |
| Meta, controls | 14 | 14 | 500 | 1.4 |

Five sizes per page. Numbers in specs use `tabular-nums`.

## Layout

- Container max 1200, gutter 32 desktop and 20 phone. 12-column grid.
- Section spacing 104 desktop, 64 phone.
- Hero is full bleed: canvas edge to edge, height `--hero-height`. Copy sits left over a calm area; the model sits right.
- Below 760 px wide, copy stacks above the viewer and side-by-side columns become one column.

## Elevation & Depth

Borders and tone steps separate things at rest. `--shadow-float` only on floating layers; this release has none.

## Shapes

8 for buttons and controls, 12 for the buy band, 4 for the preview note. Decided once.

## Components

| Component | Library equivalent | States |
| --- | --- | --- |
| Primary button (link styled as button) | `<a>` with button classes | default, hover, focus, pressed |
| Text link | `<a>` | default, hover underline, focus |
| View control (Front, Side, Back, Top) | Toggle group, Radix `ToggleGroup` type single | default, hover, focus, pressed (accent text plus a 2px accent underline, and `aria-pressed`) |
| Reset view | Secondary button (outline) | default, hover, focus |
| Viewer canvas | R3F `Canvas` | still, loading, ready, unavailable, failed |
| Status line | `<p role="status">` | empty, loading, failed |
| Spec list | `<dl>` | value, To confirm (preview only) |

## Icons

- **Icon set:** none in this release. Every control has a text label.
- **Emoji:** not used.
- **Status:** text, never color alone.

## Placement

- **Primary action:** one filled "Buy" per view. Hero: left under the sentence. Buy section: under the facts.
- **Button order:** filled primary, then a text link to its right. Never two filled buttons side by side.
- **Navigation:** top bar, name left, section links right. Same on every page.
- **Viewer controls:** directly under the model, left aligned with the container; hint text at the right end.
- **Status messages:** in the viewer bar, next to the controls they describe.
- **Phone primary action:** full-width button in the hero copy, above the viewer.
- **Sticky elements:** none.

## Do's and Don'ts

- Do keep the brass accent for Buy, focus and the pressed view only.
- Do keep text contrast at WCAG AA. Show a focus ring on every interactive element, including the canvas.
- Don't add gradients, glows, glass panels or a second accent.
- Don't put text over the model. Copy sits on the calm side of the stage.
- Don't show real-looking numbers that the owner has not confirmed.

## Motion

| Motion | Purpose | Trigger | Duration, easing | Reduced motion |
| --- | --- | --- | --- | --- |
| Turn-in (signature) | Orientation: shows the model is 3D | First time the model is ready | 1.6 s, ease-out | Skipped |
| View change | Continuity | View button, Reset view | `--dur-view` 700 ms, `--ease-move` | Instant |
| Arrow key turn | Feedback | Arrow keys on focused canvas | 250 ms, ease-out | Instant |
| Canvas fade-in | Continuity from still to 3D | Model ready | `--dur-fade` 400 ms | Instant |
| Section entrance | Orientation | Section enters view once | 600 ms, 75 ms stagger, rise 20 px | None, content shown |
| Smooth scroll (Lenis) | Comfort on a marketing page | Wheel | Default | Off |

Hover effects only under `(hover: hover) and (pointer: fine)`. Animate `transform` and `opacity` only, never `transition: all`.

## Imagery and density

No photos or logos exist. The product is shown by the 3D model and SVG stills drawn from it. The placeholder model is built in code and labeled as a placeholder in preview builds.

## Accessibility

Focus ring: 2px `--color-focus`, 2px offset (inset 4 on the canvas). Targets at least 44 by 44. Canvas semantics and keys: S1.2 in `docs/shipright/04-frontend-spec.md`.

## ShipRight status

| Token or rule | Value | Evidence | Decision | Source |
| --- | --- | --- | --- | --- |
| All tokens above | design/tokens.css | Contrast computed, not yet measured on the built page | Proposed (delegated) | Owner "you decide", 2026-10-13 |
| Brand name, logo, brand font | Unknown | | Unresolved | Owner |
