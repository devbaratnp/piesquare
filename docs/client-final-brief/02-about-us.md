# About Us implementation plan

> **For agentic workers:** Use this plan to implement `final_brief/2.About Us.docx` on the existing `/company` route.

**Goal:** Present Pie Square Technologies as a multidisciplinary infrastructure partner with a clear story, vision, mission, values, delivery approach, department-based workforce, supported industries, and Nepal-wide coverage.

**Architecture:** Keep the paper-style `InnerPage` shell and the current company route. Store all client copy in `data/site.ts`, then render it through focused sections in `app/company/page.tsx`. Do not add named employee profiles or team biographies.

**Tech stack:** Next.js App Router, TypeScript, `data/site.ts`, `app/company/page.tsx`, `app/globals.css`, `next/image`, Vitest, and Playwright for layout changes.

## Files

- Modify: `data/site.ts`
- Modify: `app/company/page.tsx`
- Modify: `app/globals.css`
- Test: `app/company/page.test.tsx`
- Verify shared behavior: `components/inner-page.tsx`, `components/floating-contact.tsx`

## Content requirements

### Page opening

- Make the `ABOUT US` page title larger than the small editorial arrow label.
- Remove the boxed or marked reference areas.
- Keep the arrow or supporting topic text smaller than the page title.
- Make `WHO WE ARE` slightly larger than its body copy, but smaller than the page title.

### Who we are copy

Replace the red-box content with:

> Our strength lies in bringing multi-disciplinary expertise in Telecom, Fiber Optics, Solar Energy, and IT Infrastructure under one roof, with responsible execution, and EHS compliance enabling clients to manage diverse infrastructure requirements through a single, dependable partner. From field-level execution to project coordination and management, our teams work with a practical, solution-oriented approach to meet demanding project requirements. We continuously focus on operational efficiency, technical accuracy, adaptability, and long-term client relationships, helping build infrastructure that is reliable, scalable, and ready for the future.

### Vision and mission

Use the following section format:

#### Our vision

`Building the infrastructure that connects, powers and enables Nepal.`

To create reliable infrastructure that strengthens connectivity, supports sustainable energy, and enables communities and businesses to move forward through technology.

#### Our mission

`Integrated solutions. Reliable delivery.`

To deliver integrated infrastructure and technology solutions with quality, safety and accountability, combining engineering expertise, field execution and dependable project delivery across Nepal.

### Values

Keep the existing value topics and update the body copy to the following:

| Value | Copy |
| --- | --- |
| Integrity | We work transparently, keep our commitments and make decisions that stand up to scrutiny and field realities. |
| Safety | We promote a proactive safety culture through risk assessment, proper PPE, safe work practices, trained personnel, and continuous EHS awareness, ensuring our people, clients, communities, and the environment are protected. |
| Quality | We combine disciplined workmanship, measured testing and clear documentation to deliver reliable results. |
| Accountability | We take ownership of communication, coordination and delivery, from survey and execution to handover and support. |
| Innovation | We adopt practical technologies, tools and methods that improve efficiency, reliability and field performance. |
| Customer Focus | We listen closely, communicate clearly and deliver solutions aligned with our clients' needs and objectives. |

### Our approach

Use:

- Heading: `OUR APPROACH`
- Subheading: `Engineered with Precision. Delivered with Discipline.`
- Intro: `Every project follows a structured process, from site survey and planning to safe execution, testing, documentation and handover. We combine engineering discipline with practical field execution to deliver reliable, measurable results.`

Render these four principles:

1. Survey-Based Engineering: Field data and site assessments inform practical, build-ready solutions.
2. Quality Testing & Documentation: Inspection, testing and documentation provide clear evidence of completed work.
3. Safety-Controlled Execution: Method statements, toolbox briefings and site procedures support safe project delivery.
4. Dedicated Project Coordination: Clear communication, reporting and coordination keep every project aligned from survey to handover.

### Our team

- Do not add individual profiles or employee names.
- Use the heading `OUR TEAM`.
- Use the subheading `Multidisciplinary Expertise. Experienced Delivery Team.`
- Use this intro: `Our multidisciplinary workforce brings together engineering, technical and field expertise to deliver infrastructure projects safely, efficiently and reliably across Nepal.`
- Render departments with designations:

| Department | Designations |
| --- | --- |
| Civil Engineering | Civil Engineers · Site Supervisors · Masons & Technicians |
| Telecom & RF Engineering | Telecom Engineers · RF Engineers · Technicians |
| Fiber & Network Operations | Fiber Technicians · Splicers · O&M Technicians |
| Solar & Electrical | Electrical Engineers · Solar Technicians · Electrical Technicians · Site Supervisors |
| IT Solutions | Computer Engineers · IT Professionals · IT Technicians |
| Project Management & Coordination | Project Managers · Project Coordinators · Planning & Reporting |
| Safety & Quality | Safety & Quality Coordinators · Site Supervisors |

### Industries we support

Add the subheading `INDUSTRIES WE SUPPORT` and render these seven industry records:

| Industry | Scope line |
| --- | --- |
| Telecommunications | Tower Works · Equipment Installation · RF · Network Infrastructure · Field Deployment · O&M |
| Internet & Fiber Networks | FTTH · Fiber Deployment · Network Maintenance · Field Operations |
| EPC & Infrastructure | Engineering · Procurement · Construction · Project Execution |
| Renewable Energy | Solar · Electrical Systems · Installation · O&M |
| IT & Digital Infrastructure | Networking · IT Infrastructure · Systems Installation · Technical Support |
| Government & Public Infrastructure | Infrastructure Deployment · Connectivity · Technology Solutions |
| Commercial & Industrial | Electrical · Solar · Infrastructure · Technology Solutions |

### Geographic coverage

Keep the existing geographic coverage section. Verify that the wording, map or visual does not imply service outside Nepal unless the client approves that claim.

## Implementation steps

- [ ] Move the vision, mission, values, approach, departments, and industries into typed data exports in `data/site.ts`.
- [ ] Replace any inline company paragraphs in `app/company/page.tsx` with the shared data values.
- [ ] Remove employee-profile or team-name UI if present.
- [ ] Build the department section as accessible cards or rows with real headings and readable text at mobile widths.
- [ ] Keep the route's one visible `h1`, breadcrumb, footer, and floating contact actions.
- [ ] Add tests for the vision, mission, all seven industries, department labels, and the absence of employee profile UI.

## Acceptance checks

- `/company` has exactly one visible `h1` and a working breadcrumb back to `/`.
- The client paragraph appears without the old red-box copy.
- All six values, four approach principles, seven departments or department groups, and seven industries are present.
- The page has no horizontal overflow at desktop or mobile widths.
- The section remains readable with reduced motion.
- `npx vitest run app/company/page.test.tsx --no-file-parallelism --maxWorkers=1` passes, followed by `npm run lint`.
