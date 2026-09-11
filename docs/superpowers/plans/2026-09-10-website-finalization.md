# Full Website Finalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finalize the Pie Square homepage and add the calm inner-page architecture described in the locked corporate brief.

**Architecture:** Keep the cinematic homepage composed by `components/home-experience.tsx`. Add reusable page primitives for inner-page heroes, service content, proof metrics, project cards, and contact conversion. Keep factual content in `data/site.ts`, media in `public/media/`, and motion in the existing signal/motion modules. Each route should render server-safe markup and opt into client motion only where needed.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, GSAP, Lenis, `next/image`, Vitest, and Playwright.

---

## File map

- Modify `components/home-experience.tsx`, `data/site.ts`, and `app/globals.css` for the reference-aligned homepage.
- Keep `components/ui/ai-image-generator-hero.tsx` as the supplied-logo carousel boundary.
- Audit `public/media/cinematic/`, `public/media/projects/`, and `public/media/logos/`; add only missing visuals and record them in `creative/ASSET-MANIFEST.md`.
- Create `components/inner-page.tsx`, `components/service-detail.tsx`, `components/project-grid.tsx`, and `components/contact-form.tsx` for reusable route sections.
- Create `app/company/page.tsx`, `app/capabilities/page.tsx`, `app/capabilities/telecom/page.tsx`, `app/capabilities/optical-fiber/page.tsx`, `app/capabilities/solar-energy/page.tsx`, `app/capabilities/it-solutions/page.tsx`, `app/projects/page.tsx`, `app/clients/page.tsx`, and `app/contact/page.tsx`.
- Extend `data/site.ts` with typed company, service, project, client, organization, and contact content; keep claims traceable to the locked brief.
- Extend `app/page.test.tsx`, add route/component tests beside their modules, and expand `tests/home.spec.ts` into `tests/site.spec.ts` for route and browser coverage.
- Update `README.md`, `AGENTS.md`, `creative/ASSET-MANIFEST.md`, and `tests/visual-review.md` after implementation.

### Task 1: Lock the brief in tests

**Files:** `app/page.test.tsx`, `tests/site.spec.ts`

- [ ] Assert homepage anchor order: `top`, `company`, `expertise`, `telecom`, `rf`, `fiber`, `energy`, `digital`, `impact`, `projects`, `clients`, `contact`.
- [ ] Assert the locked headings, four capability labels, seven telecom phases, and all three supplied logo paths.
- [ ] Add route smoke coverage for `/company`, `/capabilities`, `/projects`, `/clients`, and `/contact`.
- [ ] Run `npm test -- --run` and `npm run test:e2e`; capture the expected failing assertions before implementation changes.

### Task 2: Complete the homepage story

**Files:** `components/home-experience.tsx`, `data/site.ts`, `app/globals.css`

- [ ] Use the exact thirteen-part homepage sequence from `docs/superpowers/specs/2026-09-10-website-finalization-design.md`.
- [ ] Keep the screenshot-aligned copy concise, use supported metrics, and label any illustrative RF readouts as visualization-only.
- [ ] Render the supplied Nepal Telecom, Ncell, and CG Net logos in the company carousel and clients section with accurate alt text.
- [ ] Keep CTA targets valid, preserve the shared signal-line states, and verify reduced-motion and mobile overflow behavior.
- [ ] Run `npm test -- --run app/page.test.tsx data/site.test.ts` and expect focused tests to pass.

### Task 3: Audit and create missing visuals

**Files:** `public/media/cinematic/*`, `public/media/projects/*`, `creative/ASSET-MANIFEST.md`, affected route/component files

- [ ] Map every homepage and inner-page image slot to an existing asset before generating anything.
- [ ] Reuse H01 for the hero, T01–T05 for construction continuity, F01 for fiber, S01/P09 for energy, P07 for RF, P06 for digital, P01–P10 for project proof, and L01–L03 for supplied logos.
- [ ] If the telecom lifecycle still lacks credible commissioning or optimization imagery after DOM/SVG overlays, generate `T06-telecom-power-commissioning.webp` and `T07-telecom-optimization.webp` with the same camera direction, weather, and documentary grade as T01–T05.
- [ ] Generate another still only when a required section has no suitable existing asset; use a 16:9 or 4:5 composition with clear text-safe negative space and provide a local fallback.
- [ ] Add every new file to `creative/ASSET-MANIFEST.md` with ID, filename, purpose, source class, and accurate alt text. Do not generate replacement logos or unsupported client imagery.
- [ ] Run the image-loading test and inspect generated assets at desktop and mobile crops before wiring them into routes.

### Task 4: Add reusable inner-page foundations

**Files:** `components/inner-page.tsx`, `components/service-detail.tsx`, `components/project-grid.tsx`, `components/site-nav.tsx`, `app/globals.css`

- [ ] Implement a shared inner-page shell with breadcrumb/eyebrow, one `h1`, supporting copy, CTA, media slot, and footer navigation.
- [ ] Implement service detail sections for lifecycle, delivery model, technical scope, proof metrics, related projects, and CTA.
- [ ] Keep layout responsive at 390px and 1440px, use `next/image`, and reserve image dimensions to prevent layout shift.
- [ ] Write component tests for heading order, CTA links, and empty optional sections; run the focused Vitest files.

### Task 5: Build the Company, Capabilities, Projects, Clients, and Contact routes

**Files:** the route files listed in the file map, `data/site.ts`, `components/contact-form.tsx`

- [ ] Build `/company` with established-2019 history, mission/values, operating capability diagram, organization hierarchy, and Why Pie Square statements without inventing milestone years.
- [ ] Build `/capabilities` with four pillars and `Survey → Design → Deploy → Test → Optimize → Maintain` delivery flow.
- [ ] Build the four capability routes with only supported service details; include telecom RF/optimization, fiber POP/customer connectivity, solar power systems, and IT infrastructure/security/software.
- [ ] Build `/projects` with supported filters, field-proof cards, metrics, and no unsupported project detail.
- [ ] Build `/clients` with the local supplied logos plus only client names supported by repository/profile material.
- [ ] Build `/contact` with Name, Company, Phone, Email, Service Required, Project Location, and Message fields, direct contact links, map placeholder/embed boundary, and service shortcuts. Keep submission behavior explicit and non-failing until a backend is supplied.

### Task 6: Verify and document the release

**Files:** `tests/site.spec.ts`, `tests/visual-review.md`, `README.md`, `AGENTS.md`, `creative/ASSET-MANIFEST.md`

- [ ] Run `npm run lint`, `npm test -- --run`, `npm run build`, and `npm run test:e2e` serially against the production server.
- [ ] Check all routes at 1440x900 and 390x844 for console errors, broken images, focus visibility, valid navigation, and horizontal overflow.
- [ ] Record passing commands and intentional constraints in `tests/visual-review.md`; confirm no generated build artifacts or secrets are tracked.
- [ ] Review whether `@skiper-ui/skiper40` adds a required capability; do not install it if the existing custom carousel and motion system satisfy the brief.
- [ ] Commit only after verification with `feat: finalize full infrastructure website`.
