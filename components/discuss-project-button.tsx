'use client';

import { createPortal } from 'react-dom';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { ContactForm } from '@/components/contact-form';
import { siteContact } from '@/data/site';

type DiscussProjectButtonProps = Readonly<{
  className?: string;
  children?: ReactNode;
  dataCursor?: string;
  onOpen?: () => void;
}>;

export function DiscussProjectButton({
  className = 'button button--primary',
  children = 'Discuss a Project ↗',
  dataCursor = 'start',
  onOpen,
}: DiscussProjectButtonProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const dialogId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [open]);

  const trigger = (
    <button
      ref={triggerRef}
      className={className}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={dialogId}
      data-cursor={dataCursor}
      onClick={() => {
        setOpen(true);
        onOpen?.();
      }}
    >
      {children}
    </button>
  );

  if (!open || typeof document === 'undefined') return trigger;

  return (
    <>
      {trigger}
      {createPortal(
        <div
          className="contact-dialog"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="contact-dialog__panel" id={dialogId} role="dialog" aria-modal="true" aria-label="Discuss a project">
            <div className="contact-dialog__header">
              <div>
                <p className="eyebrow eyebrow--red">Project intake / direct line</p>
                <h2 id={titleId}>Discuss a project</h2>
                <p>Tell us what you are building, where it is located, and the infrastructure layer you need next.</p>
              </div>
              <button ref={closeRef} className="contact-dialog__close" type="button" aria-label="Close project inquiry" onClick={() => setOpen(false)}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="contact-dialog__direct">
              <span>Prefer a direct line?</span>
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
              <a href={siteContact.phoneHref}>{siteContact.phone}</a>
            </div>
            <ContactForm />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
