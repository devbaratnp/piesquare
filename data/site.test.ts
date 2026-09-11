import { describe, expect, it } from 'vitest';
import { clients, impactStats, projects, siteContact, telecomFrames } from './site';

describe('site content', () => {
  it('keeps production contact details in one source of truth', () => {
    expect(siteContact.email).toBe('info@piesquaretechnologies.com');
    expect(siteContact.phoneHref).toBe('tel:+9779715000715');
  });

  it('keeps the visual proof datasets populated', () => {
    expect(telecomFrames).toHaveLength(7);
    expect(impactStats).toHaveLength(5);
    expect(impactStats.map((stat) => stat[0])).toEqual(['3500+', '115', '2240+ KM', '4', '400 kW']);
    expect(projects.length).toBeGreaterThanOrEqual(6);
    expect(clients).toContain('Nepal Telecom');
  });
});
