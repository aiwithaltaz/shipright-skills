# 02 - Technical architecture

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** D4 in the PRD decision log. The whole stack is Proposed. T1 builds with it; changing it before T3 is cheap.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| Site framework | Astro, current stable version, TypeScript | One static page, almost no JavaScript by default, fast first paint. Cursor knows it well. | The site needs sign-in, a cart or app screens: move to Next.js. |
| Styling | Plain CSS with custom properties from `design/tokens.css`, scoped styles in `.astro` files | One small page; tokens stay the single source of values. | Many pages and contributors: add Tailwind CSS mapped to the same tokens. |
| 3D | three.js, current stable version, plain (no React), loaded as a client script after first paint | One scene with one object. React Three Fiber adds weight without a job here. | A configurator or several scenes: React Three Fiber and drei in a React island. |
| 3D asset | glTF binary (`.glb`) with Draco or Meshopt compression, KTX2 textures | Small files, standard loaders. | Not applicable until the real model exists. |
| Motion | None beyond CSS transitions and the three.js render loop | One signature move needs no library. | Scroll-driven sections are approved later: GSAP with ScrollTrigger. |
| Fonts | Manrope from Google Fonts, or self-hosted with `@fontsource` | Free, one family, good at large sizes. | The owner supplies brand fonts. |
| Hosting | A static host such as Cloudflare Pages, Netlify or Vercel | Free plans currently cover a small static site. Check current terms. | Heavy traffic or a company account elsewhere. |

No database, no server code, no environment secrets, no analytics, no email service. Nothing is signed up, bought or deployed for the owner.

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 Home | Sections with anchors `#details`, `#specs`, `#buy` |
| `/404` | S2 Not found | Static `404.html` served by the host for unknown paths |
| `/design` | Design preview from T1 | Dev only. Excluded from the production build and from the sitemap. |

## Content and data

No database. One typed content file holds every product fact:

`src/content/product.ts`

| Field | Type | Today |
| --- | --- | --- |
| `name` | string | "Model 01" (working name, sample) |
| `lead` | string | Sample sentence |
| `storeUrl` | string or empty | Empty. Unknown, owner supplies. |
| `details` | 3 items: title, text, image path, alt text | Sample copy about the placeholder model |
| `specs` | rows: label, value or `null` | Only "Type: Wireless speaker" is known. Other values `null`, shown as "To confirm". |
| `model` | `{ src, stills: { front, side, back } }` | Placeholder model in code; stills are SVG drawings |
| `isSample` | boolean per field | `true` until the owner confirms |

The page renders "To confirm" for `null` spec values. A build-time check fails the production build while any field has `isSample: true`, `storeUrl` is empty, or a spec value is `null` (T9).

## 3D viewer module

`src/scripts/viewer.ts`, started from S1 after the `load` event in idle time.

| Concern | Rule |
| --- | --- |
| Start | Skip auto-start when `prefers-reduced-motion: reduce` or `navigator.connection.saveData`. Show "Open 3D view" instead. |
| Support | Check for WebGL first. No WebGL: Unsupported state, stills stay. |
| Renderer | `antialias: true`, `alpha: true`, sRGB output, ACES filmic tone mapping. Pixel ratio capped at 2 (1.5 on phones or coarse pointers); drop to 1 when average frame time passes 34 ms. |
| Light | RoomEnvironment through PMREMGenerator, one warm key light, one cool rim light. |
| Placement | The model is centered on the `model-anchor` element using `camera.setViewOffset`, so text never sits over it. Recomputed on resize. |
| Rendering | On demand only: frames run while turning, then stop. Paused when the canvas is off screen (IntersectionObserver) or the tab is hidden. |
| Input | Pointer drag turns (horizontal on touch, so vertical swipes scroll the page: `touch-action: pan-y`). No wheel zoom. Arrow keys turn and tilt; Home resets. |
| Cleanup | Dispose geometries, materials, textures, the environment target and the renderer on `pagehide`. |

## Performance budgets

| Item | Budget |
| --- | --- |
| LCP | Under 2.5 s at the 75th percentile. The front still image is the LCP element. |
| INP / CLS | Under 200 ms / under 0.1. The stage reserves its size. |
| JavaScript before first paint | Only the small inline buy-link handler. three.js loads after. |
| Model | Under 3 MB compressed (target 2 MB), textures under 2 MB total, under 100 draw calls, under 300k triangles desktop and 100k phone. |
| Frame rate | 60 fps desktop, 30 fps or better on a mid-range phone. |

## Access and privacy

Everyone sees the same public page. No personal data is collected. No cookies are set by the site itself. Google Fonts requests go to Google; self-host the font if the owner prefers no third-party requests.

## Risks

| Risk | Effect | Mitigation |
| --- | --- | --- |
| The real model is heavy | Slow load, dropped frames | Budgets above; compress in T7; keep stills as LCP |
| The store link changes | Broken Buy | One field in `product.ts`; T8 checks it |
| Placeholder content ships | False product claims | Build-time sample check in T9 |
