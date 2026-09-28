# Services Correction Report

Source: `D:\Gym\Services.docx`

Status: approved and implemented.

## Extracted document text

- Services
- Show services in other way with heading and scope. Keep this type attached below.
- Telecom
- Fiber
- Solar & Electrical
- IT

## Requested Services navigation redesign

Replace the current Services dropdown presentation with a wider scope menu based on the supplied reference image.

Use four numbered service columns with red headings and scope items underneath:

### 01 — Telecom

- Civil Works
- Tower Installation
- Tower Maintenance
- RF Drive Testing
- Telecom Site Installation

### 02 — Fiber

- Route Survey
- Fiber Installation
- Fiber Splicing
- Fiber Testing
- Fiber Maintenance

### 03 — Solar & Electrical

- Site Survey
- System Design
- Solar Installation
- Testing & Commissioning
- O&M

### 04 — IT

- Network Infrastructure
- Structured Cabling
- Server & Data Center
- CCTV & Security
- IT Maintenance

The menu should remain readable and responsive, collapsing into a usable mobile layout without horizontal overflow.

## Dropdown links and subtopics

- Keep the four main service headings as links to the existing service pages:
  - Telecom → `/capabilities/telecom`
  - Fiber → `/capabilities/optical-fiber`
  - Solar & Electrical → `/capabilities/solar-energy`
  - IT Solutions → `/capabilities/it-solutions`
- Display the scope/subtopic items below each heading as non-clickable list text inside the dropdown.
- Do not create separate routes for individual subtopics such as Tower Installation or Fiber Splicing unless that is requested as a separate feature.
- No new top-level service routes are required for this implementation.

## Shared service-detail page corrections

Apply these corrections to Telecom, Fiber, Solar & Electrical, and IT Solutions pages:

- Remove the top route/metadata strip and its instruction-style content:
  - Pie Square Technologies
  - Signal Editorial / Route Brief
  - Home / Capabilities / service name breadcrumb strip
  - Capabilities / service name route label
- Replace the service route label with the numbered service heading:
  - Telecom: `01 SERVICES`
  - Fiber: `02 SERVICES`
  - Solar & Electrical: `03 SERVICES`
  - IT Solutions: `04 SERVICES`
- Keep each service title and approved introductory description.
- Remove the proof/metric callout block from the service pages.
- Remove the service-page action buttons shown in the references, including Request a Quote, Request a Site Survey, and Explore Capabilities where present.
- Keep the page clean, consistent, and responsive with the existing visual system.

## Reference image interpretation

- Image 1: replace the current Services dropdown with a heading plus service scope layout.
- Image 2: shows the target four-column Services dropdown with numbered red headings and scope lists.
- Image 3: Telecom detail page; remove route metadata and use `01 SERVICES`.
- Image 4: Telecom proof metric and action block should be removed.
- Image 5: Fiber detail page; remove route metadata and use `02 SERVICES`.
- Image 6: Fiber proof metric and action block should be removed.
- Image 7: Solar & Electrical detail page; use `03 SERVICES`.
- Image 8: Solar proof metric and action block should be removed.
- Image 9: IT Solutions detail page; use `04 SERVICES`.
- Image 10: IT proof metric and action block should be removed.

## Extracted image folder

The 10 source images were extracted for review to:

`C:\Users\Lenovo\AppData\Local\Temp\services-docx-review-20260928\unzipped\word\media\image1.png` through `image10.png`

## Implementation note

The approved changes were implemented in the existing Services navigation and service detail routes. No new top-level or subtopic routes were created.
