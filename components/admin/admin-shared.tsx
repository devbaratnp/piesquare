'use client';

export function AdminNotice({ message, error }: { message: string; error: string }) {
  if (!message && !error) return null;
  if (error) {
    return (
      <p className="admin-toast admin-toast--error" role="alert">
        {error} Try again — nothing you typed was lost.
      </p>
    );
  }
  return (
    <p className="admin-toast" role="status">
      {message}
    </p>
  );
}

/** Focus an editor heading after opening it; respects reduced motion for scrolling. */
export function focusEditor(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelector(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  const heading = document.querySelector(`${id} h3`);
  if (heading instanceof HTMLElement) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }
}

export async function adminFetch(input: string, init?: RequestInit): Promise<{ ok: boolean; payload: Record<string, unknown> }> {
  const response = await fetch(input, init);
  const payload = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: response.ok, payload };
}
