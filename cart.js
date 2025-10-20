document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotalElem = document.getElementById('cart-subtotal');
    const cartTotalElem = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutBtn.classList.add('disabled');
            updateSummary(0);
            return;
        }

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotalPrice = item.price * item.quantity;
            subtotal += itemTotalPrice;

            const cartItemHTML = `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        <p class="item-price">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="item-quantity">
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    </div>
                    <div class="item-total-price">$${itemTotalPrice.toFixed(2)}</div>
                    <button class="remove-btn" data-id="${item.id}">&times;</button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        updateSummary(subtotal);
        if (subtotal > 0) {
            checkoutBtn.classList.remove('disabled');
        } else {
            checkoutBtn.classList.add('disabled');
        }
        addCartEventListeners();
    }

    function updateSummary(subtotal) {
        const total = subtotal; // Assuming shipping is free for now
        cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        cartTotalElem.textContent = `$${total.toFixed(2)}`;
    }

    function addCartEventListeners() {
        const quantityInputs = document.querySelectorAll('.quantity-input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.id, 10);
                const newQuantity = parseInt(e.target.value, 10);
                updateCartQuantity(productId, newQuantity);
                renderCart(); // Re-render to update totals and item price
                updateCartIcon();
            });
        });

        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id, 10);
                removeFromCart(productId);
                renderCart();
                updateCartIcon();
            });
        });
    }

    // Initial render
    renderCart();
});