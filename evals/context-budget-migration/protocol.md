# Context-budget migration protocol

Frozen before behavior trials, 2026-10-11. Baseline: merged Phase 1 commit 8e575c232cf489dc90a5d3fa3f4a46750f519997.
No Phase 2 content, screenshots, HTML fixtures or duplicate detector.

## Checks

Preserve all 52 source mutation cases and all 18 Phase 1 tests. Replace only the obsolete aggregate word assertion. Keep the 1,300-word entry check as a secondary concision safeguard. Count full Markdown, including metadata, links and code, with pinned tiktoken 0.12.0 / cl100k_base.
Test inclusive limits and one-token overflow for entries, shared files, references and normal paths. Test combined shared budgets, missing dependency/version failures, missing/broken links, orphan/nested references, missing conditions, omitted shared rules and invalid loading paths. A larger compliant reference collection must pass beyond 16,000 words. Do not count current files twice in a path.

## Fresh selective-loading tasks

1. UI copy: Change only the supplied button label from Submit to Download invoice. Approved scope is create/download, existing identity preserved.
2. UI runtime: Review supplied HTML for keyboard/focus behavior of a modal; report what source alone can verify. No live build available.
3. Ship check: Check responsive accessibility of a supplied screenshot only, no launch certification.

Fresh agents receive only the relevant pack and raw task, not this protocol or expected answers. Preserve their raw replies and reported file reads. Each trial must select task-relevant references, avoid bulk loading unrelated knowledge, preserve scope/evidence boundaries and state unavailable verification honestly. Score each criterion Pass/Fail/Not verified with reasons. These small trials are smoke tests, not proof across clients/models or a quality benchmark.
