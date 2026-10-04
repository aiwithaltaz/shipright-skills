# Light intake - ShipRight

**Status: Public draft.** Context before generate. Product before pixels.

## Rule

Read the request and relevant existing context first. On an existing project, read the repo, the README, and the current docs before you ask. Do not ask for a fact that is already written.

Ask zero questions when the next action is clear. Otherwise ask the smallest number that changes the next decision, usually one and no more than five in one round. Do not repeat intake at each skill boundary. The limit is not permission to guess a consequential answer.

Use one decision card per question. The card format is below.

## Depth (pick once; state it in one line)

Match the work to the request. Depth decides questions, optional research and how much review output to show.

| Depth | Typical request | Questions | Optional research | Review output |
| --- | --- | --- | --- | --- |
| **Quick fix** | Copy, label, spacing, one state | 0-1 | Never | No gate table; one-line readiness only if asked |
| **Focused improvement** | One screen or flow in an existing product | 0-3 | Never by default | Only the affected checks |
| **New surface** | New screen, flow or page | 1-5 | Reference analysis if useful; ask first | Full gate at handoff only |
| **New product** | Rough idea, new product, repositioning, feature list with no clear "why" | 1-5 | Opportunity research offered; runs only if the user agrees | Frame first; gates only at handoff |

The user can change the depth. Never raise it silently. Never lower it silently.

## Ownership

Use short examples when helpful. Offer delegation and user choice as separate options:

| User response | Agent behavior |
| --- | --- |
| **You decide** | Choose within delegated scope; state the choice and reason. Do not extend delegation to price, access, external actions or unrelated scope. |
| **Let me decide** | Leave the choice with the user. Recommend if useful and continue independent work. |
| A specific answer or correction | Use current intent. Surface conflicts with older decisions or observed constraints; do not silently prefer an old document. |
| Blank, skipped or ambiguous | Keep unresolved. Offer a safe reversible proposal if useful; silence is not approval. |

An assumption label does not grant authority to decide. Apply [operating-contract.md](operating-contract.md) for authority, missing context, evidence and readiness.

Before asking the user to enumerate edge cases, examine the stated job for material alternate starting conditions, missing prerequisites and return visits. Offer a concrete recommendation within scope. Keep policy choices with their owner; do not replace product thinking with a questionnaire. Existing explicit requirements may already establish the frame.

## Decision cards

One card per question. Five cards is the maximum in one round. Zero cards is valid.

Every option has a concrete example. **My pick** names one option and the reason. The reason must come from the user's words or a recorded decision. If you have no basis, write "No pick yet". Do not invent a reason.

**You decide** applies only to that card. It does not cover price, access, legal text, or a different question. **Let me decide** means you wait on that card. You may continue work that does not depend on it. A blank answer stays unresolved. Silence is not approval.

```text
Q2. Who pays?
Why it matters: The answer changes the sign-up screen.
A) The shop owner pays. Example: one invoice for the whole shop.
B) Each staff member pays. Example: a seat on the bill for each person.
C) Something else. The user can type it.
My pick: A, because you said "for small shops".
You decide = I use A for this question only.
Let me decide = I stop on this question until you answer.
```

```text
Q1. What is the different mechanism?
Why it matters: It decides what the first version must prove.
A) Files stay locked until the invoice is paid. Example: the client sees a watermark, then pays, then downloads.
B) The app only sends reminders. Example: an email three days before the due date.
My pick: A, because reminders are what people already do by hand.
You decide = I use A for this question only.
Let me decide = I stop until you pick.
```

## Question bank

Select only unanswered questions relevant to this task; this is not a form to complete.

- **Outcome:** What changes for the user, and how would we know? Examples: invoice paid by due date, idea turned into a draft in one step.
- **Difference:** What does the user do today instead, and why is that worse? Ask this at New product depth.
- **Work:** Which flow, screen or decision? Examples: invite teammate, members empty state, permission recovery.
- **User:** Whose task are we supporting? Examples: Owner, Member, customer on mobile. Do not invent a role.
- **Constraints:** What is approved or excluded? Examples: existing tokens, no new navigation, mobile support.
- **Direction:** If UI direction is unresolved, what feeling fits, and which 1-2 real products or sites have that feeling? Do not reopen an approved direction for a small fix.

After intake, restate the job in one sentence, distinguish proposals from approvals and proceed with the authorized work. Missing context blocks only the affected commitment; help draft what is needed without inventing facts or approved scope.

Optional personal taste informs defaults only within its scope. Current project decisions and integrity requirements take precedence.
