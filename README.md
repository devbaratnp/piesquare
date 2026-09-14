# Pie Square Technologies

Premium scroll-driven website for Pie Square Technologies, rebuilt with Next.js, TypeScript, GSAP/ScrollTrigger, and Lenis. The Signal editorial system presents telecom, fiber, solar, IT infrastructure, and field proof as one connected journey across the homepage and reference-aligned inner routes.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

- `npm run build` — production build and type-check.
- `npm run lint` — ESLint.
- `npm test -- --run --no-file-parallelism --maxWorkers=1` — reliable single-worker Vitest run for this machine.
- `npm run test:e2e` — Playwright smoke tests at desktop and mobile widths.

## Routes

The reference-aligned site includes:

- `/` — continuous homepage signal journey and proof wall.
- `/company` — company story, values, approach, workforce, coverage, and industries.
- `/capabilities` — four service divisions and delivery standard.
- `/capabilities/telecom`, `/capabilities/optical-fiber`, `/capabilities/solar-energy`, `/capabilities/it-solutions` — detailed capability rows and related projects.
- `/projects` — filterable portfolio of eight project records.
- `/careers` — six current role templates with application links.
- `/certifications` — certification and compliance records with transparent pending-verification states.
- `/contact` — direct contact details and project/message/site-survey forms.

## Architecture

`app/layout.tsx` owns metadata and the self-hosted Young Serif / Instrument Sans font pairing; `app/page.tsx` mounts `HomeExperience`. Homepage scenes are composed in `components/home-experience.tsx`, with shared `SceneShell`, navigation, cursor, signal line, Lenis, and reduced-motion utilities. `components/inner-page.tsx` provides the reference-style paper route shell, while service, project, careers, certifications, and contact components reuse the same editorial primitives. `data/site.ts` is the source of truth for business content and route records. `lib/motion.ts` defines the named signal states used by the global overlay.

The initializing screen has been removed so the first frame opens directly into the hero experience. The navigation mirrors the reference hierarchy with Home, About Us, a Services dropdown, Projects, Capabilities, Certifications, Careers, Contact, and Request a Quote.

## Media

Supplied project proof is under `public/media/projects/`, and the supplied company logos used by the homepage client carousel are under `public/media/logos/`. Generated cinematic stills are under `public/media/cinematic/` and are documented in `creative/ASSET-MANIFEST.md`. The approved content plan and visual review notes live under `docs/` and `tests/`.

## Contribution notes

Keep effects reversible, preserve reduced-motion behavior, use optimized `next/image` assets, and test anchors, image loading, mobile overflow, keyboard access, and console errors before opening a pull request. See `AGENTS.md` for detailed contributor guidance.

The project inquiry and contact forms are intentionally presentation-only until a backend is connected; direct email, phone, and WhatsApp links remain available on the contact route.
