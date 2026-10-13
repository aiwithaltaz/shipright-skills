# Product

**Version/date and approval sources:** v0.1, 2026-10-13. Source: the owner's request ("a mobile app where a new user signs up and books their first home cleaning") and the owner's reply to five decision cards: "You decide. Use your recommended picks for everything you asked." Decisions D-01 to D-05 are Approved by that delegation. Prices, payment, cancellation and legal text were not delegated and stay Unresolved.
**App name:** Unknown (owner). No name or logo appears in the UI until supplied.
**User and outcome:** A new customer, on their own phone, creates an account and sends a request for their first home cleaning. The business then confirms it.
**Current alternative and useful mechanism:** Current alternative: Unknown (owner; phone, message or another app are guesses, not evidence). Mechanism: the person states where and when in one short form, creates an account only once they have entered those details, reviews, and sends. They can always see the request status in the app.
**Current phase:** Phase 1. Sign up and send the first cleaning request.
**Approved now:** Welcome, Booking details, Create account, Log in, Reset password, Review and send, Request status. Details stay on the phone until sent.
**Excluded / later notes only:** In-app payment, prices, instant booking from live open times, cancel or change from the app, repeat or recurring bookings, cleaner profiles, ratings and reviews, chat, push notifications, promo codes, referral, Apple or Google sign-in, staff or admin app. None of these get screens, disabled buttons, hidden routes or tables in Phase 1.

## Objects and journey

| Object | Independent states | Owner |
| --- | --- | --- |
| Booking draft (on the phone only) | Empty, In progress, Ready to send | Customer |
| Customer account | Not created, Created (email confirmed or waiting, depending on project setting) | Customer |
| Booking request (server) | Requested, Confirmed. Other outcomes (declined, rescheduled) Unknown, owner | Customer creates; business confirms |

Main path: Welcome → Booking details → Create account → Review and send → Request status.
Return path: Welcome → Log in → Request status (or Review and send if a draft is waiting).

## Screens

| ID | Job | Current-phase source |
| --- | --- | --- |
| S1 Welcome | Start a booking, or log in | Request; D-02 |
| S2 Booking details | Say where and when the cleaning is | Request; D-01 |
| S3 Create account | Create an account with email and password | Request; D-02, D-03 |
| S4 Log in | Return to an existing account | Needed for return visits (F1) under D-03 |
| S4R Reset password | Recover a forgotten password | Needed for D-03 email and password accounts |
| S5 Review and send | Check details and send the request | D-01, D-02 |
| S6 Request status | See the request and whether it is confirmed | D-01 |

## Builder rules

Build only approved current-phase scope. Follow exact feedback; do not copy incidental reference features.
Never invent brand values, data, testimonials, metrics or users. Label sample data for requested prototypes/tests.
Visual values come from DESIGN.md or existing sourced components.
Use docs/shipright/04-frontend-spec.md for states and docs/shipright/build-rules.md for handoff instructions.

**Open decisions and owners (all owner: you):** price shown before sending (D-10), payment (D-11), cancel or change rules (D-12), service area (D-13), arrival time hours (D-14), terms and privacy links (D-15), how the business confirms requests (D-16), home size or cleaning type fields (D-17).
Details: docs/shipright/01-prd.md and docs/shipright/05-feature-ticket-list.md.
