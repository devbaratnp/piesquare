import { careerRoles } from '@/data/site';

export const APPLICATION_STATUSES = ['NEW', 'REVIEWED', 'ARCHIVED'] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const CV_MIME_TYPES: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
};

export const MAX_CV_BYTES = 5 * 1024 * 1024;

export type ApplicationInput = Readonly<{
  roleId: string;
  name: string;
  phone: string;
  email: string;
  desiredPosition: string;
  message?: string;
}>;

export function validRoleIds(): ReadonlyArray<string> {
  return [...careerRoles.map((role) => role.id), 'general'];
}

export function validateApplication(input: {
  roleId?: string;
  name?: string;
  phone?: string;
  email?: string;
  desiredPosition?: string;
  message?: string;
}): { ok: true; value: ApplicationInput } | { ok: false; message: string } {
  const roleId = input.roleId?.trim();
  const name = input.name?.trim();
  const phone = input.phone?.trim();
  const email = input.email?.trim();
  const desiredPosition = input.desiredPosition?.trim();
  const message = input.message?.trim();
  if (!roleId || !validRoleIds().includes(roleId)) return { ok: false, message: 'Choose a valid role.' };
  if (!name || name.length < 2 || name.length > 190) return { ok: false, message: 'Name must be 2-190 characters.' };
  if (!phone || phone.replace(/\D/g, '').length < 7 || phone.length > 60) return { ok: false, message: 'Enter a valid phone number.' };
  if (!email || email.length > 190 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: 'Enter a valid email address.' };
  if (!desiredPosition || desiredPosition.length < 2 || desiredPosition.length > 190) return { ok: false, message: 'Desired position is required.' };
  if (message && message.length > 4000) return { ok: false, message: 'Message must be shorter than 4000 characters.' };
  return { ok: true, value: { roleId, name, phone, email, desiredPosition, message: message || undefined } };
}

export function validateCv(file: File | null | undefined): { ok: true; file: File } | { ok: false; message: string } {
  if (!file || file.size === 0) return { ok: false, message: 'Attach your CV (PDF or Word, up to 5 MB).' };
  if (!CV_MIME_TYPES[file.type]) return { ok: false, message: 'CV must be a PDF, DOC or DOCX file.' };
  if (file.size > MAX_CV_BYTES) return { ok: false, message: 'CV must be smaller than 5 MB.' };
  return { ok: true, file };
}
