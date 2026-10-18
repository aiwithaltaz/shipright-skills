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
