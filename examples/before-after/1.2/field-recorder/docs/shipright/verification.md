# Local implementation verification · 2026-10-14

Artifact: approved Instrument, inspected source, served locally by Vite at port 5174 in Chromium. Specification and implementation evidence are separate; no deployment authorized.

Pass: 18 behavior checks in evidence/behavior-results.json cover 1280 and 390 overflow, primary anchor, Side selection, disclosure, exclusive keyboard disclosure, third act, reverse scroll, normal-flow reduced motion, deliberate no-WebGL and actual forced WebGL failure. No runtime page errors in these exercised paths. Reviewer correction retested all three views in 18 width/motion/fallback scenarios; evidence/view-retest-results.json and matching plate screenshots. Front uses its illustration callouts; side callouts now follow SVG coordinates; back omits invisible connections.

Premium checker final: 0 FAIL, 2 WARN, both compact supporting text under 12px; report in evidence/check-ui-final/report.json. This is measured-rule evidence only. Product still, visible canvas and supplied DOM facts are independently inspectable. No authored customer proof or claimed recording success exists. Manual external taste review is requested; this builder assigns no visual score.

Production build: Pass, Vite generated 922.48 kB JS (262.43 kB gzip) and 12.42 kB CSS (3.33 kB gzip) before final annotation/arrow fixes. Final affected build Pass: 922.53 kB JS (262.44 kB gzip), 12.78 kB CSS (3.42 kB gzip), Vite native config loader. Bundle size warning retained. Model asset transfer: 0 bytes, procedural geometry generated in code; no compressed model file. Texture transfer: 0 bytes, one 512×512 generated RGBA text texture (1,048,576 decoded bytes). No external product assets. Static SVG and font sizes are in evidence/asset-sizes.json. DPR caps, hidden-tab/offscreen render guard, single driver and cleanup are source-inspected.

Not verified: real mid-range phone fps, field LCP/INP/CLS, screen-reader and assistive-technology behavior, full accessibility compliance, production HTTPS/indexing/error routing. Chromium's software renderer is not evidence of physical-device performance. This sample has no sound, payments, recording, storage persistence, account or form flow.

Initial preview response, original options and approval are preserved. Initial detail screenshots/video remain under evidence/pre-fix. Final screenshots and short scroll WebM are under evidence. No commit, push or publication performed.

Post-R1 Polish correction: side SVG label font enlarged to 24 illustration units and shorter leaders; prior frames retained in evidence/pre-polish. Affected checker again reports 0 FAIL / 2 compact DOM-label WARN at evidence/check-ui-polish. View frames retested; no change to workflow or primary-action behavior. Final video uses Front and therefore remains representative of the final source.

Environment cleanup: Vite cacheDir and production outDir moved outside checkout to /workspace/.shipright-tools/field-recorder-vite-cache and /workspace/.shipright-tools/field-recorder-dist. Removed only inspected generated vendor cache, dist files and temporary video frames; source, external dependencies, lockfiles and all evidence preserved. Plain Vite config avoids importing tool implementation into its config bundle. Affected production build rechecked.
