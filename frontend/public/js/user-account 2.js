
document.addEventListener('DOMContentLoaded', function() {
    fetch('/user-account/data', {  // Adjust the endpoint as needed to match your actual API endpoint
        method: 'GET',
        credentials: 'include'  // Ensures cookies are sent with the request
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.highScore; // Handle cases where email might not exist
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data. Please try again.');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-btn');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            fetch('/login-register/logout', {
                method: 'POST',
                credentials: 'include'  // Ensures cookies are sent with the request
            })
            .then(response => {
                if (response.ok) {
                    // Redirect to login page or any other page
                    window.location.href = '/login-register.html';
                } else {
                    alert('Failed to log out. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error logging out:', error);
                alert('An error occurred while trying to log out. Please try again later.');
            });
        });
    }

    // Existing fetch logic to load user data
    fetch('/user-account/data', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.highScore ;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        alert('Failed to load user data. Please try again.');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Existing user data fetch code ...

    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                fetch('/user-account/delete', {
                    method: 'DELETE',
                    credentials: 'include'  // Ensures cookies are sent with the request
                })
                .then(response => {
                    if (response.ok) {
                        alert('Account deleted successfully.');
                        window.location.href = '/login-register.html'; // Redirect to login page or home page
                    } else {
                        throw new Error('Failed to delete account.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    alert('An error occurred while deleting your account. Please try again.');
                });
            }
        });
    }
});
