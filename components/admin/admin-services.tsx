'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminModal, AdminNotice, adminFetch } from './admin-shared';

type Service = { id: number; slug: string; title: string; summary: string; sort_order: number; status: string };
type ServiceDraft = { slug: string; title: string; summary: string; sortOrder: number; status: string };

const emptyService: ServiceDraft = { slug: '', title: '', summary: '', sortOrder: 0, status: 'PUBLISHED' };

export function AdminServices({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [services, setServices] = useState<Service[]>([]);
  const [draft, setDraft] = useState<ServiceDraft>(emptyService);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
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

  function startCreate() {
    setEditingId(null);
    setDraft(emptyService);
    setError('');
    setEditorOpen(true);
  }

  function edit(service: Service) {
    setEditingId(service.id);
    setDraft({
      slug: service.slug,
      title: service.title,
      summary: service.summary,
      sortOrder: service.sort_order,
      status: service.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
    });
    setError('');
    setEditorOpen(true);
  }

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
      const wasEditing = Boolean(editingId);
      setDraft(emptyService);
      setEditingId(null);
      setEditorOpen(false);
      setMessage(wasEditing ? 'Service updated.' : 'Service saved.');
      await load();
    } catch {
      setError('Network request failed.');
    } finally {
      setPending(false);
    }
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
            <p className="admin-panel__lede">Keep the offer clear, ordered, and ready for the public site.</p>
          </div>
          <button className="admin-cta" type="button" onClick={startCreate}>Add service <span aria-hidden="true">＋</span></button>
        </div>
        {loading ? (
          <p className="admin-hint">Loading services…</p>
        ) : services.length === 0 ? (
          <div className="admin-empty-state">
            <strong>No services yet.</strong>
            <p>Add the first capability so visitors know what Pie Square can deliver.</p>
            <button className="admin-secondary-button" type="button" onClick={startCreate}>Create first service</button>
          </div>
        ) : (
          <div className="admin-record-grid">
            {services.map((service, index) => (
              <article className="admin-record-card" key={service.id}>
                <div className="admin-record-card__topline">
                  <span className="admin-record-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className={`admin-status-badge ${service.status === 'PUBLISHED' ? 'is-live' : 'is-draft'}`}>{service.status}</span>
                </div>
                <div className="admin-record-card__body">
                  <p className="admin-kicker">{service.slug}</p>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </div>
                <div className="admin-record-card__meta">
                  <span>Display order {service.sort_order}</span>
                  <div className="admin-row-actions">
                    <button className="admin-text-button" type="button" onClick={() => edit(service)}>Edit</button>
                    <button className="admin-text-button" type="button" onClick={() => archive(service.id)}>Archive</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <AdminModal
        open={editorOpen}
        eyebrow="Capability editor"
        title={editingId ? 'Edit service' : 'Add a service'}
        description="Short, focused records keep the public capability rail easy to scan."
        onClose={() => setEditorOpen(false)}
      >
        <form className="admin-modal-form" onSubmit={save} aria-busy={pending}>
          <div className="admin-form-grid">
            <label>Slug<input required value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} placeholder="new-service" /></label>
            <label>Title<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
            <label className="admin-form-grid__wide">Summary<textarea required value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} /></label>
            <label>Sort order<input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} /></label>
            <label>Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option>PUBLISHED</option><option>DRAFT</option></select></label>
          </div>
          <div className="admin-modal-form__actions">
            <button className="button button--dark" type="submit" disabled={pending}>{pending ? 'Saving…' : editingId ? 'Update service' : 'Add service'}</button>
            <button className="button button--ghost" type="button" onClick={() => setEditorOpen(false)}>Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
