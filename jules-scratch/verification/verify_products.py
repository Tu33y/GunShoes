from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("file:///app/products.html")
    assert page.title() == "Our Collection - Gun Shoes"
    page.screenshot(path="jules-scratch/verification/products.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
