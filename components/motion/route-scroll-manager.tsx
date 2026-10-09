'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { resolveRouteScrollTarget } from '@/lib/scroll-navigation';

export function RouteScrollManager() {
  const pathname = usePathname();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const destination = resolveRouteScrollTarget(window.location.hash, (id) => Boolean(document.getElementById(id)));
      if (destination.kind === 'hash') {
        document.getElementById(destination.id)?.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
