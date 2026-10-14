---
version: "1.0.0"
name: "SocialGhost beta site"
description: "Light editorial marketing system for a one-page beta application site. All values are Proposed (delegated), so none are in this YAML. Values live in design/tokens.css."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Job: one page that explains the beta terms and gets a qualified visitor to apply. Mode: Establish (new site, no brand file supplied). Authority: the owner said "you decide", so every value is **Proposed (delegated)**. Show `/design` (ticket T1) for a quick OK before building screens. A brand file or Figma file from the owner replaces this system.

No logo exists. The wordmark is the text "SocialGhost" in the page font. Do not draw a ghost mark.

## Colors

Source: `design/tokens.css`. Contrast measured on the exact pairs.

| Role | Token | Value | Use | Contrast |
| --- | --- | --- | --- | --- |
| Page | `--color-bg` | #FBFBFA | Page background | text on it 17.6:1 |
| Surface | `--color-surface` | #FFFFFF | Panels, form, fields | muted on it 7.1:1 |
| Sunken | `--color-sunken` | #F1F1EE | Apply band, hover tint, bar track | muted on it 6.3:1 |
| Text | `--color-text` | #141519 | All body text | |
| Muted | `--color-muted` | #55585F | Notes, hints. Never for key facts | 6.9:1 on page |
| Border | `--color-border` | #E2E2DE | Hairlines between rows. Decorative only | |
| Field border | `--color-field-border` | #767A82 | Inputs, checkbox, bar outline | 4.3:1 on white, 3.8:1 on sunken |
| Accent | `--color-accent` | #0A6B66 | Primary button, focus ring, step numbers, "+" in FAQ | white on it 6.4:1 |
| Accent strong | `--color-accent-strong` | #0B5A56 | Button hover | white on it 8.0:1 |
| Accent tint | `--color-accent-tint` | #E3F0EE | Feedback panel | text on it 15.6:1 |
| Danger | `--color-danger` | #B3261E | Field errors, failure status | 6.5:1 on white |

One accent. Used on the primary action, focus ring, step numbers and FAQ marker only. No gradients, glows, glass or blur. Errors always carry text, never color alone.

## Typography

One family: **Instrument Sans** (400, 500, 600, 700). Five sizes.

| Role | Token | Desktop | Phone | Weight |
| --- | --- | --- | --- | --- |
| Display (h1) | `--text-display` | 56 | 30 | 700, line height 1.05, tracking -0.02em |
| Section title (h2) | `--text-h2` | 36 | 26 | 700, line height 1.12 |
| Subtitle (h3) | `--text-h3` | 20 | 20 | 600 |
| Body | `--text-body` | 18 | 16 | 400, line height 1.55 |
| Small | `--text-small` | 14 | 14 | 400 to 600 |

Line length 62 characters at most for paragraphs. Form field text is 16 so phones do not zoom. Numbers in the step list use tabular figures.

## Layout

12-column grid on desktop, one column below 761px. Max width 1200, gutter 24 desktop and 20 phone. Grid tracks use `minmax(0, 1fr)`. Section gap 96 desktop and 64 phone (padding 48 and 32 each side). The apply band uses 80 and 48. No full-screen empty bands. Each section has its own composition. Hairline rules separate sections.

Space scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

## Elevation & Depth

Flat. Borders and tone steps group things. No shadows, because nothing floats.

## Shapes

Radius 8 for buttons, fields and panels. Decided once.

## Components

| Name | Library equivalent | States |
| --- | --- | --- |
| Button (primary) | shadcn Button, default | default, hover (pointer only), focus, pressed, disabled, busy |
| Text link | Anchor | default, hover, focus |
| Panel | plain div with border | none |
| Text field, Textarea | shadcn Input, Textarea | default, focus, invalid, disabled |
| Checkbox | native checkbox | default, focus, invalid |
| Accordion item | native `details` and `summary` | closed, open, focus |
| Status line | `role="status"` paragraph | empty, busy, error |

Height: button and fields 48. Targets at least 44 by 44. One filled button per area. No second filled button beside it.

## Icons

- **Icon set:** none. The page needs no icons.
- **Emoji:** not used.
- **Status:** text always. No icon-only controls.

## Placement

- **Primary action side:** left, at the start of the form actions row and the hero actions row.
- **Button order:** filled primary, then text link. Never two filled buttons side by side.
- **Form actions:** at the end of the form, not sticky. Status line sits beside the button on desktop and below it on phone.
- **Navigation:** top bar, text links, "Apply" always last.
- **Toasts:** none. Status appears next to the form button.
- **Sticky elements:** none.

## Do's and Don'ts

- Do keep the filled accent for the Apply action only.
- Do keep text at full ink at 16 or larger. Muted is for notes.
- Don't add a pill badge or a small uppercase label above a heading.
- Don't use icon cards, testimonials, logos or counters. None are supplied.
- Don't invent product screenshots. Use the labeled illustration until a real one is supplied.

## Motion

Purpose: explanation. One move: on load the "Feedback due" part of the terms bar fills from 30% to 100% in 900 ms, `--ease-out`, `transform: scaleX` only. Labels are visible from the first frame. Button press 120 ms. Reduced motion: no animation, the bar shows full. Smooth scrolling off under reduced motion. No other motion.

## Imagery and density

One drawn illustration, flat colors, in `#what`, with a caption that says it is not a screenshot. Replace it when a real screenshot or demo exists (Q-6). Density: calm. Real text in every section.

## Accessibility

Native elements, visible labels, real headings, skip link, visible 2px focus ring with 2px offset, text errors tied to fields with `aria-describedby`, `role="status"` for form status, reflow at 320px, reduced motion. Specified here. Not yet verified in a build.

## Screen notes

None.

## ShipRight status

| Token or rule | Value or gap | Evidence | Decision | Source |
| --- | --- | --- | --- | --- |
| All colors, sizes, spacing | `design/tokens.css` | Contrast measured | Proposed (delegated) | Starter C, adapted |
| Accent teal | #0A6B66 | Measured | Proposed (delegated) | Chosen for the subject, not a brand value |
| Brand fonts, logo, colors | Unknown | Unknown | Unresolved | Owner |
