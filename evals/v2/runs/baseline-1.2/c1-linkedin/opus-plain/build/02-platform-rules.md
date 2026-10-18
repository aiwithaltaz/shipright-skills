# LinkedIn Platform Rules — What We Can and Can't Build

Verify against LinkedIn's live User Agreement and developer docs before launch. Platform terms change, and this is a product summary, not legal advice.

## 1. What LinkedIn says

LinkedIn's User Agreement (section 8.2, the "Don'ts") prohibits, in short:

- Using **bots or other unauthorized automated methods** to access the service, add or download contacts, **send or redirect messages**, or create, comment on, like or share posts
- Developing or using **software, scripts, robots, crawlers, browser plugins or add-ons** to scrape or copy the service, including profiles and other data
- Driving **inauthentic engagement**

LinkedIn enforces this actively, with temporary restrictions, ID verification lockouts and permanent bans. Industry write-ups describe detection based on activity velocity, behavioral patterns, extension fingerprinting and repeated message templates.

## 2. What the official API allows

| Need | Official route | Access |
|---|---|---|
| Post to the user's **personal profile** | "Share on LinkedIn" product, `w_member_social` scope, Posts API | Self-serve, no partner review |
| Sign in with LinkedIn | "Sign In with LinkedIn using OpenID Connect" | Self-serve |
| Post to **Company Pages** | Community Management API | Requires LinkedIn review/approval |
| Read or send **DMs** | No general-access API | Not available |
| Search people / pull profiles | No general-access API | Not available |
| Scheduling | No scheduling endpoint | We run our own queue and publish at the set time |

Known limits to design around:
- Member access tokens last **about 60 days**, and self-serve apps don't get refresh tokens, so users must reconnect every ~60 days.
- Text posts are capped at about 3,000 characters. Images are supported. Treat video and documents as v2 and verify first.
- There's no API for long-form Articles or newsletters.

## 3. Our feature-by-feature verdict

| Feature | Verdict | How |
|---|---|---|
| AI-written posts | Build | Our own LLM call, no LinkedIn involvement |
| Scheduled auto-publishing to personal profile | Build | Official Posts API + our job queue |
| Company Page posting | v2 | After Community Management API approval |
| AI-drafted DMs, follow-ups, connection notes | Build | Drafted in-app, the user sends manually |
| "Copy & open" | Build | Copies the draft and opens the person's LinkedIn URL in a new tab; the user pastes and sends |
| Follow-up reminders and pipeline | Build | Our own data, no LinkedIn access needed |
| Import connections | Build | The user uploads **their own** LinkedIn data export (Settings → Data privacy → Get a copy of your data → Connections.csv) |
| Add a person | Build | The user pastes a profile URL plus their own notes |
| Auto-send invites/messages | Won't build | Breaks the User Agreement |
| Profile/search scraping | Won't build | Breaks the User Agreement |
| Extension that reads the page you're viewing | Hold | Gray area under the plugin clause. Needs a legal review before it's ever considered |
| Engagement pods / auto-likes | Won't build | Inauthentic engagement |

## 4. Guardrails built into the product

1. **Human-in-the-loop by design.** There's no code path that sends to LinkedIn except the Posts API for the user's own posts.
2. **Pace targets, not volume maximizers.** The default daily queue is 5–15 actions, with a soft cap of 20 connection notes a day and a warning above it.
3. **Anti-template nudges.** If 5 drafts in a row are near-identical, the app suggests personalizing them, because templated text both performs worse and gets flagged as spam.
4. **Clear token status.** A reconnect banner appears at day 50, and scheduled posts pause instead of failing silently.
5. **Data minimization.** We store only what the user gives us. Imported connections can be deleted in one click, and we never resell or pool contact data across users.

## 5. Privacy and compliance checklist (pre-launch)

- [ ] Privacy policy that covers imported contact data, AI processing, retention and deletion
- [ ] GDPR/CCPA: data export + account deletion, and a DPA with the AI provider (no training on customer data)
- [ ] LinkedIn developer app reviewed against the API Terms of Use (branding, display rules, storage limits on API data)
- [ ] Never use LinkedIn's logo or name in a way that implies partnership or endorsement
- [ ] Security: encrypted tokens at rest, least-privilege scopes, audit log for publishing
