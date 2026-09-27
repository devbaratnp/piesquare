import { describe, expect, it } from 'vitest';
import { createSessionToken, hashPassword, verifyPassword, verifySessionToken } from './admin-auth';

describe('admin authentication primitives', () => {
  it('hashes passwords without retaining the original value', async () => {
    const password = 'PieSquare-admin-2026!';
    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    expect(await verifyPassword(password, hash)).toBe(true);
    expect(await verifyPassword('wrong-password', hash)).toBe(false);
  });

  it('creates verifiable expiring session tokens', async () => {
    const token = await createSessionToken({ adminId: 7, email: 'admin@piesquaretechnologies.com' });
    const session = await verifySessionToken(token);

    expect(session).toMatchObject({ adminId: 7, email: 'admin@piesquaretechnologies.com' });
  });
});
