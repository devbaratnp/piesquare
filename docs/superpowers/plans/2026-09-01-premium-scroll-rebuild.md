# Premium scroll rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Pie Square static prototype as a performant Next.js site with a continuous signal-to-infrastructure narrative and fully art-directed scroll choreography.

**Architecture:** Creative direction and media are locked before scene implementation. The App Router page composes vertical-slice scene components around one fixed global `SignalLine` renderer. Scenes report named signal states, while GSAP/ScrollTrigger controls progress and Lenis provides smooth scrolling where motion is allowed.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, GSAP, ScrollTrigger, Lenis, Vitest, Playwright smoke checks, SVG/CSS/DOM motion, optional dynamically imported WebGL.

---

## File map

- Create `creative/SCENE-STORYBOARD.md`, `creative/STYLEFRAMES.md`, `creative/COMPONENT-RESEARCH.md`, `creative/FLOW-SHOT-LIST.md`, `creative/ASSET-MANIFEST.md`, and `creative/MOTION-SYSTEM.md` for the authored visual system.
- Create `public/media/cinematic/`, `public/media/projects/`, and `public/media/video/`. Existing images are project proof; generated stills are cinematic brand visuals.
- Create `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, and `vitest.config.ts` for the application and checks.
- Create `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, and `app/robots.ts` for the shell, metadata, composition, tokens, and crawler rules.
- Create shared UI in `components/`: `site-nav.tsx`, `custom-cursor.tsx`, `signal-line.tsx`, `scene-shell.tsx`, and `project-gallery.tsx`.
- Create motion utilities in `components/motion/`: `lenis-provider.tsx`, `scroll-timeline.ts`, `reveal.tsx`, and `reduced-motion.ts`.
- Create factual content in `data/site-content.ts`, `data/projects.ts`, `data/metrics.ts`, and `lib/media.ts`.
- Keep the current root prototype files intact during migration for visual reference. Archive or remove them only after the new page has passed visual checks.

### Task 0: Creative lock and media direction

**Goal:** Lock composition, transitions, motion rules, and cinematic media before final scene layout.

**Files:** `creative/SCENE-STORYBOARD.md`, `creative/STYLEFRAMES.md`, `creative/COMPONENT-RESEARCH.md`, `creative/FLOW-SHOT-LIST.md`, `public/media/cinematic/`

- [x] Review the existing `index.html`, `styles.css`, `script.js`, `README.md`, and supplied company material. Record which content is retained and which prototype visuals are discarded.
- [x] Write `SCENE-STORYBOARD.md` with the complete sequence: loader → hero tower → Nepal topology → capabilities → telecom build → RF route → fiber beam → solar current → digital network → final convergence.
- [x] Write `STYLEFRAMES.md` for SF01 Hero, SF02 Telecom construction, SF03 RF engineering, SF04 Fiber macro, SF05 Project proof, SF06 Solar, and SF07 Final CTA. Each frame must define composition, typography placement, palette, signal-line role, and transition out.
- [x] Create the first cinematic still set before scene layout: `H01 hero-nepal-tower.webp`, `T01 telecom-survey.webp`, `T02 telecom-foundation.webp`, `T03 telecom-tower.webp`, `T04 telecom-equipment.webp`, `T05 telecom-live.webp`, `F01 fiber-macro.webp`, and `S01 solar-telecom.webp`. Keep the five telecom frames on one camera angle and lighting progression; if continuity cannot be maintained, use H01 plus layered SVG/DOM construction for the build sequence.
- [x] Write `COMPONENT-RESEARCH.md` after inspecting Vengeance UI primitives for scroll dissolve, animated numbers, displacement, perspective imagery, light lines, image trails, and WebGL treatments, plus Skiper primitives for navigation, cursor, buttons, and microinteractions. Record the useful behavior, dependency cost, and restyling decision for each. Do not install a component without a specific use.
- [x] Write `FLOW-SHOT-LIST.md` for V01 hero tower, V02 fiber macro, V03 solar infrastructure, and optional V04 engineering detail montage. Record duration, camera motion, first frame, last frame, aspect ratio, loop behavior, compression target, and still/mobile fallback.
- [x] Build a small isolated prototype proving RF signal → route → fiber beam. Validate the visual timing and geometry before building the page scenes.
- [x] Record every media item in `ASSET-MANIFEST.md` with ID, filename, purpose, and source class: `COMPANY`, `AI-CINEMATIC`, `GENERATED-GRAPHIC`, or `FLOW-REQUIRED`.

### Task 1: Scaffold the architecture and design system

**Files:** `package.json`, config files, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `data/*`, `lib/media.ts`

- [ ] Write a failing render test for the page shell that asserts a `main` element, navigation anchors, and the page title exist.
- [ ] Run `npm test -- --run` and confirm the test fails because the Next.js shell is absent.
- [ ] Create the Next.js App Router project files and install `next`, `react`, `react-dom`, `gsap`, and `lenis`; add `typescript`, Vitest, jsdom, Testing Library, Playwright, and the Next/ESLint type packages for checks.
- [ ] Define the Pie Square tokens in Tailwind/CSS: signal red `#EA2027`, carbon `#080A0C`, graphite `#101317`, steel `#899099`, and infrastructure white `#F3F1EC`. Add the selected display and mono fonts with local fallbacks.
- [ ] Move factual copy and project metadata into `data/` without inventing values, dates, clients, or locations not supported by the supplied material.
- [ ] Run `npm test -- --run` and `npm run build`; confirm the shell test passes and the production build exits with code 0.

### Task 2: Implement the global motion and signal engine

**Files:** `components/motion/*`, `components/signal-line.tsx`, `components/scene-shell.tsx`, `lib/motion.ts`, tests under `lib/`

- [ ] Write failing unit tests for `clamp01`, normalized progress, signal-state validation, and reduced-motion behavior.
- [ ] Run the focused tests and confirm they fail because the helpers are missing.
- [ ] Implement `LenisProvider` with a single GSAP ticker loop, `ScrollTrigger.update` synchronization, cleanup on unmount, and native scrolling when reduced motion is enabled.
- [ ] Implement one fixed global `SignalLine` renderer. Scenes report only these states: `HERO_TRANSMIT`, `MAP_ROUTE`, `TELECOM_BUILD`, `RF_DRIVE`, `FIBER_LIGHT`, `ENERGY_CURRENT`, `DIGITAL_NETWORK`, and `FINAL_CONVERGENCE`.
- [ ] Use scene-specific SVG path geometry, masks, and path morphing on desktop. Use simplified geometry on mobile. Do not create independent decorative red-line systems inside scenes.
- [ ] Scope all ScrollTrigger instances to their scene component and kill them during cleanup. Prefer transforms, opacity, SVG stroke progress, and CSS variables over layout-triggering properties.
- [ ] Run focused tests and `npm run build`; confirm browser-only motion code does not execute during server rendering.

### Task 3: Finish the hero vertical slice

**Files:** `components/scenes/loader-scene.tsx`, `hero-scene.tsx`, `components/site-nav.tsx`, `components/custom-cursor.tsx`, `public/media/cinematic/H01*`

- [ ] Add semantic hero markup, skip navigation, keyboard-visible focus styles, cinematic image/video fallback, and the loader session guard.
- [ ] Implement the hero timeline: subtle camera push, tower emphasis, antenna lights, RF rings, and one signal separating from the tower into `HERO_TRANSMIT`.
- [ ] Add the transparent initial navigation, compact dark scrolled state, contextual desktop cursor labels, and touch-native fullscreen mobile menu.
- [ ] Use H01 with negative space for the headline. If V01 is absent, keep the still and restrained parallax fallback without requesting the video on initial load.
- [ ] Test at 1920x1080, 1440x900, 768x1024, 430x932, and 390x844. Check focus order, image crop, loader duration, reduced motion, and no horizontal overflow.

### Task 4: Finish the telecom and RF vertical slices

**Files:** `components/scenes/company-scene.tsx`, `capabilities-scene.tsx`, `telecom-scene.tsx`, `rf-scene.tsx`, `public/media/cinematic/T01*` through `T05*`

- [ ] Build the company scene around abstract Nepal topology and the `MAP_ROUTE` state. Keep it technical and non-political.
- [ ] Build the capabilities scene with five disciplines and environment changes driven by the signal state, not generic service cards.
- [ ] Build telecom phases in order: survey, civil works, tower erection, equipment installation, power systems, and network live. Use the coherent T01-T05 sequence when continuity is valid; otherwise layer one master image with SVG geometry.
- [ ] Transition the telecom signal into `RF_DRIVE`. Render route, cellular nodes, coverage field, and clearly labeled visualization-only metrics. Do not present dummy measurements as project results.
- [ ] Run unit tests, `npm run build`, and a complete desktop/mobile scroll-through. Inspect pin duration, dead scroll zones, layer collisions, and signal continuity.

### Task 5: Finish fiber and energy vertical slices

**Files:** `components/scenes/impact-scene.tsx`, `fiber-scene.tsx`, `energy-scene.tsx`, `public/media/cinematic/F01*`, `public/media/cinematic/S01*`

- [ ] Animate impact metrics as one statistic per viewport using the verified number helper. Keep source facts in `data/metrics.ts`.
- [ ] Transform `RF_DRIVE` into `FIBER_LIGHT`: macro beam, route line, survey/lay/splice/test/connect/maintain labels, then transition into real project proof.
- [ ] Transform fiber light into `ENERGY_CURRENT`, reveal the solar installation, and keep environmental color changes restrained and tied to the signal.
- [ ] Load F01 and S01 as cinematic brand visuals with still fallbacks for optional V02/V03 videos. Add the two assets to the manifest with `AI-CINEMATIC` source labels.
- [ ] Test timing, crop, reduced motion, and mobile simplification at all required sizes.

### Task 6: Finish proof, digital, clients, and final convergence

**Files:** `components/scenes/projects-scene.tsx`, `digital-scene.tsx`, `clients-scene.tsx`, `final-cta-scene.tsx`, `components/project-gallery.tsx`

- [ ] Build the real project gallery from `public/media/projects/` with consistent crop, muted grade, grain, metadata, accurate alt text, and explicit company-proof labeling.
- [ ] Flatten the energy grid into `DIGITAL_NETWORK` and present IT, networking, cybersecurity, CCTV, software, web, and system integration as editorial typography with architectural topology.
- [ ] Build the client section from supported names only, using a slow monochrome-to-color or topology transition without rotating 3D effects.
- [ ] Converge all prior signal states into `FINAL_CONVERGENCE`, reveal the Pie Square identity, and provide working project/contact links.
- [ ] Add optional lazy video elements with poster images and absent-file-safe fallbacks. Verify that non-hero media does not download before its scene is near the viewport.

### Task 7: Metadata, component review, and documentation

**Files:** `app/layout.tsx`, `app/robots.ts`, `creative/*`, `README.md`, `AGENTS.md`

- [ ] Add Open Graph metadata, canonical metadata, favicon references, Organization JSON-LD, and crawler rules using only supported company facts.
- [ ] Re-check Vengeance and Skiper source against the finished design. Run `npx shadcn@latest add @skiper-ui/skiper40` only if the reviewed primitive is actually used; otherwise keep the custom implementation and document why.
- [ ] Update `README.md` and `AGENTS.md` with `npm install`, `npm run dev`, `npm run build`, `npm start`, lint, unit test, and Playwright commands.
- [ ] Confirm `creative/ASSET-MANIFEST.md` distinguishes all `COMPANY`, `AI-CINEMATIC`, `GENERATED-GRAPHIC`, and `FLOW-REQUIRED` assets.

### Task 8: Performance and final visual acceptance

**Files:** `tests/home.spec.ts`, `tests/visual-review.md`, all affected source files

- [ ] Add a Playwright smoke test that starts the production server, checks the title and navigation anchors, confirms no uncaught page errors, and verifies no horizontal overflow at 390px.
- [ ] Run `npm run lint`, `npm test -- --run`, `npm run build`, and the Playwright smoke test. Record command results in `tests/visual-review.md`.
- [ ] Capture screenshots at 1920x1080, 1440x900, 1280x800, 768x1024, 430x932, and 390x844. Review typography, negative space, crop, signal continuity, collisions, navigation state, and CTA visibility.
- [ ] Record one complete desktop scroll-through and review dead zones, pin distances, competing motion, abrupt cuts, and transitions that start or finish too early.
- [ ] Run Lighthouse on a production build with a target Performance score of at least 90, CLS below 0.1, no console warnings/errors, no unnecessary early media loads, and no continuous RAF loops outside active motion contexts.
- [ ] Confirm any WebGL is dynamically imported, disposed correctly, and disabled on mobile or reduced-motion mode. Confirm scroll remains responsive under CPU throttling.
