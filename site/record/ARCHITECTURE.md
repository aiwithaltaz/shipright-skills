# Architecture

Status: current

## Stack

- This case study is a static page in site/. It uses the site type and color.
- It does not change the desk prototype. The prototype stays in evals/v2/cases/c7-ivc-app/app/.
- No new service, account, or payment.

## Data

- Screenshots are copies of the before shots. Text is copied from the case message and the answer key counts above.

## Screens

| Screen | Job | Primary action | Empty | Loading | Error |
| --- | --- | --- | --- | --- | --- |
| Home | Show what a run makes and how to install | Install ShipRight | Not applicable: static content, nothing user-made to show | Instant: static HTML, images have width and height set | Missing image keeps its alt text; Install link still works (fix: reload) |
| Case study | Show one owner review and the before shots | Back to home | Not applicable: static content | Instant: static HTML | Missing shot keeps its alt text; back link works |

## Project rules

- Stack: Vite 8 static build, Inter and Fraunces self-hosted, no three.js, GSAP or Lenis.
- Folders: site/ for pages, site/public for images and fonts, site/record for the record.
- Banned: invented scores, fake logos, gradient text, purple glow, "draft" or "not released" copy after a release.
