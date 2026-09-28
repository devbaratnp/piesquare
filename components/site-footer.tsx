import Link from 'next/link';
import { footerIntro, primaryNav, serviceNav, siteContact } from '@/data/site';
import { PhoneIcon, WhatsAppIcon } from '@/components/contact-icons';

export type SiteFooterContact = Readonly<{
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  mapUrl: string;
  facebook: string;
  website: string;
}>;

export function SiteFooter({ contact = siteContact }: { contact?: SiteFooterContact }) {
  return (
    <footer className="site-footer">
      <div className="page-wrap site-footer__inner">
        <div className="site-footer__descriptor">
          <div className="site-footer__brand">
            <strong className="site-footer__company-name">Pie Square Technologies Private Limited</strong>
          </div>
          <p>{footerIntro}</p>
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
            <a href="/resources/pie-square-company-profile-2026.pdf">Company Profile ↗</a>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h2>CONTACT</h2>
            <span>{contact.address}</span>
            <a className="site-footer__contact-link" href={contact.phoneHref} aria-label="Call Pie Square Technologies">
              <PhoneIcon />
              <span>{contact.phone}</span>
            </a>
            <a className="site-footer__contact-link" href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} aria-label="Message Pie Square Technologies on WhatsApp">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.facebook}>Facebook ↗</a>
            <a href={contact.mapUrl}>Google Maps ↗</a>
          </div>
        </nav>
        <span className="site-footer__legal">© 2026 Pie Square Technologies / All Rights Reserved.</span>
      </div>
    </footer>
  );
}
