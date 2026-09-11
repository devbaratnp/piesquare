import type { Metadata } from 'next';
import { InnerPage } from '@/components/inner-page';
import { ProjectGrid } from '@/components/project-grid';
import { impactStats } from '@/data/site';

export const metadata: Metadata = {
  title: 'Projects | Pie Square Technologies',
  description: 'Field proof from telecom, fiber, energy, and IT delivery across Nepal.',
};

export default function ProjectsPage() {
  return (
    <InnerPage
      eyebrow="Projects / field proof"
      title="Built in the field, proven in the network"
      lede="Real company documentation across RF testing, equipment installation, fiber deployment, civil works, solar power, and IT systems."
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }]}
      light
    >
      <ProjectGrid />
      <div className="inner-page__grid">
        {impactStats.map(([value, label]) => (
          <section className="inner-page__card" key={label} aria-label={label}>
            <h2>{value}</h2>
            <p>{label}</p>
          </section>
        ))}
      </div>
    </InnerPage>
  );
}
