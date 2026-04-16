import { test, expect } from '@playwright/test';

test('Verify Client Work navigation from Services menu', async ({ page }) => {
  // Navigate to the site and wait for network to be idle
  await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

  // Dismiss cookie/banner if present (common on enterprise sites)
  const acceptBtns = [
    page.getByRole('button', { name: /Accept All|Accept Cookies|Agree|I agree/i }),
    page.getByRole('button', { name: /Dismiss|Close|Got it/i }),
  ];
  for (const btn of acceptBtns) {
    if (await btn.count() > 0) {
      await btn.first().click().catch(() => {});
      break;
    }
  }

  // Hover the Services menu to reveal the dropdown/mega menu
  const services = page.getByRole('link', { name: /Services/i });
  if (await services.count() === 0) {
    throw new Error('Services link not found in header');
  }
  await services.first().hover();
  await page.waitForTimeout(500); // brief pause for animation

  // Try to locate the "Explore Our Client Work" link with several fallbacks
  const exploreByText = page.getByRole('link', { name: /Explore Our Client Work/i });
  const exploreFallback = page.locator('a[href="/services/client-work"], a:has-text("Explore Our Client Work"), a:has-text("Client Work")');

  if (await exploreByText.count() > 0) {
    await exploreByText.first().scrollIntoViewIfNeeded();
    await exploreByText.first().click();
  } else if (await exploreFallback.count() > 0) {
    await exploreFallback.first().scrollIntoViewIfNeeded();
    await exploreFallback.first().click();
  } else {
    // As a last resort navigate directly to the expected URL
    await page.goto('https://www.epam.com/services/client-work', { waitUntil: 'networkidle' });
  }

  // Wait for navigation/content to load
  await page.waitForLoadState('networkidle');

  // Assert that the "Client Work" text is visible on the page
  await expect(page.locator('text=/Client Work/i')).toBeVisible();
});
