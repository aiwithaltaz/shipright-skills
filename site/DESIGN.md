---
version: "1.0.0"
name: "ShipRight site"
description: "Proposed editorial system for the public ShipRight site."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

Proposed (delegated). The owner asked for this site and named Altaz's taste. No Figma file and no brand color were supplied.

**Source:** Editorial marketing starter in the ShipRight pack, adapted. Accent and paper colors stay on the starter values because nothing else was supplied. Type changes from the starter's open choice to IBM Plex Sans, one family.

**Borrow:** the starter's structure (type scale, spacing, one accent, section rhythm). Do not borrow another product's identity.

## Colors

Measured as flat pairs. Status never uses color alone.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Background | `--color-bg` | #FBFBFA | Page |
| Surface | `--color-surface` | #FFFFFF | Fields, images |
| Sunken | `--color-sunken` | #F1F1EE | Empty slots, closing band, disabled fill |
| Text | `--color-text` | #141519 | Body. 17.6:1 on background |
| Muted | `--color-muted` | #55585F | Notes. 6.9:1 on background |
| Border | `--color-border` | #E2E2DE | Row rules |
| Field border | `--color-field-border` | #848B96 | Inputs. 3.3:1 on background. Not for text |
| Accent | `--color-accent` | #1F4FD8 | The one filled action. White text 6.6:1 |
| Accent hover | `--color-accent-hover` | #183FA8 | Fine-pointer hover. White text 9.1:1 |
| On accent | `--color-on-accent` | #FFFFFF | Label on the filled button |
| Field tint | `--color-field-tint` | #E9EEFB | Reserved. Not used on these screens |
| Danger | `--color-danger` | #C1341F | Error text. 5.4:1 on background |
| Danger background | `--color-danger-bg` | #FCEBE7 | Error field fill. Danger text 4.8:1 on it |

Danger colors come from the calm-dense starter, which measured that pair. The editorial starter does not define errors.

## Typography

IBM Plex Sans. Weights 400, 500, 600. Latin files only.

| Role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Display | 56 desktop, 34 phone | 500 | 1.05, tracking -0.02em |
| Title | 24 | 500 | 1.25 |
| Body | 17 desktop, 16 phone | 400 | 1.45 |
| Meta | 14 | 400 | 1.45 |

Scores use the display size with tabular figures and no tight tracking. Commands use the monospace UI stack inside `code`, so they do not add a third text family.

## Layout

Page max 1120. Gutter 24 desktop, 20 phone. Reading width 66ch. One column below 760. Section padding 80 desktop, 56 phone. The design preview uses the same page width. Hero padding is 40 desktop and 32 phone so the pack table starts on the first screen.

## Elevation and shapes

Borders separate rows. No shadow on these screens. The starter float shadow is `0 8px 24px rgba(16,24,40,.12)`, unused until a menu or dialog exists. Control radius 8. Focus is a 2px accent outline with a 2px offset.

## Components

- **Button:** filled primary, height 44. One per view.
- **Button secondary:** white surface, field border. Copy uses this.
- **Link:** accent and underline in prose. Header and footer links are text color. Footer links are underlined. Current page is underlined.
- **Text input:** visible label, height 44, body size.
- **Table:** file list and mode list. Same pattern for a name plus one line.
- **Image:** full column, 1px border, no radius, no shadow. Phone comparisons cap at 640 wide.

## Icons

No icon set. No icon-only controls. Emoji are not used. The favicon is a flat accent square because no logo was supplied. Replace it when a logo exists.

## Placement

- **Primary action:** the filled button sits at the start of the action row, then the text link. Header has no filled button.
- **Button order:** one filled, then text. Never two filled buttons side by side.
- **Copy:** the button sits at the end of the install row on desktop and under the command on a phone. Status appears under the button and does not move focus.
- **Empty slots:** the IVC frames sit where the images will go.

## Motion

| Move | Purpose | Duration | Reduced motion |
| --- | --- | --- | --- |
| Rule under the home headline | Orientation | 480 ms ease-out, once | Rule is already drawn |
| Section rise, 16 px | Orientation | 480 ms ease-out, once, transform only | No rise |

Text opacity stays at 1. Hover color changes only for a fine pointer. Press feedback is 120 ms. Numbers do not count up.

## Do's and Don'ts

- Do keep install commands in `src/data/install.js`.
- Do not add a gradient, a glow, an eyebrow label, or a card around a section.
- Do not invent a logo, a price, a quote, or a customer count.
- Do not hide text until a scroll animation runs.
