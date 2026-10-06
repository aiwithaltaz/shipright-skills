# Failure modes log

One row per real failure seen in a trial or a real project. Each row should point to the rule that now catches it.

| Date (UTC) | Model / evidence | Case | What went wrong | Rule or disposition |
|-----------|-------|------|-----------------|----------------------|
| 2026-10-04 | Fresh agent, same family as editor | v0.6 F01 first run | Specification criteria were mixed with future runtime checks. A missing clear effect was not marked as missing required specification behavior. | Shared contract Readiness and UI pre-flight now separate stages. Fresh rerun corrected the classification; both responses retained. |
| 2026-10-04 | Fresh agent, same family as editor | v0.6 F03 | Readiness reasoning passed, but a screenshot title was quoted with an em dash. | Writing rule remains explicit. Raw response preserves this style miss; it is not counted as a style pass. |
| 2026-10-04 | Static source and SHA-256 comparisons | Archived IVC app | One manifest hash does not match packaged app.js; five others match. | Original bytes retained with notices. Historical logs cannot verify the mismatched source. |
| 2026-10-04 | Static source and supplied screenshot | Archived IVC waiver | Prototype authored substantive consent wording despite the pack's no-legal-text rule. | Historical violation explicitly flagged; do not reuse that wording. |
| 2026-10-04 | Static source only | Archived IVC storage | Parse failure falls back to seed data, followed by persistence; malformed saved work could be overwritten. | Known gap disclosed; runtime fault injection remains Not verified. |
| 2026-10-04 | Complete JSONL record inspection | IVC training candidates 2, 7, 8 | Responses claimed policies were approved without approval in their own messages. | Candidates now label suggestions Proposed or require the missing policy. Human review remains required. |
