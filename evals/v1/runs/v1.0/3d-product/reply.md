I wrote your build pack, plus the home page as one HTML file.

**Files**
- `index.html`: the home page. You can turn the speaker by dragging or with the arrow keys, or use Front, Side, Back, Top and Reset view. If 3D can't run, still views take its place.
- `docs/shipright/01-prd.md`: who it's for, the job, scope, flows, open questions
- `docs/shipright/02-technical-architecture.md`: stack, content file, routes, 3D budgets
- `DESIGN.md` and `design/tokens.css`: the design system
- `docs/shipright/04-frontend-spec.md`: the screens, their states and copy
- `docs/shipright/05-feature-ticket-list.md`: 10 tickets you can paste into Cursor
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`: standing rules for Cursor

**Decisions I made for you (Proposed)**
- Audience: shoppers close to buying. They turn the speaker, check the specs, then press Buy.
- Scope: one home page. Buy links to your store. No cart, accounts, reviews or color picker.
- Look: a dark showroom, one brass accent on Buy, Manrope font.
- Stack: Next.js static site, React Three Fiber, GSAP and Lenis, with reduced-motion versions.
- Hosting: a static host whose free plan allows commercial sites. Vercel's free plan does not.
- Working name "Model 01" and a placeholder speaker built in code.

**Only you can confirm**
- Product name and price
- The store or checkout link for Buy
- Specs: connection, battery, size, weight, finishes, what's in the box. The preview shows "To confirm" for each.
- The real 3D model file. Ticket T8 swaps it in.
- Delivery and returns wording, legal pages, contact address, domain

Nothing gets deployed or published without your OK.

**First step:** Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
