#!/usr/bin/env python3
"""Protect Phase 6 guidance and its boundaries; behavior trials remain separate."""
import hashlib
import importlib.util
import json
from pathlib import Path
import re
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('token_source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
ctxspec = importlib.util.spec_from_file_location('token_context', ROOT / 'evals/check_context.py')
context = importlib.util.module_from_spec(ctxspec)
ctxspec.loader.exec_module(context)

class TokenRegressions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-token-test-')
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
            self.assertTrue(checks.validate(self.copy)[0], f'unsafe token mutation accepted: {rel}')
        finally:
            p.write_bytes(original)
    def test_current_sources(self):
        self.assertEqual([], checks.validate(self.copy)[0])
    def test_direct_conditional_loading(self):
        for name in ('design-tokens','token-themes','token-implementation','token-sources'):
            with self.subTest(reference=name):
                self.reject('skills/ui-ux-design/SKILL.md', f'[{name}.md](references/{name}.md)', f'`references/{name}.md`')
    def test_limits_and_separate_paths(self):
        errors, policy, _ = context.check_structure(self.copy)
        self.assertEqual([],errors)
        self.assertEqual({'skill_tokens':4500,'shared_file_tokens':2000,'reference_tokens':4000,'normal_path_tokens':12000,'always_shared_tokens':3000,'shared_total_tokens':5000},policy['limits'])
        _, _, report = context.check_tokens(self.copy,policy,context.token_counter())
        paths = report['normal_paths']['ui-ux-design']
        loaded = paths['Screen handoff']['files']
        for name in ('design-tokens','token-themes','token-implementation','token-sources'):
            self.assertNotIn(f'skills/ui-ux-design/references/{name}.md',loaded)
        for task in ('Token record','Token theme mapping','Token implementation mapping','Token source review'):
            self.assertLessEqual(paths[task]['tokens'],12000)
        self.assertIn('skills/ui-ux-design/references/state-coverage.md',paths['Token theme mapping']['files'])
        self.assertIn('skills/ui-ux-design/references/motion.md',paths['Token theme mapping']['files'])
    def test_prior_evidence_and_frozen_criteria(self):
        data=json.loads((self.copy/'evals/phase-6-design-tokens/source-manifest.json').read_text())
        for rel,expected in data['historical_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected,hashlib.sha256((self.copy/rel).read_bytes()).hexdigest())
        for rel,expected in data['evaluation_files_sha256'].items():
            self.assertEqual(expected,hashlib.sha256((self.copy/'evals/phase-6-design-tokens'/rel).read_bytes()).hexdigest())
    def test_ivc_has_no_numeric_scale(self):
        text=(self.copy/'examples/ivc-2026-registration/token-worked-example.md').read_text()
        self.assertIn('pending from Altaz',text)
        self.assertIsNone(re.search(r'#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|rem|ms)\b',text))
    def test_raw_style_exception_is_hash_bound(self):
        errors,warnings,*_=checks.validate(self.copy)
        self.assertEqual([],errors)
        self.assertTrue(any('Phase 6 raw HTML' in w for w in warnings))
        self.reject('tests/fixtures/phase-6-design-tokens/after.html','sample illustration</title>','changed sample illustration</title>')
    def test_active_style_rule_still_rejects(self):
        self.reject('README.md','# ShipRight','# ShipRight '+chr(0x2014))
    def test_source_credits_and_no_component_contract(self):
        text=(self.copy/'skills/ui-ux-design/references/token-sources.md').read_text()
        for url in ('designtokens.org','atlassian.design','styledictionary.com','docs.tokens.studio'):
            self.assertIn(url,text)
        for rel in ('design-tokens','token-implementation'):
            self.assertIn('Component contracts remain Phase 7',(self.copy/f'skills/ui-ux-design/references/{rel}.md').read_text())

def mutation_test(rel,old,new):
    def run(self): self.reject(rel,old,new)
    return run
for label,rel,old,new in checks.PHASE6_MUTATIONS:
    setattr(TokenRegressions,'test_'+label,mutation_test(rel,old,new))
if __name__ == '__main__': unittest.main(verbosity=2)
