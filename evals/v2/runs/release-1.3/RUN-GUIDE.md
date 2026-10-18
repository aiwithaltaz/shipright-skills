# Run the 1.3 evals

Do this in Claude Code. Do not grade anything in this pass. Do not type a score.

## 1. Get the folders ready

On the machine that will run the agents, from the repo root:

```bash
python3 evals/v2/tools/prepare_release.py /home/claude/v2runs
```

That copies the skill, the offline libraries, and the case attachments. It does not call a model.

If your folder is not `/home/claude/v2runs`, pick another path, run the command with that path, then replace `/home/claude/v2runs` in every prompt file before you paste.

## 2. Start each run

Open `evals/v2/runs/release-1.3/prompts/`. There are 30 files: 8 frozen cases and 2 hidden cases, each with Sonnet, Haiku, and Opus.

For each file:

1. Start a new Claude Code session. Do not reuse a chat.
2. Set the model named in the first lines of the file. Opus is high effort. Haiku and Sonnet are not.
3. Paste only the text under the `---` line.
4. Wait until the reply is one line listing the files it wrote.
5. Leave the folder as it is. Do not edit the page to make it look better.

Do the hidden cases (`h1-groomer`, `h2-ceramic`) in their own sessions. Do not mention the original eight.

## 3. Stop

When a run exists, its folder has `reply.md`, `build/`, and `index.html`. Haiku is report only. It still writes those files.

Do not open the answer key. Do not run graders yet. Grading, the fix loop, and the variance reruns wait until these 30 runs exist.

The result file `evals/v2/results/release-1.3.md` stays "not graded" until then.
