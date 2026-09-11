# Motion system

## State contract

The global signal renderer accepts one of: `HERO_TRANSMIT`, `MAP_ROUTE`, `TELECOM_BUILD`, `RF_DRIVE`, `FIBER_LIGHT`, `ENERGY_CURRENT`, `DIGITAL_NETWORK`, or `FINAL_CONVERGENCE`. Each scene reports normalized progress and a state. The renderer owns the fixed overlay, glow, masks, path geometry, and state transition.

## Timing

- Scene handoffs: 1.2–2.2 seconds with `expo.inOut` or `power4.inOut`.
- Text and metadata reveals: 0.35–0.65 seconds with `power3.out`.
- Parallax: maximum 24px on desktop, reduced below 768px.
- Loader: one session-only pass, capped at two seconds.
- ScrollTrigger pins: long enough to read, short enough to avoid dead zones; inspect each at desktop and mobile sizes.

## Implementation rules

Use transforms, opacity, SVG stroke progress, and CSS variables. One GSAP ticker drives Lenis and one ScrollTrigger context owns each scene. Scene cleanup kills triggers and event listeners. Do not run a continuous animation loop for an off-screen scene. WebGL is optional, dynamically imported, and disabled for mobile or reduced motion.

## Reduced motion

When `prefers-reduced-motion: reduce` is active, use native scrolling, show static signal states, remove cursor movement and loader sweeps, shorten pins, and keep content visible without scrubbed transitions.
