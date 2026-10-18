---
name: shipright
description: "Use this when someone has an idea, an app, a SaaS, a website, a landing page, a 3D site, a dashboard, a design system, a UI review, a feedback round, or a launch check. Also use for UX, UI, product framing, and build-pack. ShipRight plans the product, designs it, builds a tested screen, or improves an existing app."
---

# ShipRight

**Pack version:** 1.3.1
**Status:** released. Eval scores for 1.3 are pending. Context before generate. Product before pixels.

ShipRight takes an idea to a tested product, or a clunky app to a clearer one. Every design choice traces to a real pain or a real fact, and ends in a test.

Read this file first. Then open one stage file. Do not load every stage.

## Route

Use the first matching row. Then open that file.

| The user brings | Open |
| --- | --- |
| An existing app, plus review it, make it better, improve it, or what is wrong | [Discover](stages/00-discover.md) |
| Exact feedback, crops, or "rebuild the screen with these changes" | [Feedback round](stages/feedback-round.md) |
| A finished build, plus check it or critique this | [Test and critique](stages/09-test-and-critique.md) |
| "Is it ready to launch?" | [Ship check](stages/10-ship-check.md) |
| A new idea: an app, a SaaS, a website, a landing page, a 3D site, or a dashboard. Includes "just build it", "skip the plan", and "build in one go" | [Research](stages/01-research.md) |
| One design question | Answer it. Open at most one file it needs. |

Examples. These six messages open the first stage named here:

| Message | First stage |
| --- | --- |
| I want to build a LinkedIn automation app | [Research](stages/01-research.md) |
| I want to build a dashboard for a company with many AI agents | [Research](stages/01-research.md) |
| I want to build a SaaS software | [Research](stages/01-research.md) |
| I want to build a website | [Research](stages/01-research.md) |
| I want a premium 3D website for my product | [Research](stages/01-research.md) |
| Rebuild the screen with these changes | [Feedback round](stages/feedback-round.md) |

No step is skipped for a new project, even on request. Naming a mode does not skip a stage. If the idea is too vague to name the user and the job, ask the decision cards, then continue. Do not stop after the cards when the owner said to continue.

## Modes you can still name

These names stay so old installs work. They do not replace the stages.

| Mode | Runs | File |
| --- | --- | --- |
| build-pack | Stages 1 to 10 | [build-pack](modes/build-pack/MODE.md) |
| product-design | Stages 1 to 5 | [product-design](modes/product-design/MODE.md) |
| ui-ux-design | Stages 6 to 9 | [ui-ux-design](modes/ui-ux-design/MODE.md) |
| ux-critique | Stage 9 | [ux-critique](modes/ux-critique/MODE.md) |
| ship-check | Stage 10 | [ship-check](modes/ship-check/MODE.md) |

## Stages

A new project runs 1 to 10 in order. An existing app runs 0, a light pass of 1, then 4 to 10 for the approved fixes only. A stage is not done until its project record is updated.

| # | Stage | Open | Done when |
| --- | --- | --- | --- |
| 0 | Discover | [00-discover.md](stages/00-discover.md) | Screens captured, tasks walked, keeps listed, pains have evidence and a cause, fix map ranked |
| 1 | Research | [01-research.md](stages/01-research.md) | 3 or more real alternatives, rules checked, each fact Verified or Assumed |
| 2 | Brainstorm | [02-brainstorm.md](stages/02-brainstorm.md) | 3 concepts differ in mechanism, one decision line written |
| 3 | Problem solving | [03-problem-solving.md](stages/03-problem-solving.md) | Every risk has a decision and a test. No "monitor" or "TBD" |
| 4 | Scope and pages | [04-scope-and-pages.md](stages/04-scope-and-pages.md) | Core loop, value floor, page inventory with a reason |
| 5 | Architecture | [05-architecture.md](stages/05-architecture.md) | Stack, data, access, secrets by name, costs |
| 6 | Design system | [06-design-system.md](stages/06-design-system.md) | Tokens, components, one status table |
| 7 | Layout and options | [07-design-options.md](stages/07-design-options.md) | Exactly three options, one chosen, marked Proposed |
| 8 | Build | [08-build.md](stages/08-build.md) | Screen matches the spec, sample data labeled, no dev controls |
| 9 | Test and critique | [09-test-and-critique.md](stages/09-test-and-critique.md) | Checks at 390 and 1280, or marked Not verified |
| 10 | Ship check | [10-ship-check.md](stages/10-ship-check.md) | 20 items with evidence |

Show exactly three options. They differ in story or layout, not in color. Stop for the owner to choose or approve. If no human is available, pick one, say why, and mark it "Proposed, awaiting owner approval". Then still test and run ship-check.

## Core rules

1. Facts ladder. Content is Supplied, Verified, Assumed, Sample, or Illustrative. Sample and Illustrative stay labeled. Never invent facts, brand values, data, or features.
2. Removal test. If it repeats, has no job right now, is unconfirmed, is a later phase, is the wrong audience, or fights the main action, remove it.
3. No dev controls on the user screen. A review switch belongs behind `?review=1`.
4. Proposed is not Approved. Silence is not approval. You decide covers the named choice only. Prices, legal text, access policy, and payments are never decided for the owner.
5. Nothing ships, publishes, or charges money without the owner's OK.
6. Do not claim a pass you did not test. Use Pass, Fail, Not verified, or Not applicable, with evidence.
7. Update the project record before you call a stage done.
8. Simple English. Short sentences. Numbers, not adjectives.

**Core rules if `modes/_shared` is unreachable:** say the pack is incomplete.

The full ladder, the four statuses, and the readiness verdicts are in [the operating contract](modes/_shared/operating-contract.md). Questions are in [intake](modes/_shared/intake.md). Flow rules F1, F2, and F3 are in [flow-rules.md](modes/_shared/flow-rules.md).

## Questions before work

Ask 0 to 4 questions, all at once, inside the shared cap of 0-5 questions total before starting. Each question has options, a "My pick", and "You decide".
Ask only what changes the plan: who it is for and the job, what stays out, the look (their system or your recommendation), and for a website the hero product and the assets.
If the owner says you decide, record each pick as Proposed (delegated) and continue through the stages. Do not stop between files.

## Reply

Copy [reply.md](templates/reply.md). Lead with the result, then why, then the next step. Keep it short.

## Scripts

`<skill>` is the folder that holds the SKILL.md you read.

- `node <skill>/scripts/check-ui.mjs <page.html>`
- `node <skill>/scripts/crawl.mjs <index.html>`
- `node <skill>/scripts/check-record.mjs <record-folder>`
- `node <skill>/scripts/check-tokens.mjs <tokens.css>`
- `node <skill>/scripts/run-tests.mjs <test-plan.json>`
- `node <skill>/scripts/consistency.mjs <page.html>`

Taste is opt-in. Read `taste/altaz.md` only when the owner asks for that profile. Do not load it on every task.

If Playwright is missing, the checker prints one install command and exits 2. Install with: `npm i -D playwright && npx playwright install chromium`
