# ShipRight implementation review - prototype v1

**Historical evidence limit added in 0.6:** The packaged prototype/app.js does not match evidence/source-manifest.json.
Claims below describe the earlier recorded review, not verification of the exact current package.
Source inspection also found silent fallback to seed data after unreadable saved JSON, followed by persistence.
That can overwrite malformed stored work. Storage fault recovery was not verified; the broad assurance below is not established.
Sample waiver wording is a historical violation of the pack's no-legal-text rule, not text to reuse.

> **Historical v1 artifact.** This document records the first specification/implementation only. The owner’s September 25 review supersedes affected requirements and readiness judgments. Use [Context brief v2](06-context-brief-v2.md) for current requirements. Old passes do not verify the revised behavior.

**Verdict: Ready for a stakeholder prototype demonstration.** Next: publish the fake-data site and use the same flow/design/scenario rubric for comparison. This is not a production release assessment.

Stage: Implementation + visual artifact. Scope: S1–S12 in prototype/, reviewed 25 September 2026. Exact source hashes: evidence/source-manifest.json. Browser: installed Google Chrome, clean profiles; desktop 1440×1000 and mobile 390×844. Pack: ShipRight 0.3.0-draft, fd33e90d4311b7446afbdad2d26de937c5245f5c. User research: none. Review author: the same Codex session that built the prototype; not an independent audit.

Critical requirements were declared before implementation in docs/01 and docs/02. Evidence is recorded by stage; mock authentication cannot prove real authorization.

## Results against the requested comparison criteria

| Criterion | Status | Evidence | Limits / next action |
|---|---|---|---|
| Working flow | Pass | Five browser journeys in evidence/browser-final.json; actual family save, parent-tab signature, receipt and cash close; no page errors | Browser-only prototype; obtain stakeholder feedback |
| Visual design | Pass | Inspected desktop desk/report/family and 390px event/waiver/ticket screenshots; provided brand palette and emblem; second pass improved contrast and keyboard focus | Heuristic review by builder, not user preference validation |
| Every requested scenario | Pass | Scenario matrix below and nine model checks | No real accounts, data, payments or messages exercised |

## Scenario matrix

| Requested scenario | Observed evidence | Result |
|---|---|---|
| Single adult | Browser path 1: phone match → details → no parent waiver → $15 cash → QR | Pass |
| Guardian + two children | Path 2: 3 IDs, $45, same guardian linked twice, separate typed and drawn signatures, 3 QRs | Pass |
| 16–17 waiting on parent | Path 3: incomplete has no QR; mobile parent signature updates same-browser desk; ticket then appears | Pass |
| Affordability request | Path 4: no save before approver checkbox; approved under desk login; no Covered in ticket or public payload | Pass |
| Pre-marked Covered | Path 4: Covered preselected, named approval required and recorded | Pass |
| $100 overpayment | Path 4 and model: standard fee $20, cash $100, donation $80 | Pass |
| No COC | Path 1: blocked before completion; desk completion logged with JK, actor and time | Pass |
| Inactive volunteer | Path 1: facilitator name/phone logged before continuing | Pass |
| No phone match | Path 1: staff entry → both eligibility checks → registration; reload search opens existing record | Pass |
| Nov 6 / Nov 7 price switch | Path 4: $15 / $20, early Pending record paid later at original $15 and $5 donation | Pass |
| JK access | Path 4: Denver desk does not show Dallas registration; reports/close denied; super admin sees 12 desk rows | Pass |
| Daily close | Path 4: missing variance explanation rejected, -$1 explanation and handover persisted | Pass |
| Public event & venue | Path 5 + screenshot: 390px no page overflow, venue map loads, directions URL names supplied venue | Pass |
| Reset/persistence | Path 5: reload preserves additions; confirmed reset restores 24 fixtures | Pass |
| QR | macOS Vision decoded screenshot to the exact personal ticket URL, compared byte-for-byte | Pass |

## Findings and bounded fix record

Initial visual inspection found the transparent cream logo lacked contrast on cream, and working text needed enlargement. Source inspection found secondary buttons inside forms needed type="button" to avoid default submits. These were corrected in pass 1. Pass 1 also restricted cross-desk existing-record actions. Five browser journeys passed after those corrections.

Pass 2 was limited to evidence-driven concerns: event-only corrected person data should win over stale lookup fields; keyboard focus should remain predictable after re-render; secondary text needed stronger contrast. The same five journeys passed again. No further implementation fix passes were run.

The first automation attempt used an incorrect wait that matched a loading placeholder. Two later immediate QR assertions raced hash navigation, and a scope assertion ignored its retained search filter. These were test-harness defects, not product defects; waits/assertions were corrected before scoring. Failed attempts are retained locally. No failed assertion was simply relabeled Pass.

## UX critique 10-check audit

| # | Gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Artifact | Pass | Actual prototype/ sources, hashes and browser screenshots identified |
| 2 | Context honesty | Pass | User task takes precedence; fake-only labels; services explicitly simulated |
| 3 | Job clarity | Pass | Desk opens with phone search; phone pages show their single event/signature/ticket job; heuristic judgment |
| 4 | Action hierarchy | Pass | Primary actions exercised in five journeys; form button semantics corrected |
| 5 | States | Pass | Invalid input, no-match, incomplete, denied account/role, signed, complete, filtered-empty and reset exercised |
| 6 | Blockers | Pass | No unresolved blocker in the tested fake-data scope; production excluded |
| 7 | Craft | Pass | Supplied logo contrast corrected; desktop/mobile screenshots inspected; no horizontal mobile overflow |
| 8 | Trust | Pass | Per-person fee, donation preview, approved coverage, honest SMS demo, no coverage disclosure; QR actually decoded |
| 9 | Accessibility | Pass | Keyboard adult path separately exercised, native labels/focus/dialogs, typed signature alternative, reduced-motion CSS, tested narrow layouts |
| 10 | Rewrite path | Pass | Concrete findings, two bounded fixes, affected behavior retested; no unresolved critical rewrite |

Accessibility Pass covers the planned prototype checks only. A screen-reader audit, exhaustive WCAG certification, real-device scan and browser compatibility outside Chrome are **Not verified**. Network/storage fault injection is **Not verified**; storage errors have explicit handling in source. These are disclosed limitations of the demo, not assertions of production readiness.

Live Google sign-in/allowlist enforcement, server lookup privacy, Sheets append concurrency, live SMS delivery, legal waiver validity, real payment reconciliation and cross-device updates are **Not applicable** to this fake-only prototype and remain unimplemented.

## ShipRight pack feedback

What helped: the source-precedence rule prevented older meeting suggestions from reintroducing self lookup; the object/state model separated saved from complete; the cash-close screen job exposed the need for a separate receipt ledger; evidence stages prevented screenshots from being used as proof of behavior.

Friction observed: supplied detailed requirements already constitute a frame, but the pack's stop-for-frame-approval language can be interpreted as asking for the same decisions again. This run recorded the explicitly authorized frame and did not invent a second approval ceremony. Document as an observation; no skill behavior or pack rules were edited.

Suggested future evaluation (Proposed, not approved pack scope): add a real-project rubric for retaining test-harness failures separately from product defects, and an example for documenting a backend-free cross-device limitation. No interviews, adoption claims or success percentages are inferred from this single project.
