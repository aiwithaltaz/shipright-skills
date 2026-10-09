#!/usr/bin/env python3
"""Phase 1 source regressions. No claims about model semantics or user research."""
import importlib.util
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
BASE = 'skills/product-design/references/'


class ResearchRegressions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-research-test-')
        cls.copy = Path(cls.tmp.name) / 'pack'
        shutil.copytree(ROOT, cls.copy, ignore=shutil.ignore_patterns('.git', '__pycache__'))

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def reject(self, path, old, new):
        target = self.copy / path
        original = target.read_bytes()
        self.assertIn(old, original.decode(), 'mutation fixture drifted')
        try:
            target.write_text(original.decode().replace(old, new, 1))
            errors, _, _, _ = checks.validate(self.copy)
            self.assertTrue(errors, f'accepted unsafe mutation in {path}')
        finally:
            target.write_bytes(original)

    def test_current_sources(self):
        errors, _, _, words = checks.validate(self.copy)
        self.assertEqual([], errors)
        self.assertLessEqual(words, 16000)

    def test_references_are_direct_links(self):
        for name in ('research-evidence', 'research-methods', 'research-planning', 'research-sources'):
            with self.subTest(reference=name):
                self.reject('skills/product-design/SKILL.md',
                            f'[{name}.md](references/{name}.md)', f'`references/{name}.md`')

    def test_reports_do_not_become_observations(self):
        self.reject(BASE + 'research-evidence.md', 'not an observed action', 'an observed action')

    def test_simulation_does_not_become_research(self):
        self.reject('skills/_shared/operating-contract.md',
                    'Simulated participants never establish research findings',
                    'Simulated participants establish research findings')

    def test_plans_are_not_performed_studies(self):
        self.reject(BASE + 'research-planning.md', 'mark the plan unperformed', 'claim sessions happened')

    def test_plan_does_not_authorize_messages(self):
        self.reject('skills/_shared/intake.md',
                    'Plans do not authorize recruitment, recording, payment or messages',
                    'Plans authorize messages and recruitment')

    def test_guide_is_not_founder_intake(self):
        self.reject('skills/_shared/intake.md',
                    'Participant-guide questions are deliverables, not founder intake',
                    'Participant guides require another intake')

    def test_no_universal_sample_size(self):
        self.reject(BASE + 'research-planning.md', 'no universal five-user rule', 'always test five users')

    def test_mobile_evidence_limits(self):
        self.reject(BASE + 'research-methods.md',
                    'do not generalize desktop evidence to mobile', 'desktop evidence proves mobile usability')

    def test_prompted_completion_is_not_independent(self):
        self.reject(BASE + 'research-planning.md',
                    'Record independent completion before verification prompts; prompted recovery is assisted',
                    'All prompted completion is independent')

    def test_missing_artifact_is_not_supplied_content(self):
        self.reject('skills/product-design/SKILL.md',
                    'Missing artifact content stays Unknown', 'Invent invoice content when missing')

    def test_paywall_is_not_inspected_evidence(self):
        self.reject(BASE + 'research-sources.md',
                    'Unavailable/paywalled text stays uninspected', 'Paywalled text counts as inspected')

    def test_synthesis_is_deferred(self):
        self.reject(BASE + 'research-evidence.md',
                    'grouping/synthesis belongs to Phase 2', 'automatically generate validated personas')


if __name__ == '__main__':
    unittest.main(verbosity=2)
