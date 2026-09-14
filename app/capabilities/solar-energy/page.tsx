import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { projects, serviceDetails } from '@/data/site';

export const metadata: Metadata = {
  title: 'Solar & Energy Systems | Pie Square Technologies',
  description: 'Hybrid and off-grid power for connectivity infrastructure.',
};

export default function SolarCapabilityPage() {
  const detail = serviceDetails['solar-energy'];
  return (
    <InnerPage
      eyebrow="Capabilities / Solar & Energy"
      title={detail.title}
      lede={detail.intro}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Solar & Energy', href: '/capabilities/solar-energy' }]}
      image={detail.image}
      imageAlt={detail.imageAlt}
      light
    >
      <ServiceDetail
        capabilities={[...detail.capabilities]}
        lifecycle={[...detail.lifecycle]}
        scope={[...detail.scope]}
        proof={detail.proof}
        relatedProjects={projects.filter((project) => detail.relatedProjectIds.includes(project.id))}
      />
    </InnerPage>
  );
}
