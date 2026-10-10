'use client';

import { useCallback, useState } from 'react';
import { AdminShell } from '../admin-shell';
import type { AdminNavKey } from '../../lib/admin-nav';

type AdminRouteProps = {
  active: AdminNavKey;
  kicker: string;
  title: string;
  lede: string;
  render: (onConfigured: (value: boolean | null) => void) => React.ReactNode;
};

/** Server pages stay session-gated; this client host owns the DB-status badge state. */
export function AdminRoute({ active, kicker, title, lede, render }: AdminRouteProps) {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const onConfigured = useCallback((value: boolean | null) => setConfigured(value), []);
  return (
    <AdminShell active={active} kicker={kicker} title={title} lede={lede} configured={configured}>
      {render(onConfigured)}
    </AdminShell>
  );
}
