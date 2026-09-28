import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ServiceDetail } from './service-detail';

afterEach(cleanup);

describe('ServiceDetail', () => {
  it('renders lifecycle and scope without proof or CTA blocks', () => {
    render(
      <ServiceDetail
        capabilities={[{ number: '01', title: 'Survey', copy: 'Field survey copy.' }]}
        lifecycle={['Survey', 'Deploy']}
        scope={['Fiber']}
        relatedProjects={[]}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Survey' })).toBeInTheDocument();
    expect(screen.getByText('Field survey copy.')).toBeInTheDocument();
    expect(screen.getByText('Fiber')).toBeInTheDocument();
    expect(screen.queryByText('Supported proof statement.')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /request a quote/i })).not.toBeInTheDocument();
  });

  it('does not render empty lifecycle or scope shells', () => {
    render(<ServiceDetail capabilities={[]} lifecycle={[]} scope={[]} relatedProjects={[]} />);

    expect(screen.queryByRole('region', { name: /delivery lifecycle/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /technical scope/i })).not.toBeInTheDocument();
    expect(screen.getByText(/no related projects are listed/i)).toBeInTheDocument();
  });
});
