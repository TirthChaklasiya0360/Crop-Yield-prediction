// JavaScript for form validation (you can add more validation as needed)
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform login validation
    // You can use AJAX to send the login data to the server
    // and receive a response for authentication
    // For demonstration, just redirect to some page
    window.location.href = 'http://127.0.0.1:5000';
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform signup validation
    // You can use AJAX to send the signup data to the server
    // and receive a response for successful registration
    // For demonstration, just redirect to some page
    window.location.href = 'http://127.0.0.1:5000';
});
