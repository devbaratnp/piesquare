import { NextResponse } from 'next/server';
import { getPublicContent, getAdminSummary } from '@/server/content';
import { execute, getPool, queryRows } from '@/server/db';
import { getAdminSession } from '@/server/session';

type HeroIdRow = { id: number };
type AboutIdRow = { id: number };

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  const [content, summary] = await Promise.all([getPublicContent(), getAdminSummary()]);
  return NextResponse.json({ content, summary });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  if (!getPool()) return NextResponse.json({ message: 'Admin database is not configured.' }, { status: 503 });
  const body = await request.json().catch(() => null) as {
    hero?: { eyebrow?: string; title?: string; subtitle?: string; ctaText?: string; ctaUrl?: string; image?: string };
    about?: { title?: string; intro?: string; vision?: string; mission?: string };
    contact?: { email?: string; phone?: string; address?: string; mapUrl?: string; facebook?: string; website?: string };
  } | null;
  if (!body) return NextResponse.json({ message: 'Invalid content payload.' }, { status: 400 });
  if (body.hero && (!body.hero.eyebrow?.trim() || !body.hero.title?.trim() || !body.hero.subtitle?.trim() || !body.hero.ctaText?.trim() || !body.hero.ctaUrl?.trim() || !body.hero.image?.trim())) {
    return NextResponse.json({ message: 'All hero fields are required.' }, { status: 400 });
  }
  if (body.about && (!body.about.title?.trim() || !body.about.intro?.trim() || !body.about.vision?.trim() || !body.about.mission?.trim())) {
    return NextResponse.json({ message: 'All about fields are required.' }, { status: 400 });
  }

  try {
    if (body.hero) {
      const hero = body.hero;
      const heroRows = await queryRows<HeroIdRow & import('mysql2/promise').RowDataPacket>('SELECT id FROM hero_section ORDER BY id DESC LIMIT 1');
      if (heroRows[0]) {
        await execute('UPDATE hero_section SET eyebrow = ?, title = ?, subtitle = ?, cta_text = ?, cta_url = ?, image_path = ? WHERE id = ?', [hero.eyebrow?.trim(), hero.title?.trim(), hero.subtitle?.trim(), hero.ctaText?.trim(), hero.ctaUrl?.trim(), hero.image?.trim(), heroRows[0].id]);
      }
    }
    if (body.about) {
      const about = body.about;
      const aboutRows = await queryRows<AboutIdRow & import('mysql2/promise').RowDataPacket>('SELECT id FROM about_section ORDER BY id DESC LIMIT 1');
      if (aboutRows[0]) {
        await execute('UPDATE about_section SET title = ?, intro = ?, vision = ?, mission = ? WHERE id = ?', [about.title?.trim(), about.intro?.trim(), about.vision?.trim(), about.mission?.trim(), aboutRows[0].id]);
      } else {
        await execute('INSERT INTO about_section (title, intro, vision, mission, status) VALUES (?, ?, ?, ?, \'PUBLISHED\')', [about.title?.trim(), about.intro?.trim(), about.vision?.trim(), about.mission?.trim()]);
      }
    }
    if (body.contact) {
      for (const [key, value] of Object.entries({ email: body.contact.email, phone: body.contact.phone, address: body.contact.address, map_url: body.contact.mapUrl, facebook: body.contact.facebook, website: body.contact.website })) {
        if (typeof value === 'string' && value.trim()) await execute('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)', [key, value.trim()]);
      }
    }
    return NextResponse.json({ ok: true, content: await getPublicContent() });
  } catch {
    return NextResponse.json({ message: 'Content could not be saved.' }, { status: 500 });
  }
}
