const { test, expect } = require('@playwright/test');

test.describe('Order Page Verification', () => {
  test('should display the order page correctly', async ({ page }) => {
    await page.goto('file:///app/order.html');
    await expect(page.locator('h1')).toHaveText('Checkout');
    await expect(page.locator('.progress-bar')).toBeVisible();
    await expect(page.locator('#payment-options')).toBeVisible();
    await page.screenshot({ path: 'jules-scratch/verification/order.png' });
  });
});
