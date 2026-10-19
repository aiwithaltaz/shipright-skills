# ShipRight 1.4 site update: what changed and why

Before = the live site on main (d022623, the rebuild from Oct 19). After = branch feat/1.4-knowledge.

Note: the old weak spots from 1.3.1 (beige 3D files, plain process, 390 slider crop, case study padding, "scores pending" 5 times) were already fixed by the Oct 19 rebuild, which removed the 3D stack. So this round used the new skill on the page as it is now.

## 1. Stages: "The base first. Then the pixels."
- Before: a 4 by 3 grid of stage names and file names. It said what each stage is called, not what it does. On a phone, "Scope and pages" wrapped and the grid went uneven.
- After: two lists, Base (idea to plan) and Make (plan to shipped). Each stage has one line on what it now does, like "Every screen: one job, one action, empty, loading, error".
- Why: the base is what 1.4 is about. The dealt card "swap the logo test" says a section should only make sense for this product. A plain list of names would fit any tool.

## 2. New act: "It reads 6 cards, not 64 websites."
- Before: not on the page.
- After: a short funnel (64 sources, 445 cards, 6 for this stage) and the real dealer output for stage 5.
- Why: this is the main idea of 1.4, and it answers "how can a skill know so much without getting long". The numbers come from the library file, not made up. It is centered with a drawing, so it is not a copy of the split layout used by "What lands in your folder" (the check-ui composition rule caught that on the first try).

## 3. Smaller fixes
- Nav: added "What it knows". It still fits on one line at 1280, and the phone uses the Menu button.
- "1.3 also keeps a project record" now says "It also keeps", so it does not go stale.
- The case study description no longer says a release state.
- Spacing on the new parts uses the 4, 8, 16, 24, 32, 48 scale (consistency.mjs flagged 12, 20 and 56 at first).
- The site record now passes the new `check-record --base --ship`: idea brief, screens with states, project rules, security, preview and QA, monitoring. Before, it failed 6 of those.

## Checks on the after page
- Premium check-ui on home and case study: 0 fail, 0 warn at 390 and 1280.
- consistency.mjs: pass. check-record --base --ship: pass. crawl: no console errors.

## Honest verdict
Clearer and more honest, not a big visual jump. The page explains the base now. It is still a calm, mostly type-led page. The proof act still has no real scores, because no 1.4 run has been graded.

Pictures in this folder: stages-1280.png, stages-390.png, knows-1280.png, knows-390.png.
