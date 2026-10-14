---
version: "1.1.0"
name: "ShipRight site preview"
description: "Three proposed directions. None is approved. YAML stays empty until a direction is approved."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

**Status: Proposed. 14 October 2026.** No Figma file and no brand color were supplied. Altaz's taste was selected for this pass: careful spacing, dense but calm, no fluff. It does not approve a direction.

The first single system (IBM Plex Sans, starter blue) is superseded. It is not one of these three.

Borrow structure only: one accent, measured contrast, section rhythm from the editorial starter, and the dark field idea from the immersive starter. Do not borrow another product's identity.

## Shared rules

- One filled action per view: the Install link in the hero. Copy controls are text buttons.
- Square corners. No shadow. Borders or a full-bleed image, not cards.
- 8-point space: 4, 8, 12, 16, 24, 32, 48, then 64 or 80 between sections.
- Below 760px, columns stack. Tracks use `minmax(0, 1fr)`.
- Focus: 2px outline, 2px offset, in `--color-focus`.
- Commands use `ui-monospace` inside `code`.
- Scores use tabular figures.
- Text starts visible. Motion is transform only, inside `gsap.matchMedia` for `prefers-reduced-motion: no-preference`.

## Split

Files: `design/tokens-split.css`, `src/styles/split.css`, `/preview/split`.

| Role | Value |
| --- | --- |
| Type | Instrument Serif for the headline. Instrument Sans for the rest. Display 44/34, title 20, body 17/16, meta 14 |
| Color | bg #F3F5F7, text #12161C, muted #4A5160, border #D5DAE1, accent #0E3A6B, on accent #FFFFFF |
| Space | Section 64 desktop, 48 phone. The comparison sits in the right column and meets the right edge |
| Motion | A hairline draws down the middle of the hero image (explanation, 700ms). Gallery rows rise 16px once. Reduced motion: the line is already there, rows do not rise |

## Night

Files: `design/tokens-night.css`, `src/styles/night.css`, `/preview/night`.

| Role | Value |
| --- | --- |
| Type | Manrope only. Display 64/40, title 20, body 17/16, meta 15. Tracking -0.035em on the headline |
| Color | bg #111214, surface #191B1F, text #F3F4F6, muted #B7BDC8, border #32363E, accent #E6E1D4, on accent #16140F |
| Space | Section 80 desktop, 48 phone. Headline column max 880. The hero image is full width |
| Motion | The hero image scales from 1.04 to 1 as it scrolls (continuity). Reduced motion: scale stays 1 |

## Press

Files: `design/tokens-press.css`, `src/styles/press.css`, `/preview/press`.

| Role | Value |
| --- | --- |
| Type | Source Serif 4 for headlines. IBM Plex Sans for text. Display 64/36, title 22, body 16, meta 14 |
| Color | bg #FFFFFF, text #111111, muted #3E3E3E, rules #D4D4D4, accent #111111, on accent #FFFFFF |
| Space | Section 48 desktop, 32 phone. Page max 1040. Desktop and phone comparisons sit under the nameplate |
| Motion | A 2px reading rule tracks scroll position (orientation). Reduced motion: the rule is full width and still |

## Placement

- Back control: "All directions", top left, on every direction page.
- Primary action: left of the text column on Split and Night. End of the nameplate on Press.
- Copy: end of the row on Split, under the command on Night and on a phone, last column on Press.

## Do not

- Do not add a gradient, a glow, an eyebrow label, a card around a section, or a second filled button.
- Do not invent a logo, a price, a quote, or a customer count.
- Do not hide text until a scroll animation runs.
