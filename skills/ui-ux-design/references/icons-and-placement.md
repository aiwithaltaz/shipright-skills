# Icons and placement

Follow sourced components and tokens in DESIGN.md. Record unknown values; do not invent a library or size.

## Icons

- Use one icon set and one style (line or filled) in the product, with one stroke weight. Preserve the existing set.
- For a new design, choose one set and one style and record them in DESIGN.md as Proposed until approved. A filled variant for the selected state is allowed only when recorded.
- Use icons for useful recognition: actions, navigation, status or familiar objects. Remove purely repetitive decoration.
- Preserve approved navigation icons; do not strip them simply because labels also exist.
- Size and icon-label spacing come from component tokens, with optical alignment to adjacent text.
- A small icon can have a larger hit target. Do not confuse glyph dimensions with target size.
- Icon-only is allowed only for close, search, menu, more and back, plus additions listed in DESIGN.md.
- Every icon-only control needs an accessible name and a tooltip that shows on hover and keyboard focus.
- Never make a destructive action (delete, remove, cancel) or an uncommon action icon-only. Give it a visible text label.
- Tooltips never replace accessible names or essential visible instructions. They must work with keyboard focus and dismissal.
- Hide decorative icons from assistive technology. Meaningful UI graphics need 3:1 contrast.
- Status uses text + icon + color. Never color alone or icon alone.
- Do not mix emoji and system icons accidentally. Approved emoji content is not itself a defect.

## Placement by context

Decide placement once in DESIGN.md Placement, then use it the same way on every screen (F2).
Primary action side and button order are set once for the app. Follow the platform convention when one applies.
Forms and dialogs may have different recorded patterns; each pattern is then used everywhere. A deliberate exception needs a Screen note with a reason.

| Context | Rule |
| --- | --- |
| Page actions | Place near the page job; distinguish them from row actions. |
| Buttons | Use the recorded side and order. Never put two filled (primary-styled) buttons side by side. |
| Forms | Actions follow the form, on the recorded side. |
| Dialogs | Reuse the dialog pattern; Cancel stays easy to find. Buttons name the action, such as "Delete project", not "OK". |
| Row actions | Keep consistent placement. Do not make them depend on hover. |
| Bulk actions | Show the selection scope and a clear way to deselect. Do not imply all records are selected when only visible rows are. |
| Search/filters | Only when in scope. Place near the results they affect, with useful counts. No decorative query chips. |
| Destructive actions | Separate from the normal primary action; name the object and effect. |
| Empty states | Show where the content would be, with one next action. |
| Help | Put essential help near its field. Occasional detail may use an accessible disclosure. |
| Toasts and status messages | One consistent place across the app. Never cover the primary action or navigation. Errors that need action stay until the user acts. |
| Navigation | Same place and order on every screen for the current phase. Adapt deliberately for mobile. |
| Profile/account | Use one canonical home per layout. Do not duplicate the same account box in the header and sidebar. |
| Mobile primary action | Keep it within thumb reach: the lower part of the screen or a bottom bar. Not only in a top corner or an overflow menu. |

Sticky actions must not cover content or focus.

## Selection, focus and notifications

Current navigation means "you are here". Mark it with the system's active styling and `aria-current` where appropriate.
A notification dot means actual unread or pending work, never selection. Do not put a dot on the selected nav item. Do not invent a count or unread state.

A selected row needs a non-color cue and correct control semantics, such as a checked checkbox.
Make the selected state clear and clean, without a heavy accent bar unless the design system says so.
Use `aria-selected` only on a widget role that supports it. A plain clickable div is not a selection control.
Keep keyboard focus visible even on a selected row.

See [flow-rules.md](../../_shared/flow-rules.md) for F2 and [state-coverage.md](state-coverage.md) for accessibility checks.
