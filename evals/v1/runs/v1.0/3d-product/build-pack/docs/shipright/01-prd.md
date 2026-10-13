# 01 - Product requirements

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** the owner's request ("a product website for a premium wireless speaker with a 3D model the visitor can rotate"). Frame, scope and look were delegated with "You decide", so those choices are **Proposed (delegated)**. Nothing here is Approved by a separate review yet.

## 1. Frame

| | |
| --- | --- |
| **Who** | Shoppers who are considering this speaker and want to see it properly before buying. |
| **Job** | Inspect the speaker from every side, check what it is, then go to buy it. |
| **What they do today** | Unknown. Owner to confirm where the speaker is sold now, if anywhere. |
| **This release finishes** | One home page: a 3D speaker the visitor can turn, the specs, and a Buy link to the owner's store or checkout. |
| **What stays out** | See section 4. |

The product name is Unknown. All files use the working name **Model 01** until the owner supplies the real one.

## 2. Useful mechanism

A still photo shows one side. A model the visitor can turn shows shape, top and back, which matters for an object that sits in a room.
This is a hypothesis, not evidence. Test: after launch, compare how many visitors who use the viewer also press Buy, if the owner adds analytics later.

## 3. Users and constraints

- One actor: the visitor. No sign-in, no accounts, no staff screens.
- Devices: phone and desktop browsers. Phone traffic share is Unknown, so both are first-class.
- The 3D view must never block reading or buying. A still view is always present.

## 4. Current phase

**Phase:** Release 1, home page.
**Approved now (delegated):** the home page with header, 3D viewer, specs, buy section and footer; a 404 page; a `/design` preview page for the owner, not linked from the site.
**Explicitly excluded:** cart, checkout on this site, accounts, reviews, blog, newsletter, chat, finish or color picker, comparison pages, multiple products, analytics, cookie banner, translations.
**Later notes only:** finish picker in the viewer (needs real finishes); sound or listening demo; retailer list. No routes, data or disabled controls for these.

## 5. Success checks

| Job | Observable check | Baseline | Source / method |
| --- | --- | --- | --- |
| J1 Inspect | A visitor turns the speaker to the back and top without help, on a phone and a laptop. | Unknown | Watch three people try it before launch. |
| J2 Check specs | A visitor finds the size and battery facts within 10 seconds of landing. | Unknown | Same session. |
| J3 Buy | Pressing Buy opens the owner's store page for this speaker. | Unknown | Manual check before launch. |

No traffic, conversion or sales targets are set. The owner has not supplied any.

## 6. Objects

| Object | States | Owner |
| --- | --- | --- |
| Product content (name, sentence, specs, price, store link) | Each field: Unknown or Confirmed | Owner |
| 3D model | Placeholder (built in code) or Final (owner's glTF) | Owner supplies the final file |
| Viewer | Still, Loading, Ready, Unavailable (no WebGL), Paused (off screen) | System |

Unknown content fields render as "To confirm" in previews only. Before launch every visible field is Confirmed or removed.

## 7. Jobs and flows

| Job ID | User job | Priority | Screen |
| --- | --- | --- | --- |
| J1 | Turn the speaker and see every side | P0 | S1 Home, hero viewer |
| J2 | Check the specs | P0 | S1 Home, specs |
| J3 | Go to buy | P0 | S1 Home, hero and buy section |

### J1 Inspect

| Trigger or state | Visitor sees | System effect | Next action | Exit |
| --- | --- | --- | --- | --- |
| Page opens | Name, sentence, Buy, still view of the speaker | 3D loads after first paint | Read, scroll, view buttons | Header links |
| 3D ready | Model fades in at the same spot and turns once into place | Canvas replaces the still | Drag, arrow keys, Front, Side, Back, Top | Reset view returns to the start angle |
| 3D cannot run or fails | Still view with view buttons and a plain note | No canvas | View buttons, Try again where offered | Header links |

Exact copy for each viewer state lives in the S1.2 state table of `04-frontend-spec.md`.

### J2 Check specs

Header "Specs" link or scrolling reaches the specs section. Facts are a plain list. Exit: header links, Buy below.

### J3 Buy

| Trigger | Visitor sees | System effect | Next action | Exit |
| --- | --- | --- | --- | --- |
| Buy (hero) | Page scrolls to the buy section | Focus moves to its heading | Read price, delivery, returns, press Buy Model 01 | Header links |
| Buy Model 01 | The owner's store page opens in the same tab | Normal navigation | Check out in the store | Browser Back returns to the page |
| Store link not set (preview only) | Inline note: "The store link is not connected yet." | Nothing else | Use the rest of the page | Same |

Flow rules F1-F3 are in build-rules.md.

## 8. Risks and unknowns

| Gap | Effect | Owner | Needed |
| --- | --- | --- | --- |
| Product name | Headline and page title use a working name | Owner | Final name |
| Price | Price is left off the page | Owner | Price and currency per market |
| Store or checkout link | Buy cannot go live | Owner | URL for this product |
| Specs | Specs show "To confirm" in preview | Owner | Connection, battery, size, weight, finishes, box contents |
| Final 3D model | Placeholder model ships only as a preview | Owner | glTF or CAD file, or approval to commission one |
| Delivery and returns | Buy section facts missing | Owner | Short plain statements |
| Legal pages and contact | Footer has no legal links | Owner | Privacy, terms, imprint as required where sold; contact address |
| Domain and hosting account | Cannot deploy | Owner | Domain; who owns the hosting account |

## 9. Dependencies

The owner's existing store or checkout (link only). No other systems.

## 10. Feedback acceptance

| Source/date | Change | Element | Acceptance check |
| --- | --- | --- | --- |
| Request, 2026-10-13 | Add | 3D model the visitor can rotate | Drag and arrow keys turn the model at 1280 and 390 wide; still view present without WebGL |
| Request, 2026-10-13 | Add | Home page as one HTML file | Preview `index.html` delivered with the pack |

## 11. Decision log

| ID | Decision | Status | Source/date | Affected |
| --- | --- | --- | --- | --- |
| D1 | Audience: shoppers close to buying; job J1-J3 | Proposed (delegated) | Owner "you decide", 2026-10-13 | All |
| D2 | Scope: one home page, Buy links out; exclusions in section 4 | Proposed (delegated) | Same | PRD, tickets |
| D3 | Look: dark showroom, starter D adapted, brass accent, Manrope | Proposed (delegated) | Same | DESIGN.md, tokens |
| D4 | Stack: Next.js static export, React Three Fiber, GSAP, Lenis | Proposed | Assistant, for Cursor | 02, tickets |
| D5 | Working name "Model 01" and a placeholder model built in code | Proposed | Assistant, name Unknown | All |
| D6 | Hosting: a static host with a free plan that allows commercial sites | Proposed | Assistant | 02 |
| D7 | Checkout provider and price | Unresolved, owner only | Payments are never delegated | T7 |

## Open questions for the owner

Product name, price, store or checkout link, specs, final 3D model, delivery and returns text, legal pages and contact, domain.
