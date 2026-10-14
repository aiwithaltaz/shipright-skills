# Tickets

Current phase: the approved Depth home page. Do not open Air or Grid.

## T1. Direction preview

**After:** none. **Size:** done.

The owner rejected Split, Night, and Press, then rejected Air and Grid by picking Depth.

**Stop.**

## T2. Build Depth

**After:** the owner picked Depth. **Size:** one sitting.

`/` is the Depth home page. Air and Grid routes are gone. Keep the trial limits and `src/data/install.js`.

**Done when:** `/` is Depth only. One filled Install control. The 3D hero has a still frame when motion is reduced.
**Stop.**

## T3. Critique and check

**After:** T2. **Size:** one sitting.

Run ux-critique and `node scripts/check-ui.mjs` at 390 and 1280. Fix what it finds.

**Done when:** Must-fix items are fixed or written down with evidence, and check-ui reports 0 failures.
**Ran:** 14 October 2026. check-ui on `/` was 0 failures and 0 warnings. The narrow headline wrap and the old open-graph image were fixed.
**Stop.** Do not deploy.

## T4. Ship-check

**After:** T3. **Size:** one sitting.

Hand the built page to ship-check. Do not publish, deploy, or buy a domain.

**Done when:** ship-check has a dated note.
**Ran:** 14 October 2026. See `06-ship-check.md`. Verdict: Not established. Do not deploy.
**Stop.**
