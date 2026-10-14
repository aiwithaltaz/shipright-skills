# 05 - Feature tickets

**Version/date:** 0.1, 2026-10-13  **Sources and approval:** PRD D1-D9, Proposed (delegated).

Paste one ticket at a time into Cursor. Each one finishes in one sitting, reports and stops.
Standing rules are in `docs/shipright/build-rules.md`; tickets do not repeat them.

## Order

| ID | Ticket | Screen | After |
| --- | --- | --- | --- |
| T1 | Foundation and /design preview | S0 | none |
| T2 | Content file, header and footer | S1 | T1 |
| T3 | Hero with still image | S2 | T2 |
| T4 | 3D viewer: turning the speaker | S2 | T3 |
| T5 | 3D viewer: states | S2 | T4 |
| T6 | Specs | S3 | T2 |
| T7 | Buy and checkout link | S4 | T2 |
| T8 | Motion | S2 | T5 |
| T9 | QA pass | all | T8 |
| T10 | Launch check | all | T9 |

## Tickets

```text
T1. Foundation and /design preview      Size: one sitting   After: none
Paste this into your coding tool:
---
Goal: The project runs and the owner can judge the look on /design before any page is built.
Read first: docs/shipright/build-rules.md, DESIGN.md, design/tokens.css, docs/shipright/04-frontend-spec.md (S0).
Build:
1. Astro project with TypeScript and the React integration. Add @react-three/fiber, @react-three/drei and three.
2. Copy design/tokens.css to src/styles/tokens.css. Add src/styles/base.css: body on --color-bg, text --color-text, --font-sans, focus ring from tokens.
3. Load Instrument Sans 400, 500, 600 from Google Fonts with display=swap.
4. Route /design with noindex: type sizes, color roles with their contrast, spacing scale, primary button in default, hover, focus and disabled, text link, view buttons default, pressed and focus, a status line, one spec row.
Do not add: the home page, Tailwind, a component library, analytics.
Done when:
- npm run dev serves /design with no console errors.
- Every value on /design comes from tokens.css.
- Tab reaches every control and the focus ring is visible.
Stop: Do not start T2. Reply with changed files, decisions and how you checked. Ask the owner to OK the look.
---
```

```text
T2. Content file, header and footer      Size: one sitting   After: T1
Paste this into your coding tool:
---
Goal: All product facts live in one file, and the page has its header and footer.
Read first: docs/shipright/build-rules.md, DESIGN.md, docs/shipright/02-technical-architecture.md (Data), 04-frontend-spec.md (S1).
Build:
1. src/content/product.ts with the fields in 02 Data. Leave every owner fact empty. Do not fill in sample values.
2. Script npm run check:content: lists each empty required field and PUBLIC_CHECKOUT_URL if unset; exits 1 if any.
3. Route / with a skip link, header (name left, "Specs" and "Buy" right) and footer per S1.
4. Empty optional values render nothing. Sections S2 to S4 are empty <section> elements with ids for now.
Do not add: extra nav items, a year or company line, newsletter, social links.
Done when:
- check:content fails on the empty file and passes once required fields are filled with test values (then empty them again).
- 390 and 1280 wide: header fits on one line, no sideways scroll.
- Skip link is the first Tab stop and jumps to main.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T3. Hero with still image                Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: The first screen says what the speaker is, its price, and leads to Buy, before any 3D loads.
Read first: docs/shipright/build-rules.md, DESIGN.md, 04-frontend-spec.md (S2 order and layout).
Build:
1. Hero in the order of S2: h1 name, sentence, price, "Buy" (primary, #buy), "See the specs" (text link, #specs).
2. Stage area: desktop from the text column to the window's right edge, height --stage-height; under 860 below the text, full width.
3. Still image from stillImagePath with width and height set, alt "{name}, front view". If empty, use public/images/speaker-standin.svg (a simple front drawing) and alt "Stand-in drawing of the speaker".
Do not add: a badge or label above the h1, a second filled button, background effects.
Done when:
- The h1 stays on two lines or fewer at 390 and 1280.
- CLS under 0.1: the stage keeps its size while the image loads.
- Buy and See the specs scroll to their sections and focus lands there.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T4. 3D viewer: turning the speaker       Size: one sitting   After: T3
Paste this into your coding tool:
---
Goal: A visitor turns the speaker by mouse, touch or keyboard, and jumps to set views.
Read first: docs/shipright/build-rules.md, DESIGN.md (Motion), 04-frontend-spec.md (S2 Input, Keyboard).
Build:
1. src/components/viewer/SpeakerViewer.tsx, an island with client:visible over the still image. Canvas transparent, dpr [1, 2], frameloop "demand", Environment preset "studio".
2. If modelPath is set, load it with useGLTF (Draco). If empty, render StandInSpeaker.tsx: fabric body, metal top, base, from simple shapes.
3. OrbitControls: rotate only, no zoom or pan, damping 0.08, polar angle limits per S2. Canvas style touch-action: pan-y.
4. Wrapper role="application", tabIndex 0, label "3D view of {name}". Keys per S2.
5. Caption and buttons Front, Side, Back, Top with aria-pressed, and "Reset view". For now views jump instantly.
Do not add: zoom, hotspots, color switching, auto-rotate.
Done when:
- Mouse drag, touch sideways drag and arrow keys turn the model; vertical swipe scrolls the page on a phone.
- No frames render while still (Performance panel).
- Model file under 2 MB, or the stand-in is used.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T5. 3D viewer: states                    Size: one sitting   After: T4
Paste this into your coding tool:
---
Goal: The viewer tells the visitor what is happening and never leaves a blank stage.
Read first: docs/shipright/build-rules.md, 04-frontend-spec.md (S2 states table).
Build:
1. Status line under the stage, role="status". Loading text appears only once the viewer script runs.
2. Ready: canvas shown over the still image; status cleared.
3. Unavailable: no WebGL or webglcontextlost. Keep the still image, hide view buttons, show the S2 text.
4. Failed: model load error or 10 s without ready. Keep the still image, show the S2 text and "Try again", which reloads the viewer once per press.
Do not add: progress percentages, spinners over the model, error codes.
Done when:
- With WebGL disabled the page shows the still image, price and Buy, and the unavailable text.
- A wrong modelPath shows the failed state, and Try again retries.
- Status changes are announced without moving focus.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T6. Specs                                Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A visitor checks the speaker's facts in one list.
Read first: docs/shipright/build-rules.md, DESIGN.md, 04-frontend-spec.md (S3).
Build:
1. Section #specs, h2 "Specs", layout per S3.
2. <dl>: first row "Connection" with "Wireless", then each filled row from specs[].
3. Long values wrap; label and value stay aligned.
Do not add: icons per row, comparison with other speakers, sound claims.
Done when:
- 0 extra rows, 1 row and 10 rows render cleanly at 390 and 1280.
- A 120-character value wraps without sideways scroll.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T7. Buy and checkout link                Size: one sitting   After: T2
Paste this into your coding tool:
---
Goal: A visitor sees the price and terms and continues to the hosted checkout.
Read first: docs/shipright/build-rules.md, DESIGN.md, 04-frontend-spec.md (S4), 02-technical-architecture.md (Checkout).
Build:
1. Section #buy on --color-surface with the S4 content, in order.
2. "Continue to checkout" links to PUBLIC_CHECKOUT_URL in the same tab.
3. If the URL is unset, render "Checkout opens soon." instead of the button.
Do not add: a cart, quantity picker, custom card form, discount field.
Blocked only for the live link: the owner creates the Stripe Payment Link and sets the price there. Build with the variable unset.
Done when:
- With the variable set to a test link, the button opens it; without it, the fallback text shows.
- Price here and in the hero come from the same field.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T8. Motion                               Size: one sitting   After: T5
Paste this into your coding tool:
---
Goal: Motion shows the speaker is 3D, then gets out of the way.
Read first: docs/shipright/build-rules.md, DESIGN.md (Motion table).
Build:
1. Intro turn once when ready, --duration-intro, ending at the rest view.
2. View buttons animate the camera along the shortest path, --duration-view.
3. Canvas fades in over the still image, --duration-fade.
4. Any drag, key or button press stops a running move at once.
5. prefers-reduced-motion: skip the intro, jump views, no damping.
Do not add: scroll-linked animation, section reveals, auto-rotate.
Done when:
- With reduced motion on, nothing moves unless the visitor drags or presses.
- Pressing Side then Back quickly ends at Back with no queued moves.
Stop: Do not start the next ticket. Reply with changed files, decisions and how you checked.
---
```

```text
T9. QA pass                              Size: one sitting   After: T8
Paste this into your coding tool:
---
Goal: The page meets the build rules at phone and desktop width.
Read first: docs/shipright/build-rules.md, 04-frontend-spec.md (Exact acceptance checks).
Build:
1. Check 320, 390 and 1280 wide and 200% text: no sideways scroll, h1 two lines or fewer.
2. Keyboard only: skip link, header links, Buy, viewer keys, view buttons, checkout.
3. Measure contrast of every text and control pair.
4. Lighthouse mobile on a production build: LCP, CLS, INP budgets from 02.
5. Fix what fails within the spec. List what you could not check.
Do not add: new features or sections.
Done when:
- Each check above has Pass, Fail or Not verified with a reason.
Stop: Reply with the results table and changed files.
---
```

T10. Launch check, after T9: run a launch check against `docs/shipright/build-rules.md` once the owner has supplied name, price, checkout link, legal pages and contact email, and `npm run check:content` passes. The owner decides when to deploy.
