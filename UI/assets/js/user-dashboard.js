import { useState, useEffect } from "react";
import axios from 'axios';

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from the backend
    axios.get('http://localhost:3001/user-details')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      {user && (
        <div className="profile">
          <h3>Profile</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
