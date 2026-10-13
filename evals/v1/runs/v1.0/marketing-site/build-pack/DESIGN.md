---
version: "1.0.0"
name: "SocialGhost site"
description: "Design system for trysocialghost.com, a one-page beta application site."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system: SocialGhost site

## Overview

Mode: Establish, for a new site with no supplied brand. Values were delegated by the owner on 2026-10-13 ("you decide") and are **Proposed (delegated)** until the owner OKs the `/design` page built in T1.
The YAML maps above stay empty until that OK; then copy the values from `design/tokens.css`.
Direction: a calm editorial page in dark ink on off-white, one indigo accent for the main action, and one dark video frame built in code as the only picture.
Starting point: an editorial marketing starter, with the accent and font changed for this subject.

## Colors

All values live in `design/tokens.css`. Measured contrast:

| Role | Token | Value | Contrast |
| --- | --- | --- | --- |
| Page | `--color-bg` | #FBFBFA | |
| Surface (form panel) | `--color-surface` | #FFFFFF | |
| Sunken band | `--color-sunken` | #F1F1EE | |
| Text | `--color-text` | #141519 | 17.6:1 on bg |
| Muted text | `--color-muted` | #55585F | 6.9:1 on bg, 6.3:1 on sunken |
| Border | `--color-border` | #E2E2DE | decorative divider only |
| Field border | `--color-field-border` | #85888F | 3.55:1 on white |
| Accent (primary button, links, focus) | `--color-accent` | #4338CA | 7.9:1 with white text, 7.6:1 on bg |
| Danger (field errors) | `--color-danger` | #B42318 | 6.6:1 on white |
| Video frame | `--frame-*` | #121320 base, #E8E6F5 and #A6A9C9 text | 15:1 and 8:1 |

The accent appears on the primary action, text links and the focus ring. Nowhere else. No gradients, glows or glass.

## Typography

Geist for everything, Geist Mono only for the timecode in the video frame. Five sizes per page.

| Role | Desktop | Phone (under 760px) | Weight / line height |
| --- | --- | --- | --- |
| Display (H1) | 64 | 38 | 600 / 1.05, tracking -0.02em |
| Section heading (H2) | 36 | 28 | 600 / 1.15 |
| Lead and H3 | 20 | 18 | 500 / 1.4 |
| Body, labels, buttons | 17 | 16 | 400 or 500 / 1.55 |
| Meta, help text, captions | 14 | 14 | 400 / 1.45 |

Field text is never under 16.

## Layout

Container max 1200, gutter 24 desktop and 20 phone. Reading text max 66 characters.
Spacing scale 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Section spacing 96 desktop, 64 phone.
Inside a group 4 to 12, between groups 16 to 32. Below 760px every multi-column block stacks in reading order.

## Elevation and shapes

Borders separate at rest. Only the sticky header gets a 1px bottom border after scrolling. No shadows in this release; `--shadow-float` is reserved for floating layers.
Radius: 4 small, 8 controls and buttons, 12 the video frame and the form panel. Decided once.

## Components

| Component | Notes |
| --- | --- |
| Button, primary | Filled accent, height 48, radius 8, label 17/500. One filled button per view. Hover: accent-hover. Busy: label "Sending...", disabled, `aria-busy` |
| Button, secondary | 1px text-color border, transparent. Used for "Apply" in the header |
| Text link | Accent, underline offset 3px |
| Text field | Label above, 48 tall, 1px field border, radius 8, 16px text. Error: 2px danger border plus error text with an icon |
| Radio group | Native radios in a `fieldset` with a `legend`, 24px targets inside 48px rows |
| Checkbox | Native, 24px, label to the right, whole row clickable |
| Disclosure | Native `details` and `summary` for FAQ |
| Numbered steps | Ordered list, number in a 32px circle outline |
| Video frame | Code-built illustration, see Motion. Always captioned as an illustration |

## Icons

- **Icon set:** none needed except a check mark and an alert mark, drawn as inline SVG, 1.75 stroke, 16 or 20 px. Proposed.
- **Never icon-only:** every control has visible text.
- **Emoji:** not used.
- **Status:** text plus icon plus color, never color alone.

## Placement

- **Primary action:** left-aligned under its content on desktop; full width on phone.
- **Button order:** primary first, then one text link. Never two filled buttons side by side.
- **Form actions:** at the end of the form, not sticky.
- **Errors:** under the field; a form-level error under the submit button.
- **Status messages:** the success panel replaces the form in place. No toasts.
- **Navigation:** top bar: wordmark left; "How it works", "FAQ" and secondary "Apply" right. Phone: wordmark and "Apply" only.
- **Sticky elements:** the header is sticky, 64 tall. Anchored sections use `scroll-margin-top: 80px` so focus and headings are never hidden.

## Do's and Don'ts

- Do keep a visible focus ring everywhere: 2px accent outline, 2px offset (white inside the video frame).
- Don't add gradients, glass, extra accents, pill badges or uppercase labels above headings.
- Don't show quotes, logos, counts or ratings. None are supplied.
- Don't present the video frame as real SocialGhost output.

## Motion

| Motion | Purpose | Spec | Reduced motion |
| --- | --- | --- | --- |
| Caption play in video frame | Explanation: what a faceless video is | Plays once on load, 9 s: scene layers drift 12px with `--ease-move`, three caption lines appear one by one, progress bar fills. Ends on the last frame. One player button reads Pause while playing, Play when paused, Replay at the end | Last frame shown, no movement, player button hidden |
| Section entrance | Orientation | Heading, text, then media, `--stagger` 80 ms, rise 20px plus opacity, `--duration-section`, once | Content shown at once |
| Button hover and press | Feedback | Background color, `--duration-press` | Same, color only |

Content is visible if scripts fail. No smooth-scroll library, no pinned sections.

## Imagery

No photos or logos exist. The only visual is the video frame, built in HTML and SVG, captioned "Illustration of a faceless video, made for this page. Not SocialGhost output." Real sample videos replace it only when the owner supplies them (PRD O8).

## Accessibility

Rules live in `docs/shipright/build-rules.md` (Interaction and accessibility).
