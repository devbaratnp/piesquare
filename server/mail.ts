import { spawn } from 'node:child_process';

const DEFAULT_TO = 'piesquaretechnologies@gmail.com';
const DEFAULT_FROM = 'website@piesquaretechnologies.com';

export type MailInput = Readonly<{
  subject: string;
  text: string;
  replyTo?: string;
}>;

function validHeader(value: string) {
  return !/[\r\n]/.test(value);
}

function validEmail(value: string) {
  return value.length <= 190 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && validHeader(value);
}

/** Send through cPanel's local MTA so SMTP credentials never enter the app bundle. */
export async function sendMail(input: MailInput): Promise<boolean> {
  const to = process.env.MAIL_TO ?? DEFAULT_TO;
  const from = process.env.MAIL_FROM ?? DEFAULT_FROM;
  const sendmailPath = process.env.MAIL_SENDMAIL_PATH ?? '/usr/sbin/sendmail';
  if (!validEmail(to) || !validEmail(from) || !validHeader(input.subject) || (input.replyTo && !validEmail(input.replyTo))) return false;

  const headers = [
    `To: ${to}`,
    `From: ${from}`,
    input.replyTo ? `Reply-To: ${input.replyTo}` : '',
    `Subject: ${input.subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
  ].filter(Boolean).join('\n');

  return new Promise((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      resolve(ok);
    };
    const timer = setTimeout(() => {
      child.kill();
      finish(false);
    }, 10_000);
    const child = spawn(sendmailPath, ['-t', '-i'], { stdio: ['pipe', 'ignore', 'ignore'] });
    child.once('error', () => {
      clearTimeout(timer);
      finish(false);
    });
    child.once('close', (code) => {
      clearTimeout(timer);
      finish(code === 0);
    });
    try {
      child.stdin.write(`${headers}\n\n${input.text.replace(/\r?\n/g, '\n')}\n`);
      child.stdin.end();
    } catch {
      clearTimeout(timer);
      child.kill();
      finish(false);
    }
  });
}

export function publicUrl(pathname: string, requestUrl: string) {
  const configured = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
  const origin = configured || new URL(requestUrl).origin;
  return `${origin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}
