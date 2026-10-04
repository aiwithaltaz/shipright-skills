# Skills catalog — ShipRight

**Status: Public draft (v0.5.0-draft).**
**Tagline:** Context before generate. Product before pixels.

## How to choose a skill

1. Read current instructions and relevant project context. State the depth: Quick fix, Focused improvement, New surface or New product. Help draft missing sections; block only commitments that depend on unresolved facts or decisions.
2. If context is partial → run **light intake** (0–5 questions sized by depth, with separate **you decide** and **let me decide** choices). See `skills/_shared/intake.md`.
3. Rough idea, new product or a feature list with no clear "why" → `product-design` in **Frame product** mode (premises, narrowest version, Small / Full / Different, then stop)
4. Need the five docs written → `product-design` in **Doc set** mode, one doc at a time
5. Need **what the product should do** (flows, states, edge cases) → `product-design` (8-check decision gate at handoff)
6. Need **how screens should look and behave**, design-system direction, DESIGN.md import or export, or a **build handoff pack** → `ui-ux-design` (10-check pre-flight at handoff)
7. Need a **review** of a specification, screenshot, prototype or built app, a plan score, a copy detect pass, a pre-launch product audit, or a screenshot check → `ux-critique` (10-check audit for the named stage)
8. Wrong decision found in critique → go back to `product-design`, not only visual polish

## Shared rules (all skills)

Read `skills/_shared/intake.md` and `skills/_shared/operating-contract.md`.
Ask only material unanswered questions, as decision cards. Zero is valid. "You decide" delegates within scope. "Let me decide" reserves the choice. Blank answers are unresolved.

Statuses: Pass, Fail, Not verified, justified Not applicable, with artifact/version, stage and evidence. A ticket or owner does not resolve a failure. A stage-critical failure is a Blocker. Verdicts: Re-decide, Fix first, Needs decision (D#), Not established, Ready for [stage]. Start with a progress line. Then the verdict and next action. Then one "In plain words" line. Show gate tables only at handoff or when readiness is requested.

Optional design preferences: [select a personal-taste profile](personal-taste/README.md). [Altaz's profile](personal-taste/altaz.md) is available on request; its presence does not change other users' defaults or override an approved design system.

## Catalog

| Skill | Use when… | Gate | Do not use when… | Entry |
|-------|-----------|------|------------------|-------|
| **product-design** | Framing a product; premises and three approaches; flows, states, handoff; drafting the five docs | **8-check decision gate** | Pure pixel polish or color-only tasks | `skills/product-design/SKILL.md` |
| **ui-ux-design** | Layout, hierarchy, components, accessibility, references, DESIGN.md, UI copy, build handoff pack | **10-check pre-flight** | Inventing product strategy or scope | `skills/ui-ux-design/SKILL.md` |
| **ux-critique** | Review a specification, visual artifact or implementation; plan review; copy detect; product audit | **10-check audit** | When no reviewable artifact or plan is supplied | `skills/ux-critique/SKILL.md` |

## Optional references (loaded only when the depth or task calls for them)

| Reference | Skill | When |
| --- | --- | --- |
| `doc-set.md` | product-design | User asked to draft the five docs |
| `decision-checklist.md` | product-design | Premises, narrowest version, Small / Full / Different, before screen jobs |
| `operational-flows.md` | product-design | Staff tasks, related objects, prerequisites, pending work and cash allocation |
| `operator-workspaces.md` | ui-ux-design | Useful operator hierarchy, contextual help and per-person progress |
| `requirements-and-feedback.md` | ux-critique | Requirement completeness and feedback-to-skill learning |
| `opportunity-research.md` | product-design | New product depth, only if the user agrees |
| `references-and-design-system.md` | ui-ux-design | New surface / New product, Preserve mode, DESIGN.md import or export |
| `ui-copy.md` | ui-ux-design | Headlines, buttons, errors, or a copy detect pass |
| `plan-review.md` | ux-critique | User asked to score a plan before build |
| `build-handoff.md` | ui-ux-design | Approved specs going to Claude Design, Figma, Cursor, Claude Code, Codex, Antigravity or VS Code agents |
| `bounded-verification.md` | ux-critique | A built result exists and the user wants it checked |

## Recommended workflow order

```text
relevant context + depth
  → light intake (0–5 Qs if needed, separate delegation/user choice)
  → product-design: Frame product (premises, three approaches, stop) → user approves
  → product-design: Doc set, only if the user asks, one doc at a time
  → product-design: flows + states (+ 8-check gate at handoff)
  → ui-ux-design: screen specs (+ 10-check pre-flight at handoff)
  → ux-critique: specification review
  → ui-ux-design: build handoff pack
  → build tool makes the screens
  → ux-critique: critique + bounded verification of the actual result
```

Do not invent facts or approved scope. Missing documents allow provisional help; unresolved consequential decisions block the affected commitment. Written plans and implemented behavior require different evidence.

## Example prompts

### A) Frame a product

> Use the product-design skill. I have a rough idea: [one sentence]. No docs yet. Frame the product first. Stop before screens.

### A2) Write the docs

> Use the product-design skill, Doc set mode. The frame is approved. Draft the five docs one at a time.

### B) Product design

> Using the product-design skill and our approved frame, specify the “invite teammate” flow: happy path, fail path, state table, open questions. Give me the handoff verdict.

### C) UI/UX design and build handoff

> Using the ui-ux-design skill and our approved screen specs, make the build handoff pack for Cursor.

### D) UX critique and verification

> Using the ux-critique skill, check these desktop and mobile screenshots against the approved screen job and states. Give me the verdict first.

## Skill versions (draft)

| Skill | Pack version |
|-------|----------------|
| product-design | 0.5.0-draft |
| ui-ux-design | 0.5.0-draft |
| ux-critique | 0.5.0-draft |

---

*Public draft — skills.md — ShipRight*
