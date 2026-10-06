**Fix first. The current implementation is not ready.** The owner’s correction establishes three requirements that v1 does not meet. Draft specification v2 records the intended correction; it does not repair v1 or establish a tested replacement. Next, trace these requirements into the bounded build handoff, implement them when authorized, and verify the affected scenarios on the resulting version. The eight old passes and the builder’s visual opinion cannot clear these failures.

## Critique summary

- **Depth:** Focused improvement - equipment-hire handoff.
- **Artifacts and evidence:** Implementation v1 and draft specification v2, as described in the supplied evidence packet. No source, screenshots, specification text, or test details were independently inspected.
- **Stage and next step:** Assess implementation readiness for operational use; identify what the revised handoff must establish.
- **Job:** Help staff find the customer, complete outstanding payment without restarting completed work, and handle cash according to the payer’s instruction.
- **Stage-critical requirements:** Approved customer lookup routes; resumption of only the unpaid step; correct allocation and return of surplus cash, with explicit consent for donation.
- **Docs available:** Partial. The packet reports that v2 incorporates the correction; its complete acceptance criteria and the eight historical test cases are unavailable.
- **Authority:** Today’s explicit owner correction supersedes the conflicting v1 requirements. These decisions do not need reopening.

## Three separate judgments

| Dimension | Judgment | Evidence and limit |
|---|---|---|
| Flow | **Fail** | v1 permits membership-number lookup only and restarts the full wizard for an outstanding balance. Both contradict the current requirements. |
| Visual design | **Not verified** | “Looked professional” is the builder’s reported screenshot judgment. No visual artifact is supplied for this review; it establishes neither usable hierarchy nor accessibility. |
| Scenario coverage | **Insufficient for readiness** | Eight historical tests reportedly passed, but their cases and assertions are unknown. They do not demonstrate coverage of the corrected requirements. Revised behavior has no implementation or test evidence. |

## Findings

### B1 - Blocker: Unsupported approved lookup routes

- **Lenses:** Flow, clarity, states.
- **Evidence:** v1 searches only by membership number; the owner requires approved name and phone fields too.
- **Impact:** Staff cannot use the required alternatives to locate a customer.
- **Correction and retest:** Carry the exact approved fields into the handoff; retain membership lookup and add the approved alternatives. Exercise each supported route. Specify and verify usable no-match and ambiguous-match handling without inventing broader access or identity policy.
- **Route:** Engineering; product-design only for any genuinely unresolved lookup policy.

### B2 - Blocker: Returning staff must repeat the wizard

- **Lenses:** Flow, states.
- **Evidence:** v1 restarts the full wizard to collect an outstanding balance.
- **Impact:** A supported return visit cannot follow the required unpaid-step-only path.
- **Correction and retest:** Open the existing hire at its unpaid step. Verify that prior valid work remains available and is not unnecessarily recollected; complete payment, then revisit the record to check that the completed payment is reflected correctly. Preserve any existing, still-valid new-hire coverage.
- **Route:** Engineering.

### B3 - Blocker: Surplus cash becomes an unauthorized donation

- **Lenses:** Trust, action effects, states.
- **Evidence:** Entering $100 for an $80 hire automatically creates a $20 club donation.
- **Impact:** v1 allocates the payer’s money contrary to the owner’s explicit rule.
- **Correction and retest:** Return surplus unless the payer explicitly chooses donation. Show and verify the distinction between cash tendered, hire amount, change returned, and authorized donation. For this case, no donation instruction means **$100 = $80 hire + $20 returned + $0 donation**; explicit instruction to donate the full surplus means **$100 = $80 hire + $0 returned + $20 donation**. Verify both displayed results and the recorded allocation.
- **Route:** Engineering and copy; the owner’s policy is already decided.

## Scenario evidence to obtain

These are retest conditions, not completed tests:

| Scenario | Current evidence | Required next evidence |
|---|---|---|
| Locate by membership number | Capability reported; specific test evidence unavailable | Trace to an applicable existing test or exercise it on the revised version. |
| Locate by approved name; locate by approved phone | Known absent in v1 | Separate evidence for each approved route, including matching and recovery behavior. |
| Return to an existing hire with a balance | Known incorrect restart in v1 | Direct unpaid-step entry, preserved earlier work, and successful balance completion. |
| Exact cash amount | Not verified | Correct hire allocation with neither invented change nor donation. |
| $100 tendered for an $80 hire; no donation instruction | Known incorrect allocation in v1 | $20 returned and no donation recorded. |
| Same surplus; payer explicitly chooses donation | Not verified | Authorized donation amount recorded accurately and visibly. |

Retain the eight old results as historical v1 evidence. Inspect their assertions before deciding which remain applicable; supersede only conclusions dependent on changed requirements. Never relabel old passes as v2 results.

## AI-slop tells and what is working

The packet supports concern about an incomplete task model and an unauthorized action effect. It does not support claims about gradients, typography, decoration, or other visual tells. The owner has supplied concrete corrections, and v2 reportedly captures them; that is useful specification progress. Historical tests may still provide regression value within their demonstrated scope.

## 10-gate ship audit

| # | Gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Artifact | Pass | v1 and draft v2 are explicitly identified in the packet; direct inspection remains unavailable. |
| 2 | Context honesty | Pass | This review separates reported behavior, proposed behavior, builder opinion, and missing verification. Preserve these labels in the handoff. |
| 3 | Job clarity | Not verified | The staff job is clear in the request; screen-level comprehension is unknown. Inspect task labels and entry points. |
| 4 | Action hierarchy | Fail | The implemented return path requires a full restart contrary to the current task. Correct it; separately inspect visible action priority. |
| 5 | States | Fail | Required alternative lookup and return states are not supported in v1. Trace and exercise the revised scenarios. |
| 6 | Blockers | Fail | B1–B3 remain unresolved in implementation. Fix and retest before readiness. |
| 7 | Craft | Not verified | No visual artifact supplied. Inspect the revised screens for hierarchy, content, and interaction defects. |
| 8 | Trust | Fail | Automatic donation contradicts the payer-authority requirement. Verify allocation and visible consequences. |
| 9 | Accessibility | Not verified | Neither screenshots nor exercised keyboard/focus evidence supplied. Verify the critical flow on supported inputs and devices. |
| 10 | Rewrite path | Pass | Concrete corrections and retest conditions are recorded here. Their existence does not clear B1–B3. |

## Reusable learning record

**Source/date:** Owner correction in the supplied packet, 2026-09-25.

**Observed problem → corrected product requirement:** v1 models only one lookup route, repeats completed work on return, and silently allocates excess cash. For this product, use the approved name/phone alternatives, resume only the unpaid step, and return surplus unless donation is explicitly requested.

**Reusable lesson:** Review requirements against material starting conditions and return visits, preserve valid completed state, and require explicit authority for consequential allocations. Selected passing tests establish only their tested scope; corrected specifications are not corrected implementations.

**Scope distinction:** The approved identity fields and cash-return policy belong to this product’s brief. They are not universal rules for every product. No visual preference was supplied, and no new owner policy decision is required to resolve the three stated failures.

**Proposed skill/reference change:** In `ux-critique/references/requirements-and-feedback.md`, add a compact evidence trace pattern: **current requirement → material scenario → artifact/version → observed result → invalidated historical conclusion**. Its purpose is to make the existing principle operational, not add equipment-hire policy to the general skill. Record the old requirements as superseded in the existing product decision record and verify the portable v2 handoff carries the current ones.

**Proposed regression case:** A fictional service workflow has passing historical tests, a favorable builder screenshot opinion, and a corrected draft describing alternate identification, pending-step resumption, and user-authorized surplus allocation, but no revised build. Expected critique: **Fix first**, separate flow/visual/coverage judgments, retain applicable historical evidence, mark new behavior unverified, and record a general lesson without universalizing the service’s specific policies.

This review records the proposed lesson and correction path only. No implementation, repository edit, publication, or new test run was performed.
