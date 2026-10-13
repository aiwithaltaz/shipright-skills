# 05 - Feature tickets

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** PRD D1-D7, frontend spec S0-S2. Paste one ticket at a time into Cursor. Each one ends with a report and a stop.
Standing rules live in `docs/shipright/build-rules.md`; tickets do not repeat them.

## Order

| ID | Ticket | Screen or capability | After |
| --- | --- | --- | --- |
| T1 | Foundation and `/design` preview | S0 | none |
| T2 | Shell, content file, 404 | S1.1, S1.5, S2 | T1 |
| T3 | Home sections with still views | S1.2 to S1.4 | T2 |
| T4 | 3D viewer, happy path | S1.2 | T3 |
| T5 | Viewer states and fallbacks | S1.2 | T4 |
| T6 | Motion | S1 | T5 |
| T7 | Buy link and price | S1.2, S1.4 | T3, needs owner facts |
| T8 | Final model swap | S1.2 | T5, needs owner model |
| T9 | QA pass and production guard | All | T6 |
| T10 | Launch check | All | T9 |

## Tickets

```text
T1. Foundation and /design preview            Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The owner can open /design and approve the look before any page is built.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/04-frontend-spec.md (S0).
Build:
1. Create a Next.js App Router project with TypeScript, Tailwind CSS and output: 'export'.
2. Import design/tokens.css in app/layout.tsx. Map every token into the Tailwind theme (colors, font sizes, spacing, radius).
3. Load Manrope 400, 500, 600, 700 with next/font/google and set it as --font-sans.
4. Base styles: body on --color-bg, text --color-text, 17px body; global :focus-visible ring 2px --color-focus, offset 2px.
5. Route /design, robots noindex, built exactly as S0 in 04-frontend-spec.md.
Do not add: any home page content, 3D code, icons.
Done when:
- /design shows every token once; Tab reaches every control with a visible ring.
- No raw hex or px values outside tokens.css.
- npm run build produces a static out/ folder.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked. Then wait for the owner's OK on the look.
---
```

```text
T2. Shell, content file, 404            Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: Every page has the header and footer, and all product facts come from one file.
Read first: build-rules.md, DESIGN.md, 02-technical-architecture.md (Data), 04-frontend-spec.md (S1.1, S1.5, S2).
Build:
1. content/product.ts with the typed fields in 02 (Data). name "Model 01"; sentence "A premium wireless speaker. Turn it around and see every side before you buy."; spec labels Connection, Battery, Size, Weight, Finishes, In the box with value null; buying labels Price, Delivery, Returns with null; storeUrl, price, modelUrl null.
2. Header: name link left; "Specs" and "Buy" links right, 44 tall. Static, not sticky.
3. Preview note above the header when NEXT_PUBLIC_PREVIEW=true, copy from S1.1.
4. Footer per S1.5. Show contact and legal links only when set.
5. app/not-found.tsx per S2.
6. Metadata: title from name; description from sentence.
Do not add: extra nav items, social links, legal pages.
Done when:
- Header and footer fit at 390 and 1280 without sideways scroll.
- Unknown route shows S2 with a working link home.
- Turning preview off hides the note.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T3. Home sections with still views            Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A visitor can read the home page, see the speaker from four sides as stills, check specs and reach Buy, with no 3D yet.
Read first: build-rules.md, DESIGN.md, 04-frontend-spec.md (S1.2 to S1.4). Use index.html in the pack as a visual reference only.
Build:
1. components/viewer/StillView.tsx: SVG stills for 3/4 front, Front, Side, Back, Top, framed in the still stage box from S1.2.
2. Hero copy, actions ("Buy" to #buy, "See the specs" to #specs) and viewer bar (View: Front, Side, Back, Top; Reset view; hint). Buttons swap stills and set aria-pressed.
3. Specs section with the side line drawing and dimension labels, and the dl from content.
4. Buy section band per S1.4. Hero Buy moves focus to its heading.
5. Phone order under 760: copy, viewer box 400 tall, bar, then sections.
States: null values show "To confirm" in preview only.
Do not add: icon cards, testimonials, FAQ, price text when price is null.
Done when:
- 1280 and 390 match the spec layout; no sideways scroll.
- Keyboard reaches every link and view button in reading order.
- The still is the LCP element in Lighthouse.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T4. 3D viewer, happy path            Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A visitor turns the speaker by drag, arrow keys and the view buttons.
Read first: build-rules.md, 02-technical-architecture.md (3D architecture, budgets), 04-frontend-spec.md (S1.2).
Build:
1. Install three, @react-three/fiber, @react-three/drei. components/viewer/Viewer.tsx loaded with next/dynamic, ssr false, after window load and idle.
2. PlaceholderSpeaker.tsx: elliptical body (lathe, z scale 0.77) in light fabric, aluminum top cap, thin brass seam ring, dark foot, small rear panel. Match index.html.
3. Lighting: drei Environment preset "apartment" or a RoomEnvironment PMREM, plus one key directional light; ACES tone mapping; soft contact shadow.
4. Canvas over the full hero; set camera view offset so the model centers in the still stage box at 80% of its height. Canvas fades in, then the still gets aria-hidden.
5. OrbitControls: damping, no zoom, no pan, polar 0.12 to 1.75 rad, touch-action pan-y.
6. Keys on the focused canvas: Left/Right 20 degrees, Up/Down 10 degrees, Home resets. View buttons and Reset view move the camera over 700 ms.
7. frameloop demand; pause off screen and in hidden tabs; dpr max 2 (1.5 under 768).
Do not add: zoom, auto-rotate, hotspots, color picker.
Done when:
- Drag, keys and all five buttons work at 1280 and 390; vertical swipe scrolls on a phone.
- Idle page renders no frames (Performance panel).
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T5. Viewer states and fallbacks            Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: The page always shows the speaker, even when 3D cannot run.
Read first: build-rules.md, 04-frontend-spec.md (S1.2 state table).
Build:
1. Status line with role="status" in the viewer bar. Copy exactly as in the S1.2 state table.
2. No WebGL: skip loading the viewer; keep stills and buttons.
3. Reduced motion or navigator.connection.saveData: keep stills; show "Open 3D view" outline button; load on press, then focus the canvas.
4. Load error or webglcontextlost: dispose the canvas, show the still, danger text and "Try again" which reloads the viewer.
5. Frame drop: if the average frame time stays above 24 ms for 30 frames while moving, set dpr to 1.
Do not add: spinners with percentages, retries without a press.
Done when:
- Each state can be forced (Chrome rendering flags, emulate reduced motion, WEBGL_lose_context) and shows its copy.
- Focus never jumps when status text changes.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T6. Motion            Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: The page has one signature move and quiet entrances, and is fully still under reduced motion.
Read first: build-rules.md, DESIGN.md (Motion table).
Build:
1. Install gsap and lenis. All motion inside gsap.matchMedia() with (prefers-reduced-motion: no-preference).
2. Turn-in: the first time the model is ready, turn from 90 degrees to the start angle over 1.6 s, ease-out. Once per page load.
3. Section entrances on #specs and #buy: heading, text, media, 75 ms stagger, rise 20 px, once. Content stays visible if scripts fail.
4. Lenis on / only, driven from the GSAP ticker. Anchor links scroll through Lenis and move focus to the target heading.
Do not add: pinned sections, scroll-driven rotation, parallax, text splitting.
Done when:
- With reduced motion emulated, nothing moves and all content shows.
- Dragging during the turn-in interrupts it without a jump.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T7. Buy link and price            Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: Buy Model 01 opens the owner's store page, and the price shows only when confirmed.
Read first: build-rules.md, 04-frontend-spec.md (S1.2, S1.4), content/product.ts.
Blocked only by owner facts: storeUrl, price and currency, delivery and returns text. Do not invent them.
Build:
1. Buy Model 01 is a plain link to storeUrl, same tab.
2. storeUrl null in preview: the link is a button that shows "The store link is not connected yet." in the buy section status line.
3. Price line under the hero lead and in the buy dl when price is set; format with Intl.NumberFormat for the given currency.
Do not add: cart, checkout, payment SDKs, currency switcher.
Done when:
- With storeUrl set, pressing Buy Model 01 opens it; Back returns to the page at the buy section.
- With price null, no price text appears anywhere.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T8. Final model swap            Size: one sitting   After: T5, needs the owner's model
Paste this into your coding tool:
---
Goal: The viewer shows the real speaker inside the budgets.
Read first: build-rules.md, 02-technical-architecture.md (budgets).
Build:
1. Put the owner's file in public/models/. Run gltf-transform: weld, simplify to under 300k triangles, Meshopt or Draco, KTX2 textures.
2. Set modelUrl in content; load with useGLTF and preload after first paint. Center and scale to the same frame as the placeholder.
3. Redraw the SVG stills from the real model (render once, trace or export SVG/WebP), same framing.
Do not add: hotspots, finish picker, AR.
Done when:
- Model under 3 MB, textures under 2 MB, under 100 draw calls.
- 60 fps on a laptop, 30 fps or better on a mid-range phone while turning.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T9. QA pass and production guard            Size: one sitting   After: T6
Paste this into your coding tool:
---
Goal: The site passes its checks at both widths and cannot ship with missing facts.
Read first: build-rules.md, 04-frontend-spec.md (Exact acceptance checks).
Build:
1. Add scripts/check-content.mjs: fail the production build if name, storeUrl or any spec value is null.
2. Keyboard pass on /: Tab order header, hero actions, canvas, view buttons, Reset view, specs, Buy Model 01, footer.
3. Check 390 and 1280 widths, 320 reflow, 200% text, contrast of every text pair.
4. Lighthouse on the built out/ folder: LCP, CLS, JavaScript before 3D.
Do not add: new features to fix a check; report instead.
Done when:
- Every acceptance row in 04 has Pass, Fail or Not verified with evidence.
Stop: Do not start the next ticket. Reply with changed files, any decision you made, and how you checked.
---
```

```text
T10. Launch check            Size: one sitting   After: T9
Paste this into your coding tool:
---
Goal: The owner knows exactly what remains before going live.
Read first: build-rules.md, 01-prd.md (Open questions).
Build:
1. Write docs/shipright/ship-check.md: each open question, each acceptance check, and its status with evidence.
2. List the hosting steps for a static host (build command, out/ folder, domain). Do not deploy.
Done when:
- ship-check.md lists every remaining blocker with its owner.
Stop: Do not deploy or publish. Reply with the file and wait for the owner.
---
```
