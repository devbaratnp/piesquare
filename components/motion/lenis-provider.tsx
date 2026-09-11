'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === 'undefined' || !('ResizeObserver' in window)) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: false });
    const onTick = (time: number) => lenis.raf(time * 1000);
    const onScroll = () => ScrollTrigger.update();

    gsap.ticker.add(onTick);
    lenis.on('scroll', onScroll);

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reduced]);

  return children;
}
