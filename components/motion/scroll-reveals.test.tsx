import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ScrollReveals } from './scroll-reveals';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
vi.mock('gsap', () => ({
  gsap: {
    context: vi.fn(() => ({ revert: vi.fn() })),
    registerPlugin: vi.fn(),
    utils: { toArray: vi.fn(() => []) },
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: { update: vi.fn(), refresh: vi.fn() } }));

describe('ScrollReveals', () => {
  it('renders no layout wrapper so it can be mounted globally', () => {
    const { container } = render(<ScrollReveals />);
    expect(container.firstChild).toBeNull();
  });
});
