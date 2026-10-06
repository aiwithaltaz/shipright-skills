# ShipRight pre-build review - specification v1

> **Historical v1 artifact.** This document records the first specification/implementation only. The owner’s September 25 review supersedes affected requirements and readiness judgments. Use [Context brief v2](06-context-brief-v2.md) for current requirements. Old passes do not verify the revised behavior.

Stage: Specification. Artifacts: docs/01–03, 25 September 2026. Next stage: Codex prototype implementation. Critical: approved flow and role scope, individual fee/guardian/waiver invariants, discreet coverage, truthful fake-only interfaces, all requested scenarios and desktop/mobile accessibility plan. Runtime behavior remains Not verified until implementation review.

Verdict: Ready for prototype implementation. The current user request authorizes the screen scope and ordinary implementation decisions. No market research or business superiority claim was added. Production decisions remain explicitly outside scope.

## Product-design 8-check gate

| # | Check | Status | Evidence / next action |
|---|---|---|---|
| 1 | Context | Pass | Current request precedes historical meetings; docs/01 sources; implement specified scope |
| 2 | Job/outcome | Pass | docs/01 frame and docs/02 screen jobs; exercise them |
| 3 | Happy path | Pass | docs/02 seven-step desk path, no self-registration; build it |
| 4 | Failure/cancel | Pass | docs/02 recovery, draft preservation, storage failure, duplicate handling; verify browser |
| 5 | States | Pass | docs/02 explicit per-surface state table, local busy behavior and justified N/A; implement |
| 6 | Empty/filter | Pass | Search no-match differs from unstarted; list empty differs from filtered-empty; verify |
| 7 | Consequences | Pass | Payment/coverage actor, receipt date, donation preview, cash close and discard confirmation; verify |
| 8 | Decisions | Pass | docs/01 ownership/status and production-only open decisions; age fixture interpretation explicit |

## UI/UX 10-check pre-flight

| # | Gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Screen context | Pass | S1–S12 map to requested jobs; implement sequentially |
| 2 | Design direction | Pass | Supplied emblem and palette, docs/03 tokens; inspect rendered brand |
| 3 | Action hierarchy | Pass | One named primary action per screen; inspect actual viewport |
| 4 | States | Pass | docs/02 and per-screen acceptance; test failures too |
| 5 | Integrity/craft | Pass | Fake labels, no unsupported proof, no live services; inspect copy |
| 6 | Navigation | Pass | Only requested desk/list/reports/close/public/waiver/ticket surfaces; verify routes |
| 7 | Accessibility spec | Pass | Labels, focus, keyboard, touch sizes, signature alternative, responsive states; runtime unverified |
| 8 | Motion | Pass | Minimal transition with reduced-motion support; verify CSS |
| 9 | Content/density | Pass | Forms/tables/long names and 390px layout specified; rendered density unverified |
| 10 | Handoff | Pass | docs/03 screen prompts, open production dependencies and bounded change; build next |

## UX critique - specification 10-check audit

| # | Gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Artifact | Pass | Three versioned specification files exist |
| 2 | Context honesty | Pass | No research claimed; garbled transcript not used as authority |
| 3 | Job clarity | Pass | Explicit screen jobs; heuristic review, not user testing |
| 4 | Hierarchy | Pass | Screen prompts name primary/contextual actions |
| 5 | States | Pass | Complete scoped state table; runtime review still required |
| 6 | Blockers | Pass | No unresolved specification blocker within fake-data scope |
| 7 | Craft | Pass | Concrete token/layout plan reviewed at specification stage only |
| 8 | Trust | Pass | No live auth, SMS or backend; no public coverage category; costs visible before save |
| 9 | Accessibility | Pass | Keyboard, error, contrast, mobile and signature fallback specified, not certified |
| 10 | Rewrite path | Pass | Findings below resolved in spec; affected browser paths queued |

## Findings resolved before build

- Receipt date must drive daily cash; registration date alone would misstate cash collected when a pending person pays later. Added separate transaction ledger in docs/02.
- Parent-away status must not issue an admission QR. Added explicit incomplete ticket behavior.
- Guardian exception must not allow an unrelated non-volunteer adult to register. Added child-link dependency and model validation.
- The old source uses birth year. Added a desk-confirmed age label; do not infer exact age from year alone.
- No backend means separate devices cannot synchronize a new parent signature. State that limitation in demo controls and parent confirmation; test same-browser tab updates only.

These are specification improvements, not claims of bugs found in an implementation. Initial implementation review plus at most two fix passes follow.
