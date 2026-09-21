import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ProjectGrid } from './project-grid';

afterEach(() => cleanup());

describe('ProjectGrid', () => {
  it('renders filter controls and field-proof cards', () => {
    render(<ProjectGrid />);

    expect(screen.getByRole('group', { name: /filter projects/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(12);
    for (const filter of ['All', 'Telecom', 'Fiber', 'Solar', 'IT']) {
      expect(screen.getByRole('button', { name: filter })).toBeInTheDocument();
    }
  });

  it('filters reference project records by category', async () => {
    const { getByRole, getAllByRole } = render(<ProjectGrid />);

    fireEvent.click(getByRole('button', { name: 'Fiber' }));
    expect(getAllByRole('article')).toHaveLength(3);
    fireEvent.click(getByRole('button', { name: 'IT' }));
    expect(getAllByRole('article')).toHaveLength(3);
  });

  it('renders project proof fields for every visible record', () => {
    render(<ProjectGrid />);

    for (const label of ['COMPLETED', 'ONGOING', 'FIBER', 'TELECOM', 'SOLAR', 'IT', 'Fiber Network Deployment & ODN Implementation']) {
      expect(document.body.textContent).toContain(label);
    }
    expect(document.body.textContent).toContain('Route Survey');
  });
});
