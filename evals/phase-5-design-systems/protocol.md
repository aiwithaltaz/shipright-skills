# Phase 5 design-system evaluation protocol

Frozen before skill edits and trial replies on 2026-10-12. Baseline is cb814609198d909a74b767b7ff7448dcd45a1e39. Six cases, three independent replies per case/version (36). Two controls, one per version (4). One separate two-screen HTML task per version (2). Same tasks/artifacts and wrapper, no model overrides; serving model/seed unavailable.

Fresh agents receive only an opaque isolated pack path, raw task and artifact. Do not disclose variant, rubric, expected answers or parent history. No browsing, paid tools, live systems, sibling-directory reads, source edits or delegation within trials. Save exact response.md and self-reported reads; HTML task also writes app.html. Read lists are not independent traces. Isolated packs contain skills, docs and opt-in taste only; do not read unrelated workspace artifacts.

Freeze updated skill/docs sources before updated trials. Do not tune skills or rubric after seeing replies. Preserve all operational failures, first responses and scores. After output hashing, shuffle anonymous replies per case for fresh graders that see only raw task/artifact, rubric and anonymous outputs. Graders receive no packs, version labels, read lists or mapping. Keep any factual adjudication separate. Root checks completeness/arithmetic and unblinds after grading. These are agent evaluations, not human-independent or cross-model evidence.

Render the actual baseline and updated generated HTML at 1280x900 and 390x844. Record source/output hashes, renderer/font/viewport, visible screens, navigation/focus/overflow observations. Do not restyle or fabricate either side. Runtime checks cover these previews only; screenshots alone do not prove all states or accessibility. HTML source quality and screenshot observations are reported separately from task scores.

Run baseline/new source+mutation, token, unittest and whitespace checks. Preserve historical records, grading corrections, personal taste, F1-F3 exports and other skill entries. Report ties, regressions, limitations and actual loading failures. No merge or Phase 6/7 implementation.
