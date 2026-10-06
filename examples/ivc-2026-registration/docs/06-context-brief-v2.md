# IVC 2026 - Context brief, Phase 1 registration

## Current desk corrections, October 4, 2026

This supplement overrides conflicting desk UI in the September 25 brief below. It does not verify implementation.
Use the current registration phase only. Keep the liked nav/button/search/card styling where it agrees with these corrections.

- Remove Filter: All Attendees. Keep the existing search fields without adding a replacement filter.
- In progress needs a "View all in progress" option, or a way to clear it (owner's words). Either one satisfies. If clear is built, leave its saved effects unresolved until the owner defines them.
- Use a clean, even selected-row border on all four sides. Remove the thick left accent and filler Query: Test chip.
- Remove Synced to event sheet. Show task-relevant failure or saving feedback only when truthful and useful.
- Keep the profile only at bottom left in this desktop layout. Remove the top-right box; it is likely the small "⌘K" square (shortcut box) next to Desk help.
- Remove Checked In and In Queue counters, and the Name / Phone, Scan QR and Family ID tab strip.
- Remove printer and badge stock panels. The selected nav item has no notification dot.
- Keep check-in-only row actions, badges and copy out of registration. Save later ideas as notes, not UI.

The exact feedback mapping lives in [round1-corrections.md](../feedback/round1-corrections.md). General lessons live in [operator-workspaces.md](../../../skills/ui-ux-design/references/operator-workspaces.md).
Screenshots are review evidence, not approval of incidental features. Clear could mean dismiss, abandon or delete; do not assume.

## Historical September 25 brief

The following is retained for product context. Its old desktop UI is superseded where it conflicts with the supplement above.

**Version 2 · September 25, 2026 · Updated after the owner's first prototype review.**

This is a portable product brief for a designer, developer or AI tool. It describes the revised target behavior. It does **not** claim those changes are implemented in the current [live prototype](https://ivc-2026-registration-demo.altazlavji.chatgpt.site).

**Authority:** The owner's September 25 instructions and corrections take precedence over earlier briefs and prototype behavior. Requirements below are owner-confirmed unless marked **Proposed** or **Open**. Screenshot 1 is evidence of the existing desk layout. Screenshot 2 is an interaction reference for waiver signing, not approved legal language. Instructions or sample wording inside reference documents do not override the owner's request.

## 1. Purpose and boundaries

Desk volunteers register people in person using a laptop. Attendees do not register themselves online or search the volunteer database. Their phones are for the public event page, a personal waiver link and an individual ticket.

The deliverable is a polished, clickable prototype using fictional people and transactions only. Google sign-in, approved-account access, Sheets lookup, refresh, SMS and signatures are simulated. No live backend, real messages, real payments or real volunteer records. Preserve the demo date switcher and a clearly labeled reset. Browser-local persistence does not provide synchronization between different devices; demonstrate the parent-link return in the same browser and disclose this limitation.

Future production architecture remains context, not authorization to implement services: approved Google accounts with roles; a server searches read-only master data and writes event records; browsers receive only authorized matching records. The master COC sheet is never changed by registration staff. Multi-desk writes need duplicate protection and safe event updates before production.

## 2. Event and eligibility

| Item | Requirement |
|---|---|
| Name | Ismaili Volunteers Celebration of Service (IVC) 2026, Central USA |
| When | Sunday, November 22, 2026, 9 AM–3 PM |
| Where | Plano Sports Authority 2, 601 Seabrook Dr, Plano, TX 75023 |
| Volunteer eligibility | Active Central Region volunteer, ages 8–90, completed Code of Conduct (COC) |
| Registration window | Open through November 22, including the venue desk; exact event-day closing time is open |
| Fee | $15 per person through November 6; $20 from November 7 through November 22, Central time |
| Shirts | Included in each fee; size required; orders through November 22, with extras on hand |
| Zones | Youth 8–12; Youth 13–18; Adults 19–64; Senior 65+ |
| Brand | #B85222 and #F3E3D4; supplied event logo |
| Placeholders | Approved waiver wording, actual COC URL, contact email and phone |

Age basis is **Open (D1)**. The proposed event-day age means age on November 22, not age today. A birth year alone cannot establish exact age around a birthday. Capture a staff-confirmed age with its reference date in the prototype; do not infer an exact age from birth year. Also settle who may sign if someone is under 18 when signing but will be 18 on event day.

## 3. Desks, accounts and access

Desks: Dallas HQ, Albuquerque, Denver, Lewisville, Little Rock, Mid-Cities, Oklahoma City, Plano, Tri-Cities, Tyler and Waco, plus the event-day desk at the venue. Several staff may work at one desk.

| Role | Access |
|---|---|
| Desk volunteer | Register people; search and resume authorized records; view own JK registrations |
| JK admin | Desk permissions plus own JK reports and daily cash close |
| Super admin | All JKs and venue desk, reports and cash closes |

Only approved Google accounts may enter in production. Prototype accounts demonstrate these roles without claiming security. Preserve home JK and the desk where registration happened as different fields. A shared phone is neither proof of family membership nor permission to view another JK's event record. Cross-desk duplicate resolution is **Open (D6)**; do not expose protected information or create a second registration to bypass access.

## 4. Desk layout and information hierarchy

- Place a small supplied logo alongside a restrained “IVC 2026” at the top. Remove the large sidebar logo. Use the actual logo for the favicon.
- Keep navigation focused on Registration desk, Registrations, Reports and Cash close, subject to role.
- Keep Central USA / Central Region context and clearly labeled counts for the selected region or desk. Do not mix a regional count with a desk-only label.
- Remove repeated event date, time and venue from the desk sidebar and registration-side cards. Keep full event details on the public event page and individual ticket.
- Put fees, shirt information, event details and staff rules behind a discoverable “Desk help” or “Event information” control. Use an accessible accordion or click-to-open panel; important information must not depend on hovering.
- Replace generic “Before you begin” content with usable help: COC link and copy-link action, eligibility rules, guardian and signature rules, fee dates and shirt guidance. Staff should answer common questions without leaving the task.
- Use the right-side panel during registration as a live review of entered information: names, age/zone, contact, shirt size, guardian links, waiver status and relevant payment totals. Show missing items and edit actions where useful.
- Use an 8-point spacing system for layout and grouping (8, 16, 24, 32, 40, 48, 64); smaller optical adjustments must be intentional and consistent. Keep typography, field widths, buttons, status labels and spacing consistent.
- Every flow has a clear exit, current position, remaining work and a way to revisit entered details. Avoid irrelevant explanations, repeated facts, unnecessary screens and large decorative areas that displace the work.

## 5. Search, identity and return visits

Search must accept phone number, first name, last name and combinations. A person may not know the number stored in their record; a mother's record may use her adult child's phone. Phone-only lookup is insufficient.

**Proposed interaction:** One “Find a person” field with “Name or phone” guidance, with optional separate name fields if disambiguation is needed. Normalize case, spaces and phone punctuation; return matching people, not the entire directory. Use enough authorized context - name, JK, age/zone and a masked or staff-visible contact - to distinguish similar names. Do not silently select the first name match. Email is not a required search key because the known master fields do not include it.

Each result should show its state immediately and offer the relevant action:

| Result state | What staff see and do |
|---|---|
| Eligible, not registered | Select person; show guardian and parent-signature requirements before beginning |
| Missing COC | “COC needed” with Open COC, Copy link, Refresh status and Record verified completion |
| Inactive | “Active status needed” with Refresh status and the permitted facilitator-confirmation path |
| Saved, payment due | Registration exists, amount due, other outstanding items; **Collect payment** directly |
| Waiting on parent | Signature outstanding; verify parent contact, open/copy demo link, simulate resend or sign at desk |
| Adult waiver outstanding | Signature needed; **Complete waiver** directly |
| Complete | “Registered”; View details / Open ticket, without creating another registration |
| Several missing items | Show all blockers and the next permitted action; do not hide them behind one generic status |
| No matches | Adjust search by name/phone; staff-assisted verified entry after checking for duplicates |
| Refresh failed or unchanged | Preserve the record; explain failure or “No change”; retain the last checked time |

Returning staff can verify and edit existing details without repeating completed steps. Record corrections in the event record, never the master sheet. Resuming one step preserves unrelated signatures, payments and guardian links. A change to waiver-relevant identity or guardianship requires an explicit revalidation rule (**D8**); do not silently retain or erase legal consent.

## 6. Eligibility before registration

COC and active status are prerequisites for volunteer participation. Do not advance an ineligible volunteer into waiver/payment or issue a complete registration until both are resolved. A non-volunteer guardian has the specific exemption described in section 7.

At the result, provide two COC routes: complete it now using the link with desk assistance, or copy/share the link for later. The prototype must show a placeholder destination honestly and simulate sending without sending a real message.

Refresh checks the read-only master source and event-sheet completion records. Show what source was checked and when. Refreshing a stale export does not prove completion; a record that still does not match remains unresolved.

For completion evidenced on the attendee's phone, open an explicit verification action:

1. Staff choose “Record COC completion”.
2. Staff confirm “I saw the completion confirmation”.
3. Display the confirming staff name from their signed-in account; record the account as the authoritative actor, not an arbitrary typed identity.
4. Record person, date/time, JK/desk, method and the specific confirmation. Save the event-only completion; then re-evaluate eligibility.

For inactive volunteers, offer Refresh and record facilitator information when the approved policy allows it. Capture facilitator name/contact, whether present or how they confirmed, the signed-in staff verifier and time/desk. The existing rule permits facilitator confirmation, but its exact authority is being reconfirmed (**D2**). Do not let a generic checkbox bypass the policy.

**Proposed:** Save a minimal follow-up record for a blocked person so a later search resumes the eligibility check. This is a pending case, not a completed registration or admission ticket. Do not take payment for an unresolved eligibility case unless the owner changes this rule. Whether to retain such cases and for how long is **D7**.

## 7. Family and guardian setup

Every participant has their own registration, fee, shirt size, waiver status and ticket. Ages 8–15 need exactly one linked guardian. One guardian can accompany multiple children and can participate in activities. Ages 16–17 still need a parent/legal guardian signature but do not require a separately registered accompanying guardian under the current rule.

The guardian may be an IV volunteer or a non-volunteer. A non-volunteer guardian is exempt from volunteer active/COC prerequisites but still needs their own details, fee and waiver. If entered as a volunteer, search and pull their existing record and evaluate their volunteer eligibility. Do not silently change an ineligible volunteer into a non-volunteer to bypass checks; policy for that situation is **D3**.

**Recommended structure (Proposed): a family setup panel before per-person details.** It supports either starting point without forcing a trip back to search:

- **Child first:** Search the minor → show eligibility and guardian/signature needs → select or add guardian inline → ask whether guardian is an IV volunteer → search existing data if yes; capture required details if no → link guardian to child → add siblings if attending.
- **Parent first:** Search the volunteer parent → show explicitly linked children → staff select who is attending → validate each selected person and guardian link. Shared phone results may suggest people to review, but do not automatically establish a parent-child relationship or select everyone.
- Reuse an existing registered guardian rather than charging or registering the same person twice. A link change must preserve exactly one guardian for each child who needs one.

Do not force staff to register a child before they can create their guardian. If a required guardian is absent or not yet identified, explain that immediately and retain only the permitted pending work. An accompanying adult and a parent/legal guardian authorized to sign may be different people; do not assume signing authority from an accompaniment link. See **D3**.

## 8. Per-person details and progress

Collect or verify name, age/reference date, contact information, JK, shirt size, emergency contact and relevant guardian link. Reuse known information with an explicit edit path. A shared contact can reduce typing without merging identities.

Show person names in a selectable progress control: current, complete and needs attention. Show “Person 1 of 3” and remaining work. Staff can select a person to revise shirt size, phone or other details without losing the rest of the family. Apply the same person-level visibility to waiver progress. Completed details do not imply a signed waiver or paid fee.

Exit behavior: Back preserves input; Save pending is offered only for supported states; Discard explains the unsaved information that will be removed and does not delete an already saved registration. Do not trap staff in a wizard.

## 9. Waivers for everyone

**Correction: Every participant requires a waiver, including adults and non-volunteer guardians.** An adult signs their own waiver. A parent or legal guardian signs for anyone under 18. Age 18 belongs to the Youth 13–18 zone but normally self-signs; the signing-date age issue remains **D1**.

Flag parent-signature requirements in the search result and family setup, not only at the waiver step. For a 17-year-old arriving alone, say at the beginning that registration remains incomplete until the parent signs.

At the waiver step, show the named participant(s), placeholder waiver text, signer identity and relationship, consent checkbox, and Draw / Type options. Provide Clear signature and a readable signed date/time. Adult screens must not say “No parent waiver needed”; show the applicable adult waiver task.

For a parent away, collect/verify the parent's contact, prepare a personal demo link and show “Waiting on parent”. Offer signing at the desk if the parent comes later. Completion of the link updates only the relevant waiver; payment and eligibility are still required. Existing signed waivers should be visible with signer, date and recorded-by information.

**Open (D4):** A family may use one signing interaction that clearly lists all selected children, but each child's waiver record must be distinct. Confirm whether one signature may cover that explicitly named group or a separate signature is required per child. Do not silently apply a guardian's adult waiver to children, or vice versa.

No supplied screenshot or sample language is approved legal wording. Automatic reminders mentioned in an older brief are not part of the authorized fake-only behavior; any production delivery/reminder policy needs separate approval.

## 10. Cash, change and donations

Payment is cash only. Each participant has Paid, Pending or Covered status. A guardian plus two children means three fees. A saved early-price registration retains its recorded fee when paid later under the previously confirmed pricing rule. Repeated collection must not charge an already settled fee again.

The payment step should behave like a simple cash register: show fee due, cash received, change due, and allocation by person. Cash received is not the same as money kept.

**Correction: Overpayment is change by default.** Do not assume a donation or prompt every attendee to donate. Only if the payer explicitly says to keep the change does staff select **“Change is donation”**. Show the resulting donation and revised change before recording the transaction.

| Example | Ticket allocation | Cash received | Donation | Change returned | Cash kept |
|---|---:|---:|---:|---:|---:|
| $15 fee, $50 handed over | $15 | $50 | $0 | $35 | $15 |
| Same, payer says keep change | $15 | $50 | $35 | $0 | $50 |
| $20 fee, $100 handed over | $20 | $100 | $0 | $80 | $20 |
| Same, payer says keep change | $20 | $100 | $80 | $0 | $100 |
| Three $15 fees, $50 handed over | $45 | $50 | $0 | $5 | $45 |

For a receipt: **cash received = ticket allocation + donation + change returned**. Values must be nonnegative. Insufficient cash cannot be recorded as fully Paid. Partial installment payments and splitting some - but not all - change into a donation are **Open (D5)**, not implied new statuses.

Record receipt ID, amounts, affected people, transaction desk, received-by account and receipt time. Allocate a family donation once at receipt level. **Proposed display:** attribute it to the payer's row with the receipt reference; do not repeat the full family donation on every person's row or inflate reports.

### Donation without registration

The owner identified a new case: someone who is not an attending volunteer wants to donate. Support a separate **Record donation** route from the desk; do not require a volunteer lookup, eligibility, shirt size, waiver, registration or QR ticket for donating alone.

**Proposed details:** record amount, cash received/change, optional donor name or “Anonymous”, desk, staff actor and time. Offer a simple thank-you confirmation: “Thank you for helping make participation possible.” An optional acknowledgment can state the donated amount without identifying beneficiaries. Do not call it a tax receipt or add automatic messages. Donor identity requirements and acknowledgment delivery are **D5**.

## 11. Affordability and pool

Support both cases:

1. **Pre-approved coverage:** a staff-only indicator already exists in the source. Show it discreetly when the person is found so they do not need to ask again. Preserve the source of approval; distinguish the original approver, if known, from the staff member who applied it.
2. **Request at the desk:** staff can select the permitted affordability action and record the approval under their signed-in account. Track the request and approval separately if the final policy requires an approver beyond the current staff member.

The earlier rule allowed desk approval. The owner plans to confirm the detailed process at the Saturday meeting (**D9**). Preserve that distinction in the prototype; do not invent proof-of-need questions, escalation thresholds or a new approval chain.

Never show “Covered”, “affordability”, approval notes or pool debits on an attendee-facing ticket, public page or message. Internally, show Covered with $0 collected and the covered fee so it is not confused with a cash payment.

**Regional pool balance = donations received − approved covered ticket amounts.** Count each donation and covered ticket once. Pending requests do not debit the pool before approval. A negative balance is permitted under the previously confirmed rule and remains visible to authorized admins. Changing or reversing a financial record needs an audited adjustment policy before production.

## 12. Completion and returning to pending work

Completion is derived from the required states:

**Eligible (or valid non-volunteer guardian exemption) + valid guardian link when required + waiver signed by the required signer + required details/shirt complete + payment Paid or approved Covered.**

Saved is not the same as Registered. A blocked eligibility case is not a completed registration. Keep individual status dimensions internally even when the UI combines them into one readable Status column.

Search and the Registrations list must support direct return to payment, waiver, COC or active-status resolution. After the one outstanding step is completed, recalculate status; do not demand re-entry of earlier steps or prematurely issue a QR while another requirement remains.

## 13. Registrations list and record details

Keep the current clean grouping, View action, details dialog and Open ticket action. Revise columns to:

| Column | Content |
|---|---|
| Attendee | Name; shirt size directly underneath |
| Group | Age zone; separate Guardian label when applicable, since guardian is a role, not an age zone |
| Desk | Where the person registered, such as Plano, Dallas HQ or Waco |
| Status | Registered, Waiting on parent, Waiver needed, Payment due, or eligibility attention; show multiple outstanding items when necessary |
| Payment | Paid / Pending / Covered and amount collected or due, with clear labels; Covered is staff-only and has $0 collected |
| Donation | Attributed donation amount, or $0/-; link to receipt; no duplicate allocation across family rows |
| Actions | View and the relevant next action |

Remove the standalone Waiver column; keep waiver details in Status and the record dialog. Include a visible donation example in seeded data.

The dialog should show entered details, guardian/family links, waiver signer and time, payment receipt and donation, who created the registration and when, who completed/updated each important step and when, desk, and COC/facilitator confirmations. “Created by” and “Completed by” can differ. Preserve original audit entries rather than overwriting the last actor into every field.

## 14. Reports and daily cash close

Keep the current reports structure pending later owner feedback. Preserve counts by JK, age zone, guardian, known team and early/regular fee; shirt sizes by JK; waiting signatures and pending payments; event-only COC/active confirmations; cash, donations, coverage and pool. Unknown source fields must remain unknown rather than invented.

Money totals must incorporate the corrected change behavior and donation-only receipts. Expected drawer cash is **ticket cash kept + donations kept**, not gross bills handed over and not Covered fees. Use receipt dates for daily cash; a payment collected on a later visit belongs to that later day's close. Preserve the locked registration fee separately.

Close records expected cash, counted cash, variance, variance explanation, handed-to name, closed-by account and time/desk. A later receipt must be visibly outside an earlier close. Do not silently rewrite a closed day. Fake CSV exports are permitted; direct writes to live Sheets are outside this prototype.

## 15. Mobile surfaces

- **Public event page:** event details, who can attend, guardian rules, in-person registration instructions, fees, age zones, required waivers, map/directions and placeholder contact/COC information. No attendee lookup or self-registration.
- **Personal parent waiver:** named child/children, parent identity/contact, consent, draw/type signature, completion feedback and a safe exit. Reveal only what that personal link needs.
- **Individual ticket:** per-person name, event information, useful group/shirt/guardian information and admission QR only when complete. Incomplete personal pages explain the outstanding action. Never reveal coverage, staff-only notes or other attendees' records.

## 16. Demonstration and acceptance matrix

Compare versions using the same three dimensions: **flow works**, **visual design**, **scenario coverage**. Review the revised specification separately from browser behavior. Passing old tests is not proof that these revised cases pass.

| ID | Scenario and expected evidence |
|---|---|
| A01 | Single adult: name or phone → eligible → details → adult waiver → exact cash → one QR |
| A02 | Wrong/shared phone: find by first/last/combination, disambiguate, correct event-only contact |
| A03 | Child first: eligible minor → inline non-volunteer guardian → sibling → three details, waivers, fees and QRs |
| A04 | Volunteer parent first: explicitly linked kids visible; select attendees; check each person's eligibility |
| A05 | Existing guardian reused: attach another child with no duplicate guardian registration or fee |
| A06 | Seventeen-year-old parent away: warning at lookup; parent contact/link; pending until valid signature and payment |
| A07 | Family edit: person-level details and waiver progress; revisit a completed person's shirt/phone without erasing others |
| A08 | COC missing: cannot continue; open/copy link; refresh still missing; attested phone confirmation resolves event record with actor/time/desk |
| A09 | Inactive: cannot continue; refresh or permitted facilitator confirmation; audit proves who verified |
| A10 | No match: alternative name/phone search; verified manual path; no eligibility bypass or duplicate |
| A11 | Pre-approved Covered: staff sees it early; no repeated awkward request; public ticket omits it |
| A12 | Desk affordability request: permitted approver and source recorded; unauthorized/incomplete approval cannot complete |
| A13 | $50 for $15: $35 change by default; explicit keep-change makes $35 donation and $0 change |
| A14 | Donation only: non-attendee donates; no registration/waiver/QR; thank-you and correct daily cash/pool |
| A15 | Payment return: search shows existing record and due amount; direct collection preserves details/waiver; no second charge |
| A16 | Other pending return: direct COC/active/signature resolution preserves finished work; multiple blockers remain visible |
| A17 | Pricing: Nov 6 $15, Nov 7 $20; pending fee remains stored; Nov 22 open; invalid/out-of-window dates handled explicitly |
| A18 | List: requested columns, donation fixture, distinct creator/completer audit, scoped records and ticket preview |
| A19 | Shell: small top logo, real favicon, no repeated venue blocks, accessible help, 8-point spacing, clear exit/progress and useful summary |
| A20 | Finance: family donation counted once; Covered not drawer cash; donation-only receipt included; late receipt and close variance correct |
| A21 | Mobile/roles: usable public, parent and ticket pages; coverage private; role boundaries demonstrated; no self lookup |
| A22 | Age boundaries: 8, 12/13, 15/16, 17/18, 18/19, 64/65 and 90/91; age basis D1 resolved before treating policy as verified |

Group these cases into a small number of end-to-end journeys if useful, but retain a separate observed status for every case. Where policy is open, mark Needs decision; where no implementation evidence exists, mark Not verified.

## 17. Open decisions and recommendations

| ID | Decision | Recommendation / what it affects |
|---|---|---|
| D1 | Age basis and signer age at signing | Confirm event-day eligibility/zones; separately settle a person turning 18 before the event. Do not derive precise age from birth year. |
| D2 | Inactive verification authority | Retain logged facilitator confirmation if authorized; otherwise wait for the source update. Record evidence source either way. |
| D3 | Guardian qualification and presence | Confirm minimum guardian age, non-volunteer exception boundaries, and whether the attending guardian must be the legal signer. Resolve before accepting edge-case links. |
| D4 | Family signature scope | Prefer one clear signing interaction with explicitly named children and separate per-child records if approved; otherwise collect each signature. Remote under-16 signing must not remove the accompanying-guardian requirement. |
| D5 | Donation-only identity, thanks and payment exceptions | Optional donor name, on-screen acknowledgment; no automatic SMS or tax claim. Confirm partial donation/partial payment scope. |
| D6 | Cross-JK return visits | Define whether staff may collect money for another desk's record, and how receipt ownership works, before expanding access. |
| D7 | Saving blocked eligibility cases | Recommend a minimal resumable pending case; decide retention and required fields. Never label it completed. |
| D8 | Edits affecting signed waivers or settled cash | Define when consent must be collected again and how audited monetary adjustments work. Shirt/contact edits should not restart unrelated steps. |
| D9 | Affordability policy, Saturday meeting | Confirm pre-approval source, desk approval authority, required audit fields and corrections. Do not add proof-of-need collection without approval. |
| D10 | Final operational content | Supply approved waiver, COC URL, contact details, final shirt size options/availability and event-day close time. |

## 18. Change record and handoff

This version replaces phone-only lookup, adult-waiver exemption, automatic excess-cash donation, generic static side panels and restart-from-beginning recovery. It preserves staff registration, per-person fees/tickets, guardian links, role scope, brand colors, event details, pricing dates, reporting and cash close.

Earlier briefs also contain venue court planning, historical launch dates, outside-form inspiration, automatic reminder suggestions and SMS-provider estimates. These are historical planning context, not added prototype requirements or current vendor commitments. Do not copy old prices or timelines into implementation without verification.

Next implementation should start from this brief, resolve only the policies needed for the affected work, and test A01–A22. This document update does not itself revise the live prototype. The first implementation and its tests remain a historical baseline; the new requirements need fresh implementation and verification evidence.
