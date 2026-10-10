'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AdminNotice, adminFetch } from './admin-shared';

type Media = { id: number; filename: string; storage_path: string; mime_type: string; size_bytes: number; alt_text: string | null; created_at: string };

export function AdminMedia({ onConfigured }: { onConfigured: (value: boolean | null) => void }) {
  const [media, setMedia] = useState<Media[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaAlt, setMediaAlt] = useState('');
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function selectFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Only image files can be added to the media library.');
      return;
    }
    setError('');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setMediaFile(file);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  }

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mediaFile) {
      setError('Choose or drop an image first.');
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
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
      setMediaAlt('');
      if (inputRef.current) inputRef.current.value = '';
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
            <p className="admin-panel__lede">Keep every visual in view, with alt text ready before it reaches a page.</p>
          </div>
        </div>
        <form className="admin-media-uploader" onSubmit={upload} aria-busy={pending}>
          <div
            className={`admin-dropzone ${dragging ? 'is-dragging' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                inputRef.current?.click();
              }
            }}
            onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
            onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            aria-label="Choose or drop an image"
          >
            <input ref={inputRef} className="admin-visually-hidden" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(event) => selectFile(event.target.files?.[0])} />
            {previewUrl ? (
              <div className="admin-dropzone__preview">
                <img src={previewUrl} alt="Selected upload preview" />
                <div><strong>{mediaFile?.name}</strong><span>Click or drop another image to replace it.</span></div>
              </div>
            ) : (
              <div className="admin-dropzone__prompt">
                <span className="admin-dropzone__icon" aria-hidden="true">↥</span>
                <strong>Drop an image here</strong>
                <span>or choose a file · JPG, PNG, WebP, GIF, AVIF</span>
              </div>
            )}
          </div>
          <div className="admin-media-uploader__controls">
            <label>Alt text<input value={mediaAlt} onChange={(event) => setMediaAlt(event.target.value)} placeholder="Describe the image for screen readers" /></label>
            <button className="admin-cta" type="submit" disabled={pending || !mediaFile}>{pending ? 'Uploading…' : 'Upload image'} <span aria-hidden="true">↗</span></button>
          </div>
        </form>
        {loading ? (
          <p className="admin-hint">Loading media…</p>
        ) : media.length === 0 ? (
          <div className="admin-empty-state">
            <strong>No images yet.</strong>
            <p>Drop your first project or brand image above. It will appear here immediately after upload.</p>
          </div>
        ) : (
          <div className="admin-media-grid">
            {media.map((item) => (
              <article className="admin-media-card" key={item.id}>
                <div className="admin-media-card__image">
                  <Image src={item.storage_path} alt={item.alt_text ?? item.filename} fill sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 240px" />
                </div>
                <div className="admin-media-card__details">
                  <strong title={item.filename}>{item.filename}</strong>
                  <span>{Math.max(1, Math.round(item.size_bytes / 1024))} KB · {item.mime_type.replace('image/', '')}</span>
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
