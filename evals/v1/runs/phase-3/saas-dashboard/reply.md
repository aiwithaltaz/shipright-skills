Your build pack is ready. The main screen is in `index.html`.

**What's in the pack** (copy into your project root)
- `.cursor/rules/shipright.mdc`: points Cursor to the build rules
- `docs/shipright/build-rules.md`: standing rules for every change
- `docs/shipright/01-prd.md`: users, job, scope, flows, decisions
- `docs/shipright/02-technical-architecture.md`: stack, data model, routes, access
- `DESIGN.md` and `design/tokens.css`: the design system
- `docs/shipright/04-frontend-spec.md`: four screens with states and copy
- `docs/shipright/05-feature-ticket-list.md`: ten tickets you can paste
- `index.html`: the Projects screen with made-up sample data

**Decisions I made for you** (all Proposed, easy to change)
- Users: your own team. No client logins.
- Out of scope for now: time tracking, invoicing, reports and charts, reminders, file uploads. Leads type in the amount spent so far.
- Main screen: one list of projects. Late deadlines come first, then over budget, then due soon.
- "Due soon" means within 7 days. The budget warning starts at 80% used.
- Look: a calm, dense layout with one neutral blue accent until you send your brand colors.
- Stack: Next.js, Tailwind, shadcn/ui, Supabase, Vercel. Sign-in is by email link, for invited members only.
- Working name "Client projects", set in one place.

**What only you can confirm**
1. Who can see budget figures and edit projects, and who adds new members. Until you decide, only you can sign in. Ticket T9 waits for this.
2. Your currency. The preview uses USD only to format numbers.
3. Optional: your agency name and brand colors.
4. Hosting cost. Vercel's free plan is for non-commercial use, so an agency probably needs a paid plan. Nothing was signed up.

I haven't checked the preview in a browser or at phone width yet.

**First step:** Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
