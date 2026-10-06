# Flows, states and access - specification v1

> **Historical v1 artifact.** This document records the first specification/implementation only. The owner’s September 25 review supersedes affected requirements and readiness judgments. Use [Context brief v2](06-context-brief-v2.md) for current requirements. Old passes do not verify the revised behavior.

## Screens and jobs

| ID | Screen | Job / primary action |
|---|---|---|
| S1 | Demo sign-in | Choose a fake approved Google account and open its desk |
| S2 | Registration desk | Find people by phone, select family and resolve eligibility |
| S3 | Person details | Confirm age, size, contact and guardian for each person |
| S4 | Waiver | Record parent's typed/drawn signature or prepare a demo text link |
| S5 | Cash | Allocate Paid/Pending/Covered per person and record donations |
| S6 | Confirmation | Distinguish saved from complete and open each eligible QR ticket |
| S7 | Registrations | Find own-JK records, collect pending cash and follow up on parents |
| S8 | Reports | Read counts, zones, shirts, money, audit and regional pool |
| S9 | Cash close | Reconcile a day's received cash and record handover |
| S10 | Event | Understand eligibility, in-person registration, fees, zones and venue |
| S11 | Parent waiver | Sign for the named minor from a personal demo link |
| S12 | Ticket | See one person's event admission status and QR when complete |

## Happy paths

1. Sign in as an approved fixture account. Scope derives from account's JK and role.
2. Normalize phone; match only fake people sharing it. Select individual or family. Existing registrations open their record rather than create duplicates.
3. Missing COC blocks continuing until desk completion is recorded with actor, simulated date/time and JK. Inactive volunteer requires facilitator name and phone. Non-volunteer adult guardian is exempt from active/COC requirements only while linked to a selected minor.
4. Confirm per-person editable data and required shirt size. For ages 8–15 pick exactly one guardian. The same adult can serve several children. Guardian is separately registered and charged. Ages outside 8–90 fail validation. Age 18 is youth but requires no parent waiver.
5. Each under-18 participant needs a parent signature. Parent-at-desk allows typing or drawing plus parent name and consent. Ages 16–17 can be saved waiting on a texted parent link. Adult waiver is not required.
6. Select each person's payment status. Paid contributes their locked fee to cash due. Covered contributes the locked fee to the pool's expenditure and logs the approving desk account. Pending contributes no cash receipt. Cash below Paid total blocks. Excess is visibly labeled donation before save.
7. Save once; assign individual IDs. Only eligible, waiver-complete and Paid/Covered records show a QR. Incomplete records expose status and next action. Public surfaces never reveal Covered or affordability.

## Fail, cancel and recovery

Back navigation preserves draft fields. Discard requires explicit confirmation and affects only the unsaved draft. A malformed phone shows an inline error; a valid unmatched phone shows staff-verified entry. Manual volunteer entry still requires active/facilitator confirmation and COC completion. Duplicate registrations open existing records. Session reset requires confirmation. Storage failure produces an explicit warning; no silent claim of saved data. No simulated network is required for local data. Parent link and ticket decoding failures offer a safe event-page exit. A parent signature is idempotent; repeated signing does not create payment or registration duplicates.

## States

| Surface | Empty / initial | Busy | Success | Error | Denied | Partial / filtered |
|---|---|---|---|---|---|---|
| Sign-in | Account chooser | Opening account | Desk opens | Unapproved account | Explicit not approved, switch account | N/A, no partial auth service |
| Search | Phone + sample scenario shortcuts | Brief searching state | Matching people | Invalid phone, retry | No account → sign-in | No matches → verified entry |
| Details | Required fields | N/A local synchronous edit | Valid next step | Preserve input, focus invalid field | Role checked by desk shell | Family member can be removed; guardian dependency revalidated |
| Waiver | Signature and consent | Saving parent action | Signed | Missing parent/name/signature/consent | Invalid link | Waiting on parent is saved, not complete |
| Cash | Paid defaults / pre-covered fixture | Save guarded | Receipt/confirmation | Insufficient or invalid cash | Desk only | Mixed Paid/Pending/Covered |
| List | No registrations, start registration | N/A local read | Records with follow-up actions | Storage warning | Other JK not listed | Filtered empty with clear filters |
| Reports | Zero counts remain truthful | N/A local aggregation | Scope-specific counts | Storage warning | Desk role denied | JK filter; regional pool labeled distinctly |
| Cash close | No close yet | Saving guarded | Recorded close + handover | Required count/name; variance note | Desk role denied | Later receipts after close explicitly appear as unclosed cash |
| Event | Full static event details | Asset loading only | Directions + desk instructions | Contact/COC placeholder disclosed | N/A public | N/A no filtered data |
| Ticket | Personal link required | QR generation | Complete ticket | Invalid link safe exit | No attendee directory | Incomplete status, no admission QR |

## Access

Desk: register; see and follow up own JK records. JK admin: same plus own JK reports and cash close. Super admin: all JKs and venue desk, reports and cash close. Demo controls can switch fixture accounts; they do not establish real authentication. Reports and receipts scope by transaction desk, and each registration also retains home JK. Cash date is receipt date, not registration creation date. A locked early fee paid later stays early price. Complete = eligible AND guardian valid if needed AND waiver signed/not required AND paid/covered.

## Bounded verification plan

Five critical paths, with at most two fix passes after first full review:

1. Adult, no-match recovery, missing COC and inactive facilitator: desktop, approved/denied accounts, validation and keyboard.
2. Family guardian plus two children: individual fees, sizes, signatures, linkage, separate tickets and duplicate protection.
3. Parent-away teenager: save incomplete, parent mobile signing, return to complete ticket; only same-browser storage synchronization is promised.
4. Money: both price dates, Pending later receipt, pre-covered and requested coverage, $100 overpayment, negative pool, scoped reports and cash-close variance.
5. Public/mobile and role access: 390px event/waiver/ticket, no directory or Covered leakage, venue link, QR decode, reload persistence/reset and desktop reports.

Screenshots establish visible layout only. Model tests establish arithmetic and invariants; browser actions establish actual flow behavior. Production security, live messaging and multi-device sync are Not applicable to this fake-only prototype.
