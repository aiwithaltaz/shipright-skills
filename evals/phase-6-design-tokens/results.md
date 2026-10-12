# Phase 6 design tokens: results

Date: 2026-10-12. Baseline main: `8233744e1111ab8afed021f201362ffcd45d2e35`, the Phase 5.1 merge. The earlier Phase 5 commit was not used. This is instruction-pack work, not a new release, automatic token compiler or client installation.

## What changed

Four concise, directly linked conditional references cover primitive/semantic records, component tokens only for a supported reuse need, actual theme/mode mappings, native/typed interchange and code mapping, and original source credits. They preserve Phase 5.1's required small design system before screens: existing app extraction remains Observed and reused; new-app tokens remain Proposed until the user says OK. Numbers are not invented to complete a handoff. Existing names/formats, accessibility, identity, icons, motion, shared authority and all four skills remain.

No forced dark/density/brand mode or tooling. No replacement project system, component contracts, installed personal skill changes, releases, merge or Phase 7. The [IVC worked example](../../examples/ivc-2026-registration/token-worked-example.md) retains the scale as pending from Altaz, with no numeric proposal or illustration-to-token promotion.

## Frozen comparisons

[Protocol](protocol.md), [inputs](inputs.json), [rubric](rubric.md) and original artifact hashes were frozen before edits/trials. One fresh reply per task/version: six design cases, two controls and one HTML task. All **18 exact outputs** remain in [outputs.jsonl](outputs.jsonl), with [output hashes](output-manifest.json), [pack hashes](source-manifest.json) and [self-reported reads](read-coverage.json). Every baseline pack matches the actual Phase 5.1 git archive; every updated pack matches the frozen updated guidance. Response bodies were not inspected by the primary agent until updated guidance was frozen. No response-informed guidance/rubric tuning or output repair occurred.

Two fresh graders read anonymous task/reply pairs and fixed criteria without packs, read lists, version mapping or intended answers. Their original [grader 1](blind-scores-g1.json) and [grader 2](blind-scores-g2.json) scores/reasons remain unchanged. The primary agent checked IDs, ranges and arithmetic, then used arithmetic means. Both graders agreed on every criterion; no adjudication or score corrections. [Scores and summary](scores.json) and [blind mapping](blind-mapping.json) are retained.

| Case | Baseline /8 | Phase 6 /8 | Delta |
| --- | ---: | ---: | ---: |
| T01 Existing undocumented tokens | 8 | 8 | 0 |
| T02 New-system proposal before screens | 8 | 8 | 0 |
| T03 Approved theme/density mappings | 8 | 8 | 0 |
| T04 Broken aliases, types and mapping limits | 8 | 8 | 0 |
| T05 Hardcoded gaps and approved optical exception | 8 | 8 | 0 |
| T06 IVC scale pending | 8 | 8 | 0 |
| **Total** | **48 /48** | **48 /48** | **0** |

Controls also tied at 8/8 per version. No scored regression or critical error was reported. **No behavioral improvement was demonstrated.** Ceiling scores and explicit task constraints limit sensitivity. The phase formalizes reusable token guidance; this narrow comparison does not prove it improves results beyond Phase 5.1 or general model knowledge.

There is a concision limitation: design-case replies ranged from 275 to 724 words for baseline (median 318.5), and 207 to 724 for Phase 6 (median 455). Updated median reply length increased on this small set. The outcome rubric did not score length, so do not describe the result as regression-free without this qualification. No post-trial length tuning occurred.

## Required actual screenshots

Independent agents generated complete [baseline HTML](../../tests/fixtures/phase-6-design-tokens/before.html) and [Phase 6 HTML](../../tests/fixtures/phase-6-design-tokens/after.html) from the same Phase 5.1 IVC after-search illustration and provenance. These exact bytes match the raw outputs; no authored bad baseline or restyling was introduced.

[Desktop comparison](../../examples/before-after/phase-6-design-tokens/compare.png) and [phone comparison](../../examples/before-after/phase-6-design-tokens/compare-phone.png) are styled Chromium screenshots, not text cards. Separate four screenshots are retained beside them. The primary agent inspected all four and both comparisons. Chromium 134.0.6998.35 / Playwright 1.51.0, scale factor 1, captured desktop 1120x780 and phone 390x844 with full-page scrolling content. Identical requested viewport settings were used for both versions; full-page heights can differ.

Both retained the sample warning, all three labeled fields and result cards. Exercised Tab focus, visible focus and no horizontal overflow checks passed at both widths; no page errors occurred. Native illustration controls do not perform real registration, navigation or backend work. [Checks](visual-checks.json), [capture script](capture_visuals.py) and [hashes](visual-manifest.json) retain settings, computed input properties and actual platform fonts.

The real IVC scale remains **pending from Altaz**. Both drawings reuse illustration values only. Inter is requested but unavailable; both rendered heading glyphs with DejaVu Sans. Computed sample inputs match: 14px type, 40px height, 10px radius and white background. Neither generated sample introduced CSS custom properties, so this browser exercise does **not** demonstrate live primitive/semantic alias propagation or theme transforms. Those mappings were exercised only in written trials.

The desktop layouts are very similar; the updated phone navigation/main content starts slightly lower. No superior visual quality was established. Both retain the sample's white-on-orange normal button text at about 4.09:1, below the 4.5:1 normal-text criterion. That known source-color defect remains disclosed, not approved or silently changed. These previews do not establish full accessibility, pixel fidelity to the supplied Figma frames, real device behavior or usability.

## Checks, budgets and preservation

[Baseline checks](baseline-checks.json): all **167** existing tests, **153** mutation checks, source/token and whitespace checks passed. [Updated pretrial checks](pretrial-checks.json): all **197** tests (167 existing + 30 new), **177** mutation checks (153 existing + 24 new), source/link/loading, token and whitespace checks passed. Final assembly added two raw-evidence boundary tests: all **199** tests and **177** mutations pass, with the immutable raw-title style exception disclosed below. Checks are recorded separately in final-checks.json.

The screen-handoff path moves from **10,888** to **11,061 /12,000** tokens. New token detail stays off that path. Separate token paths are 5,130 (record), 6,928 (themes), 7,248 (implementation) and 5,081 (source review), with relevant access/motion guidance on affected verification paths. Every limit and pinned counting method is unchanged. Structural routing is not enforcement in every client; both controls self-report no new token-reference reads.

All **408** preserved prior artifact records remain byte-identical, including old evaluation failures, visual evidence and limitations. The initial manifest mistakenly included two mutable infrastructure files in its historical set. [Original manifest](initial-source-manifest.json) and [failed initial checks](pretrial-checks-initial.json) remain. The reviewed [source manifest](source-manifest.json) explicitly excludes check_sources.py and context-policy.json while retaining their original baseline hashes; no historical evidence hash was replaced to match changed bytes. The repeated-phrase mutation was corrected to a unique sentence. [Operational notes](operational-limits.md) record this and browser provisioning's failed first download. Shared rules, three other skill entries, personal taste and marked F1-F3 exports remain unchanged. Existing historical app.js mismatch and F03 quoted-em-dash limitations remain.

## Limits and next state

Synthetic tasks; one reply per case/version; serving configuration inherited without overrides, exact model/seed unavailable; two agent graders, not independent human research. Text styles can reveal instruction differences despite anonymous labels. Shared-filesystem isolation is instructed, not sandbox-enforced; read lists are self-reported. Several prompts state preservation constraints directly, and all rubric scores are at the ceiling. These results cannot support reliability, cross-model superiority, real usability, full accessibility, interoperability or production-readiness claims.

Official source credits and original summaries are in [token-sources.md](../../skills/ui-ux-design/references/token-sources.md). Current and older vendor documentation may differ; native formats and actual supported versions remain authoritative. No complete source audit, paid source copying, vendor-library installation or token-format compliance certification was performed.

Draft PR for review only. **Do not merge or begin Phase 7 without further authorization.**

The exact updated HTML has an em dash in its title (line 6), a retained style Fail. Initial final-check failures remain in [final-checks-initial.json](final-checks-initial.json). The checker permits only that exact path/line/content hash as immutable trial evidence and emits a warning; active guidance and modified/new raw content retain the style failure gate. No generated bytes or grades were repaired.
