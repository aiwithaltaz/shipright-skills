---
name: shipright
description: "Use this when someone wants to design, review, or build a website, a SaaS app, a mobile app, a screen, a flow, or a 3D site. Also use for UX, UI, product framing, a design system, a critique, or a launch check. ShipRight routes to one mode: build-pack (the default for a new idea), product-design, ui-ux-design, ux-critique, or ship-check."
---

# ShipRight

**Pack version:** 1.1.0
**Context before generate. Product before pixels.**

This is the only ShipRight skill. Type `/shipright`, or start here when the request is a product, a screen, a website, or a launch check.
Read one mode file, then only the references that mode names for the current step. Do not load the other modes.

## Route

Use the first matching row.

| Request | Mode | Read |
| --- | --- | --- |
| A new idea, "build this", or a website, app, or 3D site with no narrower task | build-pack (default) | [build-pack](modes/build-pack/MODE.md) |
| Frame an idea, research, objects, a journey, or flows and states | product-design | [product-design](modes/product-design/MODE.md) |
| A screen, a design system, layout, or an exact visual correction | ui-ux-design | [ui-ux-design](modes/ui-ux-design/MODE.md) |
| Review an existing screen, flow, copy, or plan | ux-critique | [ux-critique](modes/ux-critique/MODE.md) |
| Launch evidence, or one release item | ship-check | [ship-check](modes/ship-check/MODE.md) |

A vague idea with no artifact starts at build-pack. An explicit correction, review, or launch check stays in that mode.
If the user names a mode, use that mode.

## Shared rules

The chosen mode reads [shared intake](modes/_shared/intake.md) and [the operating contract](modes/_shared/operating-contract.md) once.
Do not ask those questions again when a later step continues the same task.
Flow behavior that must pass is in [flow-rules.md](modes/_shared/flow-rules.md). Requested project files follow [output-folder.md](modes/_shared/output-folder.md).

**Core rules if `modes/_shared` is unreachable:** say the pack is incomplete.
Honor exact feedback and the current phase. Never invent facts, brand values, data, or features.
Silence is not approval. Use Pass, Fail, Not verified, or justified Not applicable with evidence.
Nothing ships, publishes, or charges money without the user's OK.
