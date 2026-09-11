# Pie Square premium scroll rebuild

## Goal

Rebuild the static Pie Square prototype as a Next.js App Router experience that presents real infrastructure work through one controlled, cinematic narrative. The recurring visual is a thin Pie Square red signal line. It changes role across the page: radio signal, survey route, tower geometry, fiber light, electrical current, and data connection.

## Application architecture

Use Next.js, React, TypeScript, and Tailwind CSS. `app/page.tsx` composes independent scene components. `app/layout.tsx` owns metadata, fonts, and the global shell. Content and factual project data live in `data/`, while motion helpers live in `components/motion/` and `lib/`.

Scenes are bounded components under `components/scenes/`: loader, hero, company, capabilities, telecom, RF, impact, fiber, projects, energy, digital, clients, and final CTA. Shared UI includes the navigation, cursor, scene wrapper, and signal line. Existing static assets move into `public/media/projects/`; generated cinematic assets go into `public/media/cinematic/` and are listed in `creative/ASSET-MANIFEST.md`.

## Motion system

`LenisProvider` owns the smooth-scroll loop and synchronizes Lenis with GSAP's ticker. `scroll-timeline.ts` creates scoped ScrollTrigger timelines and exposes normalized progress to scenes. Each scene animates transforms, opacity, SVG stroke paths, and CSS variables. The signal line is a shared component with scene-specific path and color state.

The loader runs once per session for no more than two seconds. Desktop gets the custom cursor and horizontal project rail. Mobile uses native touch scrolling, shorter pinned scenes, reduced parallax, and no WebGL. `prefers-reduced-motion` disables Lenis smoothing, loader choreography, cursor motion, and nonessential scene transitions.

## Media strategy

Existing company images are project evidence and remain clearly labeled as documentary material. Create three separate cinematic stills: `H01` hero telecom tower at sunrise, `F01` macro fiber optic light, and `S01` solar telecom installation. Optional Flow videos use still fallbacks and load only when supported and near the relevant scene.

## Quality requirements

Keep animation work on compositor-friendly properties. Avoid a Three.js scene in the first implementation unless a specific transition cannot be achieved with SVG, CSS, or DOM layers. Preserve semantic headings, keyboard focus, accurate alt text, Open Graph metadata, canonical metadata, and Organization JSON-LD. Validate at 1440x900, 1280x800, 768px, 430px, and 390px, including console errors, image loading, scroll continuity, and reduced-motion behavior.
