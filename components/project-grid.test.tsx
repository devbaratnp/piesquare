import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProjectGrid } from './project-grid';

afterEach(() => cleanup());

describe('ProjectGrid', () => {
  it('renders the full portfolio without filter controls', () => {
    render(<ProjectGrid />);

    expect(screen.queryByRole('group', { name: /filter projects/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(14);
  });

  it('renders project proof fields for every visible record', () => {
    render(<ProjectGrid />);

    for (const label of ['COMPLETED', 'ONGOING', 'FIBER', 'TELECOM', 'SOLAR', 'IT', 'Fiber Network Deployment & ODN Implementation']) {
      expect(document.body.textContent).toContain(label);
    }
    expect(document.body.textContent).toContain('Route Survey');
  });
});
