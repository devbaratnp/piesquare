import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InnerPage } from './inner-page';

describe('InnerPage', () => {
  it('renders one h1, CTA buttons, and footer navigation', () => {
    render(
      <InnerPage
        eyebrow="Test"
        title="Test page title"
        lede="Supporting copy."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Test', href: '/test' }]}
      >
        <p>Body</p>
      </InnerPage>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Test page title' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /request a quote/i }).some((link) => link.getAttribute('href') === '/contact#quote')).toBe(true);
    expect(screen.getByRole('navigation', { name: /footer/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Test' })).toHaveAttribute('href', '/test');
    expect(screen.getByRole('heading', { name: 'SERVICES' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'COMPANY' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'RESOURCES' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'CONTACT' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});
