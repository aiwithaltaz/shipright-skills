I built the full plan and the main screen. One decision shaped everything else, so I'll start with that.

## The big decision: "assisted" automation, not a bot

LinkedIn's User Agreement bans bots and browser extensions that send invites or messages, or scrape profiles, for you. LinkedIn enforces this with temporary restrictions, ID-verification lockouts and permanent bans. A product built on that can lose its customers' accounts, and LinkedIn can shut it off at any time.

What LinkedIn does allow: posting to your own profile through its official API (self-serve, no partner approval).

So the app, **Threadline** (working name), automates everything around the clicks:
- ✅ **Auto-publishes scheduled posts** through the official API
- ✅ **Drafts every follow-up, reply, comment and connection note in your voice**
- ✅ **Remembers who to follow up with and when**, so nothing falls through
- ✍️ **You press send.** One click copies the draft and opens the right LinkedIn page.

Pitch: *"The LinkedIn assistant that can't get you banned."*

## What I decided

- **Who it's for:** solo B2B sellers like founders, consultants and freelancers who get clients from LinkedIn but don't have a sales team
- **Core loop:** open the app each morning → clear 5–15 drafted actions in about 15 minutes → posts publish on their own
- **MVP features:** Today queue · post composer + scheduler · light pipeline (import your own LinkedIn connections export) · voice profile · daily pace guardrails
- **Won't build:** auto-invites, auto-DMs, scraping, auto-likes, running multiple accounts
- **Pricing:** Free tier → Pro at $24/mo → Team later
- **Stack:** Next.js + Supabase + an LLM API + its own publish queue
- **Timeline:** about 12 weeks to public launch, starting with 2 weeks of validation using this prototype

## The main screen (`index.html`)

The **Today** screen:
- A ranked queue of actions (Follow up / Reply / Engage / Connect). Each one shows why it matters now, the person's last message or post, and an editable AI draft.
- **Shorter / Warmer / More direct / Regenerate** buttons rewrite the draft
- **Copy & open**, then **Mark sent**. Progress ring, streak and a "Queue cleared" state when you're done.
- Snooze / Skip with undo
- Right rail: this week's posts, pipeline snapshot, daily pace meter, and the "we never send for you" promise
- Works on desktop, tablet and mobile, in light and dark mode

It's a clickable prototype with sample data. Nothing connects to LinkedIn yet, and the other nav items just show a "coming soon" message.

## The plan docs (in `build/`)

1. `01-product-brief.md`: who it's for, the problem, positioning vs bot tools, pricing, metrics, risks
2. `02-platform-rules.md`: what LinkedIn allows, a build/won't-build verdict for each feature, guardrails, privacy checklist
3. `03-mvp-spec.md`: screens, the Today screen in detail, ranking logic, user stories, data model, AI prompt rules
4. `04-tech-and-roadmap.md`: stack, architecture, 12-week build plan, costs, v2 roadmap

## Suggested next step

Put this prototype in front of 10–15 people who sell on LinkedIn and ask: *"Would you pay $24/month for this?"* If 10 or more say yes, start Phase 1.

One caveat: double-check LinkedIn's current User Agreement and developer terms before launch (the specifics change), and get a quick legal review of the copy-and-open flow.

Sources:
- [LinkedIn User Agreement summary: scraping & automation clause (ConductAtlas)](https://conductatlas.com/platform/linkedin/linkedin-user-agreement/prohibition-on-scraping-and-automated-data-collection/)
- [Why LinkedIn automation tools get accounts banned (Cleverly)](https://cleverly.co/blog/why-linkedin-automation-tools-get-your-account-banned-and-what-to-do-instead)
- [Posting to LinkedIn without partner approval (OpenTweet)](https://opentweet.io/answers/can-i-post-to-linkedin-without-partner-approval)
- [LinkedIn Posting API guide 2026 (Zernio)](https://zernio.com/blog/linkedin-posting-api)
