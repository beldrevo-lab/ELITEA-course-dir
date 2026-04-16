import { test, expect } from '@playwright/test';

test('Verify Client Work navigation from Services menu', async ({ page }) => {
  await page.goto('https://www.epam.com/');

  // Open Services menu from header
  await page.getByRole('link', { name: /Services/i }).click();

  // Click the "Explore Our Client Work" link
  const exploreLink = page.getByRole('link', { name: /Explore Our Client Work/i });
  await exploreLink.first().click();

  // Wait for navigation/content to load
  await page.waitForLoadState('networkidle');

  // Verify the "Client Work" text is visible on the page
  await expect(page.getByText(/Client Work/i)).toBeVisible();
});
