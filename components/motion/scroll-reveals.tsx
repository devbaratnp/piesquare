'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = '.atlas-reveal, .inner-page__hero, .inner-page__body > *';

export function ScrollReveals() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;

    let frame = 0;
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR);
      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            delay: (index % 4) * 0.05,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          },
        );
      });
      frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      window.cancelAnimationFrame(frame);
      context.revert();
    };
  }, [pathname, reduced]);

  return null;
}
