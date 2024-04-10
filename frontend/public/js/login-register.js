// Function to handle form submission for login
/* const handleLogin = (event) => {
    event.preventDefault();
    // Get input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate input (e.g., check for empty fields)

    // Send login request to server using fetch or XMLHttpRequest
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            // Redirect to user account page upon successful login
            window.location.href = '/userAccount.html';
        } else {
            // Handle invalid login credentials
            alert('Invalid username or password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
        // Handle other login errors
        alert('An error occurred. Please try again later.');
    });
};

// Function to handle form submission for registration
const handleRegistration = (event) => {
    event.preventDefault();
    // Get input values
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    // Validate input (e.g., check for empty fields, password strength, email format)

    // Send registration request to server using fetch or XMLHttpRequest
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => {
        if (response.ok) {
            // Redirect to user account page upon successful registration
            window.location.href = '/userAccount.html';
        } else {
            // Handle registration errors (e.g., username/email already exists)
            alert('Registration failed. Please try again with different credentials.');
        }
    })
    .catch(error => {
        console.error('Error registering user:', error);
        // Handle other registration errors
        alert('An error occurred during registration. Please try again later.');
    });
};

// Add event listeners for login and registration forms
document.getElementById('login-form').addEventListener('submit', handleLogin);
document.getElementById('register-form').addEventListener('submit', handleRegistration);

 */




//My code
function redirectToGameplay() {
    window.location.href = './gameplay.html';
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signup-form').addEventListener('submit', function (e) {
        var password = document.getElementById('signup-password').value;
        var confirmPassword = document.getElementById('signup-password-check').value;

        if (password !== confirmPassword) {
            e.preventDefault(); // Prevent form submission
            alert('Passwords do not match.');
        }
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();  // Prevent the default form submission

            const passwordField = document.getElementById('signup-password');

            // Hash the password
            const hashedPassword = await sha256(passwordField.value);

            // Replace the password with the hashed password
            passwordField.value = hashedPassword;

            // Continue with the form submission
            form.submit();
        });
    }
});

async function sha256(message) {
    // Encode the string into bytes
    const msgBuffer = new TextEncoder().encode(message);

    // Hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // Convert the ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}
