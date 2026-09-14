import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CareersList } from './careers-list';

describe('CareersList', () => {
  it('renders role details, requirements, and draft-only application links', () => {
    render(<CareersList />);

    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByRole('heading', { name: /telecom tower rigger/i })).toBeInTheDocument();
    expect(screen.getByText(/work-at-height certification preferred/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /apply now/i })).toHaveLength(6);
    expect(screen.getAllByRole('link', { name: /apply now/i })[0]).toHaveAttribute('href', expect.stringContaining('mailto:'));
  });
});
