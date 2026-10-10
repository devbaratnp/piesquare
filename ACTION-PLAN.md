# SEO action plan

## Completed in this pass

1. Add page-specific canonical, Open Graph, and Twitter metadata.
2. Add `/clients` to the sitemap.
3. Add the sitemap URL to `robots.txt`.
4. Disallow `/admin` and `/api` from crawlers.
5. Add Organization and WebSite JSON-LD with the approved company contact data.
6. Add BreadcrumbList JSON-LD to inner pages.
7. Add `/llms.txt` with canonical public routes and service descriptions.

## P1: deploy and verify

1. Deploy the SEO commit and confirm the live `/robots.txt`, `/sitemap.xml`, `/llms.txt`, homepage head, inner-page head, and JSON-LD.
2. Configure a permanent redirect from `www.piesquaretechnologies.com` to `piesquaretechnologies.com`.
3. Register and verify the site in Google Search Console, submit the sitemap, and record indexing errors.
4. Run Lighthouse on mobile and desktop after deployment. Capture LCP, CLS, INP, total blocking time, and image transfer size.
5. Add on-demand revalidation after CMS content updates so public HTML can use safe caching.

## P2: content and entity improvements

1. Rewrite the six short project meta descriptions with the service, geography, outcome, and scale where approved.
2. Shorten the longest project titles or move the company suffix into a template that keeps the primary subject visible.
3. Connect the existing CMS `seo_title` and `seo_description` columns to public metadata and expose them in the admin editor.
4. Add `Service` JSON-LD to capability pages and `CreativeWork`/case-study JSON-LD to project pages.
5. Confirm the official office address, service area, phone, and hours before adding LocalBusiness schema.
6. Review the homepage hero alt text and keep it empty only if the visual is decorative.

## Measurement

- Organic impressions and clicks by page and query
- Indexed versus submitted URLs
- Branded and non-branded queries for telecom, fiber, solar, IT, RF testing, and Nepal infrastructure
- Qualified calls, WhatsApp clicks, emails, quote requests, and careers applications
