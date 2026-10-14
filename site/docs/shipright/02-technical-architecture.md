# Technical architecture

**Version:** 1.1.0 site preview. **Status:** Proposed.

| Choice | Decision | Why | Switch when |
| --- | --- | --- | --- |
| Site | Astro, static | A few public pages. | It needs sign-in: use Next.js. |
| 3D | Three.js in one module | The page is not a React app. R3F would add a second UI runtime. | A direction needs many React-controlled scenes: move that page to R3F. |
| Motion | GSAP ScrollTrigger, one scrub per direction | The brief asked for one scroll move. | The chosen direction drops scroll motion: remove GSAP. |
| Scroll | Lenis, GSAP ticker, `respectReducedMotion` left on | Marketing page only. | Reduced-motion bugs remain: drop Lenis and keep native scroll. |
| CSS | `design/tokens.css` plus `src/styles/preview.css` | One spacing scale. Color and type change by theme. | After a pick: delete the other two themes. |
| Type | Self-hosted latin files | No runtime font host. | A supplied brand font replaces the pair. |
| Host | Vercel, root `site`, later | Static `dist`. Do not deploy in this pass. | A required region: another host. |
| Data | None | Copy and images only. | A saved install needs a new decision. |

GSAP uses the GSAP standard license, not MIT. Three.js and Lenis are MIT. The site installs them for the preview. They are not part of the MIT pack.

## 3D limits

One mesh. Pixel ratio capped at 2, and at 1.5 below 760px. The loop pauses off screen and when the tab is hidden. Reduced motion renders one still frame and does not spin. The canvas is decorative. Hero text stays in the DOM if WebGL fails.

## Routes

| Route | Page |
| --- | --- |
| `/` | Direction list |
| `/preview/air` | Air |
| `/preview/depth` | Depth |
| `/preview/grid` | Grid |
| `/design` | Redirects to `/` |
| `/gallery/*` | Trial images, copied at build, not committed |

## Access

Public read. No sign-in. No secrets. No analytics.

## Performance

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 on the chosen page, measured later. Hero text is the stable content. Comparison images have width and height.

## Install facts

Commands in `src/data/install.js` match the 1.1 README and release `v1.1.0`: the bare `npx skills add` line, the Claude Code plugin pair, per-tool lines with `-a` and `-y`, `shipright.zip`, and `shipright-chatgpt.md`.

## Risks

The open graph image is still the first version. Replace it after a direction is chosen. Domain stays unset until one exists.
