import { NextResponse } from 'next/server';
import { createSessionToken, verifyPassword } from '@/lib/admin-auth';
import { adminCookieName } from '@/server/session';
import { getPool, queryRows } from '@/server/db';
import { setAdminSession } from '@/server/session';

type AdminRow = { id: number; email: string; password_hash: string; status: 'ACTIVE' | 'DISABLED' };

const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function requestKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  const key = requestKey(request);
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (attempt && attempt.resetAt > now && attempt.count >= MAX_ATTEMPTS) return NextResponse.json({ message: 'Too many sign-in attempts. Try again later.' }, { status: 429 });
  if (attempt && attempt.resetAt <= now) loginAttempts.delete(key);
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password ?? '';
  if (!email || !password || password.length > 200) return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });

  try {
    const rows = await queryRows<AdminRow & import('mysql2/promise').RowDataPacket>('SELECT id, email, password_hash, status FROM admins WHERE email = ? LIMIT 1', [email]);
    const admin = rows[0];
    if (!admin || admin.status !== 'ACTIVE' || !(await verifyPassword(password, admin.password_hash))) {
      const current = loginAttempts.get(key);
      loginAttempts.set(key, { count: (current?.count ?? 0) + 1, resetAt: current?.resetAt && current.resetAt > now ? current.resetAt : now + WINDOW_MS });
      return NextResponse.json({ message: 'Incorrect login credentials.' }, { status: 401 });
    }
    loginAttempts.delete(key);
    const token = createSessionToken({ adminId: Number(admin.id), email: admin.email });
    await setAdminSession(token);
    return NextResponse.json({ ok: true, cookie: adminCookieName });
  } catch {
    return NextResponse.json({ message: 'Unable to sign in right now.' }, { status: 500 });
  }
}
