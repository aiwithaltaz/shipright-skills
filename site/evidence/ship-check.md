# Ship check

Verdict: ready for PR review. Production launch readiness is not established. No deployment was requested or performed.

Artifact: ShipRight website v1, 2026-10-14. Built with Vite 8.3.4 and served locally as static files. Chromium 154 with Playwright 1.58.2. Tested 320, 390, 768, 950, 1280 and 1600 widths, plus 200% reading/control text. Core requirements pass: real product on the first screen, real installs and downloads, no hero overlap, zero horizontal overflow, functional controls, motion fallback. Final premium checker: 0 failures, 0 warnings.

| # | Item | Status | Evidence / next action |
| --- | --- | --- | --- |
| 1 | Privacy policy | Not verified | No requirement supplied. Owner decides applicability before launch; no policy invented. |
| 2 | Terms | Not verified | Same owner decision; no terms invented. |
| 3 | Tracking consent | Not applicable | No tracking or cookies added; local request inspection. Recheck if services are added. |
| 4 | Frontend secrets | Pass | Relevant source and built bundles inspected; no credentials or environment secrets. This is not a security certification. |
| 5 | HTTPS | Not verified | No production host or deployment. Test host, redirects and TLS after deployment. |
| 6 | Public form abuse | Not applicable | No public form or server submission endpoint. |
| 7 | Titles and descriptions | Pass | Served title, description and 404 orientation checked. |
| 8 | Social preview | Not verified | Basic title/description/type tags present. Production URL and share image remain unset; verify preview on final host. |
| 9 | Favicon/icons | Pass | Existing S/R text mark rendered as local SVG; asset resolves. No installable app icon needed. |
| 10 | Sitemap/robots | Not verified | robots.txt allows public indexing. Domain is unknown; create and validate canonical URL and sitemap after it is chosen. |
| 11 | Image alternatives | Pass | Gallery images named by example and state; decorative canvas hidden; manuscript has description. |
| 12 | Contrast/focus | Pass | Checker measured no contrast failures; keyboard focus visible with 3px outline. |
| 13 | Responsive access | Pass | All six widths have 0 horizontal overflow and no headline/card overlap; 200% reading/control text remains reachable. |
| 14 | Not-found recovery | Pass | Local static server returned 404 with home exit; supplied 404.html. Vercel serving behavior still needs a post-deploy check. |
| 15 | Forms | Not applicable | No forms in scope. Clipboard success and denied-access recovery tested separately. |
| 16 | Links | Pass | Internal anchors, images and both downloads exercised; repository responds 200. Source folder destinations checked against current tree. External links can change. |
| 17 | Images | Pass | Explicit dimensions, lazy gallery loading, 6 source PNGs under 350KB each. No remote font or image service. |
| 18 | Performance | Not verified | Static build and local lab evidence only. Initial JS 51.43KB gzip, optional Three chunk 186.85KB gzip. Reduced motion skips that chunk. No models or textures. Physical phone FPS and field LCP/INP/CLS not measured. Optional Three chunk exceeds Vite's 500KB uncompressed warning. |
| 19 | Analytics | Not applicable | No analytics requested or installed. |
| 20 | Primary task | Pass | Clear learn-and-install path, actual commands, copy steps and genuine downloads. |

Open launch items: choose production host; verify HTTPS, canonical/sitemap and social preview; decide legal applicability; measure target-device performance. These are explicit evidence limits, not a claim that deployment is authorized.

Evidence: [checker](check-ui/report.json), [runtime](runtime.json), [desktop](desktop.png), [phone](phone.png), [scroll video](scroll.webm).
