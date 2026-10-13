# 02 - Technical architecture: trysocialghost.com

**Version/date:** 1.0, 2026-10-13. **Status:** Proposed. Built with in T1; cheap to change before T5.

## Stack

| Part | Choice | Why | Switch when |
| --- | --- | --- | --- |
| Framework | Astro (current stable), static output, TypeScript | Ships almost no JavaScript, fast first paint, Cursor knows it well | Sign-in or app screens are needed: move to Next.js |
| Styling | Plain CSS with custom properties from `design/tokens.css`, scoped styles in `.astro` files | One page; tokens map 1:1 to CSS variables; no build plugin | More than about 5 pages or a team that prefers utilities: add Tailwind v4 with `@theme` mapped to the same tokens |
| Fonts | Geist and Geist Mono from Google Fonts, `display=swap` | Two families, one look | Brand font supplied: replace in tokens only |
| Hosting | Netlify, free plan | Static hosting plus built-in Forms, so no extra service | Need more than the free plan's form submissions per month (check the current cap): paid plan or the switch below |
| Applications | Netlify Forms (HTML form with `data-netlify="true"`, AJAX POST) | Stores submissions, spam filter, email notification to the owner, no server code, no keys | Owner wants to sort or score applicants: Astro endpoint writing to a Supabase table |
| Client script | One small vanilla module for form validation, submit and motion | No framework runtime needed | n/a |
| Analytics | None | Not requested | Owner asks: add a cookieless tool, with consent if required |

Domain `trysocialghost.com` is pointed at Netlify by the owner. Nothing is deployed, bought or signed up for by the coding tool.

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | S1 Home | Sections `#how`, `#fit`, `#feedback`, `#faq`, `#apply` |
| `/404` | S2 Not found | Astro `src/pages/404.astro` |
| `/design` | D1 Design preview | Built in T1. `noindex`, not linked from any page |

## Data: Application

Stored only in Netlify Forms, form name `beta-application`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `email` | email | Yes | `autocomplete="email"` |
| `channel_url` | url | No | Must start with `https://` when filled |
| `topic` | text, max 120 chars | Yes | What the videos will be about |
| `planned_videos` | one of `1`, `2-3`, `4+` | Yes | Videos planned in the first 3 days |
| `feedback_commitment` | `yes` | Yes | Checkbox |
| `bot-field` | hidden honeypot | No | `netlify-honeypot="bot-field"`; must stay empty |

Netlify adds the submission time. No other fields, no tables for later ideas.

## Access

| Who | Can |
| --- | --- |
| Visitor | Submit an application. Cannot read any submission |
| Owner | Read, export and delete submissions in the Netlify dashboard |

Submissions are never rendered on the site, logged to the console or put in URLs. The success panel shows the email only from the in-page form value.

## Submit request

`fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body })` with `form-name=beta-application` plus fields.
Treat only a 2xx response as sent. Any other result or a network error is "did not send". Timeout after 15 s counts as failed; the values stay.
Netlify only detects the form at build time, so the form markup must exist in the static HTML (not created by script).

## Environment variables

None. No keys in front-end code or tickets.

## Performance and quality budgets

- LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile, measured on the deployed page.
- Total JavaScript under 15 KB gzipped. No images; the hero frame is HTML and SVG.
- Fonts preconnected; text renders with fallback while fonts load.

## Risks

| Risk | Mitigation |
| --- | --- |
| Form not detected by Netlify | T5 checks a test submission arrives in the dashboard after deploy preview |
| Spam | Honeypot plus Netlify spam filter. Add reCAPTCHA only if spam appears |
| Launching without a privacy policy | T9 is blocked on O1 |
