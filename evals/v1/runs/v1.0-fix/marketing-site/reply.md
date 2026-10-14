**Your files**
- `index.html`: the home page preview. Save it as `design/home-preview.html`; Cursor copies its text. Add `?state=error` or `?state=sent` to see the form's failure and success states.
- `docs/shipright/01-prd.md`: who it's for, the beta deal, scope, flows, open questions
- `docs/shipright/02-technical-architecture.md`: stack, routes, form data, budgets
- `DESIGN.md` and `design/tokens.css`: the design system
- `docs/shipright/04-frontend-spec.md`: Home, Application received, Not found
- `docs/shipright/05-feature-ticket-list.md`: 8 tickets, ready to paste
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`: rules Cursor reads before every change

**Decisions I made for you (all Proposed)**
- Audience: people who run or are starting a faceless channel and can test within days.
- Scope: one home page with the application form at the end, plus an "Application received" page and a Not found page.
- Look: light and editorial, Instrument Sans, one deep red for the Apply button.
- Stack: Astro, Tailwind CSS, Netlify hosting and Netlify Forms, free to start.
- Form: name, email, YouTube channel (optional), what they want to make, and a box to commit to feedback within 2 to 3 days.
- The 2 to 3 days start when a tester gets access, not when they apply.
- The hero picture is a labeled illustration drawn in code, not a fake app screen.

**Only you can confirm**
- **A privacy policy.** The form collects names and emails, so do not launch without one. I did not write it.
- How SocialGhost actually works (the steps), and a real sample video. Then a "How it works" section can be added.
- How testers send feedback, how you pick testers, and how long free access lasts.
- A contact email, your logo and your company name.

Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
