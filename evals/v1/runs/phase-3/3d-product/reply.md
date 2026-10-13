Your build pack is ready, and so is a preview of the home page.

**What's in it**
- `index.html`: the home page preview. You can turn the stand-in speaker with a mouse, by touch or with the arrow keys. It has Front, Side, Back and Top buttons and Reset view.
- `DESIGN.md` and `design/tokens.css`: the design system.
- `docs/shipright/01-prd.md`: what the site is for, what's in and out of this release, and open questions.
- `docs/shipright/02-technical-architecture.md`: the stack, content fields, routes and speed targets.
- `docs/shipright/04-frontend-spec.md`: each section of the page, with its states.
- `docs/shipright/05-feature-ticket-list.md`: tickets T1 to T10, each ready to paste.
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`: standing rules Cursor reads before every change.

**Choices I made for you (all Proposed, change any of them)**
- Visitors finish by going to a hosted Stripe checkout page.
- One home page: 3D speaker, specs, buy section, footer. No cart, accounts, reviews or newsletter.
- Dark showcase look with one brass accent and the Instrument Sans font.
- Stack: Astro, with React Three Fiber for the 3D viewer.
- No zoom on the viewer, so scrolling the page still works. On phones, a sideways drag turns the speaker and an up or down swipe scrolls.
- With reduced motion turned on, nothing moves unless the visitor drags or presses a key.

**Only you can supply these**
- The speaker's name and price, and a Stripe Payment Link. Until you add them, the build blocks launch.
- Specs, what's in the box, and one line on warranty or returns.
- Your privacy, terms of sale and returns pages, plus a contact email. I don't write legal text.
- The real 3D model as a GLB file, plus a still front image. The preview uses a stand-in I built in code.

Text in [brackets] on the preview is a placeholder. I haven't rendered or tested the page in a browser here.

Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
