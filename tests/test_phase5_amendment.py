#!/usr/bin/env python3
"""Phase 5.1 contracts: required system step, control names, and conditional loading."""
import importlib.util
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('system_source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
context_spec = importlib.util.spec_from_file_location('context_checks', ROOT / 'evals/check_context.py')
context = importlib.util.module_from_spec(context_spec)
context_spec.loader.exec_module(context)


class AmendmentRegressions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-amendment-test-')
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
            self.assertTrue(checks.validate(self.copy)[0], f'unsafe amendment mutation accepted: {rel}')
        finally:
            p.write_bytes(original)

    def test_removed_optional_labels(self):
        text = (self.copy / 'skills/ui-ux-design/SKILL.md').read_text()
        self.assertNotIn('No mandatory numeric design dials', text)
        self.assertNotIn('Optional system work', text)
        self.assertIn('Design system first', text)

    def test_new_refs_stay_off_screen_handoff(self):
        errors, policy, _ = context.check_structure(self.copy)
        self.assertEqual([], errors)
        _, _, report = context.check_tokens(self.copy, policy, context.token_counter())
        loaded = report['normal_paths']['ui-ux-design']['Screen handoff']['files']
        for name in ('component-vocabulary.md', 'component-choice.md', 'reference-systems.md'):
            self.assertNotIn(f'skills/ui-ux-design/references/{name}', loaded)
        self.assertIn(
            'skills/ui-ux-design/references/component-choice.md',
            report['normal_paths']['ui-ux-design']['Choosing controls']['files'])
        self.assertNotIn(
            'skills/ui-ux-design/references/reference-systems.md',
            report['normal_paths']['ui-ux-design']['Choosing controls']['files'])
        self.assertIn(
            'skills/ui-ux-design/references/reference-systems.md',
            report['normal_paths']['ui-ux-design']['New system references']['files'])
        self.assertLessEqual(report['normal_paths']['ui-ux-design']['Screen handoff']['tokens'], 12000)


def mutation_test(rel, old, new):
    def run(self):
        self.reject(rel, old, new)
    return run


for label, rel, old, new in checks.PHASE51_MUTATIONS:
    setattr(AmendmentRegressions, 'test_' + label, mutation_test(rel, old, new))


if __name__ == '__main__':
    unittest.main(verbosity=2)
