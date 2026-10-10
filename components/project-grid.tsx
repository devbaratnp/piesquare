'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects as fallbackProjects, type ProjectRecord } from '@/data/site';
import { isUploadedImageSource } from '@/lib/image-source';

const filters = [
  { label: 'All', category: 'ALL' },
  { label: 'Telecom', category: 'TELECOM' },
  { label: 'Fiber', category: 'FIBER' },
  { label: 'Solar', category: 'SOLAR' },
  { label: 'IT', category: 'IT' },
] as const;

type ProjectFilter = (typeof filters)[number]['category'];

export function ProjectGrid({ projects = fallbackProjects }: { projects?: ReadonlyArray<ProjectRecord> } = {}) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('ALL');
  const visibleProjects = activeFilter === 'ALL' ? projects : projects.filter((project) => project.category === activeFilter);
  const activeLabel = filters.find((filter) => filter.category === activeFilter)?.label ?? 'All';

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            type="button"
            className={activeFilter === filter.category ? 'is-active' : ''}
            aria-pressed={activeFilter === filter.category}
            aria-controls="project-results"
            onClick={() => setActiveFilter(filter.category)}
            key={filter.category}
          >
            {filter.label}
          </button>
        ))}
        <span className="filter-row__status" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'} / {activeLabel}</span>
      </div>
      <div className="project-grid" id="project-results">
        {visibleProjects.map((project) => (
          <Link className="project-card" key={project.id} data-category={project.category} data-project-id={project.id} href={`/projects/${project.id}`}>
            <article className="project-card__article">
              <div className="project-card__image">
                <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 640px) 100vw, 33vw" unoptimized={isUploadedImageSource(project.image)} />
                <span className={`project-card__status project-card__status--${project.status.toLowerCase()}`}>{project.status}</span>
              </div>
              <div className="project-card__copy">
                <span className="project-card__category">{project.categoryLabel}</span>
                <h3>{project.title}</h3>
                <p className="project-card__location">{project.location}</p>
                {project.coverage && <p className="project-card__coverage">{project.coverage}</p>}
                <p className="project-card__location">{project.duration}</p>
                <p className="project-card__scope">{project.scope.join(' • ')}</p>
                <p>{project.description}</p>
                <span className="project-card__link">View Project ↗</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
      {visibleProjects.length === 0 ? <p className="project-grid__empty" role="status">No projects in this category yet.</p> : null}
    </>
  );
}
