# Scroll Motion and Route Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add restrained scroll-reveal animations across public pages and make client-side route navigation reset instantly to the new page's top while preserving hash destinations.

**Architecture:** Keep route destination resolution as a pure helper in `lib/scroll-navigation.ts`. Mount two small client managers from the root layout: one handles pathname changes and explicit instant scroll behavior, and one owns GSAP/ScrollTrigger reveal contexts for the current route. Existing Lenis setup, content, route structure, and reduced-motion semantics remain unchanged.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, GSAP 3.15, ScrollTrigger, Lenis, Vitest, Testing Library, Playwright.

---

## File map

- Create `lib/scroll-navigation.ts`: pure route-vs-hash destination decision logic.
- Create `lib/scroll-navigation.test.ts`: unit tests for empty, valid, missing, and malformed hashes.
- Create `components/motion/route-scroll-manager.tsx`: pathname-aware instant route reset and hash scrolling.
- Create `components/motion/route-scroll-manager.test.tsx`: component test for pathname-triggered `window.scrollTo` and hash `scrollIntoView`.
- Create `components/motion/scroll-reveals.tsx`: GSAP/ScrollTrigger section reveal lifecycle.
- Modify `app/layout.tsx`: mount both motion managers once inside `<body>`.
- Modify `app/globals.css`: add compositor hints and reduced-motion-safe reveal defaults.
- Modify `tests/site.spec.ts`: add navigation regression coverage from the homepage bottom and `/contact#quote` targeting.

### Task 1: Add pure route destination logic

**Files:**
- Create: `lib/scroll-navigation.ts`
- Test: `lib/scroll-navigation.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `lib/scroll-navigation.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { resolveRouteScrollTarget } from './scroll-navigation';

describe('resolveRouteScrollTarget', () => {
  it('resets to the top when there is no hash', () => {
    expect(resolveRouteScrollTarget('', () => true)).toEqual({ kind: 'top' });
  });

  it('returns a hash target when the decoded element exists', () => {
    expect(resolveRouteScrollTarget('#quote%20form', (id) => id === 'quote form')).toEqual({
      kind: 'hash',
      id: 'quote form',
    });
  });

  it('falls back to the top when the hash element does not exist', () => {
    expect(resolveRouteScrollTarget('#missing', () => false)).toEqual({ kind: 'top' });
  });

  it('falls back to the top for a malformed encoded hash', () => {
    expect(resolveRouteScrollTarget('#%', () => true)).toEqual({ kind: 'top' });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npx vitest run lib/scroll-navigation.test.ts --no-file-parallelism --maxWorkers=1
```

Expected: FAIL because `lib/scroll-navigation.ts` and `resolveRouteScrollTarget` do not exist.

- [ ] **Step 3: Implement the minimal helper**

Create `lib/scroll-navigation.ts`:

```ts
export type RouteScrollTarget =
  | Readonly<{ kind: 'top' }>
  | Readonly<{ kind: 'hash'; id: string }>;

export function resolveRouteScrollTarget(hash: string, hasElement: (id: string) => boolean): RouteScrollTarget {
  if (!hash) return { kind: 'top' };

  try {
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    return id && hasElement(id) ? { kind: 'hash', id } : { kind: 'top' };
  } catch {
    return { kind: 'top' };
  }
}
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run the same Vitest command. Expected: 4 tests pass with no failures.

- [ ] **Step 5: Commit the helper and tests**

```powershell
git add lib/scroll-navigation.ts lib/scroll-navigation.test.ts
git commit -m "test: define route scroll destinations"
```

### Task 2: Add the route scroll manager

**Files:**
- Create: `components/motion/route-scroll-manager.tsx`
- Test: `components/motion/route-scroll-manager.test.tsx`

- [ ] **Step 1: Write the failing component tests**

Create `components/motion/route-scroll-manager.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run the component test to verify it fails**

Run:

```powershell
npx vitest run components/motion/route-scroll-manager.test.tsx --no-file-parallelism --maxWorkers=1
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the route manager**

Create `components/motion/route-scroll-manager.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { resolveRouteScrollTarget } from '@/lib/scroll-navigation';

export function RouteScrollManager() {
  const pathname = usePathname();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const destination = resolveRouteScrollTarget(window.location.hash, (id) => Boolean(document.getElementById(id)));
      if (destination.kind === 'hash') {
        document.getElementById(destination.id)?.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
```

- [ ] **Step 4: Run the focused component test to verify it passes**

Run the same Vitest command. Expected: 2 tests pass with no failures.

- [ ] **Step 5: Commit the route manager**

```powershell
git add components/motion/route-scroll-manager.tsx components/motion/route-scroll-manager.test.tsx
git commit -m "fix: reset scroll position on route navigation"
```

### Task 3: Add the shared GSAP scroll reveals

**Files:**
- Create: `components/motion/scroll-reveals.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Write the failing component test**

Create `components/motion/scroll-reveals.test.tsx`:

```tsx
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
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run:

```powershell
npx vitest run components/motion/scroll-reveals.test.tsx --no-file-parallelism --maxWorkers=1
```

Expected: FAIL because `ScrollReveals` does not exist.

- [ ] **Step 3: Implement the reveal lifecycle**

Create `components/motion/scroll-reveals.tsx`:

```tsx
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
```

Add compositor hints near the existing page motion rules in `app/globals.css`:

```css
.atlas-reveal,
.inner-page__hero,
.inner-page__body > * {
  will-change: transform, opacity;
}
```

Do not add an opacity-hidden default rule; GSAP should own the initial state so reduced-motion and JavaScript-disabled users keep all content visible.

- [ ] **Step 4: Run the focused reveal test to verify it passes**

Run the same Vitest command. Expected: 1 test passes with no failures.

- [ ] **Step 5: Commit the reveal layer**

```powershell
git add components/motion/scroll-reveals.tsx components/motion/scroll-reveals.test.tsx app/globals.css
git commit -m "feat: add shared scroll reveal motion"
```

### Task 4: Mount the motion managers in the root layout

**Files:**
- Modify: `app/layout.tsx`
- Verify: `tests/site.spec.ts` confirms the mounted managers affect real browser navigation in Task 5.

- [ ] **Step 1: Add the client manager imports and mounts**

In `app/layout.tsx`, import:

```tsx
import { RouteScrollManager } from '@/components/motion/route-scroll-manager';
import { ScrollReveals } from '@/components/motion/scroll-reveals';
```

Place both components directly inside `<body>` before `{children}`:

```tsx
<body>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
  <RouteScrollManager />
  <ScrollReveals />
  {children}
</body>
```

- [ ] **Step 2: Run the existing home and shell tests**

Run:

```powershell
npx vitest run app/page.test.tsx components/inner-page.test.tsx components/site-nav.test.tsx --no-file-parallelism --maxWorkers=1
```

Expected: all existing assertions pass; no route content or heading counts change.

- [ ] **Step 3: Commit the root-layout integration**

```powershell
git add app/layout.tsx
git commit -m "feat: mount global scroll motion managers"
```

### Task 5: Add browser regression coverage

**Files:**
- Modify: `tests/site.spec.ts`

- [ ] **Step 1: Add the navigation regression tests**

Add these tests in the inner-routes describe block:

```ts
test('resets a route to the top when navigating from the homepage bottom', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'instant' }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page.getByRole('link', { name: 'About Us' }).first().click();
  await page.waitForURL('**/company');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
  await expect.poll(() => page.getByRole('heading', { level: 1 }).evaluate((element) => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('keeps hash navigation targeted after a cross-route navigation', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: /request a quote/i }).first().click();
  await page.waitForURL('**/contact#quote');
  await expect(page.locator('#quote')).toBeInViewport();
});
```

- [ ] **Step 2: Run the focused Playwright checks**

Run:

```powershell
npx playwright test tests/site.spec.ts -g "resets a route|keeps hash navigation" --workers=1
```

Expected: both tests pass with zero console errors and no broken images.

- [ ] **Step 3: Commit the regression coverage**

```powershell
git add tests/site.spec.ts
git commit -m "test: cover route scroll reset and hash navigation"
```

### Task 6: Run the full verification suite

**Files:**
- No new files; inspect the complete diff and generated-file status.

- [ ] **Step 1: Run constrained Vitest**

```powershell
npm test -- --run --no-file-parallelism --maxWorkers=1
```

Expected: all test files pass.

- [ ] **Step 2: Run lint**

```powershell
npm run lint
```

Expected: ESLint exits with code 0.

- [ ] **Step 3: Run production build**

```powershell
npm run build
```

Expected: Next.js production build and type-check exit with code 0.

- [ ] **Step 4: Review the final diff and status**

```powershell
git diff --check HEAD~5..HEAD
git status --short
```

Confirm that the only intentional changes are the route manager, reveal manager, tests, layout/CSS integration, and the design/plan documentation. Leave the unrelated generated `next-env.d.ts` change untouched if it is still present.

- [ ] **Step 5: Report evidence**

Report the exact Vitest, lint, build, and Playwright results, plus the commits created. Do not claim completion without the fresh command output.
