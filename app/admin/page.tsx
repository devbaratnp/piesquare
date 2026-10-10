import { redirect } from 'next/navigation';
import { AdminRoute } from '../../components/admin/admin-route';
import { getAdminSession } from '../../server/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Overview | Content studio',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return (
    <AdminRoute
      active="overview"
      kicker="Pie Square Technologies"
      title="Content studio"
      lede="Manage public content without changing the design system."
    />
  );
}
