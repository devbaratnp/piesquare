import { describe, expect, it } from 'vitest';
import { validateApplication, validateCv } from './applications';

describe('validateApplication', () => {
  it('accepts a valid general application', () => {
    const result = validateApplication({
      roleId: 'general',
      name: 'Asha Sharma',
      phone: '+977 9800000000',
      email: 'asha@example.com',
      desiredPosition: 'Site Engineer',
      message: 'Available immediately.',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects invalid email, phone, and role', () => {
    expect(validateApplication({ roleId: 'nope', name: 'Ab', phone: '1', email: 'bad', desiredPosition: '' }).ok).toBe(false);
    expect(validateApplication({ roleId: 'general', name: 'Ab', phone: '+9779800000000', email: 'a@b.com', desiredPosition: '' }).ok).toBe(false);
  });
});

describe('validateCv', () => {
  it('accepts PDF under 5 MB and rejects other types', () => {
    const pdf = new File(['x'], 'cv.pdf', { type: 'application/pdf' });
    expect(validateCv(pdf).ok).toBe(true);
    const exe = new File(['x'], 'cv.exe', { type: 'application/x-msdownload' });
    expect(validateCv(exe).ok).toBe(false);
  });
});
