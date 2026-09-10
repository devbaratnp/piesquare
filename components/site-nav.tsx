'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryNav } from '@/data/site';

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <header className={`site-nav-shell ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <Link className="brand-lockup" href="/" aria-label="Pie Square Technologies home">
        <span className="brand-lockup__mark" aria-hidden="true"><i /><i /><i /></span>
        <span className="brand-lockup__type"><b>PIE SQUARE</b><small>TECHNOLOGIES</small></span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNav.map((item) => {
          const active = isActive(item.href);
          return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href} data-cursor="view">{item.label}</Link>;
        })}
      </nav>

      <Link className="nav-project-link" href="/contact" data-cursor="start">
        <span>Discuss a Project</span><b aria-hidden="true">↗</b>
      </Link>

      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true" />
      </button>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        <p className="mono-label">Navigation / 00—06</p>
        <nav aria-label="Mobile navigation">
          {primaryNav.map((item, index) => {
            const active = isActive(item.href);
            return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>;
          })}
          <Link href="/contact" onClick={() => setOpen(false)}><span>07</span>Discuss a Project</Link>
        </nav>
      </div>
    </header>
  );
}
