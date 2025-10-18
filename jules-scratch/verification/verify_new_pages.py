from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get the absolute path to the HTML files
        base_path = os.path.abspath(os.getcwd())
        order_page_url = f'file://{os.path.join(base_path, "order.html")}'
        newsletter_page_url = f'file://{os.path.join(base_path, "newsletter.html")}'

        # Verify Order page
        page.goto(order_page_url)
        page.screenshot(path="jules-scratch/verification/order_page.png")

        # Verify Newsletter page
        page.goto(newsletter_page_url)
        page.screenshot(path="jules-scratch/verification/newsletter_page.png")

        browser.close()

if __name__ == "__main__":
    run()