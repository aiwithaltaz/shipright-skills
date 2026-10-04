---
name: ui-ux-design
description: "Use this when designing or refining a screen, interaction, layout or UI specification from product context, setting design-system direction, importing or exporting DESIGN.md and PRODUCT.md, writing UI copy, analyzing reference sites, preparing build prompts for Claude Design, Figma, Cursor, Claude Code, Codex or similar tools, or making a focused visual correction. Preserve approved decisions and the existing design system when present. Part of ShipRight."
---

# UI/UX Design Skill - ShipRight

**Status: Public draft.**
**Pack version:** 0.5.0-draft
**Pack name:** **ShipRight** (locked)  
**Tagline:** Context before generate. Product before pixels.

**Anti-slop** here means hard gates that block generic AI UI - not the product name.

**Related packs (ideas, not text):** Taste Skill, Impeccable, UI UX Pro Max and Hallmark focus on visual craft. ShipRight decides what each screen must do first, then gives any of those tools exact build inputs. We paraphrase principles; we do **not** copy their text or bundle their files.

## 1. Purpose + quality bar

Design screens and UI structure that match **approved product context**, cover real states, stay accessible, and avoid AI visual slop.

### IS

- Brief inference (don’t over-ask) then craft
- Design dials: variance / motion / density
- Layout, hierarchy, spacing, type, component choices
- State-by-state UI notes
- Accessibility and anti-slop enforcement
- Hard **10-gate pre-flight** before a decided build handoff
- Annotated decisions an eng or generator can follow
- Optional reference analysis and design-system direction (Preserve or Establish)
- A **build handoff pack** for Claude Design, Figma, Cursor, Claude Code, Codex, Antigravity or VS Code agents

### IS NOT

- Inventing product scope, jobs, or nav
- Pricing / roadmap strategy
- Fake research
- A huge design questionnaire
- Logo / illustration art direction unless doc 04 asks for it

## INTAKE

Apply [the shared operating contract](../_shared/operating-contract.md) for decision ownership, missing context, evidence statuses and readiness. Use [shared intake](../_shared/intake.md); do not repeat questions already answered.

State the depth, then identify the screen, its job and existing design constraints. Ask about direction only if unresolved; do not reopen approved choices for a small correction. Use only a personal profile selected by the user or project instructions; follow [profile selection](../../personal-taste/README.md). A bundled profile is not automatically active. A selected profile can guide visual defaults, but cannot override current project decisions, truthfulness or accessibility.

**You decide** delegates only the named choice. **Let me decide** reserves it for the user. Blank answers stay unresolved; continue independent work.

**Product before pixels:** if the screen has no job yet (for example, "design me a premium dashboard" with no product), ask what the screen is for and stop. Do not choose tokens, hex values, or type scales before screen jobs exist. A named brand ("like Linear", "make it look like Stripe") is a pattern reference, not a brand to copy. See `references/references-and-design-system.md`. If the user insists on a look before the job exists, you may sketch a direction marked **Proposed / concept only**. It is not Ready. Do not write those hex values as approved.

**Core rules if `../_shared` is unreachable (say so):** You decide = only the named choice. Let me decide = the user keeps it. Blank or silence = unresolved, never approval. Statuses: Pass · Fail · Not verified · Not applicable (with reason). A ticket, owner or plan never turns Fail into Pass; a stage-critical Fail is a Blocker. Spec ≠ screenshot ≠ implementation evidence. Readiness never authorizes deploy, publish or payment. Start with a progress line. Add one "In plain words" line of 20 words or fewer. Ask with a decision card (example, my pick, You decide, Let me decide).

## 2. When to use / When NOT

**Use when** you have relevant product context and need UI structure, screen craft, direction, or “make this less AI” guidance before or during generate. Help draft missing context provisionally.

**Do NOT use when** the problem is “what should we build?” → **product-design** (Frame product). When reviewing an existing generate for findings → **ux-critique** (you may still fix craft after critique).

## 3. Context check

Use current product scope, screen jobs, access rules and implementation constraints from available project context. Docs 01-04 are templates for that context; 05 records tickets when ready.

Help draft missing sections provisionally. Do not invent approved screens or implementation capabilities. Block only the affected commitment when an unknown changes scope, access, cost or recovery; continue independent work. An approved user correction can supersede an older document.

## 4. Brief inference (don’t over-ask)

Before generating UI notes or prompts, infer direction from relevant context and any needed intake answers:

- Page / screen kind (app shell, marketing, form, dashboard, empty state)
- Audience and seriousness
- Brand assets / tokens already approved in doc 04
- Whether this is greenfield, preserve, or overhaul

Declare a **one-line design read**, for example:

> “Trust-first B2B onboarding checklist - calm, single column, one primary CTA, low motion.”

Do **not** default to generic purple SaaS, three equal feature cards, or mesh blob heroes.

## 5. Design dials (simple English)

The three **1-10** dials are optional communication aids. Use them only when they clarify an unresolved design choice; they are not evidence of quality or prerequisites for a focused correction. Existing product decisions take precedence over these starter defaults.

| Dial | Meaning | Low (1-3) | Mid (4-6) | High (7-10) |
|------|---------|-----------|-----------|-------------|
| **VARIANCE** | How experimental the layout feels | Centered, calm, predictable | Clear product UI with some asymmetry | Bold / asymmetric / editorial layouts |
| **MOTION** | How much animation | Mostly static; tiny hover only | Light transitions; respect reduced-motion | Richer motion - only if you will actually ship it |
| **DENSITY** | How much info per view | Airy, marketing / gallery | Balanced product screens | Dense dashboards / data tools |

**Starter baselines (infer, then adjust):**

| Signal from brief | VARIANCE | MOTION | DENSITY |
|-------------------|----------|--------|---------|
| Calm / editorial / minimal | 5-6 | 3-4 | 2-3 |
| Clear SaaS tool (default app UI) | 5-7 | 3-5 | 4-6 |
| Premium marketing / brand | 7-8 | 5-7 | 3-4 |
| Dense admin / ops dashboard | 4-5 | 2-4 | 7-9 |
| Trust-first / regulated / serious | 3-4 | 2-3 | 4-5 |

**Rules of thumb:**

- If using dials, explain the choices briefly; otherwise use a plain-language direction.
- If MOTION is high, the UI notes must describe real motion - or lower the dial.
- Always respect `prefers-reduced-motion`.
- Do not ask the user to edit skill files to change dials - override in conversation.

## 6. Design principles (simple English)

1. **One job per screen** - Match a PRD job; do not add side quests.  
2. **Clear action hierarchy** - Users should understand the next action for their current task.
3. **Hierarchy before decoration** - Type and spacing beat gradients.  
4. **States are part of the design** - Specify relevant empty/loading/error/success/denied behavior; explain genuine non-applicability.
5. **Truthful UI** - No fabricated proof or fake urgency; synthetic fixture data must be labeled.
6. **Consistency** - Reuse components and tokens from doc 04 (one accent, one radius system, one page theme).  
7. **Accessible by default** - Keyboard, focus, contrast, not color-only.  
8. **Respect product type** - Banking ≠ neon startup template; follow industry seriousness implied by PRD.  
9. **Product-specific craft** - Judge the approved palette and layout by purpose, hierarchy and accessibility; a color or pattern is not an automatic failure.

For staff tasks or related-record workflows, use [operator-workspaces.md](references/operator-workspaces.md) to make dependencies, per-person progress, review summaries and useful help concrete.

Deep layout rules: `references/layout-and-hierarchy.md`  
State UI rules: `references/state-coverage.md`  
Anti-slop and the count block: `references/anti-slop-rules.md`
UI copy: `references/ui-copy.md`

## 7. Required state coverage

For every P0 interactive screen, specify applicable UI states below. Use Not applicable with a reason where behavior does not exist; do not invent filters or roles to satisfy a checklist:

| State | Must include |
|-------|--------------|
| Empty | Message + one primary action |
| Loading | Skeleton or progress; no fake final numbers |
| Success / populated | Real content structure + primary action |
| Error | Cause + recovery action; keep user input when possible |
| Permission denied | Clear message + safe exit / request access |
| Filtered empty | Different from true empty |
| Partial | Show working parts; isolate failures |

Details: `references/state-coverage.md`

## 8. Layout / type / spacing / components

### Layout

- Start from content structure (title, explanation, primary action, supporting list/table/form)
- Prefer single column for forms and onboarding
- Use grids for collections only when comparison helps
- Avoid card-in-card nesting beyond one level
- Match VARIANCE: low = predictable; high = intentional asymmetry - not random clutter

### Type

- Clear H1 = screen purpose  
- Body readable; avoid long centered paragraphs  
- Buttons labeled with verb + object (“Invite teammate”, not “Submit”)

### Spacing

- Consistent spacing scale from tokens (doc 04)  
- Group related items; separate unrelated groups  
- DENSITY dial controls how tight groups feel  
- Do not use huge empty hero space that pushes the job below the fold without reason

### Components

- Prefer design-system components named in doc 04. For an existing product without a documented system, use **Preserve** mode in `references/references-and-design-system.md` before proposing anything new  
- If the brief clearly maps to a known system (Material, Polaris, Radix/shadcn, etc.), say so honestly - or label a web approximation  
- Standardize: buttons, inputs, tables, modals, toasts, empty states  
- Icons: prefer the approved system; evaluate meaning, accessible labels and consistency rather than rejecting a symbol solely because it is emoji.

## 9. Accessibility (non-negotiable checks)

- [ ] Text contrast aims for WCAG AA  
- [ ] Focus ring visible; never remove without replacement  
- [ ] Primary tasks completable by keyboard  
- [ ] No hover-only critical actions  
- [ ] Touch targets ~44×44 where touch matters  
- [ ] Errors announced with text, not color alone  
- [ ] Motion respects reduced-motion  

## 10. Integrity and visual judgment

Use [anti-slop-rules.md](references/anti-slop-rules.md). Truthfulness, meaningful action/cost disclosure and usable access to critical controls cannot be waived by docs or personal taste. Label synthetic fixtures; do not silently add unapproved scope.

Gradients, purple palettes, cards, blur, symmetry, emoji and a single font are visual choices, not automatic failures. Evaluate their product purpose, brand fit, hierarchy, accessibility and actual use. Explain the specific problem before recommending a change.

## 11. Workflow

1. [ ] Light intake (0-5 questions when needed) - or skip if docs + handoff already answer; depth stated
2. [ ] Load the selected personal-taste profile when available; without selection, keep project/pack defaults
3. [ ] Context check - what supports the requested commitment?
4. [ ] One-line design read; dials only if useful
5. [ ] Read PRD jobs + doc 04 screen inventory  
6. [ ] Confirm screen ID and primary action  
7. [ ] Draft **structure notes** (sections top → bottom)  
8. [ ] Specify each required state  
9. [ ] Apply layout, accessibility, the count block, and UI copy checks (`references/ui-copy.md`)  
10. [ ] Annotate decisions (why this layout; cite product context and any useful dials)
11. [ ] **10-gate pre-flight** (below) - statuses supported by evidence
12. [ ] Hand the specification to **ux-critique**, then update relevant tickets. Actual results need artifact/implementation evidence before release readiness.
13. [ ] When the user is ready to build, compile the **build handoff pack** (`references/build-handoff.md`) and bring the built result back for critique and verification.

## 12. Output format

Follow the shared output shape: progress line first, then the verdict, then one "In plain words" line. Use this body after that.

```text
## UI/UX design - [Screen ID / name]
Docs used: 01, 04, … (list gaps if any)
Personal taste loaded: yes/no
Job supported: …
Design read (one line): …
Dials, if useful: VARIANCE=N · MOTION=N · DENSITY=N (why…)
Review stage / artifact version / requested next stage: …

### Structure (top → bottom)
1. …
2. …

### Components
| Area | Component | Notes |
|------|-----------|-------|

### States
| State | UI | Copy direction | Actions |
|-------|----|----------------|---------|

### Tokens / visual
- Color:
- Type:
- Spacing:
- What we explicitly AVOID:

### A11y notes
- …

### Annotated decisions
- Decision → rationale (cite current context; dials only if useful)

### Open questions
- …

### 10-gate pre-flight
| # | Check | Status | Note |
|---|-------|-----------|------|
| 1 | … | | |
```

## 13. Pre-flight checklist (10 checks)

Run this gate only when a handoff or readiness claim is requested, or at New surface / New product depth before handoff. Quick fix: no gate table.

Evaluate readiness for the named specification/generation step using the shared contract. Use Pass, Fail, Not verified or justified Not applicable, with evidence and next action. A fix plan does not resolve a failed check. These checks do not certify a generated or running result.

| # | Gate | Criterion |
| --- | --- | --- |
| 1 | Screen context | Screen/job is approved or explicitly provisional; source is identified |
| 2 | Design direction | Direction fits user, content and approved constraints; dials optional |
| 3 | Action hierarchy | Actions support the user's task with meaningful labels |
| 4 | States | Relevant states have UI, feedback and recovery; no invented filters/roles |
| 5 | Integrity and craft | No fabricated proof or unapproved scope; visual judgments explain actual impact |
| 6 | Navigation | Destinations, exits and applicable step/object revisits follow current decisions and preserve valid work |
| 7 | Accessibility specification | Relevant keyboard/focus, contrast, non-color cues and reduced-motion requirements are specified; implementation remains separately unverified |
| 8 | Motion | Relevant motion has purpose and reduced-motion behavior; mark Not applicable when absent |
| 9 | Content and density | Realistic content ranges are specified and the planned hierarchy handles them; rendered density stays Not verified until a visual artifact exists; dials are not proof |
| 10 | Review handoff | Artifact/version, assumptions, unresolved issues and next stage are explicit |

Use the shared readiness rule across all ten checks: Re-decide, Fix first, Needs decision (D#), Not established or Ready for the named stage. Do not mark Ready from failed items merely listed with fix plans. Lead with the verdict and next action; put the table after it.

## 14. References

- [Shared intake](../_shared/intake.md)
- [Operating contract](../_shared/operating-contract.md)
- [Personal-taste profile selection](../../personal-taste/README.md) (optional; apply only the selected profile)
- [Operator workspaces](references/operator-workspaces.md) (staff and related-record tasks)
- `references/layout-and-hierarchy.md`
- `references/state-coverage.md`
- `references/anti-slop-rules.md`
- `references/ui-copy.md` (headlines, buttons, errors, Detect mode)
- `references/references-and-design-system.md` (optional; New surface / New product, existing-product Preserve mode, DESIGN.md import and export)
- `references/build-handoff.md` (when handing approved specs to a build tool)
- Pack docs: `../../docs/`

---

*Public draft - skills/ui-ux-design/SKILL.md - ShipRight 0.5.0-draft*
