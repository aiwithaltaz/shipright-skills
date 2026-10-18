# Screens, flows, and design direction

## Screen map

```
Owner / office (desktop first, works on tablet and phone)
├── Week board            <- home screen, built as index.html
├── Visit detail          (side sheet over the board)
├── Customers
│   └── Customer > Property > Service plan
├── Invoices
│   ├── Ready to invoice  (also a panel on the week board)
│   ├── Sent / Overdue / Paid
│   └── Invoice detail
├── Crews & people
└── Settings              (company, billing modes, Stripe, QuickBooks, plan)

Crew lead (phone)
├── Today                 (ordered stops)
└── Stop detail           (notes, gate code, mark done / skipped, photos)

Customer (no login)
└── Invoice page          (view, pay by card or ACH)
```

## The main screen: Week board

**Job of the screen:** answer "Is this week going to work?" in five seconds, and let the owner fix it in a few drags.

```
┌────┬───────────────────────────────────────────────────────────┬──────────────────┐
│    │ Week of Oct 19   ‹ ›   Today        Unassigned (3)  + Visit│ Ready to invoice │
│ G  ├──────────┬──────┬──────┬──────┬───────────┬──────┬──────┤ 9 visits $1,284  │
│    │          │ Mon  │ Tue  │ Wed  │ Thu  RAIN │ Fri  │ Sat  │                  │
│ ▢  │          │ 64°  │ 66°  │ 61°  │ 80% rain  │ 58°  │ 60°  │ ☑ Hollis  $110   │
│ ▢  ├──────────┼──────┼──────┼──────┼───────────┼──────┼──────┤ ☑ Ortega  $55    │
│ ▢  │ Crew 1   │ card │ card │ card │ card      │      │      │ ☑ ...            │
│ ▢  │ Marco    │ card │ card │      │ card      │      │      │                  │
│    │ 6.5/8h   │      │      │      │           │      │      │ [Send 9 invoices]│
│    ├──────────┼──────┼──────┼──────┼───────────┼──────┼──────┤                  │
│    │ Crew 2   │ ...                                          │ Overdue $640     │
│    │ Unassigned tray (visits not on a crew yet)              │                  │
└────┴───────────────────────────────────────────────────────────┴──────────────────┘
```

**Key elements**

- **Day headers carry the forecast.** A rainy day gets a hatched column and a banner with one action: "Move Thursday's 6 visits to Friday".
- **Each cell shows load**: a thin bar at the bottom of the cell, hours booked vs the crew's day length. Over capacity turns the bar and the hours red.
- **Visit cards**: customer name, service, duration, price. Done visits are checked and muted. Skipped visits get a flag.
- **Crew rows** start with the crew name, the lead's name, and the truck color (owners already think in "the white truck" and "the green truck").
- **Ready to invoice panel** on the right: done visits, grouped by customer, all checked by default. One button sends them.
- **Phone layout**: day tabs across the top, crews stacked below, the invoice panel moves under the board.

## Key flows

### A. Monday planning
1. Owner opens the board. Recurring visits are already placed.
2. Unassigned tray shows 3 new one-off visits (a fall cleanup, a mulch job).
3. Owner drags each onto a crew/day with room. Load bars update live.
4. Crew leads' "Today" list updates on their phones.

### B. Rain day
1. Thursday shows 80% rain. The column is hatched and has a "Move to Friday" action.
2. Owner taps it. All Thursday visits move to Friday, same crews.
3. A toast confirms: "Moved 6 visits to Friday" with Undo.
4. (P1) Customers get a text about the new day.
5. If Friday is now over capacity, those cells turn red, and the owner rebalances.

### C. Crew marks work done
1. Crew lead opens Today, taps a stop, taps "Mark done", adds a photo.
2. On the board, the card shows as done; the visit appears in Ready to invoice.

### D. Friday invoicing
1. Office manager reviews the Ready to invoice panel. Per-visit customers get one invoice each; monthly-billing customers are held until month end (shown in a separate group).
2. Taps "Send 9 invoices". Each customer gets an email with a pay link.
3. Panel empties: "All caught up. Done visits show up here."

## Design direction for the product

| Token | Value | Use |
|---|---|---|
| Ink (spruce) | `#17302A` | Text, sidebar |
| Ground (mist) | `#E7EBE4` | Page background, cool grey-green, not cream |
| Paper | `#FAFBF8` | Board cells, panels |
| Crew green | `#2F6B4F` | Primary actions |
| Survey-flag pink | `#E0337A` | Only for things that need attention: rain, over-capacity, overdue |
| Truck colors | white `#C9CFC8`, green `#3F8F5E`, blue `#3C6FB0`, tan `#B48A4E` | Crew identity stripe |

- **Why flag pink:** landscapers mark sprinkler heads, property lines, and hazards with fluorescent flagging tape. It's the trade's own "look here" color, so it's the only accent, and it's used only for problems.
- **Type:** system UI fonts (fast, no downloads), with tabular figures for hours and dollars. Crew names and day headers set larger and heavier; everything else stays quiet.
- **Shape:** cards are small and tight, like magnets on the shop whiteboard. Sharp-ish 6px corners on cards, none on the board grid.
- **Motion:** only when the user acts (a card landing in a new cell, the rain move, invoices leaving the panel).
- **Accessibility:** every drag has a "Move to..." alternative; focus rings are visible; color is never the only signal (rain also has text, over-capacity also has the hour count).
