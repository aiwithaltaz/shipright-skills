# Smoke tests still pending

**Pack version:** 1.3.1
**Draft:** 1.3, not released.

Altaz runs these in Claude Code. This session did not call Claude, Sonnet, Opus, or Haiku.

- Haiku routing: the six eval messages in SKILL.md should open the stage named in that table. A text check lives in tests/test_v13_foundation.py. A live Haiku run is not done.
- Record continuation: give a fresh model only a filled record/ folder and ask what the product is, what was decided, and what to do next. No smoke-eval record exists yet, so this was not run.
- Smoke eval: Sonnet plus this 1.3 draft on c1, c3, and c7, with three graders and pain recall on c7. Not run. No scores are invented here.
