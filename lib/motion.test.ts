import { describe, expect, it } from 'vitest';
import { clamp01, isSignalState, normalizeProgress, SIGNAL_STATES } from './motion';

describe('motion helpers', () => {
  it('clamps progress to the inclusive 0 to 1 range', () => {
    expect(clamp01(-0.2)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(1.4)).toBe(1);
  });

  it('normalizes a scroll position against the available travel', () => {
    expect(normalizeProgress(250, 1_000, 500)).toBe(0.5);
    expect(normalizeProgress(900, 1_000, 500)).toBe(1);
    expect(normalizeProgress(0, 1_000, 500)).toBe(0);
  });

  it('accepts only named signal states', () => {
    expect(SIGNAL_STATES).toContain('FIBER_LIGHT');
    expect(isSignalState('FINAL_CONVERGENCE')).toBe(true);
    expect(isSignalState('random-glow')).toBe(false);
  });
});
