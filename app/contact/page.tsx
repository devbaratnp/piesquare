import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { InnerPage } from '@/components/inner-page';
import { capabilityRoutes } from '@/data/site';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact | Pie Square Technologies',
  description: 'Talk to the Pie Square Technologies engineering team.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const { contact } = await getPublicContent();
  return (
    <InnerPage
      variant="contact"
      hideActions
      eyebrow="Direct line to field delivery"
      title="Talk to Our Engineering Team."
      lede="Bring us the brief, the site list, or the problem in the field. We will help you find the right technical path forward."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact' }]}
      contact={contact}
    >
      <section className="contact-direct contact-direct--hero" aria-label="Direct contact">
        <div className="contact-direct__lead">
          <p className="contact-section-kicker">Start with a clear brief</p>
          <h2>One partner from first call to handover.</h2>
          <p>Talk directly with the team coordinating telecom, fiber, solar, electrical, and IT delivery across Nepal.</p>
          <div className="contact-direct__actions">
            <a className="button button--primary" href={contact.phoneHref}>Call Pie Square ↗</a>
            <a className="button button--ghost" href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}>WhatsApp ↗</a>
            <a className="button button--ghost" href={`mailto:${contact.email}`}>Email ↗</a>
            <a className="button button--ghost" href={contact.mapUrl}>Lalitpur office ↗</a>
          </div>
          <p className="contact-direct__response">Direct response during local business hours in Nepal.</p>
        </div>
        <div className="contact-office">
          <h2 className="contact-office__label">HEAD OFFICE</h2>
          <h3>Let&apos;s put the field in focus.</h3>
          <dl>
            <div><dt>Address</dt><dd>{contact.address}</dd></div>
            <div><dt>Phone</dt><dd><a href={contact.phoneHref}>{contact.phone}</a></dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
            <div><dt>Location</dt><dd><a href={contact.mapUrl}>Google Maps ↗</a></dd></div>
            <div><dt>Hours</dt><dd>Sunday – Friday, 9:00 – 18:00</dd></div>
          </dl>
        </div>
      </section>

      <section className="contact-paths" aria-label="Choose a contact path">
        <div className="contact-paths__heading">
          <p className="contact-section-kicker">Choose a starting point</p>
          <h2>Make the next step specific.</h2>
        </div>
        <div className="contact-paths__grid">
          <a href="#quote"><span>Project brief</span><h3>Request a quote</h3><p>Share your scope, documents, locations, or tender requirements.</p><strong>Start a project brief ↗</strong></a>
          <a href="#survey"><span>Field assessment</span><h3>Book a site survey</h3><p>Get the technical data needed before planning and deployment.</p><strong>Plan a survey ↗</strong></a>
          <a href="#message"><span>General enquiry</span><h3>Send a message</h3><p>Ask a question or route an introduction to the right team.</p><strong>Send an enquiry ↗</strong></a>
        </div>
      </section>

      <section className="contact-form-section contact-form-section--primary" id="quote" aria-label="Request a quote">
        <div className="contact-form-section__heading">
          <div><p className="contact-section-kicker">Request a quote</p><h2>Let&apos;s Build Your Next Project.</h2></div>
          <p>Attach BOQs, RFQs, drawings, site lists, or tender documents for a faster, more accurate response.</p>
        </div>
        <ContactForm variant="quote" />
      </section>

      <div className="contact-secondary-grid">
        <section className="contact-form-section contact-form-section--secondary" id="message" aria-label="Send us a message">
          <div className="contact-form-section__heading">
            <div><p className="contact-section-kicker">General enquiries</p><h2>Send Us a Message</h2></div>
            <p>For introductions, questions, and everything that does not need a project brief.</p>
          </div>
          <ContactForm variant="message" />
        </section>

        <section className="contact-survey contact-form-section contact-form-section--secondary" id="survey" aria-label="Site survey">
          <div className="contact-form-section__heading">
            <div><p className="contact-section-kicker">Site survey</p><h2>Need a Site Survey?</h2></div>
            <p>Our field teams collect the technical information required for planning and deployment.</p>
          </div>
          <ul>
            <li>Telecom site and tower surveys</li>
            <li>Fiber route surveys with GIS data</li>
            <li>Solar irradiance and structural assessment</li>
            <li>IT infrastructure and cabling audits</li>
          </ul>
          <ContactForm variant="survey" />
        </section>
      </div>

      <section className="inner-page__card contact-service-links" aria-label="Service shortcuts">
        <p className="contact-section-kicker">Capabilities</p>
        <h2>Start with the right field team.</h2>
        <div>
          {capabilityRoutes.map((route) => <Link key={route.href} href={route.href}>{route.label} ↗</Link>)}
        </div>
      </section>
    </InnerPage>
  );
}
