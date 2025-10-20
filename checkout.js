document.addEventListener('DOMContentLoaded', () => {
    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalElem = document.getElementById('summary-total');
    const checkoutForm = document.getElementById('checkout-form');

    function renderSummary() {
        const cart = getCart();

        if (cart.length === 0) {
            summaryItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            updateTotal(0);
            // Disable form if cart is empty
            checkoutForm.querySelector('.btn').classList.add('disabled');
            return;
        }

        summaryItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemTotalPrice = item.price * item.quantity;
            subtotal += itemTotalPrice;

            const summaryItemHTML = `
                <div class="summary-item">
                    <div class="summary-item-info">
                        <img src="${item.image}" alt="${item.name}">
                        <span class="summary-item-name">${item.name} (x${item.quantity})</span>
                    </div>
                    <span class="summary-item-price">$${itemTotalPrice.toFixed(2)}</span>
                </div>
            `;
            summaryItemsContainer.insertAdjacentHTML('beforeend', summaryItemHTML);
        });

        updateTotal(subtotal);
    }

    function updateTotal(subtotal) {
        const total = subtotal; // Assuming shipping is free for now
        summaryTotalElem.textContent = `$${total.toFixed(2)}`;
    }

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cart = getCart();
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        alert('Order placed successfully! (This is a demo)');

        // Clear cart
        saveCart([]);

        // Redirect to a confirmation page or homepage
        window.location.href = 'index.html';
    });

    // Initial render
    renderSummary();
});