# State coverage - reference (UI)

**Status: DRAFT.**  
**Pack:** ShipRight. Supports the **10-gate pre-flight**. UI-facing companion to product-design states. Used by `ui-ux-design`.

## Rule

If the screen is interactive and P0, design **all** relevant states - not only the populated success view.

## State-by-state UI guidance

### Empty

- Explain what will appear here  
- One primary action to create the first object  
- Optional secondary: import / learn  
- Do not show a dense fake table of placeholder names  

### Loading

- Skeleton that matches final layout OR clear progress  
- Disable duplicate primary submits  
- Do not flash fake metrics that look real  

### Success / populated

- Show real structure (columns, fields) from doc 04  
- Keep primary action discoverable  
- Support common next jobs only if in PRD  

### Error

- Say what failed in plain language  
- Offer retry / edit / support path as appropriate  
- Preserve user-entered data when possible  
- Field errors inline; system errors at form/page level  

### Permission denied

- Explicit message (not empty state)  
- Safe actions: go back, request access, switch account  
- Do not tease locked features with full interactive chrome that fails on click  

### Filtered empty

- “No results” for current filters/search  
- Control to clear filters  
- Do not use first-time empty onboarding CTA here  

### Partial

- Sections that loaded stay visible  
- Failed sections show local error + retry  
- Avoid whole-page failure if only one panel failed  

## Form-specific states

| State | UI |
|-------|-----|
| Pristine | Defaults from docs; no error noise |
| Invalid | Inline errors; focus first error |
| Submitting | Button busy; prevent double submit |
| Submitted OK | Confirmation pattern from product-design (toast / page / redirect) |
| Submitted fail | Keep values; show error |

## Table / list-specific states

| State | UI |
|-------|-----|
| Empty | First-run CTA |
| Rows | Clear row actions; don’t hide only on hover |
| Bulk select | Show count; confirm destructive bulk |
| Pagination / load more | Say what is loading |

## Copy direction (not final legal copy)

Write direction notes, not fake polished brand fluff:

- Empty: “No [objects] yet” + “Create [object]”  
- Error: “Couldn’t [action]. [Try again / check X].”  
- Denied: “You don’t have permission to [action].”

Final strings may need a copy owner (doc 04).

## Checklist before handoff

- [ ] Each P0 screen has a state table in the skill output  
- [ ] Empty ≠ filtered empty  
- [ ] Denied ≠ error ≠ empty  
- [ ] Loading does not look like success  

---

*DRAFT - ui-ux-design/references/state-coverage.md - ShipRight*
