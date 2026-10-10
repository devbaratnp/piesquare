'use client';

import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
import { AdminShell } from '../admin-shell';
import type { AdminNavKey } from '../../lib/admin-nav';
import { AdminApplications } from './admin-applications';
import { AdminContentForm } from './admin-content-form';
import { AdminMedia } from './admin-media';
import { AdminOverview } from './admin-overview';
import { AdminProjects } from './admin-projects';
import { AdminServices } from './admin-services';

type AdminRouteProps = {
  active: AdminNavKey;
  kicker: string;
  title: string;
  lede: string;
};

type AdminModuleProps = { onConfigured: (value: boolean | null) => void };

const ADMIN_MODULES: Record<AdminNavKey, ComponentType<AdminModuleProps>> = {
  overview: AdminOverview,
  content: AdminContentForm,
  services: AdminServices,
  projects: AdminProjects,
  applications: AdminApplications,
  media: AdminMedia,
};

/** Server pages stay session-gated; this client host owns the DB-status badge state. */
export function AdminRoute({ active, kicker, title, lede }: AdminRouteProps) {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const onConfigured = useCallback((value: boolean | null) => setConfigured(value), []);
  const Module = ADMIN_MODULES[active];
  return (
    <AdminShell active={active} kicker={kicker} title={title} lede={lede} configured={configured}>
      <Module onConfigured={onConfigured} />
    </AdminShell>
  );
}
