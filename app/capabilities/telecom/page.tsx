import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ServiceDetail } from '@/components/service-detail';
import { serviceDetails } from '@/data/site';

export const metadata: Metadata = {
  title: 'Telecom Infrastructure | Pie Square Technologies',
  description: 'Site survey through optimization for mobile network infrastructure.',
};

export default function TelecomCapabilityPage() {
  const detail = serviceDetails.telecom;
  return (
    <InnerPage
      eyebrow="Capabilities / Telecom"
      title={detail.title}
      lede={detail.intro}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities', href: '/capabilities' }, { label: 'Telecom', href: '/capabilities/telecom' }]}
      image={detail.image}
      imageAlt={detail.imageAlt}
    >
      <ServiceDetail lifecycle={[...detail.lifecycle]} scope={[...detail.scope]} proof={detail.proof} image="/media/cinematic/T07-telecom-optimization.png" imageAlt="Field measurement during network optimization" />
    </InnerPage>
  );
}
