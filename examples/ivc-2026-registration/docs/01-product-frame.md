# IVC 2026 - product frame and decisions

> **Historical v1 artifact.** This document records the first specification/implementation only. The owner’s September 25 review supersedes affected requirements and readiness judgments. Use [Context brief v2](06-context-brief-v2.md) for current requirements. Old passes do not verify the revised behavior.

Version 1 · 25 September 2026 · ShipRight 0.3.0-draft at fd33e90d4311b7446afbdad2d26de937c5245f5c.

Depth: New product. Frame recorded first from explicit user requirements and follow-up confirmations; no new outcome or product scope is proposed. Modes after frame: Shape flow, Spec states. No interviews, competitive research, or measured business results are claimed.

## Frame

**Approved outcome:** Desk volunteers can register an eligible person or family, resolve eligibility, collect a parent waiver and per-person cash, and issue a separate complete ticket. Administrators can reconcile registrations and cash within their assigned scope.

**Approved mechanism:** A staff-owned registration joins separate eligibility, guardian, waiver and payment states. Completion is derived, never manually asserted; family entry shares effort without combining individual fees or tickets. The user's current operational alternative is not established. Prior artifacts and spreadsheet-based planning exist; superiority over a current live system is not claimed.

| Core object | Lifecycle | Owner |
|---|---|---|
| Person | matched / staff-verified → eligibility resolved → selected | Desk |
| Registration | draft → saved incomplete → complete | Desk |
| Guardian link | required → exactly one assigned per age 8–15 minor | Desk |
| Waiver | not required / needs signature → waiting on parent → signed | Parent, desk |
| Payment | pending → paid or covered; excess cash → donation | Desk |
| Cash close | open → counted → reconciled with variance note → closed | JK admin |

Journey: approved sign-in → phone match → choose family and resolve eligibility → confirm per-person details and guardian → waiver → cash allocation → individual confirmation/tickets.

## Sources and precedence

1. User's current task and follow-up (25 September 2026) own event naming, scope, fees, roles, coverage, guardians and prototype behavior.
2. User-provided context brief (24 September) supports emergency contact, individual links, duplicate recovery, guardian shading, cash-close handover and report dimensions.
3. Earlier meeting notes (20 September) are historical evidence. Their attendee lookup and master-sheet writeback suggestions are superseded by the current user request. The later automatic transcript is garbled and is not used to create requirements.

Private transcripts and real contacts are not included in the website or public case study. No live volunteer data was requested or used.

## Decisions

| ID | Scope and decision | Status | Source / date | Affected artifacts / replaces |
|---|---|---|---|---|
| D1 | Phase 1 staff-run, fake data, no backend, no self-registration | Approved | User, 25 Sep | All screens |
| D2 | Codex current session/model; shareable prototype requested | Approved | Follow-up, 25 Sep | Build and hosting |
| D3 | One adult guardian can be linked to multiple children; exactly one per child 8–15 | Approved | User + follow-up | Details, tickets |
| D4 | $15 through Nov 6 Central time, $20 Nov 7–22; stored fee remains locked for pending registrations | Approved | Follow-up | Money model |
| D5 | Regional pool can go negative; per-JK reporting and approver audit | Approved | Follow-up | Payment, reports |
| D6 | Cash close compares cash with ticket receipts plus donations; variance requires explanation | Approved | Follow-up | Cash close |
| D7 | No match has a separate staff verification path | Approved | Follow-up | Search |
| D8 | Simulated login/SMS/lookup, browser persistence and reset | Approved | Follow-up | Demo controls |
| D9 | Event-day age determines zone; desk confirms value because source has birth year only | Proposed interpretation | Explanation, 25 Sep | Label in prototype; no DOB derivation or production policy is asserted |
| D10 | Waiver, COC URL, contact email/phone remain explicit placeholders | Approved | User | Event, waiver |
| D11 | Requested burnt orange #B85222, cream #F3E3D4 and supplied logo | Approved | User | All UI |
| D12 | ShipRight end-to-end with GitHub proof | Approved | Follow-up | Documents, evidence, case study |
| D13 | Public push of ShipRight example | Unresolved | Pack AGENTS.md requires explicit maintainer approval | Prepare concrete local change, request approval at handoff |
| D14 | Older self lookup, optional shirt and games-at-desk ideas | Superseded | Current user task | D1 and current scope |

D9 does not block fake fixture walkthroughs: the editable field explicitly asks staff to confirm age. Exact production age policy remains owner-confirmable. Shirt options are fixture labels (Youth S/M/L and Adult XS–3XL), not supplier inventory commitments. Registration is open on Nov 22; no unapproved within-day cutoff is invented.

## Non-goals and limits

No live Sheets, SMS, Google authentication, online card payment, game booking, production eligibility controls, multi-device synchronization or real signatures. Only fake data should be entered. Personal links contain a minimal fake attendee payload for a shareable standalone demo; no payment category or coverage field is exposed. Browser role switches demonstrate access behavior, not security.

## Stage-critical acceptance

All requested scenarios reachable; per-person fee and guardian integrity; no completed ticket before applicable waiver and payment; cash/donation/pool arithmetic; role-scoped lists/reports; discreet coverage; usable desktop and mobile; fake-only claims; persistent browser behavior and reset. Readiness is prototype readiness only.
