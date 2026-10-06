'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PROJECT_PROGRESS_STATUSES } from '@/lib/project-progress';

type Hero = { eyebrow: string; title: string; subtitle: string; ctaText: string; ctaUrl: string; image: string };
type Contact = { email: string; phone: string; address: string; mapUrl: string; facebook: string; website: string };
type About = { title: string; intro: string; vision: string; mission: string };
type Service = { id: number; slug: string; title: string; summary: string; sort_order: number; status: string };
type Project = { id: number; slug: string; title: string; category: string; short_description: string; full_description: string | null; featured_image: string | null; client_name: string | null; location: string | null; completion_info: string | null; project_status: string; featured: number; sort_order: number; status: string };
type Media = { id: number; filename: string; storage_path: string; mime_type: string; size_bytes: number; alt_text: string | null; created_at: string };
type JobApplication = { id: number; role_id: string; name: string; phone: string; email: string; desired_position: string; message: string | null; cv_filename: string | null; cv_path: string | null; cv_size_bytes: number | null; status: string; created_at: string };

const emptyService = { slug: '', title: '', summary: '', sortOrder: 0, status: 'PUBLISHED' };
const emptyProject = { slug: '', title: '', category: 'TELECOM', shortDescription: '', fullDescription: '', featuredImage: '', clientName: '', location: '', completionInfo: '', projectStatus: 'ONGOING', featured: false, sortOrder: 0, status: 'DRAFT' };

export function AdminDashboard() {
  const router = useRouter();
  const [hero, setHero] = useState<Hero | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [summary, setSummary] = useState<Record<string, number | boolean | null>>({});
  const [serviceDraft, setServiceDraft] = useState(emptyService);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [projectDraft, setProjectDraft] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaAlt, setMediaAlt] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function load() {
    const [contentResponse, servicesResponse, projectsResponse, mediaResponse, applicationsResponse] = await Promise.all([
      fetch('/api/admin/content'),
      fetch('/api/admin/services'),
      fetch('/api/admin/projects'),
      fetch('/api/admin/media'),
      fetch('/api/admin/applications'),
    ]);
    if (![contentResponse, servicesResponse, projectsResponse, mediaResponse, applicationsResponse].every((response) => response.ok)) {
      setError('Your session has expired. Sign in again.');
      return;
    }
    const content = await contentResponse.json();
    const servicePayload = await servicesResponse.json();
    const projectPayload = await projectsResponse.json();
    const mediaPayload = await mediaResponse.json();
    const applicationsPayload = await applicationsResponse.json();
    setHero(content.content.hero);
    setContact(content.content.contact);
    setAbout(content.content.about);
    setSummary(content.summary);
    setServices(servicePayload.services ?? []);
    setProjects(projectPayload.projects ?? []);
    setMedia(mediaPayload.media ?? []);
    setApplications(applicationsPayload.applications ?? []);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function resetNotice() {
    setMessage('');
    setError('');
  }

  async function saveContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hero || !contact || !about) return;
    resetNotice();
    const response = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ hero, contact, about }) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) { setError(payload.message ?? 'Content could not be saved.'); return; }
    setMessage('Homepage and contact details saved.');
  }

  async function addService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetNotice();
    const endpoint = editingServiceId ? `/api/admin/services/${editingServiceId}` : '/api/admin/services';
    const response = await fetch(endpoint, { method: editingServiceId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(serviceDraft) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) { setError(payload.message ?? 'Service could not be saved.'); return; }
    setServiceDraft(emptyService);
    setEditingServiceId(null);
    setMessage(editingServiceId ? 'Service updated.' : 'Service saved.');
    await load();
  }

  function editService(service: Service) {
    setEditingServiceId(service.id);
    setServiceDraft({ slug: service.slug, title: service.title, summary: service.summary, sortOrder: service.sort_order, status: service.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED' });
    document.querySelector('#service-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function archiveService(id: number) {
    resetNotice();
    const response = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
    if (!response.ok) { setError('Service could not be archived.'); return; }
    setMessage('Service archived.');
    await load();
  }

  async function saveProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetNotice();
    const endpoint = editingProjectId ? `/api/admin/projects/${editingProjectId}` : '/api/admin/projects';
    const response = await fetch(endpoint, { method: editingProjectId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(projectDraft) });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) { setError(payload.message ?? 'Project could not be saved.'); return; }
    setProjectDraft(emptyProject);
    setEditingProjectId(null);
    setMessage(editingProjectId ? 'Project updated.' : 'Project created.');
    await load();
  }

  function editProject(project: Project) {
    setEditingProjectId(project.id);
    setProjectDraft({ slug: project.slug, title: project.title, category: project.category, shortDescription: project.short_description, fullDescription: project.full_description ?? '', featuredImage: project.featured_image ?? '', clientName: project.client_name ?? '', location: project.location ?? '', completionInfo: project.completion_info ?? '', projectStatus: project.project_status === 'COMPLETED' ? 'COMPLETED' : 'ONGOING', featured: Boolean(project.featured), sortOrder: project.sort_order, status: project.status });
    document.querySelector('#project-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function archiveProject(id: number) {
    resetNotice();
    const response = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (!response.ok) { setError('Project could not be archived.'); return; }
    setMessage('Project archived.');
    await load();
  }

  async function uploadMedia(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mediaFile) { setError('Choose an image first.'); return; }
    resetNotice();
    const form = new FormData();
    form.set('file', mediaFile);
    form.set('altText', mediaAlt);
    const response = await fetch('/api/admin/media', { method: 'POST', body: form });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) { setError(payload.message ?? 'Image could not be uploaded.'); return; }
    setMediaFile(null);
    setMediaAlt('');
    setMessage('Image uploaded.');
    await load();
  }

  async function removeMedia(id: number) {
    resetNotice();
    const response = await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (!response.ok) { setError('Image could not be removed.'); return; }
    setMessage('Image removed.');
    await load();
  }

  async function setApplicationStatus(id: number, status: string) {
    resetNotice();
    const response = await fetch('/api/admin/applications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    if (!response.ok) { setError('Application could not be updated.'); return; }
    setMessage(status === 'ARCHIVED' ? 'Application archived and CV removed.' : 'Application updated.');
    await load();
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">Pie Square <span>Content studio</span></Link>
        <nav aria-label="Admin navigation">
          <a className="is-active" href="#overview">Overview</a>
          <a href="#homepage">Homepage</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#applications">Applications</a>
          <a href="#media">Media</a>
          <Link href="/projects">View public site</Link>
        </nav>
        <button className="admin-logout" type="button" onClick={logout}>Log out</button>
      </aside>
      <main className="admin-main">
        <header className="admin-header" id="overview">
          <div><p className="admin-kicker">Pie Square Technologies</p><h1>Content studio</h1><p>Manage public content without changing the design system.</p></div>
          <div className="admin-status"><span className={summary.configured ? 'is-ready' : 'is-warning'}>{summary.configured ? 'MySQL connected' : 'Database setup required'}</span><span>Admin session active</span></div>
        </header>
        {(message || error) && <p className={error ? 'admin-toast admin-toast--error' : 'admin-toast'} role="status">{error || message}</p>}
        <section className="admin-stat-grid" aria-label="Content summary">
          <article><strong>{summary.services ?? '—'}</strong><span>Published services</span></article>
          <article><strong>{summary.projects ?? '—'}</strong><span>Projects</span></article>
          <article><strong>{summary.publishedProjects ?? '—'}</strong><span>Published projects</span></article>
          <article><strong>{summary.media ?? '—'}</strong><span>Media items</span></article>
        </section>
        {!summary.configured && <section className="admin-setup-note"><h2>Connect MySQL to enable editing</h2><p>Copy <code>.env.example</code> to <code>.env.local</code>, create the schema in <code>server/schema.sql</code>, run <code>server/seed.sql</code>, then create an admin account.</p></section>}
        {hero && contact && about && <form className="admin-panel" id="homepage" onSubmit={saveContent}>
          <div className="admin-panel__heading"><div><p className="admin-kicker">Homepage and company</p><h2>Public content settings</h2></div><button className="button button--primary" type="submit">Save changes</button></div>
          <div className="admin-form-grid">
            <label>Eyebrow<input value={hero.eyebrow} onChange={(event) => setHero({ ...hero, eyebrow: event.target.value })} /></label>
            <label>Headline lines, separated with <code>|</code><input value={hero.title} onChange={(event) => setHero({ ...hero, title: event.target.value })} /></label>
            <label>Hero support line<input value={hero.subtitle} onChange={(event) => setHero({ ...hero, subtitle: event.target.value })} /></label>
            <label>Primary CTA text<input value={hero.ctaText} onChange={(event) => setHero({ ...hero, ctaText: event.target.value })} /></label>
            <label>Primary CTA URL<input value={hero.ctaUrl} onChange={(event) => setHero({ ...hero, ctaUrl: event.target.value })} /></label>
            <label>Hero image path<input value={hero.image} onChange={(event) => setHero({ ...hero, image: event.target.value })} /></label>
            <label>Email<input type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} /></label>
            <label>Phone<input value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} /></label>
            <label>Address<input value={contact.address} onChange={(event) => setContact({ ...contact, address: event.target.value })} /></label>
            <label>Website<input value={contact.website} onChange={(event) => setContact({ ...contact, website: event.target.value })} /></label>
            <label>Map URL<input value={contact.mapUrl} onChange={(event) => setContact({ ...contact, mapUrl: event.target.value })} /></label>
            <label>Facebook URL<input value={contact.facebook} onChange={(event) => setContact({ ...contact, facebook: event.target.value })} /></label>
            <label>About title<input value={about.title} onChange={(event) => setAbout({ ...about, title: event.target.value })} /></label>
            <label>About introduction<textarea value={about.intro} onChange={(event) => setAbout({ ...about, intro: event.target.value })} /></label>
            <label>Vision<textarea value={about.vision} onChange={(event) => setAbout({ ...about, vision: event.target.value })} /></label>
            <label>Mission<textarea value={about.mission} onChange={(event) => setAbout({ ...about, mission: event.target.value })} /></label>
          </div>
        </form>}
        <section className="admin-panel" id="services">
          <div className="admin-panel__heading"><div><p className="admin-kicker">Capabilities</p><h2>Services</h2></div></div>
          <div className="admin-service-list">{services.map((service) => <article key={service.id}><div><strong>{service.title}</strong><p>{service.summary}</p><small>{service.status} · order {service.sort_order}</small></div><div className="admin-row-actions"><button className="admin-text-button" type="button" onClick={() => editService(service)}>Edit</button><button className="admin-text-button" type="button" onClick={() => archiveService(service.id)}>Archive</button></div></article>)}</div>
          <form className="admin-service-form" id="service-editor" onSubmit={addService}>
            <h3>{editingServiceId ? 'Edit service' : 'Add a service'}</h3>
            <label>Slug<input required value={serviceDraft.slug} onChange={(event) => setServiceDraft({ ...serviceDraft, slug: event.target.value })} placeholder="new-service" /></label>
            <label>Title<input required value={serviceDraft.title} onChange={(event) => setServiceDraft({ ...serviceDraft, title: event.target.value })} /></label>
            <label>Summary<textarea required value={serviceDraft.summary} onChange={(event) => setServiceDraft({ ...serviceDraft, summary: event.target.value })} /></label>
            <label>Sort order<input type="number" value={serviceDraft.sortOrder} onChange={(event) => setServiceDraft({ ...serviceDraft, sortOrder: Number(event.target.value) })} /></label>
            <label>Status<select value={serviceDraft.status} onChange={(event) => setServiceDraft({ ...serviceDraft, status: event.target.value })}><option>PUBLISHED</option><option>DRAFT</option></select></label>
            <div className="admin-row-actions"><button className="button button--dark" type="submit">{editingServiceId ? 'Update service' : 'Add service'}</button>{editingServiceId && <button className="button button--ghost" type="button" onClick={() => { setEditingServiceId(null); setServiceDraft(emptyService); }}>Cancel</button>}</div>
          </form>
        </section>
        <section className="admin-panel" id="projects">
          <div className="admin-panel__heading"><div><p className="admin-kicker">Portfolio</p><h2>Projects</h2></div></div>
          <div className="admin-service-list">{projects.map((project) => <article key={project.id}><div><strong>{project.title}</strong><p>{project.short_description}</p><small>{project.project_status} · {project.status} · {project.category} · order {project.sort_order}</small></div><div className="admin-row-actions"><button className="admin-text-button" type="button" onClick={() => editProject(project)}>Edit</button><button className="admin-text-button" type="button" onClick={() => archiveProject(project.id)}>Archive</button></div></article>)}</div>
          <form className="admin-service-form" id="project-editor" onSubmit={saveProject}>
            <h3>{editingProjectId ? 'Edit project' : 'Add a project'}</h3>
            <div className="admin-form-grid">
              <label>Slug<input required disabled={Boolean(editingProjectId)} value={projectDraft.slug} onChange={(event) => setProjectDraft({ ...projectDraft, slug: event.target.value })} placeholder="project-slug" /></label>
              <label>Title<input required value={projectDraft.title} onChange={(event) => setProjectDraft({ ...projectDraft, title: event.target.value })} /></label>
              <label>Category<select value={projectDraft.category} onChange={(event) => setProjectDraft({ ...projectDraft, category: event.target.value })}><option>TELECOM</option><option>FIBER</option><option>SOLAR</option><option>IT</option></select></label>
              <label>Status<select value={projectDraft.status} onChange={(event) => setProjectDraft({ ...projectDraft, status: event.target.value })}><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select></label>
              <label>Short description<textarea required value={projectDraft.shortDescription} onChange={(event) => setProjectDraft({ ...projectDraft, shortDescription: event.target.value })} /></label>
              <label>Full description<textarea value={projectDraft.fullDescription} onChange={(event) => setProjectDraft({ ...projectDraft, fullDescription: event.target.value })} /></label>
              <label>Featured image path<input value={projectDraft.featuredImage} onChange={(event) => setProjectDraft({ ...projectDraft, featuredImage: event.target.value })} placeholder="/media/uploads/example.jpg" /></label>
              <label>Client<input value={projectDraft.clientName} onChange={(event) => setProjectDraft({ ...projectDraft, clientName: event.target.value })} /></label>
              <label>Location<input value={projectDraft.location} onChange={(event) => setProjectDraft({ ...projectDraft, location: event.target.value })} /></label>
              <label>Completion info<input value={projectDraft.completionInfo} onChange={(event) => setProjectDraft({ ...projectDraft, completionInfo: event.target.value })} /></label>
              <label>Project progress<select value={projectDraft.projectStatus} onChange={(event) => setProjectDraft({ ...projectDraft, projectStatus: event.target.value })}>{PROJECT_PROGRESS_STATUSES.map((status) => <option key={status}>{status}</option>)}</select></label>
              <label>Sort order<input type="number" value={projectDraft.sortOrder} onChange={(event) => setProjectDraft({ ...projectDraft, sortOrder: Number(event.target.value) })} /></label>
              <label className="admin-checkbox"><input type="checkbox" checked={projectDraft.featured} onChange={(event) => setProjectDraft({ ...projectDraft, featured: event.target.checked })} /> Featured project</label>
            </div>
            <div className="admin-row-actions"><button className="button button--dark" type="submit">{editingProjectId ? 'Update project' : 'Create project'}</button>{editingProjectId && <button className="button button--ghost" type="button" onClick={() => { setEditingProjectId(null); setProjectDraft(emptyProject); }}>Cancel</button>}</div>
          </form>
        </section>
        <section className="admin-panel" id="applications">
          <div className="admin-panel__heading"><div><p className="admin-kicker">Hiring</p><h2>Job applications ({applications.length})</h2></div></div>
          <div className="admin-service-list">{applications.length === 0 && <p>No applications yet.</p>}{applications.map((application) => <article key={application.id}><div><strong>{application.name} — {application.desired_position}</strong><p>{application.email} · {application.phone} · {application.role_id}</p><p>{application.message}</p><small>{application.status} · {application.cv_filename} {application.cv_size_bytes ? `· ${Math.round(application.cv_size_bytes / 1024)} KB` : ''} · {application.created_at}</small></div><div className="admin-row-actions">{application.cv_path && <a className="admin-text-button" href={application.cv_path} target="_blank" rel="noreferrer">CV</a>}{application.status === 'NEW' && <button className="admin-text-button" type="button" onClick={() => setApplicationStatus(application.id, 'REVIEWED')}>Mark reviewed</button>}{application.status !== 'ARCHIVED' && <button className="admin-text-button" type="button" onClick={() => setApplicationStatus(application.id, 'ARCHIVED')}>Archive</button>}</div></article>)}</div>
        </section>
        <section className="admin-panel" id="media">
          <div className="admin-panel__heading"><div><p className="admin-kicker">Assets</p><h2>Media library</h2></div></div>
          <form className="admin-service-form" onSubmit={uploadMedia}>
            <h3>Upload an image</h3>
            <label>Image<input required type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(event) => setMediaFile(event.target.files?.[0] ?? null)} /></label>
            <label>Alt text<input value={mediaAlt} onChange={(event) => setMediaAlt(event.target.value)} /></label>
            <button className="button button--dark" type="submit">Upload image</button>
          </form>
          <div className="admin-media-grid">{media.map((item) => <article key={item.id}><Image src={item.storage_path} alt={item.alt_text ?? item.filename} width={320} height={240} /><div><strong>{item.filename}</strong><small>{Math.round(item.size_bytes / 1024)} KB</small><button className="admin-text-button" type="button" onClick={() => removeMedia(item.id)}>Remove</button></div></article>)}</div>
        </section>
      </main>
    </div>
  );
}
