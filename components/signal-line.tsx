'use client';

import { useEffect, useRef, useState } from 'react';
import type { SignalState } from '@/lib/motion';

const paths: Record<SignalState, string> = {
  HERO_TRANSMIT: 'M -80 420 C 160 420 210 160 410 270 S 730 280 1080 80',
  MAP_ROUTE: 'M -60 360 C 130 250 250 450 390 330 S 700 120 1080 230',
  TELECOM_BUILD: 'M 110 560 L 300 420 L 480 420 L 540 170 L 600 420 L 800 420 L 950 280',
  RF_DRIVE: 'M -50 430 C 150 150 250 500 420 330 S 690 160 1050 410',
  FIBER_LIGHT: 'M -80 470 C 120 80 260 640 430 300 S 700 240 1080 120',
  ENERGY_CURRENT: 'M -60 370 L 180 370 L 280 210 L 390 370 L 520 370 L 650 150 L 780 370 L 1080 370',
  DIGITAL_NETWORK: 'M 30 420 L 250 260 L 500 390 L 720 160 L 1030 300',
  FINAL_CONVERGENCE: 'M -80 310 C 220 310 300 120 500 260 S 720 410 1080 260',
};

type SignalLineProps = Readonly<{ state: SignalState }>;

export function SignalLine({ state }: SignalLineProps) {
  const [displayState, setDisplayState] = useState(state);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (displayState === state) return;
    const timer = window.setTimeout(() => setDisplayState(state), 160);
    return () => window.clearTimeout(timer);
  }, [displayState, state]);

  return (
    <div className={`signal-overlay signal-overlay--${displayState.toLowerCase()}`} aria-hidden="true">
      <svg viewBox="0 0 1100 600" preserveAspectRatio="none">
        <path className="signal-overlay__ghost" d={paths[displayState]} pathLength="1" />
        <path ref={pathRef} className="signal-overlay__line" d={paths[displayState]} pathLength="1" />
      </svg>
      <span className="signal-overlay__label">{displayState.replace('_', ' ')}</span>
    </div>
  );
}
