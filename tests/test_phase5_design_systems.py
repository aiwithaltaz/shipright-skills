#!/usr/bin/env python3
"""Protect Phase 5 source/ownership contracts; controlled behavior remains separate."""
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('system_source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)


class DesignSystemRegressions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-system-test-')
        cls.copy = Path(cls.tmp.name) / 'pack'
        shutil.copytree(ROOT, cls.copy, ignore=shutil.ignore_patterns('.git', '__pycache__'))

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def reject(self, rel, old, new):
        p = self.copy / rel
        original = p.read_bytes()
        self.assertIn(old, original.decode())
        try:
            p.write_text(original.decode().replace(old, new, 1))
            self.assertTrue(checks.validate(self.copy)[0], f'unsafe system mutation accepted: {rel}')
        finally:
            p.write_bytes(original)

    def test_current_sources(self):
        self.assertEqual([], checks.validate(self.copy)[0])

    def test_direct_conditional_references(self):
        for name in ('design-foundations', 'design-system-governance', 'design-system-sources'):
            with self.subTest(reference=name):
                self.reject('skills/ui-ux-design/SKILL.md', f'[{name}.md](references/{name}.md)', f'`references/{name}.md`')

    def test_historical_evidence_unchanged(self):
        data = json.loads((self.copy / 'evals/phase-5-design-systems/source-manifest.json').read_text())
        for rel, expected in data['historical_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / rel).read_bytes()).hexdigest())

    def test_frozen_evaluation_criteria(self):
        data = json.loads((self.copy / 'evals/phase-5-design-systems/source-manifest.json').read_text())
        for rel, expected in data['evaluation_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / 'evals/phase-5-design-systems' / rel).read_bytes()).hexdigest())

    def test_other_entries_and_taste_preserved(self):
        data = json.loads((self.copy / 'evals/phase-5-design-systems/source-manifest.json').read_text())
        names = ['skills/product-design/SKILL.md', 'skills/ux-critique/SKILL.md', 'skills/ship-check/SKILL.md']
        names += [p for p in data['baseline_files'] if p.startswith('personal-taste/') or p.startswith('skills/_shared/')]
        for rel in names:
            with self.subTest(path=rel):
                self.assertEqual(data['baseline_files'][rel], hashlib.sha256((self.copy / rel).read_bytes()).hexdigest())

    def test_all_ten_foundations(self):
        text = (self.copy / 'skills/ui-ux-design/references/design-foundations.md').read_text()
        for name in ('Color', 'Typography', 'Spacing', 'Layout', 'Radius', 'Elevation', 'Icons', 'Imagery', 'Motion', 'Density'):
            self.assertIn(f'| {name} |', text)


def mutation_test(rel, old, new):
    def run(self):
        self.reject(rel, old, new)
    return run


for label, rel, old, new in checks.PHASE5_MUTATIONS:
    setattr(DesignSystemRegressions, 'test_' + label, mutation_test(rel, old, new))


if __name__ == '__main__':
    unittest.main(verbosity=2)
