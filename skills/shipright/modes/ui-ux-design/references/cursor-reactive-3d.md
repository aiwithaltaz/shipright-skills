# Cursor-reactive 3D

## When to use

A small turn or highlight helps acknowledge the real object.

## When NOT to use

Touch dominates or motion hides product details.

## Step-by-step prompt recipe

1. Enable only for a fine pointer.
2. Map normalized pointer coordinates to small capped rotation.
3. Dampen toward the target using the existing render loop.
4. Return to rest when pointer leaves.

## Performance, accessibility and reduced motion

Reduced motion rests. Touch continues scrolling. Keep equivalent still and any actual view controls; pause hidden or off screen, no extra loop.
Apply the shared contract in [premium-web.md](premium-web.md).
