"""Craft signals need positive, negative and false-positive coverage in a real browser."""
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class DesignExcellenceTests(unittest.TestCase):
    def test_browser_measurements(self):
        result = subprocess.run(['node', 'tests/design-excellence.mjs'], cwd=ROOT,
                                env=os.environ, capture_output=True, text=True, timeout=90)
        self.assertEqual(0, result.returncode, result.stdout + result.stderr)
        self.assertIn('20 browser cases passed.', result.stdout)

    def test_card_provenance_and_installed_copy(self):
        spec = importlib.util.spec_from_file_location('design_cards', ROOT / 'knowledge/tools/design_cards.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        cards = module.load_cards(ROOT)
        installed = {c['id']: c for c in json.loads((ROOT / 'skills/shipright/library/cards.json').read_text())}
        for card in cards:
            self.assertEqual(card, installed[card['id']])
        for stage in ('06', '07', '08', '09'):
            result = subprocess.run(['node', 'scripts/deal.mjs', '--stage', stage,
                                     '--tags', 'app,dashboard', '--json'], cwd=ROOT,
                                    capture_output=True, text=True, check=True)
            dealt = json.loads(result.stdout)['cards']
            self.assertGreaterEqual(sum(c.get('category') == 'design-excellence' for c in dealt), 3)

    def test_spacing_policy_accepts_12_and_explicit_exception(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'tokens.css'
            prefix = '/* pair body --text --bg */ :root{--text:#111111;--bg:#ffffff;'
            for value, comment, code in [('12px', '', 0), ('12.4px', '', 1),
                    ('6px', '/* space-exception --space-optical: align a small icon optically */', 0)]:
                path.write_text(prefix + '--space-optical:' + value + ';}' + comment)
                result = subprocess.run(['node', 'skills/shipright/scripts/check-tokens.mjs', str(path)],
                                        cwd=ROOT, capture_output=True, text=True)
                self.assertEqual(code, result.returncode, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
