import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ServiceDetail } from './service-detail';

afterEach(cleanup);

describe('ServiceDetail', () => {
  it('renders lifecycle, scope, proof, and CTA button', () => {
    render(<ServiceDetail lifecycle={['Survey', 'Deploy']} scope={['Fiber']} proof="Supported proof statement." />);

    expect(screen.getByText('Survey')).toBeInTheDocument();
    expect(screen.getByText('Fiber')).toBeInTheDocument();
    expect(screen.getByText('Supported proof statement.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /discuss a project/i })).toBeInTheDocument();
  });

  it('does not render empty lifecycle or scope shells', () => {
    render(<ServiceDetail lifecycle={[]} scope={[]} proof="Supported proof statement." />);

    expect(screen.queryByRole('region', { name: /delivery lifecycle/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: /technical scope/i })).not.toBeInTheDocument();
  });
});
