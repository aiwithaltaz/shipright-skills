# 04 - Frontend specification

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** PRD D1-D5, Proposed (delegated). Design system: `DESIGN.md` and `design/tokens.css`.
A rendered reference of S1 ships with this pack as `index.html` (one file, placeholder model, preview copy).

## Current phase and allowed screens

**Current phase:** Release 1, home page.
**Excluded / later notes only:** see PRD section 4. No cart, accounts, reviews, newsletter, color picker.

| Screen ID | Job | Actor | Route |
| --- | --- | --- | --- |
| S0 | Owner checks the look before screens are built | Owner | `/design` (noindex, unlinked) |
| S1 | J1 inspect, J2 specs, J3 buy | Visitor | `/` |
| S2 | Recover from a wrong address | Visitor | 404 |

## Navigation

| Label | Destination | Active treatment |
| --- | --- | --- |
| Model 01 (name) | `/` top | none |
| Specs | `/#specs` | none (one page) |
| Buy | `/#buy` | none |

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S0 Design preview

Job: the owner approves the look before T2. One page, top to bottom: color roles with hex and contrast; type ramp; spacing bars; primary button, text link, view toggle group in every state, Reset view; status line with the loading and failed copy from S1.2; one spec row with a value and one with "To confirm". Exit: name link to `/`.

## S1 Home

Visible elements, all traced to J1-J3: header, hero copy, viewer, viewer bar, specs, buy section, footer. Nothing else.

### S1.1 Header

Height 64 (56 phone), static, not sticky. Name "Model 01" left (link to top), 17/600. Right: text links "Specs", "Buy", 14/500, 44 tall targets. Phone: same, links stay visible (two fit at 390).
Preview builds only: a 36-tall note above the header on `--color-raised`: "Preview with a working name and a placeholder 3D model. Specs, price and the store link are still to come."

### S1.2 Hero and viewer

Desktop layout: section height `--hero-height`, full bleed. Canvas covers the section. Copy column left, 5 of 12 columns, vertically centered: h1 "Model 01" 80/600; lead 20/400, max 30 characters per line: "A premium wireless speaker. Turn it around and see every side before you buy."; actions row: filled "Buy" link to `#buy`, text link "See the specs" to `#specs`. Price line under the lead only when `price` is set: "{amount} {currency}".
Still stage: from 44% to 97% of the section width, 40 from the top to 112 from the bottom. The model is framed in this box at 80% of its height (camera view offset matches the box center).
Viewer bar, 28 above the section bottom, inside the container: label "View" then toggle group Front, Side, Back, Top; outline button "Reset view"; status line; hint at the right end: "Use the buttons to see each side." while the still shows, "Drag or use arrow keys to turn." once 3D is ready.

Phone (under 760): copy first (h1 44, full-width Buy, text link under it), then viewer box 400 tall full width, then the bar wrapping onto two lines. No view offset.

| State / trigger | Visitor sees | System effect | Next action |
| --- | --- | --- | --- |
| First paint | Still SVG of the 3/4 front view | Nothing heavy loaded | Read, scroll, view buttons swap stills |
| Loading 3D | Status "Loading 3D view" | Viewer code and model load after `load` and idle | Same |
| Ready | Canvas fades in, turns once from the side into the 3/4 view | Still hidden from assistive tech | Drag, keys, view buttons |
| Free view after drag | No view button pressed | Render on demand | Reset view |
| No WebGL | Still with buttons; status "3D view is not available in this browser. The buttons show each side." | No 3D code | View buttons |
| Reduced motion or data saver | Still; outline button "Open 3D view" in the bar | 3D loads on press; no turn-in; view changes instant | Open 3D view |
| Load failed or context lost | Still returns; danger text "3D view could not load. Still views still work."; button "Try again" | Canvas disposed | Try again, view buttons |
| Off screen or tab hidden | Nothing visible changes | Rendering paused | Return |

Accessibility: canvas `tabindex="0"`, `role="img"`, label "3D model of the Model 01 speaker. Use the arrow keys to turn it."; Left/Right turn 20 degrees, Up/Down tilt 10 degrees, Home resets; arrows do not scroll the page while the canvas has focus. Focus ring inset 4 so it stays visible at the section edge. Toggle group uses `aria-pressed`. Status line `role="status"`. Touch: `touch-action: pan-y`, horizontal drag turns, vertical swipe scrolls.

### S1.3 Specs (`#specs`)

Two columns desktop: left 5 columns, a line drawing of the speaker's side with height and width dimension lines, labels in HTML ("Height", "Width") plus the value or "To confirm". Right 7 columns: h2 "Specs", one sentence "Exact figures for Model 01.", then a `<dl>` with rows 56 tall, 1px border between: Connection, Battery, Size, Weight, Finishes, In the box. Value right column, tabular figures.
Preview: `null` values show "To confirm" in muted text. Production: a `null` row is hidden; the build check fails if any is `null` (T9).
Phone: heading and list first, drawing after.

### S1.4 Buy (`#buy`)

Band on `--color-surface`, radius 12, inside the container. Left: h2 "Buy Model 01", sentence "Buy opens the Model 01 store, where you check out." `<dl>` in one row of three: Price, Delivery, Returns. Under it the filled "Buy Model 01" link to `storeUrl`, same tab. Right: the front still SVG, 280 tall.
If `storeUrl` is `null` (preview only): pressing shows status "The store link is not connected yet." and nothing else happens.
Phone: one column, drawing hidden, button full width.
Heading has `tabindex="-1"` so the hero "Buy" link moves focus here.

### S1.5 Footer

Name, contact email when supplied, legal links when supplied. No invented legal pages. Preview shows "Contact and legal links appear here once supplied."

Difficult content: a name up to 24 characters stays on two lines at 44 px; spec values up to 80 characters wrap within their cell; missing price hides the line.

Do not add: icon cards, testimonials, ratings, press logos, newsletter, cookie banner, color picker, zoom, auto-rotation.

## S2 Not found

Header and footer as S1. h2-sized h1 "This page does not exist." Text link "Back to Model 01" to `/`. No search.

## Exact acceptance checks

| Source | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| Request | Model turns by drag at 1280 and 390, and by arrow keys | Not verified | T4, T9 on the built site |
| Request | Still view and view buttons work without WebGL | Not verified | T5 |
| Motion rules | Reduced motion: no turn-in, no entrances, instant view changes | Not verified | T6 |
| PRD J3 | Buy opens `storeUrl` in the same tab | Not verified | Needs `storeUrl` from owner |

## Handoff limits

Copy, specs, price and the model are Unknown or placeholder. The preview `index.html` is a visual reference, not the production code.
