export type AdminNavKey = 'overview' | 'content' | 'services' | 'projects' | 'applications' | 'media';

export type AdminNavItem = {
  key: AdminNavKey;
  label: string;
  href: string;
  description: string;
};

/** Single nav definition shared by the desktop sidebar and the mobile drawer. */
export const ADMIN_NAV: AdminNavItem[] = [
  { key: 'overview', label: 'Overview', href: '/admin', description: 'Status and content summary' },
  { key: 'content', label: 'Homepage', href: '/admin/content', description: 'Hero, company and contact details' },
  { key: 'services', label: 'Services', href: '/admin/services', description: 'Capability entries' },
  { key: 'projects', label: 'Projects', href: '/admin/projects', description: 'Portfolio entries' },
  { key: 'applications', label: 'Applications', href: '/admin/applications', description: 'Inbox and job applications' },
  { key: 'media', label: 'Media', href: '/admin/media', description: 'Image library' },
];
