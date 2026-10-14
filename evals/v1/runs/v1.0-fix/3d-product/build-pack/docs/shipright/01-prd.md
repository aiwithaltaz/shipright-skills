# 01 - Product requirements

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** the owner's request ("a product website for a premium wireless speaker with a 3D model the visitor can rotate"). The owner delegated the open choices ("You decide"). Every delegated choice is marked Proposed (delegated) in the decision log.

## 1. Frame

| | |
| --- | --- |
| Who | People thinking about buying the speaker who land on its website, on a phone or a laptop. |
| Job | See what the speaker looks like from every side, then go to the store to buy it. |
| What they do today | Unknown. There is no site yet. Shoppers usually rely on product photos. |
| This release finishes | A one-page site: turn the speaker in 3D, read the details and specs, and follow one Buy link to the owner's store. |
| What stays out | Listed in section 4. |

Product facts are Unknown until the owner sends them: the name, the price, the specs, the real 3D model, the finishes and the store link. Until then the site uses the working name "Model 01" and a placeholder model drawn in code. The price is left out. See section 8.

## 2. Useful mechanism

Photos show chosen angles. A 3D model lets the visitor check the back, the top and the proportions themselves.
Hypothesis, not a finding. Test it with the J1 and J2 checks in section 5.

## 3. Users and constraints

- One actor: the visitor. No accounts, no roles, no staff screens.
- Devices: phones from 360 px wide and desktops up to wide screens. Touch, mouse and keyboard.
- Some visitors have reduced motion turned on, slow networks or no WebGL. They still see the speaker from the front, side and back as still images.
- Payments happen on the owner's store, not on this site.

## 4. Current phase

**Phase:** Release 1, a one-page product site.
**Approved now (delegated):** S1 Home with the 3D viewer, details, specifications and a buy section. S2 Not found page.
**Not in this release:**
- Cart, checkout and payments on this site.
- Accounts and sign-in.
- Reviews, ratings, testimonials and press quotes.
- A colour or finish configurator.
- Blog, newsletter and email capture.
- FAQ. It needs real answers about delivery, returns and warranty first.
- Analytics and cookie banners.
- Scroll-driven animation, pinned sections and smooth scrolling.
- More languages and more products.

**Later notes only:** a finish configurator once real finishes exist; an FAQ once the owner supplies answers. These get no routes, no hidden controls and no data fields now.

## 5. Success checks

| Job | Observable check | Method |
| --- | --- | --- |
| J1 Inspect | Asked to "check the back, then buy it", a first-time visitor turns the speaker to its back within 30 seconds. | Watch five people. Baseline Unknown. |
| J2 Buy | The same visitor reaches the store page from the home page in one click. | Same session. Check the link opens the owner's store. |
| J1 fallback | With reduced motion on, or with WebGL off, the front, side and back views still show. | Browser settings test. |
| Speed | LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile. | Real-device and field data after launch. |

## 6. Objects

| Object | States | Owner |
| --- | --- | --- |
| Product content (name, lead sentence, details, specs, store link) | Sample or Final, per field | Owner |
| 3D model and still images | Placeholder or Final | Owner supplies; builder compresses |
| 3D viewer | Still, Loading, Ready, Reduced (still with "Open 3D view"), Unsupported, Error | System |

## 7. Jobs and flows

| Job ID | Job | Screen |
| --- | --- | --- |
| J1 | Inspect the speaker from every side | S1 hero viewer, S1 details |
| J2 | Check the specs | S1 specs |
| J3 | Go to the store to buy | S1 Buy links |
| J4 | Recover from a wrong address | S2 |

**J1 Inspect**

| Trigger or state | User sees | System effect | Next action | Exit |
| --- | --- | --- | --- | --- |
| Page opens | Name, sentence, Buy, front still image | 3D loads after first paint | Front, Side, Back, or wait | Scroll on; header links |
| 3D ready | The speaker turns once and settles | None saved | Drag, arrow keys, view buttons, Reset view | Same |
| 3D cannot run (reduced motion, Save-Data, no WebGL, load failure) | The still stays with the view buttons and a plain status line | Nothing else changes | View buttons; Open 3D view or Try again where offered | Same |

Exact state texts live in `04-frontend-spec.md`, S1 Viewer states.

**J3 Buy**

| Trigger | User sees | System effect | Next action | Exit |
| --- | --- | --- | --- | --- |
| Click Buy (header, hero or buy section) | The store page in the same tab | Normal link | Order on the store | Browser Back returns to the site |
| Store link not set (preview only) | "The store link is not set in this preview. Add it before launch." beside the button | No navigation | Owner adds the link | Stays on page |

Nothing on this site saves data, so no work can be lost on leaving.

## 8. Open questions (owner: you)

| Gap | Blocks | Needed |
| --- | --- | --- |
| Product name | Final copy, page title | The real name, or approval of "Model 01" |
| Store link | T3 done-when, launch | The URL of the product on your store |
| Price | Nothing on this site; the store shows it | Confirm the site should not show the price |
| Spec sheet | Specs rows | Connection, playback time, charging, size, weight, finish, box contents |
| 3D model and stills | T7 | A glTF or source file; or approval to commission one |
| Detail facts | Details copy | What the top ring, the knit and the back plate really are, or the real details to show |
| Contact and legal links | Footer, launch | Your contact route and any legal pages you publish. ShipRight does not write legal text. |
| Hosting account and domain | Launch | Your account; nothing is signed up or deployed for you |

## 9. Decision log

| ID | Decision | Status | Source/date | Affected |
| --- | --- | --- | --- | --- |
| D1 | Visitors inspect in 3D, then buy on the owner's existing store. No on-site checkout. | Proposed (delegated) | Owner "You decide", 2026-10-13 | PRD, S1, T3 |
| D2 | Release 1 is S1 Home and S2 Not found. Exclusions as in section 4. | Proposed (delegated) | Same | All |
| D3 | Look: dark showroom system (starter D), warm metal accent, Manrope. | Proposed (delegated) | Same | DESIGN.md, tokens, T1 |
| D4 | Stack: Astro, TypeScript, plain three.js, CSS tokens, static hosting. | Proposed | Same | 02, T1 |
| D5 | Placeholder model drawn in code until the real model arrives. | Proposed | Same | T4, T7 |
| D6 | One signature move: a single turn when the 3D view first appears. No scroll animation. | Proposed (delegated) | Same | DESIGN.md, T6 |
| D7 | Reduced motion and Save-Data get still images first and 3D on request. | Proposed | motion rules | S1, T5 |
