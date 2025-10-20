import os
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Get the absolute path to the index.html file
    current_dir = os.getcwd()
    file_path = f"file://{current_dir}/index.html"

    page.goto(file_path)

    # Screenshot in dark mode (default)
    page.screenshot(path="jules-scratch/verification/new-dark-mode.png")

    # Switch to light mode
    page.click(".slider")
    page.wait_for_timeout(500)  # Wait for animation
    page.screenshot(path="jules-scratch/verification/new-light-mode.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
