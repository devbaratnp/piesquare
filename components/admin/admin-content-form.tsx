'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AdminNotice, adminFetch } from './admin-shared';

type Hero = { eyebrow: string; title: string; subtitle: string; ctaText: string; ctaUrl: string; image: string };
type Contact = { email: string; phone: string; address: string; mapUrl: string; facebook: string; website: string };
type About = { title: string; intro: string; vision: string; mission: string };

export function AdminContentForm({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [hero, setHero] = useState<Hero | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { ok, payload } = await adminFetch('/api/admin/content');
      if (cancelled) return;
      if (!ok) {
        setError('Your session has expired. Sign in again.');
        onConfigured(null);
        return;
      }
      const content = payload.content as { hero: Hero; contact: Contact; about: About };
      setHero(content.hero);
      setContact(content.contact);
      setAbout(content.about);
      onConfigured((payload.summary as { configured?: boolean | null })?.configured ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [onConfigured]);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hero || !contact || !about || pending) return;
    setMessage('');
    setError('');
    setPending(true);
    try {
      const { ok, payload } = await adminFetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hero, contact, about }),
      });
      if (!ok) {
        setError(typeof payload.message === 'string' ? payload.message : 'Content could not be saved.');
        return;
      }
      setMessage('Homepage and contact details saved.');
    } catch {
      setError('Network request failed.');
    } finally {
      setPending(false);
    }
  }

  if (!hero || !contact || !about) {
    return (
      <>
        <AdminNotice message={message} error={error} />
        <section className="admin-panel" aria-busy="true" aria-label="Loading content">
          <p className="admin-hint">Loading public content…</p>
        </section>
      </>
    );
  }

  return (
    <>
      <AdminNotice message={message} error={error} />
      <form className="admin-panel" onSubmit={save} aria-busy={pending}>
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Homepage and company</p>
            <h2>Public content settings</h2>
          </div>
        </div>
        <div className="admin-content-layout">
          <div className="admin-form-grid">
          <label>Eyebrow<input value={hero.eyebrow} onChange={(event) => setHero({ ...hero, eyebrow: event.target.value })} /></label>
          <label>Headline lines, separated with <code>|</code><input value={hero.title} onChange={(event) => setHero({ ...hero, title: event.target.value })} /></label>
          <label>Hero support line<input value={hero.subtitle} onChange={(event) => setHero({ ...hero, subtitle: event.target.value })} /></label>
          <label>Primary CTA text<input value={hero.ctaText} onChange={(event) => setHero({ ...hero, ctaText: event.target.value })} /></label>
          <label>Primary CTA URL<input value={hero.ctaUrl} onChange={(event) => setHero({ ...hero, ctaUrl: event.target.value })} /></label>
          <label>Hero image path<input value={hero.image} onChange={(event) => setHero({ ...hero, image: event.target.value })} /></label>
          <label>Email<input type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} /></label>
          <label>Phone<input value={contact.phone} autoComplete="tel" onChange={(event) => setContact({ ...contact, phone: event.target.value })} /></label>
          <label>Address<input value={contact.address} autoComplete="street-address" onChange={(event) => setContact({ ...contact, address: event.target.value })} /></label>
          <label>Website<input value={contact.website} inputMode="url" onChange={(event) => setContact({ ...contact, website: event.target.value })} /></label>
          <label>Map URL<input value={contact.mapUrl} inputMode="url" onChange={(event) => setContact({ ...contact, mapUrl: event.target.value })} /></label>
          <label>Facebook URL<input value={contact.facebook} inputMode="url" onChange={(event) => setContact({ ...contact, facebook: event.target.value })} /></label>
          <label>About title<input value={about.title} onChange={(event) => setAbout({ ...about, title: event.target.value })} /></label>
          <label>About introduction<textarea value={about.intro} onChange={(event) => setAbout({ ...about, intro: event.target.value })} /></label>
          <label>Vision<textarea value={about.vision} onChange={(event) => setAbout({ ...about, vision: event.target.value })} /></label>
          <label>Mission<textarea value={about.mission} onChange={(event) => setAbout({ ...about, mission: event.target.value })} /></label>
          </div>
          <aside className="admin-image-preview" aria-label="Live hero image preview">
            <div className="admin-image-preview__media">
              {hero.image ? <Image src={hero.image} alt="Current hero visual" fill sizes="(max-width: 900px) 100vw, 360px" /> : <div className="admin-image-preview__fallback">Add a hero image path to preview it here.</div>}
            </div>
            <p className="admin-kicker">Live visual</p>
            <h3>{hero.title.split('|')[0] || 'Hero headline'}</h3>
            <p>{hero.subtitle || 'Hero support copy will appear here.'}</p>
          </aside>
        </div>
        <div className="admin-save-bar">
          <button className="button button--primary" type="submit" disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button>
        </div>
      </form>
    </>
  );
}
