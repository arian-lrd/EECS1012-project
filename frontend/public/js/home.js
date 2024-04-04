document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here
    console.log('Homepage loaded');

    // Example: Change text on button click
    const btn = document.getElementById('change-text-btn');
    const textElement = document.getElementById('text-to-change');

    btn.addEventListener('click', function () {
        textElement.textContent = 'Text Changed!';
    });
});
