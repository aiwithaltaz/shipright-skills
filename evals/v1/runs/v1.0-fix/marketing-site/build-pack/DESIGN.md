---
version: "1.0.0"
name: "SocialGhost beta site"
description: "Light editorial system for a one-page beta recruitment site. All values are Proposed (delegated, D3) and live in design/tokens.css until the owner OKs /design in T1. The YAML token maps stay empty until then."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: Establish, delegated ("You decide", 2026-10-13). Editorial marketing starter, accent changed to a deep record red for video. Direction: calm, readable pages where the beta deal and the Apply button are the loudest things.
No brand values were supplied; owner brand files replace these. Values live only in `design/tokens.css`.

## Colors

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Page | `--color-bg` | #FBFBFA | Body background |
| Surface | `--color-surface` | #FFFFFF | Apply section, fields |
| Sunken | `--color-sunken` | #F1F1EE | Feedback panel |
| Text | `--color-text` | #141519 | All body text, in full ink |
| Muted | `--color-muted` | #55585F | Hints, notes, captions only |
| Border | `--color-border` | #E2E2DE | Section and list dividers |
| Field border | `--color-field-border` | #848B96 | Inputs, outline button (3.4:1) |
| Accent | `--color-accent` | #B42318 | Filled primary button, focus ring, illustration progress bar. Nothing else. |
| Danger | `--color-danger` on `--color-danger-bg` | #B42318 on #FCEBE7 | Field errors, form alert |
| Success | `--color-success` | #1B7A4B | Check icon on "Application received" |
| Media | `--color-media-*` | see tokens | Hero illustration only |

Measured: every text pair is 4.5:1 or better (values in tokens.css comments).
Accent and danger share a red. Rule: an error always carries the word "Error:" or an alert icon plus text. Red alone never means error. Recheck contrast after any color change.

## Typography

Instrument Sans, weights 400, 500, 600, 700. Five sizes per width:

| Token | Desktop | Phone (under 760) | Use |
| --- | --- | --- | --- |
| `--text-display` | 56/1.05, 700, -0.02em | 34 | H1 only |
| `--text-h2` | 32/1.15, 600 | 26 | Section headings, success heading |
| `--text-h3` | 20/1.3, 600 | 18 | Sub-headings, hero lead, FAQ questions, wordmark |
| `--text-body` | 18/1.55, 400 | 16 | Body, labels (600), buttons (600), inputs |
| `--text-small` | 15/1.55 | 14 | Hints, notes, captions, nav links |

Reading width: 34 to 40em for paragraphs.

## Layout

12-column grid, max width 1200, gutter 24 desktop and 20 phone. Section padding 96 desktop, 64 phone. Sections are separated by a 1px border, not by empty bands. Each section has its own composition (see 04-frontend-spec.md). Columns stack below 960; under 760 the phone sizes apply.

## Elevation & Depth

No shadows. Borders separate things at rest. Nothing floats in this release.

## Shapes

Radius 8 for buttons, fields and alerts. Radius 12 for the media frame, the feedback panel and the success panel.

## Components

| Name | Library equivalent | States |
| --- | --- | --- |
| Primary button | `<button>` / `<a>` | default, hover, focus, busy ("Sending application...", disabled) |
| Outline button | `<a>` | default, hover, focus. Header "Apply" only. |
| Text link | `<a>`, underlined, 600 | default, hover, focus |
| Fields and textarea | native inputs | default, focus, invalid (2px danger border plus error text) |
| Checkbox | native | unchecked, checked, focus, invalid |
| Form alert | `role="alert"` | hidden, shown |
| FAQ disclosure | `<details>` | closed, open, focus |
| Media frame | `<figure>`, inline SVG | one signature animation |

## Icons

- Inline SVG line icons, Lucide style, stroke 2 (2.25 for 16px status icons). Proposed.
- 20px next to body text, 16px next to small text. Gap `--space-3` in lists, `--space-2` in errors.
- No icon-only controls. No emoji. Status is text + icon + color, never one alone.

## Placement

- **Primary action side:** left, at the end of the content it acts on.
- **Button order:** primary first, then a text link. Never two filled buttons in one view.
- **Form actions:** after the last field, left on desktop, full width on phone.
- **Toasts and status messages:** none. Form status sits under the submit button; the form alert sits just above it.
- **Navigation:** top bar. Desktop: wordmark left; section links and an outline "Apply" right. Phone: wordmark and "Apply" only.
- **Mobile primary action:** full width, in the flow. No sticky bar.
- **Sticky elements:** none.

## Do's and Don'ts

- Do keep the filled accent style for "Apply for the beta" only.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glows, glass panels, pill badges or small uppercase labels above headings.
- Don't add testimonials, user counts, logos or results until the owner supplies real ones.
- Don't draw a fake product interface. The hero picture is an illustration and says so.

## Motion

One signature move: in the hero illustration, the dashed outline of a presenter fades to 14% opacity and rises 8px, once, after 700 ms, over `--dur-signature` with `--ease-out`. Purpose: explanation ("no one on camera"). The label "No one on camera" is visible from the start.
Reduced motion: the outline shows at 14% with no movement. FAQ icon turns 45 degrees in `--dur-menu`. Button color changes in `--dur-press`. No scroll animation, no smooth-scroll library.

## Imagery and density

No photos, logos or screenshots exist. The only picture is the code-drawn illustration with the caption "Illustration only, not a real SocialGhost video." Replace it with a real video still when the owner supplies one (O2).

## Accessibility

Rules live in docs/shipright/build-rules.md. Verified so far: contrast by calculation only.

## ShipRight status

| Token or rule | Value | Evidence status | Decision status | Source |
| --- | --- | --- | --- | --- |
| All tokens | design/tokens.css | Calculated contrast | Proposed (delegated) | D3, 2026-10-13 |
| Accent shares red with danger | Text label rule above | Not verified with users | Proposed | D3 |
