import { expect, test } from '@playwright/test';

test.describe('home experience', () => {
  test('renders the signal journey and keeps the primary navigation usable', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Pie Square Technologies/);
    const desktopNavigation = page.getByRole('navigation', { name: /primary/i });
    const desktopNavigationVisible = await desktopNavigation.isVisible();
    if (desktopNavigationVisible) {
      await expect(desktopNavigation).toBeVisible();
    } else {
      await page.locator('.menu-toggle').click({ force: true });
      await expect(page.getByRole('navigation', { name: /mobile/i })).toBeVisible();
    }
    await expect(page.getByRole('heading', { name: /building the infrastructure that connects nepal/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /from survey to signal/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /build the next connection with us/i })).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('#top h1')).toHaveCount(1);
    await expect(page.locator('a[href="/contact"]').first()).toBeVisible();
    await expect(page.locator('#company img[src*="nepal-telecom"], #company img[src*="ncell"], #company img[src*="cg-net"]')).toHaveCount(3);
    await expect(page.locator('#clients img[src*="nepal-telecom"], #clients img[src*="ncell"], #clients img[src*="cg-net"]')).toHaveCount(3);
    await expect(page.locator('body')).toHaveCSS('overflow-x', 'hidden');
    const logoStage = page.locator('.logo-carousel__stage');
    await expect(logoStage.getByAltText('Nepal Telecom')).toBeAttached();
    await expect(logoStage.getByAltText('Ncell')).toBeAttached();
    await expect(logoStage.getByAltText('CG Net')).toBeAttached();
    await expect(page.locator('[data-signal-state="FINAL_CONVERGENCE"]')).toBeAttached();

    const projectsLink = desktopNavigationVisible
      ? desktopNavigation.getByRole('link', { name: /^projects$/i })
      : page.getByRole('navigation', { name: /mobile/i }).getByRole('link', { name: /^projects$/i });
    await projectsLink.click();
    await expect(page).toHaveURL(/\/projects$/);
    expect(consoleErrors).toEqual([]);
  });

  test('does not overflow the viewport on a phone-sized screen', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
  });
});

test.describe('inner routes', () => {
  const routes = ['/company', '/capabilities', '/projects', '/clients', '/contact'];

  for (const route of routes) {
    test(`renders ${route} with navigation, heading, and CTA`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('navigation', { name: /primary/i }).first()).toBeAttached();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('link', { name: /discuss a project/i }).first()).toBeVisible();
      expect(consoleErrors).toEqual([]);
    });
  }

  test('renders capability detail routes', async ({ page }) => {
    for (const route of ['/capabilities/telecom', '/capabilities/optical-fiber', '/capabilities/solar-energy', '/capabilities/it-solutions']) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  });
});
