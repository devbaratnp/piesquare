# Services implementation plan

> **For agentic workers:** Use this plan to implement `final_brief/3.SERVICES.docx` across the capabilities index and the four capability detail routes.

**Goal:** Make the services experience show four clear divisions, with complete capability lists, lifecycle steps, technical scope, related project proof, and the client-approved service descriptions.

**Architecture:** Keep `/capabilities` as the index and `/capabilities/telecom`, `/capabilities/optical-fiber`, `/capabilities/solar-energy`, and `/capabilities/it-solutions` as detail routes. Use `serviceOverview` and `serviceDetails` in `data/site.ts`; do not create a second services content source.

**Tech stack:** Next.js App Router, TypeScript, `ServiceDetail`, `data/site.ts`, `app/globals.css`, `next/image`, Vitest, and Playwright for responsive layout changes.

## Files

- Modify: `data/site.ts`
- Modify: `app/capabilities/page.tsx`
- Modify: `components/service-detail.tsx`
- Verify or modify: `app/capabilities/telecom/page.tsx`
- Verify or modify: `app/capabilities/optical-fiber/page.tsx`
- Verify or modify: `app/capabilities/solar-energy/page.tsx`
- Verify or modify: `app/capabilities/it-solutions/page.tsx`
- Modify: `app/globals.css`
- Test: `app/capabilities/page.test.tsx`, `components/service-detail.test.tsx`, and the four route tests if content assertions are added

## Shared services index

- Render four parts in the index:
  1. `TELECOM`
  2. `FIBER`
  3. `SOLAR & ELECTRICAL`
  4. `IT` or `IT SOLUTIONS` as the visible index label, with the route remaining `/capabilities/it-solutions`.
- Clicking a part must lead to the existing detail route.
- Keep the visual treatment aligned with the client reference: clear numbered divisions, an editorial layout, and no unrelated certification tab.
- Keep the index heading `FOUR DIVISIONS. ONE DELIVERY STANDARD.` where it is used on the capabilities page.
- Related project cards must use the `ProjectRecord` data described in [04-projects.md](./04-projects.md).

## Telecom

Use the existing client-approved intro:

> Complete Telecom site delivery covering civil works, tower installation, equipment deployment, RF drive testing, site integration, maintenance, and field support, delivered with a strong focus on safety, quality, and timely project execution across all provinces of Nepal.

Keep the current lifecycle:

`Site survey` → `Civil foundation` → `Tower erection` → `Equipment installation` → `Power and grounding` → `Commissioning` → `Optimization`

The capability list must include at least:

1. Civil Works
2. Tower Installation
3. RF Testing
4. Equipment Deployment
5. Site Integration
6. Testing & Commissioning
7. Tower Maintenance
8. Operation & Maintenance

Keep proof tied to the verified metrics: `115 telecom sites installed` and `3500+ RF sites tested`.

## Fiber

Use:

> Building reliable connectivity from the ground up, from route surveying and network planning to fiber deployment, precision splicing, testing, fault restoration and maintenance, ensuring robust and high-performance optical networks.

Render these twelve capabilities and descriptions exactly as data:

| No. | Capability | Description |
| --- | --- | --- |
| 01 | Route Survey | Physical route inspection, GIS data collection, obstacle mapping and survey reporting. |
| 02 | Fiber Route Planning | Route engineering, BOQ preparation, duct/pole planning and permit documentation support. |
| 03 | OFC Installation | Trenching, ducting, pulling and blowing of optical fiber cable on backbone and metro routes. |
| 04 | Underground Fiber | Duct laying, HDD coordination, chamber construction and underground cable deployment. |
| 05 | Aerial Fiber | Pole-line cable installation, lashing, ADSS deployment and pole treatment. |
| 06 | Fiber Splicing | Precision fusion splicing for backbone, distribution and access networks. |
| 07 | ODF & Distribution Installation | ODF, FDH, FDB and splitter installation, termination, dressing and labeling. |
| 08 | FTTH & Drop Fiber | FTTH deployment, drop-cable installation, customer connections and network extensions. |
| 09 | OTDR & Link Testing | Bi-directional OTDR testing, power measurement, loss-budget verification and trace analysis. |
| 10 | Fault Localization | Rapid fault localization using OTDR and visible fault locators with precise dig-point reporting. |
| 11 | Testing & Acceptance | End-to-end fiber testing, documentation, as-built records and network acceptance. |
| 12 | Maintenance & Restoration | Preventive maintenance, fault response, fiber repair, restoration and service recovery. |

Lifecycle: `Route Survey`, `Fiber Deployment`, `Splicing & Termination`, `OTDR Testing`, `Customer Connection`.

Technical scope: `Backbone & Access Fiber`, `Splicing & Termination`, `OTDR & Link Testing`, `POP & Network Integration`, `Fault Localization & Restoration`.

Use the fiber project proof records from the project plan and the approved supplied field images where a client-approved production crop is available.

## Solar & Electrical

Change the heading from `Solar Energy` to `SOLAR & ELECTRICAL` and use:

> Solar and Electrical systems engineered for Nepal's terrain and grid conditions, covering rooftop, commercial, ground-mounted and off-grid systems from site assessment and system design through installation, power integration, testing, commissioning and long-term operation & maintenance.

Render these twelve capabilities:

| No. | Capability | Description |
| --- | --- | --- |
| 01 | Solar Site Survey & Load Assessment | Solar potential, shading, structural conditions, electrical loads and site requirements. |
| 02 | Solar System Design | PV sizing, inverter and battery selection, SLD preparation, system design and yield estimation. |
| 03 | Solar BOQ & Estimation | Detailed BOQ, cost estimation, equipment specifications and procurement support. |
| 04 | Rooftop Solar | Residential, commercial and industrial rooftop PV systems with structural mounting and grid integration. |
| 05 | Ground-Mounted Solar | Ground-mounted PV plants including civil foundations, structures, array installation and electrical integration. |
| 06 | Solar Installation & Commissioning | Module installation, DC/AC cabling, inverter installation, testing, grid synchronization and system handover. |
| 07 | Solar Monitoring & O&M | Performance monitoring, cleaning, preventive maintenance, troubleshooting and fault response. |
| 08 | Transformer Installation | Transformer installation, cabling, protection, earthing, testing and commissioning. |
| 09 | Electrical Distribution | Electrical poles, distribution lines, cabling, panels, DB/MDB and associated infrastructure. |
| 10 | Transmission & Distribution Expansion | Pole erection, line extension, network expansion and associated electrical infrastructure. |
| 11 | Electrical Equipment Installation | Switchgear, protection systems, meters, batteries and other electrical equipment. |
| 12 | Testing, Commissioning & Maintenance | Electrical testing, system energization, commissioning, preventive maintenance and fault restoration. |

Lifecycle: `Site & Load Assessment`, `System Design & BOQ`, `Installation`, `Testing & Commissioning`, `Grid Integration`, `O&M`.

Technical scope: `Solar PV Systems`, `Rooftop & Ground-Mounted Solar`, `Battery & Hybrid Power Systems`, `Transformer Installation`, `Electrical Distribution & Pole Erection`, `Transmission & Distribution Expansion`, `Electrical Testing & Maintenance`.

## IT Solutions

Use the public heading `IT SOLUTIONS` and the client intro:

> Delivering reliable IT consulting, network and cloud infrastructure, CCTV and security systems, and customized software and web solutions to support secure, efficient, and connected business operations.

Render these ten capabilities:

| No. | Capability | Description |
| --- | --- | --- |
| 01 | Network Infrastructure | Design and deployment of switching, routing, firewall and network infrastructure. |
| 02 | LAN/WAN | Campus, office and branch network deployment with structured connectivity and segmentation. |
| 03 | Structured Cabling | Cat6/Cat6A and fiber backbone cabling, termination, labeling and testing. |
| 04 | Server Installation | Server, rack, storage, UPS and related equipment installation and configuration. |
| 05 | Data Center & Server Room Infrastructure | Racks, structured cabling, power, UPS and infrastructure coordination for server rooms and data environments. |
| 06 | Wi-Fi Infrastructure | Enterprise and commercial Wi-Fi deployment, access point installation, configuration and coverage optimization. |
| 07 | CCTV & Access Control | IP surveillance, NVR/VMS, access control and security system installation. |
| 08 | IT Hardware & Systems | Supply, installation and configuration of computers, workstations, printers, peripherals and related IT equipment. |
| 09 | Network Troubleshooting | Fault isolation, network diagnostics, performance analysis and technical resolution. |
| 10 | IT Maintenance & Support | Preventive maintenance, system health checks, troubleshooting and ongoing technical support. |

Lifecycle: `Assessment`, `Design`, `Deployment`, `Configuration & Testing`, `Handover`, `Support`.

Technical scope: `IT Infrastructure & LAN/WAN`, `Structured Cabling & Fiber`, `Server & Data Center Infrastructure`, `Wi-Fi & Network Systems`, `CCTV & Access Control`, `IT Hardware & Technical Support`.

## Implementation steps

- [ ] Move the complete capability arrays into `data/site.ts` and keep number, title, and description typed.
- [ ] Update the service index labels, heading, and links.
- [ ] Ensure `ServiceDetail` renders long capability lists without clipping or forcing unreadably small type.
- [ ] Keep lifecycle and technical scope sections visible on every detail route, with an accessible section label.
- [ ] Render related projects from `relatedProjectIds` and confirm each link resolves.
- [ ] Add responsive rules for the twelve-item Fiber and Solar lists.
- [ ] Remove any certification UI from the services experience.

## Acceptance checks

- `/capabilities` shows four divisions and six delivery-capability cards where the current design calls for six.
- Each detail route has one visible `h1`, a working breadcrumb, lifecycle, technical scope, capabilities, and related projects.
- Fiber contains 12 capability items, Solar & Electrical contains 12, IT Solutions contains 10, and Telecom contains the requested RF Testing and O&M entries.
- No service page has horizontal overflow on mobile.
- `npx vitest run app/capabilities/page.test.tsx components/service-detail.test.tsx --no-file-parallelism --maxWorkers=1` passes, followed by `npm run lint`.
