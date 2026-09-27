import { createHmac, timingSafeEqual } from 'node:crypto';
import bcrypt from 'bcryptjs';

const SESSION_TTL_SECONDS = 60 * 60 * 8;

export type AdminSession = Readonly<{
  adminId: number;
  email: string;
  exp: number;
}>;

function sessionSecret() {
  return process.env.SESSION_SECRET ?? 'local-development-session-secret-change-me';
}

function encode(value: string) {
  return Buffer.from(value).toString('base64url');
}

function decode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(payload: string) {
  return createHmac('sha256', sessionSecret()).update(payload).digest('base64url');
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function createSessionToken(input: Pick<AdminSession, 'adminId' | 'email'>) {
  const payload = encode(JSON.stringify({ ...input, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS }));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const actualBytes = Buffer.from(signature);
  const expectedBytes = Buffer.from(expected);
  if (actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) return null;

  try {
    const session = JSON.parse(decode(payload)) as AdminSession;
    if (!session.adminId || !session.email || !session.exp || session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}
