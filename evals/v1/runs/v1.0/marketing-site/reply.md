The SocialGhost build pack is ready, and so is the home page preview (`index.html`).

**What's in the pack**
- `docs/shipright/01-prd.md`: who it's for, the job, what's in and out, the apply flow, success checks, open questions
- `docs/shipright/02-technical-architecture.md`: stack, routes, application fields, who can see what, budgets
- `DESIGN.md` and `design/tokens.css`: the design system
- `docs/shipright/04-frontend-spec.md`: home page, 404 and `/design` page, with all the page text written out
- `docs/shipright/05-feature-ticket-list.md`: tickets T1 to T9, ready to paste into Cursor
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`

**Choices I made for you (Proposed, you can change them)**
- A serious tester has a channel, or is about to start one, and promises feedback within 2 to 3 days. The form asks five questions.
- The site is one page with the form on it, plus a 404 page. No pricing, sign-in, blog, testimonials or analytics.
- The look: off-white page, dark ink text, one indigo accent and the Geist font. The main picture is a video frame built in code. It plays its captions once and has a Pause button.
- The stack: Astro on Netlify. Applications go to Netlify Forms, so there are no keys and no extra service.

**What only you can confirm**
- A privacy policy link. The form collects emails, so this blocks launch (T9) but not building.
- How long free access lasts, and what happens after the beta or if a tester misses the 2 to 3 day window.
- How testers send feedback, and when applicants hear back.
- Your logo, a contact email, and real SocialGhost sample videos. Real videos would be stronger proof than the illustration.

**In the preview:** the form only pretends to send. Nothing is submitted. Add `?preview=error` to the URL to see the error state.

**First step:** Save `index.html` as `docs/shipright/reference-home.html`. Paste T1 into Cursor. It sets up the project and a `/design` preview page. Check the look, then continue with T2.
