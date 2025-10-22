document.addEventListener('DOMContentLoaded', () => {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const cartSummaryContainer = document.getElementById('cart-summary-container');

    let currentStep = 1;

    function loadCartSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0 && cartSummaryContainer) {
            let summaryHTML = '<ul>';
            let subtotal = 0;
            cart.forEach(item => {
                summaryHTML += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
                subtotal += item.price;
            });
            summaryHTML += '</ul>';
            summaryHTML += `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
            cartSummaryContainer.innerHTML = summaryHTML;
        } else if (cartSummaryContainer) {
            cartSummaryContainer.innerHTML = '<p>Your cart is empty.</p>';
        }
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < 4 && validateStep(currentStep)) {
                currentStep++;
                updateFormSteps();
                updateProgressBar();
            } else if (currentStep === 4 && validateStep(currentStep)) {
                // Handle payment
                // Simulate payment processing
                setTimeout(() => {
                    alert('Payment successful!');
                    localStorage.removeItem('cart'); // Clear cart after successful order
                    window.location.href = 'index.html'; // Redirect to home page
                }, 1000);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
            updateProgressBar();
        });
    });

    function updateFormSteps() {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });
    }

    function updateProgressBar() {
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index < currentStep);
        });
    }

    function validateStep(step) {
        let isValid = true;
        const inputs = document.querySelectorAll(`#step-${step} input[required]`);
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#444';
            }
        });
        return isValid;
    }

    // Initial load
    loadCartSummary();
    updateFormSteps();
    updateProgressBar();
});
