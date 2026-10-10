import { redirect } from 'next/navigation';
import { AdminRoute } from '../../../components/admin/admin-route';
import { getAdminSession } from '../../../server/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Homepage content | Content studio',
  robots: { index: false, follow: false },
};

export default async function AdminContentPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return (
    <AdminRoute
      active="content"
      kicker="Homepage and company"
      title="Public content"
      lede="Hero, company story and contact details shown across the public site."
    />
  );
}
