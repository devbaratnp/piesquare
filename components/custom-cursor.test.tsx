import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CustomCursor } from './custom-cursor';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('CustomCursor', () => {
  it('follows the pointer and uses a distinct contact color on interactive targets', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(pointer: fine)',
      media: query,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    }));

    render(
      <>
        <CustomCursor />
        <button type="button" data-cursor="contact">Contact</button>
      </>,
    );

    const cursor = document.querySelector('.custom-cursor');
    const pointerMove = new Event('pointermove', { bubbles: true });
    Object.defineProperties(pointerMove, {
      clientX: { value: 320 },
      clientY: { value: 180 },
    });
    screen.getByRole('button', { name: 'Contact' }).dispatchEvent(pointerMove);

    expect(cursor).toHaveClass('is-visible', 'is-active');
    expect(cursor).toHaveAttribute('data-label', 'contact');
    expect(cursor).toHaveAttribute('data-cursor-color', 'amber');
    await waitFor(() => expect(cursor).toHaveStyle({ '--cursor-x': '320px', '--cursor-y': '180px' }));
  });
});
