'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectFilters, projects, type ProjectCategory } from '@/data/site';

function categoryForFilter(filter: (typeof projectFilters)[number]): ProjectCategory | null {
  if (filter === 'All') return null;
  return filter.toUpperCase() as ProjectCategory;
}

export function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All');
  const category = categoryForFilter(filter);
  const visible = projects.filter((project) => category === null || project.category === category);

  return (
    <>
      <div className="filter-row" role="group" aria-label="Filter projects">
        {projectFilters.map((item) => (
          <button key={item} type="button" className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
        <span className="filter-row__status" aria-live="polite">{visible.length} projects / {filter}</span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
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
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
