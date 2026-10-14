# ShipRight v1.0 rebuild: progress

**Next step:** Done. PR https://github.com/aiwithaltaz/shipright-skills/pull/16 is open for Altaz's review. Do not merge. Pre-merge requests done (2026-10-14): marketing re-run passes hidden-content but fails overflow (158px, grid rule added, not re-run); CHANGELOG image links; GSAP license notes. Possible follow-up: let trial runs use check-ui (needs a new frozen protocol).

Branch: `claude/nifty-brahmagupta-ds6xrg`. One PR at the end. No merge, no publish.

| Phase | Status | Commit / PR | Score | Notes |
| --- | --- | --- | --- | --- |
| 0. Research and plan | done, approved 2026-10-13 | 4fc0e76 | - | Docs only under docs/rebuild |
| 1. Harness and baseline | done | 5492756 + baseline commit | Baseline checker: 2 FAIL (dashboard tiny targets), 5 WARN total | 4 runs frozen in evals/v1/runs/baseline with metrics.json |
| 2. Lean core and build pack | done | see git log | Tests 35/35, source + context checks pass. No trial (D11). | Guidance 37,070 -> 24,982 tokens. 30 references merged into 9 + SOURCES.md. New build-pack skill; largest stage 7,517 tokens. |
| 3. Visual craft | done | 5fbe6f3, 20f0a20, a33ebe4 | **Blind trial: 107/120 vs baseline 94/120, 4 of 4 wins** ([results](../../evals/v1/results-phase-3.md)) | Grader fixes applied: previews open in default state, working names, aligned meters, stacked columns |
| 4. Motion and 3D | done | see git log | Tests pass; no trial (D11) | motion.md rewritten: should-it-move gate, marketing scroll with GSAP and Lenis, 3D budgets, fallbacks, keyboard and screen reader |
| 5. Critique and launch | done | see git log | Tests pass, 153 self-tests; no trial (D11) | check-ui plus screenshot loop in critique; Core Web Vitals and 3D budgets in ship-check. Guidance 30,025 tokens (target 30,000) |
| 6. Release | done | [PR 16](https://github.com/aiwithaltaz/shipright-skills/pull/16) | **Final blind trial: 112/120 vs 93/120 with the fixed 3D re-check (105 vs 93 as first run)** ([results](../../evals/v1/results-final.md)) | 1.0.0 version, README, CHANGELOG, RELEASE-NOTES, gallery under examples/before-after/v1.0 |

## Known state

- check_sources passes (BLUEPRINT.md exempt as a verbatim source, D1). 35 tests pass.
- Token checks need TIKTOKEN_CACHE_DIR set to the scratchpad cache in this container (see CONTEXT.md).
