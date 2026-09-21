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
    await expect(page.getByRole('heading', { name: /building the infrastructure that keeps nepal connected/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /from survey to signal/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /build the next connection with us/i })).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('#top h1')).toHaveCount(1);
    await expect(page.locator('a[href="/contact"]:visible').first()).toBeVisible();
    await expect(page.locator('#company .logo-carousel__stage')).toHaveCount(0);
    await expect(page.locator('#clients .clients-scene__logos img')).toHaveCount(3);
    await expect(page.locator('#clients .clients-scene__names > p')).toHaveCount(7);
    await expect(page.locator('#clients .clients-scene__names')).toContainText('Nepal Telecom');
    await expect(page.locator('#clients .clients-scene__names')).toContainText('Surya Nepal');
    await expect(page.locator('#clients .clients-scene__names')).toContainText('ZTE Nepal');
    await expect(page.locator('#clients .clients-scene__names')).toContainText('CCS Nepal');
    await expect(page.locator('body')).toHaveCSS('overflow-x', 'hidden');
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

  test('takes the quote CTA to the contact quote form', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.loader')).toHaveCount(0);

    const desktopQuoteLink = page.locator('.nav-project-link');
    if (await desktopQuoteLink.isVisible()) {
      await desktopQuoteLink.click();
    } else {
      await page.locator('.menu-toggle').click({ force: true });
      await page.locator('.mobile-menu__project').click();
    }

    await expect(page).toHaveURL(/\/contact#quote$/);
    await expect(page.getByRole('heading', { name: /let's build your next project/i })).toBeVisible();
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

test.describe('responsive foundation', () => {
  test('keeps the mobile menu compact, footer consistent, and paper copy readable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/projects', { waitUntil: 'domcontentloaded' });
    await page.locator('.menu-toggle').click({ force: true });

    const menuStyle = await page.locator('.mobile-menu nav a').first().evaluate((element) => {
      const computed = getComputedStyle(element);
      return { fontSize: parseFloat(computed.fontSize), height: element.getBoundingClientRect().height };
    });
    expect(menuStyle.fontSize).toBeLessThanOrEqual(32);
    expect(menuStyle.height).toBeLessThanOrEqual(56);

    const footerStyle = await page.locator('.site-footer__routes').evaluate((element) => {
      const computed = getComputedStyle(element);
      return { display: computed.display, columns: computed.gridTemplateColumns.trim().split(/\s+/).length };
    });
    expect(footerStyle.display).toBe('grid');
    expect(footerStyle.columns).toBe(1);

    const contrast = await page.locator('.inner-page__lede').evaluate((element) => {
      const channels = getComputedStyle(element).color.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
      const luminance = (channel: number) => {
        const normalized = channel / 255;
        return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      const textLuminance = .2126 * luminance(channels[0]) + .7152 * luminance(channels[1]) + .0722 * luminance(channels[2]);
      const paperLuminance = .2126 * luminance(241) + .7152 * luminance(238) + .0722 * luminance(232);
      return (Math.max(textLuminance, paperLuminance) + .05) / (Math.min(textLuminance, paperLuminance) + .05);
    });
    expect(contrast).toBeGreaterThanOrEqual(4.5);

    const fontPair = await page.locator('h1').first().evaluate((element) => ({
      display: getComputedStyle(element).fontFamily,
      body: getComputedStyle(document.body).fontFamily,
    }));
    expect(fontPair.display).toMatch(/Inter Tight/);
    expect(fontPair.body).toMatch(/Inter/);
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

  test('renders a linked project detail page from the approved portfolio', async ({ page }) => {
    await page.goto('/projects/rf-drive-test-network-optimization', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1, name: /rf drive test & network optimization/i })).toBeVisible();
    await expect(page.getByText(/1,214/i).first()).toBeVisible();
    await expect(page.locator('.inner-page__actions a[href="/contact#quote"]').first()).toBeVisible();
  });

  test('renders a branded 404 for unpublished routes', async ({ page }) => {
    const response = await page.goto('/not-a-published-route', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: /page not found/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

});
