import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('home page shell', () => {
  it('renders the main content and primary navigation', () => {
    render(<Page />);

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /building the infrastructure that keeps the world connected/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /our core capabilities/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /trusted by industry.*built for long-term partnerships/i })).toBeInTheDocument();
    expect(Array.from(document.querySelectorAll('main section[id]')).map((scene) => scene.id)).toEqual([
      'top', 'company', 'expertise', 'telecom', 'rf', 'fiber', 'energy', 'digital', 'impact', 'projects', 'clients', 'why', 'contact',
    ]);
    expect(document.querySelectorAll('main#main-content section[id]')).toHaveLength(13);
    const navigation = within(screen.getByRole('navigation', { name: /primary/i }));
    expect(navigation.getByRole('link', { name: /^capabilities$/i })).toBeInTheDocument();
    expect(navigation.getByRole('link', { name: /^projects$/i })).toBeInTheDocument();
    expect(navigation.getByRole('link', { name: /^contact$/i })).toBeInTheDocument();
  });

  it('locks the specified homepage hierarchy and copy', () => {
    render(<Page />);

    // Spec-locked headings
    expect(screen.getByRole('heading', { name: /infrastructure.*expertise\. field execution/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /from survey to signal/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /a network isn't finished when the tower goes live/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /connecting communities/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /powering the infrastructure behind connectivity/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /infrastructure doesn't end at the tower/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /one partner\. multiple infrastructure layers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /build the next connection with us/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /engineering discipline.*field-proven/i })).toBeInTheDocument();

    // Four capability labels with sequence counters
    for (const label of ['Telecom', 'Optical Fiber', 'Solar & Energy', 'IT & Digital']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(document.body.textContent).toMatch(/01 \/ 04/);

    // Seven telecom phases (active phase in text, all phases in frame alt text)
    const altTexts = Array.from(document.querySelectorAll('img')).map((img) => img.getAttribute('alt') ?? '');
    for (const phase of ['Site survey', 'Civil foundation', 'Tower erection', 'Equipment installation', 'Power and grounding', 'Commissioning', 'Optimization']) {
      const inText = screen.queryAllByText(new RegExp(phase, 'i')).length > 0;
      const inAlt = altTexts.some((alt) => alt.toLowerCase().includes(phase.toLowerCase()));
      expect(inText || inAlt).toBe(true);
    }

    // Supplied logo paths render (next/image rewrites src, so match the filename)
    const sources = Array.from(document.querySelectorAll('img')).map((img) => img.getAttribute('src') ?? '');
    for (const file of ['nepal-telecom.jpg', 'ncell.png', 'cg-net.png']) {
      expect(sources.some((src) => src.includes(file))).toBe(true);
    }

    // RF readouts labeled visualization-only with all four metrics
    expect(screen.getByText(/visualization only/i)).toBeInTheDocument();
    for (const metric of ['RSRP', 'SINR', 'RSRQ']) {
      expect(screen.getAllByText(new RegExp(metric, 'i')).length).toBeGreaterThan(0);
    }

    // Projects CTA
    expect(screen.getByRole('link', { name: /view all projects/i })).toBeInTheDocument();

    const anchors = ['top', 'company', 'expertise', 'telecom', 'rf', 'fiber', 'energy', 'digital', 'impact', 'projects', 'clients', 'why', 'contact'];
    for (const id of anchors) {
      expect(document.querySelector(`#${id}`)).toBeTruthy();
    }

    for (const href of ['/capabilities/telecom', '/capabilities/optical-fiber', '/capabilities/solar-energy', '/capabilities/it-solutions']) {
      expect(document.querySelector(`a[href="${href}"]`)).toBeTruthy();
    }

    for (const value of ['3500+', '115', '2240+ KM', '400 kW']) {
      expect(document.body.textContent).toContain(value);
    }
  });

  it('keeps the global navigation and conversion CTA', () => {
    render(<Page />);

    const navigation = within(screen.getByRole('navigation', { name: /primary/i }));
    for (const label of ['Home', 'About Us', 'Projects', 'Capabilities', 'Certifications', 'Careers', 'Contact']) {
      expect(navigation.getByRole('link', { name: new RegExp(`^${label}$`, 'i') })).toBeInTheDocument();
    }
    expect(navigation.getByRole('button', { name: /services/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /request a quote/i }).length).toBeGreaterThan(0);
  });

  it('opens directly on the first scene without the initializing screen', () => {
    render(<Page />);

    expect(document.querySelector('.loader')).not.toBeInTheDocument();
    expect(screen.queryByText(/system initializing/i)).not.toBeInTheDocument();
    expect(Array.from(document.querySelectorAll('main section[id]')).map((scene) => scene.id)).toEqual([
      'top', 'company', 'expertise', 'telecom', 'rf', 'fiber', 'energy', 'digital', 'impact', 'projects', 'clients', 'why', 'contact',
    ]);
  });
});
