# ShipRight Skill — UX Knowledge Library and Training Blueprint

## Direct recommendation

ShipRight should **not** become one giant `SKILL.md` filled with copied UX articles. Build it as a modular UX operating system: a concise orchestration skill, focused reference modules loaded on demand, an approved retrieval library for current guidance, reusable output templates, and a rigorous evaluation suite. Agent Skills are explicitly designed for progressive disclosure, where metadata is loaded first, the main skill activates only when relevant, and supporting resources load only when needed.[^1][^2]

Fine-tuning should come later. Use it only after ShipRight has accumulated high-quality examples showing the exact inputs, reasoning behaviors, decisions, prompt packs, and final outputs it should reproduce; fine-tuning is intended to teach task behavior from correct examples, while retrieval is better for large, evolving bodies of knowledge.[^3]

## Recommended system

| Layer | Purpose | What belongs here |
|---|---|---|
| `SKILL.md` | Routes the work | Trigger rules, end-to-end workflow, decision gates, file-loading rules, output contract |
| `references/` | Teaches domain knowledge | Research, IA, flows, accessibility, visual design, design systems, content, motion, 3D, platform guidance |
| `templates/` | Forces consistent outputs | Research plan, journey, flow, screen matrix, token schema, component spec, coding-agent prompt |
| `examples/` | Demonstrates quality | Strong and weak outputs for websites, SaaS, apps, dashboards, ecommerce, AI products, and 3D sites |
| `scripts/` | Handles deterministic work | Token validation, contrast checks, schema validation, prompt-package assembly, linting |
| `evals/` | Measures quality | Trigger tests, task cases, assertions, scoring rubrics, regression cases |
| Retrieval index | Keeps knowledge current | Approved summaries, atomic rules, source links, dates, licenses, and applicability tags |
| Fine-tuned model | Standardizes behavior later | Decision style, output structure, critique quality, prompt-writing quality—not the entire UX internet |

A skill folder can contain instructions, scripts, references, templates, and other resources; the skill description is especially important because agents use it to decide when the skill should activate. Keep ShipRight portable by following the open Agent Skills format rather than binding the core logic to Cursor, Claude Code, or Codex.[^2][^4][^5][^1]

## End-to-end capability map

ShipRight should cover these stages in order, but skip or compress stages only when the task genuinely does not require them:

1. **Intent intake:** Product type, audience, problem, business model, platform, constraints, brand, evidence, accessibility target, technology, and success criteria.
2. **Ambiguity control:** Separate known facts, assumptions, risks, open questions, and decisions that need validation.
3. **Product framing:** Problem statement, value proposition, jobs, desired outcomes, anti-goals, business goals, and measurable UX outcomes.
4. **Research strategy:** Choose methods based on the question, product maturity, evidence needed, risk, time, and participant access.
5. **Research execution:** Interview guides, usability tasks, surveys, contextual inquiry, competitive analysis, analytics review, and ethical data handling.
6. **Synthesis:** Evidence-backed needs, behavioral patterns, pain points, opportunity areas, jobs, mental models, and confidence levels.
7. **Experience modeling:** Personas only when evidence supports them; otherwise use audiences, roles, jobs, and behavioral segments.
8. **Journeys and services:** Current-state journey, future-state journey, service blueprint, channels, backstage dependencies, breakdowns, and recovery moments.
9. **Information architecture:** Content inventory, taxonomy, object model, navigation model, labeling, search, permissions, card sorting, and tree testing.
10. **Interaction architecture:** Happy paths, alternate paths, edge cases, permissions, destructive actions, error recovery, empty states, loading, offline, and interruption.
11. **Screen architecture:** Route map, screen inventory, purpose of each screen, primary action, hierarchy, content, states, components, and transitions.
12. **Content design:** Plain-language labels, instructions, empty states, errors, confirmations, notifications, trust copy, and localization readiness.
13. **Visual direction:** Product-appropriate aesthetic principles, references, type, color, density, layout, imagery, motion, and differentiation—without copying a source design.
14. **Design system:** Foundations, semantic tokens, themes, components, variants, interaction states, responsive behavior, accessibility contracts, and governance.
15. **High-fidelity UI:** Complete layouts across representative breakpoints with realistic content and every meaningful state.
16. **Accessibility:** WCAG criteria, keyboard flow, focus behavior, semantics, accessible names, contrast, zoom/reflow, touch targets, reduced motion, errors, and screen-reader expectations.
17. **Implementation packaging:** Ordered prompts for coding agents, technical assumptions, file/component map, token files, acceptance criteria, and explicit “do not improvise” constraints.
18. **Validation:** Heuristic review, accessibility audit, usability testing, responsive testing, visual regression, performance checks, and design-system consistency checks.
19. **Iteration:** Rank issues by user harm, business impact, frequency, confidence, and implementation effort; update the design and its prompt package.

UX research methods should be selected according to whether the question is attitudinal or behavioral, qualitative or quantitative, and where the product sits in its lifecycle. Research belongs throughout discovery, exploration, testing, and post-launch listening—not only at the beginning.[^6][^7]

## UX research sources

### Core methods

- **[NN/g — When to Use Which UX Research Methods](https://www.nngroup.com/articles/which-ux-research-methods/):** The strongest starting taxonomy for choosing among interviews, field studies, diary studies, card sorting, tree testing, usability tests, benchmarking, analytics, and experiments. Convert it into a ShipRight method-selection decision tree rather than copying the article.[^6]
- **[NN/g — UX Research Cheat Sheet](https://www.nngroup.com/articles/ux-research-cheat-sheet/):** Organizes research into Discover, Explore, Test, and Listen. Use it to make ShipRight check whether it has enough evidence at each stage.[^7]
- **[NN/g — Research Methods Glossary](https://www.nngroup.com/articles/research-methods-glossary/):** Definitions and appropriate uses for common UX methods. Use it to standardize ShipRight terminology and prevent method confusion.[^8]
- **[NN/g — Research Reports](https://www.nngroup.com/reports/topic/research-methods/):** Deeper research material, methodologies, and examples. Treat paid or restricted reports as licensed human reference unless explicit machine-use rights are available.[^9]
- **[IDEO.org — Tools](https://www.ideo.org/tools):** Human-centered design methods, worksheets, facilitation material, prototyping, and co-design guidance. Use it to strengthen participatory and workshop-based workflows.[^10]
- **[IDEO — Design Thinking Resources](https://designthinking.ideo.com/resources):** A broader collection of design-thinking methods and case studies. Use it to teach divergent/convergent exploration, not as a rigid linear process.[^11]

### Research rules to encode

- Do not treat what users say as proof of what they do.
- Use interviews to understand perceptions, motivations, context, and vocabulary—not to validate usability.
- Use observational usability testing to find interaction breakdowns.
- Triangulate important decisions across behavioral evidence, attitudinal evidence, analytics, and product constraints.
- Record evidence strength and sample limitations.
- Never invent interview findings, personas, quotes, analytics, or validation.
- When no research exists, label outputs as hypotheses and produce a research plan.

## Product strategy sources

- **[Apple Design Principles](https://developer.apple.com/design/human-interface-guidelines/design-principles):** Strong principles for usefulness, transparency, privacy, consistency, familiarity, inclusive design, context preservation, and support for multiple input methods.[^12][^13]
- **[Laws of UX](https://lawsofux.com/):** A practical index of psychology-related heuristics such as Fitts’s Law, Hick’s Law, proximity, similarity, cognitive load, and the peak-end rule. Use these as design hypotheses and critique lenses, not universal laws that override research.[^14]
- **[NN/g UX Articles](https://www.nngroup.com/articles/):** Broad research-backed guidance on usability, interaction design, testing, journeys, forms, navigation, and content.[^15]
- **[Baymard Research Articles](https://baymard.com/research-articles):** Evidence-heavy ecommerce guidance covering navigation, search, product lists, product pages, checkout, accounts, mobile, accessibility, B2B, and subscription experiences.[^16]
- **[Baymard Methodology](https://baymard.com/research/methodology):** Use this to teach ShipRight what stronger UX evidence looks like: moderated think-aloud testing, benchmarking, eye tracking, quantitative studies, and documented implementation examples.[^17]

Baymard should be treated as a specialist ecommerce evidence source, not generalized blindly to every SaaS or mobile product. Its public articles can be linked and summarized; premium findings, screenshots, and databases should not be scraped or placed into a training corpus without permission.

## Journeys and architecture

### Information architecture

- **[Information Architecture Institute — What Is IA?](http://archive.iainstitute.org/en/learn/resources/what_is_ia.php):** Defines IA around organizing, structuring, and labeling information for usability and findability. Use it to ground taxonomy, navigation, and labeling decisions.[^18]
- **[IA Institute Resources](http://archive.iainstitute.org/en/learn/resources/resources.php):** An archive of IA glossaries, tools, templates, and annotated resources. Useful for building ShipRight’s IA vocabulary and artifact templates.[^19]
- **[NN/g Research Methods Guide](https://www.nngroup.com/articles/guide-ux-research-methods/):** Connect card sorting and tree testing to IA validation instead of allowing the model to invent navigation from intuition alone.[^20]

### Journey design

- **[NN/g Journey Map Template](https://media.nngroup.com/media/articles/attachments/NNg_Customer_Journey_Mapping_Template.xlsx):** A concrete structure for stages, actions, thoughts, emotions, pain points, and opportunities. Convert its structure into a ShipRight template while respecting source terms.[^21]
- **[Page Flows](https://pageflows.com/user-flow/):** Real recordings and screenshots of onboarding, purchasing, booking, browsing, messaging, and other flows. Use for pattern comparison and sequence analysis, not for cloning.[^22]
- **[Mobbin](https://mobbin.com/index.md):** Searchable real-product screens, flow sequences, patterns, website sections, and mobile/web references. Its MCP support makes it especially relevant for grounding compatible AI tools in shipped interfaces.[^23]

### Required IA outputs

Every applicable ShipRight project should produce:

- Content/object inventory.
- User roles and permission model.
- Primary objects and relationships.
- Taxonomy and naming rationale.
- Global, local, contextual, and utility navigation.
- Search, filter, sort, and browse behavior.
- Sitemap or route map.
- Card-sorting or tree-testing plan where findability risk is high.
- IA edge cases: empty categories, permission loss, deleted objects, duplicate names, deep links, and stale URLs.

## Content design sources

- **[GOV.UK — Understand Content Design](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/):** Starts content with user needs and emphasizes clarity, plain English, appropriate format, accessibility, and maintenance.[^24]
- **[GOV.UK — Writing Standards](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/):** Guidance for user needs, content planning, taxonomy, style, tone, accessibility, and evidence.[^25]
- **[GOV.UK Content and Publishing Guidance](https://guidance.publishing.service.gov.uk/):** A larger structured library covering style, content types, publishing, and maintenance; its content is identified as available under the Open Government Licence unless stated otherwise.[^26]
- **[Atlassian Content Design](https://atlassian.design/get-started/content-design):** UI content standards, voice and tone, and product-interface copy guidance.[^27]

ShipRight’s implementation prompts should include actual interface copy or copy requirements. Placeholder labels such as “Lorem ipsum,” “Click here,” and generic “Something went wrong” messages should fail evaluation unless the task explicitly requests a wireframe.

## Accessibility sources

### Standards

- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/):** The normative baseline for accessible web content. ShipRight should default to WCAG 2.2 AA unless a project specifies another target.[^28]
- **[Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/):** Human-readable explanations of success criteria. Use for reasoning and acceptance criteria, while recognizing that these explanations are informative rather than normative.[^29]
- **[WCAG 2.2 Techniques](https://www.w3.org/WAI/WCAG22/Techniques/):** Implementation techniques and testing guidance to connect design requirements to code-level checks.[^30]
- **[ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/):** Accessible component patterns with semantics, states, keyboard behavior, and working examples.[^31]
- **[ARIA Practices](https://www.w3.org/WAI/ARIA/apg/practices/):** Focused guidance for landmarks, accessible names, keyboard interfaces, grids, tables, range widgets, and structural roles.[^32]

### Motion and input

- **[web.dev — Animation and Motion](https://web.dev/learn/accessibility/motion):** Guidance for pausing or removing nonessential motion and respecting `prefers-reduced-motion`.[^33]
- **[MDN — Accessibility Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility):** Practical reduced-motion behavior and the risks of blinking, flashing, and large movement.[^34]
- **[MDN — PWA Best Practices](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Best_practices):** Cross-device responsiveness, keyboard/mouse/touch support, semantic HTML, and progressive enhancement.[^35]

### Accessibility contract

Every generated coding prompt should specify:

- Semantic element and landmark expectations.
- Heading hierarchy.
- Accessible name and description rules.
- Keyboard sequence and focus management.
- Visible focus states.
- Screen-reader announcements for dynamic changes.
- Error identification, recovery, and inline guidance.
- Contrast and non-color indicators.
- Target size and pointer alternatives.
- Zoom, text resize, and reflow behavior.
- Reduced-motion alternative.
- Captions, transcripts, and media controls when relevant.
- Automated and manual testing steps.

## Design systems

### Best system references

| Source | Best use in ShipRight |
|---|---|
| **[Material Design 3](https://m3.material.io/)** | Broad component anatomy, states, adaptive UI, typography, color roles, and reference/system/component token layering.[^36][^37] |
| **[Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)** | Platform-native behavior, interaction conventions, privacy, accessibility, and Apple ecosystem patterns.[^38][^12] |
| **[GOV.UK Design System](https://design-system.service.gov.uk/)** | Research-informed public-service patterns, accessible forms, navigation, task completion, and plain-language content.[^39] |
| **[Atlassian Design System](https://atlassian.design/design-system)** | Mature SaaS foundations, tokens, components, content standards, tooling, and AI interface guidance.[^40] |
| **[IBM Carbon](https://www.carbondesignsystem.com/)** | Enterprise products, dense data, code-aligned components, accessibility, AI agents, and scalable product ecosystems.[^41][^42] |
| **[Microsoft Fluent 2](https://fluent2.microsoft.design/)** | Cross-platform web/iOS/Android systems, code-aligned UI kits, Copilot patterns, global and alias tokens.[^43][^44] |
| **[Adobe Spectrum 2](https://spectrum.adobe.com/getting-started/introduction)** | Creative/professional tools, adaptive density, expressive yet cohesive systems, cross-platform foundations and states.[^45] |

Use these systems to teach anatomy, rules, states, documentation, and design-to-code alignment. Do not force every product to visually resemble Material, Apple, or Carbon.

### Token standards

- **[Design Tokens Community Group](https://www.designtokens.org/):** The central vendor-neutral source for exchanging design tokens across tools and platforms. Its first stable format is 2025.10.[^46]
- **[DTCG Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/):** Technical JSON format for exchanging design tokens; it is a Community Group report rather than a W3C Standard.[^47]
- **[Material Design Tokens](https://m3.material.io/foundations/design-tokens):** Clear explanation of reference, system, and component token classes and why hardcoded values should be avoided.[^48]
- **[Material Typography Tokens](https://m3.material.io/styles/typography/type-scale-tokens):** A model for consistent type scales, role-based names, and property-level customization.[^49]

### Token model

ShipRight should generate tokens in layers:

1. **Primitive/reference:** Raw palettes, font families, type sizes, spacing values, radii, shadows, opacity, duration, and easing.
2. **Semantic:** `color.text.primary`, `color.surface.raised`, `color.border.focus`, `space.section`, `motion.duration.fast`.
3. **Component:** `button.primary.background.default`, `input.border.error`, `dialog.padding.inline`.
4. **Theme/mode:** Light, dark, high contrast, brand themes, density modes, or product areas.
5. **Platform mapping:** CSS variables, Tailwind theme, React tokens, iOS/Android equivalents when required.

The prompts must ban arbitrary values when an existing semantic token applies. They should require default, hover, focus, active, selected, disabled, loading, error, success, and read-only states where relevant.

## UI pattern libraries

### Product screens and flows

- **[Mobbin Explore](https://mobbin.com/explore/mobile/ui-elements):** Real mobile UI elements and patterns including fields, controls, navigation, dialogs, sheets, toasts, progress, and loading states.[^50]
- **[Mobbin Web Elements](https://mobbin.com/explore/web/ui-elements):** Web-product controls, forms, navigation, file upload, pagination, tables, and other patterns.[^51]
- **[Page Flows](https://pageflows.com/user-flow/):** Full flow recordings that reveal sequence, transitions, decision points, and microinteractions—not just static beauty.[^22]
- **[Refero](https://doc.refero.design/):** Structured styles, real product screens, patterns, and flows designed for both humans and AI grounding.[^52]
- **[Refero Dashboard Examples](https://styles.refero.design/examples/dashboard-ui-design):** Useful for comparing calm analytics, dense workspaces, and operational dashboards while keeping data hierarchy and state requirements explicit.[^53]
- **[Baymard UX Examples](https://baymard.com/):** Research-linked ecommerce patterns, benchmarks, and annotated examples. Use when conversion flows and commerce behavior matter.[^54]

### Marketing and website galleries

- **[Land-book](https://land-book.com/):** Curated modern websites with strong category coverage; useful for landing pages, portfolios, SaaS, ecommerce, typography, and section-level reference gathering.[^55]
- **[Land-book Landing Pages](https://land-book.com/design/landing-page):** Focused landing-page examples for hero structure, product storytelling, social proof, pricing, and conversion paths.[^56]
- **[Godly](https://godly.design/websites/):** Current agency, portfolio, ecommerce, SaaS, AI, and experimental web design references.[^57]
- **[Awwwards Collections](http://www.awwwards.com:8080/collections/):** Curated examples of forms, transitions, footers, UX/UI, and creative interactions.[^58]

These libraries teach visual vocabulary and common solutions. They are not proof that a pattern is usable, accessible, performant, or appropriate for the current audience. ShipRight should always attach a reason to a reference: **what to borrow, why it fits, what not to copy, and what evidence still needs validation**.

## Three.js and immersive UI

### Technical sources

- **[Three.js Manual](https://threejs.org/manual/):** Primary learning source for scenes, cameras, lighting, models, textures, optimization, interaction, post-processing, responsive canvases, and resource cleanup.[^59]
- **[Three.js Fundamentals](https://threejs.org/manual/pages/fundamentals.html):** The core scene-camera-renderer-material-mesh model and animation loop.[^60]
- **[Three.js Official Examples](https://threejs.org/examples/):** Maintained implementation examples that track current Three.js behavior.[^61]
- **[Three.js Documentation](https://threejs.org/docs/):** API-level implementation reference.[^62]
- **[React Three Fiber](https://r3f.docs.pmnd.rs/next/getting-started/introduction):** Declarative React renderer for Three.js and reusable interactive scene components. Confirm stable-version documentation before production use because the displayed “next” documentation can describe alpha APIs.[^63]
- **[MDN Three.js Demo](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_Three.js):** Browser-focused fundamentals and a current example using `WebGPURenderer`.[^64]
- **[Awwwards Three.js Collection](https://www.awwwards.com/awwwards/collections/three-js/):** Visual reference for animated 3D and WebGL experiences.[^65]

### Trends to teach carefully

Useful current directions include scroll-linked storytelling, spatial product showcases, shader-driven transitions, particles, interactive typography, depth-responsive cards, model viewers, WebGPU experiments, and hybrid DOM/3D layouts. These are **creative options**, not default UX requirements.

ShipRight should reject decorative 3D when it obstructs task completion, hides navigation, causes motion discomfort, damages performance, or lacks a usable fallback. Every 3D prompt should define loading strategy, mobile degradation, input alternatives, reduced-motion behavior, fallback content, asset budgets, frame-rate targets, canvas semantics, and whether the canvas is decorative or interactive.

## Performance sources

- **[Core Web Vitals](https://web.dev/explore/learn-core-web-vitals):** Primary entry point for loading, responsiveness, and visual-stability metrics.[^66]
- **[Web Vitals](https://web.dev/articles/vitals):** Current “good” thresholds are LCP within 2.5 seconds, INP at 200 milliseconds or less, and CLS at 0.1 or less, assessed at the 75th percentile.[^67]
- **[Measuring Web Vitals](https://web.dev/articles/vitals-measurement-getting-started):** Field monitoring, Chrome DevTools, Lighthouse, WebPageTest, and the `web-vitals` library.[^68]

Performance requirements belong inside UX acceptance criteria, especially for dashboards, AI streaming interfaces, media-heavy pages, and 3D experiences. ShipRight should make coding tools reserve layout dimensions, progressively load heavy assets, avoid blocking primary actions, and measure real-user performance.

## Source policy

### Four ingestion levels

| Level | Allowed use | Examples |
|---|---|---|
| A — Open and explicitly reusable | Store permitted text, transform into atomic rules, preserve attribution and license metadata | Open-licensed government material; open specifications, subject to their exact terms |
| B — Public authoritative reference | Store URL, original summary, small factual extracts where permitted, and rule metadata | W3C guidance, official platform guidelines, official design-system documentation |
| C — Commercial or account-gated | Store URL, tags, personal notes, and derived principles only if terms allow; do not bulk copy | Mobbin, Page Flows, Baymard Premium, paid reports |
| D — Visual inspiration | Store URL, descriptive analysis, and transferable principles; never train toward pixel-level copying | Awwwards, Godly, Land-book, captured production screens |

Copyright status and website terms must be checked source by source. Do not assume that public access grants permission for scraping, redistribution, model training, or commercial reuse. Keep `license`, `terms_checked_at`, `permitted_uses`, `attribution`, and `source_owner` fields in every record.

## Knowledge record schema

Each extracted rule should be small, testable, attributable, and contextual—not a long article dump.

```json
{
  "id": "forms-error-001",
  "domain": "interaction-design",
  "topic": "form-errors",
  "rule": "Place actionable error guidance near the affected control and provide a programmatic relationship.",
  "why": "Users need to identify, understand, and recover from the error.",
  "applies_when": ["form submission", "inline validation"],
  "exceptions": [],
  "good_example": "Email address: Enter an address in the format name@example.com.",
  "bad_example": "Invalid input.",
  "verification": ["keyboard test", "screen-reader test", "error recovery test"],
  "source_url": "https://www.w3.org/TR/WCAG22/",
  "source_type": "standard",
  "evidence_strength": "high",
  "license": "verify-current-terms",
  "captured_at": "YYYY-MM-DD",
  "last_reviewed_at": "YYYY-MM-DD",
  "tags": ["accessibility", "forms", "errors", "wcag"]
}
```

Add fields for `platform`, `product_type`, `journey_stage`, `user_role`, `risk`, `maturity`, `visual_style`, `component`, `framework`, `contradicts`, and `supersedes` where needed.

## Skill folder structure

```text
shipright-skill/
├── SKILL.md
├── references/
│   ├── 00-principles.md
│   ├── 01-intake-and-framing.md
│   ├── 02-research-methods.md
│   ├── 03-synthesis-and-modeling.md
│   ├── 04-journeys-and-service-blueprints.md
│   ├── 05-information-architecture.md
│   ├── 06-user-flows-and-states.md
│   ├── 07-content-design.md
│   ├── 08-interaction-patterns.md
│   ├── 09-accessibility.md
│   ├── 10-visual-design.md
│   ├── 11-design-systems.md
│   ├── 12-design-tokens.md
│   ├── 13-responsive-and-adaptive.md
│   ├── 14-motion-and-microinteractions.md
│   ├── 15-threejs-and-immersive.md
│   ├── 16-performance.md
│   ├── 17-implementation-prompts.md
│   └── 18-validation-and-qa.md
├── templates/
│   ├── product-brief.md
│   ├── assumptions-register.md
│   ├── research-plan.md
│   ├── journey-map.md
│   ├── service-blueprint.md
│   ├── sitemap.md
│   ├── user-flow.md
│   ├── screen-state-matrix.md
│   ├── design-system-spec.md
│   ├── tokens.dtcg.json
│   ├── component-contract.md
│   ├── coding-agent-prompt.md
│   └── ux-qa-checklist.md
├── examples/
│   ├── saas-dashboard/
│   ├── marketing-site/
│   ├── mobile-app/
│   ├── ecommerce/
│   ├── ai-product/
│   ├── enterprise-admin/
│   └── immersive-web/
├── scripts/
│   ├── validate-tokens.*
│   ├── validate-output-package.*
│   ├── contrast-audit.*
│   └── build-prompt-pack.*
└── evals/
    ├── trigger-cases.json
    ├── output-cases.json
    ├── graders.md
    └── regression-cases.json
```

A focused skill is more reliable than an “everything about design” file. Anthropic recommends starting with evaluations, splitting unwieldy content into separate resources, and iterating based on observed agent behavior. Microsoft similarly warns that overly broad skills and very long skill files weaken context efficiency.[^69][^1]

## ShipRight output contract

Every completed design job should end with a **coding-agent implementation pack**, not one giant vague prompt.

### Pack structure

1. **Project truth:** Confirmed facts, assumptions, open questions, exclusions, and success metrics.
2. **Experience strategy:** Audience, jobs, problem, value, behavioral principles, and prioritized user outcomes.
3. **Architecture:** Sitemap/routes, object model, navigation, permissions, and primary flows.
4. **Screen-state matrix:** Every screen, purpose, primary action, content, components, variants, loading, empty, error, success, permission, and edge states.
5. **Visual system:** Visual direction, references with rationale, typography, color roles, density, grid, responsive logic, icon and imagery rules.
6. **Design tokens:** DTCG-compatible source plus target framework mapping.
7. **Component contracts:** Anatomy, variants, states, behavior, accessibility, responsive rules, content constraints, and reuse rules.
8. **Build sequence:** Foundation first, then shell/navigation, components, feature flows, states, polish, and QA.
9. **Agent prompts:** Small ordered prompts with inputs, files to inspect, files to change, constraints, acceptance criteria, and stop conditions.
10. **Validation:** Accessibility, responsiveness, performance, visual regression, content, interaction, and usability checks.

### Prompt anatomy

```text
ROLE
Act as a senior product engineer implementing an approved UX specification.

OBJECTIVE
Implement [specific feature/screen/flow].

CONTEXT TO READ
- [existing files]
- [token file]
- [component contracts]
- [route/flow specification]

USER OUTCOME
[What the user must accomplish and why it matters.]

IMPLEMENTATION REQUIREMENTS
[Ordered, testable requirements.]

DESIGN SYSTEM RULES
[Tokens, components, spacing, typography, states, reuse constraints.]

ACCESSIBILITY CONTRACT
[Semantics, keyboard, focus, names, announcements, contrast, motion.]

RESPONSIVE BEHAVIOR
[Breakpoints described by behavior, not only device labels.]

STATES AND EDGE CASES
[Loading, empty, error, success, permission, timeout, offline, partial data.]

DO NOT
[No hardcoded colors, no new component when one exists, no invented copy, etc.]

ACCEPTANCE CRITERIA
[Observable criteria and tests.]

STOP CONDITION
Do not continue to the next feature. Report changed files, decisions, and test results.
```

This sequential format fits ShipRight’s purpose better than asking a coding model to “build a beautiful modern dashboard.” It also supports the preferred one-step-at-a-time build workflow.

## Evaluation system

### Scorecard

| Dimension | Weight | Failure examples |
|---|---:|---|
| Problem framing and assumptions | 10 | Solves the request literally without checking the actual user problem |
| Research appropriateness | 10 | Invented evidence; wrong method; interview claims treated as behavior |
| IA, journey, and flow quality | 15 | Missing alternate paths, permissions, recovery, or route logic |
| Accessibility | 15 | No keyboard/focus plan; color-only state; inaccessible custom widget |
| Design-system consistency | 15 | Hardcoded values; duplicate components; incomplete states |
| Visual craft and hierarchy | 10 | Generic card wall; weak type hierarchy; decorative noise |
| Responsive behavior and states | 10 | Desktop-only; missing loading, empty, error, and success states |
| Coding-prompt actionability | 10 | Vague instructions; no files, acceptance criteria, or stop condition |
| Evidence and uncertainty | 5 | Unsupported certainty; no source, confidence, or validation plan |

Set a hard floor: any serious accessibility, fabricated-research, destructive-action, privacy, or data-loss failure makes the result unshippable regardless of its visual score.

### Minimum evaluation cases

1. New B2B SaaS analytics dashboard with multiple roles.
2. AI video-generation workflow with long-running jobs and failures.
3. Mobile finance onboarding with identity verification.
4. Ecommerce product discovery and checkout.
5. Healthcare appointment flow with privacy-sensitive information.
6. Enterprise data table with bulk actions, filters, and permissions.
7. Marketing site requiring brand differentiation and conversion.
8. Three.js product showcase with mobile and reduced-motion fallbacks.
9. Existing app redesign with user complaints and analytics.
10. Ambiguous “make it modern” request with no research.
11. Accessibility remediation of a custom combobox/dialog workflow.
12. Multi-step coding-agent handoff using an existing codebase and design system.

For each case, store the prompt, context fixtures, expected artifacts, must-pass assertions, forbidden behaviors, reference output, and grader notes. Run baseline-without-skill versus with-skill comparisons, then keep every discovered failure as a regression case.

## Training approach

### Phase 1 — Retrieval and rules

- Build 300–500 atomic, licensed or safely summarized rules across the capability map.
- Add source, date, confidence, scope, exceptions, examples, and tests to every rule.
- Create the modular reference structure and prompt templates.
- Establish 12–20 representative evaluation tasks before expanding the library.

### Phase 2 — Demonstrations

- Produce expert-reviewed end-to-end examples for each major product category.
- Include intermediate artifacts and the final prompt pack.
- Pair strong examples with flawed examples and explicit critique.
- Record why decisions changed after research, testing, or accessibility review.

### Phase 3 — Behavior tuning

- Collect real ShipRight runs and label failure modes.
- Fine-tune only stable behaviors: asking the right questions, exposing assumptions, selecting methods, covering states, applying tokens, critiquing weak UI, and writing executable prompts.
- Keep changing standards, visual references, libraries, and current trends in retrieval rather than model weights.

### Phase 4 — Continuous evaluation

- Run regression tests on every skill change.
- Track scores by product type and workflow stage.
- Add adversarial cases: conflicting constraints, missing evidence, inaccessible brand colors, deadline pressure, legacy code, and stakeholder requests that harm usability.
- Require human review for legal, healthcare, finance, safety-critical, and high-impact accessibility decisions.

## Priority order

1. Skill architecture and output contract.
2. Evaluation suite.
3. Accessibility and interaction-state rules.
4. Research-method selection and evidence handling.
5. IA, journeys, flows, and screen-state matrices.
6. Design systems and DTCG-compatible tokens.
7. Coding-agent prompt templates.
8. Real-product examples and visual-reference analysis.
9. Three.js and advanced motion as an optional specialist module.
10. Fine-tuning after enough reviewed examples exist.

The public repository could not be confidently identified from its name alone, so this blueprint does not yet audit the current `SKILL.md`, file structure, triggers, prompts, or examples. The next highest-value step is a repository-level gap analysis against this architecture rather than gathering hundreds more unstructured links.

---

## References

1. [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) - Discover how Anthropic builds AI agents with practical capabilities through modular skills, enabling...

2. [Specification and documentation for Agent Skills - GitHub](https://github.com/agentskills/agentskills) - Specification and documentation for Agent Skills. Contribute to agentskills/agentskills development ...

3. [Fine-tuning - OpenAI API](https://platform.openai.com/docs/guides/fine-tuning/when-should-i-use-fine-tuning-vs-embeddings-with-retrieval) - Learn how to fine-tune models to get better results and lower latency with the OpenAI API.

4. [What are skills? | Claude Help Center](https://support.claude.com/en/articles/12512176-what-are-skills)

5. [code.visualstudio.com › agent-skillsVisual Studio Code](https://code.visualstudio.com/docs/agent-customization/agent-skills.md)

6. [When to Use Which User-Experience Research Methods](https://www.nngroup.com/articles/which-ux-research-methods/) - 20 user-research methods: where they fit in the design process, whether they are attitudinal or beha...

7. [UX Research Cheat Sheet](https://www.nngroup.com/articles/ux-research-cheat-sheet/) - User research can be done at any point in the design cycle. This list of methods and activities can ...

8. [UX Research Methods: Glossary](https://www.nngroup.com/articles/research-methods-glossary/) - Use this glossary to quickly clarify key terms and concepts related to research methods in UX.

9. [Research Methods Research Reports](https://www.nngroup.com/reports/topic/research-methods/) - Research Methods research reports by Nielsen Norman Group containing usability guidelines, UX best p...

10. [Tools](https://www.ideo.org/tools) - Design Kit is our online learning platform with practical tips on applying human-centered design in ...

11. [Design Thinking Resources](https://designthinking.ideo.com/resources) - Design Toolkit by IDEO.org. From nonprofit design studio IDEO.org, a collection of mindsets, methods...

12. [Design principles | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/design-principles) - Explore fundamental principles that guide design across Apple platforms.

13. [Apple Developer](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/design-principles.md)

14. [Home | Laws of UX](https://lawsofux.com/) - Laws of UX is a collection of best practices that designers can consider when building user interfac...

15. [UX & Usability Articles from Nielsen Norman Group - NN/G](https://www.nngroup.com/articles/) - Research-based articles about user experience (UX), interaction design, web usability, user testing,...

16. [Ecommerce UX Research Articles – Baymard Institute](https://baymard.com/research-articles) - The below 450+ ecommerce UX articles are all based on Baymard’s 200,000+ hours of UX research. The a...

17. [Methodology](https://baymard.com/research/methodology) - Learn how Baymard conducts rigorous ecommerce UX research. Discover our proven methodology for testi...

18. [What is IA?](http://archive.iainstitute.org/en/learn/resources/what_is_ia.php)

19. [Resources - Information Architecture Institute](http://archive.iainstitute.org/en/learn/resources/resources.php)

20. [www.nngroup.com › articles › guide-ux-research-methodsA Guide to Using User-Experience Research Methods - NN/G](https://www.nngroup.com/articles/guide-ux-research-methods/) - Modern day UX research methods answer a wide range of questions. To help you know when to use which ...

21. [NNg_Customer_Journey_Mapping_Template.xlsx](https://media.nngroup.com/media/articles/attachments/NNg_Customer_Journey_Mapping_Template.xlsx)

22. [User Flow Examples: 4000+ Real Recordings](https://pageflows.com/user-flow/) - Browse thousands of user flow examples from real products. Watch video recordings of onboarding, che...

23. [mobbin.com › indexmobbin.com](https://mobbin.com/index.md)

24. [guidance.publishing.service.gov.uk · writing-to-gov-ukUnderstand content design - GOV.UK content and publishing...](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/) - Learn the basics of designing content for GOV.UK.

25. [Writing to GOV.UK standards](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/) - You'll find guidance to help you plan content in line with good content design principles. This incl...

26. [Home - GOV.UK content and publishing guidance](https://guidance.publishing.service.gov.uk/) - Read the standards for digital content and find out how to use the government’s publishing tools.

27. [atlassian.design › get-started › content-designOverview - Content design - Atlassian Design](https://atlassian.design/get-started/content-design) - Learn about UI content standards, voice and tone principles, and design assets.

28. [www.w3.org · TR · WCAG22Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) - Web Content Accessibility Guidelines (WCAG) 2.2 covers a wide range of recommendations for making we...

29. [Understanding WCAG 2.2 | WAI - W3C](https://www.w3.org/WAI/WCAG22/Understanding/)

30. [All WCAG 2.2 Techniques | WAI | W3C](https://www.w3.org/WAI/WCAG22/Techniques/)

31. [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - Accessibility resources free online from the international standards organization: W3C Web Accessibi...

32. [Practices | APG | WAI](https://www.w3.org/WAI/ARIA/apg/practices/) - Accessibility resources free online from the international standards organization: W3C Web Accessibi...

33. [Animation and motion](https://web.dev/learn/accessibility/motion) - Support people with all types of movement-triggered disorders.

34. [Using media queries for accessibility - CSS - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility) - CSS media queries can be used to help users with disabilities better experience your website.

35. [Best practices for PWAs - Progressive web apps | MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Best_practices) - Progressive Web Apps (PWAs) can be installed on devices and used as traditional websites in web brow...

36. [Material Design](https://m3.material.io/m3/pages/design-tokens) - Design tokens are the building blocks of all UI elements. The same tokens are used in designs, tools...

37. [Cards – Material Design 3](https://m3.material.io/components/cards/specs) - Cards display content and actions about a single subject. Explore three types: elevated, filled and ...

38. [人机界面指南 | Apple Developer Documentation](https://developer.apple.com/cn/design/human-interface-guidelines/) - 《人机界面指南》包含可帮助你为任何 Apple 平台设计优秀使用体验的指南和最佳实践。

39. [Home – GOV.UK Design System](https://design-system.service.gov.uk/?languageid=1) - Design your service using GOV.UK styles, components and patterns

40. [Design System - Atlassian Design](https://atlassian.design/design-system) - Design and build with our flexible design system. Explore foundations, components, tooling, and patt...

41. [Releases](https://www.carbondesignsystem.com/getting-started/about-carbon) - Explore Carbon, IBM’s open-source design system, a complete guide to its components, design principl...

42. [Overview | Carbon Design System](https://www.carbondesignsystem.com/getting-started/designing/overview) - Learn about Carbon Design System, including its design principles, tools, guidelines, and foundation...

43. [Start designing - Fluent 2 Design System - Microsoft Design](https://fluent2.microsoft.design/get-started/design) - Design beautiful and cohesive Microsoft experiences with Fluent 2 UI kits. Built in Figma, these kit...

44. [Develop - Fluent 2 Design System](https://fluent2.microsoft.design/get-started/develop) - Fluent 2 provides a seamless maker experience from design to development to delivery.

45. [Spectrum is Adobe's design system](https://spectrum.adobe.com/getting-started/introduction) - A shared foundation for creating experiences across every product and platform. It brings design and...

46. [Design Tokens Community Group](https://www.designtokens.org/) - The specification is developed by volunteer chairs, editors, and contributors representing design sy...

47. [Design Tokens Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/) - This document describes the technical specification for a file format to exchange design tokens betw...

48. [Design tokens – Material Design 3](https://m3.material.io/foundations/design-tokens) - Design tokens are the building blocks of all UI elements. The same tokens are used in designs, tools...

49. [Typography – Material Design 3](https://m3.material.io/styles/typography/type-scale-tokens) - Learn about Material Design typography. This guide covers everything from font styles and hierarchy ...

50. [Explore UI Elements - Mobile](https://mobbin.com/explore/mobile/ui-elements) - Discover 500,000+ mobile app UI & UX design ideas & examples from the world’s best apps on Mobbin.

51. [Explore UI Elements](https://mobbin.com/explore/web/ui-elements) - Discover 300,000+ web app UI & UX design ideas & examples from the world’s best apps on Mobbin.

52. [doc.refero.designDesign research for humans and AI - Refero](https://doc.refero.design/)

53. [Dashboard UI Design Examples - Refero Styles](https://styles.refero.design/examples/dashboard-ui-design) - Explore 12 real website styles from analytics, workspaces, and operational tools to choose visual di...

54. [Baymard: Ecommerce UX Research & Best Practices](https://baymard.com/) - Solve real ecommerce UX challenges with 200000+ hours of research. Get clear answers for every decis...

55. [Landbook - website design inspiration gallery](https://land-book.com/) - Find the best hand-picked website design inspiration. We're a curated website design gallery for Cre...

56. [The best landing page website design inspiration](https://land-book.com/design/landing-page) - Find the best landing page inspiration. Browse through curated website design examples and get inspi...

57. [Godly Website Design Inspiration](https://godly.design/websites/) - Godly is a curation of the best web design inspiration every day. Browse the best agency websites, p...

58. [Collections](http://www.awwwards.com:8080/collections/) - Create collections of your favorite sites, external resources, articles etc., which you can share wi...

59. [three.js manual](https://threejs.org/manual/)

60. [Fundamentals - three.js manual](https://threejs.org/manual/pages/fundamentals.html)

61. [Useful Links - Three.js](https://threejs.org/manual/en/useful-links.html)

62. [three.js docs](https://threejs.org/docs/)

63. [Introduction - React Three Fiber](https://r3f.docs.pmnd.rs/next/getting-started/introduction) - React-three-fiber is a React renderer for three.js.

64. [Building up a basic demo with Three.js - Game development | MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/Building_up_a_basic_demo_with_Three.js) - A typical 3D scene in a game — even the simplest one — contains standard items like shapes located i...

65. [Three.js - Awwwards](https://www.awwwards.com/awwwards/collections/three-js/) - Three.js is a JavaScript library for creating animated 3D graphics. Three.js simplifies the WebGL AP...

66. [Core Web Vitals - web.dev](https://web.dev/explore/learn-core-web-vitals)

67. [Web Vitals | Articles | web.dev](https://web.dev/articles/vitals) - Essential metrics for a healthy site

68. [Getting started with measuring Web Vitals | Articles](https://web.dev/articles/vitals-measurement-getting-started) - Learn how to measure your site's Web Vitals in both real-world and lab environments.

69. [Adding Skills | Microsoft Learn](https://learn.microsoft.com/en-us/agent-framework/journey/adding-skills) - Understand why and when to package agent capabilities into skills, how skills differ from tools, and...

