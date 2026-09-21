# Visual Review

## Reference capture

The approved reference was reviewed in the Codex in-app browser at `https://solar-grid-6.preview.emergentagent.com/`. Clean full-page captures for the reference routes are stored outside the repository at:

`C:\Users\Lenovo\.codex\visualizations\2026\09\14\01a09d4f-89a0-7e13-b844-08b7046761bd\reference-clean`

The captured reference set covers Home, About Us, Services, Telecom, Fiber, Solar, IT, Projects, Capabilities, Careers, and Contact. Its typography informed the final contrast-led pairing: Young Serif for major display headings and Instrument Sans for body/UI text.

## Implemented route map

- `/` — the continuous signal journey: hero, company story, capabilities, telecom/RF/fiber/energy/digital scenes, impact, projects, clients, reasons to choose Pie Square, and contact CTA.
- `/company` — field-led company story, values, delivery approach, workforce, coverage, and industries.
- `/capabilities` — four service divisions, verified metrics, workforce summary, and resource links.
- `/capabilities/telecom`, `/capabilities/optical-fiber`, `/capabilities/solar-energy`, `/capabilities/it-solutions` — complete capability lists, delivery lifecycle, scope, and related projects.
- `/projects` — twelve reference project records with category filters, status, location, scope, detail pages, and local proof imagery.
- `/careers` — three roles plus a general CV application with a desired-position field.
- `/contact` — direct phone, WhatsApp, email, Google Maps, message, quote, and site-survey forms.

The legacy `/clients` route remains build-safe but is intentionally not part of the primary navigation; the reference groups client proof into the homepage story and project portfolio.

## Automated checks

Verified on 2026-09-21 from the repository root:

- `npm test -- --run --no-file-parallelism --maxWorkers=1` — 17 Vitest files, 32 tests passed.
- `npm run lint` — passed with no ESLint errors.
- `npm run build` — production build passed, type-check passed, and the twelve project detail paths were statically generated. The build is configured for one worker in this constrained environment.
- `npm run test:e2e` — 32 Playwright checks passed across Chromium desktop and Pixel 5 mobile profiles.

The Playwright checks cover the page title, desktop/mobile navigation, the Services menu, anchor navigation to `/projects`, absence of the initializing loader, complete homepage signal-state DOM presence, one visible heading per inner route, broken image responses, console errors, reduced motion, and horizontal overflow at desktop/mobile widths.

## Manual review notes

The final browser pass should be checked at 1440×900 and 390×844 for the homepage and all paper inner routes. Pay particular attention to the first frame opening directly without a loader, the display/body font pairing, mobile Services expansion, project filter states, careers requirements, and the footer route groups. Local project proof images are reused deliberately from the supplied repository assets; no remote image scraping was added.
