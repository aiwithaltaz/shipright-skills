"""A new project runs every ShipRight step. Rush wording is not a skip."""
import hashlib
import importlib.util
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTER = ROOT / 'skills/shipright/SKILL.md'
BUILD = ROOT / 'skills/shipright/modes/build-pack/MODE.md'
STUB = 'skills/ui-ux-design/references/operator-workspaces.md'
REAL = 'skills/shipright/modes/ui-ux-design/references/operator-workspaces.md'
STEPS = ('build pack', 'design preview', 'build', 'critique', 'ship-check')
RUSH = ('just build it', 'skip the plan', 'build in one go')


def section(text):
    start = text.index('## Full flow for a new project')
    lines = text[start:].splitlines()
    kept = [lines[0]]
    for line in lines[1:]:
        if line.startswith('## '):
            break
        kept.append(line)
    return '\n'.join(kept).strip()


def required_steps(skill_text, prompt):
    """Steps a new-project prompt must still run, from the written rule."""
    if not re.search(r'Just build it.*skip the plan.*build in one go do not skip a step', skill_text):
        return []
    low = prompt.lower()
    names_step = [step for step in STEPS if re.search(rf'\b{re.escape(step)}\b', low)]
    accepts_risk = 'accept' in low and 'risk' in low
    if len(names_step) == 1 and accepts_risk and 'do not skip' not in low:
        return [step for step in STEPS if step not in names_step]
    return list(STEPS)


class FullFlowTests(unittest.TestCase):
    def test_router_contains_full_flow_rule(self):
        text = ROUTER.read_text(encoding='utf-8')
        body = section(text)
        self.assertIn('A new project always runs every step below, in order.', body)
        self.assertIn('2-3 distinct visual directions (type, color, spacing, motion)', body)
        self.assertIn('Stop for the user to choose or approve.', body)
        self.assertIn('names that step and accepts the stated risk', body)
        self.assertIn('Say which step is skipped and why it matters.', body)
        self.assertIn('Proposed, awaiting owner approval', body)
        self.assertIn('scripts/check-ui.mjs', body)
        self.assertIn('ux-critique', body)
        positions = [body.index(label) for label in (
            '1. **Build pack.**', '2. **Design preview.**', '3. **Build.**',
            '4. **Critique.**', '5. **Ship-check.**')]
        self.assertEqual(positions, sorted(positions))

    def test_build_pack_has_the_same_rule(self):
        self.assertEqual(section(ROUTER.read_text(encoding='utf-8')), section(BUILD.read_text(encoding='utf-8')))

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
                    self.assertEqual(required_steps(text, prompt), list(STEPS))
                    lowered = text.lower()
                    self.assertTrue(all(phrase in lowered for phrase in RUSH))


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
