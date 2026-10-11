#!/usr/bin/env python3
"""Context policy regressions, using real token counts and controlled mutations."""
import importlib.util
from pathlib import Path
import json
import shutil
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('context_checks', ROOT / 'evals/check_context.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)


class ContextPolicyTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.count = staticmethod(checks.token_counter())
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-context-tests-')
        cls.copy = Path(cls.tmp.name) / 'pack'
        shutil.copytree(ROOT, cls.copy, ignore=shutil.ignore_patterns('.git', '__pycache__'))

    @classmethod
    def tearDownClass(cls):
        cls.tmp.cleanup()

    def setUp(self):
        self.restores = {}
        self.policy = json.loads((self.copy / 'evals/context-policy.json').read_text())

    def tearDown(self):
        for p, old in self.restores.items():
            if old is None:
                p.unlink()
            else:
                p.write_bytes(old)

    def write(self, rel, text):
        p = self.copy / rel
        self.restores.setdefault(p, p.read_bytes() if p.exists() else None)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(text)

    def policy_write(self):
        self.write('evals/context-policy.json', json.dumps(self.policy))

    def mutate(self, rel, old, new):
        text = (self.copy / rel).read_text()
        self.assertIn(old, text)
        self.write(rel, text.replace(old, new, 1))

    def structure(self):
        return checks.check_structure(self.copy)[0]

    def tokens(self, count=None):
        return checks.check_tokens(self.copy, self.policy, count or self.count)[0]

    def assert_error(self, errors, text):
        self.assertTrue(any(text in e for e in errors), errors)

    def exact_text(self, tokens):
        text = ' x' * tokens
        self.assertEqual(tokens, self.count(text))
        return text

    def test_current_policy(self):
        self.assertEqual([], self.structure())
        self.assertEqual([], self.tokens())

    def test_skill_boundary(self):
        rel = 'skills/product-design/SKILL.md'
        self.write(rel, self.exact_text(4500))
        self.assertEqual([], self.tokens())
        self.write(rel, self.exact_text(4501))
        self.assert_error(self.tokens(), rel)

    def shared_boundary_headroom(self):
        # Isolate a shared-rule threshold from unrelated path-total thresholds.
        for name in ('layout-and-hierarchy', 'icons-and-placement'):
            self.write(f'skills/ui-ux-design/references/{name}.md', self.exact_text(100))

    def test_shared_file_boundary(self):
        self.shared_boundary_headroom()
        rel = 'skills/_shared/output-folder.md'
        self.write(rel, self.exact_text(2000))
        self.assertEqual([], self.tokens())
        self.write(rel, self.exact_text(2001))
        self.assert_error(self.tokens(), rel)

    def test_reference_boundary(self):
        rel = 'skills/product-design/references/opportunity-research.md'
        self.write(rel, self.exact_text(4000))
        self.assertEqual([], self.tokens())
        self.write(rel, self.exact_text(4001))
        self.assert_error(self.tokens(), rel)

    def test_normal_path_boundary(self):
        config = self.policy['skills']['product-design']
        selected = config['normal_paths'][1]['references']
        sizes = {p.relative_to(self.copy).as_posix(): self.count(p.read_text())
                 for p in (self.copy / 'skills').rglob('*.md')}
        base = sum(sizes[p] for p in [config['entry']] + config['required_shared'])
        # Spread the exact remaining allowance across individually valid files.
        remainder = 12000 - base
        for p in selected:
            amount = min(2500, remainder)
            self.write(p, self.exact_text(amount))
            remainder -= amount
        self.assertEqual(0, remainder)
        self.assertEqual([], self.tokens())
        self.write(selected[-1], (self.copy / selected[-1]).read_text() + ' x')
        self.assert_error(self.tokens(), 'exceeds 12000')

    def test_always_shared_boundary(self):
        self.shared_boundary_headroom()
        for p in checks.ALWAYS:
            self.write(p, self.exact_text(1500))
        self.assertEqual([], self.tokens())
        self.write('skills/_shared/intake.md', self.exact_text(1501))
        self.assert_error(self.tokens(), 'always-loaded shared')

    def test_shared_folder_boundary(self):
        self.shared_boundary_headroom()
        for p in checks.ALWAYS:
            self.write(p, self.exact_text(1000))
        self.write('skills/_shared/flow-rules.md', self.exact_text(1500))
        self.write('skills/_shared/output-folder.md', self.exact_text(1500))
        self.assertEqual([], self.tokens())
        self.write('skills/_shared/output-folder.md', self.exact_text(1501))
        self.assert_error(self.tokens(), 'shared folder')

    def test_broken_link(self):
        self.mutate('skills/ui-ux-design/SKILL.md', '(references/motion.md)', '(references/absent.md)')
        self.assert_error(self.structure(), 'broken')

    def test_orphan_reference(self):
        self.write('skills/product-design/references/orphan.md', '# Orphan\n')
        self.assert_error(self.structure(), 'orphan references')

    def test_nested_reference(self):
        self.write('skills/product-design/references/deep/nested.md', '# Nested\n')
        self.assert_error(self.structure(), 'directly in its canonical')

    def test_hidden_markdown(self):
        self.write('skills/product-design/hidden.md', '# Hidden guidance\n')
        self.assert_error(self.structure(), 'unclassified')

    def test_indirect_only_reference(self):
        self.mutate('skills/ui-ux-design/SKILL.md',
                    '| Available implementation evidence | [bounded-verification.md](../ux-critique/references/bounded-verification.md) |', '')
        del self.policy['skills']['ui-ux-design']['conditional_references']['skills/ux-critique/references/bounded-verification.md']
        self.policy_write()
        self.assert_error(self.structure(), 'chained-only')

    def test_missing_condition(self):
        self.policy['skills']['product-design']['conditional_references']['skills/product-design/references/research-evidence.md']['when'] = ''
        self.policy_write()
        self.assert_error(self.structure(), 'loading condition')

    def test_missing_required_shared(self):
        self.policy['skills']['ship-check']['required_shared'] = []
        self.policy_write()
        self.assert_error(self.structure(), 'required shared rules')

    def test_unknown_path_file(self):
        self.policy['skills']['ship-check']['normal_paths'][0]['references'].append('README.md')
        self.policy_write()
        self.assert_error(self.structure(), 'path files must be direct')

    def test_duplicate_path_file(self):
        path = self.policy['skills']['ship-check']['normal_paths'][0]
        path['references'] += path['references'][:1]
        self.policy_write()
        self.assert_error(self.structure(), 'duplicate loading path')

    def test_normal_paths_required(self):
        self.policy['skills']['ship-check']['normal_paths'] = []
        self.policy_write()
        self.assert_error(self.structure(), 'at least one declared')

    def test_limits_cannot_be_relaxed(self):
        self.policy['limits']['skill_tokens'] = 5000
        self.policy_write()
        self.assert_error(self.structure(), 'approved limits')

    def test_tokenizer_cannot_drift(self):
        self.policy['tokenizer']['encoding'] = 'o200k_base'
        self.policy_write()
        self.assert_error(self.structure(), 'pinned tokenizer')

    def test_missing_dependency_is_failure(self):
        with patch.object(checks.importlib.metadata, 'version', side_effect=checks.importlib.metadata.PackageNotFoundError):
            with self.assertRaisesRegex(RuntimeError, 'install'):
                checks.token_counter()

    def test_wrong_dependency_version_is_failure(self):
        with patch.object(checks.importlib.metadata, 'version', return_value='0.0.0'):
            with self.assertRaisesRegex(RuntimeError, 'required'):
                checks.token_counter()

    def test_counter_includes_full_markdown(self):
        text = '---\nname: test\n---\n# Heading\n[link](reference.md)\n```css\na { color: red; }\n```\n'
        self.assertGreater(self.count(text), self.count('# Heading'))

    def test_larger_collection_has_no_global_cap(self):
        entry = 'skills/product-design/SKILL.md'
        text = (self.copy / entry).read_text()
        refs = self.policy['skills']['product-design']['conditional_references']
        for i in range(8):
            rel = f'skills/product-design/references/growth-{i}.md'
            self.write(rel, self.exact_text(3000))
            line = f'For growth topic {i} only, read [growth-{i}.md](references/growth-{i}.md).'
            refs[rel] = {'when': line}
            text += '\n' + line
        self.write(entry, text)
        self.policy_write()
        words = sum(len(p.read_text().split()) for p in (self.copy / 'skills').rglob('*.md'))
        self.assertGreater(words, 16000)
        self.assertEqual([], self.structure())
        self.assertEqual([], self.tokens())

    def test_shared_rules_count_once_per_path(self):
        path = self.policy['skills']['product-design']['normal_paths'][0]
        path['references'].append('skills/_shared/intake.md')
        errors, _, report = checks.check_tokens(self.copy, self.policy, self.count)
        loaded = report['normal_paths']['product-design'][path['task']]
        self.assertEqual([], errors)
        self.assertEqual(len(loaded['files']), len(set(loaded['files'])))

    def test_linked_dependencies_are_counted(self):
        _, _, report = checks.check_tokens(self.copy, self.policy, self.count)
        loaded = report['normal_paths']['ui-ux-design']['Screen handoff']['files']
        self.assertIn('skills/ux-critique/references/slop-tells.md', loaded)
        self.assertIn('skills/ux-critique/references/bounded-verification.md', loaded)
        self.assertIn('skills/_shared/output-folder.md', loaded)

    def test_linked_dependency_can_exceed_path_budget(self):
        rel = 'skills/ux-critique/references/slop-tells.md'
        text = (self.copy / rel).read_text()
        self.write(rel, text + self.exact_text(1600))
        self.assert_error(self.tokens(), 'ui-ux-design/Screen handoff')

    def test_canonical_ownership_required(self):
        self.policy['ownership']['references'] = ''
        self.policy_write()
        self.assert_error(self.structure(), 'canonical ownership')

    def test_malformed_policy_fails_cleanly(self):
        self.write('evals/context-policy.json', '{bad')
        self.assert_error(self.structure(), 'cannot validate')


if __name__ == '__main__':
    unittest.main(verbosity=2)
