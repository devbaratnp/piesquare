# PieSquare reference content system design

## Goal

Bring the full content system and page organization from the approved reference site into PieSquare Technologies while preserving the approved cinematic homepage scenes. The reference supplies the editorial hierarchy, concise service writing, project metadata pattern, careers structure, and calm white/charcoal/red inner-page surface. PieSquare's verified contact details, supplied logos, approved imagery, and repository metrics remain the factual source of truth.

## Reference review

The approved reference was reviewed in the Codex in-app browser at:

`https://solar-grid-6.preview.static.emergentagent.com/`

Clean viewport captures are stored outside the repository at:

`C:\Users\Lenovo\.codex\visualizations\2026\09\14\01a09d4f-89a0-7e13-b844-08b7046761bd\reference-clean`

The reference uses a serif display contrast for headings, a clean sans-serif for body copy and navigation, a condensed mono treatment for red labels, a white canvas, charcoal text, and red action states. The final PieSquare pairing uses Young Serif for major display headings and Instrument Sans for body/UI text. Service pages use a large calm hero followed by numbered capability rows and related projects. Projects use category filters and status/category/location/scope metadata. Careers uses structured role rows with requirement chips and Apply Now actions. Contact combines direct channels, office details, message intake, quote intake, and site-survey intake.

## Route architecture

| Reference route | PieSquare route | Content treatment |
| --- | --- | --- |
| `/` | `/` | Keep the thirteen approved cinematic scenes; align copy labels, capability summaries, projects, clients, and contact sections with the reference language. |
| `/about` | `/company` | Use the reference About structure for company, values, approach, team, and geographic coverage. |
| `/services` | `/capabilities` | Use the four-division overview and delivery-standard copy. |
| `/services/telecom` | `/capabilities/telecom` | Use the eight numbered telecom capability rows and two related projects. |
| `/services/fiber` | `/capabilities/optical-fiber` | Use the ten numbered fiber capability rows and two related projects. |
| `/services/solar` | `/capabilities/solar-energy` | Use the eleven numbered solar capability rows and two related projects. |
| `/services/it` | `/capabilities/it-solutions` | Use the ten numbered IT capability rows and two related projects. |
| `/projects` | `/projects` | Use the reference project grid, filters, and project metadata pattern. |
| `/careers` | `/careers` | Add the reference careers page with six roles and mailto Apply Now actions. |
| `/certifications` | `/certifications` | Add the reference compliance grid with seven document states. |
| `/contact` | `/contact` | Keep the existing form boundary and adopt the reference direct-contact, message, quote, and survey organization. |

The main navigation will follow the reference information scent: Home, About Us, Services (four-item dropdown), Projects, Capabilities, Certifications, Careers, Contact, and Request a Quote. The existing PieSquare Company/Capabilities routes remain valid through the mapped labels. Clients stays available from the homepage and footer because it is already part of the approved PieSquare structure.

## Content rules

Use the reference wording and content structure for descriptive copy where it maps to PieSquare's services. Replace `[COMPANY NAME]`, `[PHONE]`, `[EMAIL]`, `[OFFICE ADDRESS]`, team placeholders, logo placeholders, and document placeholders with PieSquare data or explicit unavailable states. Do not publish unsupported client claims, unverified metrics, fake certificate links, or invented employee profiles.

The approved content set includes:

- Home: the reference hero, company introduction, four divisions, survey-to-service methodology, field project portfolio, capabilities, workforce, reasons to choose PieSquare, supported industries, clients, company profile CTA, quote form, and site-survey form.
- Services overview: “Four Divisions. One Delivery Standard.” with Telecom Infrastructure, Fiber Optic Networks, Solar Energy, and IT Infrastructure summaries.
- Telecom: Civil Works, Tower Installation, Tower Maintenance, RF Drive Testing, Telecom Site Installation, Equipment Installation, Testing & Commissioning, and Maintenance.
- Fiber: Route Survey, Fiber Route Planning, OFC Installation, Underground Fiber, Aerial Fiber, Fiber Splicing, ODF Installation, OTDR Testing, Fault Localization, and Maintenance & Restoration.
- Solar: Site Survey, Load Assessment, System Design, BOQ & Estimation, Rooftop Solar, Commercial Solar, Ground-Mounted Solar, Installation, Testing, Commissioning, and Operation & Maintenance.
- IT: Network Infrastructure, LAN/WAN, Structured Cabling, Server Installation, Data Center Infrastructure, Wi-Fi, CCTV & Security, Hardware, Network Troubleshooting, and IT Maintenance.
- Projects: National Backbone Fiber Deployment, 4G Tower Site Rollout, Rural Connectivity Tower Program, FTTH Metro Fiber Expansion, Off-Grid Solar for Telecom Sites, Commercial Rooftop Solar Installation, Enterprise Data Center Build, and Campus Network & CCTV Deployment.
- Careers: Telecom Tower Rigger / Technician, Fiber Splicing Technician, RF Drive Test Engineer, Solar Installation Technician, IT / Network Engineer, and Project Management Intern.
- Certifications: Company Registration, PAN / VAT Registration, Operating Licenses, ISO Certifications, Safety Certifications, Vendor Registrations, and Technical Certifications.
- Contact: direct Call, WhatsApp, and Email actions; head office, phone, email, business hours; Send Us a Message; Let's Build Your Next Project; and Need a Site Survey.

## Visual and motion system

Use `next/font/google` in the root layout to self-host Young Serif and Instrument Sans. Set CSS variables so major display headings use Young Serif while body/navigation use Instrument Sans; the existing mono signal labels remain part of the PieSquare identity. Keep the approved graphite cinematic scenes, red signal line, custom cursor, Lenis, and ScrollTrigger behavior on the homepage.

Inner pages use a light paper background, charcoal text, soft gray rules, red eyebrow labels, red primary buttons, and grid-based cards. Images keep stable aspect-ratio boxes and use `next/image` with accurate alt text. Mobile layouts collapse to one column at 390px without horizontal overflow.

Remove the `Loader` component and its render call from `components/home-experience.tsx`. The first frame should be the hero scene. Do not replace it with another blocking loading surface.

## Data and component boundaries

Keep all reference-derived content in typed structures in `data/site.ts`:

- `primaryNav` plus service dropdown items and route aliases.
- Rich project records with `status`, `category`, `location`, `scope`, image, alt text, and short description.
- Career role records with employment type, location, discipline, description, requirements, and application subject.
- Certification records with title, description, and document availability state.
- Service overview records and numbered service capability rows.

Extend the shared inner-page foundation instead of creating one-off layouts. Add a Careers route and a Certifications route. Keep `ProjectGrid` responsible for filtering and cards. Keep contact form submission explicit and frontend-only until a backend is supplied; Apply Now actions may open a prefilled mailto draft without transmitting anything automatically.

## Accessibility and behavior

Every route has one clear page heading, keyboard-visible focus states, meaningful links, button labels, `aria-current` for active navigation, and `aria-pressed` for project filters. Service dropdowns and mobile navigation must be operable with keyboard and touch. Respect `prefers-reduced-motion`; no content may depend on animation to become readable. Use `mailto:` and `tel:` links for direct contact, with no auto-submission or hidden data transmission.

## Verification

Before completion, verify:

1. `npm run lint` passes.
2. `npm test -- --run` passes, including route, data, navigation, project, and contact tests.
3. `npm run build` passes with the installed Next.js 16.3.4 behavior.
4. `npm run test:e2e` passes for desktop and mobile smoke coverage.
5. The routes above render at 1440px and 390px without broken images, horizontal overflow, uncaught console errors, or inaccessible controls.
6. The homepage opens directly on the hero without the removed initializing screen.

## Out of scope

Do not add a backend, publish certificate files that are not present, invent team members, replace supplied logos, or change the approved cinematic scene order. Do not add a new UI library.
