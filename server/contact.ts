import { execute } from './db';

export const CONTACT_KINDS = ['QUOTE', 'MESSAGE', 'SURVEY'] as const;
export const CONTACT_STATUSES = ['NEW', 'READ', 'ARCHIVED'] as const;
export type ContactKind = (typeof CONTACT_KINDS)[number];
export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export const CONTACT_FILE_MIME_TYPES: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'text/plain': '.txt',
};
export const MAX_CONTACT_FILE_BYTES = 5 * 1024 * 1024;
export const MAX_CONTACT_FILES = 5;
export const MAX_CONTACT_TOTAL_BYTES = 20 * 1024 * 1024;

export type ContactInput = Readonly<{
  kind: ContactKind;
  name: string;
  company?: string;
  phone: string;
  email: string;
  message?: string;
  details: Record<string, string>;
}>;

export function validateContact(input: {
  kind?: string;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  message?: string;
  details?: Record<string, string>;
}): { ok: true; value: ContactInput } | { ok: false; message: string } {
  const kind = input.kind?.trim().toUpperCase() as ContactKind;
  const name = input.name?.trim();
  const company = input.company?.trim();
  const phone = input.phone?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();
  if (!CONTACT_KINDS.includes(kind)) return { ok: false, message: 'Choose a valid enquiry type.' };
  if (!name || name.length < 2 || name.length > 190) return { ok: false, message: 'Name must be 2-190 characters.' };
  if (!phone || phone.replace(/\D/g, '').length < 7 || phone.length > 60) return { ok: false, message: 'Enter a valid phone number.' };
  if (!email || email.length > 190 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: 'Enter a valid email address.' };
  if ((kind === 'MESSAGE' || kind === 'QUOTE') && !message) return { ok: false, message: 'Add a short message so the team can respond.' };
  if (message && message.length > 4000) return { ok: false, message: 'Message must be shorter than 4000 characters.' };
  return {
    ok: true,
    value: {
      kind,
      name,
      company: company ? company.slice(0, 190) : undefined,
      phone,
      email,
      message: message || undefined,
      details: Object.fromEntries(Object.entries(input.details ?? {}).map(([key, value]) => [key, value.trim().slice(0, 500)])),
    },
  };
}

export function validateContactFiles(files: File[]) {
  if (files.length > MAX_CONTACT_FILES) return { ok: false as const, message: `Attach up to ${MAX_CONTACT_FILES} documents.` };
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_CONTACT_TOTAL_BYTES) return { ok: false as const, message: 'Attachments must be smaller than 20 MB in total.' };
  for (const file of files) {
    if (!file.size || !CONTACT_FILE_MIME_TYPES[file.type]) return { ok: false as const, message: 'Use PDF, Word, image, or text documents only.' };
    if (file.size > MAX_CONTACT_FILE_BYTES) return { ok: false as const, message: 'Each attachment must be smaller than 5 MB.' };
  }
  return { ok: true as const };
}

let contactMessagesTable: Promise<void> | null = null;

/** Idempotent live migration for existing cPanel databases. */
export function ensureContactMessagesTable() {
  if (!contactMessagesTable) {
    contactMessagesTable = execute(`CREATE TABLE IF NOT EXISTS contact_messages (
      id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      kind VARCHAR(20) NOT NULL DEFAULT 'MESSAGE',
      name VARCHAR(190) NOT NULL,
      company VARCHAR(190) NULL,
      phone VARCHAR(60) NOT NULL,
      email VARCHAR(190) NOT NULL,
      message LONGTEXT NULL,
      details TEXT NULL,
      attachments TEXT NULL,
      status ENUM('NEW', 'READ', 'ARCHIVED') NOT NULL DEFAULT 'NEW',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX contact_messages_status_created (status, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`).then(() => undefined).catch((error) => {
      contactMessagesTable = null;
      throw error;
    });
  }
  return contactMessagesTable;
}
