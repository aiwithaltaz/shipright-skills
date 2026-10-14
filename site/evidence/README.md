# Website v1 evidence

Captured on 2026-10-14 from the production build, using Chromium 154 and Playwright 1.58.2 in the cloud environment.

- [Desktop full page](desktop.png), [phone full page](phone.png).
- Named act captures use 1280 or 390 width. Opening is top; the other acts are work, modes, process, install and footer.
- [Scroll video](scroll.webm): actual browser scroll, sampled as 51 frames and encoded at 5fps, 10.2 seconds. This is a visual record, not a frame-rate benchmark.
- [Premium checker](check-ui/report.json): 0 failures and 0 warnings at 1280 and 390, including reduced motion.
- [Runtime checks](runtime.json): controls, copy success/failure, exact downloads, no overlap, zero horizontal overflow at six widths, 200% reading/control text, motion and WebGL fallbacks.
- [Extra checks](extra-checks.json): keyboard activation, visible focus, emulated touch scroll and local lab performance. No physical-device or field-performance claim.
- [Asset provenance](source-assets.json): copied source files and SHA-256 values. IVC reconstruction limits are visible in the gallery.
- [UX critique](ux-critique.md), [ship check](ship-check.md).

The static build was served locally with a handler returning the supplied 404.html with status 404 for missing routes. Production Vercel behavior is not verified because the site was not deployed. No TLS verification was bypassed. There is no hosted preview.

[Final verification and repository test logs](verification.md). Copy feedback is also captured in [success](phone-copy.png) and [denied access](phone-copy-denied.png).
