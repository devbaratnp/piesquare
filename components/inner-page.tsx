import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from '@/components/site-nav';
import { SignalLine } from '@/components/signal-line';
import { FloatingContact } from '@/components/floating-contact';
import { SiteFooter } from '@/components/site-footer';
import { siteContact } from '@/data/site';

type InnerPageProps = Readonly<{
  eyebrow: string;
  title: string;
  lede: string;
  crumbs?: ReadonlyArray<{ label: string; href: string }>;
  image?: string;
  imageAlt?: string;
  light?: boolean;
  variant?: 'default' | 'contact' | 'company';
  hideActions?: boolean;
  contact?: Readonly<{ email: string; phone: string; phoneHref: string; address: string; mapUrl: string; facebook: string; website: string }>;
  children: React.ReactNode;
}>;

export function InnerPage({ eyebrow, title, lede, image, imageAlt = '', light = true, variant = 'default', hideActions = false, contact = siteContact, children }: InnerPageProps) {
  return (
    <>
      <a className="skip-link" href="#inner-content">Skip to main content</a>
      <SiteNav tone={light ? 'paper' : 'dark'} />
      <FloatingContact contact={contact} />
      <SignalLine state="MAP_ROUTE" />
      <main id="inner-content" className={`inner-page ${light ? 'inner-page--light' : ''} ${variant === 'contact' ? 'inner-page--contact' : ''} ${variant === 'company' ? 'inner-page--company' : ''}`} aria-labelledby="inner-page-title">
        <div className="page-wrap">
          <div className="inner-page__hero">
            <p className="inner-page__eyebrow">{eyebrow}</p>
            <h1 id="inner-page-title">{title}</h1>
            <p className="inner-page__lede">{lede}</p>
            {!hideActions && <div className="inner-page__actions">
              <Link className="button button--primary" href="/contact#quote">Request a Quote ↗</Link>
              <Link className="button button--ghost" href="/capabilities">Explore capabilities ↗</Link>
            </div>}
            {image && (
              <div className="inner-page__hero-media">
                <Image src={image} alt={imageAlt} fill sizes="(max-width: 720px) calc(100vw - 36px), (max-width: 1440px) calc(100vw - 8vw), 1296px" priority />
              </div>
            )}
          </div>
          <div className="inner-page__body">{children}</div>
        </div>
      </main>
      <SiteFooter contact={contact} />
    </>
  );
}
