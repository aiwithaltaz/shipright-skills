# Design Excellence for app screens

Load for an app, dashboard or operational table. This is a proposed ShipRight craft policy based on the owner's research synthesis. Its numbers are starting profiles, not universal laws. Preserve approved systems. Provenance and rejected claims are in SOURCES.md.

## Visual contract before coding

Name the screen question, primary action, density and dominant region. Pick two or three relevant references: [Attio](https://attio.com/) for CRM records, [Linear](https://linear.app/) for task hierarchy, [Stripe](https://stripe.com/) for financial summaries. These are research candidates, not verified current screenshots or measured winners. Use the working product or supplied captures, not a marketing hero as proof of its app layout.

Record URL, capture, state, width, contribution and evidence status. Borrow principles, not branding or unsupported data. Check terms before reusing code or assets.

## Type, spacing and color

- **Type:** start apps at meta 12/16, table/body 14/20, comfortable body 16/24, section 18/24 and page 24/32 (size/line-height in px). Define weights. Use one UI family; add a display family only for a reason. Test font loading, long labels and 200% text. Weight may supply hierarchy when sizes are close. Check: every role maps to a token; headings and body are visibly distinct. The checker warns when title size is below 1.2 times body and weight differs by less than 150. This is a review signal, not a beauty score. [Typography](https://developer.apple.com/design/human-interface-guidelines/typography).
- **Spacing:** start with 4, 8, 12, 16, 24, 32, 48 and 64px. Keep an existing 40px token if useful. Related items have smaller gaps than separate groups; align shared edges. Check tokens and rendered alignment. Document optical exceptions as `/* space-exception --space-name: reason */`. [Spacing](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/styles/tokens/space.css).
- **Color:** define surface, text, muted, border, focus, action and semantic roles. Every accent has a meaning; no saturated box on every nav row. Check actual pairs: 4.5:1 normal text, 3:1 qualifying large text, with WCAG exceptions. State also has a label or shape. Remap dark-theme roles and retest. No universal accent percentage. [Palette](https://refactoringui.com/previews/building-your-color-palette), [contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Charts that answer the question

An analytical dashboard MUST show the visualization required by its brief. Specify question, dataset/source, units, aggregation, range and interpretation first. Lines show time; bars compare categories; scatterplots show relationships; histograms show distributions; tables serve exact lookup. Never invent a trend, baseline or claim. Label sample data. Missing data gets an honest state, not a fabricated curve.

Check: the required chart is visible, labeled and responsive; units/range are clear; an accessible summary or data alternative agrees with its values. Preserve categorical colors across views. Use ordered lightness for magnitude and diverging colors only around a meaningful midpoint. Share formatters and tokens through one chart implementation path. Chart presence cannot prove correct encoding or data. [Chart anatomy](https://www.carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy), [encoding](https://www.carbondesignsystem.com/building-blocks/data-visualization/color-palettes).

## Tables and data

- **Column contract:** type, minimum/preferred width, growth, alignment, formatter, phone priority and overflow/full-value access. Right-align numeric columns with tabular figures and consistent units/precision. Check longest supplied names, large/negative values and translated labels. No `word-break: break-all` on ordinary names/statuses. Truncation needs keyboard/touch access to full values. Use a contained scroller when comparison needs two dimensions; the surrounding page still reflows. [Columns](https://github.com/ant-design/ant-design/blob/master/components/table/index.en-US.md).
- **Density:** coordinate row pitch, padding and type. Do not shrink letters to fit a rail. A rail earns space through a distinct next decision. Check readable headers, line counts, visible rows and targets at 390/1280; collapse context that squeezes the work.
- **Missing values:** define field semantics. Owner null can be Unassigned; absent date can be Not scheduled. Preserve numeric 0 and boolean false. Distinguish unavailable, not applicable and retrieval error. Check each formatter case and scan visible UI for raw None/null/undefined/NaN. Intentional code examples and real None choices are valid. Scope a documented `data-raw-value="intentional"` exception to that value, never the page. [Display semantics](https://github.com/marmelab/react-admin/blob/master/packages/ra-ui-materialui/src/field/TextField.tsx).

## Navigation, states and motion

- Product, scope and active destination remain identifiable. Use one quiet active treatment; separate workspace switching. Phone global nav becomes a deliberate drawer/menu with focus return. Peer tabs retain panel semantics. Scrolling nav needs a visible linked hint or named scroll control. Check the last item by keyboard and touch; a marker or clipped tab is insufficient. [Tabs](https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/tabs/tabs.tsx).
- Keep first use, filtered-empty, restricted, loading, stale and failure states distinct. Loading preserves geometry. Errors preserve useful work and offer working recovery. Exercise each state. Check the 24px AA target criterion with exceptions; 44px is a larger touch/AAA goal, not a blanket AA rule. [Targets](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- State each animation's purpose, properties, interruption and reduced-motion alternative. Controls remain usable during motion. No mandatory GSAP, Lenis, WebGL or row entrance animation for CRUD. Test keyboard, cancellation and reduced motion with identical essential content. [Motion](https://motion.dev/docs/react-accessibility).

## Screenshot critique and fix loop

Capture the populated screen at 390 and 1280. Compare beside two or three reference captures at matched task, width and state. Record the biggest gap per category. Score each 0 (visible defect/missing), 1 (coherent but unresolved gap), or 2 (clear, consistent and stress-tested with capture evidence):

1. Type and hierarchy.
2. Composition, alignment and spacing.
3. Color, contrast and coherent chrome.
4. Data: right chart, readable table and meaningful formatting.
5. Responsive behavior, states and interaction clarity.

The 10-point rubric and 8/10 threshold are project policy, not a validated aesthetics instrument. Every score needs a region-specific observation. Product, visual and technical outcomes stay separate. Missing required charts, unreadable values and unreachable primary actions are blockers regardless of total.

Self-critique is required but remains a self assessment. An independent reviewer confirms a taste Pass; without one, independent taste stays Not verified. Fix the largest gap, recapture and rescore until at least 8/10 and no blockers. If evidence, permissions, budget or capability stops progress, show the failing criterion and remaining work. Never invent an 8 to stop the loop. Unavailable reference screens stay Not verified. [Review basis](https://www.nngroup.com/articles/principles-visual-design/).
