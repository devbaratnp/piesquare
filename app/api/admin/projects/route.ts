import { NextResponse } from 'next/server';
import { isProjectProgressStatus, type ProjectProgressStatus } from '@/lib/project-progress';
import { getAdminSession } from '@/server/session';
import { execute, getPool, queryRows } from '@/server/db';

type ProjectRow = {
  id: number;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  full_description: string | null;
  featured_image: string | null;
  client_name: string | null;
  location: string | null;
  completion_info: string | null;
  project_status: ProjectProgressStatus;
  featured: number;
  sort_order: number;
  status: string;
};

const categories = new Set(['TELECOM', 'FIBER', 'SOLAR', 'IT']);
const statuses = new Set(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ projects: [], configured: false });
  try {
    const projects = await queryRows<ProjectRow & import('mysql2/promise').RowDataPacket>('SELECT id, slug, title, category, short_description, full_description, featured_image, client_name, location, completion_info, project_status, featured, sort_order, status FROM projects ORDER BY sort_order, id');
    return NextResponse.json({ projects, configured: true });
  } catch {
    return NextResponse.json({ message: 'Projects could not be loaded.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const body = await request.json().catch(() => null) as Partial<ProjectRow> & { shortDescription?: string; fullDescription?: string; featuredImage?: string; clientName?: string; completionInfo?: string; projectStatus?: string; sortOrder?: number } | null;
  const slug = String(body?.slug ?? '').trim().toLowerCase();
  const title = String(body?.title ?? '').trim();
  const category = String(body?.category ?? '').trim().toUpperCase();
  const shortDescription = String(body?.short_description ?? body?.shortDescription ?? '').trim();
  const status = String(body?.status ?? 'DRAFT').trim().toUpperCase();
  const projectStatus = String(body?.project_status ?? body?.projectStatus ?? 'ONGOING').trim().toUpperCase();
  if (!/^[a-z0-9-]+$/.test(slug) || !title || !categories.has(category) || !shortDescription || !statuses.has(status) || !isProjectProgressStatus(projectStatus)) {
    return NextResponse.json({ message: 'Slug, title, category, short description, publication status and project progress are required.' }, { status: 400 });
  }
  try {
    await execute('INSERT INTO projects (slug, title, category, short_description, full_description, featured_image, client_name, location, completion_info, project_status, featured, sort_order, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      slug,
      title,
      category,
      shortDescription,
      String(body?.full_description ?? body?.fullDescription ?? '').trim() || null,
      String(body?.featured_image ?? body?.featuredImage ?? '').trim() || null,
      String(body?.client_name ?? body?.clientName ?? '').trim() || null,
      String(body?.location ?? '').trim() || null,
      String(body?.completion_info ?? body?.completionInfo ?? '').trim() || null,
      projectStatus,
      body?.featured ? 1 : 0,
      Number(body?.sort_order ?? body?.sortOrder ?? 0),
      status,
    ]);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Project could not be saved. Check that the slug is unique.' }, { status: 409 });
  }
}
