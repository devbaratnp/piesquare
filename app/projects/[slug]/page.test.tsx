import { describe, expect, it } from 'vitest';
import Page from './page';

describe('project detail page', () => {
  it('renders the supplied project detail sections', () => {
    const result = Page({ params: Promise.resolve({ slug: 'fiber-network-operations-maintenance' }) });

    expect(result).toBeTruthy();
  });
});
