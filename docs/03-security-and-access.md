# 03 - Security and access

**Status: Template (ShipRight 1.7.1).**
**Project path:** `docs/shipright/03-security-and-access.md`

**Version/date:** <!-- -->  **Sources and approval:** <!-- -->


This records product access rules. It is not a security audit or legal review.
Use only actual roles and capabilities from the current phase. Do not seed Owner/Admin/Member/Guest roles by default.

## Roles and authentication

| Actual role | User job | Sign-in requirement | Source |
| --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> |

<!-- Known sign-in, session, recovery and verification behavior, or Unknown. -->

## Permission matrix

| Action | Actual actor | Allowed scope | Denied behavior | Source |
| --- | --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- --> |

## Data boundaries

| Data | Who may see/change it | Storage/logging/URL limits | Retention source |
| --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> |

No secrets or sensitive phone/email searches in URLs, analytics or logs by default.
UI visibility is not access enforcement. Record required server-side boundaries and verification limits.
For role-based IA only when relevant, map actual capabilities to existing/approved destinations, direct-entry object scope and denied recovery. Include retrieval previews/suggestions/counts in data boundaries; hiding a menu never grants or enforces permission. No invented roles or security Pass from a map.

## Consequential actions

| Action/object | Effect | Confirmation or supported undo | Recovery | Authority |
| --- | --- | --- | --- | --- |
| <!-- --> | <!-- --> | <!-- --> | <!-- --> | <!-- --> |

Clear/reset/remove must state what happens to saved records. Keep unclear destructive effects unresolved.
Show denied states and safe exits without revealing protected records. Preserve valid work where supported.

## Risks and open choices

<!-- Material risks, source or evidence needed, owner and effect on readiness. Do not invent a compliance claim. -->
