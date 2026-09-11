import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { companyTimeline, companyValues, deliveryFlow, organizationLevels, whyPieSquare } from '@/data/site';

export const metadata: Metadata = {
  title: 'Company | Pie Square Technologies',
  description: 'Established 2019 — mission, values, organization, and delivery strengths.',
};

export default function CompanyPage() {
  return (
    <InnerPage
      eyebrow="Company / established 2019"
      title="Infrastructure engineered for progress"
      lede="Pie Square Technologies supports Nepal's evolving digital infrastructure through telecom network services, fiber deployment, renewable energy systems, and IT solutions."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Company', href: '/company' }]}
      image="/media/cinematic/C01-company-infrastructure-landscape.png"
      imageAlt="Infrastructure landscape supporting telecom networks across Nepal"
      light
    >
      <div className="inner-page__grid">
        <section className="inner-page__card" aria-label="History">
          <h2>History since 2019</h2>
          <ol>
            {companyTimeline.map((item) => (
              <li key={item.marker}><strong>{item.marker} / {item.title}</strong> — {item.copy}</li>
            ))}
          </ol>
        </section>
        <section className="inner-page__card" aria-label="Mission and values">
          <h2>Mission & values</h2>
          <ul>
            {companyValues.map((value) => (
              <li key={value.title}><strong>{value.title}</strong> — {value.copy}</li>
            ))}
          </ul>
        </section>
        <section className="inner-page__card" aria-label="Operating capability">
          <h2>How we deliver</h2>
          <p>{deliveryFlow.join(' → ')}</p>
          <p>One operating model across telecom, fiber, energy, and IT — from survey to maintenance.</p>
        </section>
        <section className="inner-page__card" aria-label="Organization">
          <h2>Organization</h2>
          <ul>
            {organizationLevels.map((level) => (
              <li key={level.title}><strong>{level.title}</strong> — {level.copy}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="inner-page__grid">
        {whyPieSquare.map((item) => (
          <section className="inner-page__card" key={item.title} aria-label={item.title}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </section>
        ))}
      </div>
    </InnerPage>
  );
}
