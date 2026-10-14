---
version: "1.1.0"
name: "ShipRight"
description: "Approved Depth theme for the public ShipRight site."
colors:
  background: "#071018"
  nav: "#0D1824"
  text: "#F3F6F8"
  muted: "#B7C2CE"
  border: "#243244"
  accent: "#F4F7FB"
  accentText: "#071018"
  focus: "#F4F7FB"
typography:
  fontFamily: "Familjen Grotesk, sans-serif"
  displaySize: "72px"
  displaySizePhone: "28px"
  displaySizeNarrow: "22px"
  displayWeight: "600"
  titleSize: "32px"
  bodySize: "18px"
  metaSize: "15px"
rounded:
  control: "12px"
  nav: "999px"
  stage: "0px"
spacing:
  scale: "4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192"
  section: "160px"
  sectionPhone: "96px"
  gutter: "40px"
  gutterPhone: "20px"
components: {}
---

# Design system

**Status: Approved. 14 October 2026.** The owner picked Depth. Air and Grid are not on the site. No Figma file was supplied. Altaz's 4px spacing habit is the base. Section gaps stay large because the brief asked for room around the real content.

## Depth

Familjen Grotesk only. Display 72, weight 600, uppercase, tracking -0.03em. Phone display is 28 so each headline line stays one line. Below 385px the display is 22 for the same reason. Navy #071018, text #F3F6F8, muted #B7C2CE, border #243244, accent #F4F7FB with navy text. The nav is a solid pill, top center. One filled Install control, in the hero.

The hero object is one smooth metal form. High subdivision, no flat shading. Room lighting, a soft rim light, a small liquid shift, a slow idle turn, mouse parallax, and one scroll turn. Pixel ratio caps at 2, and at 1.5 below 760. The loop pauses off screen and when the tab is hidden. Reduced motion shows one still frame, with Front, Side, and Back. Text does not wait on WebGL. A still image sits under the canvas.

## Motion

160ms hover. 240ms for a small fade. Ease-out `cubic-bezier(.23, 1, .32, 1)`. Lenis on this marketing page only, with `respectReducedMotion` left on. GSAP is not MIT.

## Do not

- Do not bring back Split, Night, Press, Air, or Grid.
- Do not add a glow, gradient text, eyebrow label, or a card around every block.
- Do not invent a logo, price, quote, or customer count.
- Do not hide text until a scroll animation runs.

## Icons

No icon set. Emoji are not used. Actions use words.

## Placement

The primary action is Install, centered under the deck. Copy and view controls are text buttons. Status sits under the command it describes.
