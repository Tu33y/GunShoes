import os
import re
from playwright.sync_api import Page, expect

def test_theme_switcher(page: Page):
    page.goto(f"file://{os.getcwd()}/index.html")

    # Check initial theme (dark)
    body = page.locator("body")
    expect(body).not_to_have_class(re.compile(r"light-theme"))
    switcher = page.locator("#theme-switcher")
    expect(switcher).not_to_be_checked()

    # Click the switcher to change to light theme
    page.locator("label.switch").click()
    expect(body).to_have_class(re.compile(r"light-theme"))
    expect(switcher).to_be_checked()

    # Click again to switch back to dark
    page.locator("label.switch").click()
    expect(body).not_to_have_class(re.compile(r"light-theme"))
    expect(switcher).not_to_be_checked()

def test_search_bar(page: Page):
    page.goto(f"file://{os.getcwd()}/products.html")

    search_bar = page.locator("#search-bar")
    suggestions = page.locator("#suggestions-container")
    product_cards = page.locator(".product-card")

    # Test filtering
    search_bar.type("Cyber")
    expect(product_cards.first).to_be_visible()
    expect(product_cards.last).not_to_be_visible()

    # Test suggestions
    expect(suggestions).to_be_visible()
    expect(suggestions.locator(".suggestion-item").first).to_have_text("Cyber-Glide")
    suggestions.locator(".suggestion-item").first.click()
    expect(search_bar).to_have_value("Cyber-Glide")
    expect(suggestions).not_to_be_visible()

    # Test clearing search
    search_bar.fill("")
    expect(product_cards.last).to_be_visible()

def test_account_page_navigation(page: Page):
    page.goto(f"file://{os.getcwd()}/index.html")
    page.locator('a[title="Account"]').click()
    expect(page).to_have_url(f"file://{os.getcwd()}/account.html")
    expect(page.locator("h1")).to_have_text("Il Mio Account")

def test_cart_workflow(page: Page):
    page.goto(f"file://{os.getcwd()}/products.html")

    # Add item to cart
    add_to_cart_buttons = page.locator(".add-to-cart-btn")
    add_to_cart_buttons.first.click()

    # Check cart icon update
    cart_count = page.locator(".cart-count")
    expect(cart_count).to_have_text("1")

    # Navigate to cart page
    page.locator('a[title="Cart"]').click()
    expect(page).to_have_url(f"file://{os.getcwd()}/cart.html")

    # Verify item in cart
    cart_item = page.locator(".cart-item")
    expect(cart_item).to_be_visible()
    expect(cart_item.locator("h3")).to_have_text("Cyber-Glide")

    # Update quantity
    quantity_input = page.locator(".quantity-input")
    quantity_input.fill("3")
    quantity_input.dispatch_event("change") # Trigger change event
    expect(cart_count).to_have_text("3")
    expect(page.locator("#cart-total")).to_have_text("$2399.97") # 3 * 799.99

    # Remove item
    page.locator(".remove-btn").click()
    expect(cart_item).not_to_be_visible()
    expect(cart_count).to_have_text("0")

def test_product_options(page: Page):
    page.goto(f"file://{os.getcwd()}/product-detail.html")

    # Check initial state
    main_image = page.locator(".main-product-image")
    expect(main_image).to_have_attribute("src", "images/shoe1.jpg")

    # Change color
    page.locator('button[data-color="light"]').click()
    expect(main_image).to_have_attribute("src", "images/shoe2.jpg")

    # Change back to dark
    page.locator('button[data-color="dark"]').click()
    expect(main_image).to_have_attribute("src", "images/shoe1.jpg")

    # Select size
    size_selector = page.locator("#size")
    size_selector.select_option("45")
    expect(size_selector).to_have_value("45")

def test_multi_step_checkout(page: Page):
    page.goto(f"file://{os.getcwd()}/order.html")

    # Step 1: Fill shipping information
    page.fill("#name", "Jules")
    page.fill("#address", "123 Main St")
    page.fill("#city", "Anytown")
    page.fill("#zip", "12345")
    page.fill("#country", "USA")
    page.click(".next-step")

    # Verify step 2 is active
    expect(page.locator("#step-2")).to_be_visible()
    expect(page.locator('.progress-step[data-step="2"]')).to_have_class(re.compile(r"active"))

    # Step 2: Fill payment details
    page.fill("#card-number", "1234567812345678")
    page.fill("#expiry-date", "12/25")
    page.fill("#cvv", "123")
    page.click("#step-2 .next-step")

    # Verify step 3 is active
    expect(page.locator("#step-3")).to_be_visible()
    expect(page.locator('.progress-step[data-step="3"]')).to_have_class(re.compile(r"active"))
    expect(page.locator("#order-number")).not_to_be_empty()
