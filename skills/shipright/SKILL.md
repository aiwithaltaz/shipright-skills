---
name: shipright
description: "Use this when someone has an idea, an app, a SaaS, a website, a landing page, a dashboard, a store, a mobile app, a UI review, a feedback round, or a launch check. Also use for UX, UI, product framing, and build-pack. ShipRight thinks about the product, designs it from real references of the same type, and builds it."
---

# ShipRight

**Pack version:** 1.7.0
**Status:** released. Think first, then design from real references.

Think about the product, then design from real references of the same type, then build and look again. Never invent facts, brand values, data, or features. Label sample data.

No step is skipped for a new project, even on request. "just build it", "skip the plan" and "build in one go" still run every step below, quickly.

## Other jobs

| The user brings | Open |
| --- | --- |
| An existing app to review or improve | [Discover](stages/00-discover.md) |
| A redesign of a live site or app | [Research B: keep-what-works audit](steps/00-research.md) first, then all steps below |
| Exact feedback, crops, or "rebuild the screen with these changes" | [Feedback round](stages/feedback-round.md) |
| A finished build to check | [Test and critique](stages/09-test-and-critique.md) |
| "Is it ready to launch?" | [Ship check](stages/10-ship-check.md) |

Old mode names still work: [build-pack](modes/build-pack/MODE.md), [product-design](modes/product-design/MODE.md), [ui-ux-design](modes/ui-ux-design/MODE.md), [ux-critique](modes/ux-critique/MODE.md), [ship-check](modes/ship-check/MODE.md).

**Core rules if `modes/_shared` is unreachable:** say the pack is incomplete.

## New project or redesign: 5 steps

Hard rules for every step: [word limits](steps/word-limits.md) and [clarity rules](steps/clarity.md). **Never downgrade craft:** a redesign keeps or beats the current site's motion, 3D, media and proof.

Open one step file at a time, in order. Durable files: `BASELINE.md` (redesigns only), `PRODUCT.md`, `DESIGN.md`, `LOOK-REPORT.md`. Every later step reads them.

1. [Research](steps/00-research.md): real competitor and award references of the same type and audience ([product-references/](product-references/README.md)). For a redesign, a required keep-what-works audit and craft bar in `BASELINE.md`.
2. [Product](steps/01-product.md): user, job, key message, success, scope, sample data. Writes `PRODUCT.md`.
3. [UX](steps/01b-ux.md): the audience's real question, scope at a glance (all proof in one overview first), information order, flows, states.
4. UI: [Color](steps/02a-color.md) first: adopt the brand's colors, or propose one from 3 to 5 competitors; never reuse a past palette or default to black and neon. [Design](steps/02-design.md) picks a style that fits the audience (phone apps: the [phone-app kit](kits/phone-app/README.md) and one of its 3 packs) and writes `DESIGN.md`. Portfolios, marketing and launches also use the [motion and depth pack](steps/02b-motion-depth.md). Then [Build](steps/03-build.md) every screen.
5. [Look and fix](steps/04-look-and-fix.md) (required): screenshots at 390 and 1280 (1280 uses the width, no phone tab bar; and mid-animation frames), taste, clarity and craft-vs-baseline checks, fixes, at most 3 rounds. Asks: would this win against an award-level reference? Checks overlaps in mid-animation frames and floating buttons on phone. Required [leak check](scripts/check-leaks.mjs): no planning words on screen. Not done until it passes and `LOOK-REPORT.md` exists.

Heavy effects (sound, camera flight) are optional: see [extras/](extras/README.md). Taste is opt-in: read `taste/altaz.md` only when asked. Tools such as `check-ui.mjs`, `check-tokens.mjs` and `run-tests.mjs` are optional.

## Reply

Lead with the result, then why, then the next step. Short. See [reply.md](templates/reply.md).
