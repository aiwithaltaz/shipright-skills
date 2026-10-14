# 02 - Technical architecture: SocialGhost beta site

**Version/date:** 1.0, 2026-10-13
**Sources and approval:** stack is Proposed (D4 in 01-prd.md). T1 builds with it; changing it before T2 is cheap.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| Framework | Astro, current stable, static output, TypeScript | Fast pages with almost no JavaScript; Cursor knows it well; content is easy to edit | The site needs sign-in or app screens: move to Next.js |
| Styling | Tailwind CSS, current stable, reading tokens from `design/tokens.css` | One token source; utilities keep Cursor from inventing values | Never needed for this size |
| Hosting | Netlify, free plan to start | Static hosting plus a built-in form service, so one account instead of two | You prefer Vercel: host there and send the form to Formspree instead |
| Form | Netlify Forms (`data-netlify="true"`, honeypot field `company`) | No server code; submissions appear in the Netlify dashboard and can email the owner | Volume passes the plan's free monthly limit (check Netlify's current limit), or you want rows in a spreadsheet: a small serverless function, as a new decision |
| Fonts | Instrument Sans from Google Fonts, or self-hosted with `@fontsource` | Free, readable, not the default every site uses | Brand fonts arrive: they win |
| Analytics | None | Not requested; no cookie banner needed | Owner asks: add a privacy-friendly tool with consent where required |

Cost: the default plans are free. Never sign up, buy, connect a domain or deploy for the owner.

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 Home | Sections have anchors `#deal`, `#who`, `#how`, `#faq`, `#apply` |
| `/applied` | S2 Application received | Form `action`; `noindex` |
| `/404` | S3 Not found | Netlify serves `404.html` |
| `/design` | Token preview from T1 | `noindex`, not linked anywhere |

## Data

One object: **Application**, stored only in Netlify Forms.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | text | Yes | `autocomplete="name"` |
| `email` | email | Yes | `autocomplete="email"` |
| `channel` | url | No | Must start with http(s) if filled |
| `plans` | text, 20+ characters | Yes | What videos they want to make |
| `commitment` | checkbox `yes` | Yes | Feedback within 2 to 3 days of access |
| `company` | honeypot | Must be empty | Hidden from people, catches bots |

No database. No tables for selection status or feedback: the owner handles those outside the site.

## Submission flow

1. Without JavaScript: the form POSTs to Netlify, which redirects to `/applied`.
2. With JavaScript: validate in the browser, disable the button, `fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form)) })`.
3. On a 2xx response: store the email in `sessionStorage` under `sg-applied-email`, then go to `/applied`. `/applied` shows it once and removes it.
4. On any other response or a network error: show the form alert, keep all answers, re-enable the button.

Never put the name or email in a URL, a log or analytics.

## Access

- Visitors can only create an application. They cannot read any.
- Only the owner's Netlify account can read submissions. Turn on Netlify's email notification to the owner's address (owner action).
- Spam: honeypot field first. Turn on Netlify's spam filtering if it is offered on the plan.

## Environment variables

None needed. If the form moves to a function later, keys go in Netlify's environment settings, never in code.

## Performance budgets

LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile on real pages. The hero headline is the LCP element. The illustration is inline SVG: no image request. Page JavaScript under 10 KB.

## Risks

| Risk | Effect | Owner | Next evidence |
| --- | --- | --- | --- |
| No privacy policy (O3) | The form should not go live | Owner | Policy URL linked under the submit button |
| Netlify does not detect the form | Submissions are lost | Builder, T5 | Form listed in the Netlify dashboard after deploy, 3 test submissions received |
| Spam floods the form | Real applications are buried | Owner | Watch the first week |
