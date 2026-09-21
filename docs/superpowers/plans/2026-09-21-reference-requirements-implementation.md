# Reference requirements implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic marketing content with the six supplied DOCX requirements while preserving the existing Next.js, TypeScript, GSAP, Lenis, responsive, and presentation-only form architecture.

**Architecture:** Keep `data/site.ts` as the business-content source of truth. Add a typed project-detail route driven by the same records, update existing scenes/pages to consume the approved content, and add focused tests for the new content and navigation behavior. Remove the rejected Certifications navigation and CTA usage without adding a backend.

**Tech Stack:** Next.js App Router 16, React 19, TypeScript, Tailwind v4 CSS, Vitest, Playwright, GSAP/ScrollTrigger, Lenis.

---

### Task 1: Lock the approved content contract with failing tests

**Files:**
- Modify: `data/site.test.ts`
- Modify: `app/page.test.tsx`
- Modify: `app/company/page.test.tsx`
- Modify: `app/capabilities/page.test.tsx`
- Modify: `app/projects/page.test.tsx`
- Modify: `app/careers/page.test.tsx` if needed
- Modify: `app/contact/page.test.tsx`
- Create: `app/not-found.test.tsx`

- [x] **Step 1: Add assertions for the supplied headline, CTA, delivery flow, project titles, service counts, careers roles, removed Certifications navigation, and branded 404.**
- [x] **Step 2: Run `npx vitest run data/site.test.ts app/page.test.tsx app/company/page.test.tsx app/capabilities/page.test.tsx app/projects/page.test.tsx app/contact/page.test.tsx app/not-found.test.tsx` and confirm failures come from missing approved content, not test setup errors.**

### Task 2: Replace shared business data

**Files:**
- Modify: `data/site.ts`

- [x] **Step 1: Replace `primaryNav`, `serviceNav`, `companyLogos`, capability summaries, project records, service details, careers, and metrics with the DOCX-approved names and copy.**
- [x] **Step 2: Add typed fields for project slug, client, operator, duration, overview, glance metrics, scope groups, role details, and map URL.**
- [x] **Step 3: Remove Certifications from `primaryNav` and keep no certification record in the public navigation data.**
- [x] **Step 4: Run the focused tests and confirm the content contract passes.**

### Task 3: Implement the homepage requirements

**Files:**
- Modify: `components/home-experience.tsx`
- Modify: `components/ui/ai-image-generator-hero.tsx`
- Modify: `app/globals.css` only where the new blocks need layout rules

- [x] **Step 1: Change the hero headline, button labels, address treatment, and remove the scroll cue.**
- [x] **Step 2: Change the About CTA to a real `/company` link, remove the orbit logos, and render the requested Who We Are content.**
- [x] **Step 3: Rename the homepage capability block to “WHAT WE DELIVER,” render the requested four divisions, and add the “HOW WE DELIVER” flow.**
- [x] **Step 4: Render the six approved homepage projects with status and linked detail routes.**
- [x] **Step 5: Render the six approved trusted-client logos and supporting line, plus the persistent call/WhatsApp actions requested by the brief.**
- [x] **Step 6: Run homepage Vitest tests and the desktop/mobile Playwright homepage checks.**

### Task 4: Implement About, capabilities, and service details

**Files:**
- Modify: `app/company/page.tsx`
- Modify: `app/capabilities/page.tsx`
- Modify: `components/service-detail.tsx`
- Modify: `app/capabilities/telecom/page.tsx`
- Modify: `app/capabilities/optical-fiber/page.tsx`
- Modify: `app/capabilities/solar-energy/page.tsx`
- Modify: `app/capabilities/it-solutions/page.tsx`
- Modify: `app/company/page.test.tsx`
- Modify: `app/capabilities/page.test.tsx`

- [x] **Step 1: Replace the About Us strength, vision, mission, values, approach, workforce, industries, and geography content with the approved copy.**
- [x] **Step 2: Add the six-item 3x2 delivery-capabilities block.**
- [x] **Step 3: Match Telecom, Fiber, Solar & Electrical, and IT service names, lifecycle lists, technical scopes, and numbered delivery points.**
- [x] **Step 4: Run the focused page tests and verify every supplied service count.**

### Task 5: Add project detail routes and careers/contact requirements

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `app/projects/[slug]/page.test.tsx`
- Modify: `components/project-grid.tsx`
- Modify: `components/service-detail.tsx`
- Modify: `components/careers-list.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/inner-page.tsx`
- Modify: `components/site-nav.tsx`
- Create: `components/floating-contact.tsx`

- [x] **Step 1: Wrap project cards and related-project cards in links to the new slug route.**
- [x] **Step 2: Render project hero metadata, glance metrics, overview, scope groups, role, coverage, and delivery focus from the typed project record.**
- [x] **Step 3: Replace current careers records with the three supplied vacancies and add a general CV application form with a desired-position field, keeping it presentation-only.**
- [x] **Step 4: Add the supplied Google Maps link and remove the “Discuss a Project” CTA from inner-page and site navigation where the requirements reject it.**
- [x] **Step 5: Add the floating call/WhatsApp control and test its links and mobile behavior.**
- [x] **Step 6: Run route and interaction tests.**

### Task 6: Add branded 404 and SEO cleanup

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/not-found.test.tsx`
- Create: `app/sitemap.ts`
- Modify: `app/layout.tsx`
- Modify: page metadata exports as needed

- [x] **Step 1: Render a branded 404 with Home and Contact navigation.**
- [x] **Step 2: Add a sitemap for the public routes and project detail slugs.**
- [x] **Step 3: Remove the global root canonical override and give public routes route-appropriate canonical metadata.**
- [x] **Step 4: Run the 404, sitemap, and metadata checks.**

### Task 7: Full verification and audit update

**Files:**
- Modify: `WEBSITE_COMPLETION_AUDIT.md`

- [x] **Step 1: Run `npm test -- --run --no-file-parallelism --maxWorkers=1`.**
- [x] **Step 2: Run `npm run lint`.**
- [x] **Step 3: Run `npm run build`.**
- [x] **Step 4: Run `npm run test:e2e`.**
- [x] **Step 5: Smoke-test the public routes, project details, unknown route, robots, sitemap, direct contact links, and no horizontal overflow.**
- [x] **Step 6: Update the audit with verified statuses and remaining issues; do not claim production readiness if a P1 remains.**
