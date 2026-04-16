import { test, expect } from '@playwright/test';

test.describe('EPAM website - Client Work navigation', () => {
  test('Navigate to Services -> Explore Our Client Work and verify Client Work page', async ({ page }) => {
    // 1. Navigate to the EPAM homepage
    await page.goto('https://www.epam.com/');

    // 2. Open the header menu and select "Services".
    // The header may show a link or a dropdown labeled "Services". Use role-based selector for resilience.
    const servicesLink = page.getByRole('link', { name: /Services/i });
    await expect(servicesLink).toBeVisible({ timeout: 10000 });
    await servicesLink.click();

    // 3. Click the "Explore Our Client Work" link.
    // Use a case-insensitive regexp to find the link text.
    const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i });
    await expect(exploreClientWork).toBeVisible({ timeout: 10000 });
    await exploreClientWork.click();

    // 4. Verify that the "Client Work" text is visible on the page.
    // This verifies the target page loaded and contains expected heading/text.
    const clientWorkHeading = page.getByText(/Client Work/i);
    await expect(clientWorkHeading).toBeVisible({ timeout: 10000 });
  });
});
