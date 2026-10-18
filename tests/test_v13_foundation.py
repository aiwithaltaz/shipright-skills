#!/usr/bin/env python3
"""Phase 1 spine: routes, template headings, word budgets, crawl, and the record check."""
import importlib.util
import json
import os
import re
import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills/shipright'
SPEC = importlib.util.spec_from_file_location('context_checks', ROOT / 'evals/check_context.py')
CONTEXT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(CONTEXT)

ROUTES = {
    'I want to build a LinkedIn automation app': '01-research.md',
    'I want to build a dashboard for a company with many AI agents': '01-research.md',
    'I want to build a SaaS software': '01-research.md',
    'I want to build a website': '01-research.md',
    'I want a premium 3D website for my product': '01-research.md',
    'Rebuild the screen with these changes': 'feedback-round.md',
}


def headings(text):
    return [line[3:].strip() for line in text.splitlines() if line.startswith('## ')]


def node_env():
    """Find a local Playwright install. Do not assume one machine path."""
    parts = [os.environ.get('NODE_PATH', '')]
    for raw in ('/workspace/node_modules', '/opt/node22/lib/node_modules',
                '/opt/app-template/node_modules', '/usr/lib/node_modules'):
        base = Path(raw)
        if (base / 'playwright' / 'package.json').exists() or (base / 'playwright-core' / 'package.json').exists():
            parts.append(str(base))
    return dict(os.environ, NODE_PATH=os.pathsep.join(dict.fromkeys(p for p in parts if p)))


class FoundationTests(unittest.TestCase):
    def test_six_messages_route_to_the_named_stage(self):
        text = (SKILL / 'SKILL.md').read_text(encoding='utf-8')
        for message, stage in ROUTES.items():
            row = next(line for line in text.splitlines() if message in line)
            self.assertIn(stage, row, message)

    def test_stage_required_headings_exist(self):
        for stage in sorted((SKILL / 'stages').glob('*.md')):
            text = stage.read_text(encoding='utf-8')
            for line in text.splitlines():
                match = re.match(r'Required headings(?: in ([^:]+))?:\s*(.+)', line)
                if not match:
                    continue
                named, rest = match.group(1), match.group(2).rstrip('.')
                wanted = [part.strip() for part in rest.split(',') if part.strip()]
                if named:
                    found = list((SKILL / 'templates').rglob(named.strip()))
                    self.assertTrue(found, f'{stage.name} names missing file {named}')
                    body = found[0].read_text(encoding='utf-8')
                else:
                    earlier = text[:text.index(line)]
                    links = re.findall(r'\[[^\]]*\]\(([^)\s]+\.md)\)', earlier)
                    self.assertTrue(links, f'{stage.name} has headings with no template link')
                    body = (stage.parent / links[-1]).read_text(encoding='utf-8')
                got = headings(body)
                for heading in wanted:
                    self.assertIn(heading, got, f'{stage.name} -> {heading}')

    def test_facts_ladder_and_word_budgets(self):
        contract = (SKILL / 'modes/_shared/operating-contract.md').read_text(encoding='utf-8')
        for kind in ('Supplied', 'Verified', 'Assumed', 'Sample', 'Illustrative'):
            self.assertIn(f'| {kind} |', contract)
        self.assertIn('Never invent facts, brand values, data, or features.', (SKILL / 'SKILL.md').read_text(encoding='utf-8'))
        errors, _, _ = CONTEXT.check_structure(ROOT)
        self.assertEqual([], errors)

    def test_zip_file_list_includes_scripts_and_templates(self):
        spec = importlib.util.spec_from_file_location('release_skill', ROOT / 'scripts/release_skill.py')
        release = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(release)
        names = {'shipright/' + path.relative_to(SKILL).as_posix() for path in release.skill_files()}
        for rel in (
            'shipright/scripts/check-ui.mjs',
            'shipright/scripts/crawl.mjs',
            'shipright/templates/research-brief.md',
            'shipright/patterns/README.md',
            'shipright/blocks/README.md',
        ):
            self.assertIn(rel, names)

    def test_check_record_rejects_templates_and_accepts_current(self):
        with tempfile.TemporaryDirectory() as tmp:
            record = Path(tmp) / 'record'
            shutil.copytree(SKILL / 'templates/record', record)
            fail = subprocess.run(['node', str(SKILL / 'scripts/check-record.mjs'), str(record)],
                                  capture_output=True, text=True)
            self.assertEqual(1, fail.returncode, fail.stderr)
            self.assertIn('still a template', fail.stderr)
            for path in record.glob('*.md'):
                path.write_text(path.read_text(encoding='utf-8').replace('Status: template', 'Status: current', 1),
                                encoding='utf-8')
            ok = subprocess.run(['node', str(SKILL / 'scripts/check-record.mjs'), str(record)],
                                capture_output=True, text=True)
            self.assertEqual(0, ok.returncode, ok.stderr)

    def test_crawl_finds_c7_sign_in_desk_registrations_and_reports(self):
        app = ROOT / 'evals/v2/cases/c7-ivc-app/app/index.html'
        with tempfile.TemporaryDirectory() as tmp:
            proc = subprocess.run(
                ['node', str(SKILL / 'scripts/crawl.mjs'), str(app), '--out', tmp, '--json'],
                capture_output=True, text=True, timeout=90, env=node_env(),
            )
            self.assertEqual(0, proc.returncode, proc.stderr[-2000:])
            report = json.loads(proc.stdout)
        blob = json.dumps(report).lower()
        self.assertIn('celebration of service', blob)
        self.assertIn('welcome to the desk', blob)
        self.assertIn('#registrations', blob)
        self.assertIn('#reports', blob)
        self.assertTrue(any('accounted for' in (screen.get('h1') or '').lower() for screen in report['screens']))
        self.assertTrue(any(screen.get('signed_in') is False for screen in report['screens']))
        self.assertTrue(any(screen.get('signed_in') is True for screen in report['screens']))


if __name__ == '__main__':
    unittest.main()
