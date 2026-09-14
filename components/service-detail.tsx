import Image from 'next/image';
import Link from 'next/link';
import { DiscussProjectButton } from '@/components/discuss-project-button';
import type { ProjectRecord, ServiceCapability } from '@/data/site';

type ServiceDetailProps = Readonly<{
  capabilities?: ReadonlyArray<ServiceCapability>;
  lifecycle: ReadonlyArray<string>;
  scope: ReadonlyArray<string>;
  proof: string;
  relatedHref?: string;
  relatedProjects?: ReadonlyArray<ProjectRecord>;
  image?: string;
  imageAlt?: string;
}>;

function ProjectProofCard({ project }: { project: ProjectRecord }) {
  return (
    <article className="related-project-card">
      <div className="related-project-card__image">
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" />
      </div>
      <div className="related-project-card__copy">
        <span>{project.status} / {project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.location}</p>
        <p>{project.scope.join(' • ')}</p>
      </div>
    </article>
  );
}

export function ServiceDetail({ capabilities = [], lifecycle, scope, proof, relatedHref = '/projects', relatedProjects = [], image, imageAlt = '' }: ServiceDetailProps) {
  const hasLifecycle = lifecycle.length > 0;
  const hasScope = scope.length > 0;

  return (
    <>
      {capabilities.length > 0 && (
        <section className="service-capability-section" aria-label="Service capabilities">
          <div className="service-capability-section__heading">
            <p className="inner-page__eyebrow">WHAT WE DELIVER</p>
            <h2>Built for the work in front of us.</h2>
          </div>
          <ol className="service-capability-grid">
            {capabilities.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(hasLifecycle || hasScope) && (
        <div className="inner-page__grid">
          {hasLifecycle && (
            <section className="inner-page__card" aria-label="Delivery lifecycle">
              <h2>Lifecycle</h2>
              <ol>
                {lifecycle.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          )}
          {hasScope && (
            <section className="inner-page__card" aria-label="Technical scope">
              <h2>Technical scope</h2>
              <ul>
                {scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {image && (
        <div className="inner-page__hero-media service-detail__media">
          <Image src={image} alt={imageAlt} fill sizes="100vw" />
        </div>
      )}

      <section className="related-projects" aria-label="Related projects">
        <div className="related-projects__heading">
          <div>
            <p className="inner-page__eyebrow">PROJECT PORTFOLIO</p>
            <h2>Related Projects</h2>
          </div>
          <Link className="button button--ghost" href={relatedHref}>All Projects ↗</Link>
        </div>
        {relatedProjects.length > 0 ? (
          <div className="related-projects__grid">
            {relatedProjects.map((project) => <ProjectProofCard key={project.id} project={project} />)}
          </div>
        ) : (
          <p className="related-projects__empty">No related projects are listed for this capability yet.</p>
        )}
      </section>

      <p className="inner-page__proof">{proof}</p>
      <div className="inner-page__actions">
        <DiscussProjectButton className="button button--primary">Discuss a Project ↗</DiscussProjectButton>
        <Link className="button button--ghost" href="/contact#survey">Request a Site Survey ↗</Link>
      </div>
    </>
  );
}
