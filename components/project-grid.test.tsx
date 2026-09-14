import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProjectGrid } from './project-grid';

afterEach(() => cleanup());

describe('ProjectGrid', () => {
  it('renders filter controls and field-proof cards', () => {
    render(<ProjectGrid />);

    expect(screen.getByRole('group', { name: /filter projects/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(8);
    for (const filter of ['All', 'Telecom', 'Fiber', 'Solar', 'IT']) {
      expect(screen.getByRole('button', { name: filter, exact: true })).toBeInTheDocument();
    }
  });

  it('filters reference project records by category', async () => {
    const { getByRole, getAllByRole } = render(<ProjectGrid />);

    fireEvent.click(getByRole('button', { name: 'Fiber', exact: true }));
    expect(getAllByRole('article')).toHaveLength(2);
    fireEvent.click(getByRole('button', { name: 'IT', exact: true }));
    expect(getAllByRole('article')).toHaveLength(2);
  });

  it('renders project proof fields for every visible record', () => {
    render(<ProjectGrid />);

    for (const label of ['COMPLETED', 'ONGOING', 'FIBER', 'TELECOM', 'SOLAR', 'IT', 'National Backbone Fiber Deployment']) {
      expect(document.body.textContent).toContain(label);
    }
    expect(document.body.textContent).toContain('Route Survey');
  });
});
