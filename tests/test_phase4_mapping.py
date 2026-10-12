#!/usr/bin/env python3
"""Phase 4 source protections; no real-user, security or model benchmark claim."""
import hashlib
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest
ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('mapping_source_checks', ROOT / 'evals/check_sources.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)
BASE = 'skills/product-design/references/'

class MappingRegressions(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory(prefix='shipright-mapping-test-')
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
            self.assertTrue(checks.validate(self.copy)[0], f'unsafe mapping mutation accepted: {rel}')
        finally:
            p.write_bytes(original)
    def test_current_sources(self):
        self.assertEqual([], checks.validate(self.copy)[0])
    def test_direct_conditional_references(self):
        for name in ('mapping-types', 'journey-mapping', 'task-and-system-flows', 'service-blueprints', 'mapping-sources'):
            with self.subTest(reference=name):
                self.reject('skills/product-design/SKILL.md', f'[{name}.md](references/{name}.md)', f'`references/{name}.md`')
    def test_historical_evidence_unchanged(self):
        data = json.loads((self.copy / 'evals/phase-4-journeys-blueprints/source-manifest.json').read_text())
        for rel, expected in data['historical_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / rel).read_bytes()).hexdigest())
    def test_evaluation_criteria_unchanged(self):
        data = json.loads((self.copy / 'evals/phase-4-journeys-blueprints/source-manifest.json').read_text())
        for rel, expected in data['evaluation_files_sha256'].items():
            with self.subTest(path=rel):
                self.assertEqual(expected, hashlib.sha256((self.copy / 'evals/phase-4-journeys-blueprints' / rel).read_bytes()).hexdigest())
    def test_optional_mapping(self):
        self.reject('skills/product-design/SKILL.md', 'Skip mapping for clear corrections or a sufficient existing map', 'Always map every correction')
    def test_framing_first(self):
        self.reject('skills/product-design/references/mapping-types.md', 'An unframed idea still follows shared intake before maps', 'Always map before intake')
    def test_one_map(self):
        self.reject('skills/product-design/references/mapping-types.md', 'Choose one smallest useful map; do not generate every map automatically', 'Generate all five maps automatically')
    def test_current_future(self):
        self.reject('skills/product-design/references/mapping-types.md', 'Keep current-state evidence separate from future-state proposals', 'Mix current facts with future proposals')
    def test_no_invention(self):
        self.reject('skills/product-design/references/mapping-types.md', 'Never invent emotions, teams, channels, dependencies or business processes', 'Invent missing emotions and business processes')
    def test_isolated_issues(self):
        self.reject('skills/product-design/references/mapping-types.md', 'Retain every supplied accessibility or safety issue even without repetition', 'Only retain repeated accessibility and safety issues')
    def test_no_validation(self):
        self.reject('skills/product-design/references/mapping-types.md', 'No map establishes accessibility, security, safety, service reliability or usability Pass', 'Every completed map establishes accessibility and safety Pass')
    def test_no_persona(self):
        self.reject('skills/product-design/references/journey-mapping.md', 'Use actual records, not a newly invented persona', 'Create a persona to fill missing records')
    def test_no_forced_funnel(self):
        self.reject('skills/product-design/references/journey-mapping.md', 'Do not force awareness, purchase and loyalty stages onto unrelated tasks', 'Force a sales funnel onto every journey')
    def test_separate_actors(self):
        self.reject('skills/product-design/references/journey-mapping.md', "Keep different people's accounts separate; do not splice them into one observed path", 'Combine all accounts into one observed actor')
    def test_reported_emotions(self):
        self.reject('skills/product-design/references/journey-mapping.md', 'Keep recalled behavior and feelings Reported, even in a recorded interview', 'Treat recorded recalled feelings as Observed')
    def test_pause_not_emotion(self):
        self.reject('skills/product-design/references/journey-mapping.md', 'An observed pause does not establish frustration', 'An observed pause proves frustration')
    def test_no_curve(self):
        self.reject('skills/product-design/references/journey-mapping.md', 'do not invent emotions or an emotional curve', 'invent an emotional curve for every journey')
    def test_return_unknown(self):
        self.reject('skills/product-design/references/journey-mapping.md', 'missing persistence stays Unknown', 'assume interrupted work is saved')
    def test_task_system(self):
        self.reject('skills/product-design/references/task-and-system-flows.md', 'distinguish user actions from system steps when they intersect', 'Treat automatic system steps as user choices')
    def test_no_capabilities(self):
        self.reject('skills/product-design/references/task-and-system-flows.md', 'Never invent APIs, queues, retries, cancellation, notifications or persistence', 'Assume APIs, queues and retries exist')
    def test_remote_unknown(self):
        self.reject('skills/product-design/references/task-and-system-flows.md', 'A failed response does not prove the remote action failed', 'A failed response proves payment failed')
    def test_exit_not_cancel(self):
        self.reject('skills/product-design/references/task-and-system-flows.md', 'Leaving a page does not cancel a submitted transaction', 'Leaving cancels every submitted transaction')
    def test_human_pending(self):
        self.reject('skills/product-design/references/task-and-system-flows.md', 'Human pending work is not a background job', 'Human pending work should show a running job')
    def test_partial_blueprint(self):
        self.reject('skills/product-design/references/service-blueprints.md', 'Do not require one backstage action for every touchpoint', 'Invent a backstage action for every touchpoint')
    def test_unknown_business(self):
        self.reject('skills/product-design/references/service-blueprints.md', 'Missing teams, departments, systems, policies, dependencies, timing and SLA stay Unknown', 'Invent departments, systems and SLA for missing lanes')
    def test_props_not_research(self):
        self.reject('skills/product-design/references/service-blueprints.md', 'Service artifacts are not research evidence or proof of successful delivery', 'Service artifacts prove validated reliable delivery')
    def test_handoff_acceptance(self):
        self.reject('skills/product-design/references/service-blueprints.md', 'Transferred is not accepted or completed', 'Forwarding means accepted and completed')
    def test_visibility(self):
        self.reject('skills/product-design/references/service-blueprints.md', 'Frontstage/backstage depends on visibility, not job title', 'Frontstage/backstage is fixed by job title')
    def test_source_limits(self):
        self.reject('skills/product-design/references/mapping-sources.md', "they are not this product's findings or business processes", 'they establish product findings and business processes')
    def test_template_emotions(self):
        self.reject('docs/01-prd.md', 'Emotions require a supplied source; no mandatory emotion lane', 'Always fill an emotional curve')
    def test_template_capabilities(self):
        self.reject('docs/02-technical-architecture.md', 'mapping does not verify runtime', 'mapping verifies runtime')
    def test_ticket_authority(self):
        self.reject('docs/05-feature-ticket-list.md', 'A proposed map change is not an approved ticket', 'Every map proposal is an approved ticket')

if __name__ == '__main__':
    unittest.main(verbosity=2)
