import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { certifications } from '@/data/site';

export const metadata: Metadata = {
  title: 'Certifications & Compliance | Pie Square Technologies',
  description: 'Company registrations, licenses and certifications for Pie Square Technologies.',
};

export default function CertificationsPage() {
  return (
    <InnerPage
      eyebrow="Company / compliance"
      title="Certifications & Compliance"
      lede="Company registrations, licenses and certifications. Verified documents are added as they are approved for publication."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Certifications', href: '/certifications' }]}
    >
      <div className="certifications-grid">
        {certifications.map((certificate) => (
          <article className="certification-card" key={certificate.title}>
            <span className="certification-card__icon" aria-hidden="true">▧</span>
            <h2>{certificate.title}</h2>
            <p>{certificate.description}</p>
            <span className="certification-card__status">{certificate.status}</span>
          </article>
        ))}
      </div>
    </InnerPage>
  );
}
