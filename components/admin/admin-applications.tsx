'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminNotice, adminFetch } from './admin-shared';

type JobApplication = {
  id: number;
  role_id: string;
  name: string;
  phone: string;
  email: string;
  desired_position: string;
  message: string | null;
  cv_filename: string | null;
  cv_path: string | null;
  cv_size_bytes: number | null;
  status: string;
  created_at: string;
};

type ContactMessage = {
  id: number;
  kind: string;
  name: string;
  company: string | null;
  phone: string;
  email: string;
  message: string | null;
  details: string | null;
  attachments: string | null;
  status: string;
  created_at: string;
};

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function labelKind(kind: string) {
  return kind === 'QUOTE' ? 'Project enquiry' : kind === 'SURVEY' ? 'Site survey' : 'Website message';
}

export function AdminApplications({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [applicationsResult, messagesResult, contentResult] = await Promise.all([
      adminFetch('/api/admin/applications'),
      adminFetch('/api/admin/contact-messages'),
      adminFetch('/api/admin/content'),
    ]);
    if (!applicationsResult.ok || !messagesResult.ok) {
      setError('Your session has expired or the inbox could not be loaded. Sign in again.');
      onConfigured(null);
      return;
    }
    setApplications((applicationsResult.payload.applications ?? []) as JobApplication[]);
    setMessages((messagesResult.payload.messages ?? []) as ContactMessage[]);
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

  async function setApplicationStatus(id: number, status: string) {
    setMessage('');
    setError('');
    const { ok } = await adminFetch('/api/admin/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!ok) {
      setError('Application could not be updated.');
      return;
    }
    setMessage(status === 'ARCHIVED' ? 'Application archived and CV removed.' : 'Application updated.');
    await load();
  }

  async function setMessageStatus(id: number, status: string) {
    setMessage('');
    setError('');
    const { ok } = await adminFetch('/api/admin/contact-messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!ok) {
      setError('Contact message could not be updated.');
      return;
    }
    setMessage(status === 'ARCHIVED' ? 'Contact message archived.' : 'Contact message marked read.');
    await load();
  }

  return (
    <>
      <AdminNotice message={message} error={error} />
      <section className="admin-panel" aria-busy={loading} aria-label="Contact message inbox">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Inbox</p>
            <h2>Contact messages ({messages.length})</h2>
            <p className="admin-panel__lede">Project enquiries, site surveys, and general messages land here with their uploaded documents.</p>
          </div>
        </div>
        {loading ? (
          <p className="admin-hint">Loading inbox…</p>
        ) : (
          <div className="admin-service-list">
            {messages.length === 0 && <p className="admin-hint">No contact messages yet.</p>}
            {messages.map((contactMessage) => {
              const details = parseJson<Record<string, string>>(contactMessage.details, {});
              const attachments = parseJson<Array<{ filename: string; path: string }>>(contactMessage.attachments, []);
              return (
                <article key={contactMessage.id}>
                  <div>
                    <strong>{contactMessage.name} — {labelKind(contactMessage.kind)}</strong>
                    <p>{contactMessage.email} · {contactMessage.phone}{contactMessage.company ? ` · ${contactMessage.company}` : ''}</p>
                    {contactMessage.message && <p>{contactMessage.message}</p>}
                    {Object.keys(details).length > 0 && (
                      <dl className="admin-message-details">
                        {Object.entries(details).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}
                      </dl>
                    )}
                    {attachments.length > 0 && <p className="admin-message-files">{attachments.map((attachment) => <a key={attachment.path} href={attachment.path} target="_blank" rel="noreferrer">{attachment.filename}</a>)}</p>}
                    <small>{contactMessage.status} · {contactMessage.created_at}</small>
                  </div>
                  <div className="admin-row-actions">
                    {contactMessage.status === 'NEW' && <button className="admin-text-button" type="button" onClick={() => setMessageStatus(contactMessage.id, 'READ')}>Mark read</button>}
                    {contactMessage.status !== 'ARCHIVED' && <button className="admin-text-button" type="button" onClick={() => setMessageStatus(contactMessage.id, 'ARCHIVED')}>Archive</button>}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="admin-panel" aria-busy={loading} aria-label="Job applications">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Hiring</p>
            <h2>Job applications ({applications.length})</h2>
            <p className="admin-panel__lede">Review candidates and manage CV files without leaving the operations workspace.</p>
          </div>
        </div>
        {loading ? (
          <p className="admin-hint">Loading applications…</p>
        ) : (
          <div className="admin-service-list">
            {applications.length === 0 && <p className="admin-hint">No applications yet.</p>}
            {applications.map((application) => (
              <article key={application.id}>
                <div>
                  <strong>{application.name} — {application.desired_position}</strong>
                  <p>{application.email} · {application.phone} · {application.role_id}</p>
                  {application.message && <p>{application.message}</p>}
                  <small>{application.status} · {application.cv_filename} {application.cv_size_bytes ? `· ${Math.round(application.cv_size_bytes / 1024)} KB` : ''} · {application.created_at}</small>
                </div>
                <div className="admin-row-actions">
                  {application.cv_path && <a className="admin-text-button" href={application.cv_path} target="_blank" rel="noreferrer">CV</a>}
                  {application.status === 'NEW' && <button className="admin-text-button" type="button" onClick={() => setApplicationStatus(application.id, 'REVIEWED')}>Mark reviewed</button>}
                  {application.status !== 'ARCHIVED' && <button className="admin-text-button" type="button" onClick={() => setApplicationStatus(application.id, 'ARCHIVED')}>Archive</button>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
