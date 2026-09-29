import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('projects page', () => {
  it('presents the reference portfolio structure without the stats grid', async () => {
    render(await Page());

    expect(screen.getByRole('heading', { level: 1, name: 'Our Projects' })).toBeInTheDocument();
    expect(screen.getByText(/field experience that speaks for itself/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /filter projects/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.project-card')).toHaveLength(14);
    expect(document.querySelector('.inner-page__grid')).not.toBeInTheDocument();
    expect(screen.queryByText('2,240+ KM')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /rf drive test & network optimization/i })).toHaveAttribute('href', expect.stringContaining('/projects/'));
    expect(screen.getByRole('link', { name: /telecom tower & site infrastructure works/i })).toHaveAttribute('href', expect.stringContaining('telecom-tower-site-infrastructure-works'));
    expect(screen.getByRole('link', { name: /telecom equipment installation & commissioning/i })).toHaveAttribute('href', expect.stringContaining('telecom-equipment-installation-commissioning'));
    expect(document.querySelector('.inner-page__actions')).not.toBeInTheDocument();
  });
});
