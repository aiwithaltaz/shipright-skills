# Crumb & Co — website plan

## Brief (from the owner)
- Bakery in Austin: **Crumb & Co**, 1204 E 6th St.
- Makes sourdough, pastries, custom cakes.
- Open **Tue–Sun, 7am–3pm** (closed Monday).
- Custom cake orders need **72 hours notice**.
- "You decide the rest." Deliverable: one page, `index.html`.

## Who visits and what they need
| Visitor | What they want | Where on the page |
|---|---|---|
| Neighbor deciding whether to walk over | Are you open right now? Where exactly? | Live open/closed badge in header + hero, Visit section |
| First-timer | What do you make, what does it cost | Daily bake menu |
| Someone planning a birthday/wedding | Can I get a cake, by when, how do I ask | Custom cakes section + request form |
| Phone-in-hand on the street | Address, directions, hours in one tap | Visit section, sticky "Directions" in mobile nav |

## Page structure (single page)
1. **Header** — wordmark, anchor nav (Menu, Cakes, Visit), live status pill, "Order a cake" button.
2. **Hero** — headline, one-line promise, open status + today's hours, two CTAs (See today's bake / Order a cake), hand-drawn SVG loaf.
3. **Marquee strip** — sourdough · croissants · custom cakes.
4. **Daily bake (menu)** — three columns: Sourdough, Pastries, Coffee & such. Prices are placeholders the owner should confirm. Note: "best before noon; we bake until it's gone."
5. **Custom cakes** — how it works in 3 steps, sizes/starting prices, flavors, and the request form.
6. **About** — short story, values (long ferment, local flour, butter).
7. **Visit** — hours table with today highlighted, address, directions link, parking tip.
8. **Footer** — repeat essentials, Instagram placeholder.

## Key behaviors
- **Open/closed status** computed in Austin time (America/Chicago) regardless of visitor's timezone. States: Open now (closes 3pm) / Opens today at 7am / Closed today, opens Tue 7am.
- **Cake form, 72-hour rule enforced**: earliest pickup = now + 72h, must be Tue–Sun, pickup time slots 7:00–2:30. Date input `min` set dynamically; validation message explains why a date is rejected.
- **Submission**: static site, no backend. The form opens the visitor's email app with a pre-filled order (mailto). Owner must swap in the real inbox, or later connect a form service (Formspree, Netlify Forms, Square).
- Works with JS off: all content visible, form falls back to a plain mailto.

## Visual direction
- Warm, flour-dusted, hand-made. Cream paper background, crust-brown text, a rust accent.
- System serif display type (no web fonts allowed): Iowan Old Style / Palatino / Georgia; system sans for body UI.
- Illustrations: inline SVG line drawings (loaf with scoring, croissant, cake), no photos available yet. Owner should replace with real photography when possible — that's the single biggest upgrade.
- Motion: subtle GSAP fade/rise on scroll from the local vendor copy; disabled under `prefers-reduced-motion`; page fully usable if GSAP fails to load.

## SEO / local
- Title + meta description with "Austin sourdough bakery".
- JSON-LD `Bakery` schema with address, hours, servesCuisine.
- Semantic headings, alt text / aria labels for SVGs.

## Decisions made on the owner's behalf (flag in reply)
- Prices, flavors, cake sizes, phone, email, Instagram handle are placeholders.
- Cake request via email (mailto) rather than paid checkout.
- No online ordering for daily items: walk-in only.

## Acceptance checks
- [ ] Loads from a static server with no network requests outside the folder tree.
- [ ] No horizontal scroll at 360px width.
- [ ] Status pill correct for: Monday, Tue 6:30am, Tue 10am, Sun 4pm (Austin time).
- [ ] Date picker refuses Mondays and anything < 72h out.
- [ ] Keyboard: nav, form, buttons all reachable with visible focus.
