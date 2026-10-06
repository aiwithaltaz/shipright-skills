# ShipRight 0.6 validation

October 4, 2026. This release was edited and scored by the primary agent. Separate fresh agents executed the behavior trials using the same model family. These are controlled regressions, not independent certification or a cross-model benchmark.

## Method

All 110 supplied files were read before editing, including code, vendor code, JSON records and rendered images. See [read coverage](read-coverage.json) and the [frozen before audit](before-audit.md). All seven supplied feedback images were inspected and are retained under screenshots/.

Trial agents received a skill-only copy of the pack, a raw task and fixtures. They did not receive expected responses or scoring results. They could load the relevant skill references. F01 directly exercises the worked registration example now taught by the pack, so it is a regression check, not unseen generalization. F04 transfers the rules to a different, small invoice fixture.

There was one initial run per case. F01 had one fresh rerun after a stage-scoring clarification in the shared contract and UI skill. The other three responses were not regenerated. [Inputs](inputs.json), raw responses, [source snapshot hashes](trial-source-manifests.json) and the [exact clarification](stage-scoring-change.patch) are retained. Paths inside raw responses record the temporary test workspace; the portable fixtures are listed in inputs.json.

## Behavior results

The primary agent compared outputs with the supplied task, inspected the changed HTML, and scored scope, exact feedback, decision ownership, evidence honesty, proportional response and style.

| Case | Result | Evidence |
| --- | --- | --- |
| F01: registration corrections, first run | Partial | All requested removals/additions and clear-action ambiguity handled. The gate mixed specification completeness with runtime proof, marking defined criteria Not verified and leaving a required clear-effect decision outside a Fail. [Raw output](F01-response.json). |
| F01: fresh rerun | Pass for the specification task | Exact feedback is covered, the unseen duplicate profile is not falsely reported as visible, and no brand tokens or destructive clear behavior are invented. Missing clear semantics now produce a specification Fail and Needs decision verdict; future runtime checks remain separate. [Raw output](F01-rerun-response.json). |
| F02: vague community app | Pass for intake | Three questions with examples and explicit delegation/reservation. No invented features, brand values or data. [Raw output](F02-response.json). |
| F03: deadline and screenshot-only launch | Pass for readiness reasoning; style miss | Rejects unsupported readiness, checks all 20 items, adds missing product-critical evidence, and does not invent policy or analytics. F03 retained an em dash quoted from the screenshot title. [Raw output](F03-response.json). |
| F04: existing invoice UI | Pass for bounded source edit | Removes only the requested filter/label, sync message, selected-nav dot and its unused CSS. Preserves all other HTML/CSS apart from a trailing newline. No payments, reminders or rebrand. [Before](existing-before.html), [after](existing-after.html), [response](F04-response.json). |

Raw responses are verbatim, including misses. JSON escapes preserve their characters, not style compliance. The F03 quote remains a recorded failure of the no-em-dash writing rule; active guidance and newly authored reports contain none. No claim of universal style compliance is made.

## Source and packaging checks

- Original source checker: Pass on v0.5.1. That did not catch the semantic gaps in the audit.
- Updated checker: restricted metadata, unchanged skill names and 8/10/10/20 gate IDs, local links, versions, selected rule contracts, template paths, synchronized F1-F3 exports, JSON, word budgets and fixture availability.
- Eighteen mutation self-tests must fail validation. They cover names, IDs, links, missing files, style, phase scope, question count, feedback, export drift, paths, tokens, versions, accessibility, private input, archival bytes, evidence notices, stage scoring and a missing trial fixture.
- All 110 original paths remain. Historical prototype and evidence bytes are unchanged. No source filename, skill name or original folder was renamed.
- Archive integrity and a fresh unpacked checker run are recorded in the release report. Source checks do not establish model behavior.

See [source-checks.txt](source-checks.txt) for the final checker output and [rule-map.md](rule-map.md) for what was retained, strengthened or removed.

## Known limits

The archived IVC app.js hash does not match its historical manifest. Five other entries match. Old runtime logs cannot verify the packaged app.js. The historical sample also contains authored waiver text and a static storage-recovery defect; notices identify these as defects, not approved patterns. No old manifest or test log was rewritten into a new Pass.

F01 still needs the product owner to define the saved effect of clear before that app control can be built. A duplicate top-right profile is not visible in the supplied full screen. The explicit removal instruction still applies wherever the duplicate exists.

No revised registration interface was built or visually tested. No new application runtime, assistive-technology, permission, persistence or production checks were run. Native installation and ingestion in Claude Code, Cursor, Codex and Claude Design were not exercised. Multiple model families, repeated stochastic runs, user testing and comparison against a no-skill control remain unverified. Archived change-set-4 experiments are still unrun.
