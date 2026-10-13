# 01 - Product requirements

**Version/date:** 0.1, 2026-10-13  **Sources and approval:** owner request ("a product website for a premium wireless speaker with a 3D model the visitor can rotate"); owner answered "you decide" to Q1-Q3, so D1-D3 are Proposed (delegated).

## 1. Frame

- **Who:** people considering buying the owner's premium wireless speaker online.
- **Job:** see the speaker from every side, check the facts, and buy it.
- **What they do today:** Unknown (owner). Online, people usually judge a speaker from photos and a spec list.
- **This release finishes:** one home page where a visitor turns a 3D model of the speaker, reads the specs and price, and continues to a hosted checkout.
- **What stays out:** see section 4.

## 2. Useful mechanism

A 3D model the visitor turns by hand shows shape, finish and every side, which flat photos hide. Evidence that this raises confidence or sales: Unknown. Treat it as a hypothesis (H1).

## 3. Users and constraints

- One actor: a visitor. No accounts, no roles, no sign-in.
- Devices: phone and desktop browsers. Some have no WebGL or ask for reduced motion; they still get the full page with a still image.
- Price, payment, legal text and access policy are the owner's decisions and are never filled in by the builder.

## 4. Current phase

**Phase:** 1, launch page.
**Approved now (delegated):** route `/` with header, hero and 3D viewer, specs, buy section and footer. Route `/design` for the design preview.
**Explicitly excluded:** accounts, cart, several products, color configurator, AR view, sound demo or audio player, reviews and ratings, comparison table, newsletter, blog, chat, analytics.
**Later notes only:** a Support page; an FAQ once the owner supplies real answers; more finishes or colors if they exist. No routes, placeholders or data for these.

## 5. Success checks

| Job | Observable check | Method |
| --- | --- | --- |
| J1 Inspect | A first-time visitor turns the speaker to the back and the top, then returns to the starting view, without help. | 3 to 5 hallway tests, owner runs |
| J2 Check facts | A visitor finds the price and the warranty or returns fact in under a minute. | Same tests |
| J3 Buy | From the first screen, a visitor reaches the hosted checkout page in two clicks. | Click path on 390 and 1280 |
| J1 fallback | On a browser without WebGL, the visitor still sees the speaker image, price and Buy. | Test with WebGL disabled |

Baselines and conversion targets: Unknown. No analytics in this release, so sales come from the payment provider's dashboard.

## 6. Objects and lifecycles

| Object | States | Owner |
| --- | --- | --- |
| Product content (name, price, specs, notes, links) | missing, supplied | Site owner, in `src/content/product.ts` |
| 3D model | stand-in, real model supplied | Site owner |
| Viewer (in the browser) | loading, ready, unavailable (no WebGL), failed | System |
| Order | lives entirely in the hosted checkout | Payment provider |

## 7. Jobs and journey

| Job ID | User job | Priority | Section |
| --- | --- | --- | --- |
| J1 | Turn the speaker and see every side | P0 | S2 Hero and viewer |
| J2 | Check specs, price and terms | P0 | S3 Specs, S4 Buy |
| J3 | Continue to checkout | P0 | S4 Buy |

Main path: land on `/` → turn the speaker or pick a view → read specs → Buy → hosted checkout → provider confirmation page. The checkout page's back link returns to `/`.

| Trigger | Visitor sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Page loads | Name, sentence, price, Buy, still image | Viewer code loads after first paint | Turn the speaker | Nothing to save |
| Viewer ready | Speaker turns once, then rests | Render on demand | Drag, arrow keys, view buttons | Reset view returns to start |
| No WebGL or load fails | Still image stays, one plain message | Viewer stops | Read specs, Buy | Page fully usable |
| Buy (header or hero) | Scrolls to the buy section | None | Continue to checkout | Back to top via header |
| Continue to checkout | Hosted checkout page | Provider creates the order | Pay or go back | Leaving checkout before paying creates no order; the provider's page says so |

## 8. Risks and unknowns

| Gap | Effect | Owner | Needed |
| --- | --- | --- | --- |
| Product name | Header, title, h1 | Owner | Text |
| Price and currency | Hero, buy section, checkout | Owner | Amount; set in the payment provider too |
| Checkout account and link | Buy cannot work | Owner | Stripe account and Payment Link, or another provider |
| Specs and what is in the box | Specs section | Owner | Values |
| Warranty or returns fact | Buy section final line | Owner | One sentence |
| Legal pages (privacy, terms of sale, returns) | Footer, required before selling | Owner | Links to owner-written pages |
| Contact email | Footer | Owner | Address |
| 3D model | Viewer shows a stand-in | Owner | glTF or GLB, real dimensions, under 2 MB after compression |
| Still front image | Fallback and first paint | Owner | Render from the model, AVIF |
| Hosting account | Launch | Owner | Choice of host |
| H1: turning the model helps people decide | Value of the 3D work | Owner | Hallway tests above |

## 9. Dependencies

Payment provider (Proposed: Stripe Payment Links). Static host (Proposed: Vercel, Netlify or Cloudflare Pages). Google Fonts.

## 10. Feedback acceptance

| Source/date | Change | Element | Check |
| --- | --- | --- | --- |
| Owner request, 2026-10-13 | Add | Rotatable 3D model | Visitor turns the speaker by mouse, touch and keyboard on `/` |

## 11. Decision log

| ID | Decision | Status | Source/date | Affected |
| --- | --- | --- | --- | --- |
| D1 | Visitor job ends at a hosted checkout | Proposed (delegated) | Q1, 2026-10-13 | S4, T7 |
| D2 | One home page; exclusions in section 4 | Proposed (delegated) | Q2 | All |
| D3 | Dark showcase system, brass accent, Instrument Sans | Proposed (delegated) | Q3 | DESIGN.md, tokens |
| D4 | Astro with one React Three Fiber island, plain CSS tokens | Proposed | Stack step | 02, T1 |
| D5 | Stripe Payment Links for checkout | Proposed | Stack step | T7 |
| D6 | Viewer: drag and arrow keys turn; no zoom or pan; four views plus Reset view; on touch, sideways drag turns and vertical swipe scrolls | Proposed | Screen step | S2 |
| D7 | Reduced motion: no intro turn, instant view jumps, drag still works without damping | Proposed | Screen step | S2 |
| D8 | Missing facts are never guessed. Specs show only supplied rows; a content check blocks launch while required facts are empty | Proposed | Contract | S1-S4, T2 |
| D9 | Stand-in model built in code until the owner supplies a GLB | Proposed | Screen step | T4 |

## Open questions

Everything in section 8 is owned by the owner. Required before launch: name, price, checkout link, legal page links and contact email. The building tickets do not wait for them; only the live checkout link in T7 does.
