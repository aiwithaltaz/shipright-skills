# Ship check: preview `index.html`, 16 Oct 2026

Build: local static file, no URL, no deployment. Environment: Chromium through Playwright. Supported devices: 320 to 1536 wide. Critical requirements (outside the 20 items): core flows J1 and J2 work with a back end, row-level access holds, invoices send once. None of these exist yet, so they are Not verified.

Verdict: **Not established.** This is a design preview. It is not a release candidate and nothing here authorizes deploy, publish or payment.

| # | Item | Status | Evidence and next action |
| --- | --- | --- | --- |
| 1 | Privacy policy | Not verified | No page. Owner decides what is required. |
| 2 | Terms | Not verified | Same. |
| 3 | Tracking consent | Pass | No trackers or network calls found; page loads only its own files. Recheck if analytics are added. |
| 4 | Frontend secrets | Pass | No keys in `index.html`. The real build must keep Resend and service keys server side. |
| 5 | HTTPS | Not verified | Local HTTP only. |
| 6 | Public form abuse | Not applicable | No public form; sign-in and send are back end work. |
| 7 | Titles and descriptions | Pass | Title and description set; title changes per view. |
| 8 | Social preview | Not applicable | Private app. |
| 9 | Favicon | Pass | Inline icon. It is a placeholder, not an approved logo. |
| 10 | Sitemap and robots | Not applicable | Private app; add `noindex` in the build. |
| 11 | Image alternatives | Not applicable | No images. |
| 12 | Contrast and focus | Pass | 0 contrast failures; focus ring visible in the walk. |
| 13 | Responsive access | Pass for tested widths | 7 widths, no sideways scroll. 200% text size Not verified. |
| 14 | Not-found recovery | Not verified | Unknown hash routes show the schedule; a real 404 needs the app. |
| 15 | Forms | Not verified | Validation and focus work in the preview. Server validation and duplicate send need the back end. |
| 16 | Links | Pass | Internal hash links only; both resolve. |
| 17 | Images | Not applicable | No images. |
| 18 | Performance | Not verified | Not measured. Static page is small; a real build needs LCP, INP, CLS on real data. |
| 19 | Analytics | Pass | None, as intended. |
| 20 | Primary task | Pass | One filled button per view; the week board leads. |

Top gaps before any launch: back end and row-level access test, invoice send safety, owner decisions on price, invoice wording, tax and sender domain, accessibility run with a screen reader.
