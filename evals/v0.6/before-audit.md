# ShipRight v0.5.1 source audit

Recorded before editing the pack, October 4, 2026. Scores are expert judgments of the instructions, not measured model performance.

Scale: 1 = missing or harmful; 5 = useful but inconsistent; 8 = strong with bounded gaps; 10 = clear, complete, consistent and repeatedly validated in target tools.

| Area | Before / 10 | Main reason |
| --- | ---: | --- |
| Clarity for the AI | 6.5 | Good ownership model, but many modes, rituals and repeated instructions. |
| Preventing invented UI and features | 6.5 | Scope rules exist; no element-level phase or feedback trace. |
| Layout and hierarchy | 6.5 | Useful basics; weak responsive priorities and crop-to-screen reconciliation. |
| Icons and component placement | 7 | Detailed coverage, but universal placement and status rules cause clutter. |
| Flow rules | 7 | Strong exits and evidence rules; unsafe blocking exception and noisy status requirements. |
| States | 7.5 | Broad coverage; pending human work and background jobs are conflated. |
| Accessibility | 6 | Focus and contrast mentioned; measurable checks and dialog semantics incomplete. |
| Design system use | 7.5 | Preserve/Establish is valuable; status/export rules disagree. |
| Existing apps | 6.5 | Preserves identity; forces broad audits and repeat approvals for explicit fixes. |
| Length and token cost | 4 | 33,195 words under skills/, including 10,066 in the four SKILL.md files. |
| Agreement between files | 5.5 | Contradictory statuses, export paths, defaults and evidence claims. |

Mean: 6.4/10. Token cost depends on which references the client loads; words are measured, tokens are estimates.

## Ten biggest weaknesses

Line numbers refer to the untouched uploaded v0.5.1 files.

| # | Source file and line | Weakness | Required correction |
| --- | --- | --- | --- |
| 1 | `skills/_shared/operating-contract.md:25`; `skills/product-design/SKILL.md:216` | General scope language still allows provisional elements to enter the happy path without a current-phase allowlist. | Trace visible elements to current approved scope. Later ideas stay in notes. |
| 2 | `skills/ux-critique/references/requirements-and-feedback.md:26`; `skills/ui-ux-design/references/operator-workspaces.md:24` | Feedback becomes broad learning, without exact keep/remove/change acceptance checks or clear-action semantics. | Preserve literal requests, reconcile crops with full screens, and distinguish dismiss from delete. |
| 3 | `skills/_shared/flow-rules.md:32`; `skills/_shared/flow-rules.md:35` | Every background job demands several status displays, encouraging backend plumbing and unnecessary badges. | Show only task-relevant status, truthful progress and actionable failures. |
| 4 | `skills/_shared/flow-rules.md:20`; `skills/product-design/references/states-and-flows.md:102` | A broad legal/payment exception can trap the user; leaving the screen and cancelling a transaction are conflated. | Keep a safe exit, distinguish transaction cancellation, and explain pending/recovery behavior. |
| 5 | `skills/product-design/SKILL.md:88`; `skills/product-design/SKILL.md:106`; `skills/ux-critique/references/existing-app.md:24` | Premises plus approach choices can exceed five questions. Mandatory stops and tickets delay work already requested. | One bounded intake across skills; reuse explicit authorization and continue independent work. |
| 6 | `skills/ui-ux-design/references/layout-and-hierarchy.md:12`; `skills/ui-ux-design/references/layout-and-hierarchy.md:56` | Layout rules list generic blocks and say to stack columns, without task priority, shrink rules or crop reconciliation. | Specify reading order, widths, overflow, mobile priority and selected-row treatment. |
| 7 | `skills/ui-ux-design/references/icons-and-placement.md:60`; `skills/ui-ux-design/references/icons-and-placement.md:71` | Mandatory text+icon+color and one primary side everywhere contradict contextual design-system use. No distinction between active nav and unread notifications. | Reuse patterns by component/context; separate selection, focus, errors and notifications. |
| 8 | `skills/ui-ux-design/SKILL.md:202`; `skills/ui-ux-design/references/build-handoff.md:86` | Accessibility is vague; unconditional URL persistence can expose phone/email searches. | Add measurable accessibility criteria, semantic controls and private-input handling. |
| 9 | `skills/_shared/operating-contract.md:70`; `skills/ux-critique/SKILL.md:113`; `AGENTS.md:40` | Mandatory progress/rephrase/count blocks and copied rule bodies inflate every task and drift across files. | Use short entry files, conditional references and one canonical flow source with checked export copies. |
| 10 | `skills/ship-check/references/launch-items.md:47`; `docs/05-feature-ticket-list.md:91`; `evals/check_sources.py:45`; `examples/ivc-2026-registration/evidence/source-manifest.json:6` | Item statuses disagree, exported paths break, source checks omit most links, and archived app evidence has a hash mismatch. | Keep four statuses, separate decision verdicts, check links/exports/versions and disclose archival evidence limits. |

## Screenshot evidence

The supplied files map in upload order: image.png = image 1, image(1).png = image 2, through image(6).png = image 7.

All seven were visually inspected. Image 7 is the full registration screen. The duplicate top-right profile is not visible in it. Its removal remains an explicit user requirement, not a visually confirmed defect.

The meaning of clearing in-progress work is unresolved: hide a card, abandon a draft, or delete a record. The skill must ask before choosing a destructive meaning. Screenshots cannot establish runtime, keyboard, saving or permission behavior.

## Baseline validation

The original `python3 evals/check_sources.py` exits 0. It checks source strings, stable gate IDs and selected links. It does not prove model behavior or client installation. Archived change-set-4 behavior trials were not run.

The archived app.js hash differs from source-manifest.json. Five other recorded file hashes match. Keep the old manifest unchanged; it records historical evidence, not proof for the current package.
