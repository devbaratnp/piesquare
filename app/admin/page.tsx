import { redirect } from 'next/navigation';
import { AdminDashboard } from '../../components/admin-dashboard';
import { getAdminSession } from '@/server/session';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  if (!(await getAdminSession())) redirect('/admin/login');
  return <AdminDashboard />;
}
