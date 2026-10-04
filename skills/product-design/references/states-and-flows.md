# States and flows - reference

**Status: DRAFT.**  
**Pack:** ShipRight. Supports the **8-check decision gate**. Load when specifying states or shaping flows. Used by `product-design`.

## Why states matter

AI slop usually designs the **happy path only**. Real products need every reachable state. If a state is missing, eng and UI generators invent it badly.

## Core state list

| State | Meaning | Typical UI need |
|-------|---------|-----------------|
| **Empty** | User has never created data here | Explanation + one clear first action |
| **Loading** | Waiting on network/work | Progress or skeleton; do not fake final data |
| **Success / populated** | Happy path content | Primary content + primary action |
| **Error** | Request or validation failed | What went wrong + how to fix / retry |
| **Permission denied** | AuthZ blocked | Clear message; path to request access or go back |
| **Partial data** | Some sections loaded, some failed | Show what works; isolate failure |
| **Filtered empty** | Data exists but filters/search hide it | “No results” + clear filters - not the same as Empty |

## Empty vs filtered empty

| | True empty | Filtered empty |
|--|------------|----------------|
| Cause | No records yet | Filters/search too narrow |
| Copy | “Create your first …” | “No results for these filters” |
| Primary action | Create / import | Clear filters / edit search |
| Secondary | Learn / docs | Adjust filters |

## Flow shape (simple)

1. **Entry** - how the user arrives (nav, deep link, CTA)  
2. **Steps** - only steps required by the job  
3. **Decision points** - branches (permission, validation, payment, etc.)  
4. **Exit** - success destination, cancel destination  
5. **Recovery** - error → retry or abandon  

### Happy path template

1. User …  
2. System …  
3. User …  
4. System confirms …  
5. User lands on …  

### Fail path template

1. Failure happens at step …  
2. User sees …  
3. User can … (retry / edit / cancel / contact)  
4. System does / does not change data …

## Destructive actions

| Situation | Prefer | Avoid |
|-----------|--------|-------|
| Irreversible delete of important data | Modal confirm with clear consequence | Accidental one-click delete |
| Reversible delete | Undo window | Extra friction for low risk |
| Bulk destructive | Confirm + summary of count | Silent bulk delete |

## Mini examples

### SaaS members table

| State | Copy direction | Action |
|-------|----------------|--------|
| Empty | “No teammates yet” | Invite teammate |
| Filtered empty | “No teammates match this filter” | Clear filter |
| Error | “Couldn’t load teammates” | Retry |
| Denied | “You don’t have access to members” | Ask admin / back |

### Form submit

| State | Behavior |
|-------|----------|
| Loading | Disable double-submit; show progress on button or form |
| Field error | Inline next to field; keep user input |
| Server error | Page or form-level message + retry |
| Success | Confirm + next step from PRD (not a random dashboard) |

### Checkout-like step

- Always define: payment fail, validation fail, session expired, success receipt  
- Do not invent upsell steps unless PRD includes them  

## What not to invent

- Extra onboarding steps “for engagement”
- Fake social proof counts
- Roles not in doc 03
- Screens not in doc 04

---

*DRAFT - product-design/references/states-and-flows.md - ShipRight*
