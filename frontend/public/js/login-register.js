// Function to handle form submission for login
const handleLogin = (event) => {
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




//My code
function redirectToGameplay() {
    window.location.href = './gameplay.html';
}