import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('capabilities page', () => {
  it('organizes the four service divisions and verified metrics', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: /built to execute/i })).toBeInTheDocument();
    expect(screen.getByText(/four divisions\. one delivery standard/i)).toBeInTheDocument();
    expect(document.querySelectorAll('.service-overview-card')).toHaveLength(4);
    for (const label of ['Telecom', 'Fiber', 'Solar & Electrical', 'IT Solutions']) {
      expect(Array.from(document.querySelectorAll('.service-overview-card h2')).some((heading) => heading.textContent === label)).toBe(true);
    }
    expect(screen.getByText('3500+')).toBeInTheDocument();
    expect(screen.getByText('400 kW')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /delivery capabilities/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.delivery-capability-card')).toHaveLength(6);
  });
});
