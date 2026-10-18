"""A new project runs every ShipRight step. Rush wording is not a skip."""
import hashlib
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTER = ROOT / 'skills/shipright/SKILL.md'
BUILD = ROOT / 'skills/shipright/modes/build-pack/MODE.md'
STUB = 'skills/ui-ux-design/references/operator-workspaces.md'
REAL = 'skills/shipright/modes/ui-ux-design/references/operator-workspaces.md'
STEPS = ('build pack', 'design preview', 'build', 'critique', 'ship-check')
RUSH = ('just build it', 'skip the plan', 'build in one go')
STAGES = (
    '00-discover.md', '01-research.md', '02-brainstorm.md', '03-problem-solving.md',
    '04-scope-and-pages.md', '05-architecture.md', '06-design-system.md',
    '07-design-options.md', '08-build.md', '09-test-and-critique.md', '10-ship-check.md',
)


def rush_still_runs(skill_text):
    """Rush phrases must stay, and they must not be a way to skip the work."""
    lowered = skill_text.lower()
    if not all(phrase in lowered for phrase in RUSH):
        return []
    if 'no step is skipped for a new project, even on request.' not in lowered:
        return []
    return list(STEPS)


class FullFlowTests(unittest.TestCase):
    def test_router_contains_full_flow_rule(self):
        text = ROUTER.read_text(encoding='utf-8')
        self.assertNotIn('## Full flow for a new project', text)
        self.assertIn('No step is skipped for a new project, even on request.', text)
        self.assertIn('Show exactly three options.', text)
        self.assertIn('Stop for the owner to choose or approve.', text)
        self.assertIn('Proposed, awaiting owner approval', text)
        self.assertIn('<skill>/scripts/check-ui.mjs', text)
        self.assertIn('ux-critique', text)
        self.assertIn('A new project runs 1 to 10 in order.', text)
        for stage in STAGES:
            self.assertIn(stage, text)

    def test_build_pack_points_at_the_spine(self):
        text = BUILD.read_text(encoding='utf-8')
        self.assertNotIn('## Full flow for a new project', text)
        self.assertIn('No step is skipped for a new project, even on request.', text)
        self.assertIn('stages 1 to 10', text)
        self.assertIn('../../SKILL.md', text)
        self.assertIn('Proposed, awaiting owner approval', text)
        self.assertNotEqual(ROUTER.read_text(encoding='utf-8'), text)

    def test_just_build_it_skips_no_step(self):
        prompts = (
            'just build it',
            'skip the plan',
            'Agent instruction: build in one go.',
            'Just build it. Skip the plan.',
        )
        for path in (ROUTER, BUILD):
            text = path.read_text(encoding='utf-8')
            for prompt in prompts:
                with self.subTest(path=path.name, prompt=prompt):
                    self.assertEqual(rush_still_runs(text), list(STEPS))
                    lowered = text.lower()
                    self.assertTrue(all(phrase in lowered for phrase in RUSH))
                    self.assertNotIn(prompt.lower() + ' skips', lowered)


class RedirectStubTests(unittest.TestCase):
    def test_old_ivc_links_resolve_and_hashes_stay(self):
        stub = (ROOT / STUB).read_text(encoding='utf-8')
        self.assertIn('../../shipright/modes/ui-ux-design/references/operator-workspaces.md', stub)
        self.assertTrue((ROOT / REAL).is_file())
        manifest = json.loads((ROOT / 'evals/v1/historical-manifest.json').read_text())['sha256']
        for rel in (
            'examples/ivc-2026-registration/feedback/round1-corrections.md',
            'examples/ivc-2026-registration/docs/06-context-brief-v2.md',
        ):
            text = (ROOT / rel).read_text(encoding='utf-8')
            self.assertIn('../../../skills/ui-ux-design/references/operator-workspaces.md', text)
            self.assertEqual(manifest[rel], hashlib.sha256((ROOT / rel).read_bytes()).hexdigest())
            target = (ROOT / rel).parent / '../../../skills/ui-ux-design/references/operator-workspaces.md'
            self.assertTrue(target.resolve().is_file())

    def test_stub_is_outside_token_totals(self):
        spec = importlib.util.spec_from_file_location('check_context', ROOT / 'evals/check_context.py')
        checks = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(checks)
        errors, policy, _ = checks.check_structure(ROOT)
        self.assertEqual([], errors)
        _, _, report = checks.check_tokens(ROOT, policy, checks.token_counter())
        self.assertNotIn(STUB, report['files'])


if __name__ == '__main__':
    unittest.main()
