# Stage 1: Research

Know the users, the alternatives, the rules, and the money before you invent a concept. Open [research-brief.md](../templates/research-brief.md).
Required headings: Questions, Findings, Alternatives, Rules and limits, Money, Domain world, Implications.

For an existing app on the improve path, keep this light: domain, rules, and alternatives only. Do not restart the whole brief.

## Steps

1. Write the 5 questions this product depends on. Always include: who uses it and what they use today; which platform, API, or legal rules apply; how money works (who pays, and the usual price shape); what goes wrong in this domain; what changes by time or place (season, hours, region).
2. If web search works: run 5 to 10 searches. Prefer official docs, pricing pages, laws, and real complaints (reviews, forums). Record the source and the date.
3. If search is unavailable: answer from general knowledge, tag every line **Assumed**, and list exactly what to verify and where.
4. Name at least 3 real alternatives, including "doing nothing" or "a spreadsheet". For each: what it does well, the gap, and the price shape.
5. End with "What this means for the product": 3 to 5 bullets that change the plan. A finding that does not change a decision does not belong here.

## Findings

Each fact is **Verified** (source and date) or **Assumed** (how to check). Do not upgrade Assumed to Verified because it sounds right.
Domain world facts are the things in the user's week that change a decision: weather, a rate limit, a deadline, a capacity cap. These show up later on the screen, not only in the doc.

## Worked example

LinkedIn automation. Rule: LinkedIn's User Agreement bans bots that send invites, messages, or scrape profiles. Posting through the official API is allowed. Verify the current terms before you treat this as Verified. Implication: build an assistant that drafts and schedules, and the user presses send. A copilot, not a bot.

## Vague idea

If you still cannot name the user and the job, ask the decision cards from SKILL.md first. Then fill this brief. A request to build it is not a frame, and it is not permission to invent.

## Record

Update CONTEXT.md: who it is for, and which facts are Assumed. Add a DECISIONS.md row for any choice you are making from the research.
Required headings in DECISIONS.md: Rows.

## Gate

At least 3 real alternatives. Platform, legal, and data rules checked. Every fact tagged Verified or Assumed. Implications change the plan. Record updated.
