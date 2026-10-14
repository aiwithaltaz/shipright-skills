# Ship-check

**Date:** 14 October 2026. **Build:** local `site/dist` after the Depth home page. **Host:** not deployed. **Verdict:** Not established. Do not deploy.

Critical limits: no public domain (D6), no logo file, IVC images still empty, and field performance was not measured. Nothing here authorizes a launch.

| # | Item | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Privacy policy | Not applicable | This release excludes legal pages. No policy was supplied. |
| 2 | Terms | Not applicable | Same exclusion. Applicability was not decided. |
| 3 | Tracking consent | Pass | No tracker in `site/src` or the built HTML and JS. No consent UI, because nothing is tracked. |
| 4 | Frontend secrets | Pass | Searched site source and built HTML/JS for common key and analytics names. None found. This is not a security certification. |
| 5 | HTTPS | Not verified | No public host. Local preview is HTTP. |
| 6 | Public form abuse | Not applicable | There is no data form. Copy writes to the clipboard only. |
| 7 | Page titles and descriptions | Pass | `/` title is ShipRight. `/404` title is Page not found. Both have a description. |
| 8 | Social preview | Not verified | The built page has og title, description, and `/og.png` (Depth headline on navy). `site` is unset, so the image URL is not absolute. No crawler was fetched. |
| 9 | Favicon | Pass | `/favicon.svg` is the approved flat navy square. A logo file does not exist yet. |
| 10 | Sitemap and robots | Not verified | `robots.txt` allows all. No sitemap, because a sitemap would invent a host. D6 is still open. |
| 11 | Image alternatives | Pass | Comparison images have alt text. The canvas is `aria-hidden`. The hero still is decorative under the named stage. |
| 12 | Contrast and focus | Pass | check-ui at 1280 and 390 reported 0 failures, including contrast and the first Tab stop. Not a full assistive-technology audit. |
| 13 | Responsive access | Pass | 1280, 390, and 320 had no sideways overflow. At 320 the headline stays two lines. A full-page zoom of 2 on 1280 did not overflow. A separate text-only zoom setting was not used. |
| 14 | Not-found recovery | Pass | `astro preview` returned 404 for `/not-a-real-page` and served the missing page, which links back to `/`. Production was not deployed. |
| 15 | Forms | Not applicable | No data form. Copy was exercised: Codex reported Copied and the clipboard matched the command. |
| 16 | Links | Pass | Eight footer and install URLs returned 200 on this date: the repo, changelog, v1.1.0 release, zip, ChatGPT file, credits, license, and the author org. |
| 17 | Images | Pass | Gallery pairs are the real v1.0 files, about 1.7 MB together, with width and height. Gallery images are lazy. The hero still is eager. |
| 18 | Performance | Not verified | One localhost load and a 60 frame requestAnimationFrame sample on this machine. Not Lighthouse, not field data, not a phone. Desktop mesh is one icosahedron at subdivision 6 (81,920 triangles). Phone uses subdivision 5 (20,480). Pixel ratio is capped. |
| 19 | Analytics | Pass | None was requested and none is present. |
| 20 | Primary task | Pass | The first screen has one filled Install control. check-ui screenshots show the headline, that control, and the metal form. |

check-ui on `/` and `/404`: 0 failures, 0 warnings, at 1280 and 390.
