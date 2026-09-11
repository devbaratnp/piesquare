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

  it('closes the mobile menu with Escape', () => {
    render(<SiteNav />);
    const button = screen.getByRole('button', { name: /menu/i });

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens the project inquiry form in an in-page dialog', () => {
    render(<SiteNav />);

    fireEvent.click(screen.getByRole('button', { name: /discuss a project/i }));

    expect(screen.getByRole('dialog', { name: /discuss a project/i })).toBeInTheDocument();
    expect(screen.getByRole('form', { name: /project inquiry/i })).toBeInTheDocument();
  });

  it('closes the project inquiry dialog with Escape', () => {
    render(<SiteNav />);

    fireEvent.click(screen.getByRole('button', { name: /discuss a project/i }));
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: /discuss a project/i })).not.toBeInTheDocument();
  });
});
