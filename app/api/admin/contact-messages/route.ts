import { NextResponse } from 'next/server';
import { execute, getPool, queryRows } from '@/server/db';
import { CONTACT_STATUSES, ensureContactMessagesTable } from '@/server/contact';
import { getAdminSession } from '@/server/session';

type ContactMessageRow = {
  id: number;
  kind: string;
  name: string;
  company: string | null;
  phone: string;
  email: string;
  message: string | null;
  details: string | null;
  attachments: string | null;
  status: string;
  created_at: string;
};

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ messages: [], configured: false });
  try {
    await ensureContactMessagesTable();
    const messages = await queryRows<ContactMessageRow & import('mysql2/promise').RowDataPacket>(
      'SELECT id, kind, name, company, phone, email, message, details, attachments, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 200',
    );
    return NextResponse.json({ messages, configured: true });
  } catch {
    return NextResponse.json({ message: 'Contact messages could not be loaded.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const body = (await request.json().catch(() => null)) as { id?: number; status?: string } | null;
  const id = Number(body?.id);
  const status = String(body?.status ?? '');
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ message: 'Message not found.' }, { status: 404 });
  if (!(CONTACT_STATUSES as ReadonlyArray<string>).includes(status)) return NextResponse.json({ message: 'Status must be NEW, READ or ARCHIVED.' }, { status: 400 });
  try {
    await ensureContactMessagesTable();
    await execute('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Contact message could not be updated.' }, { status: 500 });
  }
}
