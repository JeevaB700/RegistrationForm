document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const email = form.querySelector('input[type="text"][placeholder="Enter email address"]');
    const phone = form.querySelector('input[type="number"][placeholder="Enter phone number"]');

    form.addEventListener('submit', function (event) {
        // Clear any previous error messages
        clearErrors();

        let isValid = true;

        // Email validation
        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address with "@" and "."');
            isValid = false;
        }

        // Phone number validation
        if (phone.value.length !== 10) {
            showError(phone, 'Please enter a valid 10-digit phone number.');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent the form from submitting
        } else {
            alert('Form submitted successfully!');
        }
    });

    // Event listeners for real-time validation
    email.addEventListener('input', function () {
        validateField(email, validateEmail(email.value), 'Please enter a valid email address with "@" and "."');
    });

    phone.addEventListener('input', function () {
        validateField(phone, phone.value.length === 10, 'Please enter a valid 10-digit phone number.');
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function showError(input, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    function clearErrors() {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(function (error) {
            error.remove();
        });
    }

    function validateField(input, condition, message) {
        // Remove existing error message if the condition is met
        if (condition) {
            const error = input.parentNode.querySelector('.error-message');
            if (error) {
                error.remove();
            }
        } else {
            // If not valid, ensure error message is shown
            if (!input.parentNode.querySelector('.error-message')) {
                showError(input, message);
            }
        }
    }
});
