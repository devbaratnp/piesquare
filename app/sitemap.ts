import type { MetadataRoute } from 'next';
import { getPublicContent } from '@/server/content';

export const dynamic = 'force-dynamic';

const publicRoutes = ['/', '/company', '/capabilities', '/capabilities/telecom', '/capabilities/optical-fiber', '/capabilities/solar-energy', '/capabilities/it-solutions', '/projects', '/careers', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPublicContent();
  return [...publicRoutes, ...content.projects.map((project) => `/projects/${project.id}`)].map((path) => ({
    url: `https://piesquaretechnologies.com${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
