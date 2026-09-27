import { NextResponse } from 'next/server';
import { getAdminSession } from '@/server/session';
import { execute, getPool, queryRows } from '@/server/db';

type ServiceRow = { id: number; slug: string; title: string; summary: string; sort_order: number; status: string };

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ services: [], configured: false });
  try {
    return NextResponse.json({ services: await queryRows<ServiceRow & import('mysql2/promise').RowDataPacket>('SELECT id, slug, title, summary, sort_order, status FROM services ORDER BY sort_order, id'), configured: true });
  } catch {
    return NextResponse.json({ message: 'Services could not be loaded.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const body = await request.json().catch(() => null) as { slug?: string; title?: string; summary?: string; sortOrder?: number; status?: string } | null;
  const slug = body?.slug?.trim().toLowerCase();
  const title = body?.title?.trim();
  const summary = body?.summary?.trim();
  if (!slug || !title || !summary || !/^[a-z0-9-]+$/.test(slug)) return NextResponse.json({ message: 'Slug, title and summary are required.' }, { status: 400 });
  try {
    await execute('INSERT INTO services (slug, title, summary, sort_order, status) VALUES (?, ?, ?, ?, ?)', [slug, title, summary, Number(body?.sortOrder ?? 0), body?.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED']);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Service could not be saved.' }, { status: 409 });
  }
}
