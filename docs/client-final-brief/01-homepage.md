# Homepage implementation plan

> **For agentic workers:** Use this plan to implement the requirements in `final_brief/1.Homepage.docx`. Complete the shared content changes in `data/site.ts` before changing the scene markup.

**Goal:** Shape the homepage into the client-approved story: a light field-delivery hero, a clear company introduction, four capability divisions, delivery proof, six featured projects, trusted clients, reasons to choose Pie Square, a profile download, and direct contact actions.

**Architecture:** Keep `components/home-experience.tsx` as the scene sequence and use `data/site.ts` for all copy and records. Reuse the existing project grid and shared contact/footer primitives instead of introducing a homepage-only data model.

**Tech stack:** Next.js App Router, TypeScript, GSAP/ScrollTrigger, Lenis, `next/image`, CSS in `app/globals.css`, Vitest, and Playwright.

## Files

- Modify: `data/site.ts`
- Modify: `components/home-experience.tsx`
- Modify: `components/site-nav.tsx`
- Modify: `components/floating-contact.tsx`
- Modify: `components/inner-page.tsx`
- Modify: `app/globals.css`
- Add or normalize: `public/media/logos/*` and approved homepage image assets
- Test: `app/page.test.tsx`, `components/site-nav.test.tsx`, `components/project-grid.test.tsx`, and `tests/site.spec.ts` when layout or navigation changes

## Content and layout requirements

### Hero

- Keep the normal cursor/pointer behavior.
- Use a white or light page background, consistent with the rest of the light editorial surface.
- Keep the headline exactly as: `BUILDING THE INFRASTRUCTURE THAT KEEPS NEPAL CONNECTED.`
- Keep the two primary actions: `VIEW OUR WORK` and `EXPLORE OUR SERVICES`.
- Remove `SCROLL TO TRANSMIT`.
- Make the logo slightly larger.
- Remove any unnecessary hero footer content.
- Keep the visible address limited to `Lalitpur, Nepal`.
- Do not expose a Certifications tab in the navigation.

### Who we are

- Remove the marked arrow treatment and keep a larger `WHO WE ARE` heading.
- Use the client paragraph from the brief:

  > Pie Square Technologies delivers integrated infrastructure solutions across telecom, fiber optics, solar & renewable energy and IT. With experienced technical teams, specialized equipment, and a field-focused approach, we work with telecom operators, ISPs, EPC contractors, technology companies, enterprises and government agencies, supporting infrastructure projects from survey, installation, testing, commissioning and long-term maintenance. Our focus is simple: quality execution, safe operations, timely delivery, and dependable long-term service.

- Rename `EXPLORE OUR NETWORK` to `LEARN MORE ABOUT US` and link it to `/company`.
- Remove CGNET, Nepal Telecom, and Ncell logos from the orbit around the company introduction.
- Keep the visual lockup as:
  - Center: `PIE SQUARE - FIELD DELIVERY NETWORK`
  - Around it: `TELECOM | FIBER | SOLAR & ELECTRICAL | IT`
  - Bottom: `ENGINEERING • DEPLOYMENT • COMMISSIONING • O&M`

### Company timeline

Keep the existing timeline structure and use these milestones:

| Marker | Label | Copy |
| --- | --- | --- |
| `2019` | Established | Engineering solutions since 2019. |
| `Telecom` | Telecom | Telecom infrastructure, testing and commissioning. |
| `Fiber` | Fiber | Fiber deployment, operations and maintenance. |
| `Energy` | Solar & Electrical | Solar, electrical installation and O&M. |
| `IT` | IT & Digital | Digital infrastructure, security and software. |
| `Today` | One integrated partner | One integrated infrastructure partner. |

### What we deliver

- Use the heading `WHAT WE DELIVER` at the same visual scale as `WHO WE ARE`.
- Keep the section background lighter and aligned with the hero surface.
- Remove the marked area from the reference.
- Keep the four divisions in a semi-transparent 2 by 2 layout with the current link treatment.
- Telecom: add `RF Testing` before `Tower Maintenance`.
- Fiber: add `Operation & Maintenance` as the final scope item.
- Solar: use the heading `SOLAR & ELECTRICAL` and add `Electrical Installation` and `O&M`.
- IT: use the heading `IT SOLUTIONS`, the client intro below, and four scope items:
  - `IT Consulting & Infrastructure`
  - `Networking & Cloud`
  - `CCTV & Security`
  - `Software & Web Solutions`

  > Delivering reliable IT consulting, network and cloud infrastructure, CCTV and security systems, and customized software and web solutions to support secure, efficient, and connected business operations.

### How we deliver

- Add a new heading: `HOW WE DELIVER`.
- Use the existing delivery sequence as the data source: `Survey`, `Design`, `Deploy`, `Test`, `Optimize`, `Maintain`.
- Present the section as a visual process below the field imagery. Keep it usable without motion and avoid making the illustrations required for comprehension.

### Proven field delivery

- Remove the marked area from the reference.
- Keep the topic `BUILT TO EXECUTE / PROVEN IN THE FIELD`.
- Render these proof metrics in the existing impact style:

| Value | Label | Detail |
| --- | --- | --- |
| `3,500+` | RF SITES TESTED | SSV & Cluster Drive Testing |
| `115` | TELECOM SITES INSTALLED | Equipment Installation & Commissioning |
| `4` | NEW TELECOM TOWER SITES | Foundation • Erection • Power • Grounding • Fencing |
| `2,240+ KM` | FIBER NETWORK DELIVERY | Installation • Survey • Managed Service & LMC |
| `400 kW` | SOLAR O&M CAPABILITY | Annual Maintenance & Operations |

### Homepage project portfolio

- Add the heading `PROJECT PORTFOLIO`.
- Show a grid of the six specified records and include `COMPLETED` or `ONGOING` on every card.
- Add a `VIEW ALL PROJECTS` link to `/projects`.
- Make every card link to its project detail page.
- Use the full card content and exact record mapping from [04-projects.md](./04-projects.md).
- The six homepage cards are:
  1. RF Drive Test & Network Optimization, completed, 1,214 sites.
  2. Cluster Drive Test & Optimization, completed, 62 clusters and 1,659 sites.
  3. SSV Drive Testing & Network Verification - Ncell, completed, 381 sites.
  4. Fiber Network Operations & Maintenance, ongoing, 1,166.731 km and 16 POPs.
  5. Fiber Network Deployment & ODN Implementation, completed, 218 km.
  6. 400 kWp Ground-Mount Solar Power Plant, ongoing.

### Trusted clients

- Rename the section topic to `TRUSTED BY INDUSTRY`.
- Keep the supporting line: `BUILT ON EXPERIENCE. TRUSTED FOR DELIVERY.`
- Show these six logos in a clean row or responsive grid, not in the removed orbit:
  - Nepal Telecom
  - Ncell
  - CGNET
  - Surya Nepal
  - ZTE
  - CCS Nepal / China Comservice, pending client label confirmation
- Add the supporting line below the logos:

  > Delivering reliable infrastructure and technology solutions across Nepal through trusted partnerships and proven field execution.

### Why choose us and profile download

- Keep the existing six-item proof set and place `Multi-domain expertise` first:
  1. Multi-domain expertise: Telecom, fiber, solar and IT capabilities under one organization.
  2. Expert Workforce: Highly experienced professionals with strong expertise spanning field operations, technical execution, project management, and leadership.
  3. End-to-End Execution: From survey, engineering and procurement to installation, testing, commissioning and O&M.
  4. Nationwide Reach: The people, resources and operational capability to deliver projects across Nepal.
  5. Quality & Safety: Strong emphasis on workmanship, testing, documentation, safety and compliance with project requirements.
  6. Built for Partnerships: Responsive coordination, dependable support and a long-term approach to every client relationship.
- Add a heading and link for downloading the company profile. Use a real file path only after the client profile PDF is added to the repository; do not create a dead link.

### Contact and footer

- Make name, phone number, and email required in the contact experience. Keep all other fields optional.
- Keep call and WhatsApp links floating through every homepage scene.
- Add these footer values to the shared footer:
  - Facebook: `https://www.facebook.com/share/14rqRmyzjqT/?mibextid=wwXIfr`
  - WhatsApp: `+977 9715000715`
  - Call: `+977 9715000715`
  - Email: `info@piesquaretechnologies.com`

## Implementation steps

- [ ] Move every homepage string above into typed exports in `data/site.ts`.
- [ ] Update the scene order and labels in `components/home-experience.tsx` without removing any required anchor IDs.
- [ ] Remove the partner-logo orbit from the company introduction while keeping the trusted-client section later on the page.
- [ ] Update the four capability cards and their scope arrays.
- [ ] Replace the homepage project selection with the six requested records and keep the status visible.
- [ ] Add the approved logo asset paths and the trusted-client supporting line.
- [ ] Update floating contact and shared footer links.
- [ ] Add or update tests for the hero CTA, About link, six featured projects, trusted-client heading, required contact fields, and all required anchors.

## Acceptance checks

- The homepage has exactly one visible `h1`.
- All required homepage anchors render with reduced motion enabled.
- The page has no horizontal overflow at desktop and mobile widths.
- The six requested project cards link to real `/projects/:slug` routes.
- No CGNET, Nepal Telecom, or Ncell logos appear in the company-introduction orbit.
- The trusted-client section contains all six requested logos or a documented client-supplied replacement for CCS.
- Call and WhatsApp links are visible and keyboard accessible.
- `npx vitest run app/page.test.tsx components/site-nav.test.tsx components/project-grid.test.tsx --no-file-parallelism --maxWorkers=1` passes.
- Run `npm run lint` and `npm run test:e2e` because this plan changes scenes, navigation, images, and layout.
