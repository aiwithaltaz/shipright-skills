# 01 - Product requirements

**Project path:** `docs/shipright/01-prd.md`

**Version/date:** v0.1 draft, 2026-10-13  **Sources and approval:** Owner request ("a product website for a premium wireless speaker with a 3D model the visitor can rotate", home page shown as one HTML file). Choices Q1 to Q4 delegated by the owner on 2026-10-13 ("You decide. Use your recommended picks").

Unknown facts stay Unknown. Proposed decisions are not build scope until approved.

## 1. Problem and outcome

The owner sells a premium wireless speaker and wants a website for it.
Outcome for this phase: a visitor can see what the speaker is, turn a 3D model of it to see every side, check its key facts, and go to the store to buy it.
Why visitors need this, and what they compare it with, is Unknown. No research was supplied.

## 2. Useful mechanism

A 3D model the visitor can rotate shows the product from every side, which photos from fixed angles do not. Source: owner request.
Whether rotating the model changes buying decisions is a **Hypothesis**, not a finding. Test: compare Buy link use with and without the viewer, once analytics is decided (D9).

## 3. Users and constraints

| Actor | Job | Device | Access |
| --- | --- | --- | --- |
| Visitor | Learn about the speaker and go to the store to buy it | Phone and desktop browsers (web site, no app) | Public, no sign-in |

No other roles exist in this phase.
Constraint: the 3D view must work with mouse, touch and keyboard, and must not block the page when 3D is unavailable.

## 4. Current phase

**Phase:** 1, product home page.
**Approved now:** one home page with: name and product type; a 3D model the visitor can rotate; a short spec list; a price; one Buy link that opens the owner's existing store. Sources: owner request, Q1 and Q2 (delegated).
**Explicitly excluded:** cart, checkout and payment on this site; accounts; reviews and ratings; testimonials; color or finish picker; newsletter or waitlist; chat; comparison; extra pages (specs page, support page, blog). Source: Q2 (delegated).
**Later notes only:** a finish picker once real finishes and 3D variants exist; a support page; a waitlist if the store is not ready at launch. No rendered controls, routes or data models for these.

## 5. Success evidence

| Signal | Baseline | Target | Source / method |
| --- | --- | --- | --- |
| Visitors who open the store from the Buy link | Unknown | Unknown | Needs an analytics decision (D9). Not in this phase. |
| Visitors who interact with the 3D view | Unknown | Unknown | Same as above. |

No metrics, prices or proof are invented.

## 6. Objects and lifecycles

| Object | Independent states | Actor / owner |
| --- | --- | --- |
| Product facts (name, price, specs) | Placeholder, Confirmed | Owner supplies; site displays |
| 3D model | Stand-in (code-built), Real file supplied | Owner supplies the file |
| 3D view (runtime) | Loading, Ready, Unavailable | Visitor's browser |
| Store link | Not set, Set | Owner supplies |

## 7. Jobs and journey

| Job ID | User job | Phase | Priority | Screen / flow |
| --- | --- | --- | --- | --- |
| J1 | Understand what the product is | 1 | P0 | H-01 hero |
| J2 | Turn the speaker to see every side | 1 | P0 | H-01 3D viewer |
| J3 | Check the key facts | 1 | P0 | H-01 Specifications |
| J4 | Go to the store to buy | 1 | P0 | H-01 Buy, then the external store |

Main path: land on the page, see the name and the 3D speaker, drag or use the buttons to turn it, read the specs, select "Buy on our store", finish on the store.

| Starting state | Missing dependency | Permitted next action | Preserved work | Completion condition |
| --- | --- | --- | --- | --- |
| Visitor lands directly on `#specs` or `#buy` | None | Read, buy, or scroll up to the viewer | Nothing to preserve | Store opens |
| 3D cannot run (old browser, no WebGL, context lost) | 3D view | Read specs, use Buy | Nothing to preserve | Store opens |
| Visitor returns from the store with Back | None | Page shows again at its last scroll position | Nothing to preserve | None |

## 8. Risks and unknowns

| Gap | Effect | Owner | Decision or evidence needed |
| --- | --- | --- | --- |
| Product name | Page uses the working name "Model 01" | Owner | Real name |
| Price and currency | Buy section shows a placeholder | Owner | Price; delegation cannot set a price |
| Store link | Buy link goes nowhere | Owner | Store product URL |
| Specs (battery, size, weight, finishes, anything else) | Spec rows show placeholders | Owner | Confirmed figures and which rows to show |
| 3D model file | Page shows a code-built stand-in | Owner | A .glb file; see D8 for the proposed budget |
| Brand (logo, colors, fonts) | Working system in DESIGN.md is used | Owner | Brand assets, or approve the working system |
| Legal pages and company name | Footer has no legal links | Owner | Whether privacy/terms pages are needed and their text. Not written here. |
| Large 3D file on slow phones | Long loading, data cost | Builder | Measure with the real file (T8) |

## 9. Dependencies

The owner's existing store (URL Unknown). The 3D model file (Unknown). No other systems.

## 10. Feedback acceptance

| Source/date | Keep/remove/change/add | Element | Exact acceptance check |
| --- | --- | --- | --- |
| Owner request, 2026-10-13 | Add | 3D model the visitor can rotate | Drag turns the model on mouse and touch; buttons and arrow keys also turn it. |
| Owner request, 2026-10-13 | Add | Home page as one HTML file | `index.html` prototype delivered as visual reference. |

## 11. Decision log

| ID | Scope / decision | Status | Source/date | Replaces | Affected artifacts |
| --- | --- | --- | --- | --- | --- |
| D1 | Main action: "Buy on our store" opens the owner's existing store in the same tab. No cart or payment on this site. | Approved (delegated) | Q1, 2026-10-13 | None | 04, 05 T7, index.html |
| D2 | Scope: one home page with 3D viewer, specs, price and one Buy link. Exclusions as in section 4. | Approved (delegated) | Q2, 2026-10-13 | None | All |
| D3 | Identity: working name "Model 01" and the working dark system in DESIGN.md, marked as a stand-in until the brand is supplied. | Approved (delegated) for phase 1 | Q3, 2026-10-13 | None | DESIGN.md, index.html |
| D4 | Stack: static site, HTML, CSS and JavaScript with three.js, built with Vite. No server. | Approved (delegated) | Q4, 2026-10-13 | None | 02, build-rules, 05 T1 |
| D5 | Until the real file arrives, use the code-built stand-in speaker, labeled as a stand-in. | Approved (follows D3 and missing file) | 2026-10-13 | None | 05 T4, T8 |
| D6 | One short settle turn (about 1.6 s) when the 3D view first loads, to show it can rotate. Off for reduced motion. | Proposed | Assistant, 2026-10-13 | None | DESIGN.md Motion, 04 |
| D7 | Turn left, Turn right and Reset view buttons plus arrow keys, as non-drag and keyboard ways to rotate. | Approved (part of the requested rotate feature; WCAG 2.2 2.5.7 and 2.1.1) | 2026-10-13 | None | 04, 05 T5 |
| D8 | Real 3D file budget: one .glb, Draco or Meshopt compressed, about 3 MB or less, textures 2048 px or less. | Proposed | Assistant, 2026-10-13 | None | 02, 05 T8 |
| D9 | Analytics and cookies. | Unresolved, not in phase 1 | Owner | None | 03, 05 |
| D10 | Legal links and company name in the footer. | Unresolved | Owner | None | 04 footer |

Document completion is not implementation readiness. Critical unresolved facts before launch: name, price, store link, specs and the 3D file.
