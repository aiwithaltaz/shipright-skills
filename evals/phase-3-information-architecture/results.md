# Phase 3 information architecture results

Optional IA is implemented inside product-design through five references: structure/maps, findability, actual capabilities/navigation, optional studies and provenance. The entry stays concise; other routing/template changes are limited to the proposed files. Four skills, existing gates, shared authority and context limits remain. No visual artifacts, new release, merge or Phase 4.

## Baseline and method

Main baseline: `758702ad4b84841dee28b2ea1fc7684c5fa71d05`. Its source-only trial snapshot has 48 files; updated sources have 53. All 221 historical evaluation/report files match the baseline hashes. The initial baseline token check failed because this session lacked the existing pinned dependency; the failure is retained in baseline-initial-check.json. Installing tiktoken==0.12.0 changed no repository dependency. An untouched full archive of main then passed all 68 tests, 70 mutation checks, token/source checks and whitespace; outputs are in baseline-checks.json.

Prompts, protocol and rubric were frozen before responses. Updated guidance was frozen after pretrial checks passed: 96 tests and 94 mutations. Six IA cases with three fresh isolated trials per version (36 replies), plus two controls with one reply per version (four replies). Same raw tasks and wrapper; no prior context, version labels, rubric or answers in trials. All 40 completed with no replacements/retries. Sources, prompt hashes and snapshots matched. Answer text is preserved exactly through JSON decoding; original reply-file hashes and agent-reported reads accompany it.

Fresh graders received only shuffled anonymous texts, raw task and frozen criteria. Sources, mappings and read lists were withheld. First grades and reasons are retained in grades/ and scores.json. Arithmetic and completeness checks passed. One response (t35) itself mentions the Phase 3 source deferral; that text was preserved and can hint at its source/version, limiting blinding for that reply.

## First grading and factual correction

Initial blind scores: baseline 139/144, 17/18 useful passes, one flagged critical error; Phase 3 144/144, 18/18 useful passes, zero critical errors. The I06-C grader called the baseline pack's method guide and Phase 3 deferral invented because they were absent from the raw task. The frozen baseline actually contains that exact guide/deferral, and t35 reports reading it. Parent inspection after unblinding checked the source hash and text and corrected this factual error: criterion 3 from 1 to 2, critical flag removed, total 4 to 8. The original grade was not overwritten. Evidence and limits are in adjudication.json; effective scores are in adjudicated-scores.json. This correction is not an independent blind grade.

## Effective comparison

| Case | Baseline /24 | Phase 3 /24 | Useful passes baseline / Phase 3 | Critical errors |
| --- | --- | --- | --- | --- |
| I01 Objects and relationships | 24 | 24 | 3 / 3 | 0 / 0 |
| I02 Taxonomy and labels | 24 | 24 | 3 / 3 | 0 / 0 |
| I03 Search and filtering | 24 | 24 | 3 / 3 | 0 / 0 |
| I04 Roles, direct links and leaks | 24 | 24 | 3 / 3 | 0 / 0 |
| I05 Sitemap and route map | 24 | 24 | 3 / 3 | 0 / 0 |
| I06 Optional IA research | 23 | 24 | 3 / 3 | 0 / 0 |
| Total | 143 /144 | 144 /144 | 18 / 18 | 0 / 0 |

Both correction and rough-idea controls scored 8/8 per version. The correction stayed exact and did not create architecture; the rough idea stayed in three decision cards before objects/maps. Neither Phase 3 control reported loading IA references.

No scored regression was demonstrated. The sole remaining difference is I06-A's one-point deduction for recommending a sorting-then-testing sequence without a condition for doing only the useful study. That subjective deduction is retained. Five cases already hit the rubric ceiling for both versions; a one-point difference is narrow evidence, not statistical superiority or proof of overall product improvement.

## Loading and checks

Phase 3 trial reads were task-dependent: object/map cases used structure guidance; findability cases used retrieval guidance; role cases used access/navigation guidance; study cases used IA research. No trial reported loading the provenance register. Reads are self-reported, not independent traces or proof every client follows conditions. Some answers remain detailed: Phase 3 search specifications were 814-1,183 whitespace-delimited words. The desired concise, behind-the-scenes behavior is not guaranteed by these scores; length was not a rubric criterion and was not tuned after trials.

Pinned tiktoken 0.12.0 / cl100k_base: product-design entry 1,494 tokens; new references range 542-851 tokens. IA paths: structure/maps 5,320; findability 5,898; study preparation 5,565; provenance 5,629. Product-design largest declared path is 6,172/12,000. Largest pack path is UI at 10,747/12,000, 28 tokens above baseline because of the scoped routing sentence. Shared rules and budget limits are unchanged; no global stored-word cap.

Final checks are in checks.json: all 96 tests (18 Phase 1, 28 context, 22 Phase 2, 28 Phase 3), 94 mutation cases, source/direct-link/orphan checks, required token limits, whitespace and frozen/historical evidence integrity. Tests protect sourcing, optional loading, unknown relationship/route rules, hidden-menu versus authorization, direct-entry/retrieval leaks and honest unperformed studies. Static protections do not prove semantic behavior. The CI workflow runs the same required checks.

## Limits and review state

Synthetic fixtures are not real participants, research, findability validation or a security audit. One inherited model configuration and one grader per case can share biases; exact serving model/version and seed are unexposed. Six cases and two controls cannot demonstrate cross-model reliability or every complex ontology, localization, large corpus, changing permission state or route-migration edge. No actual card sorting/tree testing, recruitment, paid tools, database changes or runtime permission checks occurred. The earlier historical app.js hash mismatch and F03 quoted em dash remain disclosed and unchanged. Earlier Phase 2 limitations remain historical; these trials do not repair or reinterpret them.

Draft review only. No merge or Phase 4.
