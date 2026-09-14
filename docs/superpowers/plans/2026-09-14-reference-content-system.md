# Reference content system implementation plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

Goal: Bring the approved reference site's complete content architecture, typography, Projects organization, Careers route, and light editorial inner-page surface into PieSquare while preserving the cinematic homepage scenes.

Architecture: Keep the cinematic homepage in components/home-experience.tsx. Store reference-derived copy and structured records in typed exports in data/site.ts. Reuse the existing InnerPage, ProjectGrid, ServiceDetail, SiteNav, and contact form boundaries. Add the missing Careers and Certifications routes, adapt the four capability routes to numbered reference service rows, and remove the blocking homepage loader.

Tech stack: Next.js 16.3.4 App Router, React 19, TypeScript, CSS, next/font/google, next/image, GSAP, Lenis, Vitest, and Playwright.

---

## File map

- Modify data/site.ts for rich projects, service rows, careers, certifications, and navigation data.
- Modify app/layout.tsx for self-hosted Space Grotesk Variable and DM Sans Variable.
- Modify app/globals.css for font variables, light editorial tokens, service rows, career rows, certification cards, and responsive rules.
- Modify components/site-nav.tsx for the Services dropdown plus Careers and Certifications links.
- Modify components/home-experience.tsx to remove Loader and align reference-sensitive copy without changing scene order.
- Modify components/inner-page.tsx and components/service-detail.tsx for the shared light shell and numbered service content.
- Modify components/project-grid.tsx and app/projects/page.tsx for the rich reference project records.
- Create components/careers-list.tsx and app/careers/page.tsx.
- Create app/certifications/page.tsx.
- Modify app/company/page.tsx, app/capabilities/page.tsx, and app/contact/page.tsx.
- Modify route/component tests and tests/site.spec.ts.
- Modify tests/visual-review.md and README.md.

## Task 1: Lock the expanded contracts in failing tests

Files:
- Modify data/site.test.ts
- Modify app/page.test.tsx
- Modify components/site-nav.test.tsx
- Modify components/project-grid.test.tsx
- Create components/careers-list.test.tsx
- Create app/certifications/page.test.tsx
- Modify tests/site.spec.ts

- [x] Step 1: Add data assertions for the eight reference projects, four service overview records, 8/10/11/10 service capability row counts, six career roles, and seven certifications.

Use these assertions:

~~~ts
expect(projects.map((project) => project.title)).toEqual([
  'National Backbone Fiber Deployment',
  '4G Tower Site Rollout',
  'Rural Connectivity Tower Program',
  'FTTH Metro Fiber Expansion',
  'Off-Grid Solar for Telecom Sites',
  'Commercial Rooftop Solar Installation',
  'Enterprise Data Center Build',
  'Campus Network & CCTV Deployment',
]);
expect(serviceDetails.telecom.capabilities).toHaveLength(8);
expect(serviceDetails['optical-fiber'].capabilities).toHaveLength(10);
expect(serviceDetails['solar-energy'].capabilities).toHaveLength(11);
expect(serviceDetails['it-solutions'].capabilities).toHaveLength(10);
expect(careerRoles).toHaveLength(6);
expect(certifications).toHaveLength(7);
~~~

- [x] Step 2: Extend navigation tests to assert Home, About Us, the Services trigger, Projects, Capabilities, Certifications, Careers, Contact, and the Request a Quote CTA. Assert the mobile menu exposes the same destinations.

- [x] Step 3: Extend app/page.test.tsx to assert the approved homepage anchor order and that no element with class loader or accessible name containing system initializing is rendered.

- [x] Step 4: Add a Playwright route table for /, /company, /capabilities, /capabilities/telecom, /capabilities/optical-fiber, /capabilities/solar-energy, /capabilities/it-solutions, /projects, /careers, /certifications, and /contact. Each route must show one visible h1, no horizontal overflow, and no console.error messages.

- [x] Step 5: Run the focused tests before implementation.

Run: npm test -- --run data/site.test.ts app/page.test.tsx components/site-nav.test.tsx components/project-grid.test.tsx components/careers-list.test.tsx app/certifications/page.test.tsx

Expected: FAIL because the rich records, new routes, Services dropdown, and loader removal are not implemented.

- [x] Step 6: Commit the test contract.

~~~powershell
git add data/site.test.ts app/page.test.tsx components/site-nav.test.tsx components/project-grid.test.tsx components/careers-list.test.tsx app/certifications/page.test.tsx tests/site.spec.ts
git commit -m "test: lock reference content contracts"
~~~

## Task 2: Add the complete typed content model

Files:
- Modify data/site.ts
- Modify data/site.test.ts

- [x] Step 1: Add the shared records.

~~~ts
export type ProjectStatus = 'COMPLETED' | 'ONGOING';

export type ProjectRecord = Readonly<{
  id: string;
  title: string;
  status: ProjectStatus;
  category: 'TELECOM' | 'FIBER' | 'SOLAR' | 'IT';
  location: string;
  scope: ReadonlyArray<string>;
  description: string;
  image: string;
  imageAlt: string;
}>;

export type ServiceCapability = Readonly<{
  number: string;
  title: string;
  copy: string;
}>;

export type CareerRole = Readonly<{
  id: string;
  title: string;
  type: 'Full-time' | 'Internship';
  location: string;
  discipline: string;
  description: string;
  requirements: ReadonlyArray<string>;
  applicationSubject: string;
}>;

export type CertificationRecord = Readonly<{
  title: string;
  description: string;
  status: 'Document pending verification';
}>;
~~~

- [x] Step 2: Replace the current tuple projects with the eight reference records. Use the exact reference titles, statuses, categories, locations, scopes, and descriptions captured from the browser. Map records to existing local images and use accurate image alt text.

- [x] Step 3: Add serviceOverview with the reference summaries for Telecom Infrastructure, Fiber Optic Networks, Solar Energy, and IT Infrastructure. Extend each serviceDetails record with a capabilities array and relatedProjectIds. Populate the rows with the captured reference copy:
  - Telecom: Civil Works; Tower Installation; Tower Maintenance; RF Drive Testing; Telecom Site Installation; Equipment Installation; Testing & Commissioning; Maintenance.
  - Fiber: Route Survey; Fiber Route Planning; OFC Installation; Underground Fiber; Aerial Fiber; Fiber Splicing; ODF Installation; OTDR Testing; Fault Localization; Maintenance & Restoration.
  - Solar: Site Survey; Load Assessment; System Design; BOQ & Estimation; Rooftop Solar; Commercial Solar; Ground-Mounted Solar; Installation; Testing; Commissioning; Operation & Maintenance.
  - IT: Network Infrastructure; LAN/WAN; Structured Cabling; Server Installation; Data Center Infrastructure; Wi-Fi; CCTV & Security; Hardware; Network Troubleshooting; IT Maintenance.

- [x] Step 4: Add the six reference career roles with their captured descriptions and requirements. Set each applicationSubject to "Application: [role title] - Pie Square Technologies". Add seven certification records with captured descriptions and status Document pending verification.

- [x] Step 5: Set projectFilters to All, Telecom, Fiber, Solar, and IT. Add serviceNav records for the four capability routes and add Careers and Certifications to the primary route data. Keep current PieSquare contacts, logos, and verified impact metrics.

- [x] Step 6: Run the data tests and commit.

Run: npm test -- --run data/site.test.ts

Expected: PASS.

~~~powershell
git add data/site.ts data/site.test.ts
git commit -m "feat: add reference content records"
~~~

## Task 3: Apply typography, navigation, and loader removal

Files:
- Modify app/layout.tsx
- Modify app/globals.css
- Modify components/site-nav.tsx
- Modify components/home-experience.tsx
- Modify components/site-nav.test.tsx
- Modify app/page.test.tsx

- [x] Step 1: Add self-hosted font variables in app/layout.tsx.

~~~tsx
import { DM_Sans, Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

<html lang="en" className={spaceGrotesk.variable + ' ' + dmSans.variable}>
~~~

- [x] Step 2: Change the CSS font variables to Space Grotesk for display and DM Sans for body/navigation while retaining the existing mono signal labels and cinematic tokens.

~~~css
:root {
  --display: var(--font-display), "Space Grotesk", sans-serif;
  --body: var(--font-body), "DM Sans", sans-serif;
}
~~~

- [x] Step 3: Add a keyboard-safe Services dropdown containing links to /capabilities/telecom, /capabilities/optical-fiber, /capabilities/solar-energy, and /capabilities/it-solutions. Close it on Escape and on selecting a service. Add the same group to the mobile menu with aria-expanded and aria-controls.

- [x] Step 4: Delete the Loader function and its loader-only state/effect code from components/home-experience.tsx. Remove the Loader render call. The homepage must open directly on the hero scene.

- [x] Step 5: Run tests and commit.

Run: npm test -- --run components/site-nav.test.tsx app/page.test.tsx

Expected: PASS.

~~~powershell
git add app/layout.tsx app/globals.css components/site-nav.tsx components/home-experience.tsx components/site-nav.test.tsx app/page.test.tsx
git commit -m "feat: align navigation typography and first frame"
~~~

## Task 4: Build the shared light inner-page system and service routes

Files:
- Modify components/inner-page.tsx
- Modify components/service-detail.tsx
- Modify app/capabilities/page.tsx
- Modify app/capabilities/telecom/page.tsx
- Modify app/capabilities/optical-fiber/page.tsx
- Modify app/capabilities/solar-energy/page.tsx
- Modify app/capabilities/it-solutions/page.tsx
- Modify components/inner-page.test.tsx
- Modify components/service-detail.test.tsx
- Modify app/globals.css

- [x] Step 1: Add tests for one h1, breadcrumb links, CTA links, footer route groups, numbered service rows, related project heading, and an empty related-project state.

- [x] Step 2: Keep InnerPage as the shared shell. Render the reference light surface with breadcrumb, eyebrow, large heading, lede, CTA pair, SignalLine, SiteNav, and footer. Preserve the existing props unless a small optional prop is required by a testable route difference.

- [x] Step 3: Render service rows from service.capabilities.

~~~tsx
<ol className="service-capability-grid">
  {service.capabilities.map((item) => (
    <li key={item.number}>
      <span>{item.number}</span>
      <h2>{item.title}</h2>
      <p>{item.copy}</p>
    </li>
  ))}
</ol>
~~~

Render Related Projects, an All Projects link, cards filtered by relatedProjectIds, and the existing lifecycle/scope/proof blocks where supported.

- [x] Step 4: Make /capabilities use Four Divisions. One Delivery Standard. with four serviceOverview cards. Use verified PieSquare impactStats instead of reference XX+ placeholders.

- [x] Step 5: Pass the matching typed serviceDetails records into the four capability routes. Use the captured reference intros, numbered rows, related projects, and existing local images.

- [x] Step 6: Run tests and commit.

Run: npm test -- --run components/inner-page.test.tsx components/service-detail.test.tsx app/capabilities/page.test.tsx

Expected: PASS.

~~~powershell
git add components/inner-page.tsx components/service-detail.tsx app/capabilities components/inner-page.test.tsx components/service-detail.test.tsx app/globals.css
git commit -m "feat: build reference service pages"
~~~

## Task 5: Rebuild Projects with reference organization

Files:
- Modify components/project-grid.tsx
- Modify components/project-grid.test.tsx
- Modify app/projects/page.tsx
- Modify components/home-experience.tsx
- Modify app/globals.css

- [x] Step 1: Test the filter labels All, Telecom, Fiber, Solar, and IT; assert All shows eight records, Fiber shows two, IT shows two, and each card exposes status, category, title, location, scope, and description.

- [x] Step 2: Filter ProjectRecord values using category equality. Render a status badge, category, title, location, scope joined with a bullet separator, description, and image. Keep aria-pressed and aria-live count behavior.

- [x] Step 3: Use the reference Projects heading and lede: Our Projects; Field experience that speaks for itself — select any project for full technical detail. Render the five verified impact metrics after the grid.

- [x] Step 4: Keep the approved homepage #projects scene while mapping the first six rich project records into evidence cards. Use BUILT IN THE FIELD. PROVEN IN THE NETWORK. and REAL COMPANY DOCUMENTATION / PROOF OF WORK.

- [x] Step 5: Run tests and commit.

Run: npm test -- --run components/project-grid.test.tsx app/projects/page.test.tsx

Expected: PASS.

~~~powershell
git add components/project-grid.tsx components/project-grid.test.tsx app/projects/page.tsx components/home-experience.tsx app/globals.css
git commit -m "feat: organize projects like the reference"
~~~

## Task 6: Add Careers and Certifications

Files:
- Create components/careers-list.tsx
- Create components/careers-list.test.tsx
- Create app/careers/page.tsx
- Create app/certifications/page.tsx
- Create app/certifications/page.test.tsx
- Modify components/inner-page.tsx
- Modify app/globals.css

- [x] Step 1: Add CareersList. Each role renders title, employment type, location, discipline, description, requirement chips, and an Apply Now mailto link. The link must open a draft only and must not submit a form automatically.

Use this link shape:

~~~tsx
<a
  className="button button--primary career-role__apply"
  href={'mailto:' + siteContact.email + '?subject=' + encodeURIComponent(role.applicationSubject)}
>
  Apply Now
</a>
~~~

- [x] Step 2: Add /careers with the reference heading Build Your Career With Us. and lede Engineering, technical, field and project-management roles across Nepal — plus internships for the next generation of infrastructure professionals.

- [x] Step 3: Add /certifications with Certifications & Compliance. Render seven cards with a document icon, description, and disabled-style Document pending verification state. Do not render fake certificate links.

- [x] Step 4: Add desktop and mobile styles. Roles use a two-column layout above 720px and stack below 720px. Certifications use three columns above 1080px, two columns from 721px to 1080px, and one column at 720px and below.

- [x] Step 5: Run tests and commit.

Run: npm test -- --run components/careers-list.test.tsx app/certifications/page.test.tsx

Expected: PASS.

~~~powershell
git add components/careers-list.tsx components/careers-list.test.tsx app/careers/page.tsx app/certifications/page.tsx app/certifications/page.test.tsx components/inner-page.tsx app/globals.css
git commit -m "feat: add careers and compliance routes"
~~~

## Task 7: Align Company, Contact, and homepage copy

Files:
- Modify app/company/page.tsx
- Modify app/contact/page.tsx
- Modify components/contact-form.tsx
- Modify components/home-experience.tsx
- Modify data/site.ts
- Modify app/globals.css

- [x] Step 1: Update /company with The Field Force Behind Critical Infrastructure, An Engineering Company Built for the Field, the six captured values, Methodical Engineering. Disciplined Execution, four approach bullets, the supported workforce list, and the seven-province coverage statement. Keep team profiles and map areas clearly unavailable when no approved records exist.

- [x] Step 2: Organize /contact with Talk to Our Engineering Team, direct Call/WhatsApp/Email actions, head office, phone, email, Sunday–Friday 9:00–18:00 business hours, Send Us a Message, Let's Build Your Next Project, and Need a Site Survey. Keep the frontend-only contact boundary and do not add backend submission.

- [x] Step 3: Align homepage visible copy to the captured reference wording where supported, including INTEGRATED INFRASTRUCTURE & TECHNOLOGY SOLUTIONS, Building the Infrastructure That Keeps the World Connected, Four engineering divisions, one accountable delivery partner — from survey to long-term maintenance, Our Projects, and REAL COMPANY DOCUMENTATION / PROOF OF WORK. Keep approved scene IDs, metrics, contact details, and motion.

- [x] Step 4: Run tests and commit.

Run: npm test -- --run app/company/page.test.tsx app/contact/page.test.tsx components/contact-form.test.tsx app/page.test.tsx

Expected: PASS.

~~~powershell
git add app/company/page.tsx app/contact/page.tsx components/contact-form.tsx components/home-experience.tsx data/site.ts app/globals.css
git commit -m "feat: align company contact and homepage copy"
~~~

## Task 8: Verify the complete release

Files:
- Modify tests/site.spec.ts
- Modify tests/visual-review.md
- Modify README.md

- [x] Step 1: Run all static checks in order.

~~~powershell
npm run lint
npm test -- --run
npm run build
~~~

Expected: all commands exit with code 0.

- [x] Step 2: Run browser coverage.

~~~powershell
npm run test:e2e
~~~

Expected: desktop and mobile route smoke tests pass with no overflow, visible first-frame homepage content, working navigation, filters, Careers mailto links, and no uncaught console errors.

- [x] Step 3: Use the Codex in-app browser on the local production server to inspect all twelve routes at 1440px and 390px. Verify Space Grotesk/DM Sans pairing, light inner-page surface, stable image crops, no initializing screen, visible focus states, and no clipped headings.

- [x] Step 4: Update tests/visual-review.md with the passing commands, route list, viewport sizes, screenshot notes, and pending certificate/team-source constraints. Update README.md with new routes and the reference content source.

- [x] Step 5: Check and commit the documentation.

~~~powershell
git status --short
git diff --check
git add tests/site.spec.ts tests/visual-review.md README.md
git commit -m "docs: record reference site verification"
~~~

Expected: git diff --check is silent and only intended documentation changes are committed.
