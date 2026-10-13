# ShipRight v1.0 rebuild: progress

**Next step:** Wait for Altaz's OK on PLAN.md (decisions D4, D5, D6). Then start Phase 1.

Branch: `claude/nifty-brahmagupta-ds6xrg`. One PR at the end. No merge, no publish.

| Phase | Status | Commit / PR | Score | Notes |
| --- | --- | --- | --- | --- |
| 0. Research and plan | done, awaiting OK | see git log | - | Docs only under docs/rebuild |
| 1. Harness and baseline | not started | - | - | |
| 2. Lean core and build pack | not started | - | - | |
| 3. Visual craft | not started | - | - | |
| 4. Motion and 3D | not started | - | - | |
| 5. Critique and launch | not started | - | - | |
| 6. Release | not started | - | - | |

## Known state

- check_sources fails only on em dashes in the verbatim BLUEPRINT.md. Fix planned in Phase 1 (decision D1).
- Token checks need TIKTOKEN_CACHE_DIR set to the scratchpad cache in this container (see CONTEXT.md).
