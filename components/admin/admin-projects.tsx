'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { PROJECT_PROGRESS_STATUSES } from '../../lib/project-progress';
import { AdminModal, AdminNotice, adminFetch } from './admin-shared';

type Project = { id: number; slug: string; title: string; category: string; short_description: string; full_description: string | null; featured_image: string | null; client_name: string | null; location: string | null; completion_info: string | null; project_status: string; featured: number; sort_order: number; status: string };
type ProjectDraft = { slug: string; title: string; category: string; shortDescription: string; fullDescription: string; featuredImage: string; clientName: string; location: string; completionInfo: string; projectStatus: string; featured: boolean; sortOrder: number; status: string };

const emptyProject: ProjectDraft = { slug: '', title: '', category: 'TELECOM', shortDescription: '', fullDescription: '', featuredImage: '', clientName: '', location: '', completionInfo: '', projectStatus: 'ONGOING', featured: false, sortOrder: 0, status: 'DRAFT' };

function ProjectImage({ src, alt }: { src: string | null | undefined; alt: string }) {
  if (!src) return <div className="admin-project-card__fallback" aria-label="No project image"><span>Visual pending</span><strong>{alt.slice(0, 2).toUpperCase()}</strong></div>;
  if (src.startsWith('/')) return <Image className="admin-project-card__image" src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />;
  return <img className="admin-project-card__image" src={src} alt={alt} loading="lazy" />;
}

export function AdminProjects({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [draft, setDraft] = useState<ProjectDraft>(emptyProject);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
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

  function startCreate() {
    setEditingId(null);
    setDraft(emptyProject);
    setError('');
    setEditorOpen(true);
  }

  function edit(project: Project) {
    setEditingId(project.id);
    setDraft({
      slug: project.slug,
      title: project.title,
      category: project.category,
      shortDescription: project.short_description,
      fullDescription: project.full_description ?? '',
      featuredImage: project.featured_image ?? '',
      clientName: project.client_name ?? '',
      location: project.location ?? '',
      completionInfo: project.completion_info ?? '',
      projectStatus: project.project_status === 'COMPLETED' ? 'COMPLETED' : 'ONGOING',
      featured: Boolean(project.featured),
      sortOrder: project.sort_order,
      status: project.status,
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
      const wasEditing = Boolean(editingId);
      setDraft(emptyProject);
      setEditingId(null);
      setEditorOpen(false);
      setMessage(wasEditing ? 'Project updated.' : 'Project created.');
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
            <p className="admin-panel__lede">Review every project as a visual card before it reaches the public portfolio.</p>
          </div>
          <button className="admin-cta" type="button" onClick={startCreate}>Add project <span aria-hidden="true">＋</span></button>
        </div>
        {loading ? (
          <p className="admin-hint">Loading projects…</p>
        ) : projects.length === 0 ? (
          <div className="admin-empty-state">
            <strong>No projects yet.</strong>
            <p>Start with a project image and the story visitors should remember.</p>
            <button className="admin-secondary-button" type="button" onClick={startCreate}>Create first project</button>
          </div>
        ) : (
          <div className="admin-project-grid">
            {projects.map((project, index) => (
              <article className="admin-project-card" key={project.id}>
                <div className="admin-project-card__media">
                  <ProjectImage src={project.featured_image} alt={project.title} />
                  <span className={`admin-status-badge ${project.status === 'PUBLISHED' ? 'is-live' : 'is-draft'}`}>{project.status}</span>
                  {project.featured ? <span className="admin-project-card__featured">Featured</span> : null}
                </div>
                <div className="admin-project-card__content">
                  <div className="admin-project-card__meta"><span>{String(index + 1).padStart(2, '0')} / {project.category}</span><span>{project.project_status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.short_description}</p>
                  <div className="admin-row-actions">
                    <button className="admin-text-button" type="button" onClick={() => edit(project)}>Edit details</button>
                    <button className="admin-text-button" type="button" onClick={() => archive(project.id)}>Archive</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <AdminModal
        open={editorOpen}
        eyebrow="Portfolio editor"
        title={editingId ? 'Edit project' : 'Add a project'}
        description="Add a clear visual, then give the project enough context to stand on its own."
        onClose={() => setEditorOpen(false)}
      >
        <form className="admin-modal-form" onSubmit={save} aria-busy={pending}>
          <div className="admin-project-editor">
            <div className="admin-project-editor__preview">
              <ProjectImage src={draft.featuredImage || null} alt={draft.title || 'Project preview'} />
              <span>Live image preview</span>
            </div>
            <div className="admin-project-editor__fields">
              <div className="admin-form-grid">
                <label>Slug<input required disabled={Boolean(editingId)} value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} placeholder="project-slug" /></label>
                <label>Title<input required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
                <label>Category<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}><option>TELECOM</option><option>FIBER</option><option>SOLAR</option><option>IT</option></select></label>
                <label>Status<select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label>
                <label className="admin-form-grid__wide">Short description<textarea required value={draft.shortDescription} onChange={(event) => setDraft({ ...draft, shortDescription: event.target.value })} /></label>
                <label className="admin-form-grid__wide">Full description<textarea value={draft.fullDescription} onChange={(event) => setDraft({ ...draft, fullDescription: event.target.value })} /></label>
                <label className="admin-form-grid__wide">Featured image path<input value={draft.featuredImage} inputMode="url" onChange={(event) => setDraft({ ...draft, featuredImage: event.target.value })} placeholder="/media/uploads/example.jpg" /></label>
                <label>Client<input value={draft.clientName} onChange={(event) => setDraft({ ...draft, clientName: event.target.value })} /></label>
                <label>Location<input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} /></label>
                <label>Completion info<input value={draft.completionInfo} onChange={(event) => setDraft({ ...draft, completionInfo: event.target.value })} /></label>
                <label>Project progress<select value={draft.projectStatus} onChange={(event) => setDraft({ ...draft, projectStatus: event.target.value })}>{PROJECT_PROGRESS_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
                <label>Sort order<input type="number" value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} /></label>
                <label className="admin-checkbox"><input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} /> Featured project</label>
              </div>
            </div>
          </div>
          <div className="admin-modal-form__actions">
            <button className="button button--dark" type="submit" disabled={pending}>{pending ? 'Saving…' : editingId ? 'Update project' : 'Create project'}</button>
            <button className="button button--ghost" type="button" onClick={() => setEditorOpen(false)}>Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
