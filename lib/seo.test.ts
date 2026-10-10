import { describe, expect, it } from 'vitest';
import { buildBreadcrumbJsonLd, buildPageMetadata } from './seo';

describe('buildPageMetadata', () => {
  it('creates page-specific canonical and social metadata', () => {
    const metadata = buildPageMetadata({
      title: 'Projects | Pie Square Technologies',
      description: 'Field proof from telecom, fiber, energy, and IT delivery across Nepal.',
      path: '/projects',
    });

    expect(metadata.alternates?.canonical).toBe('/projects');
    expect(metadata.openGraph).toMatchObject({
      title: 'Projects | Pie Square Technologies',
      description: 'Field proof from telecom, fiber, energy, and IT delivery across Nepal.',
      url: 'https://piesquaretechnologies.com/projects',
    });
    expect(metadata.twitter).toMatchObject({
      title: 'Projects | Pie Square Technologies',
      description: 'Field proof from telecom, fiber, energy, and IT delivery across Nepal.',
    });
  });

  it('creates a crawlable breadcrumb graph from route crumbs', () => {
    expect(buildBreadcrumbJsonLd([
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/projects' },
    ])).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://piesquaretechnologies.com/' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://piesquaretechnologies.com/projects' },
      ],
    });
  });
});
