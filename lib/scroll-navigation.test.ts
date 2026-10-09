import { describe, expect, it } from 'vitest';
import { resolveRouteScrollTarget } from './scroll-navigation';

describe('resolveRouteScrollTarget', () => {
  it('resets to the top when there is no hash', () => {
    expect(resolveRouteScrollTarget('', () => true)).toEqual({ kind: 'top' });
  });

  it('returns a hash target when the decoded element exists', () => {
    expect(resolveRouteScrollTarget('#quote%20form', (id) => id === 'quote form')).toEqual({
      kind: 'hash',
      id: 'quote form',
    });
  });

  it('falls back to the top when the hash element does not exist', () => {
    expect(resolveRouteScrollTarget('#missing', () => false)).toEqual({ kind: 'top' });
  });

  it('falls back to the top for a malformed encoded hash', () => {
    expect(resolveRouteScrollTarget('#%', () => true)).toEqual({ kind: 'top' });
  });
});
