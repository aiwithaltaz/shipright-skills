# 04 - Frontend specification

**Version/date:** 0.1, 2026-10-13  **Sources and approval:** PRD decisions D1-D9, all Proposed (delegated). Tokens: `design/tokens.css`.

## Current phase and allowed screens

**Current phase:** 1, launch page. One route `/`; each section is specified as its own block.
**Excluded / later notes only:** PRD section 4. Do not add these as UI, disabled controls or routes.

| ID | Job | Route | Source |
| --- | --- | --- | --- |
| S0 | Owner checks the look before screens | `/design` | T1 |
| S1 | Header and footer: find sections, contact, legal pages | `/` | D2 |
| S2 | Hero and viewer: know what it is, turn it, start buying | `/` | Owner request, D6, D7 |
| S3 | Specs: check the facts | `/#specs` | D2 |
| S4 | Buy: price, terms, continue to checkout | `/#buy` | D1, D5 |

Content for every block comes from `src/content/product.ts`. Never type a fact into a component.

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S0 Design preview

Shows type sizes, color roles with contrast, spacing scale, primary button (default, hover, focus, disabled), text link, view buttons (default, pressed, focus), status line, a spec row. `noindex`. Done when the owner OKs the look.

## S1 Header and footer

- Skip link "Skip to content", first focusable element.
- Header, not sticky, 64 tall: `name` left (link to top), links "Specs" and "Buy" right. Same at 390.
- Footer: `name`; "Contact" with `contactEmail` as a mailto link; `legalLinks` in the order privacy, terms of sale, returns. Owner-written pages only.
- Missing optional link: not rendered. No invented company line or year.

## S2 Hero and viewer

**Order:** h1 `name` (display) → `sentence` (body; Proposed default "A premium wireless speaker. Turn it to see every side before you buy.") → `price` (h2 size) → "Buy" (primary, to `#buy`) and "See the specs" (text link) → stage.
**Desktop:** text column 460 max, vertically centered; stage from the text column to the window's right edge, height `--stage-height`, no frame. **Under 860:** text first, stage full width below.
**Stage:** still image (`stillImagePath`, `alt="{name}, front view"`) reserves the space and shows first. The canvas fades in over it when ready.
**Under the stage:** caption "Drag or use the arrow keys to turn." Buttons "Front", "Side", "Back", "Top" (`aria-pressed`, group label "Jump to a view") and text button "Reset view".

| State | Visitor sees | Next action |
| --- | --- | --- |
| Loading | Still image; status "Loading the 3D view." | Read, Buy |
| Ready | One intro turn to the rest view, then still | Drag, keys, views |
| Unavailable (no WebGL, context lost) | Still image; "3D view is not available in this browser." View buttons hidden | Read, Buy |
| Failed (model error, or 10 s without ready) | Still image; "The 3D view did not load." and "Try again" | Retry once per press |

**Input:** drag turns (damping 0.08). Wheel and pinch do nothing, so the page scrolls. On touch, sideways drag turns; vertical swipe scrolls (`touch-action: pan-y`). Tilt limited between top view and just below level.
**Keyboard:** the stage wrapper is focusable, `role="application"`, labelled "3D view of {name}". Left and Right turn 15 degrees, Up and Down tilt 10 degrees, Home resets. Dragging clears the pressed view.
**Reduced motion:** no intro turn, instant view jumps, no damping.

## S3 Specs

h2 "Specs". Left: heading (4 of 12 columns). Right: `<dl>` rows, label muted 16, value text 16/500, divider between rows. First row "Connection: Wireless"; others from `specs[]`, filled rows only. Under 860: one column. Long values wrap.

## S4 Buy

Band on `--color-surface`, one centered column, 560 max. h2 "Buy {name}", `price`, `buyNote`, `assuranceLine` (the warranty or returns fact that removes the last doubt), primary "Continue to checkout" (link to `PUBLIC_CHECKOUT_URL`, same tab), meta line "Checkout opens on a secure Stripe page. Its back link returns you here."
Unset checkout URL: no button; text "Checkout opens soon." (launch blocked by the content check).

## Accessibility (all sections)

Headings h1 then h2 in order. Focus ring on every control. Targets 44 or more. Status line `role="status"`, polite, never moves focus. Reflow at 320 without sideways scroll.

## Exact acceptance checks

| Source | Check | Status |
| --- | --- | --- |
| Owner request | Speaker turns by mouse, touch and keyboard on `/` | Not verified |
| D7 | With reduced motion, nothing moves on its own | Not verified |
| D8 | No fact appears that is not in `product.ts` | Not verified |

## Handoff limits

The owner reserves name, price, checkout link, specs, legal pages and the model. Runtime behavior is untested until T9.
