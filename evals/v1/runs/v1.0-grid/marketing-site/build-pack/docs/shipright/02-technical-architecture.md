# 02 Technical architecture: SocialGhost beta site

**Status:** Proposed (delegated). Built for Cursor. Versions: use the current stable release of each tool.

## Stack

| Layer | Choice | Reason | Switch when |
| --- | --- | --- | --- |
| Framework | Astro, static output | Marketing site: fast by default, almost no JavaScript | The site needs sign-in or app screens: move to Next.js |
| Styling | Tailwind CSS, theme mapped to `design/tokens.css` | Utility classes read the same tokens as the reference | You prefer plain CSS: keep tokens.css and drop Tailwind |
| Font | Instrument Sans, self-hosted through Fontsource, `font-display: swap` | No third-party request at load | You supply a brand font |
| Hosting | A static host: Vercel, Netlify or Cloudflare Pages | Free tiers usually cover one page. Cost: Unknown, check the plan | Needs server code beyond one function |
| Form | A hosted form service posting JSON (for example Formspree, or Netlify Forms on Netlify) | No server, no database, the owner reads applications in an inbox or dashboard | Volume or review needs grow: add a small database in a later phase |
| Motion | CSS only | One short bar fill. No animation library | A later phase asks for scroll motion |

Add no database, auth, CMS, analytics or email service. None has a job in this release.

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 Home with S2 Apply form | Only production route. Sections use anchors: `#what`, `#how`, `#who`, `#faq`, `#apply` |
| `/design` | T1 preview of tokens and components | Development only. `noindex`. Removed from the production build |
| `/404` | Plain not-found page with a link to `/` | Default host behavior is enough if the host provides it |

## Data

No database. An application is a form post with these fields: `email`, `channel`, `make`, `feedback_window_ok` (true). A hidden `company` field is a honeypot and is never sent. The form service holds applications. Retention and deletion rules: Unknown, owner. No sensitive data is collected. Do not put the email in a URL, log or analytics event.

## Access

No accounts and no roles. Visitors can read the page and post one application. Only the owner can read applications, through the form service login. Nothing is hidden by navigation.

## Environment variables

| Name | Where | Secret? |
| --- | --- | --- |
| `PUBLIC_FORM_ENDPOINT` | Build time, copied into the form's `data-endpoint` | No. A form URL is public by nature. Never put an API key here |

Do not commit keys. If the chosen service needs a private key, stop and ask.

## SEO and sharing

Title, description and canonical `https://trysocialghost.com/`. One `h1`. `lang="en"`. No Open Graph image until a real asset exists. `robots` allows `/`. No structured data with invented ratings.

## Performance and accessibility budgets

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile. Page weight under 150 KB before fonts. JavaScript only for the form, under 5 KB. WCAG 2.2 AA practical checks in `build-rules.md`.

## Risks

- Spam applications: honeypot plus the service's own filter. Add a challenge only if spam appears.
- Form service outage: the failure message keeps answers and says to retry. An email fallback needs a supplied address (Q-5).
- Copy drift from owner facts: every claim traces to `01-prd.md` product facts. Check on each edit.
