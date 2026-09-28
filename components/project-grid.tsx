import Image from 'next/image';
import Link from 'next/link';
import { projects as fallbackProjects, type ProjectRecord } from '@/data/site';

export function ProjectGrid({ projects = fallbackProjects }: { projects?: ReadonlyArray<ProjectRecord> } = {}) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <Link className="project-card" key={project.id} data-category={project.category} href={`/projects/${project.id}`}>
          <article className="project-card__article">
            <div className="project-card__image">
              <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 640px) 100vw, 33vw" />
              <span className={`project-card__status project-card__status--${project.status.toLowerCase()}`}>{project.status}</span>
            </div>
            <div className="project-card__copy">
              <span className="project-card__category">{project.categoryLabel}</span>
              <h3>{project.title}</h3>
              <p className="project-card__location">{project.location}</p>
              <p className="project-card__location">{project.duration}</p>
              <p className="project-card__scope">{project.scope.join(' • ')}</p>
              <p>{project.description}</p>
              <span className="project-card__link">View Project ↗</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
