# Stage 0: Discover

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
