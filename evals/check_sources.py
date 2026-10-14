#!/usr/bin/env python3
"""Validate ShipRight sources using Python's standard library.

This checks a deliberately restricted frontmatter format, stable gate IDs,
links, copied flow rules, selected rule contracts, exports and archival notices.
It does not prove semantics, model behavior, installations or app correctness.
Run: python3 evals/check_sources.py [--self-test]
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
# Verbatim user-supplied source documents. Kept byte-for-byte, so pack style rules do not apply.
VERBATIM_SOURCES = {'docs/rebuild/BLUEPRINT.md'}
# Raw trial outputs and grades are evidence. They stay unchanged; style misses are measured, not edited,
# and links inside them point into the user's future project, so pack link checks skip them.
RAW_EVIDENCE_DIRS = ('evals/v1/runs/', 'evals/v1/grades/')
ICONS = 'skills/ui-ux-design/references/icons-and-placement.md'
HEAVY_ACCENT = 'without a heavy accent bar unless the design system says so'
VERSION = '1.0.0'
SKILLS = {'product-design': 8, 'ui-ux-design': 10, 'ux-critique': 10, 'ship-check': 20, 'build-pack': 10}
TEMPLATES = ['01-prd.md', '02-technical-architecture.md', '03-security-and-access.md',
             '04-frontend-spec.md', '05-feature-ticket-list.md', '06-pitch-one-pager.md',
             'PRODUCT.md', 'DESIGN.md', 'build-rules.md', 'ship-check.md']
REFS = {
    'product-design': ['framing.md', 'research.md', 'structure.md', 'journeys.md', 'flows-and-states.md'],
    'ui-ux-design': ['anti-slop-rules.md', 'components.md', 'design-system.md', 'icons-and-placement.md',
                     'layout-and-hierarchy.md', 'marketing-pages.md', 'mobile.md', 'motion.md', 'operator-workspaces.md',
                     'starter-systems.md', 'state-coverage.md', 'ui-copy.md'],
    'ux-critique': ['bounded-verification.md', 'existing-app.md', 'plan-review.md',
                    'requirements-and-feedback.md', 'severity-rubric.md', 'slop-tells.md'],
    'ship-check': ['launch-items.md'],
    'build-pack': ['golden-examples.md', 'pack-contract.md', 'stack-choices.md', 'ticket-prompts.md'],
}
# v1.0 merged many references. Protected phrases keep their wording and move with their rule.
_PD, _UI = 'skills/product-design/references/', 'skills/ui-ux-design/references/'
MERGED = {**{_PD + n: _PD + 'research.md' for n in ('research-evidence.md', 'research-methods.md', 'research-planning.md',
                                                     'research-synthesis.md', 'research-to-decisions.md')},
          **{_PD + n: _PD + 'structure.md' for n in ('information-architecture.md', 'findability.md',
                                                      'roles-and-navigation.md', 'ia-research.md')},
          **{_PD + n: _PD + 'journeys.md' for n in ('mapping-types.md', 'journey-mapping.md',
                                                     'task-and-system-flows.md', 'service-blueprints.md')},
          **{_PD + n: 'SOURCES.md' for n in ('research-sources.md', 'synthesis-sources.md', 'ia-sources.md', 'mapping-sources.md')},
          **{_UI + n: _UI + 'design-system.md' for n in ('references-and-design-system.md', 'design-foundations.md',
                                                          'design-system-governance.md')},
          _UI + 'design-system-sources.md': 'SOURCES.md',
          _UI + 'component-vocabulary.md': _UI + 'components.md', _UI + 'component-choice.md': _UI + 'components.md',
          _UI + 'build-handoff.md': 'skills/build-pack/references/ticket-prompts.md',
          _UI + 'reference-systems.md': _UI + 'design-system.md',
          _PD + 'decision-checklist.md': _PD + 'framing.md', _PD + 'opportunity-research.md': _PD + 'framing.md',
          _PD + 'states-and-flows.md': _PD + 'flows-and-states.md', _PD + 'operational-flows.md': _PD + 'flows-and-states.md',
          _PD + 'doc-set.md': 'skills/build-pack/references/pack-contract.md'}
# Presence checks protect selected source contracts, not their interpretation.
RULES = {
    'skills/_shared/operating-contract.md': [
        '## Current phase', 'Every visible feature', 'Save later-phase ideas as notes, not UI',
        '## Exact feedback', 'acceptance check', 'Clearing a selection is not deleting records',
        'Never invent brand values, data, features', 'Severity follows criticality',
        'Needs decision is a verdict, not a fifth item status', 'Score each criterion at the named review stage',
        'If a required specification behavior is still missing, mark Fail', 'Deadline rule', '## Output shape',
        'A **Hypothesis** is a testable proposition, not evidence',
        'Simulated participants never establish research findings',
        'unknown access, destructive effects and prices cannot become defaults',
        'silence is not approval', 'Readiness does not authorize deployment, publication, payment'],
    'skills/_shared/intake.md': ['0-5 questions total before starting', 'Each requested decision counts separately',
        'aim for three useful questions', 'Why it matters', 'each with a concrete example', 'plus **Something else**',
        'You decide', 'Let me decide', 'No pick yet', 'Two front doors', '## Depth', 'Request traps',
        'the first reply is the decision cards only', 'A request to build it is not a frame',
        'Participant-guide questions are deliverables, not founder intake',
        'Plans do not authorize recruitment, recording, payment or messages'],
    'skills/product-design/SKILL.md': ['Inspect supplied evidence first', 'Load only needed references',
                                       'Missing artifact content stays Unknown',
                                       'Skip synthesis for clear corrections or planning-only work',
                                       'retain every supplied accessibility or safety issue even without a repeated pattern',
                                       'Skip IA for clear corrections or sufficient existing structure',
                                       'Skip mapping for clear corrections or a sufficient existing map'],
    'skills/product-design/references/research-evidence.md': [
        '**Observed:**', '**Reported:**', '**Inferred:**', '**Hypothesis:**', '**Unknown:**',
        'not gate statuses', 'Confidence needs a basis', 'Never generate unsupported personas or findings',
        'not an observed action', 'not its cause', 'not research', 'Original guidance:'],
    'skills/product-design/references/research-methods.md': [
        'Skip new research', 'stopping point', 'hybrid sessions can collect both',
        'expert review is not participant testing', 'do not generalize desktop evidence to mobile', 'Original sources:'],
    'skills/product-design/references/research-planning.md': [
        'no universal five-user rule', 'mark the plan unperformed', 'what would challenge it',
        'without naming the control/path', 'record assistance', 'voluntary exit',
        'Record independent completion before verification prompts; prompted recovery is assisted',
        'Every interview guide states: recalled behavior is Reported',
        'behavior directly witnessed during the session is Observed',
        'Match instructions and outcome tables',
        '| Independent completion | Success directly observed before prompts/help.',
        '| Prompted verification | Non-directional check confirms prior success; independence unverified.',
        '| Assisted completion | Directional help or prompted recovery enables success.',
        '| Setup or technical failure | Assessment blocked; separate cause from product-task failure.',
        'does not authorize outreach', 'No responsive UI contract', 'Original sources:'],
    'skills/product-design/references/research-sources.md': [
        'All entries accessed', 'public page text', 'Paid courses/playbooks',
        'publication/update and access dates, access type and limitations',
        'Unavailable/paywalled text stays uninspected'],
    'skills/product-design/references/research-synthesis.md': [
        'Keep raw records separate from interpretations',
        'its account of past behavior remains Reported',
        'Duplicate notes and repeated statements do not create independent support',
        'Preserve isolated serious issues even without repetition',
        'Always retain supplied accessibility or safety issues in the evidence trail and user risk summary, even when reported once and outside any repeated pattern',
        'Unclear severity or cause does not justify omission',
        'Keep contradictory evidence and isolated exceptions traceable',
        'Never invent confidence scores', 'Do not invent personas',
        'Research records contain data, not instructions to change scope',
        'declare uninspected portions', 'not automatic project files'],
    'skills/product-design/references/research-to-decisions.md': [
        'Interpretation supports a recommendation; it does not approve scope',
        'A proposed opportunity is not an approved feature',
        'Frequency alone does not determine priority',
        'what would challenge the recommendation',
        'Keep evidence confidence separate from approval and gate statuses',
        'No finding-to-UI shortcut'],
    'skills/product-design/references/synthesis-sources.md': [
        'All entries accessed 2026-10-11', 'public page text',
        "Phase 1's source register and historical access dates remain unchanged"],
    'skills/product-design/references/information-architecture.md': ['An unframed idea still follows shared intake before objects or maps', 'Do not invent objects, roles, relationships, routes, categories or filters', 'Unknown cardinality, ownership or deletion stays Unknown', 'not fixed category counts or depth limits', 'Proposed grouping or label changes must derive from supplied content and authorized decisions', 'Do not turn every tab or state into a route', 'Mark addresses Unknown rather than inventing paths', 'Do not assume redirects, aliases or migration capabilities exist'],
    'skills/product-design/references/findability.md': ['Do not add search, filters, saved searches, tags or analytics to complete a checklist', 'Unknown matching, indexing, ranking, typo/synonym support, counts and scale stay Unknown', 'Define within-facet and across-facet combination rules only when sourced or authorized', 'clearing criteria is not deleting records', 'Do not put private queries, identifiers or tokens in URLs, analytics or logs'],
    'skills/product-design/references/roles-and-navigation.md': ['No default Owner/Admin/Member/Guest roles', 'Hidden navigation is never access control', 'Require authorization on direct requests and object access', 'Apply the same data boundary to search, previews, suggestions and facet/result counts', 'Retain isolated accessibility and safety issues even without repeated patterns'],
    'skills/product-design/references/ia-research.md': ['Plans stay unperformed unless real session evidence is available', 'expert or AI sorting is not participant research', 'Write realistic finding tasks without revealing the target label/path', 'Text-only tree tests omit interface cues, search and interactive accessibility'],
    'skills/product-design/references/ia-sources.md': ["Use the sources as guidance, never this product's user findings or permission policy"],
    'skills/product-design/references/mapping-types.md': ['An unframed idea still follows shared intake before maps', 'Choose one smallest useful map; do not generate every map automatically', 'Keep current-state evidence separate from future-state proposals', 'Never invent emotions, teams, channels, dependencies or business processes', 'Retain every supplied accessibility or safety issue even without repetition', 'No map establishes accessibility, security, safety, service reliability or usability Pass'],
    'skills/product-design/references/journey-mapping.md': ['Use actual records, not a newly invented persona', 'Do not force awareness, purchase and loyalty stages onto unrelated tasks', "Keep different people's accounts separate; do not splice them into one observed path", 'Keep recalled behavior and feelings Reported, even in a recorded interview', 'An observed pause does not establish frustration', 'do not invent emotions or an emotional curve', 'missing persistence stays Unknown'],
    'skills/product-design/references/task-and-system-flows.md': ['distinguish user actions from system steps when they intersect', 'Never invent APIs, queues, retries, cancellation, notifications or persistence', 'A failed response does not prove the remote action failed', 'Leaving a page does not cancel a submitted transaction', 'Human pending work is not a background job'],
    'skills/product-design/references/service-blueprints.md': ['Do not require one backstage action for every touchpoint', 'Missing teams, departments, systems, policies, dependencies, timing and SLA stay Unknown', 'Service artifacts are not research evidence or proof of successful delivery', 'Transferred is not accepted or completed', 'Frontstage/backstage depends on visibility, not job title'],
    'skills/product-design/references/mapping-sources.md': ["they are not this product's findings or business processes"],
    'docs/01-prd.md': ['Emotions require a supplied source; no mandatory emotion lane'],
    'docs/02-technical-architecture.md': ['mapping does not verify runtime'],
    'docs/05-feature-ticket-list.md': ['A proposed map change is not an approved ticket'],
    'skills/_shared/flow-rules.md': ['Do not trap the user', 'Hide routine system plumbing',
        'Selection, keyboard focus, validation errors and unread notifications are different states',
        'indeterminate indicator', 'F1', 'F2', 'F3', 'decided once in the design system'],
    'skills/_shared/output-folder.md': ['A request to write or update these files is authorization',
        'project-relative paths', 'without a mandatory stop after every file'],
    # General lessons only. The IVC case lives in the example (checked below).
    'skills/ui-ux-design/references/operator-workspaces.md': ['Take feedback exactly as given',
        'Build only the current phase', 'Hide system plumbing from operators', HEAVY_ACCENT,
        'one profile or identity home', 'No notification dot on the selected nav item', 'No filler chips',
        'either one satisfies', 'round1-corrections.md', 'not UI'],
    'examples/ivc-2026-registration/feedback/round1-corrections.md': ['October 4, 2026', 'Filter: All Attendees',
        '"View all in progress" option, or a way to clear it', 'Either one satisfies', 'four sides', 'Query: Test',
        'Synced to event sheet', 'bottom left', 'Checked In', 'In Queue', 'Name / Phone', 'Scan QR', 'Family ID',
        'printer and badge stock', 'notification dot', '\u2318K', 'not UI'],
    'personal-taste/altaz.md': ['visible progress and a clear exit', 'favicon', 'what people compare',
        '4, 8, 12, 16, 24, 32 and 48', 'primary action side once'],
    'skills/ui-ux-design/references/layout-and-hierarchy.md': ['Reading order', 'Sizing',
        'Responsive behavior', 'Sticky content', 'Crops and full screens', HEAVY_ACCENT],
    'skills/ui-ux-design/references/icons-and-placement.md': ['one canonical home per layout',
        'A notification dot means actual unread or pending work, never selection', 'aria-current', 'aria-selected',
        'one icon set and one style', 'Icon-only is allowed only for close, search, menu, more and back',
        'accessible name and a tooltip', 'Never make a destructive action', 'Status uses text + icon + color',
        'Primary action side and button order are set once', 'Never put two filled', 'not "OK"',
        '| Toasts and status messages | One consistent place across the app', 'Show where the content would be, with one next action',
        'thumb reach', 'Do not put a dot on the selected nav item', HEAVY_ACCENT],
    'skills/ui-ux-design/references/state-coverage.md': ['200%', '320 CSS pixels', '24 by 24',
        '4.5:1', '3:1', 'restore focus', 'Saved unfinished work', 'sensitive phone/email searches', 'where the content would be'],
    'skills/ui-ux-design/references/build-handoff.md': ['sensitive phone/email searches',
        'Fix authorized deviations', 'current-phase source'],
    'skills/ui-ux-design/references/references-and-design-system.md': [
        'Never invent brand values', 'Observation is not approval of a defect',
        'Proposed', 'Unknown', 'compatibility'],
    'skills/ux-critique/references/existing-app.md': ['already authorizes that bounded change',
        'Do not force an audit', '## 5.', '## 7.'],
    'skills/ux-critique/references/bounded-verification.md': ['Partial check: no browser was available',
        'not a reason to abandon a known required correction'],
    'skills/ux-critique/references/requirements-and-feedback.md': ['keep/remove/change/add',
        'Never call an omitted rule "approved"', 'either one satisfies the request'],
    'skills/ship-check/SKILL.md': ['Deadline rule', 'Needs decision is a verdict, not an item status',
        'critical requirements', 'read-only', 'ask one question for that artifact and stop'],
    'skills/ui-ux-design/references/anti-slop-rules.md': ['Default screens to leave out', 'testimonial carousel',
        'four summary cards'],
    'skills/ux-critique/references/slop-tells.md': ['## Worked finding', 'Do not answer a review by restyling'],
    'tests/README.md': ['Save examples/before-after/'],
    'docs/04-frontend-spec.md': ['Current phase', 'Visible element', 'Exact acceptance checks', 'Saved', 'F1', 'F2', 'F3'],
    'docs/build-rules.md': ['Current phase', 'sensitive phone/email searches', 'saved effects', 'F1', 'F2', 'F3'],
    'docs/ship-check.md': ['Artifact/version/environment', 'Critical requirements', 'disposition',
        'Needs decision is a verdict, not an item status'],
}

# Phase 5 source contracts and meaningful mutations. Behavior is evaluated separately.
PHASE5_MUTATIONS = [('optional_system',
  'skills/ui-ux-design/SKILL.md',
  'A small correction needs no full system exercise',
  'A small correction always requires a full system exercise'),
 ('no_rebrand',
  'skills/ui-ux-design/references/references-and-design-system.md',
  'Do not rebrand or replace an existing system without approval',
  'Rebrand any system whenever it looks old'),
 ('missing_document',
  'skills/ui-ux-design/references/references-and-design-system.md',
  'Missing documentation is not evidence that no system exists',
  'Missing documentation proves no system exists'),
 ('reuse_first',
  'skills/ui-ux-design/references/references-and-design-system.md',
  'Choose reuse first, bounded extension for a supported gap',
  'Choose replacement first for every task'),
 ('unknowns',
  'skills/ui-ux-design/references/references-and-design-system.md',
  'Unknown versions, values and ownership stay Unknown',
  'Guess unknown versions and ownership'),
 ('no_architecture',
  'skills/ui-ux-design/references/references-and-design-system.md',
  'do not turn inspection into new token schemas or component contracts',
  'turn every inspection into new token schemas and component contracts'),
 ('foundation_scope',
  'skills/ui-ux-design/references/design-foundations.md',
  'Do not rewrite a system for a small correction',
  'Rewrite a system for every small correction'),
 ('foundation_authority',
  'skills/ui-ux-design/references/design-foundations.md',
  'choose new values only under requested or delegated design authority',
  'choose new values whenever the assistant prefers'),
 ('imagery',
  'skills/ui-ux-design/references/design-foundations.md',
  'No-use is valid; do not invent logos or assets',
  'Invent logos and assets for every screen'),
 ('density',
  'skills/ui-ux-design/references/design-foundations.md',
  'compact does not mean smaller everything',
  'compact means smaller everything'),
 ('access_defect',
  'skills/ui-ux-design/references/design-foundations.md',
  'A reuse decision is not an accessibility Pass',
  'A reuse decision establishes accessibility Pass'),
 ('isolated_issues',
  'skills/ui-ux-design/references/design-foundations.md',
  'Preserve isolated accessibility issues even if the rest of the system is consistent',
  'Discard isolated accessibility issues'),
 ('no_modes',
  'skills/ui-ux-design/references/design-foundations.md',
  'Do not force light/dark, brand or density modes into an unrelated task',
  'Always generate every theme and density mode'),
 ('no_mandatory_governance',
  'skills/ui-ux-design/references/design-system-governance.md',
  'do not invent a committee or require new tools',
  'invent a committee and require new tools'),
 ('unknown_owner',
  'skills/ui-ux-design/references/design-system-governance.md',
  'missing ownership stays Unknown',
  'assign a design council for missing ownership'),
 ('small_project',
  'skills/ui-ux-design/references/design-system-governance.md',
  'A solo project may need only a source file, change note and an agreed reviewer',
  'A solo project needs a full governance council'),
 ('canonical_names',
  'skills/ui-ux-design/references/design-system-governance.md',
  'Use one name for the same role',
  'Use unrelated names for the same role'),
 ('migration',
  'skills/ui-ux-design/references/design-system-governance.md',
  'Unknown aliases, redirects, adapters or rollback support stay Unknown',
  'Assume aliases, redirects, adapters and rollback exist'),
 ('schema',
  'skills/ui-ux-design/references/design-system-governance.md',
  'Preserve an existing schema and unrelated keys',
  'Replace all existing schema keys'),
 ('gallery',
  'skills/ui-ux-design/references/design-system-sources.md',
  'a comparison/reference index, not an installable component library or usability proof',
  'an installable component library and usability proof'),
 ('sources_not_facts',
  'skills/ui-ux-design/references/design-system-sources.md',
  "not this product's research findings, brand authority or approved system choice",
  "this product's verified research and approved brand"),
 ('icon_exception',
  'skills/ui-ux-design/references/icons-and-placement.md',
  'Preserve approved role/platform/brand exceptions rather than silently replacing them',
  'Silently replace approved role/platform/brand exceptions'),
 ('export_schema',
  'docs/build-rules.md',
  'preserve unrelated schema keys',
  'erase unrelated schema keys'),
 ('export_source',
  'docs/04-frontend-spec.md',
  'Carry the canonical system source/version if known',
  'Invent a current system version')]
PHASE51_MUTATIONS = [('proposed_before_screens',
  'skills/ui-ux-design/SKILL.md',
  "mark it Proposed, and get the user's OK before screens.",
  'mark it Proposed after the screens are already drawn.'),
 ('observed_reuse',
  'skills/ui-ux-design/SKILL.md',
  'extract the current system, mark it Observed, and reuse it.',
  'replace the current system with a new visual language.'),
 ('numbers_from_system',
  'skills/ui-ux-design/SKILL.md',
  'Numbers are required for handoff, but they must come from the observed or approved system, never invented.',
  'Invent numbers for handoff when no system exists.'),
 ('invented_control',
  'skills/ui-ux-design/references/component-vocabulary.md',
  'If a control cannot be named, justify it or remove it.',
  'If a control cannot be named, invent a custom control and keep it.'),
 ('tooltip_critical',
  'skills/ui-ux-design/references/anti-slop-rules.md',
  'Critical information is never only in a tooltip or popover.',
  'Critical information can live only in a tooltip or popover.'),
 ('tooltip_critique',
  'skills/ux-critique/references/slop-tells.md',
  'Critical information is never only in a tooltip or popover.',
  'Critical information can live only in a tooltip or popover.'),
 ('select_versus_combobox',
  'skills/ui-ux-design/references/component-choice.md',
  'Use Select for one value from a short fixed list. Use Combobox when the person must type to filter a long list.',
  'Use Combobox for one value from a short fixed list. Use Select when the person must type to filter a long list.')]
for _label, _path, _required, _replacement in PHASE5_MUTATIONS + PHASE51_MUTATIONS:
    RULES.setdefault(_path, []).append(_required)
for _old in [k for k in RULES if k in MERGED]:
    RULES.setdefault(MERGED[_old], []).extend(RULES.pop(_old))
PHASE5_MUTATIONS = [(l, MERGED.get(p, p), a, b) for l, p, a, b in PHASE5_MUTATIONS]
PHASE51_MUTATIONS = [(l, MERGED.get(p, p), a, b) for l, p, a, b in PHASE51_MUTATIONS]

DESIGN_PROMPTS = ['**Icon set:**', '**Style:**', '**Stroke weight:**', '**Icon-only allowed:** close, search, menu, more, back',
    '**Never icon-only:** destructive', '**Status:** text + icon + color', '**Primary action side:**', '**Button order:**',
    '**Dialog actions:**', '**Toasts and status messages:**', '**Empty states:**', '**Mobile primary action:**',
    'Never two filled buttons side by side']
# Project-specific IVC wording must not leak into general skills or templates.
IVC_LEAKS = ['Filter: All Attendees', 'Query: Test', 'Synced to event sheet', 'Scan QR', 'Family ID', 'badge stock',
             'registration case', 'Registration feedback case', 'Dallas HQ', '\u2318K', 'four sides', 'four-sided']
# Contradictions of restored rules, checked in skills, docs and personal-taste.
FORBIDDEN = [
    (r'(?i)\b(delete|destructive|remove|uncommon)\w*\b[^.\n]{0,60}\bcan be icon-only', 'destructive/uncommon icon-only allowed'),
    (r'(?i)\bicon-only\b[^.\n]{0,40}\b(fine|ok|allowed)\b[^.\n]{0,20}\b(delete|destructive)', 'destructive icon-only allowed'),
    (r'(?i)(?<!not )(?<!never )\b(use|add|show)s? an? (thick|heavy) (left )?accent', 'heavy accent selection required'),
    (r'(?i)\b(always|must) show\b[^.\n]{0,40}\bsync', 'routine sync status required'),
    (r'(?i)\b(color|icon) alone is (fine|enough|sufficient)', 'single-cue status allowed'),
    (r'(?i)status (needs|uses) [^.\n]{0,40}\bor another\b', 'status as text OR another cue'),
    (r'(?i)not one side for every action', 'primary side not decided once'),
    (r'(?i)aim for (?!three\b)\w+ useful questions', 'question target changed'),
    (r'(?i)View all in progress"?,? and a way to clear', 'owner wording changed from or to and'),
    (r'(?i)\btwo (filled|primary)[^.\n]{0,20}side by side is (fine|ok|allowed)', 'two filled buttons allowed'),
]
FLOW_START = '<!-- FLOW-EXPORT-START -->'
FLOW_END = '<!-- FLOW-EXPORT-END -->'
FLOW_FILES = ['skills/_shared/flow-rules.md', 'docs/04-frontend-spec.md', 'docs/build-rules.md']
OLD_HASH = '63a7ac219600a5a6272c968c46dfc1eb4e36646dc4dd0dc0adc606920aa7e44d'
PACKAGED_HASH = 'bab6df757fd224fbad1d1f2b9b678df877a24032dc7d06069b75027ae9c56c3e'


def strip_fences(text):
    return re.sub(r'```.*?```', '', text, flags=re.S)


def heading_ids(text):
    result, seen = set(), {}
    for h in re.findall(r'^#{1,6}\s+(.+?)\s*#*$', strip_fences(text), re.M):
        h = re.sub(r'[^\w\s-]', '', h.lower()).replace(' ', '-')
        n = seen.get(h, 0)
        result.add(h if not n else f'{h}-{n}')
        seen[h] = n + 1
    return result


def validate(root):
    errors, warnings, refs = [], [], set()
    def read(rel):
        try:
            return (root / rel).read_text(encoding='utf-8')
        except (OSError, UnicodeError) as exc:
            errors.append(f'{rel}: cannot read ({type(exc).__name__})')
            return ''
    def need(rel, phrase):
        if phrase.lower() not in read(rel).lower():
            errors.append(f'{rel}: missing rule contract: {phrase}')

    actual = {p.parent.name for p in (root / 'skills').glob('*/SKILL.md')}
    if actual != set(SKILLS):
        errors.append(f'skill names changed: {sorted(actual)}')
    for name, count in SKILLS.items():
        rel = f'skills/{name}/SKILL.md'; text = read(rel)
        # Exact supported YAML subset: two unique keys; description is JSON-quoted YAML.
        match = re.match(r'\A---\nname: ([a-z0-9-]+)\ndescription: ("[^\n]*")\n---\n', text)
        if not match or match[1] != name:
            errors.append(f'{rel}: invalid restricted frontmatter or mismatched name')
        else:
            try:
                desc = json.loads(match[2])
                if not isinstance(desc, str) or not desc.startswith('Use this when') or not 1 <= len(desc) <= 1024:
                    raise ValueError('description length/trigger')
            except (ValueError, TypeError):
                errors.append(f'{rel}: invalid description')
        need(rel, '**Pack version:** ' + VERSION)
        for required in ['## INTAKE', '(../_shared/intake.md)', '(../_shared/operating-contract.md)',
                         'Core rules if `../_shared` is unreachable']:
            need(rel, required)
        gate = re.search(r'^## (?:Decision gate|Pre-flight|Audit|Launch gate|Pack check):[^\n]*\n(.*?)(?=^## |\Z)', text, re.M | re.S)
        ids = re.findall(r'^\| (\d+) \|', strip_fences(gate[1]), re.M) if gate else []
        if [int(x) for x in ids] != list(range(1, count + 1)):
            errors.append(f'{rel}: expected gate IDs 1-{count}, got {ids}')
        for ref in REFS[name]:
            need(rel, 'references/' + ref)
            if ref.startswith('research-'):
                links = re.findall(r'\[[^\]]+\]\((references/[^)]+)\)', strip_fences(text))
                if 'references/' + ref not in links:
                    errors.append(f'{rel}: research reference must link directly: {ref}')
        if name != 'ship-check':
            need(rel, '(../_shared/flow-rules.md)')
        if len(text.split()) > 1300:
            errors.append(f'{rel}: exceeds 1300-word entry budget')
    for rel, phrases in RULES.items():
        for phrase in phrases:
            need(rel, phrase)

    # Every Markdown file, including root, docs, examples and evals, is checked.
    for path in sorted(root.rglob('*.md')):
        if '.git' in path.relative_to(root).parts:
            continue
        rel = path.relative_to(root)
        if rel.as_posix().startswith(RAW_EVIDENCE_DIRS):
            continue  # raw trial output links point into the user's future project, not this pack
        text = read(rel)
        prose = strip_fences(text)
        targets = re.findall(r'!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)', prose)
        if rel.parts[0] == 'skills':
            targets += re.findall(r'`((?:references/|(?:\.\./)+)[^`\s]+)`', prose)
        for target in targets:
            if re.match(r'[a-z][a-z0-9+.-]*:', target, re.I) or '*' in target:
                continue
            base, _, anchor = target.partition('#')
            resolved = (path.parent / base).resolve() if base else path.resolve()
            refs.add((str(rel), target))
            if not resolved.is_relative_to(root.resolve()) or not resolved.exists():
                errors.append(f'{rel}: broken local reference {target}')
            elif anchor and resolved.suffix == '.md' and anchor not in heading_ids(resolved.read_text()):
                errors.append(f'{rel}: missing heading {target}')

    active = [root / x for x in ['README.md', 'skills.md', 'architecture.md', 'AGENTS.md']]
    active += list((root / 'skills').rglob('*.md')) + list((root / 'docs').glob('*.md'))
    for p in active:
        text = read(p.relative_to(root))
        if re.search(r'0\.5\.[01](?:-draft)?|Start every reply|Stop for a yes after each doc', text, re.I):
            errors.append(f'{p.relative_to(root)}: obsolete active version or ceremony')
    for name in ['README.md', 'skills.md', 'architecture.md', 'AGENTS.md']:
        need(name, VERSION)
    need('README.md', '## How it improved')
    need('CHANGELOG.md', '## 0.6.1-draft - 2026-10-04')
    need('CHANGELOG.md', '## 0.6 - 2026-10-04')
    for name in TEMPLATES:
        need('docs/' + name, VERSION)
    # Exported paths are app-root paths, not pack paths. Only inspect path literals.
    project_paths = {'PRODUCT.md', 'DESIGN.md'} | {'docs/shipright/' + n for n in TEMPLATES if n not in {'PRODUCT.md', 'DESIGN.md'}}
    for p in (root / 'docs').glob('*.md'):
        for value in re.findall(r'`([^`\n]+)`', strip_fences(read(p.relative_to(root)))):
            if value.endswith('.md') and ('/' in value or value in {'PRODUCT.md', 'DESIGN.md'}):
                if value not in project_paths:
                    errors.append(f'{p.relative_to(root)}: invalid project export path {value}')
    blocks = []
    for rel in FLOW_FILES:
        text = read(rel)
        if text.count(FLOW_START) != 1 or text.count(FLOW_END) != 1:
            errors.append(f'{rel}: missing/duplicate flow export markers')
            continue
        blocks.append(text.split(FLOW_START)[1].split(FLOW_END)[0].strip())
    if len(blocks) != 3 or len(set(blocks)) != 1:
        errors.append('F1-F3 export blocks differ from canonical source')
    design = read('docs/DESIGN.md')
    fm = re.match(r'\A---\n(.*?)\n---', design, re.S)
    keys = set(re.findall(r'^([A-Za-z_][\w-]*):', fm[1], re.M)) if fm else set()
    expected = {'version', 'name', 'description', 'colors', 'typography', 'rounded', 'spacing', 'components'}
    if keys != expected or re.search(r'#[0-9A-Fa-f]{3,8}\b', fm[1] if fm else ''):
        errors.append('docs/DESIGN.md: invalid template keys or placeholder hex')
    for head in ['## Colors', '## Icons', '## Placement', "## Do's and Don'ts", '## ShipRight status'] + DESIGN_PROMPTS:
        need('docs/DESIGN.md', head)
    general = list((root / 'skills').rglob('*.md')) + list((root / 'docs').glob('*.md'))
    for p in general:
        text = read(p.relative_to(root))
        for leak in IVC_LEAKS:
            if leak.lower() in text.lower():
                errors.append(f'{p.relative_to(root)}: project-specific IVC wording in general guidance: {leak}')
    for p in general + [root / 'personal-taste/altaz.md']:
        text = read(p.relative_to(root))
        for pattern, label in FORBIDDEN:
            if re.search(pattern, text):
                errors.append(f'{p.relative_to(root)}: contradicts a restored rule ({label})')
    contract = read('skills/_shared/operating-contract.md')
    statuses = re.findall(r'^\| (Pass|Fail|Not verified|Not applicable) \|', contract, re.M)
    if statuses != ['Pass', 'Fail', 'Not verified', 'Not applicable']:
        errors.append('operating-contract.md: four-status table changed')

    words = sum(len(read(p.relative_to(root)).split()) for p in (root / 'skills').rglob('*.md'))
    # Stored knowledge has no global cap. Required token checks run separately.
    import importlib.util
    module_spec = importlib.util.spec_from_file_location('context_structure', root / 'evals/check_context.py')
    module = importlib.util.module_from_spec(module_spec)
    module_spec.loader.exec_module(module)
    check_structure = module.check_structure
    context_errors, _, _ = check_structure(root)
    errors.extend(context_errors)
    for p in sorted(root.rglob('*')):
        if not p.is_file() or '.git' in p.relative_to(root).parts or p.suffix in {'.png', '.zip', '.pyc'}:
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except UnicodeError:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            rel_posix = p.relative_to(root).as_posix()
            if '\u2014' in line and rel_posix not in VERBATIM_SOURCES and not rel_posix.startswith(RAW_EVIDENCE_DIRS):
                errors.append(f'{p.relative_to(root)}:{n}: em dash')
            if '05-ticket-list.md' in line and p.name != 'check_sources.py':
                errors.append(f'{p.relative_to(root)}:{n}: obsolete ticket filename')
        try:
            if p.suffix == '.json':
                json.loads(text)
            elif p.suffix == '.jsonl':
                for line in text.splitlines():
                    json.loads(line)
        except ValueError as exc:
            errors.append(f'{p.relative_to(root)}: invalid JSON ({exc})')

    # Retain every original path and every original prototype/evidence byte.
    try:
        inventory = json.loads(read('evals/v0.6/read-coverage.json'))
        if len(inventory) != 110:
            errors.append('baseline read inventory must include all 110 supplied files')
        for entry in inventory:
            p = root / entry['path']
            if not p.is_file():
                # v1.0 merges (Altaz approved 2026-10-13) may retire a guidance path only into an existing successor.
                if not (entry['path'] in MERGED and (root / MERGED[entry['path']]).is_file()):
                    errors.append(f'{entry["path"]}: original path removed')
            elif '/prototype/' in entry['path'] or '/evidence/' in entry['path']:
                if hashlib.sha256(p.read_bytes()).hexdigest() != entry['sha256']:
                    errors.append(f'{entry["path"]}: historical bytes changed')
        base = root / 'examples/ivc-2026-registration'
        manifest = json.loads((base / 'evidence/source-manifest.json').read_text())
        for name, recorded in manifest['files'].items():
            actual = hashlib.sha256((base / name).read_bytes()).hexdigest()
            if actual == recorded:
                continue
            if name == 'prototype/app.js' and recorded == OLD_HASH and actual == PACKAGED_HASH:
                need('examples/ivc-2026-registration/README.md', 'old source manifest records a different hash')
                need('examples/ivc-2026-registration/docs/05-implementation-review.md', 'does not match evidence/source-manifest.json')
                warnings.append('Historical app.js hash mismatch is disclosed; old runtime evidence does not verify packaged app.js.')
            else:
                errors.append(f'historical source manifest: unacknowledged mismatch for {name}')
        inputs = json.loads(read('evals/v0.6/inputs.json'))
        if [c['id'] for c in inputs['cases']] != ['F01', 'F02', 'F03', 'F04']:
            errors.append('v0.6 must retain four distinct behavior trial inputs')
        for case in inputs['cases']:
            for artifact in case['artifacts']:
                p = (root / 'evals/v0.6' / artifact).resolve()
                if not p.is_relative_to(root.resolve()) or not p.is_file():
                    errors.append(f'{case["id"]}: missing or external trial artifact {artifact}')
        for trial in ['F01', 'F01-rerun', 'F02', 'F03', 'F04']:
            response = json.loads(read(f'evals/v0.6/{trial}-response.json'))
            if response.get('trial_id') != trial or not all(response.get(k) for k in
                    ['final_response', 'consulted_files', 'evidence_limits']):
                errors.append(f'{trial}: incomplete raw response record')
        # Raw evidence stays verbatim. A recorded quotation style miss is not hidden
        # by JSON escaping or treated as compliance in the release results.
        f03 = json.loads(read('evals/v0.6/F03-response.json'))
        if chr(0x2014) in f03.get('final_response', ''):
            need('evals/v0.6/results.md', 'F03 retained an em dash quoted from the screenshot title')
            warnings.append('F03 raw evidence retains a quoted em dash; the style miss is disclosed.')
    except (KeyError, ValueError, OSError, TypeError) as exc:
        errors.append(f'baseline/eval metadata invalid: {exc}')
    return errors, warnings, len(refs), words


def self_test(root):
    """Reject meaningful mutations without touching the source pack."""
    mutations = [
        ('optional_mapping', 'skills/product-design/SKILL.md', 'Skip mapping for clear corrections or a sufficient existing map', 'Always map every correction'),
        ('framing_first', 'skills/product-design/references/mapping-types.md', 'An unframed idea still follows shared intake before maps', 'Always map before intake'),
        ('one_map', 'skills/product-design/references/mapping-types.md', 'Choose one smallest useful map; do not generate every map automatically', 'Generate all five maps automatically'),
        ('current_future', 'skills/product-design/references/mapping-types.md', 'Keep current-state evidence separate from future-state proposals', 'Mix current facts with future proposals'),
        ('no_invention', 'skills/product-design/references/mapping-types.md', 'Never invent emotions, teams, channels, dependencies or business processes', 'Invent missing emotions and business processes'),
        ('isolated_issues', 'skills/product-design/references/mapping-types.md', 'Retain every supplied accessibility or safety issue even without repetition', 'Only retain repeated accessibility and safety issues'),
        ('no_validation', 'skills/product-design/references/mapping-types.md', 'No map establishes accessibility, security, safety, service reliability or usability Pass', 'Every completed map establishes accessibility and safety Pass'),
        ('no_persona', 'skills/product-design/references/journey-mapping.md', 'Use actual records, not a newly invented persona', 'Create a persona to fill missing records'),
        ('no_forced_funnel', 'skills/product-design/references/journey-mapping.md', 'Do not force awareness, purchase and loyalty stages onto unrelated tasks', 'Force a sales funnel onto every journey'),
        ('separate_actors', 'skills/product-design/references/journey-mapping.md', "Keep different people's accounts separate; do not splice them into one observed path", 'Combine all accounts into one observed actor'),
        ('reported_emotions', 'skills/product-design/references/journey-mapping.md', 'Keep recalled behavior and feelings Reported, even in a recorded interview', 'Treat recorded recalled feelings as Observed'),
        ('pause_not_emotion', 'skills/product-design/references/journey-mapping.md', 'An observed pause does not establish frustration', 'An observed pause proves frustration'),
        ('no_curve', 'skills/product-design/references/journey-mapping.md', 'do not invent emotions or an emotional curve', 'invent an emotional curve for every journey'),
        ('return_unknown', 'skills/product-design/references/journey-mapping.md', 'missing persistence stays Unknown', 'assume interrupted work is saved'),
        ('task_system', 'skills/product-design/references/task-and-system-flows.md', 'distinguish user actions from system steps when they intersect', 'Treat automatic system steps as user choices'),
        ('no_capabilities', 'skills/product-design/references/task-and-system-flows.md', 'Never invent APIs, queues, retries, cancellation, notifications or persistence', 'Assume APIs, queues and retries exist'),
        ('remote_unknown', 'skills/product-design/references/task-and-system-flows.md', 'A failed response does not prove the remote action failed', 'A failed response proves payment failed'),
        ('exit_not_cancel', 'skills/product-design/references/task-and-system-flows.md', 'Leaving a page does not cancel a submitted transaction', 'Leaving cancels every submitted transaction'),
        ('human_pending', 'skills/product-design/references/task-and-system-flows.md', 'Human pending work is not a background job', 'Human pending work should show a running job'),
        ('partial_blueprint', 'skills/product-design/references/service-blueprints.md', 'Do not require one backstage action for every touchpoint', 'Invent a backstage action for every touchpoint'),
        ('unknown_business', 'skills/product-design/references/service-blueprints.md', 'Missing teams, departments, systems, policies, dependencies, timing and SLA stay Unknown', 'Invent departments, systems and SLA for missing lanes'),
        ('props_not_research', 'skills/product-design/references/service-blueprints.md', 'Service artifacts are not research evidence or proof of successful delivery', 'Service artifacts prove validated reliable delivery'),
        ('handoff_acceptance', 'skills/product-design/references/service-blueprints.md', 'Transferred is not accepted or completed', 'Forwarding means accepted and completed'),
        ('visibility', 'skills/product-design/references/service-blueprints.md', 'Frontstage/backstage depends on visibility, not job title', 'Frontstage/backstage is fixed by job title'),
        ('source_limits', 'skills/product-design/references/mapping-sources.md', "they are not this product's findings or business processes", 'they establish product findings and business processes'),
        ('template_emotions', 'docs/01-prd.md', 'Emotions require a supplied source; no mandatory emotion lane', 'Always fill an emotional curve'),
        ('template_capabilities', 'docs/02-technical-architecture.md', 'mapping does not verify runtime', 'mapping verifies runtime'),
        ('ticket_authority', 'docs/05-feature-ticket-list.md', 'A proposed map change is not an approved ticket', 'Every map proposal is an approved ticket'),
        ('optional_ia', 'skills/product-design/SKILL.md', 'Skip IA for clear corrections or sufficient existing structure', 'Always run IA for every correction'),
        ('framing_first', 'skills/product-design/references/information-architecture.md', 'An unframed idea still follows shared intake before objects or maps', 'Generate objects and maps for every vague idea'),
        ('sourced_structure', 'skills/product-design/references/information-architecture.md', 'Do not invent objects, roles, relationships, routes, categories or filters', 'Invent missing objects, roles, relationships, routes, categories and filters'),
        ('unknown_relationships', 'skills/product-design/references/information-architecture.md', 'Unknown cardinality, ownership or deletion stays Unknown', 'Assume ownership and cascade deletion for unknown relationships'),
        ('no_quotas', 'skills/product-design/references/information-architecture.md', 'not fixed category counts or depth limits', 'always seven categories and three levels'),
        ('grounded_labels', 'skills/product-design/references/information-architecture.md', 'Proposed grouping or label changes must derive from supplied content and authorized decisions', 'Create unsupported category labels to appear comprehensive'),
        ('views_not_routes', 'skills/product-design/references/information-architecture.md', 'Do not turn every tab or state into a route', 'Turn every state into a new route'),
        ('unknown_paths', 'skills/product-design/references/information-architecture.md', 'Mark addresses Unknown rather than inventing paths', 'Guess missing URL paths'),
        ('migration_limits', 'skills/product-design/references/information-architecture.md', 'Do not assume redirects, aliases or migration capabilities exist', 'Assume redirects always exist'),
        ('no_added_filters', 'skills/product-design/references/findability.md', 'Do not add search, filters, saved searches, tags or analytics to complete a checklist', 'Add filters, tags and analytics by default'),
        ('unknown_retrieval', 'skills/product-design/references/findability.md', 'Unknown matching, indexing, ranking, typo/synonym support, counts and scale stay Unknown', 'Invent search support and result counts'),
        ('combination_authority', 'skills/product-design/references/findability.md', 'Define within-facet and across-facet combination rules only when sourced or authorized', 'Choose OR and AND defaults without authority'),
        ('clear_is_not_delete', 'skills/product-design/references/findability.md', 'clearing criteria is not deleting records', 'clear filters by deleting records'),
        ('private_search', 'skills/product-design/references/findability.md', 'Do not put private queries, identifiers or tokens in URLs, analytics or logs', 'Persist private queries and tokens in URLs'),
        ('actual_roles', 'skills/product-design/references/roles-and-navigation.md', 'No default Owner/Admin/Member/Guest roles', 'Always seed Owner/Admin/Member/Guest roles'),
        ('hidden_not_authorization', 'skills/product-design/references/roles-and-navigation.md', 'Hidden navigation is never access control', 'Hidden navigation is sufficient access control'),
        ('direct_entry_scope', 'skills/product-design/references/roles-and-navigation.md', 'Require authorization on direct requests and object access', 'Allow any signed-in actor through direct links'),
        ('metadata_boundaries', 'skills/product-design/references/roles-and-navigation.md', 'Apply the same data boundary to search, previews, suggestions and facet/result counts', 'Expose protected metadata in search suggestions and counts'),
        ('isolated_risks', 'skills/product-design/references/roles-and-navigation.md', 'Retain isolated accessibility and safety issues even without repeated patterns', 'Drop isolated safety issues unless repeated'),
        ('unperformed_studies', 'skills/product-design/references/ia-research.md', 'Plans stay unperformed unless real session evidence is available', 'Treat study plans as completed research'),
        ('ai_not_participants', 'skills/product-design/references/ia-research.md', 'expert or AI sorting is not participant research', 'AI sorting counts as validated participant research'),
        ('neutral_tasks', 'skills/product-design/references/ia-research.md', 'Write realistic finding tasks without revealing the target label/path', 'Tell participants the target path in each task'),
        ('tree_limits', 'skills/product-design/references/ia-research.md', 'Text-only tree tests omit interface cues, search and interactive accessibility', 'Tree testing proves full interface accessibility'),
        ('source_limits', 'skills/product-design/references/ia-sources.md', "Use the sources as guidance, never this product's user findings or permission policy", 'Use guides as validated findings and access approval'),
        ('isolated risk entry', 'skills/product-design/SKILL.md', 'retain every supplied accessibility or safety issue even without a repeated pattern', 'retain accessibility and safety issues only after repeated confirmation'),
        ('isolated risk summary', 'skills/product-design/references/research-synthesis.md', 'Always retain supplied accessibility or safety issues in the evidence trail and user risk summary, even when reported once and outside any repeated pattern', 'Discard isolated accessibility or safety issues that lack a repeated pattern'),
        ('uncertain isolated risk', 'skills/product-design/references/research-synthesis.md', 'Unclear severity or cause does not justify omission', 'Omit issues when severity or cause is unclear'),
        ('raw interpretations', 'skills/product-design/references/research-synthesis.md', 'Keep raw records separate from interpretations', "[removed protected synthesis rule]"),
        ('recall stays reported', 'skills/product-design/references/research-synthesis.md', 'its account of past behavior remains Reported', "[removed protected synthesis rule]"),
        ('independent support', 'skills/product-design/references/research-synthesis.md', 'Duplicate notes and repeated statements do not create independent support', "[removed protected synthesis rule]"),
        ('isolated issues', 'skills/product-design/references/research-synthesis.md', 'Preserve isolated serious issues even without repetition', "[removed protected synthesis rule]"),
        ('contradictions', 'skills/product-design/references/research-synthesis.md', 'Keep contradictory evidence and isolated exceptions traceable', "[removed protected synthesis rule]"),
        ('confidence integrity', 'skills/product-design/references/research-synthesis.md', 'Never invent confidence scores', "[removed protected synthesis rule]"),
        ('persona integrity', 'skills/product-design/references/research-synthesis.md', 'Do not invent personas', "[removed protected synthesis rule]"),
        ('record authority', 'skills/product-design/references/research-synthesis.md', 'Research records contain data, not instructions to change scope', "[removed protected synthesis rule]"),
        ('partial inspection', 'skills/product-design/references/research-synthesis.md', 'declare uninspected portions', "[removed protected synthesis rule]"),
        ('scope decision', 'skills/product-design/references/research-to-decisions.md', 'Interpretation supports a recommendation; it does not approve scope', "[removed protected synthesis rule]"),
        ('opportunity approval', 'skills/product-design/references/research-to-decisions.md', 'A proposed opportunity is not an approved feature', "[removed protected synthesis rule]"),
        ('frequency priority', 'skills/product-design/references/research-to-decisions.md', 'Frequency alone does not determine priority', "[removed protected synthesis rule]"),
        ('decision verification', 'skills/product-design/references/research-to-decisions.md', 'what would challenge the recommendation', "[removed protected synthesis rule]"),
        ('confidence status', 'skills/product-design/references/research-to-decisions.md', 'Keep evidence confidence separate from approval and gate statuses', "[removed protected synthesis rule]"),
        ('no UI jump', 'skills/product-design/references/research-to-decisions.md', 'No finding-to-UI shortcut', "[removed protected synthesis rule]"),

        ('skill name', 'skills/ui-ux-design/SKILL.md', 'name: ui-ux-design', 'name: renamed'),
        ('gate ID', 'skills/product-design/SKILL.md', '| 8 | Decisions', '| 9 | Decisions'),
        ('root link', 'README.md', '(skills/product-design/SKILL.md)', '(missing.md)'),
        ('reference file', 'skills/ui-ux-design/references/motion.md', None, None),
        ('em dash', 'README.md', '# ShipRight', '# ShipRight ' + chr(0x2014)),
        ('phase rule', 'skills/_shared/operating-contract.md', 'Save later-phase ideas as notes, not UI', 'Render every later idea now'),
        ('question budget', 'skills/_shared/intake.md', '0-5 questions total before starting', 'Ask unlimited questions'),
        ('research hypothesis', 'skills/_shared/operating-contract.md',
         'A **Hypothesis** is a testable proposition, not evidence', 'Hypotheses are validated facts'),
        ('simulated participants', 'skills/_shared/operating-contract.md',
         'Simulated participants never establish research findings', 'Simulated participants establish real findings'),
        ('research permissions', 'skills/_shared/intake.md',
         'Plans do not authorize recruitment, recording, payment or messages', 'A plan authorizes external messages'),
        ('participant guide budget', 'skills/_shared/intake.md',
         'Participant-guide questions are deliverables, not founder intake', 'All guides must have at most five questions'),
        ('reported versus observed', 'skills/product-design/references/research-evidence.md',
         'not an observed action', 'always an observed action'),
        ('unperformed study', 'skills/product-design/references/research-planning.md',
         'mark the plan unperformed', 'claim the research was performed'),
        ('guide recall is not observation', 'skills/product-design/references/research-planning.md',
         'recalled behavior is Reported', 'recalled behavior is Observed'),
        ('guide witnessed behavior', 'skills/product-design/references/research-planning.md',
         'behavior directly witnessed during the session is Observed', 'all narrated behavior is Observed'),
        ('guide outcome consistency', 'skills/product-design/references/research-planning.md',
         'Match instructions and outcome tables', 'Allow contradictory outcome tables'),
        ('prompted verification category', 'skills/product-design/references/research-planning.md',
         '| Prompted verification | Non-directional check confirms prior success; independence unverified.',
         '| Independent completion | Any verification prompt establishes independence.'),
        ('setup is not task failure', 'skills/product-design/references/research-planning.md',
         '| Setup or technical failure | Assessment blocked; separate cause from product-task failure.',
         '| Product failure | Failed test accounts prove unusable downloads.'),
        ('direct research link', 'skills/product-design/SKILL.md',
         '[research.md](references/research.md)', '`references/research-methods.md`'),
        ('feedback lesson', 'examples/ivc-2026-registration/feedback/round1-corrections.md', 'View all in progress', 'Browse everything'),
        ('export drift', 'docs/build-rules.md', 'Hide routine system plumbing', 'Show all system plumbing'),
        ('project path', 'docs/05-feature-ticket-list.md', 'docs/shipright/ship-check.md', 'docs/ship-check.md'),
        ('placeholder token', 'docs/DESIGN.md', 'colors: {}', 'colors: {accent: "#000000"}'),
        ('version', 'skills/ship-check/SKILL.md', '**Pack version:** ' + VERSION, '**Pack version:** 0.5.1-draft'),
        ('frame first', 'skills/_shared/intake.md', 'the first reply is the decision cards only', 'the first reply is the full product'),
        ('how it improved', 'README.md', '## How it improved', '## Notes'),
        ('default screens', 'skills/ui-ux-design/references/anti-slop-rules.md', 'Default screens to leave out', 'Screens to invent'),
        ('worked finding', 'skills/ux-critique/references/slop-tells.md', 'Do not answer a review by restyling', 'Answer a review by restyling'),
        ('no artifact', 'skills/ship-check/SKILL.md', 'ask one question for that artifact and stop', 'fill all 20 rows from the idea'),
        ('screenshot step', 'tests/README.md', 'Save examples/before-after/', 'Skip screenshots for'),
        ('accessibility', 'skills/ui-ux-design/references/state-coverage.md', '320 CSS pixels', 'unspecified width'),
        ('private input', 'skills/ui-ux-design/references/build-handoff.md', 'sensitive phone/email searches', 'public queries'),
        ('archival byte', 'examples/ivc-2026-registration/prototype/index.html', '</html>', '<!-- changed --></html>'),
        ('evidence notice', 'examples/ivc-2026-registration/README.md', 'old source manifest records a different hash', 'old evidence is fully verified'),
        ('stage scoring', 'skills/_shared/operating-contract.md', 'Score each criterion at the named review stage', 'Combine all review stages'),
        ('trial artifact', 'evals/v0.6/inputs.json', 'existing-before.html', 'missing-trial.html'),
        # 0.6.1-draft restored rules
        ('icon-only delete', ICONS, 'Never make a destructive action (delete, remove, cancel) or an uncommon action icon-only. Give it a visible text label.', 'Destructive actions can be icon-only.'),
        ('icon-only list', ICONS, 'Icon-only is allowed only for close, search, menu, more and back', 'Icon-only is fine for any action'),
        ('status cues', ICONS, 'Status uses text + icon + color.', 'Status needs text or another cue.'),
        ('thumb reach', ICONS, 'Keep it within thumb reach', 'Put it anywhere'),
        ('toast location', ICONS, 'One consistent place across the app', 'Any convenient place'),
        ('two filled buttons', ICONS, 'Never put two filled', 'You may put two filled'),
        ('row border flip', ICONS, 'Make the selected state clear and clean, without a heavy accent bar unless the design system says so.', 'Use a thick left accent bar for the selected row.'),
        ('IVC leak', ICONS, 'Sticky actions must not cover content or focus.', 'Sticky actions must not cover content or focus. Remove "Query: Test".'),
        ('sync contradiction', 'skills/_shared/flow-rules.md', '## F3. Useful status\n', '## F3. Useful status\n\nAlways show a sync status chip to operators on every screen.\n'),
        ('question target', 'skills/_shared/intake.md', 'aim for three useful questions', 'aim for ten useful questions'),
        ('question card', 'skills/_shared/intake.md', 'plus **Something else**', 'plus **Other**'),
        ('or wording', 'skills/ux-critique/references/requirements-and-feedback.md', 'either one satisfies the request', 'both are required'),
        ('design prompt', 'docs/DESIGN.md', '- **Icon-only allowed:**', '- **Icons:**'),
        ("do's section", 'docs/DESIGN.md', "## Do's and Don'ts", '## Notes'),
        ('taste item', 'personal-taste/altaz.md', '4, 8, 12, 16, 24, 32 and 48', 'any spacing'),
        ('button side', ICONS, 'Primary action side and button order are set once for the app.', 'Consistency means repeatable patterns, not one side for every action in every context.'),
    ]
    mutations.extend(PHASE5_MUTATIONS)
    mutations.extend(PHASE51_MUTATIONS)
    with tempfile.TemporaryDirectory(prefix='shipright-check-') as tmp:
        copy = Path(tmp) / 'pack'
        shutil.copytree(root, copy, ignore=shutil.ignore_patterns('.git', '__pycache__'))
        for label, rel, old, new in mutations:
            rel = MERGED.get(rel, rel)
            p = copy / rel; original = p.read_bytes()
            if old is None:
                p.unlink()
            else:
                source = original.decode()
                if old not in source:
                    raise AssertionError(f'self-test fixture absent: {label}')
                p.write_text(source.replace(old, new, 1))
            errors, _, _, _ = validate(copy)
            p.write_bytes(original)
            if not errors:
                raise AssertionError(f'checker accepted mutation: {label}')
    return len(mutations)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--self-test', action='store_true')
    args = parser.parse_args()
    errors, warnings, links, words = validate(ROOT)
    if errors:
        print('FAIL\n' + '\n'.join(errors)); return 1
    print(f'PASS: 5 restricted metadata records; stable 8/10/10/20 gates plus build-pack 10; {links} local references; '
          f'phase/feedback/intake contracts; synchronized F1-F3 exports; project paths; versions; '
          f'{words} skill words (informational; run check_context.py for token budgets); original paths and historical bytes retained.')
    for warning in warnings:
        print('KNOWN LIMIT: ' + warning)
    if args.self_test:
        print(f'PASS: {self_test(ROOT)} mutation self-tests rejected.')
    print('Source integrity only. Behavior trials, client installs and runtime verification require separate evidence.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
