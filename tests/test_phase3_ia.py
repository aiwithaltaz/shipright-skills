#!/usr/bin/env python3
"""Phase 3 source protections; no real-user, security or model benchmark claim."""
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('ia_source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
BASE = 'skills/product-design/references/'

class IARegressions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-ia-test-')
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
            self.assertTrue(checks.validate(self.copy)[0], f'unsafe IA mutation accepted: {rel}')
        finally:
            p.write_bytes(original)
    def test_current_sources(self):
        self.assertEqual([], checks.validate(self.copy)[0])
    def test_direct_conditional_references(self):
        for name in ('information-architecture', 'findability', 'roles-and-navigation', 'ia-research', 'ia-sources'):
            with self.subTest(reference=name):
                self.reject('skills/product-design/SKILL.md', f'[{name}.md](references/{name}.md)', f'`references/{name}.md`')
    def test_historical_evidence_unchanged(self):
        data = json.loads((self.copy / 'evals/phase-3-information-architecture/source-manifest.json').read_text())
        for rel, expected in data['historical_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / rel).read_bytes()).hexdigest())
    def test_evaluation_criteria_unchanged(self):
        data = json.loads((self.copy / 'evals/phase-3-information-architecture/source-manifest.json').read_text())
        for rel, expected in data['evaluation_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / 'evals/phase-3-information-architecture' / rel).read_bytes()).hexdigest())
    def test_optional_ia(self):
        self.reject('skills/product-design/SKILL.md', 'Skip IA for clear corrections or sufficient existing structure', 'Always run IA for every correction')
    def test_framing_first(self):
        self.reject('skills/product-design/references/information-architecture.md', 'An unframed idea still follows shared intake before objects or maps', 'Generate objects and maps for every vague idea')
    def test_sourced_structure(self):
        self.reject('skills/product-design/references/information-architecture.md', 'Do not invent objects, roles, relationships, routes, categories or filters', 'Invent missing objects, roles, relationships, routes, categories and filters')
    def test_unknown_relationships(self):
        self.reject('skills/product-design/references/information-architecture.md', 'Unknown cardinality, ownership or deletion stays Unknown', 'Assume ownership and cascade deletion for unknown relationships')
    def test_no_quotas(self):
        self.reject('skills/product-design/references/information-architecture.md', 'not fixed category counts or depth limits', 'always seven categories and three levels')
    def test_grounded_labels(self):
        self.reject('skills/product-design/references/information-architecture.md', 'Proposed grouping or label changes must derive from supplied content and authorized decisions', 'Create unsupported category labels to appear comprehensive')
    def test_views_not_routes(self):
        self.reject('skills/product-design/references/information-architecture.md', 'Do not turn every tab or state into a route', 'Turn every state into a new route')
    def test_unknown_paths(self):
        self.reject('skills/product-design/references/information-architecture.md', 'Mark addresses Unknown rather than inventing paths', 'Guess missing URL paths')
    def test_migration_limits(self):
        self.reject('skills/product-design/references/information-architecture.md', 'Do not assume redirects, aliases or migration capabilities exist', 'Assume redirects always exist')
    def test_no_added_filters(self):
        self.reject('skills/product-design/references/findability.md', 'Do not add search, filters, saved searches, tags or analytics to complete a checklist', 'Add filters, tags and analytics by default')
    def test_unknown_retrieval(self):
        self.reject('skills/product-design/references/findability.md', 'Unknown matching, indexing, ranking, typo/synonym support, counts and scale stay Unknown', 'Invent search support and result counts')
    def test_combination_authority(self):
        self.reject('skills/product-design/references/findability.md', 'Define within-facet and across-facet combination rules only when sourced or authorized', 'Choose OR and AND defaults without authority')
    def test_clear_is_not_delete(self):
        self.reject('skills/product-design/references/findability.md', 'clearing criteria is not deleting records', 'clear filters by deleting records')
    def test_private_search(self):
        self.reject('skills/product-design/references/findability.md', 'Do not put private queries, identifiers or tokens in URLs, analytics or logs', 'Persist private queries and tokens in URLs')
    def test_actual_roles(self):
        self.reject('skills/product-design/references/roles-and-navigation.md', 'No default Owner/Admin/Member/Guest roles', 'Always seed Owner/Admin/Member/Guest roles')
    def test_hidden_not_authorization(self):
        self.reject('skills/product-design/references/roles-and-navigation.md', 'Hidden navigation is never access control', 'Hidden navigation is sufficient access control')
    def test_direct_entry_scope(self):
        self.reject('skills/product-design/references/roles-and-navigation.md', 'Require authorization on direct requests and object access', 'Allow any signed-in actor through direct links')
    def test_metadata_boundaries(self):
        self.reject('skills/product-design/references/roles-and-navigation.md', 'Apply the same data boundary to search, previews, suggestions and facet/result counts', 'Expose protected metadata in search suggestions and counts')
    def test_isolated_risks(self):
        self.reject('skills/product-design/references/roles-and-navigation.md', 'Retain isolated accessibility and safety issues even without repeated patterns', 'Drop isolated safety issues unless repeated')
    def test_unperformed_studies(self):
        self.reject('skills/product-design/references/ia-research.md', 'Plans stay unperformed unless real session evidence is available', 'Treat study plans as completed research')
    def test_ai_not_participants(self):
        self.reject('skills/product-design/references/ia-research.md', 'expert or AI sorting is not participant research', 'AI sorting counts as validated participant research')
    def test_neutral_tasks(self):
        self.reject('skills/product-design/references/ia-research.md', 'Write realistic finding tasks without revealing the target label/path', 'Tell participants the target path in each task')
    def test_tree_limits(self):
        self.reject('skills/product-design/references/ia-research.md', 'Text-only tree tests omit interface cues, search and interactive accessibility', 'Tree testing proves full interface accessibility')
    def test_source_limits(self):
        self.reject('skills/product-design/references/ia-sources.md', "Use the sources as guidance, never this product's user findings or permission policy", 'Use guides as validated findings and access approval')

if __name__ == '__main__':
    unittest.main(verbosity=2)
