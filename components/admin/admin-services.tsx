'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminNotice, adminFetch, focusEditor } from './admin-shared';

type Service = { id: number; slug: string; title: string; summary: string; sort_order: number; status: string };

const emptyService = { slug: '', title: '', summary: '', sortOrder: 0, status: 'PUBLISHED' };

export function AdminServices({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [services, setServices] = useState<Service[]>([]);
  const [draft, setDraft] = useState(emptyService);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [servicesResult, contentResult] = await Promise.all([
      adminFetch('/api/admin/services'),
      adminFetch('/api/admin/content'),
    ]);
    if (!servicesResult.ok) {
      setError('Your session has expired. Sign in again.');
      onConfigured(null);
      return;
    }
    setServices((servicesResult.payload.services ?? []) as Service[]);
    onConfigured((contentResult.payload.summary as { configured?: boolean | null } | undefined)?.configured ?? null);
  }, [onConfigured]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await load();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setMessage('');
    setError('');
    setPending(true);
    try {
      const endpoint = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
      const { ok, payload } = await adminFetch(endpoint, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!ok) {
        setError(typeof payload.message === 'string' ? payload.message : 'Service could not be saved.');
        return;
      }
      setDraft(emptyService);
      setEditingId(null);
      setMessage(editingId ? 'Service updated.' : 'Service saved.');
      await load();
    } catch {
      setError('Network request failed.');
    } finally {
      setPending(false);
    }
  }

  function edit(service: Service) {
    setEditingId(service.id);
    setDraft({ slug: service.slug, title: service.title, summary: service.summary, sortOrder: service.sort_order, status: service.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED' });
    focusEditor('#service-editor');
  }

  async function archive(id: number) {
    setMessage('');
    setError('');
    const { ok } = await adminFetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    if (!ok) {
      setError('Service could not be archived.');
      return;
    }
    setMessage('Service archived.');
    await load();
  }

  return (
    <>
      <AdminNotice message={message} error={error} />
      <section className="admin-panel" aria-busy={loading} aria-label="Services">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Capabilities</p>
            <h2>Services ({services.length})</h2>
          </div>
        </div>
        {loading ? (
          <p className="admin-hint">Loading services…</p>
        ) : services.length === 0 ? (
          <p className="admin-hint">No services yet. Add the first one below.</p>
        ) : (
          <div className="admin-service-list">
            {services.map((service) => (
              <article key={service.id}>
                <div>
                  <strong>{service.title}</strong>
                  <p>{service.summary}</p>
                  <small>{service.status} · order {service.sort_order}</small>
                </div>
                <div className="admin-row-actions">
                  <button className="admin-text-button" type="button" onClick={() => edit(service)}>Edit</button>
                  <button className="admin-text-button" type="button" onClick={() => archive(service.id)}>Archive</button>
                </div>
              </article>
            ))}
          </div>
        )}
        <form className="admin-service-form" id="service-editor" onSubmit={save} aria-busy={pending}>
          <h3>{editingId ? 'Edit service' : 'Add a service'}</h3>
          <label>Slug<input required value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} placeholder="new-service" /></label>
          <label>Title<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
          <label>Summary<textarea required value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} /></label>
          <label>Sort order<input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} /></label>
          <label>Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option>PUBLISHED</option><option>DRAFT</option></select></label>
          <div className="admin-row-actions">
            <button className="button button--dark" type="submit" disabled={pending}>{pending ? 'Saving…' : editingId ? 'Update service' : 'Add service'}</button>
            {editingId && <button className="button button--ghost" type="button" onClick={() => { setEditingId(null); setDraft(emptyService); }}>Cancel</button>}
          </div>
        </form>
      </section>
    </>
  );
}
