---
version: "0.1"
name: "Home cleaning booking app (name Unknown, U5)"
description: "Native phone system for sign-up and first booking. All values are Proposed (delegated, D3) and live in design/tokens.ts until the owner OKs the /design preview in T1. Then copy them here."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

## Overview

Mode: **Establish** for a new app. Source: native phone starter, adapted with a deep blue-teal accent for clean water. No brand exists yet (U5). Every value below is **Proposed (delegated)**. The owner sees it on `/design` (T1) before any screen is built. Their own brand or Figma file replaces it if they have one.

Direction: calm, native and quick to fill in. White screens, one accent, big touch targets, nothing decorative.

The code source of truth is `design/tokens.ts`. Components use semantic names, never raw values.

## Colors

| Role | Token | Value | Measured contrast |
| --- | --- | --- | --- |
| Background | `bg` | #FFFFFF | |
| Sunken (bottom bar, read-only rows) | `sunken` | #F3F4F6 | |
| Text | `text` | #121417 | 18.5:1 on bg |
| Muted text | `muted` | #5A616B | 6.3:1 on bg, 5.7:1 on sunken |
| Border (dividers) | `border` | #E3E6EA | decorative only |
| Field border | `fieldBorder` | #868D97 | 3.4:1 on bg |
| Accent (primary button, selected, focus) | `accent` | #0B6E8A | 5.8:1 white on it |
| Accent pressed | `accentPressed` | #095A71 | 7.7:1 white on it |
| Accent tint (selected choice fill) | `accentTint` | #E8F3F6 | accent 5.2:1 on it, text 16.3:1 |
| Danger text and icon | `danger` | #C1341F | 5.6:1 on bg, 4.8:1 on dangerTint |
| Danger tint (alert fill) | `dangerTint` | #FCEBE7 | |
| Success text and icon | `success` | #1B7A4B | 4.75:1 on successTint |
| Success tint | `successTint` | #E7F5EE | |

Status always pairs color with an icon and words.

## Typography

System font: SF Pro on iOS, Roboto on Android. Allow system text scaling.

| Token | Size / line height / weight | Use |
| --- | --- | --- |
| `title` | 28 / 34 / 700 | Screen title, one per screen |
| `section` | 20 / 26 / 600 | Group headings |
| `body` | 17 / 24 / 400 | Body, field text, button labels (600) |
| `secondary` | 15 / 20 / 400 | Hints, helper lines, labels (600) |
| `caption` | 13 / 18 / 400 | Step text, small notes |

Field text is never below 16.

## Layout

- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Inside a group 4 to 12; between groups 24 to 32.
- Side padding 20. One column. Respect safe areas.
- Top bar 48 tall: Back at left, step text at right. Title 16 below.
- Bottom bar: sunken fill, 1px top border, padding 12 top, 12 plus safe area bottom, 20 sides. The scroll view reserves its height so the last field and the focused field stay visible. Use `KeyboardAvoidingView`.

## Elevation & Depth

Borders separate things at rest. No shadows on screens. Only a sheet (none in this release) would float.

## Shapes

`radius.control` 10 for fields, buttons and choice chips. `radius.sheet` 12. `radius.badge` 6.

## Components

| Canonical name | Build as | Spec |
| --- | --- | --- |
| Button, primary | `components/ui/Button.tsx` `variant="primary"` | 52 tall, full width, accent fill, white 17/600. Busy: label changes ("Booking...") plus spinner, ignores taps |
| Button, text | `variant="text"` | 48 tall target, accent 17/600, no fill |
| Text input | `TextField.tsx` | Label 15/600 above; field 52 tall, 1px fieldBorder, radius 10, padding 14; focus 2px accent; error 2px danger plus message |
| Textarea | `TextField multiline` | Min 104 tall |
| Radio button group (chips) | `ChoiceGroup.tsx` | Fieldset with legend. Chips 48 tall, min 56 wide, wrap. Selected: 2px accent border, accentTint fill, check icon |
| Code input | `CodeField.tsx` | One field, `textContentType="oneTimeCode"`, `autoComplete="one-time-code"`, numeric keyboard, 6 digits |
| Alert | `Alert.tsx` | dangerTint or successTint fill, icon plus text, stays until resolved |
| Badge | `Badge.tsx` | "Confirmed" with check icon, successTint |
| Progress indicator (text) | `StepText` | "Step 2 of 4", caption, muted |
| Spinner | `ActivityIndicator` | Only with words |
| Skeleton | `Skeleton.tsx` | sunken blocks at the final size |

States for every control: default, pressed, focused, selected, disabled (explained), busy, error.

## Icons

- **Icon set:** Lucide. Proposed (delegated).
- **Style:** line. **Stroke:** 2. **Size:** 20 next to 17 text, 16 next to 15 text.
- **Icon and label spacing:** 8.
- **Icon-only allowed:** close, back. Back also shows the word "Back".
- **Never icon-only:** destructive and uncommon actions.
- **Emoji:** not used.
- **Status:** text plus icon plus color.

## Placement

- **Primary action:** one per screen, full width in the bottom bar.
- **Button order:** a secondary action is a text button above the primary in the bottom bar, or inline in content. Never two filled buttons.
- **Form actions:** bottom bar on every step.
- **Dialog actions:** Modal = React Native `Modal`. Primary names the action ("Sign out"); the text button "Keep editing" sits above it.
- **Destructive actions:** none in this release. Sign out is a text button in S6 content, away from the bottom bar.
- **Status messages:** inline Alert directly above the bottom bar, or under the field it concerns. No toasts.
- **Navigation:** one stack. Back at top left. No tab bar.
- **Profile/account:** S6 only.
- **Selection, focus, errors:** separate cues. Focus is a 2px accent outline offset 2; selected adds a check icon; errors are danger text with an icon.
- **Sticky elements:** the bottom bar never covers the focused field.

## Motion

Platform default stack transitions only. Press feedback 120 ms. Reduced motion: no slide, fade only.

## Imagery and density

No photos, illustrations or logos in this release. Calm density: one task per screen.

## Accessibility

Contrast measured above. Targets 48. Every field has a visible label and an accessible label that matches. Errors are announced and focus moves to the first error on submit. Status changes use a polite live region (`accessibilityLiveRegion="polite"` on Android, `AccessibilityInfo.announceForAccessibility` on iOS). Check at 200% text size.

## ShipRight status

| Token or rule | Status | Source |
| --- | --- | --- |
| All tokens and components above | Proposed (delegated) | D3, intake Q3, 2026-10-13 |
| Brand name, logo | Unknown | Owner (U5) |
