# Careers and contact implementation plan

> **For agentic workers:** Use this plan to implement the careers and contact requirements from `final_brief/6.Other pages.docx`. Keep form behavior presentation-only as required by the repository guidelines.

**Goal:** Make the careers route support general applications and three detailed vacancy cards, and make the contact route present direct call, WhatsApp, email, and map actions with required name, phone, and email fields.

**Architecture:** Keep `/careers` and `/contact` as separate routes. Extend the typed career model only where the brief needs responsibilities or a desired-position field. Keep `ContactForm` as a non-submitting presentation form and use `siteContact` for every contact value.

**Tech stack:** Next.js App Router, TypeScript, React forms, `data/site.ts`, `components/careers-list.tsx`, `components/contact-form.tsx`, `components/floating-contact.tsx`, `app/globals.css`, Vitest, and Playwright.

## Files

- Modify: `data/site.ts`
- Modify: `app/careers/page.tsx`
- Modify: `components/careers-list.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/contact-form.tsx`
- Modify: `components/floating-contact.tsx`
- Modify: `components/inner-page.tsx` for shared footer contact links
- Modify: `app/globals.css`
- Test: `components/careers-list.test.tsx`, `components/contact-form.test.tsx`, `app/careers/page.test.tsx`, `app/contact/page.test.tsx`

## Careers page

### Opening content

- Use the heading `BUILD YOUR CAREER WITH US.`
- Use: `Join a growing team delivering infrastructure, connectivity, energy and technology projects across Nepal.`
- Use: `We welcome applications from engineering, technical, field, project coordination and support professionals, as well as students seeking internship opportunities.`
- Keep a general CTA labeled `SEND YOUR CV`.
- The general application form must ask for the applicant's desired position.

### General application form

Use these fields:

- Required: name, phone number, email, desired position.
- Optional: CV / file attachment, location, message, and any additional context.
- Keep the form presentation-only. The file control may be visible, but do not implement upload or persistence.
- Use an accessible label for every control and a clear success-neutral submit state because no backend is connected.

### Vacancy 01: RF Drive Test Engineer

- Location: Field-Based / Project Locations
- Employment: Full-time
- Role: RF drive testing, network data collection, post-processing and optimization reporting for mobile networks.
- Responsibilities:
  - Conduct RF drive tests and collect network performance data.
  - Perform post-processing and prepare drive-test reports.
  - Analyze key network performance indicators and identify coverage or quality issues.
  - Support network optimization activities and field verification.
  - Coordinate with field and technical teams during testing activities.
- Requirements:
  - Experience with RF drive-test tools such as TEMS.
  - Understanding of GSM, UMTS and LTE KPIs.
  - Basic knowledge of RF/network optimization.
  - Ability to work in field environments and travel extensively across Nepal.
  - Good reporting and communication skills.

### Vacancy 02: RF Data Analyst

- Location: Office-Based
- Employment: Full-time
- Role: Responsible for RF data post-processing and technical reporting based on drive-test logs, SSV, cluster testing and customer complaint data.
- Responsibilities:
  - Post-process RF drive-test logs using Actix.
  - Prepare SSV and cluster analysis reports.
  - Analyze GSM, UMTS and LTE KPIs.
  - Prepare customer complaint analysis reports.
  - Identify coverage and quality issues from RF data.
  - Prepare clear technical reports, charts and KPI summaries.
- Requirements:
  - Practical experience with Actix and RF data analysis.
  - Good understanding of GSM / UMTS / LTE KPIs.
  - Experience in SSV and cluster report preparation.
  - Proficiency in Microsoft Excel, Google Earth and MS Word.
  - Knowledge of mobile network RF performance and optimization.

### Vacancy 03: RF Technician / Rigger

- Location: Field-Based
- Employment: Full-time
- Role: RF field technician responsible for tower climbing, antenna installation and adjustment, azimuth optimization and MT optimization.
- Requirements:
  - RF field and tower-climbing experience.
  - Knowledge of antennas, azimuth and tilt.
  - Experience in azimuth and MT optimization.
  - Willingness to travel to project sites.
  - Safety awareness for work at height.
- Render `Apply Now` as an email link using the existing application subject convention. Do not introduce a backend.

## Contact page

- Remove the generic `Discuss a project` framing where it conflicts with the supplied contact reference.
- Lead with direct contact actions: call, WhatsApp, email, and location.
- Keep the visible address limited to `Lalitpur, Nepal`.
- Link the map action to `https://maps.app.goo.gl/c1qiB9XLx6HiBsWu9?g_st=ic`.
- Use:
  - Phone: `+977 9715000715`
  - WhatsApp: `+977 9715000715`
  - Email: `info@piesquaretechnologies.com`
  - Website: `piesquaretechnologies.com`
- Keep the request-a-quote, general message, and site-survey forms if they remain useful, but make name, phone, and email required and keep all other fields optional.
- Keep the existing no-backend behavior. Use `href` links for the direct contact options so they work even if the form is not submitted.

## Shared contact and footer

- Keep the call and WhatsApp floating actions on careers, contact, inner pages, and the homepage.
- Add Facebook to the footer using `https://www.facebook.com/share/14rqRmyzjqT/?mibextid=wwXIfr`.
- Keep email, phone, WhatsApp, and Lalitpur address consistent with `siteContact`.
- Use descriptive accessible names such as `Call Pie Square Technologies` and `Message Pie Square Technologies on WhatsApp`.

## Implementation steps

- [ ] Extend `CareerRole` with `responsibilities` if the component needs to render the client-approved responsibility lists.
- [ ] Add `desiredPosition` to the general application form and include it in the accessible form labels.
- [ ] Keep all three vacancy records in `data/site.ts` and render them from `careers-list.tsx`.
- [ ] Update the careers page copy and CTA.
- [ ] Update contact-page direct actions and map link.
- [ ] Update `ContactForm` required attributes and tests without adding submission logic.
- [ ] Add the Facebook link and shared footer contact links.
- [ ] Test desktop and mobile navigation, floating actions, mail/phone/WhatsApp URLs, required fields, and no horizontal overflow.

## Acceptance checks

- `/careers` shows the general application CTA and all three specified vacancies.
- The RF Drive Test Engineer and RF Data Analyst cards show responsibilities and requirements; the Rigger card shows its brief requirements.
- The general application form asks for desired position.
- `/contact` shows phone, WhatsApp, email, Lalitpur location, and the provided map URL.
- Name, phone, and email are required in the contact form; other fields remain optional.
- No form submission endpoint, backend, database, or upload implementation is introduced.
- Floating call and WhatsApp controls work from both desktop and mobile layouts.
- `npx vitest run components/careers-list.test.tsx components/contact-form.test.tsx app/careers/page.test.tsx app/contact/page.test.tsx --no-file-parallelism --maxWorkers=1` passes, followed by `npm run lint` and `npm run test:e2e`.
