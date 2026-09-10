# Pie Square Technologies

Premium scroll-driven website for Pie Square Technologies, rebuilt with Next.js, TypeScript, GSAP/ScrollTrigger, and Lenis. The Signal editorial system presents telecom, RF, fiber, energy, digital systems, and field proof as one connected journey across the homepage and inner routes.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

- `npm run build` — production build and type-check.
- `npm run lint` — ESLint.
- `npm test -- --run` — Vitest unit/component tests.
- `npm run test:e2e` — Playwright smoke tests at desktop and mobile widths.

## Architecture

`app/layout.tsx` owns metadata and global CSS; `app/page.tsx` mounts `HomeExperience`. The homepage scenes are composed in `components/home-experience.tsx`, with shared `SceneShell`, navigation, cursor, signal line, Lenis, and reduced-motion utilities. `components/inner-page.tsx` provides the paper/carbon route shell, while service, project, and contact components reuse the same editorial primitives. `data/site.ts` keeps business content separate from presentation. `lib/motion.ts` defines the eight named signal states used by the global overlay.

## Media

Supplied project proof is under `public/media/projects/`, and the supplied company logos used by the orbiting company-section carousel are under `public/media/logos/`. Generated cinematic stills are under `public/media/cinematic/` and are documented in `creative/ASSET-MANIFEST.md`. Creative decisions and motion rules live in `creative/`; the approved implementation plan is in `docs/superpowers/plans/`.

## Contribution notes

Keep effects reversible, preserve reduced-motion behavior, use optimized `next/image` assets, and test anchors, image loading, mobile overflow, and console errors before opening a pull request. See `AGENTS.md` for the detailed contributor guide.

The project inquiry form is intentionally presentation-only until a backend is connected; direct email and phone links remain available on the contact route.
