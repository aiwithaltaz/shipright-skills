"""Validate research-synthesis provenance and merge supplemental cards without refetching history."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def load_cards(root=ROOT):
    evidence = json.loads((root / 'knowledge/sources/design-excellence.json').read_text())
    entries = {e['pointer']: e for e in evidence['entries']}
    cards = json.loads((root / 'knowledge/cards/design-excellence.json').read_text())
    seen = set()
    for card in cards:
        assert card['id'] not in seen, card['id']
        seen.add(card['id'])
        assert card['quote_scope'] == 'research-synthesis', card['id']
        assert card['upstream_status'] == 'not reverified', card['id']
        entry = entries[card['evidence_pointer']]
        assert card['source_url'] in entry['urls'], card['id']
        assert 6 <= len(card['source_quote'].split()) <= 40, card['id']
        assert card['source_quote'] in entry['text'], card['id']
        assert all(card.get(k) for k in ('rule', 'why', 'do', 'dont', 'check')), card['id']
    return cards


if __name__ == '__main__':
    path = ROOT / 'skills/shipright/library/cards.json'
    new = load_cards()
    ids = {c['id'] for c in new}
    existing = [c for c in json.loads(path.read_text()) if c['id'] not in ids]
    path.write_text(json.dumps(existing + new, ensure_ascii=False, indent=1) + '\n')
    print(f'{len(new)} synthesis cards merged; {len(existing)} existing cards preserved.')
