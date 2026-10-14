# Independent first findings

Initial evidence preserved before requested corrections. This file is not overwritten by later retests. Review is still in progress; these are confirmed defects, not a final readiness verdict.

## S1: selected manuscript overlap is missing

- Location: ShipRight desktop opening.
- Evidence: `../shipright/evidence/desktop-opening.png` shows the manuscript entirely in the right column and all headline text in the left column. The selected A direction expressly uses the output sheet interrupting the headline baseline and object in front of text. Source CSS confirms a separated two-column grid without overlap.
- Impact: an approved story technique is absent; the result becomes an ordinary split hero rather than the selected manuscript composition. Product identity remains clear and should stay.
- Severity: Major, Fail for selected-technique fidelity.
- Correction: compose the real output sheet in front of a portion of oversized display type on desktop while keeping the product name/promise and document facts readable; retain normal stacked phone and reduced-motion reading order.
- Retest: inspect opening at 1280×800 and 390×844, plus reduced motion and no WebGL. Overlap is visibly purposeful at desktop and every essential word/product fact remains reachable.

## S2: missing-glyph arrows

- Location: ShipRight phone header, paper rows, source link and install controls; recorder Inspect controls buttons.
- Evidence: `../shipright/evidence/phone-opening.png`, `phone-install.png` and `../field-recorder/evidence/phone-opening.png` show empty outlined squares where diagonal arrows should be. Same square appears in recorder desktop primary actions.
- Impact: broken visual affordances weaken polish and make the intended action direction ambiguous; readable text labels remain available.
- Severity: Polish, Fail for craft.
- Correction: use a locally available glyph/font fallback or decorative inline SVG arrows, preserving text labels and accessible names.
- Retest: both widths on Chromium show intended arrows, not missing-glyph squares; keyboard names remain understandable.

## S3: reading and provenance text below approved minimum

- Location: ShipRight supporting copy, process explanations and product illustration provenance, especially phone.
- Evidence: `../shipright/evidence/phone-opening.png`, `phone-process.png` and `phone-install.png`; style.css uses body/support sizes 12–14px, paper explanations 9px and provenance 6px, despite DESIGN.md body at least16px. The provenance is especially difficult to read in the first-screen document.
- Impact: reading the product's actual output and truthful scope requires unnecessary visual effort; provenance must be legible to support trust.
- Severity: Major for meaningful body/contract legibility, Fail for approved design/access boundary. Tiny decorative folio numerals alone are not the issue.
- Correction: restore readable supporting paragraphs and workflow explanations to approved body size; keep compact annotations at a readable label scale without clipping the manuscript or install command.
- Retest: check 390×844 and 1280×800 at native scale and reflow/zoom. Product explanations and provenance are readable and no new overflow appears.

## R1: annotations contradict selected product view

- Location: recorder detail plate, Side and Back controls.
- Evidence: independently exercised local port5174 at390×844 with reduced motion. `recorder-side.png` shows headphone leader next to SD slot, SD leader beside lower port and USB-C leader below body. `recorder-back.png` retains all three leaders over blank back/empty area. Source keeps identical annotation nodes/positions when switching SVG.
- Impact: the primary inspection job teaches misleading physical locations; the illustrative disclaimer does not excuse leaders pointing to the wrong depicted object.
- Severity: Major, Fail for product teaching/consistency.
- Correction: give each view correct leaders to visible features, or omit unavailable feature leaders on Back while retaining sourced DOM connection explanations and view status.
- Retest: exercise Front, Side and Back at both widths, reduced motion and WebGL failure; every visible leader points to its named depicted feature and hidden features are not falsely located.
