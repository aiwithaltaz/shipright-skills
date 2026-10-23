---
name: shipright
description: "Use this when someone has an idea, an app, a SaaS, a website, a landing page, a dashboard, a store, a mobile app, a UI review, a feedback round, or a launch check. Also use for UX, UI, product framing, and build-pack. ShipRight thinks about the product, designs it from real references of the same type, and builds it."
---

# ShipRight

**Pack version:** 1.7.1
**Status:** released. Think first, then design from real references.

Think about the product, then design from real references of the same type, then build and look again. Never invent facts, brand values, data, or features. Label sample data.

No step is skipped for a new project, even on request. "just build it", "skip the plan" and "build in one go" still run every step below, quickly.

## Other jobs

| The user brings | Open |
| --- | --- |
| An existing app to review or improve | [Discover](stages/00-discover.md) |
| Exact feedback, crops, or "rebuild the screen with these changes" | [Feedback round](stages/feedback-round.md) |
| A finished build to check | [Test and critique](stages/09-test-and-critique.md) |
| "Is it ready to launch?" | [Ship check](stages/10-ship-check.md) |

Old mode names still work: [build-pack](modes/build-pack/MODE.md), [product-design](modes/product-design/MODE.md), [ui-ux-design](modes/ui-ux-design/MODE.md), [ux-critique](modes/ux-critique/MODE.md), [ship-check](modes/ship-check/MODE.md).

**Core rules if `modes/_shared` is unreachable:** say the pack is incomplete.

## New project: 4 steps

Hard rules for every step: [word limits](steps/word-limits.md) and [clarity rules](steps/clarity.md) (labeled states, plain counts, add with day picker, a manage screen). For a phone app, start from the working [phone-app kit](kits/phone-app/README.md) and pick ONE of its 3 style packs from the brief and audience. Commit to it strongly.

Open one step file at a time, in order. Steps 1 and 2 write two durable files, `PRODUCT.md` and `DESIGN.md`. Every later step reads them.

1. [Product](steps/01-product.md): idea, research, users, PRD, flows and states, sample data. Writes `PRODUCT.md`.
2. [Design](steps/02-design.md): product type, 2 or 3 real references of the same type and audience ([product-references/](product-references/README.md)), customer and admin shells, a brand mood from the product's own world, a genericness test, tokens. Writes `DESIGN.md`.
3. [Build](steps/03-build.md): every screen, then short build checks at 1280 and 390.
4. [Look and fix](steps/04-look-and-fix.md) (required): screenshots at 390 and 1280, a short critique against the chosen style reference for taste AND the clarity rules, fixes, at most 3 rounds. Write `LOOK-REPORT.md`. You are not done until it exists.

Effects like sound, camera flight or 3D are optional: see [extras/](extras/README.md). Taste is opt-in: read `taste/altaz.md` only when asked. Tools such as `check-ui.mjs`, `check-tokens.mjs` and `run-tests.mjs` are optional.

## Reply

Lead with the result, then why, then the next step. Short. See [reply.md](templates/reply.md).
