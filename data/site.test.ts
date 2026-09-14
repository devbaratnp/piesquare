import { describe, expect, it } from 'vitest';
import { careerRoles, certifications, clients, impactStats, projects, serviceDetails, siteContact, telecomFrames } from './site';

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

  it('keeps the reference content records complete', () => {
    expect(projects.map((project) => project.title)).toEqual([
      'National Backbone Fiber Deployment',
      '4G Tower Site Rollout',
      'Rural Connectivity Tower Program',
      'FTTH Metro Fiber Expansion',
      'Off-Grid Solar for Telecom Sites',
      'Commercial Rooftop Solar Installation',
      'Enterprise Data Center Build',
      'Campus Network & CCTV Deployment',
    ]);
    expect(serviceDetails.telecom.capabilities).toHaveLength(8);
    expect(serviceDetails['optical-fiber'].capabilities).toHaveLength(10);
    expect(serviceDetails['solar-energy'].capabilities).toHaveLength(11);
    expect(serviceDetails['it-solutions'].capabilities).toHaveLength(10);
    expect(careerRoles).toHaveLength(6);
    expect(certifications).toHaveLength(7);
  });
});
