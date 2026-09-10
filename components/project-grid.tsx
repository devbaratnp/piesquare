'use client';

import { useState } from 'react';
import Image from 'next/image';
import { projectFilters, projects } from '@/data/site';

function categoryOf(meta: string): string {
  if (/RF|Radio|Telecom|Tower|Civil|Equipment/i.test(meta)) return 'Telecom';
  if (/Fiber/i.test(meta)) return 'Fiber';
  if (/Energy|Solar/i.test(meta)) return 'Energy';
  return 'IT systems';
}

export function ProjectGrid() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All');
  const visible = projects.filter(([ , meta]) => filter === 'All' || categoryOf(meta) === filter);

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
        {visible.map(([src, meta, title, copy]) => (
          <article className="project-card" key={src}>
            <div className="project-card__image">
              <Image src={src} alt={title} fill sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
            <div className="project-card__copy">
              <span>{meta}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
