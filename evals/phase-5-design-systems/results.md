# Phase 5 design systems: results

Date: 2026-10-12. Frozen baseline: `cb814609198d909a74b767b7ff7448dcd45a1e39`.
This update adds conditional system selection, ten foundations, lightweight governance and source/comparison guidance inside ui-ux-design. It preserves the four skills, approved identity, source/evidence rules, existing values, accessibility, motion and icon safeguards. No new token architecture, component contracts, external component installation or Phase 6 work.

## Frozen comparison

[Protocol](protocol.md), [raw synthetic tasks/artifacts](inputs.json) and [rubric](rubric.md) were frozen before edits/replies. Six cases, three isolated replies per case/version; two one-reply controls per version; one actual HTML-generation task per version. **42 exact outputs** are retained in [outputs.jsonl](outputs.jsonl), with [hashes](output-manifest.json), [source manifests](source-manifest.json) and [self-reported reads](read-coverage.json). Every trial pack matches its frozen source hashes. No guidance or rubric tuning occurred after generation; no outputs, grades or criteria were replaced.

Eight fresh agent graders saw anonymous replies, raw tasks and the frozen criteria, not packs/versions/read lists. Original per-case scores and reasons remain in blind-scores-D01.json through blind-scores-D06.json and blind-scores-C01/C02.json. The root checked completeness/arithmetic before unblinding. [Scores](scores.json), [mapping](blind-mapping.json) and [summary](summary.json) retain all results. No adjudication or score corrections occurred.

| Case | Baseline /24 | Phase 5 /24 | Delta |
| --- | ---: | ---: | ---: |
| D01 Existing undocumented system | 24 | 24 | 0 |
| D02 Conflicting sources and current authority | 24 | 24 | 0 |
| D03 Authorized new foundations | 23 | 24 | +1 |
| D04 Reference adaptation and approved icon exceptions | 24 | 24 | 0 |
| D05 Bounded accessibility correction/isolated issue | 24 | 24 | 0 |
| D06 Lightweight system maintenance | 19 | 22 | +3 |
| **Total** | **138 /144** | **142 /144** | **+4** |

Both controls tied at 4/4 per version, 8/8 total per version. No scored case regression or critical error was identified. These results support a small targeted improvement, not broad superiority. A baseline new-system reply omitted an imagery/no-use decision. Governance improved explicit unresolved ownership and records. Two updated governance replies still failed to state the unavailable source/system version explicitly; that limitation remains. Four cases were already at the rubric ceiling and tied.

## Actual generated visual comparison

The independent baseline/updated agents generated complete HTML from the same approved two-screen Cedar Desk task. The original files are retained unchanged in [baseline HTML](../../tests/fixtures/phase-5-design-systems/ui-ux-design/before.html) and [Phase 5 HTML](../../tests/fixtures/phase-5-design-systems/ui-ux-design/after.html). Their hashes match the raw trial outputs. No authored bad baseline, invented metrics or post-generation restyling was used.

[Projects comparison](../../examples/before-after/phase-5-design-systems/ui-ux-design/compare.png) and [detail comparison](../../examples/before-after/phase-5-design-systems/ui-ux-design/compare-detail.png) show the actual phone renderings. Separate Projects/detail screenshots at desktop 1280x900 and phone 390x844 are retained beside them. The primary agent opened all eight screen PNGs and both comparison PNGs.

Chromium 134.0.6998.35 / Playwright 1.51.0, device scale factor 1, rendered both unchanged files. CSS requests Arial; the environment resolves heading glyphs to DejaVu Sans in both variants. Both versions pass the exercised list/detail/return navigation, actual Tab/Enter activation, visible link focus, no horizontal overflow and no page errors at both widths. See [visual checks](visual-checks.json), [capture script](capture_visuals.py) and [file hashes](visual-manifest.json).

Observed composition differences are small: Phase 5 places the sample label beside the brand, uses a shorter header and larger regular-weight project links; baseline uses a stacked header and bold links. The updated detail screenshot shows a visible outline on the programmatically focused heading. Neither preview establishes superior visual design. These simple synthetic screens do not exercise all foundation choices, assistive technologies, difficult content, real device inputs or full accessibility. They are not client installation or real app usability evidence.

The original failed capture and initial successful measurement are preserved separately in [capture attempts](visual-capture-attempts.json) and [initial checks](visual-checks-initial.json). The capture tooling was corrected to enable CSS inspection and use actual keyboard modality; generated outputs were not altered. [Operational history](operational-limits.md) also discloses browser-provisioning and direct Git credential limits.

## Required checks and preservation

Frozen [baseline checks](baseline-checks.json): all **128** tests, **122** mutation checks, token and whitespace checks passed. Updated [pretrial checks](phase5-pretrial-checks.json): all **158** tests (128 existing + 30 new), **146** mutation checks (122 existing + 24 new), source/link/orphan/loading, token and whitespace checks passed. Final evidence-assembly checks are recorded separately in final-checks.json.

The largest UI loading path is **11,240 /12,000** tokens, up from **10,747**; limits and pinned counting method are unchanged. Selection, foundation, governance and provenance have separate conditional paths. See [token metrics](token-metrics.json). Source routing is structural evidence, not a guarantee that every client honors it. Both controls' self-reported reads contain no new foundation/governance/source references; the exact label control also avoided selection guidance.

All **333** prior evaluation/example/report records in the new manifest remain byte-identical. The other three skill entries, all shared rules, personal taste and marked F1-F3 exports remain unchanged. Dependencies and CI commands are unchanged. Existing historical app.js hash mismatch and F03 quoted-em-dash limitations are preserved, not repaired or revalidated here.

## Limits and next state

All inputs are synthetic. The same serving configuration is inherited without overrides; model/seed are unavailable. Agent grading is not independent human review; anonymous text can still reveal instruction style. Three replies per task and one per control/visual task are too few for reliability or statistical superiority claims. Several prompts expose preservation constraints, and ceiling scores limit sensitivity. Self-reported read lists are not independent traces.

Sources are original summaries of readable or indexed official guidance. Material required JavaScript for direct extraction; some older Carbon paths failed. Component Gallery is included as a reference/comparison index, not proof or an installable library. No paid materials or registry code were copied.

Some replies remain too long for the user's preferred concise experience. Updated design-case responses range from 109 to 2,066 whitespace-delimited words, with median 361; baseline ranges from 158 to 2,511, median 354.5. The outcome rubric has no response-length target, and no response-length tuning was performed after trials.

This phase improves system planning instructions, not complete visual intelligence. Source checks and a higher narrow rubric score do not establish real usability, full accessibility, governance adoption, service reliability, compliance or production readiness. The two unresolved version-gap omissions and all ties remain recorded. Draft PR only; **do not merge or begin Phase 6** without further authorization.
