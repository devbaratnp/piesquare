'use client';

import { useEffect, useRef } from 'react';

export function AdminNotice({ message, error }: { message: string; error: string }) {
  if (!message && !error) return null;
  if (error) {
    return (
      <p className="admin-toast admin-toast--error" role="alert">
        {error} Try again — nothing you typed was lost.
      </p>
    );
  }
  return (
    <p className="admin-toast" role="status">
      {message}
    </p>
  );
}

type AdminModalProps = {
  open: boolean;
  eyebrow: string;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function AdminModal({ open, eyebrow, title, description, onClose, children }: AdminModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = closeRef.current?.closest('[role="dialog"]');
      if (!(dialog instanceof HTMLElement)) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title" aria-describedby={description ? 'admin-modal-description' : undefined}>
        <header className="admin-modal__header">
          <div>
            <p className="admin-kicker">{eyebrow}</p>
            <h2 id="admin-modal-title">{title}</h2>
            {description && <p id="admin-modal-description">{description}</p>}
          </div>
          <button ref={closeRef} className="admin-modal__close" type="button" aria-label="Close dialog" onClick={onClose}>×</button>
        </header>
        <div className="admin-modal__body">{children}</div>
      </section>
    </div>
  );
}

/** Focus an editor heading after opening it; respects reduced motion for scrolling. */
export function focusEditor(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const heading = document.querySelector(`${id} h3`);
  if (heading instanceof HTMLElement) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

export async function adminFetch(input: string, init?: RequestInit): Promise<{ ok: boolean; payload: Record<string, unknown> }> {
  const response = await fetch(input, init);
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: response.ok, payload };
}
