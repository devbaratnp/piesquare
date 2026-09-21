import Link from 'next/link';
import { FloatingContact } from '@/components/floating-contact';
import { SiteNav } from '@/components/site-nav';

export default function NotFound() {
  return (
    <>
      <SiteNav tone="paper" />
      <FloatingContact />
      <main className="not-found-page" aria-labelledby="not-found-title">
        <div className="not-found-page__inner">
          <p className="inner-page__eyebrow">PIE SQUARE / ROUTE ERROR</p>
          <h1 id="not-found-title">Page not found.</h1>
          <p>The route you requested is not part of the current field network.</p>
          <div className="not-found-page__actions"><Link className="button button--primary" href="/">Back to Home ↗</Link><Link className="button button--ghost" href="/contact">Contact ↗</Link></div>
        </div>
      </main>
    </>
  );
}
