import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SiteNav } from './site-nav';

vi.mock('next/navigation', () => ({
  usePathname: () => '/capabilities/telecom',
}));

afterEach(() => cleanup());

describe('SiteNav', () => {
  it('marks the current route in desktop and mobile navigation', () => {
    render(<SiteNav />);

    expect(document.querySelector('.desktop-nav a[href="/capabilities"]')).toHaveAttribute('aria-current', 'page');
    expect(document.querySelector('#mobile-menu a[href="/capabilities"]')).toHaveAttribute('aria-current', 'page');
  });

  it('exposes the reference navigation destinations and services menu', () => {
    render(<SiteNav />);

    for (const label of ['Home', 'About Us', 'Projects', 'Capabilities', 'Careers', 'Contact']) {
      expect(screen.getAllByRole('link', { name: new RegExp(`^${label}$`, 'i') }).length).toBeGreaterThan(0);
    }
    expect(screen.getAllByRole('button', { name: /services/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /request a quote/i }).length).toBeGreaterThan(0);
  });

  it('opens and closes the services menu with keyboard interaction', () => {
    render(<SiteNav />);
    const services = screen.getAllByRole('button', { name: /services/i })[0];

    fireEvent.click(services);
    expect(services).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('link', { name: /telecom/i }).length).toBeGreaterThan(0);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(services).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu with Escape', () => {
    render(<SiteNav />);
    const button = screen.getByRole('button', { name: /menu/i });

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('links the quote CTA to the presentation-only quote form', () => {
    render(<SiteNav />);

    expect(screen.getAllByRole('link', { name: /request a quote/i })[0]).toHaveAttribute('href', '/contact#quote');
  });
});
