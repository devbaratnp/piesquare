'use client';

import { useEffect, useRef } from 'react';

const cursorToneByLabel: Record<string, 'amber' | 'ice' | 'paper' | 'signal'> = {
  contact: 'amber',
  start: 'signal',
  view: 'ice',
};

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = cursor.current;
    if (!node) return;

    const targetPosition = { x: 0, y: 0 };
    const currentPosition = { x: 0, y: 0 };
    let animationFrame = 0;
    let hasPosition = false;

    const animate = () => {
      currentPosition.x += (targetPosition.x - currentPosition.x) * 0.18;
      currentPosition.y += (targetPosition.y - currentPosition.y) * 0.18;
      node.style.setProperty('--cursor-x', `${currentPosition.x}px`);
      node.style.setProperty('--cursor-y', `${currentPosition.y}px`);

      if (Math.abs(targetPosition.x - currentPosition.x) > 0.1 || Math.abs(targetPosition.y - currentPosition.y) > 0.1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      targetPosition.x = event.clientX;
      targetPosition.y = event.clientY;
      if (!hasPosition) {
        currentPosition.x = event.clientX;
        currentPosition.y = event.clientY;
        hasPosition = true;
      }

      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>('[data-cursor], a, button, input, select, textarea, [role="button"]')
        : null;
      const label = target?.dataset.cursor ?? (target ? 'hover' : '');
      node.dataset.label = label;
      node.dataset.cursorColor = cursorToneByLabel[label] ?? 'paper';
      node.classList.add('is-visible');
      node.classList.toggle('is-active', Boolean(target));
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    };

    const leave = () => node.classList.remove('is-visible', 'is-active');
    const press = () => node.classList.add('is-clicking');
    const release = () => node.classList.remove('is-clicking');

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerleave', leave, { passive: true });
    window.addEventListener('pointerdown', press, { passive: true });
    window.addEventListener('pointerup', release, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div className="custom-cursor" ref={cursor} aria-hidden="true"><span /></div>;
}
