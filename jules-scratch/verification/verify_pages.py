import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute paths to the HTML files
        products_path = os.path.abspath("products.html")
        technology_path = os.path.abspath("technology.html")
        product_detail_path = os.path.abspath("product-detail.html")

        # Verify Products Page
        await page.goto(f"file://{products_path}")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="jules-scratch/verification/products.png")

        # Verify Technology Page
        await page.goto(f"file://{technology_path}")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="jules-scratch/verification/technology.png")

        # Verify Product Detail Page
        await page.goto(f"file://{product_detail_path}")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="jules-scratch/verification/product-detail.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())