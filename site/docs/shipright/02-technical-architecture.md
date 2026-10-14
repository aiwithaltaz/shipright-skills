# Technical architecture

**Version:** 1.0.0 site. **Status:** Proposed (delegated).

| Choice | Decision | Why | Switch when |
| --- | --- | --- | --- |
| Site | Astro, static | One marketing page. Little JavaScript. | It needs sign-in or app screens: use Next.js. |
| CSS | `design/tokens.css` and one stylesheet | Tokens map straight to variables. | The site grows past about five pages: add Tailwind mapped to the same tokens. |
| Font | IBM Plex Sans, self-hosted latin files | No runtime call to a font host. | A supplied brand font replaces it. |
| Motion | CSS | One rule and a 16 px rise. | A pinned scroll section needs GSAP ScrollTrigger, under its own license. |
| Host | Vercel, root directory `site` | Static `dist`. Free tier is enough. | A required region or worker: another host. |
| Data | None | Copy and images only. | A saved install or account needs a database, and a new decision. |

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/design` | Design preview |
| `/og.png` | Social image |
| `/gallery/*` | Copied trial images, built, not committed |

## Access

Public read. No sign-in. No secrets. No analytics.

## Performance

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 on the home page. The hero is text. Gallery images are lazy and have width and height.

## Integrations

- Skills CLI commands are text. The site does not run them.
- Zip URL: `https://github.com/aiwithaltaz/shipright-skills/archive/refs/heads/main.zip`
- GitHub links for the changelog, releases, credits and license.

## Risks

Native installs are not verified for pack 1.0. The page says so. The plugin install name is empty until 1.1 sets it.
