# Product

**Version/date and approval sources:** 0.1, 2026-10-13. Founder request (R1) and founder delegation "You decide" (R2). Short export of `docs/shipright/01-prd.md`.
**User and outcome:** Serious beta testers for SocialGhost understand the beta deal and send an application.
**Current alternative and useful mechanism:** Current recruiting method Unknown. One page states the deal (free access for useful feedback within 2 to 3 days) and asks applicants to commit to that window.
**Current phase:** P1, Beta recruitment site.
**Approved now:** S1 Home page with hero, How the beta works, Apply section with form; one `POST /api/apply` endpoint.
**Excluded / later notes only:** pricing, sign-up/login, dashboard, testimonials, ratings, counts, sample gallery, blog, newsletter, chat widget, analytics, admin screens. Real samples and a product walkthrough wait for founder-supplied facts.

## Objects and journey

- **Application:** Draft in browser (not saved), Sent, Failed to send. The founder reviews outside the site: Not reviewed, Selected, Not selected. Review status is not shown on the site.
- **Main path:** land on S1, read the deal, select "Apply for the beta", fill the form, select "Send application", see "Application sent".

## Screens

| ID | Job | Current-phase source |
| --- | --- | --- |
| S1 | Home: understand the beta deal and apply | R1, D1, D11 |

## Builder rules

Build only approved current-phase scope. Follow exact feedback; do not copy incidental reference features.
Never invent brand values, data, testimonials, metrics or users. Label sample data for requested prototypes/tests.
Visual values come from DESIGN.md or existing sourced components.
Use docs/shipright/04-frontend-spec.md for states and docs/shipright/build-rules.md for handoff instructions.
Do not describe what SocialGhost does beyond "a live AI tool that makes faceless YouTube videos" until the founder supplies more.

**Open decisions and owners:** D2 product facts (founder), D4 storage and notification provider (founder), D7 free access duration (founder), D8 privacy text (founder and adviser; launch blocker).
Details: docs/shipright/01-prd.md and docs/shipright/05-feature-ticket-list.md.
