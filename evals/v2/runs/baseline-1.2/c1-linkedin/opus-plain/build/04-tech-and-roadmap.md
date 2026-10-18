# Threadline — Tech Plan & Roadmap

## 1. Stack (chosen for a small team that ships fast)

| Layer | Choice | Why |
|---|---|---|
| Web app | Next.js (App Router) + TypeScript | One codebase for UI + API routes; easy deploy |
| UI | Tailwind + a small component set | Fast iteration; the design tokens in the prototype map 1:1 |
| DB + auth | Supabase (Postgres, Row Level Security, email auth) | RLS keeps every user's contacts isolated by default |
| LinkedIn | OAuth 2.0 (OpenID Connect + `w_member_social`) | Sign in + posting only |
| Scheduler | Postgres-backed job queue (e.g. a cron that runs every minute + a `posts` status machine) | No extra infra; exactly-once publishing with row locks |
| AI | Hosted LLM API, small fast model for drafts, larger model for post writing | Cost control; swap providers behind one interface |
| Email | Transactional email provider | Failure alerts, reconnect reminders, weekly digest |
| Payments | Stripe Checkout + customer portal | Standard |
| Hosting | Vercel (web) + Supabase cloud | Low ops |
| Monitoring | Error tracking + uptime check on the publish cron | Publishing is the one thing that must not fail silently |

## 2. Architecture

```
Browser (Next.js UI)
   |  REST / server actions
   v
API routes ──> Supabase Postgres (RLS)
   |                 ^
   |                 | every minute
   |           Publish worker ──> LinkedIn Posts API (user's token)
   |
   └──> LLM provider (drafts, posts)   [no customer data used for training]

Nightly per-timezone job: build tomorrow's Today queue (ranking rules in 03-mvp-spec.md)
```

**Security:** LinkedIn tokens encrypted at rest (pgsodium/KMS), never sent to the browser. Scopes are limited to `openid profile email w_member_social`. Every publish is written to an audit log.

## 3. Build phases

| Phase | Weeks | Deliverable | Done when |
|---|---|---|---|
| 0. Validate | 1–2 | Clickable Today prototype (this `index.html`) + 15 user interviews + waitlist page | 10+ people say they'd pay $24; 200 waitlist signups |
| 1. Foundations | 3–4 | Auth, LinkedIn connect, data model, CSV import, People list | A user can sign up, connect, import 2,000 connections |
| 2. Posting | 5–6 | Composer, voice profile, scheduler + publish worker, calendar | 50 scheduled test posts publish on time, token-expiry path tested |
| 3. Today queue | 7–8 | Ranking job, action cards, AI drafts, copy & open, snooze/done | A tester clears a 10-action queue in under 15 min |
| 4. Polish + pay | 9–10 | Onboarding, Insights v1, Stripe, emails, privacy pages | Private beta with 30 users |
| 5. Launch | 11–12 | Public launch (Product Hunt + founder's own LinkedIn) | 100 paying users within 60 days |

## 4. v2+ roadmap (after the core loop retains)

1. Company Page posting (apply for the Community Management API early, during Phase 2)
2. Team plan: shared pipeline, assignment, manager view
3. CRM sync (HubSpot, Notion, Google Sheets)
4. Smarter ranking (learn from which actions get replies)
5. Mobile PWA for the Today queue (clearing the queue on a phone at 8am is a strong habit loop)
6. Post performance insights (if/when API access allows; manual logging until then)

## 5. Costs (monthly, first 500 users)

| Item | Estimate |
|---|---|
| Hosting (Vercel + Supabase Pro) | ~$45 |
| LLM usage | ~$300–900 depending on usage |
| Email, error tracking, domain | ~$40 |
| **Total** | **~$400–1,000** vs ~$5k+ MRR at 250 paying users |

## 6. Open decisions (owner: founder)

- Final name + domain check for "Threadline"
- Whether a free tier is worth it vs a 14-day trial (start with free; revisit at 500 users)
- Legal review of the "Copy & open" flow and any future extension idea before Phase 4
