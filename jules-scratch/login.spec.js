const { test, expect } = require('@playwright/test');

test.describe('Login Page Verification', () => {
  test('should display the login page correctly', async ({ page }) => {
    await page.goto('file:///app/login.html');
    await expect(page.locator('h1')).toHaveText('Login');
    await page.screenshot({ path: 'jules-scratch/verification/login.png' });
  });
});
