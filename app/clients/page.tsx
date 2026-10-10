import Image from 'next/image';
import { InnerPage } from '@/components/inner-page';
import { clients, trustedClientLogoFiles } from '@/data/site';
import { getPublicContent } from '@/server/content';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  title: 'Clients | Pie Square Technologies',
  description: 'Trusted across critical infrastructure in Nepal.',
  path: '/clients',
});

export default async function ClientsPage() {
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="Clients / supplied company profile"
      title="Trusted across critical infrastructure"
      lede="Client relationships shown here use only supplied logos and names supported by repository and profile material."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Clients', href: '/clients' }]}
      contact={content.contact}
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
