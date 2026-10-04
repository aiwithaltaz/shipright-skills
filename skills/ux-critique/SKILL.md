---
name: ux-critique
description: "Use this when reviewing a product specification, screen, prototype or implementation for task clarity, states, trust, accessibility and decision drift, scoring a plan on Product, Design and Build lenses, detecting UI copy patterns by quoting the line, auditing an existing product before launch, or checking what a build tool actually built (screenshots, links, running apps). Distinguish what is specified, visible and verified. Part of ShipRight."
---

# UX Critique Skill - ShipRight

**Status: Public draft.**
**Pack version:** 0.5.0-draft
**Pack name:** **ShipRight** (locked)  
**Tagline:** Context before generate. Product before pixels.

## 1. Purpose

Review specifications, screens and flows for actionable UX findings. Use the existing **10-gate audit** with stage-appropriate evidence; only implementation evidence can support implementation readiness.

### IS

- Structured critique with severity
- Slop detection (generic dashboards, random gradients, happy-path-only, purple SaaS tells)
- Rewrite asks tied to docs when docs exist
- Countable ship gate - not vibes

### IS NOT

- A substitute for a missing PRD
- Fake personas or invented interview quotes
- Full visual redesign (hand to **ui-ux-design** after decisions are sound)
- Product strategy from scratch (hand to **product-design**)
- A huge questionnaire

## INTAKE

Apply [the shared operating contract](../_shared/operating-contract.md) for decision ownership, missing context, evidence statuses and readiness. Use [shared intake](../_shared/intake.md); do not repeat questions already answered.

Identify the artifact/version, review stage, user job and requested next step. Ask only when one of these is materially unclear; do not default a specification review to release certification.

**You decide** delegates only the named choice. **Let me decide** reserves it for the user. Blank answers stay unresolved; continue independent work.

**Core rules if `../_shared` is unreachable (say so):** You decide = only the named choice. Let me decide = the user keeps it. Blank or silence = unresolved, never approval. Statuses: Pass · Fail · Not verified · Not applicable (with reason). A ticket, owner or plan never turns Fail into Pass; a stage-critical Fail is a Blocker. Spec ≠ screenshot ≠ implementation evidence. Readiness never authorizes deploy, publish or payment. Start with a progress line. Add one "In plain words" line of 20 words or fewer. Ask with a decision card (example, my pick, You decide, Let me decide).

## 2. When to use / When NOT

**Use when** a written specification, mock, generated output, or coded UI exists and someone asks: review, critique, audit, find issues, is this shippable? Also use when a build tool has produced screens from a ShipRight build handoff pack: compare the result with the approved screen jobs and states. Also use when the user asks to score a plan, or to detect slop and UI copy patterns.

**Do NOT use when** there is no artifact to review - request the smallest relevant specification, screen or result. Use **product-design** if the user needs help shaping it. Do not use as pure brand illustration feedback.

## 3. Review evidence

Name Specification, Visual artifact or Implementation in the review header, with the exact artifact/version and requested next stage. A written flow is a reviewable specification. It is not a rendered or tested interface.

| Available input | Action |
| --- | --- |
| Artifact + relevant context | Evaluate against current decisions; identify unapproved deviations |
| Artifact + incomplete context | Review supported properties; mark affected product conclusions unknown rather than inventing scope |
| No artifact | Ask for the smallest relevant spec, screen or result; do not claim to have reviewed an imaginary attachment |

For operational-flow reviews or stakeholder feedback, use [requirements-and-feedback.md](references/requirements-and-feedback.md). Check whether the specification covers the real task as well as whether the implementation matches it.

Read the shared contract before scoring. Missing evidence is Not verified, not an automatic Fail or Pass.

## 4. Critique lenses

Work through each lens. Skip a lens only if truly N/A and say why.

1. **Clarity** - Can a new user tell what this screen is for in 5 seconds?  
2. **Flow** - Are steps necessary? Dead ends? Missing back/cancel?  
3. **Hierarchy** - Is the primary action obvious? Is noise competing?  
4. **States** - Empty / loading / error / success / denied present and distinct?  
5. **Trust** - Honest copy? Scary permissions explained? No dark patterns?  
6. **Accessibility** - Contrast, focus, keyboard, not color-only, touch size?  
7. **AI slop tells.** See `references/slop-tells.md`. Fill the count block on every screen review. If the artifact has UI sentences, run Detect mode and quote each line. Integrity problems auto-fail. A visual tell does not.

## 4b. Plan review (optional)

When the user asks to score a plan, a frame, or a doc set before build, load `references/plan-review.md` and follow it.

Score Product, Design, and Build from 0 to 10. For each lens, one sentence says what a 10 would have. Ask one decision card per lens under 8. A high score is not Ready.

This block does not replace the 10-check audit. Skip it on a quick fix, and when there is no plan.

## 5. Severity rubric

Use `references/severity-rubric.md`. Short form:

| Severity | Meaning | Ship rule |
|----------|---------|-----------|
| **Blocker** | Stops the job, causes harm, major access failure, **or fails any stage-critical requirement** | Do not pass this stage |
| **Major** | Noncritical: substantial friction with a usable, understood workaround | Record impact and explicit disposition |
| **Polish** | Visual/copy nits that do not block the job | Backlog OK |

## 6. Output format

Follow the shared output shape: progress line first, then the verdict and next action (120 words or fewer), then one "In plain words" line. Then findings, then the audit table. At Quick fix depth, skip the table.

**Product audit (existing product).** When the user wants an existing product improved, modernized, or ready for launch, put this block above the findings. List colors and type you can see as **Observed**, with the source. Write Unknown when you cannot see the value. Keep a brand color the user named, including purple. In Preserve mode, proposed changes are a ticket list. Do not write code in the audit. Do not rename URLs, navigation labels, form fields, the logo, or legal copy unless the user approves that item.

```text
## Product audit - [scope]
Top 3 problems (by user impact, not fix difficulty):
1. …
What's working (keep it):
- …
Root cause behind several problems:
- …
Patch or rethink: [one honest call + why]
```

Audit one lane per session (one flow, one screen, or one dimension). Do not reopen approved decisions; route a wrong decision to product-design.

```text
## Critique summary
- Artifact/version:
- Stage and requested next step:
- Critical requirements for this stage:
- Intake goal:
- Docs available: yes/partial/no (list gaps)
- Verdict: Re-decide / Fix first / Needs decision (D#) / Not established / Ready for [stage]
- Next action (one line):

## Findings
### B1 - [Blocker] Title
- Lens:
- Evidence:
- Impact:
- Rewrite ask:
- Route: product-design / ui-ux-design / eng / copy

### M1 - [Major] ...
### P1 - [Polish] ...

## Count it
Fill every line from `references/slop-tells.md`. A count is evidence. Only integrity auto-fails.

## Detect
Quote each UI sentence that matches a pattern. Name the pattern. Skip this block only when the artifact has no sentences.

## AI-slop tells spotted
- ...

## What looks good
- (honest; 2-5 bullets)

## 10-gate ship audit
| # | Gate | Status | Evidence / next action |
|---|------|--------|------------------------|
| 1 | … | | |

## Next steps
1. ...
```

### Rewrite ask quality

Bad: “Make it nicer.”  
Good: “Replace gradient hero with brand token background from doc 04; keep one primary CTA - Invite teammate.”

## 7. What never to invent

- Fake user quotes (“Users said…”) without sources  
- Fake metrics (“this will lift conversion 20%”)  
- New features to “engage” users not in PRD  
- Legal conclusions  

If research is needed, say **unknown - needs research**, do not fabricate.

## 8. Routing

| Finding type | Route to |
|--------------|----------|
| Wrong flow / wrong decision / missing job | **product-design** |
| Layout, hierarchy, visual slop, a11y craft, dials/pre-flight | **ui-ux-design** |
| Permissions / roles wrong | doc **03** + product-design |
| Ticket / AC update | doc **05** |

## 9. Audit (10 checks; evidence for the named stage)

Run the table when a readiness claim is requested or at a handoff. For a Quick fix, give a one-line readiness note instead.

Use the shared contract's four statuses and readiness rule. Define critical requirements before scoring. Every relevant check needs evidence and next action tied to the artifact/version in the header. A finding, owner or ticket never substitutes for meeting the requirement. Defer only noncritical work, with explicit disposition; the check remains Fail or Not verified as appropriate.

| # | Gate | Criterion |
| --- | --- | --- |
| 1 | Artifact | A real specification, screen or implementation is identified, not an assumed attachment |
| 2 | Context honesty | Claims are supported by available context; missing facts and scope limits are explicit |
| 3 | Job clarity | The artifact communicates its job; label heuristic judgment rather than claiming user testing |
| 4 | Action hierarchy | Primary/contextual actions serve the user's task and current product decisions |
| 5 | States | Required behavior and relevant entry/return variants are traced to stage-appropriate evidence; selected tests do not prove omitted scenarios; missing required behavior remains Fail when ticketed |
| 6 | Blockers | No unresolved Blocker in the reviewed scope; lack of evidence does not prove none exists |
| 7 | Craft | Specific hierarchy/content/interaction defects are addressed; visual evidence unavailable means Not verified |
| 8 | Trust | Cost, permissions, action effects and evidence are honest; taste cannot waive them |
| 9 | Accessibility | Evidence fits this stage; screenshots cannot verify keyboard behavior or implementation compliance |
| 10 | Rewrite path | Findings have concrete corrections and retest conditions; this does not resolve their underlying failures |

**Verdict:** Re-decide the affected premise; otherwise Fix first for a critical failure or open Blocker; otherwise Needs decision (D#) when the only open items are the user's own decisions; otherwise Not established for an unverified critical requirement; otherwise Ready for the named next stage with explicit noncritical dispositions. This applies to all ten checks. Readiness does not grant external-action permission.

## 10. Quality gate (skill completeness)

- [ ] Intake asked only material unanswered questions, at most five per round
- [ ] Review stage, artifact/version and context limits stated
- [ ] Each finding has severity + rewrite ask  
- [ ] No fake quotes  
- [ ] Slop lens considered  
- [ ] **10-gate audit** uses honest statuses and evidence
- [ ] Blockers clearly called out  

## 11. References

- [Shared intake](../_shared/intake.md)
- [Operating contract](../_shared/operating-contract.md)
- [Requirements and feedback](references/requirements-and-feedback.md) (operational flows or stakeholder corrections)
- `references/slop-tells.md` (count block, default looks, Detect mode)
- `references/plan-review.md` (optional; score a plan before build)
- `references/severity-rubric.md`
- `references/bounded-verification.md` (optional; implementation stage, screenshot and fix loop)
- UI copy rules: `../ui-ux-design/references/ui-copy.md`

---

*Public draft - skills/ux-critique/SKILL.md - ShipRight 0.5.0-draft*
