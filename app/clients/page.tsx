import type { Metadata } from 'next';
import Image from 'next/image';
import { InnerPage } from '@/components/inner-page';
import { clients, trustedClientLogoFiles } from '@/data/site';

export const metadata: Metadata = {
  title: 'Clients | Pie Square Technologies',
  description: 'Trusted across critical infrastructure in Nepal.',
};

export default function ClientsPage() {
  return (
    <InnerPage
      eyebrow="Clients / supplied company profile"
      title="Trusted across critical infrastructure"
      lede="Client relationships shown here use only supplied logos and names supported by repository and profile material."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Clients', href: '/clients' }]}
      light
    >
      <div className="inner-page__grid">
        {trustedClientLogoFiles.map((logo) => (
          <figure className="inner-page__card" key={logo.name}>
            <span style={{ position: 'relative', display: 'block', height: 90 }}>
              <Image src={logo.src} alt={logo.alt} fill sizes="300px" style={{ objectFit: 'contain' }} />
            </span>
            <figcaption>{logo.name}</figcaption>
          </figure>
        ))}
        {clients
          .filter((client) => !trustedClientLogoFiles.some((logo) => logo.name === client))
          .map((client) => (
            <section className="inner-page__card" key={client} aria-label={client}>
              <h2>{client}</h2>
            </section>
          ))}
      </div>
    </InnerPage>
  );
}
