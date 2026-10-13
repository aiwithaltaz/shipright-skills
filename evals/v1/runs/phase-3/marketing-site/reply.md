The SocialGhost build pack and the home page preview are ready.

**What's in it**
- `index.html`: the home page preview. Put it in your project as `reference/home-preview.html`.
- `DESIGN.md` and `design/tokens.css`: the look.
- `docs/shipright/01-prd.md`: audience, scope, decisions.
- `docs/shipright/02-technical-architecture.md`: stack, routes, form data.
- `docs/shipright/04-frontend-spec.md`: each section's copy and states.
- `docs/shipright/05-feature-ticket-list.md`: 10 tickets to paste into Cursor.
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`: rules for Cursor.

**Choices I made for you (Proposed, you can change any)**
- Audience: people who already run a faceless channel and new creators. The form asks which.
- One page with the application form at the end, plus a privacy page and a 404 page.
- Look: off-white page, one indigo accent, Instrument Sans, and a drawn "faceless video" frame in place of a product image.
- "Useful feedback" means: what you tried to make, where you got stuck, what the video got right and wrong, and whether you would post it.
- Stack: Astro, a hosted form service such as Formspree, and free static hosting.

**Only you can confirm these**
- Privacy notice text. It blocks launch because the form collects emails. I did not write it.
- How long free access lasts, and what happens after the beta.
- How testers get access. The page says "we email the testers we pick".
- When the 2 to 3 days start. The page says "of getting access".
- A contact email, your logo or brand colors, and a short screen recording to replace the drawing.

The preview form is not connected, so it says "Nothing was sent". I did not run the page checker, so phone layout is unchecked.

**First step:** Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
