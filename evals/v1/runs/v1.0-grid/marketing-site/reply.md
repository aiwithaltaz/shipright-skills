The SocialGhost build pack is ready, with the home page as one HTML file (`index.html`). The pack is for a one-page beta application site. I have not opened the page in a browser or tested the form, so layout and form behavior are unverified.

**Files**
- `index.html`: the home page.
- `build-pack/docs/shipright/01-prd.md`, `02-technical-architecture.md`, `04-frontend-spec.md`, `05-feature-ticket-list.md` (tickets T1 to T8, each paste-ready), `build-rules.md`
- `build-pack/DESIGN.md`, `build-pack/design/tokens.css`, `build-pack/design/reference/home.html` (copy of the page)
- `build-pack/.cursor/rules/shipright.mdc`: tells Cursor to read the build rules first.

**Decisions I made for you (all Proposed)**
- Audience: people who run or plan faceless YouTube channels and can test within the window. The form asks four things: email, channel or topic, what they want to make, and a yes to the feedback window.
- Stays out: pricing, sign-in, blog, testimonials, logos, user counts, demo video, analytics, extra pages.
- Look: light page, one font (Instrument Sans), one deep teal accent, no logo.
- No product screenshot exists, so the page uses one drawing, labeled "Not a screenshot of SocialGhost".
- Stack: Astro, Tailwind, a static host and a hosted form service.

**Only you can confirm**
- When the 2 to 3 day clock starts (the terms bar assumes it starts when access is granted).
- Where testers send feedback.
- How you pick testers and reply.
- Which form service or inbox receives applications. Until one is set, the page's form says nothing was sent.
- Privacy text and a contact email. I wrote no legal text.
- A real screenshot or demo clip, to replace the drawing.
- Your hosting account and DNS. Nothing is deployed.

**First step:** paste T1 into Cursor. It sets up the project and a `/design` page. Check the look, then continue with T2.
