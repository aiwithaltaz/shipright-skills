# 01 - Product requirements

**Version/date:** 0.1, 2026-10-13. **Sources and approval:** the owner's request ("a new user signs up and books their first home cleaning") and "You decide" on Q1 to Q3. All frame choices are Proposed (delegated).

## 1. Frame

| | |
| --- | --- |
| Who | A new customer of a home cleaning business, on their own phone. |
| Job | Book a first home cleaning at a time that suits them, without calling. |
| Today | Unknown. Owner to confirm (phone, messages or a web form are common). |
| This release finishes | Enter the home, pick a day and arrival window, create an account with an email code, review and book. Then see the booking on return. |
| Stays out | See section 4. |

Working name: the business name is Unknown. Screens avoid it until the owner supplies it.

## 2. Useful mechanism

The customer sees real open arrival windows and books one in one sitting. The account comes after the time is chosen, so effort follows value.
Demand evidence: Unknown. Hypothesis, tested by the success checks below.

## 3. Users and constraints

- One actor in the app: **Customer**. The **Owner** manages open slots, postcodes and bookings in the Supabase dashboard. No staff screens in this release.
- Phones: iOS and Android, portrait. Width 360 to 430.
- Country, language, address format, phone format and time format: Unknown. Proposed: English, device locale for dates and times.

## 4. Current phase

**Phase:** Release 1, first booking.
**Approved now (delegated):** S1 to S8 in `04-frontend-spec.md`. Service area check by postcode. Booking draft kept on the device. One upcoming booking per customer.
**Explicitly excluded:** in-app payment, prices on screen until supplied, repeat cleanings, choosing a cleaner, ratings, chat, push notifications, emails beyond the sign-in code, in-app change or cancel, a cleaner app, an admin screen, a marketing home page, a second booking while one is upcoming.
**Later notes only:** payment with Stripe; reschedule and cancel in app; booking emails; repeat cleanings; account deletion screen (see Risks). No routes, tables or disabled buttons for these.

## 5. Success evidence

| Signal | Baseline | Target | Source / method |
| --- | --- | --- | --- |
| A new user goes from opening the app to "Booked" without help | Unknown | Pass in 5 of 5 hallway tests on a phone | Owner watches 5 people. Not run yet. |
| A slot never takes more bookings than its capacity | None | 0 overbookings when two phones book the last place together | Test in T3 |
| After closing and reopening the app, the customer sees their booking | None | Pass on iOS and Android | Test in T8 |

No metrics, prices or traction are claimed.

## 6. Objects and lifecycles

| Object | Independent states | Actor / owner |
| --- | --- | --- |
| Booking draft (on device) | empty, in progress, cleared, submitted | Customer |
| Customer account | none, code sent, signed in | Customer |
| Customer profile | missing, complete | Customer |
| Slot (arrival window) | open, full, past | Owner |
| Service area (postcode) | served, not served | Owner |
| Booking | booked, cancelled (set by owner only) | Customer creates, Owner changes |

Booked is not paid. Payment is outside the app and Unknown.

## 7. Jobs and journey

| Job ID | User job | Priority | Screens |
| --- | --- | --- | --- |
| J1 | Book a first cleaning | P0 | S1, S2, S3, S4, S5, S6, S7 |
| J2 | Check my booking later | P0 | S1, S7, S8, S5 |
| J3 | Resume an unfinished booking | P1 | S1 |

### J1 flow

| Trigger or state | User sees | System effect | Next action | Saved work and exit |
| --- | --- | --- | --- | --- |
| Opens app, signed out, no draft | S1 Start | None | Book a cleaning | Nothing to save |
| Enters home | S2, Step 1 of 4 | Postcode checked on Continue | Continue | Draft saved on device. Back to S1 keeps it |
| Postcode not served | Inline error under Postcode | Nothing booked | Edit postcode | Other fields kept |
| Picks day and window | S3, Step 2 of 4 | Reads open slots | Continue | Choice kept in draft |
| Enters name, email, phone | S4, Step 3 of 4 | Sends a 6-digit code | Send code | Fields kept on Back |
| Enters code | S5, Step 3 of 4 | Signs in, saves profile | Continue | Wrong code: error, fields kept. Resend after 60 s |
| Reviews | S6, Step 4 of 4 | None until Book | Book cleaning | Edit links return to each step with values kept |
| Books | Button shows "Booking..." | One booking created, slot count checked in one database call | None while busy | Double tap creates one booking |
| Slot filled meanwhile | Error on S6 | Nothing booked | Choose another time (S3) | Home and details kept |
| Network fails | Error on S6: "We could not confirm your booking" | Unknown if booked | Try again | Try again resends the same request ID, so it returns the existing booking or creates one. Never two |
| Booked | S7 Your booking | Draft cleared | Done | Booking stays on S7 on every return |

### Return visits

| Starting state | Missing dependency | Permitted next action | Preserved work | Completion condition |
| --- | --- | --- | --- | --- |
| Signed out, draft on device | Account | Continue booking or Start over | Home and time | Booked |
| Signed in, upcoming booking | None | View it | Booking | None |
| Signed in, no upcoming booking | Draft | Book a cleaning | Profile | Booked |
| Signed out, booked before | Session | Sign in (S8), then S5 | Booking on server | S7 shown |

## 8. Risks and unknowns

| Gap | Effect | Owner | Decision or evidence needed |
| --- | --- | --- | --- |
| U1 Prices | No price on S6 | Owner | Price table and what it depends on |
| U2 Payment terms | Customer does not know how they pay | Owner | Wording for "how you pay", or decide on Stripe later |
| U3 Business name, logo, brand colors | Starter look used | Owner | Assets, or approve the starter |
| U4 Contact for changes | S7 cannot say how to change or cancel | Owner | Phone and email |
| U5 Privacy policy and terms | App stores require a privacy policy link; app collects name, email, phone, address | Owner | Links. ShipRight does not write legal text |
| U6 Who at the business sees bookings | Access to customer data | Owner | Proposed: owner only, in the Supabase dashboard |
| U7 Postcodes served and slot schedule | No bookable times | Owner | Initial lists |
| U8 Country and formats | Address and phone fields | Owner | Country list |
| U9 Account deletion | Apple requires in-app account deletion for apps with sign-up | Owner | Add before App Store submission |
| U10 How the owner hears of new bookings | Owner may miss a booking | Owner | Proposed: check the dashboard daily. Email alert later |

## 9. Dependencies

Supabase project (Auth with email code, Postgres), Expo and EAS accounts, Apple and Google developer accounts for release. No other services.

## 10. Feedback acceptance

No visual feedback yet. "Signs up" maps to S4 and S5; "books first cleaning" to S6 and S7.

## 11. Decision log

| ID | Scope / decision | Status | Source/date | Affected artifacts |
| --- | --- | --- | --- | --- |
| D1 | Frame: customer books one cleaning on a phone | Proposed (delegated) | Q1, 2026-10-13 | All |
| D2 | Exclusions in section 4 | Proposed (delegated) | Q2 | All |
| D3 | Look: starter "Mobile native" with water-blue accent | Proposed (delegated) | Q3 | DESIGN.md, tokens |
| D4 | Stack: Expo, Supabase, EAS | Proposed | Pack default | 02 |
| D5 | Account after time choice, email 6-digit code, no password | Proposed (delegated) | Q1 | S4, S5 |
| D6 | Slots are 2-hour arrival windows the owner adds | Proposed (delegated) | Q1 | S3, 02 |
| D7 | Booking is confirmed at once if the slot has room; no owner approval step | Proposed (delegated) | Q1 | S6, S7 |
| D8 | Draft kept on device until booked or "Start over" | Proposed (delegated) | Q1 | S1 to S6 |
| D9 | Bookable from tomorrow up to 28 days ahead | Proposed (delegated) | Q1 | S3 |
| D10 | Prices, payment, legal text, data access | Unresolved | Not delegable | U1, U2, U5, U6 |
