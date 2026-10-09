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
ICONS = 'skills/ui-ux-design/references/icons-and-placement.md'
HEAVY_ACCENT = 'without a heavy accent bar unless the design system says so'
VERSION = '0.6.2'
SKILLS = {'product-design': 8, 'ui-ux-design': 10, 'ux-critique': 10, 'ship-check': 20}
TEMPLATES = ['01-prd.md', '02-technical-architecture.md', '03-security-and-access.md',
             '04-frontend-spec.md', '05-feature-ticket-list.md', '06-pitch-one-pager.md',
             'PRODUCT.md', 'DESIGN.md', 'build-rules.md', 'ship-check.md']
REFS = {
    'product-design': ['decision-checklist.md', 'doc-set.md', 'operational-flows.md',
                       'opportunity-research.md', 'states-and-flows.md',
                       'research-evidence.md', 'research-methods.md', 'research-planning.md', 'research-sources.md'],
    'ui-ux-design': ['anti-slop-rules.md', 'build-handoff.md', 'icons-and-placement.md',
                     'layout-and-hierarchy.md', 'motion.md', 'operator-workspaces.md',
                     'references-and-design-system.md', 'state-coverage.md', 'ui-copy.md'],
    'ux-critique': ['bounded-verification.md', 'existing-app.md', 'plan-review.md',
                    'requirements-and-feedback.md', 'severity-rubric.md', 'slop-tells.md'],
    'ship-check': ['launch-items.md'],
}
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
        'unknown access, destructive effects and prices cannot become defaults'],
    'skills/_shared/intake.md': ['0-5 questions total before starting', 'Each requested decision counts separately',
        'aim for three useful questions', 'Why it matters', 'each with a concrete example', 'plus **Something else**',
        'You decide', 'Let me decide', 'No pick yet', 'Two front doors', '## Depth', 'Request traps',
        'the first reply is the decision cards only', 'A request to build it is not a frame',
        'Participant-guide questions are deliverables, not founder intake',
        'Plans do not authorize recruitment, recording, payment or messages'],
    'skills/product-design/SKILL.md': ['Inspect supplied evidence first', 'Load only needed references',
                                       'Missing artifact content stays Unknown'],
    'skills/product-design/references/research-evidence.md': [
        '**Observed:**', '**Reported:**', '**Inferred:**', '**Hypothesis:**', '**Unknown:**',
        'not gate statuses', 'Confidence needs a basis', 'grouping/synthesis belongs to Phase 2',
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
        gate = re.search(r'^## (?:Decision gate|Pre-flight|Audit|Launch gate):[^\n]*\n(.*?)(?=^## |\Z)', text, re.M | re.S)
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
        rel = path.relative_to(root); text = read(rel)
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
        for value in re.findall(r'`([^`]+)`', read(p.relative_to(root))):
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
    if words > 16000:
        errors.append(f'skills/: exceeds 16000-word reference budget ({words})')
    for p in sorted(root.rglob('*')):
        if not p.is_file() or '.git' in p.relative_to(root).parts or p.suffix in {'.png', '.zip', '.pyc'}:
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except UnicodeError:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            if '\u2014' in line:
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
         '[research-methods.md](references/research-methods.md)', '`references/research-methods.md`'),
        ('feedback lesson', 'examples/ivc-2026-registration/feedback/round1-corrections.md', 'View all in progress', 'Browse everything'),
        ('export drift', 'docs/build-rules.md', 'Hide routine system plumbing', 'Show all system plumbing'),
        ('project path', 'docs/05-feature-ticket-list.md', 'docs/shipright/ship-check.md', 'docs/ship-check.md'),
        ('placeholder token', 'docs/DESIGN.md', 'colors: {}', 'colors: {accent: "#000000"}'),
        ('version', 'skills/ship-check/SKILL.md', '**Pack version:** 0.6.2', '**Pack version:** 0.5.1-draft'),
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
    with tempfile.TemporaryDirectory(prefix='shipright-check-') as tmp:
        copy = Path(tmp) / 'pack'
        shutil.copytree(root, copy, ignore=shutil.ignore_patterns('.git', '__pycache__'))
        for label, rel, old, new in mutations:
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
    print(f'PASS: 4 restricted metadata records; stable 8/10/10/20 gates; {links} local references; '
          f'phase/feedback/intake contracts; synchronized F1-F3 exports; project paths; versions; '
          f'{words} skill words within budget; original paths and historical bytes retained.')
    for warning in warnings:
        print('KNOWN LIMIT: ' + warning)
    if args.self_test:
        print(f'PASS: {self_test(ROOT)} mutation self-tests rejected.')
    print('Source integrity only. Behavior trials, client installs and runtime verification require separate evidence.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
