Your Crumb & Co site is built. It's one page, `index.html`, and runs on any static host with no outside fonts, CDNs or accounts.

## What's on the page
- **Header:** logo, links to each section, an "Order a cake" button, and a **live open/closed badge**. The badge uses Austin time no matter where the visitor is. It shows "Open now · until 3pm", "Opens today at 7am", "Closed · opens Tuesday at 7am" and so on.
- **Hero:** "Bread worth getting up for." with buttons for today's bake and cake orders, plus today's hours, the address and "walk-in only".
- **Daily bake menu:** a Sourdough card and a Pastries card, each with prices and short descriptions, plus a card that points people to cake orders.
- **Custom cakes:**
  - A 3-step "how it works" section
  - Sizes with starting prices, and lists of flavors and frostings
  - A **cake request form that enforces your 72-hour rule.** It shows the earliest possible pickup ("Tuesday, October 20 at 7am"), blocks Mondays, blocks any date or time slot less than 72 hours away, and only offers pickup times from 7am to 2:30pm.
- **About:** a short story about slow fermentation, plus three quick stats.
- **Visit:** a weekly hours table that highlights today, the address with a "Get directions" button (opens Google Maps), phone, email and Instagram.
- **Behind the scenes:** local-business data so Google can show your hours and address, mobile layout down to 320px, keyboard and screen-reader support, and gentle scroll animations that switch off for visitors who've turned motion off.

## How cake orders work right now
A website on its own can't send email. So when a customer submits the form, their email app opens with the full order already written and addressed to you. They just hit send. If their email app doesn't open, the page shows the order text with a "Copy" button so they can paste it into an email themselves.

## Things I made up that you need to replace
| Placeholder | Where |
|---|---|
| All prices (loaves $9–12, pastries $3.50–5.50, cakes from $55) | Menu and cake sizes |
| Menu items, cake flavors and frostings | Menu and cake form |
| `cakes@crumbandco.com`, `hello@crumbandco.com` | Form and Visit section |
| Phone `(512) 555-0142` (a fake number) | Visit section |
| Instagram `@crumbandco.atx` | Visit section |
| "36-hour ferment", "3 days for croissants", "reply within one business day" | Hero tag, About section, cake steps |
| About story | About section |

**The cake email matters most.** Until it's your real inbox, cake requests won't reach you.

## Suggested next steps
1. **Send me your real details** (prices, menu, email, phone, Instagram) and I'll swap them all in.
2. **Add real photos.** For now the page uses hand-drawn illustrations. Photos of your loaves and cakes are the biggest upgrade you can make.
3. **Put it online.** Netlify, Vercel, Cloudflare Pages and GitHub Pages all host a single page for free. Then connect your domain.
4. **Later, optionally:** connect the cake form to a form service (Formspree or Netlify Forms) so requests land in your inbox without the customer's email app, or link it to Square if you want deposits paid upfront.

Want me to start with step 1?
