# 01 - Product requirements

**Project path:** `docs/shipright/01-prd.md`
**Version/date:** v0.1, 2026-10-13. **Sources and approval:** owner request; owner delegation "You decide. Use your recommended picks for everything you asked." covering D-01 to D-05 only.

Unknown facts stay Unknown. Proposed decisions are not build scope.

## 1. Problem and outcome

A new customer wants a home cleaning. Phase 1 outcome: they create an account and send their first cleaning request from their phone, and can later see whether the business confirmed it.
No research, customer interviews or market data were supplied. The size of the problem and who the customers are beyond "new users booking a home cleaning" are Unknown.

## 2. Useful mechanism

- **Current alternative:** Unknown (owner).
- **Mechanism (Hypothesis H-1):** asking for where and when first, and for the account only just before sending, lets people see what they are booking before giving personal details. Test: compare how many people who open Booking details reach Request sent. No baseline exists.
- **Request, not instant booking (D-01):** there is no source of open times. A request avoids promising times nobody has checked. It can become instant booking once the business keeps open times in the system.

## 3. Users and constraints

| Actor | Job | Device | Source |
| --- | --- | --- | --- |
| Customer (new) | Sign up and send a first cleaning request | Own phone, iPhone and Android (D-04) | Request |
| Customer (returning) | Log in and see the request status | Own phone | Needed for return visits (F1) |
| Business staff | Confirm requests | Not in this app. Process Unknown (D-16) | Implied by D-01 |

Country, language, currency and address format: Unknown (owner). The address form uses a generic layout until the country is known.

## 4. Current phase

**Phase:** 1. Sign up and send the first cleaning request.
**Approved now:** S1 Welcome, S2 Booking details, S3 Create account, S4 Log in, S4R Reset password, S5 Review and send, S6 Request status. Draft kept on the phone until sent.
**Explicitly excluded:** in-app payment, showing prices, instant booking from live open times, cancel or change in the app, repeat bookings, ratings, reviews, chat, push notifications, promo codes, referral, social sign-in, staff or admin app.
**Later notes only:** the items above. No rendered controls, disabled placeholders, routes or tables for them.

## 5. Success evidence

| Signal | Baseline | Target | Source / method |
| --- | --- | --- | --- |
| Share of people who open S2 and reach S6 "Request sent" | Unknown | Unknown (owner sets) | Count server-side request creation against screen opens. Analytics tool Unknown |
| Requests confirmed by the business | Unknown | Unknown | Booking status counts in the database |

### Research basis

| Claim / hypothesis | Kind and source | Limits | Decision or test needed |
| --- | --- | --- | --- |
| H-1 Account last reduces drop-off | Hypothesis, assistant pick under D-02 | No data | Measure S2 to S6 completion after launch |
| People expect to see a price before sending | Hypothesis | No data | Owner decision D-10 |

## 6. Objects and lifecycles

| Object | Independent states | Actor / owner |
| --- | --- | --- |
| Booking draft | Empty → In progress → Ready to send. Lives only on the phone. Cleared only after the server confirms a request was created. No clear or delete control in Phase 1 | Customer |
| Customer account | Created. Email confirmed or waiting for confirmation, depending on the auth setting (see 02) | Customer |
| Customer profile | Full name | Customer |
| Booking request | Requested → Confirmed. Other outcomes Unknown (D-16) | Created by customer, confirmed by business |

Booking request fields: street address, apartment or unit (optional), city, postal code, preferred date, preferred arrival time (Morning, Afternoon, Any time), status, created time, one client request ID to stop duplicates.

## 7. Jobs and journey

| Job ID | User job | Phase | Priority | Screen / flow |
| --- | --- | --- | --- | --- |
| J1 | Start a first booking | 1 | P0 | S1 → S2 |
| J2 | Say where and when | 1 | P0 | S2 |
| J3 | Create an account | 1 | P0 | S3 |
| J4 | Review and send the request | 1 | P0 | S5 |
| J5 | See request status | 1 | P0 | S6 |
| J6 | Return and log in | 1 | P0 | S1 → S4 → S6 or S5 |
| J7 | Recover a password | 1 | P1 | S4 → S4R |

Alternate entry and return visits:

| Starting state | Missing dependency | Permitted next action | Preserved work | Completion condition |
| --- | --- | --- | --- | --- |
| App closed during S2 or S3 | None | Reopen app: S1 shows "Continue your booking" | Draft on phone | Draft reaches S5 |
| Account created, email not yet confirmed (only if confirmation is on) | Confirmed email | Confirm via email, then Log in | Draft on phone | Log in reaches S5 |
| Logged out, request already sent | Session | Log in | Request on server | S6 shows the request |
| Send result unknown (network lost) | Server answer | "Check again" on S5 | Draft and client request ID | Server finds or creates exactly one request |
| Email already has an account (S3) | Correct sign-in | Log in instead | Draft on phone | Log in reaches S5 |

## 8. Risks and unknowns

| Gap | Effect | Owner | Decision or evidence needed |
| --- | --- | --- | --- |
| D-10 Price not shown | People may send requests without knowing cost | You | Decide what price, if any, S5 shows |
| D-11 Payment | Unknown how the business gets paid | You | Decide payment method and timing. Not built in Phase 1 |
| D-12 Cancel or change | People cannot change a sent request in the app | You | Decide rules and the contact route. S6 can only show a route you supply |
| D-13 Service area | Requests may come from places you do not serve | You | Supply served areas, or accept all and decline by hand |
| D-14 Arrival hours | "Morning" and "Afternoon" have no hours | You | Supply hours. Labels gain hours once known |
| D-15 Terms and privacy | App stores need a privacy policy link; sign-up usually links terms | You (and your legal adviser) | Supply URLs. We do not write legal text |
| D-16 Confirmation process | Requests wait with no confirmer | You | Who confirms, how, and what other outcomes exist |
| Account deletion | Apple asks apps that let people create accounts to also let them start account deletion in the app | You | Plan before App Store release. Not in Phase 1 screens |

## 9. Dependencies

Expo (React Native, TypeScript) and Supabase (auth, Postgres, row level security), chosen under D-04. No other integrations. No email or push messages beyond Supabase's own auth emails.

## 10. Feedback acceptance

| Source/date | Keep/remove/change/add | Element | Exact acceptance check |
| --- | --- | --- | --- |
| Owner, 2026-10-13 | Add | Sign-up flow | A new person can create an account with email and password in the app |
| Owner, 2026-10-13 | Add | First cleaning booking | A signed-up person can send one cleaning request with address, date and arrival time, and see it on S6 |
| Owner, 2026-10-13 | Add | Key screen at phone size | One HTML file shows S2 Booking details at phone width |

## 11. Decision log

| ID | Scope / decision | Status | Source/date | Replaces | Affected artifacts |
| --- | --- | --- | --- | --- | --- |
| D-01 | Phase 1 sends a booking request the business confirms; no instant booking | Approved (delegated) | Owner, 2026-10-13 | None | All |
| D-02 | Booking details first; account created just before Review and send; draft kept on phone | Approved (delegated) | Owner, 2026-10-13 | None | S1 to S5 |
| D-03 | Sign up with email and password | Approved (delegated) | Owner, 2026-10-13 | None | S3, S4, S4R, 02, 03 |
| D-04 | Expo (React Native, TypeScript) with Supabase | Approved (delegated) | Owner, 2026-10-13 | None | 02, 05 |
| D-05 | No brand supplied; neutral system in DESIGN.md | Approved (delegated) | Owner, 2026-10-13 | None | DESIGN.md, 04 |
| D-06 | Arrival time choices: Morning, Afternoon, Any time, no hours shown until D-14 | Approved (delegated, part of the D-01 request form) | Owner, 2026-10-13 | None | S2, S5, S6 |
| D-07 | Email confirmation setting: flow supports both on and off; you choose the Supabase setting | Unresolved | 2026-10-13 | None | S3, 02 |
| D-10 | Price shown before sending | Unresolved | Not delegable | None | S5 |
| D-11 | Payment | Unresolved | Not delegable | None | Later phase |
| D-12 | Cancel or change rules and contact route | Unresolved | Not delegable | None | S6 |
| D-13 | Service area | Unresolved | Owner | None | S2 |
| D-14 | Arrival time hours | Unresolved | Owner | None | S2, S5, S6 |
| D-15 | Terms and privacy URLs | Unresolved | Owner and legal | None | S3 |
| D-16 | Who confirms requests and other outcomes | Unresolved | Owner | None | S6, 02 |
| D-17 | Home size or cleaning type fields | Proposed, not built | Assistant | None | S2 |
| D-18 | Earliest date is tomorrow; any longer lead time is Unknown | Approved (delegated, part of the D-01 request form) | Owner, 2026-10-13 | None | S2 |

Document completion is not implementation readiness. D-10, D-12, D-15 and D-16 must be decided before public launch.
