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
      eyebrow="Capabilities / Telecom"
      title={detail.title}
      lede={detail.intro}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Telecom', href: '/capabilities/telecom' }]}
      image={detail.image}
      imageAlt={detail.imageAlt}
      contact={content.contact}
    >
      <ServiceDetail
        capabilities={[...detail.capabilities]}
        lifecycle={[...detail.lifecycle]}
        scope={[...detail.scope]}
        proof={detail.proof}
        relatedProjects={content.projects.filter((project) => detail.relatedProjectIds.includes(project.id))}
        image="/media/cinematic/T07-telecom-optimization.png"
        imageAlt="Field measurement during network optimization"
      />
    </InnerPage>
  );
}
