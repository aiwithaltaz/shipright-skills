Your build pack is ready. Copy these files into your project root:

- `docs/shipright/01-prd.md`: frame, scope, flows, open questions
- `docs/shipright/02-technical-architecture.md`: stack, data, access rules, routes
- `DESIGN.md` and `src/design/tokens.ts`: the design system
- `docs/shipright/04-frontend-spec.md`: 8 screens with layout, states and real copy
- `docs/shipright/05-feature-ticket-list.md`: 10 paste-ready prompts for Cursor
- `docs/shipright/build-rules.md` and `.cursor/rules/shipright.mdc`: standing rules Cursor reads first

`index.html` shows the key screen, S3 "Choose a time", at phone size, with sample data. It opens after a time was picked. Add `#loading`, `#error` or `#taken` to the URL to see the other states.

**Decided for you (Proposed, change any):**
- A new customer books one cleaning on their own phone. Your team manages slots and bookings in the Supabase dashboard.
- Out: in-app payment, repeat cleanings, choosing a cleaner, ratings, chat, in-app cancel, cleaner and admin screens.
- Flow: home, then time, then account, then review. The account comes after the customer picks a time.
- Sign-up uses a 6-digit email code, with no password.
- Times are 2-hour arrival windows you add, bookable from tomorrow up to 28 days ahead.
- A booking is confirmed at once if the window has room. The database blocks overbooking and double taps.
- Look: calm native phone style, system font, water-blue accent.
- Stack: Expo, Supabase, EAS Build.

**Only you can confirm:**
- Prices, and how customers pay. Ticket T10 waits for these.
- Business name, logo and brand colors.
- A phone and email for changes and cancellations.
- Privacy policy and terms links. The app stores require them.
- Who at your business may see customer data.
- Postcodes you serve, your country, and your schedule of open times.
- Apple requires in-app account deletion before App Store release.

**First step:** Paste T1 into your coding tool. It sets up the project and a /design preview page. Check the look, then continue with T2.
