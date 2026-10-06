# Bounded verification

Verify the actual requested change with available tools. Do not turn a small correction into a broad test project.

## Scope

Select the affected critical paths and known risks. For a broad pass, start with at most five representative paths.
Record artifact/version, supported device sizes, relevant roles, input methods and failure cases.
Use authorized local/preview data. Do not perform writes on live customer records during a review.
Use available tools; do not add installations, paid calls or deployments as hidden prerequisites.

## Checks

Inspect relevant desktop and narrow layouts, plus zoom/reflow where supported. Use the project's widths, not a universal 390px-only rule.
Check reading order, clipping, overflow, alignment, fonts, sticky overlap and difficult content.
Exercise keyboard focus, labels, relevant dialogs, state transitions and affected saving/recovery when available.
Read accessibility snapshots alongside visual evidence. Test reduced motion or forced colors when relevant to the change.
Automated scans do not prove complete accessibility or product correctness.

If no browser can run, state **Partial check: no browser was available**.
Name exactly which checks remain Not verified. Source inspection can support some findings without claiming runtime success.
Screenshots cannot verify persistence, permission enforcement or keyboard operation.

## Fix and stop

For authorized fixes, correct deviations from approved requirements and recheck the affected path.
Use up to two optional visual refinement passes as a budget, not a reason to abandon a known required correction.
Stop optional checks once the acceptance boundary is satisfied. If a tool or unresolved decision blocks completion, report it clearly.
Record before/after evidence when useful. Keep historical results separate from new evidence.
Use the shared readiness rule. Verification never authorizes publishing, deployment or payment.
