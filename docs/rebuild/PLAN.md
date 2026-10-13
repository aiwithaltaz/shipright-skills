# ShipRight v1.0 rebuild: plan

Status: **Draft for Altaz's OK.** Nothing outside docs/rebuild changes until approved.

## The one-line diagnosis

ShipRight 0.6.2 is good at rules about truth and scope, and weak at producing good-looking, buildable output.
Phases 1 to 5 added research, IA, journey and design-system theory (about 17,000 more tokens of guidance).
Scores tied near the ceiling because the rubric measured rule-following, not the screen or the build pack.
The guidance also forbids choosing values ("never invent numbers"), so the model falls back to its generic defaults.

## What the audit found

| Area | Today | Problem |
| --- | --- | --- |
| Size | 37,070 tokens across 4 skills, 52 files. Largest normal path 10,888 of 12,000. | Long, and most of it is process, not output craft. |
| Front door | Four skills. No single "idea in, build pack out" path. | The goal is a whole agency project. Today the user must route it. |
| Visual craft | Anti-slop list, layout contract, no concrete scales. | No starter system with real numbers. No dense-but-calm rules. No marketing-page rules. |
| Mobile | Mentions thumb reach only. | No platform conventions, form-flow, keyboard, or safe-area rules. |
| Motion and 3D | "Do not add motion" by default. No 3D at all. | Cannot do premium motion or a 3D site well, or safely. |
| Stack choice | doc 02 template only. | No rules for which stack fits which product, and why. |
| Tickets | Ticket list template. | Not written as paste-ready prompts with files, checks and a stop. |
| Checks | Source checks on wording. | Nothing measures the rendered screen. Rules are hoped, not checked. |
| Evals | 495 files of careful text trials. | Phase tests pin old wording, so they will break when text is cut. |

What works and stays: no invented facts, phase scope, exact feedback as checks, four statuses, F1 to F3 flow rules, 0 to 5 questions, gate IDs 8/10/10/20, honest evidence limits.

## Target shape of v1.0

- **One new front door: `build-pack` skill.** Idea in, build pack out: PRD, stack and architecture, design system with tokens, screen specs, and ordered tickets as paste-ready prompts. It runs the other four skills' steps in order and loads only what each step needs.
- **The four skills stay** (names and gate IDs unchanged) but get shorter. product-design: frame, flows, PRD. ui-ux-design: system, screens, motion, 3D. ux-critique: look-and-fix. ship-check: launch.
- **Starter systems with real numbers**, marked Proposed: dense product UI, mobile app, editorial marketing, immersive 3D. The user picks one in intake or delegates. No more empty "Unknown" scales.
- **Worked examples beat theory.** One short golden build pack per product type, loaded only for that type.
- **A screen checker** (`scripts/check-ui.mjs`, Node and Playwright) that measures rendered HTML: overflow at 390px, contrast, fonts actually loaded, tap target size, filled buttons per view, gradients and glows, em dashes, reduced-motion support. Rules become checked, not hoped.
- **Lean loading.** Target: total guidance at or under 30,000 tokens (down about 20%) while adding stack, mobile, motion and 3D. Normal path at or under 10,000. Every rule must change output; theory moves to a SOURCES.md that is never loaded.

## How every phase is proven

Written now, before building. Frozen in Phase 1 under `evals/v1/`.

**Four fixed prompts** (raw user wording, no hints):
1. SaaS dashboard: "A dashboard for a small agency to track client projects, budgets and deadlines."
2. Mobile form flow: "A mobile app flow where a new user signs up and books their first home cleaning."
3. Marketing website: "A marketing website for SocialGhost, an AI tool that makes faceless YouTube videos." (facts limited to what is public on trysocialghost.com; no invented metrics)
4. 3D product website: "A product website for a premium wireless speaker with a 3D model the visitor can rotate."

**Two arms.** Old: main at 8233744 (0.6.2 plus Phase 5.1). New: the phase's branch state. Baseline runs once in Phase 1 and is frozen.

**Runs.** A fresh agent per run gets only the pack, the raw prompt and "deliver the build pack and the key screen as one HTML file." It never sees the rubric. Delegated answers to intake questions are scripted the same way for both arms.

**Screenshots.** Real Chromium renders at 1280x800 and 390x844, side by side under `examples/before-after/v1.0-<phase>/<prompt>/`.

**Scoring.** Fresh grader agents see anonymous A/B screenshots and build packs, never which is new. I do not score. Plus the checker's numbers. Altaz sees every picture.

**Rubric (0 to 3 each, 30 points per prompt):**

| # | Criterion | 3 looks like |
| --- | --- | --- |
| 1 | Hierarchy | The main task or message is obvious in 3 seconds. One primary action per view. |
| 2 | Spacing and alignment | One spacing scale, shared edges, groups tighter inside than between. |
| 3 | Dense but calm | Lots of real information, nothing shouting. No empty hero padding, no card around everything. |
| 4 | No slop | No gradient-glow, filler stats, fake quotes, eyebrow labels, icon-card rows, emoji. |
| 5 | Type and color | Two fonts at most, clear scale, accent used with purpose, contrast passes. |
| 6 | States and flows | Empty, loading, error, success and exit paths are specified and visible where relevant. |
| 7 | Mobile and access | Works at 390px, labels, focus, 44px touch targets on mobile, reduced motion. |
| 8 | Motion and 3D fit | Motion has a purpose, budget and fallback. Not applicable scores 3 if correctly left out. |
| 9 | Build pack completeness | PRD, stack with reasons, tokens, screen specs, tickets. Nothing invented. |
| 10 | Ticket actionability | Each ticket is a paste-ready prompt with files, checks and a stop. |

**Hard floor:** invented metrics, testimonials or legal text, a broken layout at 390px, or an inaccessible primary action makes that run "unshippable" whatever its score.

**Pass bar per phase:** the new arm must beat the frozen baseline on its target criteria, with no criterion dropping by 1 or more on average, and reply length not growing more than 15% unless completeness rises. If not, fix or cut the phase.

**Limits I will state:** graders are the same model family; 1 run per prompt per arm per phase (2 in the final run); synthetic prompts are not user research.

## Phases

| # | Phase | What changes | How it is verified | Size budget |
| --- | --- | --- | --- | --- |
| 0 | Research and plan | docs/rebuild only | Altaz's OK | Docs only |
| 1 | Harness and baseline | evals/v1 (prompts, rubric, run protocol), scripts/check-ui.mjs, render and compare scripts. Checker exempts the verbatim BLUEPRINT.md. Retire phase tests that pin old wording; replace with one v1 safeguard test. | Checker self-test on known bad and good HTML. Baseline runs for 4 prompts, frozen. | Scripts under 500 lines. No skill text change. |
| 2 | Lean core and build pack | New build-pack skill and output contract. Merge 17 product-design references into about 5, and the system references into 3. Provenance moves to SOURCES.md. Ticket-as-prompt template from the blueprint. Stack chooser. | 4 prompts. Target criteria 9 and 10 up. Others hold. | Total guidance at or under 30,000 tokens. build-pack entry under 2,500. |
| 3 | Visual craft | Starter systems with exact tokens (DTCG layering, light and dark). Dense-but-calm product rules. Mobile app and form rules. Marketing page rules. One golden example per product type. Skills tell the agent to run check-ui and look at screenshots before handoff. | 4 prompts. Criteria 1 to 5 and 7 up. Checker failures down. | Adds at most 5,000 tokens; normal path at or under 10,000. |
| 4 | Motion and 3D | Motion rewrite: should it animate, purpose, durations, easing, interruption, reduced motion. GSAP and Lenis for marketing scroll. Three.js and React Three Fiber: when 3D helps, asset and frame budgets, mobile fallback, canvas semantics. | Prompts 3 and 4 mainly. Criterion 8 up. No accessibility or performance regression. | Two references, 3,000 tokens each at most, loaded only on request. |
| 5 | Critique and launch | ux-critique uses check-ui plus a screenshot look-and-fix loop (3 rounds max). ship-check adds Core Web Vitals targets and 3D budgets. | Final run: all 4 prompts, 2 runs each, old versus new. | No net growth. |
| 6 | Release | README, CHANGELOG, v1.0 release notes, AGENTS.md budgets, before/after gallery. One PR. | All checks green. Gallery links resolve. | Docs only. |

After each phase: commit, update PROGRESS.md and CONTEXT.md, and push to `claude/nifty-brahmagupta-ds6xrg`.

## Decisions I need from you

1. **New fifth skill `build-pack` as the front door.** My pick: yes. One entry for "I have an idea" is what makes it feel like an agency. The four old skills stay for focused jobs. The alternative is a big new mode inside product-design, which makes that file longer.
2. **Starter systems with real numbers, marked Proposed.** My pick: yes. This reverses the old "no numbers until approved" stance, which is why screens looked generic. Your approved or existing system still always wins.
3. **Retire the Phase 1 to 5 tests that pin old wording.** My pick: yes, replace with one v1 test of the safeguards that matter. Historical eval folders stay untouched.

Everything else I will decide, log in CONTEXT.md, and continue.
