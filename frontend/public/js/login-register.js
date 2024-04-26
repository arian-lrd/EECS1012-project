document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            const passwordField = document.getElementById('signup-password');
            const confirmPasswordField = document.getElementById('signup-password-check');

            // Check if the passwords match
            if (passwordField.value !== confirmPasswordField.value) {
                e.preventDefault(); // Prevent form submission
                alert('Passwords do not match.');
                return; // Stop further execution if the passwords don't match
            }

            // If passwords match, the form will be submitted naturally
        });
    }
});

function redirectToGameplay() {
    window.location.href = './gameplay.html';
}

