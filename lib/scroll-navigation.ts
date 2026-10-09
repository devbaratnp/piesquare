export type RouteScrollTarget =
  | Readonly<{ kind: 'top' }>
  | Readonly<{ kind: 'hash'; id: string }>;

export function resolveRouteScrollTarget(hash: string, hasElement: (id: string) => boolean): RouteScrollTarget {
  if (!hash) return { kind: 'top' };

  try {
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    return id && hasElement(id) ? { kind: 'hash', id } : { kind: 'top' };
  } catch {
    return { kind: 'top' };
  }
}
