import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { serviceDetails } from '@/data/site';
import { getPublicContent } from '@/server/content';
import { buildPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  title: 'Optical Fiber Networks | Pie Square Technologies',
  description: 'Route survey to customer connection for fiber networks.',
  path: '/capabilities/optical-fiber',
});

export default async function FiberCapabilityPage() {
  const detail = serviceDetails['optical-fiber'];
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="02 SERVICES"
      title={detail.title}
      lede={detail.intro}
      justifyLede
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Optical Fiber', href: '/capabilities/optical-fiber' }]}
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
