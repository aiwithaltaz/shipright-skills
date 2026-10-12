# Phase 4 journeys and service blueprints results

Phase 4 adds optional mapping inside product-design, preserving four skills, shared safeguards and existing gate IDs. Select one useful representation; distinguish experience, user actions, navigation, known system work and service delivery. Current evidence and future proposals remain separate. Unknown emotions, channels, staff processes and dependencies stay Unknown; isolated accessibility/safety and interruption/return/recovery issues remain visible. No visual artifacts or Phase 5 work.

## Frozen comparison

Main baseline: `d2df95b39574a737783187eda1d023429c735a88`. [Inputs](inputs.json), [rubric](rubric.md) and [protocol](protocol.md) were frozen before implementation/trials. Fifty-three baseline and fifty-eight updated skills/templates/taste files were snapshotted and hash-checked before and after trials. Forty fresh replies: six cases with three per version, plus two controls with one per version. No operational replacements, guidance tuning or rubric changes after replies.

Fresh graders saw shuffled anonymous texts and criteria without packs, versions or read lists. Parent collected grades only after all eight groups completed, checked arithmetic/completeness and then unblinded. [Original grades](grades/M01.json), [all scores](scores.json), [exact replies](outputs.jsonl), [blind mapping](blind-mapping.json) and [output hashes](output-manifest.json) are retained. No Phase 4 score adjudication.

| Case | Frozen main scores | Phase 4 scores | Main / Phase 4 useful passes |
| --- | --- | --- | --- |
| M01 | 7, 8, 5 | 8, 8, 8 | 2 / 3 |
| M02 | 8, 8, 8 | 8, 8, 8 | 3 / 3 |
| M03 | 8, 8, 8 | 8, 8, 8 | 3 / 3 |
| M04 | 8, 8, 8 | 8, 8, 8 | 3 / 3 |
| M05 | 8, 8, 8 | 8, 8, 8 | 3 / 3 |
| M06 | 8, 8, 8 | 8, 8, 8 | 3 / 3 |
| C01 | 8 | 8 | 1 / 1 |
| C02 | 8 | 8 | 1 / 1 |

Mapping totals: frozen main **140/144**, Phase 4 **144/144**. Useful passes: **17/18** and **18/18**. Critical-error replies across all cases: **0**. Cases with lower Phase 4 aggregate scores: **none**. The score difference is specific to these cases; it is not statistical or cross-model evidence.

The four-point difference is confined to M01: two baseline replies lacked explicit file-delivery Unknowns, and one omitted a scoped next decision. The other five mapping cases tie at their maximum; both controls score 8/8 per version. Self-reported read lists show no new mapping-reference reads for either control, and mapping-source provenance loaded in 2/18 Phase 4 mapping replies. These are narrow observations, not general loading guarantees.

## Required checks and preservation

[Baseline checks](baseline-checks.json): all 96 existing tests, 94 mutation checks, token budgets and whitespace passed. [Updated pretrial checks](phase4-pretrial-checks.json): all 128 tests (96 existing plus 32 new), 122 mutations (94 existing plus 28 new), context/link/orphan checks and whitespace passed. Final repeat checks after evidence assembly are recorded separately in [final checks](final-checks.json).

Entry: **1729 tokens / 4,500**. New references: **526-813 tokens / 4,000** each. Largest product-design normal path: **7,426 / 12,000**; pack maximum remains ui-ux-design **10,747 / 12,000**. Shared files and all numerical budget limits remain unchanged; no global word cap. See [token metrics](token-metrics.json).

All **245** prior evidence records remain byte-identical under [manifest](source-manifest.json). Phase 1/2 evidence, Phase 3 original grades, adjudication and limitations remain untouched. Canonical F1-F3 exports, other three skills, personal taste, dependencies and CI commands are unchanged. Existing historical app.js hash mismatch and F03 quoted-em-dash disclosures remain; this phase does not repair or revalidate those artifacts.

## Limits

Synthetic supplied records are fictional, not user research. The prompts explicitly challenge unsupported claims; maximum scores can reflect a ceiling and strong existing safeguards. Same serving configuration was inherited without overrides; model/seed are unavailable, and fresh agent graders are not independent human evaluators. Three replies per mapping case and one per control are too few for reliability or superiority claims.

[Read coverage](read-coverage.json) is self-reported, not an independent loading trace. Declared token paths use the pinned reference tokenizer; they do not guarantee every client loads only relevant content. Phase 4 mapping replies range from 252 to 559 whitespace-delimited words; the outcome rubric does not enforce a response length target. No response-length or provenance-loading optimization was attempted.

These checks do not establish real journeys, backstage processes, emotions, accessibility, safety, payment outcomes, service reliability, native client installation or runtime behavior. Source presence/mutation checks protect selected text contracts, not all semantic failure modes. No product studies, live service actions, workshops, visual artifacts, merge or Phase 5 occurred.
