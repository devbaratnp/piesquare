import type { MetadataRoute } from 'next';
import { projects } from '@/data/site';

const publicRoutes = ['/', '/company', '/capabilities', '/capabilities/telecom', '/capabilities/optical-fiber', '/capabilities/solar-energy', '/capabilities/it-solutions', '/projects', '/careers', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...publicRoutes, ...projects.map((project) => `/projects/${project.id}`)].map((path) => ({
    url: `https://piesquaretechnologies.com${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
