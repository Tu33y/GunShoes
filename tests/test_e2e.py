import re
from playwright.sync_api import Page, expect

def test_homepage(page: Page):
    page.goto("/")
    expect(page).to_have_title(re.compile("Gun Shoes"))

def test_order_page_screenshot(page: Page):
    page.goto("/order.html")
    page.screenshot(path="screenshots/order_page.png")

def test_newsletter_page_screenshot(page: Page):
    page.goto("/newsletter.html")
    page.screenshot(path="screenshots/newsletter_page.png")