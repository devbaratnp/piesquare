import { createHmac, timingSafeEqual } from 'node:crypto';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type PushPayload = {
  ref?: unknown;
};

function hasValidSignature(payload: string, signature: string, secret: string) {
  const expected = `sha256=${createHmac('sha256', secret).update(payload).digest('hex')}`;
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  return expectedBuffer.length === signatureBuffer.length && timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(request: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ ok: false, error: 'Webhook secret is not configured.' }, { status: 500 });
  }

  const payload = await request.text();
  const signature = request.headers.get('x-hub-signature-256') ?? '';
  if (!hasValidSignature(payload, signature, secret)) {
    return Response.json({ ok: false, error: 'Invalid signature.' }, { status: 401 });
  }

  let body: PushPayload;
  try {
    body = JSON.parse(payload) as PushPayload;
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const event = request.headers.get('x-github-event') ?? '';
  if (event !== 'push') {
    return Response.json({ ok: true, ignored: event || 'unknown' });
  }

  const branch = process.env.DEPLOY_BRANCH ?? 'main';
  if (body.ref !== `refs/heads/${branch}`) {
    return Response.json({ ok: true, ignored: body.ref ?? 'unknown ref' });
  }

  const scriptPath = process.env.DEPLOY_SCRIPT_PATH ?? path.join(process.cwd(), 'deploy.sh');
  const homeDir = process.env.CPANEL_HOME ?? process.env.HOME;
  if (!homeDir || !existsSync(scriptPath)) {
    return Response.json({ ok: false, error: 'Deployment runtime is not configured.' }, { status: 500 });
  }

  const child = spawn('bash', [scriptPath], {
    cwd: path.dirname(scriptPath),
    detached: true,
    stdio: 'ignore',
    env: {
      ...process.env,
      HOME: homeDir,
      CPANEL_HOME: homeDir,
      DEPLOY_BRANCH: branch,
    },
  });
  child.unref();

  return Response.json({ ok: true, message: `Deployment for ${branch} started.` }, { status: 202 });
}
