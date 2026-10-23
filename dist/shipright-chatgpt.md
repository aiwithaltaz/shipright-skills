# ShipRight for ChatGPT

Short edition for a Custom GPT or a ChatGPT project. It holds the router, stages 0 to 3, the feedback round, and the core templates.
Stages 4 to 10, the mode references, and the scripts are in shipright.zip. When a step names one of those files, follow the step and say the file is in the full skill if this paste does not include it.

Claude Code, Cursor, Codex, VS Code, Antigravity, and Gemini CLI should install the `shipright` skill instead of this file. The command is `/shipright`.

---

# Source: SKILL.md

---
name: shipright
description: "Use this when someone has an idea, an app, a SaaS, a website, a landing page, a dashboard, a store, a mobile app, a UI review, a feedback round, or a launch check. Also use for UX, UI, product framing, and build-pack. ShipRight thinks about the product, designs it from real references of the same type, and builds it."
---

# ShipRight

**Pack version:** 1.7.0
**Status:** released. Think first, then design from real references.

Think about the product, then design from real references of the same type, then build and look again. Never invent facts, brand values, data, or features. Label sample data.

No step is skipped for a new project, even on request. "just build it", "skip the plan" and "build in one go" still run every step below, quickly.

## Other jobs

| The user brings | Open |
| --- | --- |
| An existing app to review or improve | [Discover](stages/00-discover.md) |
| A redesign of a live site or app | [Research B: keep-what-works audit](steps/00-research.md) first, then all steps below |
| Exact feedback, crops, or "rebuild the screen with these changes" | [Feedback round](stages/feedback-round.md) |
| A finished build to check | [Test and critique](stages/09-test-and-critique.md) |
| "Is it ready to launch?" | [Ship check](stages/10-ship-check.md) |

Old mode names still work: [build-pack](modes/build-pack/MODE.md), [product-design](modes/product-design/MODE.md), [ui-ux-design](modes/ui-ux-design/MODE.md), [ux-critique](modes/ux-critique/MODE.md), [ship-check](modes/ship-check/MODE.md).

**Core rules if `modes/_shared` is unreachable:** say the pack is incomplete.

## New project or redesign: 5 steps

Hard rules for every step: [word limits](steps/word-limits.md) and [clarity rules](steps/clarity.md). **Never downgrade craft:** a redesign keeps or beats the current site's motion, 3D, media and proof.

Open one step file at a time, in order. Durable files: `BASELINE.md` (redesigns only), `PRODUCT.md`, `DESIGN.md`, `LOOK-REPORT.md`. Every later step reads them.

1. [Research](steps/00-research.md): real competitor and award references of the same type and audience ([product-references/](product-references/README.md)). For a redesign, a required keep-what-works audit and craft bar in `BASELINE.md`.
2. [Product](steps/01-product.md): user, job, key message, success, scope, sample data. Writes `PRODUCT.md`.
3. [UX](steps/01b-ux.md): the audience's real question, scope at a glance (all proof in one overview first), information order, flows, states.
4. UI: [Color](steps/02a-color.md) first: adopt the brand's colors, or propose one from 3 to 5 competitors; never reuse a past palette or default to black and neon. [Design](steps/02-design.md) picks a style that fits the audience (phone apps: the [phone-app kit](kits/phone-app/README.md) and one of its 3 packs) and writes `DESIGN.md`. Portfolios, marketing and launches also use the [motion and depth pack](steps/02b-motion-depth.md). Then [Build](steps/03-build.md) every screen.
5. [Look and fix](steps/04-look-and-fix.md) (required): screenshots at 390 and 1280 (1280 uses the width, no phone tab bar; and mid-animation frames), taste, clarity and craft-vs-baseline checks, fixes, at most 3 rounds. Asks: would this win against an award-level reference? Checks overlaps in mid-animation frames and floating buttons on phone. Required [leak check](scripts/check-leaks.mjs): no planning words on screen. Not done until it passes and `LOOK-REPORT.md` exists.

Heavy effects (sound, camera flight) are optional: see [extras/](extras/README.md). Taste is opt-in: read `taste/altaz.md` only when asked. Tools such as `check-ui.mjs`, `check-tokens.mjs` and `run-tests.mjs` are optional.

## Reply

Lead with the result, then why, then the next step. Short. See [reply.md](templates/reply.md).

---

# Source: stages/00-discover.md

# Stage 0: Discover

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 00 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Use this only for an existing app. Your job is to use it, name what works, name what hurts, and turn pains into a ranked fix map. A review that only criticizes is not trusted.

Read [discovery.md](../templates/discovery.md), [pain-map.md](../templates/pain-map.md), and [user-test-script.md](../templates/user-test-script.md).
Required headings in discovery.md: Screen table, Task walks, Keeps, Pains, Missing jobs.
Required headings in pain-map.md: Themes, Rows.
Required headings in user-test-script.md: Tasks, Notes, Do not.

## 1. Inventory

Run `node <skill>/scripts/crawl.mjs <url-or-index.html>`. It follows links and hash routes, signs in with a demo account when one is offered, and saves each screen: shots at 390 and 1280, the H1, the visible actions, the form fields, and console errors.
If you cannot run it, visit the screens yourself and record the same facts.
Write a screen table: screen, job, primary action, number of actions, states seen.

## 2. Walk the core tasks

Pick the 3 to 5 tasks the app exists for, from its own labels, docs, and data. Walk each one as a first-time user. Record every click, type, wait, scroll, dead end, and unclear word. Count the steps and the screens.

## 3. Say what works first

List what works and why. These are **Keeps**. Do not change a Keep unless the owner says so.

## 4. List the pains

Each pain has an ID, what happens, where (screen plus screenshot), who it hurts, how often, severity, and a cause.
How often is **Found** (you walked it) or **Reported** (the owner or a user said it). Never invent a user quote.
Severity is Blocker, Major, or Polish.
Cause is one of: layout, flow, copy, missing feature, data model, rules or prerequisites, performance, trust, access.

## 5. Run the lenses

On every screen: the removal test, F1 exit, F2 consistency, F3 status. Put the next action on the item that needs it. Compare a number to its normal value. Do not leave an empty side panel.
Run `node <skill>/scripts/check-ui.mjs` on a rendered screen when you can.

## 6. Find what is missing

Do a light research pass (stage 1): domain, rules, alternatives. Ask what starting points exist. A search that only accepts one field often misses the way people actually arrive.

## 7. Ask for the real pains

Show the top findings. Ask: "What do your users complain about most?"
Hand over the user-test script: 10 minutes, 3 real users, 3 tasks, think aloud, no leading questions.
Owner and user pains are Reported. Walk-through pains are Found.

## 8. Pain-to-fix map

One row per pain in pain-map.md:

ID, pain, evidence, cause, two fix options, chosen fix, the pattern it uses, the screen and component, the test that proves it, impact 1-5, confidence 1-5, effort 1-5, Now / Next / Later.

Worked row: "A 17-year-old learns about the parent signature too late." Evidence: walk-through, late in the form. Cause: prerequisites checked at the end. Options: warn at review, or show the need on the search result. Chosen: show it on the search result. Test: searching that person shows "Parent signature needed" before any form. Impact 5, confidence 5, effort 2. Now.

## 9. Rank and group

Rank by (impact times confidence) divided by effort. "Now" is what fits one release. Group Now into 3 to 5 themes. Owners approve themes faster than 30 rows.

## 10. Propose, then build only the Now list

Reply with Keeps, the top pains, the themes, the Now list, and up to 4 decision cards. In "you decide" mode, continue with the Now list as Proposed (delegated).
Then run stages 4 to 10 for the Now items only. Every built change names its pain ID. No built change without a pain ID. No Now pain without a test.

## Record

Update [CONTEXT.md](../templates/record/CONTEXT.md) and [HANDOFF.md](../templates/record/HANDOFF.md) in the project's `docs/shipright/record/`. If a record already exists, read it first.
Required headings in CONTEXT.md: What it is, Who it is for, Decision in one line, Phase, Locks.
Required headings in HANDOFF.md: Where we are, Done, Next, Open decisions, How to run.

## Gate

Every screen visited and captured. Core tasks walked and timed. Each pain has evidence and a cause. Keeps listed. Fix map ranked. Owner asked for real complaints. Record updated.

---

# Source: stages/01-research.md

# Stage 1: Research

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 01 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Know the users, the alternatives, the rules, and the money before you invent a concept. Open [research-brief.md](../templates/research-brief.md).
Required headings: Questions, Findings, Alternatives, Rules and limits, Money, Domain world, Implications.

For an existing app on the improve path, keep this light: domain, rules, and alternatives only. Do not restart the whole brief.

## Idea brief

Before research on a new project, write `## Idea` in CONTEXT.md with five lines: Vision, User, MVP, Out of scope, Next step. Research then tests that brief.

## Steps

1. Write the 5 questions this product depends on. Always include: who uses it and what they use today; which platform, API, or legal rules apply; how money works (who pays, and the usual price shape); what goes wrong in this domain; what changes by time or place (season, hours, region).
2. If web search works: run 5 to 10 searches. Prefer official docs, pricing pages, laws, and real complaints (reviews, forums). Record the source and the date.
3. If search is unavailable: answer from general knowledge, tag every line **Assumed**, and list exactly what to verify and where.
4. Name at least 3 real alternatives, including "doing nothing" or "a spreadsheet". For each: what it does well, the gap, and the price shape.
5. End with "What this means for the product": 3 to 5 bullets that change the plan. A finding that does not change a decision does not belong here.

## Findings

Each fact is **Verified** (source and date) or **Assumed** (how to check). Do not upgrade Assumed to Verified because it sounds right.
Domain world facts are the things in the user's week that change a decision: weather, a rate limit, a deadline, a capacity cap. These show up later on the screen, not only in the doc.

## Worked example

LinkedIn automation. Rule: LinkedIn's User Agreement bans bots that send invites, messages, or scrape profiles. Posting through the official API is allowed. Verify the current terms before you treat this as Verified. Implication: build an assistant that drafts and schedules, and the user presses send. A copilot, not a bot.

## Vague idea

If you still cannot name the user and the job, ask the decision cards from SKILL.md first. Then fill this brief. A request to build it is not a frame, and it is not permission to invent.

## Record

Update CONTEXT.md: who it is for, and which facts are Assumed. Add a DECISIONS.md row for any choice you are making from the research.
Required headings in DECISIONS.md: Rows.

## Gate

At least 3 real alternatives. Platform, legal, and data rules checked. Every fact tagged Verified or Assumed. Implications change the plan. Record updated.

---

# Source: stages/02-brainstorm.md

# Stage 2: Brainstorm

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 02 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Find one sharp idea. Open [concepts.md](../templates/concepts.md).
Required headings: Concepts, Scores, Decision in one line.

Do this after research. Use the implications. Do not add features to hide a weak idea.

## Steps

1. Write 3 concepts that differ in **mechanism** (how the product delivers the value), not in features or colors. Test: if you can swap the names and nothing else changes, they are not different.
2. Each concept card: name; one line; who loves it; the core loop (what the user does every day, 3 to 5 steps); the signature moment (the one screen or interaction people remember); how it makes money; the biggest risk.
3. Score each 1 to 5 on: user pain solved, difference from alternatives, buildable in the first release, money potential, risk. Show the table.
4. Pick one. Write the decision in one line: "[Name] is a [what] for [who] that [does the job] by [mechanism], unlike [alternative]."
5. If the owner said "you decide", record the pick as Proposed (delegated) and continue. Do not stop for applause.

## Worked example

A scheduling tool for small landscaping crews. Concepts: (A) a week board that plans crews by capacity and weather, and invoices on Friday; (B) a crew phone app where crews log work and the office approves; (C) a route builder that lays out the week from service plans. Pick A when the pain is the Monday plan and the Friday invoices. Signature moment: a rain-day card that moves the day's visits in one action.

## What not to do

Do not present three color themes as three concepts. Do not pick the concept with the longest feature list. Money and the core loop have to be specific. "Users will love it" is not a mechanism.

## Record

Write the decision line into CONTEXT.md. Add the pick, the two you did not pick, and why, as one DECISIONS.md row. Status is Proposed until the owner approves.

## Gate

Three concepts differ in mechanism. Scores are shown. The decision line is written. Record updated.

---

# Source: stages/03-problem-solving.md

# Stage 3: Problem solving

**Deal first:** run `node <skill>/scripts/deal.mjs --stage 03 --tags <project tags>` and apply the cards it prints. Do not open `library/` yourself.

Find the hard problems and answer each one. Open [risks.md](../templates/risks.md).
Required headings: Risks, Platform verdict, Required rows.

A risk without a decision is a wish. "Monitor" and "TBD" are not decisions.

## Columns

Risk, type, how likely, how bad, design or tech decision, test that proves it.
Type is one of: platform, abuse, failure, edge case, money, data and privacy, cost, season or time, people.

## Required rows

Every product gets these, even if the answer is short:

- The main integration fails (API down, timeout, bad payload). What does the user see, and what is saved?
- Data is empty, huge, or wrong. What is on screen?
- Who could abuse it, and how is that limited?
- Which costs grow with usage, and what is the cap?

## Platform verdict

When a third-party platform is involved (a social network, a payment provider, an app store), add a row per planned feature: Allowed, Risky, or Banned, with the source and date. A banned feature does not ship behind a toggle. Change the concept instead.

## Decisions

Each decision is concrete: a limit, a state, a copy line, a server check, or a cut from the first release. Write the test that would fail if the decision is ignored.
Unknown access, destructive effects, and prices stay unresolved. They cannot become defaults. See the operating contract.

## Record

Add each hard problem to CHALLENGES.md when you meet it while building. The risk row is the plan. The challenge row is what actually happened.
Required headings in CHALLENGES.md: Rows.

## Gate

Every risk row has a decision and a test. No row says "monitor" or "TBD". Platform features have a verdict when a platform is in scope. Record updated.

---

# Source: stages/feedback-round.md

# Feedback round

Use this when the owner sends exact changes, crops, or a marked screenshot. Do not run a full rediscovery. Then run stages 8 and 9 only for what changed.

Open [feedback-log.md](../templates/feedback-log.md).
Required headings: Rows.

## Steps

1. Parse the message into a numbered list, one item per change. Quote exact values (pixels, labels, colors).
2. Classify each item: clear change, needs a decision, my bug, or out of scope. If the owner names the wrong cause for a real problem, say so once, plainly, then do what they choose.
3. Ask the "needs a decision" items in one batch. Max 4. Recommended option first. A short preview of each. State an obvious default instead of asking.
4. Keep before images. Crops are the spec. A full screenshot is context only.
5. Build only what was agreed. What the owner likes is locked. Do not restyle the rest.
6. Test: one check per changed behavior, plus the checker on the page.
7. After images at 1280 and 390, plus a close-up of the change.
8. Report: what changed, what differs from the ask and why, tests, what still waits on the owner.
9. Log a row per item: feedback, decision, status, why. Update CHANGELOG.md and DECISIONS.md.
10. Ship only when the owner says to push. Then verify the live page has the change. Until then the work is Proposed.

## Record

Required headings in CHANGELOG.md: Entries.
A row names the pain or decision ID, the test result, and the screenshot path.

## Gate

Every asked change is done, refused with a reason, or waiting on a named decision. Liked parts are unchanged. Tests cover the changes. Record updated.

---

# Source: templates/research-brief.md

# Research brief

Status: template

One row per fact: fact, kind (Verified or Assumed), source, date. Alternatives include doing nothing. Implications must change the plan.

Replace `Status: template` with `Status: current` when this file holds the project, not the blank.

## Questions

- 

## Findings

- 

## Alternatives

- 

## Rules and limits

- 

## Money

- 

## Domain world

- 

## Implications

-

---

# Source: templates/concepts.md

# Concepts

Status: template

Three concepts. Each: name, one line, who loves it, core loop, signature moment, money, biggest risk. Scores are 1 to 5.

Replace `Status: template` with `Status: current` when this file holds the project, not the blank.

## Concepts

- 

## Scores

- 

## Decision in one line

-

---

# Source: templates/risks.md

# Risks

Status: template

Columns: risk, type, how likely, how bad, decision, test. No monitor. No TBD. Platform rows are Allowed, Risky, or Banned.

Replace `Status: template` with `Status: current` when this file holds the project, not the blank.

## Risks

- 

## Platform verdict

- 

## Required rows

-

---

# Source: templates/discovery.md

# Discovery

Status: template

Screen table columns: screen, job, primary action, action count, states. Pains are Found or Reported. No invented quotes.

Replace `Status: template` with `Status: current` when this file holds the project, not the blank.

## Screen table

- 

## Task walks

- 

## Keeps

- 

## Pains

- 

## Missing jobs

-

---

# Source: templates/pain-map.md

# Pain map

Status: template

Row columns: ID, pain, evidence, cause, two options, chosen fix, pattern, screen, test, impact, confidence, effort, Now / Next / Later.

Replace `Status: template` with `Status: current` when this file holds the project, not the blank.

## Themes

- 

## Rows

-

---

# Source: templates/reply.md

# Reply

Status: template

Lead with the result. Decisions you made are Proposed unless the owner approved them. Needs you is only prices, legal text, access, payments, or a real blocker.

Replace `Status: template` with `Status: current` when this file holds the project, not the blank.

## Result

- 

## Decisions

- 

## Needs you

- 

## Next

-

---

# Source: templates/record/CONTEXT.md

# Context

Status: template

One page for the whole product. Replace stale lines. History lives in DECISIONS and CHANGELOG, not here.
Replace `Status: template` with `Status: current` when filled.

## Idea

- Vision:
- User:
- MVP:
- Out of scope:
- Next step:

## What it is

-

## Who it is for

-

## Decision in one line

-

## Phase

-

## Locks

-

---

# Source: templates/record/HANDOFF.md

# Handoff

Status: template

A new chat should be able to continue from this file alone, plus the links below.
Replace `Status: template` with `Status: current` when filled.

## Where we are

-

## Done

-

## Next

-

## Open decisions

-

## Security

-

## Preview and QA

-

## Monitoring

- Owner:

## How to run

-
