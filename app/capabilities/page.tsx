import type { Metadata } from 'next';
import Link from 'next/link';
import { InnerPage } from '@/components/inner-page';
import { capabilityRoutes, deliveryFlow, serviceDetails } from '@/data/site';

export const metadata: Metadata = {
  title: 'Capabilities | Pie Square Technologies',
  description: 'Telecom, optical fiber, solar and energy, and IT solutions — one infrastructure partner.',
};

export default function CapabilitiesPage() {
  return (
    <InnerPage
      eyebrow="Capabilities / four pillars"
      title="One partner, four capability layers"
      lede="Telecom, optical fiber, solar and energy, and IT solutions — delivered through a single survey-to-maintenance operating model."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }]}
    >
      <div className="inner-page__grid">
        {capabilityRoutes.map((route) => (
          <section className="inner-page__card" key={route.slug} aria-label={route.label}>
            <h2>{route.label}</h2>
            <p>{serviceDetails[route.slug].intro}</p>
            <p><Link href={route.href}>Explore {route.label} ↗</Link></p>
          </section>
        ))}
      </div>
      <section className="inner-page__card" aria-label="Delivery flow">
        <h2>Delivery flow</h2>
        <p>{deliveryFlow.join(' → ')}</p>
      </section>
    </InnerPage>
  );
}
