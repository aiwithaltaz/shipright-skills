# v2 rubric (frozen)

**Frozen:** October 15, 2026, before any ShipRight 1.3 skill edit. Do not change it after seeing results. A new rubric needs a new folder and a new baseline.

**Question it answers:** would a top product team (researcher, product lead, architect, senior designer, front-end engineer, QA) be proud to hand this over?
The rubric judges the result, not the method. It never rewards a run for following ShipRight's own format, file names or vocabulary.

## Score each area from 1 to 10

| Score | Meaning |
| --- | --- |
| 1-2 | Missing or harmful |
| 3-4 | Weak: gaps a client would notice at once |
| 5-6 | Competent but generic: a template could have produced it |
| 7-8 | Strong professional work: small fixes only |
| 9 | Expert or agency level: specific, insightful, polished |
| 10 | Best in class: nothing to add, and it teaches the grader something |

| # | Area | Look at | A 9 looks like |
| --- | --- | --- | --- |
| 1 | Research and understanding | Docs, reply | Names the real users and their current alternatives. Finds the constraints that matter (platform rules, law, money, data). Says which facts are verified, which are assumed, with sources when used. |
| 2 | Concept and brainstorming | Docs, reply, page | Explored at least two truly different directions. Chose one sharp, specific idea and said why. The idea gives the product a reason to exist beyond a feature list. |
| 3 | Problem solving and risk | Docs | Finds the hard problems (failure modes, abuse, edge cases, limits, cost) and answers each with a concrete design or technical decision. |
| 4 | Features and scope | Docs, page | The first release keeps the core value and cuts the rest. Every needed screen and system state is accounted for (auth, empty, error, 404, legal, emails, settings) or marked out of scope with a reason. |
| 5 | Architecture | Docs | Stack fits the product and the builder, with reasons. Data model, access rules, integrations, secrets and performance budgets are specific and consistent. |
| 6 | Design system | Docs, page | Real tokens (type scale, spacing scale, color roles with contrast, radius, motion) and components with states, actually used consistently in the build. |
| 7 | Visual design and UI craft | Screenshots 1280 and 390 | Clear hierarchy, confident type, even spacing, distinctive but fitting look, no visual bugs. A design lead would ship it. |
| 8 | UX and accessibility | Page, docs | Core flow is obvious and short. States (empty, loading, error, success) and exits exist. Works at 390. Keyboard, focus, labels and reduced motion are handled. Copy is clear. |
| 9 | Interaction, motion and 3D | Page, scroll frames | Interaction and motion have a job and feel good. Where the brief wants wow, there is a real signature moment. Where calm is right, restraint is chosen on purpose. |
| 10 | Verification and honesty | Reply, docs, page | Claims are tested or marked untested. Nothing invented is shown as real. Next steps are concrete and actionable. |

## Hard caps (apply after scoring)

- Invented facts shown as real (metrics, customers, quotes, logos, prices, legal claims): area 10 max 3, overall max 5.
- Layout breaks at 390 (sideways scroll, overlap, clipped primary action): areas 7 and 8 max 4.
- Console errors that break the main interaction, or a blank page: areas 7, 8 and 9 max 3.
- No page or screen delivered when one was asked for: areas 7, 8, 9 max 2.

## Per run, also record

- One sentence: the single best thing.
- One sentence: the single most important fix.
- Rank of this run among the runs of the same case (1 = best).

## Overall

Overall score = mean of the 10 areas after caps. Per case, the final score for each run is the **median** of three independent graders.
The release score is the mean of all case scores for an arm.

## Win rules for ShipRight 1.3

Owner decision, October 16, 2026:
- Sonnet + ShipRight scores higher than Opus (high effort) alone on **every** case. A gap under 0.5 counts as a tie, not a win.
- Sonnet + ShipRight release score is **9.3 or higher**.
- Altaz reviews the screenshots and agrees.
- Haiku + ShipRight is run and reported for the final release. It is not a win rule.
