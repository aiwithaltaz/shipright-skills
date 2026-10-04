# Layout and hierarchy - reference

**Status: DRAFT.**  
**Pack:** ShipRight. Use with design dials + **10-gate pre-flight**. Load with `ui-ux-design` when structuring screens.

## Goal

Users should understand **what this screen is** and **what to do next** without decoration getting in the way.

## Hierarchy checklist

1. **Page title (H1)** - names the job or object  
2. **Short context** - one sentence if needed (not a paragraph essay)  
3. **Primary action** - one obvious CTA  
4. **Secondary actions** - visually quieter  
5. **Content block** - table, list, form, or detail  
6. **Tertiary** - help links, metadata  

If everything is bold, nothing is bold. If everything is a button, nothing is primary.

## Layout patterns (choose from docs, don’t invent)

| Pattern | Best for | Avoid when |
|---------|----------|------------|
| Single column form | Settings, invite, short create | Comparing many items |
| List / table + row actions | Collections, members, tickets | Tiny mobile without responsive plan |
| Master-detail | Browse + inspect | Simple one-shot tasks |
| Stepper / wizard | Legal gates, long setup with clear phases | 2-3 fields that fit one page |
| Dashboard widgets | Monitoring jobs in PRD | Generic “AI admin” filler widgets |

## Spacing rules

- Use the spacing scale from doc 04 tokens when available  
- Group: label + field stay close; groups separate farther  
- Align columns; avoid “almost aligned” generated layouts  
- Prefer consistent page margins over decorative full-bleed blocks that hide the job  

## Typography rules

- Use approved type tokens; one or multiple families can work when hierarchy and readability support the task
- Limit to ~3 sizes on a screen (title, body, meta)  
- Line length: avoid ultra-wide body text on desktop  
- Buttons and links: verb + noun  

## Visual weight

| Element | Weight |
|---------|--------|
| Primary CTA | Highest among actions |
| Destructive | Distinct but not competing with primary create actions on the same view unless the job is delete |
| Nav chrome | Quiet; content is louder |
| Decorative background | Lowest - must not reduce contrast |

## Responsive notes

- Stack columns on small screens  
- Do not hide primary action in overflow-only menus on mobile  
- Tables may become cards on small screens - specify which fields remain  

## Common hierarchy failures (fix these)

- Dual competing CTAs (“Upgrade” vs “Invite”) with same weight when PRD job is invite  
- Title below a giant hero illustration  
- Filters above the fold; results far below with no count  
- Settings mixed into the same view as the primary job without need  

## Tie back to docs

- Screen and primary action must follow current product decisions, recorded in docs 01/04 or equivalent context.
- If a new screen is needed, mark it Proposed and resolve its scope before committing it; continue independent layout work.

---

*DRAFT - ui-ux-design/references/layout-and-hierarchy.md - ShipRight*
