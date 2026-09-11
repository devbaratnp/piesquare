import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerPage } from '@/components/inner-page';
import { ContactForm } from '@/components/contact-form';
import { capabilityRoutes, siteContact } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact | Pie Square Technologies',
  description: 'Discuss a project with Pie Square Technologies.',
};

export default function ContactPage() {
  return (
    <InnerPage
      eyebrow="Contact / discuss a project"
      title="Build the next connection with us"
      lede="Share your site, network, or energy requirements and the Pie Square team will respond by email or phone."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]}
    >
      <div className="inner-page__grid">
        <section className="inner-page__card" aria-label="Direct contact">
          <h2>Direct contact</h2>
          <ul>
            <li><a href={`mailto:${siteContact.email}`}>{siteContact.email}</a></li>
            <li><a href={siteContact.phoneHref}>{siteContact.phone}</a></li>
            <li>{siteContact.address}</li>
            <li>{siteContact.website}</li>
          </ul>
        </section>
        <section className="inner-page__card" aria-label="Service shortcuts">
          <h2>Services</h2>
          <ul>
            {capabilityRoutes.map((route) => (
              <li key={route.slug}><Link href={route.href}>{route.label}</Link></li>
            ))}
          </ul>
        </section>
      </div>
      <ContactForm />
      <section className="inner-page__card" aria-label="Map" style={{ marginTop: 20 }}>
        <h2>Service area</h2>
        <p>Nationwide delivery across Nepal — map embed loads here when a provider key is supplied.</p>
      </section>
    </InnerPage>
  );
}
