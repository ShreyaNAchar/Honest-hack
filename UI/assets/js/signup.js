// /* eslint-disable no-unused-vars, no-undef */
// function register(form) {
//   if (Select('#termsCheckedBox:checked').count() > 0) {
//     const param = new FormData(form);

//     toggleLoader(form);
//     Select('#resultPane').empty();


//     queryAPI(CONSTANTS.URL.SIGNUP, 'POST', param, (json) => {
//       if (json.status === CONSTANTS.STATUS.CREATED) {
//         User.login(json.data[0]);
//         goto(CONSTANTS.PAGE.USER_DASHBOARD);
//       } else {
//         const { error } = json;
//         Dialog.showMessageDialog('Sign up Failed!', error, 'error');
//         echo('', error);
//       }
//     }, () => {
//       Dialog.showMessageDialog('Sign up Failed!', CONSTANTS.MESSAGE.ERROR, 'error');
//     }, () => {
//       toggleLoader(form);
//     });
//   } else {
//     Dialog.showMessageDialog('', 'Please agree to our terms and conditions', 'error');
//   }
//   return false;
// }
// // Function to show the report options dialog
// function showReportOptions() {
//     // Show a modal or dialog with options for reporting
//     // You can use a library like Bootstrap modal or create your own dialog

//     // For demonstration, let's use the built-in confirm dialog
//     const choice = confirm("Do you want to report with sign-in?");

//     // Depending on the user's choice, redirect them to the appropriate page
//     if (choice) {
//         // Redirect to the sign-in page
//         window.location.href = "sign-in.html";
//     } else {
//         // Redirect to the report form page
//         window.location.href = "report-form.html";
//     }
// }
// Function to handle signup form submission
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

// Event listener for form submission
document.getElementById('signup-form').addEventListener('submit', registerUser);
