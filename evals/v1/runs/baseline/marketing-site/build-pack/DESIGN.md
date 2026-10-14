---
version: "0.1"
name: "SocialGhost beta site"
description: "Small system for the SocialGhost beta recruitment page. Values chosen under founder delegation (D6), 2026-10-13."
colors:
  paper: "#F6F5F1"
  surface: "#FFFFFF"
  ink: "#16161A"
  ink-hover: "#2A2A31"
  muted: "#55555F"
  line: "#D9D8D1"
  field-border: "#8A8A93"
  accent: "#2F3BC4"
  accent-soft: "#E7E8FA"
  error: "#B42318"
  error-soft: "#FDF1EF"
  success: "#1B6B3A"
  success-soft: "#ECF6EF"
  night: "#1B1B24"
typography:
  display: { family: "Space Grotesk", weight: 600, size: "clamp(2.5rem, 4.2vw + 1rem, 4rem)", line-height: 1.05, letter-spacing: "-0.02em" }
  h2: { family: "Space Grotesk", weight: 600, size: "clamp(1.75rem, 1.6vw + 1.1rem, 2.5rem)", line-height: 1.15, letter-spacing: "-0.01em" }
  h3: { family: "Space Grotesk", weight: 600, size: "1.25rem", line-height: 1.3 }
  lead: { family: "Inter", weight: 400, size: "clamp(1.125rem, 0.4vw + 1rem, 1.25rem)", line-height: 1.55 }
  body: { family: "Inter", weight: 400, size: "1rem", line-height: 1.6 }
  label: { family: "Inter", weight: 600, size: "1rem", line-height: 1.4 }
  small: { family: "Inter", weight: 400, size: "0.875rem", line-height: 1.5 }
rounded:
  sm: "6px"
  md: "10px"
  lg: "20px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  9: "96px"
components:
  button-primary: { background: "ink", text: "surface", radius: "md", min-height: "48px", padding-x: "24px" }
  button-secondary: { background: "transparent", text: "ink", border: "1px ink", radius: "md", min-height: "44px", padding-x: "16px" }
  input: { background: "surface", border: "1px field-border", radius: "md", min-height: "48px", font-size: "16px" }
  focus-ring: { outline: "3px solid accent", offset: "2px" }
---

# Design system

## Overview

One screen, S1 Home, whose job is to explain the beta deal and collect applications from serious testers.
**Mode:** Establish. No brand existed (Q5). The founder delegated the choice (R2, 2026-10-13). All values above are delegated choices, recorded under D6. Replace them if a real brand arrives.
**Direction:** plain and confident, like a well-made tool page. Readable type, one dark primary button, one indigo accent for links and focus. Nothing that looks like fake product proof.

## System source and reuse

New project; no existing system. Borrowed properties only, no identity:
- GOV.UK: visible labels above fields, error summary, plain error words.
- Geist: restrained type and one primary action per area.

## Colors

| Role | Value | Use | Measured contrast |
| --- | --- | --- | --- |
| paper | #F6F5F1 | Page background | ink on paper 16.5:1 |
| surface | #FFFFFF | Form panel, inputs | ink on surface 18.0:1 |
| ink | #16161A | Text, primary button fill | white on ink 18.0:1 |
| ink-hover | #2A2A31 | Primary button hover only | white on ink-hover above 14:1 |
| muted | #55555F | Supporting text | 6.75:1 on paper, 7.4:1 on surface |
| line | #D9D8D1 | Separators, panel border (decorative grouping only) | Not used as a required boundary |
| field-border | #8A8A93 | Input and checkbox borders | 3.4:1 on surface, 3.1:1 on paper |
| accent | #2F3BC4 | Links, focus ring, badge text, step numbers | 7.6:1 on paper, 8.3:1 on surface, 6.8:1 on accent-soft |
| accent-soft | #E7E8FA | Badge background | |
| error | #B42318 | Error text and icon | 6.6:1 on surface |
| success | #1B6B3A | Sent state icon and heading | 6.5:1 on surface |
| night | #1B1B24 | Hero illustration background only | |

Inside the hero illustration only: white at reduced opacity, black at reduced opacity, a radial accent glow, and one light accent tint #8A93FF for the progress fill. Decorative, hidden from assistive tech. Not for UI.

Ratios computed from the hex values with the WCAG formula. Rendered pairs still need checking in the built site.

## Typography

Space Grotesk 600 for headings and the text wordmark. Inter 400/500/600 for everything else. Both from Google Fonts. Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
Inputs use 16px text to avoid phone auto-zoom. Line length for body text: up to 65 characters.

## Layout

- Container: max width 1120px, centered. Side gutter 24px, 16px under 600px.
- Section spacing: 96px between sections on desktop, 64px under 900px.
- Within a group: 8 to 16px. Between groups: 24 to 48px.
- Hero: two columns at 900px and up (text left, illustration right, 48px gap). Below 900px: text first, illustration after.
- Apply section: two columns at 900px and up (criteria left at 5/12, form right at 7/12). Below 900px: criteria first, then form.
- `scroll-margin-top: 24px` on section anchors. `scroll-padding-bottom: 88px` on mobile so the sticky bar never covers focus.

## Elevation & Depth

Borders do the grouping. One shadow only, on the hero illustration frame: `0 24px 60px -24px rgba(22,22,26,0.35)`.
The form panel uses a 1px line border on surface, no shadow.

## Shapes

sm 6px for the badge. md 10px for buttons and inputs. lg 20px for the form panel and illustration frame. Checkbox 4px.

## Components

| Canonical name | Use on S1 | Library equivalent if a kit is used |
| --- | --- | --- |
| Skip link | First focusable element, "Skip to main content" | Native link |
| Header | Text wordmark, "Apply" secondary button-link | Native header |
| Badge | "Limited beta" in the hero. Real status from R1 | shadcn Badge |
| Heading | h1 hero, h2 per section, h3 in the Apply column | Native |
| Button (primary) | "Apply for the beta" in hero; "Send application" in form; mobile bar | shadcn Button default, restyled |
| Button (secondary) | Header "Apply" link | shadcn Button outline |
| List (ordered) | How the beta works, 3 steps | Native `ol` |
| List | Apply if you; Useful feedback is specific | Native `ul` |
| Form, Label, Text input, Textarea, Checkbox | Application form | Native elements, or shadcn Form/Input/Textarea/Checkbox |
| Alert | Error summary and send failure, inside the form | shadcn Alert destructive |
| Status message | Sending and preview notices, `role="status"` | Native |
| Image (decorative) | Hero illustration, inline SVG, `aria-hidden="true"` | Native SVG |
| Footer | Wordmark and domain | Native footer |

States for every interactive component: default, hover (darken or underline only), focus-visible (3px accent ring, 2px offset), disabled-while-sending (`aria-disabled`, 60% opacity, cursor wait), error (field-border becomes error, 2px, plus text).

## Icons

- **Icon set:** inline SVG line icons, drawn to one style. Delegated choice (D6).
- **Icon exceptions:** none.
- **Style:** line.
- **Stroke weight:** 2px.
- **Sizes:** 20px, next to 16px text.
- **Icon and label spacing:** 8px.
- **Icon-only allowed:** none on S1.
- **Never icon-only:** destructive and uncommon actions. They get a visible text label.
- **Emoji:** not used.
- **Status:** text + icon + color, never color or icon alone. Used for the error alert (alert-circle) and the sent state (check-circle).

## Placement

- **Primary action side:** start (left in LTR). Single-column form, so the button sits under the last field, aligned with the fields.
- **Button order:** one button per area. Never two filled buttons side by side.
- **Form actions:** end of the form. Full width under 600px. Not sticky.
- **Dialog actions:** no dialogs on S1.
- **Destructive actions:** none on S1.
- **Search and filters:** not in scope.
- **Toasts and status messages:** no toasts. All form status shows inside the form, directly above the submit button.
- **Empty states:** not applicable; S1 has no lists of records.
- **Navigation:** top header, same on all widths. Wordmark left, "Apply" right. In-page anchor only.
- **Profile/account:** none.
- **Selection, focus, notifications:** no selection or notifications on S1. Focus ring is the only focus signal.
- **Mobile primary action:** under 900px, a sticky bottom bar with "Apply for the beta" appears after the hero button scrolls out of view and hides while the Apply section is on screen.
- **Sticky elements:** only the mobile bar. Reserve 88px with `scroll-padding-bottom` so it never hides focused controls.

## Do's and Don'ts

- Do keep the filled ink style for the main action in each area, not for decoration.
- Do keep text contrast at WCAG AA (4.5:1 body, 3:1 large text and UI parts).
- Do show a visible focus ring on every interactive element.
- Don't add gradients, glass effects or extra accent colors that are not listed here. The hero illustration may use the night color and accent tints inside its frame only.
- Don't use sample names, logos or numbers that look real in shipped UI.
- Don't show fake product screenshots, video thumbnails with fake titles, view counts, ratings or testimonials.
- Don't add icons from outside the icon set above, or icons on every heading.
- Don't describe product features beyond the supplied one-line description (D2).

## Motion

None (D10). The only movement is smooth anchor scrolling, turned off under `prefers-reduced-motion: reduce`. The mobile bar appears and hides without animation.

## Imagery and density

- **Hero illustration (D5):** inline SVG of an abstract video frame with a faceless ghost figure and a plain progress bar. It must not look like a SocialGhost interface screenshot, must not show text, captions, titles or numbers, and is hidden from assistive tech. Replace or join it with real samples once supplied.
- No photos, logos or stock images.
- Density: generous. One idea per section.

## Accessibility

Specified: native semantics, one h1, ordered headings, skip link, visible labels, `aria-describedby` for hints and errors, `aria-invalid` on invalid fields, error summary focused on failed submit, `role="status"` for sending, focus moved to the sent heading on success, 48px controls, 16px input text, reflow at 320px, reduced-motion support.
Verified: nothing at runtime yet. Contrast ratios above are computed from tokens only.

## Screen notes

None yet.

## Reference properties

GOV.UK: label-above-field and error summary pattern. Not adopted: crown, typeface, colors.
Geist: restrained type, one primary action. Not adopted: Vercel identity, Geist font.

## ShipRight status

| Token or rule | Value / proposal / gap | Evidence status | Decision status | Source / owner |
| --- | --- | --- | --- | --- |
| All YAML values | As listed | Chosen, not observed | Approved by delegation (D6) | Founder delegation, 2026-10-13 |
| Logo | None. Text wordmark only | Unknown | Unresolved until founder supplies one | Founder |
| Open graph image | None | Unknown | Later note | Founder |
