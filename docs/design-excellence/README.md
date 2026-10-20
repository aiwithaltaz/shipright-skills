# Design Excellence draft

This change strengthens ShipRight's product and visual work. It cannot guarantee a win on every future build. The owner supplied product scores of 21 versus 19 of 28 and visual scores of 23 versus 27 of 40. The original builds and scoring records were not supplied here, so that result and its cause are not independently reproduced.

## Diagnosis

These are observed attention and enforcement gaps, not proven causes of that A/B result.

| File | Problem | Change |
| --- | --- | --- |
| skills/shipright/SKILL.md | Ten stages and per-stage records have no short planning budget. | Seven idea-to-design steps; one 700-word decision summary for steps 1 to 5, excluding sources and necessary schemas. |
| skills/shipright/stages/01-research.md | Every new project gets 5 to 10 searches, even with a complete brief. | Research only decision-changing unknowns. Preserve fact status and safety questions. |
| skills/shipright/stages/02-brainstorm.md | Three mechanisms and a score deck are required even for a specified screen. | Define the user and job; compare mechanisms only when unsettled. |
| skills/shipright/stages/06-design-system.md | Bans 12px spacing and prescribes two font families. Token compliance has no populated data-screen proof. | Validate role-based type, useful spacing, real columns and required charts against the approved system. |
| skills/shipright/patterns/app-screens.md | A4 forces a context rail, which can reduce table space. | The rail earns space through a distinct decision or collapses. |
| skills/shipright/stages/08-build.md | A copied block cannot change unless an existing test fails. Missing checks protect visible defects. | Screenshot evidence and the visual contract can require changes; retest afterward. |
| skills/shipright/stages/09-test-and-critique.md | Public websites have a concrete craft rubric; apps have broad taste questions and a capped loop. | Add app craft rules, anchored reference review and a non-compensating visual gate. |
| skills/shipright/scripts/deal.mjs | Script/test cards outrank subjective craft; topic coverage is incidental. | App stages reserve priority for the new craft cards while keeping the context cap. |
| skills/shipright/scripts/check-ui.mjs | The reported six defect classes have no direct measurement. | Add measured rules with positive and negative browser cases. |

The opt-in taste profile still owns the owner's explicit preferences. It is not part of the default app profile. No causal claim about fonts or spacing is made from one supplied A/B test.

## The seven steps

| Step | Decision | Template |
| --- | --- | --- |
| 1 | Idea and decision-changing research | [01-idea-research.md](../../skills/shipright/templates/01-idea-research.md) |
| 2 | Primary user, job and constraints | [02-user.md](../../skills/shipright/templates/02-user.md) |
| 3 | PRD, scope, states and risk decisions | [03-prd.md](../../skills/shipright/templates/03-prd.md) |
| 4 | Necessary tech stack and switch conditions | [04-stack.md](../../skills/shipright/templates/04-stack.md) |
| 5 | Architecture, access and display semantics | [05-architecture.md](../../skills/shipright/templates/05-architecture.md) |
| 6 | Flows, IA, visual and data contracts | [06-design-contract.md](../../skills/shipright/templates/06-design-contract.md) |
| 7 | Representative screen and reference critique | [07-design-slice.md](../../skills/shipright/templates/07-design-slice.md) |

Idea and research share one pass so design gets separate visual-contract and representative-screen passes. All original decisions remain covered. Old stage filenames and the five modes remain compatible. Stages 8 to 10 finish the build, test it and assess readiness. Shortening the record does not waive authorization, access, legal, safety or release evidence.

## Design layer and citations

The canonical [Design Excellence layer](../../skills/shipright/modes/ui-ux-design/references/design-excellence.md) contains concrete checks for type, spacing, color, chart selection, column geometry, display semantics, navigation, states and motion. It loads only for app work. The router stays short; the library never loads wholesale.

The supplied research is a secondary synthesis, not a verified copy of every upstream page. [Evidence extracts](../../knowledge/sources/design-excellence.json) preserve the attachment SHA-256, JSON pointers and source URLs. [The 21 cards](../../knowledge/cards/design-excellence.json) use the existing fields plus quote_scope, evidence_pointer and upstream_status. Their source_quote is explicitly the research synthesis. No new upstream verification or authenticated product inspection is claimed. Existing 445 cards are preserved.

Dropped or narrowed claims:

- No font ban, mandatory display serif, universal modular ratio or accent percentage. Research visual_rules 0 to 8 treats these as context-dependent choices.
- No chart solely because a page is called a dashboard. An analytical dashboard must include its required chart, with a real question, labeled dataset and correct encoding (visual_rules 9, 12). A task worklist can prioritize exact records; it cannot be relabeled to evade an analytical requirement.
- No 44px-as-AA claim. Research visual_rules 23 distinguishes the 24px AA criterion and exceptions from larger touch/AAA goals.
- No mandatory GSAP, Lenis or 3D for ordinary apps (visual_rules 24 to 27).
- No scientific beauty score, objective premium detector or promise of universal A/B superiority. The proposed 8/10 gate is local policy (quality_measurement 3, 19 and unverified).
- No claim that a reference product's current authenticated UI has been inspected. Research explicitly marks those observations unverified.

## Automated checks and their limits

[design-metrics.mjs](../../skills/shipright/scripts/design-metrics.mjs) is imported by the existing checker and runs inside Chromium. `--profile app` enables app type review; other geometry/data rules also run on the standard profile.

| ID | Result | What is measured |
| --- | --- | --- |
| mid-word-break | Fail | A Latin word occupies multiple rendered lines within an ordinary table cell. Intentional code/identifier wrapping is excluded. |
| squeezed-columns | Fail | A cell violates data-min-width, clips without ellipsis, or wraps a declared atomic value. |
| raw-data-value | Fail | Visible raw serialization tokens, with scoped exclusions for code, valid None choices and documented intentional text. |
| dashboard-chart | Fail | A declared dashboard lacks a visible chart candidate with media geometry. A marker alone cannot pass. |
| nav-scroll-hint | Fail | Navigation clips destinations without a scroller and visible linked hint or named scroll control. |
| weak-type-scale | Warn | App title size and weight differ little from median body text. This heuristic needs visual judgment. |

Set data-ui="app", data-screen="dashboard", data-chart, cell data-min-width/data-atomic and linked data-scroll-hint/aria-describedby as documented in stage 8. Review these contracts against the brief so missing annotations do not silently excuse a requirement.

The checker cannot prove chart values, task relevance, control functionality, complete accessibility, reference fidelity or design quality. Canvas/SVG presence is only a candidate. A visible hint is not proof that its control works. Follow the functional and visual review steps.

## Visual critique

Before finishing, compare the populated screen against two or three captured references from the research. For this CRM family, Attio, Linear and Stripe are candidates. Use actual relevant app captures at matched task, state and width; a homepage is not a substitute. Unavailable captures stay Not verified.

Score type/hierarchy, composition/spacing, color/chrome, data presentation, and responsive/states at 0/1/2 each. Attach region-specific evidence. Fix, recapture and rescore to at least 8/10 with no blocker. Missing required charts, unreadable values and unreachable primary actions block regardless of average. The builder performs self-critique; independent taste remains Not verified without an independent reviewer. No score may be invented to end a loop.

## Reviewable changes

The working-tree diff is the authoritative file-by-file implementation. New files are complete source files. [changes.diff](changes.diff) contains the complete patch, excluding generated binary images and archives; those are listed in the validation report.

- Router/stages/templates: seven steps, planning budget, visual contract and critique.
- Canonical reference plus mode/context-policy links: on-demand craft; frozen limits unchanged.
- Browser metrics/checker and token checker: new defect signals; 12px and documented optical exceptions.
- Research evidence, cards, validator, curator and dealer: honest provenance and reliable app craft loading.
- tests/design-excellence.mjs and tests/test_design_excellence.py: real geometry, false positives, spacing and card/dealer regressions.
- tests/fixtures/design-excellence and examples/before-after/design-excellence: authored, labeled CRM illustration; no independent model-output claim.
- SOURCES.md, CHANGELOG.md, README.md, knowledge/README.md and architecture.md: provenance, ownership and navigation.
- dist exports are regenerated by the existing release script for local consistency. Nothing is tagged, pushed or published.

## Validation evidence

See [the validation report](../../tests/reports/2026-10-20-design-excellence-after.md), [authored captures](../../examples/before-after/design-excellence/README.md), and the checker summaries in evidence/. These distinguish mechanical checks from independent visual judgments.

## A/B retest plan

This is a proposed experiment, not a performed trial. Use the exact fixed prompt in evals/v2/benchmarks/crm-dashboard.md. Preserve that historical one-try benchmark; this protocol adds repeated independent runs rather than rewriting it.

1. Freeze no-skill, original HEAD and revised HEAD arms. Use the same model/version, brief, assets, tools, runtime and total token/time budget. At least three independent seeds per arm is a pilot, not statistical proof. Keep failures and exact outputs.
2. Give each fresh builder only its assigned pack, the raw task and necessary artifacts. Do not supply the rubric, expected fixes or another arm's outputs. Do not buy model calls or publish without authorization.
3. Capture the same overview, pipeline and record states at 1280 and 390, plus stress/empty/error states. Blind arm labels and randomize screen order; allow ties. Keep task execution evidence separate from screenshots.
4. Score product and visual craft separately. Preserve the supplied 28/40 rubric if its original criteria become available; otherwise preregister the new rubric and never equate its scale with the old totals. Use the five visual categories here plus task completion, errors and assistance. Calibrate independent human reviewers with examples; a model self-score is not ground truth.
5. Preregister blockers: absent required chart, broken table words/values, raw serialization and unreachable navigation/actions. No product score compensates for them. Report per-task paired scores, win/tie/loss, failures, disagreement and uncertainty, not only averages or cherry-picked screens.
6. Repeat on held-out data-heavy briefs from the repo. Ablate the shorter workflow, craft cards and checker separately when budget permits. This tests causes instead of assuming one mechanism explains the improvement.
7. Accept only evidence that both product and visual outcomes improve without new blockers. If the pilot ties or loses, inspect captures, revise the hypothesis and run a new frozen trial. Never claim every future build will win.

Method basis: research quality_measurement 0, 2, 3, 6, 13, 16, 18, 19. Source URLs are retained in the evidence extracts. Scope limits come from research unverified.
