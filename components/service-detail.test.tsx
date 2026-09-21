import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ServiceDetail } from './service-detail';

afterEach(cleanup);

describe('ServiceDetail', () => {
  it('renders lifecycle, scope, proof, and CTA button', () => {
    render(
      <ServiceDetail
        capabilities={[{ number: '01', title: 'Survey', copy: 'Field survey copy.' }]}
        lifecycle={['Survey', 'Deploy']}
        scope={['Fiber']}
        proof="Supported proof statement."
        relatedProjects={[]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Survey' })).toBeInTheDocument();
    expect(screen.getByText('Field survey copy.')).toBeInTheDocument();
    expect(screen.getByText('Fiber')).toBeInTheDocument();
    expect(screen.getByText('Supported proof statement.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /request a quote/i })).toHaveAttribute('href', '/contact#quote');
  });

  it('does not render empty lifecycle or scope shells', () => {
    render(<ServiceDetail capabilities={[]} lifecycle={[]} scope={[]} proof="Supported proof statement." relatedProjects={[]} />);

    expect(screen.queryByRole('region', { name: /delivery lifecycle/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /technical scope/i })).not.toBeInTheDocument();
    expect(screen.getByText(/no related projects are listed/i)).toBeInTheDocument();
  });
});
