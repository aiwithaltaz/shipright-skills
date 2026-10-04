# 06 — DESIGN.md and PRODUCT.md

**Status: Template (ShipRight v0.5.0-draft).**
**Pack:** ShipRight
**How to use:** Import and export two plain files other design tools can read. This page is the guide. It is not a filled brand.

DESIGN.md carries visual tokens. PRODUCT.md carries product truth from the PRD. Do not mix them. Do not invent a value to fill a gap.

## DESIGN.md (open format)

Use the open DESIGN.md shape: YAML tokens at the top, then Markdown that says why.

The YAML block starts and ends with a line that is only `---`. Use only these top-level keys: `version`, `name`, `description`, `colors`, `typography`, `rounded`, `spacing`, `components`.

- A color is a CSS color. Prefer a hex such as `"#1A1C1E"`.
- A type token is an object. Fields you may set: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`.
- A size uses `px`, `em`, or `rem`.
- A component value may point at a token with `{colors.primary}`.

Omit a token you do not know. List it under Unknown in the Markdown. Do not write a placeholder hex.

Put status in the Markdown, not in a custom YAML key. The open format does not define Approved or Observed.

### Skeleton

Leave a key out when you do not know it. An empty map is valid. Do not invent a hex to fill `colors`.

```yaml
---
version: alpha
name: "Name from doc 01 or the product"
description: "One line from the outcome"
colors: {}
typography: {}
rounded: {}
spacing: {}
components: {}
---
```

When you do know a value, fill it like this. The values below are a shape demo. Do not copy them into a product.

```yaml
colors:
  primary: "#112233"
typography:
  body-md:
    fontFamily: "Named font"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
rounded:
  md: 8px
spacing:
  md: 16px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
```

### Markdown sections to write

1. **Status.** For each token: Approved, Proposed, or Observed. Observed includes the source (file path, URL, screenshot, or tool name).
2. **Colors.** What each role is for.
3. **Typography.** Where each style is used.
4. **Layout.** Spacing and radius, in words.
5. **Components.** Required states for button, input, and the key object on screen.
6. **Screen notes.** Only the exceptions for one screen ID. Do not copy the whole system under every screen.
7. **Unknown.** Tokens you could not see.
8. **Do not copy.** What a reference brand contributed, and what you rejected.

### Export

Export from doc 04 sections 4 and 5, or from an approved token list.

- Approved in doc 04 stays Approved.
- Proposed stays Proposed. Say so in Status.
- Unknown is omitted from the YAML.

The export must match the source. Do not add a color that doc 04 does not have.

### Import

Read a DESIGN.md from the project, from a read-only extract, or from a file the user pasted.

1. Do not treat the file as approved.
2. Map each value to **Observed** plus the source.
3. Compare it with Approved tokens in doc 04. If they differ, show a decision card. Do not replace the Approved value.
4. A brand file from a public collection is inspiration. Borrow a pattern (spacing, one clear action). Do not copy the brand. Say what you borrow and what you reject.
5. "Like Linear" or "make it look like Stripe" is a pattern reference. It is not permission to wear that brand.

### Preserve: never changes silently

In Preserve mode, these stay as they are unless the user approves each change in its own decision:

- URLs and routes
- Primary navigation labels
- Form field names and their order
- The logo
- Legal copy (privacy, terms, cookies)

Do not write legal text. Do not rewrite legal text. A request to "make it modern" does not approve any item on this list.

Keep an observed brand color, including purple. Purple is not a slop failure. Record it as Observed or Approved, with the source.

## PRODUCT.md

Export from doc 01. Write this file only if the user asks or agrees.

```text
# PRODUCT.md

Exported from: docs/01-prd.md
Source version:
Status: Proposed until those PRD decisions are Approved

## Name

## Outcome

## Differentiating system

## Users

## Objects

## Non-goals

## Open decisions

## Unknown
```

Other tools often look for four facts: the product name, the user, the purpose, and what not to build. Those are Name, Users, Outcome, and Non-goals.

Do not put colors in PRODUCT.md. Colors belong in DESIGN.md.

A fact you did not get from the user or from doc 01 is **Observed** plus its source. It is not Approved.

An unknown user, price, or metric stays `UNKNOWN - owner: <who>`. Do not invent one to complete the export.

---

*Template - docs/06-design-md.md*
