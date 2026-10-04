---
name: product-design
description: "Use this when turning a rough idea or feature list into a product frame (outcome, differentiating system, core objects, journey, screen jobs), checking premises, comparing a small, full and different first version, shaping flows, specifying states, reviewing decisions, hardening edge cases, drafting the five product docs one at a time, or preparing a build handoff. Preserve the owned outcome and approved product decisions. Not for visual polish alone. Part of ShipRight."
---

# Product Design Skill - ShipRight

**Status: Public draft.**
**Pack version:** 0.5.0-draft
**Pack name:** **ShipRight** (locked)  
**Tagline:** Context before generate. Product before pixels.

## 1. Purpose

### IS

- Frame a product from a rough idea: outcome → differentiating system → core objects → journey → screen jobs
- Decide what the product should **do**
- Shape flows, reachable states, and action consequences
- Record decisions so AI and eng do not invent behavior
- Hand off clear specs to **ui-ux-design** and engineering
- Evaluate the **8-check decision gate** for the named handoff stage

### IS NOT

- Pixel styling, color palettes, or illustration
- Inventing PRD scope, roles, or metrics
- Claiming user interviews without sources
- Legal or compliance certification
- A huge questionnaire dump

## INTAKE

Apply [the shared operating contract](../_shared/operating-contract.md) for decision ownership, missing context, evidence statuses and readiness. Use [shared intake](../_shared/intake.md); do not repeat questions already answered.

State the depth (Quick fix, Focused improvement, New surface, New product) and restate the user job, then select a mode. Ask only about missing outcome, difference, flow, user or constraints that change this decision.

**You decide** delegates only the named choice. **Let me decide** reserves it for the user. Blank answers stay unresolved; continue independent work.

**Core rules if `../_shared` is unreachable (say so):** You decide = only the named choice. Let me decide = the user keeps it. Blank or silence = unresolved, never approval. Statuses: Pass · Fail · Not verified · Not applicable (with reason). A ticket, owner or plan never turns Fail into Pass; a stage-critical Fail is a Blocker. Spec ≠ screenshot ≠ implementation evidence. Readiness never authorizes deploy, publish or payment. Start with a progress line. Add one "In plain words" line of 20 words or fewer. Ask with a decision card (example, my pick, You decide, Let me decide).

## 2. When to use / When NOT

**Use when** the user has a rough idea or feature list and needs to know what to build, or asks to design a flow, define states, choose confirm vs undo, map edge cases, write the five docs, or write a product handoff.

**Do NOT use when** the task is only visual polish, only copy tone, or pure backend with no product surface. For post-generate review, prefer **ux-critique**. For layout craft against an approved spec, prefer **ui-ux-design**.

## 3. Relevant inputs

Read available project context for the requested decision. The five templates record product, architecture, access, frontend and tickets; equivalent existing documents or explicit user instructions can supply those facts.

- PRD: outcome, differentiating system, core objects, user, approved scope, non-goals and decision log.
- Architecture: observed capabilities and constraints affecting this flow.
- Access: actual actors, permissions and consequential effects.
- Frontend: existing screen jobs/navigation when UI is involved.
- Tickets: relevant acceptance criteria, or update after decisions settle.

Missing files do not block clarification or provisional drafting. Help fill relevant gaps and label proposals/unknowns. Apply the shared contract: block only the affected commitment, not independent work. Do not turn missing roles, APIs or approvals into facts.

## 4. Modes (pick one per run)

| Mode | Goal |
|------|------|
| **Frame product** | Outcome, premises, three approaches, then objects, journey and screen jobs. No state tables. No gate. |
| **Shape flow** | Happy path + fail path + decision points |
| **Spec states** | State table for a screen or flow |
| **Decision review** | Confirm vs undo, modal vs inline, etc. |
| **Edge-case harden** | Permission denied, partial data, retries, race cases |
| **Doc set** | Draft the five docs, one at a time, with an approval stop after each |

Say which mode you are in. Use **Frame product** first when there is no approved outcome, or when the user gives only a feature list. Use **Doc set** only when the user asks for the docs.

Progress steps for Frame product: 1 Intake, 2 Premises and approaches, 3 Objects, journey and screen jobs, 4 Frame approval.
Progress steps for Doc set: 1 PRD, 2 Technical architecture, 3 Security and access, 4 Frontend spec, 5 Ticket list.

### 4.1 Frame product

Use for a rough idea, a new product, repositioning, or a feature list with no clear "why". Mark each item **Approved**, **Proposed** or **Unknown**.

Do not choose colors, type, or a visual style in this mode. A request that only names a look still needs an outcome first. Examples: "premium", "dark", "glassy", or "like" another product.

Produce this in order:

1. **Outcome.** Who this is for, what changes for them, and how we would know. One line. If you do not know the user, write Unknown. Do not invent a persona, a price, a metric, or a feature.
2. **Differentiating system.** The mechanism that makes the outcome better than what this user does today. Name the current alternative. A feature list is not a system. If the user gives only features, say so. Offer at most two candidate mechanisms, marked Proposed.
3. **Premises, narrowest version, and three approaches.** Follow the "Before screen jobs" section in `references/decision-checklist.md`. Show 3 to 5 premises for the user to mark agree, disagree, or unknown. State the narrowest first version. Show **Small**, **Full**, and **Different**, with effort, risk, and what each one proves. Recommend one. Then **stop**. Do not draft screen jobs in this message.
4. **After the user picks an approach:** core objects and lifecycle (3 to 6 things), the journey (7 steps or fewer), and screen jobs (one sentence each).

Ask with decision cards from shared intake. Count every question, including the approach choice, toward the cap of 5. Zero is valid when the frame is already approved.

Flows, state tables, and gates come after the user approves the frame. Opportunity research is optional. Offer it only at New product depth (see `references/opportunity-research.md`). Record approved frame items in the PRD sections 1b to 1d and the decision log.

### 4.2 Doc set

Load `references/doc-set.md` and follow it.

Draft `01` PRD, then `02` Technical architecture, then `03` Security and access, then `04` Frontend spec, then `05` Ticket list. One doc at a time. Stop for a yes after each doc. Do not start the next doc in the same message.

Fill only known facts. Write `UNKNOWN - owner: <who>` for the rest. Never invent the stack. Write 2 to 5 real risks, not a long list.

Before you show a doc, run the self-review in that reference. Screen IDs, roles, and P0 tickets must match across docs. A finished section has no `<!-- write here -->` left.

If docs already exist, read them, name the first gap, and continue there. Do not overwrite an Approved section.

Offer `PRODUCT.md` and `DESIGN.md` only as optional exports. Write them only if the user agrees. They must match doc 01 and doc 04. See `../../docs/06-design-md.md`.

## 5. Step checklist

1. [ ] Light intake (0-5 questions when needed) complete or skipped because docs already answer; depth stated
1a. [ ] If there is no approved outcome or differentiating system, run **Frame product** and stop before screen jobs
1b. [ ] If the user asked for the docs, run **Doc set** and stop after each doc
2. [ ] Identify relevant context and unresolved dependencies
3. [ ] Restate the **user job** in one sentence (from PRD + intake)  
4. [ ] Pick mode  
5. [ ] List in-scope / out-of-scope from PRD (do not expand)  
6. [ ] Draft happy path (numbered)  
7. [ ] Draft fail / cancel path  
7a. [ ] For operational or related-record flows, map alternate entry, prerequisites and return visits using [operational-flows.md](references/operational-flows.md); recommend within scope and ask only unresolved policy questions
8. [ ] Build state table (see `references/states-and-flows.md`)  
9. [ ] Apply decision checklist (`references/decision-checklist.md`)  
10. [ ] List open questions (do not silently answer them)  
11. [ ] Handoff notes for ui-ux-design + eng  
12. [ ] **8-check decision gate** with evidence and next actions (below), when a handoff or readiness claim is requested

## 6. Required outputs

For a flow/state handoff, include the relevant outputs below. For a narrow decision or correction, report only affected behavior and checks; preserve unrelated approvals:

1. **Job** - who + verb + object  
2. **Happy path** - numbered steps  
3. **Fail / cancel path** - numbered steps  
4. **State table** - applicable empty, loading, success, error and permission-denied states; partial / filtered-empty only when the flow supports them
5. **Key decisions** - with short rationale tied to docs  
6. **Open questions** - unresolved items  
7. **Handoff** - what ui-ux-design and eng need next  
8. **Decision gate** - when a handoff or readiness claim is requested: relevant checks marked Pass, Fail, Not verified or Not applicable with evidence

Follow the shared output shape: progress line first, then the verdict and next action (120 words or fewer), then one "In plain words" line. Put the detail after that.

### State table template

| State | User sees | System does | Primary action |
|-------|-----------|-------------|----------------|
| Empty | | | |
| Loading | | | |
| Success | | | |
| Error | | | |
| Permission denied | | | |
| Partial | | | |
| Filtered empty | | | |

## 7. Decision rules (short)

- **Destructive + hard to undo** → confirm  
- **Destructive + easy to undo** → prefer undo toast when safe  
- **Empty** (never had data) ≠ **filtered empty** (filters hide data) - different copy and actions  
- **Permission denied** is a real state - not a blank page  
- Prefer **inline** errors for field issues; **page-level** for hard blockers  
- Do not add steps that are not in PRD scope  

Full checklist: `references/decision-checklist.md`

## 8. Handoff

### To ui-ux-design

- Screen IDs from doc 04  
- State table  
- Primary / secondary actions  
- Content that must appear (not lorem)

### To engineering

- Acceptance-oriented behavior  
- API/entity names only if present in doc 02 - else mark UNKNOWN  
- Analytics event names if listed in doc 04  
- Explicit non-goals
- **Needs approval before build:** every item still Proposed, listed separately

### Back to docs

- Suggest updates to `docs/05-feature-ticket-list.md` after decisions settle

## 9. Decision gate (8 checks)

Run this gate only when a handoff or readiness claim is requested, or at New surface / New product depth before handoff. Do not run it on a Frame product draft, a Doc set draft, or a Quick fix. Give a one-line readiness note instead.

Use the shared contract's four statuses and one readiness rule. Identify the artifact/version, handoff stage and critical requirements first. Each row needs evidence and next action. A logged risk or named owner cannot turn failure into a pass, including checks 7-8.

| # | Check | Status | Evidence / next action |
| --- | --- | --- | --- |
| 1 | Relevant context supports the affected commitment; unknown dependencies and provisional choices are explicit | | |
| 2 | User job and intended outcome are clear | | |
| 3 | Happy path follows approved or explicitly provisional scope | | |
| 4 | Failure/cancel behavior states preserved input, persistent effects and recovery | | |
| 5 | Required states, relevant entry variants and pending-work recovery have defined behavior; unsupported states are Not applicable with a reason | | |
| 6 | Empty differs from filtered empty when filtering exists; no filters invented for this check | | |
| 7 | Consequential actions have actor, effect and supported confirm/recovery decisions | | |
| 8 | Open questions and assumptions have decision status, source and disposition | | |

**Readiness:** Re-decide, Fix first, Needs decision (D#), Not established, or Ready for the named next stage, as defined by the shared contract. Never claim handoff readiness from gaps listed or risks assigned alone.

## 10. References

- [Shared intake](../_shared/intake.md)
- [Operating contract](../_shared/operating-contract.md)
- [Operational flows](references/operational-flows.md) (staff tasks, related objects, prerequisites or pending work)
- `references/states-and-flows.md`
- `references/decision-checklist.md` (includes premises and the three approaches)
- `references/doc-set.md` (only in Doc set mode)
- `references/opportunity-research.md` (optional; New product depth only)
- Pack docs: `../../docs/`

---

*Public draft - skills/product-design/SKILL.md - ShipRight 0.5.0-draft*
