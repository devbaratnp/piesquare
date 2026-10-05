import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { serviceDetails } from '@/data/site';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Telecom Infrastructure | Pie Square Technologies',
  description: 'Site survey through optimization for mobile network infrastructure.',
  alternates: { canonical: '/capabilities/telecom' },
};

export default async function TelecomCapabilityPage() {
  const detail = serviceDetails.telecom;
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="01 SERVICES"
      title={detail.title}
      lede={detail.intro}
      justifyLede
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Telecom', href: '/capabilities/telecom' }]}
      image={detail.image}
      imageAlt={detail.imageAlt}
      hideActions
      contact={content.contact}
    >
      <ServiceDetail
        capabilities={[...detail.capabilities]}
        lifecycle={[...detail.lifecycle]}
        scope={[...detail.scope]}
        relatedProjects={content.projects.filter((project) => detail.relatedProjectIds.includes(project.id))}
      />
    </InnerPage>
  );
}
