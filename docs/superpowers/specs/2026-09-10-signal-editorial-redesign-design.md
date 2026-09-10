# Signal editorial homepage redesign

## Objective

Redesign the finalized Pie Square Technologies homepage into a distinctive editorial infrastructure experience. Preserve the approved business story, factual content, section anchors, route architecture, generated asset set, supplied logos, and conversion paths while replacing the current prototype-like visual treatment with a more authored visual system.

The redesign is a presentation-layer change. It will improve hierarchy, composition, typography, surface treatment, and motion without migrating frameworks or inventing new company claims.

## Design direction

The visual concept is **Signal editorial**: a field report rendered with the precision of a technical publication. The page moves between warm paper and carbon ink, with one controlled Pie Square red used for signal handoffs, actions, and measured emphasis. Large display type establishes the editorial voice; small mono labels provide engineering context.

The memorable device is a single red route/signal that travels through the experience. It is not decorative neon: it marks transitions between infrastructure layers and quietens during documentary proof sections.

## Visual system

### Palette

- Paper: warm infrastructure white for company, fiber, energy, projects, and client surfaces.
- Carbon: deep charcoal rather than pure black for hero, telecom, RF, digital, and closing surfaces.
- Ink: near-black text on paper surfaces.
- Steel: cool neutral for supporting copy, metadata, rules, and technical annotations.
- Signal red: the only saturated accent, reserved for CTAs, active states, route pulses, and key proof numbers.

Avoid purple/blue gradients, generic glass panels, excessive rounded corners, and multiple competing accent colors. Use hairline rules, subtle grain, image grading, and restrained opacity layers for depth.

### Typography

Use a characterful condensed/display face for headlines and a readable sans-serif for body copy, with a mono face for technical labels and metrics. The display face should use tight tracking and short line-height without turning every paragraph into uppercase. Body copy stays within a readable measure of roughly 65 characters. Metrics use tabular figures.

### Composition

Use a constrained page container with intentional offsets rather than centered symmetry. Visual chapters alternate between image-led and typography-led layouts. Feature content should use asymmetric grids, offset media plates, overlap, and varying image ratios instead of equal card rows. Inner content remains calm and structured even when the homepage is cinematic.

## Homepage composition

Keep these existing anchors and their order: `top`, `company`, `expertise`, `telecom`, `rf`, `fiber`, `energy`, `digital`, `impact`, `projects`, `clients`, `why`, and `contact`.

1. **Hero** — Full-bleed H01 tower landscape with a dark editorial veil, left-aligned title block, compact discipline index, established/location metadata, and two clear CTAs. A thin route pulse originates at the tower and exits the frame.
2. **Company** — Warm paper spread with a strong statement, a horizontal timeline, and a restrained local-logo orbit/rail. The company content should feel like an opening profile page, not a feature card.
3. **Capabilities** — Dark typographic index with four large staggered rows. Each row has a number, service label, short descriptor, and valid route target. Hover/focus exposes the red signal and arrow without shifting surrounding layout.
4. **Telecom lifecycle** — A pinned construction chapter using T01–T07. The active frame changes through seven labeled phases while a documentary image plate holds the right side. The copy and phase indicator stay stable so motion supports comprehension.
5. **RF** — Dark field-report layout pairing the real P07 drive-test image with a restrained SVG route study. All RSRP/SINR/RSRQ/throughput values remain explicitly labeled as visualization-only.
6. **Fiber** — Paper-to-dark transition using F01 and F02, a large `2240+ KM` proof number, and a route sequence from survey to customer connection. The composition favors one dominant number and a narrow technical index.
7. **Energy** — Bright daylight spread using S01/E02, four concise service statements, and the supported `400 kW` proof point. The image should carry the visual weight; copy should not become a dashboard.
8. **Digital** — Carbon operations chapter using D01 and P06 references, a topology/grid treatment, and three clear modules: infrastructure, security, and digital solutions.
9. **Impact** — Editorial proof strip with five numbers, each paired with its factual label. Keep the red emphasis selective and avoid animated counters that imply unsupported precision.
10. **Projects** — Replace the current uniform horizontal rail treatment with an uneven evidence wall. Use real project-proof images, consistent captions, service labels, and a valid `/projects` CTA. The rail may still use scroll-driven movement, but cards must remain legible and usable without motion.
11. **Clients** — Quiet warm-paper logo wall using only local supplied logos and supported profile wording. Logos are monochrome by default and regain color on hover/focus.
12. **Why Pie Square** — Four short statements arranged as a measured editorial grid with field-experience, end-to-end delivery, multi-disciplinary capability, and ongoing support.
13. **Closing/contact** — Carbon closing plate with the final route convergence, the primary contact CTA, direct email/phone links, address, and website. No fake form success state or unsupported claims.

## Navigation and interaction

Keep the global navigation labels and destination paths from `data/site.ts`. On desktop, use a compact floating/header lockup with the main CTA persistent. On mobile, use a full-width menu panel with clear focus management, close behavior, and the same navigation order.

Interactive elements need visible hover, pressed, and keyboard focus states. Anchor links should scroll smoothly when motion is allowed. Buttons must target real routes or contact protocols; no placeholder `#` destinations.

## Motion and reduced motion

Keep the existing Lenis, GSAP/ScrollTrigger, `SceneShell`, `SignalLine`, and named signal-state architecture unless a focused refactor is needed for the new layout. Motion priorities are:

- one staged hero entrance;
- signal route handoffs between major chapters;
- image mask/reveal and gentle scale on chapter entry;
- telecom phase changes tied to scroll progress;
- project evidence movement that never hides content or creates dead scroll zones;
- small transform/opacity hover feedback.

Animate only transform and opacity where possible. Do not animate layout properties such as `top`, `left`, `width`, or `height` for primary transitions. `prefers-reduced-motion: reduce` must disable Lenis/ScrollTrigger-driven movement, show all content in normal flow, expose all telecom/project content without reliance on animation, and hide decorative signal animation.

## Media and content rules

Use the existing media manifest as the source of truth:

- H01 for hero;
- C01 and local L01–L03 logos for company;
- T01–T07 for telecom;
- P07 for RF;
- F01/F02 for fiber;
- S01/E02/P09 for energy;
- D01/P06 for digital;
- P01–P10 for project proof.

Generated `AI-CINEMATIC` stills support atmosphere and transitions; they are never presented as documentary evidence. Project proof remains under `public/media/projects/` with accurate captions and alt text. Preserve reserved aspect-ratio boxes through `next/image` to avoid layout shift.

## Component and data architecture

Keep factual content in `data/site.ts`. Rework `components/home-experience.tsx` into small section components where that improves clarity, but keep the existing homepage composition boundary and signal-state bridge. Reuse `SiteNav`, `SceneShell`, `SignalLine`, `LenisProvider`, and reduced-motion helpers. Keep inner-page primitives and routes compatible with the homepage navigation.

Styling remains in `app/globals.css` using CSS variables, semantic class names, responsive grid/flex layouts, and a stable z-index scale. Do not add a UI library or new animation dependency. Check existing dependencies before any import change.

## Responsive behavior

Target the existing acceptance widths of 1440px and 390px, with graceful behavior at tablet widths. Desktop uses offset editorial grids and pinned chapters. Mobile becomes a readable vertical story: no horizontal overflow, no hidden critical copy, full-width touch targets, and image crops that keep subjects and text-safe negative space visible. Project evidence stacks or becomes a controlled single-column rail without requiring horizontal scrolling.

## Accessibility and resilience

- One logical `h1` per route and ordered section headings.
- Accurate alt text for meaningful images; decorative overlays use `aria-hidden`.
- Visible focus rings on all links, buttons, menu controls, and form inputs.
- Keyboard-operable mobile navigation and project/capability links.
- No uncaught browser errors from missing images or animation setup.
- Direct contact links remain usable if JavaScript is unavailable.
- The page remains understandable when animations are disabled.

## Verification criteria

Before calling the redesign complete:

1. Run `npm run lint`.
2. Run `npm test -- --run`.
3. Run `npm run build`.
4. Run `npm run test:e2e` against the production server.
5. Inspect the homepage at 1440×900 and 390×844 for hierarchy, image loading, focus visibility, console errors, and horizontal overflow.
6. Verify every homepage anchor, primary navigation path, capability route, CTA, supplied logo, and reduced-motion behavior.
7. Confirm only supported metrics and client names appear, and generated assets remain clearly separated from project evidence.

## Out of scope

- Replacing the Next.js/React stack.
- Adding a CMS, backend, analytics, or form submission service.
- Generating replacement logos or unsupported client/project imagery.
- Changing factual claims, contact details, route names, or the approved information architecture.
- Adding optional video assets unless they already exist and pass the same fallback and performance checks.
