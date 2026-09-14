import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('certifications page', () => {
  it('shows every compliance record without fake certificate links', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: /certifications & compliance/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(7);
    expect(screen.getAllByText(/document pending verification/i)).toHaveLength(7);
    expect(screen.queryByRole('link', { name: /view certificate/i })).not.toBeInTheDocument();
  });
});
