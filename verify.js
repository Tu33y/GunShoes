const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/product-detail.html');
  await page.screenshot({ path: 'screenshot_product-detail.png' });
  await browser.close();
})();