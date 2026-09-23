# Capabilities implementation plan

> **For agentic workers:** Use this plan to implement `final_brief/5.capabilties & certifications.docx` on `/capabilities`. Coordinate shared content with [03-services.md](./03-services.md) so the four divisions do not diverge between pages.

**Goal:** Make the capabilities page communicate proven delivery capacity, four divisions, a field-ready workforce, and six delivery capabilities in a 3 by 2 layout, while removing the unrequested certifications section.

**Architecture:** Keep `/capabilities` as the capability overview and use the same typed data consumed by the service index and detail pages. Reuse `impactStats`, `serviceOverview`, `technicalWorkforce`, and `deliveryCapabilities` in `data/site.ts` rather than duplicating text in the page component.

**Tech stack:** Next.js App Router, TypeScript, `data/site.ts`, `app/capabilities/page.tsx`, CSS in `app/globals.css`, Vitest, and Playwright.

## Files

- Modify: `data/site.ts`
- Modify: `app/capabilities/page.tsx`
- Modify: `app/globals.css`
- Verify: `components/inner-page.tsx` and shared floating contact
- Test: `app/capabilities/page.test.tsx`

## Content requirements

### Opening

- Keep the heading `BUILT TO EXECUTE.`
- Use the supporting line: `People, equipment and systems organized for multi-site, multi-location project delivery.`

### Proven delivery metrics

Keep the experience block first and render:

| Value | Label | Detail |
| --- | --- | --- |
| `3,500+` | RF SITES TESTED | SSV & Cluster Drive Testing |
| `115` | TELECOM SITES INSTALLED | Equipment Installation & Commissioning |
| `4` | NEW TELECOM TOWER SITES | Foundation · Erection · Power · Grounding · Fencing |
| `2,240+ KM` | FIBER NETWORK DELIVERY | Installation · Survey · Managed Services & LMC |
| `400 kW` | SOLAR O&M UNDER MANAGEMENT | Annual Maintenance & Operations |

Keep the heading `PROVEN DELIVERY` or the current approved equivalent. Do not change verified values without a client correction.

### Four divisions

Keep the heading `FOUR DIVISIONS. ONE DELIVERY STANDARD.` and render:

1. `TELECOM INFRASTRUCTURE`: Civil works · Tower installation · Equipment deployment · RF testing · Commissioning · Maintenance
2. `FIBER OPTIC NETWORKS`: Route survey · OFC installation · Splicing · Testing · Fault restoration · Network maintenance
3. `SOLAR & ELECTRICAL`: Solar PV · System design · Installation · Battery integration · Transformer installation · Electrical works · O&M
4. `IT SOLUTIONS`: Network infrastructure · LAN/WAN · Structured cabling · Server systems · Wi-Fi · CCTV · IT support

Each division card links to its detail route. The cards may share content with the homepage and services index, but the capability overview should keep this compact summary treatment.

### Technical workforce

- Keep the heading `TECHNICAL WORKFORCE`.
- Use the subheading `Trained. Field-Ready` unless the client provides specific certification records. The source says `Trained. Certified. Field-Ready` but also explicitly says to remove the Certifications heading; do not make an unsupported certification claim.
- Render this workforce line in a readable responsive layout:

  `Civil Engineers · Telecom Engineers & Technicians · RF Engineers · Fiber Technicians · Solar & Electrical Technicians · IT Professionals · Project Coordinators & Supervisors · Safety & Quality Personnel`

### Delivery capabilities

Add the heading `DELIVERY CAPABILITIES` at the end of the page and use these six records in a 3 by 2 grid:

| Capability | Scope |
| --- | --- |
| Project Execution | Site deployment · Installation · Commissioning · Handover |
| Field Engineering | Survey · Technical assessment · Supervision · Coordination |
| Testing & Commissioning | RF · Fiber · Electrical · System testing |
| Operation & Maintenance | Preventive maintenance · Fault response · Restoration |
| Project Documentation | BOQ · Reports · Test records · As-built documentation · Handover |
| Multi-Site Coordination | Planning · Field deployment · Progress monitoring · Reporting |

### Certifications

- Remove the `CERTIFICATIONS` heading and its section from the route.
- Do not add a navigation item, placeholder, empty section, or certification badge.

## Implementation steps

- [ ] Consolidate the five proof metrics in `impactStats` and use the same values on the homepage where applicable.
- [ ] Update `serviceOverview` labels and summaries to match the four division copy.
- [ ] Update `technicalWorkforce` with the source line and the approved `Trained. Field-Ready` heading.
- [ ] Keep `deliveryCapabilities` as six typed records and render them in a 3 by 2 grid on desktop, one or two columns on smaller screens.
- [ ] Remove any certifications markup and styling that is no longer used.
- [ ] Keep the route accessible with one visible `h1`, real section headings, and links with descriptive names.
- [ ] Update tests to assert five proof metrics, four divisions, eight workforce groups or equivalent labels, six delivery cards, and no certifications heading.

## Acceptance checks

- `/capabilities` renders the five proof metrics in the first content group.
- The four divisions link to all four existing capability detail routes.
- The workforce content is present without employee profiles or unsupported certification claims.
- The delivery capability section contains exactly six cards in a responsive 3 by 2 desktop layout.
- The page has no certifications heading or tab.
- `npx vitest run app/capabilities/page.test.tsx --no-file-parallelism --maxWorkers=1` passes, followed by `npm run lint` and a responsive Playwright check.
