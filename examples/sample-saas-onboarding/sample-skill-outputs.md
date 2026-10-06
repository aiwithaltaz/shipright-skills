# Sample outputs: invite teammate

**Status: DRAFT; fictional teaching example, not an observed model run.**
**Pack:** ShipRight
**Actual sources:** `filled-01-prd-excerpt.md` and the inline specification v1 below. Docs 02–05 and any generated UI are absent.

## 0. Decision ownership

**User:** “Work on Owner invites with the fixed Member role. You decide the layout. Let me decide invitation expiry. I have not answered the delivery/retry question.”

**Agent:** “I recommend a Members list with an Invite modal within that scope. Expiry remains your decision. Delivery/retry behavior is unresolved; I can outline independent UI work but cannot mark the send behavior ready.”

| Choice | Status | Source |
| --- | --- | --- |
| Owner initiates invite; invitee role Member | Approved for this fictional exercise | User instruction above |
| Members list + Invite modal | Approved through delegated layout choice | User delegation above |
| Expiry | Unresolved; reserved to user | User instruction above |
| Delivery/retry behavior | Unresolved | Unanswered question; silence is not approval |

No existing answers are asked again. The agent does not decide expiry or mark a default approved.

## 1. Inline specification v1

**Job:** Owner invites a coworker as Member and sees pending status.

**Current slice:** Members list and Invite modal. No search or filters. The PRD's later resend/join behavior is not specified by this slice. No email is actually sent by this document.

1. Owner opens Members; existing pending/active records are shown.
2. Owner opens Invite modal, enters email; role is displayed as fixed Member.
3. Invalid email shows an inline error and preserves the value.
4. Valid submit enters a busy state and prevents duplicate activation.
5. On confirmed request acceptance, close the modal and show a pending invitation. Pending is not proof of delivery or acceptance by the invitee.
6. Cancel before submission closes without creating an invitation.
7. A non-Owner opening Invite sees a denied message and Back.

**Known gap:** Send failure and outcome-unknown timeout have no specified recovery. Illustrative ticket T7 assigns this to Engineering; this file is its only record and no ticket system is implied.

| State | Specified behavior |
| --- | --- |
| Empty | No other teammates yet; Invite teammate action |
| Loading | Busy form prevents duplicate activation |
| Success | Pending row after confirmed request acceptance |
| Error | Validation preserves input; send failure/timeout behavior is missing |
| Permission denied | Owner-only message and Back |
| Filtered empty | Not applicable: no filtering in this slice |

### Product decision gate

**Stage:** Specification v1; **next step:** complete builder handoff. Scope, access/effects and send recovery are critical. Unknown implementation details are not established facts.

| # | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| 1 | Relevant context | Pass | The PRD excerpt and user instruction support this slice; unresolved expiry and delivery are recorded as open, not assumed |
| 2 | Job/outcome | Pass | Job stated above |
| 3 | Scoped path | Pass | Two named surfaces and fixed Member role |
| 4 | Failure/cancel | Fail | Cancel/validation defined; send failure and timeout are not; T7 records the gap but does not resolve it |
| 5 | Required states | Fail | Missing send-error behavior; assigning T7 does not resolve it |
| 6 | Filtered empty | Not applicable | No filter requirement; do not add one |
| 7 | Consequential actions | Fail | Expiry and uncertain send/retry consequences remain unresolved; invitation can lead to workspace access and external delivery |
| 8 | Open decisions | Pass | User-reserved and unanswered choices recorded above; this does not clear their blockers |

**Verdict:** Fix first. Send recovery is missing regardless of any user decision; expiry (user-reserved) also remains open. Layout work independent of those gaps can remain provisional.

## 2. UI specification notes

**Direction:** A clear Members list and focused Invite form. Use the approved product tokens when available. No tokens or visual artifact have been supplied, so palette, contrast and rendering are not verified. Numerical dials add no useful evidence here.

**Members:** Title, explanation, Invite teammate action, empty or populated list.
**Invite:** Email, fixed Member label, Send invite, Cancel, inline error region.

### UI pre-flight

**Stage/artifact:** Specification v1 plus the notes above; **next step:** decided UI handoff. State/recovery and access requirements are critical.

| # | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| 1 | Screen context | Pass | Delegated layout and scope are recorded; no assumed doc 04 |
| 2 | Direction | Pass | Two focused surfaces support the job; no dials required |
| 3 | Actions | Pass | Invite teammate, Send invite and Cancel have clear roles |
| 4 | State UI | Fail | Send recovery UI depends on unresolved T7 |
| 5 | Integrity/craft | Pass | These written notes claim no fake metrics or invented destinations; rendering is not assessed |
| 6 | Navigation | Pass | Only the specified Members/Invite surfaces |
| 7 | Accessibility spec | Fail | Keyboard entry, containment, return focus and error announcement need acceptance requirements |
| 8 | Motion | Not applicable | No animation specified |
| 9 | Content/density | Not verified | No rendered layout or realistic-content review exists |
| 10 | Review handoff | Pass | This version, sources and gaps are identified; it is ready to critique, not ready to build or release |

**Verdict:** Fix first for a decided handoff. Useful critique can proceed now.

## 3. UX critique

**Artifact:** Actual written specification v1 above, not a generated screen.
**Stage:** Specification. **Next stage:** builder handoff.
**Critical requirements:** Supported job, access/consequences, failure recovery and implementable accessibility behavior.

**B1 - Blocker (specification stage): send recovery is unspecified.** T7 is recorded, not resolved. Specify retained input, persistent effects and recovery. Distinguish confirmed failure from outcome unknown before retrying. Define when another request is safe; do not promise delivery or cost behavior without evidence. Route: product-design + Engineering.

**B2 - Blocker (specification stage): accessibility behavior is underspecified.** Define modal entry/focus return, keyboard actions and error announcements. Later verify them in the actual implementation. Route: ui-ux-design + Engineering.

Both are Blockers because they fail stage-critical requirements for builder handoff. They describe incomplete specifications, not observed runtime harm.

### Critique audit

| # | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| 1 | Artifact | Pass | Written specification v1 is supplied in this file |
| 2 | Context honesty | Pass | Only the PRD excerpt and inline spec are claimed |
| 3 | Job clarity | Pass | Heuristic reading: Owner invites Member; no user testing claimed |
| 4 | Actions | Pass | Named actions match the stated job |
| 5 | States | Fail | Send failure/timeout missing; T7 does not make it Pass |
| 6 | Blockers | Fail | B1 and B2 are open |
| 7 | Visual craft | Not verified | No rendered screen supplied |
| 8 | Trust/consequences | Fail | Spec does not yet establish expiry and safe uncertain-send handling |
| 9 | Accessibility | Fail | Planned behavior incomplete; implementation is also Not verified |
| 10 | Rewrite path | Pass | B1/B2 describe corrections and retest requirements; neither issue is closed |

**Verdict:** Fix first. Review the corrected specification once B1/B2 and reserved decisions are resolved. A later rendered/runtime result needs its own evidence. Do not mark corrected checks Pass until that corrected artifact exists.
