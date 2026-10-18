# UX critique: S1 Queue (`index.html`)

Artifact: `index.html` plus `app.css`, `app.js`, served from a static server, 2026-10-16. Stage: visual artifact plus a working in-memory prototype. Scope: S1 and S2 only. S0 and S3 are specified, not built.
Method: rendered at 1280, 390 and 320 wide in headless Chromium, all five preview states, scripted keyboard and pointer runs for approve, back to draft, new post, over-limit, past time, delete dialog, retry, and phone drawer. `scripts/check-ui.mjs` is not present in this copy of the pack, so it was not run. Substitute checks: horizontal overflow at 1280, 640, 390, 320; contrast of every rendered text node in four states at two widths; target sizes; focus outline; console errors.

## Verdict: Ready for owner design review. Not ready to ship (it is a prototype).

## Flow rules

| Rule | Status | Evidence |
| --- | --- | --- |
| F1 Exit | Pass | Close or Back to queue on the editor; Cancel and Escape on the delete dialog; Move back to draft on Scheduled and Failed; focus returns to the row or trigger. |
| F2 Consistency | Pass | One primary per view, same action order in the editor and dialog, one place for connection status. Two entries lead to Settings (nav and status chip); defended as navigation plus status, same destination. |
| F3 Status | Pass at prototype stage | Saving text is labeled as the preview's own. The failed, expired and loading states say what happened and what to do. Persistence and real publish results are Not verified. |

## Findings

| # | Sev | Location | Evidence | Impact | Correction | Retest |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Major (fixed) | Draft editor | An empty hidden secondary button rendered as an empty box beside the primary. | Looked broken; two actions side by side. | `[hidden]` now wins over button display. | Screenshot of a Draft shows one button. Fixed. |
| 2 | Major (fixed) | Top bar at 390 | Connection chip overlapped the Settings link. | Link unreadable. | Bar wraps; nav takes its own row. | Screenshot at 390. Fixed. |
| 3 | Polish (fixed) | Scheduled editor | The approval message appeared twice, in the alert and under the buttons. | Repetition. | Alert only; live region still announces. | Approve a draft. Fixed. |
| 4 | Polish (fixed) | Preview select on phone | 32 px high on a touch screen. | Small target. | 44 px under 760 px. | Measure. Fixed. |
| 5 | Polish, open | "Nothing planned / Add post" rows | Not named in the PRD as a control. | Possible unrequested widget. | Source is J2 (plan a week). Owner may remove. | Owner decision. |
| 6 | Not verified | Settings and Connect | Settings opens a notice saying it is not built. | Honest, but a dead end for review. | Built in T7 and T2. | After T7. |
| 7 | Not verified | Screen reader output, real LinkedIn publish, persistence, server-side access rules, 200% text on a real device | No assistive tech or backend in this artifact. | Unknown. | T9 QA pass. | After T9. |

## Preserve

Dense list with day groups, text status badges with shapes, the fixed time column, the disabled-primary reason line, no summary cards or charts.

## Slop-tell scan

No gradients, glow, glass, icon cards, numbered markers, pill badges above headings, fake charts, emoji, em dashes or invented proof. Counts: one filled button per view; one icon set (inline line SVG); one font stack.
