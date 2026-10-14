# 02 - Technical architecture: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** stack is Proposed (delegated, D5 in 01-prd.md). Build T1 with it; changing it now is cheap.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| Site framework | Astro, current stable version, static output | One fast page, almost no JavaScript, Cursor knows it well. | The site needs sign-in or app screens: move to Next.js. |
| Styling | Plain CSS with `design/tokens.css` and scoped Astro styles | One page and a small token set. No build plugin to learn. | The site grows past about five pages or a team prefers utility classes: add Tailwind and map the same tokens. |
| Fonts | Instrument Sans from Google Fonts, `display=swap`, weights 400, 500, 600 | One family keeps the page light. | Owner supplies brand fonts: self-host them. |
| Form handling | A hosted form service such as Formspree. The browser posts JSON to its endpoint. | No server, no database, an inbox and email alerts for the owner. | Over the free plan's monthly limit, or the owner wants tester status tracking: add a small serverless function and a database table. |
| Hosting | Vercel, Netlify or Cloudflare Pages, static | Free plans cover a static page. Check current plan terms. | Never sign up, buy or deploy for the owner. |
| Analytics | None | Not requested. | Owner asks: choose a cookieless tool and update S2 first. |

## Routes

| Route | Screen | File |
| --- | --- | --- |
| `/` | S1 Home, with anchors `#how`, `#who`, `#faq`, `#apply` | `src/pages/index.astro` |
| `/privacy` | S2 Privacy notice | `src/pages/privacy.astro` |
| any unknown path | S3 Not found | `src/pages/404.astro` |
| `/design` | Token preview for T1. Not linked. Remove or block indexing before launch. | `src/pages/design.astro` |

## Data

The site stores nothing. One object leaves the browser:

| Field | Type | Required | Rule |
| --- | --- | --- | --- |
| `name` | text | Yes | 1 to 80 characters |
| `email` | email | Yes | Valid email format |
| `channel_status` | one of `faceless`, `not_faceless`, `none` | Yes | |
| `channel_url` | URL | No | Must start with `https://` if given |
| `first_video` | text | Yes | 10 to 500 characters |
| `feedback_commitment` | boolean | Yes | Must be `true` |
| `_gotcha` | text | No | Honeypot. Hidden from people. A filled value means spam; the service drops it. |

Request: `POST {PUBLIC_FORM_ENDPOINT}` with `Content-Type: application/json` and `Accept: application/json`.
Result: 2xx means sent. Any other status or a network error means not sent. Show the service's field errors if it returns them; otherwise show the general error.

## Access

| Who | Can read | Can change |
| --- | --- | --- |
| Visitor | Public pages | Can send one application per submit |
| Owner | Applications, in the form service account | Everything in that account |

Applications are never shown on the site. The `/design` page holds no private data.

## Environment variables

| Name | Where | Holds |
| --- | --- | --- |
| `PUBLIC_FORM_ENDPOINT` | Hosting settings and local `.env` | The form service endpoint URL. It is public by design. No secret keys exist in this release. |

When `PUBLIC_FORM_ENDPOINT` is empty, the form shows "This form is not connected yet. Nothing was sent." It never fakes success.

## Performance budget

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile on real pages.
- The hero illustration is inline SVG. No image files above the fold.
- Font: preconnect to Google Fonts, `display=swap`, three weights only.
- JavaScript: the form script and the hero animation only, loaded as small inline modules.

## SEO and sharing

- Title: "SocialGhost: faceless YouTube videos with AI. Apply for the beta."
- Description: "SocialGhost is live in a limited beta. Testers get free access in return for useful feedback within 2 to 3 days."
- Canonical: `https://trysocialghost.com/`. Social preview image: none until the owner supplies one.
- `/design` and `/404` carry `noindex`.

## Risks

| Risk | Effect | Mitigation |
| --- | --- | --- |
| Spam submissions | Owner wastes review time | Honeypot field plus the service's spam filter |
| Duplicate submissions | Two rows for one person | Disable the button while sending. Owner removes duplicates. |
| Free plan limit reached | New applications rejected | The error state tells the visitor. Owner watches the count. Switch point above. |
| No privacy notice | Cannot launch the form | S2 ticket blocks launch until the owner supplies text. |
