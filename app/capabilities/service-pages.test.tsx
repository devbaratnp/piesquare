import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import TelecomPage from './telecom/page';
import FiberPage from './optical-fiber/page';
import SolarPage from './solar-energy/page';
import ITPage from './it-solutions/page';

afterEach(() => cleanup());

describe('service detail pages', () => {
  it.each([
    ['TelecomPage', TelecomPage, '01 SERVICES', 'Telecom'],
    ['FiberPage', FiberPage, '02 SERVICES', 'Fiber'],
    ['SolarPage', SolarPage, '03 SERVICES', 'Solar & Electrical'],
    ['ITPage', ITPage, '04 SERVICES', 'IT Solutions'],
  ])('uses the approved %s heading and removes service CTAs', async (_name, Page, serviceHeading, title) => {
    render(await Page());

    expect(screen.getByText(serviceHeading)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: new RegExp(title, 'i') })).toBeInTheDocument();
    expect(document.querySelector('.inner-page__actions')).not.toBeInTheDocument();
    expect(document.querySelector('.inner-page__proof')).not.toBeInTheDocument();
  });
});
