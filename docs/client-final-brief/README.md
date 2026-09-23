# Client final brief implementation

> **For agentic workers:** Use the page-specific plan files in this folder as the implementation checklist. Keep the content source of truth in `data/site.ts`, preserve the App Router structure, and run the required tests after each page group.

**Goal:** Translate the six client brief documents and the supplied logos and field images into an implementation-ready plan for the Pie Square Technologies website.

**Architecture:** The existing Next.js App Router site remains the source of truth. Business copy, project records, navigation labels, capability lists, clients, careers, and contact values belong in `data/site.ts`; page components render that data; `app/globals.css` owns the visual treatment. The brief is split into six independently reviewable page groups so homepage, company, services, projects, capability proof, careers, and contact can be implemented without duplicating content.

**Tech stack:** Next.js App Router, TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, Lenis, Vitest, Playwright, and `next/image`.

## Source documents

- [Homepage brief](../../final_brief/1.Homepage.docx)
- [About Us brief](../../final_brief/2.About%20Us.docx)
- [Services brief](../../final_brief/3.SERVICES.docx)
- [Project brief](../../final_brief/4.Project%20only.docx)
- [Capabilities and certifications brief](../../final_brief/5.capabilties%20%26%20certifications.docx)
- [Other pages brief](../../final_brief/6.Other%20pages.docx)

## Plan files

1. [Homepage](./01-homepage.md)
2. [About Us](./02-about-us.md)
3. [Services](./03-services.md)
4. [Projects](./04-projects.md)
5. [Capabilities](./05-capabilities.md)
6. [Careers and Contact](./06-careers-and-contact.md)

## Cross-cutting requirements

- Keep `data/site.ts` as the content source of truth. Do not put client copy directly into page components unless it is a structural UI label.
- Keep the existing routes and App Router conventions. Do not edit the legacy root `index.html`, `script.js`, or `styles.css`.
- Keep contact and inquiry forms presentation-only. Do not add a backend, submission API, database, or email service without a separate request.
- Use `next/image` for supplied raster assets, accurate `alt` text for informative images, and `aria-hidden="true"` for decorative graphics.
- Preserve reduced-motion behavior. All homepage anchors must render when motion is disabled: `#top`, `#company`, `#expertise`, `#telecom`, `#rf`, `#fiber`, `#energy`, `#digital`, `#impact`, `#projects`, `#clients`, `#why`, and `#contact`.
- Keep the floating call and WhatsApp actions available across the site. Use the current contact values from `siteContact`.
- Keep the footer contact block available on inner pages. Add the supplied Facebook URL alongside phone, WhatsApp, email, and Lalitpur, Nepal.
- Keep the six homepage project cards and the full project portfolio backed by the same `ProjectRecord` data. Do not create a second project data structure.

## Supplied asset map

| Source asset | Intended use | Implementation note |
| --- | --- | --- |
| `final_brief/IMG_3757.JPEG` | CGNET logo | Normalize to a web-friendly filename under `public/media/logos/`. |
| `final_brief/IMG_3758.JPEG` | Nepal Telecom logo | Prefer a transparent or tightly cropped version if the client supplies one. |
| `final_brief/IMG_3759.JPEG` | Ncell logo | Use for trusted-client proof and project metadata where appropriate. |
| `final_brief/IMG_3760.JPEG` | ZTE logo | Use in the trusted-client logo row. |
| `final_brief/IMG_3761.JPEG` | Surya Nepal logo | Use in the trusted-client logo row and solar project proof. |
| `final_brief/IMG_3763.JPEG` | China Comservice / CCS logo | Confirm the display label with the client before publishing. The project data currently uses `C.C.S. Nepal Private Limited` and `CCS Nepal`. |
| `final_brief/WhatsApp Image 2026-09-22 at 5.21.40 PM.jpeg` | Telecom and fiber field collage | Use only where a production image is needed and the client approves the collage treatment. |
| `final_brief/WhatsApp Image 2026-09-22 at 5.22.10 PM.jpeg` | Fiber field and test-equipment collage | Suitable for fiber service or project proof after image optimization. |
| `final_brief/WhatsApp Image 2026-09-22 at 5.22.18 PM.jpeg` | Network mapping and field planning collage | Suitable for fiber planning or operations proof after image optimization. |

Do not overwrite existing media. Copy or convert supplied files into `public/media/` with lowercase, descriptive names, then update `data/site.ts` to reference the final paths.

## Implementation order

1. Complete shared content and asset decisions in the homepage and services plans.
2. Reconcile all project records and detail sections.
3. Apply company, capabilities, careers, and contact page updates.
4. Run targeted Vitest tests, then lint.
5. Run the full build. Run Playwright when scenes, navigation, images, or layout change.

## Known decisions to preserve

- The homepage brief asks for `WHAT WE DELIVER`, while the capability page brief asks for `FOUR DIVISIONS. ONE DELIVERY STANDARD.` Keep both labels in their respective contexts.
- The homepage brief uses `IT Solutions`; the services brief briefly says `IT`. Keep the public heading as `IT Solutions` and retain the existing `/capabilities/it-solutions` route.
- The client asks to remove the Certifications tab and heading. Do not create a certification page or navigation item. Avoid claiming certification in copy unless the client provides specific certification records; use `Trained. Field-Ready` if the current `Trained. Certified. Field-Ready` line cannot be substantiated.
- The brief asks for six homepage projects, while the project brief contains the complete portfolio. Show the six specified cards on the homepage and all records on `/projects`.
- The final brief asks for a required name, phone number, and email in the contact experience. Keep all other fields optional and preserve the existing presentation-only behavior.

## Definition of done

- Each page group matches its brief copy and hierarchy.
- No duplicated or conflicting business values remain in components.
- Supplied logos and approved images load without broken-image errors.
- Desktop and mobile navigation still work, with no horizontal overflow.
- Each route has exactly one visible `h1`, accessible labels, and working internal links.
- Reduced-motion rendering preserves all homepage anchors.
- `npm run lint`, the targeted Vitest suite, and `npm run build` pass. Run `npm run test:e2e` for scene, nav, image, or layout changes.
