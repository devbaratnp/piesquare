import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InnerPage } from '@/components/inner-page';
import { projects } from '@/data/site';

type ProjectPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  return project
    ? { title: `${project.title} | Pie Square Technologies`, description: project.description, alternates: { canonical: `/projects/${project.id}` } }
    : { title: 'Project not found | Pie Square Technologies' };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) notFound();

  return (
    <InnerPage
      eyebrow={`${project.categoryLabel} / Project detail`}
      title={project.title}
      lede={project.description}
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: project.title, href: `/projects/${project.id}` }]}
      image={project.image}
      imageAlt={project.imageAlt}
    >
      <section className="project-detail-meta" aria-label="Project information">
        <dl>
          {project.client && <div><dt>Client</dt><dd>{project.client}</dd></div>}
          {project.operator && <div><dt>Operator</dt><dd>{project.operator}</dd></div>}
          {project.projectName && <div><dt>Project</dt><dd>{project.projectName}</dd></div>}
          <div><dt>Location</dt><dd>{project.location}</dd></div>
          <div><dt>Duration</dt><dd>{project.duration}</dd></div>
          {project.coverage && <div><dt>Coverage</dt><dd>{project.coverage}</dd></div>}
          <div><dt>Status</dt><dd>{project.status}</dd></div>
        </dl>
      </section>

      {project.metrics && (
        <section className="project-detail-metrics" aria-label="Project at a glance">
          <p className="inner-page__eyebrow">PROJECT AT A GLANCE</p>
          <div>{project.metrics.map((metric) => <article key={metric.value + metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}</div>
        </section>
      )}

      {project.overview && (
        <section className="project-detail-copy" aria-label="Project overview">
          <p className="inner-page__eyebrow">PROJECT OVERVIEW</p>
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      )}

      {project.scopeGroups && (
        <section className="project-detail-scope" aria-label="Scope of work">
          <p className="inner-page__eyebrow">SCOPE OF WORK</p>
          <div>{project.scopeGroups.map((group) => <article key={group.title}><h2>{group.title}</h2><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>
      )}

      {project.role && <section className="project-detail-copy" aria-label="Our role"><p className="inner-page__eyebrow">OUR ROLE</p><p>{project.role}</p></section>}

      {project.deliveryFocus && (
        <section className="project-detail-focus" aria-label="Delivery focus">
          <p className="inner-page__eyebrow">DELIVERY FOCUS</p>
          <div>{project.deliveryFocus.map((item) => <article key={item.value}><h2>{item.value}</h2><p>{item.label}</p></article>)}</div>
        </section>
      )}

      <div className="inner-page__actions"><Link className="button button--primary" href="/projects">All Projects ↗</Link><Link className="button button--ghost" href="/contact#quote">Request a Quote ↗</Link></div>
      <Image className="project-detail__proof-image" src={project.image} alt={project.imageAlt} width={1200} height={720} />
    </InnerPage>
  );
}
