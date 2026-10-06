# UI specification and Codex handoff - v1

> **Historical v1 artifact.** This document records the first specification/implementation only. The owner’s September 25 review supersedes affected requirements and readiness judgments. Use [Context brief v2](06-context-brief-v2.md) for current requirements. Old passes do not verify the revised behavior.

ShipRight ui-ux-design follows the recorded product frame; no separate intake. Personal-taste directory inspected: README only.

**Design read:** A welcoming community registration desk, with warm paper, clear accounting, generous forms and quiet event branding.

Use supplied logo unaltered, #B85222 primary actions, #F3E3D4 brand panels, charcoal #302C28 text, white surfaces, restrained borders. Body/system font 16px, labels 14px, secondary 12–13px, editorial Georgia display headings 32–52px. Spacing 4/8/12/16/24/32/48; radii 8/12/20px. Functional icons are simple line SVGs with text labels; status uses text and color. Approved job-specific navigation: Registration desk, Registrations, Reports, Cash close, View event. No unrelated settings, chart widgets or marketing modules.

Desktop: narrow cream sidebar; compact topbar with scope/date/fee; main working surface and contextual registration summary. Forms have grouped sections, legible labels and prominent next action. Mobile: stacked content, 44px controls, no horizontal page overflow, tables turn into labeled rows. Event surface uses large supplied emblem and an editorial event masthead; ticket uses an admission-card layout and large QR. Do not show affordability/payment categories on public surfaces.

Focus rings visible; skip link; native labeled controls; field errors in text and focus the first error. Dialogs trap focus and restore focus; Escape closes noncommitted actions. Drawn signature has a fully keyboard-operable typed alternative. Minimal entrance transition only; honor reduced motion.

## Rules for the build

Implement S1–S12 only, using the frame and states. Every fixture is labeled as demo; all phones use reserved 555-01xx numbers, emails use example.com. No real backend, external data credentials, AI calls or actual messages. Browser storage holds fake records; one local module derives completion, eligibility, fees and cash totals. Personal demo links carry only necessary fake attendee info and never Covered. The static implementation and local QR dependency are routine implementation choices authorized by the request, not new product features. No supplier/production policy is implied by fixture sizes or dates.

**Bounded change and external actions:** Build the static prototype and specification/evidence artifacts in ivc-prototype, use the provided logo, publish a shareable fake-data website as requested. Paid-call allowance: none. Read Drive and ShipRight, but do not copy private transcripts or contacts into public output. Prepare a ShipRight example locally; push needs the maintainer approval specified in that repository. Stop when scenario evidence, desktop/mobile inspection and the prototype link are complete; report actual limits.

## One prompt per screen, in build order

Each inherits the exact tokens, responsive rules and complete state table from docs/02. Each must preserve back-navigation input, show real outcomes rather than decorative controls, and be verified against its job.

1. **S1 Sign-in.** Branded event pane + demo Google account chooser. Primary: Continue with Google (demo). Include desk, JK admin, super admin and unapproved fixture accounts. Denied state offers switch account. Accept: no real OAuth call; approved scope persists; unapproved never enters desk.
2. **S2 Desk.** Event/date context → phone search → result list/eligibility → selection summary. Show scenario shortcuts as demo controls. Primary: Continue with selected people. Accept: one phone finds family; no matches recover safely; COC/inactive fixes record actor/JK/time; duplicates route to existing record.
3. **S3 Details.** Stepper → one person form → guardian selector → navigation/summary. Primary: Continue to waiver. Accept: required shirt, valid 8–90 age, age 8–15 guardian, adult guardian exemption only with linked children; each participant independently removable.
4. **S4 Waiver.** Per-child status → placeholder text → parent name → type/draw → consent. Primary: Save parent signature. Secondary: Parent is away for ages 16–17. Accept: under-18 only, no empty signature, saved waiting state, demo link preview.
5. **S5 Cash.** Per-person status rows → cash input → ticket amount/donation breakdown → save. Primary: Save registrations. Accept: fee stored, per-person payment, insufficiency error, logged coverage approval, explicit excess donation.
6. **S6 Confirmation.** Outcome summary → individual cards → follow-up actions. Primary: Start next registration. Accept: complete gets separate QR; incomplete says what's missing; each personal ticket omits private payment category.
7. **S7 Registrations.** Count → search/status filter → accessible rows → detail dialog. Primary contextual: Collect cash or Preview parent link. Accept: own JK scope; duplicate prevention; late payments use original fee and current receipt day.
8. **S8 Reports.** Scope selector → truthful aggregate figures → zones/shirts/JK and cash breakdown → audit. Primary: Export CSV. Accept: restricted roles, all requested dimensions, pool = donations − covered fees, valid downloadable CSV.
9. **S9 Cash close.** Desk/date → receipts → expected cash → counted/handed-to/variance explanation → closed record. Primary: Close cash for the day. Accept: role restriction; variance note required; actor recorded; subsequent receipts visible as not yet closed.
10. **S10 Event.** Event identity → date/time/venue → fee → in-person steps → who may attend → zones → venue map/directions → placeholder contacts. Primary: Get directions. Accept: no online registration CTA or attendee lookup, mobile readable, exact provided facts.
11. **S11 Parent link.** Named child/event → placeholder waiver → name/signature/consent → confirmation. Primary: Sign parent waiver. Accept: invalid link recovery, idempotent signature, same-browser desk updates, honest no-real-text behavior.
12. **S12 Ticket.** Event identity → attendee/name/zone/size → status → QR or outstanding actions → venue/date. Primary: Open directions. Accept: one attendee, no coverage labels or audit info, QR carries actual personal URL.

## Needs approval before production, outside this prototype

Final legal waiver; COC/contact URLs; exact age policy; real account allowlist and services; supplier size availability; real security review and cross-device synchronization. None is represented as implemented.
