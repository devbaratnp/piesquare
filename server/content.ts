import { companyAboutIntro, companyAboutTitle, companyMissionCopy, companyVisionTitle, projects, serviceOverview, siteContact, type ProjectRecord } from '@/data/site';
import { isDatabaseConfigured, queryRows } from './db';

export type HomeHeroContent = Readonly<{
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image: string;
}>;

export type PublicContact = Readonly<{
  email: string;
  phone: string;
  phoneHref: string;
  address: string;
  mapUrl: string;
  facebook: string;
  website: string;
}>;

export type PublicService = Readonly<{
  slug: string;
  title: string;
  summary: string;
  scope: ReadonlyArray<string>;
  href: string;
}>;

export type PublicAbout = Readonly<{
  title: string;
  intro: string;
  vision: string;
  mission: string;
}>;

export type PublicContent = Readonly<{
  hero: HomeHeroContent;
  contact: PublicContact;
  about: PublicAbout;
  services: ReadonlyArray<PublicService>;
  projects: ReadonlyArray<ProjectRecord>;
}>;

type SettingRow = { setting_key: string; setting_value: string };
type HeroRow = HomeHeroContent;
type AboutRow = PublicAbout;
type ProjectRow = {
  slug: string;
  title: string;
  category: string;
  short_description: string;
  full_description: string | null;
  featured_image: string | null;
  client_name: string | null;
  location: string | null;
  completion_info: string | null;
  status: string;
};

export const fallbackHero: HomeHeroContent = {
  eyebrow: 'Integrated infrastructure and technology solutions',
  title: 'BUILDING THE|INFRASTRUCTURE|THAT KEEPS NEPAL CONNECTED.',
  subtitle: 'Telecom. Fiber. Solar. IT.',
  ctaText: 'View our work',
  ctaUrl: '#projects',
  image: '/media/cinematic/H01-hero-nepal-tower.webp',
};

export const fallbackAbout: PublicAbout = {
  title: companyAboutTitle,
  intro: companyAboutIntro,
  vision: companyVisionTitle,
  mission: companyMissionCopy,
};

const fallbackServices: ReadonlyArray<PublicService> = serviceOverview.map((service) => ({ slug: service.href.split('/').pop() ?? service.title.toLowerCase(), title: service.title, summary: service.summary, scope: service.scope, href: service.href }));

function mapProject(row: ProjectRow): ProjectRecord {
  const category = row.category.toUpperCase() as ProjectRecord['category'];
  const categoryLabel = category === 'SOLAR' ? 'SOLAR & ELECTRICAL' : category === 'IT' ? 'IT & DIGITAL' : category;
  const fallback = projects.find((project) => project.id === row.slug);
  const isOngoing = row.completion_info?.toLowerCase().includes('present') ?? false;
  return {
    id: row.slug,
    title: row.title,
    status: isOngoing ? 'ONGOING' : 'COMPLETED',
    category,
    categoryLabel,
    location: row.location ?? 'Nepal',
    duration: row.completion_info ?? 'Project delivery',
    scope: fallback?.scope ?? [row.short_description],
    description: row.short_description,
    image: row.featured_image ?? fallback?.image ?? '/media/cinematic/H01-hero-nepal-tower.webp',
    imageAlt: fallback?.imageAlt ?? `${row.title} project delivery`,
    client: row.client_name ?? undefined,
    overview: row.full_description ? [row.full_description] : fallback?.overview,
    scopeGroups: fallback?.scopeGroups,
    role: fallback?.role,
    metrics: fallback?.metrics,
    coverage: fallback?.coverage,
    coverageDetails: fallback?.coverageDetails,
    projectName: fallback?.projectName,
    projectDate: fallback?.projectDate,
    operator: fallback?.operator,
    endClient: fallback?.endClient,
    deliveryFocus: fallback?.deliveryFocus,
  };
}

function withContactSettings(rows: SettingRow[]): PublicContact {
  const settings = new Map(rows.map((row) => [row.setting_key, row.setting_value]));
  const phone = settings.get('phone') ?? siteContact.phone;
  return {
    ...siteContact,
    email: settings.get('email') ?? siteContact.email,
    phone,
    phoneHref: settings.get('phone_href') ?? `tel:${phone.replace(/\D/g, '')}`,
    address: settings.get('address') ?? siteContact.address,
    mapUrl: settings.get('map_url') ?? siteContact.mapUrl,
    facebook: settings.get('facebook') ?? siteContact.facebook,
    website: settings.get('website') ?? siteContact.website,
  };
}

export async function getPublicContent(): Promise<PublicContent> {
  if (!isDatabaseConfigured()) return { hero: fallbackHero, contact: siteContact, about: fallbackAbout, services: fallbackServices, projects };

  try {
    const [settings, heroRows, aboutRows, serviceRows, projectRows] = await Promise.all([
      queryRows<SettingRow & import('mysql2/promise').RowDataPacket>('SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN (\'email\', \'phone\', \'phone_href\', \'address\', \'map_url\', \'facebook\', \'website\')'),
      queryRows<HeroRow & import('mysql2/promise').RowDataPacket>('SELECT eyebrow, title, subtitle, cta_text AS ctaText, cta_url AS ctaUrl, image_path AS image FROM hero_section WHERE status = \'PUBLISHED\' ORDER BY id DESC LIMIT 1'),
      queryRows<AboutRow & import('mysql2/promise').RowDataPacket>('SELECT title, intro, vision, mission FROM about_section WHERE status = \'PUBLISHED\' ORDER BY id DESC LIMIT 1'),
      queryRows<{ slug: string; title: string; summary: string; sort_order: number } & import('mysql2/promise').RowDataPacket>('SELECT slug, title, summary, sort_order FROM services WHERE status = \'PUBLISHED\' ORDER BY sort_order, id'),
      queryRows<ProjectRow & import('mysql2/promise').RowDataPacket>('SELECT slug, title, category, short_description, full_description, featured_image, client_name, location, completion_info, status FROM projects WHERE status = \'PUBLISHED\' ORDER BY sort_order, id'),
    ]);
    const hero = heroRows[0] ? { ...fallbackHero, ...heroRows[0] } : fallbackHero;
    const about = aboutRows[0] ? { ...fallbackAbout, ...aboutRows[0] } : fallbackAbout;
    const services = serviceRows.length > 0 ? serviceRows.map((service) => ({ slug: service.slug, title: service.title, summary: service.summary, scope: fallbackServices.find((fallback) => fallback.slug === service.slug)?.scope ?? [], href: `/capabilities/${service.slug}` })) : fallbackServices;
    const publicProjects = projectRows.length > 0 ? projectRows.map(mapProject) : projects;
    return { hero, contact: withContactSettings(settings), about, services, projects: publicProjects };
  } catch {
    return { hero: fallbackHero, contact: siteContact, about: fallbackAbout, services: fallbackServices, projects };
  }
}

export async function getAdminSummary() {
  if (!isDatabaseConfigured()) {
    return { configured: false, services: serviceOverview.length, projects: projects.length, publishedProjects: projects.length, media: 0, updatedAt: null };
  }

  try {
    const [services, projectCounts, media] = await Promise.all([
      queryRows<{ total: number } & import('mysql2/promise').RowDataPacket>('SELECT COUNT(*) AS total FROM services WHERE status = \'PUBLISHED\''),
      queryRows<{ total: number; published: number } & import('mysql2/promise').RowDataPacket>('SELECT COUNT(*) AS total, SUM(status = \'PUBLISHED\') AS published FROM projects'),
      queryRows<{ total: number } & import('mysql2/promise').RowDataPacket>('SELECT COUNT(*) AS total FROM media_library'),
    ]);
    return { configured: true, services: Number(services[0]?.total ?? 0), projects: Number(projectCounts[0]?.total ?? 0), publishedProjects: Number(projectCounts[0]?.published ?? 0), media: Number(media[0]?.total ?? 0), updatedAt: new Date().toISOString() };
  } catch {
    return { configured: false, services: serviceOverview.length, projects: projects.length, publishedProjects: projects.length, media: 0, updatedAt: null };
  }
}
