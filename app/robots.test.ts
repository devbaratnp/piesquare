import { describe, expect, it } from 'vitest';
import robots from './robots';

describe('robots metadata', () => {
  it('exposes the sitemap and keeps private app routes out of crawls', () => {
    const metadata = robots();
    const rules = Array.isArray(metadata.rules) ? metadata.rules[0] : metadata.rules;

    expect(metadata.sitemap).toBe('https://piesquaretechnologies.com/sitemap.xml');
    expect(rules).toMatchObject({ userAgent: '*', allow: '/' });
    expect(rules?.disallow).toEqual(['/admin', '/api']);
  });
});
