# Repository Guidelines

## Project Structure & Architecture

This is a Next.js App Router homepage for Pie Square Technologies.

- `app/` contains the route, root layout, global CSS, metadata, and robots file.
- `components/home-experience.tsx` composes the continuous scene sequence; `components/scenes/` is reserved for future scene extraction.
- `components/motion/` owns Lenis, GSAP/ScrollTrigger, and reduced-motion helpers. `components/signal-line.tsx` renders the shared red signal state system.
- `data/site.ts` is the source of truth for contact details, capabilities, project proof, metrics, clients, and telecom phases.
- `lib/motion.ts` contains typed signal states and pure motion helpers.
- `public/media/cinematic/` contains generated cinematic stills; `public/media/projects/` contains supplied project proof images.
- `creative/` and `docs/` contain the approved storyboard, motion system, asset manifest, component research, prototype, and implementation plan.

## Build, Test, and Development Commands

```powershell
npm run dev             # Start the local Next.js server
npm run build           # Create and type-check the production build
npm run start           # Serve the production build
npm run lint            # Run ESLint
npm test -- --run       # Run Vitest unit/component tests
npm run test:e2e        # Run Playwright desktop/mobile smoke tests
```

## Coding Style & Naming

Use two-space indentation, TypeScript types for shared data, and small React components. Use kebab-case CSS classes (`.project-card`), camelCase functions (`normalizeProgress`), and uppercase names for signal-state constants. Keep motion effects guarded by `useReducedMotion()` and clean up GSAP/Lenis listeners in effects.

## Testing Guidelines

Vitest tests live beside the module they cover (`*.test.ts`, `*.test.tsx`). Playwright tests live in `tests/`. When changing scenes or motion, verify anchors, image loading, mobile layout, no horizontal overflow, console errors, keyboard access, and reduced-motion behavior.

## Commits & Pull Requests

Use short imperative Conventional Commit-style messages, for example `fix: prevent mobile rail overflow` or `docs: update architecture guide`. Pull requests should explain the visual/behavioral change, list checks run, link an issue when available, and include screenshots or a short recording for UI changes.

## Assets & Configuration

Do not commit secrets, `.next/`, test artifacts, or generated build output. Keep image paths rooted at `/media/`, use meaningful filenames and accurate `alt` text, and mark decorative graphics `aria-hidden="true"`. Do not add new UI libraries without checking the approved component research first.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
