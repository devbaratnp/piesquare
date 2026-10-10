'use client';

import { useCallback, useEffect, useState } from 'react';
import { PROJECT_PROGRESS_STATUSES } from '../../lib/project-progress';
import { AdminNotice, adminFetch, focusEditor } from './admin-shared';

type Project = { id: number; slug: string; title: string; category: string; short_description: string; full_description: string | null; featured_image: string | null; client_name: string | null; location: string | null; completion_info: string | null; project_status: string; featured: number; sort_order: number; status: string };

const emptyProject = { slug: '', title: '', category: 'TELECOM', shortDescription: '', fullDescription: '', featuredImage: '', clientName: '', location: '', completionInfo: '', projectStatus: 'ONGOING', featured: false, sortOrder: 0, status: 'DRAFT' };

export function AdminProjects({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [draft, setDraft] = useState(emptyProject);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [projectsResult, contentResult] = await Promise.all([
      adminFetch('/api/admin/projects'),
      adminFetch('/api/admin/content'),
    ]);
    if (!projectsResult.ok) {
      setError('Your session has expired. Sign in again.');
      onConfigured(null);
      return;
    }
    setProjects((projectsResult.payload.projects ?? []) as Project[]);
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
      const endpoint = editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects';
      const { ok, payload } = await adminFetch(endpoint, {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (!ok) {
        setError(typeof payload.message === 'string' ? payload.message : 'Project could not be saved.');
        return;
      }
      setDraft(emptyProject);
      setEditingId(null);
      setMessage(editingId ? 'Project updated.' : 'Project created.');
      await load();
    } catch {
      setError('Network request failed.');
    } finally {
      setPending(false);
    }
  }

  function edit(project: Project) {
    setEditingId(project.id);
    setDraft({ slug: project.slug, title: project.title, category: project.category, shortDescription: project.short_description, fullDescription: project.full_description ?? '', featuredImage: project.featured_image ?? '', clientName: project.client_name ?? '', location: project.location ?? '', completionInfo: project.completion_info ?? '', projectStatus: project.project_status === 'COMPLETED' ? 'COMPLETED' : 'ONGOING', featured: Boolean(project.featured), sortOrder: project.sort_order, status: project.status });
    focusEditor('#project-editor');
  }

  async function archive(id: number) {
    setMessage('');
    setError('');
    const { ok } = await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (!ok) {
      setError('Project could not be archived.');
      return;
    }
    setMessage('Project archived.');
    await load();
  }

  return (
    <>
      <AdminNotice message={message} error={error} />
      <section className="admin-panel" aria-busy={loading} aria-label="Projects">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Portfolio</p>
            <h2>Projects ({projects.length})</h2>
          </div>
        </div>
        {loading ? (
          <p className="admin-hint">Loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="admin-hint">No projects yet. Add the first one below.</p>
        ) : (
          <div className="admin-service-list">
            {projects.map((project) => (
              <article key={project.id}>
                <div>
                  <strong>{project.title}</strong>
                  <p>{project.short_description}</p>
                  <small>{project.project_status} · {project.status} · {project.category} · order {project.sort_order}</small>
                </div>
                <div className="admin-row-actions">
                  <button className="admin-text-button" type="button" onClick={() => edit(project)}>Edit</button>
                  <button className="admin-text-button" type="button" onClick={() => archive(project.id)}>Archive</button>
                </div>
              </article>
            ))}
          </div>
        )}
        <form className="admin-service-form" id="project-editor" onSubmit={save} aria-busy={pending}>
          <h3>{editingId ? 'Edit project' : 'Add a project'}</h3>
          <div className="admin-form-grid">
            <label>Slug<input required disabled={Boolean(editingId)} value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} placeholder="project-slug" /></label>
            <label>Title<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
            <label>Category<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}><option>TELECOM</option><option>FIBER</option><option>SOLAR</option><option>IT</option></select></label>
            <label>Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label>
            <label>Short description<textarea required value={draft.shortDescription} onChange={(event) => setDraft({ ...draft, shortDescription: event.target.value })} /></label>
            <label>Full description<textarea value={draft.fullDescription} onChange={(event) => setDraft({ ...draft, fullDescription: event.target.value })} /></label>
            <label>Featured image path<input value={draft.featuredImage} inputMode="url" onChange={(event) => setDraft({ ...draft, featuredImage: event.target.value })} placeholder="/media/uploads/example.jpg" /></label>
            <label>Client<input value={draft.clientName} onChange={(event) => setDraft({ ...draft, clientName: event.target.value })} /></label>
            <label>Location<input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} /></label>
            <label>Completion info<input value={draft.completionInfo} onChange={(event) => setDraft({ ...draft, completionInfo: event.target.value })} /></label>
            <label>Project progress<select value={draft.projectStatus} onChange={(event) => setDraft({ ...draft, projectStatus: event.target.value })}>{PROJECT_PROGRESS_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
            <label>Sort order<input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} /></label>
            <label className="admin-checkbox"><input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} /> Featured project</label>
          </div>
          <div className="admin-row-actions">
            <button className="button button--dark" type="submit" disabled={pending}>{pending ? 'Saving…' : editingId ? 'Update project' : 'Create project'}</button>
            {editingId && <button className="button button--ghost" type="button" onClick={() => { setEditingId(null); setDraft(emptyProject); }}>Cancel</button>}
          </div>
        </form>
      </section>
    </>
  );
}
