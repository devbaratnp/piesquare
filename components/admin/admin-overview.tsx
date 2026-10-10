'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AdminNotice, adminFetch } from './admin-shared';

type Summary = Record<string, number | boolean | null>;
type Hero = { title?: string; subtitle?: string; image?: string };

export function AdminOverview({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [summary, setSummary] = useState<Summary>({});
  const [hero, setHero] = useState<Hero>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { ok, payload } = await adminFetch('/api/admin/content');
        if (!ok) throw new Error('session');
        if (cancelled) return;
        const nextSummary = (payload.summary ?? {}) as Summary;
        setSummary(nextSummary);
        setHero((payload.content as { hero?: Hero } | undefined)?.hero ?? {});
        onConfigured(typeof nextSummary.configured === 'boolean' ? nextSummary.configured : null);
      } catch {
        if (!cancelled) {
          setError('Your session has expired. Sign in again.');
          onConfigured(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [onConfigured]);

  const cards: Array<[string, string]> = [
    [String(summary.services ?? (loading ? '…' : '—')), 'Published services'],
    [String(summary.projects ?? (loading ? '…' : '—')), 'Projects'],
    [String(summary.publishedProjects ?? (loading ? '…' : '—')), 'Published projects'],
    [String(summary.media ?? (loading ? '…' : '—')), 'Media items'],
  ];

  return (
    <>
      <AdminNotice message="" error={error} />
      <section className="admin-stat-grid" aria-label="Content summary" aria-busy={loading}>
        {cards.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>
      {summary.configured === false && (
        <section className="admin-setup-note">
          <h2>Connect MySQL to enable editing</h2>
          <p>
            Copy <code>.env.example</code> to <code>.env.local</code>, create the schema in <code>server/schema.sql</code>, run{' '}
            <code>server/seed.sql</code>, then create an admin account.
          </p>
        </section>
      )}
      <section className="admin-panel" aria-label="Getting started">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Workflow</p>
            <h2>Where to go</h2>
          </div>
        </div>
        <p className="admin-hint">
          Edit public copy under Homepage, manage capabilities under Services, the portfolio under Projects, review hiring
          under Applications, and images under Media.
        </p>
      </section>
      <section className="admin-panel admin-overview-visual" aria-label="Current hero visual">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Visual checkpoint</p>
            <h2>Homepage image in context</h2>
          </div>
          <a className="admin-secondary-button" href="/admin/content">Edit homepage</a>
        </div>
        <div className="admin-overview-visual__layout">
          <div className="admin-overview-visual__media">
            {hero.image ? <Image src={hero.image} alt="Current homepage hero visual" fill sizes="(max-width: 900px) 100vw, 520px" /> : <div className="admin-image-preview__fallback">No hero image is configured yet.</div>}
          </div>
          <div>
            <p className="admin-kicker">Current headline</p>
            <h3>{hero.title?.split('|')[0] || 'Add a homepage headline'}</h3>
            <p className="admin-hint">{hero.subtitle || 'The homepage support line will appear here once configured.'}</p>
          </div>
        </div>
      </section>
    </>
  );
}
