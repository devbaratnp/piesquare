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
});
