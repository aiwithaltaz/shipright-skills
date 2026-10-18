# Threadline — Product Brief

> Working name. "Threadline: show up on LinkedIn every day in 15 minutes. You press send."

## 1. The decision in one line

Build an **assisted** LinkedIn automation app: it automates the thinking, writing, scheduling and remembering, and auto-publishes posts through LinkedIn's official API. It never sends invites or messages, and never scrapes profiles, on the user's behalf. The user presses send.

Why: bots that act inside LinkedIn break its User Agreement and get accounts restricted. A product built on them can lose its customers' accounts overnight, and LinkedIn can cut it off at any time. Assisted automation captures most of the time savings without that risk, so the product can last. (Full reasoning: `02-platform-rules.md`.)

## 2. Who it's for

**Primary user: the solo B2B seller.** Founders, consultants, freelancers, fractional execs and coaches who get their clients from LinkedIn but don't have a sales team.

- Has 500 to 5,000 connections
- Knows they should post and follow up consistently, and doesn't
- Loses deals to forgotten follow-ups, not to bad pitches
- Will pay $20–40/month for a tool that saves 3+ hours a week and brings in one extra client a quarter

**Not for (v1):** agencies running 20 client accounts, recruiters doing high-volume sourcing, or anyone who wants 500 invites a day. Those users need the bot behavior we're choosing not to build.

## 3. The problem

| Pain | What it looks like today |
|---|---|
| Inconsistent posting | Posts 3 times in one week, then nothing for a month |
| Dropped follow-ups | "Let's talk next month" turns into silence because nobody tracks it |
| Slow personalization | 10 minutes to write one thoughtful message, so they send generic ones or none |
| No system | Pipeline lives in their head, DMs and a half-used spreadsheet |

## 4. The core loop

```
Morning: open Threadline -> "Today" queue (5–15 actions, ~15 min)
  -> each action has context + an AI draft
  -> user edits, clicks "Copy & open" -> sends on LinkedIn -> marks done
Weekly: batch-write posts with AI -> schedule -> they auto-publish
Always: people move through a simple pipeline; follow-up reminders appear on their own
```

The "Today" queue is the heart of the product and the main screen.

## 5. What it does (MVP)

1. **Today queue:** a ranked daily list of human actions (follow up, reply, comment on a prospect's post, send a connection note), each with an editable AI draft.
2. **Post composer + scheduler:** write with AI help in your own voice, schedule, and auto-publish to your personal profile via the official API.
3. **People & pipeline:** a light CRM. Import your own LinkedIn data export (Connections.csv) or add people by URL plus notes. Stages: New → Talking → Call booked → Won/Lost.
4. **Voice profile:** paste 5–10 of your past posts and messages, and the AI drafts in your style.
5. **Pace guardrails:** daily action targets that look human (for example, max 20 connection notes a day), with a streak to build the habit.

## 6. What it won't do (on purpose)

- No auto-sending connection requests, messages, likes or comments
- No profile or search scraping, and no "export 1,000 leads from Sales Navigator"
- No browser extension that clicks for you
- No running multiple LinkedIn accounts from one login
- No fake engagement (engagement pods, auto-likes)

These are written as product principles so they don't get quietly added later under pressure.

## 7. Positioning

| | Bot tools (Expandi, Waalaxy, Dux-Soup type) | Schedulers (Buffer, Hootsuite type) | **Threadline** |
|---|---|---|---|
| Sends for you | Yes (account risk) | Posts only | Posts only |
| Helps with DMs/follow-ups | Templated blasts | No | Personal drafts + reminders |
| Account-ban risk | High | None | None |
| Feels like | Spam cannon | Calendar | A sharp assistant |

**Message:** "The LinkedIn assistant that can't get you banned."

## 8. Business model

| Plan | Price | Includes |
|---|---|---|
| Free | $0 | 3 scheduled posts/month, 10 AI drafts/day, 50 people |
| Pro | $24/mo ($19 billed yearly) | Unlimited scheduling, 100 AI drafts/day, unlimited people, voice profile, insights |
| Team (later) | $19/seat/mo | Shared pipeline, handoffs, manager view |

Unit economics check: about 100 drafts/day at roughly $0.002 each with a small fast model comes to under $6/month of AI cost for a heavy user, so a 75%+ gross margin holds at $24.

## 9. Success metrics

- **North star:** weekly active users who complete 5+ queue actions and publish 1+ post a week
- Activation: finished onboarding (voice profile + 20 people imported + first post scheduled) within 24 hours
- Day-30 retention ≥ 35%
- Self-reported "conversations started per week" up 2x by week 4 (in-app survey)
- Zero user reports of LinkedIn restrictions caused by the product

## 10. Biggest risks

| Risk | Mitigation |
|---|---|
| "Assisted" feels too manual next to bot tools | Make it fast: one-click copy & open, keyboard flow, under 15 min a day |
| LinkedIn API changes or access gets pulled | Only posting depends on the API. The rest works with no API at all |
| 60-day token expiry interrupts scheduled posts | Re-auth reminders at day 50 and 57; publishing pauses safely instead of failing silently |
| AI drafts sound generic | Voice profile + context-specific prompts + "make it shorter/warmer" controls |
| Users want lead lists | Say no clearly. Point them to compliant sources (their own export, CSV upload) |
