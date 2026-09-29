import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerPage } from '@/components/inner-page';
import { deliveryCapabilities, impactStats, technicalResources, technicalWorkforce } from '@/data/site';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Capabilities | Pie Square Technologies',
  description: 'Telecom, optical fiber, solar and energy, and IT solutions — one infrastructure partner.',
  alternates: { canonical: '/capabilities' },
};

export default async function CapabilitiesPage() {
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="Capabilities"
      title="Built to Execute."
      lede="People, equipment and systems organized for multi-site, multi-location project delivery."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }]}
      contact={content.contact}
      hideActions
    >
      <p className="reference-kicker">Four Divisions. One Delivery Standard.</p>
      <div className="service-overview-grid">
        {content.services.map((service) => (
          <article className="service-overview-card" key={service.href}>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <ul>
              {service.scope.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link href={service.href}>Explore {service.title.replace(' Infrastructure', '').replace(' Networks', '')} ↗</Link>
          </article>
        ))}
      </div>

      <section className="capability-metrics" aria-label="Proven delivery metrics">
        <p className="inner-page__eyebrow section-kicker--strong">PROVEN DELIVERY</p>
        <h2>Verified field metrics.</h2>
        <div className="capability-metrics__grid">
          {impactStats.map(([value, label, detail]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span className="metric-label">{label}</span>
              <small>{detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-page__card technical-workforce-card" aria-label="Technical workforce">
        <p className="inner-page__eyebrow section-kicker--strong">TECHNICAL WORKFORCE</p>
        <h2>Trained. Certified. Field-Ready.</h2>
        <div className="workforce-list">
          {technicalWorkforce.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
      </section>

      <section className="delivery-capabilities" aria-label="Delivery capabilities">
        <p className="inner-page__eyebrow">DELIVERY CAPABILITIES</p>
        <div className="delivery-capabilities__grid">
          {deliveryCapabilities.map((capability) => (
            <article className="delivery-capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="technical-resources" aria-label="Technical resources">
        <p className="inner-page__eyebrow section-kicker--strong">EQUIPMENT &amp; RESOURCES</p>
        <h2>Technical Resources</h2>
        <p className="technical-resources__intro">The tools, technology and field resources behind our project delivery.</p>
        <div className="technical-resources__grid">
          {technicalResources.map((resource) => (
            <article className="technical-resources__card" key={resource.title}>
              <span className="technical-resources__icon" aria-hidden="true">{resource.mark}</span>
              <h3>{resource.title}</h3>
              <ul>
                {resource.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </InnerPage>
  );
}
