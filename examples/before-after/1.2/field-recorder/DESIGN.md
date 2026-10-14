# Design system: preview stage

Source: Proposed (delegated) from the current request. Three story-specific token sets are in design/tokens.css. Final tokens become the selected set only after explicit story choice. No supplied brand system exists.

Two type scales: large display headings and compact body/labels. Body copy is at least 16px, line height 1.5; labels at least 12px. Display size clamps between 42px phone and 112px desktop. Spacing scale 8, 16, 24, 40, 64, 96px. Radius 0 for editorial surfaces, 6px controls; no glass cards. Elevation only for the physical product, not information cards. Native links/buttons have visible 3px focus outlines, 44px touch targets and readable hover inversion. One accent per option.

All primary actions say Inspect controls and link to the detail section. View buttons have persistent selected state and accessible current-view status. The sample badge and stand-in label remain legible. Phone layouts place product beside/below type without obscuring copy; native vertical scrolling remains available. Motion is enhancement: disable timelines, inertia and wipes for reduced motion; all product facts remain DOM content.

Option stories and techniques are preserved in initial-response.md. Final display placement and motion recipe depend on D5; do not implement a provisional choice.
