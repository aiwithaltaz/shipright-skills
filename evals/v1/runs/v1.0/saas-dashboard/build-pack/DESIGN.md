---
version: "0.1"
name: "Agency project tracker"
description: "Calm, dense work tool for tracking client projects, budgets and deadlines."
status: "Proposed (delegated, D3). Token values live in design/tokens.css and move into this map after the user OKs the /design page in T1."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: Establish (new app, no brand supplied). Source: calm dense starter, accent and type adapted. All values are **Proposed (delegated)** until the user OKs the `/design` preview built in T1.
Direction: a working list the owner can scan in ten seconds. Real data, problems in words, one accent for actions only.
Brand name, logo and colors: Unknown (Q3). Use the workspace name the user types at setup. No logo.

## Colors

Semantic roles. Components use these names, never raw hex. Contrast measured on the paired background.

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `--color-bg` | #F7F8FA | Page | |
| `--color-surface` | #FFFFFF | Table, panels, dialogs | |
| `--color-sunken` | #F1F2F4 | Table header, segmented control track | |
| `--color-text` | #16181D | Body and names | 16.7:1 on bg |
| `--color-muted` | #545B66 | Secondary facts | 6.9:1 on surface |
| `--color-subtle` | #6B7280 | Meta only, never on sunken | 4.6:1 on bg |
| `--color-border` | #E2E5EA | Dividers, meter track | |
| `--color-field-border` | #848B96 | Inputs, checkboxes | 3.4:1 on surface |
| `--color-accent` | #1D5B79 | Primary button, focus ring, selected segment text, links | 7.4:1 white on it |
| `--color-accent-hover` | #174C66 | Primary button hover | white text above 7:1 |
| `--color-accent-tint` | #E8F0F5 | Selected segment, row hover | accent text 6.5:1 |
| `--color-success` / `-bg` | #1B7A4B on #E7F5EE | Done, completed | 4.8:1 |
| `--color-warning` / `-bg` | #9A4F00 on #FDF0E1 | Due soon, near budget | 5.4:1 |
| `--color-danger` / `-bg` | #C1341F on #FCEBE7 | Late, over budget, errors | 4.8:1 |
| `--color-meter` | #545B66 | Budget meter fill under 80% | 5.4:1 on track |

Status always pairs text with an icon and color. Never color alone.

## Typography

IBM Plex Sans (Google Fonts), weights 400, 500, 600. Tabular figures (`font-variant-numeric: tabular-nums`) on every number, date and amount.

| Token | Size / line height | Use |
| --- | --- | --- |
| `--text-caption` | 12 / 16 | Meter labels, helper text |
| `--text-meta` | 13 / 18 | Table secondary lines, client names |
| `--text-body` | 14 / 20 | Body, table, controls |
| `--text-section` | 16 / 20, 600 | Section headings on detail |
| `--text-title` | 20 / 26, 600 | Page title |
| `--text-figure` | 24 / 30, 600 | Budget figures on detail only |

Phone inputs use 16 px text so browsers do not zoom.

## Layout

- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 (`--space-1` to `--space-16`, named by px/4). Inside a group 4 to 12; between groups 16 to 32.
- Top bar 56 tall. No sidebar: one destination (Projects).
- Content max width 1280, gutter 24 desktop, 16 phone.
- Page header: title left, one filled primary action right. Under 760 px the primary action moves to a fixed bottom bar.
- Table row 48 (two text lines), cell padding 12, header 36 sticky, numbers right aligned. Under 900 px the projects table becomes a list.
- Detail page: two columns over 1024 px (Deadlines left 1fr, Budget right 1fr), stacked below.

## Elevation and shapes

Borders separate at rest. Shadow `--shadow-float: 0 8px 24px rgba(16,24,40,.12)` only on menus, popovers and dialogs.
Radius: `--radius-sm` 4 (badges), `--radius-control` 6 (buttons, inputs), `--radius-panel` 8 (table frame, panels), `--radius-dialog` 12.

## Components

| Name | Library | Variants and states |
| --- | --- | --- |
| Button | shadcn Button | primary (filled accent), secondary (outline), ghost, danger-text. Default, hover, focus, disabled, busy ("Saving...") |
| Segmented control | shadcn ToggleGroup, single | Active, Completed, All, each with a count |
| Table | shadcn Table | sticky header, row hover tint, row link |
| Badge | custom, 20 tall | late, due-soon, over, near, done. Text plus icon |
| Budget meter | custom div, aria-hidden | 6 tall, track border color, fill by status, capped at 100% width |
| Text input, Date input, Number input | shadcn Input | label above, helper, inline error |
| Combobox | shadcn Command in Popover | client name; typing a new name offers "Add client: [name]" |
| Checkbox | shadcn Checkbox | deadline done |
| Modal | shadcn Dialog | add/edit deadline, add/edit cost, confirm remove |
| Alert | shadcn Alert | error and not found, stays until resolved |
| Toast | shadcn Sonner | short confirmations only, bottom right desktop, above bottom bar on phone |
| Dropdown menu | shadcn DropdownMenu | account menu |
| Skeleton | shadcn Skeleton | five table rows |

## Icons

- **Icon set:** Lucide, line style, stroke 1.75. Proposed.
- **Sizes:** 16 next to 13 to 14 px text, 20 in the top bar.
- **Icon and label spacing:** 8 (`--space-2`).
- **Icon-only allowed:** close, menu, more, back. Each has an accessible name and tooltip.
- **Never icon-only:** remove, mark complete, any destructive action.
- **Emoji:** not used.
- **Status icons:** late `alert-circle`, due soon `clock`, over budget `alert-triangle`, near budget `gauge`, done `check`.

## Placement

- **Primary action side:** right on desktop pages and dialogs; full width bottom bar on phone pages.
- **Button order:** secondary then primary. Never two filled buttons side by side.
- **Form actions:** end of the form, right. Sticky bottom bar on phone.
- **Dialog actions:** name the action ("Add cost", "Remove cost"). Cancel left of it.
- **Destructive actions:** danger text button inside the row's edit dialog, left side, away from Save.
- **Search and filters:** none beyond the segmented control.
- **Toasts:** one place app-wide. Errors needing action use an Alert, not a toast.
- **Empty states:** inside the table or list area, with one action.
- **Navigation:** top bar. Workspace name left, account menu right. One account home.
- **Selection, focus, notifications:** focus ring 2 px accent, 2 px offset, always visible. No notification dots.

## Motion

120 ms hover and press, 180 ms popovers, 240 ms dialogs, ease-out `cubic-bezier(.23,1,.32,1)`. Reduced motion: opacity only. No decorative motion.

## Do's and don'ts

- Do keep the filled accent for the main action in each area, and show late and over budget in words.
- Don't add summary cards, charts, a welcome line, gradients or new accent colors.
- Don't ship sample names or numbers.

## Accessibility

Rules live in `docs/shipright/build-rules.md`. Measured pairs are listed above; recheck any color change.
