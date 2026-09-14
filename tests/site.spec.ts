import { expect, test } from '@playwright/test';

test.describe('home experience', () => {
  test('renders the signal journey and keeps the primary navigation usable', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1_600);
    await expect(page.locator('.loader')).toHaveCount(0);
    await expect(page).toHaveTitle(/Pie Square Technologies/);
    const desktopNavigation = page.getByRole('navigation', { name: /primary/i });
    const desktopNavigationVisible = await desktopNavigation.isVisible();
    if (desktopNavigationVisible) {
      await expect(desktopNavigation).toBeVisible();
    } else {
      const menuToggle = page.locator('.menu-toggle');
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
      await menuToggle.click({ force: true });
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('navigation', { name: /mobile/i })).toBeVisible();
    }
    await expect(page.getByRole('heading', { name: /building the infrastructure that connects nepal/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /from survey to signal/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /build the next connection with us/i })).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('#top h1')).toHaveCount(1);
    await expect(page.locator('a[href="/contact"]:visible').first()).toBeVisible();
    await expect(page.locator('#company img[src*="nepal-telecom"], #company img[src*="ncell"], #company img[src*="cg-net"]')).toHaveCount(3);
    await expect(page.locator('#clients img[src*="nepal-telecom"], #clients img[src*="ncell"], #clients img[src*="cg-net"]')).toHaveCount(3);
    await expect(page.locator('body')).toHaveCSS('overflow-x', 'hidden');
    const logoStage = page.locator('.logo-carousel__stage');
    await expect(logoStage.getByAltText('Nepal Telecom')).toBeAttached();
    await expect(logoStage.getByAltText('Ncell')).toBeAttached();
    await expect(logoStage.getByAltText('CG Net')).toBeAttached();
    await expect(page.locator('[data-signal-state="FINAL_CONVERGENCE"]').first()).toBeAttached();

    const projectsLink = page.locator('a[href="/projects"]:visible').first();
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

  test('opens the project inquiry form without leaving the current page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.loader')).toHaveCount(0);

    const desktopDiscussButton = page.locator('.nav-project-link');
    if (await desktopDiscussButton.isVisible()) {
      await desktopDiscussButton.click();
    } else {
      await page.locator('.menu-toggle').click({ force: true });
      await page.locator('.mobile-menu__project').click();
    }

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('dialog', { name: /discuss a project/i })).toBeVisible();
    await expect(page.getByRole('form', { name: /project inquiry/i })).toBeVisible();
    await page.getByRole('button', { name: /close project inquiry/i }).click();
    await expect(page.getByRole('dialog', { name: /discuss a project/i })).toHaveCount(0);
  });

  test('keeps the full story available with reduced motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    for (const id of ['top', 'company', 'expertise', 'telecom', 'rf', 'fiber', 'energy', 'digital', 'impact', 'projects', 'clients', 'why', 'contact']) {
      await expect(page.locator('#' + id)).toBeAttached();
    }
    await expect(page.locator('.telecom-scene__phase-list')).toBeVisible();
    await expect(page.locator('.telecom-scene__frames img')).toHaveCount(7);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
    await context.close();
  });
});

test.describe('inner routes', () => {
  const routes = [
    '/company',
    '/capabilities',
    '/capabilities/telecom',
    '/capabilities/optical-fiber',
    '/capabilities/solar-energy',
    '/capabilities/it-solutions',
    '/projects',
    '/careers',
    '/certifications',
    '/contact',
  ];

  for (const route of routes) {
    test(`renders ${route} with navigation, heading, and CTA`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const imageFailures: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('response', (response) => {
        if (response.request().resourceType() === 'image' && response.status() >= 400) {
          imageFailures.push(`${response.status()} ${response.url()}`);
        }
      });
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('.desktop-nav')).toBeAttached();
      await expect(page.locator('.custom-cursor')).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const desktopDiscussButton = page.locator('.nav-project-link');
      if (await desktopDiscussButton.isVisible()) {
        await expect(desktopDiscussButton).toBeVisible();
      } else {
        await page.locator('.menu-toggle').click({ force: true });
        await expect(page.locator('.mobile-menu__project')).toBeVisible();
      }
      await expect(page.locator('.desktop-nav a[href="/projects"]')).toHaveAttribute('href', '/projects');
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(imageFailures).toEqual([]);
      expect(consoleErrors).toEqual([]);
    });
  }

});
