# Projects implementation plan

> **For agentic workers:** Use this plan to reconcile `final_brief/4.Project only.docx` with the existing `ProjectRecord` model. The brief contains the full portfolio, not only the six homepage cards.

**Goal:** Implement a consistent project portfolio with six featured homepage cards, twelve full project records, filterable listing behavior, and detail pages that expose the client, location, duration, status, metrics, overview, scope, role, delivery focus, and coverage supplied in the final brief.

**Architecture:** Keep `ProjectRecord` in `data/site.ts` as the only project content model. Render cards through `components/project-grid.tsx`, render detail pages through `app/projects/[slug]/page.tsx`, and use the same records for homepage and capability proof cards.

**Tech stack:** Next.js App Router, TypeScript, `ProjectRecord`, `ProjectGrid`, `InnerPage`, `next/image`, Vitest, and Playwright.

## Files

- Modify: `data/site.ts`
- Modify: `components/project-grid.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `components/service-detail.tsx` only if related proof cards need a shared field
- Modify: `app/globals.css` for card and detail layout adjustments
- Test: `components/project-grid.test.tsx`, `app/projects/page.test.tsx`, `app/projects/[slug]/page.test.tsx`, `data/site.test.ts`

## Homepage featured records

The homepage must show these six records in this order:

| Order | Category | Status | Title | Card proof |
| --- | --- | --- | --- | --- |
| 1 | Telecom | Completed | RF Drive Test & Network Optimization | Single-Site Verification & RF Optimization, 1,214 sites, Terai · Mid-Hill · High-Hill · Kathmandu, 17 November 2019 - 20 May 2024 |
| 2 | Telecom | Completed | Cluster Drive Test & Optimization | Cluster-Level RF Performance Testing & Optimization, 62 clusters and 1,659 sites, Nepal / 7 provinces, 17 November 2019 - 01 August 2024 |
| 3 | Telecom | Completed | SSV Drive Testing & Network Verification - Ncell | 381 sites, GSM · UMTS · LTE, Madhesh · Koshi · Lumbini |
| 4 | Fiber | Ongoing | Fiber Network Operations & Maintenance | 1,166.731 km, 16 POPs, 5 locations, Eastern Nepal, April 2024 - Present |
| 5 | Fiber | Completed | Fiber Network Deployment & ODN Implementation | 218 km, Kathmandu Valley, November 2021 - June 2023 |
| 6 | Solar & Electrical | Ongoing | 400 kWp Ground-Mount Solar Power Plant | Simar, Bara, Nepal, October 2025 - Present |

Every card needs a visible status and a working `View Project` link.

## Full portfolio records

Keep these twelve records in the full `/projects` listing. Preserve the existing IDs when they already match the records below so existing links remain stable.

### Fiber

1. `fiber-network-operations-maintenance`
   - Status: Ongoing
   - Client: CG Communications Limited (CGNET)
   - Location: Eastern Nepal, with operational locations Biratnagar, Itahari, Duhabi, Dharan, and Lahan
   - Duration: April 2024 - Present
   - Coverage: 1,166.731 km network, 16 POPs / network sites, 5 operational locations
   - Scope groups: fiber network maintenance; network expansion and modification; customer connectivity; POP and network support; separately authorized ADSS / Figure-8 OFC, splicing, DB box, enclosure, ODF, expansion, and rerouting works
   - Delivery focus: network availability, field execution, quality and documentation, customer service

2. `fiber-network-deployment-odn-implementation`
   - Status: Completed
   - Client: C.C.S. Nepal Private Limited
   - Operator: CGNET
   - Location: Kathmandu Valley
   - Duration: November 2021 - June 2023
   - Coverage: 218 km
   - Scope groups: fiber cable deployment; ODN implementation; fiber splicing and testing; documentation and handover
   - Delivery focus: field-level execution, installation quality, network reliability, documentation, and handover

3. `pop-odn-ring-survey`
   - Status: Completed
   - Client: C.C.S. Nepal Private Limited
   - Operator: CGNET
   - Location: Palpa, Kawasoti, Pragatinagar, Nawalpur, Bharatpur, Ratnanagar, and Hetauda
   - Duration: January 2022 - February 2022
   - Coverage: 864 km ODN ring route survey across 7 locations
   - Scope groups: POP site survey; ODN ring route survey; documentation and reporting
   - Delivery focus: route planning, connectivity assessment, GPS data collection, and technical survey documentation

### Solar and electrical

4. `400-kwp-ground-mount-solar`
   - Status: Ongoing
   - Client: Surya Nepal Private Limited
   - Location: Simar Cigarette Factory, Simar, Bara, Nepal
   - Duration: October 2025 - Present
   - Coverage: 400 kWp ground-mounted Solar PV plant
   - Scope groups: Solar PV plant maintenance; electrical system support; performance monitoring; reporting and documentation; safety and compliance
   - Delivery focus: plant availability, performance and reliability, field execution, safety and documentation
   - Include the brief's operating targets as project metadata: target availability 100% and fault response within 48 hours.

5. `electrical-distribution-transformer-installation`
   - Status: Completed
   - Client: Teleconstruct Developers Pvt. Ltd.
   - End client / project owner: Nabrajpur Rural Municipality
   - Location: Nabrajpur Rural Municipality, Siraha, Madhesh Province, Nepal
   - Duration: June 2025 - July 2025
   - Coverage: transformer installation, LT distribution, PSC pole erection
   - Scope groups: transformer installation; distribution-line construction; earthing and protection; testing and handover
   - Delivery focus: field execution, electrical installation, testing and commissioning, site completion

### IT and digital

6. `website-content-development-doit`
   - Status: Completed
   - Client: Provincial and Local Infrastructure Development Project
   - Location: Janakpurdham, Dhanusha, Nepal
   - Duration: April 2025 - May 2025
   - Coverage: website content management, page updates, information organization, and DoIT template customization
   - Scope groups: website content management; DoIT template and page updates; content review and maintenance
   - Delivery focus: content management, DoIT implementation, page updates, information organization

7. `website-content-management-janakpur`
   - Status: Completed
   - Client: Purbanchal Bikas Nirdeshanalaya
   - Location: Janakpur, Dhanusha, Nepal
   - Duration: May 2025 - June 2025
   - Coverage: website content development and management, DoIT template customization, and staff training
   - Scope groups: website content management; DoIT template implementation; staff training and technical support
   - Delivery focus: content development, website management, DoIT template implementation, client enablement

8. `digital-media-social-media-seo`
   - Status: Completed
   - Client: National Reconstruction Authority (NRA)
   - Location: Singha Durbar, Kathmandu, Nepal
   - Project date: July 2021
   - Coverage: digital content, social media, online promotion, and SEO
   - Scope groups: social media management; digital content and awareness; online campaigns and promotion; SEO and online visibility; monitoring and reporting
   - Delivery focus: digital communication, social media management, online visibility, performance monitoring

### Telecom and RF

9. `rf-drive-test-network-optimization`
   - Status: Completed
   - Client: C.C.S. Nepal Private Limited
   - Operator: Nepal Telecom
   - Project: NT 4G LTE Project
   - Location: Nepal, covering Terai, Mid-Hill, High-Hill, and Kathmandu
   - Duration: 17 November 2019 - 20 May 2024
   - Coverage: 1,214 sites: Terai 423, Mid-Hill 442, High-Hill 24, Kathmandu 325
   - Scope groups: Single-Site Verification; site audit and physical verification; physical RF optimization
   - Delivery focus: site verification, RF performance, physical optimization, geographic execution, quality and reporting

10. `cluster-drive-test-optimization`
    - Status: Completed
    - Client: C.C.S. Nepal Private Limited
    - Operator: Nepal Telecom
    - Project: NT 4G LTE Project
    - Location: Nepal, across 7 provinces and the Terai, Mid-Hill, and High-Hill regions
    - Duration: 17 November 2019 - 01 August 2024
    - Coverage: 62 clusters and 1,659 commissioned 4G LTE sites: Terai 1,068, Mid-Hill 544, High-Hill 47
    - Scope groups: cluster test execution; test scenarios; pre-drive and post-drive analysis; physical verification and optimization; reporting
    - Delivery focus: cluster RF performance, pre- and post-optimization comparison, physical RF optimization, geographic execution, quality and reporting

11. `rf-customer-complaint-analysis-optimization`
    - Status: Completed
    - Client: C.C.S. Nepal Private Limited
    - Operator: Nepal Telecom
    - Project: NT 4G LTE Project
    - Location: All seven provinces of Nepal
    - Duration: 17 November 2019 - 20 May 2024
    - Coverage: customer complaint-based RF investigation
    - Scope groups: customer complaint investigation; Drive Test and network testing; RF analysis and issue identification; physical and logical optimization; reporting
    - Delivery focus: complaint-based investigation, RF performance analysis, physical and logical optimization, issue resolution, technical reporting

12. `ssv-drive-testing-ncell`
    - Status: Completed
    - Client: ZTE Nepal Pvt. Ltd.
    - Operator: Ncell
    - Location: Madhesh Province, Koshi Province, and Lumbini Province
    - Coverage: 381 sites across GSM, UMTS, LTE, L900, L2100, 4T4R, multisector, and POC site categories
    - Scope groups: SSV drive testing; network and technology verification; site and sector verification; performance analysis; re-testing and validation; technical reporting
    - Delivery focus: SSV execution, network performance, site validation, issue identification, quality and reporting

## Detail page structure

Every project detail route should render, when data is available:

1. Category and project title.
2. Subtitle or description.
3. Client, operator, project, location, coverage, duration, and status metadata.
4. `PROJECT AT A GLANCE` metrics.
5. `PROJECT OVERVIEW` prose.
6. `SCOPE OF WORK` grouped lists.
7. `OUR ROLE` prose.
8. `DELIVERY FOCUS` grouped proof items.
9. `PROJECT COVERAGE` when the brief supplies regional, site, kilometer, or location coverage.
10. Links back to all projects and to the contact / quote route.

Do not fabricate missing clients, dates, site counts, or performance results. If a record lacks a value, omit that metadata row instead of rendering a guessed value.

## Implementation steps

- [ ] Reconcile all twelve `ProjectRecord` objects against the tables above and the full source document.
- [ ] Add any missing optional fields for end client, project date, target availability, fault response, coverage breakdown, or extra detail groups without weakening the type model.
- [ ] Set the homepage featured order explicitly rather than relying on accidental array order.
- [ ] Keep category filters working for Telecom, Fiber, Solar, and IT.
- [ ] Make every card keyboard accessible with a clear status and link name.
- [ ] Confirm `generateMetadata` uses the project title and a useful description for every slug.
- [ ] Add tests for the twelve-record count, six featured records, category filtering, status labels, and detail-page sections.

## Acceptance checks

- `/projects` displays all twelve records with accurate categories and status labels.
- `/projects` filter controls show only matching records and do not break on mobile.
- All twelve slugs resolve to detail pages.
- The six homepage records match the requested order and metadata.
- No project detail page shows a blank required heading or broken image.
- The project grid and detail pages have no horizontal overflow.
- `npx vitest run data/site.test.ts components/project-grid.test.tsx app/projects/page.test.tsx 'app/projects/[slug]/page.test.tsx' --no-file-parallelism --maxWorkers=1` passes, followed by `npm run lint` and `npm run test:e2e`.
