# UX critique

Verdict: ready for PR review. No remaining Blockers or Majors in the tested scope.

Artifact: website v1 on feat/shipright-website-v1, 2026-10-14. Local production static build, Chromium 154, Playwright 1.58.2. Reviewed opening and all six acts at 1280 and 390. Historical proof is unchanged.

## Exact feedback and corrections

| Finding | Impact / severity | Correction | Retest |
| --- | --- | --- | --- |
| Cut-off PRODUCT type behind the paper | Unreadable decoration, Major | Removed the background word | Opening screenshots; no background type |
| Risk of paper covering headline | Essential promise could become unreadable, Major | Separate grid columns; stack below 950; no manuscript rotation | 320, 390, 768, 950, 1280, 1600: no intersection |
| Compact labels and filenames | Reading friction, Major | Larger labels and descriptions; two font families | Premium checker: 0 failures, 0 warnings, no compact-text warning |
| Skip link shorter than 44px | Small phone target, Polish | Minimum 44px height | Final checker: no touch-target warning |

## Taste

Product on stage: Pass. The first screen contains a readable DOM representation of the real build-pack output, with actual filenames and explicit output-structure label. It is not a fictional app screenshot. At 390 the manuscript starts at 462px and is visible in the 844px first viewport. No-WebGL preserves it.

Scroll teaches: Pass. Opening explains the skill; gallery compares actual repository examples; mode index identifies entry points; detail teaches the six steps; close gives tool-specific installation; footer offers source and return. Each act has a different job. IVC reconstruction limits are visible. No invented customers, metrics, ratings or product claims.

Techniques serve the story: Pass. Decorative paper depth supports the manuscript, one scroll timeline introduces the gallery, one block wipe introduces process, hover invert signals mode interaction. Reduced motion keeps content in normal flow without inertia or WebGL. The requested readable hero supersedes the proof's previous type-overlap choice.

## Ten gates

| Gate | Status | Evidence / next action |
| --- | --- | --- |
| 1 Artifact | Pass | Built site and dated screenshots |
| 2 Context | Pass | Approved Product Manuscript, current request and real README facts |
| 3 Job clarity | Pass | Explain the skill, compare examples, select an install path |
| 4 Hierarchy | Pass | One promise and product; contextual actions |
| 5 States | Pass | Gallery selection, five disclosures, copy success/error, download and home recovery |
| 6 Blockers | Pass | None found in tested paths; runtime.json records scope |
| 7 Craft | Pass | Separate hero layout, readable labels, two families, one accent |
| 8 Trust | Pass | Source links and reconstruction caption; downloads byte-identical to release |
| 9 Accessibility | Pass | Measured contrast/focus, keyboard, reflow, motion and no-WebGL tests; screen-reader and physical-device use not verified |
| 10 Correction | Pass | Every requested fix retested; proof preserved |

F1: native anchors, source links and home exit work. F2: same mode names, button patterns and command text. F3: clipboard success appears only after resolution; denied access offers manual selection. No fabricated progress.

Evidence: [desktop](desktop.png), [phone](phone.png), [checker](check-ui/report.json), [runtime](runtime.json), [scroll video](scroll.webm). This is a heuristic review, not research with users or a full accessibility certification. Physical phone frame rate and assistive-technology behavior remain unverified.
