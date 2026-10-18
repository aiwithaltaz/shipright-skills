# Ship check: Postdesk preview

Artifact: `index.html` static prototype, 2026-10-16, served locally. Not deployed. Verdict: **Not established.** This is a design prototype with sample data, so most launch items have no served product to inspect. Nothing here authorizes deploy, publish or payment.

Critical requirements beyond the 20 items: every post needs approval before publishing; per-user access enforced on the server; tokens never in the browser; no duplicate publish. All are Not verified because no backend exists yet.

| # | Item | Status | Evidence and next action |
| --- | --- | --- | --- |
| 1 | Privacy policy | Not verified | No page. Owner supplies text; it will process LinkedIn account data. |
| 2 | Terms | Not verified | Same. |
| 3 | Tracking consent | Not applicable | No trackers in the prototype (no network requests). Recheck if analytics is ever requested. |
| 4 | Frontend secrets | Pass (prototype) | Source inspected: no keys, no external requests. Backend not inspected. |
| 5 | HTTPS | Not verified | Local HTTP only. Check after deploy. |
| 6 | Public form abuse | Not applicable | No public form. |
| 7 | Titles and descriptions | Pass (prototype) | Title "Queue - Postdesk", description present. |
| 8 | Social preview | Not applicable | Private tool. |
| 9 | Favicon | Not verified | Inline placeholder icon only. Owner supplies a logo. |
| 10 | Sitemap and robots | Pass (prototype) | Private app; the page carries noindex. Not an access control. |
| 11 | Image alternatives | Not applicable | No images. Icons are hidden from assistive tech. |
| 12 | Contrast and focus | Pass (prototype) | Computed text contrast has no failures in four states at 1280 and 390; 2 px accent focus outline observed on Tab. |
| 13 | Responsive access | Pass (prototype) | No horizontal scroll at 1280, 640, 390, 320. Real 200% text zoom Not verified. |
| 14 | Not-found recovery | Not verified | Single static file. Real routes come later. |
| 15 | Forms | Not verified | Editor behaves as specified in a scripted run; no server validation exists. |
| 16 | Links | Not applicable | No external links. |
| 17 | Images | Not applicable | None. |
| 18 | Performance | Not verified | Three small files, no network calls; no Lighthouse run. Measure the built app. |
| 19 | Analytics | Not applicable | None requested. |
| 20 | Primary task | Pass (prototype) | One primary per view; "New post" is the single filled action. |

Top gaps: LinkedIn developer app access and token rules (owner), policy pages (owner), the backend and publisher (T2 to T7), a real accessibility pass (T9).
