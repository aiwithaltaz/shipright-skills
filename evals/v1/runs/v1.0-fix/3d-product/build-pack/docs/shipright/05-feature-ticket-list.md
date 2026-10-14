# 05 - Feature tickets

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** PRD D1 to D7 (Proposed, delegated). Screens S1 and S2 in `04-frontend-spec.md`.

Paste one ticket at a time into Cursor. It finishes, reports and stops. Standing rules live in `docs/shipright/build-rules.md`; tickets do not repeat them.

## Order

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | Tokens, fonts, base styles | - |
| T2 | Shell, content file and Not found | Header, footer, S2 | T1 |
| T3 | Home page content with still images | S1 without 3D | T2 |
| T4 | 3D viewer: model, placement, input | S1 hero | T3 |
| T5 | Viewer states and performance guards | S1 hero | T4 |
| T6 | Signature turn and fade-in | S1 hero motion | T5 |
| T7 | Swap in the real model and stills | Asset | T6 and the owner's file |
| T8 | QA pass | S1, S2 | T7 or T6 |
| T9 | Launch check | Content, ship-check | T8 |

## Tickets

```text
T1. Foundation and /design preview          Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The owner can open /design and approve the look before any page is built.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css.
Build:
1. Create an Astro project with TypeScript (current stable versions). Add three as a dependency; do not use it yet.
2. Keep design/tokens.css as the only token source. Import it in src/styles/base.css with the body, link, focus and .container rules from docs/shipright/reference/home-preview.html.
3. Load Manrope 400, 500, 700 from Google Fonts with display=swap.
4. Create src/pages/design.astro: color swatches with token names and hex, the five type sizes with sample lines, the spacing scale as bars, the primary button, the outlined button (default and aria-pressed), a text link, focus rings, the inline status line, a two-row spec table.
5. Exclude /design from the production build (dev only).
Do not add: any page section, the 3D viewer, Tailwind, a UI library.
Done when:
- npm run dev serves /design with no console errors.
- Every value on /design comes from a token; grep finds no raw hex in src/ outside tokens.css.
- Tab shows a visible accent ring on every control.
Stop: Do not start T2. Reply with changed files and a /design screenshot at 1280 and 390 wide for the owner's OK.
---
```

```text
T2. Shell, content file and Not found          Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: Every page shares one header and footer, and all product facts live in one file.
Read first: docs/shipright/build-rules.md, DESIGN.md (Placement), 04-frontend-spec.md (Navigation, S2), 02-technical-architecture.md (Content and data).
Build:
1. src/content/product.ts with the fields in 02 "Content and data". name "Model 01", storeUrl "", spec values null except Type "Wireless speaker". Mark sample fields isSample: true.
2. src/layouts/Base.astro: skip link, sample note ("Preview with sample content..." from the reference), header (wordmark, Details, Specs, outlined Buy), main slot, footer (wordmark, Details, Specs, Back to top).
3. Buy link component: href = storeUrl. When storeUrl is empty, clicking writes "The store link is not set in this preview. Add it before launch." into the role="status" line under it and does not navigate.
4. src/pages/404.astro per S2.
States: storeUrl empty and set.
Do not add: sticky header, mobile menu, language switch.
Done when:
- At 390 wide "Details" hides in the header and stays in the footer; nothing scrolls sideways.
- An unknown path serves the 404 page; its button returns to /.
Stop: Do not start T3. Reply with changed files, decisions and how you checked.
---
```

```text
T3. Home page content with still images          Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A visitor reads the whole home page and sees the speaker from front, side and back, without 3D yet.
Read first: docs/shipright/build-rules.md, DESIGN.md, 04-frontend-spec.md (S1), docs/shipright/reference/home-preview.html.
Build:
1. src/pages/index.astro with sections in the S1 order: hero, #details, #specs, #buy.
2. Hero grid as in the reference: text column, full-width stage, model-anchor (right 58%), viewer bar. Copy from product.ts.
3. Still images: move the three inline SVG drawings from the reference into src/components/SpeakerStill.astro. The front still renders in the HTML. Front, Side, Back swap stills and set aria-pressed; Reset view returns to Front.
4. Details grid and figures, spec table (null renders "To confirm"), buy band.
States: storeUrl empty; spec value null.
Do not add: price, FAQ, ratings, icons, scroll animation.
Done when:
- 390 and 1280 wide match the reference layout; no sideways scroll; the drawing never sits under the hero text at 761 to 1100.
- Lighthouse shows the front still as the LCP element.
- Keyboard reaches every link and view button in reading order.
Stop: Do not start T4. Reply with changed files, decisions and how you checked.
---
```

```text
T4. 3D viewer: model, placement, input          Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A visitor can turn the speaker with a drag, the arrow keys or the view buttons.
Read first: docs/shipright/build-rules.md (3D rules), 02-technical-architecture.md (3D viewer module), the createViewer function in docs/shipright/reference/home-preview.html.
Build:
1. src/scripts/viewer.ts, started from index.astro after the load event in idle time. Dynamic import of three and RoomEnvironment.
2. Port the placeholder model, lights, tone mapping and the setViewOffset placement on #model-anchor from the reference.
3. Input: pointer drag with damping (horizontal only on touch), arrow keys turn 15 degrees and tilt, Home resets; Front, Side, Back and Reset view turn by the shortest way. No wheel zoom.
4. Canvas: role="img", aria-label, tabindex 0 when ready, hint text "Drag or use the arrow keys to turn."
5. Render on demand: frames run only while turning.
Do not add: OrbitControls zoom or pan, post-processing, bloom, a second scene.
Done when:
- The model sits centered on the anchor at 390, 1024 and 1280 wide and stays there after resizing.
- A vertical swipe on the canvas on a phone scrolls the page.
- The GPU is idle (no frames) 1 second after the last input, checked in the Performance panel.
Stop: Do not start T5. Reply with changed files, decisions and how you checked.
---
```

```text
T5. Viewer states and performance guards          Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: Every visitor sees the speaker, whatever their device or settings.
Read first: docs/shipright/build-rules.md (3D rules), 04-frontend-spec.md (S1 Viewer states).
Build:
1. A data-viewer attribute on the hero with states still, loading, ready, reduced, unsupported, error, and the exact status texts from the spec.
2. Reduced motion or Save-Data: do not auto-load; show "Open 3D view". After opening, turns are instant.
3. No WebGL: unsupported state. Import or setup failure: error state with Try again.
4. Still and canvas: only the visible one is exposed to assistive tech.
5. IntersectionObserver and visibilitychange pause; dispose on pagehide; pixel ratio cap 2 (1.5 on phones), drop to 1 when average frame time passes 34 ms.
Do not add: spinners with percentages, toasts, a retry loop.
Done when:
- Each state can be forced (DevTools: reduced motion, WebGL disabled, blocked three.js request) and shows the spec text and controls.
- View buttons work in every state.
Stop: Do not start T6. Reply with changed files, decisions and how you checked.
---
```

```text
T6. Signature turn and fade-in          Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: When the 3D view first appears, the speaker turns once so the visitor sees every side.
Read first: DESIGN.md (Motion), the intro code in docs/shipright/reference/home-preview.html.
Build:
1. Canvas fades in over --duration-fade; the still fades out.
2. One full turn from the current view, settling at three-quarter view, over --duration-turn with ease-out cubic. Played once per page load.
3. Any drag, key or button stops the turn at its current angle and takes over.
4. Not played under reduced motion.
Do not add: auto-rotation loops, scroll-linked rotation, sound.
Done when:
- The turn plays once and stops cleanly when interrupted.
- With reduced motion on, nothing moves until the visitor acts.
Stop: Do not start T7. Reply with changed files and how you checked.
---
```

```text
T7. Swap in the real model and stills          Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The site shows the real speaker, within budget.
Read first: docs/shipright/build-rules.md (3D rules), 02-technical-architecture.md (Performance budgets).
Build:
1. If public/models/ holds no owner-supplied model, stop and say so.
2. Compress to .glb with Draco or Meshopt and KTX2 textures (gltf-transform). Load with GLTFLoader plus the matching decoders. Remove the placeholder geometry.
3. Render front, side and back stills from the model at 2x, export AVIF and WebP; replace the SVG stills; keep the alt texts.
4. Match the model scale so it fills the anchor as the placeholder did.
Do not add: hotspots, annotations or finish switching.
Done when:
- Model under 3 MB, textures under 2 MB, under 100 draw calls, triangles within budget (log them).
- 60 fps on desktop and 30 fps or better on a mid-range phone while turning.
Stop: Do not start T8. Reply with sizes, counts and how you checked.
---
```

```text
T8. QA pass          Size: one sitting   After: T7 (or T6 if the model is not ready)
Paste this into your coding tool:
---
Goal: The site works by keyboard, on phones and with motion off.
Read first: docs/shipright/build-rules.md, 04-frontend-spec.md (all acceptance checks).
Build:
1. Run every S1 and S2 acceptance check at 320, 390, 1024 and 1280 wide. Fix failures inside the current scope.
2. Measure contrast of every text pair on the page.
3. Lighthouse mobile: LCP, CLS, total blocking time. Record numbers.
4. Run the project's checks, or node scripts/check-ui.mjs on the built page if the ShipRight pack is available.
Do not add: new sections or features to fix a check.
Done when:
- Every acceptance check is Pass, or Fail with a reason and a proposed fix.
Stop: Do not start T9. Reply with a Pass/Fail table, numbers and what you could not check.
---
```

```text
T9. Launch check          Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: Nothing sample or unconfirmed reaches the live site.
Read first: docs/shipright/01-prd.md (Open questions), src/content/product.ts.
Build:
1. Add a build step that fails while any field has isSample: true, storeUrl is empty or a spec value is null.
2. Remove the sample note once that step passes.
3. List every open question from the PRD with its current answer or "still open".
Do not add: legal text. Footer legal links only if the owner supplies the pages.
Done when:
- npm run build fails with sample content and passes with the owner's final content.
Stop: Do not deploy. Reply with the open-questions list for the owner, who decides on launch.
---
```
