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
  const activeItem = ADMIN_NAV.find((item) => item.key === active) ?? ADMIN_NAV[0];
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
        <div className="admin-topbar__context">
          <Link className="admin-topbar__brand" href="/" aria-label="Open public site">PS</Link>
          <span className="admin-topbar__crumb">Operations</span>
          <span className="admin-topbar__slash">/</span>
          <strong>{activeItem.label}</strong>
        </div>
        <div className="admin-topbar__meta">
          <span className="admin-pulse" aria-hidden="true" />
          <span>{configured ? 'Live database' : configured === false ? 'Setup required' : 'Checking status'}</span>
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
      </div>
      <aside className="admin-sidebar">
        <div className="admin-sidebar__masthead">
          <Link className="admin-brand" href="/" aria-label="Pie Square public site">
            <span className="admin-brand__mark">PS</span>
            <span><strong>Pie Square</strong><small>Content studio</small></span>
          </Link>
          <span className="admin-mode">Operations</span>
        </div>
        <p className="admin-sidebar__label">Workspace</p>
        <nav aria-label="Admin navigation">
          {ADMIN_NAV.map((item, index) => (
            <Link key={item.key} className={item.key === active ? 'is-active' : undefined} aria-current={item.key === active ? 'page' : undefined} href={item.href}>
              <span className="admin-nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="admin-nav-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
            </Link>
          ))}
          <Link href="/projects">View public site</Link>
        </nav>
        <div className="admin-sidebar__footer">
          <p><span className="admin-pulse" aria-hidden="true" />Single operator</p>
          <button className="admin-logout" type="button" onClick={logout}>Log out</button>
        </div>
      </aside>
      <div className="admin-backdrop" data-open={open} aria-hidden="true" onClick={close} />
      <div ref={panelRef} id="admin-drawer" className="admin-drawer" data-open={open} role="dialog" aria-modal="true" aria-label="Admin navigation" aria-hidden={!open}>
        <div className="admin-drawer__head">
          <span className="admin-brand"><span className="admin-brand__mark">PS</span><span><strong>Pie Square</strong><small>Operations</small></span></span>
          <button className="admin-menu-button" type="button" aria-label="Close admin menu" onClick={close}>✕</button>
        </div>
        <nav aria-label="Admin navigation">
          {ADMIN_NAV.map((item, index) => (
            <Link key={item.key} className={item.key === active ? 'is-active' : undefined} aria-current={item.key === active ? 'page' : undefined} href={item.href} onClick={close} tabIndex={open ? 0 : -1}>
              <span className="admin-nav-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="admin-nav-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
            </Link>
          ))}
          <Link href="/projects" onClick={close} tabIndex={open ? 0 : -1}>View public site</Link>
        </nav>
        <button className="admin-logout" type="button" onClick={logout} tabIndex={open ? 0 : -1}>Log out</button>
      </div>
      <main className="admin-main" id="admin-content" tabIndex={-1}>
        <header className="admin-header">
          <div className="admin-header__copy">
            <p className="admin-kicker">{kicker}</p>
            <h1>{title}</h1>
            <p>{lede}</p>
          </div>
          <div className="admin-header__signal">
            <span className="admin-header__signal-label">Current workspace</span>
            <strong>{activeItem.label}</strong>
            <span className={configured ? 'admin-status is-ready' : 'admin-status is-warning'}>{configured === null ? 'Checking database…' : configured ? 'MySQL connected' : 'Database setup required'}</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
