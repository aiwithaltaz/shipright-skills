# 02 — Technical Architecture Document

**Status: Template (ShipRight v0.5.0-draft).**
**Pack:** ShipRight  
**How to use:** Describe systems and constraints so AI does not invent APIs, stacks, or data shapes. Product designers can fill the non-code sections; eng should review stack and data flow.

**Product / feature name:** <!-- write here -->  
**Author:** <!-- write here -->  
**Date:** <!-- write here -->  
**Version:** <!-- write here -->  

---

## 1. Purpose of this document

One paragraph: what system this feature sits in, and what this doc decides.

<!-- write here -->

## 2. Systems map

List the main pieces (boxes). Keep it simple.

| System / service | Responsibility | Owner |
|------------------|----------------|-------|
| <!-- e.g. Web app --> | <!-- --> | <!-- --> |
| <!-- e.g. API --> | <!-- --> | <!-- --> |
| <!-- e.g. Auth provider --> | <!-- --> | <!-- --> |
| <!-- e.g. Email --> | <!-- --> | <!-- --> |

**Simple diagram (words or ASCII):**

```text
<!-- example:
[Browser] → [Web app] → [API] → [DB]
                ↓
             [Auth]
-->
```

## 3. Stack choices (decided or UNKNOWN)

Only list what is already chosen. Mark unknowns. Do not let AI pick a random stack.

| Layer | Choice | Notes |
|-------|--------|-------|
| Client | <!-- e.g. React / Next --> | <!-- --> |
| API | <!-- --> | <!-- --> |
| Data store | <!-- --> | <!-- --> |
| Auth | <!-- --> | <!-- --> |
| Hosting | <!-- --> | <!-- --> |
| Other | <!-- --> | <!-- --> |

## 4. Data flow (for this feature)

Describe the happy-path data movement in plain English.

1. User does: <!-- write here -->
2. Client sends: <!-- write here -->
3. Server does: <!-- write here -->
4. Data stored / returned: <!-- write here -->
5. User sees: <!-- write here -->

### Main entities (names + key fields only)

| Entity | Key fields | Notes |
|--------|------------|-------|
| <!-- --> | <!-- --> | <!-- --> |

## 5. Integrations

| Integration | Direction | Why needed | Failure behavior |
|-------------|-----------|------------|------------------|
| <!-- e.g. Stripe --> | in / out / both | <!-- --> | <!-- --> |

## 6. Constraints

- **Performance:** <!-- write here -->
- **Scale (users / data):** <!-- write here -->
- **Offline / latency:** <!-- write here -->
- **Browser / device support:** <!-- write here -->
- **Compliance hints (point to doc 03):** <!-- write here -->

## 7. Environments

| Env | Purpose | Notes |
|-----|---------|-------|
| Local | <!-- --> | <!-- --> |
| Staging | <!-- --> | <!-- --> |
| Production | <!-- --> | <!-- --> |

## 8. Out of scope for architecture

What eng will not build now:

- [ ] <!-- write here -->

## 9. Open technical questions

| Question | Needed by | Status |
|----------|-----------|--------|
| <!-- --> | <!-- --> | open |

## 10. Ready check

- [ ] Systems map exists
- [ ] Stack is decided or marked UNKNOWN
- [ ] Data flow for the feature is written
- [ ] Integrations and failure behavior listed
- [ ] Ready to inform `product-design` and `04` Frontend Spec

---

*Template — docs/02-technical-architecture.md*
