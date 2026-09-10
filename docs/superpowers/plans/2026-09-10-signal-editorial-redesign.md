# Signal editorial redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Rebuild the finalized Pie Square Technologies website around the approved Signal editorial visual system while preserving its factual content, route architecture, assets, section anchors, accessibility, and scroll-story behavior.

**Architecture:** Keep the Next.js App Router, HomeExperience composition boundary, typed source-of-truth data, SceneShell, Lenis/GSAP motion bridge, and reusable inner-page components. Replace the prototype-like visual layer with a coherent paper/carbon/red editorial system, refactor the homepage into smaller section primitives where useful, and align navigation and inner routes to the same design tokens.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS variables in app/globals.css, next/image, GSAP/ScrollTrigger, Lenis, Vitest, and Playwright. No new UI or animation dependency.

---

## File map and ownership

- Modify app/layout.tsx to load the selected display/body fonts and preserve metadata/JSON-LD.
- Modify app/globals.css to own the Signal editorial tokens, typography, surfaces, layout primitives, states, responsive rules, and reduced-motion fallback.
- Modify components/site-nav.tsx to add the editorial navigation treatment, active route state, mobile focus/escape behavior, and persistent project CTA.
- Modify components/home-experience.tsx to preserve the thirteen approved sections while changing their composition to editorial plates, staggered indexes, and evidence walls.
- Modify components/inner-page.tsx, components/service-detail.tsx, components/project-grid.tsx, and components/contact-form.tsx so all inner routes share the redesigned shell.
- Modify data/site.ts only when a typed presentation field is required; do not change factual claims, metrics, contact details, client names, routes, or asset paths without evidence in the existing brief.
- Modify app/page.test.tsx, the component tests beside the affected modules, and tests/site.spec.ts to lock the redesign’s structural and interaction requirements.
- Modify tests/visual-review.md and README.md with fresh verification evidence after implementation.
- Do not edit public/media/projects/ or public/media/cinematic/ unless an image path is broken; the approved asset set is already present.

## Execution notes

- Work from the current checkout and preserve unrelated user changes. Do not stage the existing untracked project files as part of any task.
- Before the first code edit, read the relevant Next.js agent guide from node_modules/next/dist/docs/ and confirm the current App Router conventions for fonts, metadata, and client/server boundaries.
- Use apply_patch for source edits. Use next/image with explicit sizes and stable aspect-ratio boxes for every meaningful image.
- Keep all claims in data/site.ts traceable to the approved spec and company-profile material.
- Commit each completed task with the imperative Conventional Commit message shown below.

### Task 1: Establish a clean baseline and lock structural acceptance tests

**Files:**
- Read: AGENTS.md, docs/superpowers/specs/2026-09-10-signal-editorial-redesign-design.md, docs/superpowers/plans/2026-09-10-website-finalization.md, node_modules/next/dist/docs/
- Modify: app/page.test.tsx, tests/site.spec.ts
- Test: repository test and build commands

- [ ] Step 1: Read the framework guidance and inspect the current test contracts

Run:

    Get-ChildItem -LiteralPath "node_modules/next/dist/docs" -File -Recurse | Select-Object FullName
    Get-Content -LiteralPath "app/page.test.tsx" -Raw
    Get-Content -LiteralPath "tests/site.spec.ts" -Raw

Confirm that the implementation continues to use App Router server/client boundaries and that the existing tests are the starting point rather than being discarded.

- [ ] Step 2: Run the current baseline checks

Run:

    npm run lint
    npm test -- --run
    npm run build

Expected: each command exits with code 0. If an existing command fails before this redesign, record the exact failure in the task notes and keep it separate from redesign regressions.

- [ ] Step 3: Add structural assertions for the approved homepage contract

In app/page.test.tsx, keep the existing render setup and assert the ordered anchors and required headings without asserting implementation-specific CSS:

    const anchors = ['top', 'company', 'expertise', 'telecom', 'rf', 'fiber', 'energy', 'digital', 'impact', 'projects', 'clients', 'why', 'contact'];

    for (const id of anchors) {
      expect(container.querySelector('#' + id)).toBeTruthy();
    }

    expect(screen.getByRole('heading', { level: 1, name: /building the infrastructure that connects nepal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /what we build/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /from survey to signal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /connecting communities/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /build the next connection with us/i })).toBeInTheDocument();

    Assert that the four capability route links, seven telecom phase labels, five impact values, and three local logo image sources remain present.

- [ ] Step 4: Add browser assertions for states that the visual redesign must preserve

In tests/site.spec.ts, extend the homepage coverage with these checks:

    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('#top h1')).toHaveCount(1);
    await expect(page.locator('a[href="/contact"]').first()).toBeVisible();
    await expect(page.locator('img[src*="nepal-telecom"], img[src*="ncell"], img[src*="cg-net"]')).toHaveCount(3);
    await expect(page.locator('body')).toHaveCSS('overflow-x', 'hidden');

    Keep the existing desktop/mobile route smoke coverage and console-error listener.

- [ ] Step 5: Run the focused tests and commit the contract

Run:

    npm test -- --run app/page.test.tsx
    npm run test:e2e -- tests/site.spec.ts --project=chromium

Expected: the focused Vitest assertions pass. Browser assertions may expose existing gaps; if so, use the failure output as the implementation checklist and commit the test contract with:

    git add -- app/page.test.tsx tests/site.spec.ts
    git commit -m "test: lock signal editorial homepage contract"

### Task 2: Install the Signal editorial design tokens and type hierarchy

**Files:**
- Modify: app/layout.tsx, app/globals.css
- Test: app/page.test.tsx

- [ ] Step 1: Add font variables without changing the route or metadata contract

Use the Next-supported font-loading approach confirmed in Task 1. Load one condensed display family and one readable body family, expose them as CSS variables, and keep the mono stack for labels. The layout must still export the existing metadata and JSON-LD.

The body should receive both font variables while retaining the JSON-LD script and children. Do not add a font package; use the framework-supported font module or an existing local/system fallback if the Next guide requires it.

- [ ] Step 2: Replace the global theme block with editorial tokens

At the top of app/globals.css, define a single palette and stable z-index scale:

    :root {
      --paper: #f1eee8;
      --paper-deep: #e4e0d7;
      --carbon: #111416;
      --carbon-soft: #1b1f21;
      --ink: #101214;
      --steel: #737a7d;
      --steel-light: #aeb3b2;
      --signal: #db2b32;
      --line-light: rgba(16, 18, 20, .16);
      --line-dark: rgba(241, 238, 232, .18);
      --page-gutter: clamp(18px, 4vw, 72px);
      --page-max: 1440px;
      --display: var(--font-display), "Arial Narrow", sans-serif;
      --body: var(--font-body), "Helvetica Neue", sans-serif;
      --mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
      --ease-heavy: cubic-bezier(.16, 1, .3, 1);
      --z-content: 1;
      --z-overlay: 10;
      --z-nav: 30;
      --z-cursor: 40;
    }

    Keep overflow-x hidden, scroll-behavior smooth when motion is allowed, the existing box-sizing reset, and a visible :focus-visible rule with a 2px signal outline and 3px offset.

- [ ] Step 3: Add shared editorial primitives and texture

Define page-wrap, eyebrow, mono-label, display-title, button, section-marker, editorial-rule, and the paper/carbon surface classes. Use a fixed grain pseudo-element or inline SVG data texture at low opacity; keep it pointer-events-free and disabled under reduced motion only if it animates.

The key button state contract is:

    .button {
      position: relative;
      display: inline-flex;
      min-height: 48px;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 0 18px;
      border: 1px solid currentColor;
      font: 600 10px/1 var(--mono);
      letter-spacing: .14em;
      text-transform: uppercase;
      transition: transform .25s var(--ease-heavy), background-color .25s ease, color .25s ease;
    }

    .button:hover { transform: translateY(-3px); }
    .button:active { transform: translateY(1px) scale(.985); }
    .button--primary { border-color: var(--signal); background: var(--signal); color: #fff; }
    .button--ghost:hover { background: var(--paper); color: var(--carbon); }

- [ ] Step 4: Update type scale and responsive primitives

Make display headlines fluid with clamp(), tight tracking, text-wrap: balance, and short line-height. Keep body text within a readable measure. Use CSS Grid for two-column layouts and min-height: 100dvh instead of fixed 100vh section heights where the section is not intentionally pinned.

- [ ] Step 5: Run the focused render test and commit the design foundation

Run:

    npm test -- --run app/page.test.tsx
    npm run lint

Expected: both commands exit 0 and the homepage still renders all structural anchors. Commit:

    git add -- app/layout.tsx app/globals.css
    git commit -m "feat: add signal editorial design foundation"

### Task 3: Redesign the global navigation and mobile menu

**Files:**
- Modify: components/site-nav.tsx, app/globals.css
- Test: components/inner-page.test.tsx, tests/site.spec.ts

- [ ] Step 1: Add active route state and explicit mobile behavior

Use usePathname() to mark the current primary route with aria-current="page" and an is-active class. Keep the client component boundary. Preserve the seven navigation destinations and the /contact CTA.

The navigation map should calculate active when the pathname equals the item path or starts with that path followed by a slash. Home must only be active at the exact root path. Render the active link with aria-current="page" and the is-active class.

- [ ] Step 2: Add keyboard-safe menu close behavior

When the menu is open, close it on Escape, keep aria-expanded, aria-controls, and aria-hidden synchronized, and close it after any mobile navigation link. Do not trap focus with a modal abstraction; the menu is a navigation panel and must remain usable with normal document focus order.

- [ ] Step 3: Style the navigation as a floating editorial index

Keep the brand lockup legible over the hero, transition the shell to a paper/carbon surface after scrolling, and use a thin active rule or signal marker rather than a pill background. Ensure the mobile panel uses full-width rows, 44px minimum touch targets, and a visible close state.

- [ ] Step 4: Extend navigation tests and commit

Add a test that renders a non-root route or mocked pathname and asserts the active link has aria-current="page". In Playwright, open the mobile menu, verify aria-expanded="true", press Escape, and verify it returns to false.

Run:

    npm test -- --run components/inner-page.test.tsx
    npm run test:e2e -- tests/site.spec.ts --project=mobile

Expected: navigation remains usable on desktop and mobile. Commit:

    git add -- components/site-nav.tsx app/globals.css components/inner-page.test.tsx tests/site.spec.ts
    git commit -m "feat: redesign editorial site navigation"

### Task 4: Recompose the homepage into editorial chapters

**Files:**
- Modify: components/home-experience.tsx, app/globals.css
- Test: app/page.test.tsx, components/project-grid.test.tsx

- [ ] Step 1: Extract small presentation helpers inside the homepage module

Keep HomeExperience as the page composition boundary. Extract only helpers with one responsibility, such as EditorialLabel, MediaPlate, CapabilityIndex, and EvidenceCard, while keeping section IDs and data mapping in the same module. Each meaningful image keeps explicit alt text and sizes.

Use this shape for the shared media plate:

    function MediaPlate({ src, alt, className = '', priority = false }: Readonly<MediaPlateProps>) {
      return (
        <figure className={'media-plate ' + className}>
          <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 720px) 100vw, 50vw" />
          <span className="media-plate__rule" aria-hidden="true" />
        </figure>
      );
    }

- [ ] Step 2: Rebuild the hero and company chapters

Make the hero left-aligned with an offset title block, compact discipline index, metadata, and two real CTAs. Keep H01 as the full-bleed image and preserve the decorative tower rings as aria-hidden.

Make the company chapter a warm editorial spread with the approved statement, company timeline, and supplied logo rail/orbit. Do not add unsupported client logos or milestones.

- [ ] Step 3: Rebuild capabilities as a staggered typographic index

Render four rows from capabilityRoutes, each with number, label, one sentence descriptor, and valid href. Keep the 01 / 04 style status visible at desktop and available to screen readers on mobile. Hover/focus should reveal the signal arrow through opacity/transform only.

- [ ] Step 4: Recompose telecom, RF, fiber, energy, digital, and impact

Preserve the approved IDs, headings, seven telecomFrames, RF visualization-only disclaimer, 2240+ KM, four energy points, digital modules, and five impact stats. Change the layout to alternating image plates and typography-led spreads:

- Telecom: right-side framed phase image, stable left copy, seven phase labels.
- RF: real P07 documentary image paired with the SVG route study; no geographic photo claim.
- Fiber: dominant number plus F01/F02 transition and narrow step index.
- Energy: bright S01/E02 image-led split with the supported 400 kW proof.
- Digital: carbon operations chapter with D01/P06 visual treatment and three semantic modules.
- Impact: proof strip with selective red emphasis and no animated fake precision.

- [ ] Step 5: Replace the project rail with an uneven evidence wall

Map the existing projects array into a masonry-like grid using real project-proof images. Vary card spans through CSS classes derived from the index, but keep captions and the /projects CTA in normal flow. Do not rely on horizontal scrolling to reveal the only copy or evidence.

components/project-grid.test.tsx must still verify all project titles and image sources render.

- [ ] Step 6: Rebuild clients, why, and closing contact chapters

Use a quiet warm-paper logo wall with three local supplied logos and supported enterprise/public-infrastructure wording. Render the four whyPieSquare entries as an editorial grid. Finish with the carbon closing plate, signal convergence, direct email/phone links, address, and /contact CTA.

- [ ] Step 7: Run focused tests and commit the homepage composition

Run:

    npm test -- --run app/page.test.tsx components/project-grid.test.tsx data/site.test.ts
    npm run lint

Expected: the homepage contract, project rendering, and data tests exit 0. Commit:

    git add -- components/home-experience.tsx app/globals.css app/page.test.tsx components/project-grid.test.tsx
    git commit -m "feat: recompose homepage as editorial infrastructure story"

### Task 5: Tune motion choreography and reduced-motion fallback

**Files:**
- Modify: components/home-experience.tsx, components/motion/lenis-provider.tsx, components/signal-line.tsx, app/globals.css
- Test: lib/motion.test.ts, app/page.test.tsx, tests/site.spec.ts

- [ ] Step 1: Keep motion state changes centralized

Preserve the named SignalState values and the SignalLine state bridge. Refactor animation selectors to target the new editorial section classes and keep cleanup in useEffect return functions. Do not add another motion library.

- [ ] Step 2: Add the new motion beats

Implement only these transitions:

    gsap.fromTo('.hero-editorial__copy', { y: 32, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.08,
    });

    gsap.fromTo('.editorial-reveal', { y: 28, opacity: 0 }, {
      y: 0,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.editorial-reveal', start: 'top 82%', once: true },
    });

Use transform/opacity for the primary transitions. Keep telecom phase changes scrubbed to section progress and keep project evidence readable when the scroll animation is disabled.

- [ ] Step 3: Verify reduced-motion behavior in code and CSS

When useReducedMotion() is true, do not instantiate Lenis or ScrollTrigger work. Under prefers-reduced-motion: reduce, override pinned/sticky chapter layouts to normal flow, show all telecom frames/labels, disable route animation, and remove the horizontal project transform.

- [ ] Step 4: Add test coverage for the motion boundary

Keep the existing pure motion tests. Add a render-level assertion that the homepage contains the signal overlay and data-signal-state values for the approved chapters. In Playwright, emulate reduced motion and verify the page still exposes all major section IDs and has no horizontal overflow.

- [ ] Step 5: Run the motion tests and commit

Run:

    npm test -- --run lib/motion.test.ts app/page.test.tsx
    npm run test:e2e -- tests/site.spec.ts --project=chromium --project=mobile

Expected: both suites exit 0 with no console errors. Commit:

    git add -- components/home-experience.tsx components/motion/lenis-provider.tsx components/signal-line.tsx app/globals.css lib/motion.test.ts app/page.test.tsx tests/site.spec.ts
    git commit -m "feat: tune signal editorial motion states"

### Task 6: Align inner routes with the redesigned visual system

**Files:**
- Modify: components/inner-page.tsx, components/service-detail.tsx, components/project-grid.tsx, components/contact-form.tsx, app/globals.css
- Test: components/inner-page.test.tsx, components/service-detail.test.tsx, components/contact-form.test.tsx, components/project-grid.test.tsx, tests/site.spec.ts

- [ ] Step 1: Update the shared inner-page shell

Keep one h1, breadcrumbs, supporting copy, CTA, optional media, content grid, and footer navigation. Change the surface treatment to the Signal editorial tokens: editorial rules, offset hero media plate, readable body measure, and no generic rounded cards.

- [ ] Step 2: Update service detail and project proof primitives

Keep lifecycle, technical scope, proof metric, related projects, and CTA sections. Use the same display/mono type hierarchy as the homepage, stable media ratios, and supported data from serviceDetails and projects. Empty optional arrays must render no empty shell.

- [ ] Step 3: Update the contact form without pretending to submit

Preserve fields for Name, Company, Phone, Email, Service Required, Project Location, and Message. Keep native labels, required state, client-side email/required validation, direct contact links, and a clear note that no backend submission is connected. Do not add a fake success message or window.alert().

- [ ] Step 4: Add route-level browser checks

For /company, /capabilities, /projects, /clients, /contact, and all four capability detail routes, assert one visible h1, a working primary nav link, no broken image responses, and no horizontal overflow at desktop/mobile widths.

- [ ] Step 5: Run focused inner-route tests and commit

Run:

    npm test -- --run components/inner-page.test.tsx components/service-detail.test.tsx components/contact-form.test.tsx components/project-grid.test.tsx
    npm run test:e2e -- tests/site.spec.ts --project=chromium --project=mobile

Expected: all inner route tests and browser smoke checks exit 0. Commit:

    git add -- components/inner-page.tsx components/service-detail.tsx components/project-grid.tsx components/contact-form.tsx app/globals.css components/*.test.tsx tests/site.spec.ts
    git commit -m "feat: align inner routes with editorial system"

### Task 7: Perform the release verification and update documentation

**Files:**
- Modify: tests/visual-review.md, README.md
- Inspect: creative/ASSET-MANIFEST.md, docs/superpowers/specs/2026-09-10-signal-editorial-redesign-design.md

- [ ] Step 1: Run the complete verification sequence

Run serially from the repository root:

    npm run lint
    npm test -- --run
    npm run build
    npm run test:e2e

Expected: every command exits 0. The e2e run must use a production server through the existing Playwright configuration and report no uncaught browser errors.

- [ ] Step 2: Run the manual viewport and accessibility checks

Inspect the homepage at 1440x900 and 390x844, plus at least one inner route at each size. Verify:

- no horizontal overflow;
- hero title and tower subject remain readable;
- all six new generated cinematic stills load from /media/cinematic/;
- supplied Nepal Telecom, Ncell, and CG Net logos load locally;
- all CTAs navigate to real paths or contact protocols;
- keyboard focus is visible;
- mobile menu opens and closes with keyboard input;
- reduced-motion mode exposes normal-flow content;
- telecom phases and project evidence remain available without scrolling animation.

- [ ] Step 3: Record evidence, constraints, and asset provenance

Update tests/visual-review.md with the exact date, commands, viewport checks, and any intentional constraints. Keep README.md aligned with the new Signal editorial description and existing run commands. Do not add generated build output, .next/, test artifacts, or secrets.

- [ ] Step 4: Review the final diff and commit documentation

Run:

    git diff --check HEAD~1..HEAD
    git status --short
    git diff --stat HEAD~6..HEAD

Confirm that only intended source, test, and documentation files are part of the redesign commits. Commit the documentation update:

    git add -- tests/visual-review.md README.md
    git commit -m "docs: record signal editorial verification"

## Plan self-review

- Spec coverage: the plan covers the approved Signal editorial palette, typography, asymmetrical composition, navigation states, all thirteen homepage chapters, generated/project asset separation, motion, reduced-motion behavior, responsive targets, inner routes, accessibility, and the required verification commands.
- Placeholder scan: no step uses TBD, TODO, implement later, fake claims, or unspecified error handling. Each implementation task names files, commands, expected outcomes, and the concrete behavior to preserve.
- Type consistency: the plan reuses the existing primaryNav, capabilityRoutes, telecomFrames, fiberSteps, energyPoints, digitalModules, impactStats, projects, companyLogos, whyPieSquare, and service data shapes. No new shared type is referenced without a defined usage boundary.
- Scope check: homepage, global navigation, shared inner-page shell, motion, and verification are intentionally one release because they share the same design tokens and interaction contract. Backend submission, CMS work, new assets, and framework migration remain out of scope.

