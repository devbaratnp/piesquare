'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryNav, serviceNav } from '@/data/site';

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
    return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href}>{item.label}</Link>;
  };
  const renderServicesMenu = (id: string, className: string) => (
    <div id={id} className={className} hidden={!servicesOpen}>
      {serviceNav.map((item) => (
        <div className="nav-services__column" key={item.href}>
          <Link className="nav-services__heading" href={item.href} onClick={closeMenus}>
            <span className="nav-services__number">{item.number}</span>
            <span>{item.label}</span>
          </Link>
          <ul aria-label={`${item.label} scope`}>
            {item.scope.map((scope) => <li key={scope}>{scope}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <header className={`site-nav-shell ${tone === 'paper' ? 'site-nav-shell--paper' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <Link className="brand-lockup" href="/" aria-label="Pie Square Technologies home">
        <Image className="brand-lockup__logo" src="/media/logos/pie-square-logo-transparent.png" alt="Pie Square Technologies" width={252} height={125} priority />
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
          {renderServicesMenu('services-menu-desktop', `nav-services__menu ${servicesOpen ? 'is-open' : ''}`)}
        </div>
        {primaryNav.slice(2).map(renderPrimaryLink)}
      </nav>

      <Link className="nav-project-link" href="/contact#quote">
        <span>Request a Quote</span><b aria-hidden="true">↗</b>
      </Link>

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
            {renderServicesMenu('services-menu-mobile', 'mobile-menu__services-list')}
          </div>
          {primaryNav.slice(2).map((item) => {
            const active = isActive(item.href);
            return <Link key={item.href} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} href={item.href} onClick={closeMenus}>{item.label}</Link>;
          })}
          <Link className="mobile-menu__project" href="/contact#quote" onClick={closeMenus}>Request a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
