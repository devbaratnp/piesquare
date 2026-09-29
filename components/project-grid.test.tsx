import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { projects } from '@/data/site';
import { ProjectGrid } from './project-grid';

afterEach(() => cleanup());

describe('ProjectGrid', () => {
  it('renders the full portfolio with category filters', () => {
    render(<ProjectGrid />);

    const filters = screen.getByRole('group', { name: /filter projects/i });
    expect(within(filters).getAllByRole('button').map((button) => button.textContent)).toEqual(['All', 'Telecom', 'Fiber', 'Solar', 'IT']);
    expect(within(filters).getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(filters).getByText('14 projects / All')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getAllByRole('article')).toHaveLength(14);
  });

  it('filters cards and updates the active state and count', () => {
    render(<ProjectGrid />);

    fireEvent.click(screen.getByRole('button', { name: 'Fiber' }));
    expect(screen.getByRole('button', { name: 'Fiber' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('3 projects / Fiber')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(document.querySelectorAll('.project-card[data-category="FIBER"]')).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByRole('article')).toHaveLength(14);
    expect(screen.getByText('14 projects / All')).toBeInTheDocument();
  });

  it('uses the supplied CMS project list and gives empty categories a useful state', () => {
    render(<ProjectGrid projects={projects.slice(0, 2)} />);
    fireEvent.click(screen.getByRole('button', { name: 'Solar' }));
    expect(screen.getByText('0 projects / Solar')).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
    expect(screen.getByText('No projects in this category yet.')).toBeInTheDocument();
  });

  it('renders project proof fields for every visible record', () => {
    render(<ProjectGrid />);

    for (const label of ['COMPLETED', 'ONGOING', 'FIBER', 'TELECOM', 'SOLAR', 'IT', 'Fiber Network Deployment & ODN Implementation']) {
      expect(document.body.textContent).toContain(label);
    }
    expect(document.body.textContent).toContain('Route Survey');
  });
});
