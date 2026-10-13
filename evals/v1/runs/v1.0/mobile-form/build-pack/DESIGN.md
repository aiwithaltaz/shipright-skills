---
version: "0.1"
name: "Home cleaning booking app (working name)"
description: "Native phone booking flow. Starter system Mobile native, adapted. All values Proposed (delegated) until the owner approves the /design preview."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: Establish, new app (D3, delegated). Direction: calm, native and plain, so a first-time customer books without help. One accent marks the next step and the current choice.
YAML maps stay empty until the owner approves T1's preview; then copy the values in and mark them Approved.
Brand name, logo and colors: Unknown (U3). A supplied brand color replaces the accent after a contrast recheck.

## Colors (Proposed)

Code source: `src/design/tokens.ts`. Contrast measured against WCAG AA.

| Role | Token | Value | Use |
| --- | --- | --- | --- |
| Background | `color.bg` | #FFFFFF | Screens, bottom bar |
| Sunken | `color.sunken` | #F3F4F6 | Skeletons, full days, summary blocks |
| Text | `color.text` | #121417 | Body and headings, 16.3:1 |
| Muted | `color.muted` | #5A616B | Secondary lines, 6.3:1 |
| Border | `color.border` | #E3E6EA | Dividers, bottom bar top edge |
| Field border | `color.fieldBorder` | #868D97 | Inputs, unselected options, 3.4:1 |
| Accent | `color.accent` | #0B6A88 | Primary button, selected day, selected option border, links, focus ring. White text 6.1:1 |
| Accent pressed | `color.accentPressed` | #08546C | Pressed primary |
| Accent tint | `color.accentTint` | #E8F3F7 | Selected option fill |
| Disabled | `color.disabledBg` / `disabledText` | #E3E6EA / #5A616B | Primary button before it can act, 5.0:1 |
| Danger | `color.danger` on `dangerTint` | #C1341F on #FCEBE7 | Errors, always with text and an icon |
| Success | `color.success` on `successTint` | #1B7A4B on #E7F5EE | "Booked" status, with text and a check icon |

Status never relies on color alone.

## Typography (Proposed)

Platform font: San Francisco on iOS, Roboto on Android (no custom font to load). Field text never under 17.

| Role | Size / line | Weight |
| --- | --- | --- |
| Screen title | 28 / 34 | 700 |
| Section | 20 / 26 | 600 |
| Body, fields, buttons | 17 / 24 | 400; buttons 600 |
| Secondary | 15 / 20 | 400 |
| Caption | 13 / 18 | 400 |

Times use tabular numbers. Support Dynamic Type and font scale; text wraps, never clips.

## Layout

One column, side padding 20. Spacing scale 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12, between groups 24 to 32.
Header: Back at top left, step text right, then the title. Bottom bar: full-width primary button, safe-area inset, 1px top border. Content reserves the bar's height so the last field stays visible above the bar and keyboard (use `KeyboardAvoidingView` or `react-native-keyboard-controller`).

## Elevation & Depth

Borders at rest. Shadow only on sheets (`elevation.sheet`).

## Shapes

Radius 10 for buttons, fields, day chips and option rows. 12 for sheets. 4 for status tags.

## Components (Proposed)

Built in `src/components/ui/` on React Native primitives. No UI kit.

| Name | Library equivalent | States |
| --- | --- | --- |
| Button: primary, text | `Pressable` | default, pressed, focus, disabled with reason, busy ("Booking...") |
| Text input, Textarea | `TextInput` with visible `Text` label | default, focus, invalid with message, read-only |
| Stepper (quantity) | Two 48 buttons and a value, `accessibilityRole="adjustable"` | min, max |
| Day chip group | Radio group of `Pressable`, `accessibilityState.selected` | default, selected (fill plus check), full (muted plus "Full"), focus |
| Slot option | Radio row | default, selected (2px accent border, tint, check), full (muted, "Full", not selectable) |
| Code input | One `TextInput`, `textContentType="oneTimeCode"`, `autoComplete="one-time-code"`, `keyboardType="number-pad"`, max 6 digits | default, invalid, verifying |
| Alert | Inline `View` with icon and text | error, info |
| Skeleton | Sunken blocks | loading |
| Header | Back (icon plus "Back" label), step text, title | |
| Summary list | Label and value rows with "Edit" text buttons | |
| Status tag | Text plus icon on tint | Booked |

## Icons

- **Icon set:** lucide-react-native, Proposed.
- **Icon exceptions:** none.
- **Style:** line. Selected states add a check icon; they do not switch to filled.
- **Stroke weight:** 2.
- **Sizes:** 20 next to 17 text, 16 next to 15 or 13 text.
- **Icon and label spacing:** 8.
- **Icon-only allowed:** close, back (Back also shows its label), previous week, next week. Each has an accessible name.
- **Never icon-only:** destructive and uncommon actions such as "Start over".
- **Emoji:** not used.
- **Status:** text + icon + color, never color or icon alone.

## Placement

- **Primary action side:** bottom bar, full width. One primary per screen.
- **Button order:** secondary actions are text buttons in the content, never a second filled button.
- **Form actions:** sticky bottom bar on every booking step: yes.
- **Dialog actions:** only "Start over" confirms: "Start over" (danger text) and "Keep booking". Buttons name the action.
- **Destructive actions:** "Start over" is a text button in S1's unfinished-booking block, away from the primary.
- **Toasts and status messages:** no toasts. Errors sit inline under the field, or as an Alert under the screen title.
- **Empty states:** in place of the missing content, with one next action.
- **Navigation:** single stack with Back. No tab bar (one destination).
- **Selection, focus, notifications:** separate. Focus ring 2px accent with 2px offset; selection uses fill or border plus a check.
- **Mobile primary action:** bottom bar, within thumb reach.
- **Sticky elements:** the bottom bar never covers the focused field.

## Do's and Don'ts

- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element when a keyboard is used.
- Don't add gradients, glass effects or extra accent colors.
- Don't show prices, ratings, cleaner photos or a business name until the owner supplies them.

## Motion

Native stack push 240 ms. Selection fill 180 ms. Button press 120 ms. Reduced motion: no slide, opacity fade only. No decorative animation.

## Imagery and density

No imagery; no logo exists yet. One task per screen, no filler.

## Accessibility

Visible labels above fields; each input's accessible name equals its label. Errors are text, announced politely. Radio groups expose selected state. Targets 48. Test with VoiceOver, TalkBack and 200% text. All values specified, not yet verified.

## ShipRight status

| Token or rule | Value | Evidence | Decision | Owner |
| --- | --- | --- | --- | --- |
| Color, type, space, radius, motion, icons | Above | Contrast measured | Proposed (delegated) | D3 |
| Brand color, logo, name | Unknown | None | Unresolved | Owner, U3 |
