import { redirect } from 'next/navigation';
import { AdminApplications } from '../../../components/admin/admin-applications';
import { AdminRoute } from '../../../components/admin/admin-route';
import { getAdminSession } from '../../../server/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Applications | Content studio',
  robots: { index: false, follow: false },
};

export default async function AdminApplicationsPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return (
    <AdminRoute
      active="applications"
      kicker="Hiring"
      title="Applications"
      lede="Review job applications and manage CV files."
      render={(onConfigured) => <AdminApplications onConfigured={onConfigured} />}
    />
  );
}
