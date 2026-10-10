import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AdminShell } from './admin-shell';
import { ADMIN_NAV } from '../lib/admin-nav';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: () => undefined }),
}));

afterEach(() => cleanup());

function renderShell() {
  return render(
    <AdminShell active="services" kicker="Capabilities" title="Services" lede="Manage services." configured={true}>
      <p>Module content</p>
    </AdminShell>,
  );
}

describe('AdminShell', () => {
  it('renders one h1 and marks the active route in sidebar and drawer', () => {
    renderShell();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    const actives = document.querySelectorAll('a[aria-current="page"]');
    expect(actives.length).toBeGreaterThanOrEqual(2);
    for (const link of Array.from(actives)) {
      expect(link.getAttribute('href')).toBe('/admin/services');
    }
  });

  it('shares one nav definition between sidebar and drawer with real routes', () => {
    renderShell();
    const labels = ADMIN_NAV.map((item) => item.label);
    expect(labels).toEqual(['Overview', 'Homepage', 'Services', 'Projects', 'Applications', 'Media']);
    for (const item of ADMIN_NAV) {
      const matches = document.querySelectorAll(`a[href="${item.href}"]`);
      expect(matches.length, `${item.label} resolves in both sidebar and drawer`).toBe(2);
    }
  });

  it('opens and closes the drawer with toggle and Escape', () => {
    renderShell();
    const toggle = screen.getByRole('button', { name: /admin menu/i });
    const drawer = document.getElementById('admin-drawer');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(drawer).toHaveAttribute('data-open', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(drawer).toHaveAttribute('data-open', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(drawer).toHaveAttribute('data-open', 'false');
  });

  it('keeps keyboard focus inside the open drawer', () => {
    renderShell();
    const toggle = screen.getByRole('button', { name: /admin menu/i });

    fireEvent.click(toggle);
    const drawer = document.getElementById('admin-drawer');
    const focusable = Array.from(drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    first.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('shows the database status without blocking content', () => {
    renderShell();
    expect(screen.getByText('MySQL connected')).toBeInTheDocument();
    expect(screen.getByText('Module content')).toBeInTheDocument();
  });
});
