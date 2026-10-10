'use client';

import { useCallback, useEffect, useState } from 'react';
import { AdminNotice, adminFetch } from './admin-shared';

type JobApplication = { id: number; role_id: string; name: string; phone: string; email: string; desired_position: string; message: string | null; cv_filename: string | null; cv_path: string | null; cv_size_bytes: number | null; status: string; created_at: string };

export function AdminApplications({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [applicationsResult, contentResult] = await Promise.all([
      adminFetch('/api/admin/applications'),
      adminFetch('/api/admin/content'),
    ]);
    if (!applicationsResult.ok) {
      setError('Your session has expired. Sign in again.');
      onConfigured(null);
      return;
    }
    setApplications((applicationsResult.payload.applications ?? []) as JobApplication[]);
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

  async function setStatus(id: number, status: string) {
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

  return (
    <>
      <AdminNotice message={message} error={error} />
      <section className="admin-panel" aria-busy={loading} aria-label="Job applications">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Hiring</p>
            <h2>Job applications ({applications.length})</h2>
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
                  <p>{application.message}</p>
                  <small>{application.status} · {application.cv_filename} {application.cv_size_bytes ? `· ${Math.round(application.cv_size_bytes / 1024)} KB` : ''} · {application.created_at}</small>
                </div>
                <div className="admin-row-actions">
                  {application.cv_path && <a className="admin-text-button" href={application.cv_path} target="_blank" rel="noreferrer">CV</a>}
                  {application.status === 'NEW' && <button className="admin-text-button" type="button" onClick={() => setStatus(application.id, 'REVIEWED')}>Mark reviewed</button>}
                  {application.status !== 'ARCHIVED' && <button className="admin-text-button" type="button" onClick={() => setStatus(application.id, 'ARCHIVED')}>Archive</button>}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
