import { unlink } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { execute, getPool, queryRows } from '@/server/db';
import { getAdminSession } from '@/server/session';
import { APPLICATION_STATUSES } from '@/server/applications';

type ApplicationRow = {
  id: number;
  role_id: string;
  name: string;
  phone: string;
  email: string;
  desired_position: string;
  message: string | null;
  cv_filename: string | null;
  cv_path: string | null;
  cv_mime: string | null;
  cv_size_bytes: number | null;
  status: string;
  created_at: string;
};

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ applications: [], configured: false });
  try {
    const applications = await queryRows<ApplicationRow & import('mysql2/promise').RowDataPacket>(
      'SELECT id, role_id, name, phone, email, desired_position, message, cv_filename, cv_path, cv_mime, cv_size_bytes, status, created_at FROM job_applications ORDER BY created_at DESC LIMIT 200',
    );
    return NextResponse.json({ applications, configured: true });
  } catch {
    return NextResponse.json({ message: 'Applications could not be loaded.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: number; status?: string } | null;
  const id = Number(body?.id);
  const status = String(body?.status ?? '');
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ message: 'Application not found.' }, { status: 404 });
  if (!(APPLICATION_STATUSES as ReadonlyArray<string>).includes(status)) return NextResponse.json({ message: 'Status must be NEW, REVIEWED or ARCHIVED.' }, { status: 400 });
  try {
    if (status === 'ARCHIVED') {
      const rows = await queryRows<ApplicationRow & import('mysql2/promise').RowDataPacket>('SELECT cv_path FROM job_applications WHERE id = ?', [id]);
      await execute("UPDATE job_applications SET status = 'ARCHIVED' WHERE id = ?", [id]);
      const cvPath = rows[0]?.cv_path?.replaceAll('\\', '/');
      if (cvPath?.startsWith('/media/applications/')) {
        await unlink(path.join(process.cwd(), 'public', cvPath.replace(/^\//, '').replaceAll('/', path.sep))).catch(() => undefined);
      }
    } else {
      await execute('UPDATE job_applications SET status = ? WHERE id = ?', [status, id]);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Application could not be updated.' }, { status: 500 });
  }
}
