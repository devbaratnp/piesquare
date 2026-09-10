import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InnerPage } from './inner-page';

describe('InnerPage', () => {
  it('renders one h1, CTA links, and footer navigation', () => {
    render(
      <InnerPage eyebrow="Test" title="Test page title" lede="Supporting copy.">
        <p>Body</p>
      </InnerPage>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Test page title' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: /discuss a project/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('navigation', { name: /footer/i })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });
});
