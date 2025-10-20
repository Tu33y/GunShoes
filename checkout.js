document.addEventListener('DOMContentLoaded', () => {
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');

    let currentStep = 1;

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateFormSteps();
                updateProgressBar();
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
        formSteps.forEach(step => {
            step.classList.remove('active');
        });
        document.getElementById(`step-${currentStep}`).classList.add('active');
    }

    function updateProgressBar() {
        progressSteps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    function validateStep(step) {
        let isValid = true;
        const inputs = document.querySelectorAll(`#step-${step} input[required]`);
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                // Add some visual feedback for invalid fields
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#444';
            }
        });
        return isValid;
    }

    // Handle final submission (payment)
    const payButton = document.querySelector('#step-2 .next-step');
    if (payButton) {
        payButton.addEventListener('click', () => {
            if (validateStep(2)) {
                // Simulate payment processing
                setTimeout(() => {
                    document.getElementById('order-number').textContent = Math.floor(Math.random() * 900000) + 100000;
                    currentStep++;
                    updateFormSteps();
                    updateProgressBar();
                }, 1000);
            }
        });
    }
});
