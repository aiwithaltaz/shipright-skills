# Filled excerpt - 01 PRD (sample only)

**Status: DRAFT example.**  
**Pack:** ShipRight  
**Product:** Acme Team (fictional SaaS)  
**Feature:** Invite teammate  
**Author:** Example for ShipRight pack  
**Date:** 2026-09-20  

> This is a **short excerpt** for teaching. It is supplied context, not a complete implementation specification. Related documents are not supplied; use only the sections actually present.

---

## Problem

Small team admins set up Acme Team alone, then need a coworker in the workspace. Today they email passwords in chat (unsafe) or skip collaborating. They need a simple **invite by email** path.

## Users

### Primary

- **Role:** Workspace Owner  
- **Job:** Invite a teammate so they can collaborate  
- **Context:** Desktop web, during first week after signup  
- **Constraints:** Not technical; wants this done in under two minutes  

### Out of scope users

- Public anonymous visitors  
- Enterprise SCIM provisioning (later)

## Goals

1. Owner can invite a teammate by email  
2. Invitee receives a link and can join with the correct role  
3. Owner sees pending vs active members  

## Non-goals

- [ ] Bulk CSV import (later)  
- [ ] Custom SSO setup in this release  
- [ ] In-app chat  
- [ ] Marketing website redesign  

## Success metrics

| Metric | Baseline | Target | How measured |
|--------|----------|--------|--------------|
| % new workspaces with ≥1 invite in 7 days | UNKNOWN | UNKNOWN - set with data team | Analytics event `invite_sent` |
| Invite accept rate | UNKNOWN | UNKNOWN | `invite_accepted` / `invite_sent` |

## Scope

### In scope

- [ ] Invite form (email + role: Member)  
- [ ] Members list with empty / pending / active  
- [ ] Resend invite (Owner)  
- [ ] Permission denied for non-owners attempting invite  

### Out of scope

- [ ] Guest role  
- [ ] Multiple workspaces switcher redesign  

## Assumptions

| ID | Assumption | Risk if wrong |
|----|------------|---------------|
| A1 | Email delivery exists via current provider | Invites fail silently - need error state |
| A2 | Only Owner can invite in v1 | Members may expect invite rights |

## User jobs

| Job ID | User job | Priority |
|--------|----------|----------|
| J1 | Invite a teammate by email | P0 |
| J2 | See pending and active members | P0 |
| J3 | Resend a pending invite | P1 |

## Risks & open questions

| Risk / question | Owner | Status |
|-----------------|-------|--------|
| What if email bounces? | Eng | open |
| Expire invites after N days? | Product | open |

## Ready for skills?

This excerpt supports a provisional specification discussion. Expiry, delivery and retry behavior remain unresolved. See the actual inline specification and honest readiness checks in `sample-skill-outputs.md`; no generated artifact or runtime verification is supplied.

---

*DRAFT example - ShipRight - not a live product*
