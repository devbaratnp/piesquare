import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProjectGrid } from './project-grid';

describe('ProjectGrid', () => {
  it('renders filter controls and field-proof cards', () => {
    render(<ProjectGrid />);

    expect(screen.getByRole('group', { name: /filter projects/i })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(6);
  });
});
