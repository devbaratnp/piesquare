import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from './page';

describe('capabilities page', () => {
  it('organizes the four service divisions, verified metrics, and workforce', async () => {
    render(await Page());

    expect(screen.getByRole('heading', { level: 1, name: /built to execute/i })).toBeInTheDocument();
    expect(document.querySelector('.inner-page__eyebrow')).toHaveTextContent(/^capabilities$/i);
    expect(screen.getByText(/four divisions\. one delivery standard/i)).toBeInTheDocument();
    expect(document.querySelectorAll('.service-overview-card')).toHaveLength(4);
    for (const label of ['Telecom', 'Fiber', 'Solar & Electrical', 'IT Solutions']) {
      expect(Array.from(document.querySelectorAll('.service-overview-card h2')).some((heading) => heading.textContent === label)).toBe(true);
    }
    expect(screen.getByText('PROVEN DELIVERY')).toBeInTheDocument();
    expect(screen.getByText('3500+')).toBeInTheDocument();
    expect(screen.getByText('400 kW')).toBeInTheDocument();
    expect(document.querySelectorAll('.capability-metrics__grid .metric-label--highlight')).toHaveLength(5);
    expect(screen.getByRole('heading', { name: /trained\. certified\. field-ready/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.capability-metrics__grid .metric-label')).toHaveLength(5);
    expect(screen.queryByText(/^certifications$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /delivery capabilities/i })).toHaveClass('delivery-capabilities__title');
    expect(document.querySelectorAll('.delivery-capability-card')).toHaveLength(6);
    expect(screen.getByText('EQUIPMENT & RESOURCES')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /technical resources/i })).toBeInTheDocument();
    expect(screen.getByText(/the tools, technology and field resources behind our project delivery/i)).toBeInTheDocument();
    expect(document.querySelectorAll('.technical-resources__card')).toHaveLength(4);
    expect(screen.getByText('Fiber Splicing Tool Kit')).toBeInTheDocument();
    expect(screen.queryByText('Fiber Blowing Equipment')).not.toBeInTheDocument();
    expect(document.querySelectorAll('.technical-resources__card li')).toHaveLength(14);
    expect(screen.queryByText(/view capability details/i)).not.toBeInTheDocument();
    expect(document.querySelector('.inner-page__actions')).not.toBeInTheDocument();
  });
});
