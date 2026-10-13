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
| --- | ---: | ---: |
| Phase 3 trial, total of 120 | 94 | 107 |
| Cases graded better | 0 | 4 |
| Average reply words | 725 | 310 |
| Average build pack words | 9,480 | 7,200 |

The final trial on the release candidate is in [evals/v1/results-final.md](evals/v1/results-final.md).

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
