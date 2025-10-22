from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("file:///app/index.html")
    assert page.title() == "Gun Shoes"
    page.screenshot(path="jules-scratch/verification/index.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
