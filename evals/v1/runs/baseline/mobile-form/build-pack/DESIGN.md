---
version: "0.1"
name: "Unknown app name (owner to supply)"
description: "Neutral Phase 1 system for signing up and sending a first home cleaning request. Approved by owner delegation D-05 on 2026-10-13. Replace when brand values are supplied."
colors:
  background: "#FFFFFF"
  surface: "#F3F5F4"
  text: "#15191B"
  text-muted: "#4C565C"
  border-control: "#7C878D"
  border-subtle: "#DDE2E0"
  accent: "#0D6B50"
  on-accent: "#FFFFFF"
  accent-tint: "#E6F2EE"
  error: "#B42318"
  focus: "#15191B"
typography:
  family: "Platform system font: SF Pro on iOS, Roboto on Android"
  title: { size: 28, line: 34, weight: 700 }
  heading: { size: 20, line: 26, weight: 600 }
  body: { size: 17, line: 24, weight: 400 }
  label: { size: 15, line: 20, weight: 600 }
  support: { size: 15, line: 20, weight: 400 }
  caption: { size: 13, line: 18, weight: 400 }
  button: { size: 17, line: 22, weight: 600 }
rounded:
  control: 10
  sheet: 16
  full: 999
spacing: [4, 8, 12, 16, 20, 24, 32, 48]
components:
  - TopAppBar
  - TextField
  - DatePickerField
  - RadioGroup
  - Button (primary, text)
  - Alert
  - StatusMessage
  - BottomActionBar
---

# Design system

## Overview

Mode: **Establish** a small new system. No brand was supplied (D-05), so this is a plain, readable system for forms on a phone. Approved by owner delegation on 2026-10-13. It does not express a brand personality. Replace colors and type when brand values arrive; keep the placement rules.
Direction: a calm form that asks one group of questions at a time, with labels always visible and one clear next step at the bottom.

## System source and reuse

No existing app or component library. Components are built in the Expo app under `src/components/`. Borrowed property, credited: the form pattern of public-service design systems such as GOV.UK (visible labels above fields, mark only optional fields, plain error text under the field). No identity, colors, type or icons are borrowed.

## Colors

| Role | Value | Use | Measured contrast |
| --- | --- | --- | --- |
| background | #FFFFFF | Screen background | |
| surface | #F3F5F4 | Bottom action bar background | |
| text | #15191B | Titles, body, input text | 17.7:1 on background |
| text-muted | #4C565C | Hints and supporting text | 7.5:1 on background, 6.9:1 on surface |
| border-control | #7C878D | Text field and radio borders | 3.7:1 on background (UI boundary, needs 3:1) |
| border-subtle | #DDE2E0 | Bottom bar top line only. Decorative, not a control boundary | |
| accent | #0D6B50 | Primary button, selected radio border and dot, text buttons | 6.5:1 on background |
| on-accent | #FFFFFF | Text on primary button | 6.5:1 on accent |
| accent-tint | #E6F2EE | Selected radio row background | Text on it 15.4:1 |
| error | #B42318 | Error text, error border, error icon | 6.6:1 on background |
| focus | #15191B | Focus ring, 2px, 2px offset | |

## Typography

Platform system font, so text follows the person's text size setting. Support Dynamic Type on iOS and font scale on Android up to 200%; layouts must wrap, not clip.
Input text uses body size 17, above 16 to avoid zoom on web builds.

## Layout

- Screen side gutter 20. Space between a label and its field 8. Between fields 20. Between groups (Where, When) 32.
- Field height at least 52. Radio row height at least 56. Primary button height 52, full width.
- City and Postal code sit side by side at widths of 360 and above; they stack below 360 or at large text sizes.
- Content scrolls under a sticky BottomActionBar. Reserve the bar's height as bottom padding so the last field and its error stay visible above the bar and keyboard.

## Elevation & Depth

No shadows. The BottomActionBar uses the surface color and a 1px border-subtle top line.

## Shapes

Controls and buttons: radius 10. Sheets: 16. Radio dot: full.

## Components

| Name | Expo implementation | States |
| --- | --- | --- |
| TopAppBar | Custom View in `src/components/TopAppBar.tsx`; Back on the left, optional step text on the right | default, focus |
| TextField | React Native `TextInput` with a visible label `Text` above, hint below, error below | default, focus, filled, error, disabled (not used) |
| DatePickerField | Pressable field opening `@react-native-community/datetimepicker` | empty, filled, focus, error |
| RadioGroup | `accessibilityRole="radiogroup"` with full-width rows of `accessibilityRole="radio"` and `accessibilityState={{ checked }}`. Order: legend, hint, rows, error | unselected, selected, focus, error |
| Button primary | Pressable, accent fill, on-accent text | default, pressed, focus, busy (spinner plus words, not pressable) |
| Button text | Pressable, accent text, no fill | default, pressed, focus |
| Alert | Inline block with error icon and text; stays until the situation changes | error |
| StatusMessage | Text line in the BottomActionBar, `accessibilityLiveRegion="polite"` | idle, busy, error |
| BottomActionBar | Sticky bar with StatusMessage above one primary Button | default |

Any web or shadcn equivalents are not used; this is a native app.

## Icons

- **Icon set:** Lucide, via `lucide-react-native`.
- **Icon exceptions:** none.
- **Style:** line.
- **Stroke weight:** 2.
- **Sizes:** 20 next to body and button text, 16 next to caption and error text.
- **Icon and label spacing:** 8.
- **Icon-only allowed:** close, search, menu, more, back. Each has an accessible name and a tooltip on platforms that show tooltips. Back also shows the word "Back" in this app.
- **Never icon-only:** destructive and uncommon actions. They get a visible text label.
- **Emoji:** not used.
- **Status:** text + icon + color, never color or icon alone. Used icons: `chevron-left` (Back), `circle-alert` (errors), `check-circle` (request sent), `clock` (waiting for confirmation).

## Placement

- **Primary action side:** full width at the bottom of the screen in the BottomActionBar.
- **Button order:** one filled primary button per screen. Secondary actions are text buttons, never filled, never beside the primary.
- **Form actions:** sticky at the bottom on every form screen (S2, S3, S4, S4R, S5).
- **Dialog actions:** no dialogs in Phase 1. If one is added, buttons name the action and Cancel stays visible.
- **Destructive actions:** none in Phase 1.
- **Search and filters:** none in Phase 1.
- **Toasts and status messages:** no toasts. Task status and form-level errors appear in the StatusMessage line of the BottomActionBar, directly above the primary button, on every screen. Field errors sit under their field.
- **Empty states:** S6 only, where the request list would be.
- **Navigation:** stack navigation. Back sits top left on every screen except S1 and S6. No tab bar in Phase 1.
- **Profile/account:** S6 holds the name and "Log out". Nowhere else.
- **Selection, focus, notifications:** selected radio uses accent border, tint and a filled dot. Focus uses a 2px focus ring. No notification dots in Phase 1.
- **Mobile primary action:** in the BottomActionBar, within thumb reach.
- **Sticky elements:** the BottomActionBar must not cover a focused field. Scroll the focused field above the bar and keyboard.

## Do's and Don'ts

- Do keep the filled accent style for the main action in each area, not for decoration.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glass effects or extra accent colors that are not listed here.
- Don't use sample names, logos or numbers that look real in shipped UI.
- Don't add icons from outside the icon set above, or icons on every heading.
- Don't show prices, hours, ratings or a brand name until the owner supplies them.

## Motion

No custom motion. Use the platform's default screen transitions. Respect Reduce Motion.

## Imagery and density

No images or illustrations in Phase 1. Density: one question group per screen section, generous targets for touch.

## Accessibility

Specified, not yet verified in a build:
- Every field has a visible label that matches its accessible name. Optional fields say "(optional)".
- Errors are text under the field with an icon, linked to the field, and announced. On a failed Continue, focus moves to the first invalid field.
- Radio rows expose radio role and checked state.
- Targets at least 44 by 44 points.
- Busy and sent states are announced politely without moving focus.
- Text scales to 200% without clipping.

## Screen notes

S2: City and Postal code pair (see Layout). No other exceptions.

## Reference properties

GOV.UK form pattern: labels above fields, optional marked, plain error text. Not adopted: GOV.UK identity, typeface, colors, crown or header.

## ShipRight status

| Token or rule | Value / proposal / gap | Evidence status | Decision status | Source / owner |
| --- | --- | --- | --- | --- |
| Colors, type, spacing, radius, components | As above | Contrast measured from hex values; not seen on devices | Approved (delegated) | D-05, owner 2026-10-13 |
| App name and logo | Unknown | Unknown | Unresolved | Owner |
| Arrival time labels | Morning, Afternoon, Any time, no hours until D-14 | Not applicable | Approved (delegated) | D-06; hours D-14 owner |
| Brand colors and type | Unknown | Unknown | Unresolved | Owner, replaces this system when supplied |
