import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFound from './not-found';

describe('not found page', () => {
  it('provides branded navigation back into the site', () => {
    render(<NotFound />);

    expect(screen.getByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: /^contact/i }).some((link) => link.getAttribute('href') === '/contact')).toBe(true);
  });
});
