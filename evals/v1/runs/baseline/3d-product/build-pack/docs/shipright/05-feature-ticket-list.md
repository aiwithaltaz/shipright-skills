# 05 - Feature tickets

**Project path:** `docs/shipright/05-feature-ticket-list.md`

**Version/date:** v0.1 draft, 2026-10-13  **Sources and approval:** `docs/shipright/01-prd.md` (D1 to D10), `docs/shipright/04-frontend-spec.md`.

P0 means required for this release.

## Ordered tickets

| ID | Change | Phase / job / screen | Depends on | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| T1 | Create Vite vanilla project; add three.js; pin versions | 1 / all / H-01 | None | Builder | Ready |
| T2 | Add DESIGN.md tokens as CSS custom properties and base styles | 1 / all / H-01 | T1 | Builder | Ready |
| T3 | Page shell: skip link, prototype note, header, hero copy, Specifications, Buy, footer | 1 / J1, J3, J4 / H-01 | T2 | Builder | Ready |
| T4 | 3D viewer with the stand-in speaker: drag to rotate, sizing, render only when on screen | 1 / J2 / H-01 | T3 | Builder | Ready |
| T5 | Viewer access and states: keys, Turn/Reset buttons, loading, unavailable, context lost, reduced motion | 1 / J2 / H-01 | T4 | Builder | Ready (settle turn waits on D6) |
| T6 | Fill confirmed specs | 1 / J3 / H-01 | Owner facts | Owner, then builder | Blocked |
| T7 | Set store URL and price | 1 / J4 / H-01 | Owner facts | Owner, then builder | Blocked |
| T8 | Replace stand-in with the real .glb | 1 / J2 / H-01 | Owner file, D8 | Owner, then builder | Blocked |
| T9 | Page title and meta description with the real name | 1 / J1 / H-01 | Real name | Owner, then builder | Blocked |
| T10 | Remove prototype note, stand-in note and placeholder tokens | 1 / all / H-01 | T6 to T9 | Builder | Blocked |

## Ticket detail

- **T1, P0, D4**
- **Bounded change:** `npm create vite@latest` with the vanilla template. `npm i three`. Pin exact versions. Fonts from Google Fonts.
- **Preserve / do not add:** no framework, router, CMS, analytics or UI kit.
- **Affected screen, state or non-UI job:** project setup.
- **Acceptance checks:** `npm run dev` serves an empty page; `npm run build` makes a static `dist/`.
- **Verification evidence needed:** build output.
- **Open dependency:** none.

- **T2, P0, D3**
- **Bounded change:** CSS variables for every value in DESIGN.md YAML. Base body, heading, link and focus styles.
- **Preserve / do not add:** no colors, fonts, shadows or gradients outside DESIGN.md.
- **Affected screen, state or non-UI job:** H-01 all.
- **Acceptance checks:** every color and size in CSS comes from a variable; focus ring visible on all controls.
- **Verification evidence needed:** CSS review.
- **Open dependency:** none.

- **T3, P0, D1, D2**
- **Bounded change:** build the page structure in 04 "Visible element" table, in that order.
- **Preserve / do not add:** only listed elements. No feature grid, reviews, testimonials, newsletter, finish picker, cart or extra pages. No invented specs or claims.
- **Affected screen, state or non-UI job:** H-01 populated; placeholders; prototype store-link message.
- **Acceptance checks:** heading order h1, h2, h2; DOM order matches visual order; stacks under 860 px; no horizontal scroll at 320 px; Buy section button full width on narrow screens.
- **Verification evidence needed:** screenshots at 1440, 768 and 375 px; keyboard Tab pass.
- **Open dependency:** facts for T6, T7, T9.

- **T4, P0, D5**
- **Bounded change:** viewer per `index.html`: OrbitControls with damping 0.08, no zoom, no pan, polar angle 0.35 to 1.62 rad, FOV 30, camera distance fits the model to the viewer. Stand-in speaker built in code. Pixel ratio capped at 2. Loop paused when off screen (IntersectionObserver).
- **Preserve / do not add:** no auto-rotate loop, no scroll-driven animation, no zoom.
- **Affected screen, state or non-UI job:** H-01 3D ready.
- **Acceptance checks:** drag rotates with mouse and one finger; page scroll works outside the viewer on a phone; model never clips at any viewer size.
- **Verification evidence needed:** desktop and real-phone test.
- **Open dependency:** none.

- **T5, P0, D7 (D6 Proposed)**
- **Bounded change:** keyboard and buttons, states and messages from 04 state table. Animated turns 420 ms, reset 650 ms, ease-out cubic; new requests replace running ones. Settle turn only if D6 is approved.
- **Preserve / do not add:** no toasts; status under its control.
- **Affected screen, state or non-UI job:** loading, ready, unavailable, context lost, reduced motion, JS off.
- **Acceptance checks:** all 04 acceptance rows for D7, fallback and reduced motion.
- **Verification evidence needed:** keyboard pass, screen reader announcement of "View reset.", WebGL disabled test, reduced-motion test.
- **Open dependency:** D6.

- **T6, P0** Spec rows show confirmed values only. Rows the owner does not confirm are removed, not guessed. Check: no "To be confirmed" left.
- **T7, P0** Set store URL in one config constant. Show the confirmed price with currency. Check: link opens the store; Back returns; price matches the store.
- **T8, P0, D8** Load the .glb with GLTFLoader (plus DRACOLoader or Meshopt decoder if compressed). Keep the same camera fit, controls and fallback. Show the loading state until the file loads; show the unavailable state if it fails. Check: file size within D8; loads on a mid-range phone on a slow connection.
- **T9, P1** Title "[Real name] | Wireless speaker" and a description the owner approves. No invented claims.
- **T10, P0** Remove all stand-in labels once T6 to T9 are done. Check: search the built page for "To be confirmed", "Prototype", "Stand-in", "working name".

## Critique follow-up

None yet.
