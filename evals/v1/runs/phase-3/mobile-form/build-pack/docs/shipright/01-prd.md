# 01 - Product requirements

**Project path:** `docs/shipright/01-prd.md`
**Version/date:** 0.1, 2026-10-13. **Sources:** the owner's request ("a mobile app where a new user signs up and books their first home cleaning", built with Cursor) and the owner's "You decide" on three intake choices. Delegated choices are marked Proposed (delegated) in the decision log.

## 1. Frame

| | |
| --- | --- |
| **Who** | A person who wants their home cleaned and has never used the app. |
| **Job** | J1: create an account and book a first home cleaning at a time that suits them, on their phone, in one sitting. |
| **What they do today** | Unknown. No research was supplied. Owner to add if known. |
| **This release finishes** | Sign up, give contact details, give the home's address and size, pick an open time, book it, and see the booking. |
| **What stays out** | See section 3. |

The cleaning is done by one business with its own team (D1). The business name is Unknown (U5).

## 2. Success checks

| Job | Observable check | Method |
| --- | --- | --- |
| J1 | A first-time user on a phone goes from the sign-in screen to "Your booking" without help. | Watch 3 to 5 people try it on a test build. No results exist yet. |
| J1 | The booking row exists with the right home and time, and reopening the app shows it. | Inspect the database after the test. |
| J1 | No time is booked twice beyond its capacity, even with a double tap or a dropped connection. | Automated test on the booking function. |

No baseline or target numbers exist. Do not invent them.

## 3. Release scope

**In:** S1 to S6 in `04-frontend-spec.md`. One customer role. One home and one upcoming booking per customer.

**Not in this release (notes only, no UI, routes or tables):**
- In-app payment, prices on screen until the owner supplies them (U1, U2).
- Cancel or change a booking in the app. The booking screen shows the owner's contact line instead (U3).
- Repeat or recurring bookings, a second home, add-ons, tips, ratings, chat, referrals.
- A staff, cleaner or admin app. The owner manages open times in the Supabase dashboard (D7).
- Confirmation emails, push notifications, reminders (D12).
- Account editing and account deletion screens. Note: app stores may require in-app account deletion before release. Check at launch.

## 4. Objects and states

| Object | Independent states | Owner |
| --- | --- | --- |
| Account | signed out, code sent, signed in | Customer |
| Profile | missing, saved | Customer |
| Home | missing, saved; inside or outside the service area | Customer |
| Open time (slot) | has room, full, past | Owner (dashboard) |
| Booking | confirmed | Customer creates; owner handles changes outside the app |

Saved, in area and booked are separate facts. Do not merge them into one status field.

## 5. Core flow J1

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Opens app, signed out | S1 email field | None | Send code | Nothing saved |
| Code sent | S1 code field | One-time code emailed | Enter code, resend, or change email | Email kept on screen |
| Signed in, no profile | S2 Your details, Step 1 of 4 | Session stored on device | Continue | Saved on Continue |
| Profile saved, no home | S3 Your home, Step 2 of 4 | Profile row exists | Continue | Saved on Continue; Back keeps typed values |
| Postcode outside area | Error under Postcode | Nothing saved | Edit postcode or go Back | Other fields kept |
| Home saved, no booking | S4 Choose a time, Step 3 of 4 | Open times loaded | Pick a time, Continue | Choice kept in memory only |
| Time picked | S5 Review and book, Step 4 of 4 | None | Book this time, or Change | Nothing booked yet |
| Book pressed | "Booking..." | Booking created once (request ID) | Wait | Double taps ignored |
| Time just filled | Alert on S5 | Nothing booked | Choose another time | Home and details kept |
| Result unknown (connection lost) | Alert on S5 | Retry uses the same request ID | Try again | Cannot book twice |
| Booked | S6 Your booking | Booking confirmed | Sign out or close app | Reopening shows S6 |

**Return visits:** the app opens at the first unfinished step (D13). A picked time that was not booked is not kept after the app closes.

## 6. Risks and unknowns

| ID | Gap | Effect | Owner | Needed |
| --- | --- | --- | --- | --- |
| U1 | How and when customers pay | No payment in this release; S5 has no payment line | Owner | Decision |
| U2 | Prices and how they depend on home size | S5 price row stays hidden | Owner | Price list |
| U3 | Cancel or change policy and contact line | S6 contact line stays hidden | Owner | Policy text, phone or email |
| U4 | Terms and privacy policy | S1 legal links blocked; needed before store release | Owner | Documents or URLs |
| U5 | Business and app name, logo | App name blank in config | Owner | Name, assets |
| U6 | Country: address format, phone format, time zone | Copy says "Postcode"; time zone unset | Owner | Country |
| U7 | Postcodes you serve | Every postcode fails until filled | Owner | List |
| U8 | Open times and how many cleanings per time | S4 shows "No open times" until filled | Owner | Schedule |
| U9 | How long a cleaning takes | S5 shows start time only | Owner | Durations |

## 7. Decision log

| ID | Decision | Status | Source/date |
| --- | --- | --- | --- |
| D1 | One business, its own cleaners, not a marketplace | Proposed (delegated) | Intake Q1, 2026-10-13 |
| D2 | Release scope in section 3 | Proposed (delegated) | Intake Q2 |
| D3 | Look: native phone starter, deep blue-teal accent, see DESIGN.md | Proposed (delegated); OK at T1 | Intake Q3 |
| D4 | Stack: Expo, Expo Router, TypeScript, Supabase | Proposed (delegated) | Stack not asked; recommended |
| D5 | Sign in with an emailed 6-digit code, no password | Proposed (delegated) | Assistant pick |
| D6 | Sign up first, then book, as requested. Alternative: pick a time before the account | Proposed (delegated) | Request wording |
| D7 | Owner enters open times and capacity in the Supabase dashboard | Proposed (delegated) | Follows D2 |
| D8 | A booking is confirmed at once when the time has room | Proposed (delegated); owner to confirm it matches operations | Assistant pick |
| D9 | Service area is a list of postcode starts the owner fills | Proposed (delegated) | Assistant pick |
| D10 | One home and one upcoming booking per customer | Proposed (delegated) | Follows D2 |
| D11 | Phone number required so the business can reach the customer on the day | Proposed (delegated) | Assistant pick |
| D12 | No confirmation email; the booking shows in the app | Proposed (delegated) | Follows D2 |
| D13 | App opens at the first unfinished step | Proposed (delegated) | Assistant pick |

Delegation does not cover U1 to U4. Those stay Unresolved until the owner decides.
