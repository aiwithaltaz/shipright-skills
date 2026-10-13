#!/usr/bin/env python3
"""Safety rules that must survive the v1.0 rebuild, plus frozen historical evidence.

These replace the Phase 1 to 5 tests that pinned exact reference wording.
Each test removes or weakens one safety rule and expects the source checker to reject it.
Source checks are not behavior tests; controlled trials live under evals/v1/.
"""
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('v1_source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
CONTRACT = 'skills/_shared/operating-contract.md'

# (rule family, file, safe phrase, unsafe replacement)
SAFETY = [
    ('no invented facts', CONTRACT, 'Never invent brand values, data, features', 'Invent brand values, data, features when helpful'),
    ('no invented research', CONTRACT, 'Simulated participants never establish research findings', 'Simulated participants can establish research findings'),
    ('unknowns stay unknown', CONTRACT, 'unknown access, destructive effects and prices cannot become defaults', 'unknown access, destructive effects and prices can become defaults'),
    ('stay in scope', CONTRACT, 'Every visible feature', 'Any useful feature'),
    ('later ideas stay out of UI', CONTRACT, 'Save later-phase ideas as notes, not UI', 'Show later-phase ideas as disabled UI'),
    ('exact feedback becomes checks', CONTRACT, 'acceptance check', 'nice-to-have'),
    ('silence is not approval', CONTRACT, 'silence is not approval', 'silence counts as approval'),
    ('nothing ships without approval', CONTRACT, 'Readiness does not authorize deployment, publication, payment', 'Readiness authorizes deployment, publication, payment'),
    ('bounded questions', 'skills/_shared/intake.md', '0-5 questions total before starting', 'as many questions as needed'),
    ('launch check needs an artifact', 'skills/ship-check/SKILL.md', 'ask one question for that artifact and stop', 'fill the table from the idea'),
]


class V1Safeguards(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-v1-test-')
        cls.copy = Path(cls.tmp.name) / 'pack'
        shutil.copytree(ROOT, cls.copy, ignore=shutil.ignore_patterns('.git', '__pycache__', 'node_modules'))

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def errors(self):
        return checks.validate(self.copy)[0]

    def test_current_sources_pass(self):
        self.assertEqual([], self.errors())

    def test_safety_rules_cannot_be_removed(self):
        for family, rel, safe, unsafe in SAFETY:
            with self.subTest(rule=family):
                p = self.copy / rel
                original = p.read_bytes()
                self.assertIn(safe, original.decode(), f'{family}: safety phrase moved; update this test with its new owner')
                try:
                    p.write_text(original.decode().replace(safe, unsafe, 1))
                    self.assertTrue(self.errors(), f'unsafe change accepted: {family}')
                finally:
                    p.write_bytes(original)

    def test_four_statuses_and_gate_ids(self):
        contract = (self.copy / CONTRACT).read_text()
        for status in ('Pass', 'Fail', 'Not verified', 'Not applicable'):
            self.assertIn(f'| {status} |', contract)
        self.assertEqual({'product-design': 8, 'ui-ux-design': 10, 'ux-critique': 10, 'ship-check': 20}, checks.SKILLS)

    def test_historical_evidence_unchanged(self):
        data = json.loads((self.copy / 'evals/v1/historical-manifest.json').read_text())
        self.assertGreater(len(data['sha256']), 300)
        for rel, expected in data['sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / rel).read_bytes()).hexdigest())

    def test_verbatim_blueprint_is_kept(self):
        self.assertIn('docs/rebuild/BLUEPRINT.md', checks.VERBATIM_SOURCES)
        self.assertEqual(1, len(checks.VERBATIM_SOURCES), 'only user-supplied source files may skip pack style rules')


if __name__ == '__main__':
    unittest.main()
