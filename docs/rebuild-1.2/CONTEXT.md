# ShipRight 1.2: context

Single source of truth for the 1.2 rebuild. Read this before any later phase.

## Goal

Lead any coding tool, including a cheap one, through structured prompts:

1. Guided research. Ask the right questions. Gather the product, the audience, the story, and the assets.
2. A proper plan. Product, information architecture, a section-by-section narrative, and the stack.
3. Three genuinely premium options.
4. A premium, sleek, minimal build with the product in focus.

For a public website, the build is a full 3D / WebGL page: React Three Fiber, GSAP ScrollTrigger, and Lenis. Transitions should be at the level of the reference sites below.

This folder is the plan. Skills do not change until Altaz approves it.

## Inputs

- Pack on main `443fbf1` (ShipRight 1.1.0). Skill root: `skills/shipright/`.
- Pull request 18, branch `cursor/shipright-website-2086`, title "ShipRight website". The approved direction is Depth. It is not deployed. https://github.com/aiwithaltaz/shipright-skills/pull/18
- Owner note, 14 October 2026: the Depth site had no product focus, no structure, no architecture, and no guided research. It was a headline plus a chrome sphere. "If this is how the results are going to be, I won't use this skill myself."
- Reference pack `pr/` (16 sites, 58 screenshots, `LINKS.md`, `NOTES.md`), studied 14 October 2026. The pack is an upload for this plan. It is not committed. Skills must not load the screenshots.
- Earlier rebuild record in `docs/rebuild/`. Those decisions still hold for apps and for truth rules. They do not set the visual bar for a premium website.

## What was read

Modes: `skills/shipright/SKILL.md`, build-pack, product-design, ui-ux-design, ux-critique, and shared intake, operating contract, and flow rules.

References that shaped the Depth page: `marketing-pages.md`, `motion.md`, `anti-slop-rules.md`, `starter-systems.md`, `ticket-prompts.md`, `golden-examples.md`, `pack-contract.md`, `stack-choices.md`, `framing.md`, `research.md`, `slop-tells.md`, `severity-rubric.md`.

PR 18 pack: `site/docs/shipright/01-prd.md`, `02-technical-architecture.md`, `04-frontend-spec.md`, `05-feature-ticket-list.md`.

Reference notes in full, plus these shots: Jesko jet between "Fly in" and "Luxury", Benjamin "Selected Works" block wipe, Brand Studio FAQ hover-to-black, why.zero.university "DRAW A ZERO", vividsites Strato template page.

## Reference sites

Favorites, in the owner's words: why.zero.university (best), itomdev.com (dream), jeskojets.com, other-matter, jesperlandberg, brand-studio (FAQ hover-to-black and expand), benjamincreative ("Selected Works" stepped block wipe and scrambling counter).

The other studied sites: the-small-square-monolith, threeui.com/browse, ednaho, felixrieseberg, carterogunsola, experience2026.funtech.inc, vividsites.app/templates, aardvarkbookclub, haoqi.design.

`NOTES.md` names ten shared techniques and five striking ones. The plan's technique library is that list, rewritten as rules. It is not a copy of any site.

### Ten shared techniques

1. One hero object or scene on an empty stage, with soft light and a contact shadow.
2. A preloader or entry gate (counter, boot, tear, enter, draw-a-shape). It also hides the WebGL warm-up and asks before sound starts.
3. A scroll-scrubbed camera or pinned scroll film: one sticky stage, a long track, scroll as the timeline.
4. Corner micro-UI: tiny uppercase labels, clocks, coordinates.
5. Two type scales: a huge tight grotesk, and tiny mono labels. Little in between.
6. Near-monochrome color plus one accent.
7. Inverted hover and active states (a row flips to solid black or white).
8. A custom cursor, and 3D that reacts to it.
9. Sound, off until a visible toggle.
10. Text and mask reveals: blur to sharp, stepped block wipes, opacity lists, stagger.

Also common: Lenis-style inertia, a floating pill nav, an FAQ, and work shown as a numbered index.

### Five striking techniques

1. why.zero.university: draw a zero to enter, while a terrain-skinned hand follows the cursor.
2. felixrieseberg.com: the CRT is the navigation. Book spines are the résumé.
3. jesperlandberg.com: project cards bend with scroll speed on a perspective grid.
4. jeskojets.com: the camera flies through the window, then the jet sits between the split headline.
5. other-matter: live material spheres, a gallery URL, inspect annotations, drag to turn.

### The prompt format that works on cheap tools

vividsites.app free templates use one prompt of 545 to 1,722 words. It is split into six acts: opening, second act, third act, detail, close, footer. Pasted into v0 or Cursor, it produces one premium `index.html`. Brand New Day states the shape in its own page: one page, one canvas, a 2200vh track, six acts. Strato puts a sneaker behind repeated type and ships a 1,178 word prompt.

ShipRight tickets should learn this shape. Do not copy their prompt text, assets, or layout.

threeui.com/browse is a catalog of free Three.js pieces (hero objects on a pedestal, shaders, buttons). Borrow ideas only. Community code is MIT. Credit it in `SOURCES.md`. Do not paste its code into the skill.

## What PR 18 actually specified

The Depth PRD success check is: a floating nav, open space, and a metal 3D form. The screen order is nav, two-line headline, one sentence, Install, metal form, four slop lines, compare sliders, empty IVC labels, install tabs, footer.

Architecture: Astro, one vanilla Three.js mesh, one GSAP scrub, Lenis. The note says the brief asked for one scroll turn.

Tickets: T2 says "Build Depth" and stops. There is no act, no product hero, and no story. The frontend spec is one short screen block.

Critique reported check-ui at 0 failures and 0 warnings. The owner still rejected the result. The checker and the critique both passed a page with no product story.

## Constraints that later phases must keep

- Five mode names stay: build-pack, product-design, ui-ux-design, ux-critique, ship-check. Do not publish a sixth skill.
- Shared intake stays at 0 to 5 questions total, before starting. Do not restart intake at each mode.
- Flow rules F1, F2, and F3 stay in `flow-rules.md`. Compact export blocks stay identical.
- Gate IDs stay: product-design 8, ui-ux-design 10, ux-critique 10, ship-check 20, build-pack 10.
- Token budgets in `evals/context-policy.json`: entry 4,500; each shared file 2,000; contract plus intake 3,000; all shared rules 5,000; each reference 4,000; a normal loading path 12,000. Count the entry and the required shared rules once.
- Every new reference is linked from its mode `MODE.md` with a task-specific condition, and lives directly under that mode's `references/` folder.
- The router `SKILL.md` links only the mode it selects.
- Never invent brand values, metrics, quotes, logos, prices, legal text, or approval.
- Personal taste stays opt-in. Premium-web rules apply only to public websites and immersive pages. App screens, forms, and desks stay on the dense, calm path.
- Simple English. No em dashes in pack text.
- Ideas are borrowed. Site code, prompt text, and assets are not copied. Credits go in `SOURCES.md`. Skills cite that file and never load it.
- GSAP is not MIT. Projects install it themselves. Three.js, React Three Fiber, and Lenis are MIT.
- Historical eval runs, grades, and `examples/before-after/` stay as they are. A new release needs new evidence.

## License and credit notes for the later skill edit

| Source | Use | Do not |
| --- | --- | --- |
| Owner reference pack, 14 Oct 2026 | Name the techniques and when to use them | Copy layout, copy, shaders, models, or screenshots into the skill |
| vividsites.app free templates | The six-act prompt shape and the length range | Copy prompt wording, install commands, or template source |
| threeui.com Community | Pattern ideas for a hero object on a stage | Paste community code |
| GSAP, Lenis, React Three Fiber | Already credited in `SOURCES.md` | Vendor GSAP inside the MIT pack |

## Decisions proposed here

These are proposals. Status stays Proposed until Altaz answers. See the decision list in `PLAN.md`. Nothing in `skills/` changes in this run.
