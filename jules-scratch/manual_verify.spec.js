const { test, expect } = require('@playwright/test');

test.describe('Manual Verification', () => {
  test('should take screenshots of all pages', async ({ page }) => {
    // index.html
    await page.goto('file:///app/index.html');
    await page.screenshot({ path: 'jules-scratch/verification/index.png' });

    // products.html
    await page.goto('file:///app/products.html');
    await page.screenshot({ path: 'jules-scratch/verification/products.png' });

    // order.html
    await page.goto('file:///app/order.html');
    await page.screenshot({ path: 'jules-scratch/verification/order.png' });

    // login.html
    await page.goto('file:///app/login.html');
    await page.screenshot({ path: 'jules-scratch/verification/login.png' });

    // account.html
    await page.goto('file:///app/account.html');
    await page.screenshot({ path: 'jules-scratch/verification/account.png' });
  });
});
