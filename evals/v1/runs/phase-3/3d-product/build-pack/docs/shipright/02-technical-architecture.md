# 02 - Technical architecture

**Version/date:** 0.1, 2026-10-13  **Sources and approval:** all choices Proposed (D4, D5). The owner can change any of them before T1.

## Systems and stack

| Component | Choice (Proposed) | Why | Switch when |
| --- | --- | --- | --- |
| Site framework | Astro, current stable version, TypeScript | One static page, ships almost no JavaScript except the viewer. Cursor knows it well. | Accounts or app screens are added: move to Next.js. |
| 3D viewer | React Three Fiber with drei (`OrbitControls`, `useGLTF`, `Environment`), loaded as one Astro React island with `client:visible` | Declarative scene, good loaders, loads only when the hero is on screen. | The owner wants no React: plain three.js in a script, same behavior. |
| Styling | Plain CSS with `design/tokens.css` custom properties | One page; the tokens are the system. No extra build step. | More pages and components: add Tailwind and map it to the same tokens. |
| Model format | glTF binary (`.glb`) with Draco or Meshopt geometry and KTX2 textures | Small files, fast decode. | Not needed. |
| Checkout | Stripe Payment Link (hosted) | No card data on the site, receipts handled by Stripe. Owner owns the account. | Several products or discounts: Stripe Checkout through a small serverless function. |
| Hosting | Static host: Vercel, Netlify or Cloudflare Pages | Free tier is usually enough for a static page. The builder never signs up or deploys. | Not needed. |
| Analytics | None | Not requested. Sales show in Stripe. | The owner asks; then add consent where the law requires it. |
| Fonts | Instrument Sans from Google Fonts, `display=swap` | One family. | A brand font is supplied. |

No database, no server code, no email service in this release.

## Data and integrations

| Object / system | Direction | Fields | Failure behavior |
| --- | --- | --- | --- |
| `src/content/product.ts` | Read at build time | `name`, `sentence`, `price`, `specs[] {label, value}`, `buyNote`, `assuranceLine`, `contactEmail`, `legalLinks[] {label, href}`, `modelPath`, `stillImagePath` | Empty optional field: the row or line is not rendered. Empty required field: `npm run check:content` fails. |
| Stripe Payment Link | Outbound link only | URL in `PUBLIC_CHECKOUT_URL` | Unset: the checkout button is replaced by the text "Checkout opens soon." and the content check fails. |
| Model file | Fetched by the viewer | `public/models/speaker.glb` | Load error: viewer shows the failed state (S2). |

Required fields: `name`, `sentence`, `price`, `contactEmail`, `legalLinks` (privacy, terms of sale, returns), `PUBLIC_CHECKOUT_URL`.
Until the owner supplies `speaker.glb`, `modelPath` is empty and the viewer renders the stand-in model built in code (`src/components/viewer/StandInSpeaker.tsx`).

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 to S4 | Anchors `#specs`, `#buy` |
| `/design` | S0 | `noindex`, not linked from the page |

## Access rules

No sign-in and no private data. Nothing to protect beyond keeping secrets out of the front end. The Payment Link URL is public by design.

## Environment variables

| Name | Use |
| --- | --- |
| `PUBLIC_CHECKOUT_URL` | Stripe Payment Link for the Buy action |

No secret keys are needed. Never add a Stripe secret key to this project.

## Performance budgets

- LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile, measured on the real page.
- The LCP element is the h1 or the still image, never the canvas. The still image reserves its space.
- Model under 2 MB with compression; textures under 1 MB total.
- Pixel ratio capped at 2. Render on demand: no frames while the model is still.
- The viewer island loads after first paint and only when visible.

## Risks

| Risk | Effect | Mitigation |
| --- | --- | --- |
| Heavy model from a 3D artist | Slow load on phones | Size check in T4; compress with gltf-transform |
| Touch drag fights page scroll | Visitor stuck on the hero | Vertical swipe scrolls; only sideways drag turns (D6) |
| WebGL context lost on phones | Blank stage | Fall back to the still image with a message |

## Dependencies and open decisions

| Decision | Blocks | Owner |
| --- | --- | --- |
| Stripe account and Payment Link | Live checkout in T7 | Owner |
| Host choice | Launch only | Owner |
| Real model file | Final viewer look, not the build | Owner |
