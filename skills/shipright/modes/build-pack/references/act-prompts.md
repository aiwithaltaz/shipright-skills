# Six-act build prompts

For the chosen premium website only. Keep app tickets at 220 words. A website build prompt is one 550 to 1,700 word ticket, not six small app tickets. Count its words before delivery. The generated prompt carries detail; this reference stays short. Write it in the ticket file with a stop line. Do not use it before the research brief, act plan and three-option choice.

## Recipe

1. Name existing project or one page, stack, font and palette from the chosen option. Use React Three Fiber or Three.js, GSAP ScrollTrigger and Lenis, respecting project constraints.
2. Name one real product hero, supplied assets and unknown facts the builder cannot fill. Procedural stand-ins must be labeled and depict that product.
3. Write six headings: Opening, Second act, Third act, Detail, Close, Footer. For each, describe screen composition, what the visitor learns, what moves, what stays still, exact sourced copy, chosen technique and forbidden filler. State timeline positions and responsive composition when relevant.
4. Include performance, accessibility and reduced-motion acceptance checks from [premium-web.md](../../ui-ux-design/references/premium-web.md). Load only the selected recipes, not the entire library.
5. Done when all acts are reachable, product is on first screen, approved story is visible, real facts remain intact, reduced motion and no WebGL preserve content, and check-ui --profile premium plus taste critique are clean at 390 and 1280. Record unverified device claims.
6. Stop after the specified build and checks. No merge, deploy, analytics, accounts or new routes without scope and authorization.

## Worked example, sample chair only

All facts and copy below are a labeled synthetic example. This chair is not a proof build or a real customer product. The example assumes a supplied chair.glb and chair-still.webp; do not fabricate the files. The three-option choice was delegated to product inspection. In a live task stop for that choice first.

### Stack and subject

Build one Vite page using React, React Three Fiber, GSAP ScrollTrigger and Lenis. Use a locally available named font, such as supplied Inter, with system-ui as fallback. Use a warm white background #f5f3ee, near-black text #171714 and one rust accent #a33d22. There are two type scales: a large headline and compact supporting labels. Do not add gradient text, neon boxes, invented ratings or logo strips. The subject is the supplied sample chair, not a generic sculpture. The sample facts are a curved back, removable seat and three supplied views. There is no supplied price, customer review or purchase flow. Treat those as Unknown and omit them. Keep the sample label visible.

### Opening

Show the real chair still in the first HTML with reserved dimensions and alt text describing the curved back and seat. Use the headline "A seat, seen from every side" as labeled sample copy. Place the chair center stage, partly in front of a split DOM headline using object in front of text. Keep the words readable on phone by moving the still beside the type rather than overlapping it. Include a quiet native link to Detail and one action to inspect. Fade in one canvas after readiness; the still stays on failure. The visitor must be able to name the chair from this screen. No sphere or loading gate replaces it.

### Second act

Use one pinned scroll scene with a 400vh track, not a separate canvas for each beat. From progress 0 to 0.35, move from front three-quarter view to a side view. Keep the camera horizon stable and the whole chair recognizable. Put the real label "Curved back" alongside the back, with a leader line that does not obscure the product. The visitor learns which part supports the silhouette. The caption stays still while the camera moves. A keyboard link reaches the next act. Reverse scroll must restore the prior view without duplicate timelines or jumping.

### Third act

From progress 0.35 to 0.7, turn to the supplied back view, using a different composition with the object on the right and readable copy on the left. Show the sample sentence "Look behind the curve". Keep the chair present, not cropped into an unrecognizable abstract surface. Do not invent ergonomic research, manufacturing claims or material specifications. This act teaches the shape of the back. On phone, stack caption and object so vertical swipes scroll the page. Reduced motion shows the back still and final caption in normal flow.

### Detail

End the pin before this act. Reveal "See the parts" with one block wipe consisting of two accent rectangles. The heading and labels exist in the DOM before the wipe. Show the supplied seat detail with the sample label "Removable seat". Use an annotated view, not three identical benefit cards. Offer native Front, Side and Back controls tied to supplied views, with a visible hint and accessible current-view status. Unknown material and size remain absent. The visitor can inspect the facts without motion or WebGL. Reduced motion makes the heading visible immediately and swaps still views instantly.

### Close

Use the sample action "View the sample files" linking to an existing supplied directory, not a fabricated checkout. The reassuring sentence is "This is a sample chair study". It states the actual limit instead of inventing a warranty. Keep one primary action with supporting context. A quiet return-to-top link provides an exit from the story. Do not add price, payment, email capture, analytics or a purchase button. If the sample directory is unavailable, render a truthful unavailable status and record the missing destination rather than a broken success action.

### Footer

Show the sample project name, the existing source link if supplied and the sample label. Omit unsupplied contact and legal destinations. Keep links large enough for touch and focus visibly outlined. Footer returns to the opening and does not start another story. It is reachable with native scrolling and keyboard navigation, including when every animation is disabled.

### Acceptance and stop

Cap pixel ratio at 2 desktop and 1.5 phone. Keep model under 3 MB compressed and textures under 2 MB; report actual sizes. Pause off-screen rendering and hidden tabs, clean up triggers and dispose scene resources. Reduced motion disables Lenis, scrub and wipe while preserving every word and still view. No WebGL retains the same product and facts. Interactive canvas uses a real description, focus and arrow-key orbit if implemented; decorative canvas is hidden from assistive technology. No sound. Check scroll, reverse scroll, keyboard, 390 and 1280 widths, fallback and reduced motion. Run the premium checker, inspect screenshots and taste critique. Stop after saving the page, check evidence and unresolved limits. Do not deploy.
