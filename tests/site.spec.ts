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
    await expect(page.getByRole('heading', { name: /from survey to service.*we deliver end to end/i })).toBeAttached();
    await expect(page.getByRole('heading', { name: /build the next connection with us/i })).toBeVisible();
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('#top h1')).toHaveCount(1);
    await expect(page.locator('a[href="/contact"]:visible').first()).toBeVisible();
    await expect(page.locator('#company .logo-carousel__stage')).toHaveCount(0);
    await expect(page.locator('#clients .atlas-client-logo img')).toHaveCount(6);
    await expect(page.locator('#clients')).toContainText('Nepal Telecom');
    await expect(page.locator('#clients')).toContainText('Surya Nepal');
    await expect(page.locator('#clients')).toContainText('ZTE Nepal');
    await expect(page.locator('#clients')).toContainText('CCS Nepal');
    await expect(page.locator('#industries li')).toHaveCount(9);
    await expect(page.locator('#process ol li')).toHaveCount(5);
    await expect(page.locator('#profile a[href="/resources/pie-square-company-profile-2026.pdf"]')).toBeVisible();
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

  test('keeps the hero heading readable and contact controls clear of its actions on narrow phones', async ({ page }) => {
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      const layout = await page.evaluate(() => {
        const lines = Array.from(document.querySelectorAll('#top h1 span'));
        const buttons = Array.from(document.querySelectorAll('#top .button'));
        const floating = Array.from(document.querySelectorAll('.floating-contact a'));
        const intersects = (a: DOMRect, b: DOMRect) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
        return {
          headingClipped: lines.some((line) => line.scrollWidth > line.clientWidth + 1),
          actionOverlap: buttons.some((button) => floating.some((contact) => intersects(button.getBoundingClientRect(), contact.getBoundingClientRect()))),
        };
      });
      expect(layout.headingClipped, `${width}px hero title is clipped`).toBe(false);
      expect(layout.actionOverlap, `${width}px floating contact overlaps a hero action`).toBe(false);
    }
  });

  test('keeps the impact stats inside a narrow mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const boxes = await page.locator('.impact-stat').evaluateAll((elements) => {
      const viewport = document.documentElement.clientWidth;
      return elements.map((element) => ({
        right: element.getBoundingClientRect().right,
        viewport,
      }));
    });

    expect(boxes).toHaveLength(5);
    expect(Math.max(...boxes.map(({ right }) => right))).toBeLessThanOrEqual(boxes[0].viewport + 1);
  });

  test('loads selected-project and client-logo images when their sections enter view', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    for (const image of await page.locator('#projects img, #clients img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
  });

  test('wraps direct contact actions inside a narrow mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    const box = await page.locator('.contact-direct__actions').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x + box!.width).toBeLessThanOrEqual(321);
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

    for (const id of ['top', 'company', 'expertise', 'telecom', 'rf', 'fiber', 'energy', 'digital', 'process', 'impact', 'projects', 'industries', 'clients', 'why', 'profile', 'contact']) {
      await expect(page.locator('#' + id)).toBeAttached();
    }
    await expect(page.locator('.telecom-scene')).toHaveCount(0);
    await expect(page.locator('#process ol li')).toHaveCount(5);

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
    await context.close();
  });
});

test.describe('responsive foundation', () => {
  test('scales the floating WhatsApp and call controls responsively', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });

    const mobileContact = await page.locator('.floating-contact').evaluate((element) => {
      const links = Array.from(element.querySelectorAll('a'));
      const computed = getComputedStyle(element);
      return {
        firstSize: links[0].getBoundingClientRect().width,
        secondSize: links[1].getBoundingClientRect().width,
        gap: parseFloat(computed.rowGap),
      };
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    const desktopSize = await page.locator('.floating-contact a').first().evaluate((element) => element.getBoundingClientRect().width);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(mobileContact.firstSize).toBe(mobileContact.secondSize);
    expect(mobileContact.firstSize).toBeGreaterThanOrEqual(76);
    expect(mobileContact.gap).toBeLessThanOrEqual(4);
    expect(desktopSize).toBeGreaterThan(mobileContact.firstSize);
    expect(desktopSize).toBeLessThanOrEqual(104);
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewport + 1);
  });

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
      const paperLuminance = .2126 * luminance(250) + .7152 * luminance(249) + .0722 * luminance(245);
      return (Math.max(textLuminance, paperLuminance) + .05) / (Math.min(textLuminance, paperLuminance) + .05);
    });
    expect(contrast).toBeGreaterThanOrEqual(4.5);

    const fontPair = await page.locator('h1').first().evaluate((element) => ({
      display: getComputedStyle(element).fontFamily,
      body: getComputedStyle(document.body).fontFamily,
    }));
    expect(fontPair.display).toMatch(/Cormorant Garamond/);
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

  test('keeps capability metric labels highlighted and legible', async ({ page }) => {
    await page.goto('/capabilities', { waitUntil: 'domcontentloaded' });

    const metricStyle = await page.locator('.metric-label').first().evaluate((element) => {
      const computed = getComputedStyle(element);
      return {
        color: computed.color,
        borderStyle: computed.borderStyle,
        fontSize: parseFloat(computed.fontSize),
        fontWeight: parseInt(computed.fontWeight, 10),
      };
    });

    expect(metricStyle.color).toBe('rgb(255, 0, 0)');
    expect(metricStyle.borderStyle).toBe('solid');
    expect(metricStyle.fontSize).toBeGreaterThanOrEqual(11);
    expect(metricStyle.fontWeight).toBeGreaterThanOrEqual(700);
  });

  test('renders a branded 404 for unpublished routes', async ({ page }) => {
    const response = await page.goto('/not-a-published-route', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: /page not found/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
  });

});
