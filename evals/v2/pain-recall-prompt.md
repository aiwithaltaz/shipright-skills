# Pain-recall grader prompt (c7 only)

Run once per c7 run, after the blind rubric grading. One fresh grader agent. It reads the answer key and one run's documents and reply. It does not see which tool made the run.

```text
You check how many real problems a product review found.
Read the answer key at {ANSWER_KEY}. Then read every .md file in {RUN_DIR} (reply, questions and planning docs)
and look at the screenshots in {RUN_DIR}/shots/.
For each answer-key row, decide Found, Partly or Missed, using the "Counts as Found when" column.
A row is Found only if the run names the problem or builds the fix. Do not give credit for vague lines
like "improve usability".
Write JSON to {OUT}:
{"pains": {"F01": "Found|Partly|Missed", ...}, "keeps": {"F04": "...", ...},
 "false_keeps": ["F0x", ...], "pain_recall": 0.0, "keep_recall": 0.0,
 "notes": "one line on the best and the most important missed item"}
When done, answer with one line: DONE.
```
