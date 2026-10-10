'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AdminNotice, adminFetch } from './admin-shared';

type Media = { id: number; filename: string; storage_path: string; mime_type: string; size_bytes: number; alt_text: string | null; created_at: string };

export function AdminMedia({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [media, setMedia] = useState<Media[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaAlt, setMediaAlt] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const [mediaResult, contentResult] = await Promise.all([
      adminFetch('/api/admin/media'),
      adminFetch('/api/admin/content'),
    ]);
    if (!mediaResult.ok) {
      setError('Your session has expired. Sign in again.');
      onConfigured(null);
      return;
    }
    setMedia((mediaResult.payload.media ?? []) as Media[]);
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

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mediaFile) {
      setError('Choose an image first.');
      return;
    }
    if (pending) return;
    setMessage('');
    setError('');
    setPending(true);
    try {
      const form = new FormData();
      form.set('file', mediaFile);
      form.set('altText', mediaAlt);
      const response = await fetch('/api/admin/media', { method: 'POST', body: form });
      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string };
        setError(payload.message ?? 'Image could not be uploaded.');
        return;
      }
      setMediaFile(null);
      setMediaAlt('');
      (event.target as HTMLFormElement).reset();
      setMessage('Image uploaded.');
      await load();
    } catch {
      setError('Network request failed.');
    } finally {
      setPending(false);
    }
  }

  async function remove(id: number) {
    setMessage('');
    setError('');
    const response = await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    if (!response.ok) {
      setError('Image could not be removed.');
      return;
    }
    setMessage('Image removed.');
    await load();
  }

  return (
    <>
      <AdminNotice message={message} error={error} />
      <section className="admin-panel" aria-busy={loading} aria-label="Media library">
        <div className="admin-panel__heading">
          <div>
            <p className="admin-kicker">Assets</p>
            <h2>Media library ({media.length})</h2>
          </div>
        </div>
        <form className="admin-service-form" onSubmit={upload} aria-busy={pending}>
          <h3>Upload an image</h3>
          <label>Image<input required type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(event) => setMediaFile(event.target.files?.[0] ?? null)} /></label>
          <label>Alt text<input value={mediaAlt} onChange={(event) => setMediaAlt(event.target.value)} placeholder="Describe the image for screen readers" /></label>
          <button className="button button--dark" type="submit" disabled={pending}>{pending ? 'Uploading…' : 'Upload image'}</button>
        </form>
        {loading ? (
          <p className="admin-hint">Loading media…</p>
        ) : media.length === 0 ? (
          <p className="admin-hint">No images yet.</p>
        ) : (
          <div className="admin-media-grid">
            {media.map((item) => (
              <article key={item.id}>
                <Image src={item.storage_path} alt={item.alt_text ?? item.filename} width={320} height={240} />
                <div>
                  <strong>{item.filename}</strong>
                  <small>{Math.round(item.size_bytes / 1024)} KB</small>
                  <button className="admin-text-button" type="button" onClick={() => remove(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
