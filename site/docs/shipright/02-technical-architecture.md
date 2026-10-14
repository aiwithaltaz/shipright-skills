# Technical architecture

**Version:** 1.1.0 site preview. **Status:** Proposed.

| Choice | Decision | Why | Switch when |
| --- | --- | --- | --- |
| Site | Astro, static | A few public pages. Little JavaScript. | It needs sign-in: use Next.js. |
| CSS | One token file per direction, plus a page stylesheet | The three looks must not share one skin. | After a direction is approved: delete the other two token files. |
| Type | Self-hosted latin files from Fontsource | No runtime call to a font host. | A supplied brand font replaces the pair. |
| Motion | GSAP with ScrollTrigger | The brief asked for a scroll move on each direction. | The chosen direction drops scroll motion: remove the dependency. |
| Host | Vercel, root `site`, later | Static `dist`. The free tier is enough. Do not deploy in this pass. | A required region: another host. |
| Data | None | Copy and images only. | A saved install needs a new decision. |

GSAP is not MIT. It uses GSAP's standard license. The site installs the npm package for the preview. It is not part of the MIT pack.

## Routes

| Route | Page |
| --- | --- |
| `/` | Direction list. Nothing here is the approved site |
| `/preview/split` | Split |
| `/preview/night` | Night |
| `/preview/press` | Press |
| `/design` | Redirects to `/` |
| `/gallery/*` | Trial images, copied at build, not committed |

## Access

Public read. No sign-in. No secrets. No analytics.

## Performance

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 on the chosen page, measured later. Hero and gallery images have width and height. They load with the page so the preview screenshots show them.

## Install facts

Commands in `src/data/install.js` match the 1.1 README and release `v1.1.0`.

- Any tool: `npx skills add aiwithaltaz/shipright-skills`
- Claude Code: `/plugin marketplace add aiwithaltaz/shipright-skills` then `/plugin install shipright@shipright`
- Cursor, Codex, VS Code (`github-copilot`), Antigravity, and Gemini CLI use the same command with `-a` and `-y`
- Claude.ai: `shipright.zip` from release v1.1.0
- ChatGPT: `shipright-chatgpt.md` from release v1.1.0

The site does not run these commands.

## Risks

The open graph image is still the first version. Replace it after a direction is chosen. Domain stays unset until one exists.
