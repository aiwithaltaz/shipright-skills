# ShipRight 1.7.0

**Date:** 2026-10-23. **Status:** release candidate. Not released until the owner says yes. No zip asset. Install from this repository. Backup tag backup-2026-10-23-pre-1.7 points at 1.6.0 (14340b9).

## In one line

New builds now pick colors on purpose, look good at desktop width, and run a leak check before they say done. Phone-app builds start from a small kit with three style packs.

## What changed

- **Color step (new, `steps/02a-color.md`).** Use the app's own colors if it has them. If not, look at 3 to 5 competitors, write their colors in PRODUCT.md, and propose a palette that feels familiar for the category but is its own. Never reuse a palette from an earlier project. No default black with neon.
- **Poster style is opt-in.** The style must fit the audience. A calm habit app gets a calm look. Editorial and tactile are the other packs.
- **Desktop width rule.** At 1280 px the app uses the width (two columns or a side panel), has no phone tab bar, and labels are 13 px or larger.
- **One count only.** The same number never shows twice in different forms on one screen.
- **Sample data, keep or clear.** First open offers "Keep sample" or "Start fresh". Today shows progress and recent history.
- **Leak check (`scripts/check-leaks.mjs`).** Reads the visible text and blocks "done" when it finds planning words ("placeholder", "TODO", "Not listed", "per PRODUCT.md") or fused labels like "streakWeekdays". `--render` finds Playwright and Chrome by itself and reads text with uppercase styling off.

## Also in this release (added since 1.6.0)

- Five steps instead of four: Research, Product, UX, UI, Look and fix. Research uses real references of the same type. For a redesign it writes a keep-what-works audit (`BASELINE.md`), and the result must keep or beat the old site's motion, 3D, media and proof.
- New UX step: the audience's real question, scope at a glance, information order, flows and states.
- Phone-app starter kit (`kits/phone-app/`) with three style packs (editorial, poster, tactile), plus hard word limits and clarity rules.
- Motion and depth pack for portfolios, marketing and launches only (GSAP, Three.js, reduced motion, performance).
- Look and fix is required: screenshots at 390 and 1280, mid-animation frames, overlap checks, craft-vs-before checks, at most 3 rounds, and a `LOOK-REPORT.md`.

## Blind test results (honest)

Habit tracker, same prompt, built by the Technical Lead bot. A = without ShipRight, I = this release. Two judges (DeepSeek and OpenAI), normal and hard mode, both orders, 3 roles. "Both agree" means 2 of 2 judges.

| | Looks | Product |
|---|---|---|
| DeepSeek | 99% | 83% |
| OpenAI | 100% | 63% |
| Both agree | 99% | 56% |

- Looks pass the 80% bar by far. Product passes for each judge alone, but "both agree" is 56%, under the 70% bar.
- The Week screen was weakest (33% product). The add form on desktop and the dense 7-day rows were also called out.
- One build each, and the I build came right after the A build in the same chat, so the bot may have learned. A single run is noisy.
- Earlier versions G and H lost to the plain build on Grok Build (H: looks 12%, product 35%). That is why the color step and poster opt-in were added.

## Not included

- The UX-designer depth versions (J2 and K: pain points, journeys, information architecture, critique scores) did not pass their tests yet, so they are not in 1.7.0.
- Later habit versions I3 and I4 are not included. I4 lost to I on product (39%).

## Known limits

- Four unit tests fail in the test box (three in phase 2 and one crawl test). They need a Playwright browser that is not installed there, and they failed the same way on 1.6.0. Six site and check-ui test groups are skipped for the same reason. All other tests pass (76 run), plus the sources and context checks.
- The static leak scan can flag an HTML `placeholder="..."` attribute written inside a JavaScript string. Use `--allow placeholder` and say why in `LOOK-REPORT.md`.
- This release has no score of 8.5 out of 10 on research, product, architecture, UX and UI. Publishing and sharing is a separate decision for the owner.
- The site case studies and benchmark numbers are from ShipRight 1.6 runs and say so.

# ShipRight 1.6.0

**Date:** 2026-10-21. **Status:** released as v1.6.0. No zip. Install from this repository. Backup tag backup-2026-10-21-pre-1.6 points at 1.4.0 (f4fb20a).

## In one line

ShipRight is lean again: think about the product, then design from 2 or 3 real products of the same type.

## Why

In A/B builds with Grok Build, adding more rules made designs plainer (CRM craft: 1.5 scored 19/40, 1.4 23, no skill 27). A short reference-first pack won: CRM craft 30 vs 27 and thinking 22 vs 19; salon app craft 31 vs 28 and thinking 24 vs 21. We graded these ourselves, not blind.

## What changed

- SKILL.md is 369 words and points at 4 numbered step files: Product, Design, Build, Look and fix.
- Step 1 writes a durable `PRODUCT.md` (idea, research, users, PRD, flows and states, sample data). Step 2 writes `DESIGN.md` (product type, 2 or 3 real references of the same type and audience, customer and admin shells, a brand mood from the product's own world, tokens). Every later step reads them.
- A genericness test before code: would this look like any other AI app? It names the AI default look to avoid (cream background, high-contrast serif, terracotta or copper accent).
- Look and fix: a fresh critic pass on desktop and phone screenshots that ignores the plan. Fix the top 3 problems, at most 3 rounds.
- Heavy 1.4 effects (sound toggle, camera flight, cursor 3D, entry gate and more) are listed in an optional `extras/` folder. The core steps never load them. The files stay in their old place because the context policy is locked by a test.
- New `product-references/` library by product type: consumer booking, B2B internal tool and dashboard, landing page or dev tool, ecommerce, content or media, mobile app.
- Short build checks fix bugs we saw in the tests: cut-off content, labels and prices not updating after a change, the core item missing from the phone's first screen, typos, unformatted phone numbers, misaligned rows, fake-looking photos.
- New builds no longer route through the 10 stage files, three options and the card dealer. Stages for existing apps, feedback rounds, critique and ship check stay, and the planning templates (research brief, scope, screen spec) are linked.

## Habit app test (with 1.6)

Same prompt in Grok Build (Grok 4.7), one run each: a habit tracker phone app. Without ShipRight: craft 28/40, thinking 21/28. With ShipRight 1.6: craft 29/40, thinking 24/28. The craft win is small: the plain build looks polished but uses the common cream and serif look. Graded by us, not blind. Case study: site/habit-case-study.html.

## Not done

- No Claude eval runs. No blind grading yet.

# ShipRight 1.4.0

**Date:** 2026-10-19. **Status:** released as v1.4.0 (PR #24, merged as f4fb20a). No zip. Install from this repository.

## In one line

ShipRight now has a knowledge library, and it only reads the few cards each stage needs.

## What changed

- 445 rule cards from 64 public sources, each with a quote, a link and a check. The base (idea, research, flows, architecture, app states, SaaS building) has the most cards.
- `deal.mjs` picks 5 to 8 cards per stage and 3 visual directions at stage 7, so the skill does not get longer.
- Stage 1 writes an idea brief. Stage 5 lists every screen with its job, one action, and empty, loading and error states. Stage 8 starts from project rules. Stage 10 adds security, preview and QA, and monitoring.
- Two new browser checks (heading color words, pin length) and a record check (`check-record --base --ship`).
- A fixed CRM dashboard benchmark for later runs.

## Evidence

| Check | Result |
| --- | --- |
| Unit tests | see the PR for the final count |
| check_sources, check_context | pass |
| Dealt cards per stage | 1102 tokens at most, cap 1200 |
| Premium check-ui on home and case study | 0 fails, 0 warns at 390 and 1280 |
| DeepSeek cost for distilling | under 0.50 US dollars |
| Claude evals and the CRM benchmark | not run |

## What is not true yet

There is no score that shows 1.4 builds better products. The benchmark is written but has not been run. Taste is Not verified.

# ShipRight 1.3.1

**Date:** 2026-10-18. **Status:** released as v1.3.1. Site not deployed. No zip. Install from this repository. Eval scores pending.

## In one line

The test step now catches the bugs the 1.3.0 site showed, and the site is rebuilt to those rules.

## What changed

Stage 9 measures hidden states, the fallback poster, every pinned frame, slider alignment, phone nav wrapping, and stale release claims. The premium profile also measures a product on the first screen, a new composition per act, an accent that names its source, and empty cards.

The site puts the five files a run writes on the first screen. Keel is not on the page. Sections no longer repeat one split layout. The accent is sealing wax. Copy does not say draft, not released, or not started.

## Evidence

| Check | Result |
| --- | --- |
| Premium check-ui on the 1.3.0 home page, before the fix | 19 fails, 0 warns |
| Premium check-ui on the 1.3.1 home page and the case study | 0 fails, 0 warns, at 390 and 1280 |
| run-tests.mjs | 18 of 18 steps passed |
| consistency.mjs | pass on both pages |
| check-record.mjs on site/record | pass |
| 1.3 grades | not run |

Screenshots of each section and each pinned frame are in `site/evidence/v1.3.1/`. The per-section note is `site/evidence/v1.3.1/WHY.md`.

## What is not true yet

Sonnet plus 1.3 has not yet been shown to beat Opus. Do not say that it does. Taste is Not verified.

## Limits

Software WebGL. One browser. Not a full accessibility audit. Nothing was deployed.

---

# ShipRight 1.3.0

**Date:** 2026-10-18. **Status:** released. No zip. Install from this repository. Eval scores pending.

## In one line

Turn an idea into a tested product your AI builds right.

## What changed

The skill now runs research, options, a build, tests, and a record. A case study is written only from that record. A pitch deck is opt-in and cannot invent traction. The website shows a real run shape, real baseline screenshots, and the words "results coming" where a 1.3 score would go.

## Evidence

| Check | Result |
| --- | --- |
| Premium check-ui on the home page and the case study | 0 fails, 0 warns, at 390 and 1280 |
| run-tests.mjs | 18 of 18 steps passed |
| consistency.mjs | pass |
| check-record.mjs on site/record | pass |
| 1.3 grades | not run |

Screenshots of each section are in `site/evidence/v1.3/`.

## What is not true yet

Sonnet plus 1.3 has not yet been shown to beat Opus. Do not say that it does. The win check, the fix loop, the variance reruns, and the Haiku report are waiting on Claude runs. See `evals/v2/runs/release-1.3/RUN-GUIDE.md`.

## Limits

Software WebGL. One browser. Not a full accessibility audit. Taste is Not verified. Nothing was deployed.

---

# ShipRight 1.0 release notes

**Date:** 2026-10-13. **Status:** release candidate on branch `claude/nifty-brahmagupta-ds6xrg`. Not merged or published; Altaz approves merges.

## In one line

Bring an idea; get a build pack your coding tool can follow ticket by ticket, with screens that look designed, not generated.

## What is new

| Area | 1.0 |
| --- | --- |
| Front door | New build-pack skill: frame, flows, stack, design system, screens, ticket prompts, pack check |
| Design system | Four starter systems with measured contrast; your own system or Figma wins; a quick OK before screens |
| Screens | Dense but calm by default; mobile and marketing rules; preview pages open in the default state |
| Motion and 3D | Purpose first, reduced motion always, GSAP and Lenis only where they help, 3D budgets and fallbacks |
| Tickets | Paste-ready prompts with files to read, done-when checks and a stop line; T1 builds a `/design` preview |
| Checks | check-ui measures rendered pages; critique runs a look-and-fix loop; ship-check names Core Web Vitals |
| Size | About 30,000 guidance tokens (0.6.2: 37,070), loaded in bounded stages |

## Proof

Four fixed requests (SaaS dashboard, mobile booking flow, SocialGhost marketing site, 3D speaker site), run by fresh agents with the old and new packs, graded blind with a rubric written before any change.

| | 0.6.2 | 1.0 |
| ---: | ---: | ---: |
| Final trial, total of 120 (3D after fix) | 93 | 112 |
| Final trial as first run (3D unshippable) | 93 | 105 |
| Phase 3 trial, total of 120 | 94 | 107 |
| Average reply words (final) | 725 | 305 |
| Average build pack words (final, excluding the 3D re-run) | 9,480 | 7,670 |

The first final 3D run hid its content behind a scroll animation. The motion rule now forbids that and check-ui fails it; a fresh blind re-check scored 26 against 23. Details: [evals/v1/results-final.md](evals/v1/results-final.md).

## Limits

- One or two runs per case. Graders and builders are the same model family. Synthetic prompts are not user research.
- The trial prompt forbids running the checker, so the look-and-fix loop was not exercised in trials.
- check-ui measures selected rules. It does not prove good design, full accessibility or real-device behavior.
- Native client installs are not verified. Manual file-based use is the portable route.

## Upgrade

Replace the pack folder. Existing project documents keep working; new packs use the compact file set in build-pack's pack contract.
Old reference paths were merged; see the path map in architecture.md and evals/check_sources.py (MERGED).

## Credits

Ideas, never text, from Taste Skill, Vercel web-interface-guidelines, Anthropic frontend-design, Emil Kowalski's skills, UI/UX Pro Max, and pattern names from Vengeance UI, Skiper UI, ThreeUI and Animmaster Lib. Full list and licenses: [SOURCES.md](SOURCES.md).
