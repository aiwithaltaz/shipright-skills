# ShipRight 1.3: the full upgrade plan (for Grok 4.7)

**Owner:** Altaz Lavji · **Written:** October 17, 2026 · **Branch:** `feat/v1.3-beat-opus` · **Repo:** `aiwithaltaz/shipright-skills`
**Status of this plan:** Approved direction from Altaz (October 16). Every individual skill change stays **Proposed** until Altaz approves it at the end of each phase.
**Updated October 18:** added Stage 0 (Discover and improve an existing app), the pain-to-fix map, the layout pass, the component system, the motion system, and two "improve my existing app" eval cases (c7 with a real answer key, c8). This is where ShipRight wins: it improves products the way Altaz improved IVC.
**Updated October 18 (later):** added the living project record (context, architecture, decisions, challenges, changelog, handoff), an auto case study, and an opt-in investor pitch deck built only from facts.

> **Grok, read this whole file before you change anything.** It is your brief, your rules and your definition of done. It also contains the evidence of what "Opus quality" looks like, so you can copy the moves, not guess them.

---

## 0. How to use this file

### 0.1 Your role
You are the lead engineer and product designer rebuilding ShipRight. Think like a top agency team in one person: researcher, product lead, architect, design director, front-end lead and QA. Your job is not to add rules. Your job is to make the **output** of a mid-size model using ShipRight better than the output of the best model alone.

### 0.2 How to work (every task)
1. Read the task, the files it names and the evidence it names.
2. Write a short plan for the task in the phase log (`docs/rebuild-1.3/LOG.md`): what changes, which files, how you will check it.
3. Make the change. Small commits. One idea per commit.
4. Run the checks named in the task. Paste the real output in the log. Never write "should work".
5. Mark the task Done in the log with: files changed, check output, anything left.

### 0.3 Hard rules (never break)
- **Never invent** facts, users, research findings, metrics, quotes, logos, prices or legal text, in the skill or in examples. Unknown stays **Unknown**. Sample content is allowed only when it is **labeled** (see section 4.3).
- **Simple English.** Short sentences. No em dashes. Do not use the words "genuinely", "honestly", "straightforward". Numbers, not adjectives ("gap 24px", not "generous spacing").
- **Nothing ships without Altaz.** No merge, no tag, no release, no deploy, no publishing. Push the branch, open or update the pull request, and stop at each phase gate.
- **Keep what works.** The v1.2 truth rules, decision cards, F1 to F3 flow rules, feedback handling and ship-check are strengths. Rewrite them shorter. Do not delete their meaning.
- **Every new rule must change the output.** If you cannot point to a bad output it fixes, do not add it.
- **Size limits are real.** Small models get worse with more text. Respect the budgets in section 4.6.
- **Credit, do not copy.** Ideas from reference sites and vividsites are allowed. Their code, prompt text, layouts and assets are not. Write your own code. Credit ideas in `SOURCES.md`.
- **Tests stay green.** Run `python3 -m unittest discover -s tests`, `python3 evals/check_sources.py`, `python3 evals/check_context.py` before each push. If you change the layout, update the checks and the policy so they test the new layout. Never delete a check to make it pass.

### 0.4 How to report to Altaz (his style)
- Lead with the result. Then why. Then the next step.
- Bullets and tables. Short. Smart-friend tone.
- Before/after screenshots for any visual change.
- Say mistakes plainly ("that was my bug").
- End each phase with: what changed, scores, what needs his decision (max 4 questions, each with a recommended option first).

---

## 1. Where we are (the facts)

### 1.1 What ShipRight is today (v1.2.0, main `9cb0e47`)
- One skill, `/shipright`, five modes: build-pack (default), product-design, ui-ux-design, ux-critique, ship-check.
- Flow for a new project: build pack (PRD, architecture, DESIGN.md, frontend spec, tickets), design preview with 3 options, build, critique with `check-ui.mjs`, ship-check.
- Public websites use a "premium web" path: product brief, six-act story, 3 options, one 550 to 1,700 word build prompt, 10 technique recipes.
- About 31,000 words across 53 skill files.

### 1.2 The audit (October 15, saved in the ShipRight project as `shipright-v1.2-audit.md`)
Score: **5.3 / 10.** Ranked gaps:
1. Technique recipes are about 100 words with no code. Small models cannot build premium motion from that.
2. Truth rules over-reach. There is no "labeled illustration" category, so models drop stand-ins, sample stories and concept scenes.
3. No big-idea or business step. Nothing asks "why would someone pick this" or "what is the one memorable moment".
4. The checker and templates are not inside the installed skill. `npx skills add` and `shipright.zip` copy only `skills/shipright`, so `scripts/check-ui.mjs` is missing for most users. Haiku runs reported this themselves.
5. Never tested on a cheaper model, and never against "no skill".
6. Self-grading. The website critique gave itself 10 of 10 Pass on a mostly static page.
7. No page inventory (auth, 404, 500, legal, emails, meta).
8. Altaz's IVC taste (removal test, spacing grid, motion rules) is not in the repo.
9. Contradictions: "2-3 directions" vs "exactly three"; Astro vs React Three Fiber for websites; header says 1.0.0; Full flow copied in two files.
10. Slow: four gates with 38 rows cost a small model time and focus.

### 1.3 The scoreboard (already committed on this branch)
`evals/v2/` holds the frozen protocol: `cases.json` (8 cases; c7 and c8 added October 18 before any grading), `rubric.md` (10 areas, 1 to 10 each, hard caps), `grader-prompt.md`, and tools (`prepare.py`, `render.mjs`, `anonymize.py`, `aggregate.py`).

**Win rules (owner decision, October 16):**
- Sonnet + ShipRight scores higher than **Opus (high effort) alone** on **every** case. A gap under 0.5 is a tie, not a win.
- Sonnet + ShipRight release score is **9.3 or higher**.
- Altaz reviews the screenshots and agrees.
- Haiku + ShipRight is reported, not required.

### 1.4 Baseline evidence (in `evals/v2/runs/baseline-1.2/`)
The baseline was interrupted by a usage limit. What exists:

| Case | Opus (high) alone | Sonnet + v1.2 |
|---|---|---|
| c1 LinkedIn app | Done | Done |
| c2 AI agents dashboard | Done | Done |
| c3 SaaS (landscaping) | Done | Done |
| c4 Bakery website | Done | **Missing** (run cut off) |
| c5 Keel One 3D site | **Missing** | **Missing** |
| c6 IVC feedback round | Done | Done |

Each finished run has `questions.md`, `reply.md`, `build/*.md`, `index.html`, `shots/` and `render.json`. **Not graded yet.** Phase 1 finishes and grades it.

---

## 2. What "Opus quality" looks like (learn these moves)

I compared the baseline runs side by side. Opus alone beat Sonnet + v1.2 on product thinking in c1, c2, c3 and c4. They were close on c6 (exact feedback), where ShipRight's rules already help. These are the moves Opus made that ShipRight never asked for. **Phase 2 turns each one into a rule, a template field or a check.**

### 2.1 App screens (c1, c2, c3)
| # | Move | Evidence | Sonnet + v1.2 did instead |
|---|---|---|---|
| A1 | **Situation headline.** The H1 states the situation and the next decision with real numbers. | c3: "Week of October 19. 59 visits worth $8,385, 1 crew day over capacity, 3 visits still to place, rain Thursday." c1: "7 actions left, about 13 min. Everything is drafted. You press send." | "Schedule", "Queue", "Agents". A label, not a situation. |
| A2 | **Decision on the item.** Each row or card carries the one action that fixes it. | c2: "Invoice Matcher failure rate 18%, usually 2%" with **Pause agent**. "Lead Enricher spent $168 today, 2.9x usual" with **Cap at $150/day**. c3: rain day card says **Move 9 visits to the next open day**. | Status badges with no action. |
| A3 | **Compare to normal.** A number means nothing without its usual value. | c2: "18%, usually 2%", "2.9x usual by this hour", "silent for 2 h 40 min during working hours". | Raw values only. |
| A4 | **Work queue plus context rail.** Main column = what to do now. Right column = what drives the next decision. | c3: week board plus "Ready to invoice: 12 visits, $930, Send 12 invoices". c2: Needs attention plus Live activity. c1: action cards plus "Posts this week" and "Pipeline". | One table, or a table plus an empty edit panel. |
| A5 | **The product's real world shows up.** Domain facts that change decisions appear in the UI. | c3: weather per day and a rain warning. c1: "A human-sized pace keeps your account safe" (LinkedIn limits). c2: spend vs budget, approvals waiting. | Generic fields. |
| A6 | **Domain-true sample data.** Believable names, durations, prices and failures, labeled as demo. | c2: "Demo data" tag next to the headline. c3: "Weekly mow, 1h, $55". | Thin, generic rows. |
| A7 | **A real working name and a one-line position.** | "Threadline", "Fleet", "Groundcrew", "Crumb & Co". | "Postdesk (working name)". Fine, but no position. |

Things v1.2 did **worse** that Phase 2 must forbid:
- Developer controls visible to users: a "Preview state: Populated" dropdown at the top of the c1 screen.
- Empty side panels ("Select a post to edit it").
- No money, time or risk numbers anywhere on a work screen.

### 2.2 Planning documents (c1, c3)
Opus wrote these sections. ShipRight's PRD template has none of the starred ones.

| Opus doc section | Why it matters |
|---|---|
| ★ "The decision in one line" | Forces one sharp idea. |
| ★ "Why existing tools don't fit" | Real alternatives and the gap. |
| ★ "What makes it different" / positioning | The reason to exist. |
| ★ "Business model" and "Pricing (flat per company, not per seat)" | Who pays and why that price shape. |
| ★ "Platform rules: feature-by-feature verdict" (c1) | LinkedIn bans invite and message bots; each feature gets Allowed / Risky / Banned. |
| ★ Flows named after real moments: "Monday planning", "Rain day", "Crew marks work done", "Friday invoicing" | Flows that match how the user's week works. |
| ★ "Seasonality warning", "Costs per month", "Validation before building more" | Business and money risks. |
| The core loop | What the user does every day. |
| Data model with every table and the indexes that matter | Real architecture. |

### 2.3 Websites (c4, and the earlier Keel One trial)
| # | Move | Evidence |
|---|---|---|
| W1 | **Every supplied fact does work.** | c4: opening hours drive a live "Closed, opens tomorrow at 7am" pill. The 72-hour cake rule sets the earliest pickup date in the form: "The earliest pickup right now is Wednesday, October 21 at 7am." |
| W2 | **The product is on stage and you can touch it.** | Keel One trial: press your real keys and the 3D keys press. |
| W3 | **Accent color comes from the product.** | Keel One: yellow Esc and Enter keys became the accent. Bakery: crust brown. |
| W4 | **Each act is a new composition.** | Keel One: hero, top-down layout, keycaps lifting, case opening for the battery, cable sliding in. |

### 2.4 Where Opus is weak (ShipRight can win here)
- **It invents facts.** c4 shows a full bakery menu with prices ($10 country loaf, $4.50 croissant) and cake prices that the owner never gave. Under the rubric that caps area 10 at 3 and the run at 5 overall. ShipRight must keep the same richness **and** label it: "Sample menu. Replace with your items and prices."
- **It does not test much.** Only one Opus run mentioned a headless check. ShipRight can win area 10 (verification) every time with real test output.
- **It skips system pages.** No 404, legal, emails, empty and error states in most runs. A page inventory wins area 4.
- **Small bugs slip through.** c6 Opus bottom bar shows "1 p" (a cut-off label). A real test pass catches this.

**The strategy in one line:** copy Opus's thinking moves into templates, keep ShipRight's honesty, and add the testing Opus skips.

### 2.5 The human bar: how IVC was designed (this is the real target)
Opus is the bar for a new idea. **Altaz's IVC process is the bar for improving a product.** Read `docs/rebuild-1.3/IVC-HANDOFF.md` (the full master handoff) and `examples/ivc-2026-registration/feedback/shipright-learning.md` (27 real review items, F01 to F27, on the v1 prototype).

What Altaz did, in order, and what ShipRight must do the same way:

| Step | What Altaz did on IVC | Real example |
|---|---|---|
| 1. Use it for real | Walked the v1 desk as a volunteer would, task by task | Found that lookup works only by phone (F05) |
| 2. Say what works | Named what to keep before changing anything | "Keep the clean list, View dialog and ticket preview" (F23) |
| 3. Find the pains | Listed each pain with where it shows | "A 17-year-old learns about the parent signature too late" (F06) |
| 4. Find the cause | Separated the symptom from the cause | Cause: prerequisites are checked at the end, not at lookup |
| 5. Pick a fix that teaches a pattern | Each fix became a reusable rule | P1: put the next action on the search result |
| 6. Structure the layout | Reordered, grouped, moved controls to the work, aligned, enlarged the key thing | Registrations table rebuilt: Attendee / T-shirt / Desk / Status / Payment / Donation / next step + ⋮ |
| 7. One system | One design system for desk and public site, same labels and status meanings | Status badges on the name row; same buttons everywhere |
| 8. Components | Custom dropdown, chips, stepper, full-border selection, field formats | No native selects; "Next: Waivers →" |
| 9. Motion with a job | Animation only where it helps; scoped; off under reduced motion | Scoped class fix after the `.note` loop bug |
| 10. Test and log | Before/after images, a test per interaction, a log row per item | 131 home checks, 54 map/game checks |

**The win in one line:** every design decision traces back to a pain point, with evidence, and forward to a test. Agencies do this. AI tools do not.

---

## 3. How Altaz thinks (the owner model ShipRight must simulate)

Source: the IVC 2026 master handoff (in the ShipRight project), Altaz's preferences and his decisions on this project. Turn these into the opt-in taste profile (`skills/shipright/taste/altaz.md`) and into universal rules where marked **Universal**.

### 3.1 How he decides
- **Clarity over cleverness.** The main task first. Background info goes lower (FAQ). **Universal**
- **Organized, less clutter.** Group by meaning. Put secondary facts beside their main fact. **Universal**
- **Honest.** No fake counters, no features that do not exist, "coming soon" beats invented content. **Universal**
- **Premium, alive and touchable** on public pages. One live moment above the fold that works on tap, not only hover. **Universal for public sites**
- **Consistency.** Same labels, same status meanings, same buttons everywhere. **Universal**
- **Phone first for public pages.** **Universal**
- **Founder lens on every idea:** who is it for, how does it make money, how does it scale, what is the next step. **Universal (brainstorm and scope stages)**
- **Systems over one-offs. Products over ideas. Revenue over vanity.**

### 3.2 How he gives feedback (the feedback-round protocol needs this)
- Long, fast, numbered-ish messages mixing tiny CSS values with big ideas.
- Crops are the spec. A full screenshot is context only.
- What he likes is a lock. Do not touch it.
- He sometimes names the wrong cause for a real problem. Say so once, plainly, then do what he chooses.
- He decides fast with 2 to 4 options, a recommended one first, and a short preview of each.
- Ships only on "push it".

### 3.3 His removal test (Universal, run on every screen)
For every element, ask in order. One bad answer means it goes:
1. Does it repeat something already on screen?
2. Does it have a job the user needs right now?
3. Is it real and confirmed?
4. Is it for this phase?
5. Is it for this audience?
6. Does it compete with the primary action?

### 3.4 His visual numbers (taste profile; use as defaults when no system exists)
- Spacing: 4 / 8 / 16 / 24 / 32 / 40 / 48 / 64. No 2, 6, 10 or 12 gaps. Checked by script.
- Display titles: line-height 1.2. Kickers: 12px, uppercase, 0.14em tracking.
- Icons: Lucide, 1.5 stroke, text color.
- Radii: 12 fields and buttons, 16 tabs and notices, 24 cards.
- Focus: 1px. Field border turns brand; buttons get a 1px outline with 2px offset.
- No native dropdowns in polished apps: a custom dropdown with full keyboard support.
- Selection: a full, even border. Never a thick accent bar. No dot on the active nav item.
- Buttons: Back starts with ←; Next says where it goes ("Next: Waivers →").
- Errors on blur or submit, never while typing. An error never pushes its neighbour.
- Motion: line mask reveals on titles, 24px fade-up with 70ms stagger, easing cubic-bezier(.22,1,.36,1). Everything visible with no JS. Everything off under reduced motion. Scope every animation class.

### 3.4b His 7 layout moves (Universal, used in the layout pass, P2.11)
| Move | Rule | IVC example |
|---|---|---|
| Reorder by priority | Order sections by what the user needs first. Re-check when importance changes. | Perform page: title + deadline + form first, FAQ below |
| Group related things | Group by meaning. Secondary facts sit beside their main fact. | Emergency contact and Other details as sections; status badges on the name row |
| Move controls to the work | The fix lives where the problem shows. | Next action on the search result card |
| Align to the grid | Edges line up across columns. | Review card starts level with the form card |
| Make the key thing bigger | One hero element per screen gets size and contrast. Demote the rest. | "The map is the highlight": bigger, dark stage |
| Simplify the interaction | Fewer steps. Show the target. Make the basic action automatic. | Tick-to-select replaced add-to-visit → visit card → start visit |
| Make state obvious | State is visible and looks like what it is. | Finished step = green check; disabled value = disabled control |

### 3.5 His process (Universal for the build and feedback stages)
Before/after images every round, a test for every interaction, a feedback log row per item (feedback → decision → status → why), push only on "push it", verify the live site after deploy.

---

## 4. The target design of ShipRight 1.3

### 4.1 The promise (new README headline)
"From idea to tested product, or from a clunky app to a great one, like a top product team you would hire. Every design decision traces to a real pain point and ends in a test."

### 4.2 The stages (0 to 10)
Every stage gate also includes "project record updated" (P1.10). A new project runs stages 1 to 10 in order. An existing app runs stage 0, then 1 (light: domain, rules, alternatives), then 4 to 10 for the approved fixes. A feedback round runs only what it needs (section 4.5).

| # | Stage | Job | Main output (template) | Gate (yes/no, all must be yes) |
|---|---|---|---|---|
| 0 | **Discover** (existing app only) | Use the app like a real user. Say what works, what hurts and what is missing, with evidence. Turn pains into a ranked fix map. | `discovery.md` + `pain-map.md` | Every screen visited and captured. Core tasks walked and timed. Each pain has evidence and a cause. Keeps listed. Fix map ranked. Owner asked for real complaints. |
| 1 | **Research** | Know the users, alternatives, rules and money facts before ideas. | `research-brief.md` | 3+ real alternatives named. Platform, legal and data rules checked. Every fact tagged Verified (with source) or Assumed. |
| 2 | **Brainstorm** | Find the one sharp idea. | `concepts.md` (3 concept cards, scored, one picked) | 3 concepts differ in **mechanism**, not features. "The decision in one line" written. |
| 3 | **Problem solving** | Find the hard problems and answer each. | `risks.md` (risk register) | Every risk has a concrete design or tech decision. Platform rules get a feature-by-feature verdict. |
| 4 | **Scope and pages** | Keep the core value, cut the rest, list every page. | `scope.md` (core loop, MVP, value floor, page inventory, flows named after real moments) | Value floor kept. Every page marked Needed / Not needed / Later with a reason. |
| 5 | **Architecture** | Make it buildable. | `architecture.md` | Stack with reasons and switch points. Data model tables with fields. Access rules. Secrets by name only. Budgets. Costs per month. |
| 6 | **Design system** | The system the owner wants, real tokens, components with states. | `DESIGN.md` + `tokens.css` + `components.md` + `/design` preview page | System choice recorded. Contrast measured by script. Spacing on the scale. Every component has its states. One status table and one label table. |
| 7 | **Layout and options** | Structure every screen with the layout pass, then show 3 truly different directions and pick one. | `layout-spec.md` + `options.md` (+ grey wireframes and 3 small previews) | Each screen has a job, one primary action, ordered zones and a hero element. Options differ in story or layout device, not color. One chosen with a reason, marked Proposed. |
| 8 | **Build** | Build from the layout spec with tested blocks, the components and purposeful motion. | The app or site | Matches the layout spec. Uses only listed components. Blocks where they fit. Motion has a job and a reduced-motion version. Labeled sample data. No dev controls visible. Each change names its pain ID (existing apps). |
| 9 | **Test and critique** | Prove it works and looks right. | `test-report.md` + screenshots | All scripted tests pass at 390 and 1280. Fresh-eyes critique done or marked Not verified. Fix loop up to 3 rounds. |
| 10 | **Ship check** | Launch readiness. | `ship-check.md` | 20 items with Pass / Fail / Not verified / Not applicable and evidence. |

The five old mode names stay as **entry points** so installs do not break:

| Mode (what users type or ask) | Runs stages |
|---|---|
| build-pack (default for a new idea) | 1 to 10 |
| product-design | 1 to 5 |
| ui-ux-design | 6 to 8 (plus 9 for checks) |
| ux-critique | 9 only |
| ship-check | 10 only |
| improve (new: "review my app", "make it better", "what's wrong with it") | 0, then 1 (light), then 4 to 10 for the approved fixes |
| feedback round (new, for exact owner feedback on existing work) | feedback protocol, then 8 and 9 for the changed parts |

### 4.3 The facts ladder (replaces the over-strict truth rule)
Every piece of content is one of five kinds. This is the most important rule change.

| Kind | Meaning | How it shows | Example |
|---|---|---|---|
| **Supplied** | The owner gave it. | As is. | "$189, ships December 2026" |
| **Verified** | Found in a source this session. | As is, source in the docs. | "LinkedIn's User Agreement bans automated invites (source, date)" |
| **Assumed** | A reasonable guess the plan depends on. | Docs only, marked Assumed, with how to check. | "Small crews invoice weekly (Assumed: check with 3 owners)" |
| **Sample** | Placeholder content to make a screen real. | On screen with a visible label: "Sample menu", "Demo data". | Bakery items and prices, labeled. |
| **Illustrative** | A stand-in picture or scene that makes no factual claim. | On screen with a label: "Illustrative render". | A code-drawn keyboard taken apart to show hot-swap. |

**Never allowed:** presenting Sample or Illustrative content as real, and inventing proof (reviews, customer counts, logos, press, ratings, legal text).

### 4.4 The installed skill folder (everything a user needs travels with it)
```
skills/shipright/
  SKILL.md                     router + the stages (0 to 10) + core rules (<= 1,600 words)
  stages/
    00-discover.md
    01-research.md  02-brainstorm.md  03-problem-solving.md  04-scope-and-pages.md
    05-architecture.md  06-design-system.md  07-design-options.md  08-build.md
    09-test-and-critique.md  10-ship-check.md  feedback-round.md
  templates/                   fill-in files the model copies and completes
    discovery.md  pain-map.md  user-test-script.md  layout-spec.md  components.md
    record/CONTEXT.md  record/ARCHITECTURE.md  record/DECISIONS.md  record/CHALLENGES.md
    record/CHANGELOG.md  record/HANDOFF.md
    case-study.md  case-study.html  pitch-deck.md
    research-brief.md  concepts.md  risks.md  scope.md  architecture.md
    DESIGN.md  tokens.css  options.md  screen-spec.md  act-plan.md
    build-prompt.md  test-plan.json  test-report.md  critique.md  ship-check.md
    feedback-log.md  reply.md
  patterns/
    app-screens.md             the Opus moves A1 to A7 as rules with examples
    web-pages.md               the six-act story, W1 to W4, product on stage
    system-pages.md            404, 500, empty, error, auth, legal templates
    copy.md                    UI writing rules and examples
    layout-moves.md            the 7 layout moves and the layout pass procedure
    motion.md                  motion tokens, app micro-interactions, tool decision table
  blocks/                      tested, self-contained code (section 6.3)
    web/  app/  fonts/  README.md (block catalog: when to use, attributes, size)
  scripts/
    check-ui.mjs               moved here from repo root
    run-tests.mjs              runs templates/test-plan.json with Playwright
    check-tokens.mjs           contrast pairs and spacing scale from tokens.css
    shoot.mjs                  screenshots at 390 and 1280, scroll frames
    crawl.mjs                  visits every reachable screen of an existing app, captures it, lists its parts
    consistency.mjs            finds the same job done with different labels, buttons, colors or status meanings
    check-record.mjs           checks the project record and case study match what was built
  taste/
    altaz.md                   opt-in profile (section 3)
  reference/                   old long references, trimmed; only for deep work
```
`SOURCES.md` stays at the repo root. Skills mention it and never load it.

### 4.5 Routing (SKILL.md does this first)
| The user brings | Do |
|---|---|
| A new idea (any words, including "just build it") | Stage 1. Decision cards first only if the idea is too vague to research (see 4.7). |
| An existing app plus "review it", "make it better", "what's wrong", "improve" | Stage 0 Discover, then the improve path (4.2). |
| A finished build plus "check it" or "critique this" | Stage 9 only. |
| Exact feedback with screenshots or crops | `feedback-round.md`, then 8 and 9 for the changed parts. |
| "Is it ready to launch?" | Stage 10. |
| A single design question | Answer it. Load only the pattern file it needs. |

### 4.6 Size budgets (small models)
| Item | Budget |
|---|---|
| SKILL.md | 1,600 words |
| Each stage file | 1,200 words |
| Each template | 600 words (fill-in fields, not prose) |
| Each pattern file | 1,500 words |
| Blocks | Not loaded as context. Copied into the project. Their README has one line per block. |
| Normal path for one stage | SKILL.md + 1 stage + its 1 to 2 templates + at most 1 pattern = under 5,000 words |
Update `evals/context-policy.json` and `evals/check_context.py` to this layout.

### 4.7 Questions before work (keep v1.2's decision cards, make them sharper)
- 0 to 4 questions total, all at once, each with options, a "My pick" and "You decide".
- Ask only what changes the plan: who it is for and the job, what stays out, the look (own system or recommended), and for websites the hero product and assets.
- If the owner says "you decide", record each pick as **Proposed (delegated)** and continue through all stages without stopping, except: prices, legal text, access policy and payments are never decided for the owner.
- In the eval harness the owner replies once. The skill must then finish everything in one go.

---

## 5. Phase 1: Foundation (days 1 to 6)

**Goal:** a short, clear spine that every model can follow, the checker inside the skill, the facts ladder, research and brainstorm stages that produce Opus-level thinking, and a graded baseline.

### P1.1 Finish and grade the baseline
- **Do:** run the missing baseline runs with the exact prompt in `evals/v2/README.md`: c4 Sonnet + v1.2, c5 Opus (high) alone, c5 Sonnet + v1.2, and c7 and c8 for both arms (new cases). Run pain recall on both c7 runs. Pack snapshot = `skills/shipright` at `9cb0e47` (v1.2). Use `python3 -I evals/v2/tools/prepare.py`.
- **Who runs it:** the run agents must be Claude Sonnet and Claude Opus (high effort). Grok cannot be a run arm. Altaz launches them in Claude Code, or you call the Anthropic API if he gives you a key. Prepare the folders and the 3 prompts as files so he can paste them.
- **Grade:** 3 blind graders per case with `grader-prompt.md`. Use **different model families** to cut bias: grader 1 = Claude Opus, grader 2 = Grok 4.7, grader 3 = GPT or Gemini if available, otherwise a second Claude Opus. Shuffle labels per grader (`anonymize.py` does this). Aggregate with `aggregate.py`.
- **Save:** `evals/v2/results/baseline-1.2.md` and `.json`. Commit the run folders under `evals/v2/runs/baseline-1.2/`.
- **Done when:** 8 cases × 2 arms are graded, and the log lists the top 3 grader fixes per arm.

### P1.2 Move the tools inside the skill
- **Do:** move `scripts/check-ui.mjs` to `skills/shipright/scripts/check-ui.mjs` (keep a thin wrapper at the old path that imports the new one). Create `skills/shipright/templates/` from the useful parts of `docs/` templates. Update `scripts/release_skill.py` so `shipright.zip` contains `scripts/`, `templates/`, `patterns/`, `blocks/`.
- **Paths in skill text:** always relative to the skill folder, written as `<skill>/scripts/check-ui.mjs`, and tell the model how to find `<skill>` (the folder that holds the SKILL.md it read).
- **Done when:** `unzip -l dist/shipright.zip` lists the scripts and templates, and a fresh copy of only `skills/shipright` can run `node <skill>/scripts/check-ui.mjs page.html` (needs Playwright; if missing, the script prints the one install command and exits 2).

### P1.3 Write the new SKILL.md (the spine)
- **Do:** replace `skills/shipright/SKILL.md`. Contents, in this order:
  1. What ShipRight does in 2 lines.
  2. Routing table (4.5).
  3. The stages table (4.2) with the file to open for each.
  4. Core rules, max 12 lines: facts ladder (4.3), removal test (3.3), no dev controls visible, Proposed vs Approved, silence is not approval, nothing ships without the owner, test before you claim, update the project record before a stage is done (P1.10), simple English.
  5. Questions before work (4.7).
  6. The reply format (template `reply.md`).
  7. How to find `<skill>` and run scripts.
- **Keep:** the description front matter, but rewrite it to trigger on: idea, app, SaaS, website, landing page, 3D site, dashboard, design system, UI review, feedback round, launch check.
- **Remove:** the duplicated Full flow text in `modes/build-pack/MODE.md`, the 5 copies of "Core rules if `_shared` is unreachable", the "1.0.0" header in the operating contract.
- **Done when:** under 1,600 words; a Haiku test (section 8.3) routes all 6 eval messages to the right first stage.

### P1.4 The facts ladder and the plain-English contract
- **Do:** rewrite `modes/_shared/operating-contract.md` and `intake.md` into one file `stages/_rules.md` (or keep two files, each under 900 words) in plain sentences. Add the facts ladder (4.3) with the 5 examples. Example of the rewrite style:
  - Before: "Reuse authorization; requested edits/writes authorize scoped local changes."
  - After: "If the owner asked you to write or change files, you may change those files. Do not change anything else."
- **Done when:** every sentence passes a read-aloud test (no shorthand), and the facts ladder appears in SKILL.md core rules.

### P1.5 Stage 1: Research (`stages/01-research.md` + `templates/research-brief.md`)
**What the stage tells the model to do:**
1. Write the 5 research questions this product depends on. Always include: who uses it and what they use today; what platform, API or legal rules apply; how money works (who pays, typical prices); what goes wrong in this domain (complaints, failure modes); what changes by time or place (seasons, hours, regions).
2. If web search is available: 5 to 10 searches, one per question plus follow-ups. Prefer official docs, pricing pages, laws, and real user complaints (reviews, forums). Record source and date.
3. If no web search: answer from general knowledge, tag each line **Assumed**, and list exactly what to verify and where.
4. Name at least 3 real alternatives, including "doing nothing" or "a spreadsheet". For each: what it does well, the gap, price shape.
5. End with "What this means for the product": 3 to 5 bullets that change the plan.

**Template fields:** questions; findings table (fact, kind Verified/Assumed, source, date); alternatives table; rules and limits table (rule, source, impact); money facts; domain world facts (the A5 move: what in the user's world changes decisions, such as weather, rate limits, deadlines); implications.

**Worked example to include (short):** LinkedIn automation. Rules: LinkedIn's User Agreement bans bots for invites, messages and scraping; posting through the official API is allowed (verify current terms). Implication: build an assistant that drafts and schedules, and the user presses send. This is how Opus found "a copilot, not a bot".

**Done when:** on c1, a Sonnet run produces a brief that names the platform rule and turns it into a product decision.

### P1.6 Stage 2: Brainstorm (`stages/02-brainstorm.md` + `templates/concepts.md`)
**What the stage tells the model to do:**
1. Write 3 concepts that differ in **mechanism** (how the product delivers value), not in features or colors. Test: if you can swap two concepts' names and nothing else changes, they are not different.
2. Each concept card: name; one line; who loves it; the core loop (what the user does every day, 3 to 5 steps); the signature moment (the one screen or interaction people remember); how it makes money; biggest risk.
3. Score each 1 to 5 on: user pain solved, difference from alternatives, buildable in the first release, money potential, risk. Show the table.
4. Pick one. Write **"The decision in one line"**: "[Name] is a [what] for [who] that [does the job] by [mechanism], unlike [alternative]."
5. If the owner said "you decide", record the pick as Proposed (delegated) and continue.

**Worked example (c3 landscaping):** concepts: (A) "Week board" that plans crews by capacity and weather, invoices on Friday; (B) "Crew-first phone app" where crews log work and the office approves; (C) "Recurring-route autopilot" that builds routes from service plans. Picked A because the owner's pain is the Monday plan and Friday invoices; signature moment: the rain-day card that moves 9 visits in one tap.

**Done when:** in c1, c2, c3 Sonnet runs, graders score area 2 (concept) 8 or higher.

### P1.7 Stage 3: Problem solving (`stages/03-problem-solving.md` + `templates/risks.md`)
- Risk register with columns: risk, type (platform, abuse, failure, edge case, money, data and privacy, cost, season or time, people), how likely, how bad, **design or tech decision**, test that proves it.
- Required rows for every product: what happens when the main integration fails; what happens when data is empty, huge or wrong; who could abuse it and how; what costs grow with usage.
- **Platform verdict table** when a third-party platform is involved: each planned feature gets Allowed / Risky / Banned with source.
- **Done when:** every risk row has a decision and a test. No row says "monitor" or "TBD".

### P1.8 Remove bloat (from the audit)
- Shrink `dist/shipright-chatgpt.md` (27,694 words) to a 3,000 to 4,000 word edition generated by `release_skill.py` from SKILL.md + stages + core templates.
- Delete the stray `skills/ui-ux-design/references/operator-workspaces.md`.
- Move eval history out of README into `docs/HISTORY.md`.
- Merge the four gates (Pack check, Pre-flight, Audit, Decision gate) into the stage gates in 4.2. Keep old IDs only where tests depend on them, and update the tests.
- Update `AGENTS.md` (maintainer rules) to the new layout: stages, templates, patterns, blocks, scripts. Its old rule "keep references under each mode's references/" and the gate IDs change with Altaz's approval at the Phase 1 gate.
- Fix contradictions: "exactly three options" everywhere; website stack lives only in `stages/05-architecture.md` (premium public site = Vite + Three.js or React Three Fiber + GSAP + Lenis; calm content site or no product object = Astro).

### P1.9 Stage 0: Discover and improve (`stages/00-discover.md` + templates `discovery.md`, `pain-map.md`, `user-test-script.md` + `scripts/crawl.mjs`)
This is the stage that makes ShipRight different. Build it with the same care as research.

**What the stage tells the model to do:**
1. **Inventory.** Run `node <skill>/scripts/crawl.mjs <url-or-index.html>`. It follows every link, button that changes the view, and hash route it can reach, signs in with demo accounts when offered, and saves for each screen: screenshots at 390 and 1280, the H1, the visible actions, form fields, and console errors. Without the script, visit screens by hand and record the same. Output: a screen table (screen, job, primary action, number of actions, states seen).
2. **Walk the core tasks.** Pick the 3 to 5 tasks the app exists for (from its own labels, docs and data). Walk each one as a first-time user. Record every step: clicks, typing, waits, scrolls, dead ends, unclear words, places where you had to remember something. Count the steps and screens per task.
3. **Say what works first.** List what works and why (clear patterns, good copy, useful data). These become **Keeps**: locked unless the owner says otherwise. A review that only criticizes is not trusted.
4. **List the pains.** Each pain has: ID, what happens, where (screen + screenshot), who it hurts, how often (Found by walk-through, or Reported by the owner or users), severity (Blocker, Major, Polish), and **cause** (one of: layout, flow, copy, missing feature, data model, rules or prerequisites, performance, trust, access).
5. **Run the lenses** on every screen: the removal test (3.3), the 7 layout moves (3.4b), F1 to F3 (exit, consistency, status), the app patterns A1 to A7, accessibility basics, and `node <skill>/scripts/consistency.mjs` (same job, different label or style).
6. **Find what is missing.** Use stage 1 light research (domain, rules, alternatives) and the page inventory (P2.1) to list missing jobs and pages. Ask "what starting points exist?" (IVC: lookup by phone only missed name lookup, child-first entry and returning visitors).
7. **Ask for the real pains.** Show the owner the top findings and ask: "What do your users complain about most?" Give `user-test-script.md`: a 10-minute script for 3 real users (3 tasks, think aloud, what to note, no leading questions). Owner and user pains are tagged **Reported**; walk-through pains are tagged **Found**. Never invent user quotes.
8. **Build the pain-to-fix map** (`pain-map.md`), one row per pain:

| ID | Pain | Evidence | Cause | Fix options (2) | Chosen fix | Pattern or rule it uses | Screen and component | Test that proves it | Impact 1-5 | Confidence 1-5 | Effort 1-5 | Now / Next / Later |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Worked row (from IVC, F06): "A 17-year-old learns about the parent signature too late" · walk-through step 6 of 9, screenshot · cause: prerequisites checked at the end · options: (a) warn at review, (b) show needs at lookup · chosen (b) · pattern P1 "next action on the search result" · Search result card + status badges · test: searching a 17-year-old shows "Parent signature needed" before any form · 5 / 5 / 2 · Now.

9. **Rank** by (Impact × Confidence) ÷ Effort. "Now" holds what fits one release. Group Now items into **3 to 5 themes** (for example "find people faster", "never surprise the volunteer"), because owners approve themes faster than 30 rows.
10. **Propose.** Reply with: what works (Keeps), the top pains with screenshots, the themes, the Now list, and up to 4 decision cards for real choices. In "you decide" mode, continue with the Now list as Proposed (delegated).
11. Then run stages 4 to 10 for the Now items only. Every built change names its pain ID in the build log and in the test plan. **Traceability check:** no built change without a pain ID; no Now pain without a test.

**Templates:** `discovery.md` (screen table, task walk tables, keeps, pains, missing jobs), `pain-map.md` (the table above plus themes), `user-test-script.md`.
**Script:** `crawl.mjs` with a test that crawls `evals/v2/cases/c7-ivc-app/app` and finds the sign-in screen, the desk, the registrations list and reports.
**Done when:** on c7, pain recall (answer key) is 60% or more in the smoke eval, and 70% or more at release.

### P1.10 The living project record (`templates/record/` + rule in SKILL.md)
Every project gets one folder that stays true for the whole life of the product, so the owner, a new chat, or another tool can pick up at any time. Path in the user's project: `docs/shipright/record/` (or the project's existing docs folder).

| File | Holds | Updated by |
|---|---|---|
| `CONTEXT.md` | One page: what it is, who it is for, the decision in one line, current phase, locks (what must not change), links to the other files | Stages 0, 1, 2, 4 and every feedback round |
| `ARCHITECTURE.md` | Stack with reasons, data model, access rules, integrations, secrets by name, budgets, costs | Stage 5, and any build change that touches them |
| `DECISIONS.md` | One row per decision: ID, date, decision, options considered, why, status (Proposed, Approved, Superseded), who decided, pain ID if any | Every stage and every feedback round |
| `CHALLENGES.md` | Hard problems met while building: what happened, cause, options tried, the fix, the lesson. Bugs included ("that was my bug"). | Stages 3, 8 and 9 |
| `CHANGELOG.md` | Dated entries: what changed, why (pain or decision ID), test result, screenshots | Stages 8 and 9 and every feedback round |
| `HANDOFF.md` | Continuation brief: where we are, what is done, what is next, open decisions, how to run and test, the files to read first | End of every session or stage |

Rules:
- A stage is not done until its record files are updated. Stage gates (4.2) include "record updated".
- Write facts once. Other files link to them.
- Use the facts ladder: Proposed is never written as Approved; Assumed is never written as Verified.
- Keep each file short and current. Replace stale lines; history lives in `CHANGELOG.md` and `DECISIONS.md` only.
- For an existing project, read the record first if it exists. If it does not, create it from what stage 0 found.

**Done when:** a fresh model given only the `record/` folder of a smoke-eval run can say what the product is, what was decided and why, and what to do next (test it once with Haiku or Grok and save the answer in `tests/reports/smoke/`).

### Phase 1 gate (stop and report to Altaz)
- Baseline graded, with the score table.
- New SKILL.md, stages 1 to 3 and their templates, tools inside the skill.
- **Smoke eval:** Sonnet + 1.3-draft on c1, c3 and c7, 3 graders, plus pain recall on c7. Target: area 1 (research) and area 2 (concept) at 8 or higher and higher than Opus; c7 pain recall 60% or more.
- Questions for Altaz (max 4, recommended first).

---

## 6. Phase 2: Design and build engine (days 7 to 13)

**Goal:** screens and sites that look and work like Opus or better, built on tested code, with a design system that is measured, not described.

### P2.1 Stage 4: Scope and pages (`stages/04-scope-and-pages.md` + `templates/scope.md`)
1. **Core loop** first (from the chosen concept).
2. **MVP with a value floor:** "The first release must include the one thing that makes the product worth using." Example: a LinkedIn assistant without drafting help is a notes app.
3. **Flows named after real moments** in the user's week ("Monday planning", "Rain day", "Friday invoicing", "Agent fails at 2am"). Each flow: trigger, steps, success, failure, exit.
4. **Page inventory** (Needed / Not needed / Later, with a reason), from handoff section 9:

| Group | Pages and surfaces |
|---|---|
| Public | Landing; pricing (if paid); about; contact or support; FAQ |
| Auth | Sign up; sign in; forgot password; reset password; verify email |
| Onboarding | Welcome; set up profile or workspace; first task empty state |
| App core | App shell; home; main list + detail + create / edit / delete with undo; search; notifications |
| Account | Profile; settings; security; billing (if paid); team and roles (if multi-user); delete account and export |
| System states | Loading; empty; error; offline; 403; **404**; **500**; maintenance; rate-limited |
| Legal | Privacy; terms; cookie banner only if non-essential cookies; refund (if paid). Templates with placeholders, marked "needs legal review" |
| Email | Welcome; verify; reset; receipts; one per important state change |
| Meta | Favicon from the real logo; OG image; titles and descriptions; sitemap; robots; manifest |

5. For each Needed page: job, primary action, states (empty, loading, error, success), phone layout, real copy.
- **Done when:** area 4 (features and scope) scores 8+ in the smoke eval.

### P2.2 Stage 5: Architecture (`stages/05-architecture.md` + `templates/architecture.md`)
Sections: stack table (choice, reason, switch point); data model (every table, fields, types, relations, the indexes that matter); access rules (who reads and changes which rows, enforced on the server); integrations (with rate limits and failure behavior from the risk register); secrets (names only); performance budgets (LCP under 2.5 s, INP under 200 ms, CLS under 0.1, plus 3D budgets); **costs per month** at 0, 100 and 1,000 users; build phases with weeks; open decisions with owner.
Keep the current `stack-choices.md` table (it is good) and the "fit the user's tool" table.

### P2.3 Stage 6: Design system (`stages/06-design-system.md` + `templates/DESIGN.md` + `templates/tokens.css`)
1. **Ask which system the owner wants** (one decision card): (a) their own system, code tokens or a Figma file; (b) a known system (shadcn/ui, Radix Themes, Material 3, Apple HIG, IBM Carbon, Tailwind defaults); (c) a ShipRight starter adapted to the product. For an existing app the default is (a): extract what the app already uses, mark it Observed.
   - For (a) and (b), map the system into ShipRight's token roles with a short **token adapter** table (their name → our role), so the components, blocks and checks all work on top of it. Never redesign an owner's system without approval.
2. For (c), start from one of the 4 starter systems (keep `starter-systems.md`, trimmed), then **adapt from the product** (move W3): the accent comes from the product or its world (keycap yellow, crust brown, field green).
3. Tokens with numbers: type scale (size/line-height pairs), spacing scale (3.4), color roles (bg, surface, text, muted, border, accent, success, warning, danger, focus), radii, shadows, motion durations and easing.
4. Run `node <skill>/scripts/check-tokens.mjs tokens.css`: prints every text/background pair with its contrast ratio, fails under 4.5:1 for body text and 3:1 for large text and UI borders, and fails off-scale spacing values.
5. Components with all states: button (default, hover, active, focus, disabled, loading), field (empty, filled, focus, error, disabled), select (custom, keyboard), table row (default, hover, selected, focus), badge, toast, dialog, empty state, error state, skeleton.
6. Build a `/design` preview page that shows every token and component state. Screenshot it.
7. **Fonts:** ship 2 open-licensed (SIL OFL) font families as woff2 in `blocks/fonts/` (one grotesk for UI, one display serif or wide grotesk for headlines), with `@font-face` snippets. Never rely on fonts that exist only on Linux. (The current ShipRight site uses "Liberation Serif" with no `@font-face`; on Mac it falls back to Times.)

### P2.4 Patterns (`patterns/app-screens.md`, `patterns/web-pages.md`, `patterns/system-pages.md`, `patterns/copy.md`)
Write each Opus move from section 2 as: **rule → why → good example → bad example → check**. Example entry:

> **A1. Situation headline.** The main heading of a work screen states the situation and the next decision with numbers.
> Why: the user knows what to do in 3 seconds.
> Good: "Week of October 19. 59 visits worth $8,385, 1 crew day over capacity, rain Thursday."
> Bad: "Schedule".
> Check: the H1 or the line under it contains at least one count and one consequence.

Add these app rules too: removal test (3.3); no dev or preview controls visible; no empty side panel (show the most useful item by default, or collapse the panel); every number gets its normal value (A3); every row in a "needs attention" list has its fixing action (A2); sample data labeled "Demo data" near the page title.

`patterns/web-pages.md`: the six-act story from v1.2 (keep, it is good) plus W1 to W4, the "product on the first screen" rule, one live touchable moment above the fold, and a short catalog: which block to use for which act.

### P2.5 Stage 7: Design options (`stages/07-design-options.md` + `templates/options.md`)
- Exactly 3 options. Each: the story or layout device, 3 to 5 techniques or patterns, type pair, palette (from the product), what it refuses, and one small preview (a screenshot of a 1-screen sketch is enough).
- Differ by device, not color. Apps: for example "work queue + context rail" vs "calendar board" vs "inbox-zero cards". Websites: "inspect the object" vs "take it apart" vs "use it".
- Pick one with a reason. Proposed until the owner approves. In "you decide" mode, continue.

### P2.6 Blocks: tested code (`blocks/`)
This is the biggest lever for premium quality on mid-size models. Write **your own** code. Each block is one self-contained HTML file with inline CSS and JS (ES module allowed), using only the vendored libraries (three, GSAP + ScrollTrigger, Lenis) or none.

**Every block must have:**
- A header comment: what it does, when to use, when not to, attributes to set, size in KB.
- `data-*` attributes or CSS variables for every choice (colors, text, speed, sizes).
- Reduced motion: a still, complete version.
- No-JS and no-WebGL: the content still shows (still image or DOM version).
- Keyboard and touch support where it is interactive.
- Cleanup: pauses off screen and when the tab is hidden.
- A test in `tests/blocks/` (Playwright): renders at 390 and 1280 with no console errors and no sideways scroll, reduced motion shows all text, and its main interaction works.

**Web blocks (8):**
| Block | Job | Inspired by (ideas only) |
|---|---|---|
| `product-stage` | One product object center stage, cursor or drag to turn, contact shadow, still fallback. Accepts a glTF or a code-built stand-in. | jeskojets, Other Matter |
| `exploded-view` | Parts separate along an axis with scroll or drag, numbered leader labels. | vividsites exploded view (ideas), Haiku trial |
| `pinned-scene` | One sticky stage over a 300 to 500vh track, scroll scrubs a timeline with named beats, reverse safe. | Brand New Day pattern |
| `mask-reveal` | Line-by-line title reveal with descender-safe padding. | Benjamin |
| `block-wipe` | Stepped block mask that wipes away to reveal a heading. | Benjamin "Selected Works" |
| `hover-invert-faq` | Rows invert to solid on hover, one open at a time, + becomes ×, tap works. | brand-studio |
| `scroll-rail` | Vertical scroll drives a horizontal track of cards. | ednaho |
| `counter-preloader` | 0 to 100 counter that hides warm-up, with Skip, bypassed under reduced motion. | Monolith, Zero |

**App blocks (9):**
| Block | Job |
|---|---|
| `app-shell` | Left sidebar (logo, nav with icons and count pills, profile bottom-left), slim top bar, phone drawer. No dot on active item. |
| `attention-list` | The A1 + A2 + A3 pattern: severity, what changed vs normal, one fixing action per row. |
| `data-table` | Bold first line + muted sub-line, sort, selection with a full border, row actions (next step + ⋮), 0 / 1 / many states. |
| `week-board` | Columns by day, rows by resource, capacity bars, drag or button to move items. |
| `context-rail` | Right column with summary and the next decision (A4), collapses on phone. |
| `custom-select` | Full keyboard dropdown (arrows, Home/End, type-ahead, Enter, Escape), flips near bottom. |
| `form-kit` | Field masks (phone), blur validation, errors that do not shift neighbours, Back ← / Next →. |
| `states-kit` | Empty, loading skeleton, error with retry, success toast, offline banner, 404 and 500 pages. |
| `app-motion-kit` | The micro-interactions in P2.13 as small functions with CSS: selection, stepper, FLIP list, toast, count-up, success check. |

`blocks/README.md`: one line per block (name, job, size, attributes). This is the only block text a model reads before choosing.

**Done when:** all 17 blocks pass their tests; each block screenshot is in `blocks/shots/`.

### P2.7 Stage 8: Build (`stages/08-build.md` + `templates/build-prompt.md`)
1. Build the design system preview first (`/design`), screenshot it.
2. Build screens in order of the core loop. Copy blocks; set attributes; do not rewrite block internals unless a test fails.
3. Apply the patterns file for the product type. Run the removal test on every screen.
4. Use labeled sample data that is domain-true (A6). Turn every supplied fact into behavior where it can (W1): hours become an open/closed status; notice periods become date limits; prices become totals.
5. For external coding tools, write `build-prompt.md`: one prompt per ticket for apps (goal, read first, steps, states, do not add, done when, stop line), one 550 to 1,700 word six-act prompt for a website. Keep v1.2's ticket anatomy (it is good).
6. No dev controls, test toggles or preview switches visible to users. If a state switcher is useful for review, put it behind `?review=1`.

### P2.8 Stage 9: Test and critique (`stages/09-test-and-critique.md` + `scripts/run-tests.mjs` + `templates/test-plan.json`)
**`test-plan.json`** lists, per screen: the URL; widths (390, 1280); actions (click, type, key, scroll) with expected results (text visible, element count, URL, no console error); states to force (empty, error) through URL flags; and visual checks.

**`run-tests.mjs`** runs the plan with Playwright and writes `test-report.md` with Pass/Fail per step, plus screenshots. It always also checks:
- No console errors, no failed requests, no sideways scroll at 320, 390, 768, 1280.
- Spacing between siblings on the scale (3.4), off-grid values listed.
- Text contrast of rendered elements (reuse check-ui).
- Touch targets 44px on phone.
- Every interactive element reachable by Tab, visible focus.
- Reduced motion: all text visible, no animation running.
- No WebGL (when a canvas exists): the same words and a still product image.
- Labels: Sample and Illustrative content has its visible label.
- Key text does not move when it should not (scoped animation check, from the IVC `.note` bug).
- `consistency.mjs` passes (P2.12).
- `check-record.mjs` passes: the project record matches what was built (P1.10, P3.3b).
- For an existing app: every Now pain in `pain-map.md` has a passing test, and before/after screenshots exist for every changed screen.

**Critique:** use `templates/critique.md`: the removal test per screen, the patterns check list, the taste questions (below), and severity (Blocker, Major, Polish). **The builder cannot give itself a Pass on taste.** If the tool can start a fresh agent with no build history, that agent critiques. If not, taste stays **Not verified** in the reply.

**Taste questions (new, they fail "dull"):**
1. Does the first screen say what this is and what to do in 5 seconds?
2. Is there one moment a user would screenshot or show a friend?
3. Does the main work screen show a situation with numbers (A1)?
4. Does each act or screen look different from the last?
5. Put the first screen next to the best reference for this product type at the same width. Name what the reference does better. Fix the top item.

**Fix loop:** up to 3 rounds of test → fix → retest. Record each round in `test-report.md`.

### P2.9 Feedback round (`stages/feedback-round.md` + `templates/feedback-log.md`)
From the IVC handoff section 2.2, as steps:
1. Parse the owner message into a numbered list, one item per change. Quote exact values.
2. Classify each: clear change / needs a decision / my bug / out of scope.
3. Ask about "needs a decision" items in one batch (max 4, recommended first, short preview). State obvious defaults instead of asking.
4. Keep before images.
5. Build only what is agreed. Liked parts are locked. Crops are the spec.
6. Test: one check per changed behavior, plus the full run.
7. After images at 1280 and 390, plus close-ups.
8. Report: what changed, what differs from the ask and why, tests, what waits on the owner.
9. Log a row per item.
10. Ship only on "push it", then verify the live site.

### P2.10 Taste profile (`taste/altaz.md`)
Rewrite from section 3 with numbers. Fix the 12px conflict (Altaz's scale has no 12 gap). Opt-in only: used when the owner is Altaz or a project selects it.

### P2.11 Layout pass (`patterns/layout-moves.md` + `templates/layout-spec.md`)
Structure before skin. For every screen, before any styling:
1. Write the screen job and its one primary action.
2. List every content block the screen needs (from scope and the pain map).
3. Order them by what the user needs first (move 1).
4. Group by meaning; secondary facts beside their main fact (move 2).
5. Place each control where its work happens (move 3).
6. Choose the grid: columns, gutters, max widths. Edges line up (move 4).
7. Pick the one hero element and size it up; demote the rest (move 5).
8. Cut steps: show the target, make the basic action automatic (move 6).
9. Make every state visible and looking like what it is (move 7).
10. Run the removal test (3.3). Remove what fails.
11. Write the result in `layout-spec.md`: zones (top to bottom, left to right), block order, grid numbers, widths at 390 and 1280, the hero element, and for an existing app a **before → after** list with the pain ID for each change.
12. Draw a quick wireframe (boxes and labels in HTML, grey only) and screenshot it before styling.
`patterns/layout-moves.md` holds the 7 moves with rule, why, good, bad and a check each, plus the IVC examples from 3.4b.

### P2.12 Component system and consistency (`templates/components.md` + `scripts/consistency.mjs`)
1. After the layout specs, list every UI element used on every screen.
2. Merge look-alikes into one component (one button family, not five). Decide variants and sizes.
3. For each component: variants, all states (P2.3 list), tokens used, accessibility notes, and which screens use it.
4. Write a **status table**: every status the product has (Draft, Waiting on parent, Paid...), its one label, one color role and one icon. The same meaning never gets two looks; two meanings never share one.
5. Write a **label table** for repeated actions (Save, Continue, Cancel, Remove) so the same job has the same word everywhere.
6. Build from blocks and these components only.
7. `consistency.mjs` scans the rendered pages: button texts and styles, badge texts and colors, heading sizes, spacing values. It flags the same label with different styles, different labels for the same action (from the label table), off-token colors and off-scale spacing. It runs in stage 9.

### P2.13 Motion system (`patterns/motion.md` + app block `app-motion-kit`)
1. **Motion tokens:** durations 120ms (small state), 200ms (enter and exit), 320ms (panels and dialogs), 600ms+ (scroll and story only); easing `cubic-bezier(.22,1,.36,1)` for enter, `cubic-bezier(.4,0,1,1)` for exit; stagger 70ms.
2. **Every animation has a job:** feedback (it worked), orientation (where it went), continuity (same thing, new place), or one-time delight. No job, no animation.
3. **App micro-interactions catalog** (in `app-motion-kit`, tested): selection (border and check), stepper progress, list add and remove (FLIP), toast in and out, skeleton to content, dialog open and close, number count-up, drag to reorder, success check, error shake (small, once).
4. **Tool decision table** (Grok: confirm each license and current size from the official docs and GitHub before writing it; record the date):

| Need | Use | Fallback | Reduced motion |
|---|---|---|---|
| State changes, hovers, small enters | CSS transitions and keyframes | none needed | instant change |
| List reorder, shared element, small JS motion | Web Animations API (or Motion One) | CSS | instant |
| Scroll timelines, pinned scenes, staged reveals | GSAP + ScrollTrigger | CSS scroll-driven animation where supported | content in normal flow, no scrub |
| Smooth inertial scroll on marketing pages | Lenis, desktop and fine pointer only | native scroll | off |
| A real 3D product or scene | Three.js, or React Three Fiber in React apps | still image | still image |
| Interactive vector characters, toggles with states | Rive | SVG + CSS | first frame |
| Designer-made playback animations | Lottie | SVG still | first frame |
| Games, particles, custom drawing | Canvas 2D | still image | still |
| Video for marketing or social | Remotion (not for in-app UI) | n/a | n/a |

5. Rules from IVC: scope every animation class; never animate what was not asked for; everything readable with no JS; off under reduced motion; 3D tilted elements lie flat when zoomed; bump the cache version on changed scripts.

### Phase 2 gate (stop and report)
- All stages 4 to 9 written, patterns, 17 blocks with passing tests, scripts.
- **Smoke eval:** Sonnet + 1.3-draft on c2 (dashboard), c5 (3D site) and c8 (improve an existing app), 3 graders. Target: 8.5+ on all three, above Opus on all three.
- Before/after screenshots of the same case (v1.2 vs 1.3-draft).

---

## 7. Phase 3: Prove it, polish it, open the PR (days 14 to 17)

### P3.1 Full eval round
- All 8 cases × Sonnet + 1.3 and Haiku + 1.3 (Haiku is report only). Pain recall on c7 for every arm. Opus (high) alone comes from the baseline, so do not rerun it unless the rubric changes.
- 3 blind graders per case, mixed model families (P1.1).
- Aggregate to `evals/v2/results/release-1.3.md`.
- **Win check:** Sonnet + 1.3 beats Opus on every case by 0.5 or more, and the release score is 9.3 or more.

### P3.2 Fix loop (repeat until the win check passes, max 3 rounds)
For each round:
1. Read every grader "fix" sentence and every area under 9.
2. Group them. For each group decide: is it a **stage** problem (the model did not think of it), a **template** problem (no field for it), a **pattern** problem (no rule or example), a **block** problem (code quality), or a **test** problem (bug not caught)?
3. Fix the smallest thing that removes the cause. Prefer a template field or a block fix over a new rule.
4. Rerun only the cases that failed, then the full round once at the end.
5. Log the round: causes, fixes, score change per case.

If after 3 rounds a case still loses, stop and report to Altaz with the cause and two options. Do not tune the skill to one case's wording (that is cheating the eval). Changes must make sense for any product.

### P3.3 Variance check
Single runs vary. For the final claim, run Sonnet + 1.3 twice more on the 2 closest cases. Report the mean and range.

### P3.3b Case study and pitch deck (`templates/case-study.md`, `templates/case-study.html`, `templates/pitch-deck.md` + `scripts/check-record.mjs`)
**Case study (made at the end of stage 9 for every project, or when asked):**
- Built only from the project record, the pain map, the test report and the screenshots. Nothing new is invented.
- Sections: the problem in one line; who it is for; what research found (Verified and Assumed marked); the idea and the 2 ideas not chosen; the 3 to 5 key decisions with their tradeoffs; for existing apps, the top pains with before and after screenshots; the design system in one image; process (stages, rounds, what changed after feedback); results (only measured: tests passed, steps saved per task, load time, accessibility checks; never invented business results); what is next.
- Two outputs: `case-study.md`, and `case-study.html` (a clean single page using the project's own design system, with the screenshots). The owner can publish it on a portfolio.
- Ask the owner before naming real people, clients or private data. Default is no names.

**Investor pitch deck (opt-in only: made when the owner asks for a pitch, a deck or investor material):**
- 10 slides as `pitch-deck.md` (one section per slide, with speaker notes), ready to paste into any slides tool: 1 Title and one line; 2 Problem; 3 Who has it (with research facts); 4 Solution (product screenshots); 5 How it works (core loop); 6 Why now and why us; 7 Market (Verified with source, or Assumed and labeled); 8 Business model and pricing; 9 Competition and the gap; 10 Traction, team and the ask.
- **Guardrail:** traction, revenue, users, team and the ask are written only if the owner supplied them. Otherwise the slide shows a clear blank: "[Add your real numbers]". Never invent market size, growth, users or quotes.
- The deck and the case study are not part of the 9.3 score.

**`check-record.mjs`:** checks that every record file exists and is not a template; every Approved decision has a date and a decider; every CHANGELOG entry links a pain or decision ID; every screenshot path in the case study exists; the case study has no number that is not in the record or the test report; the pitch deck has no market or traction number without a source or an "Assumed" or blank marker.

### P3.4 Rebuild the ShipRight website (`site/`)
Use ShipRight 1.3 itself on its own site (stages 1 to 10), with Altaz's references (why.zero.university best, itomdev the dream, jeskojets, other-matter, jesperlandberg, brand-studio FAQ, benjamincreative "Selected Works").
Fixed requirements from the audit:
1. Self-host real fonts (`@font-face`, woff2). Remove "Liberation Serif/Sans" and "DejaVu Sans".
2. Hero shows a **real ShipRight run**: a prompt types in, decision cards appear, "You decide" is tapped, the stages tick by, before/after screens land. Pinned scene, about 300vh.
3. The big type says what it is: "Turn an idea into a tested product your AI builds right." The tagline becomes the small line.
4. "Install ShipRight" as a filled button in the hero; "Watch a real run" second.
5. Remove the fake 3D (three flat boxes rocking 0.02 rad) or make it mean something (sheets fanning out into the real files).
6. A full-width before/after drag slider with 3 leader-line notes (the evals give real before/after pairs).
7. The process act as a pinned steps scene (brand-studio style): active step black, others 25%, the card swaps to the real artifact for that stage.
8. Install commands in monospace with an inline copy button; tabs per tool.
9. A real "Opus vs Sonnet + ShipRight" proof section using the release scores and screenshots, with the limits stated.
10. Labels 12px minimum. No eyebrow label above the hero.
11. A sample case study page made by ShipRight itself (from the c7 IVC run), to show users what they get for free.
Run stage 9 tests on it. Do not deploy. Vercel config stays.

### P3.5 README, changelog, release notes
- README: new promise (4.1), install table, a 3-image proof strip (Opus alone vs Sonnet + ShipRight on 3 cases), the score table with limits, "how it works" (the stages in one table). History moves to `docs/HISTORY.md`.
- `CHANGELOG.md`: 1.3.0 entry. `RELEASE-NOTES.md`: what changed and the evidence. Do not tag.

### P3.6 Pull request
- Title: "ShipRight 1.3: research to tested build, beats Opus alone".
- Body: results table, win rules status, before/after images, what is not verified, how to review. End it with the attribution line your own tool uses.
- **No merge.** Ask Altaz to review screenshots and say "merge it".

### Phase 3 gate (final)
Win check passed, PR open, Altaz has the screenshots and the 4 questions he needs to answer.

---

## 8. Testing the skill itself (what "test everything" means here)

### 8.1 Unit and source checks (every push)
- `python3 -m unittest discover -s tests` (update tests for the new layout; add tests for: every stage links its template; every template field named in a stage exists; SKILL.md routes; budgets in 4.6).
- `python3 evals/check_sources.py` and `--self-test`.
- `python3 evals/check_context.py` with the new policy.

### 8.1b Script tests
`crawl.mjs` on the c7 app finds sign-in, desk, registrations and reports. `consistency.mjs` flags a seeded page with two labels for one action and two colors for one status. `check-tokens.mjs` fails a seeded low-contrast pair.

### 8.2 Block tests (every block change)
`node tests/blocks/run.mjs` renders each block at 390 and 1280, reduced motion, no WebGL, and its interaction.

### 8.3 Behavior smoke tests (cheap, every stage file change)
A Haiku or Grok run with only the skill folder and one of the 6 messages, stopped after the stage under test. Check the output file against the stage gate (for example: 3 concepts that differ in mechanism; a risk register with no "TBD"). Save to `tests/reports/smoke/`.

### 8.4 Full evals (phase gates only)
Sections P1.1, P3.1. Costly. Run them only at gates.

---

## 9. Work order and timeline

| Day | Work |
|---|---|
| 1 | P1.1 prepare and hand off baseline prompts; P1.2 tools into the skill |
| 2 | P1.3 SKILL.md; P1.4 rules file |
| 3 | P1.5 research; P1.6 brainstorm |
| 4 | P1.7 problem solving; P1.8 bloat |
| 5 | P1.9 Discover stage + crawl script; P1.10 project record |
| 6 | Smoke eval; **Phase 1 gate** |
| 7 | P2.1 scope and pages; P2.2 architecture |
| 8 | P2.3 design system, fonts, check-tokens; P2.11 layout pass |
| 9 | P2.4 patterns; P2.5 options; P2.12 components and consistency |
| 10 to 11 | P2.6 blocks (17) with tests; P2.13 motion system |
| 12 to 13 | P2.7 build; P2.8 test kit; P2.9 feedback round; P2.10 taste; smoke eval; **Phase 2 gate** |
| 14 | P3.1 full eval |
| 15 | P3.2 fix loop |
| 16 | P3.3 variance; P3.3b case study and pitch deck; P3.4 site |
| 17 | P3.5 docs; P3.6 PR; **Phase 3 gate** |

Time box: about 17 working days. If a phase runs over by more than 2 days, stop and report.

---

## 10. Risks and how we handle them

| Risk | Decision |
|---|---|
| More text makes small models worse | Budgets in 4.6; templates and blocks carry the detail, not prose. |
| Tuning to the 8 cases (overfitting) | Rules must make sense for any product; P3.2 forbids case wording; add 2 fresh hidden cases at P3.1 (for example "a booking app for a dog groomer" and "a portfolio site for a ceramic artist") graded the same way. |
| Graders favor their own model | Mixed model families (P1.1); median of 3. |
| Run cost and usage limits | Smoke evals on 2 cases between gates; full rounds only at gates. |
| Blocks become a template look | 3 options must differ in device; blocks expose attributes; the critique asks "would a reference site do better" every time. |
| Honesty loses to Opus's invented richness | Sample and Illustrative labels allow the same richness with truth. |
| Discovery invents user pains | Pains are tagged Found (walk-through) or Reported (owner or users). No invented quotes. The user test script collects real ones. |
| The pitch deck invents traction or market size | Opt-in only; blanks for anything not supplied; `check-record.mjs` blocks unsourced numbers. |
| Record files go stale | A stage is not done until its record files are updated; `check-record.mjs` in stage 9. |
| Grok cannot run Claude arms | Altaz launches Claude runs from prepared prompt files, or provides an API key. |

---

## 11. Copy-paste prompts for Grok

### 11.1 Start of Phase 1
```text
You are rebuilding ShipRight on branch feat/v1.3-beat-opus in aiwithaltaz/shipright-skills.
Read docs/rebuild-1.3/PLAN.md fully, then docs/rebuild-1.3/IVC-HANDOFF.md, evals/v2/README.md, evals/v2/rubric.md, and the baseline runs in
evals/v2/runs/baseline-1.2/ (open the screenshots in shots/ and read reply.md and build/*.md for both arms).
Write docs/rebuild-1.3/LOG.md with your plan for Phase 1 (tasks P1.1 to P1.10), then do them in order.
Follow section 0 for how to work and report. Stop at the Phase 1 gate and send me the report.
Do not merge, tag, release or deploy.
```

### 11.2 Start of Phase 2
```text
Phase 1 is approved with these answers: <paste my answers>.
Continue with Phase 2 (P2.1 to P2.13) from docs/rebuild-1.3/PLAN.md. Sections 2 and 3 are the quality bar: every Opus move
A1 to A7 and W1 to W4, and every layout move in 3.4b, must become a rule with good/bad examples and a check, a template field, or a block.
Write your own block code. Each block needs its Playwright test. Stop at the Phase 2 gate and report.
```

### 11.3 Start of Phase 3
```text
Phase 2 is approved with these answers: <paste my answers>.
Continue with Phase 3 (P3.1 to P3.6, including P3.3b case study and pitch deck). Prepare the eval run folders and prompt files; I will launch the Claude
runs. Grade with 3 blind graders from different model families. Run the fix loop. Then rebuild site/ with
ShipRight 1.3, update README and changelog, and open the pull request. Do not merge.
```

### 11.4 Grader prompt
Use `evals/v2/grader-prompt.md` exactly. Do not edit it after seeing results.

---

## 12. Definition of done (all must be true)
- [ ] Sonnet + ShipRight 1.3 beats Opus (high) alone on all 8 cases by 0.5+ (median of 3 blind graders).
- [ ] c7 pain recall 70% or more, keep recall 2 of 3 or more, no false keeps.
- [ ] Every built change in c7 and c8 traces to a pain ID with a passing test.
- [ ] Sonnet + ShipRight 1.3 release score ≥ 9.3.
- [ ] 2 hidden cases scored, no drop over 0.5 vs the 8 known cases.
- [ ] Haiku + ShipRight 1.3 scores reported.
- [ ] Every release-eval run has a complete project record; `check-record.mjs` passes on all of them.
- [ ] A case study is produced for c7 and c8 with no invented numbers; the pitch deck template passes its guardrail check on one test run.
- [ ] Installed skill folder contains scripts, templates, patterns, blocks and fonts; `shipright.zip` verified.
- [ ] All unit, source, context and block tests pass.
- [ ] Every stage file and template within budget.
- [ ] Site rebuilt with real fonts, a real run in the hero and proof from the evals; stage 9 tests pass.
- [ ] README, changelog and release notes updated; PR open; nothing merged.
- [ ] Altaz has reviewed the screenshots and said yes.
