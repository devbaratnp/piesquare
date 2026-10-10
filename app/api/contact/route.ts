import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { getPool, execute } from '@/server/db';
import { CONTACT_FILE_MIME_TYPES, ensureContactMessagesTable, validateContact, validateContactFiles } from '@/server/contact';
import { publicUrl, sendMail } from '@/server/mail';

export const runtime = 'nodejs';

const hits = new Map<string, { count: number; resetAt: number }>();
const detailKeys = ['projectType', 'service', 'location', 'projectSize', 'startDate', 'surveyType', 'numberOfSites', 'preferredDate', 'requirements'];

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
  if (rateLimited(ip)) return NextResponse.json({ message: 'Too many messages. Try again in a minute.' }, { status: 429 });
  if (!getPool()) return NextResponse.json({ message: 'Messages are not connected yet. Please email piesquaretechnologies@gmail.com directly.' }, { status: 503 });

  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ message: 'Invalid message.' }, { status: 400 });
  if (String(form.get('website') ?? '').trim()) return NextResponse.json({ ok: true }, { status: 201 });

  const details = Object.fromEntries(detailKeys.map((key) => [key, String(form.get(key) ?? '').trim()]).filter(([, value]) => value));
  const checked = validateContact({
    kind: String(form.get('kind') ?? ''),
    name: String(form.get('name') ?? ''),
    company: String(form.get('company') ?? ''),
    phone: String(form.get('phone') ?? ''),
    email: String(form.get('email') ?? ''),
    message: String(form.get('message') ?? form.get('requirements') ?? ''),
    details,
  });
  if (!checked.ok) return NextResponse.json({ message: checked.message }, { status: 400 });

  const files = [...form.getAll('documents'), ...form.getAll('siteDocuments')].filter((value): value is File => value instanceof File && value.size > 0);
  const filesChecked = validateContactFiles(files);
  if (!filesChecked.ok) return NextResponse.json({ message: filesChecked.message }, { status: 400 });

  const storedPaths: string[] = [];
  try {
    await ensureContactMessagesTable();
    const attachments: Array<{ filename: string; path: string; mime: string; size: number }> = [];
    for (const file of files) {
      const filename = `${randomUUID()}${CONTACT_FILE_MIME_TYPES[file.type]}`;
      const relativePath = `/media/contact/${filename}`;
      const absolutePath = path.join(process.cwd(), 'public', 'media', 'contact', filename);
      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()), { flag: 'wx' });
      storedPaths.push(absolutePath);
      attachments.push({ filename: file.name.slice(0, 255), path: relativePath, mime: file.type, size: file.size });
    }

    const { value } = checked;
    await execute(
      'INSERT INTO contact_messages (kind, name, company, phone, email, message, details, attachments, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, \'NEW\')',
      [value.kind, value.name, value.company ?? null, value.phone, value.email, value.message ?? null, JSON.stringify(value.details), JSON.stringify(attachments)],
    );

    const label = value.kind === 'QUOTE' ? 'Project inquiry' : value.kind === 'SURVEY' ? 'Site survey request' : 'Website message';
    const attachmentLines = attachments.length === 0 ? ['Attachments: none'] : ['Attachments:', ...attachments.map((attachment) => `- ${attachment.filename}: ${publicUrl(attachment.path, request.url)}`)];
    const emailSent = await sendMail({
      subject: `[Pie Square] ${label} from ${value.name}`,
      replyTo: value.email,
      text: [
        `${label}`,
        '',
        `Name: ${value.name}`,
        `Company: ${value.company || '—'}`,
        `Phone: ${value.phone}`,
        `Email: ${value.email}`,
        `Type: ${value.kind}`,
        '',
        'Details:',
        ...Object.entries(value.details).map(([key, detail]) => `- ${key}: ${detail}`),
        '',
        `Message: ${value.message || '—'}`,
        '',
        ...attachmentLines,
      ].join('\n'),
    });
    return NextResponse.json({
      ok: true,
      emailSent,
      message: emailSent ? 'Thanks — your message was sent. We will be in touch soon.' : 'Thanks — your message was saved, but the email notification could not be sent.',
    }, { status: 201 });
  } catch {
    await Promise.all(storedPaths.map((storedPath) => unlink(storedPath).catch(() => undefined)));
    return NextResponse.json({ message: 'Message could not be saved.' }, { status: 500 });
  }
}
