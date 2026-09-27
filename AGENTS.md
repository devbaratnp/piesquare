# Repository Guidelines

Next.js App Router marketing site for Pie Square Technologies. TypeScript, GSAP/ScrollTrigger + Lenis, Tailwind v4. No CI. Public pages render from static data with an optional MySQL-backed admin CMS overriding content when configured.

## Commands (PowerShell)

```powershell
npm run dev             # local server on :3000
npm run build           # production build + type-check (uses --webpack, keep the flag)
npm run lint            # ESLint (next core-web-vitals + typescript)
npm test -- --run --no-file-parallelism --maxWorkers=1   # reliable Vitest run on constrained machines
npx vitest run <path>   # single test file, e.g. npx vitest run components/site-nav.test.tsx
npm run test:e2e        # builds, then serves :3100 and runs Playwright (chromium + Pixel 5, workers: 1)
```

`npm run test:e2e` is expensive (full build first). Prefer targeted Vitest, then lint; run e2e only when scenes, nav, images, or layout change.

## Architecture

- `app/page.tsx` mounts `components/home-experience.tsx` (homepage scene sequence). `components/inner-page.tsx` is the paper-style shell for all non-home routes.
- `data/site.ts` is the source of truth for business content and route records — edit copy/data there, not in components. `server/content.ts:getPublicContent()` returns DB content when MySQL is configured and falls back to `data/site.ts` otherwise (including on query failure).
- `lib/motion.ts` defines the named signal states consumed by `components/signal-line.tsx` (global overlay). Motion setup lives in `components/motion/`.
- Path alias `@/*` maps to repo root (`tsconfig.json`). `next.config.ts` pins `experimental.cpus: 1` — do not remove.
- Contact / project-inquiry forms are presentation-only by design (README). Do not wire a backend unasked; email/phone/WhatsApp links are the real contact path.
- Root `index.html`, `script.js`, `styles.css` are a legacy static prototype. Never edit; the Next.js app is the source of truth.
- ESLint ignores `creative/prototypes/**` — prototype code there is exempt from lint.

## Admin CMS (MySQL, optional)

- Setup: copy `.env.example` to `.env.local` (`DB_*`, `SESSION_SECRET`; `.env*` is gitignored), run `server/schema.sql` then `server/seed.sql`, create the first admin with `npm run admin:create -- <email> "<10+char-password>" "<name>"`, log in at `/admin/login`.
- The public site works without a DB — never require it for frontend work. `server/db.ts:isDatabaseConfigured()` gates the pool; all public reads degrade to static data.
- Auth is an HMAC-signed token (`lib/admin-auth`) in HttpOnly SameSite=strict cookie `piesquare_admin_session` (8h); the login route rate-limits attempts.
- Admin API uses parameterized queries. Service/project DELETE soft-archives (`status = 'ARCHIVED'`); media DELETE hard-deletes. Valid statuses: `DRAFT` / `PUBLISHED` / `ARCHIVED`.

## Motion & style

- Guard all motion with `useReducedMotion()`; reduced-motion must still render every scene anchor (`#top`, `#company`, `#expertise`, `#telecom`, `#rf`, `#fiber`, `#energy`, `#digital`, `#impact`, `#projects`, `#clients`, `#why`, `#contact`). The e2e suite asserts this.
- Clean up GSAP/ScrollTrigger/Lenis listeners in effect teardowns.
- Two-space indent, small components, typed shared data. Images via `next/image` with paths under `/media/` (`public/media/...`), accurate `alt`, `aria-hidden="true"` on decorative graphics. Do not add UI libraries without checking `creative/` component research first.

## Testing

- Vitest files colocate with modules (`*.test.ts(x)`); jsdom with a `matchMedia` mock in `vitest.setup.ts`.
- Playwright specs live in `tests/site.spec.ts` and enforce: zero console errors, zero broken images on inner routes, no horizontal overflow (`scrollWidth <= viewport + 1`), exactly one visible `h1`, working desktop + mobile nav. Verify these manually when touching scenes or layout.

## Commits & PRs

Short imperative Conventional Commits (`fix: prevent mobile rail overflow`). PRs: visual/behavioral change, checks run, screenshots or short recording for UI changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
