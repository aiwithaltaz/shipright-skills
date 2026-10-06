# Change set 3 - operational flow and feedback trials

Three fresh-context agents each received one realistic equipment-hire task and one updated ShipRight skill. They used the same current Codex model as the builder, with no model switch or paid model API call. The trial agents did not receive IVC examples, prior conclusions, the training corpus or an expected answer. They were instructed to read only the skill and needed references and to write into isolated temporary files. No network, installs, implementation or external changes were permitted.

The system skill-creator workflow calls for an independent forward test when a sufficiently complex skill change benefits from it. That is the purpose of these bounded trials. This is independent execution, not independent scoring, a blinded benchmark, cross-model testing or a reliability rate. There was one trial per case, no baseline comparison and no retry selected for a better result.

- [inputs.json](inputs.json): task text and common restrictions.
- [results.md](results.md): observed decisions, criterion-level review and limits.
- `output-product.md`, `output-ui.md`, `output-critique.md`: complete responses as produced, apart from copying the files into this directory.
- `source-checks.txt`: source/frontmatter validation from the completed pack.

## Reviewer criteria

These criteria were used by the parent reviewer and were not supplied to the trial agents. They are a focused review of the observed outputs, not a preregistered quantitative benchmark.

| Case | Observable behavior to inspect |
|---|---|
| S3-01 | Alternate identifiers with disambiguation; both relationship entry points; prerequisite evidence and authority; direct payment return preserving earlier work; tendered vs change; unresolved policy stays unresolved; no redundant outcome approval or unrelated services |
| S3-02 | Preserve the explicit 4px system; clear active person and revisits; useful summary; deduplicate background facts; accessible reference help; blockers visible; no new flow or invented persistence |
| S3-03 | Reject readiness from old passes; distinguish source conformance from current requirements; separate flow, visual and coverage; actionable correction/retest; generalize lesson without exporting product-specific policy |

Run source validation with `python3 evals/check_sources.py` and the available system skill-creator `quick_validate.py` for each skill. These checks do not execute an application or prove skill behavior. Keep these requests out of training splits if using them later as held-out evaluation.
