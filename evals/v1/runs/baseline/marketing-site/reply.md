Your build pack and home page are ready. Cursor can build the home page and the application form now. Before launch you still need to give me three things: privacy text, the tool that stores applications, and how long free access lasts.

**Home page preview:** `index.html`
It is one page with one job: get serious testers to apply.
1. Header: the SocialGhost wordmark and an "Apply" link.
2. Hero: "Limited beta" badge, "Make faceless YouTube videos with AI.", a line saying the tool is live, one "Apply for the beta" button, and the deal: free access for useful feedback within 2 to 3 days.
3. How the beta works: Apply, Get access if selected, Test and send feedback.
4. Apply section: who should apply, what useful feedback looks like, and a short form. It asks for name, email, YouTube channel (optional), what videos they want to make, and a required tick: "I can send feedback within 2 to 3 days."
5. Footer.

On phones, an "Apply for the beta" bar stays at the bottom of the screen until the form comes into view.
The form shows sending, sent, failed and too-many-attempts messages. A failed send keeps every answer. In this preview no server is connected, so submitting says "Preview only. Nothing was sent." To see the other states, add `?preview=invalid`, `?preview=error` or `?preview=sent` to the URL.

**What I decided for you (you said "You decide")**
- After someone applies, you read the application and email access to the people you pick. The page does not promise a reply time.
- The form sends to one endpoint, `POST /api/apply`. It stores the application and notifies you.
- The page has no fake proof: no samples, quotes, ratings or user counts. The hero picture is a drawn, faceless ghost in a video frame. It is not a screenshot of the app.
- The look: a text wordmark (no logo), Space Grotesk and Inter fonts, black buttons and one indigo accent. No animation. All of this is in DESIGN.md and easy to swap.

**What I could not decide**
- **What the tool does, step by step.** I only know it is a live AI tool that makes faceless YouTube videos, so the page says only that. Send me the steps or real sample videos and I will add a "What it makes" section.
- **How long free access lasts.** The page says "free access" and nothing more. This is your policy to set.
- **Privacy text.** The form collects names and emails, so it needs a privacy notice before launch. I do not write legal text. The privacy link is left off until you have the text. This blocks launch.
- **Where applications are stored and how you are notified.** For example, a table you own plus an email to you. The endpoint is specified so Cursor can build it now and connect your tool later.

**Files for Cursor** (copy into your project root)
- `PRODUCT.md`: scope, what is excluded, open decisions
- `DESIGN.md`: colors, type, spacing, components, placement, with measured contrast
- `docs/shipright/01-prd.md`: goal, beta deal, decision log D1 to D11
- `docs/shipright/02-technical-architecture.md`: endpoint contract and validation
- `docs/shipright/03-security-and-access.md`: who can see applicant data
- `docs/shipright/04-frontend-spec.md`: every element, form field, state, piece of copy and acceptance check
- `docs/shipright/05-feature-ticket-list.md`: tickets T1 to T9, in build order
- `docs/shipright/build-rules.md`: rules for the coding tool
- `.cursor/rules/socialghost.mdc`: tells Cursor to read the files above first

To start in Cursor, say: "Read .cursor/rules/socialghost.mdc and build ticket T1."

**Status**
- Build: ready for the home page and `/api/apply`.
- Launch: waits on your decisions on privacy text, storage tool and free access terms. The privacy link check is a Fail until the text exists.
- Not checked: I have not rendered or tested the preview in a browser. Keyboard use, screen readers, phone layout and real sending all need checking in the built site. Ticket T9 lists those checks.
