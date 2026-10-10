import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { execute, getPool } from '@/server/db';
import { CV_MIME_TYPES, validateApplication, validateCv } from '@/server/applications';
import { publicUrl, sendMail } from '@/server/mail';

export const runtime = 'nodejs';

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 10;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (rateLimited(ip)) return NextResponse.json({ message: 'Too many applications. Try again in a minute.' }, { status: 429 });
  if (!getPool()) return NextResponse.json({ message: 'Applications are not connected yet. Please email info@piesquaretechnologies.com directly.' }, { status: 503 });

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ message: 'Invalid application.' }, { status: 400 });
  if (String(form.get('company') ?? '').trim()) return NextResponse.json({ ok: true }, { status: 201 });

  const checked = validateApplication({
    roleId: String(form.get('roleId') ?? ''),
    name: String(form.get('name') ?? ''),
    phone: String(form.get('phone') ?? ''),
    email: String(form.get('email') ?? ''),
    desiredPosition: String(form.get('desiredPosition') ?? ''),
    message: String(form.get('message') ?? ''),
  });
  if (!checked.ok) return NextResponse.json({ message: checked.message }, { status: 400 });

  const cvValue = form.get('cv');
  const cv = cvValue instanceof File ? validateCv(cvValue) : { ok: false as const, message: 'Attach your CV (PDF or Word, up to 5 MB).' };
  if (!cv.ok) return NextResponse.json({ message: cv.message }, { status: 400 });

  const filename = `${randomUUID()}${CV_MIME_TYPES[cv.file.type]}`;
  const relativePath = `/media/applications/${filename}`;
  const absolutePath = path.join(process.cwd(), 'public', 'media', 'applications', filename);
  try {
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, Buffer.from(await cv.file.arrayBuffer()), { flag: 'wx' });
    const { value } = checked;
    await execute(
      'INSERT INTO job_applications (role_id, name, phone, email, desired_position, message, cv_filename, cv_path, cv_mime, cv_size_bytes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, \'NEW\')',
      [value.roleId, value.name, value.phone, value.email, value.desiredPosition, value.message ?? null, cv.file.name.slice(0, 255), relativePath, cv.file.type, cv.file.size],
    );
    const emailSent = await sendMail({
      subject: `[Pie Square] New job application: ${value.desiredPosition}`,
      replyTo: value.email,
      text: [
        'New job application',
        '',
        `Name: ${value.name}`,
        `Phone: ${value.phone}`,
        `Email: ${value.email}`,
        `Role: ${value.desiredPosition}`,
        `Role ID: ${value.roleId}`,
        '',
        `Message: ${value.message || '—'}`,
        '',
        `CV: ${publicUrl(relativePath, request.url)}`,
      ].join('\n'),
    });
    return NextResponse.json({ ok: true, emailSent, message: emailSent ? 'Application received. We will contact you if your profile matches.' : 'Application received, but the email notification could not be sent.' }, { status: 201 });
  } catch {
    await unlink(absolutePath).catch(() => undefined);
    return NextResponse.json({ message: 'Application could not be saved.' }, { status: 500 });
  }
}
