# ShipRight 1.2 plan

Status: **Draft for Altaz's OK.** This run writes `docs/rebuild-1.2/` only. Skills stay as they are on main `443fbf1`.

## The one-line diagnosis

ShipRight 1.1 knows how to stop a generic SaaS page. It does not know how to research a product, tell a scroll story, or hand a cheap coding tool a prompt that builds a premium site. PR 18 followed the skill and shipped a headline plus a metal form. check-ui scored that page 0 failures.

## What the audit found

| Gap | Where it lives today | What the Depth site did as a result |
| --- | --- | --- |
| Intake never asks for the hero, the story, or the assets | `modes/_shared/intake.md` and build-pack intake. A vague idea gets three cards: who it serves, what stays out, and a look. | Nobody was asked what the page is about. The metal form had no job. |
| No product or story step | build-pack sequence: frame, flows, structure "only when needed", stack, design system, screens, tickets. `research.md` is a study-method file and is not on this path. `journeys.md` is not on this path. | The PRD frame is "see what the pack changes, then copy an install line." The success check is "floating nav, open space, and a metal 3D form." |
| The preview is a skin | Router and build-pack: "2-3 distinct visual directions (type, color, spacing, motion)." | Air, Grid, and Depth. The owner picked Depth. The story did not change. |
| Premium web guidance is a document page plus a lamp in a box | `marketing-pages.md`: claims, a short headline, section gaps of 80 to 112, one signature move, no empty bands, no glass. `motion.md`: at most one or two pins, text never over geometry, one 3D scene that helps a decision. Golden example D: a desk lamp in a 70vh canvas and one 90 degree turn. | Architecture says the brief asked for one scroll turn. One mesh. Text beside it. |
| The reference techniques are listed as slop | `anti-slop-rules.md` and `scripts/check-ui.mjs`: tiny uppercase labels, glass, floating pills, empty bands, near-black plus one accent, text invisible at load. Starter C says empty bands read as unfinished. The v1 rubric scores "no empty hero padding" and "no eyebrow labels" as craft. | A quiet headline and a chrome sphere passes. A Jesko split headline, a Benjamin block wipe, or a Zero entry gate would be flagged. |
| Tickets are too small and too much like an app | `ticket-prompts.md` anatomy is a table screen. `pack-contract.md` allows about 220 words per ticket and 250 words per screen. | T2 is "Build Depth" with a stop line. A cheap model has nothing to build except a hero. |
| Critique does not judge taste | ux-critique gates: job, hierarchy, states, trust, access. `slop-tells.md` says to use the severity rubric, and to leave aesthetic dislike out. No comparison to a story or to reference patterns. | 0 failures. The owner still will not use the skill. |
| A website defaults to a static brochure | `stack-choices.md`: marketing is Astro and little JavaScript. 3D is a separate row, and plain Three.js is allowed for one scene. | Astro, one vanilla mesh, Lenis, one scrub. |

## What stays

Truth rules stay. No invented metrics, quotes, logos, prices, or legal text. Unknown stays Unknown. Silence is not approval. F1 exit, F2 consistency, F3 useful status. Four statuses. Gate IDs. The 0 to 5 question cap. Five mode names. Dense, calm rules for apps, forms, and desks. App tickets stay short. Historical trials stay frozen.

Premium web is a task family inside those five modes. It is not a sixth skill, and it is not a new rule for every screen.

## Target shape

A public website or immersive page runs this order. An app does not.

1. **Research.** Up to five decision cards. They cover the visitor, the product hero, the scroll story, and the assets. Each card has an example and **Let me decide**.
2. **Plan.** One product hero. A six-act story. The stack. Information architecture is the act list.
3. **Three options.** Same facts. Three different stories and technique sets. Stop for a choice.
4. **Build prompt.** One act-by-act prompt a cheap tool can run, about 550 to 1,700 words, aimed at one `index.html` (or the project's equivalent single page).
5. **Taste check.** Compare the render to the chosen story and to the technique library. Fix and repeat.
6. **Ship-check.** Unchanged role. Still no deploy without a yes.

## 1. Guided research

Do not add these questions to `intake.md`. That file is always loaded and is already near the shared budget. Add `skills/shipright/modes/product-design/references/product-brief.md`. build-pack and product-design link it only when the task is a public website, a launch page, or a 3D page.

The first reply on a vague website is these cards only. Still 0 to 5 questions. Usually four. A clear brief that already names the hero, the story, and the assets asks zero.

Each card uses the existing shape: why it matters, two or three options with a concrete example, Something else, My pick, You decide, Let me decide.

| Card | Ask | Example of a good answer | Let me decide means |
| --- | --- | --- | --- |
| 1. Visitor | Who arrives, what they are trying to do, and what this release leaves out | A founder comparing tools, who should leave with the install line. Out: accounts, pricing, a blog | Propose the narrowest visitor and the out list. Mark both Proposed |
| 2. Product hero | The one real object, scene, or interface the page is about | The jet, the books, or the real before/after of this product. A decorative sphere is not a hero | Pick the real object already in the brief. If none exists, say so and propose a still stand-in that depicts that object |
| 3. Story | What the scroll teaches, in a few beats | Sit at the window, fly out, see the jet, read the range, book the flight | Propose six beats from the known facts. Label any guess a Hypothesis |
| 4. Assets | Model, photos, logo, type, sound. "None" is a valid answer | One glTF of the product, or none, so the scene is built from the real UI | Do not invent a brand film. Use supplied files or a labeled procedural stand-in of the real product |
| 5. References | Only if a choice is otherwise blocked. Which studied techniques to lean toward, and which to leave out | Camera through the product, like Jesko. No draw-to-enter gate | Pick three techniques that serve the story. Record the rest as unused |

"You decide" delegates that card. "Let me decide" keeps it open and the work continues. Prices, legal text, access, and payments are never delegated.

After the cards, write a one-page brief: visitor, hero, six beats, assets, unknowns. That brief is the source for the plan. Do not start options before it exists, unless every card was answered or delegated.

This replaces a user-study round. `research.md` still loads only when a real study, a method, or supplied interview records would change a decision. Screenshots of other sites are taste references. They are not evidence of this product's users.

## 2. Product and narrative

Add the narrative rules to `product-brief.md` so stage 1 stays one file.

**Product hero.** Name the object. Say why it is the product. Say how it is lit and where it sits (center stage, in front of type, in the visitor's hands). If the product is software, the hero is a real interface fragment or a real comparison. It is not a chrome blob standing in for "quality."

**Story.** Six acts, in this order:

| Act | Job |
| --- | --- |
| Opening | The visitor understands what this is, and meets the hero |
| Second act | The hero moves or the camera moves, and one idea lands |
| Third act | A second idea, with a different composition |
| Detail | Proof: specs, steps, or the real interface. Annotated, not a card row |
| Close | One action, plus the fact that removes the last doubt |
| Footer | Name, contact, and legal links the owner supplied |

Each act is one line in the plan: what the visitor learns, what moves, what stays still. An act with no product fact is cut. Missing proof stays an open question. The page does not invent a testimonial to fill it.

**Information architecture.** For a single marketing page, the act list is the architecture. Routes, roles, and `structure.md` load only when there are several destinations or roles. A scroll film does not grow a sitemap to look complete.

**Stack, for this task family only.** Proposed default: Vite or Next.js, React Three Fiber and drei, GSAP ScrollTrigger, Lenis on the marketing page only. Reason: one canvas, one scroll timeline, and the tools cheap models already know. Switch to Astro with no WebGL when the page is a long document or the product has no object to show. Switch to the app stack when the job is a signed-in product. Record the choice as Proposed.

App, form, and dashboard paths keep today's stack table.

## 3. Premium web

Route it inside the five modes:

- The router still sends a new website to build-pack.
- build-pack, when the job is a public web page, loads the premium stages below instead of the marketing stage.
- ui-ux-design loads `premium-web.md` and `techniques.md` for that same job.
- ux-critique loads `taste-check.md` when the artifact is that kind of page.

New files, each under that mode's `references/` folder:

| File | Owns |
| --- | --- |
| `product-design/references/product-brief.md` | The five cards, the hero, the six acts |
| `ui-ux-design/references/premium-web.md` | When this path applies, stack, option rules, shared performance and access rules |
| `ui-ux-design/references/techniques.md` | The named library below |
| `build-pack/references/act-prompts.md` | The prompt recipe and one worked example |
| `ux-critique/references/taste-check.md` | The taste gate |

`marketing-pages.md`, `motion.md`, and starter C stay the path for a calm document page the user explicitly wants. They are not loaded on top of the premium path. A premium page that also needs a form still reads the form rules in `state-coverage.md` for that form only.

### Three options

Each option states: the hero, six acts in one line each, three to five techniques from the library, type, palette, and what it refuses. The product facts stay the same. The story device changes. A navy page, a paper page, and a dark page with the same headline and the same sphere are one option.

Stop until the user picks. With no human, pick one, write the reason, and mark it "Proposed, awaiting owner approval." Then keep going, as the 1.1 full flow already requires.

### Shared performance and access rules

Written once in `premium-web.md`. Techniques link to them.

- A still image of the hero is in the first HTML and is the LCP element. The canvas fades in when ready. Reserve its box.
- Model under 3 MB compressed. Textures under 2 MB. Pixel ratio capped at 2, and at 1.5 on phones. Pause when the canvas is off screen or the tab is hidden. Dispose on unmount.
- 60 fps desktop target. 30 fps on a mid-range phone. Drop pixel ratio when frames drop.
- Reduced motion and no WebGL: the same words and the still image remain. Offer Front, Side, and Back when the object has those views. No autoplay camera.
- The canvas is focusable. Arrow keys orbit when that is the control. `role="img"` and a one-sentence description. A visible hint for the control that exists.
- Touch: vertical swipe still scrolls the page. Wheel zoom only when the canvas is focused.
- Sound is off until a visible toggle. The toggle has a text label.
- An entry gate has a visible skip. The gate is not the only way to read the content.
- Corner labels are allowed when they carry a real fact (a spec, a time, a step). They are not a substitute for the headline.
- One accent. Two type scales. Real copy only.
- F1: the visitor can leave from the nav or the footer, and a gate can be skipped. F3: copy, load, and WebGL failure say what happened in plain words.

`check-ui.mjs` needs a premium profile in a later phase so a declared premium page is not failed for a corner label or for type that is visible in the reduced-motion path. Gradient text, invented proof, a missing reduced-motion path, and sideways phone scroll still fail. CSS glow on ordinary boxes still warns. The 3D canvas is allowed to be bright.

## Technique library

Each technique gets, in `techniques.md`: when to use it, when to leave it out, a short prompt recipe (the sentences that go inside an act), and a pointer to the shared performance rules. Use three to five on a page. A page that uses all ten is a demo reel.

| Technique | Use it when | Leave it out when | Prompt recipe, in short |
| --- | --- | --- | --- |
| Pinned scroll scene | The story needs several beats on one stage | The page is a form or a long article | One sticky viewport. A tall track (state the vh). Scroll scrubs a GSAP timeline. Name the start and end of each beat. Reduced motion: beats stack in normal flow |
| Camera flight | The camera move teaches the product (through a window, down a hall, around an object) | The move is only decoration | Name the camera path in words and in three poses. The product stays recognizable in each pose. No scroll hijack: the page still moves down |
| Object in front of text | The hero should cross or sit inside the headline, so the object is the subject | The type would become unreadable | Headline in the DOM, canvas above it, pointer-events none on the canvas except where the object is the control. Keep a calm band behind the words. Reduced motion: object beside the type |
| Block wipe | A new section should arrive as a hard editorial cut | Every section would use the same mask | A solid block in the accent color steps away in two rectangles and reveals the heading. Content exists in the DOM before the wipe. Reduced motion: heading is already visible |
| Text scramble | A real counter or index settles (a year, a spec, a project count) | The number is fake, or the user is reading a price | Scramble glyphs for under 600 ms, then the true value. Run once. Reduced motion: show the final value |
| Hover invert | A list or FAQ should show which row is active | The row has no answer to reveal | Default row is light. Hover and focus paint it solid black with white type. Click expands the answer in place. One open at a time. Plus becomes a close mark. Keyboard matches hover |
| Entry gate | The scene needs a warm-up, or the first gesture is the brand | The visitor came to complete a task | A short gate (counter, enter, or one brand gesture) under a few seconds, with Skip. Sound stays off until the toggle. Reduced motion: skip the gate |
| Cursor-reactive 3D | The object should acknowledge the pointer (a turn, a tilt, a highlight) | The page is mostly touch, or the motion hides the product | Small rotation toward the pointer, damped. Fine pointers only. Touch keeps scroll. Reduced motion: object rests |
| Sound toggle | The scene has a designed sound | There is no sound asset | Off by default. A labeled control. Starting sound needs a click. Remember the choice for the visit |
| Page transition | Moving between two real routes should feel continuous | The site is one page | A short cut (wipe, opacity, or a shared hero) under 400 ms. The next page's heading is in the HTML. Back works. Reduced motion: instant |

Striking techniques (draw-to-enter, a diegetic room, velocity-bent cards, inspect annotations) are optional extras. Use one only when the story needs it. Name the reference as inspiration in the option. Do not reproduce the site.

## 4. Ticket prompts in six acts

`act-prompts.md` holds the recipe. The generated prompt is long. The skill file stays short.

For a premium page, the build ticket is one prompt with the six act headings. Target 550 to 1,700 words. The 220 word ticket cap stays for app tickets. The pack contract gains one line: a premium page prompt lives in the ticket file and may use that longer range, because that is the length cheap tools need.

Anatomy, in this order:

1. Stack line. Example: one `index.html`, React, Vite, React Three Fiber, Three.js, GSAP ScrollTrigger, Lenis. Named font. Palette with real values from the chosen option.
2. Product hero in one sentence. Assets that exist. Unknowns the tool must not fill.
3. Opening, second act, third act, detail, close, footer. Each act: what is on screen, what moves, the real copy, the technique name, and what not to add.
4. Performance and access lines from `premium-web.md`, written as checks.
5. Done when: the six acts are reachable by scroll, the hero is the product, reduced motion shows the same words, check-ui premium profile is clean at 390 and 1280.
6. Stop line.

Worked example in the skill uses a subject that is not the ShipRight site and not the proof product. A single chair with a supplied glTF is enough. Sample copy is labeled sample.

App tickets keep today's anatomy (goal, read first, steps, done when, stop).

## 5. Taste check

Add `ux-critique/references/taste-check.md`. Load it only for a premium page. It does not replace the ten critique gates. It adds one judgment those gates miss.

Compare the render to the approved brief and the chosen option. Reference shots are the pattern source. They are not a score the page must clone.

| Check | Fail looks like | Pass looks like |
| --- | --- | --- |
| Product | A headline and an ornament. The object could be swapped for any sphere | The hero is the product named in the brief, large and readable |
| Story | Sections repeat one layout. Scroll reveals nothing new | The six acts are visible in order and each one teaches the line from the brief |
| Technique | Motion is a fade on every heading, or every technique at once | The three to five chosen techniques are present and each one has its job |
| Type and color | Mid-size everything, many accents, a generated palette | Two scales, one accent, type that matches the option |
| Proof | Invented quotes, logos, or stats | Only supplied facts. Missing proof is absent, not faked |
| Access | Content exists only inside the animation. No skip. Sound autoplays | Reduced motion, skip, and the sound toggle behave as specified |

A missing product hero on the first screen is a Blocker for this task family. A missing act or a decorative object with no job is Major. A rough easing is Polish. Record each finding in the existing shape: location, evidence, impact, severity, correction, retest.

"I would have picked another color" is not a finding. "The first screen does not show the product" is a finding.

check-ui still runs. A premium profile Fail is a defect. A taste Fail is a defect even when check-ui is clean. That is the PR 18 lesson.

## 6. How to prove it

Do this after the skill text exists. Do not treat this plan as evidence that the skill works.

Two builds, by a fresh agent that receives only the pack, the raw task, and the supplied assets. No expected answers. The author of the skill text does not score the pictures.

**Build A. The ShipRight site.** Same facts as PR 18: real install lines, real comparisons, no invented customers, no deploy. The hero is the product of the skill (the real before/after), not a metal form. Proposed story, to be confirmed in that phase: opening states the job, the comparison comes forward in front of the headline, one pinned scene walks research then plan then options then build, detail shows the real comparisons, close is the install line, footer is the real links.

**Build B. One product site.** A physical product with facts written in the prompt. Use the discipline of the frozen v1 speaker prompt. Do not reuse that run's files as the answer. The hero is the product. The story is specific to it.

**Comparison.** Side by side, at 1280:

- PR 18 Depth versus Build A.
- Build A and Build B versus three reference frames: Jesko product-between-type, Benjamin block wipe, Brand Studio hover row. The caption says "pattern reference," not "copy this layout."

**Pass, for Altaz to judge from the pictures:**

- A stranger can name the product and the story after the first three scrolls.
- The first screen is the product, not a headline with an ornament.
- The cheap-tool prompt is one six-act prompt in the length range, and a second run can build from it.
- Reduced motion still shows the words and the product.
- No invented proof.

**Checks on the skill change:** `python3 evals/check_sources.py`, `python3 evals/check_sources.py --self-test`, `python3 evals/check_context.py` with the pinned tokenizer, and unittest discovery. Visual instruction changes also run `node scripts/check-ui.mjs` and follow `tests/README.md`. New screenshots go in a new `examples/before-after/1.2/` folder. Older folders stay. Token counting must be real. A missing tokenizer is not a pass.

**Limits to state in the evidence note:** one fresh run per build, software WebGL in this environment, reference motion described from the owner's screenshot study. Old v1 scores stay historical. The v1 marketing rubric rewards dense document pages and punishes empty stages, so it is the wrong bar for these two builds.

## Loading, so the budgets stay lean

Swap files. Do not stack the premium references on the current marketing path.

| Stage | Load | Leave unloaded |
| --- | --- | --- |
| A. Research and plan | build-pack `MODE.md`, intake, contract, flow rules, `framing.md`, `product-brief.md`, `stack-choices.md` | `research.md`, `journeys.md`, `flows-and-states.md` unless the page has a multi-step task |
| B. Options and scenes | `premium-web.md`, `techniques.md` | `marketing-pages.md`, `motion.md`, `starter-systems.md`, `design-system.md`, `anti-slop-rules.md` (the safety lines live once in `premium-web.md`) |
| C. Prompt | `act-prompts.md`, `pack-contract.md` | `golden-examples.md`, `ticket-prompts.md` except a one-line pointer from the mode file |
| Critique | `taste-check.md`, `severity-rubric.md`, `bounded-verification.md` | The existing-app review set, unless the page is an existing product |

Word caps for the new files, so the later token check has room: product-brief 1,200; premium-web 1,400; techniques 1,800; act-prompts 1,600; taste-check 900. Each must measure under 4,000 tokens. A normal path must measure under 12,000, counting the entry and the shared rules once.

Today's marketing stage 2 is about 6,000 words (mode, three shared files, design system, starters, marketing pages, motion). The premium swap should stay in that range. If a draft path exceeds 12,000 tokens, split the stage again. Do not delete the safety lines to make the number fit.

App paths and their loading rows stay. Add the premium rows to `evals/context-policy.json` in the implementation phase.

## Phases after approval

| Phase | Changes | Verified by | Size |
| --- | --- | --- | --- |
| 0. This plan | `docs/rebuild-1.2/` only | Altaz's OK | Docs only |
| 1. Research and narrative | `product-brief.md`, links in product-design and build-pack, context-policy rows for stage A | Source check, context check, a dry-run first reply that is cards only | New file under its word cap |
| 2. Premium web and techniques | `premium-web.md`, `techniques.md`, stage B loading | Context check. No site build yet | Two files under their caps |
| 3. Act prompts | `act-prompts.md`, pack-contract exception, one worked example | A reader can paste the example shape. Token check | Under its cap |
| 4. Taste and checker | `taste-check.md`, premium profile in `check-ui.mjs` | Checker self-test: a headline-plus-sphere fixture fails taste; a reduced-motion page passes the profile | No app-rule change |
| 5. Proof | Builds A and B, screenshots, evidence note | The pass lines above. Fresh agent. Author does not score | New `examples/before-after/1.2/` only |
| 6. Release | CHANGELOG, version 1.2.0, credits in `SOURCES.md` | All checks green. No publish without a separate yes | Docs |

## Decisions needed

1. **Premium web is a task family inside the five modes.** My pick: yes. A sixth skill would break the pack rule, and apps must not load this path.
2. **A public website uses this path by default.** React Three Fiber, GSAP ScrollTrigger, Lenis, six acts, three options. A long document or an app stays on the current path. My pick: yes.
3. **The page prompt may run 550 to 1,700 words.** App tickets stay near 220 words. My pick: yes.
4. **No product on the first screen is a Blocker on this path.** A missing act is Major. My pick: yes.
5. **Proof is the two builds in phase 5, after the skill change.** This plan does not start them. My pick: yes.

Reply with a yes, a no, or a change on each. Anything left as "you decide" will be logged in `CONTEXT.md` and the work will continue. "Let me decide" keeps that item open.
