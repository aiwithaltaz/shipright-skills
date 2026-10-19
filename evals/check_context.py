#!/usr/bin/env python3
"""Validate bounded context and direct reference routing.

Structure checks use only the standard library. Token checks require the pinned
package and encoding; missing dependencies are a failure, never an estimated Pass.
Counts are guidance only, excluding conversation, user artifacts and tool results.
"""
import argparse
import importlib.metadata
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKILLS = {'product-design', 'ui-ux-design', 'ux-critique', 'ship-check', 'build-pack'}
# One installable skill. The five names stay as modes and keep their own entry budgets.
SKILL_ROOT = 'skills/shipright'
MODE_ROOT = f'{SKILL_ROOT}/modes'
ROUTER = f'{SKILL_ROOT}/SKILL.md'
# Spine added in 1.3. These files are guidance, not mode references, so they keep their own word budgets.
EXTRA_PREFIXES = (
    f'{SKILL_ROOT}/stages/',
    f'{SKILL_ROOT}/templates/',
    f'{SKILL_ROOT}/patterns/',
    f'{SKILL_ROOT}/blocks/',
    f'{SKILL_ROOT}/taste/',
)
WORD_BUDGETS = {
    'router_words': 1600,
    'stage_words': 1200,
    'template_words': 600,
    'pattern_words': 1500,
    'block_doc_words': 400,
    'taste_words': 1200,
    'stage_path_words': 5000,
}
# Pre-1.1 path. Frozen example links still use it. The file is a redirect, not guidance.
REDIRECT_STUBS = {'skills/ui-ux-design/references/operator-workspaces.md'}
LIMITS = {'skill_tokens': 4500, 'shared_file_tokens': 2000, 'reference_tokens': 4000,
          'normal_path_tokens': 12000, 'always_shared_tokens': 3000, 'shared_total_tokens': 5000}
ALWAYS = {f'{MODE_ROOT}/_shared/operating-contract.md', f'{MODE_ROOT}/_shared/intake.md'}
TOKENIZER = {'package': 'tiktoken', 'version': '0.12.0', 'encoding': 'cl100k_base'}


def links(root, path):
    """Return local Markdown link targets, excluding fenced examples and URLs."""
    text = re.sub(r'```.*?```', '', path.read_text(encoding='utf-8'), flags=re.S)
    found = set()
    for target in re.findall(r'!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)', text):
        if re.match(r'[a-z][a-z0-9+.-]*:', target, re.I):
            continue
        base = target.split('#')[0]
        resolved = (path.parent / base).resolve() if base else path.resolve()
        if not resolved.is_relative_to(root.resolve()) or not resolved.is_file():
            raise ValueError(f'{path.relative_to(root)}: broken or external local link {target}')
        found.add(resolved.relative_to(root.resolve()).as_posix())
    return found


def check_structure(root):
    """Validate policy without a tokenizer. Return errors, policy, link inventory."""
    root = root.resolve()
    errors, inventory = [], {}
    try:
        policy = json.loads((root / 'evals/context-policy.json').read_text())
        if policy['schema_version'] != 1 or policy['limits'] != LIMITS or policy['tokenizer'] != TOKENIZER:
            errors.append('context-policy: changed schema, approved limits or pinned tokenizer')
        if policy.get('v13_layout') != WORD_BUDGETS:
            errors.append('context-policy: 1.3 word budgets changed or missing')
        if set(policy['skills']) != SKILLS:
            errors.append('context-policy: skill inventory must match the five protected skills')
        if set(policy['always_loaded_shared']) != ALWAYS or len(policy['always_loaded_shared']) != len(ALWAYS):
            errors.append('context-policy: contract and intake must remain always loaded once')
        ownership = policy['ownership']
        if not all(ownership.get(k) for k in ('shared', 'references', 'exceptions')):
            errors.append('context-policy: canonical ownership and fallback/export exceptions required')
        references = {p.relative_to(root).as_posix() for p in (root / 'skills').rglob('references/*.md')}
        # Catch deeper files too, so moving guidance cannot evade limits/inventory.
        references |= {p.relative_to(root).as_posix() for p in (root / 'skills').rglob('*.md') if 'references' in p.parts}
        references -= REDIRECT_STUBS
        references = {ref for ref in references if not ref.startswith(EXTRA_PREFIXES)}
        shared = {p.relative_to(root).as_posix() for p in (root / MODE_ROOT / '_shared').rglob('*.md')}
        mode_entries = {f'{MODE_ROOT}/{s}/MODE.md' for s in SKILLS}
        all_md = {p.relative_to(root).as_posix() for p in (root / 'skills').rglob('*.md')} - REDIRECT_STUBS
        extra = {p for p in all_md if p.startswith(EXTRA_PREFIXES)}
        classified = references | shared | mode_entries | {ROUTER} | extra
        if all_md != classified:
            errors.append(f'context-policy: unclassified skill Markdown: {sorted(all_md - classified)}')
        for ref in references:
            parts = Path(ref).parts
            # skills/shipright/modes/<mode>/references/<file>.md
            if not (len(parts) == 6 and parts[1] == 'shipright' and parts[2] == 'modes'
                    and parts[3] in SKILLS and parts[4] == 'references'):
                errors.append(f'{ref}: reference must live directly in its canonical skill/references folder')
        consumed = set()
        for name, config in policy['skills'].items():
            entry = f'{MODE_ROOT}/{name}/MODE.md'
            if config['entry'] != entry:
                errors.append(f'{name}: invalid entry path')
            entry_text = (root / entry).read_text()
            direct = links(root, root / entry)
            inventory[name] = sorted(direct)
            required = config['required_shared']
            expected_shared = ALWAYS | (set() if name == 'ship-check' else {f'{MODE_ROOT}/_shared/flow-rules.md'})
            if set(required) != expected_shared or len(required) != len(set(required)):
                errors.append(f'{name}: required shared rules changed or duplicated')
            if not set(required) <= direct:
                errors.append(f'{name}: required shared rules must link directly')
            conditional = config['conditional_references']
            if set(conditional) != direct & references:
                errors.append(f'{name}: conditional reference inventory differs from direct entry links')
            for ref, condition in conditional.items():
                when = condition['when']
                # This validates explicit routing text, not its semantic suitability.
                if not isinstance(when, str) or len(when.strip()) < 12 or when not in entry_text:
                    errors.append(f'{name}: missing visible loading condition for {ref}')
                consumed.add(ref)
                for target in links(root, root / ref) & references:
                    if target not in direct:
                        errors.append(f'{name}: chained-only reference {target} through {ref}')
            paths = config['normal_paths']
            if not paths:
                errors.append(f'{name}: at least one declared normal loading path is required')
            tasks = set()
            for path in paths:
                if not path['task'].strip() or path['task'] in tasks:
                    errors.append(f'{name}: empty or duplicate normal path task')
                tasks.add(path['task'])
                selected = path['references']
                if len(selected) != len(set(selected)):
                    errors.append(f'{name}/{path["task"]}: duplicate loading path files')
                allowed = set(conditional) | shared
                if not set(selected) <= allowed or not set(selected) <= direct:
                    errors.append(f'{name}/{path["task"]}: path files must be direct conditional/shared links')
        if references - consumed:
            errors.append(f'context-policy: orphan references: {sorted(references - consumed)}')
        errors.extend(check_word_budgets(root, extra))
    except (OSError, UnicodeError, ValueError, KeyError, TypeError, AttributeError) as exc:
        errors.append(f'context-policy: cannot validate ({type(exc).__name__}: {exc})')
        return errors, {}, inventory
    return errors, policy, inventory


def word_count(text):
    return len(text.split())


def check_word_budgets(root, extra):
    """1.3 word budgets. These sit beside the frozen token LIMITS. They do not raise them.

    A stage path is SKILL.md plus that stage plus the Markdown templates and patterns it links.
    More than two small templates is allowed. The path still has to stay under stage_path_words.
    At most one pattern. Record files count when the stage links them.
    """
    errors = []
    router_text = (root / ROUTER).read_text(encoding='utf-8')
    router_words = word_count(router_text)
    if router_words > WORD_BUDGETS['router_words']:
        errors.append(f'{ROUTER}: {router_words} words exceeds {WORD_BUDGETS["router_words"]}')

    def cap_key(rel):
        if '/stages/' in rel:
            return 'stage_words'
        if '/templates/' in rel:
            return 'template_words'
        if '/patterns/' in rel:
            return 'pattern_words'
        if '/blocks/' in rel:
            return 'block_doc_words'
        if '/taste/' in rel:
            return 'taste_words'
        return None

    for rel in sorted(extra):
        key = cap_key(rel)
        if key is None:
            continue
        count = word_count((root / rel).read_text(encoding='utf-8'))
        if count > WORD_BUDGETS[key]:
            errors.append(f'{rel}: {count} words exceeds {WORD_BUDGETS[key]}')

    for rel in sorted(p for p in extra if '/stages/' in p):
        stage_path = root / rel
        linked = links(root, stage_path)
        templates = [t for t in sorted(linked) if '/templates/' in t and t.endswith('.md')]
        patterns = [t for t in sorted(linked) if '/patterns/' in t and t.endswith('.md')]
        if len(patterns) > 1:
            errors.append(f'{rel}: at most one pattern on a stage path, linked {patterns}')
        total = router_words + word_count(stage_path.read_text(encoding='utf-8'))
        for item in templates + patterns:
            total += word_count((root / item).read_text(encoding='utf-8'))
        if total > WORD_BUDGETS['stage_path_words']:
            errors.append(
                f'{rel}: stage path is {total} words, over {WORD_BUDGETS["stage_path_words"]} '
                f'(SKILL + stage + {len(templates)} templates + {len(patterns)} patterns)'
            )
    return errors


def token_counter():
    try:
        version = importlib.metadata.version('tiktoken')
        if version != TOKENIZER['version']:
            raise RuntimeError(f'tiktoken {version}; required {TOKENIZER["version"]}')
        import tiktoken
        encoding = tiktoken.get_encoding(TOKENIZER['encoding'])
        return lambda text: len(encoding.encode(text, disallowed_special=()))
    except (ImportError, importlib.metadata.PackageNotFoundError) as exc:
        raise RuntimeError('install evals/requirements-context.txt before token checks') from exc


def check_tokens(root, policy, count):
    errors, warnings, sizes, paths = [], [], {}, {}
    for p in sorted((root / 'skills').rglob('*.md')):
        rel = p.relative_to(root).as_posix()
        if rel in REDIRECT_STUBS:
            continue
        sizes[rel] = count(p.read_text(encoding='utf-8'))
        kind = ('skill_tokens' if p.name in {'SKILL.md', 'MODE.md'} else
                'shared_file_tokens' if '_shared' in p.parts else 'reference_tokens')
        if sizes[rel] > LIMITS[kind]:
            errors.append(f'{rel}: {sizes[rel]} tokens exceeds {LIMITS[kind]}')
    always = sum(sizes[p] for p in policy['always_loaded_shared'])
    total_shared = sum(n for p, n in sizes.items() if p.startswith(f'{MODE_ROOT}/_shared/'))
    for label, actual, limit in [('always-loaded shared', always, LIMITS['always_shared_tokens']),
                                 ('shared folder', total_shared, LIMITS['shared_total_tokens'])]:
        if actual > limit:
            errors.append(f'{label}: {actual} tokens exceeds {limit}')
    for name, config in policy['skills'].items():
        paths[name] = {}
        for path in config['normal_paths']:
            loaded = set([config['entry']] + config['required_shared'] + path['references'])
            # Conservatively count linked guidance dependencies, including cross-skill
            # reminders. Do not expand the entry's entire conditional catalog.
            queue = list(path['references'])
            expanded = set()
            while queue:
                ref = queue.pop()
                if ref in expanded:
                    continue
                expanded.add(ref)
                if '/references/' not in ref:
                    continue
                for dependency in links(root, root / ref):
                    if dependency in sizes and dependency not in loaded:
                        loaded.add(dependency)
                        queue.append(dependency)
            total = sum(sizes[p] for p in loaded)
            paths[name][path['task']] = {'tokens': total, 'files': sorted(loaded)}
            if total > LIMITS['normal_path_tokens']:
                errors.append(f'{name}/{path["task"]}: {total} tokens exceeds {LIMITS["normal_path_tokens"]}')
        stored = sum(sizes[p] for p in config['conditional_references'])
        if stored > policy['review_thresholds']['skill_reference_tokens']:
            warnings.append(f'{name}: {stored} stored reference tokens; review topic ownership and routing')
    files = [p for p in root.rglob('*') if p.is_file() and '.git' not in p.relative_to(root).parts
             and '__pycache__' not in p.relative_to(root).parts]
    repo_bytes = sum(p.stat().st_size for p in files)
    if repo_bytes > policy['review_thresholds']['repository_bytes']:
        warnings.append(f'repository: {repo_bytes} bytes; review assets (no global cap)')
    for p in files:
        if p.stat().st_size > policy['review_thresholds']['asset_bytes']:
            warnings.append(f'{p.relative_to(root)}: large file; review necessity (no size failure)')
    return errors, warnings, {'tokenizer': TOKENIZER, 'files': sizes, 'normal_paths': paths,
                              'always_shared_tokens': always, 'shared_total_tokens': total_shared,
                              'stored_skill_tokens': sum(sizes.values()), 'repository_bytes': repo_bytes}


DEALT_TOKENS = 1200  # 1.4 dealer cap per stage; kept here so the approved policy limits stay unchanged.


def check_dealt(root, policy, count, report):
    """1.4: the dealer output is the only part of the card library that enters context. Cap it per stage."""
    import shutil, subprocess
    dealer = root / 'skills/shipright/scripts/deal.mjs'
    limit = DEALT_TOKENS
    if not dealer.exists():
        return []
    if not shutil.which('node'):
        return ['dealt output: node is required to measure deal.mjs']
    errors, sizes = [], {}
    for stage in ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10']:
        out = subprocess.run(['node', str(dealer), '--stage', stage, '--n', '8', '--tags', 'landing,saas,dashboard,app,mobile,motion,3d'],
                             capture_output=True, text=True, timeout=60)
        if out.returncode:
            errors.append(f'deal.mjs --stage {stage}: exit {out.returncode}')
            continue
        sizes[stage] = count(out.stdout)
        if sizes[stage] > limit:
            errors.append(f'deal.mjs --stage {stage}: {sizes[stage]} tokens > {limit}')
    report['dealt_tokens'] = sizes
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=ROOT)
    parser.add_argument('--json', action='store_true')
    args = parser.parse_args()
    errors, policy, inventory = check_structure(args.root)
    warnings, report = [], {'direct_links': inventory}
    if not errors:
        try:
            count = token_counter()
            token_errors, warnings, report = check_tokens(args.root, policy, count)
            errors.extend(token_errors)
            report['direct_links'] = inventory
            errors.extend(check_dealt(args.root, policy, count, report))
        except Exception as exc:
            errors.append(f'token check unavailable: {type(exc).__name__}: {exc}')
    report.update(status='Fail' if errors else 'Pass', errors=errors, warnings=warnings)
    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print(('FAIL' if errors else 'PASS') + ': bounded context and direct conditional references')
        for line in errors + warnings:
            print(line)
        if not errors:
            print(f'{TOKENIZER}: {len(report["files"])} files; always shared {report["always_shared_tokens"]}; '
                  f'all shared {report["shared_total_tokens"]}; no global knowledge cap.')
            if report.get('dealt_tokens'):
                print(f'dealt cards: largest stage {max(report["dealt_tokens"].values())}/{DEALT_TOKENS} tokens')
            for name, paths in report['normal_paths'].items():
                print(f'{name}: largest declared normal path {max(p["tokens"] for p in paths.values())}/12000 tokens')
        print('Static declarations do not guarantee client loading or universal provider token counts.')
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())
