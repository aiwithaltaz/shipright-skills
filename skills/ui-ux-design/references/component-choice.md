# Choosing a control

Load only when choosing between look-alike controls. Skip it for a correction that does not change the control type.
Use canonical names. If a control cannot be named, justify it or remove it.

## Select, Dropdown menu, Combobox, Radio button, Segmented control

Use Select for one value from a short fixed list. Use Combobox when the person must type to filter a long list.
Use a Dropdown menu for actions or links, not for a value submitted with a form.
Use Radio button when two to four options should all stay visible.
Use a Segmented control for two to five visible options that switch a view or a short setting.
Do not use Select for two or three options, for a yes/no, or to start an action such as Export.
Anti-pattern: a Select with one option, or a Dropdown menu used as the field that submits a value.

## Tabs, Segmented control, Accordion

Use Tabs when several panels share the page and the others stay available.
Use a Segmented control for a short filter or view switch, not Tabs.
Use an Accordion to show or hide optional detail under a heading.
Anti-pattern: Tabs for a two-option filter, or Tabs that throw away what the person typed.

## Tooltip, Popover

Use a Tooltip for short plain text on hover or focus.
Use a Popover when a click should open a few controls next to the thing they affect.
Critical information is never only in a tooltip or popover.
Anti-pattern: a warning the person must read, hidden until hover.

## Alert, Toast, Modal

Use an Alert for a message that stays on the page until the situation changes.
Use a Toast for a short confirmation that can leave on its own.
Use a Modal when the person must decide before the page continues.
Anti-pattern: a Toast for an error that needs action.

## Modal, Drawer, Popover

Use a Modal for a blocking decision.
Use a Drawer for a longer side task while the page stays partly in view.
Use a Popover for a few controls, not a full form.
Anti-pattern: a long form inside a Popover.

## Spinner, Skeleton, Progress bar

Use a Spinner when work is happening and the duration is unknown.
Use a Skeleton when the layout is loading.
Use a Progress bar when the amount done is known.
Use a Progress indicator for named stages. That is not a Spinner.
Anti-pattern: a Spinner labeled with a percent that is not known.

## Badge, Tag, Button

Use a Badge for real status. It is not a control.
Use a Tag when the person can remove the label or use it as a filter.
Use a Button to start an action.
The name Badge is sometimes used for tags. In a spec, keep Badge, Tag and Button apart.
Anti-pattern: a Badge that is only decoration, or a Badge used as the only way to act.

## Checkbox, Toggle

Use a Checkbox for a choice saved with the form, including a multi-select.
Use a Toggle for an immediate on or off.
Anti-pattern: a Toggle for a choice that is not applied until submit.

## Stepper has two meanings

A quantity Stepper changes a number with plus and minus.
A Progress indicator shows stages. Some systems call that a stepper too.
Name which one you mean. Do not use one unqualified Stepper for both in the same spec.
Anti-pattern: a stage list and a quantity control both called Stepper with no qualifier.
