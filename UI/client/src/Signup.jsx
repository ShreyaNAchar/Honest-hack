import { Button } from "bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Signup() {
const [name,setName]=useState()
const [email,setEmail]=useState()
const [password,setPassword]=useState()
const navigate = useNavigate()

const handleSubmit = (e) => {

    e.preventDefault()
    
    axios.post('http://localhost:3001/register', {name, email, password})
    
    .then(result => { console.log(result)
    
    navigate('/login')
    
    })
    
    .catch(err=> console.log(err))
    
    }
return (
<div className="d-flex justify-content-center align-items-center bg-secondary vh-350">
<div className="bg-white p-5 rounded w-250">
<h2>Register</h2>
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label htmlFor="email">
<strong>Name</strong>
</label>
<input
type="text"
placeholder="Enter Name"
autoComplete="off"
name="email"
className="form-control rounded-0"
onChange={(e) => setName(e.target.value)}
/>
</div>
<div className="mb-3">
<label htmlFor="email">
<strong>Email</strong>
</label>
<input
type="email"
placeholder="Enter email"
autoComplete="off"
name="email"
className="form-control rounded-0"
onChange={(e) => setEmail(e.target.value)}
/>
</div>

<div className="mb-3">
<label htmlFor="email">
<strong>Password</strong>
</label>
<input
type="password"
placeholder="Enter password "

name="password"
className="form-control rounded-0"
onChange={(e) => setPassword(e.target.value)}
/>
</div>
<button type="submit" className="btn btn-success w-100 rounded-0">
    Register
</button>
</form>
<p>Already have an account</p>
<Link to="/login" className="btn btn-default w-10 bg-light rounded-10 text-decoration-none ">
Login
</Link>
       
</div>
</div>
);
}
export default Signup;
