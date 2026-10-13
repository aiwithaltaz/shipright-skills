# ShipRight v1.0 rebuild: progress

**Next step:** Phase 2: lean core and the new build-pack skill. Read CONTEXT.md "Baseline findings" first.

Branch: `claude/nifty-brahmagupta-ds6xrg`. One PR at the end. No merge, no publish.

| Phase | Status | Commit / PR | Score | Notes |
| --- | --- | --- | --- | --- |
| 0. Research and plan | done, approved 2026-10-13 | 4fc0e76 | - | Docs only under docs/rebuild |
| 1. Harness and baseline | done | 5492756 + baseline commit | Baseline checker: 2 FAIL (dashboard tiny targets), 5 WARN total | 4 runs frozen in evals/v1/runs/baseline with metrics.json |
| 2. Lean core and build pack | not started | - | - | |
| 3. Visual craft | not started | - | - | |
| 4. Motion and 3D | not started | - | - | |
| 5. Critique and launch | not started | - | - | |
| 6. Release | not started | - | - | |

## Known state

- check_sources passes (BLUEPRINT.md exempt as a verbatim source, D1). 35 tests pass.
- Token checks need TIKTOKEN_CACHE_DIR set to the scratchpad cache in this container (see CONTEXT.md).
