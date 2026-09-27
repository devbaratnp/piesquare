import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getAdminSession } from '@/server/session';
import { execute, getPool, queryRows } from '@/server/db';

export const runtime = 'nodejs';

type MediaRow = { id: number; filename: string; storage_path: string; mime_type: string; size_bytes: number; alt_text: string | null; created_at: string };

const extensions: Record<string, string> = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/avif': '.avif' };

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ media: [], configured: false });
  try {
    return NextResponse.json({ media: await queryRows<MediaRow & import('mysql2/promise').RowDataPacket>('SELECT id, filename, storage_path, mime_type, size_bytes, alt_text, created_at FROM media_library ORDER BY created_at DESC'), configured: true });
  } catch {
    return NextResponse.json({ message: 'Media could not be loaded.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const form = await request.formData().catch(() => null);
  const file = form?.get('file');
  const altText = String(form?.get('altText') ?? '').trim();
  if (!(file instanceof File) || !extensions[file.type]) return NextResponse.json({ message: 'Upload a JPG, PNG, WebP, GIF or AVIF image.' }, { status: 400 });
  if (file.size < 1 || file.size > 10 * 1024 * 1024) return NextResponse.json({ message: 'Images must be smaller than 10 MB.' }, { status: 400 });
  const filename = `${randomUUID()}${extensions[file.type]}`;
  const relativePath = `/media/uploads/${filename}`;
  const absolutePath = path.join(process.cwd(), 'public', relativePath.replace(/^\//, '').replaceAll('/', path.sep));
  try {
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()), { flag: 'wx' });
    const result = await execute('INSERT INTO media_library (filename, storage_path, mime_type, size_bytes, alt_text) VALUES (?, ?, ?, ?, ?)', [file.name.slice(0, 255), relativePath, file.type, file.size, altText || null]);
    return NextResponse.json({ ok: true, id: result.insertId, path: relativePath }, { status: 201 });
  } catch {
    await unlink(absolutePath).catch(() => undefined);
    return NextResponse.json({ message: 'Image could not be saved.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const body = await request.json().catch(() => null) as { id?: number } | null;
  const id = Number(body?.id);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ message: 'Media item not found.' }, { status: 404 });
  try {
    const rows = await queryRows<MediaRow & import('mysql2/promise').RowDataPacket>('SELECT storage_path FROM media_library WHERE id = ?', [id]);
    if (!rows[0]) return NextResponse.json({ message: 'Media item not found.' }, { status: 404 });
    await execute('DELETE FROM media_library WHERE id = ?', [id]);
    const normalized = rows[0].storage_path.replaceAll('\\', '/');
    if (normalized.startsWith('/media/uploads/')) await unlink(path.join(process.cwd(), 'public', normalized.replace(/^\//, '').replaceAll('/', path.sep))).catch(() => undefined);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'Media item could not be removed.' }, { status: 500 });
  }
}
