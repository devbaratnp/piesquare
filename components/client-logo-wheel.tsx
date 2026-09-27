'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from '@/components/motion/reduced-motion';

type ClientLogo = Readonly<{
  name: string;
  src: string;
  alt: string;
}>;

type Stage = Readonly<{ width: number; height: number }>;

const CARD_RATIO = 2.35;
const CARD_MAX_WIDTH = 0.42;
const CARD_HEIGHT = 0.32;
const RING_RADIUS = 1.14;
const DRUM_RADIUS = 2.05;
const STEP = 42;
const BOW = 1.55;
const PERSPECTIVE = 2.8;
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE_DELAY = 140;
const EASE = 0.12;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount;
const radians = (degrees: number) => (degrees * Math.PI) / 180;

function bowAt(degrees: number, bow: number) {
  return -bow * (1 - Math.cos(radians(degrees)));
}

function placeCard(
  ringDegrees: number,
  drumDegrees: number,
  ringRadius: number,
  drumRadius: number,
  bow: number,
  blend: number,
) {
  return [
    `translateX(${blend * bowAt(drumDegrees, bow)}px)`,
    `rotateZ(${(1 - blend) * ringDegrees}deg) translateY(${-(1 - blend) * ringRadius}px)`,
    `rotateX(${blend * drumDegrees}deg) translateZ(${blend * drumRadius}px)`,
  ].join(' ');
}

export function ClientLogoWheel({ logos }: { logos: ReadonlyArray<ClientLogo> }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<number | null>(null);
  const settlingRef = useRef<number | null>(null);
  const targetRef = useRef(0);
  const turnRef = useRef(0);
  const [active, setActive] = useState(0);
  const [stage, setStage] = useState<Stage>({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const reduced = useReducedMotion();
  const last = Math.max(logos.length - 1, 0);

  const metrics = useMemo(() => {
    const cardWidth = Math.min(stage.height * CARD_HEIGHT * CARD_RATIO, stage.width * CARD_MAX_WIDTH);
    const cardHeight = cardWidth / CARD_RATIO;
    return {
      cardWidth,
      cardHeight,
      ringRadius: cardHeight * RING_RADIUS,
      drumRadius: cardHeight * DRUM_RADIUS,
      bow: cardHeight * BOW,
      depth: cardHeight * PERSPECTIVE,
      ringScale: logos.length ? clamp((((2 * Math.PI * cardHeight * RING_RADIUS) / logos.length) * .82) / (cardWidth || 1), .18, 1) : 1,
    };
  }, [logos.length, stage.height, stage.width]);

  const moveTo = useCallback((next: number) => {
    targetRef.current = clamp(next, 0, last + 1);
  }, [last]);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const readSize = () => setStage({ width: element.clientWidth, height: element.clientHeight });
    readSize();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(readSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      const fallback = window.setTimeout(() => setIsVisible(true), 0);
      return () => window.clearTimeout(fallback);
    }
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: .01 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !stage.height || !logos.length) return;
    let frame = 0;

    const draw = () => {
      const gap = targetRef.current - turnRef.current;
      turnRef.current = Math.abs(gap) < .0005 ? targetRef.current : turnRef.current + gap * (reduced ? 1 : EASE);
      const turn = turnRef.current;
      const blend = clamp(turn, 0, 1);
      const position = Math.max(0, turn - 1);

      if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-blend * metrics.drumRadius}px)`;

      for (let index = 0; index < logos.length; index += 1) {
        const distance = index - position;
        const card = cardRefs.current[index];
        if (!card) continue;
        card.style.transform = placeCard(
          distance * (360 / logos.length),
          distance * STEP,
          metrics.ringRadius,
          metrics.drumRadius,
          metrics.bow,
          blend,
        );
        card.style.opacity = blend > .5 && Math.abs(distance) > 1.6 ? '0' : '1';
        card.style.zIndex = String(Math.round(100 - Math.abs(distance) * 2));
        const face = card.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(metrics.ringScale, 1, blend)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - blend);
      if (titleRef.current) titleRef.current.style.opacity = String(blend);
      const nextActive = clamp(Math.round(position), 0, last);
      setActive((current) => current === nextActive ? current : nextActive);
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, last, logos.length, metrics, reduced, stage.height]);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      const next = targetRef.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      moveTo(next);
      if (settlingRef.current) window.clearTimeout(settlingRef.current);
      settlingRef.current = window.setTimeout(() => moveTo(Math.round(targetRef.current)), SETTLE_DELAY);
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', onWheel);
      if (settlingRef.current) window.clearTimeout(settlingRef.current);
    };
  }, [last, moveTo]);

  return (
    <div className="client-logo-wheel clients-scene__logos" aria-label="Trusted client logos">
      <div
        ref={stageRef}
        className="client-logo-wheel__stage"
        role="listbox"
        tabIndex={0}
        aria-label="Turn through trusted clients"
        aria-activedescendant={`client-logo-${active}`}
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          dragRef.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (dragRef.current === null) return;
          moveTo(targetRef.current + (dragRef.current - event.clientY) / DRAG_UNITS);
          dragRef.current = event.clientY;
        }}
        onPointerUp={() => {
          dragRef.current = null;
          if (targetRef.current > 1) moveTo(Math.round(targetRef.current));
        }}
        onPointerCancel={() => { dragRef.current = null; }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') moveTo(Math.round(targetRef.current) + 1);
          else if (event.key === 'ArrowUp') moveTo(Math.round(targetRef.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div ref={wheelRef} className="client-logo-wheel__wheel">
          {logos.map((logo, index) => (
            <article
              key={logo.name}
              id={`client-logo-${index}`}
              ref={(node) => { cardRefs.current[index] = node; }}
              className="client-logo-wheel__card"
              style={{ width: metrics.cardWidth, height: metrics.cardHeight, marginLeft: -metrics.cardWidth / 2, marginTop: -metrics.cardHeight / 2 }}
              role="option"
              aria-selected={index === active}
              aria-label={logo.name}
            >
              <span className="client-logo-wheel__face">
                <Image src={logo.src} alt={logo.alt} width={160} height={64} />
              </span>
            </article>
          ))}
        </div>
      </div>

      <div ref={labelRef} className="client-logo-wheel__label" aria-hidden="true">Trusted partners</div>
      <div ref={titleRef} className="client-logo-wheel__title" aria-hidden="true">{logos[active]?.name}</div>
      <div className="client-logo-wheel__hint" aria-hidden="true">Drag or use ↑ ↓</div>
    </div>
  );
}
