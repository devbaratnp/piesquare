import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('company page', () => {
  it('renders the approved About Us structure and content', async () => {
    render(await Page());

    expect(document.querySelector('.inner-page--company')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /the field force behind critical infrastructure/i })).toBeInTheDocument();
    expect(screen.getByText('WHO WE ARE')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /an engineering company built for the field/i })).toBeInTheDocument();
    expect(screen.getByText(/our strength lies in bringing multi-disciplinary expertise in telecom, fiber optics, solar energy, and it infrastructure under one roof/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /building the infrastructure that connects, powers and enables nepal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /integrated solutions\. reliable delivery/i })).toBeInTheDocument();
    expect(screen.getByText(/to deliver integrated infrastructure and technology solutions with quality, safety and accountability/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /engineered with precision\. delivered with discipline/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.about-approach li strong')).toHaveLength(4);
    expect(screen.getByText(/all seven provinces/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /multidisciplinary expertise\. experienced delivery team/i })).toBeInTheDocument();
    expect(document.querySelectorAll('.about-team .workforce-list strong')).toHaveLength(7);
    expect(screen.queryByText(/named team profiles will be added/i)).not.toBeInTheDocument();
    expect(screen.getByText('INDUSTRIES WE SUPPORT')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { name: /telecommunications/i }).length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.about-industries article')).toHaveLength(7);
    expect([...document.querySelectorAll('.about-industries, .about-coverage')].map((section) => section.classList.contains('about-industries') ? 'about-industries' : 'about-coverage')).toEqual(['about-industries', 'about-coverage']);
    expect(screen.queryByText(/signal editorial|route brief/i)).not.toBeInTheDocument();
    expect(document.querySelector('.inner-page__actions')).not.toBeInTheDocument();
    for (const value of ['Integrity', 'Safety', 'Quality', 'Accountability', 'Innovation', 'Customer Focus']) {
      expect(screen.getByRole('heading', { name: value })).toBeInTheDocument();
    }
  });
});
