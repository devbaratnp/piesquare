# Scroll motion and route navigation design

## Goal

Make scrolling feel intentional across the public site and prevent a new route from visibly opening at the previous page's bottom position.

## Root cause

The global stylesheet sets `html { scroll-behavior: smooth; }`. Next.js App Router performs a route scroll reset during client-side navigation, but the CSS turns that reset into a long smooth animation from the previous document position. When the old page was near its bottom, the new route first renders at a large `scrollY` before easing toward the top. Hash navigation also needs to remain supported for links such as `/contact#quote`.

## Design

### Route scroll manager

Add a client-side manager under `components/motion/` and mount it once from `app/layout.tsx`. It listens to pathname changes, then on the next animation frame:

- scrolls to the hash target with an explicit instant behavior when a target exists;
- otherwise scrolls the new route to `{ top: 0, left: 0, behavior: 'auto' }`;
- keeps same-page anchor links available for intentional in-page navigation;
- cleans up scheduled frames and does not run motion work when reduced motion is requested.

The manager is route-scoped rather than component-scoped so the behavior is consistent for every public route and does not require edits to individual link components.

### Scroll reveals

Add a shared client component under `components/motion/` using GSAP and ScrollTrigger. It observes a small, explicit set of existing selectors:

- `.atlas-reveal` homepage cards;
- `.inner-page__hero` inner-page hero blocks;
- direct children of `.inner-page__body` for section-level reveals.

Each item fades and rises into place once near the viewport. The implementation uses transforms and opacity only, staggers nearby items lightly, refreshes ScrollTrigger after route content is committed, and reverts its context when the pathname changes or the component unmounts. Existing hero animation remains unchanged.

When `prefers-reduced-motion: reduce` is active, no reveal tween is created and content remains fully visible. The existing Lenis guard continues to provide native scrolling in the same mode.

### Testing

- Add unit coverage for the route scroll manager's route-vs-hash decision logic without coupling tests to browser animation timing.
- Add a component-level assertion that the public shell mounts the motion manager.
- Add a Playwright regression that navigates from the bottom of the homepage to an inner route and verifies the heading is at the top after navigation, plus preserves `/contact#quote` hash targeting.
- Run the constrained Vitest command, lint, and the relevant Playwright checks.

## Scope boundaries

This change does not alter public copy, route structure, CMS behavior, Lenis configuration, or the legacy static prototype. It does not add a page transition overlay or animate every individual text node; the motion remains section-level and compositor-friendly.
