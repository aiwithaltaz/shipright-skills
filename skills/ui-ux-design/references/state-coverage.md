# UI states and accessibility

Use only states reachable in the approved current phase. Cover affected interactions at every priority, not only P0.

## States

| State | UI requirement |
| --- | --- |
| Empty | Show it where the content would be. Explain what belongs here and offer one existing permitted next action. |
| Loading | Meaningful activity feedback; no fake final data; prevent duplicate submission. |
| Populated/success | Approved structure and next action; confirm meaningful changes without repeated toasts. |
| Error | Plain cause and recovery near affected work; preserve input where possible. |
| Permission denied | Explain access limits and provide an existing exit without exposing protected content. |
| No matches | Keep search criteria editable; clear only those criteria. Do not show first-run onboarding. |
| Partial | Keep successful sections usable and isolate failures. |
| Background work | Truthful task-relevant feedback under F3. |
| Saved unfinished work | Show remaining human work, resume path and known saved state. |
| Selected/focused | Distinct visual and semantic states. Selection never hides the keyboard focus indicator. |

For forms, specify pristine, invalid, submitting, unsaved and submitted states when relevant.
For lists, specify 0/1/many items, selected items and approved pagination/bulk behavior only when those capabilities exist.
A request for "View all" does not authorize new filters, exports or bulk destructive actions.
Clear/reset/remove needs an object, scope, saved effects and recovery. Keep unclear destructive behavior unresolved.

## Flow rules (must pass)

Use [flow-rules.md](../../_shared/flow-rules.md): F1 exit, F2 consistent patterns, F3 useful status.
Do not add a spinner for human work or a permanent badge for routine internal sync.

## Accessibility checks

Use these practical checks against WCAG 2.2 and the relevant native/component pattern. They are not a complete conformance audit.

- Use native buttons, links, inputs and headings. Match visible labels to accessible names; do not use placeholders as labels.
- Associate help and error text with the field. Identify required fields and invalid state in text and semantics.
- Complete the main task by keyboard in a logical order. Keep a visible focus indicator, including on selected controls.
- Keep focused controls clear of sticky headers/footers. WCAG AA prohibits complete obstruction; prefer no obstruction.
- For modal dialogs, move focus inside, contain the Tab sequence, allow Escape and restore focus to the trigger or logical successor.
- A trap means no keyboard route out. Proper modal focus containment with dismissal is not a trap.
- Announce important status without stealing focus. Use polite status updates normally; reserve urgent alerts for urgent failures.
- Measure text contrast: 4.5:1 normally; 3:1 for large text, at least 18pt or 14pt bold.
- Required UI boundaries and meaningful graphics need 3:1 against adjacent colors, subject to WCAG exceptions.
- Pointer targets normally meet 24 by 24 CSS pixels under WCAG 2.2 AA, or a documented applicable exception such as spacing.
- Prefer 44 by 44 targets on touch-heavy screens as a usability goal. Icon size is separate from target size.
- Test text resizing to 200% and reflow at 320 CSS pixels, with justified exceptions for content requiring two dimensions.
- Do not rely on color or hover alone. Selected rows need checkbox/state semantics; errors need text.
- Keep paste and password managers usable. Use suitable input types and autocomplete.
- Respect reduced motion. Decorative images are ignored; meaningful images have useful alternatives.

Use an error summary or focus the first invalid field when helpful after submission. Do not steal focus during ordinary typing.
Prefer readable mobile input text, commonly 16px to avoid browser auto-zoom; this is a usability recommendation, not a WCAG threshold.
Measure the actual rendered color pairs. A screenshot cannot verify names, keyboard order, announcements or persistence.

## Difficult content

Check long/short names, accents, emoji, right-to-left text, no-space strings, missing optional fields and failed images.
Test 0, 1 and many items, long translated labels and large amounts only where the product uses them.
Use wrapping, a bounded scroll region or accessible full-value disclosure. No clipped controls, overlaps or hidden required data.
Record what was actually tried. A proposed test fixture is not a passing runtime result.
Do not turn sensitive phone/email searches into URLs, analytics or logs merely to preserve state.

## Sources

Primary references, checked October 4, 2026:
- [Text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [Focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [Modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
