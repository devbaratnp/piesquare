import { NextResponse } from 'next/server';
import { getAdminSession } from '@/server/session';
import { execute, getPool } from '@/server/db';

export async function PUT(request: Request, context: RouteContext<'/api/admin/services/[id]'>) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const { id } = await context.params;
  const body = await request.json().catch(() => null) as { title?: string; summary?: string; sortOrder?: number; status?: string } | null;
  if (!body?.title?.trim() || !body.summary?.trim()) return NextResponse.json({ message: 'Title and summary are required.' }, { status: 400 });
  try {
    const result = await execute('UPDATE services SET title = ?, summary = ?, sort_order = ?, status = ? WHERE id = ?', [body.title.trim(), body.summary.trim(), Number(body.sortOrder ?? 0), body.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED', Number(id)]);
    return result.affectedRows ? NextResponse.json({ ok: true }) : NextResponse.json({ message: 'Service not found.' }, { status: 404 });
  } catch {
    return NextResponse.json({ message: 'Service could not be updated.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext<'/api/admin/services/[id]'>) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const { id } = await context.params;
  try {
    const result = await execute('UPDATE services SET status = \'ARCHIVED\' WHERE id = ?', [Number(id)]);
    return result.affectedRows ? NextResponse.json({ ok: true }) : NextResponse.json({ message: 'Service not found.' }, { status: 404 });
  } catch {
    return NextResponse.json({ message: 'Service could not be archived.' }, { status: 500 });
  }
}
