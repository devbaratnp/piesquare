import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('company page', () => {
  it('explains the field organization and delivery approach', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: /the field force behind critical infrastructure/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /an engineering company built for the field/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /engineered with precision\. delivered with discipline/i })).toBeInTheDocument();
    expect(screen.getByText(/all seven provinces/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /multidisciplinary expertise\. experienced delivery team/i })).toBeInTheDocument();
    expect(screen.queryByText(/named team profiles will be added/i)).not.toBeInTheDocument();
    expect(screen.getByText(/industries we support/i)).toBeInTheDocument();
    for (const value of ['Integrity', 'Safety', 'Quality', 'Accountability', 'Innovation', 'Customer Focus']) {
      expect(screen.getByRole('heading', { name: value })).toBeInTheDocument();
    }
  });
});
