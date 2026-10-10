import { redirect } from 'next/navigation';
import { AdminRoute } from '../../../components/admin/admin-route';
import { AdminServices } from '../../../components/admin/admin-services';
import { getAdminSession } from '../../../server/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Services | Content studio',
  robots: { index: false, follow: false },
};

export default async function AdminServicesPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return (
    <AdminRoute
      active="services"
      kicker="Capabilities"
      title="Services"
      lede="Capability entries shown on the homepage and capabilities pages."
      render={(onConfigured) => <AdminServices onConfigured={onConfigured} />}
    />
  );
}
