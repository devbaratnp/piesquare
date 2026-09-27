import { NextResponse } from 'next/server';
import { getAdminSession } from '@/server/session';

export async function GET() {
  const session = await getAdminSession();
  return session ? NextResponse.json({ authenticated: true, session }) : NextResponse.json({ authenticated: false }, { status: 401 });
}
