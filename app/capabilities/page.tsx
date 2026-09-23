import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerPage } from '@/components/inner-page';
import { capabilityRoutes, deliveryCapabilities, impactStats, serviceDetails, serviceOverview, technicalWorkforce } from '@/data/site';

export const metadata: Metadata = {
  title: 'Capabilities | Pie Square Technologies',
  description: 'Telecom, optical fiber, solar and energy, and IT solutions — one infrastructure partner.',
  alternates: { canonical: '/capabilities' },
};

export default function CapabilitiesPage() {
  return (
    <InnerPage
      eyebrow="Capabilities / four divisions"
      title="Built to Execute."
      lede="People, equipment and systems organized for multi-site, multi-location project delivery."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }]}
    >
      <p className="reference-kicker">Four Divisions. One Delivery Standard.</p>
      <div className="service-overview-grid">
        {serviceOverview.map((service) => (
          <article className="service-overview-card" key={service.href}>
            <span className="service-overview-card__number">{service.number}</span>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <ul>
              {service.scope.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link href={service.href}>Explore {service.title.replace(' Infrastructure', '').replace(' Networks', '')} ↗</Link>
          </article>
        ))}
      </div>

      <section className="capability-metrics" aria-label="Verified company capabilities">
        <p className="inner-page__eyebrow">COMPANY CAPABILITIES</p>
        <h2>Verified field metrics.</h2>
        <div className="capability-metrics__grid">
          {impactStats.map(([value, label, detail]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-page__card technical-workforce-card" aria-label="Technical workforce">
        <p className="inner-page__eyebrow">TECHNICAL WORKFORCE</p>
        <h2>Trained. Field-Ready.</h2>
        <div className="workforce-list">
          {technicalWorkforce.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
      </section>

      <section className="delivery-capabilities" aria-label="Delivery capabilities">
        <p className="inner-page__eyebrow">DELIVERY CAPABILITIES</p>
        <h2>Delivery capabilities</h2>
        <div className="delivery-capabilities__grid">
          {deliveryCapabilities.map((capability) => (
            <article className="delivery-capability-card" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="inner-page__grid technical-resources-grid">
        {capabilityRoutes.map((route) => (
          <section className="inner-page__card" key={route.slug} aria-label={`${route.label} technical resources`}>
            <h2>{serviceDetails[route.slug].title}</h2>
            <p>{serviceDetails[route.slug].scope.join(' · ')}</p>
            <Link href={route.href}>View capability details ↗</Link>
          </section>
        ))}
      </div>
    </InnerPage>
  );
}
