'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ADMIN_NAV, type AdminNavKey } from '../lib/admin-nav';

type AdminShellProps = {
  active: AdminNavKey;
  kicker: string;
  title: string;
  lede: string;
  configured: boolean | null;
  children: React.ReactNode;
};

export function AdminShell({ active, kicker, title, lede, configured, children }: AdminShellProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<Element | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    panelRef.current?.querySelector('a')?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
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
      document.body.style.overflow = '';
      if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus();
    };
  }, [open ]);

  useEffect(() => {
    if (window.innerWidth > 860) return;
    const media = window.matchMedia('(min-width: 861px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin/login');
  }

  return (
    <div className="admin-shell">
      <a className="admin-skip-link" href="#admin-content">Skip to content</a>
      <div className="admin-topbar">
        <Link className="admin-brand" href="/">Pie Square <span>Content studio</span></Link>
        <button
          ref={toggleRef}
          className="admin-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="admin-drawer"
          aria-label={open ? 'Close admin menu' : 'Open admin menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/">Pie Square <span>Content studio</span></Link>
        <nav aria-label="Admin navigation">
          {ADMIN_NAV.map((item) => (
            <Link key={item.key} className={item.key === active ? 'is-active' : undefined} aria-current={item.key === active ? 'page' : undefined} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/projects">View public site</Link>
        </nav>
        <button className="admin-logout" type="button" onClick={logout}>Log out</button>
      </aside>
      <div className="admin-backdrop" data-open={open} aria-hidden="true" onClick={close} />
      <div ref={panelRef} id="admin-drawer" className="admin-drawer" data-open={open} role="dialog" aria-modal="true" aria-label="Admin navigation" aria-hidden={!open}>
        <div className="admin-drawer__head">
          <span className="admin-brand">Pie Square <span>Content studio</span></span>
          <button className="admin-menu-button" type="button" aria-label="Close admin menu" onClick={close}>✕</button>
        </div>
        <nav aria-label="Admin navigation">
          {ADMIN_NAV.map((item) => (
            <Link key={item.key} className={item.key === active ? 'is-active' : undefined} aria-current={item.key === active ? 'page' : undefined} href={item.href} onClick={close} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
          <Link href="/projects" onClick={close} tabIndex={open ? 0 : -1}>View public site</Link>
        </nav>
        <button className="admin-logout" type="button" onClick={logout} tabIndex={open ? 0 : -1}>Log out</button>
      </div>
      <main className="admin-main" id="admin-content" tabIndex={-1}>
        <header className="admin-header">
          <div>
            <p className="admin-kicker">{kicker}</p>
            <h1>{title}</h1>
            <p>{lede}</p>
          </div>
          <div className="admin-status">
            <span className={configured ? 'is-ready' : 'is-warning'}>{configured === null ? 'Checking database…' : configured ? 'MySQL connected' : 'Database setup required'}</span>
            <span>Admin session active</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
