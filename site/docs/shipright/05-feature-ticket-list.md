# Tickets

Current phase: preview only. Do not start T2 until the owner names Air, Depth, or Grid.

## T1. Direction preview

**After:** none. **Size:** one sitting.

Read `docs/shipright/build-rules.md`, DESIGN.md, and `04-frontend-spec.md`.
Build `/`, `/preview/air`, `/preview/depth`, and `/preview/grid` from `design/tokens.css`.
Each page: floating nav, open hero, one Three.js mesh, Lenis, one GSAP scrub, gallery, empty IVC labels, install copy.
Do not reuse Split, Night, or Press.

**Done when:** check-ui reports 0 failures at 390 and 1280. Text is visible with motion off.
**Stop.** Do not build the final home page.

## T2. Build the chosen direction

**After:** the owner names one direction. **Size:** one sitting.

Keep the chosen theme. Remove the other two public routes. Build `/` from that theme only. Keep the trial limits and `src/data/install.js`.

**Done when:** `/` is only the chosen direction. One filled Install control. The 3D hero still has a still frame when motion is reduced.
**Stop.**

## T3. Critique and check

**After:** T2. **Size:** one sitting.

Run ux-critique and `node scripts/check-ui.mjs` at 390 and 1280. Fix what it finds.

**Done when:** Must-fix items are fixed or written down with evidence, and check-ui reports 0 failures.
**Stop.** Do not deploy.

## T4. Ship-check handoff

**After:** T3, and only if a launch is requested. **Size:** one sitting.

Hand the built page to ship-check. Do not publish, deploy, or buy a domain.

**Done when:** ship-check has a dated note, or the owner has said not to launch.
**Stop.**
