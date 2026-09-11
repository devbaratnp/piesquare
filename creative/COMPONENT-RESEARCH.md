# Component research

## Vengeance UI

Source: [Vengeance UI components](https://www.vengenceui.com/components)

| Primitive | Useful idea | Decision |
| --- | --- | --- |
| Scroll Dissolve Reveal | Scroll-linked image dissolve using shader masks | Study the reveal timing; use CSS/SVG masks first to avoid a canvas for ordinary images |
| Animated Number / Stats Counter | Numeric transition tied to scroll | Rebuild as a small GSAP helper so facts stay in `data/` |
| Image Trail | Cursor-following image echo | Skip for the first pass; project proof needs legibility and touch support |
| Perspective Carousel | Depth and offset gallery | Borrow spacing language only; use a keyboard-accessible horizontal rail |
| Light Lines / Perspective Grid | Technical atmospheric background | Rebuild as lightweight CSS/SVG layers |
| Ripple Displacement / WebGL treatments | Fluid image transitions | Reserve for a later experiment if a real scene needs it; no dependency in the base page |

## Skiper UI

Source: [Skiper UI quick start](https://skiper-ui.com/docs/quick-start)

The documented command is a shadcn registry command, not an npm package install. The `@skiper-ui/skiper40` registry item was not resolvable through `npm view`, so no package is installed. A custom navigation and cursor are a better fit for the signal-state contract. Revisit the registry component only if its source directly supports the compact scrolled navigation without importing unrelated demo behavior. If used, preserve the required attribution or license terms documented by Skiper UI.

## Current decision

Use ideas, not library defaults. GSAP/ScrollTrigger and Lenis remain the only required motion dependencies. CSS/SVG handle the visible signal, topology, grid, and construction layers.
