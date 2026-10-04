# 05 — Feature Ticket List

**Status: Template (ShipRight v0.5.0-draft).**
**Pack:** ShipRight  
**How to use:** Turn decisions from docs + skills into prioritized tickets with acceptance criteria. Update this **after** product-design, ui-ux-design, and ux-critique — then start coding.

**Product / feature name:** <!-- write here -->  
**Author:** <!-- write here -->  
**Date:** <!-- write here -->  
**Version:** <!-- write here -->  
**Source docs:** 01 PRD · 02 Architecture · 03 Security · 04 Frontend Spec  

---

## 1. Priority definitions

| Priority | Meaning |
|----------|---------|
| P0 | Must ship for release; blocks the job |
| P1 | Important; ship soon after P0 |
| P2 | Nice to have; do not let AI inflate these into P0 |

## 2. Ticket list

Add one row per ticket. Keep titles concrete (verb + object).

| ID | Title | Priority | Depends on | Owner | Status |
|----|-------|----------|------------|-------|--------|
| T1 | <!-- e.g. Build invite form with validation --> | P0 | — | <!-- --> | todo |
| T2 | <!-- --> | P0 | T1 | <!-- --> | todo |
| T3 | <!-- --> | P1 | T1 | <!-- --> | todo |

## 3. Ticket details (copy block per ticket)

### Ticket <!-- T1 -->: <!-- title -->

- **Priority:** P0 / P1 / P2  
- **User job / PRD link:** <!-- J1 -->  
- **Screen(s):** <!-- S1 -->  
- **Description:**  
  <!-- write here: what to build in 2–4 sentences -->  
- **Acceptance criteria:**  
  - [ ] <!-- write here -->  
  - [ ] Empty / loading / error / success handled as specified  
  - [ ] Permissions match doc 03  
  - [ ] No nav or features outside docs 01/04  
- **UX notes:** <!-- write here -->  
- **Tech notes:** <!-- write here -->  
- **QA notes:** <!-- write here -->  
- **Out of scope for this ticket:** <!-- write here -->  

### Ticket <!-- T2 -->: <!-- title -->

- **Priority:**  
- **User job / PRD link:**  
- **Screen(s):**  
- **Description:**  
  <!-- write here -->  
- **Acceptance criteria:**  
  - [ ] <!-- write here -->  
  - [ ] States covered  
  - [ ] Permissions match doc 03  
- **UX notes:** <!-- -->  
- **Tech notes:** <!-- -->  
- **QA notes:** <!-- -->  

## 4. Dependency graph (simple)

```text
<!-- example:
T1 form → T2 API wire → T3 success/empty states
         ↘ T4 email invite (P1)
-->
```

## 5. Critique follow-ups

After **ux-critique**, record findings as tickets or AC updates. Recording a ticket does not resolve a failed check. Close it only with evidence from the corrected artifact/version.

| Finding ID | Severity | Becomes ticket / AC change | Done? |
|------------|----------|----------------------------|-------|
| <!-- --> | blocker / major / polish | <!-- --> | [ ] |

## 6. Definition of done (feature-level)

- [ ] All P0 tickets done
- [ ] Docs 01–04 still accurate (or updated)
- [ ] Critical requirements verified and critique blockers resolved with evidence
- [ ] Noncritical failures/unknowns have explicit disposition; visual preferences do not override integrity
- [ ] Ready to ship / release checklist owned by team

## 7. Ready check (before coding)

- [ ] Tickets trace to PRD jobs
- [ ] Acceptance criteria are testable
- [ ] Dependencies ordered
- [ ] P0 set is small enough to finish
- [ ] Skills have been run (or explicitly skipped with reason)

---

*Template — docs/05-feature-ticket-list.md*
