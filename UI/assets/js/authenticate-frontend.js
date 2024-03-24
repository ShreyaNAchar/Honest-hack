// if (localStorage.getItem('user')) {
//   window.location.assign('./user-dashboard.html');
// }
function login(form) {
  // Send login data to the backend server
  fetch('/signin', {
      method: 'POST',
      body: new FormData(form)
  })
  .then(response => response.json())
  .then(data => {
      // Handle response from the server
      if (data.success) {
          // Login successful
          localStorage.setItem('token', data.token);
          window.location.href = '/user-dashboard.html';
      } else {
          // Login failed
          alert(data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle error
  });

  return false;
}
