**Mode: Shape flow · Depth: Focused improvement.**

Keep the approved staff-operated desk and shape it around one working hire record: identified people, equipment assigned to each user, training evidence, item fees and payments. Offer a separate **Pay outstanding balance** entry. The flow below is a design proposal within your approved scope; the consequential questions concern identity, training and financial policy, not approval of the outcome again.

**Job:** A desk operator identifies the customer and each equipment user, verifies the required training, records item charges and cash accurately, and releases only eligible equipment - or settles an existing balance on a later visit.

Approved requirements are those in your brief. Interaction and recovery choices below are proposed. No implementation or existing system capabilities have been verified. Online booking, marketing and payment services remain outside scope.

### Practical flow

1. **Choose the task: New hire or Pay outstanding balance.** The latter opens the saved charge and payment history directly; it does not start another hire.
2. **Find the person you have in front of you.** Search by membership number, name or phone. Show enough permitted information from those approved fields to distinguish matches. A search match is a candidate, not proof of identity; confirm the correct person using the desk’s identity policy. Shared names or phone numbers must not automatically merge people or establish a relationship. A failed membership search should offer name/phone lookup before a new record is considered.
3. **Set the people involved.** For self-hire, use the same person as customer and equipment user. For someone arranging hire for others, link the sponsor and each separately identified user. Start from either the sponsor or a known user and find the counterpart in context. Reuse both existing records; adding a sponsor–user relationship must not create another person. If no record exists, offer in-context creation only if staff are authorized to create it; that permission is unresolved in D1. Do not infer that the sponsor is the debtor or trained equipment user.
4. **Assign equipment and resolve training.** Each equipment row belongs to one user and has its own fee. As soon as an item is selected, show the required training and whether its evidence is valid, missing, stale or unavailable. Display the evidence source and last check where available. When recent training is confirmed by a supervisor, record the identified supervisor, what training they confirmed and when, supporting evidence/reference required by policy, plus the signed-in staff member who recorded it and the recording time. A free-text name or generic “verified” checkbox cannot establish authority. Keep that confirmation distinct from the original training record; do not assume staff may edit the source. Missing or unresolved training blocks the affected release and offers **Record supervisor confirmation**, **Recheck evidence** where supported, or **Save work for later**.
5. **Review fees and record cash.** List each item, its user and fee once, with total charges, prior payments and remaining balance. Separate cash tendered, amount applied to the balance and change returned. For example, with 35 due and 50 tendered, apply 35 and return 15. Excess cash is not automatically a credit, donation or extra fee. Make the allocation explicit when one payment covers several items or people. Show a final **Record cash payment** action with the amount applied and change; save one payment and its allocations, then show the resulting balance and payment reference. Partial payments and release while money remains due depend on D3.
6. **Release with a final check.** Show exactly which items are being released to which users and recheck their required training immediately before **Record release**. Apply the settled payment policy as a separate condition. Saving a hire, recording payment and recording release are separate results; none implies the others. Preserve ready work when another user is blocked. Whether a group can be released in parts is a D2 policy decision.

### Alternate starts and return visits

| Starting situation | Known state | Missing dependency | Next permitted action | Preserved work | Completion condition | Evidence needed |
|---|---|---|---|---|---|---|
| Membership number unavailable | Name or phone supplied | Correct identity | Search alternatives; disambiguate | Search input | Correct existing person selected | D1 identity check |
| Sponsor found first | Existing sponsor | Identified users and links | Find each user; link existing records | Sponsor selection | Every item has an identified user | Confirmed person selections and relationship |
| User found first | Existing user | Sponsor, if applicable | Find and link sponsor; or choose self-hire | User selection | Correct arrangement recorded | Confirmed role choices; no duplicate person |
| Both people exist | Separate records | Relationship for this hire | Link them in context | Both original records | Correct relationship attached | Explicit operator selection |
| Training not established | Person and equipment selected | Valid required training | Obtain authorized confirmation, recheck, or save | People, equipment and draft fees | Required training established before release | Training evidence or attributable supervisor confirmation |
| Return only to pay | Saved outstanding charge | Payment and allocation | Open balance; record cash | Original hire, fees and prior payments | Payment recorded once; remaining balance accurate | Payment reference, staff actor, amount, allocations and change |

A payment-only visit does not require fresh training or equipment selection. If the customer also wants equipment released, take that separate action through the release checks. If a previously blocked hire resumes, recheck affected training and current item/fee information before claiming it is ready; do not replay completed payments.

### Failure, correction and cancellation

1. **Ambiguous or missing person:** retain the search and selected participants; refine the search or follow the authorized new-person route. Never silently choose the first match or duplicate a record.
2. **Training missing, expired or unreadable:** explain the specific affected user/item and the recovery action. Preserve the draft; do not treat a failed refresh or a recorded request for confirmation as eligibility.
3. **Slow connection, failed save or uncertain payment result:** retain entered values and show whether the action is pending, failed or confirmed. Disable repeated submission while pending. After an uncertain response, retrieve the recorded result before retrying; the retry must not create a second payment or release. If cash has already changed hands, flag the transaction for reconciliation rather than telling staff it was simply cancelled.
4. **Change a user or equipment item:** re-evaluate the affected training and fee calculation. Preserve unrelated work. Recorded payments remain in the payment history; changing a draft must not silently erase them or rewrite a released hire.
5. **Leave the flow:** offer **Save work and leave** or **Discard unsaved changes**. Confirm discarding material unsaved work. Neither action reverses saved payments or releases. Those need an explicit authorized correction path, whose permissions are unresolved in D3.

### Relevant states

| State | Operator sees | System behavior / primary action |
|---|---|---|
| Empty hire | No people or items added yet | **Find a person**; do not imply the entire customer database is empty |
| Search has no matches | No matches for the entered name, number or phone | Preserve query; **Edit search** or choose an approved alternate identifier |
| Loading | Which lookup, evidence check or save is pending | Preserve completed sections; prevent double submission |
| Populated / saved | Identified people, item rows, training status and amounts | Offer the next unfinished action; label **Saved**, **Paid** and **Released** independently |
| Training blocked | A specific requirement and reason | **Resolve training** or **Save for later**; affected release disabled |
| Partial data | Available details plus the section that failed | Retry only the failed section; do not release where required evidence is unavailable |
| Error | Inline field issue, or a clear save/retrieval failure | Keep input; **Correct** or **Retry safely** |
| Permission denied / session expired | The action cannot be completed by this staff session | No unauthorized effect; sign in again or use the established authorized staff route without exposing restricted records |
| Balance settled | Payment recorded and balance zero | Show payment history; prevent another payment against an already settled balance |

### Consequential questions

- **D1 - Identity and records, unresolved; desk policy owner:** What identity check is required when membership number is absent or matches are ambiguous, and may operators create a genuinely missing person record? This determines lookup completion and the no-record recovery path.
- **D2 - Training and release, unresolved; training/desk policy owner:** What training and recency rules apply to each equipment type, which supervisors may confirm it, and what evidence must be retained? May eligible members of a group receive their equipment while another member remains blocked? This determines the release gate and the scope of a supervisor confirmation.
- **D3 - Liability and cash, unresolved; desk policy owner:** Who owes each charge when a sponsor arranges hire; are partial payment and release with an outstanding balance permitted; and who may correct a posted payment or release? This determines allocation, unpaid release and recovery after a consequential mistake.

The highest-impact mistakes are selecting the wrong person, releasing equipment without valid training, and recording cash twice. Inline identity/training checks, an explicit release summary and recoverable payment submission address these in the proposed design. Policy questions remain open; the approved desk outcome does not.

For subsequent design work, use the flow, states and D1–D3 as the brief. Existing screen IDs, record APIs, access rules and persistence capabilities are unknown; they must be mapped before implementation. This is a flow proposal, not a build-readiness or runtime-verification claim.
