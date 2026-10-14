# 04 - Frontend specification

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** PRD decisions D1 to D7 (Proposed, delegated). Design values: `DESIGN.md` and `design/tokens.css`. Reference build: `docs/shipright/reference/home-preview.html`, the home page preview delivered with this pack (look not yet approved).

## Current phase and allowed screens

**Current phase:** Release 1, one-page product site.
**Excluded:** see PRD section 4. No cart, accounts, reviews, configurator, FAQ, newsletter, analytics or scroll animation.

| Screen ID | Job | Actor | Route |
| --- | --- | --- | --- |
| S1 Home | J1 inspect, J2 specs, J3 buy | Visitor | `/` |
| S2 Not found | J4 recover | Visitor | `/404` |

## Navigation

| Label | Destination | Notes |
| --- | --- | --- |
| Model 01 (wordmark) | `/` top | Same in footer as plain text |
| Details | `#details` | Hidden at 760 and under; footer keeps it |
| Specs | `#specs` | |
| Buy (outlined) | `storeUrl` | Same destination as every Buy |

## Flow rules (must pass)

<!-- FLOW-EXPORT-START -->
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
<!-- FLOW-EXPORT-END -->

## S1 Home

**Job:** see the speaker from every side, check the specs, go to the store.

**Layout, top to bottom**

1. Sample note (14, muted, rule below). Removed in T9.
2. Header, 72 tall: wordmark left; Details, Specs, outlined Buy right. Not sticky.
3. Hero (min height `100vh - 110px`, 600 to 880): text column left over the calm area: h1 name (display), lead sentence, filled "Buy Model 01" plus text link "See the specifications", inline status. Stage edge to edge behind; model centered on the right 58% anchor. Viewer bar under the model: hint, Front, Side, Back, divider, Reset view, status line.
4. Details `#details`: h2 "Look closer", one sentence, then a 7/5 grid: large top-cap image left spanning two rows; knit close-up and back-plate close-up stacked right. Each: image panel, h3, one sentence.
5. Specs `#specs`: 5/7 grid. Left: h2 "Specifications" and one sentence. Right: native table, row headers. `null` values read "To confirm" in muted.
6. Buy band `#buy`, surface background: h2 "Take Model 01 home", one sentence, filled "Buy Model 01" right with its status line.
7. Footer: wordmark; Details, Specs, Back to top.

**Viewer states**

| State | User sees | Next action |
| --- | --- | --- |
| Still (first paint) | Front still image | View buttons swap stills |
| Loading | Still, status "Loading the 3D view." | Wait or use view buttons |
| Ready | Canvas fades in, one full turn to three-quarter view, hint "Drag or use the arrow keys to turn." | Drag, arrows, Home, buttons |
| Reduced (reduced motion or Save-Data) | Still, "Open 3D view" button | Open 3D view; then turns are instant |
| Unsupported | Still, "This device cannot show the 3D view. Use the buttons to see each side." | View buttons |
| Error | Still, "The 3D view did not load." and Try again | Try again or view buttons |
| Store link missing (preview) | "The store link is not set in this preview. Add it before launch." under the pressed Buy | None for visitors; T9 blocks launch |

F1: header links, normal scroll and Browser Back after the store. Nothing is saved, so nothing is lost. F2: every Buy has one label family and one destination. F3: status lines name only the 3D view; no fake progress percentage.

**Responsive (760 and under):** text, then stage (58vh, 340 to 520), then viewer bar; Buy buttons full width; details and specs stack to one column. 761 to 1100: display 64, text column 360, anchor 54%.

**Difficult content:** names over 16 characters need a decision (two-line limit). Spec values wrap in their cell.

**Accessibility:** one h1, h2 per section, h3 per detail. Canvas `role="img"` with label, tabindex 0 only when Ready, inset focus ring, arrow keys handled only while focused. Still has `role="img"` with the current view in its label. `aria-pressed` on view buttons. Status lines `role="status"`. Skip link to main.

**Copy:** as in the reference build, read from `src/content/product.ts`.
**Do not add:** price, ratings, quotes, logos, badges, newsletter, chat, cookie banner, configurator, scroll animation.

**Acceptance checks**
- At 390 and 1280 wide: no sideways scroll; the model never sits under the hero text.
- Front, Side and Back show the matching side in every viewer state.
- Reduced motion on: no auto-turn, 3D loads only after "Open 3D view".
- Keyboard: Tab reaches Buy, the canvas (Ready only), each view button and Reset view, with a visible ring.
- The front still is the LCP element; CLS under 0.1.

## S2 Not found

**Job:** recover from a wrong link.
**Layout:** header as S1 (without the sample note after T9); h1 "This page does not exist"; sentence "The address may be mistyped or out of date."; filled "Go to the Model 01 page" linking to `/`; footer.
**States:** single static state. **Responsive:** one column; button full width at 760 and under.
**Accessibility:** one h1, the button is a link. **Do not add:** search, suggestions, the 3D viewer.
**Acceptance:** an unknown path returns status 404 with this page; the button returns to `/`.

## Handoff limits

The reference build `index.html` shows look and layout. It does not prove frame rate, keyboard behavior on real devices or the final model. Those are checked in T8 on the built site.
