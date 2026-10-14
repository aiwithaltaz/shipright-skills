# 02 - Technical architecture

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** stack chosen by the assistant for Cursor. All choices **Proposed**. T1 builds with them; changing now is cheap.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| Framework | Next.js (App Router), TypeScript, `output: 'export'` (static files) | Real HTML for search engines and fast first paint; Cursor knows it well | The site stays one page and SEO does not matter: plain Vite and three.js is lighter |
| Styling | Tailwind CSS reading CSS variables from `design/tokens.css` | One token source; no raw values in components | A team prefers CSS Modules: keep the same variables |
| 3D | three.js through React Three Fiber and drei (`OrbitControls`, `Environment` with a room preset, `useGLTF`) | Declarative scene, good loaders, render on demand | Only one fixed animation is needed: a short video is lighter |
| Motion | GSAP with ScrollTrigger, Lenis for smooth scroll on this marketing page only | Section entrances and the turn-in move, with `gsap.matchMedia()` for reduced motion | Motion is cut: remove both packages |
| Fonts | Manrope through `next/font/google` (self-hosted at build) | One family, no layout shift | Brand font supplied: swap in tokens only |
| Model pipeline | glTF 2.0, compressed with gltf-transform (Meshopt or Draco), KTX2 textures | Small downloads, fast decode | Not needed until the owner's model arrives (T8) |
| Hosting | A static host with a free plan that allows commercial sites, such as Cloudflare Pages or Netlify | Static files, HTTPS, no server | Server features are needed later: Vercel Pro (paid). Vercel's free Hobby plan is for non-commercial use only |

Use current stable versions. Never sign up, buy or deploy for the owner.

## Data

No database. One typed content file is the single source for product facts:

`content/product.ts`

| Field | Type | Status now |
| --- | --- | --- |
| `name` | string | Working name "Model 01" |
| `sentence` | string | Proposed copy |
| `price` | `{ amount: string; currency: string } \| null` | `null` (Unknown) |
| `storeUrl` | `string \| null` | `null` (Unknown) |
| `specs` | `{ label: string; value: string \| null }[]` | Labels set, values `null` |
| `buying` | `{ label: string; value: string \| null }[]` for Delivery, Returns | values `null` |
| `modelUrl` | `string \| null` | `null`: placeholder model in code |
| `contactEmail`, `legalLinks` | `string \| null`, `{ label; href }[]` | Unknown, empty |

Rule: `null` renders "To confirm" only when `NEXT_PUBLIC_PREVIEW=true`. In production builds a `null` field hides its row, and a build check fails if `name`, `storeUrl` or any spec value is still `null` (T9).

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 Home | Static. Sections `#specs`, `#buy` |
| `/design` | S0 Design preview | Owner review only. `noindex`, not linked, excluded from sitemap |
| 404 | S2 Not found | Static `not-found.tsx` |

## Access

No sign-in, no roles, no user data. Nothing to protect beyond the hosting account.

## Integrations

Only an outbound link to the owner's store (`storeUrl`). No analytics, no forms, no cookies. If analytics are added later, consent rules apply where the law or the owner requires them.

## Environment variables

| Name | Use |
| --- | --- |
| `NEXT_PUBLIC_PREVIEW` | `true` shows "To confirm" and the preview note |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL and Open Graph links. Unknown until a domain exists |

No secrets exist in this release.

## 3D architecture

- `components/viewer/Viewer.tsx` (client only, loaded with `next/dynamic`, `ssr: false`) after first paint.
- `components/viewer/StillView.tsx` renders the SVG still for Front, Side, Back and Top. It is server-rendered, sized like the canvas, and is the LCP element.
- `components/viewer/PlaceholderSpeaker.tsx` builds the placeholder from lathe and cylinder geometry. Replaced by `useGLTF(modelUrl)` when `modelUrl` is set.
- Canvas: `frameloop="demand"`, `dpr={[1, 2]}` (max 1.5 under 768 px wide), ACES tone mapping, sRGB output.
- `OrbitControls`: damping on, zoom and pan off, polar angle 0.12 to 1.75 rad. Canvas `touch-action: pan-y` so vertical swipes scroll the page.
- Pause rendering when the canvas is off screen (IntersectionObserver) or the tab is hidden. Dispose geometry and textures on unmount.

## Performance budgets

| Item | Budget |
| --- | --- |
| LCP, INP, CLS (75th percentile) | under 2.5 s, under 200 ms, under 0.1 |
| JavaScript before 3D loads | under 120 KB gzip |
| Model file | under 3 MB compressed |
| Textures | under 2 MB total |
| Draw calls, triangles | under 100; under 300k desktop, 100k phone |
| Frame rate | 60 fps desktop, 30 fps or better on a mid-range phone; drop pixel ratio when frames fall |

## Risks

| Risk | Effect | Mitigation |
| --- | --- | --- |
| Owner's model is heavy CAD | Slow load, frame drops | T8 compresses and decimates; budgets above |
| WebGL unavailable or lost | No 3D | Still view and view buttons always work |
| Store link changes | Dead Buy button | Single `storeUrl` field; manual check in T10 |
