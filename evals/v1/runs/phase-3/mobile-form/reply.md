Your build pack is ready. Put these files in your Cursor project's root folder.

**What's in it**
- `.cursor/rules/shipright.mdc`: tells Cursor to read the build rules first
- `docs/shipright/build-rules.md`: standing rules for every change
- `docs/shipright/01-prd.md`: who it's for, the one job, what's out, the flow, open questions
- `docs/shipright/02-technical-architecture.md`: stack, routes, tables, access rules, booking function
- `DESIGN.md` and `design/tokens.ts`: the proposed look
- `docs/shipright/04-frontend-spec.md`: six screens with real copy and states
- `docs/shipright/05-feature-ticket-list.md`: T1 to T11 as paste-ready prompts
- `index.html`: the key screen, "Your home" (Step 2 of 4), at phone size. It's the longest form in the flow. Add `#errors`, `#out-of-area` or `#save-failed` to the URL to see those states.

**Decisions I made for you (all Proposed)**
- One cleaning business with its own team, not a marketplace.
- Scope: sign up, details, home, pick a time, book, see the booking. No payment, rescheduling, repeat bookings or staff app.
- Look: native phone style, system font, deep blue-teal accent.
- Stack: Expo (React Native) with Expo Router, and Supabase.
- Sign-in with an emailed 6-digit code, no passwords.
- You add open times in the Supabase dashboard. A booking is confirmed straight away if the time has room.

**Only you can confirm**
- How and when customers pay, and your prices.
- Your cancel and change policy, and a contact line. Until then, customers can't change a booking.
- Terms and privacy policy.
- Business name, country, the postcodes you serve, your open times and how long a cleaning takes.

The preview hasn't been run through automated checks or tested on a real phone.

**First step:** Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
