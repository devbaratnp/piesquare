import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { InnerPage } from '@/components/inner-page';
import { capabilityRoutes, siteContact } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact | Pie Square Technologies',
  description: 'Talk to the Pie Square Technologies engineering team.',
};

export default function ContactPage() {
  return (
    <InnerPage
      eyebrow="Contact"
      title="Talk to Our Engineering Team."
      lede="Reach us directly, request a quotation, or book a site survey — whichever moves your project forward fastest."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]}
    >
      <section className="contact-direct" aria-label="Direct contact">
        <div className="contact-direct__actions">
          <a className="button button--primary" href={siteContact.phoneHref}>Call ↗</a>
          <a className="button button--ghost" href="https://wa.me/9779715000715">WhatsApp ↗</a>
          <a className="button button--ghost" href={`mailto:${siteContact.email}`}>Email ↗</a>
        </div>
        <div className="contact-office">
          <h2>HEAD OFFICE</h2>
          <dl>
            <div><dt>Address</dt><dd>{siteContact.address}</dd></div>
            <div><dt>Phone</dt><dd><a href={siteContact.phoneHref}>{siteContact.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${siteContact.email}`}>{siteContact.email}</a></dd></div>
            <div><dt>Business hours</dt><dd>Sunday – Friday, 9:00 – 18:00</dd></div>
          </dl>
        </div>
      </section>

      <section className="contact-message contact-form-section" aria-label="Send us a message">
        <p className="inner-page__eyebrow">GENERAL ENQUIRIES</p>
        <h2>Send Us a Message</h2>
        <p>General enquiries — we respond within one business day.</p>
        <ContactForm variant="message" />
      </section>

      <section className="contact-form-section" id="quote" aria-label="Request a quote">
        <p className="inner-page__eyebrow">REQUEST A QUOTE</p>
        <h2>Let&apos;s Build Your Next Project.</h2>
        <p>Attach BOQs, RFQs, drawings, site lists or tender documents for a faster, more accurate response.</p>
        <ContactForm variant="quote" />
      </section>

      <section className="contact-survey contact-form-section" id="survey" aria-label="Site survey">
        <p className="inner-page__eyebrow">SITE SURVEY</p>
        <h2>Need a Site Survey?</h2>
        <p>Our field teams assess your site, collect technical data and deliver the information required for planning and deployment.</p>
        <ul>
          <li>Telecom site and tower surveys</li>
          <li>Fiber route surveys with GIS data</li>
          <li>Solar irradiance and structural assessment</li>
          <li>IT infrastructure and cabling audits</li>
        </ul>
        <ContactForm variant="survey" />
      </section>

      <section className="inner-page__card contact-service-links" aria-label="Service shortcuts">
        <p className="inner-page__eyebrow">CAPABILITIES</p>
        <h2>Start with the right field team.</h2>
        <div>
          {capabilityRoutes.map((route) => <Link key={route.href} href={route.href}>{route.label} ↗</Link>)}
        </div>
      </section>
    </InnerPage>
  );
}
