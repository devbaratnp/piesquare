import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { projects, serviceDetails } from '@/data/site';

export const metadata: Metadata = {
  title: 'IT & Digital Solutions | Pie Square Technologies',
  description: 'Infrastructure, security, and software for connected organizations.',
};

export default function ITSolutionsPage() {
  const detail = serviceDetails['it-solutions'];
  return (
    <InnerPage
      eyebrow="Capabilities / IT Solutions"
      title={detail.title}
      lede={detail.intro}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'IT Solutions', href: '/capabilities/it-solutions' }]}
      image={detail.image}
      imageAlt={detail.imageAlt}
    >
      <ServiceDetail
        capabilities={[...detail.capabilities]}
        lifecycle={[...detail.lifecycle]}
        scope={[...detail.scope]}
        proof={detail.proof}
        relatedProjects={projects.filter((project) => detail.relatedProjectIds.includes(project.id))}
        image="/media/projects/rack.jpg"
        imageAlt="Network equipment rack installed by Pie Square"
      />
    </InnerPage>
  );
}
