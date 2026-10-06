# Launch evidence

Inspect all items for a full launch review; use only relevant items for focused requests.
Every item starts Not verified. Record artifact/version, scope, method, result and next action.
Needs decision is a verdict; an item awaiting policy or evidence uses Not verified, or Fail when required behavior is demonstrably missing.
Not applicable requires a source and reason. Never invent requirements or silently install a fix.

| ID | Check | Evidence and limits |
| --- | --- | --- |
| 1 | Privacy page | Verify owner-required page content and reachable links. A screenshot proves only a visible link. No legal sufficiency claim. |
| 2 | Terms | Check applicable approved requirements, served page and links. Do not author terms or infer applicability. |
| 3 | Tracking consent | Identify actual trackers and owner policy. Inspect requests and consent behavior with authorized test tools. Unknown policy remains an owner decision. |
| 4 | Frontend secrets | Inspect relevant source and served bundles. Never reveal secret values. Pattern searches can miss exposures and do not prove backend security. |
| 5 | HTTPS | Inspect actual HTTP-to-HTTPS behavior for supported hosts and routes. A screenshot or config file alone is insufficient. |
| 6 | Public form abuse | Examine relevant server validation and abuse controls. A visible bot widget or client validation alone does not prove protection. |
| 7 | Metadata | Inspect served titles and descriptions where public discovery matters. Private pages still need useful titles for orientation. |
| 8 | Sharing preview | Inspect required tags, reachable image and preview behavior. Do not add social sharing features to a private tool by default. |
| 9 | Icons | Verify approved favicon/app assets resolve and display at relevant sizes. Do not invent a logo. |
| 10 | Indexing | Inspect actual sitemap, robots and indexing directives against approved public/private intent. These are not access controls. |
| 11 | Alternatives | Inspect DOM/source for meaningful image alternatives and decorative images ignored by assistive technology. Screenshots cannot prove this. |
| 12 | Contrast/focus | Measure actual color pairs and inspect keyboard focus. Use the UI state/accessibility reference; no screenshot-only compliance claim. |
| 13 | Responsive access | Exercise supported widths, 200% text resizing, 320 CSS pixel reflow where applicable, long content and sticky overlap. One 390px screenshot is insufficient. |
| 14 | Not-found recovery | Inspect a safe nonexistent route, actual response status and recovery link. A designed frame is not serving evidence. |
| 15 | Forms | Exercise authorized test cases for labels, invalid fields, preserved values, duplicate submission and successful completion. Never submit live customer forms during a read-only audit. |
| 16 | Links | Check relevant destinations and report scope. A sample cannot establish every external link remains healthy. |
| 17 | Images | Inspect dimensions, transfer size, loading and layout stability. Do not lazy-load the primary visible image by default. |
| 18 | Performance | Record measured page/build, device/network, tool and runs. Separate lab results from field experience; a navigation audit alone does not establish real-user responsiveness. |
| 19 | Analytics | Check only wanted events, approved data and consent. No tracking is valid when the owner chose it. Never add analytics to satisfy a checklist. |
| 20 | Primary task | Assess the next action within each task context. Multiple contextual actions need hierarchy, not arbitrary removal. |

Use [state-coverage.md](../../ui-ux-design/references/state-coverage.md) for measurable accessibility criteria.
Check permissions, core flows, data integrity and other critical product requirements beyond these 20 items before any readiness claim.
Use the shared evidence/readiness contract. A missing policy page and an unknown policy requirement are different findings.
Fix tickets need the same scope discipline as design work. Launch readiness does not authorize external action.
