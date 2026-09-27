'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) });
    const payload = await response.json().catch(() => ({ message: 'Unable to sign in.' }));
    setPending(false);
    if (!response.ok) {
      setError(payload.message ?? 'Unable to sign in.');
      return;
    }
    router.replace('/admin');
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      <label htmlFor="admin-email">Email</label>
      <input id="admin-email" name="email" type="email" autoComplete="username" required />
      <label htmlFor="admin-password">Password</label>
      <input id="admin-password" name="password" type="password" autoComplete="current-password" required minLength={10} />
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      <button className="button button--primary" type="submit" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
