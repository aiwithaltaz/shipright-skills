# ShipRight 0.6 release report

October 4, 2026. All 110 supplied files and all seven feedback images were reviewed before edits. The release retains the `shipright-skills/` top folder, four skill names and every original path. No renames. The 0.6 changelog and detailed audit/evaluation records are included.

My assessment improves from **6.4/10 to 8.9/10**. These are expert scores, not measured reliability rates. I would not call it 10/10 without repeated testing in the intended tools and with different models.

| Area | Before | After | Why |
| --- | ---: | ---: | --- |
| Clarity for the AI | 6.5 | 9 | Short entry files, one shared contract and smaller task routes. |
| Stops invented UI and features | 6.5 | 9 | Every visible element needs current-phase authority; exact feedback has acceptance checks. |
| Layout and hierarchy | 6.5 | 8.5 | Explicit reading order, sizing, wrapping, responsive priorities and sticky-content rules. |
| Icons and component placement | 7 | 9 | Contextual placement; selection, focus and notifications are separate. |
| Flow rules | 7 | 9 | Safe exits, consistent patterns and useful operator status. |
| States | 7.5 | 9 | Human pending work differs from background activity; clear/reset effects are explicit. |
| Accessibility | 6 | 8.5 | Measurable criteria and semantic/focus requirements; runtime proof still required. |
| Design system use | 7.5 | 9 | Preserve/Establish retained; observed, proposed and approved values are distinct. |
| Existing apps | 6.5 | 9 | Bounded corrections proceed directly and preserve unrelated behavior. |
| Length and token cost | 4 | 9 | 56% fewer words across skill guidance; references load when relevant. |
| Agreement between files | 5.5 | 9 | Shared statuses, corrected export paths, checked flow copies and disclosed historical limits. |

The ten biggest original weaknesses are below. Line numbers refer to the untouched uploaded v0.5.1, not the shortened release. The full explanation and additional locations are in `evals/v0.6/before-audit.md`.

| # | Original file:line | Weakness corrected |
| --- | --- | --- |
| 1 | `skills/_shared/operating-contract.md:25` | General scope rules did not require a current-phase source for each UI element. |
| 2 | `skills/ux-critique/references/requirements-and-feedback.md:26` | Feedback lacked a literal change record and clear saved effects. |
| 3 | `skills/_shared/flow-rules.md:32` | Broad status requirements encouraged routine system plumbing in operator UI. |
| 4 | `skills/_shared/flow-rules.md:20` | Legal/payment exception could trap users and confuse leaving with cancellation. |
| 5 | `skills/product-design/SKILL.md:88` | Premise and approach ceremonies could exceed the question cap and stall work. |
| 6 | `skills/ui-ux-design/references/layout-and-hierarchy.md:56` | Responsive guidance lacked task priority and concrete sizing/overflow decisions. |
| 7 | `skills/ui-ux-design/references/icons-and-placement.md:60` | Universal status and placement rules created clutter and ignored context. |
| 8 | `skills/ui-ux-design/references/build-handoff.md:86` | Unconditional URL state could expose private searches; accessibility rules were vague. |
| 9 | `skills/_shared/operating-contract.md:70` | Repeated progress, rephrasing and counting instructions inflated routine tasks. |
| 10 | `skills/ship-check/references/launch-items.md:47` | Status vocabulary disagreed; related export paths and historical evidence claims also needed correction. |

The most important changes:

- **Literal feedback and phase control.** All requested registration corrections appear in an exact acceptance table: filter removal; View all in progress and clear semantics; full row border; no query chip, sync plumbing, duplicate profile, check-in counters/tabs, device panel or selected-nav dot. Later-phase ideas stay in notes, with no placeholder UI.
- **Short intake.** Usually three useful questions for an unclear idea, at most five total before starting across skills, and zero for a clear task. Examples, You decide and Let me decide preserve decision ownership. No invented brand values, facts, data or features.
- **Usable craft rules.** Layout, component placement, exits, status, states, accessibility and private inputs now have concrete checks. Specification readiness is separate from runtime verification.
- **Consistent handoff.** Project paths, design-system exports, review statuses, conditional references and the source checker agree. Existing app corrections reuse authorization already given.

Removed repeated progress/rephrase blocks, mandatory three-approach questionnaires, numeric design dials, universal style quotas, broad audits before small fixes and approval stops between already-requested documents. Removed fixed template roles and unconditional private-search URLs. No original file was deleted. Useful product framing, operational flows, state handling, motion, copy, research and review rules remain; `evals/v0.6/rule-map.md` records their owners.

Skill guidance fell from **33,195 to 14,753 words**, a **55.6% reduction**. The four entry files fell from **10,066 to 3,294 words**, a **67.3% reduction**. Actual token savings depend on the client tokenizer and loaded references; these are measured word counts, not token measurements.

Validation and limits:

- `evals/check_sources.py` passes. All **18 mutation self-tests** reject the intended defects. Original paths and historical prototype/evidence bytes are retained. The ZIP integrity check and a checker run from a fresh extraction pass.
- Four controlled scenarios were exercised with fresh agents of the same model family. Registration needed one clarification and fresh rerun to separate specification and runtime scoring. Intake, bounded existing-app edits and screenshot-only launch reasoning met their task criteria. This is limited regression evidence, not a cross-model benchmark.
- One raw launch response quoted an em dash from its screenshot title. That style miss remains in the verbatim evaluation record and is disclosed by the checker. New guidance and reports contain no em dashes.
- The historical IVC prototype has one source-manifest hash mismatch, authored sample waiver wording and a static storage-recovery defect. The old code/evidence is preserved and clearly marked unsuitable as current approved guidance. Three training candidates no longer claim missing policy was approved; human review remains required.
- “Clear in progress” still needs the app owner's decision about the object and saved effect. The skill now asks instead of inventing deletion. The top-right duplicate profile was not visible in the full screenshot; its removal is taught from your explicit instruction.
- Native installation/ingestion in Claude Code, Cursor, Codex and Claude Design, different models, real user testing and application runtime/accessibility behavior remain unverified. The revised registration screen was specified in a trial, not built as an app.

Start by unpacking the ZIP, keeping the whole folder together, and asking your tool to read the relevant `SKILL.md` with its required references. The README includes the entry paths and a starter prompt.
