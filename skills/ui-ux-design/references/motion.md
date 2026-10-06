# Motion

Load for existing or requested animation. Do not add motion merely because this reference exists.
Use the product's sourced motion tokens. Unknown values stay Unknown; new values need design authority.

Motion should explain feedback, a state change or a spatial relationship. Repeated operator tasks should feel immediate.
If motion adds delay without useful meaning, remove or shorten it within scope.
Do not animate important numbers through fake intermediate values.

For a delegated new system, possible starting proposals are 100-160ms for small feedback and 200-300ms for panels.
These are proposals, not existing brand values or mandatory limits. Use coherent enter/exit curves and record them once.
Match transform origin to the trigger. Avoid large bounce or scale effects on critical tasks.
Prefer transform/opacity where suitable; do not use transition: all. A supported layout animation may use other properties after performance review.
Motion must remain interruptible. Repeated activation should not queue stale transitions.
Respect reduced motion with no animation or a brief non-moving change. No information may depend on motion.
Do not use shimmering skeletons, hover scaling or scroll reveals by default.

Handoff: purpose, trigger, affected element, sourced timing/easing, interruption behavior and reduced-motion alternative.
A written motion note is not proof of smooth implementation. Inspect the actual result when available.
