import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouteScrollManager } from './route-scroll-manager';

const pathnameState = { value: '/' };

vi.mock('next/navigation', () => ({
  usePathname: () => pathnameState.value,
}));

describe('RouteScrollManager', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    pathnameState.value = '/';
    window.history.replaceState({}, '', '/');
  });

  it('scrolls a new pathname to the top with explicit instant behavior', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    const requestAnimationFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    const view = render(<RouteScrollManager />);

    pathnameState.value = '/company';
    view.rerender(<RouteScrollManager />);

    expect(requestAnimationFrame).toHaveBeenCalledOnce();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' });
  });

  it('scrolls an existing hash target into view without using smooth behavior', () => {
    const target = document.createElement('section');
    target.id = 'quote';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);
    window.history.replaceState({}, '', '/contact#quote');
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });

    const view = render(<RouteScrollManager />);
    pathnameState.value = '/contact';
    act(() => view.rerender(<RouteScrollManager />));

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start', inline: 'nearest' });
    target.remove();
  });
});
