# Why the 1.3.1 site

The 1.3.0 page passed its own stage 9 check and still showed seven bugs. A fresh premium check of that build reported 19 fails (9 on desktop, 10 on the phone): hidden-ignored, poster-under-model, pin-clip, slider-align, stale-claim, craft-product, craft-composition, craft-accent, craft-empty, and nav-wrap on the phone. After this patch the same check on the home page and the case study is 0 fails and 0 warns. These notes say what changed, which rule it follows, and what problem that solves. They are not a grade. Taste is Not verified. Eval scores are pending.

## Skill

The checker only looked at the first paint. A display rule beat `[hidden]`, so five replay steps sat on screen at once and the pin clipped the last one. The poster used the same trick. The slider never checked that both pictures shared a box. Nothing compared the words "draft" and "not released" with the real release state. Stage 9 now names those bug classes and a premium craft rubric: the first screen shows the product (web move W2), each act is a new composition (W4), the accent comes from the product (W3), and a tall rounded panel cannot be mostly empty. Starter tokens and every block set `[hidden] { display: none !important; }`. Each new check fails on a fixture of the 1.3.0 bug and passes on the fix.

## First screen

The 1.3.0 hero was a headline plus a text card, and the text card showed every step at once. The 3D object lived mid-page and was the Keel demo, not ShipRight. This screen is one dark composition: the job in large type, a filled Install button, and the five files a run writes (Research, Options, Build, Test, Record) as a drag-to-turn stack. Scroll lifts the sheets across about three viewports, and one sample line is visible at a time. The accent on the seal is sealing wax, named in `data-accent-source`. Line masks reveal the title. A still stands in when WebGL is off, and it is hidden once the canvas renders. Rule: W2, the product is on the first screen, plus the hidden and poster checks. Problem solved: a visitor sees the product and one step, and the last step is no longer clipped.

## Work

The slider stays, because the owner screen and the Sonnet build are the real c6 shots. They are different aspect ratios, which left a black band at 390 and two halves that did not meet. Both images now share the frame's pixel box and use object-fit, so the drag compares the same rectangle. The three owner requests stay underneath, labeled as requests, not as a claim that the picture did each one. The section is a light full-width photograph, not another text-and-card split. Rule: the slider check, and W4 (this act is photo, left, screen). Problem solved: the two pictures line up, including at 390.

## Process

The heading used to say "One step is black" on a dark ground, with the list stuck to the title and an empty card beside it. The heading is now "One step holds the page." The active step is white. Waiting steps are a solid dim color, not a faded opacity. There is a 32px gap under the heading. One sentence is on screen. The others stay hidden until that step. The pin travels about 2.4 viewports. This act is centered type on dark, with no media card. Rule: W4, the empty-card rule, and the pin walk. Problem solved: one step reads as the point, and the panel is no longer a blank box.

## Proof

The three baseline pairs stay, because they are real files and they are not grades. The separate "Release scores / results coming" box is gone. The line is that 1.3.0 is released, eval scores are pending, and the page will not invent a winner. The layout is a dark stack of photograph pairs, which is not the process and not the slider. Rule: copy honesty, and W4. Problem solved: the section stops promising a score that does not exist, and it no longer repeats the previous layout.

## Install

Eight tools, one command, one Copy button. There is no zip. The line that called the repository "the draft" is gone. The panel is centered on paper, a band rather than a full dark screen. Rule: stale-claim check, and W4. Problem solved: the install matches the release state, and it is not another split card.

## Footer

One line: 1.3.1, eval scores pending, not a grade, then the case study and GitHub. It does not say "Draft 1.3. Not released." Rule: stale-claim check, and the removal test (do not repeat the pitch). Problem solved: the footer stops contradicting the release.

## Phone nav

At 390 the five links wrapped onto two lines. They now sit behind a Menu button. When the menu is open the links are a fixed layer, so the bar itself stays one row. Rule: the nav-wrap check at 390. Problem solved: the top of the phone page is no longer crowded.

## Case study

Same paper, ink, and sealing-wax accent, so it is the same product. The acts are not the home page: a light photograph, a dark type band, a dark set of frames, then a light centered close. The sentence that called this "the draft" is gone. Numbers stay the ones already in the record. No score was added. Rule: W3 and W4, and the case-study rule that a number must already be in the record. Problem solved: the sample of what a run writes is still honest, and it does not look like a second copy of the home page.
