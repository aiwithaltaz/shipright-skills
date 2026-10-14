# Tickets

Current phase: preview only. Do not start T2 until the owner names Split, Night, or Press.

## T1. Direction preview

**After:** none. **Size:** one sitting.

Read `docs/shipright/build-rules.md`, DESIGN.md, and `04-frontend-spec.md`.
Build `/`, `/preview/split`, `/preview/night`, and `/preview/press`.
Use the token file named for that direction. Hero, gallery, and install only.
Install text comes from `src/data/install.js`. Images come from `scripts/copy-gallery.mjs`.
GSAP runs only inside `gsap.matchMedia` for `(prefers-reduced-motion: no-preference)`.

**Done when:** Each direction shows a real comparison on the first screen, all four cases, and the 1.1 commands. check-ui reports 0 failures at 390 and 1280.
**Stop.** Do not apply one direction to a final home page.

## T2. Build the chosen direction

**After:** the owner names one direction. **Size:** one sitting.

Read the same files. Keep the chosen token file. Remove the other two directions from the public routes.
Build the single home page from the chosen hero, gallery, and install. Keep the copy, the trial limits, and the install file.
Do not add IVC frames, a blog, or a second visual system.

**Done when:** `/` is only the chosen direction. The first screen still shows a before and after. One filled Install control.
**Stop.**

## T3. Critique and check

**After:** T2. **Size:** one sitting.

Run ux-critique on the built home page and `node scripts/check-ui.mjs` at 390 and 1280. Fix what it finds. Loop until 0 failures. Look at both screenshots.

**Done when:** The critique's must-fix items are fixed or written down with evidence, and check-ui reports 0 failures.
**Stop.** Do not deploy.

## T4. Ship-check handoff

**After:** T3, and only if a launch is requested. **Size:** one sitting.

Hand the built page to ship-check. Do not publish, deploy, or buy a domain in this ticket.

**Done when:** ship-check has a dated note, or the owner has said not to launch.
**Stop.**
