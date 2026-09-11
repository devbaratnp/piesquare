export const SIGNAL_STATES = [
  'HERO_TRANSMIT',
  'MAP_ROUTE',
  'TELECOM_BUILD',
  'RF_DRIVE',
  'FIBER_LIGHT',
  'ENERGY_CURRENT',
  'DIGITAL_NETWORK',
  'FINAL_CONVERGENCE',
] as const;

export type SignalState = (typeof SIGNAL_STATES)[number];

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function normalizeProgress(scrollTop: number, scrollHeight: number, viewportHeight: number) {
  const travel = scrollHeight - viewportHeight;
  return travel <= 0 ? 0 : clamp01(scrollTop / travel);
}

export function isSignalState(value: string): value is SignalState {
  return SIGNAL_STATES.includes(value as SignalState);
}
