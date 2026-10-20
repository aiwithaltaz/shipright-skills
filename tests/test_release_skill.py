#!/usr/bin/env python3
"""The release zip is one skill. The ChatGPT file is the short spine, not every mode."""
import importlib.util
import tempfile
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('release_skill', ROOT / 'scripts/release_skill.py')
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)


class ReleaseSkillTests(unittest.TestCase):
    def test_zip_has_one_skill_tools_and_templates(self):
        with tempfile.TemporaryDirectory() as tmp:
            archive, bundle = release.build(Path(tmp))
            with zipfile.ZipFile(archive) as zipped:
                names = zipped.namelist()
            text = bundle.read_text(encoding='utf-8')
        self.assertTrue(all(name.startswith('shipright/') for name in names))
        skills = [name for name in names if name.endswith('SKILL.md')]
        self.assertEqual(['shipright/SKILL.md'], skills)
        for mode in ('build-pack', 'product-design', 'ui-ux-design', 'ux-critique', 'ship-check'):
            self.assertIn(f'shipright/modes/{mode}/MODE.md', names)
        for rel in (
            'shipright/scripts/check-ui.mjs',
            'shipright/scripts/design-metrics.mjs',
            'shipright/scripts/crawl.mjs',
            'shipright/scripts/check-record.mjs',
            'shipright/templates/research-brief.md',
            'shipright/templates/06-design-contract.md',
            'shipright/templates/concepts.md',
            'shipright/templates/risks.md',
            'shipright/patterns/README.md',
            'shipright/blocks/README.md',
            'shipright/stages/01-research.md',
        ):
            self.assertIn(rel, names)
        self.assertIn('# Source: SKILL.md', text)
        self.assertIn('Never invent facts, brand values, data, or features.', text)
        self.assertNotIn('# Source: modes/build-pack/MODE.md', text)
        words = len(text.split())
        self.assertGreaterEqual(words, 3000, words)
        self.assertLessEqual(words, 4000, words)

    def test_committed_dist_matches_the_script(self):
        with tempfile.TemporaryDirectory() as tmp:
            archive, bundle = release.build(Path(tmp))
            fresh_names = zipfile.ZipFile(archive).namelist()
            committed = zipfile.ZipFile(ROOT / 'dist/shipright.zip')
            self.assertEqual(fresh_names, committed.namelist())
            self.assertEqual(bundle.read_text(encoding='utf-8'), (ROOT / 'dist/shipright-chatgpt.md').read_text(encoding='utf-8'))


if __name__ == '__main__':
    unittest.main()
