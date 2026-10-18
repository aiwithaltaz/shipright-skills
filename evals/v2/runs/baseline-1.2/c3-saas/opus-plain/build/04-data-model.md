# Data model

Multi-tenant: every table except `companies` has a `company_id`, and every query filters on it (enforced with Postgres row-level security).

```
companies ─┬─< users
           ├─< crews ─< crew_members >─ users
           ├─< customers ─< properties ─< service_plans
           │                     │
           │                     └─< visits >── crews
           │                            │
           ├─< invoices ─< invoice_lines >─┘
           └─< payments >── invoices
```

## Tables

### companies
| Column | Type | Notes |
|---|---|---|
| id | uuid | |
| name | text | |
| timezone | text | e.g. `America/Chicago` |
| work_days | int[] | default Mon to Sat |
| default_day_hours | numeric | default 8 |
| service_area_zip | text | used for the weather forecast |
| stripe_account_id | text | Stripe Connect account for collecting customer payments |
| plan | text | `starter`, `crew`, `company` |
| trial_ends_at | timestamptz | |

### users
| Column | Type | Notes |
|---|---|---|
| id, company_id | uuid | |
| name, email, phone | text | |
| role | enum | `owner`, `office`, `crew_lead`, `crew` |

### crews
| Column | Type | Notes |
|---|---|---|
| id, company_id | uuid | |
| name | text | "Crew 1" |
| lead_user_id | uuid | |
| color | text | truck color |
| day_hours | numeric | overrides company default |
| active | bool | |

### crew_members
`crew_id`, `user_id`. A person can float between crews; the MVP only tracks the default crew.

### customers
| Column | Type | Notes |
|---|---|---|
| id, company_id | uuid | |
| name, email, phone | text | |
| billing_address | text | |
| billing_mode | enum | `per_visit`, `monthly` |
| payment_terms_days | int | default 15 |
| notes | text | |

### properties
| Column | Type | Notes |
|---|---|---|
| id, company_id, customer_id | uuid | |
| address | text | |
| lat, lng | numeric | geocoded on save, for route order |
| gate_code, access_notes | text | shown to crew |

### service_plans (recurring work)
| Column | Type | Notes |
|---|---|---|
| id, company_id, property_id | uuid | |
| service_name | text | "Weekly mow & edge" |
| price | numeric(10,2) | per visit |
| est_hours | numeric | crew-hours, used for load |
| frequency | enum | `weekly`, `biweekly`, `monthly` |
| preferred_day | int | 1 = Mon |
| default_crew_id | uuid | nullable |
| season_start, season_end | date | |
| active | bool | |

A nightly job generates `visits` 8 weeks ahead from active plans. Editing a plan regenerates only future, untouched visits.

### visits (the core table)
| Column | Type | Notes |
|---|---|---|
| id, company_id, property_id | uuid | |
| service_plan_id | uuid | null for one-off work |
| crew_id | uuid | null = unassigned tray |
| date | date | |
| route_order | int | within crew/day |
| service_name | text | copied from plan so edits don't rewrite history |
| price | numeric(10,2) | |
| est_hours | numeric | |
| status | enum | `scheduled`, `done`, `skipped`, `canceled` |
| skip_reason | text | |
| completed_at | timestamptz | |
| completed_by | uuid | |
| note | text | |
| photos | text[] | storage keys |
| invoice_id | uuid | null = ready to invoice (when status is `done`) |
| moved_from_date | date | set by rain moves, for customer texts and undo |

**"Ready to invoice"** = `status = 'done' AND invoice_id IS NULL`. For `monthly` customers, these are held until month end.

### invoices
| Column | Type | Notes |
|---|---|---|
| id, company_id, customer_id | uuid | |
| number | int | per company sequence |
| status | enum | `draft`, `sent`, `viewed`, `paid`, `overdue`, `void` |
| issue_date, due_date | date | |
| subtotal, tax, total | numeric(10,2) | |
| public_token | text | for the customer pay link |
| stripe_payment_intent_id | text | |
| sent_at, viewed_at, paid_at | timestamptz | |

### invoice_lines
`invoice_id`, `visit_id` (nullable for manual lines), `description`, `quantity`, `unit_price`, `amount`.

### payments
`invoice_id`, `amount`, `method` (`card`, `ach`, `cash`, `check`), `stripe_charge_id`, `received_at`.

### activity_log
`company_id`, `actor_user_id`, `entity`, `entity_id`, `action`, `data jsonb`, `created_at`. Powers undo for board moves and the history shown on a customer.

## Indexes that matter
- `visits (company_id, date, crew_id)` for the week board
- `visits (company_id, status, invoice_id)` for Ready to invoice
- `invoices (company_id, status, due_date)` for overdue
