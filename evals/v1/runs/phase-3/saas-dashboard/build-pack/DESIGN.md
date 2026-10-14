---
version: "0.1"
name: "Client projects"
description: "Internal tool for a small agency to track client projects, budgets and deadlines."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: **Establish** for a new app. Status: **Proposed (delegated, D-03)**, 13 Oct 2026. The owner said "you decide"; T1 shows it on `/design` for a quick OK. After that OK, copy the values into the YAML above and mark them Approved.
Direction: a calm, dense work tool. Project rows carry the page; status is short text with an icon; one accent marks actions.
Values live in `design/tokens.css`. Brand name, logo and colors are Unknown; the accent stays neutral until supplied.

## Colors

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Page | `--color-bg` | #F7F8FA | Page background |
| Surface | `--color-surface` | #FFFFFF | Table, forms, top bar |
| Sunken | `--color-sunken` | #F1F2F4 | Segmented control track, meter track |
| Text | `--color-text` | #16181D | Names, figures, headings |
| Muted | `--color-text-muted` | #545B66 | Second lines, labels (6.85:1) |
| Subtle | `--color-text-subtle` | #6B7280 | Captions only (4.55:1 on page) |
| Border | `--color-border` | #E2E5EA | Row separators |
| Field border | `--color-border-field` | #848B96 | Inputs and secondary buttons (3.43:1) |
| Accent | `--color-accent` | #2E5BDB | Primary button, links, focus, selected segment (white text 5.78:1) |
| Success / Warning / Danger | `--color-success`, `--color-warning`, `--color-danger` with `-bg` | #1B7A4B, #9A4F00, #C1341F | Badges, always with a text label and an icon |

## Typography

IBM Plex Sans (Proposed; good tabular figures), weights 400, 500, 600. Sizes: 12 caption, 13 meta and table second lines, 14 body and controls, 16 section title, 20 page title, 24 key figure on S2. Line height 1.45 text, 1.25 headings. `font-variant-numeric: tabular-nums` on every amount, percent and date column.

## Layout

Content max 1280, gutter 24 desktop and 16 phone. Top bar 56 tall. No sidebar: there is one destination (Projects).
Page header: title left, one primary action right. Spacing scale 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12; between groups 16 to 32.
Table rows 48 (two lines), cell padding 12. Text left, numbers right. Sticky table header on desktop.
At 720 px and below, rows become stacked items and the primary action moves to a bottom bar.

## Elevation & Depth

Borders separate things at rest. Shadow `--shadow-float` only on Dropdown menu, Popover and Modal.

## Shapes

Radius 4 badges, 6 controls, 8 panels and the table container, 12 dialogs.

## Components

| Canonical name | Library | Used on | States |
| --- | --- | --- | --- |
| Button (primary, secondary, text) | shadcn Button | All | default, hover, focus, disabled with reason, busy ("Saving") |
| Segmented control | Custom on Radix Toggle Group | S1 Active / Completed | selected (fill and `aria-pressed`), focus |
| Table | Native table, shadcn Table styles | S1 | row hover tint, focus on the project link |
| Badge | shadcn Badge | S1, S2 | Late, Due soon, Over budget, 80% used, Done, Completed |
| Meter (budget bar) | Custom div, `aria-hidden`; the text beside it carries the value | S1, S2 | normal, warning, danger |
| Text input, Date input, Combobox (client), Select (lead) | shadcn Input, Combobox, Select | S2, S3 | pristine, invalid with text, disabled |
| Alert | shadcn Alert | Load and save failures | stays until fixed |
| Toast | shadcn Sonner | "Changes saved", once | leaves after 4 s |
| Modal | shadcn Dialog | Remove deadline, Mark completed | focus trapped, Escape closes |
| Dropdown menu | shadcn DropdownMenu | Account menu | |
| Skeleton, Empty state | shadcn Skeleton | S1, S2 | |

## Icons

- **Icon set:** Lucide (Proposed). **Style:** line. **Stroke:** 2. **Size:** 16 next to 13 to 14 text. **Spacing:** 4 between icon and label.
- **Icon-only allowed:** close, menu, more, back. Each has an accessible name and a tooltip on hover and focus.
- **Never icon-only:** destructive and uncommon actions, such as Remove deadline.
- **Emoji:** not used.
- **Status:** text + icon + color. Late and Over budget use `circle-alert`; Due soon and 80% used use `clock` and `gauge`; Done uses `check`.

## Placement

- **Primary action side:** right in page headers; forms and dialogs end with actions on the right.
- **Button order:** secondary, then primary. Never two filled buttons side by side.
- **Form actions:** at the end of the form. Bottom bar on phone.
- **Dialog actions:** buttons name the action ("Remove deadline"). Cancel left of it.
- **Destructive actions:** in the Deadlines list as a text button "Remove"; "Mark completed" sits apart from Edit in S2's header.
- **Search and filters:** none in this release.
- **Toasts and status:** bottom right on desktop, above the bottom bar on phone. Errors that need action are Alerts by the affected work, not toasts.
- **Empty states:** where the table would be, with one next action.
- **Navigation:** top bar, same on every screen. App label left links to Projects.
- **Profile/account:** one account menu, top bar right.
- **Selection, focus, notifications:** no notification dots in this release. Focus ring is always visible, including on the selected segment.
- **Mobile primary action:** bottom bar.
- **Sticky elements:** the bottom bar reserves page padding so focus and the last row stay visible.

## Do's and Don'ts

- Do keep the filled accent for the one main action per view.
- Don't add gradients, glass effects, summary cards, charts or extra accent colors.
- Don't use sample names or amounts in shipped UI.
- Don't add icons from outside Lucide, or icons on headings.
- Don't hardcode a currency symbol. Format with `Intl.NumberFormat` and `NEXT_PUBLIC_CURRENCY`.

## Motion

Only feedback: 120 ms hover and press, 180 ms menus, 240 ms dialogs, ease-out to enter. Reduced motion: no movement, opacity only.

## Imagery and density

No imagery. Dense but calm: one table, two-line rows, status inside the row.

## Accessibility

Contrast pairs above are measured. Other rules: docs/shipright/build-rules.md.

## ShipRight status

| Item | Value | Decision status | Source |
| --- | --- | --- | --- |
| All tokens in `design/tokens.css` | As listed | Proposed (delegated) | D-03, 13 Oct 2026 |
| Brand name, logo, colors | Unknown | Unresolved | Agency owner |
| Currency | Unknown | Unresolved | D-08, agency owner |
