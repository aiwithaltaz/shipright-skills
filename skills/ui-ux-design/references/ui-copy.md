# UI copy - reference

**Status: Public draft.** Used by `ui-ux-design` and `ux-critique`.
**Pack:** ShipRight.

UI copy is the words on the screen: headlines, buttons, empty states, and errors. These checks are evidence. Judge them in context. Only integrity problems auto-fail. Those are fake proof, hidden cost, and a dark pattern.

Do not guess that "AI wrote this." Named patterns are the evidence.

## Banned filler

Ban these words when they praise and do not name the action:

seamless, elevate, leverage, delve, revolutionary, delightful, empower, supercharge, cutting-edge, next-generation, game-changing, utilize.

"Unlock" is filler in "unlock the power of". It is a real verb in "unlock the files after payment". Keep the real verb. Cut the praise.

## Empty phrases

Cut phrases that add no fact. Examples: "in today's world", "take it to the next level", "the power of".

## Contrast reveal

Flag a pair shaped like "Not X. It is Y." or "It is not X. It is Y." Rewrite it as one direct sentence.

This rule is for product UI and for ShipRight docs. A safety line may keep "not" or "never". Example: "This does not send the invoice."

## Portability test

Read the headline on its own. If it could move to another product with no edit, it is filler. Rewrite it so it names this product's object or outcome.

Fail: "Unlock the power of seamless workflows."
Pass for a file-pay product: "Pay the invoice to download the files."

## Verbs, buttons, errors

- Use the same verb through the flow. The button says Publish. The success line says Published.
- The button names the result. "Save changes." "Pay and unlock files." "Submit" is too vague when the object is known. "Continue" is fine only when the heading already names the object.
- An error says what happened and how to fix it. Do not apologize. Do not write "Oops".
- An empty screen invites the next action. It names the object. It does not say "Nothing here" and stop.

## Detect mode

Use Detect when the user asks what is wrong with the copy, or when a critique reviews a screen that has sentences.

For each hit:

```text
Detect
- Line: "[exact words]"
  Pattern: [name from the list below]
  Why: [one short sentence]
  Fix: [a rewrite, or "remove until a real source exists"]
```

Pattern names:

| Pattern | Auto-fail? |
| --- | --- |
| Unsourced proof | Yes. Integrity. |
| Fake person or company, shown as real | Yes. Integrity. |
| Hidden cost or sneaky opt-out | Yes. Integrity. |
| Banned filler | No. Rewrite. |
| Empty phrase | No. Rewrite. |
| Contrast reveal | No. Rewrite. |
| Portable filler | No. Rewrite. |
| Vague button | No. Rewrite. |
| Apology error | No. Rewrite. |
| Em dash in UI copy | No. A tell. Rewrite if you are editing the line. |
| Default look | No. Name which look. See `../../ux-critique/references/slop-tells.md`. |

Quote the line. Do not paraphrase it. A rewrite must pass the portability test.

After an edit, add three lines: what changed, which pattern it fixed, and the object the new line names. The new line must fail the portability test. It must not fit another product unchanged.

## Doc prose

Run this same pass on PRD and ticket prose before you show a doc. Skill instructions may use "not" and "never". Marketing lines inside a doc may not use the banned filler list.

---

*Public draft - ui-ux-design/references/ui-copy.md - ShipRight*
