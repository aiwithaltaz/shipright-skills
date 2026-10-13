# ShipRight v1.0 rebuild: progress

**Next step:** Phase 1: collect the 4 baseline runs, render them with check-ui, freeze them under evals/v1/runs/baseline, then start Phase 2.

Branch: `claude/nifty-brahmagupta-ds6xrg`. One PR at the end. No merge, no publish.

| Phase | Status | Commit / PR | Score | Notes |
| --- | --- | --- | --- | --- |
| 0. Research and plan | done, approved 2026-10-13 | 4fc0e76 | - | Docs only under docs/rebuild |
| 1. Harness and baseline | in progress | harness committed; baseline runs pending | - | check-ui, safety tests, frozen protocol/rubric done |
| 2. Lean core and build pack | not started | - | - | |
| 3. Visual craft | not started | - | - | |
| 4. Motion and 3D | not started | - | - | |
| 5. Critique and launch | not started | - | - | |
| 6. Release | not started | - | - | |

## Known state

- check_sources passes (BLUEPRINT.md exempt as a verbatim source, D1). 35 tests pass.
- Token checks need TIKTOKEN_CACHE_DIR set to the scratchpad cache in this container (see CONTEXT.md).
