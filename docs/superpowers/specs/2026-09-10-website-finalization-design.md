# Pie Square Full Website Specification

## Product direction

Pie Square Technologies is a premium infrastructure partner, not a generic IT company. The site must communicate engineering credibility, Nepal-wide infrastructure scale, modern technology, and dependable delivery. Use graphite/black, warm white, Pie Square red, strong display type, real field imagery, engineering grids, route traces, and restrained technical data visualizations.

The latest reference image defines the homepage’s visual hierarchy and section rhythm. The newly supplied locked brief defines the complete information architecture. The repository’s `data/site.ts`, supplied logos, and existing project/cinematic assets are the factual and media sources of truth. Do not infer unsupported client relationships, dates, or project metrics from visual inspiration.

## Global navigation and behavior

Primary navigation: Home, Company, Capabilities, Projects, Clients, Contact. Capabilities expands to Telecom, Optical Fiber, Solar & Energy, and IT Solutions. Keep “Discuss a Project” persistent as the main conversion CTA. Use the existing red signal-line language across the experience, with subtle motion, semantic headings, visible focus states, accurate image alt text, responsive mobile navigation, and reduced-motion support.

## Homepage hierarchy

1. **Hero (`#top`)** — “BUILDING THE INFRASTRUCTURE THAT CONNECTS NEPAL.”, telecom-tower landscape, “Telecom. Fiber. Energy. Technology.”, supported copy, established/location metadata, and work/capability CTAs.
2. **Company (`#company`)** — “INFRASTRUCTURE ENGINEERED FOR PROGRESS.”, short introduction, 2019 → Telecom → Fiber → Energy → IT → Today timeline, and the supplied Nepal Telecom, Ncell, and CG Net logo carousel.
3. **Capabilities (`#expertise`)** — pinned four-state sequence: Telecom, Optical Fiber, Solar & Energy, IT & Digital; show `01 / 04` through `04 / 04`.
4. **Telecom lifecycle (`#telecom`)** — “FROM SURVEY TO SIGNAL.” with seven states: site survey, civil foundation, tower erection, equipment installation, power and grounding, commissioning, optimization.
5. **RF performance (`#rf`)** — “A NETWORK ISN’T FINISHED WHEN THE TOWER GOES LIVE.”; map route, vehicle marker, nodes, and clearly labeled visualization-only RSRP/SINR/RSRQ/throughput readouts.
6. **Fiber (`#fiber`)** — “CONNECTING COMMUNITIES. KILOMETER BY KILOMETER.”, `2240+ KM`, and route survey → laying → splicing → OTDR testing → POP deployment → customer connection.
7. **Energy (`#energy`)** — “POWERING THE INFRASTRUCTURE BEHIND CONNECTIVITY.”, hybrid/off-grid/battery/O&M statements, and the supported `400 kW` proof point.
8. **Digital (`#digital`)** — “INFRASTRUCTURE DOESN’T END AT THE TOWER.” with IT infrastructure, security, and digital solutions modules.
9. **Impact (`#impact`)** — editorial proof strip: `3500+`, `115`, `2240+ KM`, `4`, `400 kW`.
10. **Projects (`#projects`)** — field-proof cards for RF testing, equipment installation, fiber, civil works, solar, and IT, with a View All Projects CTA.
11. **Clients (`#clients`)** — clean logo wall from supported profile material; supplied logos must render locally and remain readable.
12. **Why Pie Square** — field experience, end-to-end delivery, multi-disciplinary capability, ongoing support.
13. **Closing/contact (`#contact`)** — “ONE PARTNER. MULTIPLE INFRASTRUCTURE LAYERS.” followed by “BUILD THE NEXT CONNECTION WITH US.”, working contact links, and footer.

## Inner-page architecture

Create calm, technical routes for `/company`, `/capabilities`, `/capabilities/telecom`, `/capabilities/optical-fiber`, `/capabilities/solar-energy`, `/capabilities/it-solutions`, `/projects`, `/clients`, and `/contact`. Service pages explain lifecycle, delivery, testing, maintenance, and supported project proof. Projects prioritize evidence and filters. Company establishes history, values, organization, and delivery strengths. Clients establish trust without unsupported claims. Contact provides a simple inquiry form, direct contact details, map, and service shortcuts.

## Image and media specification

Use existing media wherever it communicates the claim accurately. The intended image treatment is cinematic but documentary: dark graphite grading for telecom/RF, warm white space for company and clients, brighter daylight for energy, and cool blue detail for IT. Preserve stable aspect-ratio boxes, use `next/image`, and keep foreground text out of important image detail.

| Area | Primary visual | Treatment and fallback |
| --- | --- | --- |
| Hero | `H01-hero-nepal-tower.webp` | Full-bleed tower landscape with dark overlay; optional `V01` video uses H01 as poster. |
| Company | `C01-company-infrastructure-landscape.png`, `L01`–`L03` | Use C01 as the calm inner-page landscape; use local logo cards in the orbit/carousel. Timeline and Nepal route remain CSS/SVG. |
| Capabilities | `T03`, `F01`, `S01`, `P06` | One visual per discipline; use DOM/SVG transitions and existing stills before generating replacements. |
| Telecom lifecycle | `T01`–`T07`, `P01` | T01–T07 establish construction, power, commissioning, and optimization continuity; overlays supply the seven phases. |
| RF | `P07-rf-drive.jpg` | Documentary field proof plus CSS/SVG map route, nodes, and vehicle marker; no fake geographic photograph. |
| Fiber | `F01-fiber-macro.webp`, `F02-fiber-field-deployment.png` | Macro fiber transition and field deployment; use project proof where available. |
| Energy | `S01-solar-telecom.webp`, `E02-solar-hybrid-power.png`, `P09-solar.jpg` | Bright solar/telecom imagery with restrained daylight grade; optional `V03` falls back to S01. |
| Digital | `D01-digital-operations.png`, `P06-rack.jpg` | Cool operations-room visual with CSS/SVG topology and real rack proof. |
| Projects | `P01`–`P10` | Use real company proof with accurate captions, consistent crops, and muted grade. |
| Clients/contact | Logos and `P05-hero.jpg` | Clean logo wall; contact stays simple and may use a quiet landscape, never a distracting hero image. |

The generated C01, T06, T07, F02, E02, and D01 stills are recorded in `creative/ASSET-MANIFEST.md` as `AI-CINEMATIC`. They are supporting visuals, not documentary project evidence; real proof remains in `public/media/projects/`. No new image is required for the current logo carousel.

## Acceptance criteria

Homepage and inner routes build successfully, preserve the global navigation, render supplied logos without broken images, remain usable at 390px, and produce no uncaught browser errors. All factual claims trace to repository data or the locked brief’s supported company-profile content. The homepage keeps its cinematic story; inner pages provide the technical depth instead of overloading the homepage.
