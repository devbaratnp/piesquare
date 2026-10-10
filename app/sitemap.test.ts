import { describe, expect, it } from 'vitest';
import sitemap from './sitemap';

describe('sitemap metadata', () => {
  it('includes the public clients route', async () => {
    const entries = await sitemap();

    expect(entries.some((entry) => entry.url === 'https://piesquaretechnologies.com/clients')).toBe(true);
  });
});
