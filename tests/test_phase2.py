"""Phase 2: Opus moves, layout moves, blocks, and the new checkers."""
import os
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
SHIP = ROOT / 'skills/shipright'
BLOCKS = [
    'product-stage', 'exploded-view', 'pinned-scene', 'mask-reveal', 'block-wipe',
    'hover-invert-faq', 'scroll-rail', 'counter-preloader', 'app-shell', 'attention-list',
    'data-table', 'week-board', 'context-rail', 'custom-select', 'form-kit', 'states-kit',
    'app-motion-kit',
]


def node_env():
    parts = [os.environ.get('NODE_PATH', '')]
    for raw in ('/workspace/node_modules', '/opt/node22/lib/node_modules',
                '/opt/app-template/node_modules', '/usr/lib/node_modules'):
        base = Path(raw)
        if (base / 'playwright' / 'package.json').exists() or (base / 'playwright-core' / 'package.json').exists():
            parts.append(str(base))
    return dict(os.environ, NODE_PATH=os.pathsep.join(dict.fromkeys(p for p in parts if p)))


class Phase2Tests(unittest.TestCase):
    def test_opus_and_layout_moves_are_rules(self):
        app = (SHIP / 'patterns/app-screens.md').read_text(encoding='utf-8')
        web = (SHIP / 'patterns/web-pages.md').read_text(encoding='utf-8')
        layout = (SHIP / 'patterns/layout-moves.md').read_text(encoding='utf-8')
        for move in ('A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'):
            self.assertIn(move, app)
        self.assertIn('Good:', app)
        self.assertIn('Bad:', app)
        self.assertIn('Check:', app)
        for move in ('W1', 'W2', 'W3', 'W4'):
            self.assertIn(move, web)
        for title in (
            'Reorder by priority', 'Group related things', 'Move controls to the work',
            'Align to the grid', 'Make the key thing bigger', 'Simplify the interaction',
            'Make state obvious',
        ):
            self.assertIn(title, layout)
        self.assertIn('Good:', layout)
        self.assertIn('Bad:', layout)

    def test_blocks_exist_and_pass(self):
        for name in BLOCKS:
            path = SHIP / 'blocks' / f'{name}.html'
            self.assertTrue(path.is_file(), name)
            text = path.read_text(encoding='utf-8')
            self.assertIn('Use when:', text)
            self.assertIn('prefers-reduced-motion', text)
            self.assertTrue((SHIP / 'blocks/shots' / f'{name}-desktop.png').is_file(), name)
            self.assertTrue((SHIP / 'blocks/shots' / f'{name}-phone.png').is_file(), name)
        proc = subprocess.run(
            ['node', str(ROOT / 'tests/blocks/test-blocks.mjs')],
            cwd=ROOT, capture_output=True, text=True, env=node_env(), timeout=180,
        )
        self.assertEqual(0, proc.returncode, proc.stderr[-2000:] + proc.stdout[-500:])

    def test_check_tokens_pass_and_fail(self):
        good = subprocess.run(
            ['node', str(SHIP / 'scripts/check-tokens.mjs'), str(SHIP / 'templates/tokens.css')],
            capture_output=True, text=True,
        )
        self.assertEqual(0, good.returncode, good.stderr)
        bad = subprocess.run(
            ['node', str(SHIP / 'scripts/check-tokens.mjs'), str(ROOT / 'tests/fixtures/phase2/bad-tokens.css')],
            capture_output=True, text=True,
        )
        self.assertEqual(1, bad.returncode, bad.stdout + bad.stderr)
        self.assertIn('off the spacing scale', bad.stderr)

    def test_consistency_pass_and_fail(self):
        good = subprocess.run(
            ['node', str(SHIP / 'scripts/consistency.mjs'), str(ROOT / 'tests/fixtures/phase2/good-ui.html'),
             '--tokens', str(SHIP / 'templates/tokens.css'),
             '--labels', str(ROOT / 'tests/fixtures/phase2/labels.json')],
            capture_output=True, text=True, env=node_env(), timeout=60,
        )
        self.assertEqual(0, good.returncode, good.stderr)
        bad = subprocess.run(
            ['node', str(SHIP / 'scripts/consistency.mjs'), str(ROOT / 'tests/fixtures/phase2/bad-ui.html')],
            capture_output=True, text=True, env=node_env(), timeout=60,
        )
        self.assertEqual(1, bad.returncode, bad.stdout)
        self.assertIn('label', bad.stderr)
        self.assertIn('off-scale', bad.stderr)

    def test_run_tests_writes_a_pass_report(self):
        out = ROOT / 'tests/fixtures/phase2/out'
        proc = subprocess.run(
            ['node', str(SHIP / 'scripts/run-tests.mjs'), str(ROOT / 'tests/fixtures/phase2/plan.json'), '--out', str(out)],
            capture_output=True, text=True, env=node_env(), timeout=60,
        )
        self.assertEqual(0, proc.returncode, proc.stderr)
        report = (out / 'test-report.md').read_text(encoding='utf-8')
        self.assertIn('## Steps', report)
        self.assertIn('## Rounds', report)
        self.assertIn('## Limits', report)
        self.assertIn('Pass:', report)
        self.assertNotIn('Fail:', report)

    def test_taste_is_opt_in(self):
        taste = (SHIP / 'taste/altaz.md').read_text(encoding='utf-8')
        self.assertIn('Opt-in', taste)
        self.assertIn('4, 8, 16, 24, 32, 40, 48, 64', taste)
        self.assertIn('not a gap', taste)
        skill = (SHIP / 'SKILL.md').read_text(encoding='utf-8')
        self.assertIn('taste/altaz.md', skill)
        self.assertIn('check-tokens.mjs', skill)
        self.assertIn('run-tests.mjs', skill)


if __name__ == '__main__':
    unittest.main()
