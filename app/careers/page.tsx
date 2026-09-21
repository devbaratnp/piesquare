import type { Metadata } from 'next';
import { CareersList } from '@/components/careers-list';
import { InnerPage } from '@/components/inner-page';

export const metadata: Metadata = {
  title: 'Careers | Pie Square Technologies',
  description: 'Engineering, technical, field and project-management roles across Nepal.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <InnerPage
      eyebrow="Careers"
      title="Build Your Career With Us."
      lede="Engineering, technical, field and project-management roles across Nepal — plus internships for the next generation of infrastructure professionals."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Careers', href: '/careers' }]}
    >
      <CareersList />
    </InnerPage>
  );
}
