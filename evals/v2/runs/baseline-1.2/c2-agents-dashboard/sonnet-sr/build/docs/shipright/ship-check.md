# Ship check

Date: 2026-10-16. Artifact: `index.html` plus `build/design/tokens.css`, served by a local static server. Environment: headless Chromium. Users and devices: desktop and phone widths. Critical requirements: J1 to J4 from the PRD, the access policy, data integrity. Each launch item starts Not verified.

## Verdict: Needs decision (access policy, data source). Not ready for launch review.

This is a sample-data preview, not a product. Release-critical gaps depend on owner choices: who may act, where agent status comes from, and what Pause, Resume and Decline do on the real platform. Nothing here authorizes deploying, publishing or paying.

## Launch gate

| # | Item | Status | Evidence and next action |
| --- | --- | --- | --- |
| 1 | Privacy policy | Not verified | No public page yet. Owner decides applicability. |
| 2 | Terms | Not verified | Same. |
| 3 | Tracking consent | Not applicable | No tracking or analytics in the preview. |
| 4 | Frontend secrets | Pass | `index.html` holds sample data only, no keys. Not a security certification. |
| 5 | HTTPS | Not verified | Local http only. Check after any deploy. |
| 6 | Public form abuse | Not applicable | No form submits anywhere. |
| 7 | Titles and descriptions | Pass | Title "Agents \| Agent Desk" and a description are present in the file. |
| 8 | Social preview | Not applicable | Internal tool, no sharing need stated. Owner to confirm. |
| 9 | Favicon and icons | Not verified | None supplied. Needs an approved asset. |
| 10 | Sitemap and robots | Not applicable | Private operator tool. A `noindex` choice belongs to the owner. |
| 11 | Image alternatives | Not applicable | No images. Icons are decorative and hidden from assistive technology. |
| 12 | Contrast and focus | Pass | Every text node at three widths measured at 4.5:1 or better. Focus ring seen on every control in keyboard run. |
| 13 | Responsive access | Pass | 1280, 640, 390 and 320 wide, no sideways scroll, task reachable. Text zoom 200 percent Not verified. |
| 14 | Not-found recovery | Not verified | Static server 404 only. Spec defines the 404 page; build it in T2. |
| 15 | Forms | Not verified | Search and select are labeled and keyboard tested. No submit flow exists. |
| 16 | Links | Pass | The only link is the in-page skip link. Scope: this file. |
| 17 | Images | Not applicable | No images. |
| 18 | Performance | Not verified | One 45 KB file and one 3 KB stylesheet, no scripts from outside. No LCP, INP or CLS measured. |
| 19 | Analytics | Not applicable | None requested. |
| 20 | Primary task | Pass | Screenshots show agents that need a person first and one way to open each. Specification stage, one screen. |

## Critical requirements, separate from the 20

| Requirement | Status | Evidence |
| --- | --- | --- |
| J1 See what needs me | Pass at preview stage | First row is Failed in the default view. Sample data only. |
| J2 Open one agent | Pass at preview stage | Keyboard and pointer run, focus returns. |
| J3 Act on a request or failure | Not verified | Simulated in the page. No server, no real effect. |
| J4 Pause and resume | Not verified | Same. |
| Access policy | Fail (specified as Unresolved) | Owner decision required. Blocks T7. |
| Data integrity and freshness | Not verified | Source Unknown. No freshness label by design (D9). |

## Top gaps and next checks

1. Owner supplies the access policy and the data source.
2. Platform owner confirms Pause, Resume and Decline behavior (D6 to D8).
3. After T8, re-run this table on a deployed preview URL with real HTTPS, 404, performance and 200 percent zoom.
