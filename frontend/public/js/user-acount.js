// Function to handle edit profile form submission
const handleEditProfile = (event) => {
    event.preventDefault();
    // Get input values
    const newUsername = document.getElementById('new-username').value;
    const newEmail = document.getElementById('new-email').value;

    // Validate input (e.g., check for empty fields)

    // Send updated profile data to server using fetch or XMLHttpRequest
    fetch('/updateProfile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername, newEmail }),
    })
    .then(response => {
        if (response.ok) {
            // Update profile information on the page
            document.getElementById('username').textContent = newUsername;
            document.getElementById('email').textContent = newEmail;
            // Close edit profile modal
            closeModal('edit-profile-modal');
            alert('Profile updated successfully.');
        } else {
            // Handle profile update errors
            alert('Failed to update profile. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating profile. Please try again later.');
    });
};

// Function to handle change password form submission
const handleChangePassword = (event) => {
    event.preventDefault();
    // Get input values
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;

    // Validate input (e.g., check for empty fields, password strength)

    // Send password change request to server using fetch or XMLHttpRequest
    fetch('/changePassword', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
    })
    .then(response => {
        if (response.ok) {
            // Clear password fields
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            alert('Password changed successfully.');
        } else {
            // Handle password change errors
            alert('Failed to change password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error changing password:', error);
        alert('An error occurred while changing password. Please try again later.');
    });
};

// Function to handle delete account button click
const handleDeleteAccount = () => {
    // Confirm deletion with user
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // Send delete account request to server using fetch or XMLHttpRequest
        fetch('/deleteAccount', {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Redirect to login page or homepage upon successful account deletion
                window.location.href = '/login.html'; // Example redirection
            } else {
                // Handle account deletion errors
                alert('Failed to delete account. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting account. Please try again later.');
        });
    }
};

// Function to close modal
const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
};

// Add event listeners for edit profile, change password, and delete account
document.getElementById('edit-profile-form').addEventListener('submit', handleEditProfile);
document.getElementById('change-password-form').addEventListener('submit', handleChangePassword);
document.getElementById('delete-account-btn').addEventListener('click', handleDeleteAccount);

