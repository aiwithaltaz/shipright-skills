# Technical architecture

Proposed: one Vite React page at `/`, Three.js for one procedural product canvas, GSAP ScrollTrigger for one scroll timeline, Lenis for optional desktop motion. These fit the available Node and Chromium toolchain. No database, accounts, APIs, environment secrets, integrations or extra routes are needed. Dependencies remain outside the tracked tree. Switch to static DOM and still imagery if WebGL fails; reduced motion keeps all acts in normal flow and disables inertia and scrub.

One product scene is reused across acts; geometry matches the first-HTML stand-in. Static stills have explicit dimensions, meaningful alternative text and `data-product-hero`. Canvas is decorative with `aria-hidden`; native DOM view controls expose the same information. Views are illustration, not exact physical specifications.

Budget: generated model geometry under 3 MB compressed; textures under 2 MB; cap DPR at 2 desktop and 1.5 phone. One animation driver, pause hidden tabs/off-screen rendering, dispose geometries/materials/listeners/timeline and Lenis on cleanup. Measure actual assets and frame timings without claiming device performance from software rendering. Test 1280 and 390 widths, keyboard, reverse scrolling, reduced motion and no WebGL. Final source and screenshots/video remain local.

Act list in 01-prd.md is the architecture. User story choice determines exact composition and technique recipes; no build starts before D5 is resolved.
