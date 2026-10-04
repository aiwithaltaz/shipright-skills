# 04 — Frontend Specification Document

**Status: Template (ShipRight v0.5.0-draft).**
**Pack:** ShipRight  
**How to use:** Record approved screens, navigation, components, states and design direction before generating UI. The **ui-ux-design** skill follows approved entries here and compiles them into a build handoff pack. Skills may help draft a provisional screen specification. Do not treat proposed screens as approved; unresolved consequential decisions block the affected commitment.

**Product / feature name:** <!-- write here -->  
**Author:** <!-- write here -->  
**Date:** <!-- write here -->  
**Version:** <!-- write here -->  
**Related PRD jobs:** <!-- e.g. J1, J2 -->  

---

## 1. Purpose

What the frontend must support for this release (one short paragraph).

<!-- write here -->

## 2. Navigation & information architecture

### Primary nav (approved)

List only real destinations. Do not let AI invent extra nav items.

| Label | Destination / route | Who sees it (roles) |
|-------|---------------------|---------------------|
| <!-- --> | <!-- --> | <!-- --> |

### Entry points into this feature

- From: <!-- write here -->
- Deep link / URL pattern: <!-- write here or UNKNOWN -->

### Exit points

- After success go to: <!-- write here -->
- Cancel / back goes to: <!-- write here -->

## 3. Screen inventory

| Screen ID | Name | Screen job (one sentence) | Objects shown | PRD job | Priority |
|-----------|------|---------------------------|---------------|---------|----------|
| S1 | <!-- --> | <!-- what the user gets done here --> | <!-- from PRD 1d --> | J? | P0 |
| S2 | <!-- --> | <!-- --> | <!-- --> | J? | |

### Per-screen brief (copy one block per screen)

#### Screen: <!-- S1 name -->

- **User goal on this screen:** <!-- write here -->
- **Primary action:** <!-- write here -->
- **Secondary actions:** <!-- write here -->
- **Content / data shown:** <!-- write here -->
- **Components used:** <!-- write here -->
- **States required:**  
  - [ ] Empty  
  - [ ] Loading  
  - [ ] Success / populated  
  - [ ] Error  
  - [ ] Permission denied  
  - [ ] Partial data  
  - [ ] Filtered empty (vs true empty)
- **Current object/person and remaining work (if multi-step):** <!-- -->
- **Review/edit summary and pending-state actions:** <!-- -->
- **Always visible vs accessible help:** <!-- -->
- **Notes / constraints:** <!-- write here -->

## 4. Component inventory (feature-level)

| Component | Used on screens | Behavior notes |
|-----------|-----------------|----------------|
| <!-- e.g. Invite form --> | S1 | <!-- --> |
| <!-- e.g. Member table --> | S2 | <!-- --> |

Reuse existing design-system components when listed:

<!-- write here: link or name of design system / Figma library -->

## 5. Design tokens and direction

Mode: [ ] **Preserve** (existing product, record what is actually in use) [ ] **Establish** (new product, small Proposed set until approved). See `skills/ui-ux-design/references/references-and-design-system.md`.

Export Approved or Proposed tokens to `DESIGN.md`. Omit Unknown values. Do not invent a hex. See `06-design-md.md`. In Preserve mode, do not change URLs, primary nav labels, form field names or order, the logo, or legal copy unless that item is explicitly approved.

- **Feeling (one line):** <!-- e.g. calm, precise, trustworthy -->
- **Reference products/sites (1–2, with what to borrow):** <!-- write here -->

Do not invent a new visual language if one exists.

| Token area | Source of truth | Notes |
|------------|-----------------|-------|
| Color | <!-- Figma / CSS vars / UNKNOWN --> | <!-- --> |
| Type | <!-- --> | <!-- --> |
| Spacing | <!-- --> | <!-- --> |
| Radius / elevation | <!-- --> | <!-- --> |
| Motion | <!-- --> | Prefer reduced-motion safe |

**Integrity and craft:** [ ] No fabricated proof or inaccessible critical controls. Evaluate visual choices against approved brand and task requirements.

## 6. Copy & content rules

- **Voice / tone:** <!-- write here -->
- **Language(s):** <!-- write here -->
- **Forbidden phrases:** <!-- e.g. “Delightful experience” -->
- **Error copy owner:** <!-- write here -->

## 7. Accessibility requirements

- [ ] Text contrast usable (aim WCAG AA)
- [ ] Keyboard reachable primary actions
- [ ] Focus visible
- [ ] No hover-only critical actions
- [ ] Touch targets ~44×44 where relevant
- [ ] Meaning not by color alone
- [ ] Icons: meaningful, consistent and accessibly labeled

## 8. Responsive / breakpoints

| Breakpoint | Layout notes |
|------------|--------------|
| Mobile | <!-- --> |
| Tablet | <!-- --> |
| Desktop | <!-- --> |

## 9. Analytics events (names only)

| Event name | When fired | Properties (no PII) |
|------------|------------|---------------------|
| <!-- --> | <!-- --> | <!-- --> |

## 10. Open questions

| Question | Blocks UI? | Status |
|----------|------------|--------|
| <!-- --> | Y/N | open |

## 11. Ready check

- [ ] Nav approved (no mystery items)
- [ ] Screen inventory complete for P0
- [ ] States checked per P0 screen
- [ ] Tokens / design system pointed to (or UNKNOWN)
- [ ] Every P0 screen has a one-sentence screen job
- [ ] Ready for **ui-ux-design** skill — then **ux-critique** — then the build handoff pack

---

*Template — docs/04-frontend-spec.md*
