import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { serviceDetails } from '@/data/site';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Solar & Energy Systems | Pie Square Technologies',
  description: 'Hybrid and off-grid power for connectivity infrastructure.',
  alternates: { canonical: '/capabilities/solar-energy' },
};

export default async function SolarCapabilityPage() {
  const detail = serviceDetails['solar-energy'];
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="03 SERVICES"
      title={detail.title}
      lede={detail.intro}
      justifyLede
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Solar & Energy', href: '/capabilities/solar-energy' }]}
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
