# Components: names and choices

Load when a spec names controls or must choose between look-alike controls. Skip it for a one-label correction.
Every control maps to a canonical name or an existing app component. If a control cannot be named, justify it or remove it.
Handoff gives the canonical name plus the library name, for example Modal = shadcn Dialog.
Names follow common usage indexed by Component Gallery (Iain Bean). Purposes are ShipRight's own. Credit in [SOURCES.md](../../../../../SOURCES.md).

## Vocabulary (aliases in brackets)

- **Actions:** Button [Action], Button group [Toolbar], Link [Anchor], Dropdown menu [Action menu: actions or links, never a form value].
- **Fields:** Text input, Textarea, Search input, Select [Dropdown: one value from a fixed list], Combobox [Autocomplete: type to filter, then submit], Checkbox, Radio button, Toggle [Switch: immediate on or off], Segmented control [Toggle button group], Slider, Date input, Datepicker, File upload [Dropzone], Stepper [Quantity: plus and minus for a number], Fieldset, Label, Form.
- **Feedback:** Alert [Banner, Callout: stays until the situation changes], Toast [Snackbar: short confirmation that leaves], Spinner [unknown duration], Progress bar [known amount], Progress indicator [Steps: named stages], Skeleton [layout loading], Empty state, Badge [real status, not a control], Tag [removable or filter label].
- **Layers:** Modal [Dialog: decision before continuing], Drawer [Sheet: longer side task], Popover [a few controls by the trigger], Tooltip [short text on hover or focus].
- **Structure:** Header, Navigation, Breadcrumbs, Tabs, Accordion [Disclosure], Table [compare records], List, Card [comparable bounded item], Tree view, Pagination, Separator, Stack, Footer, Heading, Skip link, Visually hidden.
- **Media and content:** Image, Icon, Avatar, Video, File [Attachment], Quote, Rating, Carousel [prefer a visible list], Hero [leave out of task screens].

Do not invent a Quote or Rating. Name which Stepper you mean: a quantity control or a stage list (Progress indicator).

## Choosing between look-alikes

| Need | Use | Not |
| --- | --- | --- |
| One value, short fixed list | Select | Select for two or three options or a yes/no |
| One value, long list | Combobox | Select with hundreds of rows |
| Two to four options, all visible | Radio button | A Select |
| Switch a view or short setting | Segmented control | Tabs for a two-option filter |
| Panels sharing a page | Tabs, keeping typed input | Tabs that discard input |
| Optional detail under a heading | Accordion | Hiding required content |
| Actions or links in a list | Dropdown menu | A Dropdown menu that submits a form value |
| Choice saved with the form | Checkbox | A Toggle that only applies on submit |
| Message until fixed | Alert | A Toast for an error that needs action |
| Blocking decision | Modal | A long form inside a Popover |
| Longer side task | Drawer | A Modal stacked on a Modal |

Use Select for one value from a short fixed list. Use Combobox when the person must type to filter a long list.
Critical information is never only in a tooltip or popover.
