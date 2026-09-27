import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminLoginForm } from '@/components/admin-login-form';

export const metadata: Metadata = { title: 'Admin login | Pie Square Technologies', robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <Link className="admin-brand" href="/">Pie Square <span>Content studio</span></Link>
        <p className="admin-kicker">Secure workspace</p>
        <h1>Sign in to manage the site.</h1>
        <p>Use the administrator credentials created during database setup.</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
