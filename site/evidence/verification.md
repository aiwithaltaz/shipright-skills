# Final verification

2026-10-14. All requested local gates completed. No deployment, merge, tag or release.

| Check | Result | Evidence |
| --- | --- | --- |
| Production build | Pass | [Build log](build.txt); Vite 8.3.4; HTML 3.73KB gzip, CSS 4.37KB gzip, initial JS 51.45KB gzip; optional Three chunk 186.85KB gzip |
| Premium checker | Pass | [Report](check-ui/report.json): 0 failures, 0 warnings at 1280 and 390 |
| Portable browser suite | Pass | Controls, per-tool local copy status, recovery, byte-identical downloads, all six widths, text resizing and motion fallbacks |
| Extra runtime checks | Pass | [Keyboard, touch and lab record](extra-checks.json); no external requests |
| Short first screens | Pass | [320x568, 390x667, 390x844, 1280x720](short-screens.json): visible product, no overflow |
| Unit discovery | Pass | [55 tests, no skips](repo-tests.txt) |
| Source integrity | Pass | Final source check; historical limits retained |
| Mutation self-test | Pass | [157 rejected mutations](source-mutations.txt), clean snapshot without local dependency cache |
| Token budgets | Pass | [Pinned tiktoken 0.12.0](context-check.txt), every declared path within current caps |
| Proof preservation | Pass | SHA-256 comparison: all 93 original proof files unchanged; no diff in examples/ |
| UX critique | Pass | [No remaining Blockers or Majors](ux-critique.md) |
| Ship check | Review complete | [20 items and explicit production gaps](ship-check.md); launch readiness not established |

Commands: npm run build; scripts/check-ui.mjs with --profile premium; site/scripts/verify.cjs; unittest discovery in tests/; evals/check_sources.py and --self-test; evals/check_context.py with the pinned tokenizer. Playwright 1.58.2 and Chromium 154 were used. Dependencies and build output were kept outside the checkout during repository source validation.

The optional Three.js chunk exceeds Vite's 500KB uncompressed warning. It is dynamically loaded, has no model or textures, and reduced motion skips it. Physical-device FPS and field performance remain unverified. Production HTTPS, domain metadata, share preview and legal applicability await the production setup.
