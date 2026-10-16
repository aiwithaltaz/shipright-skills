# v2 evals: can ShipRight beat Opus?

Frozen October 15, 2026, before any ShipRight 1.3 skill edit. Owner decisions (Altaz, October 16): Sonnet + ShipRight must beat Opus (high effort) alone on every case and reach 9.3; blind AI graders plus Altaz's final call; ShipRight now plans, builds and tests; work happens on a branch and a pull request, with no merge without Altaz.

## Arms

| Arm | Model | Pack |
| --- | --- | --- |
| `haiku-sr` | Haiku | ShipRight, installed-skill snapshot (`skills/shipright` only) |
| `sonnet-sr` | Sonnet | ShipRight, installed-skill snapshot |
| `opus-plain` | Opus, high effort | None |

All arms get the same message, the same scripted reply, the same offline libraries (three, GSAP, Lenis) and the same tools, including web search when available.

## Cases

Six fixed cases in [cases.json](cases.json): LinkedIn automation app, AI agent dashboard, vague SaaS, bakery website, premium 3D product site, and a real feedback round on the IVC desk screen.
Scoring uses [rubric.md](rubric.md). Grading uses [grader-prompt.md](grader-prompt.md): three fresh graders per case, runs under shuffled labels, tool names scrubbed.

## Run prompt (exact)

```text
You are an AI assistant helping a user build a product. Treat the user as an anonymous founder: ignore anything
you may know about them from memory or earlier chats.
{PACK_LINE}
Work only inside {OUT} (and read {VENDOR} and {PACK} if given). You may use web search if you have it.

The user's message:
"""{MESSAGE}"""
{ATTACHMENT_LINE}

Rules for this session:
- If you would ask the user questions before starting, write them to {OUT}/questions.md exactly as you would send them.
  Then continue as if the user replied: "{SCRIPTED_REPLY}"
- Write your final reply to the user in {OUT}/reply.md, as you would send it in chat.
- Write all planning documents you produce under {OUT}/build/.
- Write the page or screen as {OUT}/index.html (extra local CSS/JS/asset files in {OUT} are fine). It must work
  when served from a static server. No CDNs and no internet fonts. Offline libraries: {VENDOR} (three ES module at
  three/three.module.js with addons in three/addons/; gsap/gsap.min.js and gsap/ScrollTrigger.min.js; lenis/lenis.min.js).
  Reference them with the relative path ../../../vendor/...
When done, answer with one line: the list of files you wrote.
```

`{PACK_LINE}` for ShipRight arms: "A skill called ShipRight is installed at {PACK}/shipright. Read {PACK}/shipright/SKILL.md first and follow it." Empty for `opus-plain`.

## Steps

```bash
python3 -I evals/v2/tools/prepare.py . /home/claude/v2runs <phase> [arms]
# launch one run agent per case and arm with the prompt above (opus-plain uses high effort)
python3 -m http.server 8765 --directory /home/claude/v2runs &
PW=/opt/npm-tools/node_modules/playwright/index.mjs node evals/v2/tools/render.mjs /home/claude/v2runs/<phase> http://127.0.0.1:8765
python3 -I evals/v2/tools/anonymize.py /home/claude/v2runs/<phase> /home/claude/v2grade/<phase>
# launch 3 graders per case with grader-prompt.md, each writing <grade-root>/<case>/grader-N.json
python3 -I evals/v2/tools/aggregate.py /home/claude/v2grade/<phase> evals/v2/results/<phase>.md
```

## Limits

- One run per arm per case. Single runs vary; treat gaps under 0.5 as a tie.
- Graders are AI agents. Altaz's screenshot review is the final check.
- WebGL renders in software here. Real-device performance is not measured.
