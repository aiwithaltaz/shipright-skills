I planned and built a LinkedIn **post scheduler**, not a bot. Open `index.html` to see the main screen: a week of posts, an editor beside it, and a "Preview state" switcher at the top for empty, loading, failed and expired-connection views. It runs on sample data and sends nothing to LinkedIn.

**Why not full automation:** LinkedIn's rules prohibit bots and extensions that automate other activity on the site, such as mass connection requests, auto-messages, auto-likes and profile scraping. Building those would put your account at risk, so they are out. The app posts only through LinkedIn's official sign-in and posting access, and nothing publishes until you approve it.

**What is in `build/`**
- `docs/shipright/`: PRD, architecture, frontend spec, 10 paste-ready tickets, build rules, design directions, critique, ship-check
- `DESIGN.md` and `design/tokens.css`
- `AGENTS.md` pointer for your coding tool

**Decisions I made for you (all Proposed, awaiting your OK)**
- One person, their own profile.
- Write, approve and schedule posts only. No outreach, comments or scraping.
- Calm, dense, light look with a deep teal accent. I compared three directions and picked this one for fast scanning.
- Next.js, Supabase, Vercel, LinkedIn sign-in. Working name "Postdesk".

**Only you can confirm**
- Name, logo, price and plan. Never delegated.
- Privacy policy and terms text.
- Whether LinkedIn approves your developer app, and how long its tokens last.
- Whether you want "Draft with AI" (ticket T8, off by default).
- How you post today.

**Checks:** layout, contrast and keyboard paths passed in my own browser runs. The pack's `check-ui.mjs` was missing, so I did not run it. Settings, Connect, real publishing, screen readers and persistence are not verified. Ship-check verdict: Not established, because it is a prototype.

**Next step:** pick or approve a design direction (see `build/docs/shipright/design-preview.html`). Then ticket T1 builds the look as a `/design` page for a quick OK before any screen.
