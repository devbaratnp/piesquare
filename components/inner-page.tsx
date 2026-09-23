import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SignalLine } from '@/components/signal-line';
import { FloatingContact } from '@/components/floating-contact';
import { primaryNav, serviceNav, siteContact } from '@/data/site';

type InnerPageProps = Readonly<{
  eyebrow: string;
  title: string;
  lede: string;
  crumbs?: ReadonlyArray<{ label: string; href: string }>;
  image?: string;
  imageAlt?: string;
  light?: boolean;
  children: React.ReactNode;
}>;

export function InnerPage({ eyebrow, title, lede, crumbs = [], image, imageAlt = '', light = true, children }: InnerPageProps) {
  return (
    <>
      <a className="skip-link" href="#inner-content">Skip to main content</a>
      <SiteNav tone={light ? 'paper' : 'dark'} />
      <FloatingContact />
      <SignalLine state="MAP_ROUTE" />
      <main id="inner-content" className={`inner-page ${light ? 'inner-page--light' : ''}`} aria-labelledby="inner-page-title">
        <div className="page-wrap">
          <div className="inner-page__hero">
            <div className="inner-page__hero-index" aria-hidden="true">
              <span>Pie Square Technologies</span>
              <span>Signal editorial / route brief</span>
            </div>
            {crumbs.length > 0 && (
              <nav className="crumbs" aria-label="Breadcrumb">
                {crumbs.map((crumb, index) => (
                  <span key={crumb.href}>
                    {index > 0 && <span aria-hidden="true"> / </span>}
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </span>
                ))}
              </nav>
            )}
            <p className="inner-page__eyebrow">{eyebrow}</p>
            <h1 id="inner-page-title">{title}</h1>
            <p className="inner-page__lede">{lede}</p>
            <div className="inner-page__actions">
              <Link className="button button--primary" href="/contact#quote">Request a Quote ↗</Link>
              <Link className="button button--ghost" href="/capabilities">Explore capabilities ↗</Link>
            </div>
            {image && (
              <div className="inner-page__hero-media">
                <Image src={image} alt={imageAlt} fill sizes="100vw" priority />
              </div>
            )}
          </div>
          <div className="inner-page__body">{children}</div>
        </div>
        <footer className="site-footer">
          <div className="page-wrap site-footer__inner">
            <div className="site-footer__descriptor">
              <span>PIE SQUARE / INTEGRATED INFRASTRUCTURE &amp; TECHNOLOGY SOLUTIONS</span>
              <p>End-to-end field engineering, deployment, installation, testing, commissioning and maintenance across telecom, fiber optic, solar energy and IT infrastructure in Nepal.</p>
            </div>
            <nav className="site-footer__routes" aria-label="Footer navigation">
              <div>
                <h2>SERVICES</h2>
                {serviceNav.map((item) => (
                  <Link key={item.href} href={item.href}>{item.label.replace(' Infrastructure', '').replace(' Networks', '')}</Link>
                ))}
              </div>
              <div>
                <h2>COMPANY</h2>
                {primaryNav.filter((item) => ['About Us', 'Projects', 'Capabilities', 'Careers'].includes(item.label)).map((item) => (
                  <Link key={item.href} href={item.href}>{item.label === 'About Us' ? 'About' : item.label}</Link>
                ))}
              </div>
              <div>
                <h2>RESOURCES</h2>
                <Link href="/contact">Contact</Link>
              </div>
              <div>
                <h2>CONTACT</h2>
                <span>{siteContact.address}</span>
                <a href={siteContact.phoneHref}>{siteContact.phone}</a>
                <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
                <a href={siteContact.facebook}>Facebook ↗</a>
                <a href={siteContact.mapUrl}>Google Maps ↗</a>
              </div>
            </nav>
            <span className="site-footer__legal">© 2026 Pie Square Technologies / All Rights Reserved.</span>
          </div>
        </footer>
      </main>
    </>
  );
}
