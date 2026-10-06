# References and the design system

Use a screen job before choosing visual values. A supplied reference grants only the properties the user selected.
Never invent brand values or claim guessed tokens are existing values.

## Preserve

For an existing product, inspect relevant components, CSS variables, design variables and screens before proposing changes.
Record exact values with a source. Screenshots can show appearance but rarely establish exact fonts, tokens or icon libraries.
Unknown values stay Unknown. Reuse an existing component directly when its token name is undocumented.
Observation is not approval of a defect. Current user corrections outrank older components or screenshots.

Capture only what the task needs: color roles, typography, spacing, radius/elevation, components, icons, motion and placement by context.
Protect unrelated routes, navigation, fields, data behavior and identity. An explicit request to change one of these authorizes that item.
A broad "modernize" request does not silently approve replacing the brand or adding features.
Do not require a new DESIGN.md or a full token extraction for a one-label change.

## Establish

Use for a requested new system or approved overhaul. Recommend a small coherent direction tied to the actual job.
Propose exact values only within this design scope; never describe them as the user's existing brand.
Record a delegation when it authorizes choosing or applying values. Otherwise keep them Proposed until approval.
Choose components before inventing custom controls. A named public design system is a proposal unless already selected.
No palette, font count, radius scale or icon library is a universal ShipRight default.

## Supplied references

Use at most a few relevant references. Do not require new research for a focused correction.
For each, name the property to borrow, why it serves this task and what should not carry over.
A liked search form can supply spacing and button treatment without approving its filter dropdown.
Do not import identity, copy, evidence, sections or features merely because they appear in a reference.
External style tools produce proposals. Check them against scope, accessibility and approved identity before use.

## DESIGN.md export

Template: [docs/DESIGN.md](../../../docs/DESIGN.md). Use it as a ShipRight interchange document, not a promise of universal client compatibility.
Preserve an existing format and unknown sections. Do not run or install a third-party linter by default.

- Only sourced **Approved** or **Observed** values enter the YAML token map, and only if current instructions permit their use.
- **Proposed** values stay in clearly labeled Markdown. **Unknown** values are omitted from YAML and listed as gaps.
- Use empty maps where needed. Never insert placeholder hex codes, font names or sizes.
- Keep status/source in the Markdown table. Separate factual observation from decision status.
- Keep Icons and Placement in Markdown. Record component/context differences, one profile home, selection and notification meanings.
- Use Screen notes only for actual exceptions. Do not repeat the whole system for every screen.
- Keep the frontend specification and handoff aligned with current approved decisions.

The supplied YAML shape uses version, name, description, colors, typography, rounded, spacing and components.
Do not erase another tool's keys when importing its file; reconcile the actual consumer format first.
