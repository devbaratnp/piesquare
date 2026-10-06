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
- `/projects` — filterable portfolio of twelve project records with detail pages.
- `/careers` — three current role templates plus a general CV application.
- `/contact` — direct contact details and project/message/site-survey forms.

## Architecture

`app/layout.tsx` owns metadata and the self-hosted Young Serif / Instrument Sans font pairing; `app/page.tsx` mounts `HomeExperience`. Homepage scenes are composed in `components/home-experience.tsx`, with shared `SceneShell`, navigation, cursor, signal line, Lenis, and reduced-motion utilities. `components/inner-page.tsx` provides the reference-style paper route shell, while service, project, careers, and contact components reuse the same editorial primitives. `data/site.ts` is the source of truth for business content and route records. `lib/motion.ts` defines the named signal states used by the global overlay.

The initializing screen has been removed so the first frame opens directly into the hero experience. The navigation mirrors the reference hierarchy with Home, About Us, a Services dropdown, Projects, Capabilities, Careers, Contact, and Request a Quote.

## Media

Supplied project proof is under `public/media/projects/`, and the supplied company logos used by the homepage client carousel are under `public/media/logos/`. Generated cinematic stills are under `public/media/cinematic/` and are documented in `creative/ASSET-MANIFEST.md`. The approved content plan and visual review notes live under `docs/` and `tests/`.

## Contribution notes

Keep effects reversible, preserve reduced-motion behavior, use optimized `next/image` assets, and test anchors, image loading, mobile overflow, keyboard access, and console errors before opening a pull request. See `AGENTS.md` for detailed contributor guidance.

The project inquiry and contact forms remain presentation-only by design; direct email, phone, and WhatsApp links remain available on the contact route.

## CMS and MySQL setup

The public site has a safe static fallback, while homepage hero content, contact settings, published services, published projects, and media can be managed through the Node.js/MySQL admin layer.

For the complete setup, migration, deployment, backup, and troubleshooting instructions, see [docs/backend-setup.md](docs/backend-setup.md).

1. Copy `.env.example` to `.env.local` and set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and a long random `SESSION_SECRET`.
2. Run `server/schema.sql` against the MySQL database, then run `server/seed.sql` to migrate the verified contact, hero, about, service, and project content.
   For an existing CMS database, run `server/migrations/001_add_project_status.sql` before using the Projects progress field.
3. Create the first administrator with `npm run admin:create -- admin@example.com "a-long-password" "Administrator name"`.
4. Run `npm run dev` and open `/admin/login`.

Admin routes are protected with an HttpOnly, SameSite cookie containing an HMAC-signed session. Passwords are bcrypt-hashed. The API uses parameterized MySQL statements, validates slugs/statuses, archives services and projects instead of deleting them, validates image uploads, and returns the static public content when the database is unavailable. The dashboard includes Homepage, Services, Projects, and Media modules.

Client-supplied imagery is stored under `public/media/client/` and is used for fiber deployment, fiber testing, solar plant, transformer, and digital operations surfaces. The original legacy prototype files at the repository root remain untouched.
