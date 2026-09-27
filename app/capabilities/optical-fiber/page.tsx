import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { serviceDetails } from '@/data/site';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Optical Fiber Networks | Pie Square Technologies',
  description: 'Route survey to customer connection for fiber networks.',
  alternates: { canonical: '/capabilities/optical-fiber' },
};

export default async function FiberCapabilityPage() {
  const detail = serviceDetails['optical-fiber'];
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="Capabilities / Optical Fiber"
      title={detail.title}
      lede={detail.intro}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Optical Fiber', href: '/capabilities/optical-fiber' }]}
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
      />
    </InnerPage>
  );
}
