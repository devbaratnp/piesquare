import { describe, expect, it } from 'vitest';
import { careerRoles, clients, impactStats, projects, serviceDetails, siteContact, telecomFrames } from './site';

describe('site content', () => {
  it('keeps production contact details in one source of truth', () => {
    expect(siteContact.email).toBe('info@piesquaretechnologies.com');
    expect(siteContact.phoneHref).toBe('tel:+9779715000715');
    expect(siteContact.mapUrl).toContain('maps.app.goo.gl');
  });

  it('keeps the visual proof datasets populated', () => {
    expect(telecomFrames).toHaveLength(7);
    expect(impactStats).toHaveLength(5);
    expect(impactStats.map((stat) => stat[0])).toEqual(['3500+', '115', '4', '2,240+ KM', '400 kW']);
    expect(projects).toHaveLength(12);
    expect(clients).toContain('Nepal Telecom');
  });

  it('keeps the reference content records complete', () => {
    expect(projects.slice(0, 6).map((project) => project.title)).toEqual([
      'RF Drive Test & Network Optimization',
      'Cluster Drive Test & Optimization',
      'SSV Drive Testing & Network Verification - Ncell',
      'Fiber Network Operations & Maintenance',
      'Fiber Network Deployment & ODN Implementation',
      '400 kWp Ground-Mount Solar Power Plant',
    ]);
    expect(serviceDetails.telecom.capabilities).toHaveLength(8);
    expect(serviceDetails['optical-fiber'].capabilities).toHaveLength(12);
    expect(serviceDetails['solar-energy'].capabilities).toHaveLength(12);
    expect(serviceDetails['it-solutions'].capabilities).toHaveLength(10);
    expect(careerRoles.map((role) => role.title)).toEqual([
      'RF Drive Test Engineer',
      'RF Data Analyst',
      'RF Technician / Rigger',
    ]);
    expect(clients).toEqual(['Nepal Telecom', 'Ncell', 'CGNET', 'Surya Nepal', 'ZTE Nepal', 'CCS Nepal']);
  });
});
