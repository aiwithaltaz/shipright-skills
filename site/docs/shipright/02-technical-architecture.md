# Technical architecture

**Version:** 1.1.0 site. **Status:** Approved for the Depth page. Host is still not deployed.

| Choice | Decision | Why | Switch when |
| --- | --- | --- | --- |
| Site | Astro, static | One public page plus a missing page. | It needs sign-in: use Next.js. |
| 3D | Three.js in one module, with RoomEnvironment | The page is not a React app. | Many React-controlled scenes: move that page to R3F. |
| Motion | GSAP ScrollTrigger, one scrub | The brief asked for one scroll turn. | Scroll motion is dropped: remove GSAP. |
| Scroll | Lenis, GSAP ticker, `respectReducedMotion` left on | Marketing page only. | Reduced-motion bugs remain: drop Lenis and keep native scroll. |
| CSS | `design/tokens.css` plus `src/styles/home.css` | One approved theme. | A new approved theme replaces these tokens. |
| Type | Self-hosted Familjen Grotesk latin files | No runtime font host. | A supplied brand font replaces it. |
| Host | Vercel, root `site`, later | Static `dist`. Do not deploy in this pass. | A required region: another host. |
| Data | None | Copy and images only. | A saved install needs a new decision. |

GSAP uses the GSAP standard license, not MIT. Three.js and Lenis are MIT. The site installs them. They are not part of the MIT pack.

## 3D limits

One mesh. Desktop subdivision 6, phone subdivision 5. Pixel ratio capped at 2, and at 1.5 below 760. The loop pauses off screen and when the tab is hidden. Reduced motion renders one frame and does not spin. If WebGL fails, the canvas is removed and the still image remains.

## Routes

| Route | Page |
| --- | --- |
| `/` | Depth home |
| `/404` | Missing page |
| `/design` | Redirects to `/` |
| `/gallery/*` | Trial images, copied at build, not committed |

## Access

Public read. No sign-in. No secrets. No analytics.

## Performance

Targets: LCP under 2.5 s, INP under 200 ms, CLS under 0.1. Hero text and the still image are in the first HTML. Comparison images have width and height. Lab numbers are recorded in the ship-check note when measured.

## Install facts

Commands in `src/data/install.js` match the 1.1 README and release `v1.1.0`.

## Risks

The public domain is unknown, so `site` in `astro.config.mjs` stays unset. Open Graph URLs are not absolute until a domain exists.
