# Stack choices

Pick boring, well-known defaults the user's coding tool already handles well. Every choice gets a reason and a switch point.
An existing codebase or a named tool wins over this table. Do not add a service without a job in this release.
Say "current stable version" rather than guessing version numbers. Record the stack as Proposed until the user agrees; build T1 with it anyway, because changing it later is cheap at that point.

## By product type

| Product | Proposed default | Why | Switch when |
| --- | --- | --- | --- |
| Marketing or content site | Astro, Tailwind CSS, static hosting (Vercel, Netlify or Cloudflare Pages). Form to a hosted form service or a small serverless function. | Fast by default, little JavaScript, easy content edits. | It needs sign-in or app screens: use Next.js. |
| SaaS web app | Next.js (App Router) with TypeScript, Tailwind CSS, shadcn/ui on Radix, Supabase (Postgres, Auth, row-level security), Vercel. | One stack most AI coding tools know; database, auth and access rules in one place. | Heavy background jobs or strict data residency: add a worker or another host. |
| Data-heavy dashboard | The SaaS stack plus TanStack Table and a chart library such as Recharts. Server-side pagination and sorting. | Real tables with sorting, keyboard use and large row counts. | Over about 10,000 rows on screen: virtualize. |
| Mobile app | Expo (React Native) with Expo Router and TypeScript, Supabase, EAS Build. Native controls and platform navigation. | One codebase for iOS and Android; mature tooling. | A web-first audience on desktop: build a responsive web app first. |
| 3D or immersive site | Vite or Next.js, three.js through React Three Fiber and drei, GSAP with ScrollTrigger for scroll motion, Lenis only for smooth scroll on marketing pages. Models as glTF with Draco or Meshopt compression; KTX2 textures. | Declarative scenes, good loaders, controllable performance. | No interaction needed: a video or image sequence is lighter. |
| Payments | Stripe Checkout or Payment Links before custom card forms. | Hosted, handles compliance and receipts. | Complex billing logic: Stripe Billing. |
| Email | A transactional provider such as Resend or Postmark, only for messages in scope. | Deliverability without running mail servers. | Marketing email is a separate tool and a separate decision. |

## Fit the user's tool

| Tool | Do this |
| --- | --- |
| Cursor, Claude Code, Codex | Any stack. Add a rules pointer file. Keep tickets small and run checks per ticket. |
| Lovable | Stay with its React, Vite, Tailwind, shadcn/ui and Supabase stack. Do not prescribe Next.js. |
| v0 | Next.js with shadcn/ui. Export the code before adding back-end work. |
| Bolt, Replit | Name the stack in T1 so the agent does not pick one. Keep secrets in the platform's secret store. |

## Always decide

- **Data:** tables and fields from the PRD's objects only. No tables for later ideas.
- **Access:** who can read and change which rows. Enforce on the server or with row-level security, never by hiding buttons.
- **Secrets:** environment variable names only. Never put keys in front-end code or tickets.
- **Performance budget:** LCP under 2.5 s, INP under 200 ms, CLS under 0.1 at the 75th percentile, measured on real pages.
- **Analytics:** none unless requested; with consent where the law or the user requires it.
- **Hosting cost:** say whether the default plan is free or paid. Never sign up, buy or deploy for the user.
