# 01 — Product Requirements Document (PRD)

**Status: Template (ShipRight v0.5.0-draft).**
**Pack:** ShipRight  
**How to use:** Use relevant sections to record current product context. Skills may help draft missing sections provisionally. Mark unknowns and proposed decisions; missing files do not grant approval to invent scope.

**Product / feature name:** <!-- write here -->  
**Author:** <!-- write here -->  
**Date:** <!-- write here -->  
**Version:** <!-- write here -->  

---

## 1. Problem

What painful situation are we fixing? Who feels it today?

<!-- write here -->

**Evidence (optional but preferred):** links, support tickets, quotes with sources — never invent.

<!-- write here -->

## 1b. Outcome (owned)

Who, what changes for them, and how we would know. One line. Mark **Approved** or **Proposed**.

<!-- write here -->

## 1c. Differentiating system

A feature list is not a differentiating system. Name the mechanism.

| Field | Content | Status |
|-------|---------|--------|
| Mechanism (what the product does that makes the outcome better) | <!-- --> | Proposed / Approved |
| What this user does today instead | <!-- --> | |
| Why that is worse for this user | <!-- --> | |
| Evidence (sources) or UNKNOWN | <!-- --> | |

## 1d. Core objects & lifecycle

The 3–6 things the product manages and their key states.

| Object | Key states (in order) | Owner role |
|--------|-----------------------|------------|
| <!-- e.g. Invoice --> | <!-- draft → sent → overdue → paid --> | <!-- --> |

## 2. Users

### Primary user

- **Role / persona name:** <!-- write here -->
- **Job they are trying to do:** <!-- write here -->
- **Context (when/where they use this):** <!-- write here -->
- **Constraints (time, skills, device):** <!-- write here -->

### Secondary users (if any)

| User | Need | Notes |
|------|------|-------|
| <!-- --> | <!-- --> | <!-- --> |

### Who is out of scope

<!-- write here -->

## 3. Goals

What does success look like for the user and for the business?

1. <!-- write here -->
2. <!-- write here -->
3. <!-- write here -->

## 4. Non-goals

What we will **not** build in this version (stops AI from inventing scope).

- [ ] <!-- write here -->
- [ ] <!-- write here -->
- [ ] <!-- write here -->

## 5. Success metrics

How will we know it worked? Prefer measurable signals.

| Metric | Baseline | Target | How measured |
|--------|----------|--------|--------------|
| <!-- --> | <!-- --> | <!-- --> | <!-- --> |

If metrics are unknown, write `UNKNOWN` — do not invent fake numbers.

## 6. Scope

### In scope (this release)

- [ ] <!-- write here -->
- [ ] <!-- write here -->

### Out of scope (later / never)

- [ ] <!-- write here -->
- [ ] <!-- write here -->

### Assumptions

Mark each clearly so skills do not treat guesses as facts.

| ID | Assumption | Risk if wrong |
|----|------------|---------------|
| A1 | <!-- --> | <!-- --> |

## 7. User jobs & primary flows (names only)

List the jobs. Detail flows later with the **product-design** skill.

| Job ID | User job (verb + object) | Priority (P0/P1/P2) |
|--------|--------------------------|---------------------|
| J1 | <!-- e.g. Invite a teammate --> | P0 |
| J2 | <!-- --> | |

### Entry, dependencies and return visits (when applicable)

| Starting situation | Known state | Missing dependency | Next permitted action | Work preserved | Completion condition |
|---|---|---|---|---|---|
| <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- --> |

Separate product rules, proposals and unresolved policy. Do not assume a shared contact establishes a relationship or a completed form establishes final eligibility.

## 8. Risks & open questions

| Risk / question | Owner | Status |
|-----------------|-------|--------|
| <!-- --> | <!-- --> | open |

## 9. Dependencies

- **Related templates (use as relevant):** `02` Technical Architecture, `03` Security & Access, `04` Frontend Spec, `05` Feature Ticket List
- **External systems:** <!-- write here -->
- **People / approvals:** <!-- write here -->

## 10. Context check (for the requested commitment)

- [ ] Outcome and differentiating system are Approved (or explicitly Proposed)
- [ ] Problem and users are clear
- [ ] Goals and non-goals are written
- [ ] Scope is bounded
- [ ] Relevant unknowns and their effect on readiness are explicit
- [ ] Ready for `product-design` skill

## 11. Decision log

Record consequential decisions here. Status: **Proposed**, **Approved**, **Unresolved** or **Superseded**. An assistant suggestion or silence is not approval.

| ID | Scope | Decision | Status | Source / date | Replaces |
|----|-------|----------|--------|---------------|----------|
| D1 | <!-- --> | <!-- --> | Proposed | <!-- --> | — |

---

*Template — docs/01-prd.md*
