// if (!localStorage.getItem('user')) {
//   window.location.assign('./sign-in.html');
// }
// Function to handle user registration
function registerUser(event) {
    event.preventDefault(); // Prevent form from submitting
    const form = document.getElementById('signup-form');
    const formData = new FormData(form);

    fetch('/signup', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from the server
        if (data.success) {
            // Registration successful
            window.location.href = '/login.html'; // Redirect to login page
        } else {
            // Registration failed
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again later.');
    });
}

// Function to handle user login
function loginUser(event) {
    event.preventDefault(); // Prevent form from submitting
    const form = document.getElementById('login-form');
    const formData = new FormData(form);

    fetch('/login', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Handle response from the server
        if (data.success) {
            // Login successful
            window.location.href = '/dashboard.html'; // Redirect to dashboard
        } else {
            // Login failed
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again later.');
    });
}

