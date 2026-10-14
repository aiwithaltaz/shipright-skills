# 04 - Frontend specification

**Project path:** `docs/shipright/04-frontend-spec.md`

**Version/date:** v0.1 draft, 2026-10-13  **Sources and approval:** `docs/shipright/01-prd.md` decisions D1 to D10. Visual reference: `index.html` prototype (2026-10-13).

## Current phase and allowed screens

**Current phase:** 1, product home page.
**Excluded / later notes only:** cart, checkout, payment, accounts, reviews, ratings, testimonials, finish picker, newsletter, waitlist, chat, comparison, extra pages, analytics.

| Screen ID | Job | Actor | Phase | Source |
| --- | --- | --- | --- | --- |
| H-01 | Understand the speaker, turn it in 3D, check facts, go to the store | Visitor | 1 | Owner request; D1, D2 |

## Navigation

| Label | Approved destination | Actor / phase | Active treatment |
| --- | --- | --- | --- |
| Model 01 (wordmark) | `#top` | Visitor / 1 | None |
| Specs | `#specs` | Visitor / 1 | None |
| Buy | `#buy` | Visitor / 1 | None |
| Buy on our store | Owner's store URL (Unknown) | Visitor / 1 | None |

Profile/account home: none. No notifications.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## Per-screen specification

**Screen ID / job / source:** H-01 Home / J1 to J4 / owner request, D1, D2, D7.
**Keep/remove/change/add:** Add a 3D model the visitor can rotate (owner request). No other feedback yet.

| Visible element | User purpose | Current-phase source | Placement / component |
| --- | --- | --- | --- |
| Skip link "Skip to 3D view" | Keyboard users reach the viewer fast | Accessibility floor | First focusable element; Skip link |
| Prototype note | Says which content is placeholder | D3, D5 | Top strip; Prototype note. Remove at launch (T10) |
| Wordmark "Model 01" | Name, back to top | D3 | Header left; text link |
| "Specs" link | Jump to facts | J3 | Header right; text link |
| "Buy" button | Jump to Buy section | J4 | Header right end; Primary button |
| Eyebrow "Wireless speaker" | Product type | Owner request | Hero, above h1 |
| h1 product name | What this is | D3 | Hero |
| Lede "See it from every side before you buy. Drag the speaker to turn it." | Explains the viewer | Owner request | Hero, under h1 |
| "See the specs" link | Path to facts | J3 | Hero, under lede |
| 3D viewer | Turn the speaker | Owner request, J2 | Hero right (wide) or under copy (narrow) |
| Help text "Drag to turn. When the view is focused, use the arrow keys." | How to use it | J2 | Under viewer, left |
| Turn left, Turn right, Reset view | Non-drag and keyboard rotation | D7 | Under viewer, right; Secondary buttons |
| Stand-in note | Says the model is not final | D5 | Under viewer controls. Remove with T8 |
| h2 Specifications + spec list | Key facts | J3 | Section 2 |
| h2 "Buy Model 01", price, store note, "Buy on our store" | Go to the store | J4, D1 | Section 3 |
| Footer | Ends the page | D2 | Bottom. Legal links only after D10 |

**Structure and reading order:** prototype note, header, hero (copy, then viewer, help, controls, stand-in note), Specifications, Buy, footer. DOM order matches visual order at every width.
**Sizing and alignment:** tokens from `DESIGN.md`. 1200 px container. 5:7 grid on wide screens. Viewer fills its column; height rules in DESIGN.md Layout.
**Actions:**
- "Buy" (header): scrolls to `#buy`. No other effect.
- "Buy on our store": opens the store URL in the same tab. Browser Back returns.
- "Turn left" / "Turn right": rotate 22.5 degrees around the vertical axis. Repeated presses add up from the latest target, no queue.
- "Reset view": returns to the default angle; announces "View reset."
- Drag on viewer: rotates. No zoom, no pan.
**Exit and saved work:** No saved work on this page. The header and browser Back are the exits. The store is outside this site.

| Reachable state / trigger | User sees | System effect | Next action / exit | Evidence needed |
| --- | --- | --- | --- | --- |
| 3D loading (page load) | "Loading 3D view" with an indeterminate bar inside the viewer | three.js and model load | Wait, or scroll to specs and Buy, which already work | Runtime check on slow network |
| 3D ready | The speaker, lit, at the default angle. Optional settle turn (D6) | Render loop runs while viewer is on screen | Drag, buttons, arrow keys | Runtime check |
| 3D unavailable (no WebGL, script fails, file fails) | Front drawing of the speaker and "The 3D view can't run in this browser. The specs and Buy link below still work." plus "Go to the specs" | Turn buttons and help text hidden; viewer leaves tab order | Specs, Buy | Test with WebGL disabled |
| 3D stopped (WebGL context lost) | Same drawing and "The 3D view stopped working. Reload the page to try again..." | Render loop stops | Reload, specs, Buy | Simulate context loss |
| Viewer off screen | Nothing | Render loop pauses | Scroll back | Performance trace |
| Reduced motion on | Same page | Turns and reset jump; settle turn off; loading bar static | Same | Test with OS setting |
| Fact unconfirmed | Dashed "To be confirmed" token | None | None | Remove when confirmed |
| Store link not set (prototype only) | "Prototype: the store link isn't set yet, so this button doesn't open a store." under the button | Click blocked | None. Must be fixed before launch | Not allowed at launch |
| JavaScript off | Fallback drawing and text; specs and Buy work | None | Specs, Buy | Test with JS off |

No empty, no-match, permission or partial states apply: the page has no lists, search or access rules.

**Responsive behavior:** under 860 px, all grids stack to one column. Viewer height 340 to 520 px so the page can scroll above and below it. Buy button becomes full width. Under 420 px, turn and reset buttons share one row and may wrap. No sticky elements.
**Difficult content:** long product names wrap in h1 (no truncation). Long spec values wrap (`overflow-wrap: anywhere`). Long prices with currency wrap. Up to about 8 spec rows fit without layout change; more rows need an owner decision on grouping.
**Accessibility:**
- Viewer: `tabindex="0"`, `role="group"`, `aria-roledescription="3D viewer"`, label "Model 01 speaker, 3D view", described by the help text. Arrow keys turn and tilt; Home resets. Keys act only when the viewer itself has focus.
- Turn and reset buttons are native buttons with text, 44 px high (WCAG 2.2 2.5.7 alternative to dragging).
- Canvas is `aria-hidden`. The fallback drawing has `role="img"` and a label.
- Status: loading text and "View reset." use `role="status"`. No focus moves.
- Contrast pairs in DESIGN.md. Focus ring 2 px accent.
- Reflow at 320 px wide with no horizontal scroll. Text resize to 200%.
- Touch: one-finger drag rotates only inside the viewer; the viewer never covers the whole screen height.

## Design system

**Mode:** Establish (delegated, Q3).
**Source:** `DESIGN.md` at the project root.
Use the values there. They are a stand-in until the brand arrives. Proposed items (D6) stay labeled.

## Exact acceptance checks

| Feedback/source | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| Owner: rotatable 3D model | Dragging with mouse rotates the model in both directions | Not verified | Spec defined; test built page |
| Owner: rotatable 3D model | One-finger drag rotates on a phone; page still scrolls outside the viewer | Not verified | Test on a real phone |
| D7 | Turn left/right turn by 22.5 degrees; Reset view returns to default and announces it | Not verified | Keyboard and screen reader test |
| D7 | With viewer focused, arrow keys turn and tilt; Tab moves on normally | Not verified | Keyboard test |
| D1 | "Buy on our store" opens the store URL; Back returns | Not verified | Blocked on store URL |
| D2 | No cart, reviews, finish picker, newsletter, chat or extra pages exist | Pass at specification and prototype stage | Inspect built page |
| Fallback | With WebGL off, drawing and message show; specs and Buy work | Not verified | Test with WebGL disabled |
| Reduced motion | No animated turns or settle turn | Not verified | Test with OS setting |
| Launch | No "To be confirmed" token, prototype note or stand-in note remains | Fail (expected now) | Needs owner facts (T6 to T10) |

## Handoff limits

Reserved for the owner: name, price, store URL, specs, 3D file, brand, D6, D8, D9, D10.
The prototype `index.html` was not rendered or tested in a browser by the author. Visual fit, keyboard behavior and performance are Not verified.
Next stage: build T1 to T5 in Cursor, then test the checks above.
