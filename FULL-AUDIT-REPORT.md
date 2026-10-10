# SEO audit report

**Site:** https://piesquaretechnologies.com/
**Audit date:** 10 October 2026
**Scope:** Public HTML routes, sitemap, robots policy, metadata, structured data, images, crawl behavior, mobile layout, and sampled browser performance.

## Executive summary

The site has a good technical base: the audited sitemap routes returned HTTP 200, every public page had one H1, canonical URLs were present, and the public content is substantial. The main SEO weaknesses were metadata inheritance, incomplete crawler guidance, limited structured data, an omitted `/clients` sitemap entry, and slow sampled mobile loading.

The first SEO pass in this repository addresses the technical items without changing business copy:

- page-specific Open Graph and Twitter metadata
- `robots.txt` sitemap reference and private-route exclusions
- `/clients` in the sitemap
- Organization, WebSite, and breadcrumb JSON-LD
- a public `/llms.txt` reference file

The source changes still need to be deployed before rechecking the live HTML.

## Score

| Area | Score | Notes |
| --- | ---: | --- |
| Technical SEO | 17/22 | Crawlable routes and canonicals are strong; the canonical `www` host is still live and HTML is uncached. |
| Content | 17/23 | Service and project pages contain useful technical detail; several project descriptions are too short for strong search snippets. |
| On-page SEO | 17/20 | Unique H1s, titles, descriptions, and canonicals; long project titles and short descriptions need editorial refinement. |
| Structured data | 8/10 | Organization, WebSite, and breadcrumbs are now prepared; Service and Project schema remain a follow-up. |
| Performance | 6/10 | Sampled mobile FCP was about 5.7s and load about 13.3s; one later mobile LCP sample was 2.1s with CLS 0.001. |
| AI readiness | 6/10 | Clear service and project content; `/llms.txt` is now prepared, but no entity-specific service/project schema or measurement is live yet. |
| Images | 4/5 | Image responses and alt coverage are good; the homepage hero currently uses an empty alt attribute. |
| **Total** | **75/100** | Good base with clear technical and editorial gains available. |

## Findings

### Crawlability and indexation

- The live sitemap contained 22 URLs, all returning HTTP 200 during the crawl.
- `/clients` is a public route but was absent from the sitemap. It is included in the source fix.
- `robots.txt` allowed every path and did not name the sitemap. The source fix disallows `/admin` and `/api` and names `/sitemap.xml`.
- The `www` host returned HTTP 200 instead of redirecting to the canonical non-`www` host. Canonical tags point to the non-`www` URL, but a host-level 301 is still recommended.
- HTTP redirects to HTTPS correctly.
- An invalid route returned HTTP 404.
- Public HTML responses use `private, no-cache, no-store`. This is safe for freshness but limits browser and edge caching. Add content revalidation or on-demand invalidation before relaxing this policy.

### Metadata and social previews

- Public routes have one H1, unique page titles, descriptions, and canonical URLs.
- Before this pass, every page inherited the root Open Graph and Twitter title, description, URL, and image. The new metadata helper makes social previews page-specific.
- The homepage title is 80 characters. Several project titles are 62–84 characters and may be truncated in search results.
- Six project descriptions are under 50 characters, including SSV testing, fiber deployment, solar O&M, POP/ODN survey, Janakpur content management, and RF complaint optimization. These should be expanded into outcome-focused descriptions of roughly 120–160 characters.
- The CMS schema contains `seo_title` and `seo_description` fields, but the public content mapper does not currently read them. This should be connected when the admin SEO fields are added.

### Structured data

- The live pages currently emit Organization JSON-LD only.
- This pass adds WebSite JSON-LD site-wide and BreadcrumbList JSON-LD on inner pages.
- Service pages would benefit from `Service` entities with service name, description, provider, and URL.
- Project pages would benefit from `CreativeWork` or `CaseStudy` entities with client, location, image, dates, and provider. Only use facts already approved for public display.
- Add LocalBusiness data only after the official address, phone, hours, and service area are confirmed.

### Performance and mobile

- Mobile and desktop layout checks showed no horizontal overflow and one H1 on the sampled public routes.
- After scrolling to trigger lazy assets, no confirmed broken images were found on the homepage, company, projects, telecom, and contact routes. A direct check also returned HTTP 200 for the project images used by telecom pages.
- One mobile sample measured FCP around 5.7s and full load around 13.3s; a separate LCP sample measured 2.1s and CLS 0.001. These are single synthetic runs, not field CrUX data.
- The page loads multiple font files, CSS files, JavaScript chunks, and hero assets before the experience is complete. Measure with Lighthouse and real-user data after deployment.

### Images

- Crawled image tags had no missing `alt` attributes. The homepage hero intentionally renders `alt=""`; keep that only if the image is decorative. If it conveys the company’s service, give it a concise descriptive alt.
- Next image optimization returned successful responses for the sampled hero and project assets.

### AI search readiness

- The site has strong explicit entity and service language in the company, capability, and project pages.
- This pass adds `/llms.txt` with canonical public pages and a concise description of the company’s services.
- Add service and project schema, consistent company identifiers, and a verified organization profile before relying on AI search visibility.
- No Google Search Console verification, analytics, or conversion measurement code was found in the repository. Add those through the approved analytics process and submit the sitemap.

## Verification notes

- Live crawl: 22 sitemap URLs checked, all HTTP 200.
- Live checks: HTTPS redirect, 404 behavior, canonical tags, social tags, robots, sitemap, image responses.
- Local checks after the source changes: focused SEO tests passed, ESLint passed, and standalone `tsc --noEmit --skipLibCheck` passed.
- `next build --webpack` compiled successfully but its TypeScript worker exceeded the available process memory in this shared workspace. This is an environment limit, not a reported TypeScript diagnostic.
