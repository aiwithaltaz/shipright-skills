The build pack and the main screen are ready. Before Cursor starts, you need to make three decisions and give me one fact. They are listed at the end.

**What I built, using my picks**
- **Users:** agency staff only. Every signed-in staff member sees all projects.
- **Budget:** a money amount per project, plus a "spent so far" amount the lead types in. No time tracking.
- **Phase 1 job:** one list that puts projects that need attention first. Staff can add a project, edit it, and mark it Completed.
- **Left out:** client logins, time tracking, invoices, reminders, links to other tools, charts and summary cards.
- **Look:** system font, gray and white, one blue for actions. Status always shows as a word, an icon and a color.

**The main screen** (`index.html`)
- Projects are split into two groups: "Needs attention" first, then "On track".
- Each row shows the project and client, the lead, the due date with its status, and the budget. The budget shows spent against budget, % used, and when "spent" was last updated.
- Click a project name to open the edit panel. Change the numbers or dates, then save. The list re-sorts and confirms the save.
- Other states you can preview: add `#empty`, `#loading`, `#error` or `#save-error` to the end of the page address.
- All names and amounts are made-up sample data. Nothing is stored, and a reload resets the page.

**Files for Cursor** (copy `build-pack/` into your project root)
- `PRODUCT.md`: scope, exclusions, screens
- `DESIGN.md`: colors (contrast measured), type, spacing, components, placement
- `docs/shipright/01-prd.md`: jobs, health rules, decision log
- `docs/shipright/02-technical-architecture.md`: proposed stack, tables, save flow
- `docs/shipright/03-security-and-access.md`: who can do what, server-side rules
- `docs/shipright/04-frontend-spec.md`: every screen state and acceptance check
- `docs/shipright/05-feature-ticket-list.md`: 9 ordered tickets
- `docs/shipright/build-rules.md`: rules for the builder
- `.cursor/rules/project.mdc`: tells Cursor which files to read first, and to stop at open decisions

**Status: Needs decision (D7, D8, D9, time zone).** The spec is complete enough to build from once these four are settled. The preview shows layout and content only. Saving, sign-in, keyboard use and access rules are not verified until they are built.

| Check (UI pre-flight, spec and preview stage) | Status |
| --- | --- |
| 1 Screen context | Pass |
| 2 Design direction | Pass (delegated to me, recorded as D5) |
| 3 Hierarchy | Pass in preview |
| 4 States | Pass (spec); runtime not verified |
| 5 Integrity and consistency | Pass (sample data labeled) |
| 6 Navigation and exits | Pass (spec); runtime not verified |
| 7 Accessibility | Pass (spec, contrast measured); keyboard and screen reader not verified |
| 8 Motion | Pass (drawer slide only, turned off with reduced motion) |
| 9 Content and density | Pass (spec); no rendered screenshot check was run |
| 10 Handoff | Pass, with open decisions below |

**Needs approval before build**
1. **D7: Who can change projects?** My proposal: every staff member can add, edit and complete projects. You invite staff outside the app. I cannot decide this for you, because it is an access rule.
2. **D8: Stack.** My proposal: Next.js, Supabase (database and email sign-in links), Tailwind, shadcn/ui, hosted on Vercel. Say OK or name your own.
3. **D9: Currency.** Which one? Unknown.
4. **Your time zone.** It decides when a project becomes Overdue.

Also proposed, and easy to change later: "Near limit" starts at 90% of budget, and "Due soon" means within 7 days (D6). Phase 1 has no delete; you mark projects Completed instead (D10).
