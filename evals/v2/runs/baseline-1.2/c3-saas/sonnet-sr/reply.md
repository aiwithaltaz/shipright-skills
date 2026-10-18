The plan is written and the main screen is built. It is a design preview with sample data, so nothing is saved or sent.

**What you have**
- `index.html`: the Schedule board (crews by weekday, over-hours and "needs a crew" warnings, not-invoiced flags). It also has Invoices, a job panel, a job form and a send-invoice dialog. Below 1000px it becomes a day view for phones.
- `build/docs/shipright/`: PRD, architecture, frontend spec, 12 paste-ready tickets, build rules, the design preview with three directions, a critique and a ship-check.
- `build/DESIGN.md` and `design/tokens.css`.

**Decisions I made for you (all Proposed)**
- Stack: Next.js, Tailwind, shadcn/ui, Supabase, Resend, Vercel.
- One office role. Crew leads do not sign in.
- Look: calm and dense with a field-green accent (direction 1 of 3). You were not available to choose, so it is marked "Proposed, awaiting owner approval". I built on it.
- 8-hour crew day, 14-day invoice default, email-only invoices (no PDF, no payment link).
- "Crewline" is a working name, not a brand.

**Only you can confirm**
- Subscription price, invoice wording and tax lines. I did not write them.
- How crew leads see their day.
- Sender email domain and your market and currency.
- Real workday hours.

**Limits**
- No recurring jobs this release. That may hurt weekly mowing, so test it with real owners first.
- `scripts/check-ui.mjs` is missing from the pack, so I ran my own browser checks. Screen reader, Safari and Firefox are not verified.
- Ship-check verdict: Not established. This is a preview, not a launch candidate.

**Next:** approve or change the look, then run ticket T1.
