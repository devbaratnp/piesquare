# Visual Review

## Automated checks

Verified on 2026-09-10 from the repository root:

- `npm test -- --run` — 9 Vitest files, 17 tests passed.
- `npm run lint` — passed with no ESLint errors.
- `npm run build` — Next.js production build passed and prerendered all 12 application routes.
- `npm run test:e2e` — 18 Playwright checks passed across Chromium desktop and Pixel 5 mobile profiles.

## Review scope

The browser checks cover the page title, desktop/mobile navigation, anchor navigation to `/projects`, complete signal-state DOM presence, one visible heading per inner route, broken image responses, console errors, and horizontal overflow at desktop/mobile viewports. The reduced-motion check confirms all thirteen homepage anchors and the seven telecom frames remain available in normal flow. The required stills, local logos, and project-proof images load through `next/image` during these runs.

Manual review completed at 1440×900 and 390×844 for the homepage, plus the paper projects route and dark contact route. The hero title remains within the viewport, the tower subject stays legible, the paper/carbon navigation contrast is readable, and the uneven evidence wall remains usable. The signal line remains the single shared red route, pinned scenes do not create dead scroll zones, and reduced-motion mode removes Lenis/ScrollTrigger animation work.
