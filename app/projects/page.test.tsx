import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('projects page', () => {
  it('presents the reference portfolio structure and verified proof metrics', () => {
    render(<Page />);

    expect(screen.getByRole('heading', { level: 1, name: 'Our Projects' })).toBeInTheDocument();
    expect(screen.getByText(/field experience that speaks for itself/i)).toBeInTheDocument();
    expect(document.querySelectorAll('.project-card')).toHaveLength(8);
    expect(screen.getByText('2240+ KM')).toBeInTheDocument();
  });
});
