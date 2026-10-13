---
version: "0.6.2"
name: "SocialGhost beta site"
description: "Light editorial marketing system for one recruitment page. All values are Proposed (delegated) and live in design/tokens.css until the owner approves the /design preview."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

One marketing page whose job is to get serious beta testers to apply (S1), plus S2 Privacy and S3 Not found.
Mode: Establish (new site, no brand assets supplied). Authority: the owner delegated the look ("You decide", Q3).
Source of values: `design/tokens.css`. Values move into the YAML above only after the owner approves `/design`.

Direction: big clear type on an off-white page, one ink-indigo accent for actions, and one drawn dark video frame as the only image.

## Colors

Proposed (delegated). Measured contrast is in `design/tokens.css` comments.

| Role | Token | Use |
| --- | --- | --- |
| Page | `--color-bg` | Page background |
| Surface | `--color-surface` | Form panel, fields |
| Sunken | `--color-sunken` | Alternate section band (How the beta works, FAQ) |
| Text | `--color-text` | All body text and headings |
| Muted | `--color-muted` | Help text and captions only |
| Border | `--color-border` | Dividers between list items |
| Field border | `--color-field-border` | Input, textarea, radio and checkbox outlines |
| Accent | `--color-accent` | Filled button, links, focus ring, selected radio. Nowhere else. |
| Accent tint | `--color-accent-tint` | Step number discs in How the beta works |
| Danger, Success | `--color-danger*`, `--color-success*` | Form error and sent states, always with text |
| Stage | `--color-stage*`, `--color-on-stage*` | The hero video frame only |

No gradients, glows, glass or blur. Not YouTube red, and no YouTube logo or player chrome copied.

## Typography

Instrument Sans only. Five sizes per page: display 64 (38 phone), h2 36 (28), h3 20 (18), body 18 (16), small 15 (14).
Weights: 400 body, 500 labels and buttons, 600 headings. Display line height 1.05, tracking -0.02em. Body line height 1.55, measure 66ch.

## Layout

Container 1200 max, gutter 24 (20 on phone). 12-column grid on desktop; one column under 900px.
Section padding `--space-section`: 96 desktop, 64 phone. Inside a group 4 to 12; between groups 24 to 32.
Each section has its own composition: hero split, horizontal steps, two text columns, Q and A grid, copy beside form.

## Elevation and shapes

Borders separate things at rest. No shadows: nothing floats in this release.
Radius 8 for buttons and fields, 12 for the hero frame and the form panel. Decided once.

## Components

| Name | Equivalent | States |
| --- | --- | --- |
| Button, primary | Native `<a>` or `<button>`, filled accent, 48 tall | default, hover, focus, busy ("Sending..."), disabled with reason |
| Button, secondary | Outlined accent, 48 tall (header Apply link only) | default, hover, focus |
| Text link | Accent, underlined | default, hover, focus, visited same color |
| Text field, Email field, URL field, Textarea | Native inputs, 48 tall, label above, help below | pristine, focus, invalid with message, disabled while sending |
| Radio group | Native radios in a `fieldset` with `legend` | unselected, selected (dot plus bold label), focus, invalid |
| Checkbox | Native checkbox | unchecked, checked, focus, invalid |
| Alert | Box with icon and text, `role="alert"` for errors, `role="status"` otherwise | danger, success, neutral |
| Steps list | `<ol>` with numbered discs | static |

## Icons

- **Icon set:** Lucide, outline (Proposed). Used only in Alerts (circle-alert, circle-check) and the hero play glyph.
- **Stroke weight:** 2. **Sizes:** 20 beside body text.
- **Icon and label spacing:** 8.
- **Icon-only allowed:** none on this site.
- **Emoji:** not used.
- **Status:** text plus icon plus color, never color alone.

## Placement

- **Primary action:** "Apply for the beta" in the hero; "Send application" at the end of the form, left aligned with the fields.
- **Header:** wordmark left; "How it works", "Who it's for" and "FAQ" links; then the secondary "Apply" button on the right. Not sticky. Links hide under 760px.
- **Button order:** one filled button per view. Never two filled buttons side by side.
- **Form messages:** error list at the top of the form; field errors under each field; the sent message replaces the form in the same place.
- **Mobile primary action:** hero button full width under the sentence.

## Do's and Don'ts

- Do keep the accent for actions and links only, and a 2px focus ring on every interactive element.
- Don't add gradients, glass effects, glow shadows or a second accent.
- Don't add pill badges or small uppercase labels above headings.
- Don't show numbers, quotes, logos or results that the owner has not supplied.

## Motion

One signature move on S1: in the hero frame, a dashed presenter outline fades out, the ghost fades in and the playhead moves to about a third of the track. 2.4 s total, once, on load. Uses `--ease-in-out`. Hover and press: color change in 120 ms.
Reduced motion: the final frame shows at once. No scroll reveals, no parallax, no loops.

## Imagery and density

No photos or logo files exist. The hero frame is inline SVG drawn with stage tokens, captioned "A faceless video: no presenter on camera." Replace it with a real screen recording when the owner supplies one (D7).
The wordmark is the text "SocialGhost" in 600 weight. A logo is Unknown.

## Accessibility

Specified: native controls, visible labels, help and errors tied with `aria-describedby`, error summary focused after a failed submit, `role="status"` for sending and sent, 48px targets, reflow at 320px, 200% text zoom, reduced motion. Not verified until built.

## ShipRight status

| Token or rule | Value | Evidence | Decision | Source |
| --- | --- | --- | --- | --- |
| All tokens | `design/tokens.css` | Proposed | Proposed (delegated) | Q3, 2026-10-13 |
| Brand logo, colors, fonts | Unknown | Unknown | Unresolved | Owner |
| Icon set | Lucide outline | Proposed | Proposed (delegated) | Assistant |
