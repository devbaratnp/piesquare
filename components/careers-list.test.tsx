import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CareersList } from './careers-list';

describe('CareersList', () => {
  it('renders role details, requirements, and draft-only application links', () => {
    render(<CareersList />);

    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /rf drive test engineer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /rf data analyst/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /rf technician \/ rigger/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /general application/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/desired position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByText(/conduct rf drive tests and collect network performance data/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /apply now/i })).toHaveLength(3);
    expect(screen.getAllByRole('link', { name: /apply now/i })[0]).toHaveAttribute('href', expect.stringContaining('mailto:'));
  });
});
