import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProvenMetrics } from './proven-metrics';

afterEach(() => cleanup());

describe('ProvenMetrics', () => {
  it('renders the shared verified-metrics block with all five stats', () => {
    render(<ProvenMetrics />);

    expect(screen.getByText('PROVEN DELIVERY')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /verified field metrics/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.impact-stat')).toHaveLength(5);
    for (const value of ['3500+', '115', '4', '2,240+ KM', '400 kW']) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });
});
