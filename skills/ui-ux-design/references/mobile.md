# Mobile screens and form flows

Load for a phone app, a phone-first web flow, or any screen whose main use is on a phone.
Follow the platform: iOS Human Interface Guidelines and Material 3 conventions where they differ. A web app on a phone follows the browser.

## Layout

- Design at 390 by 844 first, then check 360 and 430 widths. Nothing scrolls sideways.
- One column. Side padding 16 to 20. Respect safe-area insets on top and bottom bars.
- Back sits at the top left. The primary action sits at the bottom in a bar, full width, within thumb reach.
- A sticky bottom bar reserves its height so the last field and the focused field stay visible above it and above the keyboard.
- Use a tab bar only for three to five top-level destinations. Otherwise use a single stack with back.
- Sheets for short side tasks; a full screen for anything with more than about three fields.

## Forms

- One question group per screen when the flow is long; a single scrolling form when it is short. Show "Step 2 of 4" when there are steps, and allow going back without losing input.
- Visible labels above fields. Placeholders show an example, never the label.
- Use the right input type and keyboard: `email`, `tel`, `inputmode="numeric"`, dates with the native picker. Turn on autofill (`autocomplete` names). Never block paste.
- Validate on leaving a field or on submit, not on every keystroke. The error sits under the field in text, and focus moves to the first error on submit.
- Field text 16 or larger. Touch targets 44 or larger; 48 is better.
- Ask only for what this release needs. Account creation can come after value is shown, when the flow allows it.
- Summarize before a commitment that costs money or books time: what, when, where, price if known, and how to change it.

## Feedback

- Disable the primary button only while submitting, and say why ("Booking..."). Prevent a double submit.
- After success, show what happened and what comes next on the same screen or the next one, not only in a toast.
- Network failure keeps the input and offers Try again. Say what was not saved.
- Offline or slow: show it once near the affected action, not as a permanent banner.

## Check before handoff

Screenshot at 390 wide. Check: one primary action visible without hunting, labels on every field, nothing clipped by the bottom bar, keyboard does not hide the active field, back works without data loss.
