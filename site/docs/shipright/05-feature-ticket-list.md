# Tickets

Build in order. Each ticket stops when its checks pass.

## T1. Foundation

**After:** none.

Read DESIGN.md and `design/tokens.css`. Set up the Astro app in `site/`. Add the font, the header, the footer and `/design` with type, color, spacing, buttons and fields. No home sections yet.

**Done when:** `/design` renders at 390 and 1280 with no sideways scroll, visible focus, and labels on both fields.
**Stop.**

## T2. Home argument

**After:** T1.

Read `04-frontend-spec.md` (S1). Build the headline, the pack table, the five modes, safety and the slop lines. One filled Install button.

**Done when:** The first screen names the product and the audience. There is one h1.
**Stop.**

## T3. Gallery

**After:** T2.

Copy the eight named images in `scripts/copy-gallery.mjs`. Show scores 93 and 112 of 120 and the limits from the PRD. Leave two empty IVC slots.

**Done when:** Each image has alt text. The slots do not use a broken image.
**Stop.**

## T4. Install

**After:** T3.

Render `src/data/install.js`. Copy buttons report Copied or a visible failure. Claude.ai and ChatGPT use the zip link.

**Done when:** Keyboard reaches every Copy button. The command wraps at 390.
**Stop.**

## T5. Motion

**After:** T4.

Draw the headline rule once. Rise later sections by 16 px, transform only. Reduced motion keeps both still.

**Done when:** Text is visible with motion off. The page source contains a reduced-motion rule.
**Stop.**

## T6. Check

**After:** T5.

Run `node scripts/check-ui.mjs` on `dist/index.html` and `dist/design/index.html` at the widths it already opens. Fix every failure. Look at both screenshots.

**Done when:** 0 failures on both routes.
**Stop.** Do not deploy.
