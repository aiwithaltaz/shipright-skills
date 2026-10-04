# 03 — Security & Access Document

**Status: Template (ShipRight v0.5.0-draft).**
**Pack:** ShipRight  
**How to use:** Record roles, auth, and permissions so AI does not invent admin powers or expose data. This is a design/product checklist — not a formal security audit.

**Product / feature name:** <!-- write here -->  
**Author:** <!-- write here -->  
**Date:** <!-- write here -->  
**Version:** <!-- write here -->  

---

## 1. Purpose

What access and data risks this feature introduces.

<!-- write here -->

## 2. Roles

| Role | Who | Can do (summary) | Cannot do |
|------|-----|------------------|-----------|
| <!-- e.g. Owner --> | <!-- --> | <!-- --> | <!-- --> |
| <!-- e.g. Member --> | <!-- --> | <!-- --> | <!-- --> |
| <!-- e.g. Guest --> | <!-- --> | <!-- --> | <!-- --> |
| Anonymous | Not signed in | <!-- --> | <!-- --> |

## 3. Authentication

- **Sign-in method(s):** <!-- write here -->
- **Session length / refresh:** <!-- write here or UNKNOWN -->
- **MFA required?** [ ] yes [ ] no [ ] UNKNOWN
- **Account recovery:** <!-- write here -->

## 4. Authorization matrix (feature actions)

Fill one row per sensitive action. Use Y / N / own-only.

| Action | Owner | Admin | Member | Guest | Notes |
|--------|-------|-------|--------|-------|-------|
| View resource | | | | | <!-- --> |
| Create | | | | | <!-- --> |
| Edit | | | | | <!-- --> |
| Delete | | | | | <!-- --> |
| Invite others | | | | | <!-- --> |
| Change roles | | | | | <!-- --> |

## 5. Data sensitivity

| Data type | Sensitivity (low/med/high) | Who can see | Retention notes |
|-----------|----------------------------|-------------|-----------------|
| <!-- e.g. email --> | | | |
| <!-- e.g. payment --> | | | |
| <!-- e.g. content --> | | | |

## 6. Threat notes (lightweight)

Not a full threat model. List obvious risks and mitigations.

| Threat | Impact | Mitigation in product/UX |
|--------|--------|--------------------------|
| Stolen session | <!-- --> | <!-- --> |
| Unauthorized access to resource | <!-- --> | <!-- --> |
| Invite link abuse | <!-- --> | <!-- --> |
| Accidental destructive action | <!-- --> | Confirm / undo (product-design) |
| Other: <!-- --> | <!-- --> | <!-- --> |

## 7. Audit & logging (if any)

- What events should be logged? <!-- write here -->
- What must never be logged (secrets)? <!-- write here -->

## 8. User-facing security UX requirements

Skills must respect these:

- [ ] Clear permission-denied state (not a blank screen)
- [ ] Destructive actions need confirm or undo (say which)
- [ ] Sensitive data masked where needed
- [ ] No security-through-obscurity copy that lies to users

## 9. Open questions

| Question | Owner | Status |
|----------|-------|--------|
| <!-- --> | <!-- --> | open |

## 10. Ready check

- [ ] Roles defined
- [ ] Auth method known or marked UNKNOWN
- [ ] Permission matrix filled for key actions
- [ ] Sensitive data listed
- [ ] Ready for product-design state tables (include denied states)

---

*Template — docs/03-security-and-access.md*
