# Grader prompt (one fresh grader per run)

`tools/blind.mjs` fills this in for every blinded run and saves it as `GRADE-PROMPT.md`. Paste it into a fresh agent. Use a different model family from the run when you can. The grader never learns which arm or model made the run.

```text
You check how many real problems an app review found, against an answer key.

1. Read the answer key at {ANSWER_KEY}. It lists planted or owner-confirmed pains and Keeps.
   Each row says when it "counts as found".
2. Read every .md file in {RUN_DIR} (reply, questions, and any documents). Look at any screenshots in it.
3. For each pain in the key, decide:
   - Found: the review names this problem (or builds its fix) clearly enough to match "counts as found when".
   - Partly: the review touches it but misses the core of it.
   - Missed: not there. Vague lines like "improve usability" or "check accessibility" are Missed.
4. For each Keep in the key, decide Found or Missed (the review lists it as working or worth keeping).
5. False keeps: list key IDs from "false_keep_ids" that the review calls good, working, or worth keeping.
6. Count every distinct problem the review reports (merge duplicates). For problems that match no key row,
   decide if each is a real problem in the app (real) or wrong, invented or not supported by the app (not_real).
   Open the app at {APP}/index.html if you need to check.
7. Evidence: count how many reported problems name a specific screen or element (with or without a screenshot).
8. Severity: for each Found pain where the key has a severity (1 to 4) and the review gives a severity,
   record whether the review's severity is within 1 level of the key. Map words this way:
   Blocker/Critical/Catastrophe = 4, Major/High = 3, Minor/Medium = 2, Polish/Low/Cosmetic = 1.

Write JSON to {OUT_FILE}:
{
  "pains": {"<ID>": "Found|Partly|Missed", ...},
  "keeps": {"<ID>": "Found|Missed", ...},
  "false_keeps": ["<ID>", ...],
  "reported_problems": <int>,
  "extra_real": <int>,
  "extra_not_real": <int>,
  "extra_not_real_examples": ["<short quote>", ...],
  "with_location": <int>,
  "severity_checked": <int>,
  "severity_within_one": <int>,
  "notes": "one line: the best catch and the most important miss"
}
Do not compute percentages. When done, answer with one line: DONE.
```
