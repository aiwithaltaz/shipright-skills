# Phase 2 research synthesis results

Implemented optional synthesis inside product-design; the four skills, shared safeguards and context limits remain. No visual artifacts or Phase 3 work were created. These are synthetic instruction evaluations, not actual user research or validation.

## Baseline and method

Main baseline: `9bdcb74d6cc4e0efb774f4542ee6b2903336105a`. Before editing, existing checks passed: 52 source mutations, context checks and 46 unit tests. The initial implementation passed 67 mutations and 65 tests before trials. Frozen prompts/protocol/rubric and source hashes precede all responses. Five cases, three fresh isolated runs per case per version; one separate small-correction control per version. All 32 runs completed, with no replacements or retries.

Fresh graders received shuffled anonymous reply texts, the raw prompt and frozen rubric only. Sources, version labels, parent history and read lists were withheld. Their first grades are retained in `grades/`; `blind-mapping.json` permits inspection after unblinding. Arithmetic and completeness checks passed. No adjudication or guidance tuning followed the results. The parent inspected S04-E and both control responses to check the reported omission/control result after unblinding.

## Comparison

| Case | Baseline /24 | Phase 2 /24 | Useful passes baseline / Phase 2 | Critical errors |
| --- | --- | --- | --- | --- |
| S01 Mixed and duplicated records | 24 | 24 | 3 / 3 | 0 / 0 |
| S02 Contradictions and serious isolated issue | 24 | 24 | 3 / 3 | 0 / 0 |
| S03 Feature requests versus needs | 24 | 24 | 3 / 3 | 0 / 0 |
| S04 Biased and outdated evidence | 21 | 21 | 3 / 3 | 0 / 0 |
| S05 Sparse or missing evidence | 24 | 24 | 3 / 3 | 0 / 0 |
| Total | 117 /120 | 117 /120 | 15 / 15 | 0 / 0 |

The separate correction control scored 8/8 for each version. Both replies made only the exact wording correction, with no invented checks or scope expansion. Their self-reported read lists contain no synthesis reference.

There was no scored regression and no measured score improvement. Every S04 response lost one point for omitting missing accessibility coverage. Success on S02 does not remove that gap. Phase 2 S03 replies remained 613-700 words: shorter than the baseline's 862-878, but still lengthy for the desired concise user summary. Across synthesis cases, mean whitespace-delimited response length was 395.9 words for baseline and 342.3 for Phase 2; this is descriptive, not a predefined quality criterion.

## Loading and integrity

All trial source snapshots and current guidance matched the frozen SHA-256 manifest. All 155 historical evidence files matched their pre-change hashes. Original Phase 1 evaluation artifacts, dates and records were not rewritten. Only the obsolete synthesis-deferral assertion was changed in its unit test; its prohibition on unsupported personas/findings remains.

All 15 Phase 2 synthesis trials reported reading research-synthesis and research-to-decisions. Two also reported reading the provenance reference without a source question; this is broader loading than its preferred condition. Reference loading is model-controlled, and these read lists are self-reports, not independent runtime traces. The correction control supports optional loading only for that narrow request.

Pinned tiktoken 0.12.0 / cl100k_base: product-design SKILL.md 1,268 tokens; new references 753, 579 and 379. Declared synthesis path, conservatively including provenance, 5,864/12,000 tokens. Largest pack path remains 10,719/12,000. All per-file/shared limits pass; no global word cap was introduced. Static paths do not prove every client's actual loading behavior.

## Checks and limits

Final command outputs are in `checks.json`: source/link/orphan safeguards with 67 mutation cases, context/token limits, all 65 unit tests (18 Phase 1, 28 context, 19 Phase 2), whitespace, and historical/current source hashes. The CI workflow invokes the same checks. No visual tests were needed for this architecture change.

These repeated trials use one inherited model configuration; exact serving model/version and seed were not exposed. Five synthetic cases and one control cannot establish real usability, cross-model reliability, statistical superiority or production readiness. One model grader per case may share systematic preferences. This evaluation does not separately stress-test very large record batches, private data, adversarial record instructions or every output template; static protections are not behavioral proof. Existing historical app.js hash mismatch and F03 quoted em dash remain disclosed in prior evidence; this change does not repair or reinterpret them.

Draft review only. No merge or Phase 3.
