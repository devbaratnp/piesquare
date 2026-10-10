import { redirect } from 'next/navigation';
import { AdminMedia } from '../../../components/admin/admin-media';
import { AdminRoute } from '../../../components/admin/admin-route';
import { getAdminSession } from '../../../server/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Media | Content studio',
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return (
    <AdminRoute
      active="media"
      kicker="Assets"
      title="Media library"
      lede="Upload and manage images used across the public site."
      render={(onConfigured) => <AdminMedia onConfigured={onConfigured} />}
    />
  );
}
