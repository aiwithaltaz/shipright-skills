---
version: "1.1.0"
name: "ShipRight site preview"
description: "Shared scale plus three proposed themes. None is approved. YAML stays empty until a theme is approved."
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---

# Design system

**Status: Proposed. 14 October 2026.** No Figma file and no brand color were supplied. The owner rejected Split, Night, and Press as congested. This pass asks for sleek, modern, and minimal, with room around the real content. Altaz's 4px spacing habit is the base. Section gaps are larger because this brief asks for air.

References are pattern ideas only. Credits are in SOURCES.md. No code or words were copied.

## Scale

One scale for every theme. Inside a group: 4, 8, or 12. Between groups: 24 or 32. Between sections: 160 desktop, 96 phone. Page column 1040. Hero column 1160. Gutters 40 desktop, 20 phone.

| Token | px |
| --- | --- |
| space 1 to 4 | 4, 8, 12, 16 |
| space 5 to 8 | 24, 32, 48, 64 |
| space 9 to 12 | 96, 128, 160, 192 |

Type roles: display, title 32, body 18, meta 15. Display size is set by the theme. Line height 1.02 on display, 1.5 on body.

Radius: controls 12, floating nav 999, Air stage 28. Depth and Grid stages are square. Focus is a 2px outline, 2px offset.

Motion: 160ms for hover, 240ms for a small move, ease-out `cubic-bezier(.23, 1, .32, 1)`. One GSAP scrub per page. Lenis smooths wheel scroll and keeps `respectReducedMotion` on. Reduced motion: no Lenis, no scrub, one still 3D frame. Text opacity stays 1.

Nav: fixed pill, top center, solid surface, 1px border, gray float shadow. Links: ShipRight, Gallery, Install, GitHub. One filled Install control, in the hero, not in the pill.

## 3D

One mesh. Pixel ratio capped at 2, and at 1.5 below 760. Pause off screen and when the tab is hidden. The canvas is `aria-hidden`. If WebGL fails, the headline remains.

## Air

Syne. Display 60, weight 700, tracking -0.045em. White #FFFFFF, text #141414, muted #4D5158, border #E4E4E4, accent #141414 with white text. Stage #F3F3F1, radius 28. The headline is two lines across the hero. A pale knot sits in a soft stage to the right of the install line and drifts up 40px on scroll.

## Depth

Familjen Grotesk. Display 72, weight 600, uppercase, tracking -0.03em. Navy #071018, text #F3F6F8, muted #B7C2CE, border #243244, accent #F4F7FB with navy text. A cool solid sits under the headline. Scroll turns it. A slow spin on Z keeps it live.

## Grid

Newsreader for display and titles. Figtree for text. Display 76, weight 400. Field #F5F6F8, text #1A1A1A, muted #4A4E55, hairline #D5D6D8, accent #1A1A1A. Square controls. The serif headline sits on the left of a 96px hairline grid. A wire sphere sits on the right. A rule under the gallery grows across the scroll.

## Do not

- Do not bring back Split, Night, or Press.
- Do not add a glow, gradient text, eyebrow label, or a card around every block.
- Do not invent a logo, price, quote, or customer count.
- Do not hide text until a scroll animation runs.
