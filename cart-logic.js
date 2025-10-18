const CART_KEY = 'gunShoesCart';

function getCart() {
    const cartData = localStorage.getItem(CART_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, name, price, image) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
    }

    saveCart(cart);
    alert(`${name} has been added to your cart!`);
    updateCartIcon();
}

function updateCartQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
        }
    }
    // This function will be called from cart.js, which will handle re-rendering
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    // This function will be called from cart.js, which will handle re-rendering
}

function updateCartIcon() {
    const cart = getCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('a[title="Cart"]');

    if (cartIcon) {
        let countElem = cartIcon.querySelector('.cart-count');
        if (!countElem) {
            countElem = document.createElement('span');
            countElem.className = 'cart-count';
            cartIcon.style.position = 'relative';
            cartIcon.appendChild(countElem);
        }

        if (cartItemCount > 0) {
            countElem.textContent = cartItemCount;
            countElem.style.display = 'flex';
        } else {
            countElem.style.display = 'none';
        }
    }
}

// Add some basic styling for the cart count bubble
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .cart-count {
            position: absolute;
            top: -5px;
            right: -10px;
            background-color: #7F00FF;
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 0 10px #7F00FF;
        }
    `;
    document.head.appendChild(style);
    updateCartIcon();
});