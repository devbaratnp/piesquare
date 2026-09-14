'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryNav, serviceNav } from '@/data/site';
import { DiscussProjectButton } from '@/components/discuss-project-button';

type SiteNavProps = Readonly<{
  tone?: 'dark' | 'paper';
}>;

export function SiteNav({ tone = 'dark' }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname() ?? '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, servicesOpen]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
  const serviceIsActive = serviceNav.some((item) => isActive(item.href));
  const closeMenus = () => {
    setOpen(false);
    setServicesOpen(false);
  };
  const renderPrimaryLink = (item: (typeof primaryNav)[number]) => {
    const active = isActive(item.href);
    return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href} data-cursor="view">{item.label}</Link>;
  };

  return (
    <header className={`site-nav-shell ${tone === 'paper' ? 'site-nav-shell--paper' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <Link className="brand-lockup" href="/" aria-label="Pie Square Technologies home">
        <span className="brand-lockup__mark" aria-hidden="true"><i /><i /><i /></span>
        <span className="brand-lockup__type"><b>PIE SQUARE</b><small>TECHNOLOGIES</small></span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {primaryNav.slice(0, 2).map(renderPrimaryLink)}
        <div className="nav-services">
          <button
            className={`nav-services__trigger ${serviceIsActive ? 'is-active' : ''}`}
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="services-menu-desktop"
            onClick={() => setServicesOpen((value) => !value)}
          >
            Services <span aria-hidden="true">⌄</span>
          </button>
          <div id="services-menu-desktop" className={`nav-services__menu ${servicesOpen ? 'is-open' : ''}`} hidden={!servicesOpen}>
            {serviceNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setServicesOpen(false)}>{item.label}</Link>
            ))}
          </div>
        </div>
        {primaryNav.slice(2).map(renderPrimaryLink)}
      </nav>

      <DiscussProjectButton className="nav-project-link" dataCursor="start">
        <span>Request a Quote</span><b aria-hidden="true">↗</b>
      </DiscussProjectButton>

      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span>{open ? 'Close' : 'Menu'}</span><i aria-hidden="true" />
      </button>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {primaryNav.slice(0, 2).map((item) => {
            const active = isActive(item.href);
            return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href} onClick={closeMenus}>{item.label}</Link>;
          })}
          <div className="mobile-menu__services">
            <button
              className={`mobile-menu__services-trigger ${serviceIsActive ? 'is-active' : ''}`}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu-mobile"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services <b aria-hidden="true">⌄</b>
            </button>
            <div id="services-menu-mobile" className="mobile-menu__services-list" hidden={!servicesOpen}>
              {serviceNav.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenus}>{item.label}</Link>
              ))}
            </div>
          </div>
          {primaryNav.slice(2).map((item) => {
            const active = isActive(item.href);
            return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href} onClick={closeMenus}>{item.label}</Link>;
          })}
          <DiscussProjectButton className="mobile-menu__project" dataCursor="start" onOpen={closeMenus}>Request a Quote</DiscussProjectButton>
        </nav>
      </div>
    </header>
  );
}
