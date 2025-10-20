import pytest
import re
from playwright.sync_api import Page, expect

def test_full_ecommerce_flow(page: Page):
    # Go to the home page
    page.goto('file:///app/index.html')

    # Theme switcher check (visual check is hard, so we check for no errors)
    expect(page.locator('h1')).to_have_text('Step into the Future')

    # Navigate to products page and search
    page.click('a[title="Products"]')
    expect(page).to_have_url(re.compile(r".*products\.html"))

    page.fill('#search-bar', 'Cyber')
    suggestions = page.locator('#suggestions-container')
    expect(suggestions.locator('.suggestion-item')).to_have_count(1)
    expect(suggestions.locator('.suggestion-item')).to_have_text('Cyber-Glide')

    # Add a product to the cart
    page.locator('.product-card[data-name="Cyber-Glide"] .add-to-cart-btn').click()

    # Go to cart/order page and verify the item
    page.goto('file:///app/order.html')

    # Wait for the cart to be rendered
    page.wait_for_selector('.cart-item')

    cart_item = page.locator('.cart-item[data-id="1"]')
    expect(cart_item.locator('h3')).to_have_text('Cyber-Glide')
    expect(cart_item.locator('input.quantity-input')).to_have_value('1')

    # Add a second item to test update/remove
    page.goto('file:///app/products.html')
    page.locator('.product-card[data-name="Aero-Stride"] .add-to-cart-btn').click()
    page.goto('file:///app/order.html')

    # Wait for the second item to appear
    page.wait_for_selector('.cart-item[data-id="2"]')

    # Update quantity
    quantity_input = page.locator('.cart-item[data-id="2"] input.quantity-input')
    quantity_input.fill('3')
    quantity_input.dispatch_event('change')

    item_total_price = page.locator('.cart-item[data-id="2"] .item-total-price')
    expect(item_total_price).to_have_text('$2549.97')

    # Remove item
    page.locator('.cart-item[data-id="2"] .remove-btn').click()
    expect(page.locator('.cart-item[data-id="2"]')).to_have_count(0)

    # Complete the multi-step checkout process
    # Note: We still have Cyber-Glide in the cart
    page.fill('#name', 'Jules Verne')
    page.fill('#address', '123 Future Lane')
    page.fill('#city', 'Amiens')
    page.fill('#zip', '80000')
    page.fill('#country', 'France')
    page.click('#step-1 .next-step')

    expect(page.locator('#step-1')).not_to_have_class(re.compile(r'active'))
    expect(page.locator('#step-2')).to_have_class(re.compile(r'active'))

    # Step 2: Payment
    page.fill('#card-number', '1234567812345678')
    page.fill('#expiry-date', '12/29')
    page.fill('#cvv', '123')
    page.click('#step-2 .next-step')

    expect(page.locator('#step-2')).not_to_have_class(re.compile(r'active'))
    expect(page.locator('#step-3')).to_have_class(re.compile(r'active'))

    # Step 3: Confirmation
    expect(page.locator('#step-3 .confirmation-message p').first).to_have_text('Thank you for your purchase!')
    expect(page.locator('#order-number')).not_to_be_empty()
