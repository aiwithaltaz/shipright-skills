# Knowledge pipeline (1.4)

How the card library in `skills/shipright/library/cards.json` is made. The installed skill never reads this folder.

1. Gather: `python3 knowledge/tools/gather.py` reads `sources/seed.tsv` (category and URL), checks robots.txt, uses no logins, and writes `sources/sources.json` (URL, title, date, status). Page text goes to `.cache/raw/` and is not committed.
2. Distill: `DEEPSEEK_API_KEY=... python3 knowledge/tools/distill.py` sends each page to `deepseek-flash` and asks for 3 to 8 cards with a verbatim quote and a check. Token use goes to `sources/usage.json`. The key is read from the environment only.
3. Curate: `python3 knowledge/tools/curate.py` keeps a card only if every field is set, the quote is in the fetched text word for word (40 words or less), the rule is not vague, and it is not a near duplicate. It adds the hand-written cards in `cards/manual.json` (same checks against the source, `sources/instagram-notes.md` or `sources/lessons.md`). Rejected cards and reasons go to `cards/rejected.json`.
4. Deal: `node scripts/deal.mjs --stage 05 --tags saas,dashboard` prints 5 to 8 cards for one stage. A card with no check never loads.

Run on 2026-10-19: 71 URLs, 64 fetched, 445 cards kept, 7 rejected. DeepSeek: 64 calls, 215,694 input and 299,799 output tokens, at most 0.43 US dollars at peak prices.
Quotes stay short and every card links its source. Paid courses and logged-in pages were not used.

## Design Excellence supplement

21 new cards in cards/design-excellence.json quote the user-supplied research synthesis, not alleged upstream text. sources/design-excellence.json records its SHA-256, excerpts, JSON pointers and the source URLs named there. Upstream content and authenticated product screens were not reverified.

Run `python3 knowledge/tools/design_cards.py` from the repository root to validate the evidence pointers and merge only this supplement into the installed library. This preserves existing cards without refetching or re-distilling them. The full curator also validates and includes this supplement. App tags prioritize these cards at stages 6 to 9. The existing 1200-token dealer cap still applies.
