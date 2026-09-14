import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { projects, serviceDetails } from '@/data/site';

export const metadata: Metadata = {
  title: 'Optical Fiber Networks | Pie Square Technologies',
  description: 'Route survey to customer connection for fiber networks.',
};

export default function FiberCapabilityPage() {
  const detail = serviceDetails['optical-fiber'];
  return (
    <InnerPage
      eyebrow="Capabilities / Optical Fiber"
      title={detail.title}
      lede={detail.intro}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Optical Fiber', href: '/capabilities/optical-fiber' }]}
      image={detail.image}
      imageAlt={detail.imageAlt}
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
