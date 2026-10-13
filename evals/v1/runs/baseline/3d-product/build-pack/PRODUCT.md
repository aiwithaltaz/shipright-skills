# Product

**Version/date and approval sources:** v0.1 draft, 2026-10-13. Owner request plus delegated choices Q1 to Q4. Full detail: `docs/shipright/01-prd.md`.
**User and outcome:** A visitor sees what the speaker is, turns a 3D model to see every side, checks key facts, and goes to the owner's store to buy.
**Current alternative and useful mechanism:** Current alternative is Unknown. Mechanism: a rotatable 3D model shows every side. Its effect on buying is a hypothesis.
**Current phase:** 1, product home page.
**Approved now:** One home page: name and product type, rotatable 3D model, spec list, price, one "Buy on our store" link to the existing store.
**Excluded / later notes only:** Cart, checkout, payment, accounts, reviews, ratings, testimonials, finish picker, newsletter, waitlist, chat, comparison, extra pages, analytics.

## Objects and journey

Product facts (placeholder or confirmed), 3D model (stand-in or real file), 3D view (loading, ready, unavailable), store link (not set or set).
Path: land, see the speaker, turn it, read specs, select "Buy on our store", finish on the store.

## Screens

| ID | Job | Current-phase source |
| --- | --- | --- |
| H-01 | Home: understand, inspect in 3D, check facts, go to buy | Owner request; Q1, Q2 |

## Builder rules

Build only approved current-phase scope. Follow exact feedback; do not copy incidental reference features.
Never invent brand values, data, testimonials, metrics or users. Label sample data for requested prototypes/tests.
Visual values come from DESIGN.md or existing sourced components.
Use docs/shipright/04-frontend-spec.md for states and docs/shipright/build-rules.md for handoff instructions.

**Open decisions and owners:** Owner: product name, price, store URL, specs, 3D model file, brand, legal links (D10), analytics (D9). Owner approval: settle turn on load (D6), 3D file budget (D8).
Details: docs/shipright/01-prd.md and docs/shipright/05-feature-ticket-list.md.
