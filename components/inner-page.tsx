import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SignalLine } from '@/components/signal-line';
import { DiscussProjectButton } from '@/components/discuss-project-button';
import { primaryNav, siteContact } from '@/data/site';

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

export function InnerPage({ eyebrow, title, lede, crumbs = [], image, imageAlt = '', light = false, children }: InnerPageProps) {
  return (
    <>
      <a className="skip-link" href="#inner-content">Skip to main content</a>
      <SiteNav tone={light ? 'paper' : 'dark'} />
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
              <DiscussProjectButton className="button button--primary">Discuss a Project ↗</DiscussProjectButton>
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
            <span>Pie Square Technologies / {siteContact.address}</span>
            <nav aria-label="Footer navigation">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </nav>
            <span><a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> / <a href={siteContact.phoneHref}>{siteContact.phone}</a></span>
          </div>
        </footer>
      </main>
    </>
  );
}
