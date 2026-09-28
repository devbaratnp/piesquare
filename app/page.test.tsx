import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Page from './page';

afterEach(() => cleanup());

describe('home page field atlas', () => {
  it('renders the new section sequence with one hero heading and working navigation', async () => {
    render(await Page());

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /building the infrastructure that keeps nepal connected/i })).toBeInTheDocument();
    expect(document.querySelectorAll('main h1')).toHaveLength(1);
    expect(Array.from(document.querySelectorAll('main section[id]')).map((scene) => scene.id)).toEqual([
      'top', 'company', 'expertise', 'process', 'impact', 'projects', 'industries', 'clients', 'why', 'profile', 'contact',
    ]);
    const navigation = within(screen.getByRole('navigation', { name: /primary/i }));
    for (const label of ['Home', 'About Us', 'Projects', 'Capabilities', 'Careers', 'Contact']) {
      expect(navigation.getByRole('link', { name: new RegExp(`^${label}$`, 'i') })).toBeInTheDocument();
    }
    expect(navigation.getByRole('button', { name: /services/i })).toBeInTheDocument();
    expect(document.querySelector('.loader')).toBeNull();
    expect(screen.queryByText(/FIELD NOTES \/ 001/i)).not.toBeInTheDocument();
  });

  it('introduces the company and its four-part field delivery network', async () => {
    render(await Page());

    const company = document.querySelector('#company')!;
    expect(within(company as HTMLElement).getByText('WHO WE ARE')).toBeInTheDocument();
    expect(within(company as HTMLElement).getByText(/PIE SQUARE — FIELD DELIVERY NETWORK/i)).toBeInTheDocument();
    expect(within(company as HTMLElement).getByText(/ENGINEERING • DEPLOYMENT • COMMISSIONING • O&M/i)).toBeInTheDocument();
    const timeline = within(company as HTMLElement).getByRole('list', { name: /company timeline/i });
    for (const label of ['Telecom Infrastructure', 'Fiber Optic Infrastructure', 'Solar & Electrical Infrastructure', 'IT & Digital Solutions']) {
      expect(within(timeline).getByText(label)).toBeInTheDocument();
    }
    expect(within(company as HTMLElement).getByRole('link', { name: /learn more about us/i })).toHaveAttribute('href', '/company');
  });

  it('shows four capability routes and the five-stage delivery process without old cinematic scenes', async () => {
    render(await Page());

    for (const href of ['/capabilities/telecom', '/capabilities/optical-fiber', '/capabilities/solar-energy', '/capabilities/it-solutions']) {
      expect(document.querySelector(`#expertise a[href="${href}"]`)).toBeTruthy();
    }
    expect(screen.getByRole('heading', { name: /from survey to service.*we deliver end to end/i })).toBeInTheDocument();
    const process = within(screen.getByRole('list', { name: /delivery process/i }));
    expect(process.getAllByRole('listitem')).toHaveLength(5);
    for (const title of ['Survey & Assessment', 'Engineering & Planning', 'Installation & Deployment', 'Testing & Commissioning', 'Maintenance & Support']) {
      expect(process.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(process.getByText('Site inspection, data collection and technical assessment by field engineers.')).toBeInTheDocument();
    expect(process.getByText('Preventive maintenance, fault restoration and ongoing technical support.')).toBeInTheDocument();
    for (const className of ['telecom-scene', 'rf-scene', 'fiber-scene', 'energy-scene', 'digital-scene']) {
      expect(document.querySelector(`.${className}`)).toBeNull();
    }
    for (const id of ['telecom', 'rf', 'fiber', 'energy', 'digital']) {
      expect(document.getElementById(id)).toBeTruthy();
    }
  });

  it('uses the approved metrics, nine industries and six client logos', async () => {
    render(await Page());

    expect(screen.getByRole('heading', { name: /verified field metrics/i })).toBeInTheDocument();
    expect(document.querySelectorAll('#impact .impact-stat')).toHaveLength(5);
    for (const value of ['3500+', '115', '4', '2,240+ KM', '400 kW']) {
      expect(document.querySelector('#impact')?.textContent).toContain(value);
    }
    expect(screen.getByRole('heading', { name: /industries we support/i })).toBeInTheDocument();
    expect(document.querySelectorAll('#industries li')).toHaveLength(9);
    expect(document.querySelectorAll('#clients .atlas-client-logo img')).toHaveLength(6);
    expect(document.querySelector('#clients .client-logo-wheel')).toBeNull();
    for (const name of ['Nepal Telecom', 'Ncell', 'CGNET', 'Surya Nepal', 'ZTE Nepal', 'CCS Nepal']) {
      expect(within(document.querySelector('#clients') as HTMLElement).getByText(name)).toBeInTheDocument();
    }
  });

  it('offers the real profile PDF before the retained direct-contact ending', async () => {
    render(await Page());

    const profile = screen.getByRole('link', { name: /download company profile/i });
    expect(profile).toHaveAttribute('href', '/resources/pie-square-company-profile-2026.pdf');
    expect(screen.queryByRole('link', { name: /certifications & compliance/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /build the next connection with us/i })).toBeInTheDocument();
    expect(document.querySelector('#contact a[href^="https://wa.me/"]')).toBeTruthy();
    expect(document.querySelector('#contact a[href^="tel:"]')).toBeTruthy();
    expect(document.querySelector('.signal-overlay__label')).toBeNull();
  });
});
