#!/usr/bin/env python3
"""check-ui must fail a known sloppy page and pass a known clean page. Skips without Node and Playwright."""
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
FIX = ROOT / 'evals/v1/checker-fixtures'


def node_env():
    parts = [os.environ.get('NODE_PATH', '')]
    for raw in ('/workspace/node_modules', '/opt/node22/lib/node_modules',
                '/opt/app-template/node_modules', '/usr/lib/node_modules'):
        base = Path(raw)
        if (base / 'playwright' / 'package.json').exists() or (base / 'playwright-core' / 'package.json').exists():
            parts.append(str(base))
    return dict(os.environ, NODE_PATH=os.pathsep.join(dict.fromkeys(p for p in parts if p)))


def run(page):
    out = tempfile.mkdtemp(prefix='check-ui-')
    proc = subprocess.run(['node', str(ROOT / 'scripts/check-ui.mjs'), str(page), '--root', str(ROOT), '--out', out, '--json'],
                          capture_output=True, text=True, env=node_env(), timeout=180)
    shutil.rmtree(out, ignore_errors=True)
    return proc


def available():
    if not shutil.which('node'):
        return False
    probe = run(FIX / 'good.html')
    return probe.returncode in (0, 1)


@unittest.skipUnless(available(), 'Node with Playwright and Chromium not available')
class CheckUiFixtures(unittest.TestCase):
    def test_bad_page_fails_each_rule(self):
        proc = run(FIX / 'bad.html')
        self.assertEqual(1, proc.returncode, proc.stderr)
        found = {r['id'] for v in json.loads(proc.stdout)['report']['viewports'].values() for r in v['results']}
        for rule in ('overflow', 'fonts-loaded', 'contrast', 'tiny-targets', 'unlabeled-fields', 'image-alt',
                     'nameless-buttons', 'focus-visible', 'page-errors', 'em-dash', 'hidden-content', 'reduced-motion', 'gradient-text',
                     'gradients', 'glows', 'two-filled-buttons', 'eyebrows', 'one-h1', 'touch-targets'):
            with self.subTest(rule=rule):
                self.assertIn(rule, found)

    def test_good_page_is_clean(self):
        proc = run(FIX / 'good.html')
        self.assertEqual(0, proc.returncode, proc.stdout[-2000:])
        self.assertEqual(0, json.loads(proc.stdout)['warns'])


if __name__ == '__main__':
    unittest.main()
