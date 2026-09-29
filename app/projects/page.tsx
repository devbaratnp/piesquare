import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ProjectGrid } from '@/components/project-grid';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects | Pie Square Technologies',
  description: 'Field proof from telecom, fiber, energy, and IT delivery across Nepal.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage() {
  const content = await getPublicContent();
  return (
    <InnerPage
      eyebrow="Project portfolio"
      title="Our Projects"
      lede="Field experience that speaks for itself — select any project for full technical detail."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]}
      contact={content.contact}
      hideActions
      light
    >
      <ProjectGrid projects={content.projects} />
    </InnerPage>
  );
}
