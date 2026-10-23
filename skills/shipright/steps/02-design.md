# Step 2: Design (write DESIGN.md before any UI code)

**Start from a kit and one style pack.** If a [kit](../kits/README.md) fits the product type, copy its `tokens.css` and `components.css`. Then pick ONE style pack from its `styles/` folder with the scored choice below, copy its `style.css`, read its `ART.md` and open its `reference.html`. Commit to that pack on every screen. DESIGN.md names the pack, the reason, and anything you changed (250 words at most, see [word limits](word-limits.md)).

Read `PRODUCT.md`. Write `DESIGN.md` at the project root. Every later step reads it.

**First** do [Step 2a: Color](02a-color.md). The palette in PRODUCT.md wins over the pack's colors.

## Style choice must fit the audience (no default pack)
Packs: editorial (calm, refined, adult) and tactile (friendly, playful, beginner). Poster is an opt-in pack, never a default: use it only when the audience is clearly sport or competition AND the brand already looks like that. Streaks alone do not make an app competitive: almost every habit app has streaks.
Score each pack 0 to 2 on 3 signals from PRODUCT.md: the user's age and energy, the job's feel (calm daily routine, play for beginners, sport), and the Research references. Write the scores and one sentence on why the winner fits this audience in DESIGN.md. A calm consumer habit or wellness app gets a calm, refined look. On a tie, pick the calmer pack.

For sites without a kit (portfolio, marketing, store), pick a direction the same way from 3 named options, and for a redesign keep the current visual identity unless BASELINE.md says it fails the audience.

## Motion and depth
Portfolio, agency, launch or marketing: open [motion and depth](02b-motion-depth.md) and name each effect and its purpose in DESIGN.md. Utility apps: skip it.

## Type and references
1. One line: product type and who looks at it. Open the matching file in [product-references/](../product-references/README.md).
2. Pick 2 or 3 real best-in-class products of the same type and audience. Never borrow a dashboard look for a customer-facing site.
3. Describe each concretely: type, spacing, color, navigation, imagery, density.

## Shells
A customer side and an admin side get different shells with one token set. The customer side carries the brand: imagery, warm type, big tap targets, no admin sidebar. The admin side is a dense, calm tool.

## Brand mood
3 words taken from the product's own world (its place, its material, its customers), not from "nice design". A display face with character, a readable text face, a palette from that world.

## Genericness test
Before code, ask: would this plan look like any other AI-made app? If yes, push the chosen style pack harder. Avoid system fonts with a generic blue accent, and a terracotta or copper accent. Also avoid purple gradients and grey cards floating in empty space. Name one thing only this product would have.

## Tokens
2 fonts, about 6 type steps, a spacing scale, about 10 colors, radius, shadow, border. One CSS file. Fonts bundled locally. A form: [DESIGN.md template](../templates/DESIGN.md).

Next: [Step 3](03-build.md).
