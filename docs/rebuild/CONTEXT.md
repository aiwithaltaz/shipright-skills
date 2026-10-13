# ShipRight v1.0 rebuild: context

Single source of truth. Read this at the start of every phase.

## Goal

Ship ShipRight 1.0: an idea goes in (website, SaaS app, mobile app, or 3D site) and a build pack comes out.
The pack holds a PRD, architecture and stack choice, a design system with tokens and states, screen specs,
and small ordered tickets written as ready-to-paste prompts for the user's coding tool.
Output should look like a top agency made it: modern, clean, dense but calm, zero AI slop.

## Inputs

- docs/rebuild/BLUEPRINT.md: Altaz's knowledge library and training blueprint. Main brief. Saved verbatim (it contains em dashes; it is a source file, not pack text).
- The rebuild prompt from Altaz, 2026-10-13.
- Pack 0.6.2 plus Phase 1 to 5.1 work on main (head 8233744).

## Altaz's taste

Careful spacing. No extra fluff. Well organized. Dense but clean. Sleek and modern.
Skip trends that fight this: huge empty padding, decoration everywhere, gradient-glow slop.
Simple English. No em dashes. Ask only when a decision truly needs Altaz.

## Lessons to respect

- Phases 5 and 6 added theory; output did not visibly improve (tied at 8/10) and replies got longer.
- Past runs lost context and redid work. Keep PROGRESS.md current.
- Every rule must change output. Prefer short, checkable rules and worked examples.

## Audit facts (2026-10-13)

- Guidance: 37,070 tokens in skills/ (product-design 15,291; ui-ux-design 12,935; ux-critique 3,839; _shared 2,986; ship-check 2,019).
- Largest normal path: ui-ux-design 10,888 of 12,000.
- On main: check_sources passes; check_context and 2 tests need the tokenizer file.
- Tests: 139. Six phase test files pin exact wording of old references.
- Evals: 495 files, mostly historical text trials. Phase 5 scored 138 vs 142 of 144, four cases at ceiling.
- No 3D, GSAP, stack choice, mobile platform, or marketing-page guidance. No rendered-output checker.

## Environment notes

- Network: GitHub and PyPI open. Most design sites (awwwards, threejs.org, gsap.com, nngroup) blocked from the shell; WebSearch works.
- Tokenizer: the official cl100k_base file is blocked. Taken from PyPI wheel tiktoken_offline 0.1.1; its SHA-256 matches tiktoken's own expected hash (223921b7...65b2a7). Use TIKTOKEN_CACHE_DIR in the scratchpad. CI on GitHub downloads normally.
- Chromium at /opt/pw-browsers; Node 22 with global Playwright 1.56.1.

## Baseline findings (Phase 1, 2026-10-13)

The frozen baseline (0.6.2 + 5.1) is stronger than the plan assumed. Do not build a straw man.
- Screens are clean and honest: sample-data labels, no invented metrics, labeled fields, one primary action.
- Build packs are complete but long: 8,000 to 10,400 words per case, 8 to 9 files, plus a 600 to 840 word reply.
- Stack is proposed with reasons (Next.js, Supabase, shadcn; Vite + three.js for 3D) but marked "Proposed, blocked until owner confirms".
- Tickets have acceptance checks but are not paste-ready prompts: no files to read or change, no stop condition, several start Blocked.
- Visual gaps: dashboard has 9 controls under 24px; 3D page uses an eyebrow label and a bordered card around the canvas; marketing hero is a generic split layout.
- Headroom, so Phase 2 to 5 targets: (1) shorter pack with the same completeness, (2) tickets as prompts that can run without waiting, (3) denser, more crafted screens, (4) motion and 3D quality with budgets, (5) touch targets.

## Decisions

| ID | Decision | Why | Status |
| --- | --- | --- | --- |
| D1 | Keep the blueprint verbatim, including em dashes; exempt that one file in check_sources in Phase 1. | Altaz asked to save the file. Editing it changes the source. | Made |
| D2 | Score with fresh blind grader agents plus the rendered-screen checker. I never score. | "Do not grade your own homework loosely." | Made |
| D3 | Freeze one baseline run of main 8233744 for all phase comparisons. | Saves reruns, keeps one fixed bar. | Made |
| D4 | Fifth skill `build-pack` as front door. | One idea-in path. | Approved by Altaz 2026-10-13 |
| D5 | Starter systems with real numbers, marked Proposed. The user's own design system or Figma always wins. A new app shows its system for a quick OK before screens are built. | Empty scales caused generic output. | Approved by Altaz 2026-10-13, with those two conditions |
| D6 | Retire phase tests that pin old wording. Keep tests for the safety rules: no invented facts, stay in scope, nothing ships without approval. | Cutting text otherwise breaks 6 test files. | Approved by Altaz 2026-10-13. Done in Phase 1 (tests/test_v1_safeguards.py) |
| D8 | Trial pages load three.js, GSAP and Lenis from a committed offline vendor folder (evals/v1/vendor). | CDNs are blocked in this container; Google Fonts work. Same for both arms. | Made |
| D9 | check-ui serves pages from a throwaway local server and uses SwiftShader WebGL. | Module scripts fail on file://; headless needs software GL for 3D. | Made |
| D10 | Raw trial outputs and grades are exempt from the em dash source rule; the checker measures em dashes instead. | Evidence must stay unchanged; style misses are scored, not edited. | Made |
| D7 | Provenance and theory move to a SOURCES.md that skills never load. | Credit stays; tokens drop. | Made |

## Sources reviewed

Borrow ideas only. Never copy text. Credit in SOURCES.md.

| Source | License | What to borrow |
| --- | --- | --- |
| Taste Skill (github.com/Leonxlnx/taste-skill) | MIT | Rules measured in a real browser; screenshot look-and-fix loop; "removing ornament is half the job, add substance"; argument-first page sections; house rules with numbers. Built for marketing pages, not app screens. |
| Vercel web-interface-guidelines | MIT | Concrete, checkable interface rules: focus-visible, paste, autocomplete, tabular numbers, image dimensions, URL state, destructive confirm or undo. |
| Anthropic frontend-design skill | Apache 2.0 | List of current generated-design defaults to avoid; plan tokens, then review the plan against the brief before building; one bold element, rest quiet. |
| Emil Kowalski skills (github.com/emilkowalski/skill) | MIT | Should it animate (frequency gate), purpose word, duration and easing tables, never scale(0), interruption, reduced motion; worst-case content catalog. |
| UI/UX Pro Max (nextlevelbuilder) | MIT | Design-system-first output persisted as one master file. Large style database rejected (see below). |
| Vengeance UI (vengenceui.com; GitHub Ashutoshx7/VengeanceUI) | MIT on the GitHub repo; site says open source | Pattern names for landing-page motion (dock, spotlight nav, reveal loader). Ideas only. Not the default look. |
| ThreeUI by Meng To (threeui.com/browse; Community edition) | MIT for Community code; Pro and remote thumbnails excluded; site unreachable here | Procedural 3D hero patterns with live controls; registry install via shadcn CLI. Ideas only. |
| Skiper UI (skiper-ui.com, by Gurvinder Singh) | Free and Pro tiers; shadcn registry install; free use reportedly needs attribution; no license text found; site unreachable here | Ideas only: "uncommon" micro-interactions (image reveal, dynamic island, tooltips). No code or text. |
| component.gallery (Iain Bean) | No license found | Component names and comparison index. Ideas only, already credited. |
| Animmaster Lib (animmasterlib.dev, by Sergio Animmaster) | Site unreachable from this container; described as 300 PRO-level animated components (scroll effects, WebGL shaders, heroes, sliders, menus). No license text found. | Ideas only: pattern names for scroll and hero motion. Nothing copied. |
| GSAP | Free for commercial use including plugins since 2025 (standard license, with a prohibited-use clause for Webflow competitors) | Safe to recommend ScrollTrigger, SplitText. Note the clause. |
| Lenis | MIT; honors prefers-reduced-motion by default | Smooth scroll for marketing only; drive from GSAP ticker. |
| React Three Fiber docs (pmndrs) | MIT | frameloop demand, capped dpr, instancing, adaptive performance. |
| Laws of UX (Jon Yablonski) | CC BY-NC-ND 4.0 | Ideas only; cite the original research names, never the site's text. |
| Blueprint sources (WCAG 2.2, ARIA APG, DTCG 2025.10, Material 3, GOV.UK, Carbon, Fluent, Core Web Vitals) | Per BLUEPRINT.md source policy | Accessibility contract, token layers, CWV thresholds (LCP 2.5s, INP 200ms, CLS 0.1). |

## Rejected and why

- Copying any component code or text from Vengeance UI, Skiper UI, ThreeUI. Ideas only.
- A big style database (UI/UX Pro Max style). It adds length and drifts toward trends; four starter systems are enough.
- Taste Skill's hard image floor (4+ photos) and required motion count. Fits award marketing pages, fights dense product UI and Altaz's no-fluff taste.
- Fine-tuning now. The blueprint itself says later, after reviewed examples exist.
- A 300 to 500 rule retrieval index now. Too big for this release; rules first, examples second.

## Open questions

- Animmaster: Altaz will send more later. Continue without it.
- The three library sites (Skiper, Animmaster, ThreeUI) do not resolve from this container. Reviewed through search results only.
