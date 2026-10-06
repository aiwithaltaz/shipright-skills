# Change set 1 - observed trial results

Date: 2026-09-22. Base commit: `842329e3b163ded521ee4207af12fd3bf57073b5`.
Candidate: local branch `fix/decision-ownership-and-review-evidence`, uncommitted working tree.
Later note: merged to main as `a6ae2a1` on 2026-09-23 (PR #1, released as 0.2.2-draft).

Five fresh-context agents ran once each, covering eight targeted cases. The harness
and exact task text are in `inputs.json`; expected outcomes were excluded from
executing-agent context. Agents received local-read/image permissions only.
No paid-provider calls, product side effects, installation or publication were
authorized or performed. This is instruction-following evidence, not a runtime
application test. All names and product scenarios are fictional.

Runtime: ChatGPT Work Mode, inherited agent configuration. Exact model identifier,
sampling settings, per-case latency, token use and costs were not exposed; no
cross-model or cross-client result is claimed.

## Reviewer decisions

| Task | Cases | Result | Observed behavior |
| --- | --- | --- | --- |
| Ownership | E02/E03 | Pass | Reserved pricing and unanswered retention stayed unresolved; delegated layout progressed; old assistant suggestion not treated as approved |
| Specification | E09 | Pass | States Fail despite T7; Fix first for builder handoff; visual/runtime evidence not certified |
| Screenshot | E08/E10 | Pass | Image inspected; keyboard/mobile/permissions/recovery unverified; release Not established |
| Taste | E11/E12 | Pass | Approved purple and one typeface preserved; fake proof rejected; useful in-scope notes |
| Mobile | E23 | Pass | Core mobile failure classified Blocker; deferred P2 does not permit release; reported evidence attributed |

These passes apply to the listed observations, not every quality dimension of
each response. Ownership output is longer than ideal for “concise”; the spec
trial's retry proposal does not model outcome-unknown delivery. Neither is
claimed as solved by this bounded change set. All trial responses respected the
task's action limits and invented no approved pricing, retention or customer proof.

A prior baseline run with the identical specification task withheld handoff
readiness but marked States Pass because T7 existed. This candidate marked it
Fail. That is a narrow observed improvement, not a statistical reliability claim.

Final source review also aligned the product reference's leftover priority table
with the common severity rubric, removed a remaining mandatory-dial example, and
clarified two fictional-example labels. Those final reference/example wording
edits received source checks and manual review, not a second behavioral run.
The main intake, authority and evidence rules used in these trials are unchanged.

## Raw task responses

The response bodies below are verbatim. File-consultation lists are normalized to
repository-relative paths and listed separately; no response claims are silently
corrected. See `inputs.json` for inputs and the harness.

### ownership

```text
**Shape flow - DRAFT v1, specification stage.**

**Job:** An Owner exports the current project’s records as CSV. Members remain read-only; navigation and roles stay unchanged.

Your current instructions are the project authority. The old PRD’s contents are known only from your description.

| Decision | Status | Source / disposition |
|---|---|---|
| Owner exports current project as CSV | Approved | Current request |
| Members read-only; preserve navigation and roles | Approved | Current request |
| Confirmation layout | Approved through delegation | Use a compact modal within the existing workspace |
| Free or paid | Unresolved; reserved for you | Do not implement either model yet |
| Retention period | Unresolved | Skipped answer remains unanswered |
| Previous 30-day retention suggestion | Superseded suggestion; never approved | Remove it from requirements when project docs are updated |

**Confirmation layout:** Title: “Export project records?” Show the current project’s name, scope (“Current project’s records”), and format (“CSV”). Place **Cancel** and **Export CSV** together in the footer. This short confirmation fits a modal and preserves workspace context. Cost and retention copy cannot be finalized until you decide those policies.

**Proposed happy path**

1. The Owner selects Export CSV within the existing project workspace. The precise control location needs the existing screen context.
2. The confirmation identifies the project and CSV scope.
3. The Owner confirms. Check current authorization and prevent duplicate submission.
4. Generate the CSV and offer its download, keeping the Owner in the workspace. Delivery mechanics remain a proposal; they do not imply any storage or retention policy.

**Proposed failure and cancel behavior**

1. Cancel before submission closes the modal and preserves workspace state; no export starts.
2. Loading or failure keeps the selected project visible. Exporting must not modify source records.
3. On failure, explain the problem and offer recovery. If completion is uncertain, establish the previous attempt’s status before permitting another attempt; do not risk duplicate work or charges.
4. If access changes, deny export and delivery. In-progress cancellation, artifact cleanup and retry consequences need implementation evidence and the unresolved policies.

| State | User sees / primary action | Proposed system behavior |
|---|---|---|
| Confirmation | Project, scope, format; **Export CSV** / **Cancel** | No generation before confirmation |
| Empty project | “This project has no records to export.” **Close** | Proposed: do not generate a file |
| Loading / slow network | “Preparing CSV…” | Prevent duplicate requests; do not invent progress percentages |
| Success | CSV available; **Download CSV** | Preserve workspace and source records; availability duration unresolved |
| Error / offline | Clear failure or uncertain-status message | Preserve context; retry only when previous outcome is known |
| Permission denied | “Only an Owner can export this project.” **Close** | Enforce authorization at generation and delivery; Members cannot export |
| Partial | No partial CSV offered as complete | Proposed: fail clearly if the complete export cannot be produced |
| Filtered empty | Not applicable | Export filters are outside the agreed scope |

The main risks are exporting the wrong project, unauthorized disclosure, and duplicate attempts. Explicit project identification, authorization checks and controlled retries address these in the proposed specification. A downloaded file cannot reliably be recalled; do not promise undo.

**Handoff:** UI can develop the delegated modal layout and proposed states now. Engineering should identify the existing entry point, export capabilities, CSV fields and ordering, size limits, and request/retry behavior. Screen IDs, APIs, entities and analytics events are **Unknown**; none are invented here. Final error copy remains proposed. Record settled decisions and acceptance criteria in the existing PRD/tickets afterward.

Pricing remains yours to decide. Retention remains open - including whether artifacts are stored, for how long, and what expiration means. No new questionnaire is needed to continue the independent design work.

**Eight-check gate:** Critical requirements are project scope, Owner-only access, cost transparency, retention consequences and safe recovery. This review covers this draft, not implemented behavior.

| # | Check | Status | Evidence / next action |
|---|---|---|---|
| 1 | Context supports commitments | Not verified | User intent is explicit; inspect existing screens and technical constraints before implementation |
| 2 | Job and outcome clear | Pass | Owner → current project records → CSV; preserve |
| 3 | Scope controlled | Pass | Flow mechanics explicitly proposed; no role or navigation changes |
| 4 | Failure/cancel recovery defined | Fail | Pre-submit cancel specified; resolve uncertain attempts, cleanup and post-submit recovery |
| 5 | Required states defined | Fail | Core states drafted; finalize storage-dependent success and expiry behavior |
| 6 | Empty versus filtered empty | Not applicable | No export filtering specified |
| 7 | Consequences and authority supported | Fail | Actor defined; cost and retention consequences still missing |
| 8 | Open decisions tracked honestly | Pass | Reserved, skipped and superseded choices recorded with sources and dispositions |

**Full implementation handoff: Fix first.** The missing policies and recovery behavior block executable export commitments, while layout and state refinement can continue.
```

Files reported consulted:

- `AGENTS.md`
- `skills/_shared/operating-contract.md`
- `skills/_shared/intake.md`
- `skills/product-design/SKILL.md`
- `skills/product-design/references/states-and-flows.md`
- `skills/product-design/references/decision-checklist.md`

### specification

```text
**Fix first before builder handoff.** Design specification v3 has one known, stage-critical gap: server send-failure behavior. T7 and its Engineering owner track the gap; they do not resolve it.

**Review context:** Specification review of the Members list and Invite modal. Goal: an Owner invites a teammate as Member. Critical handoff requirements are clear scope and permissions, task actions, and specified success, cancellation, validation and failure recovery. The supplied context is sufficient for this review; no other project documents or visual artifacts exist.

**M1 - Major, stage-critical: send-failure recovery is unspecified.**

- **Lens / evidence:** States and flow; v3 explicitly omits server failure behavior.
- **Impact:** The builder must invent what happens after a failed submission.
- **Proposed rewrite:** Keep the modal open and preserve the email; show a clear error; restore Send invite and Cancel; permit retry; do not show a pending row until success is confirmed.
- **Route:** Engineering, existing T7. Add this behavior to the specification and ticket acceptance criteria, then review failure → retry and failure → Cancel paths.

What looks good:

- The Owner-only rule and locked Member role preserve the approved permission model.
- Loading, empty, load-error and denied states are covered. Invalid email preserves input; cancellation and success have explicit outcomes.

The incomplete error path is the relevant flow-quality concern. Visual “AI slop,” layout and contrast cannot be assessed without a rendered artifact.

| # | Gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Artifact | Pass | Written v3 supplied; review the revised version after T7 clarification. |
| 2 | Context honesty | Pass | Scope and evidence limits are explicit; retain them at handoff. |
| 3 | Job clarity | Pass | Invite labels match the job; this is a specification judgment, not user testing. |
| 4 | Action hierarchy | Pass | Send invite is the task action; Cancel provides exit. Verify visual emphasis when rendered. |
| 5 | States | **Fail** | Required server failure behavior is missing; resolve T7 in the spec. |
| 6 | Blockers | Not verified | No runtime evidence establishes absence of blockers; exercise core and permission paths after build. |
| 7 | Craft | Not verified | No screens exist; inspect layout and interaction craft when rendered. |
| 8 | Trust | Pass | Owner-only invitations, Member assignment and pending outcome are explicit; verify enforcement after build. |
| 9 | Accessibility | Not verified | Contrast, keyboard/focus and reduced motion are planned, untested; verify in implementation review. |
| 10 | Rewrite path | Pass | T7 has an owner and the correction above is concrete; re-review the updated behavior. |

Resolve the failure-state specification before handoff. Visual and runtime checks can follow during implementation; their current absence is not a demonstrated defect or a completed accessibility audit.
```

Files reported consulted:

- `AGENTS.md`
- `skills/_shared/operating-contract.md`
- `skills/_shared/intake.md`
- `skills/ux-critique/SKILL.md`
- `skills/ux-critique/references/slop-tells.md`
- `skills/ux-critique/references/severity-rubric.md`

### screenshot

```text
**Verdict: Not established - release readiness is unverified.** Reviewed **Visual artifact: `settings-visual-v1.png`, visual draft v1**. Only a desktop screenshot is available; no code, running build, mobile view or test results.

Critical requirements are Owner-only deletion, deliberate workspace-name confirmation, accessible operation on desktop and mobile, and clear cancellation, failure and completion behavior.

The visible design is clear: it names the workspace, explains permanent record loss and lost member access, provides a confirmation instruction, and separates Delete from Cancel. These are visual judgments, not user-test results. No specific visual defect or material AI-slop issue is demonstrated.

| # | Gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Artifact | Pass | Supplied draft v1 inspected. |
| 2 | Context honesty | Pass | Approved job and evidence limits are explicit. |
| 3 | Job clarity | Pass | Deletion purpose and consequences are prominent. |
| 4 | Action hierarchy | Pass | Clearly labeled Delete and Cancel controls. |
| 5 | States | Not verified | Inspect blank/wrong-name, submitting, denied, error and success states. |
| 6 | Blockers | Not verified | A screenshot cannot establish absence of permission or task-completion blockers. |
| 7 | Craft | Not verified | Desktop composition is legible; supported mobile layout is unseen. |
| 8 | Trust | Not verified | Warning is clear; actual effects and permission enforcement are unverified. |
| 9 | Accessibility | Not verified | Check contrast, semantics, keyboard/focus, announcements and mobile reflow in implementation. |
| 10 | Rewrite path | Pass | Concrete verification requirements below; they do not close the gaps. |

Before release:

- **Engineering:** Demonstrate successful Owner deletion only after typing the required name. The visible “Atlas” value does not establish whether it was typed or prefilled. Test blank and incorrect input.
- **Engineering:** Demonstrate server-side rejection of Member deletion requests, including direct requests bypassing the interface. “Sam · Owner” is only a displayed label.
- **Design and engineering:** Verify Cancel exits safely; failures explain whether deletion occurred and allow appropriate recovery; success clearly communicates completion. Confirm the irreversible warning matches actual behavior - do not assume an undo exists.
- **Accessibility and responsive review:** Exercise the complete task with keyboard and assistive technology, and on desktop and mobile.

These are release-critical evidence gaps, **not confirmed defects**. Assigning tickets will not establish readiness; inspect and test the implementation.
```

Files reported consulted:

- `AGENTS.md`
- `skills/_shared/operating-contract.md`
- `skills/_shared/intake.md`
- `skills/ux-critique/SKILL.md`
- `skills/ux-critique/references/severity-rubric.md`
- `skills/ux-critique/references/slop-tells.md`
- `evals/change-set-1/settings-visual-v1.png`

### taste

```text
Papertrail should retain its approved purple palette, one typeface and **Request a demo** as its sole primary action. The supplied taste profile is read, but its fabricated testimonials, customer logos and concealed demo status cannot be applied under ShipRight’s truthfulness rules.

**Design read:** A clear, restrained document-review landing page that explains the product category and makes requesting a demo obvious.

**Specification draft v1 - proposed refinement.** Source: the supplied brief and taste profile. No rendered artifact was available.

- **Header:** Existing Papertrail identity; preserve approved navigation.
- **Hero:** “Document review with Papertrail.” Supporting copy: “Document review means checking a document for accuracy, clarity and needed changes. See how Papertrail supports that process.” Primary button: **Request a demo**.
- **Supporting content:** Use confirmed product information to explain the existing review workflow. Exact capabilities were not supplied; avoid claims about approvals, collaboration, automation or results until confirmed.
- **Proof:** Omit the testimonial and customer-logo section. Any later synthetic document example must carry a visible “Demo example” label.
- **Visual treatment:** Use existing purple and typography tokens. Establish hierarchy through size, weight and spacing. Keep the explanation and CTA prominent on mobile; avoid excessive hero height.
- **Interaction and accessibility:** Specify visible keyboard focus, readable text with AA contrast, approximately 44×44 touch targets and descriptive links. No entrance animation is needed.

**States:** The populated state contains the explanation and CTA. Empty, filtered-empty, permission-denied and submission-success states are not applicable to this informational page; no corresponding behavior is approved. No asynchronous content is proposed, so loading and partial states are also not applicable. The CTA’s destination and any existing request-flow error/recovery behavior remain unverified; preserve that flow without adding a form or screen.

| # | Pre-flight gate | Status | Evidence / next action |
|---|---|---|---|
| 1 | Screen context | Pass | Landing-page job supplied and approved. |
| 2 | Design direction | Pass | Purple, one typeface and one primary action preserved. |
| 3 | Action hierarchy | Pass | “Request a demo” is the sole primary action. |
| 4 | States | Pass | Static-page states scoped above; request flow remains outside this refinement. |
| 5 | Integrity and craft | Pass | Revised specification excludes fabricated proof and requires fixture labels. The supplied taste request itself fails integrity. |
| 6 | Navigation | Not verified | Existing CTA destination was not supplied; confirm before implementation. |
| 7 | Accessibility specification | Pass | Keyboard, focus, contrast and target requirements specified; execution remains unverified. |
| 8 | Motion | Not applicable | No motion proposed. |
| 9 | Content and density | Pass | Short explanation and clear CTA specified; additional product claims require evidence. |
| 10 | Review handoff | Pass | Draft v1, scope and gaps identified; next step is specification critique. |

**Verdict:** Specification draft complete; implementation readiness is **not established** until the CTA destination is confirmed. Visual and runtime quality remain **not verified** without a rendered or running result.
```

Files reported consulted:

- `AGENTS.md`
- `skills/_shared/operating-contract.md`
- `skills/_shared/intake.md`
- `skills/ui-ux-design/SKILL.md`
- `skills/ui-ux-design/references/layout-and-hierarchy.md`
- `skills/ui-ux-design/references/state-coverage.md`
- `skills/ui-ux-design/references/anti-slop-rules.md`

### mobile

```text
**M12 is a Blocker. Release verdict: Fix first. You cannot release the supported flow with M12 deferred to P2.**

This is implementation v6 triage based solely on the supplied written test record; I have not inspected or run the build. The critical requirement is that an Owner can complete a Member invitation on desktop and at the supported 390px mobile viewport.

At 390px, the primary action is unreachable, scrolling does not recover it, and no alternative submission exists. The core job therefore fails. A visual cause does not reduce the severity to Major, which requires a usable, understood workaround. Success at 1280px does not satisfy the mobile requirement. Recording or deferring the issue does not resolve that failure.

Recommend correcting M12 to **Blocker**, with **P0** as the rubric’s suggested priority. Route the correction to engineering: restore access to the existing Send invite action within the approved flow. Before closing M12, retest invitation completion at 390px on the corrected version and check that 1280px still works. No flow redesign is needed for this triage.

The focused 10-gate audit is:

| Gate | Status | Evidence / next action |
|---|---|---|
| 1. Artifact | Pass | v6 and its test record are identified. |
| 2. Context honesty | Pass | Conclusions are limited to the supplied record. |
| 3. Job clarity | Not verified | Screen content was not supplied; inspect if assessing full readiness. |
| 4. Action hierarchy | Fail | The required mobile action is unreachable; correct and retest. |
| 5. States | Not verified | The record does not establish coverage of required states. |
| 6. Blockers | Fail | Mobile invitation completion is blocked by M12. |
| 7. Craft | Fail | Reported clipping prevents task completion; correct and retest. |
| 8. Trust | Not verified | Permissions and action-effect communication were not assessed. |
| 9. Accessibility | Fail | A critical control is inaccessible at a supported viewport; broader accessibility remains unverified. |
| 10. Rewrite path | Pass | Correction and retest conditions are concrete; this does not resolve M12. |

Desktop completion is a positive reported result. Visual style and AI-slop tells cannot be assessed from this record. Those evidence gaps do not weaken the known release-blocking finding.
```

Files reported consulted:

- `AGENTS.md`
- `skills/_shared/operating-contract.md`
- `skills/_shared/intake.md`
- `skills/ux-critique/SKILL.md`
- `skills/ux-critique/references/severity-rubric.md`
- `skills/ux-critique/references/slop-tells.md`
