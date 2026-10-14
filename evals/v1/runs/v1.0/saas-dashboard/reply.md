Your build pack is ready, and the main screen is in `index.html`. It shows the Projects list with sample data. A switch at the top shows the loading, empty and error states.

**What's in the pack** (copy it into your project root as it is)
- `docs/shipright/01-prd.md`: who it's for, the job, what's in and out, flows, success checks, open questions
- `docs/shipright/02-technical-architecture.md`: stack, data model, routes, access rules
- `DESIGN.md` and `design/tokens.css`: the design system
- `docs/shipright/04-frontend-spec.md`: four screens (sign in, Projects, Project detail, Project form)
- `docs/shipright/05-feature-ticket-list.md`: 12 tickets you paste into Cursor
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`: rules Cursor reads before every change

**Decisions I made for you (all Proposed, easy to change)**
- Users: the owner and project leads. The job: spot late or over-budget projects and keep deadlines and spend current.
- Left out: time tracking, invoicing, client portal, charts, reminders, integrations.
- Budget is an amount of money. You enter costs by hand.
- A project counts as "near budget" at 80% spent and "due soon" within 7 days.
- One currency per workspace.
- Look: calm and dense, with a deep blue accent and IBM Plex Sans.
- Stack: Next.js, Supabase, Vercel.

**Only you can confirm**
1. Who can see and change budgets once teammates join. Ticket T11 waits for this. Until then, each workspace has one user.
2. Whether a project can be deleted, and by whom. For now you can only mark it complete.
3. Your agency name, logo and brand colors, if you have them.
4. Hosting: a business app will likely need a paid Vercel plan. I won't sign up for anything or deploy without your OK.

**First step:** Paste T1 into Cursor. It sets up the project and a /design preview page. Check the look, then continue with T2.
