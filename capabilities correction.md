# Capabilities Correction Report

Source: `D:\Gym\CAPABILITIES.docx`

Status: approved and implemented.

## Extracted document text

- CAPABILITIES
- Delete this content and replace it with below snap.
- Put this below new topic in place of this

The screenshots contain the detailed visual instructions below. Red annotations in the screenshots are treated as instructions, not website copy.

## Capabilities overview hero

- Keep the route/section label as `CAPABILITIES` only.
- Remove `/ FOUR DIVISIONS` if it appears in the route label or eyebrow.
- Remove the hero action buttons shown in the reference, including `REQUEST A QUOTE` and `EXPLORE CAPABILITIES`.
- Keep the main hero title and supporting description unless a later copy change is approved.

## Proven delivery metrics

- Use `PROVEN DELIVERY` as the section topic.
- Keep the five approved metrics and their supporting descriptions.
- Make each metric label below the value bold and visually highlighted, using the established red accent and a clean label treatment that remains readable on mobile.
- Keep metric values black, prominent, and aligned consistently across the row.

## Technical workforce

- Keep the section topic `TECHNICAL WORKFORCE`.
- Render the topic in the established red accent color.
- Use the supporting heading exactly as:

  `TRAINED. CERTIFIED. FIELD-READY.`

- Keep the workforce role list, with consistent spacing and responsive wrapping.

## Delivery capabilities

- Keep the topic `DELIVERY CAPABILITIES`.
- Increase the section heading size so it has the same visual authority as the large headings on the other pages.
- Rework the six capability items so the section does not contain the large empty vertical gaps shown in the reference.
- Use a compact, balanced grid with natural card heights, clear hierarchy, and responsive stacking on small screens.
- Preserve the six approved capability titles and descriptions:
  - Project Execution
  - Field Engineering
  - Testing & Commissioning
  - Operation & Maintenance
  - Project Documentation
  - Multi-Site Coordination

## Duplicate capability-content removal

- Remove the duplicate four-card capability detail block below Delivery Capabilities.
- Do not remove the four existing capability routes or their detail pages; only remove the repeated overview content from this page.
- Keep the primary four capability overview cards near the top of the page as the main division summary.

## Technical resources replacement

Replace the duplicate capability-card content with a dedicated equipment and resources section.

- Section eyebrow: `EQUIPMENT & RESOURCES`
- Section heading: `Technical Resources`
- Intro copy: `The tools, technology and field resources behind our project delivery.`
- Keep four responsive resource cards with the following content:

### Telecom

- RF Drive Test Equipment
- Survey Equipment
- Tower Installation Equipment
- Safety Equipment

### Fiber

- OTDR
- Optical Power Meter
- Fiber Splicing Tool Kit
- Remove `Fiber Blowing Equipment`.

### Solar

- Electrical Testing Equipment
- Solar Inspection Equipment
- Installation Tools
- Safety & Working-at-Height Equipment

### IT

- Network Testing Equipment
- Structured Cabling Tools
- Server/Network Installation Tools

Use the same red accent treatment and compact card layout shown in the supplied reference. Keep the cards readable and avoid horizontal overflow on mobile.

## Routes and scope

- No new routes are required.
- Keep the existing overview route: `/capabilities`.
- Keep the existing detail routes:
  - `/capabilities/telecom`
  - `/capabilities/optical-fiber`
  - `/capabilities/solar-energy`
  - `/capabilities/it-solutions`
- No separate routes are needed for individual metrics, workforce roles, delivery capabilities, or equipment items.

## Expected implementation areas

- `app/capabilities/page.tsx`: hero cleanup, metric labels, delivery section, and resource cards.
- `data/site.ts`: approved equipment/resource content if it is not already represented in shared data.
- `app/globals.css`: heading scale, metric highlighting, compact delivery grid, resource-card layout, and responsive behavior.
- `app/capabilities/page.test.tsx`: assertions for the approved headings, metric labels, six delivery items, and the new resource list; assertions that the duplicate capability detail block is absent.
- `tests/site.spec.ts`: verify the page still has one visible `h1`, no horizontal overflow, no broken images, and no console errors at desktop and mobile widths.

## Extracted image folder

The six source images were extracted for review to:

`C:\Users\Lenovo\AppData\Local\Temp\capabilities-docx-review-20260928-v2\word\media\image1.png` through `image6.png`

## Implementation note

The approved changes were implemented on the existing `/capabilities` overview page. The four capability detail routes were retained, and no new routes were created.

