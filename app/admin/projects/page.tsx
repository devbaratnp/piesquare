import { redirect } from 'next/navigation';
import { AdminProjects } from '../../../components/admin/admin-projects';
import { AdminRoute } from '../../../components/admin/admin-route';
import { getAdminSession } from '../../../server/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projects | Content studio',
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return (
    <AdminRoute
      active="projects"
      kicker="Portfolio"
      title="Projects"
      lede="Portfolio entries shown on the projects pages."
      render={(onConfigured) => <AdminProjects onConfigured={onConfigured} />}
    />
  );
}
