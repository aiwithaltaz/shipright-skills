---
version: "0.1"
name: "Agency project tracker"
description: "Quiet operator UI for a small agency. Gray and white surfaces, one blue for actions, status shown with text, icon and color."
colors:
  bg: "#F6F7F9"
  surface: "#FFFFFF"
  text: "#1B1F24"
  text-muted: "#59636E"
  border: "#E3E6EA"
  border-input: "#848D97"
  accent: "#1F5FBF"
  accent-hover: "#194E9E"
  on-accent: "#FFFFFF"
  focus: "#1F5FBF"
  danger-text: "#B42318"
  danger-bg: "#FEF3F2"
  warning-text: "#8A4B00"
  warning-bg: "#FFF4E0"
  warning-fill: "#B26B00"
  success-text: "#1E6B3A"
  success-bg: "#ECF7EF"
  track: "#E3E6EA"
typography:
  family: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  numbers: "font-variant-numeric: tabular-nums"
  caption: { size: 12px, line: 16px, weight: 400 }
  body: { size: 14px, line: 20px, weight: 400 }
  input: { size: 16px, line: 24px, weight: 400 }
  section: { size: 16px, line: 24px, weight: 600 }
  title: { size: 20px, line: 28px, weight: 600 }
rounded:
  control: 6px
  panel: 8px
  pill: 999px
spacing: [4, 8, 12, 16, 24, 32, 48]
components: {}
---

# Design system

## Overview

Mode: **Establish** (new app). Authority: decision D5, delegated by the owner on 2026-10-13 ("You decide. Use your recommended picks."). The values above were proposed by the assistant and approved through that delegation. No agency brand was supplied. If brand files arrive later, colors and type change here first.

Direction: a quiet working list where status words carry the meaning and the only strong color is the action button.

## System source and reuse

No existing app or system. Borrowed properties only, no identity:
- Carbon and Primer: dense data tables, status sitting next to the record, quiet page chrome.
- GOV.UK: visible labels, plain error text near the field.
Not adopted: any vendor color, font, logo or icon set.

## Colors

| Role | Value | Use | Measured contrast |
| --- | --- | --- | --- |
| bg | #F6F7F9 | Page background | text on bg 15.45:1 |
| surface | #FFFFFF | Tables, drawer, top bar | text 16.56:1, text-muted 6.11:1 |
| text | #1B1F24 | Body and headings | 16.56:1 on surface |
| text-muted | #59636E | Secondary lines, captions | 6.11:1 on surface, 5.7:1 on bg |
| border | #E3E6EA | Dividers and table lines (decorative) | Not a required boundary |
| border-input | #848D97 | Input and secondary button outlines | 3.37:1 on surface |
| accent | #1F5FBF | Primary button, link-style buttons, focus ring, budget bar fill | White on accent 6.09:1; 4.87:1 on track |
| danger-text / danger-bg | #B42318 / #FEF3F2 | Over budget, Overdue, errors | 6.05:1 |
| warning-text / warning-bg | #8A4B00 / #FFF4E0 | Near limit, Due soon | 6.24:1 |
| warning-fill | #B26B00 | Budget bar fill when Near limit | 3.36:1 on track |
| success-text / success-bg | #1E6B3A / #ECF7EF | "Project saved" status line only | 5.94:1 |
| track | #E3E6EA | Budget bar track | Bar is never the only cue; percent text sits beside it |

No gradients, no extra accent colors, no dark mode in Phase 1.

## Typography

System font stack (no web font to load). Sizes: caption 12/16, body 14/20, input 16/24 (avoids mobile zoom), section heading 16/24 semibold, page title 20/28 semibold. All money and dates use tabular numbers.

## Layout

- Page max width 1200px, centered, side padding 24px (16px under 640px).
- Spacing scale: 4, 8, 12, 16, 24, 32, 48. Inside a group 8 or 12. Between groups 24 or 32.
- Table rows: 12px vertical padding, 16px horizontal. Row height grows when text wraps.
- Drawer width 440px on desktop. Full screen under 640px.
- Under 760px the project table becomes a stacked list: one block per project, each value with its column label.

## Elevation & Depth

Borders group content. One shadow only, for the drawer: 0 8px 24px rgba(27,31,36,0.16). A 40% black scrim sits behind the drawer.

## Shapes

Controls 6px. Table containers and drawer edge 8px. Badges are pills (999px).

## Components

| Canonical name | Library equivalent (Proposed, D8) | Use | States |
| --- | --- | --- | --- |
| Header (top bar) | Custom | Product label, account menu | Default |
| Dropdown menu | shadcn DropdownMenu | Account menu: name, email, Sign out | Closed, open, focus |
| Heading | Native h1/h2 | Page title, group titles | |
| Button, primary | shadcn Button default | One per area: "Add project", "Save project" | Default, hover, focus, busy ("Saving..."), disabled only while busy |
| Button, secondary | shadcn Button outline | Cancel, Try again, Keep editing | Default, hover, focus |
| Button, link style | shadcn Button link | Project name in a row opens S2 | Default, hover underline, focus |
| Segmented control | shadcn ToggleGroup (single) or Tabs | Active / Completed views | Selected (bold text + white surface + aria-pressed or aria-selected), focus |
| Table | shadcn Table | Project rows | Populated, loading (Skeleton rows) |
| Badge | shadcn Badge | Over budget, Near limit, Overdue, Due soon, Completed | Text + icon + color |
| Progress bar (as a budget meter) | Custom div with role="img" and text label, or native meter | Spent against budget | Normal, near, over. Justified: no closer canonical name; percent text is always shown |
| Drawer | shadcn Sheet (side right) | S2 Project form | Open, closing, unsaved-changes prompt |
| Form, Label, Text input, Select, Date input | shadcn Form, Input, Select; native date input | S2 fields | Pristine, invalid, submitting, error |
| Combobox | shadcn Command in Popover | Client: pick existing or type a new name | Empty, matches, "Add new client: [name]" |
| Alert | shadcn Alert | Load failure, save failure, unsaved changes prompt, preview notice | Stays until resolved |
| Empty state | Custom | No active projects, no completed projects | One next action |
| Skeleton | shadcn Skeleton | Loading rows | |
| Status line | Custom, role="status" | "Project saved." after save | Clears on next action |

No Toast. Confirmations use the status line under the page header.

## Icons

- **Icon set:** Lucide (Proposed with D8; any one line set works if the stack changes).
- **Icon exceptions:** none.
- **Style:** line.
- **Stroke weight:** 2.
- **Sizes:** 16px next to 14px text; 20px for close and menu.
- **Icon and label spacing:** 4px in badges, 8px in buttons.
- **Icon-only allowed:** close, menu. Each has an accessible name and a tooltip on hover and focus.
- **Never icon-only:** destructive and uncommon actions. They get a visible text label.
- **Emoji:** not used.
- **Status:** text + icon + color, never color or icon alone. Over budget and Overdue use alert-triangle. Near limit and Due soon use clock. Completed uses check.

## Placement

- **Primary action side:** right, for forms and dialogs.
- **Button order:** secondary then primary (Cancel, Save project). Never two filled buttons side by side.
- **Form actions:** footer of the drawer, sticky at the drawer bottom.
- **Dialog actions:** buttons name the action ("Save project", "Discard changes"); Cancel is always present.
- **Destructive actions:** none in Phase 1. "Discard changes" lives only in the unsaved-changes prompt.
- **Search and filters:** none in Phase 1.
- **Toasts and status messages:** one status line directly under the page header. Never over the drawer actions.
- **Empty states:** inside the table area, with one next action.
- **Navigation:** top bar only. Phase 1 has one destination (Projects), so there is no nav menu.
- **Profile/account:** one home: the account button at the top bar's right end.
- **Selection, focus, notifications:** no row selection in Phase 1. Focus ring 2px accent with 2px offset on every control. No notification dots.
- **Mobile primary action:** "Add project" moves to a bottom bar under 760px. Page content gets bottom padding equal to the bar height so nothing hides behind it.
- **Sticky elements:** top bar and the mobile bottom bar. Neither may cover a focused control (use scroll-padding).

## Do's and Don'ts

- Do keep the filled accent style for the main action in each area, not for decoration.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glass effects or extra accent colors that are not listed here.
- Don't use sample names, logos or numbers that look real in shipped UI.
- Don't add icons from outside the icon set above, or icons on every heading.
- Don't add summary cards, charts, an activity feed or a welcome line. The list is the dashboard.
- Don't show "synced" or other plumbing messages.

## Motion

Drawer slides in over 200ms ease-out. Under prefers-reduced-motion it appears with no slide. No other motion.

## Imagery and density

No imagery. Dense table for desktop use; readable 14px body; 16px inputs; targets at least 24x24px, 40px high for buttons.

## Accessibility

Specified, not yet verified in a build: native buttons and inputs, visible labels, errors tied to fields with aria-describedby, drawer as a modal dialog (focus moves in, Tab stays inside, Escape closes, focus returns to the trigger), status line as polite live region, 200% zoom and 320px reflow. Contrast values above are measured from the hex pairs.

## Screen notes

- S1: groups "Needs attention" and "On track" are two headed tables with matching column widths.

## Reference properties

See "System source and reuse". Table density and status-with-record from Carbon/Primer; label and error placement from GOV.UK.

## ShipRight status

| Token or rule | Value / proposal / gap | Evidence status | Decision status | Source / owner |
| --- | --- | --- | --- | --- |
| Colors, type, spacing, radius, elevation | As listed | Proposed by assistant, contrast measured | Approved (delegated) | D5, owner, 2026-10-13 |
| Component library | shadcn/ui on Radix | Proposed | Unresolved | D8, owner |
| Icon set | Lucide line, stroke 2 | Proposed | Unresolved (follows D8) | D8, owner |
| Brand name, logo | Unknown | Unknown | Unresolved | Owner |
| Rendered fit and keyboard behavior | Preview HTML only | Not verified in the real build | Not verified | Builder |
