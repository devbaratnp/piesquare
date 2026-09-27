import { NextResponse } from 'next/server';
import { getAdminSession } from '@/server/session';
import { execute, getPool } from '@/server/db';

const categories = new Set(['TELECOM', 'FIBER', 'SOLAR', 'IT']);
const statuses = new Set(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export async function PUT(request: Request, context: RouteContext<'/api/admin/projects/[id]'>) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const { id } = await context.params;
  const numericId = Number(id);
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const title = String(body?.title ?? '').trim();
  const category = String(body?.category ?? '').trim().toUpperCase();
  const shortDescription = String(body?.short_description ?? body?.shortDescription ?? '').trim();
  const status = String(body?.status ?? 'DRAFT').trim().toUpperCase();
  if (!Number.isInteger(numericId) || numericId < 1 || !title || !categories.has(category) || !shortDescription || !statuses.has(status)) {
    return NextResponse.json({ message: 'Project details are invalid.' }, { status: 400 });
  }
  try {
    const result = await execute('UPDATE projects SET title = ?, category = ?, short_description = ?, full_description = ?, featured_image = ?, client_name = ?, location = ?, completion_info = ?, featured = ?, sort_order = ?, status = ? WHERE id = ?', [
      title,
      category,
      shortDescription,
      String(body?.full_description ?? body?.fullDescription ?? '').trim() || null,
      String(body?.featured_image ?? body?.featuredImage ?? '').trim() || null,
      String(body?.client_name ?? body?.clientName ?? '').trim() || null,
      String(body?.location ?? '').trim() || null,
      String(body?.completion_info ?? body?.completionInfo ?? '').trim() || null,
      body?.featured ? 1 : 0,
      Number(body?.sort_order ?? body?.sortOrder ?? 0),
      status,
      numericId,
    ]);
    return result.affectedRows ? NextResponse.json({ ok: true }) : NextResponse.json({ message: 'Project not found.' }, { status: 404 });
  } catch {
    return NextResponse.json({ message: 'Project could not be updated.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext<'/api/admin/projects/[id]'>) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) return NextResponse.json({ message: 'Project not found.' }, { status: 404 });
  try {
    const result = await execute('UPDATE projects SET status = \'ARCHIVED\' WHERE id = ?', [numericId]);
    return result.affectedRows ? NextResponse.json({ ok: true }) : NextResponse.json({ message: 'Project not found.' }, { status: 404 });
  } catch {
    return NextResponse.json({ message: 'Project could not be archived.' }, { status: 500 });
  }
}
