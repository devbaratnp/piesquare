import type { Metadata } from 'next';
import { CareersList } from '@/components/careers-list';
import { InnerPage } from '@/components/inner-page';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Careers | Pie Square Technologies',
  description: 'Engineering, technical, field and project-management roles across Nepal.',
  alternates: { canonical: '/careers' },
};

export default async function CareersPage() {
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="Careers"
      title="Build Your Career With Us."
      lede="Join a growing team delivering infrastructure, connectivity, energy and technology projects across Nepal."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }]}
      contact={content.contact}
    >
      <CareersList email={content.contact.email} />
    </InnerPage>
  );
}
