# Home Correction and Redesign Brief

Source: `D:\Gym\HOME.docx` (18 embedded screenshots, reviewed in document order)

Status: implemented in the current Home experience. The supplied hero image, cream delivery section, responsive typography, and portfolio links are included.

The red boxes, arrows, and comments in the screenshots are instructions, not website content. Existing approved About, Services, Capabilities, and Projects content remains the authority for business facts. Where a later screenshot conflicts with an earlier one, the later, more specific instruction is followed.

## The design idea: a field atlas, not a longer slideshow

The current Home tells the same service story several times: a four-service overview, then full-screen Telecom, RF, Fiber, Solar, and IT scenes. The document asks for those long scenes to go. The stronger replacement is an editorial **field atlas**: a visible tower in the opening, a compact network diagram for the company, four unmistakable service entry points, a five-stage route from survey to support, quantified field proof, then projects, industries, clients, and a direct contact ending.

Keep the brand's warm paper, black typography, and exact red accent. Make the hierarchy stronger and the spacing more deliberate. Use a fine red route line and restrained surveying/cartography details as a connective motif, not as a decoration behind every paragraph. The “wild” part should be in the choreography and scale—an excellent tower reveal, a precise network graphic, bold service typography, and an elegantly progressive delivery line—while the content remains sober and credible.

Three viable approaches:

1. **Surgical cleanup:** keep most existing section layouts and apply the requested deletions/copy changes. Fastest, but leaves the Home looking like shortened fragments of the old scroll experience.
2. **Field atlas (recommended):** rebuild the Home composition around the same brand language, with distinct layouts for the network, services, process, evidence, and trust. This gives the requested cleaner result without inventing a new identity.
3. **Immersive rebuild:** use several pinned, cinematic transitions and custom 3D-like scenes. Visually ambitious, but contrary to the document's request to remove the long service journey, and harder to maintain and use on mobile.

### Proposed page rhythm

```text
Hero / tower
    ↓
Who We Are + field-delivery network + concise company timeline
    ↓
What We Deliver / four linked divisions
    ↓
How We Deliver / five-stage methodology
    ↓
Proven Delivery / verified field metrics
    ↓
Selected Projects
    ↓
Industries We Support
    ↓
Trusted by Industry / clean client logo grid
    ↓
Why Pie Square
    ↓
Company Profile download
    ↓
The Signal Continues / direct contact + existing footer
```

## Screenshot-by-screenshot change map

| Image | Area | Required change |
| --- | --- | --- |
| 1 | Header and hero | Enlarge and cleanly cut out the Pie Square logo; make the tower clearly visible in the hero image; remove the tiny `HERO TRANSMIT` scene label. Retain the core heading and actions. |
| 2 | Company intro | Add `WHO WE ARE`; retain the main heading and approved intro; replace the empty/right-side orbit with a text-led field-delivery network. Remove client logos from this orbit and remove `MAP ROUTE` label. |
| 3 | Company continuation | Remove the duplicate feature strip below the intro. Rename the four timeline divisions to their full infrastructure names. |
| 4 | Services overview | Redesign `WHAT WE DELIVER` using the already-approved Services content. Keep four clear linked divisions; fix the cramped, split layout. |
| 5–6 | Delivery methodology | Replace the current six generic steps and styling with the supplied five-stage `From Survey to Service` reference. |
| 7–11 | Long service scenes | Remove the standalone Telecom, RF, Fiber, Energy, and Digital cinematic scenes from Home. Do **not** remove the detail routes or services themselves. |
| 12 | Field metrics | Make the Home evidence section match the approved Capabilities `PROVEN DELIVERY / VERIFIED FIELD METRICS` content and treatment. |
| 13 | Projects | Preserve and refine the selected-projects section, using current approved project records and a route to all projects. |
| 14 | Industries | Add the new nine-item `INDUSTRIES / Industries We Support` section. |
| 15 | Client trust | Make `TRUSTED BY INDUSTRY.` red and the second line black; replace the current logo wheel with a clean logo grid. |
| 16 | Why Pie Square | Add a red `WHY PIE SQUARE` eyebrow above the existing heading and keep the reasons. The marked lower transition is superseded by the final screenshot's explicit instruction to keep the final CTA. |
| 17 | Company profile | Add the new profile download band; keep only the `Download Company Profile` action, not `Certifications & Compliance`. |
| 18 | Ending | Keep the existing final contact CTA and footer as the ending. Remove only redundant scene-state labels such as `FINAL CONVERGENCE`. |

## 1. Header and hero

- Make the header logo materially larger without letting it crowd navigation or the quote action. The current logo asset has a white rectangular background in the visual reference; use a clean transparent export or carefully prepared derivative of the approved brand asset. Preserve proportions and legibility. Do not generate a replacement brand mark.
- The hero already references `/media/cinematic/H01-hero-nepal-tower.webp`, but the tower is almost lost in the current composition. First correct image positioning, contrast, overlay strength, and responsive crop. If the source cannot make the tower recognizable at desktop and phone widths, use an approved tower photograph rather than fabricating an asset.
- Preserve the core headline: `BUILDING THE INFRASTRUCTURE THAT KEEPS NEPAL CONNECTED.` Preserve the subtitle, establishment/location details, and the two primary paths to projects and services, subject to fit and contrast.
- Remove visible technical state labels (`HERO TRANSMIT` and the equivalent tiny labels in later scenes). They are not business copy and distract from the story. The floating WhatsApp and call actions remain.
- Visual direction: giant but controlled title on the left, recognizable tower silhouette/photo on the right, red route line entering the image, and enough negative space around the two CTAs. Image and title must stay readable at narrow widths rather than being clipped to preserve a desktop composition.

## 2. Who We Are

- Add the red eyebrow `WHO WE ARE` above the existing title.
- Keep the approved company title: `INFRASTRUCTURE EXPERTISE. FIELD EXECUTION. RELIABLE RESULTS.`
- Use the approved About company introduction as the source of truth; avoid maintaining a separate near-duplicate paragraph in Home.
- Replace the empty/right-side visual area with a purposeful **field-delivery network**. Required copy:
  - Center: `PIE SQUARE — FIELD DELIVERY NETWORK`
  - Around the center: `TELECOM | FIBER | SOLAR & ELECTRICAL | IT`
  - Base: `ENGINEERING • DEPLOYMENT • COMMISSIONING • O&M`
- The network should look like an infrastructure diagram or typographic compass, not a client-logo orbit. Use four balanced service nodes, one central mark, thin rules, and a single red path. On phones, turn it into a simple vertical or 2×2 layout; no tiny orbit labels.
- Remove the duplicated horizontal feature strip below the introduction once this copy lives in the diagram. Keep `Learn more about us` linking to `/company`.
- Keep the six-stop timeline but show the four divisions in full: `Telecom Infrastructure`, `Fiber Optic Infrastructure`, `Solar & Electrical Infrastructure`, `IT & Digital Solutions`. Keep `2019 / Established` and `Today / One integrated partner` at the ends. The timeline can become a compact indexed rail on mobile.

## 3. What We Deliver

- Keep one strong `WHAT WE DELIVER.` section with four distinct service entries: Telecom, Fiber, Solar & Electrical, IT Solutions.
- Use the approved Services scopes from `data/site.ts` and the four existing route targets. No new service pages or subtopic routes are required.
- Recommended layout: two-column editorial grid on large screens with the number and title carrying the weight; one concise summary and 3–5 scope terms per division; explicit arrow/link target. Avoid right-aligned paragraph blocks squeezed against the center line, the current problem shown in image 4.
- The four entries should not all have identical card chrome. A light ruled grid with ample inner spacing and one hover/focus red accent will feel more premium than four heavy boxes. At phone width, stack as full-width links with readable scope text and no overflow.
- This section replaces the need for the removed long service scenes as a quick overview. The detail pages remain the place for full Telecom, Fiber, Solar, and IT stories.

## 4. How We Deliver — exact replacement content

Remove `DELIVERY STANDARD` and the current six-step list (`Survey`, `Design`, `Deploy`, `Test`, `Optimize`, `Maintain`). Use the supplied reference's five-stage sequence:

**Eyebrow:** `HOW WE DELIVER`

**Heading:** `From Survey to Service — We Deliver End to End.`

**Introduction:** `A disciplined, documented delivery methodology applied to every project regardless of scale.`

| Step | Title | Description |
| --- | --- | --- |
| 01 | Survey & Assessment | Site inspection, data collection and technical assessment by field engineers. |
| 02 | Engineering & Planning | Design, route planning, BOQ, resource planning and project preparation. |
| 03 | Installation & Deployment | Civil works, tower installation, fiber deployment, solar installation and IT infrastructure. |
| 04 | Testing & Commissioning | Technical testing, quality inspection, troubleshooting and commissioning. |
| 05 | Maintenance & Support | Preventive maintenance, fault restoration and ongoing technical support. |

- Desktop: one connected horizontal rule, five red outlined numbered nodes, five readable titles and short descriptions. Tablet: 3+2 or another balanced wrap with the line ending cleanly, not a clipped five-column squeeze. Phone: vertical timeline with a red rail and numbered nodes.
- Motion may trace the line as steps enter view, but text and all five steps must be visible without JavaScript animation and with reduced motion. No pinned scrolling for this section.

## 5. Remove the long service sequence from Home

Delete the Home-only sections corresponding to images 7–11:

- pinned `FROM SURVEY TO SIGNAL` Telecom sequence;
- RF drive-test visualization and readouts;
- `2,240+ KM / CONNECTING COMMUNITIES` Fiber scene;
- Solar/Energy scene;
- IT/Digital scene.

These sections can remain represented through the four service entries, project evidence, and dedicated detail pages. Do not delete `/capabilities/telecom`, `/capabilities/optical-fiber`, `/capabilities/solar-energy`, or `/capabilities/it-solutions`; do not remove their content from the data model simply because Home stops rendering the scenes. Remove the now-unused Home pinning/scene code and its listeners carefully.

## 6. Proven Delivery

Replace the current Home treatment with the approved Capabilities treatment, using one shared data source and preferably shared presentation rules:

**Eyebrow:** `PROVEN DELIVERY`  
**Heading:** `VERIFIED FIELD METRICS.`

| Value | Label | Supporting detail |
| --- | --- | --- |
| 3500+ | RF sites tested | SSV & Cluster Drive Testing |
| 115 | Telecom sites installed | Equipment Installation & Commissioning |
| 4 | New telecom tower sites | Foundation • Erection • Power • Grounding • Fencing |
| 2,240+ KM | Fiber network delivery | Installation • Survey • Managed Service & LMC |
| 400 kW | Solar O&M under management | Annual Maintenance & Operations |

Values should be large, black, and bold; labels below them should be red/highlighted and readable. Use five consistent metric columns at wide widths, then a considered 2-column/1-column adaptation. The Home and Capabilities figures must not drift apart. Avoid reintroducing the old `BUILT TO EXECUTE.` heading in this area.

## 7. Projects

- Keep a selected-projects area immediately after the proof metrics, using the approved project data and existing `/projects` route.
- Show representative projects with consistent image ratios, visible category/status, concise scope, and a meaningful link to each project. Do not leave a blank thumbnail or a truncated project name as shown in earlier project feedback.
- `View all projects` should remain the route to the complete list. The Home should sample the portfolio, not duplicate the entire Projects page.
- When content is CMS-overridden, retain the same layout and safe fallbacks for missing images or short/long text.

## 8. Industries We Support — new section

**Eyebrow:** `INDUSTRIES`  
**Heading:** `Industries We Support`

Use the nine exact labels shown in the supplied reference:

1. Telecommunications
2. Internet Service Providers
3. Fiber Network Operators
4. EPC & Infrastructure Companies
5. Renewable Energy
6. Data Centers
7. Government Infrastructure
8. Commercial & Industrial
9. Enterprise IT

The approved About page already has industry copy. Reuse or reconcile labels where sensible; avoid a second contradictory list of claims. The Home version can be label-only, with a small red diamond/bullet, a disciplined 3×3 ruled matrix at desktop, two columns at tablet, and one column at narrow phone widths. This is information architecture, not a new navigation menu; do not invent nine routes.

## 9. Trusted by Industry

- Use a red first line `TRUSTED BY INDUSTRY.` and a black second line `BUILT FOR LONG-TERM PARTNERSHIPS.`
- Replace `ClientLogoWheel` on Home with a calm, legible grid or restrained horizontal strip of the existing real client logos. No perspective wheel, miniature orbit, or duplicated scrolling marquee.
- Keep true client names available as text and descriptive image alt text. Only display approved logos/relationships already represented in site data. A logo grid is stronger here because the reader can actually recognize all marks at once.
- Responsive: 3 columns on desktop, 2 on phones if each logo remains legible, or a single-column list for especially narrow screens. Uniform containment, not forced image cropping.

## 10. Why Pie Square

- Add a small red `WHY PIE SQUARE` eyebrow above `ENGINEERING DISCIPLINE, FIELD-PROVEN.`
- Keep the existing six reasons: Multi-domain expertise; Expert Workforce; End-to-End Execution; Nationwide Reach; Quality & Safety; Built for Partnerships.
- Use strong title/body hierarchy and a readable, compact grid. Avoid large blank pockets created by cards of uneven height. A small red top rule or numeral can help scanning; the actual copy remains the focus.

## 11. Company Profile download band

Insert a dedicated band after Why Pie Square and before the final contact CTA:

**Eyebrow:** `COMPANY PROFILE`  
**Heading:** `Looking for More Information?`  
**Description:** `Download our company profile to learn more about our services, technical capabilities, project experience and resources.`  
**Only action:** `Download Company Profile`

Link to the existing `/resources/pie-square-company-profile-2026.pdf`. The file already exists in `public/resources`. Use a normal accessible PDF link; preferably indicate PDF and file size in quiet supporting text, and avoid surprising navigation if a download attribute is used. Delete the shown `Certifications & Compliance` action from this band. Do not create a certifications page.

## 12. Keep the final contact ending

- Preserve `THE SIGNAL CONTINUES`, `ONE PARTNER. MULTIPLE INFRASTRUCTURE LAYERS.`, and `BUILD THE NEXT CONNECTION WITH US.` with direct WhatsApp, email, and phone actions.
- Preserve the established footer and floating contact controls. The earlier “delete this” mark at the start of the ending is ambiguous, but image 18 explicitly says the final CTA is good and should be kept. The safe reading is to replace any redundant transition with the profile band, **not** delete the final CTA.
- Remove the tiny `FINAL CONVERGENCE` state label, matching the explicit deletion of similar labels earlier. Keep internal motion state only if the code still needs it; it should not be visible copy.

## Detailed visual and motion direction

- **Typography:** maintain the site's serif editorial display face for primary statements and a clean sans/mono for metadata. Use large, selective type rather than applying display scale to every block. Red is for eyebrows, route highlights, and one emphasis phrase; black is the reading color.
- **Grid:** a consistent page container and 12-column logic at large widths. Alignment lines should carry from one section to the next, but sections need distinct densities: spacious hero, composed company diagram, tight service rows, open delivery timeline, hard-hitting evidence strip, calmer client grid.
- **Brand geometry:** one fine red route line can transition from hero tower to company network to delivery rail. Let it fade before dense copy, never draw across text. Use tiny field-map coordinates/rules sparingly, not decorative fake data.
- **Motion:** one hero reveal, one modest network-node reveal, one process-line progression, and simple project/service entry transitions. No forced scroll, multi-screen pinning, or animation that hides content. ScrollTrigger and Lenis cleanup must be exact; reduced-motion users see the full story immediately.
- **Mobile:** design the smallest width deliberately. Stack actions and long headings, preserve obvious tap targets and floating-contact clearance, and ensure the PDF band and five-step rail fit without sideways scrolling.
- **Accessibility:** exactly one visible Home `h1`; semantic ordered list for the process; meaningful section headings; visible focus rings; no essential information conveyed by red alone; client logo alt text; decorative line graphics `aria-hidden`; media served via `next/image` with accurate sizing/crop.

## Implementation map and constraints

- `components/home-experience.tsx`: reorganize Home sections, remove five long scenes, replace the company right area, delivery flow, logo wheel, and add Industries/Profile bands. Keep the CMS-powered hero, projects, services, and contact props from `app/page.tsx` intact.
- `data/site.ts`: house the five exact delivery steps and Home industry labels in typed static data; reuse approved business copy and `impactStats`. Avoid copy hard-coded in JSX when it belongs in site data.
- `app/globals.css`: implement responsive atlas layouts and remove or retire only Home-specific CSS that becomes unused. Do not regress inner pages sharing global classes.
- `components/site-nav.tsx` and logo asset: enlarge the brand treatment only after confirming a transparent source/export; do not alter navigation behavior or the Services mega-menu.
- `lib/motion.ts`, `components/signal-line.tsx`, and motion effects: reconcile the state sequence with the shorter page. Visible technical state labels should disappear. Remove unused GSAP/ScrollTrigger hooks and observers with proper cleanup.
- `app/page.test.tsx` and `tests/site.spec.ts`: replace assertions for the removed long scenes and RF readouts with assertions for the new five-step process, Industries, profile PDF, all retained contact paths, and new logo grid. Maintain mobile nav, no console errors, no broken images, no overflow, and reduced-motion coverage.
- Existing Home anchors currently include `#top`, `#company`, `#expertise`, `#telecom`, `#rf`, `#fiber`, `#energy`, `#digital`, `#impact`, `#projects`, `#clients`, `#why`, `#contact`. The repository guidelines and e2e tests require them. When removing the five scenes, preserve these IDs as meaningful targets within the consolidated service overview (e.g. `#telecom`, `#fiber`, `#energy`, `#digital` on the corresponding entries and `#rf` on the Telecom/RF scope). Do not keep blank ghost scenes merely for an ID. If tests require IDs specifically on `<section>` elements, update those assertions to check accessible targets instead of resurrecting removed scenes.
- No new route is requested. The four existing capability routes, Projects, Company, Contact, and profile PDF already cover the navigation paths.

## Acceptance checklist for implementation

- The Home is shorter and no longer contains standalone Telecom/RF/Fiber/Solar/IT cinematic scenes.
- The tower is unmistakable in the hero on desktop and mobile; the larger brand logo has no white rectangle.
- `WHO WE ARE`, the field-delivery network, the full timeline labels, and four service links appear in the right order.
- The five process titles and descriptions match the supplied reference; the old six-step list is gone.
- The five field metrics match Capabilities in number, label, and treatment.
- Projects, all nine industries, approved client logos, and Why Pie Square are present.
- The profile PDF link opens the real file; no Certifications action is present.
- The existing final CTA, footer, and WhatsApp/phone contact paths work.
- Visible scene-state labels are gone; internal anchor links still resolve to meaningful content.
- Desktop, 768px tablet, 390px phone, and 320px phone have no horizontal overflow, clipped content, broken images, or obstructed contact controls.
- Reduced motion still exposes every section and anchor; targeted Vitest, lint, production build, and Home e2e pass.

## Open interpretation to confirm before code

The screenshots are clear on content and removals. The only substantive visual choice is how far to take the redesign of `WHAT WE DELIVER` and the company network. This brief recommends the field-atlas treatment above, keeping the existing brand rather than a full visual rebrand. The final screenshot resolves the other apparent conflict: the final CTA stays.
